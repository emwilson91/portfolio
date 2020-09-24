const query = window.location.search;
const urlParams = new URLSearchParams(query);
const id = urlParams.get("movieId");
const api_key = "20ab01d1e4cf2615dc812916957806eb";
var movie;
var language = "en-US";


document.addEventListener("DOMContentLoaded", buildPage);


// this function fills out the document with info from the api
function buildPage () {
  fetch(`https://api.themoviedb.org/3/movie/
    ${id}?api_key=${api_key}&language=${language}`)
    .then(r => {
      return r.json();
    })
    .then(data => {
      movie = data;
      const months = ['January', 'February', 'March', 'April', 'May', 'June',
       'July', 'August', 'September', 'October', 'November', 'December'];
      const year = movie.release_date.slice(0, 4);
      const month = movie.release_date.slice(5, 7);
      const day = movie.release_date.slice(8, 10);
      const newDate = `${months[month-1]} ${day}, ${year}`;
      document.getElementById("movie").innerHTML =
      `<div id="title">${movie.title}</div>`;
      document.getElementById("movie").innerHTML += `<div id=
      "releaseDate">${newDate}</div>`
      if (movie.poster_path != null) {
          document.getElementById("movie").innerHTML += `<img src=
          "https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">`;
      } else {
        document.getElementById("movie").innerHTML +=
        '<div id="noImage">No Image Found.</div>';
      }
      document.getElementById("movie").innerHTML +=
      `<div id="overview">${movie.overview}</div>`;
      document.getElementById("movie").innerHTML +=
      `<div id="runtime">Total Runtime: ${movie.runtime} minutes.</div>`;

      //call api to get cast and post to document
      fetch(`https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${api_key}`)
        .then(r => {
          return r.json();
        })
        .then(data => {
          if (data.cast != 0) {
            document.getElementById("movie").innerHTML +=
            `<ul id="castList"></ul>`;
            for (i in data.cast) {
              document.getElementById("castList").innerHTML +=
              `<li class="castMember">${data.cast[i].name} as ${data.cast[i].character}</li>`;
            }
          } else {
            document.getElementById("movie").innerHTML +=
            `<div id="noCast">No Cast could be found for this title.</div>`;
          }
        })
        
    })
}
