const query = window.location.search;
const urlParams = new URLSearchParams(query);
const id = urlParams.get("actorId");
const api_key = "20ab01d1e4cf2615dc812916957806eb";
const months = ['January', 'February', 'March', 'April', 'May', 'June',
 'July', 'August', 'September', 'October', 'November', 'December'];
var actor;
var language = "en-US";

document.addEventListener("DOMContentLoaded", buildPage);

function buildPage() {
  fetch(`https://api.themoviedb.org/3/person/${id}?api_key=${api_key}&language=${language}`)
    .then(r => {
      return r.json();
    })
    .then(data => {
      actor = data;

      if (actor.profile_path != null && actor.profile_path != "") {
          document.getElementById("results").innerHTML +=
          `<div class="resultBanner">${actor.name}<a href=
          "actorDetails.html?actorId=${actor.id}" alt=
          "${actor.name}"><img src=
          "https://image.tmdb.org/t/p/w500${actor.profile_path}"></a></div>`;
      } else {
        document.getElementById("results").innerHTML +=
         `<div class="resultNoImage"><a href=
         "actorDetails.html?actorId=${actor.id}">${actor.name}</a></div>`;
      }

      //handle birthday here
      if (actor.birthday != null && actor.birthday != "") {
        const birthYear = actor.birthday.slice(0, 4);
        const birthMonth = actor.birthday.slice(5, 7);
        const birthDay = actor.birthday.slice(8, 10);
        const newBirthday = `${months[birthMonth-1]} ${birthDay}, ${birthYear}`;
        if (actor.place_of_birth != null && actor.place_of_birth != "") {
          document.getElementById("results").innerHTML +=
          `<div id="birthday">Born: ${newBirthday} in ${actor.place_of_birth}</div>`;
        } else {
          document.getElementById("results").innerHTML +=
          `<div id="birthday">Born: ${newBirthday}</div>`;
        }
      } else {
        document.getElementById("results").innerHTML +=
        `<div id="birthday">Born: No date found.</div>`;
      }

      //handle deathday here
      if (actor.deathday != null && actor.deathday != "") {
        const deathYear = actor.deathday.slice(0, 4);
        const deathMonth = actor.deathday.slice(5, 7);
        const deathDay = actor.deathday.slice(8, 10);
        const newDeathDay = `${months[deathMonth-1]} ${deathDay}, ${deathYear}`;
        document.getElementById("results").innerHTML +=
        `<div id="deathday">Died: ${newDeathDay}</div>`;
      } 

      if (actor.biography != "" && actor.biography != null) {
        document.getElementById("results").innerHTML +=
        `<div id="bio">${actor.biography}</div>`;
      } else {
        document.getElementById("results").innerHTML +=
        `<div id="bio">No biography found for actor.</div>`;
      }
    })
}
