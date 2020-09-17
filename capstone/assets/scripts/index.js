
const api_key = "20ab01d1e4cf2615dc812916957806eb";
const include_adult = "false";
var language = "en-US";
var page = "1";
var sort = "popularity.desc";
var include_video = "false";
var pageNumber = "1";

function movieSearch() {

  let query = encodeURI(document.getElementById("search").value);
  let myURL = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=${language}&query=${query}&page=${page}&include_adult=${include_adult}`;

  //clearing out previous search; using jquery here, prefer to find vanilla solution
  $('#results div').empty();
  $('#results img').attr('src', '');

  //document.getElementById("url1").innerHTML = myURL;
  fetch(myURL)
    .then(r => r.json())
    .then(msg => {
      console.log(msg);

      /* Loop through the first 25 results */
      let atLeastOne = false;
      for (i = 0; i < 25; i++) {
          /* Display the result */

          let expression = /arkansas/i;
          let test1 = expression.test(msg.results[i].overview);
          let test2 = expression.test(msg.results[i].original_title);
          //test 3 for keyword

          if (test1 || test2) {
            atLeastOne = true;
            document.getElementById("results-header").innerHTML = "Search our library of Arkansas cinema!";
            document.getElementById("title" + i).innerHTML = i + ". " + msg.results[i].original_title;

            /* Some movies don't have a poster - null is returned */
            if (msg.results[i].poster_path != null) {
                document.getElementById("image" + i).src = "https://image.tmdb.org/t/p/w500" + msg.results[i].poster_path;
            } else {
                /* null move poster - don't display a empty value */
                document.getElementById("image" + i).src = "";
            }
          } else if (atLeastOne == false) {
              document.getElementById("results-header").innerHTML = "We only show results for movies in Arkansas, please refine your search.";
            }
        }
      })
}


/*
function getKeyword(id) {

  var movieId = id;
  var myURL = `https://api.themoviedb.org/3/movie/${movieId}/keywords?api_key=${api_key}`;


  fetch(myURL)
    .then(r => r.json())
    .then(msg => {
      console.log(msg);
      return msg;
    })
}
*/
