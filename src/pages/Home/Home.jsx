import React, { useEffect, useState } from "react";
import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import play_icon from "../../assets/play_icon.png";
import info_icon from "../../assets/info_icon.png";
import TitleCards from "../../components/TitleCards/TitleCards";
import { Link } from "react-router-dom";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const Home = () => {
  const [heroMovie, setHeroMovie] = useState(null);
  const truncate = (str, n) =>
    str?.length > n ? str.substr(0, n - 1) + "..." : str;

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/trending/all/week?api_key=${API_KEY}`
        );
        const data = await res.json();
        const results = data.results;
        if (results.length > 0) {
          const movie = results[0];
          setHeroMovie(movie);
        }
      } catch (err) {
        console.log("Error fetching trending:", err);
      }
    };
    fetchTrending();
  }, []);
  console.log("Trending", heroMovie);
  return (
    <div className="home">
      <Navbar />
      {heroMovie && (
        <div className="hero">
          <img
            src={
              heroMovie.backdrop_path
                ? `https://image.tmdb.org/t/p/original${heroMovie.backdrop_path}`
                : hero_banner
            }
            alt={heroMovie.title || heroMovie.name}
            className="banner-img"
          />
          <div className="hero-caption">
            <h1>{heroMovie.title || heroMovie.name}</h1>
            <p>{truncate(heroMovie.overview, 150)}</p>
            <div className="hero-btns">
              <Link to={`/player/${heroMovie.id}`}>
                <button className="btn">
                  <img src={play_icon} alt="" />
                  Play
                </button>
              </Link>
              <Link to={`/movies/${heroMovie.id}`}>
                <button className="btn dark-btn">
                  <img src={info_icon} alt="" />
                  More Info
                </button>
              </Link>
            </div>
            <TitleCards title="Popular on Netflix" />
          </div>
        </div>
      )}

      <div className="more-cards">
        <TitleCards title="Blockbusters" category={"top_rated"} />
        <TitleCards title="Only On Netflix" category={"popular"} />
        <TitleCards title="Upcoming" category={"upcoming"} />
        <TitleCards title="Top Picks for You" category={"now_playing"} />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
