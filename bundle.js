(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

require("modules/loader");

var _riot = require("riot");

var _base = require("mixins/base");

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Implement Base Mixin for all tags with common functionality
(0, _riot.mixin)(_base2.default);

_riot.route.base('/');

(0, _riot.mount)('app');
_riot.route.start(true);

},{"mixins/base":2,"modules/loader":9,"riot":"riot"}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require("toolbox/utils");

var _constants = require("modules/constants");

var _lang = require("modules/lang");

var _data = require("modules/data");

var _riot = require("riot");

exports.default = {
  init: function init() {
    var tag = this;

    tag.data = _data.Data;
    tag.if = function (cond) {
      return cond ? [1] : [];
    };
    tag.content = _lang.content;
    tag.query = _riot.route.query();
    tag.backView = _constants.ROOT_VIEW;
    tag.backParams = {};

    tag.go = function (view, params) {
      return (0, _riot.route)('#/' + (view === _constants.ROOT_VIEW ? '' : view + (params ? '?' + (0, _utils.queryString)(params) : '')));
    };

    tag.back = function () {
      return (0, _riot.route)('#/' + (tag.backView === _constants.ROOT_VIEW ? '' : tag.backView + (tag.backParams ? '?' + (0, _utils.queryString)(tag.backParams) : '')));
    };

    tag.goHome = function () {
      return tag.go(_constants.ROOT_VIEW);
    };
  }
};

},{"modules/constants":6,"modules/data":7,"modules/lang":8,"riot":"riot","toolbox/utils":10}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _riot = require("riot");

var _lodash = require("lodash");

var _constants = require("modules/constants");

var _cache = require("modules/cache");

var _lang = require("modules/lang");

var CACHE_ROUTE_EXPIRATION = 600000; // 10 min

/**
 * Created by thram on 18/06/16.
 */
exports.default = {
  init: function init() {
    var tag = this;

    var routes = tag.opts.routes;

    _riot.route.parser(function (path) {
      var raw = path.replace('#/', '').replace('#', '').split('?'),
          uri = raw[0].split('/'),
          qs = raw[1];

      uri.push((0, _lodash.reduce)(qs ? qs.split('&') : [], function (result, value) {
        var v = value.split('=');
        result[v[0]] = v[1];
        return result;
      }, {}));

      return uri;
    });

    (0, _riot.route)(function (target, params) {
      var nextView = !target ? _constants.ROOT_VIEW : !(0, _lodash.includes)(routes, target) ? _constants.NOT_FOUND_VIEW : target;
      if (tag.view != nextView) {
        (0, _cache.set)('last_view', {
          view: nextView === _constants.NOT_FOUND_VIEW ? _constants.ROOT_VIEW : nextView,
          params: params
        }, CACHE_ROUTE_EXPIRATION);
        tag.update({ view: nextView, params: params });
        document.getElementsByTagName("body")[0].scrollTop = 0;
        document.title = (0, _lang.getTitle)(nextView);
      } else {
        tag.update({ params: params });
      }
    });
  }
};

},{"lodash":"lodash","modules/cache":5,"modules/constants":6,"modules/lang":8,"riot":"riot"}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _riot = require("riot");

exports.default = {
  init: function init() {
    var tag = this,
        tagName = void 0,
        viewTag = void 0;

    var enterView = function enterView() {
      tagName = tag.opts.tag;
      if (viewTag) viewTag.unmount(true);
      viewTag = (0, _riot.mount)(tag.main, tag.opts.tag, tag.opts.params)[0];
      viewTag.parent = tag;
      tag.update({ viewClass: tagName });
    };

    tag.on('update', function () {
      return tag.isMounted && tag.opts.tag && tagName != tag.opts.tag && enterView();
    });
  }
}; /**
    * Created by thram on 18/06/16.
    */

},{"riot":"riot"}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get = exports.set = exports.remove = exports.clear = exports.enabled = exports.EXPIRATION = undefined;

var _store = require("store");

var _constants = require("./constants");

/**
 * Created by thram on 1/04/16.
 */
var EXPIRATION = exports.EXPIRATION = 1200000; // 20 min

var enabled = exports.enabled = true;

var clear = exports.clear = _store.clear;

var remove = exports.remove = function remove(key) {
  return (0, _store.remove)(_constants.APP_ID + ":" + key);
};

var set = exports.set = function set(key, val, exp) {
  return (0, _store.set)(_constants.APP_ID + ":" + key, {
    val: val,
    exp: exp || EXPIRATION,
    time: new Date().getTime()
  });
};

