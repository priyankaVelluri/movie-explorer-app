/* =====================================
   MOVIE EXPLORER - TASK 4
===================================== */


/*
   Demo movie data

   This allows the project to work
   immediately without API key.
*/

const movies = [

    {
        id: 1,
        title: "The Dark Knight",
        year: 2008,
        rating: 9.0,
        category: "top",
        genre: "action",
        poster:
            "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
        description:
            "Batman faces a criminal mastermind who creates chaos and challenges the hero of Gotham."
    },

    {
        id: 2,
        title: "Inception",
        year: 2010,
        rating: 8.8,
        category: "top",
        genre: "action",
        poster:
            "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
        description:
            "A skilled thief enters the dreams of others to steal valuable secrets."
    },

    {
        id: 3,
        title: "Interstellar",
        year: 2014,
        rating: 8.7,
        category: "top",
        genre: "action",
        poster:
            "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
        description:
            "A team of explorers travel through space in search of a new home for humanity."
    },

    {
        id: 4,
        title: "Avengers: Endgame",
        year: 2019,
        rating: 8.4,
        category: "popular",
        genre: "action",
        poster:
            "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
        description:
            "The Avengers unite for one final mission to reverse the damage caused by Thanos."
    },

    {
        id: 5,
        title: "Joker",
        year: 2019,
        rating: 8.4,
        category: "popular",
        genre: "action",
        poster:
            "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
        description:
            "A troubled man begins a dark transformation that changes Gotham City."
    },

    {
        id: 6,
        title: "The Hangover",
        year: 2009,
        rating: 7.7,
        category: "popular",
        genre: "comedy",
        poster:
            "https://image.tmdb.org/t/p/w500/A0bq0gX7z1E8vT8Y7Y7h7s7b8.jpg",
        description:
            "Friends wake up after a wild night and try to discover what happened."
    },

    {
        id: 7,
        title: "Superbad",
        year: 2007,
        rating: 7.6,
        category: "popular",
        genre: "comedy",
        poster:
            "https://image.tmdb.org/t/p/w500/ek8e8txUyUwd2BNqj6lFEerB0eJ.jpg",
        description:
            "Two high school friends try to make the most of their final days before graduation."
    },

    {
        id: 8,
        title: "Dune",
        year: 2021,
        rating: 8.0,
        category: "popular",
        genre: "action",
        poster:
            "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
        description:
            "A young nobleman must travel to a dangerous desert planet and protect his family."
    },

    {
        id: 9,
        title: "Spider-Man: No Way Home",
        year: 2021,
        rating: 8.2,
        category: "popular",
        genre: "action",
        poster:
            "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
        description:
            "Spider-Man faces an unexpected multiverse adventure."
    },

    {
        id: 10,
        title: "The Batman",
        year: 2022,
        rating: 7.8,
        category: "popular",
        genre: "action",
        poster:
            "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg",
        description:
            "Batman investigates a series of mysterious crimes in Gotham City."
    }

];


/* ================================
   ELEMENTS
================================ */

const movieGrid =
    document.getElementById("movieGrid");

const searchInput =
    document.getElementById("searchInput");

const searchBtn =
    document.getElementById("searchBtn");

const loading =
    document.getElementById("loading");

const errorMessage =
    document.getElementById("errorMessage");

const errorText =
    document.getElementById("errorText");

const modal =
    document.getElementById("movieModal");

const movieDetails =
    document.getElementById("movieDetails");

const closeModal =
    document.getElementById("closeModal");

const categoryButtons =
    document.querySelectorAll(".category");


/* ================================
   DISPLAY MOVIES
================================ */

function displayMovies(movieList) {

    movieGrid.innerHTML = "";

    if (movieList.length === 0) {

        showError(
            "No movies found. Try another search."
        );

        return;
    }

    hideError();

    movieList.forEach(movie => {

        const card =
            document.createElement("div");

        card.className = "movie-card";

        card.innerHTML = `

            <div class="movie-poster">

                <img
                    src="${movie.poster}"
                    alt="${movie.title}"
                    onerror="this.style.display='none'"
                >

                <div class="movie-rating">
                    ⭐ ${movie.rating}
                </div>

            </div>

            <div class="movie-info">

                <h3>
                    ${movie.title}
                </h3>

                <p>
                    ${movie.year}
                </p>

                <span class="movie-type">
                    ${movie.genre.toUpperCase()}
                </span>

            </div>

        `;


        card.addEventListener(
            "click",
            () => openMovieDetails(movie)
        );


        movieGrid.appendChild(card);

    });

}


