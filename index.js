
const express = require('express');
const routes = require('./routes')
const app = express();

app.get('/addLeaseRecruitController', routes.addLeaseRecruitController);

app.get('/', routes.testMysql)
app.get('/testMysql', routes.testMysql)
app.get('/findUser', routes.findUser)
app.get('/creatUser', routes.creatUser)
app.get('/findAndCountAll', routes.findAndCountAll)
app.get('/findcount', routes.findcount)
// 监听端口、启动程序
app.listen(3000, err => {
    if (err) throw err;
    console.log('runing...');
})