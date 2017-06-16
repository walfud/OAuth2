const Router = require('koa-router');
const uuidV4 = require('uuid/v4');

const {
  sequelize,
} = require('../databases/sequelize');
const User = require('../databases/User');
const App = require('../databases/App');
const Code = require('../databases/Code');
const Token = require('../databases/Token');

const router = new Router();

/**
 * Req:
 * GET /authorize
 * header:
 * x-token
 * ------
 * response_type: string
 * client_id: string
 * redirect_uri: string?
 * scope: string?
 * state: string?
 * 
 * Res:
 * {
 *  code: string
 *  state: string
 *  cb: string    资源服务器辅助认证地址
 * }
 */
router.get('/authorize', async (cxt, next) => {
  const { username } = cxt.request.oauth2;
  const {
    response_type: responseType,
    client_id: appName,
    redirect_uri: redirectUri,
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

  const code = uuidV4();
  await Code.upsert({
    user_name: username,
    app_name: appName,
    code,
  });

  const app = await App.findOne({
    where: {
      name: appName,
    }
  });

  cxt.body = {
    code,
    state,
    cb: app.redirect_uri,
  };
});

module.exports = router;