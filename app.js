const figlet = require("figlet");
const axios = require("axios");

require("dotenv").config();

const { startApp } = require("./scrape");

const app = () => {
  console.log(figlet.textSync("#SaveOVO", { font: "banner3" }));
  const { SLACK_WEBHOOK_URL } = process.env;
  if (SLACK_WEBHOOK_URL) {
    axios.post(
      SLACK_WEBHOOK_URL,
      { text: "#SaveOVO app started " + new Date() },
      {
        headers: {
          "Content-type": "application/json",
        },
      }
    );
  }
  startApp()
  setInterval(startApp, 60000);
};

app();
