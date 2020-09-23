const api_key = "20ab01d1e4cf2615dc812916957806eb";
const include_adult = "false";
var ar_movies = [];
var language = "en-US";
var page = "1";
var sort = "popularity.desc";
var include_video = "false";
var pageNumber = "1";

document.addEventListener("DOMContentLoaded", buildData);
document.getElementById("allMovies").addEventListener("click", buildPageAllMovies);


function buildData () {
  fetch('assets/JSON/arkansas_movies.json')
    .then(r => {
      return r.json();
    })
    .then(data => {
      for (i in data.movies) {
        fetch(`https://api.themoviedb.org/3/movie/
          ${data.movies[i].id}?api_key=${api_key}&language=${language}`)
          .then(r => {
            return r.json();
          })
          .then(data => {
            ar_movies.push(data);
          })
      }
    })
}

function buildPageAllMovies () {
  document.getElementById("results").innerHTML = "";
  for (i in ar_movies) {
    if (ar_movies[i].poster_path != null) {
        console.log(ar_movies[i]);
        document.getElementById("results").innerHTML +=
        `<div class="resultBanner"><a href="ualr.edu?movieid=${ar_movies[i].id}"><img src=
        "https://image.tmdb.org/t/p/w500${ar_movies[i].poster_path}"></a></div>`;
    } else {
      document.getElementById("results").innerHTML +=
       `<div class="resultNoImage">${ar_movies[i].title}</div>`;
    }
  }
}
