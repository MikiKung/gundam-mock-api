const express = require("express");
const router = express.Router();
const { Shop } = require("../module/shop.module");

router.get("/", (req, res) => {
    const data = new Shop();
    const getAll = data.getAll();
    res.json(getAll);
});

router.post("/", (req, res) => {
    const { name, city, shop_id } = req.query;
    const data = new Shop();
    const add = data.add(name, city, shop_id);
    res.json(add);
});

router.get("/get", (req, res) => {
    const { id } = req.query;
    const data = new Shop();
    const get = data.get(id);
    res.json(get);
});

router.post("/edit", (req, res) => {
    const { id, name, city } = req.query;
    const data = new Shop();
    const edit = data.edit(id, name, city);
    res.json(edit);
});


router.delete("/delete",(req,res)=>{
    const { id } = req.query;
    const data = new Shop();
    const deletes = data.delete(id);
    res.json(deletes);
})

module.exports = router;
