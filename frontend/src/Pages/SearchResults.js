import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Link,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { defaultImage, getSearchResults } from "../Services/news.serv";
import Footer from "../Components/Footer";

export default function SearchResults() {
  const [results, setResults] = useState([]);
  const defaultImgUrl = defaultImage;

  const location = useLocation();
  const q = location?.state?.query ?? "";
  console.log(q);
  useEffect(() => {
    window.scrollTo(0, 0);
    if (q) {
      getSearchResults(q)
        .then((resp) => {
          setResults(resp);
          console.log(resp);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // Optionally, handle the case where there is no query.
      console.log("No query provided");
    }
  }, [q]); // Add q as a dependency here

  const navigate = useNavigate();

  const goBack = () => {
    navigate("/");
  };
  const handleReadMore = (newsItem, index) => {
    navigate(`/${newsItem.id}`, { state: { news: newsItem } });
  };

  return (
    <div className=" h-[100vh] overflow-hidden">
      <Navbar />
      <Box
        sx={{
          maxWidth: 800,
          m: "auto",
          overflowY: "auto",
          scrollbarWidth: "none", // For Firefox
          msOverflowStyle: "none", // For IE 10+ and Edge
          "&::-webkit-scrollbar": {
            display: "none", // For Chrome, Safari, and newer versions of Edge
          },
          height: "calc(100vh - 100px)",
        }}
      >
        {" "}
        <Button startIcon={<ArrowBackIcon />} onClick={goBack} sx={{ my: 2 }}>
          Back
        </Button>
        <Typography variant="h5" sx={{mx:{xs:4, md:4},mt:1, mb:1}}>
          Search results for : <span className=" text-blue-500">"{q}"</span>
        </Typography>
        {results.length > 0 && (
          <>
            {results.map((currNews, index) => (
              <Card key={index} sx={{ mx: 4, mb: 4 }}>
                <CardMedia
                  component="img"
                  image={currNews["Media URL"] ?? defaultImgUrl}
                  alt="news image"
                  sx={{ height: 300, objectFit: "cover" }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {currNews.Title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {currNews.New_description}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 2 }}
                  >
                    Publication Date: {currNews["Publication Date"]}
                  </Typography>
                  <Link
                    component="button"
                    onClick={() => handleReadMore(currNews, index)}
                    variant="body2"
                  >
                    Read more
                  </Link>
                </CardContent>
              </Card>
            ))}
          </>
        )}
      </Box>

      {results.length === 0 && (
        <p>
          No news found for the given search term. Please try again with a
          different search term.
        </p>
      )}

      <Footer/>
    </div>
  );
}
