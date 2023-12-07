import './styles.css';
document.addEventListener('DOMContentLoaded', () => {
  const search = document.querySelector('#search');

  search.addEventListener('submit', async (event) => {
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

    try {
      const response = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=${APIKey}&q=${input}&aqi=no`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const json = await response.json();

      const details = document.querySelector('.details');
      const temperature = document.querySelector('.temperature');
      const humidity = document.querySelector('.humidity');
      const wind = document.querySelector('.wind');
      const image = document.querySelector('.image');
      const iconUrl = `https:${json.current.condition.icon}`;

      image.src = iconUrl;
      details.innerHTML = json.current.condition.text;
      temperature.innerHTML = `${json.current.temp_c}<span>°C</span>`;
      humidity.innerHTML = `${json.current.humidity}<span> Humidity</span>`;
      wind.innerHTML = `${json.current.wind_kph}<span> km/h wind speed</span>`;
      console.log(json);
    } catch (error) {
      console.error('Error fetchig data', error.message);
    }
  });
});
