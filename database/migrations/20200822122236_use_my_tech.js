exports.up = function (knex) {
  return knex.schema
    .createTable("users", (tbl) => {
      tbl.increments();
      tbl.string("username", 32).unique().notNullable();
      tbl.string("password", 32).unique().notNullable();
      tbl.string("firstName").notNullable();
      tbl.string("lastName").notNullable();
    })

    .createTable("tech", (tbl) => {
      tbl.increments();
      tbl.string("techName").notNullable();
      tbl.string("description").notNullable();
      tbl.string("condition").notNullable();
      tbl.float("price").notNullable();
      tbl
        .integer("ownerId")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
      tbl
        .integer("renterId")
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("tech").dropTableIfExists("users");
};
