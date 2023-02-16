const express = require('express');
const app = express();
app.use(express.json());

// cors plolicy
var cors = require('cors');
app.use(cors());


const pharmaOneMg = require('./onemg');


app.post("/api", async (req, res) => {
   const {search}  = req.body;
   if (!search) {
     return res.status(400).send({ error: 'The "search" parameter is required.' });
   }

   try {
    const start = Date.now();
    const json = await pharmaOneMg.getOneMg(search);
    console.log('Took', Date.now() - start, 'ms');
    res.send(json);


//
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'An error occurred while scraping the website.' });
  }
});

app.listen(process.env.PORT || 3002, () => {
  console.log("Server started");
});

module.exports = app;
