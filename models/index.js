const config = require("../config");
const { Sequelize, DataTypes, Op } = require("sequelize");

const sequelize = new Sequelize(
  config.SEQUELIZE_DB,
  config.SEQUELIZE_USER,
  config.SEQUELIZE_PASSWORD,
  {
    host: "localhost",
    dialect: config.dialect,
    operatorsAliases: 0,
    dialectOptions: {connectTimeout: 1000},
    poll: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.Op = Op;
db.sequelize = sequelize;

const User = require("./user.js")(sequelize, DataTypes);
const FavoriteMovies = require("./favorite_movies.js")(sequelize, DataTypes);


UserMovies = sequelize.define('user_movies', {
    role: Sequelize.STRING
});

FavoriteMovies.belongsToMany(User, {
  through: UserMovies,
  foreignKey: "id"
});

User.belongsToMany(FavoriteMovies, {
  through: UserMovies,
  foreignKey: "user_id"
});

db.User = User;
db.FavoriteMovies = FavoriteMovies;
db.ROLES = ["user"];

module.exports = db;