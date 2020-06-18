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

// set up a rule that says requests to "/math" should be handled by the
// handleMath function below
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
          price = 'N/A';
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
          price = 'N/A';
        }
       
        break;
      case 'Large Envelopes (Flats)':
        switch(weight) {
          case 1:
            price = 1.00;
            break;
          case 2:
            price = 1.20;
            break;  
          case 3:
            price = 1.40;
            break; 
          case 4:
            price = 1.60;
            break;   
          case 5:
            price = 1.80;
            break;
          case 6:
            price = 2.00;
            break; 
          case 7:
            price = 2.20;
            break;  
          case 8:
            price = 2.40;
            break;    
          case 9:
            price = 2.60;
            break;  
          case 10:
            price = 2.80;
            break;
          case 11:
            price = 3.00;
            break; 
          case 12:
            price = 3.20;
            break;
          case 13:
            price = 3.40;
            break;         
        }
          break;
        case 'First-Class Package Service—Retail':
        // code block
        break;  
      default:
        // code block
    } 

    const params = {weight: weight, type: type, price: price};
    response.render('pages/result', params);

  }




  