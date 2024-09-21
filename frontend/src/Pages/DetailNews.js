import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import {getRecommendationsResults } from "../Services/news.serv";
import { Box, Button, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import RecommendationsScroll from "../Components/RecommendationsScroll";
import NewsCard from "../Components/NewsCard";
import Footer from "../Components/Footer";

const DetailNews = () => {
  const [newsDetail, setNewsDetail] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const newsId = location.state.news.id;
    setNewsDetail(location.state.news)

    window.scrollTo(0, 0);

    getRecommendationsResults(newsId)
      .then(resp=>{
        console.log(resp);
        setRecommendations(resp)
      })
      .catch(console.error); // More robust error handling recommended
  }, [location.state.news]);

  const goBack = () => navigate("/");

  return (
    <div className="detail-news-container">
      <Navbar />
      <NewsDetail news={newsDetail} goBack={goBack} />
      <Recommendations recommendations={recommendations} />
      <Footer/>
    </div>
  );
};

const NewsDetail = ({ news, goBack }) => (
  <Box className="news-detail">
    <Button startIcon={<ArrowBackIcon />} onClick={goBack}>
      Back
    </Button>
    <NewsCard news={news} />
  </Box>
);

const Recommendations = ({ recommendations }) => (
  <Box className="recommendations">
    {recommendations.length > 0 && (
      <Typography variant="h5" sx={{mx:{xs:4, md:12},mt:6}}>More Like This</Typography>
    )}
    <RecommendationsScroll recommendations={recommendations} />
  </Box>
);

export default DetailNews;

