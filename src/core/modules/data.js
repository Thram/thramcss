
/**
 * Created by thram on 21/06/16.
 */

import {set as setStore, get as getStore} from "store";
import {set as _set, get as _get, unset as _unset, isString} from "lodash";
import {APP_ID} from "./constants";

const _save = (data) => setStore(`${APP_ID}:data`, data);

class AppData {
  constructor(props) {
    this.data = props || getStore(`${APP_ID}:data`) || {};
  }

  get(path) {
    return path ? _get(this.data, path) : this.data;
  }

  set(path, value) {
    let res = isString(path) ? _set(this.data, path, value) : this.data = path;
    _save(this.data);
    return res;
  }

  remove(path) {
    let res = isString(path) ? _unset(this.data, path) : this.data = {};
    _save(this.data);
    return res;
  }
}

export let Data = new AppData();