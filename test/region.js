'use strict';

// let str = '<img src="https://test.repo.chanquan.tudi66.com:443/pool/local/image/portal/9pX7hCTKy0fxCf095NqF5lNAj_ES4_wB.jpg"/>';

// var arr = /<img.*src\\s*=\\s*(.*?)[^>]*?>/g.test();


/*var arr = /^(.*?省|.*?市|.*?自治区){1}(.?市|.*?自治州|阿克苏地区){1}(.*?区$|.*?县$|.*?市$|.*?旗$){1}/g.exec('广西壮族自治区河池市市辖区');
console.log(arr);
var region = {
    province: arr[1],
    city: arr[2],
    district: arr[3]
}

console.log(region);

arr = /^(北京市|上海市|天津市|重庆市){1}(.*区$|.*县$){1}/g.exec('北京市大兴区');
console.log(arr);
region = {
    province: arr[1],
    city: arr[1],
    district: arr[2]
}

console.log(region);



db.getCollection('ob.partner').find({}).limit(300).forEach(function (item) {
    if (item && typeof item.region == 'string') {
        var arr = /^(.*省|.*市|.*自治区){1,1}(.*市|.*自治州|阿克苏地区){1,1}(.*区$|.*县$|.*市$|.*旗$){1}/g.exec(item.region);
        if (arr) {
            var region = {
                province: arr[1],
                city: arr[2],
                district: arr[3]
            }
            print('     the _id:', item._id.toString(), 'the lawful region:', item.region, JSON.stringify(region));
            return;
        }
        arr = /^(北京市|上海市|天津市|重庆市){1}(.*区$|.*县$){1}/g.exec(item.region);
        if (arr) {
            region = {
                province: arr[1],
                city: arr[1],
                district: arr[2]
            }
            print('             the _id:', item._id.toString(), 'the direct city region:', item.region, JSON.stringify(region));
            return;
        }

        print('the fail region _id:', item._id.toString(), 'the fail region:', item.region);
    }
})



db.getCollection('ob.partner').find({}).limit(300).forEach(function (item) {
    if (item && typeof item.region == 'string') {
        var arr = /^(.*省|.*市|.*自治区){1,1}(.*市|.*自治州|阿克苏地区){1,1}(.*区$|.*县$|.*市$|.*旗$){1}/g.exec(item.region);
        if (arr) {
            var region = {
                province: arr[1],
                city: arr[2],
                district: arr[3]
            }
            print('     the _id:', item._id.toString(), 'the lawful region:', item.region, JSON.stringify(region));
            db.getCollection('ob.partner').update({ _id: item._id }, { $set: { region: region } })
            return;
        }
        arr = /^(北京市|上海市|天津市|重庆市){1}(.*区$|.*县$){1}/g.exec(item.region);
        if (arr) {
            region = {
                province: arr[1],
                city: arr[1],
                district: arr[2]
            }
            print('             the _id:', item._id.toString(), 'the direct city region:', item.region, JSON.stringify(region));
            db.getCollection('ob.partner').update({ _id: item._id }, { $set: { region: region } })
            return;
        }

        print('the fail region _id:', item._id.toString(), 'the fail region:', item.region);
    }
})


function justArea(name, partner, region) {
    var result = false;
    db.getCollection('sys.newarea').find(region).forEach(function (newarea) {
        if (newarea) {
            print('     ', name, 'the _id:', partner._id.toString(), 'the region:', partner.region, 'newarea:', JSON.stringify(newarea));
            result = true;
        }
    });
    if (!result) {
        print(name, 'the _id:', partner._id.toString(), 'the region:', partner.region, JSON.stringify(region));
    }

    return result;
}
db.getCollection('ob.partner').find({}).limit(300).forEach(function (item) {
    if (item && typeof item.region == 'string') {
        var region = null;
        var arr = /^(.*?自治区|.*?省|.*?市){1}(.*?市|.*?自治州|阿克苏地区){1}(.*?区$|.*?县$|.*?市$|.*?旗$){1}/g.exec(item.region);
        if (arr) {
            region = {
                province: arr[1],
                city: arr[2],
                district: arr[3]
            }
            if (justArea('lawful_area', item, region)) {
                return;
            }
        }
        arr = /^(北京市|上海市|天津市|重庆市){1}(.*?区$|.*?县$){1}/g.exec(item.region);
        if (arr) {
            region = {
                province: arr[1],
                city: arr[1],
                district: arr[2]
            }
            if (justArea('direct_area', item, region)) {
                return;
            }
        }

        print('the fail region _id:', item._id.toString(), 'the fail region:', item.region);
    }
})

db.getCollection('ob.college').find({ "_id": ObjectId("5784d0e2a254a14b294c7a00") }).forEach(function (item) {
    if (item && typeof item.enrolls) {

        for (var i = 0; i < item.enrolls.length; i++) {
            if (i > 28) {
                return;
            }
            var enroll = item.enrolls[i];
            db.getCollection('ob.college').update({ "_id": ObjectId("58b93d23dee4d5f34d1bdefa") }, { enrolls: { $push: enroll } });
        }
    }
})

static addDays(time, days) {
    time = time || new Date();
    newTime = new Date(time);
    days = days || 0;
    newTime.setDate(newTime.getDate() + days);
    return newTime;
}

db.getCollection('hubei.app.project').find({ projectNo: { $in: ["CQ-TC-2017-1"] } }).forEach(function (item) {
    if (item && item.status == 'published') {
        db.getCollection('hubei.app.project').update({ "_id": item._id }, {
            // "startDate": (new Date(item.startDate)).setDate((new Date(item.startDate)).getDate() + 30),
            "startDate": { $add: ['$startDate', { $multiply: [10, 24 * 60 * 60 * 1000] }] },
            "endDate": ISODate("2018-03-05T16:00:00.000Z"),
            "lastModTime": ISODate("2017-03-07T06:47:56.220Z"),
            "createdTime": ISODate("2017-03-07T06:47:56.220Z"),
            "publishedTime": ISODate("2017-03-07T07:20:53.857Z"),
            "enrollEndTime": ISODate("2017-03-07T07:15:19.480Z"),
            "enrollStartTime": ISODate("2017-03-06T16:00:00.000Z")
        })
    }
})


db.getCollection('hubei.app.publishment').find({ "_id": ObjectId("58be581e45251e32760048a1") }).forEach(function (item) {
    if (item) {
        var time = new Date(item.createdTime.toISOString());
        print(time);
        db.getCollection('hubei.app.publishment').update({ "_id": item._id }, {
            $set: {
                "createdTime": new ISODate((new ISODate((time.setDate(time.getDate() + 30)))).toISOString())
            }
        })
    }
})


db.getCollection('tianyc04').find({ "_id": ObjectId("58d20feecad70725faa26d2f") }).forEach(function (item) {
    if (item) {
        db.getCollection('tianyc04').update({ "_id": item._id }, {
            $set: {
                "ss_time": new ISODate((new Date(item.mark_time.getTime() + (24* 60* 60 * 1000))).toISOString())
            }
        })
    }
})*/

