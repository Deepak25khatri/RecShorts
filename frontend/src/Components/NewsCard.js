import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { defaultImage } from '../Services/news.serv';
import {format, formatDuration} from 'date-fns'

const NewsCard = ({ news }) => {
  const defaultImgUrl = defaultImage

  return (
    <Card sx={{ maxWidth: 800, mx: { xs: 4, md: 'auto' } }}>
      <CardMedia
        component="img"
        image={news["Media URL"] ?? defaultImgUrl}
        alt="news image"
        sx={{ height: 300, objectFit: 'contain' }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {news.Title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {news.New_description}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Publication Date: {new Date(news["Publication Date"]).toLocaleDateString()}
        </Typography>
        <Button
          // component="a"
          href={news.Link}
          target="_blank"
          rel="noopener noreferrer"
          // sx={{ mt: 2 }}
        >
          Read More
        </Button>
      </CardContent>
    </Card>
  );
};

export default NewsCard;
