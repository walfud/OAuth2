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

let user, token;

describe('/user', function () {
    before(async function () {
        user = await User.create({
            name: uuidV4(),
            password: uuidV4(),
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
            .get('/user')
            .set('x-access-token', token.accessToken)
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8')
            .then(async function (response) {
                assert(response.body.oid == token.oid);
                assert(response.body.name == user.name);
            });
    });

    after(async function() {
        await token.destroy();
        await user.destroy();
    });
});
