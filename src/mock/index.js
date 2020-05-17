import Mock from "mockjs"; // 引入mockjs

let data = {
  "users|5": [
    {
      name: "@cname", //中文名称
      "age|1-100": 100, //100以内随机整数
      birthday: '@date("yyyy-MM-dd")', //日期
      city: "@city(true)", //中国城市
    },
  ],
};
Mock.mock("/data/index", "get", data); // 根据数据模板生成模拟数据
