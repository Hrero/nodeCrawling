const Crawler = require("crawler");
const cheerio = require("cheerio");
// const User = require('./model/add');
const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db')
const Sequelize = require('sequelize');
// console.log()
class User extends Model {}
class Task extends Model {}
class Tool extends Model {}
class Mood extends Model {}
User.init({
    name: Sequelize.STRING,
    job: Sequelize.STRING,
    num: Sequelize.INTEGER,
}, { sequelize, modelName: 'user' });
Task.init({
    name: Sequelize.STRING
}, { sequelize, modelName: 'task' })
Tool.init({
    name: Sequelize.STRING
}, { sequelize, modelName: 'tool' })
Mood.init({
    name: Sequelize.STRING
}, { hooks: {
    beforeValidate: (user, options) => {
      console.log(1)
    },
    afterValidate: (user, options) => {
      user.name = 'Toni';
      console.log(2)
    }
  },sequelize, modelName: 'tool' })
Task.belongsTo(User) // 一对一
User.hasMany(Task) // 一对多
User.hasMany(Tool, { as: 'Instruments' })


class Documen extends Model {}
Documen.init({
  author: Sequelize.STRING
}, { sequelize, modelName: 'documen' });
class Version extends Model {}
Version.init({
  timestamp: Sequelize.DATE
}, { sequelize, modelName: 'version' });

Documen.hasMany(Version); // This adds documentId attribute to version
Documen.belongsTo(Version, {
  as: 'Current',
  foreignKey: 'currentVersionId',
  constraints: false // 防止循环引用 变为同步
}); // This adds currentVersionId attribute to document



sequelize.sync({ force: false })

const Op = Sequelize.Op

