
const {
    sequelize,
} = require('./databases/sequelize');
const User = require('./databases/User');
const App = require('./databases/App');
const Token = require('./databases/Token');
const Code = require('./databases/Code');
const db = require('./databases/db');

(async function () {
    await User.sync({ force: true });
    await App.sync({ force: true });
    await Token.sync({ force: true });
    await Code.sync({ force: true });

    await User.bulkCreate([
        {
            name: 'walfud',
            password: '123456',
        },
        {
            name: 'user2',
            password: '2',
        },
    ]);

    await App.bulkCreate([
        {
            name: 'oauth2',
            redirect_uri: '',
        },
        {
            name: 'contactsync',
            redirect_uri: 'http://contactsync.walfud.com/cb',
        },
    ]);

    await Code.bulkCreate([
        {
            user_name: 'walfud',
            app_name: 'contactsync',
            code: '2b4db34a-7f7d-47cc-b349-cffbb3c192a9',
        },
    ]);

    await Token.bulkCreate([
        {
            user_name: 'walfud',
            app_name: 'oauth2',
            oid: 'oid1',
            access_token: '469bd0c7-5d7e-45fd-9e46-5b09612a5193',
            refresh_token: '',
        },
    ]);
})()
