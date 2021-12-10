const fetch = require('node-fetch');
const cheerio = require('cheerio');

const fetchGraphQL = async (schema, variables = {}) => {
  const graphql = JSON.stringify({
    query: schema,
    variables,
  });
  const requestOptions = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET,
    },
    body: graphql,
  };
  const database_url = 'https://givespace.hasura.app/v1/graphql';
  const res = await fetch(database_url, requestOptions)
    .then((res) => res.json())
    .catch((err) => console.log(err));

  return res;
};

const scrapeItemFeatures = async (name) => {
  const formattedItem = encodeURIComponent(name).replace(/%20/g, '+');
  const URL = `https://www.amazon.com/s?k=${formattedItem}&ref=nb_sb_noss_2`
  const amazon_res = await fetch(URL);
  const html = await amazon_res.text();
  console.log(html.length)
  const $ = cheerio.load(html);
  const head = $('.s-asin')
  let features
  head.each((i,item) => {
    const isSponsored = $(item).find('.s-label-popover-default').length > 0;
    if (!isSponsored && !features) {
      const img = $(item).find('.s-image').attr('src');
      const itemName = $(item).find('h2 span').text()
      const price = parseFloat($(item).find('.a-price-whole').text())
      const itemURL = `https://www.amazon.com${$(item).find('.a-link-normal').attr('href')}`

      features = {
        "image_url": img,
        "item_url": itemURL,
        "name": itemName,
        "price": price ? price : 0
      }
    }
  })

  console.log('features',features);
  return features
}


module.exports = {
  fetchGraphQL,
  scrapeItemFeatures
}