module.exports = (sequelize, DataTypes) => {
    const FavoriteMovies = sequelize.define("favorite_movies",{
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            allowNull : false,
            autoIncrement : true
        },
        title : {
            type : DataTypes.STRING,
            allowNull : false
        },
        user_id : {
            type : DataTypes.INTEGER,
            allowNull : false
        }

    },{
        tableName : "favorite_movies"
    })
    return FavoriteMovies
}