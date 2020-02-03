const endPoint =
  'https://mars.nasa.gov/rss/api/?feed=weather&category=insight&feedtype=json&ver=1.0';

const insightData = [];

fetch(endPoint)
  .then(res => res.json())
  .then(data => console.log(data));
