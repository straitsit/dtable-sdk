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

var DTableWebAPI =
/*#__PURE__*/
function () {
  function DTableWebAPI(config) {
    _classCallCheck(this, DTableWebAPI);

    this.config = config;
    this.req = _axios["default"].create();
  }

  _createClass(DTableWebAPI, [{
    key: "getDTableAccessToken",
    value: function getDTableAccessToken() {
      var _this$config = this.config,
          server = _this$config.server,
          APIToken = _this$config.APIToken;
      var url = server + '/api/v2.1/dtable/app-access-token/';
      var headers = {
        'Authorization': 'Token ' + APIToken
      };
      return this.req.get(url, {
        headers: headers
      });
    }
  }, {
    key: "getFileUploadLink",
    value: function getFileUploadLink() {
      var _this$config2 = this.config,
          server = _this$config2.server,
          APIToken = _this$config2.APIToken,
          workspaceID = _this$config2.workspaceID,
          dtableName = _this$config2.dtableName;
      var url = server + '/api/v2.1/dtable/app-upload-link/';
      var headers = {
        'Authorization': 'Token ' + APIToken
      };
      var params = {
        workspace_id: workspaceID,
        name: dtableName
      };
      return this.req.get(url, {
        headers: headers,
        params: params
      });
    }
  }]);

  return DTableWebAPI;
}();

var _default = DTableWebAPI;
exports["default"] = _default;