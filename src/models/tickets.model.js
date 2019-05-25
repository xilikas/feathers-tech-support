// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');

class tickets extends Model {

  static get tableName() {
    return 'tickets';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['text'],

      properties: {
        text: { type: 'string' }
      }
    };
  }

  $beforeInsert() {
    this.createdAt = this.updatedAt = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }
}

module.exports = function (app) {
  const db = app.get('knex');

  db.schema.hasTable('tickets').then(exists => {
    if (!exists) {
      db.schema.createTable('tickets', table => {
        table.increments('id');
        table.string('text');
        table.timestamp('createdAt');
        table.timestamp('updatedAt');
      })
        .then(() => console.log('Created tickets table')) // eslint-disable-line no-console
        .catch(e => console.error('Error creating tickets table', e)); // eslint-disable-line no-console
    }
  })
    .catch(e => console.error('Error creating tickets table', e)); // eslint-disable-line no-console

  return tickets;
};
