import axios from "axios";
const endpoint = "https://recshorts.el.r.appspot.com";
// const endpoint = "https://nirmalshah20519.pythonanywhere.com";

export const getTodayNews = async () => {
  return axios
    .get(endpoint + `/getall`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const getSearchResults = async (q) => {
  console.log(endpoint);
  return axios
    .get(endpoint + `/search?query=${q}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const getRecommendationsResults = async (q) => {
  return axios
    .get(endpoint + `/recommend?query=${q}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const defaultImage =
  "https://res.cloudinary.com/medico-cloud/image/upload/v1720603121/RecShorts/Black_White_Illustrative_Modern_Camera_Studio_Icon_Logo_luu7ko.png";
