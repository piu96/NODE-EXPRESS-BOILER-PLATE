const express = require('express');
const router = express.Router();

// All web routes register here //

// Pages
const pagesRoutes = require('../../src/modules/pages/home/pages.home.routes');
router.use('/pages', pagesRoutes);


// User
const userrouter = require('../../src/modules/events/user/events.user.routes');
router.use('/user', userrouter);



module.exports = router;
