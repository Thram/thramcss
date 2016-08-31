/**
 * Created by thram on 1/04/16.
 */
import {clear as clearStore, remove as removeStore, set as setStore, get as getStore} from "store";
import {APP_ID} from "./constants";

export const EXPIRATION = 1200000; // 20 min

export const enabled = true;

export const clear = clearStore;

export const remove = (key) => removeStore(`${APP_ID}:${key}`);

export const set = (key, val, exp) => setStore(`${APP_ID}:${key}`, {
  val : val,
  exp : exp || EXPIRATION,
  time: new Date().getTime()
});

export const get = (key) => {
  let info = getStore(`${APP_ID}:${key}`);
  return (!!info && new Date().getTime() - info.time <= info.exp) ? info.val : undefined;
};