const assert = require('assert');
const request = require('supertest');
const server = require('../app')

describe('/', function () {
    it('Hello Koa', function (done) {
        request(server)
            .get('/')
            .expect(200)
            .expect('content-type', 'text/plain; charset=utf-8')
            .expect(function (res) {
                assert(res.text == 'Hello Koa');
            })
            .end(done);
    });
});