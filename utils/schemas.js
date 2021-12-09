const CREATE_ITEM = `
mutation MyMutation($list_id: uuid = "", $image_url: String = "", $item_url: String = "", $name: String = "", $price: Float = 1.5) {
  insert_item(objects: {list_id: $list_id, image_url: $image_url, item_url: $item_url, name: $name, price: $price}) {
    returning {
      id
    }
  }
}
`
// {
//   "list_id": "5b05ede3-8cb8-4ec3-b83f-4cd3fa22babe",
//   "image_url": "https://m.media-amazon.com/images/I/81QvlthwGRS._AC_UY218_.jpg",
//   "item_url": "https://www.amazon.com/Toshiba-43-inch-4K-UHD-Smart-Fire-TV/dp/B0924WSBXH/ref=sr_1_1?keywords=television+toshiba&qid=1639071248&sr=8-1",
//   "name": "television toshiba",
//   "price": 289
// }

module.exports = {
  CREATE_ITEM
}