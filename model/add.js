const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../db')

class User extends Model {}
class Task extends Model {}
class Tool extends Model {}
User.init({
  username: DataTypes.STRING,
  birthday: DataTypes.DATE
}, { sequelize, modelName: 'user' });
Task.init({ 
    name: Sequelize.STRING
}, { sequelize, modelName: 'task' })
Tool.init({ 
    name: Sequelize.STRING
}, { sequelize, modelName: 'tool' })

Task.belongsTo(User) // 一对一
User.hasMany(Task) // 一对多
User.hasMany(Tool, { as: 'Instruments' })



sequelize.sync({ force: false })
module.exports = User