// var createdTime = new Date();
db.getCollection('jingmen.app.news').find({ newsType: { $exists: true }, grade: 1 }).forEach(function (item) {
    if (item && item.newsType) {
        var arr = item.newsType.split('_');
        if (arr.length > 1) {
            var tnews = {
                name: item.newsTypeName,
                level: item.grade,
                order: 1,
                navbar: true,
                url: '',
                category: "news",
                archived: false
            }

            switch (arr[1]) {
                case '001':
                    //新闻中心
                    tnews.url = 'newsCenter';
                    break;
                case '002':
                    //政策法规
                    tnews.url = 'policies';
                    break;
                case '004':
                    //通知公告
                    tnews.url = 'notice';
                    break;
                case '006':
                    //理论动态
                    tnews.url = 'theory';
                    break;
                case '007':
                    //资料下载
                    tnews.url = 'documents';
                    break;
                case '007':
                    //资料下载
                    tnews.url = 'documents';
                    break;
                case '010':
                    //幻灯新闻
                    tnews.url = 'carouselSetting';
                    break;
                case '009':
                    //他山之石
                    tnews.url = 'otherStone';
                    break;
                case '008':
                    //抵押融资服务专栏
                    tnews.url = 'mortgage';
                    break;
                case '003':
                    //交易指南
                    tnews.url = 'tradingGuide';
                    break;
                case '005':
                    //交易规则
                    tnews.url = 'rules';
                    break;
                case '011':
                    //投融资信息
                    tnews.url = 'investmentFinancingInformation';
                    break;
                case '013':
                    //图片新闻
                    tnews.url = 'carouselSetting';
                    tnews.navbar = false;
                    break;
                case '012':
                    //其他
                    tnews.url = 'other';
                    break;
                default:
                    break;
            }

            db.getCollection('jingmen.sys.tnews').update(
                tnews,
                { $set: tnews },
                { upsert: true }
            )
        }
    }
})

