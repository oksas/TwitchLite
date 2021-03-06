// As per the test script inside package.json, this file will be run
// before running all server tests. Thus, common imports can be done
// once here, rather than each time in every test file
global.chai = require('chai');
global.expect = chai.expect;
global.app = require('../../server/server');
global.request = require('supertest');
global.highlights = require('../../db/controllers/highlight');


var mongoose = require('mongoose');
global.mongoose = mongoose;
mongoose.models = {};
mongoose.modelSchemas = {};
