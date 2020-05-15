/**
 * validator
 */

/*eslint no-useless-escape: "error"*/

const strategies = {
  //判空
  isNull: function(value) {
    if (typeof value == "function") {
      return false;
    }
    return (
      typeof value == "undefined" ||
      value == "" ||
      value == null ||
      value == undefined ||
      value == "null" ||
      (value instanceof Object && Object.keys(value).length == 0)
    );
  },
  // 邮箱
  email: function(v) {
    if (!v) {
      return "请输入邮箱。";
    }
    if (
      !/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(
        v
      )
    ) {
      return "请输入正确的邮箱。";
    }
    return true;
  },

  // 获取Url参数
  getUrlParam: function(paraName) {
    // eslint-disable-next-line no-undef
    var url = document.location.toString();
    var arrObj = url.split("?");

    if (arrObj.length > 1) {
      var arrPara = arrObj[1].split("&");
      var arr;

      for (var i = 0; i < arrPara.length; i++) {
        arr = arrPara[i].split("=");

        if (arr != null && arr[0] == paraName) {
          return arr[1];
        }
      }
      return "";
    } else {
      return "";
    }
  },
  /**
   * 手机号
   * @param {} v
   */
  mobile: function(v) {
    if (!v) {
      return "请输入手机号码。";
    }
    if (!/^1\d{10}$/.test(v)) {
      return "请输入正确的手机号码。";
    }
    return true;
  },

  // pwd
  pwd: function(v) {
    return /^(?=.*?[a-zA-Z])(?=.*?[0-9])[a-zA-Z0-9]{8,15}$/.test(v);
  },

  /**
   * 身份证验证
   * @param {*} v
   */
  IDCard: function(v) {
    // 判断输入是否符合
    ///^\d{17}[\da-zA-Z]{1}$/
    // const idNoReg = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    if (!/^\d{17}[\dXx]{1}$/.test(v)) {
      return "请输入正确的身份证号码";
    }
    return true;
  },
  //邮编验证
  ZipCode: {
    rules: [
      {
        required: true,
        message: "请输入"
      },
      {
        pattern: /^[0-9]{6}$/,
        message: "请填写正确格式"
      }
    ]
  }
};

const validator = function() {
  this.cache = [];
  this.add = function(method, val) {
    this.cache.push(function() {
      return strategies[method](val);
    });
  };
  this.check = function() {
    for (let i = 0; i < this.cache.length; i++) {
      const result = this.cache[i]();
      if (!result) {
        return false;
      }
    }
    return true;
  };
};

export default validator;
