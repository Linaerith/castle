const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const writeStream = fs.createWriteStream('output.js');

request('https://www.relaischateaux.com/us/destinations/europe/france', (error, response, html)=> {
  if(!error && response.statusCode == 200) {
    const $ = cheerio.load(html);
    const siteResult = $ ('.overmapWrap');

    //console.log(siteResult.html());
    const output = siteResult.find('script').html();
    //console.log(output);
  }
})

request('https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin', (error, response, html)=> {
  if(!error && response.statusCode == 200) {
    const $ = cheerio.load(html);
    const siteResult = $ ('.poi-search-result');

    //console.log(siteResult.html());
    const output = siteResult.text();
    console.log(output);
  }
})

/*function Payment()
{
  for(const act of actors){
    let evt = getEvent(act.eventId);
    for(const pay of act.payment){
      if(pay.who === 'booker'){
        pay.amount = evt.price;
      }
      if(pay.who === 'insurance'){
        pay.amount = evt.commission.insurance;
      }
      if(pay.who === 'treasury'){
        pay.amount = evt.commission.treasury;
      }
      if(pay.who === 'privateaser'){
        pay.amount = evt.commission.privateaser;
      }
    }
  }
};*/
