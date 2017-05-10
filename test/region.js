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



{
    "_id" : ObjectId("58e50462b15d6c560f768e30"),
    "type" : 2,
    "merchant" : ObjectId("58feaab9e18f14695e224cb0"),
    "name" : "普洱本地土乌鸡",
    "coveringArea" : "全国",
    "unit" : "公斤",
    "catalogCode" : "00100",
    "spec" : "母鸡1.9--2.3公斤/只",
    "price" : 148,
    "originalPrice" : 168,
    "memberPrice" : 146,
    "inventory" : 3000,
    "warning" : 300,
    "description" : "普洱本地土鸡，丛林生态散养，喝山涧溪水，吃林中虫子、青草，品质有根本保证，营养丰富健康，肉质鲜美味甜，是地道的“家乡味道”。现“五.一”节降价促销价148元/只，真空包装冷鲜包邮。您的选择是健康，睿智之举。",
    "status" : 0,
    "remarks" : [],
    "comments" : [],
    "activities" : [],
    "isTop" : false,
    "location" : {
        "province" : "云南省",
        "city" : "普洱市",
        "district" : "思茅区",
        "citycode" : "0879",
        "adcode" : "530802",
        "township" : "思茅镇",
        "street" : "白云东路",
        "streetNumber" : "56号",
        "type" : "Point",
        "coordinates" : [ 
            100.974525, 
            22.796765
        ]
    },
    "photos" : [ 
        {
            "_id" : ObjectId("58e50462b15d6c560f768e35"),
            "thumbnail" : {
                "url" : "http://repos.b2cf.cn/images/ecommerce/CvCKGm65MPUzHySYrWvgXGuv0vyd0JJ5_thumbnail.jpg",
                "width" : "720",
                "height" : "720"
            },
            "image" : {
                "url" : "http://repos.b2cf.cn/images/ecommerce/CvCKGm65MPUzHySYrWvgXGuv0vyd0JJ5.jpg",
                "width" : "720",
                "height" : "720"
            }
        }, 
        {
            "_id" : ObjectId("58e50462b15d6c560f768e34"),
            "thumbnail" : {
                "url" : "http://repos.b2cf.cn/images/ecommerce/EQILD1IMFAJe3lck-LKbXXMHhQCkhaNf_thumbnail.jpg",
                "width" : "720",
                "height" : "720"
            },
            "image" : {
                "url" : "http://repos.b2cf.cn/images/ecommerce/EQILD1IMFAJe3lck-LKbXXMHhQCkhaNf.jpg",
                "width" : "720",
                "height" : "720"
            }
        }, 
        {
            "_id" : ObjectId("58e50462b15d6c560f768e33"),
            "thumbnail" : {
                "url" : "http://repos.b2cf.cn/images/ecommerce/T0TonW9WesgqvPquOs1gtfJvEz7GNwzP_thumbnail.jpg",
                "width" : "720",
                "height" : "720"
            },
            "image" : {
                "url" : "http://repos.b2cf.cn/images/ecommerce/T0TonW9WesgqvPquOs1gtfJvEz7GNwzP.jpg",
                "width" : "720",
                "height" : "720"
            }
        }, 
        {
            "_id" : ObjectId("58e50462b15d6c560f768e32"),
            "thumbnail" : {
                "url" : "http://repos.b2cf.cn/images/ecommerce/0e8QcVk3VgctHR2PWSSFXD-VCkWgo2rA_thumbnail.jpg",
                "width" : "720",
                "height" : "720"
            },
            "image" : {
                "url" : "http://repos.b2cf.cn/images/ecommerce/0e8QcVk3VgctHR2PWSSFXD-VCkWgo2rA.jpg",
                "width" : "720",
                "height" : "720"
            }
        }, 
        {
            "isMaster" : true,
            "_id" : ObjectId("58e50462b15d6c560f768e31"),
            "thumbnail" : {
                "url" : "http://repos.b2cf.cn/images/ecommerce/NDZRrSQ8RILJKH7gu1jEkr1ue3YN4NaK_thumbnail.jpg",
                "width" : "720",
                "height" : "720"
            },
            "image" : {
                "url" : "http://repos.b2cf.cn/images/ecommerce/NDZRrSQ8RILJKH7gu1jEkr1ue3YN4NaK.jpg",
                "width" : "720",
                "height" : "720"
            }
        }
    ],
    "thumbnail" : {
        "height" : "200",
        "width" : "200",
        "url" : "http://repos.b2cf.cn/images/ecommerce/oHsCRVyiErQjzOarFbvXCUMcoTTnFXYY_thumbnail.jpg"
    },
    "region" : {
        "province" : "云南省",
        "city" : "普洱市",
        "district" : "思茅区"
    },
    "paymentTypes" : [],
    "updateTime" : ISODate("2017-04-05T14:51:14.417Z"),
    "createTime" : ISODate("2017-04-05T14:51:14.417Z"),
    "parameters" : [],
    "minimalAmount" : 2,
    "__v" : 0
},
{
    "_id" : ObjectId("58e501f1b15d6c560f768e24"),
    "type" : 2,
    "merchant" : ObjectId("58feaab9e18f14695e224cb0"),
    "coveringArea" : "全国",
    "unit" : "公斤",
    "catalogCode" : "00100",
    "spec" : "母鸡1.5---1.8公斤/只",
    "price" : 118,
    "originalPrice" : 145,
    "memberPrice" : 116,
    "inventory" : 3000,
    "warning" : 100,
    "description" : "普洱本地土鸡，丛林生态散养，喝山涧溪水，吃林中虫子、青草，品质有根本保证，营养丰富健康，肉质鲜美味甜，是地道的“家乡味道”。现“五.一”节降价促销118元/只，真空包装冷鲜包邮。您的选择是健康，睿智之举。",
    "name" : "普洱本地土乌鸡",
    "status" : 0,
    "remarks" : [],
    "comments" : [],
    "activities" : [],
    "isTop" : false,
    "location" : {
        "province" : "云南省",
        "city" : "普洱市",
        "district" : "思茅区",
        "citycode" : "0879",
        "adcode" : "530802",
        "township" : "思茅镇",
        "street" : "白云东路",
        "streetNumber" : "56号",
        "type" : "Point",
        "coordinates" : [ 
            100.974535, 
            22.796684
        ]
    },
    "photos" : [ 
        {
            "_id" : ObjectId("58e501f1b15d6c560f768e29"),
            "thumbnail" : {
                "url" : "http://repos.b2cf.cn/images/ecommerce/yTYsLrAZaN3r15bP9W3cVRBCha3KBueC_thumbnail.jpg",
                "width" : "720",
                "height" : "720"
            },
            "image" : {
                "url" : "http://repos.b2cf.cn/images/ecommerce/yTYsLrAZaN3r15bP9W3cVRBCha3KBueC.jpg",
                "width" : "720",
                "height" : "720"
            }
        }, 
        {
            "_id" : ObjectId("58e501f1b15d6c560f768e28"),
            "thumbnail" : {
                "url" : "http://repos.b2cf.cn/images/ecommerce/OWZpSXNnliy75wi3vPCswq6z4k0BTlPh_thumbnail.jpg",
                "width" : "720",
                "height" : "720"
            },
            "image" : {
                "url" : "http://repos.b2cf.cn/images/ecommerce/OWZpSXNnliy75wi3vPCswq6z4k0BTlPh.jpg",
                "width" : "720",
                "height" : "720"
            }
        }, 
        {
            "_id" : ObjectId("58e501f1b15d6c560f768e27"),
            "thumbnail" : {
                "url" : "http://repos.b2cf.cn/images/ecommerce/7tooxoszj0OiXeBlrB7X1O9ZJ1aP_YhJ_thumbnail.jpg",
                "width" : "720",
                "height" : "720"
            },
            "image" : {
                "url" : "http://repos.b2cf.cn/images/ecommerce/7tooxoszj0OiXeBlrB7X1O9ZJ1aP_YhJ.jpg",
                "width" : "720",
                "height" : "720"
            }
        }, 
        {
            "_id" : ObjectId("58e501f1b15d6c560f768e26"),
            "thumbnail" : {
                "url" : "http://repos.b2cf.cn/images/ecommerce/-IPaTNTb4n8-rUXuq5fH4cGSy6zpxoVx_thumbnail.jpg",
                "width" : "720",
                "height" : "720"
            },
            "image" : {
                "url" : "http://repos.b2cf.cn/images/ecommerce/-IPaTNTb4n8-rUXuq5fH4cGSy6zpxoVx.jpg",
                "width" : "720",
                "height" : "720"
            }
        }, 
        {
            "isMaster" : true,
            "_id" : ObjectId("58e501f1b15d6c560f768e25"),
            "thumbnail" : {
                "url" : "http://repos.b2cf.cn/images/ecommerce/-2U2W4KKdkUadZyOvKPiV4nC-82HJhR1_thumbnail.jpg",
                "width" : "720",
                "height" : "720"
            },
            "image" : {
                "url" : "http://repos.b2cf.cn/images/ecommerce/-2U2W4KKdkUadZyOvKPiV4nC-82HJhR1.jpg",
                "width" : "720",
                "height" : "720"
            }
        }
    ],
    "thumbnail" : {
        "height" : "200",
        "width" : "200",
        "url" : "http://repos.b2cf.cn/images/ecommerce/qK2yqYMld5N97-revhsAZw0Ddyz4clwP_thumbnail.jpg"
    },
    "region" : {
        "province" : "云南省",
        "city" : "普洱市",
        "district" : "思茅区"
    },
    "paymentTypes" : [],
    "updateTime" : ISODate("2017-04-05T14:40:49.322Z"),
    "createTime" : ISODate("2017-04-05T14:40:49.322Z"),
    "parameters" : [],
    "minimalAmount" : 2,
    "__v" : 0
},
{
    "_id" : ObjectId("58e4b7ff2eb1d5fb64e1e93b"),
    "type" : 0,
    "merchant" : ObjectId("58feaab9e18f14695e224cb0"),
    "name" : "重楼，红桔苗",
    "coveringArea" : "四川省成都市金堂县",
    "unit" : "棵",
    "catalogCode" : "00200",
    "spec" : "1",
    "price" : 1,
    "originalPrice" : 2,
    "memberPrice" : 1,
    "inventory" : 999990000,
    "warning" : 100000000,
    "status" : 0,
    "remarks" : [],
    "comments" : [],
    "activities" : [],
    "isTop" : false,
    "location" : {
        "coordinates" : [ 
            104.022169, 
            30.686413
        ],
        "type" : "Point",
        "streetNumber" : "346号",
        "street" : "蜀汉路",
        "township" : "黄忠街道",
        "adcode" : "510106",
        "citycode" : "028",
        "district" : "金牛区",
        "city" : "成都市",
        "province" : "四川省"
    },
    "photos" : [ 
        {
            "_id" : ObjectId("58e4b7ff2eb1d5fb64e1e940"),
            "thumbnail" : {
                "height" : "720",
                "width" : "720",
                "url" : "ecommerce/O0orql6gX4o4XWQf3v7gszLiG095OKGW_thumbnail.jpg"
            },
            "image" : {
                "height" : "720",
                "width" : "720",
                "url" : "ecommerce/O0orql6gX4o4XWQf3v7gszLiG095OKGW.jpg"
            }
        }, 
        {
            "_id" : ObjectId("58e4b7ff2eb1d5fb64e1e93f"),
            "thumbnail" : {
                "height" : "720",
                "width" : "720",
                "url" : "ecommerce/PG7EfTwrZ_jE_dqC2lBE7XEsS8ta6xPt_thumbnail.jpg"
            },
            "image" : {
                "height" : "720",
                "width" : "720",
                "url" : "ecommerce/PG7EfTwrZ_jE_dqC2lBE7XEsS8ta6xPt.jpg"
            }
        }, 
        {
            "_id" : ObjectId("58e4b7ff2eb1d5fb64e1e93e"),
            "thumbnail" : {
                "height" : "720",
                "width" : "720",
                "url" : "ecommerce/sO1_hok5c-cOPt8Zhd0upJqfqLI49iHv_thumbnail.jpg"
            },
            "image" : {
                "height" : "720",
                "width" : "720",
                "url" : "ecommerce/sO1_hok5c-cOPt8Zhd0upJqfqLI49iHv.jpg"
            }
        }, 
        {
            "_id" : ObjectId("58e4b7ff2eb1d5fb64e1e93d"),
            "thumbnail" : {
                "height" : "720",
                "width" : "720",
                "url" : "ecommerce/34bG58uidyjbrlcHOu80EHwHLwWIsoBL_thumbnail.jpg"
            },
            "image" : {
                "height" : "720",
                "width" : "720",
                "url" : "ecommerce/34bG58uidyjbrlcHOu80EHwHLwWIsoBL.jpg"
            }
        }, 
        {
            "_id" : ObjectId("58e4b7ff2eb1d5fb64e1e93c"),
            "isMaster" : true,
            "thumbnail" : {
                "height" : "720",
                "width" : "720",
                "url" : "ecommerce/7POqAEnkH3Mtkyc3GcwzyqJNWekD4B6d_thumbnail.jpg"
            },
            "image" : {
                "height" : "720",
                "width" : "720",
                "url" : "ecommerce/7POqAEnkH3Mtkyc3GcwzyqJNWekD4B6d.jpg"
            }
        }
    ],
    "thumbnail" : {
        "height" : "200",
        "width" : "200",
        "url" : "ecommerce/4Vm_TP-Zzfw8eMJ7EONAybMTajdFjGyR_thumbnail.jpg"
    },
    "region" : {
        "province" : "四川省",
        "city" : "成都市",
        "district" : "金堂县"
    },
    "paymentTypes" : [],
    "updateTime" : ISODate("2017-04-05T09:25:19.484Z"),
    "createTime" : ISODate("2017-04-05T09:25:19.484Z"),
    "parameters" : [ 
        {
            "_id" : ObjectId("58e4b7ff2eb1d5fb64e1e945"),
            "value" : "柚乡苑",
            "name" : "生产厂家"
        }, 
        {
            "_id" : ObjectId("58e4b7ff2eb1d5fb64e1e944"),
            "value" : "苗木",
            "name" : "商品品牌"
        }, 
        {
            "_id" : ObjectId("58e4b7ff2eb1d5fb64e1e943"),
            "value" : "001",
            "name" : "商品编码"
        }, 
        {
            "_id" : ObjectId("58e4b7ff2eb1d5fb64e1e942"),
            "value" : "1",
            "name" : "规格"
        }, 
        {
            "_id" : ObjectId("58e4b7ff2eb1d5fb64e1e941"),
            "value" : "1",
            "name" : "净含量"
        }
    ],
    "minimalAmount" : 10000,
    "__v" : 0
},
{
    "_id" : ObjectId("58e3a3bab15d6c560f768b7e"),
    "type" : 2,
    "merchant" : ObjectId("58feaab9e18f14695e224cb0"),
    "name" : "土鸡蛋",
    "coveringArea" : "全国",
    "unit" : "枚",
    "catalogCode" : "00200",
    "spec" : "50至60g",
    "price" : 0.8,
    "originalPrice" : 0.8,
    "memberPrice" : 0.78,
    "inventory" : 126000,
    "warning" : 12600,
    "description" : "散养土鸡蛋，五谷杂粮喂养，儿时的味道。",
    "status" : 1,
    "remarks" : [],
    "comments" : [],
    "activities" : [],
    "isTop" : false,
    "location" : {
        "province" : "湖南省",
        "city" : "永州市",
        "district" : "道县",
        "citycode" : "0746",
        "adcode" : "431124",
        "township" : "寿雁镇",
        "street" : "",
        "streetNumber" : "",
        "type" : "Point",
        "coordinates" : [ 
            111.5025, 
            25.582634
        ]
    },
    "photos" : [ 
        {
            "_id" : ObjectId("58e3a3bab15d6c560f768b83"),
            "thumbnail" : {
                "url" : "ecommerce/8BGtwd3rjKAXioKheZ3lHVS0Egm6i6y4_thumbnail.jpg",
                "width" : "720",
                "height" : "720"
            },
            "image" : {
                "url" : "ecommerce/8BGtwd3rjKAXioKheZ3lHVS0Egm6i6y4.jpg",
                "width" : "720",
                "height" : "720"
            }
        }, 
        {
            "_id" : ObjectId("58e3a3bab15d6c560f768b82"),
            "thumbnail" : {
                "url" : "ecommerce/6fkuS7EI5uktNB5NWjdBwyn_hXzkcs5h_thumbnail.jpg",
                "width" : "720",
                "height" : "720"
            },
            "image" : {
                "url" : "ecommerce/6fkuS7EI5uktNB5NWjdBwyn_hXzkcs5h.jpg",
                "width" : "720",
                "height" : "720"
            }
        }, 
        {
            "_id" : ObjectId("58e3a3bab15d6c560f768b81"),
            "thumbnail" : {
                "url" : "ecommerce/5DSwcCHWPoGRkJ1m_F436HRa-1tkXEKu_thumbnail.jpg",
                "width" : "720",
                "height" : "720"
            },
            "image" : {
                "url" : "ecommerce/5DSwcCHWPoGRkJ1m_F436HRa-1tkXEKu.jpg",
                "width" : "720",
                "height" : "720"
            }
        }, 
        {
            "_id" : ObjectId("58e3a3bab15d6c560f768b80"),
            "thumbnail" : {
                "url" : "ecommerce/TxfUK63xnhj0rgQZ1C8a48OSlPXvuPgo_thumbnail.jpg",
                "width" : "720",
                "height" : "720"
            },
            "image" : {
                "url" : "ecommerce/TxfUK63xnhj0rgQZ1C8a48OSlPXvuPgo.jpg",
                "width" : "720",
                "height" : "720"
            }
        }, 
        {
            "isMaster" : true,
            "_id" : ObjectId("58e3a3bab15d6c560f768b7f"),
            "thumbnail" : {
                "url" : "ecommerce/n-4vEsRm0Y6roZanKYv-HtfWWjEzCCwc_thumbnail.jpg",
                "width" : "720",
                "height" : "720"
            },
            "image" : {
                "url" : "ecommerce/n-4vEsRm0Y6roZanKYv-HtfWWjEzCCwc.jpg",
                "width" : "720",
                "height" : "720"
            }
        }
    ],
    "thumbnail" : {
        "url" : "ecommerce/ijOL4fnIXWJbjWpNwNL5iPj0xKIUwXzI_thumbnail.jpg",
        "width" : "200",
        "height" : "200"
    },
    "region" : {
        "province" : "湖南省",
        "city" : "永州市",
        "district" : "道县"
    },
    "paymentTypes" : [],
    "updateTime" : ISODate("2017-04-04T13:46:34.340Z"),
    "createTime" : ISODate("2017-04-04T13:46:34.340Z"),
    "parameters" : [ 
        {
            "name" : "商品品牌",
            "value" : "非常道",
            "_id" : ObjectId("58e3a3bab15d6c560f768b88")
        }, 
        {
            "name" : "商品等级",
            "value" : "一级",
            "_id" : ObjectId("58e3a3bab15d6c560f768b87")
        }, 
        {
            "name" : "产地",
            "value" : "湖南永州道县",
            "_id" : ObjectId("58e3a3bab15d6c560f768b86")
        }, 
        {
            "name" : "保质期",
            "value" : "30天",
            "_id" : ObjectId("58e3a3bab15d6c560f768b85")
        }, 
        {
            "name" : "净含量",
            "value" : "45斤",
            "_id" : ObjectId("58e3a3bab15d6c560f768b84")
        }
    ],
    "minimalAmount" : 420,
    "__v" : 0
},
{
    "_id" : ObjectId("58e388c22eb1d5fb64e1e6b2"),
    "type" : 2,
    "merchant" : ObjectId("58feaab9e18f14695e224cb0"),
    "coveringArea" : "全国",
    "unit" : "斤",
    "catalogCode" : "00300",
    "spec" : "2500",
    "price" : 66,
    "originalPrice" : 105,
    "memberPrice" : 60,
    "inventory" : 2000,
    "warning" : 200,
    "name" : "晋谷白马掌小米",
    "status" : 0,
    "remarks" : [],
    "comments" : [],
    "activities" : [],
    "isTop" : false,
    "location" : {
        "province" : "山西省",
        "city" : "太原市",
        "district" : "小店区",
        "citycode" : "0351",
        "adcode" : "140105",
        "township" : "北营街道",
        "street" : "北营北路",
        "streetNumber" : "18号",
        "type" : "Point",
        "coordinates" : [ 
            112.60789, 
            37.79905
        ]
    },
    "photos" : [ 
        {
            "serverId" : "o0Gr3AlHgx3E6QyTmCm8WydjdamPmDCCdwdDfmozkhm3Wf0UV9AGP7ftRhf-iaUw",
            "_id" : ObjectId("58e388c22eb1d5fb64e1e6b4"),
            "thumbnail" : {
                "url" : "product/o0Gr3AlHgx3E6QyTmCm8WydjdamPmDCCdwdDfmozkhm3Wf0UV9AGP7ftRhf-iaUw_thumbnail.jpg"
            },
            "image" : {
                "url" : "product/o0Gr3AlHgx3E6QyTmCm8WydjdamPmDCCdwdDfmozkhm3Wf0UV9AGP7ftRhf-iaUw.jpg"
            }
        }, 
        {
            "serverId" : "1Bo3fV96bxrOHXc4oOiXQWPUYqZj_KRvcnpPxdmfNGW0UOGg93n2l10NJM8DTGDs",
            "isMaster" : true,
            "_id" : ObjectId("58e388c22eb1d5fb64e1e6b3"),
            "thumbnail" : {
                "url" : "product/1Bo3fV96bxrOHXc4oOiXQWPUYqZj_KRvcnpPxdmfNGW0UOGg93n2l10NJM8DTGDs_thumbnail.jpg"
            },
            "image" : {
                "url" : "product/1Bo3fV96bxrOHXc4oOiXQWPUYqZj_KRvcnpPxdmfNGW0UOGg93n2l10NJM8DTGDs.jpg"
            }
        }
    ],
    "thumbnail" : {
        "serverId" : "1Bo3fV96bxrOHXc4oOiXQWPUYqZj_KRvcnpPxdmfNGW0UOGg93n2l10NJM8DTGDs",
        "url" : "product/1Bo3fV96bxrOHXc4oOiXQWPUYqZj_KRvcnpPxdmfNGW0UOGg93n2l10NJM8DTGDs_thumbnail.jpg",
        "thumbnail" : {
            "url" : "product/1Bo3fV96bxrOHXc4oOiXQWPUYqZj_KRvcnpPxdmfNGW0UOGg93n2l10NJM8DTGDs_thumbnail.jpg"
        },
        "image" : {
            "url" : "product/1Bo3fV96bxrOHXc4oOiXQWPUYqZj_KRvcnpPxdmfNGW0UOGg93n2l10NJM8DTGDs.jpg"
        }
    },
    "region" : {
        "province" : "山西省",
        "city" : "太原市",
        "district" : "阳曲县"
    },
    "paymentTypes" : [],
    "updateTime" : ISODate("2017-04-04T11:51:30.771Z"),
    "createTime" : ISODate("2017-04-04T11:51:30.771Z"),
    "parameters" : [ 
        {
            "name" : "商品品牌",
            "value" : "晋谷白马掌",
            "_id" : ObjectId("58e388c22eb1d5fb64e1e6b9")
        }, 
        {
            "name" : "商品等级",
            "value" : "一级",
            "_id" : ObjectId("58e388c22eb1d5fb64e1e6b8")
        }, 
        {
            "name" : "产地",
            "value" : "山西太原阳曲县",
            "_id" : ObjectId("58e388c22eb1d5fb64e1e6b7")
        }, 
        {
            "name" : "保质期",
            "value" : "6个月",
            "_id" : ObjectId("58e388c22eb1d5fb64e1e6b6")
        }, 
        {
            "name" : "净含量",
            "value" : "2500g",
            "_id" : ObjectId("58e388c22eb1d5fb64e1e6b5")
        }
    ],
    "minimalAmount" : 5,
    "__v" : 0
}


