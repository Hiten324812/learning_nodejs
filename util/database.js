const seq = require('sequelize');

const sequelize = new seq.Sequelize('learning_nodejs','root','admin',
{ dialect : 'mysql' ,
 host : 'localhost'
});


module.exports = sequelize;
