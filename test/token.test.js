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
            userId: user.id,
            appId: 1,

            oid: uuidV4(),
            accessToken: uuidV4(),
            refreshToken: uuidV4(),
        });
        app = await App.create({
            name: uuidV4(),
            password: uuidV4(),
            redirectUri: 'http://oauth2.walfud.com/cb',
        });
        code = await Code.create({
            userId: user.id,
            appId: app.id,

            code: uuidV4(),
        });
    });

    it('Success', function() {
        return request(server)
            .post('/token')
            .set('x-access-token', token.accessToken)
            .send(`grant_type=authorization_code&client_id=${app.name}&redirect_uri=&code=${code.code}`)
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8')
            .then(async function(response) {
                // Db
                appToken = await Token.findOne({
                    where: {
                        $and: {
                            userId: user.id,
                            appId: app.id,
                        }
                    }
                });
                assert(appToken);
                assert(/^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/.test(appToken.oid));
                assert(/^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/.test(appToken.accessToken));
                assert(/^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/.test(appToken.refreshToken));

                // Response                
                assert(response.body.access_token == appToken.accessToken);
                assert(response.body.refresh_token == appToken.refreshToken);
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
