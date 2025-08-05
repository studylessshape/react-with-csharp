/*\
|*|
|*|  :: cookies.js ::
|*|
|*|  A complete cookies reader/writer framework with full unicode support.
|*|
|*|  https://developer.mozilla.org/zh-CN/docs/DOM/document.cookie
|*|
|*|  This framework is released under the GNU Public License, version 3 or later.
|*|  http://www.gnu.org/licenses/gpl-3.0-standalone.html
|*|
|*|  Syntaxes:
|*|
|*|  * setCookie(name, value[, end[, path[, domain[, secure]]]])
|*|  * getCookie(name)
|*|  * removeCookie(name[, path][, domain])
|*|  * hasCookie(name)
|*|  * cookieKeys()
|*|
\*/

export function setCookie(
  sKey: string,
  sValue: string | number | boolean,
  vEnd?: string | number | Date,
  sPath?: string,
  sDomain?: string,
  bSecure?: boolean
) {
  if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
    return false;
  }
  var sExpires = "";
  if (vEnd) {
    const vEndType = typeof vEnd;

    switch (vEndType) {
      case "number":
        sExpires =
          vEnd === Infinity
            ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT"
            : "; max-age=" + vEnd;
        break;
      case "string":
        sExpires = "; expires=" + vEnd;
        break;
      case "object":
        if (vEnd instanceof Date) {
          sExpires = "; expires=" + vEnd.toUTCString();
        }
        break;
    }
  }
  document.cookie =
    encodeURIComponent(sKey) +
    "=" +
    encodeURIComponent(sValue) +
    sExpires +
    (sDomain ? "; domain=" + sDomain : "") +
    (sPath ? "; path=" + sPath : "") +
    (bSecure ? "; secure" : "");
  return true;
}

export function getCookie(sKey: string) {
  return (
    decodeURIComponent(
      document.cookie.replace(
        new RegExp(
          "(?:(?:^|.*;)\\s*" +
            encodeURIComponent(sKey).replace(/[-.+*]/g, "\\$&") +
            "\\s*\\=\\s*([^;]*).*$)|^.*$"
        ),
        "$1"
      )
    ) || null
  );
}

export function removeCookie(sKey: string, sPath?: string, sDomain?: string) {
  if (!sKey || !hasCookie(sKey)) {
    return false;
  }
  document.cookie =
    encodeURIComponent(sKey) +
    "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" +
    (sDomain ? "; domain=" + sDomain : "") +
    (sPath ? "; path=" + sPath : "");
  return true;
}

export function hasCookie(sKey: string) {
  return new RegExp(
    "(?:^|;\\s*)" +
      encodeURIComponent(sKey).replace(/[-.+*]/g, "\\$&") +
      "\\s*\\="
  ).test(document.cookie);
}

export function cookieKeys() {
  var aKeys = document.cookie
    .replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "")
    .split(/\s*(?:\=[^;]*)?;\s*/);
  for (var nIdx = 0; nIdx < aKeys.length; nIdx++) {
    aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]);
  }
  return aKeys;
}