/* 1 */
{
    "_id" : ObjectId("56e68b4cb90f57bf69bbd84e"),
    "lastLoginTime" : ISODate("2016-11-17T11:12:22.068Z"),
    "mobile" : "13621026810",
    "headimgurl" : "http://repos.b2cf.cn/images/user/x56u-BGJ7roxQ_EJ8dpTVYwvpPFDuZKe_thumbnail.jpg",
    "interests" : [],
    "isActivated" : true,
    "searchHistory" : [ 
        {
            "key" : "小胡",
            "_id" : ObjectId("582ac3fad26b477f01e7f971"),
            "searchTime" : ISODate("2016-11-15T08:14:50.562Z")
        }, 
        {
            "_id" : ObjectId("582ac5fed26b477f01e7f972"),
            "key" : "小糖",
            "searchTime" : ISODate("2016-12-19T09:42:22.129Z")
        }
    ],
    "delegations" : [],
    "organizations" : [],
    "wechat" : {
        "headimgurl" : "http://wx.qlogo.cn/mmopen/5p063NaicYfKnvsJRn69BXYNUd7KxpQiboibIVc5iapqP6ThdPTPf5gX9FJ2jQSDLSe3qTSXoKwnqice27iaasJVLNHKjYVEiaWNl1f/0",
        "country" : "中国",
        "province" : "北京",
        "city" : "昌平",
        "sex" : 1,
        "nickname" : "莫须有",
        "openid" : "oivAKt6WtV_0A2r4QHFMRHvLhSOY"
    },
    "credit" : 0,
    "money" : 0,
    "identityCertified" : 0,
    "emailCertified" : false,
    "openType" : 2,
    "status" : 1,
    "loginCount" : 14,
    "createTime" : ISODate("2016-03-14T09:58:36.604Z"),
    "addresses" : [],
    "type" : 0,
    "gender" : 0,
    "__v" : 0,
    "updateTime" : ISODate("2017-02-23T10:41:56.924Z"),
    "wechatPaymentOpenId" : "oHBZjwWTiO4CkBtlUraoh-fF0ywQ",
    "sourceType" : "register",
    "nickname" : "莫须有",
    "geoHistory" : [ 
        {
            "_id" : ObjectId("582321469ef15125275b2c0f"),
            "createTime" : ISODate("2016-11-09T13:14:46.543Z"),
            "address" : {
                "citycode" : "010",
                "adcode" : "110108",
                "neighborhoodType" : "",
                "neighborhood" : "",
                "building" : "",
                "buildingType" : "",
                "street" : "圆明园西路",
                "streetNumber" : "40号",
                "province" : "北京市",
                "city" : "北京市",
                "district" : "海淀区",
                "township" : "马连洼街道",
                "isMunicipality" : true,
                "formattedAddress" : "北京市海淀区马连洼街道肖家河回迁住宅"
            },
            "geocode" : {
                "longitude" : 116.284466409792,
                "latitude" : 40.019664653506,
                "accuracy" : 15
            }
        }
    ],
    "realname" : ""
}