var get = exports.get = function get(key) {
  var info = (0, _store.get)(_constants.APP_ID + ":" + key);
  return !!info && new Date().getTime() - info.time <= info.exp ? info.val : undefined;
};

},{"./constants":6,"store":"store"}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var APP_ID = exports.APP_ID = 'thramcss';
var ROOT_VIEW = exports.ROOT_VIEW = 'home';
var ROUTES = exports.ROUTES = [ROOT_VIEW].concat(['start', 'layouts', 'base', 'grids', 'forms', 'buttons', 'tables', 'menus', 'customize']);
var NOT_FOUND_VIEW = exports.NOT_FOUND_VIEW = 'not-found';
var PARAMS_REG_EXP = exports.PARAMS_REG_EXP = '%\{(.*?)\}'; // 3 secs
var ASSETS_URL = exports.ASSETS_URL = '/assets'; // 3 secs
var IMAGES_URL = exports.IMAGES_URL = ASSETS_URL + '/images'; // 3 secs
var AUDIOS_URL = exports.AUDIOS_URL = ASSETS_URL + '/audios'; // 3 secs
var VIDEOS_URL = exports.VIDEOS_URL = ASSETS_URL + '/videos'; // 3 secs
var SUB_PAGES_URL = exports.SUB_PAGES_URL = ASSETS_URL + '/subpages'; // 3 secs

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Data = undefined;

var _store = require("store");

var _lodash = require("lodash");

var _constants = require("./constants");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
/**
 * Created by thram on 21/06/16.
 */

var _save = function _save(data) {
  return (0, _store.set)(_constants.APP_ID + ":data", data);
};

var AppData = function () {
  function AppData(props) {
    _classCallCheck(this, AppData);

    this.data = props || (0, _store.get)(_constants.APP_ID + ":data") || {};
  }

  AppData.prototype.get = function get(path) {
    return path ? (0, _lodash.get)(this.data, path) : this.data;
  };

  AppData.prototype.set = function set(path, value) {
    var res = (0, _lodash.isString)(path) ? (0, _lodash.set)(this.data, path, value) : this.data = path;
    _save(this.data);
    return res;
  };

  AppData.prototype.remove = function remove(path) {
    var res = (0, _lodash.isString)(path) ? (0, _lodash.unset)(this.data, path) : this.data = {};
    _save(this.data);
    return res;
  };

  return AppData;
}();

var Data = exports.Data = new AppData();

},{"./constants":6,"lodash":"lodash","store":"store"}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTitle = exports.content = undefined;

var _lodash = require("lodash");

var _constants = require("./constants");

/**
 * Created by thram on 3/08/16.
 */
var paramsRegExp = new RegExp(_constants.PARAMS_REG_EXP, 'g');

var commonContent = require('en.yaml');

var textContent = (0, _lodash.merge)({}, commonContent);

var getURL = function getURL(base, url) {
  return base + "/" + (url.file ? url.file : url);
};

var content = exports.content = Object.assign({
  withParams: function withParams(path, params) {
    return (0, _lodash.get)(textContent, path, '').replace(paramsRegExp, function (replaceText, key) {
      return params[key];
    });
  },
  getImage: function getImage(url) {
    return getURL(_constants.IMAGES_URL, url);
  },
  getAudio: function getAudio(url) {
    return getURL(_constants.AUDIOS_URL, url);
  },
  getVideo: function getVideo(url) {
    return getURL(_constants.VIDEOS_URL, url);
  },
  getSubPage: function getSubPage(url) {
    return getURL(_constants.SUB_PAGES_URL, url);
  }
}, textContent);

