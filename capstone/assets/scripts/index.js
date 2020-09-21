const api_key = "20ab01d1e4cf2615dc812916957806eb";
const include_adult = "false";
var language = "en-US";
var page = "1";
var sort = "popularity.desc";
var include_video = "false";
var pageNumber = "1";


document.getElementById("allMovies").addEventListener("click", buildPageAllMovies);

function buildPageAllMovies () {

  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'assets/JSON/arkansas_movies.json', true);
  xhr.onload = function () {
    if (this.status == 200) {
      var response = JSON.parse(xhr.responseText);
      console.log(response.movies[2].name);

      for (i = 0; i < response.movies.length; i++) {
        document.getElementById("results").innerHTML +=
        '<div class="resultBox">' + response.movies[i].name + '</div>';
      }

    }
  }
  xhr.send();
}
