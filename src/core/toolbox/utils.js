/**
 * Created by thram on 14/04/16.
 */
import {
  zipObject,
  map,
  keys,
  uniqueId,
  assign,
  reduce,
  compact,
  isUndefined,
  isNull,
  isInteger,
  isString,
  isEqual
} from "lodash";

export const Enum = (keys) => zipObject(keys, keys);

export const Payload = (type, payload) => assign({}, {type: type, payload: payload});

export const queryString = (obj) => reduce(obj, (results, value, key) => {
  results.push(encodeURIComponent(key) + "=" + encodeURIComponent(value));
  return results;
}, []).join("&");

export function isEvent(obj) {
  if (!obj) return false;
  let s               = obj.toString(),
      GENERIC_PATTERN = /\[object Event\]/,
      DOM_PATTERN     = /\[object (Keyboard|Mouse|Focus|Wheel|Composition|Storage)Event\]/;
  return DOM_PATTERN.test(s) || GENERIC_PATTERN.test(s);
}

export function stopEvent(ev) {
  ev.preventDefault();
  ev.stopPropagation();
}

export const hasClass = (elem, className) => new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');

export function clearClasses(elem, baseClasses) {
  elem.className = baseClasses || '';
  return elem;
}

export function addClass(elem, className) {
  setTimeout(()=> !hasClass(elem, className) && (elem.className += ' ' + className), 0);
  return elem;
}

export function removeClass(elem, className) {
  var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, ' ') + ' ';
  if (hasClass(elem, className)) {
    while (newClass.indexOf(' ' + className + ' ') >= 0)
      newClass = newClass.replace(' ' + className + ' ', ' ');
    elem.className = newClass.replace(/^\s+|\s+$/g, '');
  }
  return elem;
}

export function touchElement({element, class_name, base_classes, cleaning_time}) {
  if (cleaning_time) setTimeout(() => clearClasses(element, base_classes), cleaning_time);
  return addClass(clearClasses(element, base_classes), class_name);
}

export const addEvent = (element, evnt, funct) => element.attachEvent ? element.attachEvent('on' + evnt, funct) : element.addEventListener(evnt, funct, false);

export const removeEvent = (element, evnt, funct) => element.detachEvent ? element.detachEvent('on' + evnt, funct) : element.removeEventListener(evnt, funct, false);

export function onClickOutside(container, funct) {
  const onClick = (e) => !container.contains(e.target) && funct(e);
  addEvent(document, 'click', onClick);
  return onClick;
}

export const offClickOutside = (onClick) => removeEvent(document, 'click', onClick);