db.getCollection('jingmen.app.news').find({ newsType: { $exists: true } }).forEach(function (item) {
    if (item && item.newsType) {
        var newsTypeArr = item.newsType.split('_');
        var pArr = null;
        var tnews = null;
        if (newsTypeArr.length > 1 && newsTypeArr[1]) {
            if (item.grade == 2) {
                tnews = {
                    name: item.newsTypeName,
                    level: item.grade,
                    order: 1,
                    navbar: false,
                    url: '',
                    category: "news",
                    archived: false
                }
            }
            else {
                tnews = {
                    name: item.newsTypeName,
                    level: item.grade,
                    order: 1,
                    navbar: true,
                    url: '',
                    category: "news",
                    archived: false
                }
            }

            if (item.parentNewsType && item.grade == 2) {
                var parentNewsTypeArr = item.parentNewsType.split('_');
                if (parentNewsTypeArr.length > 1 && parentNewsTypeArr[1]) {
                    pArr = parentNewsTypeArr[1];
                }
            }

            if (!pArr) {
                pArr = newsTypeArr[1];
            }

            switch (pArr) {
                case '001':
                    //新闻中心
                    tnews.url = 'newsCenter';
                    break;
                case '002':
                    //政策法规
                    tnews.url = 'policies';
                    break;
                case '004':
                    //通知公告
                    tnews.url = 'notice';
                    break;
                case '006':
                    //理论动态
                    tnews.url = 'theory';
                    break;
                case '007':
                    //资料下载
                    tnews.url = 'documents';
                    break;
                case '007':
                    //资料下载
                    tnews.url = 'documents';
                    break;
                case '010':
                    //幻灯新闻
                    tnews.url = 'carouselSetting';
                    break;
                case '009':
                    //他山之石
                    tnews.url = 'otherStone';
                    break;
                case '008':
                    //抵押融资服务专栏
                    tnews.url = 'mortgage';
                    break;
                case '003':
                    //交易指南
                    tnews.url = 'tradingGuide';
                    break;
                case '005':
                    //交易规则
                    tnews.url = 'rules';
                    break;
                case '011':
                    //投融资信息
                    tnews.url = 'investmentFinancingInformation';
                    break;
                case '013':
                    //图片新闻
                    tnews.url = 'carouselSetting';
                    tnews.navbar = false;
                    break;
                case '012':
                    //其他
                    tnews.url = 'other';
                    break;
                default:
                    break;
            }
            var parentNewsTypeName = null
            if (item.grade == 2) {
                parentNewsTypeName = item.parentNewsTypeName;
            }
            else {
                parentNewsTypeName = item.newsTypeName;
            }

            var pTnews = {
                name: parentNewsTypeName || '',
                level: 1,
                order: 1,
                navbar: tnews.url == 'carouselSetting' ? false : true,
                url: tnews.url,
                category: "news",
                archived: false
            }

            var parentTnews = null;
            db.getCollection('jingmen.sys.tnews').find(pTnews).forEach(function (ttnews) {
                if (Array.isArray(ttnews)) {
                    parentTnews = ttnews[0];
                    tnews.parent = parentTnews._id;
                    tnews.url = '';
                    db.getCollection('jingmen.sys.tnews').update(
                        tnews,
                        { $set: tnews },
                        { upsert: true }
                    )
                }
            });

            if (!parentTnews) {
                db.getCollection('jingmen.sys.tnews').update(
                    pTnews,
                    { $set: pTnews },
                    { upsert: true }
                )
                db.getCollection('jingmen.sys.tnews').find({ level: 1, url: tnews.url }).forEach(function (ttnews) {
                    print(ttnews)
                    if (Array.isArray(ttnews)) {
                        parentTnews = ttnews[0];
                        tnews.parent = parentTnews._id;
                        tnews.url = '';
                        db.getCollection('jingmen.sys.tnews').update(
                            tnews,
                            { $set: tnews },
                            { upsert: true }
                        )
                    }
                });
            }
        }
    }
})


db.getCollection('jingmen.app.news').find({ newsType: { $exists: true } }).forEach(function (item) {
    print(item);
})

