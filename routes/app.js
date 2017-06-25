const Router = require('koa-router');

const {
  sequelize,
  User,
  App,
  Token,
  Code,
 } = require('../databases/db');

const router = new Router();

/**
 * Req:
 * GET /app
 * header: 
 * x-access-token: string
 * 
 * Res:
 * 200
 * {oid: string, app_name: string}
 */
router.get('/app', async (cxt, next) => {
  cxt.body = {
    oid: cxt.request.oauth2.oid,
    app_name: cxt.request.oauth2.appName,
  };
});

module.exports = router;