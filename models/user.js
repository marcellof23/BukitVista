module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user",{
        user_id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            allowNull : false,
            autoIncrement : true
        },
        name : {
            type : DataTypes.STRING,
            allowNull : false
        },
        password : {
            type : DataTypes.STRING,
            allowNull : false
        }
    },{
        tableName : "user"
    })
    return User
}