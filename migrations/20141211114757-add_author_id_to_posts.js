"use strict";

module.exports = {

 // This is what will happen when we run `db:migrate`
  up: function(migration, DataTypes, done) {
    // This is our migration to create an authorId
    migration.addColumn("post", "authorId", {
        type: DataTypes.Integer
    });
    done();
  },
// This is what will happen when we run `db:migrate:undo`
  down: function(migration, DataTypes, done) {
    // This is our migratino to remove the column
    migration.removeColumn("post", "authorId");
    done();
  }
};