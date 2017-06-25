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

let user, app, token;

describe('/app', function () {
    before(async function () {
        user = await User.create({
            name: uuidV4(),
            password: uuidV4(),
        });
        app = await App.create({
            name: uuidV4(),
            password: uuidV4(),
            redirect_uri: 'http://test.walfud.com',
        });
        token = await Token.create({
            user_id: user.id,
            app_id: app.id,

            oid: uuidV4(),
            access_token: uuidV4(),
            refresh_token: uuidV4(),
        });
    });

    it('Success', function () {
        return request(server)
            .get('/app')
            .set('x-access-token', token.access_token)
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8')
            .then(async function (response) {
                assert(response.body.oid == token.oid);
                assert(response.body.name == app.name);
                assert(response.body.redirect_uri == app.redirect_uri);
            });
    });

    after(async function () {
        await token.destroy();
        await user.destroy();
        await app.destroy();
    });
});
