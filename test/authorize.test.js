const assert = require('assert');
const request = require('supertest');
const uuidV4 = require('uuid/v4');
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
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8')
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
                assert(response.body.code == code.code);
                assert(!response.body.state);
                assert(response.body.cb == app.redirectUri);
            });
    });

    after(async function () {
        await token.destroy();
        await code.destroy();
        await user.destroy();
        await app.destroy();
    });
});
