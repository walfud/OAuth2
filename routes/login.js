const Router = require('koa-router');
const uuidV4 = require('uuid/v4');
const util = require('util');

const {
  sequelize,
} = require('../databases/sequelize');
const User = require('../databases/User');
const App = require('../databases/App');
const Token = require('../databases/Token');

const router = new Router();

/**
 * Req:
 * POST /login
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
  console.log(cxt.request.body);

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
      const newToken = await Token.create({
        user_name: newUser.name,
        app_name: App.NAME_OAUTH2,

        oid: uuidV4(),
        access_token: uuidV4(),
        refresh_token: uuidV4(),
      }, { transaction: t });

      responseBody = {
        access_token: newToken.access_token,
        refresh_token: newToken.refresh_token,
      }

      console.log(`register: user(${util.inspect(newUser.get({ plain: true }))}), token(${util.inspect(newToken.get({ plain: true }))})`);
    });
  } else {
    // Login
    if (user.password != password) {
      cxt.body = {
        err: `WRONG password`,
      }
      return;
    }

    let token = await Token.findOne({
      where: {
        $and: {
          user_name: user.name,
          app_name: App.NAME_OAUTH2,
        }
      }
    });

    responseBody = {
      access_token: token.access_token,
      refresh_token: token.refresh_token,
    };

    console.log(`login: user(${util.inspect(user.get({ plain: true }))}), token(${util.inspect(token.get({ plain: true }))})`);
  }

  cxt.body = {
    access_token: responseBody.access_token,
    refresh_token: responseBody.refresh_token,
    expires_in: 3600,
    token_type: "bearer",
  };
});

module.exports = router;