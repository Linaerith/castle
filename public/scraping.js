const request = require('request');
const cheerio = require('cheerio');

request('https://www.relaischateaux.com/us/destinations/europe/france', (error, response, html)=> {
  if(!error && response.statusCode == 200) {
    const $ = cheerio.load(html);
    const siteResult = $ ('.overmapWrap');

    //console.log(siteResult.html());
    const output = siteResult.find('script').html();
    console.log(output.markers);
  }
})