{
    "_id" : ObjectId("58e2f8db2eb1d5fb64e1e5d1"),
    "type" : 2,
    "merchant" : ObjectId("58feaab9e18f14695e224cb0"),
    "coveringArea" : "全国",
    "unit" : "斤",
    "catalogCode" : "0030000200",
    "name" : "优质咸鸭蛋 五香咸鸭蛋  无铅松花蛋",
    "spec" : "公斤 个",
    "price" : 6,
    "originalPrice" : 6,
    "memberPrice" : 6,
    "inventory" : 5000,
    "warning" : 500,
    "status" : 1,
    "remarks" : [],
    "comments" : [],
    "activities" : [],
    "isTop" : false,
    "location" : {
        "province" : "河南省",
        "city" : "许昌市",
        "district" : "许昌县",
        "citycode" : "0374",
        "adcode" : "411023",
        "township" : "长村张乡",
        "street" : "兴华路",
        "streetNumber" : "1871号",
        "type" : "Point",
        "coordinates" : [ 
            113.8254, 
            33.98721
        ]
    },
    "photos" : [ 
        {
            "serverId" : "61CHRoqWgcgEcRDO_Gy9kx-J5VdhmjS3gQR-sOqnb4XrSeXbvD7i20k3UCUVugvu",
            "_id" : ObjectId("58e2f8db2eb1d5fb64e1e5d5"),
            "thumbnail" : {
                "url" : "product/61CHRoqWgcgEcRDO_Gy9kx-J5VdhmjS3gQR-sOqnb4XrSeXbvD7i20k3UCUVugvu_thumbnail.jpg"
            },
            "image" : {
                "url" : "product/61CHRoqWgcgEcRDO_Gy9kx-J5VdhmjS3gQR-sOqnb4XrSeXbvD7i20k3UCUVugvu.jpg"
            }
        }, 
        {
            "serverId" : "E3gXQloZWpCixH480KoaSKBw9TumtLGSfJxU5OVXe6hV9ptr_-I7tu1NfLI-YrMX",
            "_id" : ObjectId("58e2f8db2eb1d5fb64e1e5d4"),
            "thumbnail" : {
                "url" : "product/E3gXQloZWpCixH480KoaSKBw9TumtLGSfJxU5OVXe6hV9ptr_-I7tu1NfLI-YrMX_thumbnail.jpg"
            },
            "image" : {
                "url" : "product/E3gXQloZWpCixH480KoaSKBw9TumtLGSfJxU5OVXe6hV9ptr_-I7tu1NfLI-YrMX.jpg"
            }
        }, 
        {
            "serverId" : "ylA-_Zz8mdqJiB7PCw7FHV6rMqm3rCzQw-NSSlQIJWrUpMSwUKGjx-hLrLJlLkud",
            "_id" : ObjectId("58e2f8db2eb1d5fb64e1e5d3"),
            "thumbnail" : {
                "url" : "product/ylA-_Zz8mdqJiB7PCw7FHV6rMqm3rCzQw-NSSlQIJWrUpMSwUKGjx-hLrLJlLkud_thumbnail.jpg"
            },
            "image" : {
                "url" : "product/ylA-_Zz8mdqJiB7PCw7FHV6rMqm3rCzQw-NSSlQIJWrUpMSwUKGjx-hLrLJlLkud.jpg"
            }
        }, 
        {
            "serverId" : "1_wMdKA1rYOK-p7lAGOD2EQtUcvSZfqjRPPMPKv4NN-u2agKF_VzqNWT88zq-Gla",
            "isMaster" : true,
            "_id" : ObjectId("58e2f8db2eb1d5fb64e1e5d2"),
            "thumbnail" : {
                "url" : "product/1_wMdKA1rYOK-p7lAGOD2EQtUcvSZfqjRPPMPKv4NN-u2agKF_VzqNWT88zq-Gla_thumbnail.jpg"
            },
            "image" : {
                "url" : "product/1_wMdKA1rYOK-p7lAGOD2EQtUcvSZfqjRPPMPKv4NN-u2agKF_VzqNWT88zq-Gla.jpg"
            }
        }
    ],
    "thumbnail" : {
        "serverId" : "1_wMdKA1rYOK-p7lAGOD2EQtUcvSZfqjRPPMPKv4NN-u2agKF_VzqNWT88zq-Gla",
        "url" : "product/1_wMdKA1rYOK-p7lAGOD2EQtUcvSZfqjRPPMPKv4NN-u2agKF_VzqNWT88zq-Gla_thumbnail.jpg",
        "thumbnail" : {
            "url" : "product/1_wMdKA1rYOK-p7lAGOD2EQtUcvSZfqjRPPMPKv4NN-u2agKF_VzqNWT88zq-Gla_thumbnail.jpg"
        },
        "image" : {
            "url" : "product/1_wMdKA1rYOK-p7lAGOD2EQtUcvSZfqjRPPMPKv4NN-u2agKF_VzqNWT88zq-Gla.jpg"
        }
    },
    "region" : {
        "province" : "河南省",
        "city" : "许昌市",
        "district" : "魏都区"
    },
    "paymentTypes" : [],
    "updateTime" : ISODate("2017-04-04T01:37:31.224Z"),
    "createTime" : ISODate("2017-04-04T01:37:31.224Z"),
    "parameters" : [ 
        {
            "name" : "商品品牌",
            "value" : "玉丹香  洪湖鸭蛋",
            "_id" : ObjectId("58e2f8db2eb1d5fb64e1e5da")
        }, 
        {
            "name" : "商品等级",
            "value" : "特级",
            "_id" : ObjectId("58e2f8db2eb1d5fb64e1e5d9")
        }, 
        {
            "name" : "产地",
            "value" : "许昌  湖北",
            "_id" : ObjectId("58e2f8db2eb1d5fb64e1e5d8")
        }, 
        {
            "name" : "保质期",
            "value" : "7-30天",
            "_id" : ObjectId("58e2f8db2eb1d5fb64e1e5d7")
        }, 
        {
            "name" : "净含量",
            "value" : null,
            "_id" : ObjectId("58e2f8db2eb1d5fb64e1e5d6")
        }
    ],
    "minimalAmount" : 1,
    "__v" : 0
},
{
    "_id" : ObjectId("58df9218f47821e659fe1f0e"),
    "type" : 2,
    "merchant" : ObjectId("58feaab9e18f14695e224cb0"),
    "coveringArea" : "全国",
    "unit" : "斤",
    "catalogCode" : "0030000200",
    "spec" : "500克.小包5克.120包1斤",
    "price" : 168,
    "originalPrice" : 268,
    "memberPrice" : 150,
    "inventory" : 680,
    "warning" : 68,
    "description" : "天然无污染高山野茶叶.产与北武夷山下",
    "name" : "老枞野茶",
    "status" : 0,
    "remarks" : [],
    "comments" : [],
    "activities" : [],
    "isTop" : false,
    "location" : {
        "coordinates" : [ 
            117.720323, 
            28.312474
        ],
        "type" : "Point",
        "streetNumber" : "93号",
        "street" : "狮江大道",
        "township" : "河口镇",
        "adcode" : "361124",
        "citycode" : "0793",
        "district" : "铅山县",
        "city" : "上饶市",
        "province" : "江西省"
    },
    "photos" : [ 
        {
            "_id" : ObjectId("58df9218f47821e659fe1f13"),
            "thumbnail" : {
                "height" : "720",
                "width" : "720",
                "url" : "http://repos.b2cf.cn/images/ecommerce/8c4VYgzqJvmB1vrVlmZKSWUxb5tR2ao9_thumbnail.jpg"
            },
            "image" : {
                "height" : "720",
                "width" : "720",
                "url" : "http://repos.b2cf.cn/images/ecommerce/8c4VYgzqJvmB1vrVlmZKSWUxb5tR2ao9.jpg"
            }
        }, 
        {
            "_id" : ObjectId("58df9218f47821e659fe1f12"),
            "thumbnail" : {
                "height" : "720",
                "width" : "720",
                "url" : "http://repos.b2cf.cn/images/ecommerce/g6E-k-I_l2DADYTDYUvGXxCZhmKAMNJ2_thumbnail.jpg"
            },
            "image" : {
                "height" : "720",
                "width" : "720",
                "url" : "http://repos.b2cf.cn/images/ecommerce/g6E-k-I_l2DADYTDYUvGXxCZhmKAMNJ2.jpg"
            }
        }, 
        {
            "_id" : ObjectId("58df9218f47821e659fe1f11"),
            "thumbnail" : {
                "height" : "720",
                "width" : "720",
                "url" : "http://repos.b2cf.cn/images/ecommerce/ES_GwZw82JcgxL9FI0_D_SiUeWGyu3OY_thumbnail.jpg"
            },
            "image" : {
                "height" : "720",
                "width" : "720",
                "url" : "http://repos.b2cf.cn/images/ecommerce/ES_GwZw82JcgxL9FI0_D_SiUeWGyu3OY.jpg"
            }
        }, 
        {
            "_id" : ObjectId("58df9218f47821e659fe1f10"),
            "thumbnail" : {
                "height" : "720",
                "width" : "720",
                "url" : "http://repos.b2cf.cn/images/ecommerce/VtkaODQY2RmoJw07LBGfQIHdXKQv1mTa_thumbnail.jpg"
            },
            "image" : {
                "height" : "720",
                "width" : "720",
                "url" : "http://repos.b2cf.cn/images/ecommerce/VtkaODQY2RmoJw07LBGfQIHdXKQv1mTa.jpg"
            }
        }, 
        {
            "_id" : ObjectId("58df9218f47821e659fe1f0f"),
            "isMaster" : true,
            "thumbnail" : {
                "height" : "720",
                "width" : "720",
                "url" : "http://repos.b2cf.cn/images/ecommerce/XA7jUjh3aUi5RhEVqYMXezrgyMDcqsyg_thumbnail.jpg"
            },
            "image" : {
                "height" : "720",
                "width" : "720",
                "url" : "http://repos.b2cf.cn/images/ecommerce/XA7jUjh3aUi5RhEVqYMXezrgyMDcqsyg.jpg"
            }
        }
    ],
    "thumbnail" : {
        "height" : "200",
        "width" : "200",
        "url" : "http://repos.b2cf.cn/images/ecommerce/9J5-BR0U8GHfh0QdhWrcpC-YwQtd_Gzw_thumbnail.jpg"
    },
    "region" : {
        "province" : "江西省",
        "city" : "上饶市",
        "district" : "铅山县",
        "citycode" : "0793",
        "adcode" : "361124",
        "township" : "河口镇",
        "street" : "清湖路",
        "streetNumber" : "29号"
    },
    "paymentTypes" : [],
    "updateTime" : ISODate("2017-04-01T11:42:16.088Z"),
    "createTime" : ISODate("2017-04-01T11:42:16.088Z"),
    "parameters" : [ 
        {
            "_id" : ObjectId("58df9218f47821e659fe1f16"),
            "value" : "大小包装",
            "name" : "包装方式"
        }, 
        {
            "_id" : ObjectId("58df9218f47821e659fe1f15"),
            "value" : "5克小包",
            "name" : "净含量"
        }, 
        {
            "_id" : ObjectId("58df9218f47821e659fe1f14"),
            "value" : "5年",
            "name" : "保质期"
        }
    ],
    "minimalAmount" : 1,
    "__v" : 0
},
{
    "_id" : ObjectId("58df8fbb9d24167646423126"),
    "type" : 2,
    "merchant" : ObjectId("58feaab9e18f14695e224cb0"),
    "name" : "岑源天罡茶叶",
    "coveringArea" : "全国",
    "unit" : "斤",
    "catalogCode" : "0030000200",
    "spec" : "500",
    "price" : 268,
    "originalPrice" : 468,
    "memberPrice" : 188,
    "inventory" : 500,
    "warning" : 50,
    "description" : "产品产与武夷山国家保护区下,天然无污染的高山野茶，产品有正山小种，金骏眉，银骏眉，大红袍,,武夷岩茶。",
    "status" : 0,
    "remarks" : [],
    "comments" : [],
    "activities" : [],
    "isTop" : false,
    "location" : {
        "coordinates" : [ 
            117.720323, 
            28.312474
        ],
        "type" : "Point",
        "streetNumber" : "93号",
        "street" : "狮江大道",
        "township" : "河口镇",
        "adcode" : "361124",
        "citycode" : "0793",
        "district" : "铅山县",
        "city" : "上饶市",
        "province" : "江西省"
    },
    "photos" : [ 
        {
            "_id" : ObjectId("58df8fbb9d2416764642312b"),
            "thumbnail" : {
                "height" : "720",
                "width" : "720",
                "url" : "http://repos.b2cf.cn/images/ecommerce/vLCW62PiF1wcBW9prV66gnSlw9aBBMtE_thumbnail.jpg"
            },
            "image" : {
                "height" : "720",
                "width" : "720",
                "url" : "http://repos.b2cf.cn/images/ecommerce/vLCW62PiF1wcBW9prV66gnSlw9aBBMtE.jpg"
            }
        }, 
        {
            "_id" : ObjectId("58df8fbb9d2416764642312a"),
            "thumbnail" : {
                "height" : "720",
                "width" : "720",
                "url" : "http://repos.b2cf.cn/images/ecommerce/VT8eYxmwLMnuBe_1KFIpDjtruEpYHUhW_thumbnail.jpg"
            },
            "image" : {
                "height" : "720",
                "width" : "720",
                "url" : "http://repos.b2cf.cn/images/ecommerce/VT8eYxmwLMnuBe_1KFIpDjtruEpYHUhW.jpg"
            }
        }, 
        {
            "_id" : ObjectId("58df8fbb9d24167646423129"),
            "thumbnail" : {
                "height" : "720",
                "width" : "720",
                "url" : "http://repos.b2cf.cn/images/ecommerce/cRCDCML0DaxczJhaEZEPtPSD9s1zne41_thumbnail.jpg"
            },
            "image" : {
                "height" : "720",
                "width" : "720",
                "url" : "http://repos.b2cf.cn/images/ecommerce/cRCDCML0DaxczJhaEZEPtPSD9s1zne41.jpg"
            }
        }, 
        {
            "_id" : ObjectId("58df8fbb9d24167646423128"),
            "thumbnail" : {
                "height" : "720",
                "width" : "720",
                "url" : "http://repos.b2cf.cn/images/ecommerce/E71bleCZY127Z8A0VpqdBs2A6Nyehsuc_thumbnail.jpg"
            },
            "image" : {
                "height" : "720",
                "width" : "720",
                "url" : "http://repos.b2cf.cn/images/ecommerce/E71bleCZY127Z8A0VpqdBs2A6Nyehsuc.jpg"
            }
        }, 
        {
            "_id" : ObjectId("58df8fbb9d24167646423127"),
            "isMaster" : true,
            "thumbnail" : {
                "height" : "720",
                "width" : "720",
                "url" : "http://repos.b2cf.cn/images/ecommerce/a1lw83-Ws55DuV0TsMAZ9YEZ-5vECx3O_thumbnail.jpg"
            },
            "image" : {
                "height" : "720",
                "width" : "720",
                "url" : "http://repos.b2cf.cn/images/ecommerce/a1lw83-Ws55DuV0TsMAZ9YEZ-5vECx3O.jpg"
            }
        }
    ],
    "thumbnail" : {
        "height" : "200",
        "width" : "200",
        "url" : "http://repos.b2cf.cn/images/ecommerce/rDoGu2uOUOfS5rgu3HoVhRmB6NgaYQcO_thumbnail.jpg"
    },
    "region" : {
        "province" : "江西省",
        "city" : "上饶市",
        "district" : "铅山县",
        "citycode" : "0793",
        "adcode" : "361124",
        "township" : "河口镇",
        "street" : "清湖路",
        "streetNumber" : "29号"
    },
    "paymentTypes" : [],
    "updateTime" : ISODate("2017-04-01T11:32:11.964Z"),
    "createTime" : ISODate("2017-04-01T11:32:11.964Z"),
    "parameters" : [ 
        {
            "_id" : ObjectId("58df8fbb9d2416764642312e"),
            "value" : "小包",
            "name" : "包装方式"
        }, 
        {
            "_id" : ObjectId("58df8fbb9d2416764642312d"),
            "value" : "0.045克",
            "name" : "净含量"
        }, 
        {
            "_id" : ObjectId("58df8fbb9d2416764642312c"),
            "value" : "2年",
            "name" : "保质期"
        }
    ],
    "minimalAmount" : 1,
    "__v" : 0
},
{
    "_id" : ObjectId("58de4648f47821e659fe1ce5"),
    "type" : 2,
    "merchant" : ObjectId("58feaab9e18f14695e224cb0"),
    "coveringArea" : "全国",
    "unit" : "斤",
    "catalogCode" : "0030000100",
    "price" : 25,
    "name" : "七彩山鸡",
    "spec" : "5000斤",
    "originalPrice" : 30,
    "memberPrice" : 25,
    "inventory" : 5000,
    "warning" : 500,
    "status" : 0,
    "remarks" : [],
    "comments" : [],
    "activities" : [],
    "isTop" : false,
    "photos" : [ 
        {
            "_id" : ObjectId("58de4648f47821e659fe1cea"),
            "thumbnail" : {
                "url" : "ecommerce/T-NexuuYYEOOfghwqEYSQJKlRn-ZdVtb_thumbnail.jpg",
                "width" : "720",
                "height" : "720"
            },
            "image" : {
                "url" : "ecommerce/T-NexuuYYEOOfghwqEYSQJKlRn-ZdVtb.jpg",
                "width" : "720",
                "height" : "720"
            }
        }, 
        {
            "_id" : ObjectId("58de4648f47821e659fe1ce9"),
            "thumbnail" : {
                "url" : "ecommerce/JQpga4D2yoq_SBxiQu7Z_3OSPsD63N4z_thumbnail.jpg",
                "width" : "720",
                "height" : "720"
            },
            "image" : {
                "url" : "ecommerce/JQpga4D2yoq_SBxiQu7Z_3OSPsD63N4z.jpg",
                "width" : "720",
                "height" : "720"
            }
        }, 
        {
            "_id" : ObjectId("58de4648f47821e659fe1ce8"),
            "thumbnail" : {
                "url" : "ecommerce/vLfLJk-LX0I139lHR1S9-ct1Z8aTy1Q6_thumbnail.jpg",
                "width" : "720",
                "height" : "720"
            },
            "image" : {
                "url" : "ecommerce/vLfLJk-LX0I139lHR1S9-ct1Z8aTy1Q6.jpg",
                "width" : "720",
                "height" : "720"
            }
        }, 
        {
            "_id" : ObjectId("58de4648f47821e659fe1ce7"),
            "thumbnail" : {
                "url" : "ecommerce/aoiUbmZFTaI_8jHHLpmv7FFrgnmsdy0R_thumbnail.jpg",
                "width" : "720",
                "height" : "720"
            },
            "image" : {
                "url" : "ecommerce/aoiUbmZFTaI_8jHHLpmv7FFrgnmsdy0R.jpg",
                "width" : "720",
                "height" : "720"
            }
        }, 
        {
            "isMaster" : true,
            "_id" : ObjectId("58de4648f47821e659fe1ce6"),
            "thumbnail" : {
                "url" : "ecommerce/aEcH6lttzALwTsCN7474na0d0lDqFvtl_thumbnail.jpg",
                "width" : "720",
                "height" : "720"
            },
            "image" : {
                "url" : "ecommerce/aEcH6lttzALwTsCN7474na0d0lDqFvtl.jpg",
                "width" : "720",
                "height" : "720"
            }
        }
    ],
    "thumbnail" : {
        "url" : "ecommerce/l3x6yLYLG0Yzn7ZRFsZwwCIyLNM7Lvvp_thumbnail.jpg",
        "width" : "200",
        "height" : "200"
    },
    "region" : {
        "district" : "广水市",
        "city" : "随州市",
        "province" : "湖北省"
    },
    "paymentTypes" : [],
    "updateTime" : ISODate("2017-03-31T12:06:32.028Z"),
    "createTime" : ISODate("2017-03-31T12:06:32.027Z"),
    "parameters" : [ 
        {
            "name" : "商品品牌",
            "value" : null,
            "_id" : ObjectId("58de4648f47821e659fe1cef")
        }, 
        {
            "name" : "商品等级",
            "value" : null,
            "_id" : ObjectId("58de4648f47821e659fe1cee")
        }, 
        {
            "name" : "产地",
            "value" : null,
            "_id" : ObjectId("58de4648f47821e659fe1ced")
        }, 
        {
            "name" : "保质期",
            "value" : null,
            "_id" : ObjectId("58de4648f47821e659fe1cec")
        }, 
        {
            "name" : "净含量",
            "value" : null,
            "_id" : ObjectId("58de4648f47821e659fe1ceb")
        }
    ],
    "minimalAmount" : 1,
    "__v" : 0
},
{
    "_id" : ObjectId("58ddea29f47821e659fe1c67"),
    "type" : 0,
    "merchant" : ObjectId("58feaab9e18f14695e224cb0"),
    "coveringArea" : "全国",
    "unit" : "棵",
    "catalogCode" : "0030000100",
    "name" : "红薯苗",
    "spec" : "5000000棵",
    "price" : 0.1,
    "originalPrice" : 0.11,
    "memberPrice" : 0.09,
    "inventory" : 5000000,
    "warning" : 500000,
    "status" : 0,
    "remarks" : [],
    "comments" : [],
    "activities" : [],
    "isTop" : false,
    "location" : {
        "province" : "河南省",
        "city" : "驻马店市",
        "district" : "确山县",
        "citycode" : "0396",
        "adcode" : "411725",
        "township" : "瓦岗镇",
        "street" : "",
        "streetNumber" : "",
        "type" : "Point",
        "coordinates" : [ 
            113.84988, 
            32.76059
        ]
    },
    "photos" : [ 
        {
            "serverId" : "J3407iyrR6MfAcA6lql6KmV1g2SvE0srFHXW0lx5y8hnsP-9lfPI5nAn8QTtP8kU",
            "_id" : ObjectId("58ddea29f47821e659fe1c69"),
            "thumbnail" : {
                "url" : "product/J3407iyrR6MfAcA6lql6KmV1g2SvE0srFHXW0lx5y8hnsP-9lfPI5nAn8QTtP8kU_thumbnail.jpg"
            },
            "image" : {
                "url" : "product/J3407iyrR6MfAcA6lql6KmV1g2SvE0srFHXW0lx5y8hnsP-9lfPI5nAn8QTtP8kU.jpg"
            }
        }, 
        {
            "serverId" : "nq_H1NkeoBCL70wMfK3Cm9wO6O87DlSx3HHLzl1T7r5AuBBnhGe8hZTX9Gr_mwJp",
            "isMaster" : true,
            "_id" : ObjectId("58ddea29f47821e659fe1c68"),
            "thumbnail" : {
                "url" : "product/nq_H1NkeoBCL70wMfK3Cm9wO6O87DlSx3HHLzl1T7r5AuBBnhGe8hZTX9Gr_mwJp_thumbnail.jpg"
            },
            "image" : {
                "url" : "product/nq_H1NkeoBCL70wMfK3Cm9wO6O87DlSx3HHLzl1T7r5AuBBnhGe8hZTX9Gr_mwJp.jpg"
            }
        }
    ],
    "thumbnail" : {
        "serverId" : "nq_H1NkeoBCL70wMfK3Cm9wO6O87DlSx3HHLzl1T7r5AuBBnhGe8hZTX9Gr_mwJp",
        "url" : "product/nq_H1NkeoBCL70wMfK3Cm9wO6O87DlSx3HHLzl1T7r5AuBBnhGe8hZTX9Gr_mwJp_thumbnail.jpg",
        "thumbnail" : {
            "url" : "product/nq_H1NkeoBCL70wMfK3Cm9wO6O87DlSx3HHLzl1T7r5AuBBnhGe8hZTX9Gr_mwJp_thumbnail.jpg"
        },
        "image" : {
            "url" : "product/nq_H1NkeoBCL70wMfK3Cm9wO6O87DlSx3HHLzl1T7r5AuBBnhGe8hZTX9Gr_mwJp.jpg"
        }
    },
    "region" : {
        "district" : "",
        "city" : "",
        "province" : "河南省"
    },
    "paymentTypes" : [],
    "updateTime" : ISODate("2017-03-31T05:33:29.004Z"),
    "createTime" : ISODate("2017-03-31T05:33:29.004Z"),
    "parameters" : [ 
        {
            "name" : "生产厂家",
            "value" : null,
            "_id" : ObjectId("58ddea29f47821e659fe1c6e")
        }, 
        {
            "name" : "商品品牌",
            "value" : null,
            "_id" : ObjectId("58ddea29f47821e659fe1c6d")
        }, 
        {
            "name" : "商品编码",
            "value" : null,
            "_id" : ObjectId("58ddea29f47821e659fe1c6c")
        }, 
        {
            "name" : "规格",
            "value" : null,
            "_id" : ObjectId("58ddea29f47821e659fe1c6b")
        }, 
        {
            "name" : "净含量",
            "value" : null,
            "_id" : ObjectId("58ddea29f47821e659fe1c6a")
        }
    ],
    "minimalAmount" : 1,
    "__v" : 0
},
{
    "_id" : ObjectId("58ddda9c9d24167646422dfd"),
    "type" : 2,
    "merchant" : ObjectId("58feaab9e18f14695e224cb0"),
    "name" : "玫瑰花茶",
    "coveringArea" : "全国",
    "unit" : "斤",
    "catalogCode" : "0030000100",
    "spec" : "50g",
    "price" : 68,
    "originalPrice" : 88,
    "memberPrice" : 68,
    "inventory" : 20000,
    "warning" : 2000,
    "description" : "常喝玫瑰花茶有三大功效：1消除疲劳增强体质，2改善肠胃调理气血，3美容养颜调经止痛。各种包装的玫瑰花茶适合走亲访友和犒劳自己哦！",
    "status" : 0,
    "remarks" : [],
    "comments" : [],
    "activities" : [],
    "isTop" : false,
    "location" : {
        "coordinates" : [ 
            115.381338, 
            36.069745
        ],
        "type" : "Point",
        "streetNumber" : "",
        "street" : "",
        "township" : "千口乡",
        "adcode" : "410923",
        "citycode" : "0393",
        "district" : "南乐县",
        "city" : "濮阳市",
        "province" : "河南省"
    },
    "photos" : [ 
        {
            "isMaster" : true,
            "_id" : ObjectId("58dddb20f47821e659fe1bef"),
            "thumbnail" : {
                "height" : "720",
                "width" : "720",
                "url" : "ecommerce/hf9Hdh_l1jvEJa5u2L8JB_ZbUnKMD3D5_thumbnail.jpg"
            },
            "image" : {
                "height" : "720",
                "width" : "720",
                "url" : "ecommerce/hf9Hdh_l1jvEJa5u2L8JB_ZbUnKMD3D5.jpg"
            }
        }
    ],
    "thumbnail" : {
        "height" : "200",
        "width" : "200",
        "url" : "ecommerce/CcklHgW2hbqJN380C_eperJ-KCm3zZaS_thumbnail.jpg"
    },
    "region" : {
        "district" : "南乐县",
        "city" : "濮阳市",
        "province" : "河南省"
    },
    "paymentTypes" : [],
    "updateTime" : ISODate("2017-03-31T04:27:08.961Z"),
    "createTime" : ISODate("2017-03-31T04:27:08.961Z"),
    "parameters" : [],
    "minimalAmount" : 1,
    "__v" : 0
}