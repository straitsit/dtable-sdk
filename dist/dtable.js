"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _formData = _interopRequireDefault(require("form-data"));

var _dtableStore = require("dtable-store");

var _debug = _interopRequireDefault(require("debug"));

var _dtableServerApi = _interopRequireDefault(require("./dtable-server-api"));

var _dtableWebApi = _interopRequireDefault(require("./dtable-web-api"));

var _utils = _interopRequireDefault(require("./utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var debug = (0, _debug["default"])('dtable:sdk');
var ACCESS_TOKEN_INTERVAL_TIME = (3 * 24 * 60 - 1) * 60 * 1000;

var DTable =
/*#__PURE__*/
function () {
  function DTable() {
    _classCallCheck(this, DTable);

    this.dtableStore = null;
    this.eventBus = null;
    this.dtableWebAPI = null;
    this.dtableServerAPI = null;
    this.utils = new _utils["default"]();
  }

  _createClass(DTable, [{
    key: "init",
    value: function init(config) {
      var res, _res$data, app_name, access_token, dtable_uuid, dtable_server, dtable_socket;

      return regeneratorRuntime.async(function init$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              this.dtableWebAPI = new _dtableWebApi["default"](config);
              this.config = config;
              _context.prev = 2;
              _context.next = 5;
              return regeneratorRuntime.awrap(this.dtableWebAPI.getDTableAccessToken());

            case 5:
              res = _context.sent;
              _res$data = res.data, app_name = _res$data.app_name, access_token = _res$data.access_token, dtable_uuid = _res$data.dtable_uuid, dtable_server = _res$data.dtable_server, dtable_socket = _res$data.dtable_socket;
              this.config.appName = app_name;
              this.config.accessToken = access_token;
              this.config.dtableUuid = dtable_uuid;
              this.config.dtableServer = dtable_server.replace(/\/+$/, '') + '/';
              this.config.dtableSocket = dtable_socket.replace(/\/+$/, '') + '/';
              this.dtableServerAPI = new _dtableServerApi["default"](this.config);
              this.dtableStore = new _dtableStore.DTableStore(this.config);
              this.eventBus = this.dtableStore.eventBus;
              _context.next = 20;
              break;

            case 17:
              _context.prev = 17;
              _context.t0 = _context["catch"](2);
              console.log(_context.t0);

            case 20:
            case "end":
              return _context.stop();
          }
        }
      }, null, this, [[2, 17]]);
    }
  }, {
    key: "initInBrowser",
    value: function initInBrowser(dtableStore) {
      // init tool object
      this.dtableStore = dtableStore;
      this.eventBus = this.dtableStore.eventBus;
      this.config = {};
      this.dtableServerAPI = null;
    }
  }, {
    key: "syncWithServer",
    value: function syncWithServer() {
      return regeneratorRuntime.async(function syncWithServer$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(this.dtableStore.loadFromServer());

            case 2:
              _context2.next = 4;
              return regeneratorRuntime.awrap(this.dtableStore.loadRelatedUsers());

            case 4:
              this.dtableStore.syncWithServer();
              this.updateDTableAccessToken();

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "updateDTableAccessToken",
    value: function updateDTableAccessToken() {
      var _this = this;

      setInterval(function _callee() {
        var res;
        return regeneratorRuntime.async(function _callee$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return regeneratorRuntime.awrap(_this.dtableWebAPI.getDTableAccessToken());

              case 3:
                res = _context3.sent;

                _this.dtableStore.updateAccessToken(res.data.access_token);

                _context3.next = 10;
                break;

              case 7:
                _context3.prev = 7;
                _context3.t0 = _context3["catch"](0);
                console.log(_context3.t0);

              case 10:
              case "end":
                return _context3.stop();
            }
          }
        }, null, null, [[0, 7]]);
      }, ACCESS_TOKEN_INTERVAL_TIME);
    }
  }, {
    key: "subscribe",
    value: function subscribe(eventType, fn) {
      return this.eventBus.subscribe(eventType, fn);
    }
  }, {
    key: "destory",
    value: function destory() {
      this.dtableStore = null;
      this.eventBus = null;
    }
  }, {
    key: "getRelatedUsers",
    value: function getRelatedUsers() {
      return this.dtableStore.collaborators;
    }
  }, {
    key: "getActiveTable",
    value: function getActiveTable() {
      var tables = this.getTables();
      return this.dtableStore.currentTable || tables[0];
    }
  }, {
    key: "getTables",
    value: function getTables() {
      return this.dtableStore.value.tables;
    }
  }, {
    key: "getTableByName",
    value: function getTableByName(name) {
      var tables = this.getTables();
      return _dtableStore.TableUtils.getTableByName(tables, name);
    }
  }, {
    key: "getActiveView",
    value: function getActiveView() {
      var activeTable = this.getActiveTable();
      var views = this.getViews(activeTable);
      var active_index = this.dtableStore.view_index;
      return views[active_index] || views[0];
    }
  }, {
    key: "getViews",
    value: function getViews(table) {
      return table.views;
    }
  }, {
    key: "getViewByName",
    value: function getViewByName(table, view_name) {
      return _dtableStore.Views.getViewByName(table.views, view_name);
    }
  }, {
    key: "getViewById",
    value: function getViewById(table, view_id) {
      return _dtableStore.Views.getViewById(table.views, view_id);
    }
  }, {
    key: "getColumns",
    value: function getColumns(table) {
      return table.columns;
    }
  }, {
    key: "getShownColumns",
    value: function getShownColumns(table, view) {
      var hidden_columns = view.hidden_columns;
      var shownColumns = table.columns.filter(function (column) {
        return hidden_columns.indexOf(column.key) === -1;
      });
      return shownColumns;
    }
  }, {
    key: "getColumnByName",
    value: function getColumnByName(table, name) {
      return table.columns.find(function (column) {
        return column.name === name;
      });
    }
  }, {
    key: "getColumnByKey",
    value: function getColumnByKey(table, key) {
      return table.columns.find(function (column) {
        return column.key === key;
      });
    }
  }, {
    key: "getColumnsByType",
    value: function getColumnsByType(table, type) {
      return this.getColumns(table).filter(function (item) {
        return item.type === type;
      });
    }
  }, {
    key: "getCellType",
    value: function getCellType() {
      return _dtableStore.CellType;
    }
  }, {
    key: "getColumnIconConfig",
    value: function getColumnIconConfig() {
      return _dtableStore.COLUMNS_ICON_CONFIG;
    }
  }, {
    key: "getRowById",
    value: function getRowById(table, rowId) {
      return table.id_row_map[rowId];
    }
  }, {
    key: "appendRow",
    value: function appendRow(table, rowData) {
      var view = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var tables = this.getTables();
      var tableIndex = tables.findIndex(function (t) {
        return t._id === table._id;
      });

      if (tableIndex === -1) {
        return;
      }

      var newRowData = _dtableStore.RowUtils.convertRowBack(rowData, table);

      var rows = view ? this.getViewRows(view, table) : table.rows;
      var lastRow = rows.length === 0 ? null : rows[rows.length - 1];
      var rowId = lastRow ? lastRow._id : '';
      this.dtableStore.insertRow(tableIndex, rowId, 'insert_below', newRowData);
    }
  }, {
    key: "deleteRowById",
    value: function deleteRowById(table, row_id) {
      this.dtableStore.deleteRowById(table._id, row_id);
    }
  }, {
    key: "deleteRowsByIds",
    value: function deleteRowsByIds(table, row_ids) {
      var tables = this.getTables();
      var tableIndex = tables.findIndex(function (t) {
        return t._id === table._id;
      });
      var deleted_rows = [];
      var upper_row_ids = [];
      this.dtableStore.deleteRows(tableIndex, row_ids, deleted_rows, upper_row_ids);
    }
  }, {
    key: "modifyRow",
    value: function modifyRow(table, row, updated) {
      var tables = this.getTables();
      var tableIndex = tables.findIndex(function (t) {
        return t._id === table._id;
      });

      if (tableIndex === -1) {
        return;
      }

      var newUpdated = _dtableStore.RowUtils.convertRowBack(updated, table);

      var oldData = {};
      Object.keys(newUpdated).forEach(function (key) {
        oldData[key] = row[key];
      });

      if (JSON.stringify(oldData) === JSON.stringify(newUpdated)) {
        return;
      }

      this.dtableStore.modifyRow(tableIndex, row._id, newUpdated, null);
    }
  }, {
    key: "forEachRow",
    value: function forEachRow(tableName, viewName, callback) {
      var value = this.dtableStore.value;
      var tables = this.getTables();

      var table = _dtableStore.TableUtils.getTableByName(tables, tableName);

      if (!table) {
        debug("table ".concat(tableName, " does not exist."));
        return;
      }

      var view = _dtableStore.Views.getViewByName(table.views, viewName);

      if (!view) {
        debug("view ".concat(viewName, " does not exist."));
        return;
      }

      var rows = this.getViewRows(view, table);

      var formulaColumns = _dtableStore.Views.getAllFormulaColumns(_dtableStore.Views.getColumns(view, table));

      var formulaResults = {};

      if (formulaColumns && formulaColumns.length > 0) {
        formulaResults = _dtableStore.Views.getTableFormulaResults(table, formulaColumns, rows, value);
      }

      rows.forEach(function (row) {
        var newRow = _dtableStore.RowUtils.convertRow(row, value, table, view, formulaResults);

        callback(newRow);
      });
    }
  }, {
    key: "getViewRows",
    value: function getViewRows(view, table) {
      return _dtableStore.Views.getViewRows(view, table, this.dtableStore.value);
    }
  }, {
    key: "getInsertedRowInitData",
    value: function getInsertedRowInitData(view, table, row_id) {
      var row_data = {};

      if (!_dtableStore.Views.isDefaultView(view, table.columns)) {
        // originRowData: {[column.key]: cell_value}, exclude columns: auto_number
        // row_data, which is converted from originRowData: {[column.name]: converted_cell_value}
        var value = this.dtableStore.value;

        var originRowData = _dtableStore.Views.getRowDataUsedInFilters(view, table, row_id);

        row_data = _dtableStore.RowUtils.convertRow(originRowData, value, table, view);
      }

      return row_data;
    }
  }, {
    key: "getRowCommentCount",
    value: function getRowCommentCount(rowID) {
      return this.dtableServerAPI.getRowCommentsCount(rowID);
    }
  }, {
    key: "uploadFile",
    value: function uploadFile(filePath, callback) {
      var _this2 = this;

      this.dtableWebAPI.getFileUploadLink().then(function (res) {
        var uploadLink = res.data.upload_link + '?ret-json=1';
        var parentPath = res.data.parent_path;
        var relativePath = 'files';
        var formData = new _formData["default"]();
        formData.append('parent_dir', parentPath);
        formData.append('relative_path', relativePath);
        //formData.append('file', _fs["default"].createReadStream(filePath));
        formData.getLength(function (err, length) {
          if (err) {
            callback(err);
          } else {
            var headers = Object.assign({
              'Content-Length': length
            }, formData.getHeaders());

            _axios["default"].post(uploadLink, formData, {
              headers: headers
            }).then(function (res) {
              // add file url
              var fileInfo = res.data[0];
              var _this2$config = _this2.config,
                  server = _this2$config.server,
                  workspaceID = _this2$config.workspaceID;
              var url = server + '/workspace/' + workspaceID + parentPath + '/' + relativePath + '/' + encodeURIComponent(fileInfo.name);
              fileInfo.url = url;
              callback(false, fileInfo);
            })["catch"](function (err) {
              callback(err);
            });
          }
        });
      })["catch"](function (err) {
        callback(err);
      });
    }
  }, {
    key: "getPluginSettings",
    value: function getPluginSettings(plugin_name) {
      var plugin_settings = this.dtableStore.value.plugin_settings || {};
      return plugin_settings[plugin_name] || null;
    }
  }, {
    key: "updatePluginSettings",
    value: function updatePluginSettings(plugin_name, plugin_settings) {
      this.dtableStore.updatePluginSettings(plugin_name, plugin_settings);
    }
  }, {
    key: "deletePluginSettings",
    value: function deletePluginSettings(plugin_name) {
      this.dtableStore.deletePluginSettings(plugin_name);
    }
  }, {
    key: "generatorStatId",
    value: function generatorStatId(statItems) {
      return (0, _dtableStore.generatorStatId)(statItems);
    }
  }, {
    key: "calculateChart",
    value: function calculateChart(statItem) {
      return _dtableStore.Chart.calculateChart(statItem, this.dtableStore.value);
    }
  }, {
    key: "calculateGeolocationBasicChart",
    value: function calculateGeolocationBasicChart(statItem) {
      return _dtableStore.Chart.calculateGeolocationBasicChart(statItem, this.dtableStore.value);
    }
  }, {
    key: "getTableFormulaResults",
    value: function getTableFormulaResults(table, rows) {
      var formulaColumns = _dtableStore.Views.getAllFormulaColumns(table.columns);

      return _dtableStore.Views.getTableFormulaResults(table, formulaColumns, rows, this.dtableStore.value);
    }
  }, {
    key: "getOptionColors",
    value: function getOptionColors() {
      return _dtableStore.SELECT_OPTION_COLORS;
    }
  }, {
    key: "getHighlightColors",
    value: function getHighlightColors() {
      return _dtableStore.HIGHLIGHT_COLORS;
    }
  }, {
    key: "getLinkCellValue",
    value: function getLinkCellValue(linkId, table1Id, table2Id, rowId) {
      return this.dtableStore.getLinkCellValue(linkId, table1Id, table2Id, rowId);
    }
  }, {
    key: "getRowsByID",
    value: function getRowsByID(tableId, rowIds) {
      return this.dtableStore.getRowsByID(tableId, rowIds);
    }
  }, {
    key: "getTableById",
    value: function getTableById(table_id) {
      var tables = this.getTables();
      return _dtableStore.TableUtils.getTableById(tables, table_id);
    }
  }, {
    key: "addTable",
    value: function addTable(tableName) {
      this.dtableStore.insertTable(tableName);
    }
  }, {
    key: "deleteTable",
    value: function deleteTable(tableName) {
      var tables = this.getTables();
      var index = tables.findIndex(function (table) {
        return table.name === tableName;
      });
      this.dtableStore.deleteTable(index);
    }
  }, {
    key: "renameTable",
    value: function renameTable(previousName, tableName) {
      var tables = this.getTables();
      var index = tables.findIndex(function (table) {
        return table.name === previousName;
      });
      this.dtableStore.renameTable(index, tableName);
    }
  }, {
    key: "addView",
    value: function addView(tableName, viewName) {
      var viewData = {
        name: viewName,
        type: 'table'
      };
      var tables = this.getTables();
      var index = tables.findIndex(function (table) {
        return table.name === tableName;
      });
      this.dtableStore.insertView(index, viewData);
    }
  }, {
    key: "renameView",
    value: function renameView(tableName, previousName, viewName) {
      var tables = this.getTables();
      var index = tables.findIndex(function (table) {
        return table.name === tableName;
      });
      var selectedTable = tables[index];
      var viewIndex = selectedTable.views.findIndex(function (view) {
        return view.name === previousName;
      });
      this.dtableStore.renameView(index, viewIndex, viewName);
    }
  }, {
    key: "deleteView",
    value: function deleteView(tableName, viewName) {
      var tables = this.getTables();
      var tableIndex = tables.findIndex(function (table) {
        return table.name === tableName;
      });
      var selectedTable = tables[tableIndex];
      var viewIndex = selectedTable.views.findIndex(function (view) {
        return view.name === viewName;
      });
      this.dtableStore.deleteView(tableIndex, viewIndex);
    }
  }, {
    key: "addRow",
    value: function addRow(tableName, rowData) {
      var viewName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var table = this.getTableByName(tableName);
      var view = null;

      if (viewName) {
        view = this.getViewByName(table, viewName);
      }

      this.appendRow(table, rowData, view);
    }
  }, {
    key: "getGroupRows",
    value: function getGroupRows(view, table) {
      var value = this.dtableStore.value;
      return _dtableStore.Views.getGroupedRows(view, table, value);
    }
  }]);

  return DTable;
}();

var _default = DTable;
exports["default"] = _default;