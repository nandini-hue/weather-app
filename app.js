async function getWeather() {
    const location = document.getElementById("locationInput").value.trim();
    const weatherResult = document.getElementById("weatherResult");
    const errorMessage = document.getElementById("errorMessage");

    if (location === "") {
        alert("Please enter a location!");
        return;
    }

    const apiUrl = `/api/weather?location=${encodeURIComponent(location)}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.error) {
            errorMessage.classList.remove("hidden");
            weatherResult.classList.add("hidden");
        } else {
            const cityName = data.location.name;
            const temperature = data.current.temp_c;
            const condition = data.current.condition.text;

            document.getElementById("cityName").innerText = cityName;
            document.getElementById("temperature").innerText = `${temperature}°C`;
            document.getElementById("condition").innerText = condition;

            errorMessage.classList.add("hidden");
            weatherResult.classList.remove("hidden");
        }
    } catch (error) {
        console.error("Fetch error:", error);
        errorMessage.classList.remove("hidden");
        weatherResult.classList.add("hidden");
    }
}
