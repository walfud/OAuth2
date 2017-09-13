const Router = require('koa-router');
const uuidV4 = require('uuid/v4');
const util = require('util');

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
 * POST /login
 * header:
 * Content-Type: application/json
 * ------
 * {username: string, password: string}
 * 
 * Res:
 * 200
 * { 
 *  access_token: string, 
 *  refresh_token: string
 *  expires_in: long,
 *  token_type: string,
 * }
 */
router.post('/login', async (cxt, next) => {
  const { username, password } = cxt.request.body;
  let responseBody = {};

  const user = await User.findOne({
    where: {
      name: username,
    }
  });
  if (!user) {
    // Register
    await sequelize.transaction(async function (t) {
      const newUser = await User.create({
        name: username,
        password,
      }, { transaction: t });
console.log(newUser.get())
      const newToken = await Token.create({
        userId: newUser.id,
        appId: App.OAUTH2_ID,

        oid: uuidV4(),
        accessToken: uuidV4(),
        refreshToken: uuidV4(),
      }, { transaction: t });

      responseBody = {
        accessToken: newToken.accessToken,
        refreshToken: newToken.refreshToken,
      }

      console.log(`register: user(${util.inspect(newUser.get())}), token(${util.inspect(newToken.get())})`);
    });
  } else {
    // Login
    if (user.password != password) {
      cxt.status = 401;
      cxt.body = {
        err: `WRONG password`,
      }
      return;
    }

    let token = await Token.findOne({
      where: {
        $and: {
          userId: user.id,
          appId: App.OAUTH2_ID,
        }
      }
    });

    responseBody = {
      accessToken: token.accessToken,
      refreshToken: token.refreshToken,
    };

    console.log(`login: user(${util.inspect(user.get())}), token(${util.inspect(token.get())})`);
  }

  cxt.body = {
    access_token: responseBody.accessToken,
    refresh_token: responseBody.refreshToken,
    expires_in: 3600,
    token_type: "bearer",
  };
});

module.exports = router;