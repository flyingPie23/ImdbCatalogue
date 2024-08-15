console.log("hello from js")
const form = document.querySelector(".search-form")
const home = document.querySelector(".navbar-brand")


form.addEventListener("submit", (event) => {
  event.preventDefault();

  const list = document.querySelector(".list")
  const heroPage = document.querySelector(".hero-page")
  const resultPage = document.querySelector(".result-page")

  list.innerHTML = ""
  heroPage.classList.add("d-none")
  resultPage.classList.remove("d-none")
  const title = resultPage.querySelector(".title")
  title.innerHTML = `Search results for: <strong>${event.currentTarget[0].value}</strong></h1>`

  const error = resultPage.querySelector(".error-tab")

  fetch(`http://www.omdbapi.com/?s=${event.currentTarget[0].value}&apikey=adf1f2d7`)
  .then(response => response.json())
  .then((data) => {
    console.log(data)
    if (data.Response === "False"){
      console.log(data.Error)
      title.classList.add("d-none")
      error.classList.remove("d-none")

    }

    else {
      title.classList.remove("d-none")
      error.classList.add("d-none")

      data.Search.forEach((movie) => {
        console.log(movie)
        const output = ` <a href = "https://www.imdb.com/title/${movie.imdbID}" class="movie-card-link" target="_blanc">
        <div class="movie-card"  style="background-image: linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4)), url(${movie.Poster});">
              <h1>${movie.Title}</h1>
            </div>
        </a>`


        list.insertAdjacentHTML('beforeend', output)
      })

    }

  })
});

home.addEventListener("click", (event) => {
  location.reload();
});
