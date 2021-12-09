const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const { fetchGraphQL, scrapeItemFeatures } = require('./utils/helperFunctions');
const { CREATE_ITEM } = require('./utils/schemas');

app.use(bodyParser.json());
app.use(cors());

app.post('/scrape_item', async (req, res) => {
  // console.log(process.env.HASURA_ADMIN_SECRET)
  const input = req.body.input;
  const features = await scrapeItemFeatures(input.item_name)
  const createItemRes = await fetchGraphQL(CREATE_ITEM, {
    "list_id": "5b05ede3-8cb8-4ec3-b83f-4cd3fa22babe",
    "image_url": features.image_url,
    "item_url": features.item_url,
    "name": input.item_name,
    "price": features.price
  })
  console.log(createItemRes)

  res.json({
    "item_id": createItemRes.data.insert_item.returning[0].id
  })
  // res.send(200)
});

// start the server
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}...`));