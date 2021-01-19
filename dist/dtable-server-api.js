"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DTableServerAPI =
/*#__PURE__*/
function () {
  function DTableServerAPI(config) {
    _classCallCheck(this, DTableServerAPI);

    this.req = _axios["default"].create();
    this.config = config;
  }

  _createClass(DTableServerAPI, [{
    key: "getTableData",
    value: function getTableData() {
      var _this$config = this.config,
          dtableServer = _this$config.dtableServer,
          dtableUuid = _this$config.dtableUuid,
          accessToken = _this$config.accessToken,
          lang = _this$config.lang;
      var url = dtableServer + 'dtables/' + dtableUuid;
      return this.req.get(url, {
        headers: {
          'Authorization': 'Token ' + accessToken
        },
        params: {
          lang: lang || 'en'
        }
      });
    }
  }, {
    key: "getRowCommentsCount",
    value: function getRowCommentsCount(rowId) {
      var _this$config2 = this.config,
          dtableServer = _this$config2.dtableServer,
          dtableUuid = _this$config2.dtableUuid,
          accessToken = _this$config2.accessToken;
      var url = dtableServer + 'api/v1/dtables/' + dtableUuid + '/comments-count/';
      var params = {
        row_id: rowId
      };
      return this.req.get(url, {
        headers: {
          'Authorization': 'Token ' + accessToken
        },
        params: params
      });
    }
  }]);

  return DTableServerAPI;
}();

var _default = DTableServerAPI;
exports["default"] = _default;