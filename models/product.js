const sequelize = require('sequelize');

const seq = require('../util/database');

const Product = seq.define('product',{
 id : {
  type : sequelize.INTEGER,
  autoIncrement : true,
  allowNull : false,
  primaryKey : true
 } , 

 title : {
  type : sequelize.STRING
 }
 ,
 price : {
  type : sequelize.DOUBLE ,
  allowNull : false
 } ,

 imageurl : {
  type : sequelize.STRING,
  allowNull : false
 } ,

 description : {
  type : sequelize.STRING,
  allowNull : false
 }
} , { 
  freezeTableName : true
});

module.exports = Product;