//require imports
const { request, response } = require("express");
const express = require("express");
const path = require("path");
const { MongoClient } = require("mongodb");

//mongo configues
const dburl = "mongodb+srv://nencymodi:qRiD26g.uGS!EA.@cluster0.hrypivd.mongodb.net/weddingdb?retryWrites=true&w=majority";
const client = new MongoClient(dburl);
//set up connection 
const app = express();
const port = process.env.PORT || 8888;

//set up static file paths
app.use(express.static(path.join(__dirname,"public")));

//set up template engine
app.set("views", path.join(__dirname,"views"));
app.set("view engine","pug");

//page route
app.get("/", async (request, response)=>{
  response.render("index",{title: "Home"});
});
app.get("/wed-page", async (request, response)=>{
  var data = await getData();
  response.render("wedding-category",{title: "wedding category", MainData : data});
});
app.get("/portfolio", async (request, response)=>{
  var portdata = await getPortData();
  response.render("portfolio",{title: "Portfolio", PortData : portdata});
});
app.get("/Contact-us", async (request, response)=>{
  var data = await getData();
  response.render("contact-us",{title: "Contact Us", MainData : data});
});

//listening to port
app.listen(port, () => {
  console.log(`listing on http://localhost:${port}`);
});
//mongo functions
//function to connect to database
async function connection(){
  await client.connect();
  db = client.db("weddingdb");
  return db;
}
/**function to select all data */
async function getData(){
  db = await connection();
  var results = db.collection("weddingCategory").find({});
  res = await results.toArray();//convert to an array
  return res;
}
async function getPortData(){
  db = await connection();
  var results = db.collection("poertfolio").find({});
  res = await results.toArray();//convert to an array
  return res;
}