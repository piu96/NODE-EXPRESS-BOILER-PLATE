const express = require('express');
const router = express.Router();
const PagesController = require('./pages.home.controller');
const menuController = new PagesController();
const { validatePageRequest } = require('./pages.home.validator');
router.get("/list",validatePageRequest, menuController.pagesCms);

module.exports = router;
