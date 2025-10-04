async function getWeather() {
    const location = document.getElementById("locationInput").value.trim();
    const weatherResult = document.getElementById("weatherResult");
    const errorMessage = document.getElementById("errorMessage");

    if (location === "") {
        alert("Please enter a location!");
        return;
    }

    const apiKey = "fc6006928a234f5dbd2155908251609";
    const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.error) {
            errorMessage.classList.remove("hidden");
            weatherResult.classList.add("hidden");
        } else {
            const cityName = data.location.name;
            const temperature = data.current.temp_c;  // Temperature in Celsius
            const condition = data.current.condition.text;

            document.getElementById("cityName").innerText = cityName;
            document.getElementById("temperature").innerText = `${temperature}°C`;
            document.getElementById("condition").innerText = condition;

            errorMessage.classList.add("hidden");
            weatherResult.classList.remove("hidden");
        }
    } catch (error) {
        errorMessage.classList.remove("hidden");
        weatherResult.classList.add("hidden");
        console.error("Error fetching weather data:", error);
    }
}
