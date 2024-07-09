import express from 'express';
import bodyParser from 'body-parser'
import pg from 'pg';

const app=new express();
const port=3000;

const db=new pg.Client({
    user:"postgres",
    host:"localhost",
    database:"toDoList",
    password:"Guddu0@123",
    port:5432
});
db.connect();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

var items=["chirag","goyal"];

app.get("/",async(req,res)=>{
    const result=await db.query("SELECT * FROM List");
    const items=result.rows;
    res.render("index.ejs",{
        title:"Today",
        listItems:items,
    });
});

app.post("/add",async(req,res)=>{
    const name=req.body.newItem;
    await db.query("INSERT INTO List (title) VALUES ($1)",[name]);
    res.redirect("/");
});

  app.post("/delete", async (req, res) => {
    const id = req.body.deleteItemId;
    try {
      await db.query("DELETE FROM List WHERE id = $1", [id]);
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  });

app.listen(port,()=>{
    console.log("server is listening");
})