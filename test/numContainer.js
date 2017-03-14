
'use strict';

class Container {
  constructor() {
    this.sortArr = [];
    this.naturalArr = [];
  }
  pop() {

  }
  put() {

  }
}

var container = new Container();

var str = '{"_id":"58a6e5168748e36ffe7576fe","name":"邯郸市农村产权流转交易平台","tenantCode":"default","mapUrl":"pool/local/image/portal/AloreQBh9kxnlwrGF_ZAPbGH1yJhUJx4.jpg","areaCode":"1304","archived":false,"subPortals":[{"portalId":"58a6e5500d74b37167a5938d","coords":"228,40,255,60","_id":"58b675f7837a66748b4022da"}],"url":[{"domainName":"test.portal.chanquan.tudi66.com","port":80,"protocol":"http","_id":"58b675f7837a66748b4022dc"},{"domainName":"city.test.portal.chanquan.tudi66.com","port":80,"protocol":"http","_id":"58b675f7837a66748b4022db"}],"__v":0,"footer":"<p><br/></p ><p>qwdqwd</p ><p>< img src=\"https://test.repo.chanquan.tudi66.com:443/pool/local/image/portal/9pX7hCTKy0fxCf095NqF5lNAj_ES4_wB.jpg\"/></p ><p><a href= "https://test.repo.chanquan.tudi66.com:443/pool/local/doc/portal/S2z0Lao08we4LKbgjPkJOVHJ2eM7FrLB.docx\">9.2.docx</a ></p >","ico":"pool/local/image/portal/69SPFdy8s5ZzatP6b9nUGsJsFmViMgV_.jpg","logo":"pool/local/image/portal/HnjZkZjgJkAq9optpbSkenvmYVD9S4mN.jpg","repoDomain":[{"domainName":"test.repo.chanquan.tudi66.com","port":"443","protocol":"https","_id":"58b675da2185026c2a84722b"},{"domainName":"test.repo.chanquan.tudi66.com","port":"80","protocol":"http","_id":"58b675da2185026c2a84722a"}],"partners":[{"_id":"58a3a2ad33de8001c9aeacf1","portalId":"58a6e5168748e36ffe7576fe","name":"神州土地","url":"http://www.tudi66.com/","logo":"pool/local/image/portal/A5aj6tgAn7mylsEcs8ap68-684hQZ0u0.jpeg","archived":false,"weight":100,"__v":0},{"_id":"58a3a2ad33de8001c9aeacf2","portalId":"58a6e5168748e36ffe7576fe","name":"天津产权交易所","url":"http://www.tjsoc.com/","logo":"pool/local/image/portal/h2imB18JvQrLDsZy8Yo39C6SV9EHjkQy.jpg","archived":false,"weight":99,"__v":0},{"_id":"58a3a2ad33de8001c9aeacf3","portalId":"58a6e5168748e36ffe7576fe","name":"天津农村工作委员会","url":"http://www.tjaci.gov.cn/","logo":"pool/local/image/portal/Nh6bBgi-P3eymE_iJNPe7qUPxMA5bOqJ.jpg","archived":false,"weight":98,"__v":0},{"_id":"58a3a2ad33de8001c9aeacf4","portalId":"58a6e5168748e36ffe7576fe","name":"玉林农村产权交易中心","url":"http://www.ylaee.com/","logo":"pool/local/image/portal/pmYcqvfiMmOD1XMkibjiqGloqm5VoW3n.jpg","archived":false,"weight":97,"__v":0},{"_id":"58a3a2ad33de8001c9aeacf5","portalId":"58a6e5168748e36ffe7576fe","name":"北京农村产权交易所","url":"http://www.bjraee.com/","logo":"pool/local/image/portal/wmCi1VMN4BWKCQ3Wpo3Tug0YXRZTkkYP.jpg","archived":false,"weight":96,"__v":0}],"areaCodeInfo":{"_id":"58afe3861c47d5067775964b","code":"1304","name":"邯郸市","createdTime":"2017-02-24T07:40:54.096Z","archived":false,"__v":0},"navbars":[{"_id":"58a3a2ad33de7001c8aeacf1","name":"新闻中心","order":1,"level":1,"url":"newsCenter","createdTime":"2017-02-24T07:40:59.594Z","navbar":true,"archived":false,"__v":0},{"_id":"58a3a2ad33de7001c8aeacf4","name":"通知公告","order":2,"level":1,"url":"notice","createdTime":"2017-02-24T07:40:59.606Z","navbar":true,"archived":false,"__v":0},{"_id":"58a3a2ad33de7001c8aeacf7","name":"政策法规","order":3,"level":1,"url":"policies","createdTime":"2017-02-24T07:40:59.609Z","navbar":true,"archived":false,"__v":0},{"_id":"58a3a2ad33de7001c8aeacd0","name":"交易规则","order":4,"level":1,"url":"rules","createdTime":"2017-02-24T07:40:59.610Z","navbar":true,"archived":false,"__v":0},{"_id":"58a3a2ad33de7001c8aeacd5","name":"交易监管","order":5,"level":1,"url":"regulations","createdTime":"2017-02-24T07:40:59.623Z","navbar":true,"archived":false,"__v":0},{"_id":"58a3a2ad33de7001c8aeacd8","name":"交易分析","order":6,"level":1,"url":"transactionAnalysis","createdTime":"2017-02-24T07:40:59.626Z","navbar":true,"archived":false,"__v":0},{"_id":"58a3a2ad33de7001c8aeace5","name":"资料下载","order":7,"level":1,"url":"documents","createdTime":"2017-02-24T07:40:59.628Z","navbar":true,"archived":false,"__v":0},{"_id":"58a3a2ad33de7001c8aeace3","name":"联系我们","order":8,"level":1,"url":"contactUs","createdTime":"2017-02-24T07:40:59.633Z","navbar":true,"archived":false,"__v":0},{"_id":"58a3a2ad33de7001c8aeace1","name":"图片新闻","order":9,"level":1,"url":"carouselSetting","createdTime":"2017-02-24T07:40:59.634Z","navbar":false,"archived":false,"__v":0}]}';

var json = JSON.parse(str);

{"_id": "58a3a2ad33de7001c8aeace1", "name":"图片新闻","order":9,"level":1, "navbar": false, "url":"carouselSetting"},
{"_id": "58a3a2ad33de7001c8aeace2", "name":"图片新闻","order":1,"level":2, "navbar": false, "url":"", "parent": "58a3a2ad33de7001c8aeace1"}