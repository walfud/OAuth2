const Koa = require('koa');
const logger = require('koa-logger')
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');

const {
    User,
    App,
    Token,
    Code,
 } = require('./databases/db');

const app = new Koa();

app.use(logger());
app.use(bodyParser());

// token 验证
app.use(async (cxt, next) => {
    if (cxt.request.url != '/'
        && cxt.request.url != '/login') {
        const { 'x-access-token': accessToken } = cxt.request.header;
        const token = await Token.findOne({
            where: {
                accessToken,
            },
            include: [User, App],
        });
        if (!token) {
            console.warn(`WRONG token access: ${accessToken}`);
            cxt.status = 401;
            cxt.body = {
                err: `WRONG token access: ${accessToken}`
            }
            return;
        }

        // 如果验证通过， 则增加一个
        cxt.request.oauth2 = {
            userId: token.User.id,
            username: token.User.name,

            appId: token.App.id,
            appName: token.App.name,
            redirectUri: token.App.redirectUri,

            oid: token.oid,
            accessToken: token.accessToken,
            refreshToken: token.refreshToken,
        }
        console.log(cxt.request.oauth2);
    }
    await next();
})

app.use(require('./routes/index').routes());
app.use(require('./routes/login').routes());
app.use(require('./routes/user').routes());
app.use(require('./routes/app').routes());
app.use(require('./routes/authorize').routes());
app.use(require('./routes/token').routes());

const server = app.listen(3000);

module.exports = server
