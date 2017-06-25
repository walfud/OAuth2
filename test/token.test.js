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

let user, app, token, code, appToken;

describe('/token', function() {
    before(async function() {
        user = await User.create({
            name: uuidV4(),
            password: uuidV4(),
        });
        token = await Token.create({
            user_id: user.id,
            app_id: 1,

            oid: uuidV4(),
            access_token: uuidV4(),
            refresh_token: uuidV4(),
        });
        app = await App.create({
            name: uuidV4(),
            password: uuidV4(),
            redirect_uri: 'http://test.walfud.com',
        });
        code = await Code.create({
            user_id: user.id,
            app_id: app.id,

            code: uuidV4(),
        });
    });

    it('Success', function() {
        return request(server)
            .post('/token')
            .set('x-access-token', token.access_token)
            .send(`grant_type=authorization_code&client_id=${app.name}&redirect_uri=&code=${code.code}`)
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8')
            .then(async function(response) {
                // Db
                appToken = await Token.findOne({
                    where: {
                        $and: {
                            user_id: user.id,
                            app_id: app.id,
                        }
                    }
                });
                assert(appToken);
                assert(/^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/.test(appToken.oid));
                assert(/^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/.test(appToken.access_token));
                assert(/^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/.test(appToken.refresh_token));

                // Response                
                assert(response.body.access_token == appToken.access_token);
                assert(response.body.refresh_token == appToken.refresh_token);
                assert(response.body.expires_in == 3600);
                assert(response.body.token_type == 'bearer');
            });
    });

    after(async function() {
        await appToken.destroy();
        await token.destroy();
        await user.destroy();
        await app.destroy();
    });
});
