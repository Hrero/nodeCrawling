const Crawler = require("crawler");
const model = require('./model');

module.exports = {
    addLeaseRecruitController: (req, res) => {
        let num = 1;
        let total = 0;
        const compantName = ['杭州卡玩科技有限公司', '卡玩', '农家源（北京）科技发展有限公司', '北京易点淘网络技术有限公司', '携程国际旅游'];
        let courseData = [];
        promiseGetData('https://search.51job.com/list/000000,000000,0000,00,9,99,%25E6%2598%2593%25E7%2582%25B9%25E7%25A7%259F,2,1.html?lang=c&postchannel=0000&workyear=99&cotype=99&degreefrom=99&jobterm=99&companysize=99&ord_field=0&dibiaoid=0&line=&welfare=', function(data) {
            const $ = data.$;
            console.log(data)
            res.send({code: 0, data: data})
            total = $(".p_in").find(".td").text();
            total = total.split('页')[0].split('共')[1];
            (function getData(num) {
                if ( num > total ) {
                    // res.send({code: 0, data: data})
                    return;
                } else {
                    promiseGetData('https://search.51job.com/list/000000,000000,0000,00,9,99,%25E6%2598%2593%25E7%2582%25B9%25E7%25A7%259F,2,'+ num +'.html?lang=c&postchannel=0000&workyear=99&cotype=99&degreefrom=99&jobterm=99&companysize=99&ord_field=0&dibiaoid=0&line=&welfare=', function(data) {
                        const $ = data.$;
                        var myUl = $(".dw_table").find(".el");
                        myUl.each(function(index, e) {
                            if ( compantName.indexOf($(e).children('.t2').text()) === -1 ) {
                                // model.addRecruit(
                                //     $(e).children('.t1').text().replace(/\s/g, '') || '', 
                                //     $(e).children('.t2').text() || '',
                                //     $(e).children('.t3').text() || '',
                                //     $(e).children('.t4').text() || '',
                                //     $(e).children('.t5').text() || ''
                                // );
                                courseData.push({
                                    postTitle: $(e).children('.t1').text().replace(/\s/g, ''),
                                    companyName: $(e).children('.t2').text(),
                                    place: $(e).children('.t3').text(),
                                    salary: $(e).children('.t4').text(),
                                    releaseTime: $(e).children('.t5').text()
                                })
                            }
                        })
                        getData(++num)
                    })
                }
            })(num)
            return;
        })

        function promiseGetData(url, callback) {
            const c = new Crawler({
                maxConnections: 10,
                callback: (error, data, done) => {
                    if (error) {
                        console.log(error);
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