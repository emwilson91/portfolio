function movieSearch() {

  var search_keyword = document.getElementById("search").value;
  var api_key = "20ab01d1e4cf2615dc812916957806eb";
  var language = "en-US";
  var page = "1";
  var include_adult = "false";
  var query = encodeURI(search_keyword);
  var myURL = "https://api.themoviedb.org/3/search/movie?api_key=" + api_key + "&language=" + language + "&query=" + query + "&page="  + page + "&include_adult=" + include_adult;

  //clearing out previous search
  $('#results div').empty();
  $('#results img').attr('src', '');

  //document.getElementById("url1").innerHTML = myURL;
  //using jQuery call here. would prefer to find vanilla way.
  $(document).ready( () => {

    fetch(myURL)
      .then(r => r.json())
      .then(msg => {
            console.log(msg);
        /* Loop through the first 25 results */
            var test3 = false;
            for (i = 0; i < 25; i++) {
                /* Display the result */
              if (i < msg.results.length) {
                  var expression = /arkansas/i;
                  var test1 = expression.test(msg.results[i].overview);
                  var test2 = expression.test(msg.results[i].original_title);


                  if (test1 || test2) {
                    test3 = true;
                    document.getElementById("results-header").innerHTML = "Search our library of Arkansas cinema!";
                    document.getElementById("title" + i).innerHTML = i + ". " + msg.results[i].original_title;

                    /* Some movies don't have a poster - null is returned */
                    if (msg.results[i].poster_path != null) {
                        document.getElementById("image" + i).src = "https://image.tmdb.org/t/p/w500" + msg.results[i].poster_path;
                    } else {
                        /* null move poster - don't display a empty value */
                        document.getElementById("image" + i).src = "";
                    }
                  } else if (test3 == false) {
                      document.getElementById("results-header").innerHTML = "We only show results for movies in Arkansas, please refine your search.";
                    }
                }
              }
        })
      })
}
