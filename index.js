//get long and lat from our location

window.addEventListener('load', () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(
    '.temperature-description'
  );
  let temperatureDegree = document.querySelector('.temperature-degree');
  let locationTimezone = document.querySelector('.location-timezone');
  let temperatureSection = document.querySelector('.temperature');
  const temperatureSpan = document.querySelector('.temperature span');

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = 'https://cors-anywhere.herokuapp.com/';
      const api = `${proxy}https://api.darksky.net/forecast/06ffb973457f285ab784e46b701e2b15/${lat},${long}`;

      fetch(api)
        .then(res => {
          return res.json();
        })
        .then(data => {
          console.log(data);
          //es6 destructure
          const { temperature, summary, icon } = data.currently;
          //set Dom Elements from the API
          temperatureDegree.textContent = temperature;
          temperatureDescription.textContext = summary;
          locationTimezone.textContent = data.timezone;
          //Formula for celsius
          let celsius = (temperature - 32) * (5 / 9);
          //set Icon
          setIcons(icon, document.querySelector('.icon'));

          //change temperature to Celsius/Farenheit
          temperatureSection.addEventListener('click', () => {
            if (temperatureSpan.textContent === 'f') {
              temperatureSpan.textContent = 'C';
              temperatureDegree.textContent = Math.floor(celsius);
            } else {
              temperatureSpan.textContent === 'f';
              temperatureDegree.textContent = temperature;
            }
          });
        });
    });
  }

  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: 'white' });
    const currentIcon = icon.replace(/-/g, '_').toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});
