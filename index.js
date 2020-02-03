//get long and lat from our location

window.addEventListener('load', () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(
    '.temperature-description'
  );

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
          const { temperature, summary } = data.currently;
        });
    });
  }
});
