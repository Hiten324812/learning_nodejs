const sequelize = require('sequelize');

const seq = require('../util/database');


const User = seq.define('user',{

    id : {
      type : sequelize.INTEGER,
      primaryKey : true,
      allowNull : true 
    },
    name : {
        type : sequelize.STRING,
        allowNull : false
    },

    email : {
        type : sequelize.STRING,
        allowNull : false
    }

} , {
    freezeTableName : true
})

module.exports = User;