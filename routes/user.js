const Router = require('koa-router');

const {
  sequelize,
} = require('../databases/sequelize');
const User = require('../databases/User');
const App = require('../databases/App');
const Token = require('../databases/Token');

const router = new Router();

/**
 * Req:
 * GET /user
 * header: 
 * x-token: string
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