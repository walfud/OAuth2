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
 * GET /user
 * header: 
 * x-access-token: string
 * 
 * Res:
 * 200
 * {oid: string, username: string}
 */
router.get('/user', async (cxt, next) => {
  cxt.body = {
    oid: cxt.request.oauth2.oid,
    username: cxt.request.oauth2.username,
  };
});

module.exports = router;