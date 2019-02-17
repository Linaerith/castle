const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');


const hotelFile = "C:/Users/grond/Desktop/ESILV/S8/WAA/Workshop3/castle/public/fileRelaisHotel.json";
const chefFile = "C:/Users/grond/Desktop/ESILV/S8/WAA/Workshop3/castle/public/fileChefs.json";

const writeStream = fs.createWriteStream('finalList.csv');
writeStream.write(`HotelName; HotelChef; HotelUrl; RestaurantName; RestaurantPriceRange; RestauChef\n`);

// Get content from file
 var hotelContent = fs.readFileSync(hotelFile);
// Define to JSON type
 var jsonHotelContent = JSON.parse(hotelContent);


 // Get content from file
  var chefContent = fs.readFileSync(chefFile);
 // Define to JSON type
  var jsonChefContent = JSON.parse(chefContent);


jsonHotelContent.forEach( hotel =>
{
  jsonChefContent.forEach( chef =>
  {
    if(hotel.CodePostal.match(chef.PostalCode) && chef.Chef.match(hotel.Chef)){
      console.log(hotel.Hotel);

      writeStream.write(`${hotel.Hotel}; ${hotel.Chef}; ${hotel.Url}; ${chef.Restaurant}; ${chef.PriceRange}; ${chef.Chef}\n`);
    }
  });
});
