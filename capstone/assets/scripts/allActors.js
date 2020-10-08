const api_key = "20ab01d1e4cf2615dc812916957806eb";
const include_adult = "false";
var ar_actors = [];
var language = "en-US";
var page = "1";
var sort = "popularity.desc";
var include_video = "false";
var pageNumber = "1";

document.addEventListener("DOMContentLoaded", buildData);

//use local maintained json to call api; make array of movie objects to build page
function buildData () {
  fetch('assets/json/arkansas.json')
    .then(r => {
      return r.json();
    })
    .then(data => {
      for (i in data.actors) {
        fetch(`https://api.themoviedb.org/3/person/${data.actors[i].id}?api_key=${api_key}&language=${language}`)
          .then(r => {
            return r.json();
          })
          .then(data => {
              ar_actors.push(data);
              if (data.profile_path != null && data.profile_path != "") {
                  document.getElementById("results").innerHTML +=
                  `<div class="resultBanner">${data.name}<a href=
                  "actorDetails.html?actorId=${data.id}" alt=
                  "${data.name}"><img src=
                  "https://image.tmdb.org/t/p/w500${data.profile_path}"></a></div>`;
              } else {
                document.getElementById("results").innerHTML +=
                 `<div class="resultNoImage"><a href=
                 "actorDetails.html?actorId=${data.id}">${data.name}</a></div>`;
              }
          })
      }
    })
}
