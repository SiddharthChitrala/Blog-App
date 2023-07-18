$(document).ready(function () {
     $('.nav-link.cato1[href="#tab1"]').click(function () {
          $('.tab-pane').addClass('active show');
          $('.row-cols-2').removeClass('row-cols-2');
          localStorage.setItem('viewAllClicked', true);
     });

     $('.nav-link.cato1:not([href="#tab1"])').click(function () {
          $('.tab-pane').removeClass('active show');
          $('.row-cols-2').addClass('row-cols-2');
          localStorage.removeItem('viewAllClicked');
          var target = $(this).attr('href');
          $(target).addClass('active show');
     });

     if (localStorage.getItem('viewAllClicked')) {
          $('.tab-pane').addClass('active show');
          $('.row-cols-2').removeClass('row-cols-2');
     } else {
          $('.row-cols-2').addClass('row-cols-2');
     }
});


function searchCards() {
     var searchValue = document.getElementById("searchInput").value.toLowerCase();
     var cards = document.querySelectorAll("#tabContentContainer .card");

     cards.forEach(function (card) {
          var cardTitle = card.querySelector(".card-title").textContent.toLowerCase();
          if (cardTitle.includes(searchValue)) {
               card.style.display = "block";    // Show the card 
          } else {
               card.style.display = "none";     // Hide the card 
          }
     });
}

document.getElementById("searchButton").addEventListener("click", searchCards);

var searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", function () {
     var searchValue = this.value.toLowerCase();
     var suggestionsList = document.getElementById("searchSuggestions");
     suggestionsList.innerHTML = "";    // Clear previous search suggestions

     if (searchValue.length === 0) {
          suggestionsList.style.display = "none";  // Hide suggestions when the input is empty
          return;
     }

     var cards = document.querySelectorAll("#tabContentContainer .card");

     cards.forEach(function (card) {
          var cardTitle = card.querySelector(".card-title").textContent.toLowerCase();
          if (cardTitle.includes(searchValue)) {
               var suggestionItem = document.createElement("li");
               suggestionItem.textContent = cardTitle;
               suggestionItem.addEventListener("click", function () {
                    searchInput.value = this.textContent;  // Populate the clicked suggestion into the search input
                    searchCards();  // Trigger search after suggestion is clicked
               });
               suggestionsList.appendChild(suggestionItem);
          }
     });

     if (suggestionsList.childElementCount > 0) {
          suggestionsList.style.display = "block";   // Show suggestions if there are any
     } else {
          suggestionsList.style.display = "none";    // Hide suggestions if there are none
     }
});

// Get all the "Read more" buttons
const readMoreButtons = document.querySelectorAll('[id^="read-more-"]');


const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalDate = document.getElementById('modal-date');
const modalDescription = document.getElementById('modal-description');


readMoreButtons.forEach((button) => {
     button.addEventListener('click', (event) => {
          event.preventDefault(); // clicking event

       
          const card = button.closest('.card');

          // card Details
          const title = card.querySelector('.card-title').innerText;
          const date = card.querySelector('.caption-date').innerText;
          const description = card.querySelector('.card-text').innerText;

          modalTitle.innerText = title;
          modalDate.innerText = date;
          modalDescription.innerText = description;

          modal.classList.add('show');
          modal.style.display = 'block';
          document.body.classList.add('modal-open');
     });
});

// Close modal
modal.addEventListener('click', (event) => {
     if (event.target === modal || event.target.classList.contains('btn-close')) {
          modal.classList.remove('show');
          modal.style.display = 'none';
          document.body.classList.remove('modal-open');
     }
});
