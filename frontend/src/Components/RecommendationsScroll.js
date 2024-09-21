import React from 'react';
import { Box, Card, CardContent, CardMedia, Typography, IconButton, Link } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { defaultImage } from '../Services/news.serv';
import { useNavigate } from 'react-router-dom';

const RecommendationsScroll = ({ recommendations }) => {
  const defaultImgUrl = defaultImage
  console.log(recommendations);

  const navigate = useNavigate();

  const handleScroll = (direction) => {
    const container = document.getElementById('scrollContainer');
    const scrollAmount = 300;
    if (direction === 'left') {
      container.scrollLeft -= scrollAmount;
    } else {
      container.scrollLeft += scrollAmount;
    }
  };

  const handleReadMore = (newsItem, index) => {
    navigate(`/${newsItem.id}`, { state: { news: newsItem } });
  };

  return (

    recommendations.length>0 && <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <IconButton onClick={() => handleScroll('left')}>
        <ArrowBackIosIcon />
      </IconButton>
      <Box
        id="scrollContainer"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          padding: 3,
          // height: '80vh',
          overflowX: 'auto',
          overflowY: 'hidden',
          flexGrow: 1,
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          "&::-webkit-scrollbar": {
            display: 'none',
          },
          scrollBehavior: 'smooth',
        }}
      >
        {recommendations.map((newsItem, index) => (
          <Card
            key={index}
            sx={{
              mx: 4,
              minWidth: 300,
              maxHeight:350,
              mb: 8,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <CardMedia
              component="img"
              image={newsItem["Media URL"] ?? defaultImgUrl}
              alt="news image"
              sx={{ height: 200, objectFit: 'cover', minHeight: 200, maxHeight: 200 }}
            />
            <CardContent
              sx={{
                mt: 2,
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <Typography variant="h6" component="div">
                {newsItem.Title.substring(0,60)} <Link onClick={() => handleReadMore(newsItem, index)} > Read More</Link>
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
      <IconButton onClick={() => handleScroll('right')}>
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  );
};

export default RecommendationsScroll;
