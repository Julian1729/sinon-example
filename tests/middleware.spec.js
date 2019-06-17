const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const {mockResponse, mockRequest} = require('mock-req-res');
// chai.should();
chai.use(sinonChai);

const middleware = require('../middleware');

describe('Authentication Middleware', () => {

  it('should call next', () => {

    let res = mockResponse({});
    let req = mockRequest({session: {authenticated: true, admin: true}});
    let next = sinon.stub();

    middleware.authenticate(req, res, next);
    expect(next).to.have.been.calledOnce;

  });

  it('should respond with 401 UNAUTHORIZED', () => {

    let res = mockResponse({});
    let req = mockRequest({});
    let next = sinon.stub();

    middleware.authenticate(req, res, next);
    expect(res.status).to.have.been.calledOnce;
    expect(res.status).to.have.been.calledWith(401);

  });

  it('should respond with 403 FORBIDDEN', () => {

    let res = mockResponse({});
    let req = mockRequest({session: {authenticated: true}});
    let next = sinon.stub();

    middleware.authenticate(req, res, next);
    expect(res.status).to.have.been.calledOnce;
    expect(res.status).to.have.been.calledWith(403);

  });

});
