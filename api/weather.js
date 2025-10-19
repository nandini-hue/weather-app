export default async function handler(req, res) {
    const apiKey = process.env.WEATHER_API_KEY;
    const { location } = req.query;

    if (!location) {
        return res.status(400).json({ error: "Location is required." });
    }

    try {
        const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        res.status(200).json(data);
    } catch (error) {
        console.error("Weather API fetch failed:", error);
        res.status(500).json({ error: "Failed to fetch weather data." });
    }
}
