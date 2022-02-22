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
            chai.request(server)
                .get('/products')
                .query({term: "Iphone"})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('totalPages');
                    res.body.should.have.property('selectedPage');
                    res.body.totalPages.should.be.gt(0);
                    res.body.selectedPage.should.be.eq(1);
                    res.body.should.have.property('products');
                    res.body.products.should.be.a('array');
                    res.body.products.length.should.be.gt(0);
                    done();
                });
        });
        it('it should search all the products for the term Iphone and retrieve page 2', (done) => {
            chai.request(server)
                .get('/products')
                .query({term: "Iphone", page: 2})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('totalPages');
                    res.body.should.have.property('selectedPage');
                    res.body.totalPages.should.be.gt(0);
                    res.body.selectedPage.should.be.eq(2);
                    res.body.should.have.property('products');
                    res.body.products.should.be.a('array');
                    res.body.products.length.should.be.gt(0);
                    done();
                });
        });
        it('it has to get the second ad from the second page of search result for term Iphone', (done) => {
            done();
        });
    });
});