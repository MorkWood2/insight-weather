// //get long and lat from our location
window.addEventListener('load', () => {
  let lat;
  let long;

  let timezone = document.querySelector('.timezone');
  let tempDegree = document.querySelector('.temp-degree');
  let tempDesc = document.querySelector('.temp-desc');

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      console.log(lat, long);
      const proxy = 'https://cors-anywhere.herokuapp.com/';
      const api = `${proxy}https://api.darksky.net/forecast/06ffb973457f285ab784e46b701e2b15/${lat},${long}`;

      fetch(api)
        .then(res => {
          return res.json();
        })
        .then(data => {
          console.log(data);

          //es6 Destructure
          const { summary, temperature, icon } = data.currently;
          tempDesc.textContent = summary;
          tempDegree.textContent = temperature;
          timezone.textContent = data.timezone;
          //set Icon
          setIcons(icon, document.querySelector('.icon'));
        });
    });
    function setIcons(icon, iconID) {
      const skycons = new Skycons({ color: 'white' });
      const currentIcon = icon.replace(/-/g, '_').toUpperCase();
      skycons.play();
      return skycons.set(iconID, Skycons[currentIcon]);
    }
  }
});
