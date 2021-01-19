"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Utils =
/*#__PURE__*/
function () {
  function Utils() {
    _classCallCheck(this, Utils);
  }

  _createClass(Utils, [{
    key: "formatDate",
    value: function formatDate(date) {
      return this._formatDate(date);
    }
  }, {
    key: "formatDateWithMinutes",
    value: function formatDateWithMinutes(date) {
      return this._formatDate(date, true);
    }
  }, {
    key: "_formatDate",
    value: function _formatDate(date) {
      var widthMinutes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (!isNaN(Date.parse(new Date(date)))) {
        var newDate = new Date(date);

        if (newDate && newDate.getYear()) {
          var year = newDate.getFullYear();

          if (String(year).length !== 4) {
            return 'Invaild date';
          }

          ;
          var month = newDate.getMonth() + 1;

          var _date = newDate.getDate();

          var minute = newDate.getMinutes();
          var hour = newDate.getHours();
          month = month < 10 ? "0".concat(month) : month;
          _date = _date < 10 ? "0".concat(_date) : _date;
          hour = hour < 10 ? "0".concat(hour) : hour;
          minute = minute < 10 ? "0".concat(minute) : minute;

          if (!widthMinutes) {
            return "".concat(year, "-").concat(month, "-").concat(_date);
          } else {
            return "".concat(year, "-").concat(month, "-").concat(_date, " ").concat(hour, ":").concat(minute);
          }
        }
      }

      return 'Invalid date';
    }
  }]);

  return Utils;
}();

var _default = Utils;
exports["default"] = _default;