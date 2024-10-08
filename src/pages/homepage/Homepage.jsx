import React, { useState, useEffect } from "react";
import styles from "./Homepage.module.css";
import { fetchWeatherData } from "../../apis/weather";
import { fetchNewsData } from "../../apis/news";
import UserWidget from "../../components/UserWidget";
import WeatherWidget from "../../components/WeatherWidget";
import NewsWidget from "../../components/NewsWidget";
import { useNavigate } from "react-router-dom";

function Homepage() {
	const [user, setUser] = useState();
	const [selectedGenres, setSelectedGenres] = useState();
	const [weather, setWeather] = useState();
	const [news, setNews] = useState();
	const navigate = useNavigate();

	useEffect(() => {
		setUser(JSON.parse(localStorage.getItem("currentUser")));
		setSelectedGenres(JSON.parse(localStorage.getItem("selectedGenres")));
		fetchWeatherData().then((data) => {
			setWeather(data);
		});
		fetchNewsData().then((data) => {
			console.log("fetch news data", data);
			setNews(data);
		});
	}, []);

	 // Function to navigate to Dashboard
	 const goToDashboard = () => {
		navigate("/dashboard");
	  };

	return (
		<div className={styles.page}>
			<div className={styles.left}>
				{user && <UserWidget user={user} selectedGenres={selectedGenres} />}
				{weather && <WeatherWidget weather={weather} />}
			</div>
			<div className={styles.right}>{news && <NewsWidget news={news} />}</div>
			<button className={styles.nextButton} onClick={goToDashboard}>
          Next
        </button>
		</div>
	);
}

export default Homepage;