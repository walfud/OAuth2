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

let username, password;
let user, token;

describe('/login', function () {
    before(async function () {
        username = uuidV4();
        password = uuidV4();
    });

    it('Register', function () {
        return request(server)
            .post('/login')
            .set('Accept', 'application/json')
            .send({
                username,
                password,
            })
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8')
            .then(async function (response) {
                // Db
                user = await User.findOne({
                    where: {
                        $and: {
                            name: username,
                            password,
                        }
                    }
                });
                assert(user);
                assert(user.name == username)
                assert(user.password == password)

                token = await Token.findOne({
                    where: {
                        $and: {
                            userId: user.id,
                            appId: App.OAUTH2_ID,
                        }
                    }
                });
                assert(token);
                assert(/^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/.test(token.oid));
                assert(/^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/.test(token.accessToken));
                assert(/^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/.test(token.refreshToken));

                // Response
                assert(response.body.access_token == token.accessToken);
                assert(response.body.refresh_token == token.refreshToken);
                assert(response.body.expires_in == 3600);
                assert(response.body.token_type == 'bearer');
            });
    });
    it('Login', function () {
        return request(server)
            .post('/login')
            .set('Accept', 'application/json')
            .send({
                username,
                password,
            })
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8')
            .then(async function (response) {
                // Response
                assert(response.body.access_token == token.accessToken);
                assert(response.body.refresh_token == token.refreshToken);
                assert(response.body.expires_in == 3600);
                assert(response.body.token_type == 'bearer');
            });
    });
    it('Login Fail', function () {
        return request(server)
            .post('/login')
            .set('Accept', 'application/json')
            .send({
                username,
                password: '',
            })
            .expect(401)
            .expect('content-type', 'application/json; charset=utf-8')
            .then(async function (response) {
                // Response
                assert(response.body.err);
            });
    });

    after(async function () {
        await token.destroy();
        await user.destroy();
    });
});
