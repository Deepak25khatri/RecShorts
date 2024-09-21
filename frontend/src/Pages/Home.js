import React, { useEffect, useState } from "react";
import { defaultImage, getTodayNews } from "../Services/news.serv";
import {
  Tabs,
  Tab,
  Box,
  Card,
  CardContent,
  Typography,
  Link,
  CardMedia,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { formatDistanceToNow } from "date-fns";
import Footer from "../Components/Footer";

export default function Home() {
  const [allNews, setAllnews] = useState([]);
  const navigate = useNavigate();

  // State to track the selected tab
  const [selectedTab, setSelectedTab] = useState("");
  const defaultImgUrl = defaultImage;

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  useEffect(() => {
    getTodayNews()
      .then((resp) => {
        console.log(resp);
        setAllnews(resp);
        setSelectedTab(resp[0].category_name);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleReadMore = (newsItem, index) => {
    navigate(`/${newsItem.id}`, { state: { news: newsItem } });
  };

  return (
    <div className=" h-[100vh] overflow-hidden">
      <Navbar />
      {allNews && (
        <Box sx={{ width: "100%" }}>
          <Tabs
            value={selectedTab}
            onChange={handleChange}
            aria-label="news categories"
            variant="scrollable" // Enables horizontal scrolling
            sx={{
              backgroundColor: "#3371D1",
              color: "white",
              "& .Mui-selected": {
                backgroundColor: "white",
                color: "#3371D1",
                borderRadius: "10px 10px 0 0", // Rounded corners on top
              },
              "& .MuiTabs-flexContainer": {
                borderBottom: 0, // Removes bottom border if present
              },

              marginBottom: 0, // Sets bottom margin to 0
            }}
          >
            {allNews.map((item, index) => (
              <Tab
                key={index}
                label={item.category_name}
                value={item.category_name}
              />
            ))}
          </Tabs>

          <Box
            sx={{
              padding: 3,
              height: "90vh",
              overflowY: "scroll",
              scrollbarWidth: "none", // For Firefox
              msOverflowStyle: "none", // For IE 10+ and Edge
              "&::-webkit-scrollbar": {
                display: "none", // For Chrome, Safari, and newer versions of Edge
              },
            }}
          >
            {allNews
              .filter((item) => item.category_name === selectedTab)
              .map((item) =>
                item.news.map((newsItem, index) => (
                  <Card
                    key={index}
                    sx={{
                      display: "flex",
                      marginBottom: 2,
                      flexDirection: { xs: "column", sm: "row" },
                      position: "relative", // added to position the date absolutely within the card
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={{
                        width: { sm: 160 },
                        height: { sm: 90 },
                        objectFit: "cover",
                      }}
                      image={newsItem["Media URL"] ?? defaultImgUrl}
                      alt="news image"
                    />
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        flexGrow: 1,
                      }}
                    >
                      <CardContent>
                        <Typography variant="h5">{newsItem.Title}</Typography>
                        <Link
                          component="button"
                          onClick={() => handleReadMore(newsItem, index)}
                          variant="body2"
                        >
                          Read more
                        </Link>
                      </CardContent>
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{
                        position: "absolute",
                        right: 8,
                        bottom: 8,
                        color: "text.secondary",
                      }}
                    >
                      {formatDistanceToNow(
                        new Date(newsItem["Publication Date"]),
                        {
                          addSuffix: true,
                        }
                      )}
                    </Typography>
                  </Card>
                ))
              )}
            <p className=" h-36">{}</p>
          </Box>
        </Box>
      )}
      <Footer />
    </div>
  );
}
