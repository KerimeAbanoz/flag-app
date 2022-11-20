//*==================== FLAG-APP ========================

const btn = document.querySelector(".btn");
const input = document.querySelector(".input");
// const select = document.querySelector("#select");

// const options = () => {
//   const url = `https://restcountries.com/v3.1/all`;
//   fetch(url).then((res) => {
//     if (!res.ok) {
//       console.log("olmadı");
//     }
//     return res.json();
//   }).then((data) => console.log(data))
// };

// select.innerHTML += `
// <option value=""></option>
// `;

window.addEventListener("load", () => {
  input.focus();
//   options();
});

input.addEventListener("keydown", (e) => {
  if (e.keyCode == 13) {
    btn.click();
  }
});

btn.addEventListener("click", () => {
  fetchCountryByName(input.value);
  input.value = "";
});

const fetchCountryByName = (name) => {
  const url = `https://restcountries.com/v3.1/name/${name}`;
  fetch(url)
    .then((res) => {
      if (!res.ok) {
        renderError(`Something went wrong ${res.status}`);
        throw new Error();
      }
      return res.json();
    })
    .then((data) => renderCountries(data))
    .catch((err) => console.log(err));
};

const renderError = () => {
  const countryDiv = document.querySelector(".countries");
  countryDiv.innerHTML += `
    <h2>Countries can not be fetched</h2>
    <img src="./img/404.png" alt="">
    `;
};

const renderCountries = (data) => {
  console.log(data);
  const countryDiv = document.querySelector(".countries");
  const {
    capital,
    currencies,
    flags: { svg },
    languages,
    name: { common },
    region,
  } = data[0];

  console.log(Object.values(languages));
  console.log(Object.values(currencies)[0].name);
  console.log(Object.values(currencies)[0].symbol);
  countryDiv.innerHTML = `
    <div class="card mx-auto mg-3 shadow-lg" style="width: 18rem;">
      <img src="${svg} " class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${common}</h5>
        <p class="card-text">${region}</p>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">
        <i class= "fas fa-lg fa-landmark"></i>${capital}
        </li>
        <li class="list-group-item">
        <i class= "fas fa-lg fa-comments"></i>${Object.values(languages)}
        </li>
        <li class="list-group-item">
        <i class= "fas fa-lg fa-money-bill-wave"></i>${
          Object.values(currencies)[0].name
        }, ${Object.values(currencies)[0].symbol}
        </li>
      </ul>
      <div class="card-body">
        <a href="#" class="card-link">Card link</a>
        <a href="#" class="card-link">Another link</a>
      </div>
  </div>
    `;
};
