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
app.get('/calcJSON', getPriceJSON);

// start the server listening
app.listen(port, function() {
  console.log('Node app is running on port', port);
});
    
  /**********************************************************************
   * Functions
   **********************************************************************/
  function getPrice(req, res) {
    const weight = Number(req.query.weight); 
    const type = req.query.type;
    const button = 0;

    calcPrice(res, weight, type, button);
  }

  function getPriceJSON(req, res) {
    const weight = Number(req.query.weight); 
    const type = req.query.type;
    const button = 1;

    calcPrice(res, weight, type, button);
  }


  function calcPrice(response, weight, type, button) {
  
    let price = 0;
    let error = 0;

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
         error = 1;
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
          error = 1;
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
          error = 1;
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
            error = 1;
          }
        break;  
    } 

    ///Change price to show two decimal
    var total = price.toFixed(2);
    const params = {weight: weight, type: type, price: total};
    const errorJ = {error: "Not a valid weight for this package type"};

  if(button === 1 && error === 0) {
      response.setHeader('Content-Type', 'application/json');
      response.end(JSON.stringify(params));
  } else if(button === 0 && error === 0) {
      response.setHeader('Content-Type', 'text/html');
      response.render("pages/result", params);
  } else if(button === 1 && error === 1) {
      response.setHeader('Content-Type', 'application/json');
      response.end(JSON.stringify(errorJ));

  } else {
    response.setHeader('Content-Type', 'text/html');
    response.render('pages/error');
  } 



   // response.render('pages/result', params);

  }






  