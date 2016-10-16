/**
 * Created by thram on 18/06/16.
 */
import {route} from "riot";
import {includes, reduce} from "lodash";
import {ROOT_VIEW, NOT_FOUND_VIEW} from "modules/constants";
import {set as setCache} from "modules/cache";
import {getTitle} from "modules/lang";

const CACHE_ROUTE_EXPIRATION = 600000; // 10 min

export default {
  init: function () {
    let tag = this;

    const routes = tag.opts.routes;

    route.parser((path) => {
      let raw = path.replace('#/', '').split('?'),
          uri = raw[0].split('/'),
          qs  = raw[1];

      uri.push(reduce(qs ? qs.split('&') : [], (result, value) => {
        const v      = value.split('=');
        result[v[0]] = v[1];
        return result;
      }, {}));

      return uri;
    });

    route((target, params) => {
      target         = target.split('#');
      const nextView = (!target[0] ? ROOT_VIEW : (!includes(routes, target[0]) ? NOT_FOUND_VIEW : target[0]));
      if (tag.view != nextView) {
        setCache('last_view', {
          view  : nextView === NOT_FOUND_VIEW ? ROOT_VIEW : nextView,
          params: params
        }, CACHE_ROUTE_EXPIRATION);
        tag.update({view: nextView, params: params});
        document.getElementsByTagName("body")[0].scrollTop = target[1] ? document.querySelector(`#${target[1]}`).offsetTop : 0;
        document.title                                     = getTitle(nextView);
      } else {
        tag.update({params: params});
      }
    });
  }
};