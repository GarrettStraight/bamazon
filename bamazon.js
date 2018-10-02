var inquirer = require("inquirer");
var mysql = require("mysql");
var inventory;
require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon"
});

connection.connect(function(err){
  if (err) throw err; 
    console.log("connected")
    readItems()

})


function start() {
  console.log("======")
  inquirer
    .prompt([
      {
      name: "idNum",
      type: "input",
      message: " Whats the ID# of the product you would like to purchase?"
     },
      {
      name: "quantity",
      type: "input",
      message: "How many would you like to purchase?"
      }
    ])
    .then(function(answer) {
      // based on their answer, either call the bid or the post functions
      // console.log(answer.idNum)
      var chooseinv = inventory[answer.idNum -1].stock_quantity;
      // console.log(chooseinv);
      if (chooseinv >= answer.quantity) {
        connection.query(
          "UPDATE products SET ? WHERE ?",
          [
            {
              stock_quantity: chooseinv - answer.quantity
            },
            {
              id: answer.idNum
            }
          ],
          function(error) {
            if (error) throw err;
            console.log("You bought " + answer.quantity + " " + inventory[answer.idNum -1].product_name);
            //start();
            keepShopping();
           
          }
        );
      }else {
        console.log("There are not that many items in stock! Please try again.");
        start();
      }
      
    });
    
}

function keepShopping () {
  inquirer
  .prompt([
    {
    name: "confirm",
    type: "confirm",
    message: " Would you like to kepp shopping?"
   }
  ]).then(function(answers){
      //console.log(answers)
      if (answers.confirm){
        readItems()
      }else {
        return console.log("Thank you for shopping");
      }
  });
};





function readItems() {
    console.log("Selecting all Items...\n");
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      inventory = res;
      // console.log(inventory);
      // for (var i = 0; i < inventory.length; i++) {

      //   console.log(inventory[i].id + ": " + inventory[i].product_name);
      // }
      console.table(inventory);
      start();
    });

  }

  // readItems();
  
