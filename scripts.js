const apiKey = '3fba80a478ec5f90abd57c6522d3cfab';
    const locationElement = document.getElementById('location');
    const temperatureElement = document.getElementById('temperature');
    const descriptionElement = document.getElementById('description');
    const humidityElement = document.getElementById('humidity');
    const windSpeedElement = document.getElementById('wind-speed');
    const cityInput = document.getElementById('city-input');
    const submitBtn = document.getElementById('submit-btn');
    const iconElement = document.querySelector('.icon');
    const bodyElement = document.body;

    bodyElement.style.backgroundImage = "url(https://4kwallpapers.com/images/wallpapers/landscape-windows-11-lake-forest-day-time-1920x1080-8621.jpeg)"

    function displayErrorMessage(message) {
      locationElement.textContent = message;
      [temperatureElement, descriptionElement, humidityElement, windSpeedElement].forEach(el => el.textContent = '');
      iconElement.src = '';
      // bodyElement.style.backgroundImage = '';
      locationElement.classList.add('error');
    }

    function displayWeatherData(data) {
      const { name, sys, main, weather, wind } = data;
      const location = `${name}, ${sys.country}`;
      const temperature = `${main.temp}°C`;
      const icon = `https://openweathermap.org/img/wn/${weather[0].icon}.png`;
      const description = `${weather[0].main}`;
      const humidity = `Humidity: ${main.humidity}%`;
      const windSpeed = `Wind Speed: ${wind.speed} M/s`; //Meter per seconds

      locationElement.textContent = location;
      temperatureElement.textContent = temperature;
      descriptionElement.textContent = description;
      humidityElement.textContent = humidity;
      windSpeedElement.textContent = windSpeed;
      iconElement.src = icon;
      
      // bodyElement.style.backgroundImage = `url('https://source.unsplash.com/1920x1080/?${name}')`;
    }

    function handleSubmit() {
      const city = cityInput.value.trim();

      if (city !== '') {
        const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

        fetch(apiURL)
          .then(response => response.json())
          .then(data => displayWeatherData(data))
          .catch(error => {
            console.log('An error occurred:', error);
            displayErrorMessage('Invalid City Entered');
          });
      }
    }

    submitBtn.addEventListener('click', handleSubmit);
    cityInput.addEventListener('keydown', event => {
      if (event.keyCode === 13) {
        handleSubmit();
      }
    });
