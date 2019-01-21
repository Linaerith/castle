const rp = require('request-promise');
const $ = require('cheerio');
const url = 'https://www.relaischateaux.com/us/destinations/europe/france';


rp(url)
  .then(function(html){
    //success!
    const wikiUrls = [];
    for (let i = 0; i < 150; i++) {
      wikiUrls.push($('#destinationResults > div:nth-child(3) > div > div:nth-child(1) > div > div > div > div.slick-slide.slick-active > div > span', html)[i].attribs.href);
    }
    console.log(wikiUrls);
  })
  .catch(function(err){
    //handle error
  });
