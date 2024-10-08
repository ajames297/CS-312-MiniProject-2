import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/"
  , (req, res) => {
      res.render("index.ejs");
  });

app.post("/", async (req, res) => {
    try {
      console.log(req.body);
      const personsName = req.body.personsName;
      let str = personsName;
      const response = await axios.get(
       `https://v2.jokeapi.dev/joke/Any?idRange=${str.length}`
    );
      const result = response.data;
      console.log(result);
      res.render("index.ejs", { data: result });
    } catch (error) {
      console.error("Failed to make request:", error.message);
      res.render("solution.ejs", {
        error: "No activities that match your criteria.",
      });
    }
  });

  app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });