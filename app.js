const express = require("express"); //install on node
const https = require("https"); // dont need to insall as its native
const app = express();
const bodyParser = require("body-parser"); //install = npm i bady-parser
app.use(express.static("public"))
var items =["Buy milk", "Get laundry done", "Feed the dog"];
var workItems = "";
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine', 'ejs');

app.get("/", function(req, res) {

  var today = new Date();

  var options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  var day = today.toLocaleDateString("en-US", options);

   res.render("list", {listTitle: day, newListItem: items})

})

app.post("/", function(req,res){

   var item = req.body.newItem;

   if(req.body.list === "work") {
     workItems.push(item);
     res.redirect("/work");
   } else{
     items.push(item);
     res.redirect("/");
   }




})

app.get("/work", function(req,res){
  res.render("list", {listTitle:"Work List", newListItem: workItems });
});

// app.post("/work", function(req,res){
//   let item = req.body.newItem;
//   workItems.push(item);
//   res.redirect("/work");
// })

app.get("/about", function(req,res){
  res.render("about");
})
app.listen(3000, function() {
  console.log("server is running on port 3000");
})