module.exports = {
    testMysql: (req, res) => {
        Task.create({
            name: 'janedoe'
        })
        .then(jane => {
            console.log(jane.toJSON());
        });
        User.create({
            name: 'janedoe'
        })
        .then(jane => {
            console.log(jane.toJSON());
        });
        Tool.create({
            name: 'janedoe'
        })
        .then(jane => {
            console.log(jane.toJSON());
        });
        Mood.create({
            name: 'janedoe'
        })
        .then(jane => {
            console.log(jane.toJSON());
        });
    },
    findUser: (req, res) => {
        User.findOne({ 
            where: { name: 'janedoe' },
            attributes: ['id', ['name']] // 把字段列出来，找出第一条数据
        }).then(back => {
            res.send(back)
        })
    },
    creatUser: (req, res) => {
        User
        .findOrCreate({
            where: { name: 'sdepold1' }, // 没有就创建
            defaults: { birthday: new Date(1980, 6, 20) } // 依然可以设置想默认的东西
        })
        .then(([user, created]) => {
            console.log(user.get({ // 拿到user新增数据
                plain: true
            }))
            console.log(created)
        })
    },
    findAndCountAll: async (req, res) => {
        const getBurArray = [
            {
                name: 'SequeSTRING',
                job: 'adaada',
                num: 0,
            },
            {
                name: 'SequeSTRING',
                job: 'adaada',
                num: 0,
            }
        ]
        await User.bulkCreate(getBurArray, { returning: true }).then((result) => {
            console.log(JSON.parse(JSON.stringify(result)))
            // sequelize.query('UPDATE team_summary_reims SET prevpeople = countnowpartner');
        }).catch((err) => {
            console.log(err, '我去，出错了！');
        });
        /**
         * https://blog.csdn.net/d649237053/article/details/99623451
         * 具体的模糊查询
         */
        // function getCurrentQuarter() {
        //     const month = (new Date().getMonth() + 1);
        //     return {
        //         quarter: [1, 2, 3].some(item => item === month) ? 1 :
        //         [4, 5, 6].some(item => item === month) ? 2 : [7, 8, 9].some(item => item === month) ? 3 : 4,
        //         month: [1, 2, 3].some(item => item === month) ? [1, 2, 3] :
        //         [4, 5, 6].some(item => item === month) ? [4, 5, 6] : [7, 8, 9].some(item => item === month) ? [7, 8, 9] : [10, 11, 12],
        //         years: new Date().getFullYear()
        //     };
        // }
        // const { month, years } = getCurrentQuarter();
        // const reimmonthSum = await User.sum('num', { // 季度已经报销金额
        //     where: {
        //         name: 'aaaaa',
        //         [Op.or]: [
        //             {
        //                 job: ['bbb1', 'Technical', 'ffff']
        //             }
        //         ]
        //     }
        // });
        // console.log(month, years, reimmonthSum)
        // const reimmonthSum = await TeamBursementReims.sum('reimmonth', { // 季度已经报销金额
        //     where: {
        //         years, teamid,
        //         [Op.or]: [
        //             {
        //                 month
        //             }
        //         ]
        //     }
        // });
        // const canbereimSum = await TeamBursementReims.sum('canbereim', { // 季度可以报销的总额
        //     where: {
        //         years, teamid,
        //         [Op.or]: [
        //             {
        //                 month
        //             }
        //         ]
        //     }
        // });
        // console.log(reimmonthSum, canbereimSum, '=====canbereimSum');
        // const reimmonthSum = await User.sum('num', { // 季度已经报销金额
        //     where: {
        //         name: 'aaaaa',
        //         [Op.or]: [
        //             {
        //                 job: ['bbb', 'Technical']
        //             }
        //         ]
        //     }
        // });
        // console.log(reimmonthSum)
        // User
        //     .findAndCountAll({
        //         where: {
        //             name: {
        //                 [Op.like]: 'jane%' //  模糊查询
        //             }
        //         },
        //         offset: 0, // 跳过多少条
        //         limit: 2 // 每页多少条
        //     })
        //     .then(result => {
        //         console.log(result.count); // 返回总条数
        //         console.log(result.rows);
        //     });
    },
    findcount: (req, res) => { // count, max, min, sum
        User.update({name: 'hhh1'})
        // User
        //     .findOrCreate({where: {name: 'ssss'}, defaults: {job: 'Technical Lead JavaScript'}})
        //     .then(([user, created]) => {
        //         console.log(user.get({
        //             plain: true
        //         }))
        //         if (!created) {
        //             user.update({
        //                 name: 'aaaaa'
        //             })
        //         }
        //     console.log(created)
        // })
        // User.bulkCreate([
        //     { name: 'foo' },
        //     { name: 'bar'}
        // ], {
        //     where: {
        //         name: 'foo'
        //     }
        // }).then(() => {
        // // nope bar, you can't be admin!
        // })
        // User.beforeBulkCreate((users, options) => {
        //     for (const user of users) {
        //       if (user.name) {
        //         user.name = new Date();
        //       }
        //     }
          
        //     // Add memberSince to updateOnDuplicate otherwise the memberSince date wont be
        //     // saved to the database
        //     options.updateOnDuplicate.push('memberSince');
        //   });
        // User.count({ where: { 'id': { [Op.like]: 0 }} }).then(c => {
        //     console.log("There are " + c + " projects with an id greater than 0.")
        // })
        // User.findAll({
        //     order: [[{model: 'User'},'id', 'DESC' ]] // 排序
        // }).then(tasks => {
        //     console.log(JSON.stringify(tasks))
        //   })
        // User.findAll({
        //     include: [{ // 关联查询
        //         model: Tool,
        //         where: { name: { [Op.like]: '%o%' } }
        //     }]
        // }).then(tasks => {
        //     console.log(JSON.stringify(tasks))
        // })
        // User.bulkCreate([ // 批量操作
        //     { name: 'barfooz'},
        //     { name: 'foo'},
        //     { name: 'bar'}
        // ]).then(tasks => {
        //     console.log(JSON.stringify(tasks))
        // })
        // User.bulkCreate([
        //     { name: 'barfooz'},
        //     { name: 'foo'},
        //     { name: 'bar'}
        //   ], { returning: true }) // 返回插入值
        // .then((result) => {
        //     console.log(JSON.stringify(result));
        // });
        // Person.create({
        //     name: 'Rambow',
        //     firstname: 'John'
        // }).then(john => { // 返回实例值
        //     console.log(john.get({
        //       plain: true
        //     }))
        // })
        // return sequelize.transaction(t => { // 事务
        //         return User.create({
        //             name: 'Abraham',
        //         }, {transaction: t}).then(user => {
        //             return User.create({
        //                 name: 'John'
        //             }, {transaction: t});
        //         });
        //     }).then(result => {
        //         console.log(result)
        //         return t.commit(); // 手动提交
        //     }).catch(err => {
        //         console.log(err)
        //         return t.rollback();
        //     });
    },
    addLeaseRecruitController: (req, res) => {
        let num = 1;
        let total = 0;
        const compantName = ['杭州卡玩科技有限公司', '卡玩', '农家源（北京）科技发展有限公司', '北京易点淘网络技术有限公司', '携程国际旅游'];
        let courseData = [];
        promiseGetData('https://www.zhipin.com/c100010000/?query=%E6%98%93%E7%82%B9%E7%A7%9F&ka=sel-city-100010000', function(data) {
            const $ = data.$;
            // const $ = cheerio.load(data)
            console.log()
            res.send(data)
            // total = $(".p_in").find(".td").text();
            // total = total.split('页')[0].split('共')[1];
            // (function getData(num) {
            //     if ( num > total ) {
            //         res.send({code: 0, data: JSON.stringify($('#listContent').html())})
            //         return;
            //     } else {
            //         // promiseGetData('https://sou.zhaopin.com/?jl=538&kw=%E6%98%93%E7%82%B9%E7%A7%9F&kt=3', function(data) {
            //         //     const $ = data.$;
            //         //     var myUl = $(".dw_table").find(".el");
            //         //     // myUl.each(function(index, e) {
            //         //     //     if ( compantName.indexOf($(e).children('.t2').text()) === -1 ) {
            //         //     //         // model.addRecruit(
            //         //     //         //     $(e).children('.t1').text().replace(/\s/g, '') || '',
            //         //     //         //     $(e).children('.t2').text() || '',
            //         //     //         //     $(e).children('.t3').text() || '',
            //         //     //         //     $(e).children('.t4').text() || '',
            //         //     //         //     $(e).children('.t5').text() || ''
            //         //     //         // );
            //         //     //         courseData.push({
            //         //     //             postTitle: $(e).children('.t1').text().replace(/\s/g, ''),
            //         //     //             companyName: $(e).children('.t2').text(),
            //         //     //             place: $(e).children('.t3').text(),
            //         //     //             salary: $(e).children('.t4').text(),
            //         //     //             releaseTime: $(e).children('.t5').text()
            //         //     //         })
            //         //     //     }
            //         //     // })
            //         //     getData(++num)
            //         // })
            //     }
            // })(num)
        })

        function promiseGetData(url, callback) {
            const c = new Crawler({
                maxConnections: 10,
                callback: (error, data, done) => {
                    if (error) {
                        console.log(error, '---');
                    } else {
                        callback(data)
                    }
                    done();
                }
            });
            console.log(url)
            c.queue(url);
        }
    }
}