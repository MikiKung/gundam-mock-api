const express = require('express')
const router = express.Router()
let { mockGundam, Gundam } = require('../module/gundam.module')
const { check_id } = require("../lib/validate.lib")



router.get('/', (req, res) => {
  data = new Gundam()
  getAll = data.getAll();
  res.json(getAll)
})

router.get("/get", (req, res) => {
  const { id } = req.query;
  const data = new Gundam();
  const get = data.get(id);
  res.json(get);
});

router.post('/', (req, res) => {
  const { name, grade, price, height, shop_id } = req.query
  data = new Gundam()
  add = data.add(name, grade, price, height, shop_id);
  res.json(add)
})

router.delete('/delete', (req, res) => {
  const { id } = req.query
  data = new Gundam()
  removedata = data.removeData(id);
  res.json(removedata)
})
router.post("/edit", (req, res) => {
  const { id, name, grade, price, height } = req.query
  const data = new Gundam()
  const edit = data.edit(id, name, grade, price, height)
  res.json(edit)
})


module.exports = router;