var getTitle = exports.getTitle = function getTitle(view) {
  var viewTitle = (0, _lodash.get)(content, view + ".title");
  return "" + (0, _lodash.get)(content, "app.title", document.title) + (viewTitle ? " | " + viewTitle : '');
};

},{"./constants":6,"en.yaml":11,"lodash":"lodash"}],9:[function(require,module,exports){
'use strict';

/**
 * Created by Thram on 31/08/16.
 */
var tags = ({"..":({"..":({"tags":({"app":require("../../tags/app.tag"),"router":require("../../tags/router.tag"),"side-bar":require("../../tags/side-bar.tag"),"view":require("../../tags/view.tag"),"views":({"base":require("../../tags/views/base.tag"),"buttons":require("../../tags/views/buttons.tag"),"customize":require("../../tags/views/customize.tag"),"forms":require("../../tags/views/forms.tag"),"grids":require("../../tags/views/grids.tag"),"home":require("../../tags/views/home.tag"),"layouts":require("../../tags/views/layouts.tag"),"menus":require("../../tags/views/menus.tag"),"start":require("../../tags/views/start.tag"),"tables":require("../../tags/views/tables.tag")})})})})});

},{"../../tags/app.tag":12,"../../tags/router.tag":13,"../../tags/side-bar.tag":14,"../../tags/view.tag":15,"../../tags/views/base.tag":16,"../../tags/views/buttons.tag":17,"../../tags/views/customize.tag":18,"../../tags/views/forms.tag":19,"../../tags/views/grids.tag":20,"../../tags/views/home.tag":21,"../../tags/views/layouts.tag":22,"../../tags/views/menus.tag":23,"../../tags/views/start.tag":24,"../../tags/views/tables.tag":25}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.offClickOutside = exports.removeEvent = exports.addEvent = exports.hasClass = exports.queryString = exports.Payload = exports.Enum = undefined;
exports.isEvent = isEvent;
exports.stopEvent = stopEvent;
exports.clearClasses = clearClasses;
exports.addClass = addClass;
exports.removeClass = removeClass;
exports.touchElement = touchElement;
exports.onClickOutside = onClickOutside;

var _lodash = require("lodash");

var Enum = exports.Enum = function Enum(keys) {
  return (0, _lodash.zipObject)(keys, keys);
}; /**
    * Created by thram on 14/04/16.
    */
var Payload = exports.Payload = function Payload(type, payload) {
  return (0, _lodash.assign)({}, { type: type, payload: payload });
};

var queryString = exports.queryString = function queryString(obj) {
  return (0, _lodash.reduce)(obj, function (results, value, key) {
    results.push(encodeURIComponent(key) + "=" + encodeURIComponent(value));
    return results;
  }, []).join("&");
};

function isEvent(obj) {
  if (!obj) return false;
  var s = obj.toString(),
      GENERIC_PATTERN = /\[object Event\]/,
      DOM_PATTERN = /\[object (Keyboard|Mouse|Focus|Wheel|Composition|Storage)Event\]/;
  return DOM_PATTERN.test(s) || GENERIC_PATTERN.test(s);
}

function stopEvent(ev) {
  ev.preventDefault();
  ev.stopPropagation();
}

var hasClass = exports.hasClass = function hasClass(elem, className) {
  return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
};

function clearClasses(elem, baseClasses) {
  elem.className = baseClasses || '';
  return elem;
}

function addClass(elem, className) {
  setTimeout(function () {
    return !hasClass(elem, className) && (elem.className += ' ' + className);
  }, 0);
  return elem;
}

function removeClass(elem, className) {
  var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, ' ') + ' ';
  if (hasClass(elem, className)) {
    while (newClass.indexOf(' ' + className + ' ') >= 0) {
      newClass = newClass.replace(' ' + className + ' ', ' ');
    }elem.className = newClass.replace(/^\s+|\s+$/g, '');
  }
  return elem;
}

function touchElement(_ref) {
  var element = _ref.element;
  var class_name = _ref.class_name;
  var base_classes = _ref.base_classes;
  var cleaning_time = _ref.cleaning_time;

  if (cleaning_time) setTimeout(function () {
    return clearClasses(element, base_classes);
  }, cleaning_time);
  return addClass(clearClasses(element, base_classes), class_name);
}

var addEvent = exports.addEvent = function addEvent(element, evnt, funct) {
  return element.attachEvent ? element.attachEvent('on' + evnt, funct) : element.addEventListener(evnt, funct, false);
};

var removeEvent = exports.removeEvent = function removeEvent(element, evnt, funct) {
  return element.detachEvent ? element.detachEvent('on' + evnt, funct) : element.removeEventListener(evnt, funct, false);
};

function onClickOutside(container, funct) {
  var onClick = function onClick(e) {
    return !container.contains(e.target) && funct(e);
  };
  addEvent(document, 'click', onClick);
  return onClick;
}

