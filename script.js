const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('Movie');
PopulateLUI();
let ticketPrice = +movieSelect.value;


 
//set Movie data
function setMovieData(movieIndex, moviePrice){
    localStorage.setItem('movieIndex', movieIndex);
    localStorage.setItem('MoviePrice', moviePrice);
}

// count  
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const selectedSeatsCount = selectedSeats.length;

    const seatIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat))
    
    localStorage.setItem("selectedSeat", JSON.stringify(seatIndex));
    
    count.innerHTML = selectedSeatsCount;
    total.innerHTML = selectedSeatsCount * ticketPrice;
}

//Populate Ul 
function PopulateLUI() {
    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeat"));
    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add("selected")
            }
        })
    }

    const selectedMovie = localStorage.getItem("movieIndex");
    if (selectedMovie !== null) {
        movieSelect.selectedIndex = selectedMovie;
    }
}

// Change Movies 
movieSelect.addEventListener('change', e => {
    ticketPrice = e.target.value;
   setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
})

// click Seat Event
container.addEventListener('click', e => {
    
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
})

// initial count total

updateSelectedCount();