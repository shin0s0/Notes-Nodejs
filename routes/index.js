const express= require("express");
const router= express.Router();
const main= require("../controllers/main");


router.get("/", main.homepage);
router.get("/about", main.about);

module.exports = router;