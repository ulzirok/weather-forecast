const form = document.querySelector('.form');
const input = document.querySelector('.input');
const header = document.querySelector('.header');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  let city = input.value.trim();
  const apiKey = 'e9a5d3b74bf84418b11193028231901';
  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {

      if (data.error) {
        const prevCard = document.querySelector('.card');
        
        if (prevCard) {
          prevCard.remove();
        }
        const errorHtml = `<div class="card">${data.error.message}</div>`;
        header.insertAdjacentHTML('afterend', errorHtml);
      }


      else {
        const prevCard = document.querySelector('.card');
        
        if (prevCard) {
          prevCard.remove();
        }

        const cardHtml = `
          <div class="card">
            <h2 class="card-city">${data.location.name} <span>${data.location.country}</span></h2>
            <div class="card-weather">
              <div class="card-value">${data.current.temp_c}<sup>°c</sup></div>
              <img src="${data.current.condition.icon}" alt="Weather" class="card-img">
            </div>
            <div class="card-desc">${data.current.condition.text}</div>
          </div>
        `;
        header.insertAdjacentHTML('afterend', cardHtml);
      }

    });

});