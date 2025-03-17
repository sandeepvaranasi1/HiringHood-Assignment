import axios from "axios";
import asyncHandler from "express-async-handler";

// @desc    Get weather data for a city
// @route   GET /api/weather/:city
// @access  Public
const getWeather = asyncHandler(async (req, res) => {
  const { city } = req.params;

  if (!city) {
    res.status(400);
    throw new Error("Please provide a city name");
  }

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=metric`
    );

    res.status(200).json(response.data);
  } catch (error) {
    res.status(404);
    throw new Error("City not found or weather data unavailable");
  }
});

export { getWeather };
