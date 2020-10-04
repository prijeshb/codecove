const app = require('../server'),
    chai = require('chai'), chaiHttp = require('chai-http'),
    expect = chai.expect //to solve error when using done(): “ReferenceError: expect is not defined”
    ;
chai.use(chaiHttp);
//chai.use(chaiSubset);
describe('Testing Todo Website', function () {
    after(() => {});
    var url = 'http://localhost:3000';
    var requester = chai.request.agent(url);//to keep the same session; without requester agent the get or post will act as opening a new window
    
    //When done is passed in, Mocha will wait until the call to done(), or until the timeout expires. done also accepts an error parameter when signaling completion.
    it('should read the todolist.txt file successfully', function (done) { // <= Pass in done callback

        requester
            .get('/')
            .end(function (err, res) {
                const item='Go shopping';
                expect(res).to.have.status(200);
                //expect(res.text).to.contain(item);
                console.log(res.body);
                done(); // <= Call done to signal callback end
            });
    });
    const todo = {data:'Post a blog at '+new Date()};
    it('should add a new todo item to the todo list successfully', function (done) { // <= Pass in done callback
        requester
            .post('/')
            .send(todo)
            .then(function (res) {
                console.log('then post');
                expect(res).to.have.status(201);
                done();
            });
    });
});