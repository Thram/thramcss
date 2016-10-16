(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

require("modules/loader");

var _constants = require("modules/constants");

var _riot = require("riot");

var _base = require("mixins/base");

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Implement Base Mixin for all tags with common functionality
(0, _riot.mixin)(_base2.default);

_riot.route.base(_constants.BASE_URL);

(0, _riot.mount)('app');
_riot.route.start(true);

},{"mixins/base":2,"modules/constants":6,"modules/loader":9,"riot":"riot"}],2:[function(require,module,exports){
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
      var raw = path.replace('#/', '').split('?'),
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
      target = target.split('#');
      var nextView = !target[0] ? _constants.ROOT_VIEW : !(0, _lodash.includes)(routes, target[0]) ? _constants.NOT_FOUND_VIEW : target[0];
      if (tag.view != nextView) {
        (0, _cache.set)('last_view', {
          view: nextView === _constants.NOT_FOUND_VIEW ? _constants.ROOT_VIEW : nextView,
          params: params
        }, CACHE_ROUTE_EXPIRATION);
        tag.update({ view: nextView, params: params });
        document.getElementsByTagName("body")[0].scrollTop = target[1] ? document.querySelector("#" + target[1]).offsetTop : 0;
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
var BASE_URL = exports.BASE_URL = '/thramcss/';
var ROUTES = exports.ROUTES = [ROOT_VIEW].concat(['start', 'grids', 'forms', 'buttons', 'tables', 'menus', 'customize', 'examples']);
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
(function (global){
'use strict';

/**
 * Created by Thram on 31/08/16.
 */
global._ = require("lodash");
var tags = ({"..":({"..":({"tags":({"app":require("../../tags/app.tag"),"components":({"buttons":require("../../tags/components/buttons.tag"),"customize":require("../../tags/components/customize.tag"),"examples":require("../../tags/components/examples.tag"),"forms":require("../../tags/components/forms.tag"),"grids":require("../../tags/components/grids.tag"),"intro":require("../../tags/components/intro.tag"),"menus":require("../../tags/components/menus.tag"),"start":require("../../tags/components/start.tag"),"tables":require("../../tags/components/tables.tag")}),"router":require("../../tags/router.tag"),"top-bar":require("../../tags/top-bar.tag"),"view":require("../../tags/view.tag"),"views":({"home":require("../../tags/views/home.tag")})})})})});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../../tags/app.tag":12,"../../tags/components/buttons.tag":13,"../../tags/components/customize.tag":14,"../../tags/components/examples.tag":15,"../../tags/components/forms.tag":16,"../../tags/components/grids.tag":17,"../../tags/components/intro.tag":18,"../../tags/components/menus.tag":19,"../../tags/components/start.tag":20,"../../tags/components/tables.tag":21,"../../tags/router.tag":22,"../../tags/top-bar.tag":23,"../../tags/view.tag":24,"../../tags/views/home.tag":25,"lodash":"lodash"}],10:[function(require,module,exports){
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
module.exports = riot.tag2('buttons', '<div class="group"> <div id="buttons" class="unit-1"> <h2 class="text-center">Buttons</h2> <h3>Default Buttons</h3> <div> <a class="button" href="#">A Pure Button</a> <button class="button">A Pure Button</button> </div> <h3>Disabled Buttons</h3> <div> <a class="button button-disabled" href="#">A Disabled Button</a> <button class="button button-disabled">A Disabled Button</button> </div> <h3>Active Buttons</h3> <div> <a class="button button-active" href="#">An Active Button</a> <button class="button button-active">An Active Button</button> </div> <h3>Primary Buttons</h3> <div> <a class="button button-primary" href="#">A Primary Button</a> <button class="button button-primary">A Primary Button</button> </div> <h3>Customizing Buttons</h3> <div> <button class="button-success button">Success Button</button> <button class="button-error button">Error Button</button> <button class="button-warning button">Warning Button</button> <button class="button-secondary button">Secondary Button</button> </div> <h3>Buttons with different sizes</h3> <div> <button class="button-xsmall button">Extra Small Button</button> <button class="button-small button">Small Button</button> <button class="button">Regular Button</button> <button class="button-large button">Large Button</button> <button class="button-xlarge button">Extra Large Button</button> </div> </div> </div>', 'buttons .button-success,[riot-tag="buttons"] .button-success,[data-is="buttons"] .button-success,buttons .button-error,[riot-tag="buttons"] .button-error,[data-is="buttons"] .button-error,buttons .button-warning,[riot-tag="buttons"] .button-warning,[data-is="buttons"] .button-warning,buttons .button-secondary,[riot-tag="buttons"] .button-secondary,[data-is="buttons"] .button-secondary{ color: white; border-radius: 4px; text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2); } buttons .button-success,[riot-tag="buttons"] .button-success,[data-is="buttons"] .button-success{ background: rgb(28, 184, 65); } buttons .button-error,[riot-tag="buttons"] .button-error,[data-is="buttons"] .button-error{ background: rgb(202, 60, 60); } buttons .button-warning,[riot-tag="buttons"] .button-warning,[data-is="buttons"] .button-warning{ background: rgb(223, 117, 20); } buttons .button-secondary,[riot-tag="buttons"] .button-secondary,[data-is="buttons"] .button-secondary{ background: rgb(66, 184, 221); } buttons .button-xsmall,[riot-tag="buttons"] .button-xsmall,[data-is="buttons"] .button-xsmall{ font-size: 70%; } buttons .button-small,[riot-tag="buttons"] .button-small,[data-is="buttons"] .button-small{ font-size: 85%; } buttons .button-large,[riot-tag="buttons"] .button-large,[data-is="buttons"] .button-large{ font-size: 110%; } buttons .button-xlarge,[riot-tag="buttons"] .button-xlarge,[data-is="buttons"] .button-xlarge{ font-size: 125%; }', '', function(opts) {
});
},{"riot":"riot"}],14:[function(require,module,exports){
var riot = require('riot');
module.exports = riot.tag2('customize', '<div class="group"> <div id="customize" class="unit-1"> <h2 class="text-center">Customize</h2> <h3>Installation</h3> <p>The framework is published on NPM:</p> <code>npm install thramcss --save-dev</code> <p>Or you can clone or download it from <a href="https://github.com/Thram/thramcss" target="_blank">GitHub</a> </p> </div> </div>', '', '', function(opts) {
});
},{"riot":"riot"}],15:[function(require,module,exports){
var riot = require('riot');
module.exports = riot.tag2('examples', '<div class="group"> <div id="examples" class="unit-1"> <h2 class="text-center">Examples</h2> <h3>Installation</h3> <p>The framework is published on NPM:</p> <code>npm install thramcss --save-dev</code> <p>Or you can clone or download it from <a href="https://github.com/Thram/thramcss" target="_blank">GitHub</a> </p> </div> </div>', '', '', function(opts) {
});
},{"riot":"riot"}],16:[function(require,module,exports){
var riot = require('riot');
module.exports = riot.tag2('forms', '<div class="group"> <div id="forms" class="unit-1"> <h2 class="text-center">Forms</h2> <h3>Default Form</h3> <form> <fieldset> <legend>A compact inline form</legend> <input placeholder="Email" type="email"> <input type="password" placeholder="Password"> <label for="remember"> <input id="remember" type="checkbox"> Remember me </label> <button type="submit" class="button button-primary">Sign in</button> </fieldset> </form> <h3>Stacked Form</h3> <form class="form-stacked"> <fieldset> <legend>A Stacked Form</legend> <label for="email">Email</label> <input id="email" placeholder="Email" type="email"> <label for="password">Password</label> <input id="password" type="password" placeholder="Password"> <label for="state">State</label> <select id="state"> <option>AL</option> <option>CA</option> <option>IL</option> </select> <label for="remember" class="checkbox"> <input id="remember" type="checkbox"> Remember me </label> <button type="submit" class="button button-primary">Sign in</button> </fieldset> </form> <h3>Aligned Form</h3> <form class="form-aligned"> <fieldset> <div class="control-group"> <label for="name">Username</label> <input id="name" type="text" placeholder="Username"> </div> <div class="control-group"> <label for="password">Password</label> <input id="password" type="password" placeholder="Password"> </div> <div class="control-group"> <label for="email">Email Address</label> <input id="email" placeholder="Email Address" type="email"> </div> <div class="control-group"> <label for="foo">Supercalifragilistic Label</label> <input id="foo" type="text" placeholder="Enter something here..."> </div> <div class="controls"> <label for="cb" class="checkbox"> <input id="cb" type="checkbox"> I\'ve read the terms and conditions </label> <button type="submit" class="button button-primary">Submit</button> </div> </fieldset> </form> <h3>Multi-Column Form (with ThramCSS Grids)</h3> <form class="form-stacked"> <fieldset> <legend>Legend</legend> <div class="group"> <div class="unit-1 unit-md-8-24"> <label for="first-name">First Name</label> <input id="first-name" class="unit-23-24" type="text"> </div> <div class="unit-1 unit-md-8-24"> <label for="last-name">Last Name</label> <input id="last-name" class="unit-23-24" type="text"> </div> <div class="unit-1 unit-md-8-24"> <label for="email">E-Mail</label> <input id="email" class="unit-23-24" required type="email"> </div> <div class="unit-1 unit-md-8-24"> <label for="city">City</label> <input id="city" class="unit-23-24" type="text"> </div> <div class="unit-1 unit-md-8-24"> <label for="state">State</label> <select id="state" class="input-1-2"> <option>AL</option> <option>CA</option> <option>IL</option> </select> </div> </div> <label for="terms" class="checkbox"> <input id="terms" type="checkbox"> I\'ve read the terms and conditions </label> <button type="submit" class="button button-primary">Submit</button> </fieldset> </form> <h3>Grouped Inputs</h3> <form> <fieldset class="form-group"> <input type="text" class="input-1-2" placeholder="Username"> <input type="text" class="input-1-2" placeholder="Password"> <input class="input-1-2" placeholder="Email" type="email"> </fieldset> <fieldset class="form-group"> <input type="text" class="input-1-2" placeholder="A title"> <textarea class="input-1-2" placeholder="Textareas work too"></textarea> </fieldset> <button type="submit" class="button input-1-2 button-primary">Sign in</button> </form> <h3>Input Sizing</h3> <form> <input class="input-1" type="text" placeholder=".input-1"><br> <input class="input-2-3" type="text" placeholder=".input-2-3"><br> <input class="input-1-2" type="text" placeholder=".input-1-2"><br> <input class="input-1-3" type="text" placeholder=".input-1-3"><br> <input class="input-1-4" type="text" placeholder=".input-1-4"><br> </form> <form class="group"> <div class="unit-1-4"> <input class="input-1" type="text" placeholder=".unit-1-4"> </div> <div class="unit-3-4"> <input class="input-1" type="text" placeholder=".unit-3-4"> </div> <div class="unit-1-2"> <input class="input-1" type="text" placeholder=".unit-1-2"> </div> <div class="unit-1-2"> <input class="input-1" type="text" placeholder=".unit-1-2"> </div> <div class="unit-1-8"> <input class="input-1" type="text" placeholder=".unit-1-8"> </div> <div class="unit-1-8"> <input class="input-1" type="text" placeholder=".unit-1-8"> </div> <div class="unit-1-4"> <input class="input-1" type="text" placeholder=".unit-1-4"> </div> <div class="unit-1-2"> <input class="input-1" type="text" placeholder=".unit-1-2"> </div> <div class="unit-1-5"> <input class="input-1" type="text" placeholder=".unit-1-5"> </div> <div class="unit-2-5"> <input class="input-1" type="text" placeholder=".unit-2-5"> </div> <div class="unit-2-5"> <input class="input-1" type="text" placeholder=".unit-2-5"> </div> <div class="unit-1"> <input class="input-1" type="text" placeholder=".unit-1"> </div> </form> <h3>Required Inputs</h3> <form> <input placeholder="Requires an email" required type="email"> </form> <h3>Disabled Inputs</h3> <form> <input type="text" placeholder="Disabled input here..." disabled> </form> <h3>Read-Only Inputs</h3> <form> <input type="text" value="Readonly input here..." readonly> </form> <h3>Rounded Inputs</h3> <form> <input type="text" class="input-rounded"> <button type="submit" class="button">Search</button> </form> <h3>Checkboxes and Radios</h3> <form> <label for="option-one" class="checkbox"> <input id="option-one" type="checkbox" value=""> Here\'s option one. </label> <label for="option-two" class="radio"> <input id="option-two" type="radio" name="optionsRadios" value="option1" checked> Here\'s a radio button. You can choose this one.. </label> <label for="option-three" class="radio"> <input id="option-three" type="radio" name="optionsRadios" value="option2"> ..Or this one! </label> </form> </div> </div>', '', '', function(opts) {
});
},{"riot":"riot"}],17:[function(require,module,exports){
var riot = require('riot');
module.exports = riot.tag2('grids', '<div class="group"> <div id="grids" class="unit-1"> <h2 class="text-center">Grids</h2> <h3>Basics</h3> <p>For hiding columns use <strong>unit-0</strong></p> <p>For full-width columns use <strong>unit-1</strong></p> <p> Then we have 2 different base units for grids: <ul> <li>5 columns</li> <li>24 columns</li> </ul> </p> <h3>5ths-Based Units</h3> <div class="group"> <div class="unit-1" each="{size in grids.grid_5}"> <div class="u-label">{size}-5</div> <div class="u-example"> <div class="group"> <div class="unit-{size}-5 grid-units-item">&nbsp;</div> </div> </div> </div> </div> <h3>24ths-Based Units</h3> <div class="group"> <div class="unit-1" each="{size in grids.grid_24}"> <div class="u-label">{size}-24</div> <div class="u-example"> <div class="group"> <div class="unit-{size}-24 grid-units-item">&nbsp;</div> </div> </div> </div> </div> <h3>Default Media Queries</h3> <div class="table-responsive"> <table class="table-bordered table"> <thead> <tr> <th class="highlight">Key</th> <th class="highlight">CSS Media Query</th> <th>Applies</th> <th>Classname</th> </tr> </thead> <tbody> <tr> <td class="highlight"><i>None</i></td> <td class="highlight"><i>None</i></td> <td><i>Always</i></td> <td><code>.unit-*</code></td> </tr> <tr> <td class="highlight"><b><code>sm</code></b></td> <td class="mq-table-mq highlight"><code>@media screen and (min-width: 35.5em)</code></td> <td>≥ <b>568px</b></td> <td><code>.unit-<b>sm</b>-*</code></td> </tr> <tr> <td class="highlight"><b><code>md</code></b></td> <td class="mq-table-mq highlight"><code>@media screen and (min-width: 48em)</code></td> <td>≥ <b>768px</b></td> <td><code>.unit-<b>md</b>-*</code></td> </tr> <tr> <td class="highlight"><b><code>lg</code></b></td> <td class="mq-table-mq highlight"><code>@media screen and (min-width: 64em)</code></td> <td>≥ <b>1024px</b></td> <td><code>.unit-<b>lg</b>-*</code></td> </tr> <tr> <td class="highlight"><b><code>xl</code></b></td> <td class="mq-table-mq highlight"><code>@media screen and (min-width: 80em)</code></td> <td>≥ <b>1280px</b></td> <td><code>.unit-<b>xl</b>-*</code></td> </tr> </tbody> </table> </div> </div> </div>', '', '', function(opts) {

        var tag   = this;
        tag.grids = {
            grid_5 : _.times(5, function (index) {
                return index + 1;
            }),
            grid_24: _.times(24, function (index) {
                return index + 1;
            })
        }

});
},{"riot":"riot"}],18:[function(require,module,exports){
var riot = require('riot');
module.exports = riot.tag2('intro', '<div class="group"> <div id="intro" class="unit-1"> <h2> A simplistic, lightweight and responsive SCSS/CSS Framework target for highly customized website. </h2> <h3>SCSS/CSS with a minimal footprint.</h3> <p> Inspired in <a href="http://purecss.io/">Pure.css</a>. This extremely minimalistic set of modules will help to any web developer to solve basic problems and customize your website in a really straight forward way. </p> <p> With <a href="http://necolas.github.io/normalize.css/">Normalize.css</a> as a foundation. It\'s designed to make it easy to override styles. </p> </div> </div>', '', '', function(opts) {
});
},{"riot":"riot"}],19:[function(require,module,exports){
var riot = require('riot');
module.exports = riot.tag2('menus', '<div class="group"> <div id="menus" class="unit-1"> <h2 class="text-center">Menus</h2> <h3>Vertical Menu</h3> <div class="menu custom-restricted-width"> <span class="menu-heading">Yahoo Sites</span> <ul class="menu-list"> <li class="menu-item"><a href="#" class="menu-link">Flickr</a></li> <li class="menu-item"><a href="#" class="menu-link">Messenger</a></li> <li class="menu-item"><a href="#" class="menu-link">Sports</a></li> <li class="menu-item"><a href="#" class="menu-link">Finance</a></li> <li class="menu-heading">More Sites</li> <li class="menu-item"><a href="#" class="menu-link">Games</a></li> <li class="menu-item"><a href="#" class="menu-link">News</a></li> <li class="menu-item"><a href="#" class="menu-link">OMG!</a></li> </ul> </div> <h3>Horizontal Menu</h3> <div class="menu menu-horizontal"> <a href="#" class="menu-heading menu-link">BRAND</a> <ul class="menu-list"> <li class="menu-item"><a href="#" class="menu-link">News</a></li> <li class="menu-item"><a href="#" class="menu-link">Sports</a></li> <li class="menu-item"><a href="#" class="menu-link">Finance</a></li> </ul> </div> <h3>Selected and Disabled Items</h3> <div class="menu menu-horizontal"> <ul class="menu-list"> <li class="menu-item menu-selected"><a href="#" class="menu-link">Selected</a></li> <li class="menu-item"><a href="#" class="menu-link">Normal</a></li> <li class="menu-item menu-disabled">Disabled</li> </ul> </div> <h3>Dropdowns</h3> <div class="menu menu-horizontal"> <ul class="menu-list"> <li class="menu-item menu-selected"><a href="#" class="menu-link">Home</a></li> <li class="menu-item menu-has-children menu-allow-hover"> <a href="#" id="menuLink1" class="menu-link">Contact</a> <ul class="menu-children"> <li class="menu-item"><a href="#" class="menu-link">Email</a></li> <li class="menu-item"><a href="#" class="menu-link">Twitter</a></li> <li class="menu-item"><a href="#" class="menu-link">Tumblr Blog</a></li> </ul> </li> </ul> </div> <h3>Vertical Menu with Submenus</h3> <div class="menu custom-restricted-width"> <ul class="menu-list"> <li class="menu-item menu-selected"><a href="#" class="menu-link">Flickr</a></li> <li class="menu-item"><a href="#" class="menu-link">Messenger</a></li> <li class="menu-item"><a href="#" class="menu-link">Sports</a></li> <li class="menu-item"><a href="#" class="menu-link">Finance</a></li> <li class="menu-item menu-has-children"> <a href="#" id="menuLink1" class="menu-link">More</a> <ul class="menu-children"> <li class="menu-item"><a href="#" class="menu-link">Autos</a></li> <li class="menu-item"><a href="#" class="menu-link">Flickr</a></li> <li class="menu-item menu-has-children"> <a href="#" id="menuLink1" class="menu-link">Even More</a> <ul class="menu-children"> <li class="menu-item"><a href="#" class="menu-link">Foo</a></li> <li class="menu-item"><a href="#" class="menu-link">Bar</a></li> <li class="menu-item"><a href="#" class="menu-link">Baz</a></li> </ul> </li> </ul> </li> </ul> </div> <h3>Scrollable Horizontal Menu</h3> <div class="menu menu-horizontal menu-scrollable"> <a href="#" class="menu-link menu-heading">Yahoo</a> <ul class="menu-list"> <li class="menu-item"><a href="#" class="menu-link">Home</a></li> <li class="menu-item"><a href="#" class="menu-link">Flickr</a></li> <li class="menu-item"><a href="#" class="menu-link">Messenger</a></li> <li class="menu-item"><a href="#" class="menu-link">Sports</a></li> <li class="menu-item"><a href="#" class="menu-link">Finance</a></li> <li class="menu-item"><a href="#" class="menu-link">Autos</a></li> <li class="menu-item"><a href="#" class="menu-link">Beauty</a></li> <li class="menu-item"><a href="#" class="menu-link">Movies</a></li> <li class="menu-item"><a href="#" class="menu-link">Small Business</a></li> <li class="menu-item"><a href="#" class="menu-link">Cricket</a></li> <li class="menu-item"><a href="#" class="menu-link">Tech</a></li> <li class="menu-item"><a href="#" class="menu-link">World</a></li> <li class="menu-item"><a href="#" class="menu-link">News</a></li> <li class="menu-item"><a href="#" class="menu-link">Support</a></li> </ul> </div> <h3>Scrollable Vertical Menu</h3> <div class="menu menu-scrollable custom-restricted"> <a href="#" class="menu-link menu-heading">Yahoo</a> <ul class="menu-list"> <li class="menu-item"><a href="#" class="menu-link">Home</a></li> <li class="menu-item"><a href="#" class="menu-link">Flickr</a></li> <li class="menu-item"><a href="#" class="menu-link">Messenger</a></li> <li class="menu-item"><a href="#" class="menu-link">Sports</a></li> <li class="menu-item"><a href="#" class="menu-link">Finance</a></li> <li class="menu-item"><a href="#" class="menu-link">Autos</a></li> <li class="menu-item"><a href="#" class="menu-link">Beauty</a></li> <li class="menu-item"><a href="#" class="menu-link">Movies</a></li> <li class="menu-item"><a href="#" class="menu-link">Small Business</a></li> <li class="menu-item"><a href="#" class="menu-link">Cricket</a></li> <li class="menu-item"><a href="#" class="menu-link">Tech</a></li> <li class="menu-item"><a href="#" class="menu-link">World</a></li> <li class="menu-item"><a href="#" class="menu-link">News</a></li> <li class="menu-item"><a href="#" class="menu-link">Support</a></li> </ul> </div> </div> </div>', 'menus .custom-restricted-width,[riot-tag="menus"] .custom-restricted-width,[data-is="menus"] .custom-restricted-width{ display: inline-block; } menus .menu-scrollable.custom-restricted,[riot-tag="menus"] .menu-scrollable.custom-restricted,[data-is="menus"] .menu-scrollable.custom-restricted{ height: 160px; width: 150px; border: 1px solid gray; border-radius: 4px; }', '', function(opts) {
});
},{"riot":"riot"}],20:[function(require,module,exports){
var riot = require('riot');
module.exports = riot.tag2('start', '<div class="group"> <div id="start" class="unit-1"> <h2 class="text-center">Getting Started</h2> <h3>Installation</h3> <p>The framework is published on NPM:</p> <code>npm install thramcss --save-dev</code> <p>Or you can clone or download it from <a href="https://github.com/Thram/thramcss" target="_blank">GitHub</a> </p> </div> </div>', '', '', function(opts) {
});
},{"riot":"riot"}],21:[function(require,module,exports){
var riot = require('riot');
module.exports = riot.tag2('tables', '<div class="group"> <div id="tables" class="unit-1"> <h2 class="text-center">Tables</h2> <h3>Default Table</h3> <table class="table"> <thead> <tr> <th>#</th> <th>Make</th> <th>Model</th> <th>Year</th> </tr> </thead> <tbody> <tr> <td>1</td> <td>Honda</td> <td>Accord</td> <td>2009</td> </tr> <tr> <td>2</td> <td>Toyota</td> <td>Camry</td> <td>2012</td> </tr> <tr> <td>3</td> <td>Hyundai</td> <td>Elantra</td> <td>2010</td> </tr> </tbody> </table> <h3>Bordered Table</h3> <table class="table table-bordered"> <thead> <tr> <th>#</th> <th>Make</th> <th>Model</th> <th>Year</th> </tr> </thead> <tbody> <tr> <td>1</td> <td>Honda</td> <td>Accord</td> <td>2009</td> </tr> <tr> <td>2</td> <td>Toyota</td> <td>Camry</td> <td>2012</td> </tr> <tr> <td>3</td> <td>Hyundai</td> <td>Elantra</td> <td>2010</td> </tr> </tbody> </table> <h3>Table with Horizontal Borders</h3> <table class="table table-horizontal"> <thead> <tr> <th>#</th> <th>Make</th> <th>Model</th> <th>Year</th> </tr> </thead> <tbody> <tr> <td>1</td> <td>Honda</td> <td>Accord</td> <td>2009</td> </tr> <tr> <td>2</td> <td>Toyota</td> <td>Camry</td> <td>2012</td> </tr> <tr> <td>3</td> <td>Hyundai</td> <td>Elantra</td> <td>2010</td> </tr> </tbody> </table> <h3>Striped Table</h3> <table class="table"> <thead> <tr> <th>#</th> <th>Make</th> <th>Model</th> <th>Year</th> </tr> </thead> <tbody> <tr class="table-odd"> <td>1</td> <td>Honda</td> <td>Accord</td> <td>2009</td> </tr> <tr> <td>2</td> <td>Toyota</td> <td>Camry</td> <td>2012</td> </tr> <tr class="table-odd"> <td>3</td> <td>Hyundai</td> <td>Elantra</td> <td>2010</td> </tr> <tr> <td>4</td> <td>Ford</td> <td>Focus</td> <td>2008</td> </tr> <tr class="table-odd"> <td>5</td> <td>Nissan</td> <td>Sentra</td> <td>2011</td> </tr> <tr> <td>6</td> <td>BMW</td> <td>M3</td> <td>2009</td> </tr> <tr class="table-odd"> <td>7</td> <td>Honda</td> <td>Civic</td> <td>2010</td> </tr> <tr> <td>8</td> <td>Kia</td> <td>Soul</td> <td>2010</td> </tr> </tbody> </table> </div> </div>', '', '', function(opts) {
});
},{"riot":"riot"}],22:[function(require,module,exports){
var riot = require('riot');
module.exports = riot.tag2('router', '<top-bar></top-bar> <view tag="{view}-view" params="{params}"></view>', '', '', function(opts) {
        this.mixin(require('mixins/router').default);
});
},{"mixins/router":3,"riot":"riot"}],23:[function(require,module,exports){
var riot = require('riot');
module.exports = riot.tag2('top-bar', '<div class="header"> <div class="menu menu-horizontal"> <a class="menu-heading" href="/#"><h1 class="text-center">ThramCSS</h1></a> <ul class="menu-list" each="{menu in menus}"> <li class="menu-item {parent.parent.opts.view === key && \'menu-selected\'}" each="{key, label in menu}"> <a href="#{key}" class="menu-link">{label}</a> </li> </ul> </div> </div>', '', '', function(opts) {
        var tag = this;

        tag.menus = [
            {
                start  : "Get Started"
            }, {
                base   : "Base",
                grids  : "Grids",
                forms  : "Forms",
                buttons: "Buttons",
                tables : "Tables",
                menus  : "Menus"
            }, {
                customize: "Customize",
                examples: "Examples"
            }
        ];

});
},{"riot":"riot"}],24:[function(require,module,exports){
var riot = require('riot');
module.exports = riot.tag2('view', '<div class="{viewClass}"> <div name="main" class="group main-container"></div> </div>', '', '', function(opts) {
        this.mixin(require('mixins/view').default);
});
},{"mixins/view":4,"riot":"riot"}],25:[function(require,module,exports){
var riot = require('riot');
module.exports = riot.tag2('home-view', '<div class="center unit-1 unit-sm-23-24 unit-md-18-24 unit-lg-15-24 unit-xl-12-24"> <header class="group"> <div class="unit-1"> <h1 class="text-center">ThramCSS</h1> </div> </header> <div class="content group"> <div class="unit-1"> <intro></intro> <start></start> <hr> <grids></grids> <forms></forms> <buttons></buttons> <tables></tables> <menus></menus> <hr> <customize></customize> <examples></examples> </div> </div> </div>', '', '', function(opts) {
});
},{"riot":"riot"}]},{},[1])


//# sourceMappingURL=bundle.js.map