db.getCollection('jingmen.app.news').find({ newsType: { $exists: true } }).forEach(function (item) {
    if (item && item.newsType) {
        var newsTypeArr = item.newsType.split('_');
        var areaCodeArr = item.areaCode.split('_');
        var pArr = null;
        var tnews = null;
        if (newsTypeArr.length > 1 && newsTypeArr[1] && areaCodeArr.length > 1) {
            tnews = {
                name: item.newsTypeName,
                level: item.grade,
                order: 1,
                navbar: item.grade == 1 ? true : false,
                url: '',
                category: 'news',
                archived: false
            }

            if (item.parentNewsType && item.grade == 2) {
                var parentNewsTypeArr = item.parentNewsType.split('_');
                if (parentNewsTypeArr.length > 1 && parentNewsTypeArr[1]) {
                    pArr = parentNewsTypeArr[1];
                }
            }

            if (!pArr) {
                pArr = newsTypeArr[1];
            }

            switch (pArr) {
                case '001':
                    //新闻中心
                    tnews.url = 'newsCenter';
                    break;
                case '002':
                    //政策法规
                    tnews.url = 'policies';
                    break;
                case '004':
                    //通知公告
                    tnews.url = 'notice';
                    break;
                case '006':
                    //理论动态
                    tnews.url = 'theory';
                    break;
                case '007':
                    //资料下载
                    tnews.url = 'documents';
                    break;
                case '007':
                    //资料下载
                    tnews.url = 'documents';
                    break;
                case '010':
                    //幻灯新闻
                    tnews.url = 'carouselSetting';
                    break;
                case '009':
                    //他山之石
                    tnews.url = 'otherStone';
                    break;
                case '008':
                    //抵押融资服务专栏
                    tnews.url = 'mortgage';
                    break;
                case '003':
                    //交易指南
                    tnews.url = 'tradingGuide';
                    break;
                case '005':
                    //交易规则
                    tnews.url = 'rules';
                    break;
                case '011':
                    //投融资信息
                    tnews.url = 'investmentFinancingInformation';
                    break;
                case '013':
                    //图片新闻
                    tnews.url = 'carouselSetting';
                    tnews.navbar = false;
                    break;
                case '012':
                    //其他
                    tnews.url = 'other';
                    break;
                default:
                    break;
            }

            if (tnews.level == 1 && tnews.url == '') {
                return false;
            }

            var parentNewsTypeName = null
            if (item.grade == 2) {
                parentNewsTypeName = item.parentNewsTypeName;
            }
            else {
                parentNewsTypeName = item.newsTypeName;
            }

            var pTnews = {
                name: parentNewsTypeName,
                level: 1,
                order: 1,
                navbar: tnews.url == 'carouselSetting' ? false : true,
                url: tnews.url,
                category: tnews.category,
                archived: false
            }

            db.getCollection('jingmen.sys.tnews').update(
                { level: 1, url: tnews.url },
                { $set: pTnews },
                { upsert: true }
            )
            var parentTnews = null;
            db.getCollection('jingmen.sys.tnews').find({ level: 1, url: tnews.url }).forEach(function (ttnews) {
                if (ttnews) {
                    parentTnews = ttnews;
                    tnews.parent = parentTnews._id;
                    tnews.url = '';
                    tnews.level = 2;
                    tnews.newsType = item.newsType;
                    db.getCollection('jingmen.sys.tnews').update(
                        { parent: parentTnews._id, name: tnews.name, url: '', level: 2 },
                        { $set: tnews },
                        { upsert: true }
                    )

                    var time = new Date();
                    var newsTime = {};
                    if (item.createdTime) {
                        var dateTimeArr = item.createdTime.split(' ');
                        if (dateTimeArr.length > 1) {
                            var dateArr = dateTimeArr[0].split('-');
                            var timeArr = dateTimeArr[1].split(':');
                            if (dateArr[0]) {
                                time.setFullYear(dateArr[0]);
                            }
                            if (dateArr[1]) {
                                time.setMonth(dateArr[1]);
                            }
                            if (dateArr[2]) {
                                time.setDate(dateArr[2]);
                            }

                            if (timeArr[0]) {
                                time.setHours(timeArr[0]);
                            }
                            if (timeArr[1]) {
                                time.setMinutes(timeArr[1]);
                            }
                            if (timeArr[2]) {
                                time.setSeconds(timeArr[2]);
                            }
                        }
                    }
                    time = new ISODate((new Date(time)).toISOString());
                    print(time);

                    db.getCollection('jingmen.sys.tnews').find(tnews).forEach(function (sptnews) {
                        if (sptnews) {
                            db.getCollection('jingmen.app.news').update(
                                { _id: item._id },
                                {
                                    $unset: { id: '', newsType: '', newsTypeName: '', parentNewsType: '', parentNewsTypeName: '', keyword: '', grade: '' },
                                    $set: {
                                        status: 'published',
                                        newsTypeId: sptnews._id,
                                        areaCode: areaCodeArr[1],
                                        keywords: item.keyword ? [item.keyword] : [],
                                        createdTime: time,
                                        origin: { type: 'imported', platform: 'hubei_jingmeng', channel: 'shell', detail: item }
                                    }
                                }
                            )

                            db.getCollection('jingmen.sys.tnews').update(
                                tnews,
                                { $unset: { newsType: '' } }
                            )
                        }
                    })
                }
            });
        }
    }
})

db.getCollection('jingmen.app.news').find({ 'origin.platform': 'hubei_jingmeng', 'origin.type': 'imported', 'origin.channel': 'shell' })