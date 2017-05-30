const Koa = require('koa');
const logger = require('koa-logger')
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');

const Token = require('./databases/Token');

const app = new Koa();

app.use(logger());
app.use(bodyParser());

// token 验证
app.use(async (cxt, next) => {
    if (cxt.request.url != '/login') {
        const { 'x-access-token': accessToken } = cxt.request.header;
        const token = await Token.findOne({
            where: {
                access_token: accessToken,
            }
        });
        if (!token) {
            const err = `WRONG token access: ${accessToken}`;
            console.warn(err);
            cxt.body = {
                err,
            }
            return;
        }

        // 如果验证通过， 则增加一个
        cxt.request.oauth2 = {
            username: token.user_name,
            appName: token.app_name,
            
            oid: token.oid,
            accessToken: token.access_token,
            refreshToken: token.refresh_token,
        }
    }
    await next();
})

app.use(require('./routes/index').routes());
app.use(require('./routes/login').routes());
app.use(require('./routes/user').routes());
app.use(require('./routes/app').routes());
app.use(require('./routes/authorize').routes());
app.use(require('./routes/token').routes());

app.listen(3000);
