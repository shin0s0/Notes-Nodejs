const express= require("express");
const router= express.Router();
const { isLoggedIn }= require("../middleware/checkAuth");
const dashboard = require("../controllers/dashboard");



router.get("/dashboard",isLoggedIn, dashboard.dashboard);
router.get("/dashboard/item/:id",isLoggedIn, dashboard.dashboardViewNote);
router.put("/dashboard/item/:id",isLoggedIn, dashboard.dashboardUpdateNote);
router.delete("/dashboard/item-delete/:id",isLoggedIn, dashboard.dashboardDeleteNote);
router.get("/dashboard/add",isLoggedIn, dashboard.dashboardAddNote);
router.post("/dashboard/add",isLoggedIn, dashboard.dashboardAddNoteSubmit);
router.get("/dashboard/search",isLoggedIn, dashboard.dashboardSearch);
router.post("/dashboard/search",isLoggedIn, dashboard.dashboardSearchSubmit);
module.exports= router;