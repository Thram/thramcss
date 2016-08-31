import {queryString} from "toolbox/utils";
import {ROOT_VIEW} from "modules/constants";
import {content} from "modules/lang";
import {Data} from "modules/data";
import {route} from "riot";

export default {
  init   : function () {
    let tag = this;

    tag.data       = Data;
    tag.if         = (cond) => cond ? [1] : [];
    tag.content    = content;
    tag.query      = route.query();
    tag.backView   = ROOT_VIEW;
    tag.backParams = {};

    tag.go = (view, params) => route('#/' + (view === ROOT_VIEW ? '' : view + (params ? '?' + queryString(params) : '')));

    tag.back = () => route('#/' + (tag.backView === ROOT_VIEW ? '' : tag.backView + (tag.backParams ? '?' + queryString(tag.backParams) : '')));

    tag.goHome = () => tag.go(ROOT_VIEW);

  }
};