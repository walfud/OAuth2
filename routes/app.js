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
 * { oid: string, name: string, redirect_uri: string? }
 */
router.get('/app', async (cxt, next) => {
  cxt.body = {
    oid: cxt.request.oauth2.oid,
    name: cxt.request.oauth2.appName,
    redirect_uri: cxt.request.oauth2.redirectUri,
  };
});

module.exports = router;