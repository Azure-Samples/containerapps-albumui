const express = require("express");
const router = express.Router();
require("dotenv").config();
const axios = require("axios");
const background = process.env.BACKGROUND_COLOR;

function getBaseUrl() {
  let url = process.env.API_BASE_URL;

  if(!/^https:\/\//.test(url)) {
    url = url.replace('http://', ''); // remove unsecured protocol, if exists
    url = `https://${url}`;
  }
  
  return url;
}

const api = axios.create({
  baseURL: process.env.API_BASE_URL,
  params: {},
  timeout: process.env.TIMEOUT || 5000,
});

/* GET home page. */
router.get("/", async function (req, res, next) {
  try {
    console.log("Sending request to backend albums api");
    var data = await api.get("/albums");
    console.log("Response from backend albums api: ", data.data);
    res.render("index", {
      albums: data.data,
      background_color: background,
    });
  } catch (err) {
    console.log("Error: ", err);
    next(err);
  }
});

module.exports = router;