/* ================================
   SHOW LOADING
================================ */

function showLoading() {

    loading.classList.remove("hidden");

    movieGrid.innerHTML = "";

    hideError();
}


/* ================================
   HIDE LOADING
================================ */

function hideLoading() {

    loading.classList.add("hidden");
}


/* ================================
   ERROR
================================ */

function showError(message) {

    errorText.textContent = message;

    errorMessage.classList.remove("hidden");
}


function hideError() {

    errorMessage.classList.add("hidden");
}


/* ================================
   CATEGORY FILTER
================================ */

function filterMovies(category) {

    showLoading();


    setTimeout(() => {

        let filteredMovies;


        if (category === "popular") {

            filteredMovies =
                movies.filter(
                    movie =>
                        movie.category === "popular"
                );

        }

        else if (category === "top") {

            filteredMovies =
                movies.filter(
                    movie =>
                        movie.rating >= 8.5
                );

        }

        else if (category === "action") {

            filteredMovies =
                movies.filter(
                    movie =>
                        movie.genre === "action"
                );

        }

        else if (category === "comedy") {

            filteredMovies =
                movies.filter(
                    movie =>
                        movie.genre === "comedy"
                );

        }

        else if (category === "upcoming") {

            filteredMovies =
                movies.filter(
                    movie =>
                        movie.year >= 2022
                );

        }


        hideLoading();

        displayMovies(filteredMovies);

    }, 500);

}


/* ================================
   SEARCH MOVIES
================================ */

function searchMovies() {

    const searchValue =
        searchInput.value
            .trim()
            .toLowerCase();


    if (searchValue === "") {

        showError(
            "Please enter a movie name."
        );

        return;
    }


    showLoading();


    setTimeout(() => {

        const results =
            movies.filter(movie =>
                movie.title
                    .toLowerCase()
                    .includes(searchValue)
            );


        hideLoading();

        displayMovies(results);

    }, 500);

}


/* ================================
   MOVIE DETAILS
================================ */

function openMovieDetails(movie) {

    movieDetails.innerHTML = `

        <div class="details">

            <div>

                <img
                    src="${movie.poster}"
                    alt="${movie.title}"
                >

            </div>


            <div class="details-content">

                <h2>
                    ${movie.title}
                </h2>

                <p>
                    ${movie.year}
                </p>

                <div class="rating-big">
                    ⭐ ${movie.rating} / 10
                </div>

                <p>
                    ${movie.description}
                </p>

                <p>
                    <strong>
                        Genre:
                    </strong>

                    ${movie.genre}
                </p>

                <span class="detail-tag">
                    Movie
                </span>

                <span class="detail-tag">
                    ${movie.year}
                </span>

                <span class="detail-tag">
                    ⭐ ${movie.rating}
                </span>

            </div>

        </div>

    `;


    modal.classList.remove("hidden");

}


/* ================================
   CLOSE MODAL
================================ */

closeModal.addEventListener(
    "click",
    () => {

        modal.classList.add("hidden");

    }
);


modal.addEventListener(
    "click",
    event => {

        if (event.target === modal) {

            modal.classList.add("hidden");

        }

    }
);


/* ================================
   SEARCH BUTTON
================================ */

searchBtn.addEventListener(
    "click",
    searchMovies
);


/* ================================
   ENTER KEY SEARCH
================================ */

searchInput.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {

            searchMovies();

        }

    }
);


/* ================================
   CATEGORY BUTTONS
================================ */

categoryButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            categoryButtons.forEach(btn =>
                btn.classList.remove("active")
            );

            button.classList.add("active");

            filterMovies(
                button.dataset.category
            );

        }
    );

});


/* ================================
   INITIAL LOAD
================================ */

window.addEventListener(
    "DOMContentLoaded",
    () => {

        showLoading();

        setTimeout(() => {

            hideLoading();

            displayMovies(movies);

        }, 700);

    }
);