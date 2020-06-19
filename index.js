const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

// tell it to use the public directory as one where static files live
app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


app.get('/', (req, res) => res.render('pages/index'));

app.get('/calc', getPrice);

// start the server listening
app.listen(port, function() {
  console.log('Node app is running on port', port);
});
    
  /**********************************************************************
   * Ideally the functions below here would go into a different file
   * but for ease of reading this example and seeing all of the pieces
   * they are listed here.
   **********************************************************************/
  function getPrice(req, res) {
    const weight = Number(req.query.weight); 
    const type = req.query.type;

    calcPrice(res, weight, type);
  }

  function calcPrice(response, weight, type) {
  
    let price = 0;

    switch(type) {
      case 'Letters (Stamped)':
        if (weight <= 1) {
          price = 0.55;
        } 
        else if (weight <= 2){
          price = 0.70;
        }
        else if (weight <= 3){
          price = 0.85;
        }
        else if (weight <= 3.5){
          price = 1.00;
        }
        else {
         response.render('pages/error');
        }
       
        break;
      case 'Letters (Metered)':
        if (weight <= 1) {
          price = 0.50;
        } 
        else if (weight <= 2){
          price = 0.65;
        }
        else if (weight <= 3){
          price = 0.80;
        }
        else if (weight <= 3.5){
          price = 0.95;
        }
        else {
          response.render('pages/error');
        }
       
        break;
      case 'Large Envelopes (Flats)':
        if (weight <= 1) {
          price = 1.00;
        } 
        else if (weight <= 2){
          price = 1.20;
        }
        else if (weight <= 3){
          price = 1.40;
        }
        else if (weight <= 4){
          price = 1.60;
        }
        else if (weight <= 5){
          price = 1.80;
        }
        else if (weight <= 6){
          price = 2.00;
        }
        else if (weight <= 7){
          price = 2.20;
        }
        else if (weight <= 8){
          price = 2.40;
        }
        else if (weight <= 9){
          price = 2.60;
        }
        else if (weight <= 10){
          price = 2.80;
        }
        else if (weight <= 11){
          price = 3.00;
        }
        else if (weight <= 12){
          price = 3.20;
        }
        else if (weight <= 13){
          price = 3.40;
        }
        else {
          response.render('pages/error');
        }
        
          break;
        case 'First-Class Package Service—Retail':
          if (weight <= 4) {
            price = 3.80;
          } 
          else if (weight <= 8){
            price = 4.60;
          }
          else if (weight <= 3){
            price = 1.40;
          }
          else if (weight <= 12){
            price = 5.30;
          }
          else if (weight <= 13){
            price = 5.90;
          }
          else {
            response.render('pages/error');
          }
        break;  
    } 

    ///Change price to show two decimal
    var total = price.toFixed(2);
    const params = {weight: weight, type: type, price: total};
    response.render('pages/result', params);

  }




  