var offClickOutside = exports.offClickOutside = function offClickOutside(onClick) {
  return removeEvent(document, 'click', onClick);
};

},{"lodash":"lodash"}],11:[function(require,module,exports){
module.exports = []
},{}],12:[function(require,module,exports){
var riot = require('riot');
module.exports = riot.tag2('app', '<router routes="{routes}"></router>', '', '', function(opts) {
        this.routes = require('modules/constants').ROUTES;
});
},{"modules/constants":6,"riot":"riot"}],13:[function(require,module,exports){
var riot = require('riot');
module.exports = riot.tag2('router', '<div class="group router-container"> <div class="unit-2-24"> <side-bar view="{view}"></side-bar> </div> <div class="unit-22-24"> <view tag="{view}-view" params="{params}"></view> </div> </div>', '', '', function(opts) {
        this.mixin(require('mixins/router').default);
});
},{"mixins/router":3,"riot":"riot"}],14:[function(require,module,exports){
var riot = require('riot');
module.exports = riot.tag2('side-bar', '<div class="side-bar group"> <div class="unit-1"> <div class="menu"> <a class="menu-heading" href="/#">ThramCSS</a> <ul class="menu-list" each="{menu in menus}"> <li class="menu-item {parent.parent.opts.view === key && \'menu-selected\'}" each="{key, label in menu}"> <a href="#/{key}" class="menu-link">{label}</a> </li> </ul> </div> </div> </div>', '', '', function(opts) {
        var tag = this;

        tag.menus = [
            {
                start  : "Get Started",
                layouts: "Layouts"
            }, {
                base   : "Base",
                grids  : "Grids",
                forms  : "Forms",
                buttons: "Buttons",
                tables : "Tables",
                menus  : "Menus"
            }, {
                customize: "Customize"
            }
        ];

});
},{"riot":"riot"}],15:[function(require,module,exports){
var riot = require('riot');
module.exports = riot.tag2('view', '<div class="{viewClass}"> <div name="main" class="group main-container"></div> </div>', '', '', function(opts) {
        this.mixin(require('mixins/view').default);
});
},{"mixins/view":4,"riot":"riot"}],16:[function(require,module,exports){
var riot = require('riot');
module.exports = riot.tag2('base-view', '<div class="unit-1"> <header class="group"> <div class="unit-1"> <h2>Base</h2> </div> </header> <div class="content group"> <div class="unit-1"> Base Content </div> </div> </div>', '', '', function(opts) {
});
},{"riot":"riot"}],17:[function(require,module,exports){
var riot = require('riot');
module.exports = riot.tag2('buttons-view', '<div class="unit-1"> <header class="group"> <div class="unit-1"> <h2>Buttons</h2> </div> </header> <div class="content group"> <div class="unit-1"> Buttons Content </div> </div> </div>', '', '', function(opts) {
});
},{"riot":"riot"}],18:[function(require,module,exports){
var riot = require('riot');
module.exports = riot.tag2('customize-view', '<div class="unit-1"> <header class="group"> <div class="unit-1"> <h2>Customize</h2> </div> </header> <div class="content group"> <div class="unit-1"> Customize Content </div> </div> </div>', '', '', function(opts) {
});
},{"riot":"riot"}],19:[function(require,module,exports){
var riot = require('riot');
module.exports = riot.tag2('forms-view', '<div class="unit-1"> <header class="group"> <div class="unit-1"> <h2>Forms</h2> </div> </header> <div class="content group"> <div class="unit-1"> Forms Content </div> </div> </div>', '', '', function(opts) {
});
},{"riot":"riot"}],20:[function(require,module,exports){
var riot = require('riot');
module.exports = riot.tag2('grids-view', '<div class="unit-1"> <header class="group"> <div class="unit-1"> <h2>Grids</h2> </div> </header> <div class="content group"> <div class="unit-1"> Grids Content </div> </div> </div>', '', '', function(opts) {
});
},{"riot":"riot"}],21:[function(require,module,exports){
var riot = require('riot');
module.exports = riot.tag2('home-view', '<div class="unit-1"> <header class="group"> <div class="unit-1"> <h2>Home</h2> </div> </header> <div class="content group"> <div class="unit-1"> Home Content </div> </div> </div>', '', '', function(opts) {
});
},{"riot":"riot"}],22:[function(require,module,exports){
var riot = require('riot');
module.exports = riot.tag2('layouts-view', '<div class="unit-1"> <header class="group"> <div class="unit-1"> <h2>Layouts</h2> </div> </header> <div class="content group"> <div class="unit-1"> Layouts Content </div> </div> </div>', '', '', function(opts) {
});
},{"riot":"riot"}],23:[function(require,module,exports){
var riot = require('riot');
module.exports = riot.tag2('menus-view', '<div class="unit-1"> <header class="group"> <div class="unit-1"> <h2>Menus</h2> </div> </header> <div class="content group"> <div class="unit-1"> Menus Content </div> </div> </div>', '', '', function(opts) {
});
},{"riot":"riot"}],24:[function(require,module,exports){
var riot = require('riot');
module.exports = riot.tag2('start-view', '<div class="unit-1"> <header class="group"> <div class="unit-1"> <h2>Start</h2> </div> </header> <div class="content group"> <div class="unit-1"> Start Content </div> </div> </div>', '', '', function(opts) {
});
},{"riot":"riot"}],25:[function(require,module,exports){
var riot = require('riot');
module.exports = riot.tag2('tables-view', '<div class="unit-1"> <header class="group"> <div class="unit-1"> <h2>Tables</h2> </div> </header> <div class="content group"> <div class="unit-1"> Tables Content </div> </div> </div>', '', '', function(opts) {
});
},{"riot":"riot"}]},{},[1])


//# sourceMappingURL=bundle.js.map
