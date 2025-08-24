const API_KEY = "C39Ce6e8";

const movieInput = document.getElementById("movieInput");
const searchBtn = document.getElementById("searchBtn");
const movieDetails = document.getElementById("movieDetails");
const suggestions = document.getElementById("suggestions");
const favouriteList = document.getElementById("favouriteList");

document.addEventListener("DOMContentLoaded", loadFavourites);

searchBtn.addEventListener("click", () => {
  let movieName = movieInput.value.trim();
  if(movieName === "")
    return alert("please enter a movie name");
  fetchMovie(movieName);
});

movieInput.addEventListener("input", async () => {
  let query = movieInput.value.trim();
  if(query.length < 3) {
    suggestions.innerHTML = "";
    return;
  }

  let url = `https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`;
  let response = await fetch(url);
  let data = await response.json();
  if(data.Response === "True") {
    showSuggestions(data.Search);
  } else {
    suggestions.innerHTML = "";
  }
});

function showSuggestions(movies) {
  suggestions.innerHTML = "";
  movies.forEach(movie => {
    let li = document.createElement("li");
    li.textContent = `${movie.Title} (${movie.Year})`;
    li.addEventListener("click", () => {
      fetchMovie(movie.Title);
      suggestions.innerHTML = "";
      movieInput.value = movie.Title;
    });
    suggestions.appendChild(li);
  });
}

async function fetchMovie(name) {
 try {
   let url = `https://www.omdbapi.com/?t=${name}&apikey=${API_KEY}`;
  let response = await fetch(url);
  let data = await response.json();
  if(data.Response === "False") {
    movieDetails.innerHTML = `<p>Movie not found try again</p>`
  } else {
    showMovie(data)
  }
 }  catch(error) {
  movieDetails.innerHTML = `<p>Some error occured try again</p>`
 }
}

function showMovie(data) {
  movieDetails.innerHTML = `
   <img src="${data.Poster !== "N/A" ? data.Poster : 'https://via.placeholder.com/300'}" alt="Movie Poster">
   <h3>${data.Title}</h3>
   <p><strong>Year:</strong> ${data.Year}</p>
    <p><strong>Genre:</strong> ${data.Genre}</p>
    <p><strong>IMDB Rating:</strong> ${data.imdbRating}</p>
    <p><strong>Plot:</strong> ${data.Plot}</p>
    <button onclick="addToFavourites('${data.Title}')">⭐ Add to Favourite</button>`;
}

function addToFavourites(title) {
  let favourites = JSON.parse(localStorage.getItem("favourites")) || [];
  if(!favourites.includes(title)) {
    favourites.push(title);
    localStorage.setItem("favourites", JSON.stringify(favourites));
    loadFavourites();
  } else {
    alert("Movies is alreasy in favourites");
  }
}

function loadFavourites() {
  let favourites = JSON.parse(localStorage.getItem("favourites")) || [];
  favouriteList.innerHTML = "";
  favourites.forEach(title => {
    let div = document.createElement("div");
    div.classList.add("fav-item");
    div.innerHTML = `
    <span>${title}</span>
    <button onclick="removefavourite('${title}')">X</button>`;
    favouriteList.appendChild(div);
  });
  
}

function removefavourite(title) {
  let favourites = JSON.parse(localStorage.getItem("favourites")) || [];
  favourites = favourites.filter(item => item !== title);
  localStorage.setItem("favourites", JSON.stringify(favourites));
  loadFavourites();
}





// const API_KEY = "C39Ce6e8";

// const movieInput = document.getElementById("movieInput");
// const searchBtn = document.getElementById("searchBtn");
// const movieDetails = document.getElementById("movieDetails");
// const suggestions = document.getElementById("suggestions");
// const favouriteList = document.getElementById("favouriteList");

// document.addEventListener("DOMContentLoaded", loadFavourites);

// searchBtn.addEventListener("click", () => {
//   let movieName = movieInput.value.trim();
//   if(movieName === "")
//     return alert("please enter a movie name");
//   fetchMovie(movieName);
// });

// movieInput.addEventListener("input", async () => {
//   let query = movieInput.value.trim();
//   if(query.length < 3) {
//     suggestions.innerHTML = "";
//     return;
//   }

//   let url = `https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`;
//   let response = await fetch(url);
//   let data = await response.json();
//   if(data.Response === "True") {
//     showSuggestions(data.Search);
//   } else {
//     suggestions.innerHTML = "";
//   }
// });

// function showSuggestions(movies) {
//   suggestions.innerHTML = "";
//   movies.forEach(movie => {
//     let li = document.createElement("li");
//     li.textContent = `${movie.Title} (${movie.Year})`;
//     li.addEventListener("click", () => {
//       fetchMovie(movie.Title);
//       suggestions.innerHTML = "";
//       movieInput.value = movie.Title;
//     });
//     suggestions.appendChild(li);
//   });
// }

// async function fetchMovie(name) {
//  try {
//    let url = `https://www.omdbapi.com/?t=${name}&apikey=${API_KEY}`;
//   let response = await fetch(url);
//   let data = await response.json();
//   if(data.Response === "False") {
//     movieDetails.innerHTML = `<p>Movie not found try again</p>`
//   } else {
//     showMovie(data)
//   }
//  }  catch(error) {
//   movieDetails.innerHTML = `<p>Some error occured try again</p>`
//  }
// }

// function showMovie(data) {
//   movieDetails.innerHTML = `
//    <img src="${data.Poster !== "N/A" ? data.Poster : 'https://via.placeholder.com/300'}" alt="Movie Poster">
//    <h3>${data.Title}</h3>
//    <p><strong>Year:</strong> ${data.Year}</p>
//     <p><strong>Genre:</strong> ${data.Genre}</p>
//     <p><strong>IMDB Rating:</strong> ${data.imdbRating}</p>
//     <p><strong>Plot:</strong> ${data.Plot}</p>
//     <button onclick="addToFavourites('${data.Title}')">⭐ Add to Favourite</button>`;
// }

// function addToFavourites(title) {
//   let favourites = JSON.parse(localStorage.getItem("favourites")) || [];
//   if(!favourites.includes(title)) {
//     favourites.push(title);
//     localStorage.setItem("favourites", JSON.stringify(favourites));
//     loadFavourites();
//   } else {
//     alert("Movies is alreasy in favourites");
//   }
// }

// function loadFavourites() {
//   let favourites = JSON.parse(localStorage.getItem("favourites")) || [];
//   favouriteList.innerHTML = "";
//   favourites.forEach(title => {
//     let div = document.createElement("div");
//     div.classList.add("fav-item");
//     div.innerHTML = `
//     <span>${title}</span>
//     <button onclick="removefavourite('${title}')">X</button>`;
//     favouriteList.appendChild(div);
//   });
  
// }

// function removefavourite(title) {
//   let favourites = JSON.parse(localStorage.getItem("favourites")) || [];
//   favourites = favourites.filter(item => item !== title);
//   localStorage.setItem("favourites", JSON.stringify(favourites));
//   loadFavourites();
// }