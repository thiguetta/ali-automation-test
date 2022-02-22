process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


chai.use(chaiHttp);
describe('Products', () => {
    describe('/GET products for term Iphone', () => {
        it('it should search all the products for the term Iphone and retrieve page 1', (done) => {
           done();
        });
        it('it should search all the products for the term Iphone and retrieve page 2', (done) => {
           done();
        });
        it('it has to get the second ad from the second page of search result for term Iphone', (done) => {
            done();
        });
    });
});