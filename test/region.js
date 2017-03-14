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