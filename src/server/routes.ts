const Router = require('express');
const router = new Router();
const controller = require('./controller');

router.get('/comps', controller.GetComps);

module.exports = router;