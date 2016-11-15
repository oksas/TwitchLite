var ObjectId = mongoose.Types.ObjectId;
var Highlight = require('../../db/models/highlight');
var { findAll, findOne, insertOne } = require('../../db/controllers/highlight');

var obj = {
  _id: new ObjectId(),
  link: 'this.that.com',
  channelName: 'dk doublelunch',
  vodId: 'v101',
  game: 'pong',
  streamStart: 1,
  highlightStart: 2,
  highlightEnd: 3,
  multiplier: 4.2
};

describe('Highlights Model', function() {

  beforeEach(function(done) {
    var clearDB = function() {
      Highlight.remove({}).exec();
      return done();
    };

    if (mongoose.connection.readyState === 0) {
      mongoose.connect(process.env.MONGODB_URI, function(err) {
        return clearDB();
      });
    } else {
      return clearDB();
    }

  });

  afterEach(function(done) {
    mongoose.disconnect();
    return done();
  });

  it('is able to add a highlight', function(done) {
    insertOne(obj)
    .then(created => {
      expect(created.game).to.equal('pong');
      expect(created.vote.length).to.equal(0);
      done();
    });
  });

  it('should only add one highlight at once', function(done) {
    insertOne(obj)
    .then( () => {
      return findAll();
    })
    .then(res => {
      expect(res.length).to.equal(1);
      done();
    });
  });

  it('should be able to find by id', function(done) {
    insertOne(obj)
    .then( () => {
      return findOne(obj._id);
    })
    .then(res => {
      expect(res.game).to.equal('pong');
      done();
    });
  });

  it('should only add the same highlight once', function(done) {
    insertOne(obj)
    .then( () => {
      return insertOne(obj);
    })
    .then( () => {
      return findAll(obj);
    })
    .then(results => {
      expect(results.length).to.equal(1);
      done();
    });
  });
});