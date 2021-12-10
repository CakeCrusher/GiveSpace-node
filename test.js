const fetch = require('node-fetch');
const cheerio = require('cheerio');
require('dotenv').config();
const test = async () => {
  const google_res = await fetch(`https://www.google.com/search?q=${'television'}&sxsrf=AOaemvLO7shGvop8b348BCWvCqAm1nVN9w:1639079653745&source=lnms&tbm=shop&sa=X&ved=2ahUKEwiInZPEv9f0AhVXQTABHef5AG8Q_AUoAXoECAMQAw&biw=1745&bih=881&dpr=1.1`)
  const google_res_text = await google_res.text();
  const $ = cheerio.load(google_res_text);
  const head = $('h1')
  console.log(head.text());
  // const list = $('.sh-pr__product-results-grid')
  // console.log(list.length)
}
test()