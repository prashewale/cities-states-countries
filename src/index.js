import express, { json } from "express";
import cors from 'cors';
import countries from "./data/countries.json" with { type: "json" };
import states from './data/states.json' with {type : 'json'};


const app = express();

const PORT = 3000;


var corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));

app.use(express.json());

app.get("/countries", (req, res) => {
  res.send(countries.map((country) => {
    return {name: country.name, id: country.id};
  }));
});

app.get("/states", (req, res) => {

  const countryIdStr = req.query.country_id;

  if(!countryIdStr) {
    res.status(400).send({message: "country_id is required"});
    return;
  }

  if(isNaN(countryIdStr)) {
    res.status(400).send({message: "country_id must be a number"});
    return;
  }

  const countryId = Number(countryIdStr);

  const filteredStates = states.filter((state) => state.country_id === countryId);

  res.send(filteredStates.map((state) => ({id: state.id, name: state.name})));
  
});

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
