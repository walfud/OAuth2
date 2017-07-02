const assert = require('assert');
const request = require('supertest');
const uuidV4 = require('uuid/v4');
const querystring = require('querystring');

const server = require('../app')
const {
  sequelize,
    User,
    App,
    Token,
    Code,
 } = require('../databases/db');

let user, app, token, code;

describe('/authorize', function () {
    before(async function () {
        user = await User.create({
            name: uuidV4(),
            password: uuidV4(),
        });
        app = await App.create({
            name: uuidV4(),
            password: uuidV4(),
            redirectUri: 'http://oauth2.walfud.com/cb',
        });
        token = await Token.create({
            userId: user.id,
            appId: 1,

            oid: uuidV4(),
            accessToken: uuidV4(),
            refreshToken: uuidV4(),
        });
    });

    it('Success', function () {
        return request(server)
            .get(`/authorize?response_type=code&client_id=${app.name}&redirect_uri=&scope=&state=`)
            .set('x-access-token', token.accessToken)
            .expect(302)
            .expect('content-type', 'text/html; charset=utf-8')
            .then(async function (response) {
                // Db
                code = await Code.findOne({
                    where: {
                        $and: {
                            userId: user.id,
                            appId: app.id,
                        }
                    }
                });
                assert(code);
                assert(code.code)

                // Response
                assert(response.header.location == `${app.redirectUri}?${querystring.stringify({ code: code.code, state: '' })}`);
            });
    });

    after(async function () {
        if (token) await token.destroy();
        if (code) await code.destroy();
        if (user) await user.destroy();
        if (app) await app.destroy();
    });
});
