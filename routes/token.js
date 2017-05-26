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
 * POST /token
 * grant_type: string
 * client_id: string
 * redirect_uri: string?
 * code: string
 * 
 * Res:
 * {
 *  access_token: string
 *  refresh_token: string
 *  expires_in: long
 *  token_type: string
 * }
 */
router.post('/token', async (cxt, next) => {
  const { username } = cxt.request.oauth2;
  const {
    grant_type: grantType,
    client_id: appName,
    redirect_uri: redirectUri,
    code: code,
  } = cxt.request.body;

  if (grantType != 'authorization_code') {
    cxt.body = {
      err: `WRONG grant_type: ${grantType}`,
    }
    return;
  }

  // 检查 Code 表
  if (await Code.destroy({
    where: {
      code,
    }
  }) == 0) {
    cxt.body = {
      err: `No such code: ${code}`,
    };
    return;
  }

  // (重新)生成 token
  let token;
  await sequelize.transaction(async function (t) {
    token = await Token.findOne({
      where: {
        $and: {
          user_name: username,
          app_name: appName,
        }
      }
    }, { transaction: t });

    if (token) {
      await token.update({
        access_token: uuidV4(),
        refresh_token: uuidV4(),
      }, { transaction: t });
    } else {
      token = await Token.create({
        user_name: username,
        app_name: appName,
        oid: uuidV4(),
        access_token: uuidV4(),
        refresh_token: uuidV4(),
      }, { transaction: t });
    }
  });

  cxt.body = {
    access_token: token.access_token,
    refresh_token: token.refresh_token,
    expires_in: 3600,
    token_type: "bearer",
  };
});

module.exports = router;