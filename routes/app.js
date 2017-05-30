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
 * GET /app
 * header: 
 * x-token: string
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