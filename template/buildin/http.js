'use strict';

function param(a) {
    let s = [];
    let rbracket = /\[\]$/;

    function isArray(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    }

    function add(k, v) {
        v = typeof v === 'function' ? v() : v === null ? '' : v === undefined ? '' : v;
        s[s.length] = encodeURIComponent(k) + '=' + encodeURIComponent(v);
    }

    function buildParams(prefix, obj) {
        let i;
        let len;
        let key;

        if (prefix) {
            if (isArray(obj)) {
                for (i = 0, len = obj.length; i < len; i++) {
                    if (rbracket.test(prefix)) {
                        add(prefix, obj[i]);
                    } else {
                        buildParams(prefix + '[' + (typeof obj[i] === 'object' ? i : '') + ']', obj[i]);
                    }
                }
            } else if (obj && String(obj) === '[object Object]') {
                for (key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        buildParams(prefix + '[' + key + ']', obj[key]);
                    }
                }
            } else {
                add(prefix, obj);
            }
        } else if (isArray(obj)) {
            for (i = 0, len = obj.length; i < len; i++) {
                add(obj[i].name, obj[i].value);
            }
        } else {
            for (key in obj) {
                if (obj.hasOwnProperty(key)) {
                    buildParams(key, obj[key]);
                }
            }
        }
        return s;
    }
    return buildParams('', a).join('&').replace(/%20/g, '+');
}

function isObject(data) {
    return Object.prototype.toString.call(data) === '[object Object]'
        || Object.prototype.toString.call(data) === '[object Array]';
}

function hasContentType(headers) {
    return Object.keys(headers).some(function (name) {
        return name.toLowerCase() === 'content-type';
    });
}

function setHeaders(xhr, headers) {
    headers = headers || {};

    if (!hasContentType(headers)) {
        headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }

    Object.keys(headers).forEach(function (name) {
        xhr.setRequestHeader(name, headers[name]);
    });
}

function xhrConnection(type, url, data, options) {
    if (isObject(data)) {
        data = param(data);
    }
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        if (type === 'get') {
            url = url.replace(/#.*$/, '');
            let divider = url.indexOf('?') !== -1 ? '&' : '?';
            url = [url, data].join(divider);
            data = null;
        }

        xhr.open(type, url || '', true);
        setHeaders(xhr, options.headers);
        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                let result;
                try {
                    result = JSON.parse(xhr.responseText);
                } catch (e) {
                    result = xhr.responseText;
                }
                resolve(result);
            } else {
                reject(Error(xhr.statusText));
            }
        };
        xhr.onerror = function () {
            reject(Error('Network Error'));
        };
        xhr.send(data);
    });
}

let http = {};

let httpMethods = ['get', 'post', 'put', 'delete'];

httpMethods.forEach(function (method) {
    http[method] = function (url, data, options = {}) {
        return xhrConnection(method, url, data, options);
    };
});

module.exports = http;