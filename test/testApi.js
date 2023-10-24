import process from 'process';

//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

import chai from "chai";
import chaiHttp from 'chai-http'
import { it } from 'mocha';
let should = chai.should();
import {app} from "../index.js"

chai.use(chaiHttp);

describe('test api', () => {

    /*
    * Test the / route
    */

    describe('/', () => {
        it('it should GET code 200', (done) => {
            chai.request(app)
                .get('/')
                .end((err, res) => {
                    res.should.have.status(200);                    
                    done();                    
                });
        });
    });


    /*
    * Test the /custom-api route it should return a json
    */
    describe('/custom-api', () => {
        it('it should GET code 200', (done) => {
            chai.request(app)
                .get('/custom-api')
                .end((err, res) => {
                    res.should.have.status(200);      
                    res.should.be.json;                                  
                    done();                    
                });
        });
    });

    /*
    * Test the /login route with good credentials like kuku@kuku.com and 12345 password
    */
    describe('/login', () => {
        it('it should GET code 200', (done) => {
            chai.request(app)
                .post('/login')
                .send({email: 'kuku@kuku.com', password: '12345'})
                .end((err, res) => {                    
                    res.should.have.status(200);                                               
                    done();
                })
        })
    })

    /*
    * Test the /login route with wrong credentials like kuku@kuku.com and 123456 password
    */
    describe('/login', () => {
        it('it should GET code 400', (done) => {
            chai.request(app)
                .post('/login')
                .send({email: 'kuku@kuku.com', password: '123456'})
                .end((err, res) => {                    
                    res.should.have.status(400);                                               
                    done();
                })
        })
    })
})
           