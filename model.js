var Sequelize = require('sequelize');
var db = require('./db');
 
// 创建 model
const LeaseRecruitInfo = db.define('lease_recruit_info', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    postTitle: {
        type: Sequelize.STRING,
        validate: { min: -90, max: 90 },
        primaryKey: true
    },
    companyName: {
        type: Sequelize.STRING,
        validate: { min: -90, max: 90 }
    },
    place: {
        type: Sequelize.STRING,
        validate: { min: -90, max: 90 }
    },
    salary: {
        type: Sequelize.STRING,
        validate: { min: -90, max: 90 }
    },
    releaseTime: {
        type: Sequelize.STRING,
        validate: { min: -90, max: 90 }
    }
}, {
    freezeTableName: true
});

//如果不存在就创建此表
var leaseRecruitInfo = LeaseRecruitInfo.sync({ force: false });

// 添加新用户
exports.addRecruit = function(postTitle, companyName, place, salary, releaseTime) {
    // 向 user 表中插入数据
    return LeaseRecruitInfo.create({
        postTitle: postTitle,
        companyName: companyName,
        place: place,
        salary: salary,
        releaseTime: releaseTime
    });
};