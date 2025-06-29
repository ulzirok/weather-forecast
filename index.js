const form = document.querySelector('.form');
const input = document.querySelector('.input');
const header = document.querySelector('.header');

const apiKey = 'e9a5d3b74bf84418b11193028231901';

function removeCard() {
  const prevCard = document.querySelector('.card');
  if (prevCard) {
    prevCard.remove();
  }
}
function showError(errorMessage) {
  const errorHtml = `<div class="card">${errorMessage}</div>`;
  header.insertAdjacentHTML('afterend', errorHtml);
}
function showCard({name, country, temp, condition1, condition2}) {
  const cardHtml = `
          <div class="card">
            <h2 class="card-city">${name} <span>${country}</span></h2>
            <div class="card-weather">
              <div class="card-value">${temp}<sup>°c</sup></div>
              <img src="${condition1}" alt="Weather" class="card-img">
            </div>
            <div class="card-desc">${condition2}</div>
          </div>
        `;
  header.insertAdjacentHTML('afterend', cardHtml);
}
async function getWeather(city) {
  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  let city = input.value.trim();
  const data = await getWeather(city)

  if (data.error) {
    removeCard();
    showError(data.error.message);
  }
  else {
    removeCard();
    
    const weatherData = {
      name: data.location.name,
      country: data.location.country,
      temp: data.current.temp_c,
      condition1: data.current.condition.icon,
      condition2: data.current.condition.text
    }
    showCard(weatherData);
  }

});