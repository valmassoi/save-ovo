const axios = require("axios");
const cheerio = require("cheerio");
const notifier = require("node-notifier");

require("colors")

const url = 'https://travel.state.gov/content/travel/en/News/visas-news/updates-to-national-interest-exceptions-for-regional-covid-proclamations.html'

const notify = (updatedDate) => {
  const title = "#SaveOVO";
  const subtitle = "Updated!!!";
  const message = updatedDate;

  notifier.notify({
    title,
    subtitle,
    message,
    open: url,
    timeout: 1000000,
    sound: true,
  });

  const { SLACK_WEBHOOK_URL } = process.env;
  if (SLACK_WEBHOOK_URL) {
    axios.post(
      SLACK_WEBHOOK_URL,
      { text: `${title}: ${subtitle} ${message}\n\n${url}` },
      {
        headers: {
          "Content-type": "application/json",
        },
      }
    );
  }
};

const lookForUpdatedDate = (html) => {
  const $ = cheerio.load(html);
  const $updatedDateText = $(".custom_dateselect").text();
  if (!$updatedDateText || $updatedDateText.length === 0) {
    console.error("Error: Couldn't find last updated date parsing html");
  }

  const startIndex = $updatedDateText.indexOf('Last Updated: ')
  const updatedDate = $updatedDateText.substr(startIndex + 14, 13)

  return updatedDate;
};

const startApp = () => {
    console.log(new Date());
    axios
        .get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } })
        .then(res => {
            const updatedDate = lookForUpdatedDate(res.data);
            if (updatedDate === 'April 8, 2021') {
              console.log('Not updated yet - still April 8, 2021')
            } else {
              console.log('updated!!!')
              notify(updatedDate);
            }
        })
        .catch(error => {
            console.log(error);
        });
}

module.exports = {
  startApp,
  lookForUpdatedDate,
};
