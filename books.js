let books;

async function renderBooks(filter) {
    const booksWrapper = document.querySelector(".books");

    // Check if the booksWrapper exists
    if (!booksWrapper) {
        console.error('Element with class "books" not found.');
        return;
    }

    // Show loading spinner
    booksWrapper.classList.add('books__loading'); // Add loading class
    if (!books) {
        books = await getBooks(); // Fetch books only if not already fetched
    }

    // Hide loading spinner
    booksWrapper.classList.remove('books__loading'); // Remove loading class

    // Create a copy of the books array for sorting
    let sortedBooks = [...books];

    // Sorting logic
    if (filter === 'LOW_TO_HIGH') {
        sortedBooks.sort((a, b) => (a.salePrice || a.originalPrice) - (b.salePrice || b.originalPrice));
    } else if (filter === 'HIGH_TO_LOW') {
        sortedBooks.sort((a, b) => (b.salePrice || b.originalPrice) - (a.salePrice || a.originalPrice));
    } else if (filter === 'RATING') {
        sortedBooks.sort((a, b) => b.rating - a.rating);
    } else if (filter === 'A_TO_Z') {
        sortedBooks.sort((a, b) => a.title.localeCompare(b.title));
    }

    // Generate HTML for books
    const booksHtml = sortedBooks.map((book) => {
        const { url, title, originalPrice, salePrice = originalPrice } = book;
        return `<div class="book">
            <figure class="book__img--wrapper">
                <img class="book__img" src="${url}" alt="${title}">
            </figure>
            <div class="book__title">${title}</div>
            <div class="book__ratings">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star-half-alt"></i>
            </div>
            <div class="book__price">
                <span class="book__price--normal">$${originalPrice.toFixed(2)}</span>
                $${salePrice ? salePrice.toFixed(2) : originalPrice.toFixed(2)}
            </div>
        </div>`;
    }).join(""); // Join the array of HTML strings into a single string

    // Update the books wrapper with the new HTML
    booksWrapper.innerHTML = booksHtml;
    console.log(booksHtml);
}

function filterBooks(event) {
    renderBooks(event.target.value);
}

// Set a timeout of 1000 milliseconds (1 second) to render books with default filter
setTimeout(() => {
    renderBooks('LOW_TO_HIGH'); // Default filter
}, 1000);

// FAKE DATA
function getBooks() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                {
                    id: 1,
                    title: "Crack the Coding Interview",
                    url: "assets/crack the coding interview.png",
                    originalPrice: 49.95,
                    salePrice: 14.95,
                    rating: 4.5,
                },
                {
                    id: 2,
                    title: "Atomic Habits",
                    url: "assets/atomic habits.jpg",
                    originalPrice: 39,
                    salePrice: null,
                    rating: 5,
                },
                {
                    id: 3,
                    title: "Deep Work",
                    url: "./assets/deep work.jpeg",
                    originalPrice: 29,
                    salePrice: 12,
                    rating: 5,
                },
                {
                    id: 4,
                    title: "The 10X Rule",
                    url: "assets/book-1.jpeg",
                    originalPrice: 44,
                    salePrice: 19,
                    rating: 4.5,
                },
                {
                  id: 5,
                  title: "Be Obsessed Or Be Average",
                  url: "assets/book-2.jpeg",
                  originalPrice: 32,
                  salePrice: 17,
                  rating: 4,
                },
                {
                  id: 6,
                  title: "Rich Dad Poor Dad",
                  url: "assets/book-3.jpeg",
                  originalPrice: 70,
                  salePrice: 12.5,
                  rating: 5,
                },
                {
                  id: 7,
                  title: "Cashflow Quadrant",
                  url: "assets/book-4.jpeg",
                  originalPrice: 11,
                  salePrice: 10,
                  rating: 4,
                },
                {
                  id: 8,
                  title: "48 Laws of Power",
                  url: "assets/book-5.jpeg",
                  originalPrice: 38,
                  salePrice: 17.95,
                  rating: 4.5,
                },
                {
                  id: 9,
                  title: "The 5 Second Rule",
                  url: "assets/book-6.jpeg",
                  originalPrice: 35,
                  salePrice: 34.99,
                  rating: 4,
                },
                {
                  id: 10,
                  title: "Your Next Five Moves",
                  url: "assets/book-7.jpg",
                  originalPrice: 40,
                  salePrice: 39.99,
                  rating: 4,
                },
                {
                  id: 11,
                  title: "Mastery",
                  url: "assets/book-8.jpeg",
                  originalPrice: 30,
                  salePrice: 29.99,
                  rating: 4.5,
                },
      ]);
      }
    );
    }, 1000);
}



const rating = 4.5; // Example rating value (can be a float)
const maxStars = 5; // Maximum number of stars

function displayStars(rating) {
    const starContainer = document.getElementById('star-rating');
    starContainer.innerHTML = ''; // Clear previous stars

    for (let i = 1; i <= maxStars; i++) {
        const star = document.createElement('span');
        star.className = 'star';
        
        // Determine if the star should be filled or empty
        if (i <= Math.floor(rating)) {
            star.innerHTML = '★'; // Filled star
        } else if (i === Math.ceil(rating)) {
            star.innerHTML = '☆'; // Half star (optional)
        } else {
            star.innerHTML = '☆'; // Empty star
        }
        
        starContainer.appendChild(star);
    }
}

// Call the function to display stars
displayStars(rating);
