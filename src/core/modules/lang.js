/**
 * Created by thram on 3/08/16.
 */
import {get, merge} from "lodash";
import {PARAMS_REG_EXP, IMAGES_URL, AUDIOS_URL, VIDEOS_URL, SUB_PAGES_URL} from "./constants";

const paramsRegExp = new RegExp(PARAMS_REG_EXP, 'g');

const commonContent = require('en.yaml');

const textContent = merge({}, commonContent);

const getURL = (base, url)=> `${base}/${url.file ? url.file : url}`;

export const content = Object.assign({
  withParams: (path, params)=> get(textContent, path, '').replace(paramsRegExp, (replaceText, key) => params[key]),
  getImage  : (url)=> getURL(IMAGES_URL, url),
  getAudio  : (url)=> getURL(AUDIOS_URL, url),
  getVideo  : (url)=> getURL(VIDEOS_URL, url),
  getSubPage: (url)=> getURL(SUB_PAGES_URL, url)
}, textContent);

export const getTitle = (view) => {
  const viewTitle = get(content, `${view}.title`);
  return `${get(content, `app.title`, document.title)}${viewTitle ? ` | ${viewTitle}` : ''}`;
};