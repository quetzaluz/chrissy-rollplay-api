const knex = require('knex');
const helpers = require('./test-helpers');
const TopicsRouter = require('../src/topics/topics-router.js');

describe('Topics Endpoints', () => {
  let db;

  before('make Knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL
    });
    TopicsRouter.set('db', db);
    after('disconnect from db', () => db.destroy());
    before('cleanup tables', () => helpers.cleanTables(db));
    afterEach('cleanup tables', () => helpers.cleanTables(db));

    context('Given there are topics in the database', () => {
      const testTopics = [
        {
          topic_id: 1,
          title: 'Test Post 1',
          topic_desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
          rpg_system: 'How-to',
          date_created: '2029-01-22T16:28:32.615Z',
          topic_owner: 1,
          topic_passphrase: 'dummy',
        },
        {
          topic_id: 2,
          title: 'Test Post 2',
          topic_desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
          rpg_system: 'How-to',
          date_created: '2029-01-22T16:28:32.615Z',
          topic_owner: 2,
          topic_passphrase: 'dummy',
        },
        {
          topic_id: 3,
          title: 'Test Post 3',
          topic_desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
          rpg_system: 'How-to',
          date_created: '2029-01-22T16:28:32.615Z',
          topic_owner: 3,
          topic_passphrase: 'dummy',
        },
        {
          topic_id: 4,
          title: 'Test Post 4',
          topic_desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
          rpg_system: 'How-to',
          date_created: '2029-01-22T16:28:32.615Z',
          topic_owner: 4,
          topic_passphrase: 'dummy',
        },

      ];
      
      beforeEach('insert topics', () => {
        return db
          .into('rollplay_topics')
          .insert(testTopics);
      });
    });

    it('GET /topics responds with 200 and all of the topics', () => {
      return supertest(TopicsRouter)
        .get('/topics')
        .expect(200, this.testTopics);
      // TODO: add more assertions about the body
    });
  });
});