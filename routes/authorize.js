const Router = require('koa-router');
const uuidV4 = require('uuid/v4');
const querystring = require('querystring');

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
 * GET /authorize
 * header:
 * x-access-token
 * ------
 * response_type: string
 * client_id: string
 * redirect_uri: string?
 * scope: string?
 * state: string?
 * 
 * Res:
 * status: 302
 * content-type: application/x-www-form-urlencoded
 * location: [redirect_uri]?code=[string]&state=[string]
 */
router.get('/authorize', async (cxt, next) => {
  const { userId, redirectUri } = cxt.request.oauth2;
  const {
    response_type: responseType,
    client_id: appName,
    scope: scope,
    state: state,
  } = cxt.request.query;

  // 验证 response_type
  if (responseType != 'code') {
    cxt.status = 400;
    cxt.body = {
      err: `WRONG response_type: ${responseType}`,
    }
    return;
  }

  const app = await App.findOne({
    where: {
      name: appName,
    }
  });

  const code = uuidV4();
  await Code.upsert({
    userId,
    appId: app.id,
    code,
  });

  cxt.redirect(`${app.redirectUri}?${querystring.stringify({ code, state })}`)
  cxt.type = 'application/x-www-form-urlencoded'
});

module.exports = router;