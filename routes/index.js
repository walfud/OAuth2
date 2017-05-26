const Router = require('koa-router');

const router = new Router();

/* GET home page. */
router.get('/', (cxt, next) => {
  cxt.body = 'Hello Koa';
});

module.exports = router;