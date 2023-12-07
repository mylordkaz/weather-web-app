import './styles.css';

const search = document.querySelector('#search');

search.addEventListener('submit', (event) => {
  event.preventDefault();

  const APIKey = '801c8533cc3e46ae8b2164127230612 ';
  let input = document.querySelector('input').value;

  if (input === '') {
    return;
  } else {
    let city = document.querySelector('.city');
    city.innerHTML = input;
    document.querySelector('input').value = '';
  }

  fetch(
    `http://api.weatherapi.com/v1/current.json?key=${APIKey}&q=${input}&aqi=no`
  )
    .then((response) => response.json())
    .then((json) => {
      const details = document.querySelector('.details');
      const temperature = document.querySelector('.temperature');
      const humidity = document.querySelector('.humidity');
      const wind = document.querySelector('.wind');
      const image = document.querySelector('.image');
      const iconUrl = `https:${json.current.condition.icon}`;
      image.src = iconUrl;
      details.innerHTML = json.current.condition.text;
      temperature.innerHTML = `${parseInt(json.current.temp_c)}<span>°C</span>`;
      humidity.innerHTML = json.current.humidity;
      wind.innerHTML = json.current.wind_kph;
      console.log(json);
    });
});
