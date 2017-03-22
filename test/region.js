var arr = /^(.*?省|.*?市|.*?自治区){1}(.?市|.*?自治州|阿克苏地区){1}(.*?区$|.*?县$|.*?市$|.*?旗$){1}/g.exec('广西壮族自治区河池市市辖区');
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
})