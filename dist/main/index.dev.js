"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var __accessCheck = (obj, member, msg2) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg2);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var __privateWrapper = (obj, member, setter, getter) => ({
  set _(value) {
    __privateSet(obj, member, value, setter);
  },
  get _() {
    return __privateGet(obj, member, getter);
  }
});
var __privateMethod = (obj, member, method) => {
  __accessCheck(obj, member, "access private method");
  return method;
};
var _root, _hasMagic, _uflag, _parts, _parent, _parentIndex, _negs, _filledNegs, _options, _toString, _emptyExt, _fillNegs, fillNegs_fn, _parseAST, parseAST_fn, _partsToRegExp, partsToRegExp_fn, _parseGlob, parseGlob_fn, _a, _constructing, _max, _maxSize, _dispose, _disposeAfter, _fetchMethod, _size, _calculatedSize, _keyMap, _keyList, _valList, _next, _prev, _head, _tail, _free, _disposed, _sizes, _starts, _ttls, _hasDispose, _hasFetchMethod, _hasDisposeAfter, _initializeTTLTracking, initializeTTLTracking_fn, _updateItemAge, _statusTTL, _setItemTTL, _isStale, _initializeSizeTracking, initializeSizeTracking_fn, _removeItemSize, _addItemSize, _requireSize, _indexes, indexes_fn, _rindexes, rindexes_fn, _isValidIndex, isValidIndex_fn, _b, _evict, evict_fn, _backgroundFetch, backgroundFetch_fn, _isBackgroundFetch, isBackgroundFetch_fn, _connect, connect_fn, _moveToTail, moveToTail_fn, _fs, _dev, _mode, _nlink, _uid, _gid, _rdev, _blksize, _ino, _size2, _blocks, _atimeMs, _mtimeMs, _ctimeMs, _birthtimeMs, _atime, _mtime, _ctime, _birthtime, _matchName, _depth, _fullpath, _fullpathPosix, _relative, _relativePosix, _type, _children, _linkTarget, _realpath, _resolveParts, resolveParts_fn, _readdirSuccess, readdirSuccess_fn, _markENOENT, markENOENT_fn, _markChildrenENOENT, markChildrenENOENT_fn, _markENOREALPATH, markENOREALPATH_fn, _markENOTDIR, markENOTDIR_fn, _readdirFail, readdirFail_fn, _lstatFail, lstatFail_fn, _readlinkFail, readlinkFail_fn, _readdirAddChild, readdirAddChild_fn, _readdirAddNewChild, readdirAddNewChild_fn, _readdirMaybePromoteChild, readdirMaybePromoteChild_fn, _readdirPromoteChild, readdirPromoteChild_fn, _applyStat, applyStat_fn, _onReaddirCB, _readdirCBInFlight, _callOnReaddirCB, callOnReaddirCB_fn, _asyncReaddirInFlight, _resolveCache, _resolvePosixCache, _children2, _fs2, _patternList, _globList, _index, _platform, _rest, _globString, _isDrive, _isUNC, _isAbsolute, _followGlobstar, _onResume, _ignore, _sep, _ignored, ignored_fn, _childrenIgnored, childrenIgnored_fn;
const require$$2$3 = require("electron");
const require$$0$2 = require("path");
const require$$2$1 = require("node:url");
const require$$1$1 = require("node:path");
const require$$0$1 = require("fs");
const require$$4 = require("node:fs");
const require$$5 = require("node:fs/promises");
const require$$0 = require("node:events");
const require$$1 = require("node:stream");
const require$$2 = require("node:string_decoder");
const require$$1$2 = require("util");
const require$$0$3 = require("os");
const require$$0$7 = require("fs/promises");
const require$$0$4 = require("stream");
const require$$2$2 = require("events");
const require$$0$5 = require("buffer");
const require$$0$6 = require("crypto");
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var dist = {};
var commonjs$6 = {};
var commonjs$5 = {};
var commonjs$4 = {};
var balancedMatch = balanced$1;
function balanced$1(a, b, str) {
  if (a instanceof RegExp)
    a = maybeMatch(a, str);
  if (b instanceof RegExp)
    b = maybeMatch(b, str);
  var r = range(a, b, str);
  return r && {
    start: r[0],
    end: r[1],
    pre: str.slice(0, r[0]),
    body: str.slice(r[0] + a.length, r[1]),
    post: str.slice(r[1] + b.length)
  };
}
function maybeMatch(reg, str) {
  var m = str.match(reg);
  return m ? m[0] : null;
}
balanced$1.range = range;
function range(a, b, str) {
  var begs, beg, left, right, result;
  var ai = str.indexOf(a);
  var bi = str.indexOf(b, ai + 1);
  var i = ai;
  if (ai >= 0 && bi > 0) {
    if (a === b) {
      return [ai, bi];
    }
    begs = [];
    left = str.length;
    while (i >= 0 && !result) {
      if (i == ai) {
        begs.push(i);
        ai = str.indexOf(a, i + 1);
      } else if (begs.length == 1) {
        result = [begs.pop(), bi];
      } else {
        beg = begs.pop();
        if (beg < left) {
          left = beg;
          right = bi;
        }
        bi = str.indexOf(b, i + 1);
      }
      i = ai < bi && ai >= 0 ? ai : bi;
    }
    if (begs.length) {
      result = [left, right];
    }
  }
  return result;
}
var balanced = balancedMatch;
var braceExpansion = expandTop;
var escSlash = "\0SLASH" + Math.random() + "\0";
var escOpen = "\0OPEN" + Math.random() + "\0";
var escClose = "\0CLOSE" + Math.random() + "\0";
var escComma = "\0COMMA" + Math.random() + "\0";
var escPeriod = "\0PERIOD" + Math.random() + "\0";
function numeric(str) {
  return parseInt(str, 10) == str ? parseInt(str, 10) : str.charCodeAt(0);
}
function escapeBraces(str) {
  return str.split("\\\\").join(escSlash).split("\\{").join(escOpen).split("\\}").join(escClose).split("\\,").join(escComma).split("\\.").join(escPeriod);
}
function unescapeBraces(str) {
  return str.split(escSlash).join("\\").split(escOpen).join("{").split(escClose).join("}").split(escComma).join(",").split(escPeriod).join(".");
}
function parseCommaParts(str) {
  if (!str)
    return [""];
  var parts = [];
  var m = balanced("{", "}", str);
  if (!m)
    return str.split(",");
  var pre = m.pre;
  var body = m.body;
  var post = m.post;
  var p = pre.split(",");
  p[p.length - 1] += "{" + body + "}";
  var postParts = parseCommaParts(post);
  if (post.length) {
    p[p.length - 1] += postParts.shift();
    p.push.apply(p, postParts);
  }
  parts.push.apply(parts, p);
  return parts;
}
function expandTop(str) {
  if (!str)
    return [];
  if (str.substr(0, 2) === "{}") {
    str = "\\{\\}" + str.substr(2);
  }
  return expand$1(escapeBraces(str), true).map(unescapeBraces);
}
function embrace(str) {
  return "{" + str + "}";
}
function isPadded(el) {
  return /^-?0\d/.test(el);
}
function lte(i, y) {
  return i <= y;
}
function gte(i, y) {
  return i >= y;
}
function expand$1(str, isTop) {
  var expansions = [];
  var m = balanced("{", "}", str);
  if (!m)
    return [str];
  var pre = m.pre;
  var post = m.post.length ? expand$1(m.post, false) : [""];
  if (/\$$/.test(m.pre)) {
    for (var k = 0; k < post.length; k++) {
      var expansion = pre + "{" + m.body + "}" + post[k];
      expansions.push(expansion);
    }
  } else {
    var isNumericSequence = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(m.body);
    var isAlphaSequence = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(m.body);
    var isSequence = isNumericSequence || isAlphaSequence;
    var isOptions = m.body.indexOf(",") >= 0;
    if (!isSequence && !isOptions) {
      if (m.post.match(/,.*\}/)) {
        str = m.pre + "{" + m.body + escClose + m.post;
        return expand$1(str);
      }
      return [str];
    }
    var n;
    if (isSequence) {
      n = m.body.split(/\.\./);
    } else {
      n = parseCommaParts(m.body);
      if (n.length === 1) {
        n = expand$1(n[0], false).map(embrace);
        if (n.length === 1) {
          return post.map(function(p) {
            return m.pre + n[0] + p;
          });
        }
      }
    }
    var N;
    if (isSequence) {
      var x = numeric(n[0]);
      var y = numeric(n[1]);
      var width = Math.max(n[0].length, n[1].length);
      var incr = n.length == 3 ? Math.abs(numeric(n[2])) : 1;
      var test = lte;
      var reverse = y < x;
      if (reverse) {
        incr *= -1;
        test = gte;
      }
      var pad = n.some(isPadded);
      N = [];
      for (var i = x; test(i, y); i += incr) {
        var c2;
        if (isAlphaSequence) {
          c2 = String.fromCharCode(i);
          if (c2 === "\\")
            c2 = "";
        } else {
          c2 = String(i);
          if (pad) {
            var need = width - c2.length;
            if (need > 0) {
              var z = new Array(need + 1).join("0");
              if (i < 0)
                c2 = "-" + z + c2.slice(1);
              else
                c2 = z + c2;
            }
          }
        }
        N.push(c2);
      }
    } else {
      N = [];
      for (var j = 0; j < n.length; j++) {
        N.push.apply(N, expand$1(n[j], false));
      }
    }
    for (var j = 0; j < N.length; j++) {
      for (var k = 0; k < post.length; k++) {
        var expansion = pre + N[j] + post[k];
        if (!isTop || isSequence || expansion)
          expansions.push(expansion);
      }
    }
  }
  return expansions;
}
var assertValidPattern$2 = {};
Object.defineProperty(assertValidPattern$2, "__esModule", { value: true });
assertValidPattern$2.assertValidPattern = void 0;
const MAX_PATTERN_LENGTH$1 = 1024 * 64;
const assertValidPattern$1 = (pattern2) => {
  if (typeof pattern2 !== "string") {
    throw new TypeError("invalid pattern");
  }
  if (pattern2.length > MAX_PATTERN_LENGTH$1) {
    throw new TypeError("pattern is too long");
  }
};
assertValidPattern$2.assertValidPattern = assertValidPattern$1;
var ast = {};
var braceExpressions = {};
Object.defineProperty(braceExpressions, "__esModule", { value: true });
braceExpressions.parseClass = void 0;
const posixClasses = {
  "[:alnum:]": ["\\p{L}\\p{Nl}\\p{Nd}", true],
  "[:alpha:]": ["\\p{L}\\p{Nl}", true],
  "[:ascii:]": ["\\x00-\\x7f", false],
  "[:blank:]": ["\\p{Zs}\\t", true],
  "[:cntrl:]": ["\\p{Cc}", true],
  "[:digit:]": ["\\p{Nd}", true],
  "[:graph:]": ["\\p{Z}\\p{C}", true, true],
  "[:lower:]": ["\\p{Ll}", true],
  "[:print:]": ["\\p{C}", true],
  "[:punct:]": ["\\p{P}", true],
  "[:space:]": ["\\p{Z}\\t\\r\\n\\v\\f", true],
  "[:upper:]": ["\\p{Lu}", true],
  "[:word:]": ["\\p{L}\\p{Nl}\\p{Nd}\\p{Pc}", true],
  "[:xdigit:]": ["A-Fa-f0-9", false]
};
const braceEscape = (s) => s.replace(/[[\]\\-]/g, "\\$&");
const regexpEscape = (s) => s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
const rangesToString = (ranges) => ranges.join("");
const parseClass = (glob2, position) => {
  const pos = position;
  if (glob2.charAt(pos) !== "[") {
    throw new Error("not in a brace expression");
  }
  const ranges = [];
  const negs = [];
  let i = pos + 1;
  let sawStart = false;
  let uflag = false;
  let escaping = false;
  let negate = false;
  let endPos = pos;
  let rangeStart = "";
  WHILE:
    while (i < glob2.length) {
      const c2 = glob2.charAt(i);
      if ((c2 === "!" || c2 === "^") && i === pos + 1) {
        negate = true;
        i++;
        continue;
      }
      if (c2 === "]" && sawStart && !escaping) {
        endPos = i + 1;
        break;
      }
      sawStart = true;
      if (c2 === "\\") {
        if (!escaping) {
          escaping = true;
          i++;
          continue;
        }
      }
      if (c2 === "[" && !escaping) {
        for (const [cls, [unip, u, neg]] of Object.entries(posixClasses)) {
          if (glob2.startsWith(cls, i)) {
            if (rangeStart) {
              return ["$.", false, glob2.length - pos, true];
            }
            i += cls.length;
            if (neg)
              negs.push(unip);
            else
              ranges.push(unip);
            uflag = uflag || u;
            continue WHILE;
          }
        }
      }
      escaping = false;
      if (rangeStart) {
        if (c2 > rangeStart) {
          ranges.push(braceEscape(rangeStart) + "-" + braceEscape(c2));
        } else if (c2 === rangeStart) {
          ranges.push(braceEscape(c2));
        }
        rangeStart = "";
        i++;
        continue;
      }
      if (glob2.startsWith("-]", i + 1)) {
        ranges.push(braceEscape(c2 + "-"));
        i += 2;
        continue;
      }
      if (glob2.startsWith("-", i + 1)) {
        rangeStart = c2;
        i += 2;
        continue;
      }
      ranges.push(braceEscape(c2));
      i++;
    }
  if (endPos < i) {
    return ["", false, 0, false];
  }
  if (!ranges.length && !negs.length) {
    return ["$.", false, glob2.length - pos, true];
  }
  if (negs.length === 0 && ranges.length === 1 && /^\\?.$/.test(ranges[0]) && !negate) {
    const r = ranges[0].length === 2 ? ranges[0].slice(-1) : ranges[0];
    return [regexpEscape(r), false, endPos - pos, false];
  }
  const sranges = "[" + (negate ? "^" : "") + rangesToString(ranges) + "]";
  const snegs = "[" + (negate ? "" : "^") + rangesToString(negs) + "]";
  const comb = ranges.length && negs.length ? "(" + sranges + "|" + snegs + ")" : ranges.length ? sranges : snegs;
  return [comb, uflag, endPos - pos, true];
};
braceExpressions.parseClass = parseClass;
var _unescape = {};
Object.defineProperty(_unescape, "__esModule", { value: true });
_unescape.unescape = void 0;
const unescape = (s, { windowsPathsNoEscape = false } = {}) => {
  return windowsPathsNoEscape ? s.replace(/\[([^\/\\])\]/g, "$1") : s.replace(/((?!\\).|^)\[([^\/\\])\]/g, "$1$2").replace(/\\([^\/])/g, "$1");
};
_unescape.unescape = unescape;
Object.defineProperty(ast, "__esModule", { value: true });
ast.AST = void 0;
const brace_expressions_js_1 = braceExpressions;
const unescape_js_1 = _unescape;
const types = /* @__PURE__ */ new Set(["!", "?", "+", "*", "@"]);
const isExtglobType = (c2) => types.has(c2);
const startNoTraversal = "(?!(?:^|/)\\.\\.?(?:$|/))";
const startNoDot = "(?!\\.)";
const addPatternStart = /* @__PURE__ */ new Set(["[", "."]);
const justDots = /* @__PURE__ */ new Set(["..", "."]);
const reSpecials$1 = new Set("().*{}+?[]^$\\!");
const regExpEscape$1 = (s) => s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
const qmark$1 = "[^/]";
const star$1 = qmark$1 + "*?";
const starNoEmpty = qmark$1 + "+?";
const _AST = class _AST {
  constructor(type, parent, options = {}) {
    __privateAdd(this, _fillNegs);
    __privateAdd(this, _partsToRegExp);
    __publicField(this, "type");
    __privateAdd(this, _root, void 0);
    __privateAdd(this, _hasMagic, void 0);
    __privateAdd(this, _uflag, false);
    __privateAdd(this, _parts, []);
    __privateAdd(this, _parent, void 0);
    __privateAdd(this, _parentIndex, void 0);
    __privateAdd(this, _negs, void 0);
    __privateAdd(this, _filledNegs, false);
    __privateAdd(this, _options, void 0);
    __privateAdd(this, _toString, void 0);
    // set to true if it's an extglob with no children
    // (which really means one child of '')
    __privateAdd(this, _emptyExt, false);
    this.type = type;
    if (type)
      __privateSet(this, _hasMagic, true);
    __privateSet(this, _parent, parent);
    __privateSet(this, _root, __privateGet(this, _parent) ? __privateGet(__privateGet(this, _parent), _root) : this);
    __privateSet(this, _options, __privateGet(this, _root) === this ? options : __privateGet(__privateGet(this, _root), _options));
    __privateSet(this, _negs, __privateGet(this, _root) === this ? [] : __privateGet(__privateGet(this, _root), _negs));
    if (type === "!" && !__privateGet(__privateGet(this, _root), _filledNegs))
      __privateGet(this, _negs).push(this);
    __privateSet(this, _parentIndex, __privateGet(this, _parent) ? __privateGet(__privateGet(this, _parent), _parts).length : 0);
  }
  get hasMagic() {
    if (__privateGet(this, _hasMagic) !== void 0)
      return __privateGet(this, _hasMagic);
    for (const p of __privateGet(this, _parts)) {
      if (typeof p === "string")
        continue;
      if (p.type || p.hasMagic)
        return __privateSet(this, _hasMagic, true);
    }
    return __privateGet(this, _hasMagic);
  }
  // reconstructs the pattern
  toString() {
    if (__privateGet(this, _toString) !== void 0)
      return __privateGet(this, _toString);
    if (!this.type) {
      return __privateSet(this, _toString, __privateGet(this, _parts).map((p) => String(p)).join(""));
    } else {
      return __privateSet(this, _toString, this.type + "(" + __privateGet(this, _parts).map((p) => String(p)).join("|") + ")");
    }
  }
  push(...parts) {
    for (const p of parts) {
      if (p === "")
        continue;
      if (typeof p !== "string" && !(p instanceof _AST && __privateGet(p, _parent) === this)) {
        throw new Error("invalid part: " + p);
      }
      __privateGet(this, _parts).push(p);
    }
  }
  toJSON() {
    var _a2;
    const ret = this.type === null ? __privateGet(this, _parts).slice().map((p) => typeof p === "string" ? p : p.toJSON()) : [this.type, ...__privateGet(this, _parts).map((p) => p.toJSON())];
    if (this.isStart() && !this.type)
      ret.unshift([]);
    if (this.isEnd() && (this === __privateGet(this, _root) || __privateGet(__privateGet(this, _root), _filledNegs) && ((_a2 = __privateGet(this, _parent)) == null ? void 0 : _a2.type) === "!")) {
      ret.push({});
    }
    return ret;
  }
  isStart() {
    var _a2;
    if (__privateGet(this, _root) === this)
      return true;
    if (!((_a2 = __privateGet(this, _parent)) == null ? void 0 : _a2.isStart()))
      return false;
    if (__privateGet(this, _parentIndex) === 0)
      return true;
    const p = __privateGet(this, _parent);
    for (let i = 0; i < __privateGet(this, _parentIndex); i++) {
      const pp = __privateGet(p, _parts)[i];
      if (!(pp instanceof _AST && pp.type === "!")) {
        return false;
      }
    }
    return true;
  }
  isEnd() {
    var _a2, _b2, _c;
    if (__privateGet(this, _root) === this)
      return true;
    if (((_a2 = __privateGet(this, _parent)) == null ? void 0 : _a2.type) === "!")
      return true;
    if (!((_b2 = __privateGet(this, _parent)) == null ? void 0 : _b2.isEnd()))
      return false;
    if (!this.type)
      return (_c = __privateGet(this, _parent)) == null ? void 0 : _c.isEnd();
    const pl = __privateGet(this, _parent) ? __privateGet(__privateGet(this, _parent), _parts).length : 0;
    return __privateGet(this, _parentIndex) === pl - 1;
  }
  copyIn(part) {
    if (typeof part === "string")
      this.push(part);
    else
      this.push(part.clone(this));
  }
  clone(parent) {
    const c2 = new _AST(this.type, parent);
    for (const p of __privateGet(this, _parts)) {
      c2.copyIn(p);
    }
    return c2;
  }
  static fromGlob(pattern2, options = {}) {
    var _a2;
    const ast2 = new _AST(null, void 0, options);
    __privateMethod(_a2 = _AST, _parseAST, parseAST_fn).call(_a2, pattern2, ast2, 0, options);
    return ast2;
  }
  // returns the regular expression if there's magic, or the unescaped
  // string if not.
  toMMPattern() {
    if (this !== __privateGet(this, _root))
      return __privateGet(this, _root).toMMPattern();
    const glob2 = this.toString();
    const [re, body, hasMagic2, uflag] = this.toRegExpSource();
    const anyMagic = hasMagic2 || __privateGet(this, _hasMagic) || __privateGet(this, _options).nocase && !__privateGet(this, _options).nocaseMagicOnly && glob2.toUpperCase() !== glob2.toLowerCase();
    if (!anyMagic) {
      return body;
    }
    const flags = (__privateGet(this, _options).nocase ? "i" : "") + (uflag ? "u" : "");
    return Object.assign(new RegExp(`^${re}$`, flags), {
      _src: re,
      _glob: glob2
    });
  }
  get options() {
    return __privateGet(this, _options);
  }
  // returns the string match, the regexp source, whether there's magic
  // in the regexp (so a regular expression is required) and whether or
  // not the uflag is needed for the regular expression (for posix classes)
  // TODO: instead of injecting the start/end at this point, just return
  // the BODY of the regexp, along with the start/end portions suitable
  // for binding the start/end in either a joined full-path makeRe context
  // (where we bind to (^|/), or a standalone matchPart context (where
  // we bind to ^, and not /).  Otherwise slashes get duped!
  //
  // In part-matching mode, the start is:
  // - if not isStart: nothing
  // - if traversal possible, but not allowed: ^(?!\.\.?$)
  // - if dots allowed or not possible: ^
  // - if dots possible and not allowed: ^(?!\.)
  // end is:
  // - if not isEnd(): nothing
  // - else: $
  //
  // In full-path matching mode, we put the slash at the START of the
  // pattern, so start is:
  // - if first pattern: same as part-matching mode
  // - if not isStart(): nothing
  // - if traversal possible, but not allowed: /(?!\.\.?(?:$|/))
  // - if dots allowed or not possible: /
  // - if dots possible and not allowed: /(?!\.)
  // end is:
  // - if last pattern, same as part-matching mode
  // - else nothing
  //
  // Always put the (?:$|/) on negated tails, though, because that has to be
  // there to bind the end of the negated pattern portion, and it's easier to
  // just stick it in now rather than try to inject it later in the middle of
  // the pattern.
  //
  // We can just always return the same end, and leave it up to the caller
  // to know whether it's going to be used joined or in parts.
  // And, if the start is adjusted slightly, can do the same there:
  // - if not isStart: nothing
  // - if traversal possible, but not allowed: (?:/|^)(?!\.\.?$)
  // - if dots allowed or not possible: (?:/|^)
  // - if dots possible and not allowed: (?:/|^)(?!\.)
  //
  // But it's better to have a simpler binding without a conditional, for
  // performance, so probably better to return both start options.
  //
  // Then the caller just ignores the end if it's not the first pattern,
  // and the start always gets applied.
  //
  // But that's always going to be $ if it's the ending pattern, or nothing,
  // so the caller can just attach $ at the end of the pattern when building.
  //
  // So the todo is:
  // - better detect what kind of start is needed
  // - return both flavors of starting pattern
  // - attach $ at the end of the pattern when creating the actual RegExp
  //
  // Ah, but wait, no, that all only applies to the root when the first pattern
  // is not an extglob. If the first pattern IS an extglob, then we need all
  // that dot prevention biz to live in the extglob portions, because eg
  // +(*|.x*) can match .xy but not .yx.
  //
  // So, return the two flavors if it's #root and the first child is not an
  // AST, otherwise leave it to the child AST to handle it, and there,
  // use the (?:^|/) style of start binding.
  //
  // Even simplified further:
  // - Since the start for a join is eg /(?!\.) and the start for a part
  // is ^(?!\.), we can just prepend (?!\.) to the pattern (either root
  // or start or whatever) and prepend ^ or / at the Regexp construction.
  toRegExpSource(allowDot) {
    var _a2;
    const dot = allowDot ?? !!__privateGet(this, _options).dot;
    if (__privateGet(this, _root) === this)
      __privateMethod(this, _fillNegs, fillNegs_fn).call(this);
    if (!this.type) {
      const noEmpty = this.isStart() && this.isEnd();
      const src = __privateGet(this, _parts).map((p) => {
        var _a3;
        const [re, _, hasMagic2, uflag] = typeof p === "string" ? __privateMethod(_a3 = _AST, _parseGlob, parseGlob_fn).call(_a3, p, __privateGet(this, _hasMagic), noEmpty) : p.toRegExpSource(allowDot);
        __privateSet(this, _hasMagic, __privateGet(this, _hasMagic) || hasMagic2);
        __privateSet(this, _uflag, __privateGet(this, _uflag) || uflag);
        return re;
      }).join("");
      let start2 = "";
      if (this.isStart()) {
        if (typeof __privateGet(this, _parts)[0] === "string") {
          const dotTravAllowed = __privateGet(this, _parts).length === 1 && justDots.has(__privateGet(this, _parts)[0]);
          if (!dotTravAllowed) {
            const aps = addPatternStart;
            const needNoTrav = (
              // dots are allowed, and the pattern starts with [ or .
              dot && aps.has(src.charAt(0)) || // the pattern starts with \., and then [ or .
              src.startsWith("\\.") && aps.has(src.charAt(2)) || // the pattern starts with \.\., and then [ or .
              src.startsWith("\\.\\.") && aps.has(src.charAt(4))
            );
            const needNoDot = !dot && !allowDot && aps.has(src.charAt(0));
            start2 = needNoTrav ? startNoTraversal : needNoDot ? startNoDot : "";
          }
        }
      }
      let end = "";
      if (this.isEnd() && __privateGet(__privateGet(this, _root), _filledNegs) && ((_a2 = __privateGet(this, _parent)) == null ? void 0 : _a2.type) === "!") {
        end = "(?:$|\\/)";
      }
      const final2 = start2 + src + end;
      return [
        final2,
        (0, unescape_js_1.unescape)(src),
        __privateSet(this, _hasMagic, !!__privateGet(this, _hasMagic)),
        __privateGet(this, _uflag)
      ];
    }
    const repeated = this.type === "*" || this.type === "+";
    const start = this.type === "!" ? "(?:(?!(?:" : "(?:";
    let body = __privateMethod(this, _partsToRegExp, partsToRegExp_fn).call(this, dot);
    if (this.isStart() && this.isEnd() && !body && this.type !== "!") {
      const s = this.toString();
      __privateSet(this, _parts, [s]);
      this.type = null;
      __privateSet(this, _hasMagic, void 0);
      return [s, (0, unescape_js_1.unescape)(this.toString()), false, false];
    }
    let bodyDotAllowed = !repeated || allowDot || dot || !startNoDot ? "" : __privateMethod(this, _partsToRegExp, partsToRegExp_fn).call(this, true);
    if (bodyDotAllowed === body) {
      bodyDotAllowed = "";
    }
    if (bodyDotAllowed) {
      body = `(?:${body})(?:${bodyDotAllowed})*?`;
    }
    let final = "";
    if (this.type === "!" && __privateGet(this, _emptyExt)) {
      final = (this.isStart() && !dot ? startNoDot : "") + starNoEmpty;
    } else {
      const close = this.type === "!" ? (
        // !() must match something,but !(x) can match ''
        "))" + (this.isStart() && !dot && !allowDot ? startNoDot : "") + star$1 + ")"
      ) : this.type === "@" ? ")" : this.type === "?" ? ")?" : this.type === "+" && bodyDotAllowed ? ")" : this.type === "*" && bodyDotAllowed ? `)?` : `)${this.type}`;
      final = start + body + close;
    }
    return [
      final,
      (0, unescape_js_1.unescape)(body),
      __privateSet(this, _hasMagic, !!__privateGet(this, _hasMagic)),
      __privateGet(this, _uflag)
    ];
  }
};
_root = new WeakMap();
_hasMagic = new WeakMap();
_uflag = new WeakMap();
_parts = new WeakMap();
_parent = new WeakMap();
_parentIndex = new WeakMap();
_negs = new WeakMap();
_filledNegs = new WeakMap();
_options = new WeakMap();
_toString = new WeakMap();
_emptyExt = new WeakMap();
_fillNegs = new WeakSet();
fillNegs_fn = function() {
  if (this !== __privateGet(this, _root))
    throw new Error("should only call on root");
  if (__privateGet(this, _filledNegs))
    return this;
  this.toString();
  __privateSet(this, _filledNegs, true);
  let n;
  while (n = __privateGet(this, _negs).pop()) {
    if (n.type !== "!")
      continue;
    let p = n;
    let pp = __privateGet(p, _parent);
    while (pp) {
      for (let i = __privateGet(p, _parentIndex) + 1; !pp.type && i < __privateGet(pp, _parts).length; i++) {
        for (const part of __privateGet(n, _parts)) {
          if (typeof part === "string") {
            throw new Error("string part in extglob AST??");
          }
          part.copyIn(__privateGet(pp, _parts)[i]);
        }
      }
      p = pp;
      pp = __privateGet(p, _parent);
    }
  }
  return this;
};
_parseAST = new WeakSet();
parseAST_fn = function(str, ast2, pos, opt) {
  var _a2, _b2;
  let escaping = false;
  let inBrace = false;
  let braceStart = -1;
  let braceNeg = false;
  if (ast2.type === null) {
    let i2 = pos;
    let acc2 = "";
    while (i2 < str.length) {
      const c2 = str.charAt(i2++);
      if (escaping || c2 === "\\") {
        escaping = !escaping;
        acc2 += c2;
        continue;
      }
      if (inBrace) {
        if (i2 === braceStart + 1) {
          if (c2 === "^" || c2 === "!") {
            braceNeg = true;
          }
        } else if (c2 === "]" && !(i2 === braceStart + 2 && braceNeg)) {
          inBrace = false;
        }
        acc2 += c2;
        continue;
      } else if (c2 === "[") {
        inBrace = true;
        braceStart = i2;
        braceNeg = false;
        acc2 += c2;
        continue;
      }
      if (!opt.noext && isExtglobType(c2) && str.charAt(i2) === "(") {
        ast2.push(acc2);
        acc2 = "";
        const ext2 = new _AST(c2, ast2);
        i2 = __privateMethod(_a2 = _AST, _parseAST, parseAST_fn).call(_a2, str, ext2, i2, opt);
        ast2.push(ext2);
        continue;
      }
      acc2 += c2;
    }
    ast2.push(acc2);
    return i2;
  }
  let i = pos + 1;
  let part = new _AST(null, ast2);
  const parts = [];
  let acc = "";
  while (i < str.length) {
    const c2 = str.charAt(i++);
    if (escaping || c2 === "\\") {
      escaping = !escaping;
      acc += c2;
      continue;
    }
    if (inBrace) {
      if (i === braceStart + 1) {
        if (c2 === "^" || c2 === "!") {
          braceNeg = true;
        }
      } else if (c2 === "]" && !(i === braceStart + 2 && braceNeg)) {
        inBrace = false;
      }
      acc += c2;
      continue;
    } else if (c2 === "[") {
      inBrace = true;
      braceStart = i;
      braceNeg = false;
      acc += c2;
      continue;
    }
    if (isExtglobType(c2) && str.charAt(i) === "(") {
      part.push(acc);
      acc = "";
      const ext2 = new _AST(c2, part);
      part.push(ext2);
      i = __privateMethod(_b2 = _AST, _parseAST, parseAST_fn).call(_b2, str, ext2, i, opt);
      continue;
    }
    if (c2 === "|") {
      part.push(acc);
      acc = "";
      parts.push(part);
      part = new _AST(null, ast2);
      continue;
    }
    if (c2 === ")") {
      if (acc === "" && __privateGet(ast2, _parts).length === 0) {
        __privateSet(ast2, _emptyExt, true);
      }
      part.push(acc);
      acc = "";
      ast2.push(...parts, part);
      return i;
    }
    acc += c2;
  }
  ast2.type = null;
  __privateSet(ast2, _hasMagic, void 0);
  __privateSet(ast2, _parts, [str.substring(pos - 1)]);
  return i;
};
_partsToRegExp = new WeakSet();
partsToRegExp_fn = function(dot) {
  return __privateGet(this, _parts).map((p) => {
    if (typeof p === "string") {
      throw new Error("string type in extglob ast??");
    }
    const [re, _, _hasMagic2, uflag] = p.toRegExpSource(dot);
    __privateSet(this, _uflag, __privateGet(this, _uflag) || uflag);
    return re;
  }).filter((p) => !(this.isStart() && this.isEnd()) || !!p).join("|");
};
_parseGlob = new WeakSet();
parseGlob_fn = function(glob2, hasMagic2, noEmpty = false) {
  let escaping = false;
  let re = "";
  let uflag = false;
  for (let i = 0; i < glob2.length; i++) {
    const c2 = glob2.charAt(i);
    if (escaping) {
      escaping = false;
      re += (reSpecials$1.has(c2) ? "\\" : "") + c2;
      continue;
    }
    if (c2 === "\\") {
      if (i === glob2.length - 1) {
        re += "\\\\";
      } else {
        escaping = true;
      }
      continue;
    }
    if (c2 === "[") {
      const [src, needUflag, consumed, magic] = (0, brace_expressions_js_1.parseClass)(glob2, i);
      if (consumed) {
        re += src;
        uflag = uflag || needUflag;
        i += consumed - 1;
        hasMagic2 = hasMagic2 || magic;
        continue;
      }
    }
    if (c2 === "*") {
      if (noEmpty && glob2 === "*")
        re += starNoEmpty;
      else
        re += star$1;
      hasMagic2 = true;
      continue;
    }
    if (c2 === "?") {
      re += qmark$1;
      hasMagic2 = true;
      continue;
    }
    re += regExpEscape$1(c2);
  }
  return [re, (0, unescape_js_1.unescape)(glob2), !!hasMagic2, uflag];
};
__privateAdd(_AST, _parseAST);
__privateAdd(_AST, _parseGlob);
let AST = _AST;
ast.AST = AST;
var _escape = {};
Object.defineProperty(_escape, "__esModule", { value: true });
_escape.escape = void 0;
const escape = (s, { windowsPathsNoEscape = false } = {}) => {
  return windowsPathsNoEscape ? s.replace(/[?*()[\]]/g, "[$&]") : s.replace(/[?*()[\]\\]/g, "\\$&");
};
_escape.escape = escape;
(function(exports) {
  var __importDefault2 = commonjsGlobal && commonjsGlobal.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.unescape = exports.escape = exports.AST = exports.Minimatch = exports.match = exports.makeRe = exports.braceExpand = exports.defaults = exports.filter = exports.GLOBSTAR = exports.sep = exports.minimatch = void 0;
  const brace_expansion_1 = __importDefault2(braceExpansion);
  const assert_valid_pattern_js_1 = assertValidPattern$2;
  const ast_js_1 = ast;
  const escape_js_1 = _escape;
  const unescape_js_12 = _unescape;
  const minimatch2 = (p, pattern2, options = {}) => {
    (0, assert_valid_pattern_js_1.assertValidPattern)(pattern2);
    if (!options.nocomment && pattern2.charAt(0) === "#") {
      return false;
    }
    return new Minimatch3(pattern2, options).match(p);
  };
  exports.minimatch = minimatch2;
  const starDotExtRE = /^\*+([^+@!?\*\[\(]*)$/;
  const starDotExtTest = (ext22) => (f) => !f.startsWith(".") && f.endsWith(ext22);
  const starDotExtTestDot = (ext22) => (f) => f.endsWith(ext22);
  const starDotExtTestNocase = (ext22) => {
    ext22 = ext22.toLowerCase();
    return (f) => !f.startsWith(".") && f.toLowerCase().endsWith(ext22);
  };
  const starDotExtTestNocaseDot = (ext22) => {
    ext22 = ext22.toLowerCase();
    return (f) => f.toLowerCase().endsWith(ext22);
  };
  const starDotStarRE = /^\*+\.\*+$/;
  const starDotStarTest = (f) => !f.startsWith(".") && f.includes(".");
  const starDotStarTestDot = (f) => f !== "." && f !== ".." && f.includes(".");
  const dotStarRE = /^\.\*+$/;
  const dotStarTest = (f) => f !== "." && f !== ".." && f.startsWith(".");
  const starRE = /^\*+$/;
  const starTest = (f) => f.length !== 0 && !f.startsWith(".");
  const starTestDot = (f) => f.length !== 0 && f !== "." && f !== "..";
  const qmarksRE = /^\?+([^+@!?\*\[\(]*)?$/;
  const qmarksTestNocase = ([$0, ext22 = ""]) => {
    const noext = qmarksTestNoExt([$0]);
    if (!ext22)
      return noext;
    ext22 = ext22.toLowerCase();
    return (f) => noext(f) && f.toLowerCase().endsWith(ext22);
  };
  const qmarksTestNocaseDot = ([$0, ext22 = ""]) => {
    const noext = qmarksTestNoExtDot([$0]);
    if (!ext22)
      return noext;
    ext22 = ext22.toLowerCase();
    return (f) => noext(f) && f.toLowerCase().endsWith(ext22);
  };
  const qmarksTestDot = ([$0, ext22 = ""]) => {
    const noext = qmarksTestNoExtDot([$0]);
    return !ext22 ? noext : (f) => noext(f) && f.endsWith(ext22);
  };
  const qmarksTest = ([$0, ext22 = ""]) => {
    const noext = qmarksTestNoExt([$0]);
    return !ext22 ? noext : (f) => noext(f) && f.endsWith(ext22);
  };
  const qmarksTestNoExt = ([$0]) => {
    const len = $0.length;
    return (f) => f.length === len && !f.startsWith(".");
  };
  const qmarksTestNoExtDot = ([$0]) => {
    const len = $0.length;
    return (f) => f.length === len && f !== "." && f !== "..";
  };
  const defaultPlatform2 = typeof process === "object" && process ? typeof process.env === "object" && process.env && process.env.__MINIMATCH_TESTING_PLATFORM__ || process.platform : "posix";
  const path2 = {
    win32: { sep: "\\" },
    posix: { sep: "/" }
  };
  exports.sep = defaultPlatform2 === "win32" ? path2.win32.sep : path2.posix.sep;
  exports.minimatch.sep = exports.sep;
  exports.GLOBSTAR = Symbol("globstar **");
  exports.minimatch.GLOBSTAR = exports.GLOBSTAR;
  const qmark2 = "[^/]";
  const star2 = qmark2 + "*?";
  const twoStarDot2 = "(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?";
  const twoStarNoDot2 = "(?:(?!(?:\\/|^)\\.).)*?";
  const filter = (pattern2, options = {}) => (p) => (0, exports.minimatch)(p, pattern2, options);
  exports.filter = filter;
  exports.minimatch.filter = exports.filter;
  const ext2 = (a, b = {}) => Object.assign({}, a, b);
  const defaults2 = (def) => {
    if (!def || typeof def !== "object" || !Object.keys(def).length) {
      return exports.minimatch;
    }
    const orig = exports.minimatch;
    const m = (p, pattern2, options = {}) => orig(p, pattern2, ext2(def, options));
    return Object.assign(m, {
      Minimatch: class Minimatch extends orig.Minimatch {
        constructor(pattern2, options = {}) {
          super(pattern2, ext2(def, options));
        }
        static defaults(options) {
          return orig.defaults(ext2(def, options)).Minimatch;
        }
      },
      AST: class AST extends orig.AST {
        /* c8 ignore start */
        constructor(type, parent, options = {}) {
          super(type, parent, ext2(def, options));
        }
        /* c8 ignore stop */
        static fromGlob(pattern2, options = {}) {
          return orig.AST.fromGlob(pattern2, ext2(def, options));
        }
      },
      unescape: (s, options = {}) => orig.unescape(s, ext2(def, options)),
      escape: (s, options = {}) => orig.escape(s, ext2(def, options)),
      filter: (pattern2, options = {}) => orig.filter(pattern2, ext2(def, options)),
      defaults: (options) => orig.defaults(ext2(def, options)),
      makeRe: (pattern2, options = {}) => orig.makeRe(pattern2, ext2(def, options)),
      braceExpand: (pattern2, options = {}) => orig.braceExpand(pattern2, ext2(def, options)),
      match: (list2, pattern2, options = {}) => orig.match(list2, pattern2, ext2(def, options)),
      sep: orig.sep,
      GLOBSTAR: exports.GLOBSTAR
    });
  };
  exports.defaults = defaults2;
  exports.minimatch.defaults = exports.defaults;
  const braceExpand2 = (pattern2, options = {}) => {
    (0, assert_valid_pattern_js_1.assertValidPattern)(pattern2);
    if (options.nobrace || !/\{(?:(?!\{).)*\}/.test(pattern2)) {
      return [pattern2];
    }
    return (0, brace_expansion_1.default)(pattern2);
  };
  exports.braceExpand = braceExpand2;
  exports.minimatch.braceExpand = exports.braceExpand;
  const makeRe = (pattern2, options = {}) => new Minimatch3(pattern2, options).makeRe();
  exports.makeRe = makeRe;
  exports.minimatch.makeRe = exports.makeRe;
  const match = (list2, pattern2, options = {}) => {
    const mm = new Minimatch3(pattern2, options);
    list2 = list2.filter((f) => mm.match(f));
    if (mm.options.nonull && !list2.length) {
      list2.push(pattern2);
    }
    return list2;
  };
  exports.match = match;
  exports.minimatch.match = exports.match;
  const globMagic = /[?*]|[+@!]\(.*?\)|\[|\]/;
  const regExpEscape2 = (s) => s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  class Minimatch3 {
    constructor(pattern2, options = {}) {
      __publicField(this, "options");
      __publicField(this, "set");
      __publicField(this, "pattern");
      __publicField(this, "windowsPathsNoEscape");
      __publicField(this, "nonegate");
      __publicField(this, "negate");
      __publicField(this, "comment");
      __publicField(this, "empty");
      __publicField(this, "preserveMultipleSlashes");
      __publicField(this, "partial");
      __publicField(this, "globSet");
      __publicField(this, "globParts");
      __publicField(this, "nocase");
      __publicField(this, "isWindows");
      __publicField(this, "platform");
      __publicField(this, "windowsNoMagicRoot");
      __publicField(this, "regexp");
      (0, assert_valid_pattern_js_1.assertValidPattern)(pattern2);
      options = options || {};
      this.options = options;
      this.pattern = pattern2;
      this.platform = options.platform || defaultPlatform2;
      this.isWindows = this.platform === "win32";
      this.windowsPathsNoEscape = !!options.windowsPathsNoEscape || options.allowWindowsEscape === false;
      if (this.windowsPathsNoEscape) {
        this.pattern = this.pattern.replace(/\\/g, "/");
      }
      this.preserveMultipleSlashes = !!options.preserveMultipleSlashes;
      this.regexp = null;
      this.negate = false;
      this.nonegate = !!options.nonegate;
      this.comment = false;
      this.empty = false;
      this.partial = !!options.partial;
      this.nocase = !!this.options.nocase;
      this.windowsNoMagicRoot = options.windowsNoMagicRoot !== void 0 ? options.windowsNoMagicRoot : !!(this.isWindows && this.nocase);
      this.globSet = [];
      this.globParts = [];
      this.set = [];
      this.make();
    }
    hasMagic() {
      if (this.options.magicalBraces && this.set.length > 1) {
        return true;
      }
      for (const pattern2 of this.set) {
        for (const part of pattern2) {
          if (typeof part !== "string")
            return true;
        }
      }
      return false;
    }
    debug(..._) {
    }
    make() {
      const pattern2 = this.pattern;
      const options = this.options;
      if (!options.nocomment && pattern2.charAt(0) === "#") {
        this.comment = true;
        return;
      }
      if (!pattern2) {
        this.empty = true;
        return;
      }
      this.parseNegate();
      this.globSet = [...new Set(this.braceExpand())];
      if (options.debug) {
        this.debug = (...args) => console.error(...args);
      }
      this.debug(this.pattern, this.globSet);
      const rawGlobParts = this.globSet.map((s) => this.slashSplit(s));
      this.globParts = this.preprocess(rawGlobParts);
      this.debug(this.pattern, this.globParts);
      let set = this.globParts.map((s, _, __) => {
        if (this.isWindows && this.windowsNoMagicRoot) {
          const isUNC = s[0] === "" && s[1] === "" && (s[2] === "?" || !globMagic.test(s[2])) && !globMagic.test(s[3]);
          const isDrive = /^[a-z]:/i.test(s[0]);
          if (isUNC) {
            return [...s.slice(0, 4), ...s.slice(4).map((ss) => this.parse(ss))];
          } else if (isDrive) {
            return [s[0], ...s.slice(1).map((ss) => this.parse(ss))];
          }
        }
        return s.map((ss) => this.parse(ss));
      });
      this.debug(this.pattern, set);
      this.set = set.filter((s) => s.indexOf(false) === -1);
      if (this.isWindows) {
        for (let i = 0; i < this.set.length; i++) {
          const p = this.set[i];
          if (p[0] === "" && p[1] === "" && this.globParts[i][2] === "?" && typeof p[3] === "string" && /^[a-z]:$/i.test(p[3])) {
            p[2] = "?";
          }
        }
      }
      this.debug(this.pattern, this.set);
    }
    // various transforms to equivalent pattern sets that are
    // faster to process in a filesystem walk.  The goal is to
    // eliminate what we can, and push all ** patterns as far
    // to the right as possible, even if it increases the number
    // of patterns that we have to process.
    preprocess(globParts) {
      if (this.options.noglobstar) {
        for (let i = 0; i < globParts.length; i++) {
          for (let j = 0; j < globParts[i].length; j++) {
            if (globParts[i][j] === "**") {
              globParts[i][j] = "*";
            }
          }
        }
      }
      const { optimizationLevel = 1 } = this.options;
      if (optimizationLevel >= 2) {
        globParts = this.firstPhasePreProcess(globParts);
        globParts = this.secondPhasePreProcess(globParts);
      } else if (optimizationLevel >= 1) {
        globParts = this.levelOneOptimize(globParts);
      } else {
        globParts = this.adjascentGlobstarOptimize(globParts);
      }
      return globParts;
    }
    // just get rid of adjascent ** portions
    adjascentGlobstarOptimize(globParts) {
      return globParts.map((parts) => {
        let gs = -1;
        while (-1 !== (gs = parts.indexOf("**", gs + 1))) {
          let i = gs;
          while (parts[i + 1] === "**") {
            i++;
          }
          if (i !== gs) {
            parts.splice(gs, i - gs);
          }
        }
        return parts;
      });
    }
    // get rid of adjascent ** and resolve .. portions
    levelOneOptimize(globParts) {
      return globParts.map((parts) => {
        parts = parts.reduce((set, part) => {
          const prev = set[set.length - 1];
          if (part === "**" && prev === "**") {
            return set;
          }
          if (part === "..") {
            if (prev && prev !== ".." && prev !== "." && prev !== "**") {
              set.pop();
              return set;
            }
          }
          set.push(part);
          return set;
        }, []);
        return parts.length === 0 ? [""] : parts;
      });
    }
    levelTwoFileOptimize(parts) {
      if (!Array.isArray(parts)) {
        parts = this.slashSplit(parts);
      }
      let didSomething = false;
      do {
        didSomething = false;
        if (!this.preserveMultipleSlashes) {
          for (let i = 1; i < parts.length - 1; i++) {
            const p = parts[i];
            if (i === 1 && p === "" && parts[0] === "")
              continue;
            if (p === "." || p === "") {
              didSomething = true;
              parts.splice(i, 1);
              i--;
            }
          }
          if (parts[0] === "." && parts.length === 2 && (parts[1] === "." || parts[1] === "")) {
            didSomething = true;
            parts.pop();
          }
        }
        let dd = 0;
        while (-1 !== (dd = parts.indexOf("..", dd + 1))) {
          const p = parts[dd - 1];
          if (p && p !== "." && p !== ".." && p !== "**") {
            didSomething = true;
            parts.splice(dd - 1, 2);
            dd -= 2;
          }
        }
      } while (didSomething);
      return parts.length === 0 ? [""] : parts;
    }
    // First phase: single-pattern processing
    // <pre> is 1 or more portions
    // <rest> is 1 or more portions
    // <p> is any portion other than ., .., '', or **
    // <e> is . or ''
    //
    // **/.. is *brutal* for filesystem walking performance, because
    // it effectively resets the recursive walk each time it occurs,
    // and ** cannot be reduced out by a .. pattern part like a regexp
    // or most strings (other than .., ., and '') can be.
    //
    // <pre>/**/../<p>/<p>/<rest> -> {<pre>/../<p>/<p>/<rest>,<pre>/**/<p>/<p>/<rest>}
    // <pre>/<e>/<rest> -> <pre>/<rest>
    // <pre>/<p>/../<rest> -> <pre>/<rest>
    // **/**/<rest> -> **/<rest>
    //
    // **/*/<rest> -> */**/<rest> <== not valid because ** doesn't follow
    // this WOULD be allowed if ** did follow symlinks, or * didn't
    firstPhasePreProcess(globParts) {
      let didSomething = false;
      do {
        didSomething = false;
        for (let parts of globParts) {
          let gs = -1;
          while (-1 !== (gs = parts.indexOf("**", gs + 1))) {
            let gss = gs;
            while (parts[gss + 1] === "**") {
              gss++;
            }
            if (gss > gs) {
              parts.splice(gs + 1, gss - gs);
            }
            let next = parts[gs + 1];
            const p = parts[gs + 2];
            const p2 = parts[gs + 3];
            if (next !== "..")
              continue;
            if (!p || p === "." || p === ".." || !p2 || p2 === "." || p2 === "..") {
              continue;
            }
            didSomething = true;
            parts.splice(gs, 1);
            const other = parts.slice(0);
            other[gs] = "**";
            globParts.push(other);
            gs--;
          }
          if (!this.preserveMultipleSlashes) {
            for (let i = 1; i < parts.length - 1; i++) {
              const p = parts[i];
              if (i === 1 && p === "" && parts[0] === "")
                continue;
              if (p === "." || p === "") {
                didSomething = true;
                parts.splice(i, 1);
                i--;
              }
            }
            if (parts[0] === "." && parts.length === 2 && (parts[1] === "." || parts[1] === "")) {
              didSomething = true;
              parts.pop();
            }
          }
          let dd = 0;
          while (-1 !== (dd = parts.indexOf("..", dd + 1))) {
            const p = parts[dd - 1];
            if (p && p !== "." && p !== ".." && p !== "**") {
              didSomething = true;
              const needDot = dd === 1 && parts[dd + 1] === "**";
              const splin = needDot ? ["."] : [];
              parts.splice(dd - 1, 2, ...splin);
              if (parts.length === 0)
                parts.push("");
              dd -= 2;
            }
          }
        }
      } while (didSomething);
      return globParts;
    }
    // second phase: multi-pattern dedupes
    // {<pre>/*/<rest>,<pre>/<p>/<rest>} -> <pre>/*/<rest>
    // {<pre>/<rest>,<pre>/<rest>} -> <pre>/<rest>
    // {<pre>/**/<rest>,<pre>/<rest>} -> <pre>/**/<rest>
    //
    // {<pre>/**/<rest>,<pre>/**/<p>/<rest>} -> <pre>/**/<rest>
    // ^-- not valid because ** doens't follow symlinks
    secondPhasePreProcess(globParts) {
      for (let i = 0; i < globParts.length - 1; i++) {
        for (let j = i + 1; j < globParts.length; j++) {
          const matched = this.partsMatch(globParts[i], globParts[j], !this.preserveMultipleSlashes);
          if (!matched)
            continue;
          globParts[i] = matched;
          globParts[j] = [];
        }
      }
      return globParts.filter((gs) => gs.length);
    }
    partsMatch(a, b, emptyGSMatch = false) {
      let ai = 0;
      let bi = 0;
      let result = [];
      let which = "";
      while (ai < a.length && bi < b.length) {
        if (a[ai] === b[bi]) {
          result.push(which === "b" ? b[bi] : a[ai]);
          ai++;
          bi++;
        } else if (emptyGSMatch && a[ai] === "**" && b[bi] === a[ai + 1]) {
          result.push(a[ai]);
          ai++;
        } else if (emptyGSMatch && b[bi] === "**" && a[ai] === b[bi + 1]) {
          result.push(b[bi]);
          bi++;
        } else if (a[ai] === "*" && b[bi] && (this.options.dot || !b[bi].startsWith(".")) && b[bi] !== "**") {
          if (which === "b")
            return false;
          which = "a";
          result.push(a[ai]);
          ai++;
          bi++;
        } else if (b[bi] === "*" && a[ai] && (this.options.dot || !a[ai].startsWith(".")) && a[ai] !== "**") {
          if (which === "a")
            return false;
          which = "b";
          result.push(b[bi]);
          ai++;
          bi++;
        } else {
          return false;
        }
      }
      return a.length === b.length && result;
    }
    parseNegate() {
      if (this.nonegate)
        return;
      const pattern2 = this.pattern;
      let negate = false;
      let negateOffset = 0;
      for (let i = 0; i < pattern2.length && pattern2.charAt(i) === "!"; i++) {
        negate = !negate;
        negateOffset++;
      }
      if (negateOffset)
        this.pattern = pattern2.slice(negateOffset);
      this.negate = negate;
    }
    // set partial to true to test if, for example,
    // "/a/b" matches the start of "/*/b/*/d"
    // Partial means, if you run out of file before you run
    // out of pattern, then that's fine, as long as all
    // the parts match.
    matchOne(file2, pattern2, partial = false) {
      const options = this.options;
      if (this.isWindows) {
        const fileDrive = typeof file2[0] === "string" && /^[a-z]:$/i.test(file2[0]);
        const fileUNC = !fileDrive && file2[0] === "" && file2[1] === "" && file2[2] === "?" && /^[a-z]:$/i.test(file2[3]);
        const patternDrive = typeof pattern2[0] === "string" && /^[a-z]:$/i.test(pattern2[0]);
        const patternUNC = !patternDrive && pattern2[0] === "" && pattern2[1] === "" && pattern2[2] === "?" && typeof pattern2[3] === "string" && /^[a-z]:$/i.test(pattern2[3]);
        const fdi = fileUNC ? 3 : fileDrive ? 0 : void 0;
        const pdi = patternUNC ? 3 : patternDrive ? 0 : void 0;
        if (typeof fdi === "number" && typeof pdi === "number") {
          const [fd, pd] = [file2[fdi], pattern2[pdi]];
          if (fd.toLowerCase() === pd.toLowerCase()) {
            pattern2[pdi] = fd;
            if (pdi > fdi) {
              pattern2 = pattern2.slice(pdi);
            } else if (fdi > pdi) {
              file2 = file2.slice(fdi);
            }
          }
        }
      }
      const { optimizationLevel = 1 } = this.options;
      if (optimizationLevel >= 2) {
        file2 = this.levelTwoFileOptimize(file2);
      }
      this.debug("matchOne", this, { file: file2, pattern: pattern2 });
      this.debug("matchOne", file2.length, pattern2.length);
      for (var fi = 0, pi = 0, fl = file2.length, pl = pattern2.length; fi < fl && pi < pl; fi++, pi++) {
        this.debug("matchOne loop");
        var p = pattern2[pi];
        var f = file2[fi];
        this.debug(pattern2, p, f);
        if (p === false) {
          return false;
        }
        if (p === exports.GLOBSTAR) {
          this.debug("GLOBSTAR", [pattern2, p, f]);
          var fr = fi;
          var pr = pi + 1;
          if (pr === pl) {
            this.debug("** at the end");
            for (; fi < fl; fi++) {
              if (file2[fi] === "." || file2[fi] === ".." || !options.dot && file2[fi].charAt(0) === ".")
                return false;
            }
            return true;
          }
          while (fr < fl) {
            var swallowee = file2[fr];
            this.debug("\nglobstar while", file2, fr, pattern2, pr, swallowee);
            if (this.matchOne(file2.slice(fr), pattern2.slice(pr), partial)) {
              this.debug("globstar found match!", fr, fl, swallowee);
              return true;
            } else {
              if (swallowee === "." || swallowee === ".." || !options.dot && swallowee.charAt(0) === ".") {
                this.debug("dot detected!", file2, fr, pattern2, pr);
                break;
              }
              this.debug("globstar swallow a segment, and continue");
              fr++;
            }
          }
          if (partial) {
            this.debug("\n>>> no match, partial?", file2, fr, pattern2, pr);
            if (fr === fl) {
              return true;
            }
          }
          return false;
        }
        let hit;
        if (typeof p === "string") {
          hit = f === p;
          this.debug("string match", p, f, hit);
        } else {
          hit = p.test(f);
          this.debug("pattern match", p, f, hit);
        }
        if (!hit)
          return false;
      }
      if (fi === fl && pi === pl) {
        return true;
      } else if (fi === fl) {
        return partial;
      } else if (pi === pl) {
        return fi === fl - 1 && file2[fi] === "";
      } else {
        throw new Error("wtf?");
      }
    }
    braceExpand() {
      return (0, exports.braceExpand)(this.pattern, this.options);
    }
    parse(pattern2) {
      (0, assert_valid_pattern_js_1.assertValidPattern)(pattern2);
      const options = this.options;
      if (pattern2 === "**")
        return exports.GLOBSTAR;
      if (pattern2 === "")
        return "";
      let m;
      let fastTest = null;
      if (m = pattern2.match(starRE)) {
        fastTest = options.dot ? starTestDot : starTest;
      } else if (m = pattern2.match(starDotExtRE)) {
        fastTest = (options.nocase ? options.dot ? starDotExtTestNocaseDot : starDotExtTestNocase : options.dot ? starDotExtTestDot : starDotExtTest)(m[1]);
      } else if (m = pattern2.match(qmarksRE)) {
        fastTest = (options.nocase ? options.dot ? qmarksTestNocaseDot : qmarksTestNocase : options.dot ? qmarksTestDot : qmarksTest)(m);
      } else if (m = pattern2.match(starDotStarRE)) {
        fastTest = options.dot ? starDotStarTestDot : starDotStarTest;
      } else if (m = pattern2.match(dotStarRE)) {
        fastTest = dotStarTest;
      }
      const re = ast_js_1.AST.fromGlob(pattern2, this.options).toMMPattern();
      if (fastTest && typeof re === "object") {
        Reflect.defineProperty(re, "test", { value: fastTest });
      }
      return re;
    }
    makeRe() {
      if (this.regexp || this.regexp === false)
        return this.regexp;
      const set = this.set;
      if (!set.length) {
        this.regexp = false;
        return this.regexp;
      }
      const options = this.options;
      const twoStar = options.noglobstar ? star2 : options.dot ? twoStarDot2 : twoStarNoDot2;
      const flags = new Set(options.nocase ? ["i"] : []);
      let re = set.map((pattern2) => {
        const pp = pattern2.map((p) => {
          if (p instanceof RegExp) {
            for (const f of p.flags.split(""))
              flags.add(f);
          }
          return typeof p === "string" ? regExpEscape2(p) : p === exports.GLOBSTAR ? exports.GLOBSTAR : p._src;
        });
        pp.forEach((p, i) => {
          const next = pp[i + 1];
          const prev = pp[i - 1];
          if (p !== exports.GLOBSTAR || prev === exports.GLOBSTAR) {
            return;
          }
          if (prev === void 0) {
            if (next !== void 0 && next !== exports.GLOBSTAR) {
              pp[i + 1] = "(?:\\/|" + twoStar + "\\/)?" + next;
            } else {
              pp[i] = twoStar;
            }
          } else if (next === void 0) {
            pp[i - 1] = prev + "(?:\\/|" + twoStar + ")?";
          } else if (next !== exports.GLOBSTAR) {
            pp[i - 1] = prev + "(?:\\/|\\/" + twoStar + "\\/)" + next;
            pp[i + 1] = exports.GLOBSTAR;
          }
        });
        return pp.filter((p) => p !== exports.GLOBSTAR).join("/");
      }).join("|");
      const [open, close] = set.length > 1 ? ["(?:", ")"] : ["", ""];
      re = "^" + open + re + close + "$";
      if (this.negate)
        re = "^(?!" + re + ").+$";
      try {
        this.regexp = new RegExp(re, [...flags].join(""));
      } catch (ex) {
        this.regexp = false;
      }
      return this.regexp;
    }
    slashSplit(p) {
      if (this.preserveMultipleSlashes) {
        return p.split("/");
      } else if (this.isWindows && /^\/\/[^\/]+/.test(p)) {
        return ["", ...p.split(/\/+/)];
      } else {
        return p.split(/\/+/);
      }
    }
    match(f, partial = this.partial) {
      this.debug("match", f, this.pattern);
      if (this.comment) {
        return false;
      }
      if (this.empty) {
        return f === "";
      }
      if (f === "/" && partial) {
        return true;
      }
      const options = this.options;
      if (this.isWindows) {
        f = f.split("\\").join("/");
      }
      const ff = this.slashSplit(f);
      this.debug(this.pattern, "split", ff);
      const set = this.set;
      this.debug(this.pattern, "set", set);
      let filename = ff[ff.length - 1];
      if (!filename) {
        for (let i = ff.length - 2; !filename && i >= 0; i--) {
          filename = ff[i];
        }
      }
      for (let i = 0; i < set.length; i++) {
        const pattern2 = set[i];
        let file2 = ff;
        if (options.matchBase && pattern2.length === 1) {
          file2 = [filename];
        }
        const hit = this.matchOne(file2, pattern2, partial);
        if (hit) {
          if (options.flipNegate) {
            return true;
          }
          return !this.negate;
        }
      }
      if (options.flipNegate) {
        return false;
      }
      return this.negate;
    }
    static defaults(def) {
      return exports.minimatch.defaults(def).Minimatch;
    }
  }
  exports.Minimatch = Minimatch3;
  var ast_js_2 = ast;
  Object.defineProperty(exports, "AST", { enumerable: true, get: function() {
    return ast_js_2.AST;
  } });
  var escape_js_2 = _escape;
  Object.defineProperty(exports, "escape", { enumerable: true, get: function() {
    return escape_js_2.escape;
  } });
  var unescape_js_2 = _unescape;
  Object.defineProperty(exports, "unescape", { enumerable: true, get: function() {
    return unescape_js_2.unescape;
  } });
  exports.minimatch.AST = ast_js_1.AST;
  exports.minimatch.Minimatch = Minimatch3;
  exports.minimatch.escape = escape_js_1.escape;
  exports.minimatch.unescape = unescape_js_12.unescape;
})(commonjs$4);
var glob = {};
var commonjs$3 = {};
var commonjs$2 = {};
Object.defineProperty(commonjs$2, "__esModule", { value: true });
commonjs$2.LRUCache = void 0;
const perf = typeof performance === "object" && performance && typeof performance.now === "function" ? performance : Date;
const warned = /* @__PURE__ */ new Set();
const PROCESS = typeof process === "object" && !!process ? process : {};
const emitWarning = (msg2, type, code, fn) => {
  typeof PROCESS.emitWarning === "function" ? PROCESS.emitWarning(msg2, type, code, fn) : console.error(`[${code}] ${type}: ${msg2}`);
};
let AC = globalThis.AbortController;
let AS = globalThis.AbortSignal;
if (typeof AC === "undefined") {
  AS = class AbortSignal {
    constructor() {
      __publicField(this, "onabort");
      __publicField(this, "_onabort", []);
      __publicField(this, "reason");
      __publicField(this, "aborted", false);
    }
    addEventListener(_, fn) {
      this._onabort.push(fn);
    }
  };
  AC = class AbortController {
    constructor() {
      __publicField(this, "signal", new AS());
      warnACPolyfill();
    }
    abort(reason) {
      var _a2, _b2;
      if (this.signal.aborted)
        return;
      this.signal.reason = reason;
      this.signal.aborted = true;
      for (const fn of this.signal._onabort) {
        fn(reason);
      }
      (_b2 = (_a2 = this.signal).onabort) == null ? void 0 : _b2.call(_a2, reason);
    }
  };
  let printACPolyfillWarning = ((_a = PROCESS.env) == null ? void 0 : _a.LRU_CACHE_IGNORE_AC_WARNING) !== "1";
  const warnACPolyfill = () => {
    if (!printACPolyfillWarning)
      return;
    printACPolyfillWarning = false;
    emitWarning("AbortController is not defined. If using lru-cache in node 14, load an AbortController polyfill from the `node-abort-controller` package. A minimal polyfill is provided for use by LRUCache.fetch(), but it should not be relied upon in other contexts (eg, passing it to other APIs that use AbortController/AbortSignal might have undesirable effects). You may disable this with LRU_CACHE_IGNORE_AC_WARNING=1 in the env.", "NO_ABORT_CONTROLLER", "ENOTSUP", warnACPolyfill);
  };
}
const shouldWarn = (code) => !warned.has(code);
const isPosInt = (n) => n && n === Math.floor(n) && n > 0 && isFinite(n);
const getUintArray = (max) => !isPosInt(max) ? null : max <= Math.pow(2, 8) ? Uint8Array : max <= Math.pow(2, 16) ? Uint16Array : max <= Math.pow(2, 32) ? Uint32Array : max <= Number.MAX_SAFE_INTEGER ? ZeroArray : null;
class ZeroArray extends Array {
  constructor(size) {
    super(size);
    this.fill(0);
  }
}
const _Stack = class _Stack {
  constructor(max, HeapCls) {
    __publicField(this, "heap");
    __publicField(this, "length");
    if (!__privateGet(_Stack, _constructing)) {
      throw new TypeError("instantiate Stack using Stack.create(n)");
    }
    this.heap = new HeapCls(max);
    this.length = 0;
  }
  static create(max) {
    const HeapCls = getUintArray(max);
    if (!HeapCls)
      return [];
    __privateSet(_Stack, _constructing, true);
    const s = new _Stack(max, HeapCls);
    __privateSet(_Stack, _constructing, false);
    return s;
  }
  push(n) {
    this.heap[this.length++] = n;
  }
  pop() {
    return this.heap[--this.length];
  }
};
_constructing = new WeakMap();
// private constructor
__privateAdd(_Stack, _constructing, false);
let Stack = _Stack;
const _LRUCache = class _LRUCache {
  constructor(options) {
    __privateAdd(this, _initializeTTLTracking);
    __privateAdd(this, _initializeSizeTracking);
    __privateAdd(this, _indexes);
    __privateAdd(this, _rindexes);
    __privateAdd(this, _isValidIndex);
    __privateAdd(this, _evict);
    __privateAdd(this, _backgroundFetch);
    __privateAdd(this, _isBackgroundFetch);
    __privateAdd(this, _connect);
    __privateAdd(this, _moveToTail);
    // properties coming in from the options of these, only max and maxSize
    // really *need* to be protected. The rest can be modified, as they just
    // set defaults for various methods.
    __privateAdd(this, _max, void 0);
    __privateAdd(this, _maxSize, void 0);
    __privateAdd(this, _dispose, void 0);
    __privateAdd(this, _disposeAfter, void 0);
    __privateAdd(this, _fetchMethod, void 0);
    /**
     * {@link LRUCache.OptionsBase.ttl}
     */
    __publicField(this, "ttl");
    /**
     * {@link LRUCache.OptionsBase.ttlResolution}
     */
    __publicField(this, "ttlResolution");
    /**
     * {@link LRUCache.OptionsBase.ttlAutopurge}
     */
    __publicField(this, "ttlAutopurge");
    /**
     * {@link LRUCache.OptionsBase.updateAgeOnGet}
     */
    __publicField(this, "updateAgeOnGet");
    /**
     * {@link LRUCache.OptionsBase.updateAgeOnHas}
     */
    __publicField(this, "updateAgeOnHas");
    /**
     * {@link LRUCache.OptionsBase.allowStale}
     */
    __publicField(this, "allowStale");
    /**
     * {@link LRUCache.OptionsBase.noDisposeOnSet}
     */
    __publicField(this, "noDisposeOnSet");
    /**
     * {@link LRUCache.OptionsBase.noUpdateTTL}
     */
    __publicField(this, "noUpdateTTL");
    /**
     * {@link LRUCache.OptionsBase.maxEntrySize}
     */
    __publicField(this, "maxEntrySize");
    /**
     * {@link LRUCache.OptionsBase.sizeCalculation}
     */
    __publicField(this, "sizeCalculation");
    /**
     * {@link LRUCache.OptionsBase.noDeleteOnFetchRejection}
     */
    __publicField(this, "noDeleteOnFetchRejection");
    /**
     * {@link LRUCache.OptionsBase.noDeleteOnStaleGet}
     */
    __publicField(this, "noDeleteOnStaleGet");
    /**
     * {@link LRUCache.OptionsBase.allowStaleOnFetchAbort}
     */
    __publicField(this, "allowStaleOnFetchAbort");
    /**
     * {@link LRUCache.OptionsBase.allowStaleOnFetchRejection}
     */
    __publicField(this, "allowStaleOnFetchRejection");
    /**
     * {@link LRUCache.OptionsBase.ignoreFetchAbort}
     */
    __publicField(this, "ignoreFetchAbort");
    // computed properties
    __privateAdd(this, _size, void 0);
    __privateAdd(this, _calculatedSize, void 0);
    __privateAdd(this, _keyMap, void 0);
    __privateAdd(this, _keyList, void 0);
    __privateAdd(this, _valList, void 0);
    __privateAdd(this, _next, void 0);
    __privateAdd(this, _prev, void 0);
    __privateAdd(this, _head, void 0);
    __privateAdd(this, _tail, void 0);
    __privateAdd(this, _free, void 0);
    __privateAdd(this, _disposed, void 0);
    __privateAdd(this, _sizes, void 0);
    __privateAdd(this, _starts, void 0);
    __privateAdd(this, _ttls, void 0);
    __privateAdd(this, _hasDispose, void 0);
    __privateAdd(this, _hasFetchMethod, void 0);
    __privateAdd(this, _hasDisposeAfter, void 0);
    // conditionally set private methods related to TTL
    __privateAdd(this, _updateItemAge, () => {
    });
    __privateAdd(this, _statusTTL, () => {
    });
    __privateAdd(this, _setItemTTL, () => {
    });
    /* c8 ignore stop */
    __privateAdd(this, _isStale, () => false);
    __privateAdd(this, _removeItemSize, (_i) => {
    });
    __privateAdd(this, _addItemSize, (_i, _s, _st) => {
    });
    __privateAdd(this, _requireSize, (_k, _v, size, sizeCalculation) => {
      if (size || sizeCalculation) {
        throw new TypeError("cannot set size without setting maxSize or maxEntrySize on cache");
      }
      return 0;
    });
    /**
     * A String value that is used in the creation of the default string description of an object.
     * Called by the built-in method Object.prototype.toString.
     */
    __publicField(this, _b, "LRUCache");
    const { max = 0, ttl, ttlResolution = 1, ttlAutopurge, updateAgeOnGet, updateAgeOnHas, allowStale, dispose, disposeAfter, noDisposeOnSet, noUpdateTTL, maxSize = 0, maxEntrySize = 0, sizeCalculation, fetchMethod, noDeleteOnFetchRejection, noDeleteOnStaleGet, allowStaleOnFetchRejection, allowStaleOnFetchAbort, ignoreFetchAbort } = options;
    if (max !== 0 && !isPosInt(max)) {
      throw new TypeError("max option must be a nonnegative integer");
    }
    const UintArray = max ? getUintArray(max) : Array;
    if (!UintArray) {
      throw new Error("invalid max value: " + max);
    }
    __privateSet(this, _max, max);
    __privateSet(this, _maxSize, maxSize);
    this.maxEntrySize = maxEntrySize || __privateGet(this, _maxSize);
    this.sizeCalculation = sizeCalculation;
    if (this.sizeCalculation) {
      if (!__privateGet(this, _maxSize) && !this.maxEntrySize) {
        throw new TypeError("cannot set sizeCalculation without setting maxSize or maxEntrySize");
      }
      if (typeof this.sizeCalculation !== "function") {
        throw new TypeError("sizeCalculation set to non-function");
      }
    }
    if (fetchMethod !== void 0 && typeof fetchMethod !== "function") {
      throw new TypeError("fetchMethod must be a function if specified");
    }
    __privateSet(this, _fetchMethod, fetchMethod);
    __privateSet(this, _hasFetchMethod, !!fetchMethod);
    __privateSet(this, _keyMap, /* @__PURE__ */ new Map());
    __privateSet(this, _keyList, new Array(max).fill(void 0));
    __privateSet(this, _valList, new Array(max).fill(void 0));
    __privateSet(this, _next, new UintArray(max));
    __privateSet(this, _prev, new UintArray(max));
    __privateSet(this, _head, 0);
    __privateSet(this, _tail, 0);
    __privateSet(this, _free, Stack.create(max));
    __privateSet(this, _size, 0);
    __privateSet(this, _calculatedSize, 0);
    if (typeof dispose === "function") {
      __privateSet(this, _dispose, dispose);
    }
    if (typeof disposeAfter === "function") {
      __privateSet(this, _disposeAfter, disposeAfter);
      __privateSet(this, _disposed, []);
    } else {
      __privateSet(this, _disposeAfter, void 0);
      __privateSet(this, _disposed, void 0);
    }
    __privateSet(this, _hasDispose, !!__privateGet(this, _dispose));
    __privateSet(this, _hasDisposeAfter, !!__privateGet(this, _disposeAfter));
    this.noDisposeOnSet = !!noDisposeOnSet;
    this.noUpdateTTL = !!noUpdateTTL;
    this.noDeleteOnFetchRejection = !!noDeleteOnFetchRejection;
    this.allowStaleOnFetchRejection = !!allowStaleOnFetchRejection;
    this.allowStaleOnFetchAbort = !!allowStaleOnFetchAbort;
    this.ignoreFetchAbort = !!ignoreFetchAbort;
    if (this.maxEntrySize !== 0) {
      if (__privateGet(this, _maxSize) !== 0) {
        if (!isPosInt(__privateGet(this, _maxSize))) {
          throw new TypeError("maxSize must be a positive integer if specified");
        }
      }
      if (!isPosInt(this.maxEntrySize)) {
        throw new TypeError("maxEntrySize must be a positive integer if specified");
      }
      __privateMethod(this, _initializeSizeTracking, initializeSizeTracking_fn).call(this);
    }
    this.allowStale = !!allowStale;
    this.noDeleteOnStaleGet = !!noDeleteOnStaleGet;
    this.updateAgeOnGet = !!updateAgeOnGet;
    this.updateAgeOnHas = !!updateAgeOnHas;
    this.ttlResolution = isPosInt(ttlResolution) || ttlResolution === 0 ? ttlResolution : 1;
    this.ttlAutopurge = !!ttlAutopurge;
    this.ttl = ttl || 0;
    if (this.ttl) {
      if (!isPosInt(this.ttl)) {
        throw new TypeError("ttl must be a positive integer if specified");
      }
      __privateMethod(this, _initializeTTLTracking, initializeTTLTracking_fn).call(this);
    }
    if (__privateGet(this, _max) === 0 && this.ttl === 0 && __privateGet(this, _maxSize) === 0) {
      throw new TypeError("At least one of max, maxSize, or ttl is required");
    }
    if (!this.ttlAutopurge && !__privateGet(this, _max) && !__privateGet(this, _maxSize)) {
      const code = "LRU_CACHE_UNBOUNDED";
      if (shouldWarn(code)) {
        warned.add(code);
        const msg2 = "TTL caching without ttlAutopurge, max, or maxSize can result in unbounded memory consumption.";
        emitWarning(msg2, "UnboundedCacheWarning", code, _LRUCache);
      }
    }
  }
  /**
   * Do not call this method unless you need to inspect the
   * inner workings of the cache.  If anything returned by this
   * object is modified in any way, strange breakage may occur.
   *
   * These fields are private for a reason!
   *
   * @internal
   */
  static unsafeExposeInternals(c2) {
    return {
      // properties
      starts: __privateGet(c2, _starts),
      ttls: __privateGet(c2, _ttls),
      sizes: __privateGet(c2, _sizes),
      keyMap: __privateGet(c2, _keyMap),
      keyList: __privateGet(c2, _keyList),
      valList: __privateGet(c2, _valList),
      next: __privateGet(c2, _next),
      prev: __privateGet(c2, _prev),
      get head() {
        return __privateGet(c2, _head);
      },
      get tail() {
        return __privateGet(c2, _tail);
      },
      free: __privateGet(c2, _free),
      // methods
      isBackgroundFetch: (p) => {
        var _a2;
        return __privateMethod(_a2 = c2, _isBackgroundFetch, isBackgroundFetch_fn).call(_a2, p);
      },
      backgroundFetch: (k, index, options, context) => {
        var _a2;
        return __privateMethod(_a2 = c2, _backgroundFetch, backgroundFetch_fn).call(_a2, k, index, options, context);
      },
      moveToTail: (index) => {
        var _a2;
        return __privateMethod(_a2 = c2, _moveToTail, moveToTail_fn).call(_a2, index);
      },
      indexes: (options) => {
        var _a2;
        return __privateMethod(_a2 = c2, _indexes, indexes_fn).call(_a2, options);
      },
      rindexes: (options) => {
        var _a2;
        return __privateMethod(_a2 = c2, _rindexes, rindexes_fn).call(_a2, options);
      },
      isStale: (index) => {
        var _a2;
        return __privateGet(_a2 = c2, _isStale).call(_a2, index);
      }
    };
  }
  // Protected read-only members
  /**
   * {@link LRUCache.OptionsBase.max} (read-only)
   */
  get max() {
    return __privateGet(this, _max);
  }
  /**
   * {@link LRUCache.OptionsBase.maxSize} (read-only)
   */
  get maxSize() {
    return __privateGet(this, _maxSize);
  }
  /**
   * The total computed size of items in the cache (read-only)
   */
  get calculatedSize() {
    return __privateGet(this, _calculatedSize);
  }
  /**
   * The number of items stored in the cache (read-only)
   */
  get size() {
    return __privateGet(this, _size);
  }
  /**
   * {@link LRUCache.OptionsBase.fetchMethod} (read-only)
   */
  get fetchMethod() {
    return __privateGet(this, _fetchMethod);
  }
  /**
   * {@link LRUCache.OptionsBase.dispose} (read-only)
   */
  get dispose() {
    return __privateGet(this, _dispose);
  }
  /**
   * {@link LRUCache.OptionsBase.disposeAfter} (read-only)
   */
  get disposeAfter() {
    return __privateGet(this, _disposeAfter);
  }
  /**
   * Return the remaining TTL time for a given entry key
   */
  getRemainingTTL(key) {
    return __privateGet(this, _keyMap).has(key) ? Infinity : 0;
  }
  /**
   * Return a generator yielding `[key, value]` pairs,
   * in order from most recently used to least recently used.
   */
  *entries() {
    for (const i of __privateMethod(this, _indexes, indexes_fn).call(this)) {
      if (__privateGet(this, _valList)[i] !== void 0 && __privateGet(this, _keyList)[i] !== void 0 && !__privateMethod(this, _isBackgroundFetch, isBackgroundFetch_fn).call(this, __privateGet(this, _valList)[i])) {
        yield [__privateGet(this, _keyList)[i], __privateGet(this, _valList)[i]];
      }
    }
  }
  /**
   * Inverse order version of {@link LRUCache.entries}
   *
   * Return a generator yielding `[key, value]` pairs,
   * in order from least recently used to most recently used.
   */
  *rentries() {
    for (const i of __privateMethod(this, _rindexes, rindexes_fn).call(this)) {
      if (__privateGet(this, _valList)[i] !== void 0 && __privateGet(this, _keyList)[i] !== void 0 && !__privateMethod(this, _isBackgroundFetch, isBackgroundFetch_fn).call(this, __privateGet(this, _valList)[i])) {
        yield [__privateGet(this, _keyList)[i], __privateGet(this, _valList)[i]];
      }
    }
  }
  /**
   * Return a generator yielding the keys in the cache,
   * in order from most recently used to least recently used.
   */
  *keys() {
    for (const i of __privateMethod(this, _indexes, indexes_fn).call(this)) {
      const k = __privateGet(this, _keyList)[i];
      if (k !== void 0 && !__privateMethod(this, _isBackgroundFetch, isBackgroundFetch_fn).call(this, __privateGet(this, _valList)[i])) {
        yield k;
      }
    }
  }
  /**
   * Inverse order version of {@link LRUCache.keys}
   *
   * Return a generator yielding the keys in the cache,
   * in order from least recently used to most recently used.
   */
  *rkeys() {
    for (const i of __privateMethod(this, _rindexes, rindexes_fn).call(this)) {
      const k = __privateGet(this, _keyList)[i];
      if (k !== void 0 && !__privateMethod(this, _isBackgroundFetch, isBackgroundFetch_fn).call(this, __privateGet(this, _valList)[i])) {
        yield k;
      }
    }
  }
  /**
   * Return a generator yielding the values in the cache,
   * in order from most recently used to least recently used.
   */
  *values() {
    for (const i of __privateMethod(this, _indexes, indexes_fn).call(this)) {
      const v = __privateGet(this, _valList)[i];
      if (v !== void 0 && !__privateMethod(this, _isBackgroundFetch, isBackgroundFetch_fn).call(this, __privateGet(this, _valList)[i])) {
        yield __privateGet(this, _valList)[i];
      }
    }
  }
  /**
   * Inverse order version of {@link LRUCache.values}
   *
   * Return a generator yielding the values in the cache,
   * in order from least recently used to most recently used.
   */
  *rvalues() {
    for (const i of __privateMethod(this, _rindexes, rindexes_fn).call(this)) {
      const v = __privateGet(this, _valList)[i];
      if (v !== void 0 && !__privateMethod(this, _isBackgroundFetch, isBackgroundFetch_fn).call(this, __privateGet(this, _valList)[i])) {
        yield __privateGet(this, _valList)[i];
      }
    }
  }
  /**
   * Iterating over the cache itself yields the same results as
   * {@link LRUCache.entries}
   */
  [Symbol.iterator]() {
    return this.entries();
  }
  /**
   * Find a value for which the supplied fn method returns a truthy value,
   * similar to Array.find().  fn is called as fn(value, key, cache).
   */
  find(fn, getOptions = {}) {
    for (const i of __privateMethod(this, _indexes, indexes_fn).call(this)) {
      const v = __privateGet(this, _valList)[i];
      const value = __privateMethod(this, _isBackgroundFetch, isBackgroundFetch_fn).call(this, v) ? v.__staleWhileFetching : v;
      if (value === void 0)
        continue;
      if (fn(value, __privateGet(this, _keyList)[i], this)) {
        return this.get(__privateGet(this, _keyList)[i], getOptions);
      }
    }
  }
  /**
   * Call the supplied function on each item in the cache, in order from
   * most recently used to least recently used.  fn is called as
   * fn(value, key, cache).  Does not update age or recenty of use.
   * Does not iterate over stale values.
   */
  forEach(fn, thisp = this) {
    for (const i of __privateMethod(this, _indexes, indexes_fn).call(this)) {
      const v = __privateGet(this, _valList)[i];
      const value = __privateMethod(this, _isBackgroundFetch, isBackgroundFetch_fn).call(this, v) ? v.__staleWhileFetching : v;
      if (value === void 0)
        continue;
      fn.call(thisp, value, __privateGet(this, _keyList)[i], this);
    }
  }
  /**
   * The same as {@link LRUCache.forEach} but items are iterated over in
   * reverse order.  (ie, less recently used items are iterated over first.)
   */
  rforEach(fn, thisp = this) {
    for (const i of __privateMethod(this, _rindexes, rindexes_fn).call(this)) {
      const v = __privateGet(this, _valList)[i];
      const value = __privateMethod(this, _isBackgroundFetch, isBackgroundFetch_fn).call(this, v) ? v.__staleWhileFetching : v;
      if (value === void 0)
        continue;
      fn.call(thisp, value, __privateGet(this, _keyList)[i], this);
    }
  }
  /**
   * Delete any stale entries. Returns true if anything was removed,
   * false otherwise.
   */
  purgeStale() {
    let deleted = false;
    for (const i of __privateMethod(this, _rindexes, rindexes_fn).call(this, { allowStale: true })) {
      if (__privateGet(this, _isStale).call(this, i)) {
        this.delete(__privateGet(this, _keyList)[i]);
        deleted = true;
      }
    }
    return deleted;
  }
  /**
   * Get the extended info about a given entry, to get its value, size, and
   * TTL info simultaneously. Like {@link LRUCache#dump}, but just for a
   * single key. Always returns stale values, if their info is found in the
   * cache, so be sure to check for expired TTLs if relevant.
   */
  info(key) {
    const i = __privateGet(this, _keyMap).get(key);
    if (i === void 0)
      return void 0;
    const v = __privateGet(this, _valList)[i];
    const value = __privateMethod(this, _isBackgroundFetch, isBackgroundFetch_fn).call(this, v) ? v.__staleWhileFetching : v;
    if (value === void 0)
      return void 0;
    const entry = { value };
    if (__privateGet(this, _ttls) && __privateGet(this, _starts)) {
      const ttl = __privateGet(this, _ttls)[i];
      const start = __privateGet(this, _starts)[i];
      if (ttl && start) {
        const remain = ttl - (perf.now() - start);
        entry.ttl = remain;
        entry.start = Date.now();
      }
    }
    if (__privateGet(this, _sizes)) {
      entry.size = __privateGet(this, _sizes)[i];
    }
    return entry;
  }
  /**
   * Return an array of [key, {@link LRUCache.Entry}] tuples which can be
   * passed to cache.load()
   */
  dump() {
    const arr = [];
    for (const i of __privateMethod(this, _indexes, indexes_fn).call(this, { allowStale: true })) {
      const key = __privateGet(this, _keyList)[i];
      const v = __privateGet(this, _valList)[i];
      const value = __privateMethod(this, _isBackgroundFetch, isBackgroundFetch_fn).call(this, v) ? v.__staleWhileFetching : v;
      if (value === void 0 || key === void 0)
        continue;
      const entry = { value };
      if (__privateGet(this, _ttls) && __privateGet(this, _starts)) {
        entry.ttl = __privateGet(this, _ttls)[i];
        const age = perf.now() - __privateGet(this, _starts)[i];
        entry.start = Math.floor(Date.now() - age);
      }
      if (__privateGet(this, _sizes)) {
        entry.size = __privateGet(this, _sizes)[i];
      }
      arr.unshift([key, entry]);
    }
    return arr;
  }
  /**
   * Reset the cache and load in the items in entries in the order listed.
   * Note that the shape of the resulting cache may be different if the
   * same options are not used in both caches.
   */
  load(arr) {
    this.clear();
    for (const [key, entry] of arr) {
      if (entry.start) {
        const age = Date.now() - entry.start;
        entry.start = perf.now() - age;
      }
      this.set(key, entry.value, entry);
    }
  }
  /**
   * Add a value to the cache.
   *
   * Note: if `undefined` is specified as a value, this is an alias for
   * {@link LRUCache#delete}
   */
  set(k, v, setOptions = {}) {
    var _a2, _b2, _c, _d, _e;
    if (v === void 0) {
      this.delete(k);
      return this;
    }
    const { ttl = this.ttl, start, noDisposeOnSet = this.noDisposeOnSet, sizeCalculation = this.sizeCalculation, status } = setOptions;
    let { noUpdateTTL = this.noUpdateTTL } = setOptions;
    const size = __privateGet(this, _requireSize).call(this, k, v, setOptions.size || 0, sizeCalculation);
    if (this.maxEntrySize && size > this.maxEntrySize) {
      if (status) {
        status.set = "miss";
        status.maxEntrySizeExceeded = true;
      }
      this.delete(k);
      return this;
    }
    let index = __privateGet(this, _size) === 0 ? void 0 : __privateGet(this, _keyMap).get(k);
    if (index === void 0) {
      index = __privateGet(this, _size) === 0 ? __privateGet(this, _tail) : __privateGet(this, _free).length !== 0 ? __privateGet(this, _free).pop() : __privateGet(this, _size) === __privateGet(this, _max) ? __privateMethod(this, _evict, evict_fn).call(this, false) : __privateGet(this, _size);
      __privateGet(this, _keyList)[index] = k;
      __privateGet(this, _valList)[index] = v;
      __privateGet(this, _keyMap).set(k, index);
      __privateGet(this, _next)[__privateGet(this, _tail)] = index;
      __privateGet(this, _prev)[index] = __privateGet(this, _tail);
      __privateSet(this, _tail, index);
      __privateWrapper(this, _size)._++;
      __privateGet(this, _addItemSize).call(this, index, size, status);
      if (status)
        status.set = "add";
      noUpdateTTL = false;
    } else {
      __privateMethod(this, _moveToTail, moveToTail_fn).call(this, index);
      const oldVal = __privateGet(this, _valList)[index];
      if (v !== oldVal) {
        if (__privateGet(this, _hasFetchMethod) && __privateMethod(this, _isBackgroundFetch, isBackgroundFetch_fn).call(this, oldVal)) {
          oldVal.__abortController.abort(new Error("replaced"));
          const { __staleWhileFetching: s } = oldVal;
          if (s !== void 0 && !noDisposeOnSet) {
            if (__privateGet(this, _hasDispose)) {
              (_a2 = __privateGet(this, _dispose)) == null ? void 0 : _a2.call(this, s, k, "set");
            }
            if (__privateGet(this, _hasDisposeAfter)) {
              (_b2 = __privateGet(this, _disposed)) == null ? void 0 : _b2.push([s, k, "set"]);
            }
          }
        } else if (!noDisposeOnSet) {
          if (__privateGet(this, _hasDispose)) {
            (_c = __privateGet(this, _dispose)) == null ? void 0 : _c.call(this, oldVal, k, "set");
          }
          if (__privateGet(this, _hasDisposeAfter)) {
            (_d = __privateGet(this, _disposed)) == null ? void 0 : _d.push([oldVal, k, "set"]);
          }
        }
        __privateGet(this, _removeItemSize).call(this, index);
        __privateGet(this, _addItemSize).call(this, index, size, status);
        __privateGet(this, _valList)[index] = v;
        if (status) {
          status.set = "replace";
          const oldValue = oldVal && __privateMethod(this, _isBackgroundFetch, isBackgroundFetch_fn).call(this, oldVal) ? oldVal.__staleWhileFetching : oldVal;
          if (oldValue !== void 0)
            status.oldValue = oldValue;
        }
      } else if (status) {
        status.set = "update";
      }
    }
    if (ttl !== 0 && !__privateGet(this, _ttls)) {
      __privateMethod(this, _initializeTTLTracking, initializeTTLTracking_fn).call(this);
    }
    if (__privateGet(this, _ttls)) {
      if (!noUpdateTTL) {
        __privateGet(this, _setItemTTL).call(this, index, ttl, start);
      }
      if (status)
        __privateGet(this, _statusTTL).call(this, status, index);
    }
    if (!noDisposeOnSet && __privateGet(this, _hasDisposeAfter) && __privateGet(this, _disposed)) {
      const dt = __privateGet(this, _disposed);
      let task;
      while (task = dt == null ? void 0 : dt.shift()) {
        (_e = __privateGet(this, _disposeAfter)) == null ? void 0 : _e.call(this, ...task);
      }
    }
    return this;
  }
  /**
   * Evict the least recently used item, returning its value or
   * `undefined` if cache is empty.
   */
  pop() {
    var _a2;
    try {
      while (__privateGet(this, _size)) {
        const val = __privateGet(this, _valList)[__privateGet(this, _head)];
        __privateMethod(this, _evict, evict_fn).call(this, true);
        if (__privateMethod(this, _isBackgroundFetch, isBackgroundFetch_fn).call(this, val)) {
          if (val.__staleWhileFetching) {
            return val.__staleWhileFetching;
          }
        } else if (val !== void 0) {
          return val;
        }
      }
    } finally {
      if (__privateGet(this, _hasDisposeAfter) && __privateGet(this, _disposed)) {
        const dt = __privateGet(this, _disposed);
        let task;
        while (task = dt == null ? void 0 : dt.shift()) {
          (_a2 = __privateGet(this, _disposeAfter)) == null ? void 0 : _a2.call(this, ...task);
        }
      }
    }
  }
  /**
   * Check if a key is in the cache, without updating the recency of use.
   * Will return false if the item is stale, even though it is technically
   * in the cache.
   *
   * Will not update item age unless
   * {@link LRUCache.OptionsBase.updateAgeOnHas} is set.
   */
  has(k, hasOptions = {}) {
    const { updateAgeOnHas = this.updateAgeOnHas, status } = hasOptions;
    const index = __privateGet(this, _keyMap).get(k);
    if (index !== void 0) {
      const v = __privateGet(this, _valList)[index];
      if (__privateMethod(this, _isBackgroundFetch, isBackgroundFetch_fn).call(this, v) && v.__staleWhileFetching === void 0) {
        return false;
      }
      if (!__privateGet(this, _isStale).call(this, index)) {
        if (updateAgeOnHas) {
          __privateGet(this, _updateItemAge).call(this, index);
        }
        if (status) {
          status.has = "hit";
          __privateGet(this, _statusTTL).call(this, status, index);
        }
        return true;
      } else if (status) {
        status.has = "stale";
        __privateGet(this, _statusTTL).call(this, status, index);
      }
    } else if (status) {
      status.has = "miss";
    }
    return false;
  }
  /**
   * Like {@link LRUCache#get} but doesn't update recency or delete stale
   * items.
   *
   * Returns `undefined` if the item is stale, unless
   * {@link LRUCache.OptionsBase.allowStale} is set.
   */
  peek(k, peekOptions = {}) {
    const { allowStale = this.allowStale } = peekOptions;
    const index = __privateGet(this, _keyMap).get(k);
    if (index === void 0 || !allowStale && __privateGet(this, _isStale).call(this, index)) {
      return;
    }
    const v = __privateGet(this, _valList)[index];
    return __privateMethod(this, _isBackgroundFetch, isBackgroundFetch_fn).call(this, v) ? v.__staleWhileFetching : v;
  }
  async fetch(k, fetchOptions = {}) {
    const {
      // get options
      allowStale = this.allowStale,
      updateAgeOnGet = this.updateAgeOnGet,
      noDeleteOnStaleGet = this.noDeleteOnStaleGet,
      // set options
      ttl = this.ttl,
      noDisposeOnSet = this.noDisposeOnSet,
      size = 0,
      sizeCalculation = this.sizeCalculation,
      noUpdateTTL = this.noUpdateTTL,
      // fetch exclusive options
      noDeleteOnFetchRejection = this.noDeleteOnFetchRejection,
      allowStaleOnFetchRejection = this.allowStaleOnFetchRejection,
      ignoreFetchAbort = this.ignoreFetchAbort,
      allowStaleOnFetchAbort = this.allowStaleOnFetchAbort,
      context,
      forceRefresh = false,
      status,
      signal
    } = fetchOptions;
    if (!__privateGet(this, _hasFetchMethod)) {
      if (status)
        status.fetch = "get";
      return this.get(k, {
        allowStale,
        updateAgeOnGet,
        noDeleteOnStaleGet,
        status
      });
    }
    const options = {
      allowStale,
      updateAgeOnGet,
      noDeleteOnStaleGet,
      ttl,
      noDisposeOnSet,
      size,
      sizeCalculation,
      noUpdateTTL,
      noDeleteOnFetchRejection,
      allowStaleOnFetchRejection,
      allowStaleOnFetchAbort,
      ignoreFetchAbort,
      status,
      signal
    };
    let index = __privateGet(this, _keyMap).get(k);
    if (index === void 0) {
      if (status)
        status.fetch = "miss";
      const p = __privateMethod(this, _backgroundFetch, backgroundFetch_fn).call(this, k, index, options, context);
      return p.__returned = p;
    } else {
      const v = __privateGet(this, _valList)[index];
      if (__privateMethod(this, _isBackgroundFetch, isBackgroundFetch_fn).call(this, v)) {
        const stale = allowStale && v.__staleWhileFetching !== void 0;
        if (status) {
          status.fetch = "inflight";
          if (stale)
            status.returnedStale = true;
        }
        return stale ? v.__staleWhileFetching : v.__returned = v;
      }
      const isStale = __privateGet(this, _isStale).call(this, index);
      if (!forceRefresh && !isStale) {
        if (status)
          status.fetch = "hit";
        __privateMethod(this, _moveToTail, moveToTail_fn).call(this, index);
        if (updateAgeOnGet) {
          __privateGet(this, _updateItemAge).call(this, index);
        }
        if (status)
          __privateGet(this, _statusTTL).call(this, status, index);
        return v;
      }
      const p = __privateMethod(this, _backgroundFetch, backgroundFetch_fn).call(this, k, index, options, context);
      const hasStale = p.__staleWhileFetching !== void 0;
      const staleVal = hasStale && allowStale;
      if (status) {
        status.fetch = isStale ? "stale" : "refresh";
        if (staleVal && isStale)
          status.returnedStale = true;
      }
      return staleVal ? p.__staleWhileFetching : p.__returned = p;
    }
  }
  /**
   * Return a value from the cache. Will update the recency of the cache
   * entry found.
   *
   * If the key is not found, get() will return `undefined`.
   */
  get(k, getOptions = {}) {
    const { allowStale = this.allowStale, updateAgeOnGet = this.updateAgeOnGet, noDeleteOnStaleGet = this.noDeleteOnStaleGet, status } = getOptions;
    const index = __privateGet(this, _keyMap).get(k);
    if (index !== void 0) {
      const value = __privateGet(this, _valList)[index];
      const fetching = __privateMethod(this, _isBackgroundFetch, isBackgroundFetch_fn).call(this, value);
      if (status)
        __privateGet(this, _statusTTL).call(this, status, index);
      if (__privateGet(this, _isStale).call(this, index)) {
        if (status)
          status.get = "stale";
        if (!fetching) {
          if (!noDeleteOnStaleGet) {
            this.delete(k);
          }
          if (status && allowStale)
            status.returnedStale = true;
          return allowStale ? value : void 0;
        } else {
          if (status && allowStale && value.__staleWhileFetching !== void 0) {
            status.returnedStale = true;
          }
          return allowStale ? value.__staleWhileFetching : void 0;
        }
      } else {
        if (status)
          status.get = "hit";
        if (fetching) {
          return value.__staleWhileFetching;
        }
        __privateMethod(this, _moveToTail, moveToTail_fn).call(this, index);
        if (updateAgeOnGet) {
          __privateGet(this, _updateItemAge).call(this, index);
        }
        return value;
      }
    } else if (status) {
      status.get = "miss";
    }
  }
  /**
   * Deletes a key out of the cache.
   * Returns true if the key was deleted, false otherwise.
   */
  delete(k) {
    var _a2, _b2, _c, _d;
    let deleted = false;
    if (__privateGet(this, _size) !== 0) {
      const index = __privateGet(this, _keyMap).get(k);
      if (index !== void 0) {
        deleted = true;
        if (__privateGet(this, _size) === 1) {
          this.clear();
        } else {
          __privateGet(this, _removeItemSize).call(this, index);
          const v = __privateGet(this, _valList)[index];
          if (__privateMethod(this, _isBackgroundFetch, isBackgroundFetch_fn).call(this, v)) {
            v.__abortController.abort(new Error("deleted"));
          } else if (__privateGet(this, _hasDispose) || __privateGet(this, _hasDisposeAfter)) {
            if (__privateGet(this, _hasDispose)) {
              (_a2 = __privateGet(this, _dispose)) == null ? void 0 : _a2.call(this, v, k, "delete");
            }
            if (__privateGet(this, _hasDisposeAfter)) {
              (_b2 = __privateGet(this, _disposed)) == null ? void 0 : _b2.push([v, k, "delete"]);
            }
          }
          __privateGet(this, _keyMap).delete(k);
          __privateGet(this, _keyList)[index] = void 0;
          __privateGet(this, _valList)[index] = void 0;
          if (index === __privateGet(this, _tail)) {
            __privateSet(this, _tail, __privateGet(this, _prev)[index]);
          } else if (index === __privateGet(this, _head)) {
            __privateSet(this, _head, __privateGet(this, _next)[index]);
          } else {
            const pi = __privateGet(this, _prev)[index];
            __privateGet(this, _next)[pi] = __privateGet(this, _next)[index];
            const ni = __privateGet(this, _next)[index];
            __privateGet(this, _prev)[ni] = __privateGet(this, _prev)[index];
          }
          __privateWrapper(this, _size)._--;
          __privateGet(this, _free).push(index);
        }
      }
    }
    if (__privateGet(this, _hasDisposeAfter) && ((_c = __privateGet(this, _disposed)) == null ? void 0 : _c.length)) {
      const dt = __privateGet(this, _disposed);
      let task;
      while (task = dt == null ? void 0 : dt.shift()) {
        (_d = __privateGet(this, _disposeAfter)) == null ? void 0 : _d.call(this, ...task);
      }
    }
    return deleted;
  }
  /**
   * Clear the cache entirely, throwing away all values.
   */
  clear() {
    var _a2, _b2, _c;
    for (const index of __privateMethod(this, _rindexes, rindexes_fn).call(this, { allowStale: true })) {
      const v = __privateGet(this, _valList)[index];
      if (__privateMethod(this, _isBackgroundFetch, isBackgroundFetch_fn).call(this, v)) {
        v.__abortController.abort(new Error("deleted"));
      } else {
        const k = __privateGet(this, _keyList)[index];
        if (__privateGet(this, _hasDispose)) {
          (_a2 = __privateGet(this, _dispose)) == null ? void 0 : _a2.call(this, v, k, "delete");
        }
        if (__privateGet(this, _hasDisposeAfter)) {
          (_b2 = __privateGet(this, _disposed)) == null ? void 0 : _b2.push([v, k, "delete"]);
        }
      }
    }
    __privateGet(this, _keyMap).clear();
    __privateGet(this, _valList).fill(void 0);
    __privateGet(this, _keyList).fill(void 0);
    if (__privateGet(this, _ttls) && __privateGet(this, _starts)) {
      __privateGet(this, _ttls).fill(0);
      __privateGet(this, _starts).fill(0);
    }
    if (__privateGet(this, _sizes)) {
      __privateGet(this, _sizes).fill(0);
    }
    __privateSet(this, _head, 0);
    __privateSet(this, _tail, 0);
    __privateGet(this, _free).length = 0;
    __privateSet(this, _calculatedSize, 0);
    __privateSet(this, _size, 0);
    if (__privateGet(this, _hasDisposeAfter) && __privateGet(this, _disposed)) {
      const dt = __privateGet(this, _disposed);
      let task;
      while (task = dt == null ? void 0 : dt.shift()) {
        (_c = __privateGet(this, _disposeAfter)) == null ? void 0 : _c.call(this, ...task);
      }
    }
  }
};
_b = Symbol.toStringTag;
_max = new WeakMap();
_maxSize = new WeakMap();
_dispose = new WeakMap();
_disposeAfter = new WeakMap();
_fetchMethod = new WeakMap();
_size = new WeakMap();
_calculatedSize = new WeakMap();
_keyMap = new WeakMap();
_keyList = new WeakMap();
_valList = new WeakMap();
_next = new WeakMap();
_prev = new WeakMap();
_head = new WeakMap();
_tail = new WeakMap();
_free = new WeakMap();
_disposed = new WeakMap();
_sizes = new WeakMap();
_starts = new WeakMap();
_ttls = new WeakMap();
_hasDispose = new WeakMap();
_hasFetchMethod = new WeakMap();
_hasDisposeAfter = new WeakMap();
_initializeTTLTracking = new WeakSet();
initializeTTLTracking_fn = function() {
  const ttls = new ZeroArray(__privateGet(this, _max));
  const starts = new ZeroArray(__privateGet(this, _max));
  __privateSet(this, _ttls, ttls);
  __privateSet(this, _starts, starts);
  __privateSet(this, _setItemTTL, (index, ttl, start = perf.now()) => {
    starts[index] = ttl !== 0 ? start : 0;
    ttls[index] = ttl;
    if (ttl !== 0 && this.ttlAutopurge) {
      const t = setTimeout(() => {
        if (__privateGet(this, _isStale).call(this, index)) {
          this.delete(__privateGet(this, _keyList)[index]);
        }
      }, ttl + 1);
      if (t.unref) {
        t.unref();
      }
    }
  });
  __privateSet(this, _updateItemAge, (index) => {
    starts[index] = ttls[index] !== 0 ? perf.now() : 0;
  });
  __privateSet(this, _statusTTL, (status, index) => {
    if (ttls[index]) {
      const ttl = ttls[index];
      const start = starts[index];
      if (!ttl || !start)
        return;
      status.ttl = ttl;
      status.start = start;
      status.now = cachedNow || getNow();
      const age = status.now - start;
      status.remainingTTL = ttl - age;
    }
  });
  let cachedNow = 0;
  const getNow = () => {
    const n = perf.now();
    if (this.ttlResolution > 0) {
      cachedNow = n;
      const t = setTimeout(() => cachedNow = 0, this.ttlResolution);
      if (t.unref) {
        t.unref();
      }
    }
    return n;
  };
  this.getRemainingTTL = (key) => {
    const index = __privateGet(this, _keyMap).get(key);
    if (index === void 0) {
      return 0;
    }
    const ttl = ttls[index];
    const start = starts[index];
    if (!ttl || !start) {
      return Infinity;
    }
    const age = (cachedNow || getNow()) - start;
    return ttl - age;
  };
  __privateSet(this, _isStale, (index) => {
    const s = starts[index];
    const t = ttls[index];
    return !!t && !!s && (cachedNow || getNow()) - s > t;
  });
};
_updateItemAge = new WeakMap();
_statusTTL = new WeakMap();
_setItemTTL = new WeakMap();
_isStale = new WeakMap();
_initializeSizeTracking = new WeakSet();
initializeSizeTracking_fn = function() {
  const sizes = new ZeroArray(__privateGet(this, _max));
  __privateSet(this, _calculatedSize, 0);
  __privateSet(this, _sizes, sizes);
  __privateSet(this, _removeItemSize, (index) => {
    __privateSet(this, _calculatedSize, __privateGet(this, _calculatedSize) - sizes[index]);
    sizes[index] = 0;
  });
  __privateSet(this, _requireSize, (k, v, size, sizeCalculation) => {
    if (__privateMethod(this, _isBackgroundFetch, isBackgroundFetch_fn).call(this, v)) {
      return 0;
    }
    if (!isPosInt(size)) {
      if (sizeCalculation) {
        if (typeof sizeCalculation !== "function") {
          throw new TypeError("sizeCalculation must be a function");
        }
        size = sizeCalculation(v, k);
        if (!isPosInt(size)) {
          throw new TypeError("sizeCalculation return invalid (expect positive integer)");
        }
      } else {
        throw new TypeError("invalid size value (must be positive integer). When maxSize or maxEntrySize is used, sizeCalculation or size must be set.");
      }
    }
    return size;
  });
  __privateSet(this, _addItemSize, (index, size, status) => {
    sizes[index] = size;
    if (__privateGet(this, _maxSize)) {
      const maxSize = __privateGet(this, _maxSize) - sizes[index];
      while (__privateGet(this, _calculatedSize) > maxSize) {
        __privateMethod(this, _evict, evict_fn).call(this, true);
      }
    }
    __privateSet(this, _calculatedSize, __privateGet(this, _calculatedSize) + sizes[index]);
    if (status) {
      status.entrySize = size;
      status.totalCalculatedSize = __privateGet(this, _calculatedSize);
    }
  });
};
_removeItemSize = new WeakMap();
_addItemSize = new WeakMap();
_requireSize = new WeakMap();
_indexes = new WeakSet();
indexes_fn = function* ({ allowStale = this.allowStale } = {}) {
  if (__privateGet(this, _size)) {
    for (let i = __privateGet(this, _tail); true; ) {
      if (!__privateMethod(this, _isValidIndex, isValidIndex_fn).call(this, i)) {
        break;
      }
      if (allowStale || !__privateGet(this, _isStale).call(this, i)) {
        yield i;
      }
      if (i === __privateGet(this, _head)) {
        break;
      } else {
        i = __privateGet(this, _prev)[i];
      }
    }
  }
};
_rindexes = new WeakSet();
rindexes_fn = function* ({ allowStale = this.allowStale } = {}) {
  if (__privateGet(this, _size)) {
    for (let i = __privateGet(this, _head); true; ) {
      if (!__privateMethod(this, _isValidIndex, isValidIndex_fn).call(this, i)) {
        break;
      }
      if (allowStale || !__privateGet(this, _isStale).call(this, i)) {
        yield i;
      }
      if (i === __privateGet(this, _tail)) {
        break;
      } else {
        i = __privateGet(this, _next)[i];
      }
    }
  }
};
_isValidIndex = new WeakSet();
isValidIndex_fn = function(index) {
  return index !== void 0 && __privateGet(this, _keyMap).get(__privateGet(this, _keyList)[index]) === index;
};
_evict = new WeakSet();
evict_fn = function(free) {
  var _a2, _b2;
  const head = __privateGet(this, _head);
  const k = __privateGet(this, _keyList)[head];
  const v = __privateGet(this, _valList)[head];
  if (__privateGet(this, _hasFetchMethod) && __privateMethod(this, _isBackgroundFetch, isBackgroundFetch_fn).call(this, v)) {
    v.__abortController.abort(new Error("evicted"));
  } else if (__privateGet(this, _hasDispose) || __privateGet(this, _hasDisposeAfter)) {
    if (__privateGet(this, _hasDispose)) {
      (_a2 = __privateGet(this, _dispose)) == null ? void 0 : _a2.call(this, v, k, "evict");
    }
    if (__privateGet(this, _hasDisposeAfter)) {
      (_b2 = __privateGet(this, _disposed)) == null ? void 0 : _b2.push([v, k, "evict"]);
    }
  }
  __privateGet(this, _removeItemSize).call(this, head);
  if (free) {
    __privateGet(this, _keyList)[head] = void 0;
    __privateGet(this, _valList)[head] = void 0;
    __privateGet(this, _free).push(head);
  }
  if (__privateGet(this, _size) === 1) {
    __privateSet(this, _head, __privateSet(this, _tail, 0));
    __privateGet(this, _free).length = 0;
  } else {
    __privateSet(this, _head, __privateGet(this, _next)[head]);
  }
  __privateGet(this, _keyMap).delete(k);
  __privateWrapper(this, _size)._--;
  return head;
};
_backgroundFetch = new WeakSet();
backgroundFetch_fn = function(k, index, options, context) {
  const v = index === void 0 ? void 0 : __privateGet(this, _valList)[index];
  if (__privateMethod(this, _isBackgroundFetch, isBackgroundFetch_fn).call(this, v)) {
    return v;
  }
  const ac = new AC();
  const { signal } = options;
  signal == null ? void 0 : signal.addEventListener("abort", () => ac.abort(signal.reason), {
    signal: ac.signal
  });
  const fetchOpts = {
    signal: ac.signal,
    options,
    context
  };
  const cb = (v2, updateCache = false) => {
    const { aborted } = ac.signal;
    const ignoreAbort = options.ignoreFetchAbort && v2 !== void 0;
    if (options.status) {
      if (aborted && !updateCache) {
        options.status.fetchAborted = true;
        options.status.fetchError = ac.signal.reason;
        if (ignoreAbort)
          options.status.fetchAbortIgnored = true;
      } else {
        options.status.fetchResolved = true;
      }
    }
    if (aborted && !ignoreAbort && !updateCache) {
      return fetchFail(ac.signal.reason);
    }
    const bf2 = p;
    if (__privateGet(this, _valList)[index] === p) {
      if (v2 === void 0) {
        if (bf2.__staleWhileFetching) {
          __privateGet(this, _valList)[index] = bf2.__staleWhileFetching;
        } else {
          this.delete(k);
        }
      } else {
        if (options.status)
          options.status.fetchUpdated = true;
        this.set(k, v2, fetchOpts.options);
      }
    }
    return v2;
  };
  const eb = (er) => {
    if (options.status) {
      options.status.fetchRejected = true;
      options.status.fetchError = er;
    }
    return fetchFail(er);
  };
  const fetchFail = (er) => {
    const { aborted } = ac.signal;
    const allowStaleAborted = aborted && options.allowStaleOnFetchAbort;
    const allowStale = allowStaleAborted || options.allowStaleOnFetchRejection;
    const noDelete = allowStale || options.noDeleteOnFetchRejection;
    const bf2 = p;
    if (__privateGet(this, _valList)[index] === p) {
      const del = !noDelete || bf2.__staleWhileFetching === void 0;
      if (del) {
        this.delete(k);
      } else if (!allowStaleAborted) {
        __privateGet(this, _valList)[index] = bf2.__staleWhileFetching;
      }
    }
    if (allowStale) {
      if (options.status && bf2.__staleWhileFetching !== void 0) {
        options.status.returnedStale = true;
      }
      return bf2.__staleWhileFetching;
    } else if (bf2.__returned === bf2) {
      throw er;
    }
  };
  const pcall = (res, rej) => {
    var _a2;
    const fmp = (_a2 = __privateGet(this, _fetchMethod)) == null ? void 0 : _a2.call(this, k, v, fetchOpts);
    if (fmp && fmp instanceof Promise) {
      fmp.then((v2) => res(v2 === void 0 ? void 0 : v2), rej);
    }
    ac.signal.addEventListener("abort", () => {
      if (!options.ignoreFetchAbort || options.allowStaleOnFetchAbort) {
        res(void 0);
        if (options.allowStaleOnFetchAbort) {
          res = (v2) => cb(v2, true);
        }
      }
    });
  };
  if (options.status)
    options.status.fetchDispatched = true;
  const p = new Promise(pcall).then(cb, eb);
  const bf = Object.assign(p, {
    __abortController: ac,
    __staleWhileFetching: v,
    __returned: void 0
  });
  if (index === void 0) {
    this.set(k, bf, { ...fetchOpts.options, status: void 0 });
    index = __privateGet(this, _keyMap).get(k);
  } else {
    __privateGet(this, _valList)[index] = bf;
  }
  return bf;
};
_isBackgroundFetch = new WeakSet();
isBackgroundFetch_fn = function(p) {
  if (!__privateGet(this, _hasFetchMethod))
    return false;
  const b = p;
  return !!b && b instanceof Promise && b.hasOwnProperty("__staleWhileFetching") && b.__abortController instanceof AC;
};
_connect = new WeakSet();
connect_fn = function(p, n) {
  __privateGet(this, _prev)[n] = p;
  __privateGet(this, _next)[p] = n;
};
_moveToTail = new WeakSet();
moveToTail_fn = function(index) {
  if (index !== __privateGet(this, _tail)) {
    if (index === __privateGet(this, _head)) {
      __privateSet(this, _head, __privateGet(this, _next)[index]);
    } else {
      __privateMethod(this, _connect, connect_fn).call(this, __privateGet(this, _prev)[index], __privateGet(this, _next)[index]);
    }
    __privateMethod(this, _connect, connect_fn).call(this, __privateGet(this, _tail), index);
    __privateSet(this, _tail, index);
  }
};
let LRUCache = _LRUCache;
commonjs$2.LRUCache = LRUCache;
var commonjs$1 = {};
(function(exports) {
  var _a2, _b2, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s;
  var __importDefault2 = commonjsGlobal && commonjsGlobal.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Minipass = exports.isWritable = exports.isReadable = exports.isStream = void 0;
  const proc = typeof process === "object" && process ? process : {
    stdout: null,
    stderr: null
  };
  const node_events_1 = require$$0;
  const node_stream_1 = __importDefault2(require$$1);
  const node_string_decoder_1 = require$$2;
  const isStream = (s) => !!s && typeof s === "object" && (s instanceof Minipass || s instanceof node_stream_1.default || (0, exports.isReadable)(s) || (0, exports.isWritable)(s));
  exports.isStream = isStream;
  const isReadable = (s) => !!s && typeof s === "object" && s instanceof node_events_1.EventEmitter && typeof s.pipe === "function" && // node core Writable streams have a pipe() method, but it throws
  s.pipe !== node_stream_1.default.Writable.prototype.pipe;
  exports.isReadable = isReadable;
  const isWritable = (s) => !!s && typeof s === "object" && s instanceof node_events_1.EventEmitter && typeof s.write === "function" && typeof s.end === "function";
  exports.isWritable = isWritable;
  const EOF = Symbol("EOF");
  const MAYBE_EMIT_END = Symbol("maybeEmitEnd");
  const EMITTED_END = Symbol("emittedEnd");
  const EMITTING_END = Symbol("emittingEnd");
  const EMITTED_ERROR = Symbol("emittedError");
  const CLOSED = Symbol("closed");
  const READ = Symbol("read");
  const FLUSH = Symbol("flush");
  const FLUSHCHUNK = Symbol("flushChunk");
  const ENCODING = Symbol("encoding");
  const DECODER = Symbol("decoder");
  const FLOWING = Symbol("flowing");
  const PAUSED = Symbol("paused");
  const RESUME = Symbol("resume");
  const BUFFER = Symbol("buffer");
  const PIPES = Symbol("pipes");
  const BUFFERLENGTH = Symbol("bufferLength");
  const BUFFERPUSH = Symbol("bufferPush");
  const BUFFERSHIFT = Symbol("bufferShift");
  const OBJECTMODE = Symbol("objectMode");
  const DESTROYED = Symbol("destroyed");
  const ERROR = Symbol("error");
  const EMITDATA = Symbol("emitData");
  const EMITEND = Symbol("emitEnd");
  const EMITEND2 = Symbol("emitEnd2");
  const ASYNC = Symbol("async");
  const ABORT = Symbol("abort");
  const ABORTED = Symbol("aborted");
  const SIGNAL = Symbol("signal");
  const DATALISTENERS = Symbol("dataListeners");
  const DISCARDED = Symbol("discarded");
  const defer = (fn) => Promise.resolve().then(fn);
  const nodefer = (fn) => fn();
  const isEndish = (ev) => ev === "end" || ev === "finish" || ev === "prefinish";
  const isArrayBufferLike = (b) => b instanceof ArrayBuffer || !!b && typeof b === "object" && b.constructor && b.constructor.name === "ArrayBuffer" && b.byteLength >= 0;
  const isArrayBufferView = (b) => !Buffer.isBuffer(b) && ArrayBuffer.isView(b);
  class Pipe {
    constructor(src, dest, opts) {
      __publicField(this, "src");
      __publicField(this, "dest");
      __publicField(this, "opts");
      __publicField(this, "ondrain");
      this.src = src;
      this.dest = dest;
      this.opts = opts;
      this.ondrain = () => src[RESUME]();
      this.dest.on("drain", this.ondrain);
    }
    unpipe() {
      this.dest.removeListener("drain", this.ondrain);
    }
    // only here for the prototype
    /* c8 ignore start */
    proxyErrors(_er) {
    }
    /* c8 ignore stop */
    end() {
      this.unpipe();
      if (this.opts.end)
        this.dest.end();
    }
  }
  class PipeProxyErrors extends Pipe {
    unpipe() {
      this.src.removeListener("error", this.proxyErrors);
      super.unpipe();
    }
    constructor(src, dest, opts) {
      super(src, dest, opts);
      this.proxyErrors = (er) => dest.emit("error", er);
      src.on("error", this.proxyErrors);
    }
  }
  const isObjectModeOptions = (o) => !!o.objectMode;
  const isEncodingOptions = (o) => !o.objectMode && !!o.encoding && o.encoding !== "buffer";
  class Minipass extends node_events_1.EventEmitter {
    /**
     * If `RType` is Buffer, then options do not need to be provided.
     * Otherwise, an options object must be provided to specify either
     * {@link Minipass.SharedOptions.objectMode} or
     * {@link Minipass.SharedOptions.encoding}, as appropriate.
     */
    constructor(...args) {
      const options = args[0] || {};
      super();
      __publicField(this, _a2, false);
      __publicField(this, _b2, false);
      __publicField(this, _c, []);
      __publicField(this, _d, []);
      __publicField(this, _e);
      __publicField(this, _f);
      __publicField(this, _g);
      __publicField(this, _h);
      __publicField(this, _i, false);
      __publicField(this, _j, false);
      __publicField(this, _k, false);
      __publicField(this, _l, false);
      __publicField(this, _m, null);
      __publicField(this, _n, 0);
      __publicField(this, _o, false);
      __publicField(this, _p);
      __publicField(this, _q, false);
      __publicField(this, _r, 0);
      __publicField(this, _s, false);
      /**
       * true if the stream can be written
       */
      __publicField(this, "writable", true);
      /**
       * true if the stream can be read
       */
      __publicField(this, "readable", true);
      if (options.objectMode && typeof options.encoding === "string") {
        throw new TypeError("Encoding and objectMode may not be used together");
      }
      if (isObjectModeOptions(options)) {
        this[OBJECTMODE] = true;
        this[ENCODING] = null;
      } else if (isEncodingOptions(options)) {
        this[ENCODING] = options.encoding;
        this[OBJECTMODE] = false;
      } else {
        this[OBJECTMODE] = false;
        this[ENCODING] = null;
      }
      this[ASYNC] = !!options.async;
      this[DECODER] = this[ENCODING] ? new node_string_decoder_1.StringDecoder(this[ENCODING]) : null;
      if (options && options.debugExposeBuffer === true) {
        Object.defineProperty(this, "buffer", { get: () => this[BUFFER] });
      }
      if (options && options.debugExposePipes === true) {
        Object.defineProperty(this, "pipes", { get: () => this[PIPES] });
      }
      const { signal } = options;
      if (signal) {
        this[SIGNAL] = signal;
        if (signal.aborted) {
          this[ABORT]();
        } else {
          signal.addEventListener("abort", () => this[ABORT]());
        }
      }
    }
    /**
     * The amount of data stored in the buffer waiting to be read.
     *
     * For Buffer strings, this will be the total byte length.
     * For string encoding streams, this will be the string character length,
     * according to JavaScript's `string.length` logic.
     * For objectMode streams, this is a count of the items waiting to be
     * emitted.
     */
    get bufferLength() {
      return this[BUFFERLENGTH];
    }
    /**
     * The `BufferEncoding` currently in use, or `null`
     */
    get encoding() {
      return this[ENCODING];
    }
    /**
     * @deprecated - This is a read only property
     */
    set encoding(_enc) {
      throw new Error("Encoding must be set at instantiation time");
    }
    /**
     * @deprecated - Encoding may only be set at instantiation time
     */
    setEncoding(_enc) {
      throw new Error("Encoding must be set at instantiation time");
    }
    /**
     * True if this is an objectMode stream
     */
    get objectMode() {
      return this[OBJECTMODE];
    }
    /**
     * @deprecated - This is a read-only property
     */
    set objectMode(_om) {
      throw new Error("objectMode must be set at instantiation time");
    }
    /**
     * true if this is an async stream
     */
    get ["async"]() {
      return this[ASYNC];
    }
    /**
     * Set to true to make this stream async.
     *
     * Once set, it cannot be unset, as this would potentially cause incorrect
     * behavior.  Ie, a sync stream can be made async, but an async stream
     * cannot be safely made sync.
     */
    set ["async"](a) {
      this[ASYNC] = this[ASYNC] || !!a;
    }
    // drop everything and get out of the flow completely
    [(_a2 = FLOWING, _b2 = PAUSED, _c = PIPES, _d = BUFFER, _e = OBJECTMODE, _f = ENCODING, _g = ASYNC, _h = DECODER, _i = EOF, _j = EMITTED_END, _k = EMITTING_END, _l = CLOSED, _m = EMITTED_ERROR, _n = BUFFERLENGTH, _o = DESTROYED, _p = SIGNAL, _q = ABORTED, _r = DATALISTENERS, _s = DISCARDED, ABORT)]() {
      var _a3, _b3;
      this[ABORTED] = true;
      this.emit("abort", (_a3 = this[SIGNAL]) == null ? void 0 : _a3.reason);
      this.destroy((_b3 = this[SIGNAL]) == null ? void 0 : _b3.reason);
    }
    /**
     * True if the stream has been aborted.
     */
    get aborted() {
      return this[ABORTED];
    }
    /**
     * No-op setter. Stream aborted status is set via the AbortSignal provided
     * in the constructor options.
     */
    set aborted(_) {
    }
    write(chunk, encoding, cb) {
      var _a3;
      if (this[ABORTED])
        return false;
      if (this[EOF])
        throw new Error("write after end");
      if (this[DESTROYED]) {
        this.emit("error", Object.assign(new Error("Cannot call write after a stream was destroyed"), { code: "ERR_STREAM_DESTROYED" }));
        return true;
      }
      if (typeof encoding === "function") {
        cb = encoding;
        encoding = "utf8";
      }
      if (!encoding)
        encoding = "utf8";
      const fn = this[ASYNC] ? defer : nodefer;
      if (!this[OBJECTMODE] && !Buffer.isBuffer(chunk)) {
        if (isArrayBufferView(chunk)) {
          chunk = Buffer.from(chunk.buffer, chunk.byteOffset, chunk.byteLength);
        } else if (isArrayBufferLike(chunk)) {
          chunk = Buffer.from(chunk);
        } else if (typeof chunk !== "string") {
          throw new Error("Non-contiguous data written to non-objectMode stream");
        }
      }
      if (this[OBJECTMODE]) {
        if (this[FLOWING] && this[BUFFERLENGTH] !== 0)
          this[FLUSH](true);
        if (this[FLOWING])
          this.emit("data", chunk);
        else
          this[BUFFERPUSH](chunk);
        if (this[BUFFERLENGTH] !== 0)
          this.emit("readable");
        if (cb)
          fn(cb);
        return this[FLOWING];
      }
      if (!chunk.length) {
        if (this[BUFFERLENGTH] !== 0)
          this.emit("readable");
        if (cb)
          fn(cb);
        return this[FLOWING];
      }
      if (typeof chunk === "string" && // unless it is a string already ready for us to use
      !(encoding === this[ENCODING] && !((_a3 = this[DECODER]) == null ? void 0 : _a3.lastNeed))) {
        chunk = Buffer.from(chunk, encoding);
      }
      if (Buffer.isBuffer(chunk) && this[ENCODING]) {
        chunk = this[DECODER].write(chunk);
      }
      if (this[FLOWING] && this[BUFFERLENGTH] !== 0)
        this[FLUSH](true);
      if (this[FLOWING])
        this.emit("data", chunk);
      else
        this[BUFFERPUSH](chunk);
      if (this[BUFFERLENGTH] !== 0)
        this.emit("readable");
      if (cb)
        fn(cb);
      return this[FLOWING];
    }
    /**
     * Low-level explicit read method.
     *
     * In objectMode, the argument is ignored, and one item is returned if
     * available.
     *
     * `n` is the number of bytes (or in the case of encoding streams,
     * characters) to consume. If `n` is not provided, then the entire buffer
     * is returned, or `null` is returned if no data is available.
     *
     * If `n` is greater that the amount of data in the internal buffer,
     * then `null` is returned.
     */
    read(n) {
      if (this[DESTROYED])
        return null;
      this[DISCARDED] = false;
      if (this[BUFFERLENGTH] === 0 || n === 0 || n && n > this[BUFFERLENGTH]) {
        this[MAYBE_EMIT_END]();
        return null;
      }
      if (this[OBJECTMODE])
        n = null;
      if (this[BUFFER].length > 1 && !this[OBJECTMODE]) {
        this[BUFFER] = [
          this[ENCODING] ? this[BUFFER].join("") : Buffer.concat(this[BUFFER], this[BUFFERLENGTH])
        ];
      }
      const ret = this[READ](n || null, this[BUFFER][0]);
      this[MAYBE_EMIT_END]();
      return ret;
    }
    [READ](n, chunk) {
      if (this[OBJECTMODE])
        this[BUFFERSHIFT]();
      else {
        const c2 = chunk;
        if (n === c2.length || n === null)
          this[BUFFERSHIFT]();
        else if (typeof c2 === "string") {
          this[BUFFER][0] = c2.slice(n);
          chunk = c2.slice(0, n);
          this[BUFFERLENGTH] -= n;
        } else {
          this[BUFFER][0] = c2.subarray(n);
          chunk = c2.subarray(0, n);
          this[BUFFERLENGTH] -= n;
        }
      }
      this.emit("data", chunk);
      if (!this[BUFFER].length && !this[EOF])
        this.emit("drain");
      return chunk;
    }
    end(chunk, encoding, cb) {
      if (typeof chunk === "function") {
        cb = chunk;
        chunk = void 0;
      }
      if (typeof encoding === "function") {
        cb = encoding;
        encoding = "utf8";
      }
      if (chunk !== void 0)
        this.write(chunk, encoding);
      if (cb)
        this.once("end", cb);
      this[EOF] = true;
      this.writable = false;
      if (this[FLOWING] || !this[PAUSED])
        this[MAYBE_EMIT_END]();
      return this;
    }
    // don't let the internal resume be overwritten
    [RESUME]() {
      if (this[DESTROYED])
        return;
      if (!this[DATALISTENERS] && !this[PIPES].length) {
        this[DISCARDED] = true;
      }
      this[PAUSED] = false;
      this[FLOWING] = true;
      this.emit("resume");
      if (this[BUFFER].length)
        this[FLUSH]();
      else if (this[EOF])
        this[MAYBE_EMIT_END]();
      else
        this.emit("drain");
    }
    /**
     * Resume the stream if it is currently in a paused state
     *
     * If called when there are no pipe destinations or `data` event listeners,
     * this will place the stream in a "discarded" state, where all data will
     * be thrown away. The discarded state is removed if a pipe destination or
     * data handler is added, if pause() is called, or if any synchronous or
     * asynchronous iteration is started.
     */
    resume() {
      return this[RESUME]();
    }
    /**
     * Pause the stream
     */
    pause() {
      this[FLOWING] = false;
      this[PAUSED] = true;
      this[DISCARDED] = false;
    }
    /**
     * true if the stream has been forcibly destroyed
     */
    get destroyed() {
      return this[DESTROYED];
    }
    /**
     * true if the stream is currently in a flowing state, meaning that
     * any writes will be immediately emitted.
     */
    get flowing() {
      return this[FLOWING];
    }
    /**
     * true if the stream is currently in a paused state
     */
    get paused() {
      return this[PAUSED];
    }
    [BUFFERPUSH](chunk) {
      if (this[OBJECTMODE])
        this[BUFFERLENGTH] += 1;
      else
        this[BUFFERLENGTH] += chunk.length;
      this[BUFFER].push(chunk);
    }
    [BUFFERSHIFT]() {
      if (this[OBJECTMODE])
        this[BUFFERLENGTH] -= 1;
      else
        this[BUFFERLENGTH] -= this[BUFFER][0].length;
      return this[BUFFER].shift();
    }
    [FLUSH](noDrain = false) {
      do {
      } while (this[FLUSHCHUNK](this[BUFFERSHIFT]()) && this[BUFFER].length);
      if (!noDrain && !this[BUFFER].length && !this[EOF])
        this.emit("drain");
    }
    [FLUSHCHUNK](chunk) {
      this.emit("data", chunk);
      return this[FLOWING];
    }
    /**
     * Pipe all data emitted by this stream into the destination provided.
     *
     * Triggers the flow of data.
     */
    pipe(dest, opts) {
      if (this[DESTROYED])
        return dest;
      this[DISCARDED] = false;
      const ended = this[EMITTED_END];
      opts = opts || {};
      if (dest === proc.stdout || dest === proc.stderr)
        opts.end = false;
      else
        opts.end = opts.end !== false;
      opts.proxyErrors = !!opts.proxyErrors;
      if (ended) {
        if (opts.end)
          dest.end();
      } else {
        this[PIPES].push(!opts.proxyErrors ? new Pipe(this, dest, opts) : new PipeProxyErrors(this, dest, opts));
        if (this[ASYNC])
          defer(() => this[RESUME]());
        else
          this[RESUME]();
      }
      return dest;
    }
    /**
     * Fully unhook a piped destination stream.
     *
     * If the destination stream was the only consumer of this stream (ie,
     * there are no other piped destinations or `'data'` event listeners)
     * then the flow of data will stop until there is another consumer or
     * {@link Minipass#resume} is explicitly called.
     */
    unpipe(dest) {
      const p = this[PIPES].find((p2) => p2.dest === dest);
      if (p) {
        if (this[PIPES].length === 1) {
          if (this[FLOWING] && this[DATALISTENERS] === 0) {
            this[FLOWING] = false;
          }
          this[PIPES] = [];
        } else
          this[PIPES].splice(this[PIPES].indexOf(p), 1);
        p.unpipe();
      }
    }
    /**
     * Alias for {@link Minipass#on}
     */
    addListener(ev, handler) {
      return this.on(ev, handler);
    }
    /**
     * Mostly identical to `EventEmitter.on`, with the following
     * behavior differences to prevent data loss and unnecessary hangs:
     *
     * - Adding a 'data' event handler will trigger the flow of data
     *
     * - Adding a 'readable' event handler when there is data waiting to be read
     *   will cause 'readable' to be emitted immediately.
     *
     * - Adding an 'endish' event handler ('end', 'finish', etc.) which has
     *   already passed will cause the event to be emitted immediately and all
     *   handlers removed.
     *
     * - Adding an 'error' event handler after an error has been emitted will
     *   cause the event to be re-emitted immediately with the error previously
     *   raised.
     */
    on(ev, handler) {
      const ret = super.on(ev, handler);
      if (ev === "data") {
        this[DISCARDED] = false;
        this[DATALISTENERS]++;
        if (!this[PIPES].length && !this[FLOWING]) {
          this[RESUME]();
        }
      } else if (ev === "readable" && this[BUFFERLENGTH] !== 0) {
        super.emit("readable");
      } else if (isEndish(ev) && this[EMITTED_END]) {
        super.emit(ev);
        this.removeAllListeners(ev);
      } else if (ev === "error" && this[EMITTED_ERROR]) {
        const h = handler;
        if (this[ASYNC])
          defer(() => h.call(this, this[EMITTED_ERROR]));
        else
          h.call(this, this[EMITTED_ERROR]);
      }
      return ret;
    }
    /**
     * Alias for {@link Minipass#off}
     */
    removeListener(ev, handler) {
      return this.off(ev, handler);
    }
    /**
     * Mostly identical to `EventEmitter.off`
     *
     * If a 'data' event handler is removed, and it was the last consumer
     * (ie, there are no pipe destinations or other 'data' event listeners),
     * then the flow of data will stop until there is another consumer or
     * {@link Minipass#resume} is explicitly called.
     */
    off(ev, handler) {
      const ret = super.off(ev, handler);
      if (ev === "data") {
        this[DATALISTENERS] = this.listeners("data").length;
        if (this[DATALISTENERS] === 0 && !this[DISCARDED] && !this[PIPES].length) {
          this[FLOWING] = false;
        }
      }
      return ret;
    }
    /**
     * Mostly identical to `EventEmitter.removeAllListeners`
     *
     * If all 'data' event handlers are removed, and they were the last consumer
     * (ie, there are no pipe destinations), then the flow of data will stop
     * until there is another consumer or {@link Minipass#resume} is explicitly
     * called.
     */
    removeAllListeners(ev) {
      const ret = super.removeAllListeners(ev);
      if (ev === "data" || ev === void 0) {
        this[DATALISTENERS] = 0;
        if (!this[DISCARDED] && !this[PIPES].length) {
          this[FLOWING] = false;
        }
      }
      return ret;
    }
    /**
     * true if the 'end' event has been emitted
     */
    get emittedEnd() {
      return this[EMITTED_END];
    }
    [MAYBE_EMIT_END]() {
      if (!this[EMITTING_END] && !this[EMITTED_END] && !this[DESTROYED] && this[BUFFER].length === 0 && this[EOF]) {
        this[EMITTING_END] = true;
        this.emit("end");
        this.emit("prefinish");
        this.emit("finish");
        if (this[CLOSED])
          this.emit("close");
        this[EMITTING_END] = false;
      }
    }
    /**
     * Mostly identical to `EventEmitter.emit`, with the following
     * behavior differences to prevent data loss and unnecessary hangs:
     *
     * If the stream has been destroyed, and the event is something other
     * than 'close' or 'error', then `false` is returned and no handlers
     * are called.
     *
     * If the event is 'end', and has already been emitted, then the event
     * is ignored. If the stream is in a paused or non-flowing state, then
     * the event will be deferred until data flow resumes. If the stream is
     * async, then handlers will be called on the next tick rather than
     * immediately.
     *
     * If the event is 'close', and 'end' has not yet been emitted, then
     * the event will be deferred until after 'end' is emitted.
     *
     * If the event is 'error', and an AbortSignal was provided for the stream,
     * and there are no listeners, then the event is ignored, matching the
     * behavior of node core streams in the presense of an AbortSignal.
     *
     * If the event is 'finish' or 'prefinish', then all listeners will be
     * removed after emitting the event, to prevent double-firing.
     */
    emit(ev, ...args) {
      const data = args[0];
      if (ev !== "error" && ev !== "close" && ev !== DESTROYED && this[DESTROYED]) {
        return false;
      } else if (ev === "data") {
        return !this[OBJECTMODE] && !data ? false : this[ASYNC] ? (defer(() => this[EMITDATA](data)), true) : this[EMITDATA](data);
      } else if (ev === "end") {
        return this[EMITEND]();
      } else if (ev === "close") {
        this[CLOSED] = true;
        if (!this[EMITTED_END] && !this[DESTROYED])
          return false;
        const ret2 = super.emit("close");
        this.removeAllListeners("close");
        return ret2;
      } else if (ev === "error") {
        this[EMITTED_ERROR] = data;
        super.emit(ERROR, data);
        const ret2 = !this[SIGNAL] || this.listeners("error").length ? super.emit("error", data) : false;
        this[MAYBE_EMIT_END]();
        return ret2;
      } else if (ev === "resume") {
        const ret2 = super.emit("resume");
        this[MAYBE_EMIT_END]();
        return ret2;
      } else if (ev === "finish" || ev === "prefinish") {
        const ret2 = super.emit(ev);
        this.removeAllListeners(ev);
        return ret2;
      }
      const ret = super.emit(ev, ...args);
      this[MAYBE_EMIT_END]();
      return ret;
    }
    [EMITDATA](data) {
      for (const p of this[PIPES]) {
        if (p.dest.write(data) === false)
          this.pause();
      }
      const ret = this[DISCARDED] ? false : super.emit("data", data);
      this[MAYBE_EMIT_END]();
      return ret;
    }
    [EMITEND]() {
      if (this[EMITTED_END])
        return false;
      this[EMITTED_END] = true;
      this.readable = false;
      return this[ASYNC] ? (defer(() => this[EMITEND2]()), true) : this[EMITEND2]();
    }
    [EMITEND2]() {
      if (this[DECODER]) {
        const data = this[DECODER].end();
        if (data) {
          for (const p of this[PIPES]) {
            p.dest.write(data);
          }
          if (!this[DISCARDED])
            super.emit("data", data);
        }
      }
      for (const p of this[PIPES]) {
        p.end();
      }
      const ret = super.emit("end");
      this.removeAllListeners("end");
      return ret;
    }
    /**
     * Return a Promise that resolves to an array of all emitted data once
     * the stream ends.
     */
    async collect() {
      const buf = Object.assign([], {
        dataLength: 0
      });
      if (!this[OBJECTMODE])
        buf.dataLength = 0;
      const p = this.promise();
      this.on("data", (c2) => {
        buf.push(c2);
        if (!this[OBJECTMODE])
          buf.dataLength += c2.length;
      });
      await p;
      return buf;
    }
    /**
     * Return a Promise that resolves to the concatenation of all emitted data
     * once the stream ends.
     *
     * Not allowed on objectMode streams.
     */
    async concat() {
      if (this[OBJECTMODE]) {
        throw new Error("cannot concat in objectMode");
      }
      const buf = await this.collect();
      return this[ENCODING] ? buf.join("") : Buffer.concat(buf, buf.dataLength);
    }
    /**
     * Return a void Promise that resolves once the stream ends.
     */
    async promise() {
      return new Promise((resolve, reject) => {
        this.on(DESTROYED, () => reject(new Error("stream destroyed")));
        this.on("error", (er) => reject(er));
        this.on("end", () => resolve());
      });
    }
    /**
     * Asynchronous `for await of` iteration.
     *
     * This will continue emitting all chunks until the stream terminates.
     */
    [Symbol.asyncIterator]() {
      this[DISCARDED] = false;
      let stopped = false;
      const stop = async () => {
        this.pause();
        stopped = true;
        return { value: void 0, done: true };
      };
      const next = () => {
        if (stopped)
          return stop();
        const res = this.read();
        if (res !== null)
          return Promise.resolve({ done: false, value: res });
        if (this[EOF])
          return stop();
        let resolve;
        let reject;
        const onerr = (er) => {
          this.off("data", ondata);
          this.off("end", onend);
          this.off(DESTROYED, ondestroy);
          stop();
          reject(er);
        };
        const ondata = (value) => {
          this.off("error", onerr);
          this.off("end", onend);
          this.off(DESTROYED, ondestroy);
          this.pause();
          resolve({ value, done: !!this[EOF] });
        };
        const onend = () => {
          this.off("error", onerr);
          this.off("data", ondata);
          this.off(DESTROYED, ondestroy);
          stop();
          resolve({ done: true, value: void 0 });
        };
        const ondestroy = () => onerr(new Error("stream destroyed"));
        return new Promise((res2, rej) => {
          reject = rej;
          resolve = res2;
          this.once(DESTROYED, ondestroy);
          this.once("error", onerr);
          this.once("end", onend);
          this.once("data", ondata);
        });
      };
      return {
        next,
        throw: stop,
        return: stop,
        [Symbol.asyncIterator]() {
          return this;
        }
      };
    }
    /**
     * Synchronous `for of` iteration.
     *
     * The iteration will terminate when the internal buffer runs out, even
     * if the stream has not yet terminated.
     */
    [Symbol.iterator]() {
      this[DISCARDED] = false;
      let stopped = false;
      const stop = () => {
        this.pause();
        this.off(ERROR, stop);
        this.off(DESTROYED, stop);
        this.off("end", stop);
        stopped = true;
        return { done: true, value: void 0 };
      };
      const next = () => {
        if (stopped)
          return stop();
        const value = this.read();
        return value === null ? stop() : { done: false, value };
      };
      this.once("end", stop);
      this.once(ERROR, stop);
      this.once(DESTROYED, stop);
      return {
        next,
        throw: stop,
        return: stop,
        [Symbol.iterator]() {
          return this;
        }
      };
    }
    /**
     * Destroy a stream, preventing it from being used for any further purpose.
     *
     * If the stream has a `close()` method, then it will be called on
     * destruction.
     *
     * After destruction, any attempt to write data, read data, or emit most
     * events will be ignored.
     *
     * If an error argument is provided, then it will be emitted in an
     * 'error' event.
     */
    destroy(er) {
      if (this[DESTROYED]) {
        if (er)
          this.emit("error", er);
        else
          this.emit(DESTROYED);
        return this;
      }
      this[DESTROYED] = true;
      this[DISCARDED] = true;
      this[BUFFER].length = 0;
      this[BUFFERLENGTH] = 0;
      const wc = this;
      if (typeof wc.close === "function" && !this[CLOSED])
        wc.close();
      if (er)
        this.emit("error", er);
      else
        this.emit(DESTROYED);
      return this;
    }
    /**
     * Alias for {@link isStream}
     *
     * Former export location, maintained for backwards compatibility.
     *
     * @deprecated
     */
    static get isStream() {
      return exports.isStream;
    }
  }
  exports.Minipass = Minipass;
})(commonjs$1);
var __createBinding = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(o, m, k, k2) {
  if (k2 === void 0)
    k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);
  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = { enumerable: true, get: function() {
      return m[k];
    } };
  }
  Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
  if (k2 === void 0)
    k2 = k;
  o[k2] = m[k];
});
var __setModuleDefault = commonjsGlobal && commonjsGlobal.__setModuleDefault || (Object.create ? function(o, v) {
  Object.defineProperty(o, "default", { enumerable: true, value: v });
} : function(o, v) {
  o["default"] = v;
});
var __importStar = commonjsGlobal && commonjsGlobal.__importStar || function(mod) {
  if (mod && mod.__esModule)
    return mod;
  var result = {};
  if (mod != null) {
    for (var k in mod)
      if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
        __createBinding(result, mod, k);
  }
  __setModuleDefault(result, mod);
  return result;
};
Object.defineProperty(commonjs$3, "__esModule", { value: true });
commonjs$3.PathScurry = commonjs$3.Path = commonjs$3.PathScurryDarwin = commonjs$3.PathScurryPosix = commonjs$3.PathScurryWin32 = commonjs$3.PathScurryBase = commonjs$3.PathPosix = commonjs$3.PathWin32 = commonjs$3.PathBase = commonjs$3.ChildrenCache = commonjs$3.ResolveCache = void 0;
const lru_cache_1 = commonjs$2;
const node_path_1 = require$$1$1;
const node_url_1$1 = require$$2$1;
const fs_1$1 = require$$0$1;
const actualFS = __importStar(require$$4);
const realpathSync = fs_1$1.realpathSync.native;
const promises_1$1 = require$$5;
const minipass_1$1 = commonjs$1;
const defaultFS = {
  lstatSync: fs_1$1.lstatSync,
  readdir: fs_1$1.readdir,
  readdirSync: fs_1$1.readdirSync,
  readlinkSync: fs_1$1.readlinkSync,
  realpathSync,
  promises: {
    lstat: promises_1$1.lstat,
    readdir: promises_1$1.readdir,
    readlink: promises_1$1.readlink,
    realpath: promises_1$1.realpath
  }
};
const fsFromOption = (fsOption) => !fsOption || fsOption === defaultFS || fsOption === actualFS ? defaultFS : {
  ...defaultFS,
  ...fsOption,
  promises: {
    ...defaultFS.promises,
    ...fsOption.promises || {}
  }
};
const uncDriveRegexp = /^\\\\\?\\([a-z]:)\\?$/i;
const uncToDrive = (rootPath) => rootPath.replace(/\//g, "\\").replace(uncDriveRegexp, "$1\\");
const eitherSep = /[\\\/]/;
const UNKNOWN = 0;
const IFIFO = 1;
const IFCHR = 2;
const IFDIR = 4;
const IFBLK = 6;
const IFREG = 8;
const IFLNK = 10;
const IFSOCK = 12;
const IFMT = 15;
const IFMT_UNKNOWN = ~IFMT;
const READDIR_CALLED = 16;
const LSTAT_CALLED = 32;
const ENOTDIR = 64;
const ENOENT = 128;
const ENOREADLINK = 256;
const ENOREALPATH = 512;
const ENOCHILD = ENOTDIR | ENOENT | ENOREALPATH;
const TYPEMASK = 1023;
const entToType = (s) => s.isFile() ? IFREG : s.isDirectory() ? IFDIR : s.isSymbolicLink() ? IFLNK : s.isCharacterDevice() ? IFCHR : s.isBlockDevice() ? IFBLK : s.isSocket() ? IFSOCK : s.isFIFO() ? IFIFO : UNKNOWN;
const normalizeCache = /* @__PURE__ */ new Map();
const normalize = (s) => {
  const c2 = normalizeCache.get(s);
  if (c2)
    return c2;
  const n = s.normalize("NFKD");
  normalizeCache.set(s, n);
  return n;
};
const normalizeNocaseCache = /* @__PURE__ */ new Map();
const normalizeNocase = (s) => {
  const c2 = normalizeNocaseCache.get(s);
  if (c2)
    return c2;
  const n = normalize(s.toLowerCase());
  normalizeNocaseCache.set(s, n);
  return n;
};
class ResolveCache extends lru_cache_1.LRUCache {
  constructor() {
    super({ max: 256 });
  }
}
commonjs$3.ResolveCache = ResolveCache;
class ChildrenCache extends lru_cache_1.LRUCache {
  constructor(maxSize = 16 * 1024) {
    super({
      maxSize,
      // parent + children
      sizeCalculation: (a) => a.length + 1
    });
  }
}
commonjs$3.ChildrenCache = ChildrenCache;
const setAsCwd = Symbol("PathScurry setAsCwd");
class PathBase {
  /**
   * Do not create new Path objects directly.  They should always be accessed
   * via the PathScurry class or other methods on the Path class.
   *
   * @internal
   */
  constructor(name, type = UNKNOWN, root, roots, nocase, children, opts) {
    __privateAdd(this, _resolveParts);
    __privateAdd(this, _readdirSuccess);
    __privateAdd(this, _markENOENT);
    __privateAdd(this, _markChildrenENOENT);
    __privateAdd(this, _markENOREALPATH);
    // save the information when we know the entry is not a dir
    __privateAdd(this, _markENOTDIR);
    __privateAdd(this, _readdirFail);
    __privateAdd(this, _lstatFail);
    __privateAdd(this, _readlinkFail);
    __privateAdd(this, _readdirAddChild);
    __privateAdd(this, _readdirAddNewChild);
    __privateAdd(this, _readdirMaybePromoteChild);
    __privateAdd(this, _readdirPromoteChild);
    __privateAdd(this, _applyStat);
    __privateAdd(this, _callOnReaddirCB);
    /**
     * the basename of this path
     *
     * **Important**: *always* test the path name against any test string
     * usingthe {@link isNamed} method, and not by directly comparing this
     * string. Otherwise, unicode path strings that the system sees as identical
     * will not be properly treated as the same path, leading to incorrect
     * behavior and possible security issues.
     */
    __publicField(this, "name");
    /**
     * the Path entry corresponding to the path root.
     *
     * @internal
     */
    __publicField(this, "root");
    /**
     * All roots found within the current PathScurry family
     *
     * @internal
     */
    __publicField(this, "roots");
    /**
     * a reference to the parent path, or undefined in the case of root entries
     *
     * @internal
     */
    __publicField(this, "parent");
    /**
     * boolean indicating whether paths are compared case-insensitively
     * @internal
     */
    __publicField(this, "nocase");
    /**
     * boolean indicating that this path is the current working directory
     * of the PathScurry collection that contains it.
     */
    __publicField(this, "isCWD", false);
    // potential default fs override
    __privateAdd(this, _fs, void 0);
    // Stats fields
    __privateAdd(this, _dev, void 0);
    __privateAdd(this, _mode, void 0);
    __privateAdd(this, _nlink, void 0);
    __privateAdd(this, _uid, void 0);
    __privateAdd(this, _gid, void 0);
    __privateAdd(this, _rdev, void 0);
    __privateAdd(this, _blksize, void 0);
    __privateAdd(this, _ino, void 0);
    __privateAdd(this, _size2, void 0);
    __privateAdd(this, _blocks, void 0);
    __privateAdd(this, _atimeMs, void 0);
    __privateAdd(this, _mtimeMs, void 0);
    __privateAdd(this, _ctimeMs, void 0);
    __privateAdd(this, _birthtimeMs, void 0);
    __privateAdd(this, _atime, void 0);
    __privateAdd(this, _mtime, void 0);
    __privateAdd(this, _ctime, void 0);
    __privateAdd(this, _birthtime, void 0);
    __privateAdd(this, _matchName, void 0);
    __privateAdd(this, _depth, void 0);
    __privateAdd(this, _fullpath, void 0);
    __privateAdd(this, _fullpathPosix, void 0);
    __privateAdd(this, _relative, void 0);
    __privateAdd(this, _relativePosix, void 0);
    __privateAdd(this, _type, void 0);
    __privateAdd(this, _children, void 0);
    __privateAdd(this, _linkTarget, void 0);
    __privateAdd(this, _realpath, void 0);
    __privateAdd(this, _onReaddirCB, []);
    __privateAdd(this, _readdirCBInFlight, false);
    __privateAdd(this, _asyncReaddirInFlight, void 0);
    this.name = name;
    __privateSet(this, _matchName, nocase ? normalizeNocase(name) : normalize(name));
    __privateSet(this, _type, type & TYPEMASK);
    this.nocase = nocase;
    this.roots = roots;
    this.root = root || this;
    __privateSet(this, _children, children);
    __privateSet(this, _fullpath, opts.fullpath);
    __privateSet(this, _relative, opts.relative);
    __privateSet(this, _relativePosix, opts.relativePosix);
    this.parent = opts.parent;
    if (this.parent) {
      __privateSet(this, _fs, __privateGet(this.parent, _fs));
    } else {
      __privateSet(this, _fs, fsFromOption(opts.fs));
    }
  }
  get dev() {
    return __privateGet(this, _dev);
  }
  get mode() {
    return __privateGet(this, _mode);
  }
  get nlink() {
    return __privateGet(this, _nlink);
  }
  get uid() {
    return __privateGet(this, _uid);
  }
  get gid() {
    return __privateGet(this, _gid);
  }
  get rdev() {
    return __privateGet(this, _rdev);
  }
  get blksize() {
    return __privateGet(this, _blksize);
  }
  get ino() {
    return __privateGet(this, _ino);
  }
  get size() {
    return __privateGet(this, _size2);
  }
  get blocks() {
    return __privateGet(this, _blocks);
  }
  get atimeMs() {
    return __privateGet(this, _atimeMs);
  }
  get mtimeMs() {
    return __privateGet(this, _mtimeMs);
  }
  get ctimeMs() {
    return __privateGet(this, _ctimeMs);
  }
  get birthtimeMs() {
    return __privateGet(this, _birthtimeMs);
  }
  get atime() {
    return __privateGet(this, _atime);
  }
  get mtime() {
    return __privateGet(this, _mtime);
  }
  get ctime() {
    return __privateGet(this, _ctime);
  }
  get birthtime() {
    return __privateGet(this, _birthtime);
  }
  /**
   * This property is for compatibility with the Dirent class as of
   * Node v20, where Dirent['parentPath'] refers to the path of the
   * directory that was passed to readdir. For root entries, it's the path
   * to the entry itself.
   */
  get parentPath() {
    return (this.parent || this).fullpath();
  }
  /**
   * Deprecated alias for Dirent['parentPath'] Somewhat counterintuitively,
   * this property refers to the *parent* path, not the path object itself.
   */
  get path() {
    return this.parentPath;
  }
  /**
   * Returns the depth of the Path object from its root.
   *
   * For example, a path at `/foo/bar` would have a depth of 2.
   */
  depth() {
    if (__privateGet(this, _depth) !== void 0)
      return __privateGet(this, _depth);
    if (!this.parent)
      return __privateSet(this, _depth, 0);
    return __privateSet(this, _depth, this.parent.depth() + 1);
  }
  /**
   * @internal
   */
  childrenCache() {
    return __privateGet(this, _children);
  }
  /**
   * Get the Path object referenced by the string path, resolved from this Path
   */
  resolve(path2) {
    var _a2;
    if (!path2) {
      return this;
    }
    const rootPath = this.getRootString(path2);
    const dir2 = path2.substring(rootPath.length);
    const dirParts = dir2.split(this.splitSep);
    const result = rootPath ? __privateMethod(_a2 = this.getRoot(rootPath), _resolveParts, resolveParts_fn).call(_a2, dirParts) : __privateMethod(this, _resolveParts, resolveParts_fn).call(this, dirParts);
    return result;
  }
  /**
   * Returns the cached children Path objects, if still available.  If they
   * have fallen out of the cache, then returns an empty array, and resets the
   * READDIR_CALLED bit, so that future calls to readdir() will require an fs
   * lookup.
   *
   * @internal
   */
  children() {
    const cached = __privateGet(this, _children).get(this);
    if (cached) {
      return cached;
    }
    const children = Object.assign([], { provisional: 0 });
    __privateGet(this, _children).set(this, children);
    __privateSet(this, _type, __privateGet(this, _type) & ~READDIR_CALLED);
    return children;
  }
  /**
   * Resolves a path portion and returns or creates the child Path.
   *
   * Returns `this` if pathPart is `''` or `'.'`, or `parent` if pathPart is
   * `'..'`.
   *
   * This should not be called directly.  If `pathPart` contains any path
   * separators, it will lead to unsafe undefined behavior.
   *
   * Use `Path.resolve()` instead.
   *
   * @internal
   */
  child(pathPart, opts) {
    if (pathPart === "" || pathPart === ".") {
      return this;
    }
    if (pathPart === "..") {
      return this.parent || this;
    }
    const children = this.children();
    const name = this.nocase ? normalizeNocase(pathPart) : normalize(pathPart);
    for (const p of children) {
      if (__privateGet(p, _matchName) === name) {
        return p;
      }
    }
    const s = this.parent ? this.sep : "";
    const fullpath = __privateGet(this, _fullpath) ? __privateGet(this, _fullpath) + s + pathPart : void 0;
    const pchild = this.newChild(pathPart, UNKNOWN, {
      ...opts,
      parent: this,
      fullpath
    });
    if (!this.canReaddir()) {
      __privateSet(pchild, _type, __privateGet(pchild, _type) | ENOENT);
    }
    children.push(pchild);
    return pchild;
  }
  /**
   * The relative path from the cwd. If it does not share an ancestor with
   * the cwd, then this ends up being equivalent to the fullpath()
   */
  relative() {
    if (this.isCWD)
      return "";
    if (__privateGet(this, _relative) !== void 0) {
      return __privateGet(this, _relative);
    }
    const name = this.name;
    const p = this.parent;
    if (!p) {
      return __privateSet(this, _relative, this.name);
    }
    const pv = p.relative();
    return pv + (!pv || !p.parent ? "" : this.sep) + name;
  }
  /**
   * The relative path from the cwd, using / as the path separator.
   * If it does not share an ancestor with
   * the cwd, then this ends up being equivalent to the fullpathPosix()
   * On posix systems, this is identical to relative().
   */
  relativePosix() {
    if (this.sep === "/")
      return this.relative();
    if (this.isCWD)
      return "";
    if (__privateGet(this, _relativePosix) !== void 0)
      return __privateGet(this, _relativePosix);
    const name = this.name;
    const p = this.parent;
    if (!p) {
      return __privateSet(this, _relativePosix, this.fullpathPosix());
    }
    const pv = p.relativePosix();
    return pv + (!pv || !p.parent ? "" : "/") + name;
  }
  /**
   * The fully resolved path string for this Path entry
   */
  fullpath() {
    if (__privateGet(this, _fullpath) !== void 0) {
      return __privateGet(this, _fullpath);
    }
    const name = this.name;
    const p = this.parent;
    if (!p) {
      return __privateSet(this, _fullpath, this.name);
    }
    const pv = p.fullpath();
    const fp = pv + (!p.parent ? "" : this.sep) + name;
    return __privateSet(this, _fullpath, fp);
  }
  /**
   * On platforms other than windows, this is identical to fullpath.
   *
   * On windows, this is overridden to return the forward-slash form of the
   * full UNC path.
   */
  fullpathPosix() {
    if (__privateGet(this, _fullpathPosix) !== void 0)
      return __privateGet(this, _fullpathPosix);
    if (this.sep === "/")
      return __privateSet(this, _fullpathPosix, this.fullpath());
    if (!this.parent) {
      const p2 = this.fullpath().replace(/\\/g, "/");
      if (/^[a-z]:\//i.test(p2)) {
        return __privateSet(this, _fullpathPosix, `//?/${p2}`);
      } else {
        return __privateSet(this, _fullpathPosix, p2);
      }
    }
    const p = this.parent;
    const pfpp = p.fullpathPosix();
    const fpp = pfpp + (!pfpp || !p.parent ? "" : "/") + this.name;
    return __privateSet(this, _fullpathPosix, fpp);
  }
  /**
   * Is the Path of an unknown type?
   *
   * Note that we might know *something* about it if there has been a previous
   * filesystem operation, for example that it does not exist, or is not a
   * link, or whether it has child entries.
   */
  isUnknown() {
    return (__privateGet(this, _type) & IFMT) === UNKNOWN;
  }
  isType(type) {
    return this[`is${type}`]();
  }
  getType() {
    return this.isUnknown() ? "Unknown" : this.isDirectory() ? "Directory" : this.isFile() ? "File" : this.isSymbolicLink() ? "SymbolicLink" : this.isFIFO() ? "FIFO" : this.isCharacterDevice() ? "CharacterDevice" : this.isBlockDevice() ? "BlockDevice" : (
      /* c8 ignore start */
      this.isSocket() ? "Socket" : "Unknown"
    );
  }
  /**
   * Is the Path a regular file?
   */
  isFile() {
    return (__privateGet(this, _type) & IFMT) === IFREG;
  }
  /**
   * Is the Path a directory?
   */
  isDirectory() {
    return (__privateGet(this, _type) & IFMT) === IFDIR;
  }
  /**
   * Is the path a character device?
   */
  isCharacterDevice() {
    return (__privateGet(this, _type) & IFMT) === IFCHR;
  }
  /**
   * Is the path a block device?
   */
  isBlockDevice() {
    return (__privateGet(this, _type) & IFMT) === IFBLK;
  }
  /**
   * Is the path a FIFO pipe?
   */
  isFIFO() {
    return (__privateGet(this, _type) & IFMT) === IFIFO;
  }
  /**
   * Is the path a socket?
   */
  isSocket() {
    return (__privateGet(this, _type) & IFMT) === IFSOCK;
  }
  /**
   * Is the path a symbolic link?
   */
  isSymbolicLink() {
    return (__privateGet(this, _type) & IFLNK) === IFLNK;
  }
  /**
   * Return the entry if it has been subject of a successful lstat, or
   * undefined otherwise.
   *
   * Does not read the filesystem, so an undefined result *could* simply
   * mean that we haven't called lstat on it.
   */
  lstatCached() {
    return __privateGet(this, _type) & LSTAT_CALLED ? this : void 0;
  }
  /**
   * Return the cached link target if the entry has been the subject of a
   * successful readlink, or undefined otherwise.
   *
   * Does not read the filesystem, so an undefined result *could* just mean we
   * don't have any cached data. Only use it if you are very sure that a
   * readlink() has been called at some point.
   */
  readlinkCached() {
    return __privateGet(this, _linkTarget);
  }
  /**
   * Returns the cached realpath target if the entry has been the subject
   * of a successful realpath, or undefined otherwise.
   *
   * Does not read the filesystem, so an undefined result *could* just mean we
   * don't have any cached data. Only use it if you are very sure that a
   * realpath() has been called at some point.
   */
  realpathCached() {
    return __privateGet(this, _realpath);
  }
  /**
   * Returns the cached child Path entries array if the entry has been the
   * subject of a successful readdir(), or [] otherwise.
   *
   * Does not read the filesystem, so an empty array *could* just mean we
   * don't have any cached data. Only use it if you are very sure that a
   * readdir() has been called recently enough to still be valid.
   */
  readdirCached() {
    const children = this.children();
    return children.slice(0, children.provisional);
  }
  /**
   * Return true if it's worth trying to readlink.  Ie, we don't (yet) have
   * any indication that readlink will definitely fail.
   *
   * Returns false if the path is known to not be a symlink, if a previous
   * readlink failed, or if the entry does not exist.
   */
  canReadlink() {
    if (__privateGet(this, _linkTarget))
      return true;
    if (!this.parent)
      return false;
    const ifmt = __privateGet(this, _type) & IFMT;
    return !(ifmt !== UNKNOWN && ifmt !== IFLNK || __privateGet(this, _type) & ENOREADLINK || __privateGet(this, _type) & ENOENT);
  }
  /**
   * Return true if readdir has previously been successfully called on this
   * path, indicating that cachedReaddir() is likely valid.
   */
  calledReaddir() {
    return !!(__privateGet(this, _type) & READDIR_CALLED);
  }
  /**
   * Returns true if the path is known to not exist. That is, a previous lstat
   * or readdir failed to verify its existence when that would have been
   * expected, or a parent entry was marked either enoent or enotdir.
   */
  isENOENT() {
    return !!(__privateGet(this, _type) & ENOENT);
  }
  /**
   * Return true if the path is a match for the given path name.  This handles
   * case sensitivity and unicode normalization.
   *
   * Note: even on case-sensitive systems, it is **not** safe to test the
   * equality of the `.name` property to determine whether a given pathname
   * matches, due to unicode normalization mismatches.
   *
   * Always use this method instead of testing the `path.name` property
   * directly.
   */
  isNamed(n) {
    return !this.nocase ? __privateGet(this, _matchName) === normalize(n) : __privateGet(this, _matchName) === normalizeNocase(n);
  }
  /**
   * Return the Path object corresponding to the target of a symbolic link.
   *
   * If the Path is not a symbolic link, or if the readlink call fails for any
   * reason, `undefined` is returned.
   *
   * Result is cached, and thus may be outdated if the filesystem is mutated.
   */
  async readlink() {
    var _a2;
    const target = __privateGet(this, _linkTarget);
    if (target) {
      return target;
    }
    if (!this.canReadlink()) {
      return void 0;
    }
    if (!this.parent) {
      return void 0;
    }
    try {
      const read2 = await __privateGet(this, _fs).promises.readlink(this.fullpath());
      const linkTarget = (_a2 = await this.parent.realpath()) == null ? void 0 : _a2.resolve(read2);
      if (linkTarget) {
        return __privateSet(this, _linkTarget, linkTarget);
      }
    } catch (er) {
      __privateMethod(this, _readlinkFail, readlinkFail_fn).call(this, er.code);
      return void 0;
    }
  }
  /**
   * Synchronous {@link PathBase.readlink}
   */
  readlinkSync() {
    var _a2;
    const target = __privateGet(this, _linkTarget);
    if (target) {
      return target;
    }
    if (!this.canReadlink()) {
      return void 0;
    }
    if (!this.parent) {
      return void 0;
    }
    try {
      const read2 = __privateGet(this, _fs).readlinkSync(this.fullpath());
      const linkTarget = (_a2 = this.parent.realpathSync()) == null ? void 0 : _a2.resolve(read2);
      if (linkTarget) {
        return __privateSet(this, _linkTarget, linkTarget);
      }
    } catch (er) {
      __privateMethod(this, _readlinkFail, readlinkFail_fn).call(this, er.code);
      return void 0;
    }
  }
  /**
   * Call lstat() on this Path, and update all known information that can be
   * determined.
   *
   * Note that unlike `fs.lstat()`, the returned value does not contain some
   * information, such as `mode`, `dev`, `nlink`, and `ino`.  If that
   * information is required, you will need to call `fs.lstat` yourself.
   *
   * If the Path refers to a nonexistent file, or if the lstat call fails for
   * any reason, `undefined` is returned.  Otherwise the updated Path object is
   * returned.
   *
   * Results are cached, and thus may be out of date if the filesystem is
   * mutated.
   */
  async lstat() {
    if ((__privateGet(this, _type) & ENOENT) === 0) {
      try {
        __privateMethod(this, _applyStat, applyStat_fn).call(this, await __privateGet(this, _fs).promises.lstat(this.fullpath()));
        return this;
      } catch (er) {
        __privateMethod(this, _lstatFail, lstatFail_fn).call(this, er.code);
      }
    }
  }
  /**
   * synchronous {@link PathBase.lstat}
   */
  lstatSync() {
    if ((__privateGet(this, _type) & ENOENT) === 0) {
      try {
        __privateMethod(this, _applyStat, applyStat_fn).call(this, __privateGet(this, _fs).lstatSync(this.fullpath()));
        return this;
      } catch (er) {
        __privateMethod(this, _lstatFail, lstatFail_fn).call(this, er.code);
      }
    }
  }
  /**
   * Standard node-style callback interface to get list of directory entries.
   *
   * If the Path cannot or does not contain any children, then an empty array
   * is returned.
   *
   * Results are cached, and thus may be out of date if the filesystem is
   * mutated.
   *
   * @param cb The callback called with (er, entries).  Note that the `er`
   * param is somewhat extraneous, as all readdir() errors are handled and
   * simply result in an empty set of entries being returned.
   * @param allowZalgo Boolean indicating that immediately known results should
   * *not* be deferred with `queueMicrotask`. Defaults to `false`. Release
   * zalgo at your peril, the dark pony lord is devious and unforgiving.
   */
  readdirCB(cb, allowZalgo = false) {
    if (!this.canReaddir()) {
      if (allowZalgo)
        cb(null, []);
      else
        queueMicrotask(() => cb(null, []));
      return;
    }
    const children = this.children();
    if (this.calledReaddir()) {
      const c2 = children.slice(0, children.provisional);
      if (allowZalgo)
        cb(null, c2);
      else
        queueMicrotask(() => cb(null, c2));
      return;
    }
    __privateGet(this, _onReaddirCB).push(cb);
    if (__privateGet(this, _readdirCBInFlight)) {
      return;
    }
    __privateSet(this, _readdirCBInFlight, true);
    const fullpath = this.fullpath();
    __privateGet(this, _fs).readdir(fullpath, { withFileTypes: true }, (er, entries) => {
      if (er) {
        __privateMethod(this, _readdirFail, readdirFail_fn).call(this, er.code);
        children.provisional = 0;
      } else {
        for (const e of entries) {
          __privateMethod(this, _readdirAddChild, readdirAddChild_fn).call(this, e, children);
        }
        __privateMethod(this, _readdirSuccess, readdirSuccess_fn).call(this, children);
      }
      __privateMethod(this, _callOnReaddirCB, callOnReaddirCB_fn).call(this, children.slice(0, children.provisional));
      return;
    });
  }
  /**
   * Return an array of known child entries.
   *
   * If the Path cannot or does not contain any children, then an empty array
   * is returned.
   *
   * Results are cached, and thus may be out of date if the filesystem is
   * mutated.
   */
  async readdir() {
    if (!this.canReaddir()) {
      return [];
    }
    const children = this.children();
    if (this.calledReaddir()) {
      return children.slice(0, children.provisional);
    }
    const fullpath = this.fullpath();
    if (__privateGet(this, _asyncReaddirInFlight)) {
      await __privateGet(this, _asyncReaddirInFlight);
    } else {
      let resolve = () => {
      };
      __privateSet(this, _asyncReaddirInFlight, new Promise((res) => resolve = res));
      try {
        for (const e of await __privateGet(this, _fs).promises.readdir(fullpath, {
          withFileTypes: true
        })) {
          __privateMethod(this, _readdirAddChild, readdirAddChild_fn).call(this, e, children);
        }
        __privateMethod(this, _readdirSuccess, readdirSuccess_fn).call(this, children);
      } catch (er) {
        __privateMethod(this, _readdirFail, readdirFail_fn).call(this, er.code);
        children.provisional = 0;
      }
      __privateSet(this, _asyncReaddirInFlight, void 0);
      resolve();
    }
    return children.slice(0, children.provisional);
  }
  /**
   * synchronous {@link PathBase.readdir}
   */
  readdirSync() {
    if (!this.canReaddir()) {
      return [];
    }
    const children = this.children();
    if (this.calledReaddir()) {
      return children.slice(0, children.provisional);
    }
    const fullpath = this.fullpath();
    try {
      for (const e of __privateGet(this, _fs).readdirSync(fullpath, {
        withFileTypes: true
      })) {
        __privateMethod(this, _readdirAddChild, readdirAddChild_fn).call(this, e, children);
      }
      __privateMethod(this, _readdirSuccess, readdirSuccess_fn).call(this, children);
    } catch (er) {
      __privateMethod(this, _readdirFail, readdirFail_fn).call(this, er.code);
      children.provisional = 0;
    }
    return children.slice(0, children.provisional);
  }
  canReaddir() {
    if (__privateGet(this, _type) & ENOCHILD)
      return false;
    const ifmt = IFMT & __privateGet(this, _type);
    if (!(ifmt === UNKNOWN || ifmt === IFDIR || ifmt === IFLNK)) {
      return false;
    }
    return true;
  }
  shouldWalk(dirs, walkFilter) {
    return (__privateGet(this, _type) & IFDIR) === IFDIR && !(__privateGet(this, _type) & ENOCHILD) && !dirs.has(this) && (!walkFilter || walkFilter(this));
  }
  /**
   * Return the Path object corresponding to path as resolved
   * by realpath(3).
   *
   * If the realpath call fails for any reason, `undefined` is returned.
   *
   * Result is cached, and thus may be outdated if the filesystem is mutated.
   * On success, returns a Path object.
   */
  async realpath() {
    if (__privateGet(this, _realpath))
      return __privateGet(this, _realpath);
    if ((ENOREALPATH | ENOREADLINK | ENOENT) & __privateGet(this, _type))
      return void 0;
    try {
      const rp = await __privateGet(this, _fs).promises.realpath(this.fullpath());
      return __privateSet(this, _realpath, this.resolve(rp));
    } catch (_) {
      __privateMethod(this, _markENOREALPATH, markENOREALPATH_fn).call(this);
    }
  }
  /**
   * Synchronous {@link realpath}
   */
  realpathSync() {
    if (__privateGet(this, _realpath))
      return __privateGet(this, _realpath);
    if ((ENOREALPATH | ENOREADLINK | ENOENT) & __privateGet(this, _type))
      return void 0;
    try {
      const rp = __privateGet(this, _fs).realpathSync(this.fullpath());
      return __privateSet(this, _realpath, this.resolve(rp));
    } catch (_) {
      __privateMethod(this, _markENOREALPATH, markENOREALPATH_fn).call(this);
    }
  }
  /**
   * Internal method to mark this Path object as the scurry cwd,
   * called by {@link PathScurry#chdir}
   *
   * @internal
   */
  [setAsCwd](oldCwd) {
    if (oldCwd === this)
      return;
    oldCwd.isCWD = false;
    this.isCWD = true;
    const changed = /* @__PURE__ */ new Set([]);
    let rp = [];
    let p = this;
    while (p && p.parent) {
      changed.add(p);
      __privateSet(p, _relative, rp.join(this.sep));
      __privateSet(p, _relativePosix, rp.join("/"));
      p = p.parent;
      rp.push("..");
    }
    p = oldCwd;
    while (p && p.parent && !changed.has(p)) {
      __privateSet(p, _relative, void 0);
      __privateSet(p, _relativePosix, void 0);
      p = p.parent;
    }
  }
}
_fs = new WeakMap();
_dev = new WeakMap();
_mode = new WeakMap();
_nlink = new WeakMap();
_uid = new WeakMap();
_gid = new WeakMap();
_rdev = new WeakMap();
_blksize = new WeakMap();
_ino = new WeakMap();
_size2 = new WeakMap();
_blocks = new WeakMap();
_atimeMs = new WeakMap();
_mtimeMs = new WeakMap();
_ctimeMs = new WeakMap();
_birthtimeMs = new WeakMap();
_atime = new WeakMap();
_mtime = new WeakMap();
_ctime = new WeakMap();
_birthtime = new WeakMap();
_matchName = new WeakMap();
_depth = new WeakMap();
_fullpath = new WeakMap();
_fullpathPosix = new WeakMap();
_relative = new WeakMap();
_relativePosix = new WeakMap();
_type = new WeakMap();
_children = new WeakMap();
_linkTarget = new WeakMap();
_realpath = new WeakMap();
_resolveParts = new WeakSet();
resolveParts_fn = function(dirParts) {
  let p = this;
  for (const part of dirParts) {
    p = p.child(part);
  }
  return p;
};
_readdirSuccess = new WeakSet();
readdirSuccess_fn = function(children) {
  var _a2;
  __privateSet(this, _type, __privateGet(this, _type) | READDIR_CALLED);
  for (let p = children.provisional; p < children.length; p++) {
    const c2 = children[p];
    if (c2)
      __privateMethod(_a2 = c2, _markENOENT, markENOENT_fn).call(_a2);
  }
};
_markENOENT = new WeakSet();
markENOENT_fn = function() {
  if (__privateGet(this, _type) & ENOENT)
    return;
  __privateSet(this, _type, (__privateGet(this, _type) | ENOENT) & IFMT_UNKNOWN);
  __privateMethod(this, _markChildrenENOENT, markChildrenENOENT_fn).call(this);
};
_markChildrenENOENT = new WeakSet();
markChildrenENOENT_fn = function() {
  var _a2;
  const children = this.children();
  children.provisional = 0;
  for (const p of children) {
    __privateMethod(_a2 = p, _markENOENT, markENOENT_fn).call(_a2);
  }
};
_markENOREALPATH = new WeakSet();
markENOREALPATH_fn = function() {
  __privateSet(this, _type, __privateGet(this, _type) | ENOREALPATH);
  __privateMethod(this, _markENOTDIR, markENOTDIR_fn).call(this);
};
_markENOTDIR = new WeakSet();
markENOTDIR_fn = function() {
  if (__privateGet(this, _type) & ENOTDIR)
    return;
  let t = __privateGet(this, _type);
  if ((t & IFMT) === IFDIR)
    t &= IFMT_UNKNOWN;
  __privateSet(this, _type, t | ENOTDIR);
  __privateMethod(this, _markChildrenENOENT, markChildrenENOENT_fn).call(this);
};
_readdirFail = new WeakSet();
readdirFail_fn = function(code = "") {
  if (code === "ENOTDIR" || code === "EPERM") {
    __privateMethod(this, _markENOTDIR, markENOTDIR_fn).call(this);
  } else if (code === "ENOENT") {
    __privateMethod(this, _markENOENT, markENOENT_fn).call(this);
  } else {
    this.children().provisional = 0;
  }
};
_lstatFail = new WeakSet();
lstatFail_fn = function(code = "") {
  var _a2;
  if (code === "ENOTDIR") {
    const p = this.parent;
    __privateMethod(_a2 = p, _markENOTDIR, markENOTDIR_fn).call(_a2);
  } else if (code === "ENOENT") {
    __privateMethod(this, _markENOENT, markENOENT_fn).call(this);
  }
};
_readlinkFail = new WeakSet();
readlinkFail_fn = function(code = "") {
  var _a2;
  let ter = __privateGet(this, _type);
  ter |= ENOREADLINK;
  if (code === "ENOENT")
    ter |= ENOENT;
  if (code === "EINVAL" || code === "UNKNOWN") {
    ter &= IFMT_UNKNOWN;
  }
  __privateSet(this, _type, ter);
  if (code === "ENOTDIR" && this.parent) {
    __privateMethod(_a2 = this.parent, _markENOTDIR, markENOTDIR_fn).call(_a2);
  }
};
_readdirAddChild = new WeakSet();
readdirAddChild_fn = function(e, c2) {
  return __privateMethod(this, _readdirMaybePromoteChild, readdirMaybePromoteChild_fn).call(this, e, c2) || __privateMethod(this, _readdirAddNewChild, readdirAddNewChild_fn).call(this, e, c2);
};
_readdirAddNewChild = new WeakSet();
readdirAddNewChild_fn = function(e, c2) {
  const type = entToType(e);
  const child = this.newChild(e.name, type, { parent: this });
  const ifmt = __privateGet(child, _type) & IFMT;
  if (ifmt !== IFDIR && ifmt !== IFLNK && ifmt !== UNKNOWN) {
    __privateSet(child, _type, __privateGet(child, _type) | ENOTDIR);
  }
  c2.unshift(child);
  c2.provisional++;
  return child;
};
_readdirMaybePromoteChild = new WeakSet();
readdirMaybePromoteChild_fn = function(e, c2) {
  for (let p = c2.provisional; p < c2.length; p++) {
    const pchild = c2[p];
    const name = this.nocase ? normalizeNocase(e.name) : normalize(e.name);
    if (name !== __privateGet(pchild, _matchName)) {
      continue;
    }
    return __privateMethod(this, _readdirPromoteChild, readdirPromoteChild_fn).call(this, e, pchild, p, c2);
  }
};
_readdirPromoteChild = new WeakSet();
readdirPromoteChild_fn = function(e, p, index, c2) {
  const v = p.name;
  __privateSet(p, _type, __privateGet(p, _type) & IFMT_UNKNOWN | entToType(e));
  if (v !== e.name)
    p.name = e.name;
  if (index !== c2.provisional) {
    if (index === c2.length - 1)
      c2.pop();
    else
      c2.splice(index, 1);
    c2.unshift(p);
  }
  c2.provisional++;
  return p;
};
_applyStat = new WeakSet();
applyStat_fn = function(st) {
  const { atime, atimeMs, birthtime, birthtimeMs, blksize, blocks, ctime, ctimeMs, dev, gid, ino, mode: mode2, mtime, mtimeMs, nlink, rdev, size, uid } = st;
  __privateSet(this, _atime, atime);
  __privateSet(this, _atimeMs, atimeMs);
  __privateSet(this, _birthtime, birthtime);
  __privateSet(this, _birthtimeMs, birthtimeMs);
  __privateSet(this, _blksize, blksize);
  __privateSet(this, _blocks, blocks);
  __privateSet(this, _ctime, ctime);
  __privateSet(this, _ctimeMs, ctimeMs);
  __privateSet(this, _dev, dev);
  __privateSet(this, _gid, gid);
  __privateSet(this, _ino, ino);
  __privateSet(this, _mode, mode2);
  __privateSet(this, _mtime, mtime);
  __privateSet(this, _mtimeMs, mtimeMs);
  __privateSet(this, _nlink, nlink);
  __privateSet(this, _rdev, rdev);
  __privateSet(this, _size2, size);
  __privateSet(this, _uid, uid);
  const ifmt = entToType(st);
  __privateSet(this, _type, __privateGet(this, _type) & IFMT_UNKNOWN | ifmt | LSTAT_CALLED);
  if (ifmt !== UNKNOWN && ifmt !== IFDIR && ifmt !== IFLNK) {
    __privateSet(this, _type, __privateGet(this, _type) | ENOTDIR);
  }
};
_onReaddirCB = new WeakMap();
_readdirCBInFlight = new WeakMap();
_callOnReaddirCB = new WeakSet();
callOnReaddirCB_fn = function(children) {
  __privateSet(this, _readdirCBInFlight, false);
  const cbs = __privateGet(this, _onReaddirCB).slice();
  __privateGet(this, _onReaddirCB).length = 0;
  cbs.forEach((cb) => cb(null, children));
};
_asyncReaddirInFlight = new WeakMap();
commonjs$3.PathBase = PathBase;
class PathWin32 extends PathBase {
  /**
   * Do not create new Path objects directly.  They should always be accessed
   * via the PathScurry class or other methods on the Path class.
   *
   * @internal
   */
  constructor(name, type = UNKNOWN, root, roots, nocase, children, opts) {
    super(name, type, root, roots, nocase, children, opts);
    /**
     * Separator for generating path strings.
     */
    __publicField(this, "sep", "\\");
    /**
     * Separator for parsing path strings.
     */
    __publicField(this, "splitSep", eitherSep);
  }
  /**
   * @internal
   */
  newChild(name, type = UNKNOWN, opts = {}) {
    return new PathWin32(name, type, this.root, this.roots, this.nocase, this.childrenCache(), opts);
  }
  /**
   * @internal
   */
  getRootString(path2) {
    return node_path_1.win32.parse(path2).root;
  }
  /**
   * @internal
   */
  getRoot(rootPath) {
    rootPath = uncToDrive(rootPath.toUpperCase());
    if (rootPath === this.root.name) {
      return this.root;
    }
    for (const [compare, root] of Object.entries(this.roots)) {
      if (this.sameRoot(rootPath, compare)) {
        return this.roots[rootPath] = root;
      }
    }
    return this.roots[rootPath] = new PathScurryWin32(rootPath, this).root;
  }
  /**
   * @internal
   */
  sameRoot(rootPath, compare = this.root.name) {
    rootPath = rootPath.toUpperCase().replace(/\//g, "\\").replace(uncDriveRegexp, "$1\\");
    return rootPath === compare;
  }
}
commonjs$3.PathWin32 = PathWin32;
class PathPosix extends PathBase {
  /**
   * Do not create new Path objects directly.  They should always be accessed
   * via the PathScurry class or other methods on the Path class.
   *
   * @internal
   */
  constructor(name, type = UNKNOWN, root, roots, nocase, children, opts) {
    super(name, type, root, roots, nocase, children, opts);
    /**
     * separator for parsing path strings
     */
    __publicField(this, "splitSep", "/");
    /**
     * separator for generating path strings
     */
    __publicField(this, "sep", "/");
  }
  /**
   * @internal
   */
  getRootString(path2) {
    return path2.startsWith("/") ? "/" : "";
  }
  /**
   * @internal
   */
  getRoot(_rootPath) {
    return this.root;
  }
  /**
   * @internal
   */
  newChild(name, type = UNKNOWN, opts = {}) {
    return new PathPosix(name, type, this.root, this.roots, this.nocase, this.childrenCache(), opts);
  }
}
commonjs$3.PathPosix = PathPosix;
class PathScurryBase {
  /**
   * This class should not be instantiated directly.
   *
   * Use PathScurryWin32, PathScurryDarwin, PathScurryPosix, or PathScurry
   *
   * @internal
   */
  constructor(cwd = process.cwd(), pathImpl, sep, { nocase, childrenCacheSize = 16 * 1024, fs: fs2 = defaultFS } = {}) {
    /**
     * The root Path entry for the current working directory of this Scurry
     */
    __publicField(this, "root");
    /**
     * The string path for the root of this Scurry's current working directory
     */
    __publicField(this, "rootPath");
    /**
     * A collection of all roots encountered, referenced by rootPath
     */
    __publicField(this, "roots");
    /**
     * The Path entry corresponding to this PathScurry's current working directory.
     */
    __publicField(this, "cwd");
    __privateAdd(this, _resolveCache, void 0);
    __privateAdd(this, _resolvePosixCache, void 0);
    __privateAdd(this, _children2, void 0);
    /**
     * Perform path comparisons case-insensitively.
     *
     * Defaults true on Darwin and Windows systems, false elsewhere.
     */
    __publicField(this, "nocase");
    __privateAdd(this, _fs2, void 0);
    __privateSet(this, _fs2, fsFromOption(fs2));
    if (cwd instanceof URL || cwd.startsWith("file://")) {
      cwd = (0, node_url_1$1.fileURLToPath)(cwd);
    }
    const cwdPath = pathImpl.resolve(cwd);
    this.roots = /* @__PURE__ */ Object.create(null);
    this.rootPath = this.parseRootPath(cwdPath);
    __privateSet(this, _resolveCache, new ResolveCache());
    __privateSet(this, _resolvePosixCache, new ResolveCache());
    __privateSet(this, _children2, new ChildrenCache(childrenCacheSize));
    const split = cwdPath.substring(this.rootPath.length).split(sep);
    if (split.length === 1 && !split[0]) {
      split.pop();
    }
    if (nocase === void 0) {
      throw new TypeError("must provide nocase setting to PathScurryBase ctor");
    }
    this.nocase = nocase;
    this.root = this.newRoot(__privateGet(this, _fs2));
    this.roots[this.rootPath] = this.root;
    let prev = this.root;
    let len = split.length - 1;
    const joinSep = pathImpl.sep;
    let abs = this.rootPath;
    let sawFirst = false;
    for (const part of split) {
      const l = len--;
      prev = prev.child(part, {
        relative: new Array(l).fill("..").join(joinSep),
        relativePosix: new Array(l).fill("..").join("/"),
        fullpath: abs += (sawFirst ? "" : joinSep) + part
      });
      sawFirst = true;
    }
    this.cwd = prev;
  }
  /**
   * Get the depth of a provided path, string, or the cwd
   */
  depth(path2 = this.cwd) {
    if (typeof path2 === "string") {
      path2 = this.cwd.resolve(path2);
    }
    return path2.depth();
  }
  /**
   * Return the cache of child entries.  Exposed so subclasses can create
   * child Path objects in a platform-specific way.
   *
   * @internal
   */
  childrenCache() {
    return __privateGet(this, _children2);
  }
  /**
   * Resolve one or more path strings to a resolved string
   *
   * Same interface as require('path').resolve.
   *
   * Much faster than path.resolve() when called multiple times for the same
   * path, because the resolved Path objects are cached.  Much slower
   * otherwise.
   */
  resolve(...paths) {
    let r = "";
    for (let i = paths.length - 1; i >= 0; i--) {
      const p = paths[i];
      if (!p || p === ".")
        continue;
      r = r ? `${p}/${r}` : p;
      if (this.isAbsolute(p)) {
        break;
      }
    }
    const cached = __privateGet(this, _resolveCache).get(r);
    if (cached !== void 0) {
      return cached;
    }
    const result = this.cwd.resolve(r).fullpath();
    __privateGet(this, _resolveCache).set(r, result);
    return result;
  }
  /**
   * Resolve one or more path strings to a resolved string, returning
   * the posix path.  Identical to .resolve() on posix systems, but on
   * windows will return a forward-slash separated UNC path.
   *
   * Same interface as require('path').resolve.
   *
   * Much faster than path.resolve() when called multiple times for the same
   * path, because the resolved Path objects are cached.  Much slower
   * otherwise.
   */
  resolvePosix(...paths) {
    let r = "";
    for (let i = paths.length - 1; i >= 0; i--) {
      const p = paths[i];
      if (!p || p === ".")
        continue;
      r = r ? `${p}/${r}` : p;
      if (this.isAbsolute(p)) {
        break;
      }
    }
    const cached = __privateGet(this, _resolvePosixCache).get(r);
    if (cached !== void 0) {
      return cached;
    }
    const result = this.cwd.resolve(r).fullpathPosix();
    __privateGet(this, _resolvePosixCache).set(r, result);
    return result;
  }
  /**
   * find the relative path from the cwd to the supplied path string or entry
   */
  relative(entry = this.cwd) {
    if (typeof entry === "string") {
      entry = this.cwd.resolve(entry);
    }
    return entry.relative();
  }
  /**
   * find the relative path from the cwd to the supplied path string or
   * entry, using / as the path delimiter, even on Windows.
   */
  relativePosix(entry = this.cwd) {
    if (typeof entry === "string") {
      entry = this.cwd.resolve(entry);
    }
    return entry.relativePosix();
  }
  /**
   * Return the basename for the provided string or Path object
   */
  basename(entry = this.cwd) {
    if (typeof entry === "string") {
      entry = this.cwd.resolve(entry);
    }
    return entry.name;
  }
  /**
   * Return the dirname for the provided string or Path object
   */
  dirname(entry = this.cwd) {
    if (typeof entry === "string") {
      entry = this.cwd.resolve(entry);
    }
    return (entry.parent || entry).fullpath();
  }
  async readdir(entry = this.cwd, opts = {
    withFileTypes: true
  }) {
    if (typeof entry === "string") {
      entry = this.cwd.resolve(entry);
    } else if (!(entry instanceof PathBase)) {
      opts = entry;
      entry = this.cwd;
    }
    const { withFileTypes } = opts;
    if (!entry.canReaddir()) {
      return [];
    } else {
      const p = await entry.readdir();
      return withFileTypes ? p : p.map((e) => e.name);
    }
  }
  readdirSync(entry = this.cwd, opts = {
    withFileTypes: true
  }) {
    if (typeof entry === "string") {
      entry = this.cwd.resolve(entry);
    } else if (!(entry instanceof PathBase)) {
      opts = entry;
      entry = this.cwd;
    }
    const { withFileTypes = true } = opts;
    if (!entry.canReaddir()) {
      return [];
    } else if (withFileTypes) {
      return entry.readdirSync();
    } else {
      return entry.readdirSync().map((e) => e.name);
    }
  }
  /**
   * Call lstat() on the string or Path object, and update all known
   * information that can be determined.
   *
   * Note that unlike `fs.lstat()`, the returned value does not contain some
   * information, such as `mode`, `dev`, `nlink`, and `ino`.  If that
   * information is required, you will need to call `fs.lstat` yourself.
   *
   * If the Path refers to a nonexistent file, or if the lstat call fails for
   * any reason, `undefined` is returned.  Otherwise the updated Path object is
   * returned.
   *
   * Results are cached, and thus may be out of date if the filesystem is
   * mutated.
   */
  async lstat(entry = this.cwd) {
    if (typeof entry === "string") {
      entry = this.cwd.resolve(entry);
    }
    return entry.lstat();
  }
  /**
   * synchronous {@link PathScurryBase.lstat}
   */
  lstatSync(entry = this.cwd) {
    if (typeof entry === "string") {
      entry = this.cwd.resolve(entry);
    }
    return entry.lstatSync();
  }
  async readlink(entry = this.cwd, { withFileTypes } = {
    withFileTypes: false
  }) {
    if (typeof entry === "string") {
      entry = this.cwd.resolve(entry);
    } else if (!(entry instanceof PathBase)) {
      withFileTypes = entry.withFileTypes;
      entry = this.cwd;
    }
    const e = await entry.readlink();
    return withFileTypes ? e : e == null ? void 0 : e.fullpath();
  }
  readlinkSync(entry = this.cwd, { withFileTypes } = {
    withFileTypes: false
  }) {
    if (typeof entry === "string") {
      entry = this.cwd.resolve(entry);
    } else if (!(entry instanceof PathBase)) {
      withFileTypes = entry.withFileTypes;
      entry = this.cwd;
    }
    const e = entry.readlinkSync();
    return withFileTypes ? e : e == null ? void 0 : e.fullpath();
  }
  async realpath(entry = this.cwd, { withFileTypes } = {
    withFileTypes: false
  }) {
    if (typeof entry === "string") {
      entry = this.cwd.resolve(entry);
    } else if (!(entry instanceof PathBase)) {
      withFileTypes = entry.withFileTypes;
      entry = this.cwd;
    }
    const e = await entry.realpath();
    return withFileTypes ? e : e == null ? void 0 : e.fullpath();
  }
  realpathSync(entry = this.cwd, { withFileTypes } = {
    withFileTypes: false
  }) {
    if (typeof entry === "string") {
      entry = this.cwd.resolve(entry);
    } else if (!(entry instanceof PathBase)) {
      withFileTypes = entry.withFileTypes;
      entry = this.cwd;
    }
    const e = entry.realpathSync();
    return withFileTypes ? e : e == null ? void 0 : e.fullpath();
  }
  async walk(entry = this.cwd, opts = {}) {
    if (typeof entry === "string") {
      entry = this.cwd.resolve(entry);
    } else if (!(entry instanceof PathBase)) {
      opts = entry;
      entry = this.cwd;
    }
    const { withFileTypes = true, follow = false, filter, walkFilter } = opts;
    const results = [];
    if (!filter || filter(entry)) {
      results.push(withFileTypes ? entry : entry.fullpath());
    }
    const dirs = /* @__PURE__ */ new Set();
    const walk = (dir2, cb) => {
      dirs.add(dir2);
      dir2.readdirCB((er, entries) => {
        if (er) {
          return cb(er);
        }
        let len = entries.length;
        if (!len)
          return cb();
        const next = () => {
          if (--len === 0) {
            cb();
          }
        };
        for (const e of entries) {
          if (!filter || filter(e)) {
            results.push(withFileTypes ? e : e.fullpath());
          }
          if (follow && e.isSymbolicLink()) {
            e.realpath().then((r) => (r == null ? void 0 : r.isUnknown()) ? r.lstat() : r).then((r) => (r == null ? void 0 : r.shouldWalk(dirs, walkFilter)) ? walk(r, next) : next());
          } else {
            if (e.shouldWalk(dirs, walkFilter)) {
              walk(e, next);
            } else {
              next();
            }
          }
        }
      }, true);
    };
    const start = entry;
    return new Promise((res, rej) => {
      walk(start, (er) => {
        if (er)
          return rej(er);
        res(results);
      });
    });
  }
  walkSync(entry = this.cwd, opts = {}) {
    if (typeof entry === "string") {
      entry = this.cwd.resolve(entry);
    } else if (!(entry instanceof PathBase)) {
      opts = entry;
      entry = this.cwd;
    }
    const { withFileTypes = true, follow = false, filter, walkFilter } = opts;
    const results = [];
    if (!filter || filter(entry)) {
      results.push(withFileTypes ? entry : entry.fullpath());
    }
    const dirs = /* @__PURE__ */ new Set([entry]);
    for (const dir2 of dirs) {
      const entries = dir2.readdirSync();
      for (const e of entries) {
        if (!filter || filter(e)) {
          results.push(withFileTypes ? e : e.fullpath());
        }
        let r = e;
        if (e.isSymbolicLink()) {
          if (!(follow && (r = e.realpathSync())))
            continue;
          if (r.isUnknown())
            r.lstatSync();
        }
        if (r.shouldWalk(dirs, walkFilter)) {
          dirs.add(r);
        }
      }
    }
    return results;
  }
  /**
   * Support for `for await`
   *
   * Alias for {@link PathScurryBase.iterate}
   *
   * Note: As of Node 19, this is very slow, compared to other methods of
   * walking.  Consider using {@link PathScurryBase.stream} if memory overhead
   * and backpressure are concerns, or {@link PathScurryBase.walk} if not.
   */
  [Symbol.asyncIterator]() {
    return this.iterate();
  }
  iterate(entry = this.cwd, options = {}) {
    if (typeof entry === "string") {
      entry = this.cwd.resolve(entry);
    } else if (!(entry instanceof PathBase)) {
      options = entry;
      entry = this.cwd;
    }
    return this.stream(entry, options)[Symbol.asyncIterator]();
  }
  /**
   * Iterating over a PathScurry performs a synchronous walk.
   *
   * Alias for {@link PathScurryBase.iterateSync}
   */
  [Symbol.iterator]() {
    return this.iterateSync();
  }
  *iterateSync(entry = this.cwd, opts = {}) {
    if (typeof entry === "string") {
      entry = this.cwd.resolve(entry);
    } else if (!(entry instanceof PathBase)) {
      opts = entry;
      entry = this.cwd;
    }
    const { withFileTypes = true, follow = false, filter, walkFilter } = opts;
    if (!filter || filter(entry)) {
      yield withFileTypes ? entry : entry.fullpath();
    }
    const dirs = /* @__PURE__ */ new Set([entry]);
    for (const dir2 of dirs) {
      const entries = dir2.readdirSync();
      for (const e of entries) {
        if (!filter || filter(e)) {
          yield withFileTypes ? e : e.fullpath();
        }
        let r = e;
        if (e.isSymbolicLink()) {
          if (!(follow && (r = e.realpathSync())))
            continue;
          if (r.isUnknown())
            r.lstatSync();
        }
        if (r.shouldWalk(dirs, walkFilter)) {
          dirs.add(r);
        }
      }
    }
  }
  stream(entry = this.cwd, opts = {}) {
    if (typeof entry === "string") {
      entry = this.cwd.resolve(entry);
    } else if (!(entry instanceof PathBase)) {
      opts = entry;
      entry = this.cwd;
    }
    const { withFileTypes = true, follow = false, filter, walkFilter } = opts;
    const results = new minipass_1$1.Minipass({ objectMode: true });
    if (!filter || filter(entry)) {
      results.write(withFileTypes ? entry : entry.fullpath());
    }
    const dirs = /* @__PURE__ */ new Set();
    const queue = [entry];
    let processing = 0;
    const process2 = () => {
      let paused = false;
      while (!paused) {
        const dir2 = queue.shift();
        if (!dir2) {
          if (processing === 0)
            results.end();
          return;
        }
        processing++;
        dirs.add(dir2);
        const onReaddir = (er, entries, didRealpaths = false) => {
          if (er)
            return results.emit("error", er);
          if (follow && !didRealpaths) {
            const promises = [];
            for (const e of entries) {
              if (e.isSymbolicLink()) {
                promises.push(e.realpath().then((r) => (r == null ? void 0 : r.isUnknown()) ? r.lstat() : r));
              }
            }
            if (promises.length) {
              Promise.all(promises).then(() => onReaddir(null, entries, true));
              return;
            }
          }
          for (const e of entries) {
            if (e && (!filter || filter(e))) {
              if (!results.write(withFileTypes ? e : e.fullpath())) {
                paused = true;
              }
            }
          }
          processing--;
          for (const e of entries) {
            const r = e.realpathCached() || e;
            if (r.shouldWalk(dirs, walkFilter)) {
              queue.push(r);
            }
          }
          if (paused && !results.flowing) {
            results.once("drain", process2);
          } else if (!sync) {
            process2();
          }
        };
        let sync = true;
        dir2.readdirCB(onReaddir, true);
        sync = false;
      }
    };
    process2();
    return results;
  }
  streamSync(entry = this.cwd, opts = {}) {
    if (typeof entry === "string") {
      entry = this.cwd.resolve(entry);
    } else if (!(entry instanceof PathBase)) {
      opts = entry;
      entry = this.cwd;
    }
    const { withFileTypes = true, follow = false, filter, walkFilter } = opts;
    const results = new minipass_1$1.Minipass({ objectMode: true });
    const dirs = /* @__PURE__ */ new Set();
    if (!filter || filter(entry)) {
      results.write(withFileTypes ? entry : entry.fullpath());
    }
    const queue = [entry];
    let processing = 0;
    const process2 = () => {
      let paused = false;
      while (!paused) {
        const dir2 = queue.shift();
        if (!dir2) {
          if (processing === 0)
            results.end();
          return;
        }
        processing++;
        dirs.add(dir2);
        const entries = dir2.readdirSync();
        for (const e of entries) {
          if (!filter || filter(e)) {
            if (!results.write(withFileTypes ? e : e.fullpath())) {
              paused = true;
            }
          }
        }
        processing--;
        for (const e of entries) {
          let r = e;
          if (e.isSymbolicLink()) {
            if (!(follow && (r = e.realpathSync())))
              continue;
            if (r.isUnknown())
              r.lstatSync();
          }
          if (r.shouldWalk(dirs, walkFilter)) {
            queue.push(r);
          }
        }
      }
      if (paused && !results.flowing)
        results.once("drain", process2);
    };
    process2();
    return results;
  }
  chdir(path2 = this.cwd) {
    const oldCwd = this.cwd;
    this.cwd = typeof path2 === "string" ? this.cwd.resolve(path2) : path2;
    this.cwd[setAsCwd](oldCwd);
  }
}
_resolveCache = new WeakMap();
_resolvePosixCache = new WeakMap();
_children2 = new WeakMap();
_fs2 = new WeakMap();
commonjs$3.PathScurryBase = PathScurryBase;
class PathScurryWin32 extends PathScurryBase {
  constructor(cwd = process.cwd(), opts = {}) {
    const { nocase = true } = opts;
    super(cwd, node_path_1.win32, "\\", { ...opts, nocase });
    /**
     * separator for generating path strings
     */
    __publicField(this, "sep", "\\");
    this.nocase = nocase;
    for (let p = this.cwd; p; p = p.parent) {
      p.nocase = this.nocase;
    }
  }
  /**
   * @internal
   */
  parseRootPath(dir2) {
    return node_path_1.win32.parse(dir2).root.toUpperCase();
  }
  /**
   * @internal
   */
  newRoot(fs2) {
    return new PathWin32(this.rootPath, IFDIR, void 0, this.roots, this.nocase, this.childrenCache(), { fs: fs2 });
  }
  /**
   * Return true if the provided path string is an absolute path
   */
  isAbsolute(p) {
    return p.startsWith("/") || p.startsWith("\\") || /^[a-z]:(\/|\\)/i.test(p);
  }
}
commonjs$3.PathScurryWin32 = PathScurryWin32;
class PathScurryPosix extends PathScurryBase {
  constructor(cwd = process.cwd(), opts = {}) {
    const { nocase = false } = opts;
    super(cwd, node_path_1.posix, "/", { ...opts, nocase });
    /**
     * separator for generating path strings
     */
    __publicField(this, "sep", "/");
    this.nocase = nocase;
  }
  /**
   * @internal
   */
  parseRootPath(_dir) {
    return "/";
  }
  /**
   * @internal
   */
  newRoot(fs2) {
    return new PathPosix(this.rootPath, IFDIR, void 0, this.roots, this.nocase, this.childrenCache(), { fs: fs2 });
  }
  /**
   * Return true if the provided path string is an absolute path
   */
  isAbsolute(p) {
    return p.startsWith("/");
  }
}
commonjs$3.PathScurryPosix = PathScurryPosix;
class PathScurryDarwin extends PathScurryPosix {
  constructor(cwd = process.cwd(), opts = {}) {
    const { nocase = true } = opts;
    super(cwd, { ...opts, nocase });
  }
}
commonjs$3.PathScurryDarwin = PathScurryDarwin;
commonjs$3.Path = process.platform === "win32" ? PathWin32 : PathPosix;
commonjs$3.PathScurry = process.platform === "win32" ? PathScurryWin32 : process.platform === "darwin" ? PathScurryDarwin : PathScurryPosix;
var pattern = {};
Object.defineProperty(pattern, "__esModule", { value: true });
pattern.Pattern = void 0;
const minimatch_1$5 = commonjs$4;
const isPatternList = (pl) => pl.length >= 1;
const isGlobList = (gl) => gl.length >= 1;
const _Pattern = class _Pattern {
  constructor(patternList, globList, index, platform2) {
    __privateAdd(this, _patternList, void 0);
    __privateAdd(this, _globList, void 0);
    __privateAdd(this, _index, void 0);
    __publicField(this, "length");
    __privateAdd(this, _platform, void 0);
    __privateAdd(this, _rest, void 0);
    __privateAdd(this, _globString, void 0);
    __privateAdd(this, _isDrive, void 0);
    __privateAdd(this, _isUNC, void 0);
    __privateAdd(this, _isAbsolute, void 0);
    __privateAdd(this, _followGlobstar, true);
    if (!isPatternList(patternList)) {
      throw new TypeError("empty pattern list");
    }
    if (!isGlobList(globList)) {
      throw new TypeError("empty glob list");
    }
    if (globList.length !== patternList.length) {
      throw new TypeError("mismatched pattern list and glob list lengths");
    }
    this.length = patternList.length;
    if (index < 0 || index >= this.length) {
      throw new TypeError("index out of range");
    }
    __privateSet(this, _patternList, patternList);
    __privateSet(this, _globList, globList);
    __privateSet(this, _index, index);
    __privateSet(this, _platform, platform2);
    if (__privateGet(this, _index) === 0) {
      if (this.isUNC()) {
        const [p0, p1, p2, p3, ...prest] = __privateGet(this, _patternList);
        const [g0, g1, g2, g3, ...grest] = __privateGet(this, _globList);
        if (prest[0] === "") {
          prest.shift();
          grest.shift();
        }
        const p = [p0, p1, p2, p3, ""].join("/");
        const g = [g0, g1, g2, g3, ""].join("/");
        __privateSet(this, _patternList, [p, ...prest]);
        __privateSet(this, _globList, [g, ...grest]);
        this.length = __privateGet(this, _patternList).length;
      } else if (this.isDrive() || this.isAbsolute()) {
        const [p1, ...prest] = __privateGet(this, _patternList);
        const [g1, ...grest] = __privateGet(this, _globList);
        if (prest[0] === "") {
          prest.shift();
          grest.shift();
        }
        const p = p1 + "/";
        const g = g1 + "/";
        __privateSet(this, _patternList, [p, ...prest]);
        __privateSet(this, _globList, [g, ...grest]);
        this.length = __privateGet(this, _patternList).length;
      }
    }
  }
  /**
   * The first entry in the parsed list of patterns
   */
  pattern() {
    return __privateGet(this, _patternList)[__privateGet(this, _index)];
  }
  /**
   * true of if pattern() returns a string
   */
  isString() {
    return typeof __privateGet(this, _patternList)[__privateGet(this, _index)] === "string";
  }
  /**
   * true of if pattern() returns GLOBSTAR
   */
  isGlobstar() {
    return __privateGet(this, _patternList)[__privateGet(this, _index)] === minimatch_1$5.GLOBSTAR;
  }
  /**
   * true if pattern() returns a regexp
   */
  isRegExp() {
    return __privateGet(this, _patternList)[__privateGet(this, _index)] instanceof RegExp;
  }
  /**
   * The /-joined set of glob parts that make up this pattern
   */
  globString() {
    return __privateSet(this, _globString, __privateGet(this, _globString) || (__privateGet(this, _index) === 0 ? this.isAbsolute() ? __privateGet(this, _globList)[0] + __privateGet(this, _globList).slice(1).join("/") : __privateGet(this, _globList).join("/") : __privateGet(this, _globList).slice(__privateGet(this, _index)).join("/")));
  }
  /**
   * true if there are more pattern parts after this one
   */
  hasMore() {
    return this.length > __privateGet(this, _index) + 1;
  }
  /**
   * The rest of the pattern after this part, or null if this is the end
   */
  rest() {
    if (__privateGet(this, _rest) !== void 0)
      return __privateGet(this, _rest);
    if (!this.hasMore())
      return __privateSet(this, _rest, null);
    __privateSet(this, _rest, new _Pattern(__privateGet(this, _patternList), __privateGet(this, _globList), __privateGet(this, _index) + 1, __privateGet(this, _platform)));
    __privateSet(__privateGet(this, _rest), _isAbsolute, __privateGet(this, _isAbsolute));
    __privateSet(__privateGet(this, _rest), _isUNC, __privateGet(this, _isUNC));
    __privateSet(__privateGet(this, _rest), _isDrive, __privateGet(this, _isDrive));
    return __privateGet(this, _rest);
  }
  /**
   * true if the pattern represents a //unc/path/ on windows
   */
  isUNC() {
    const pl = __privateGet(this, _patternList);
    return __privateGet(this, _isUNC) !== void 0 ? __privateGet(this, _isUNC) : __privateSet(this, _isUNC, __privateGet(this, _platform) === "win32" && __privateGet(this, _index) === 0 && pl[0] === "" && pl[1] === "" && typeof pl[2] === "string" && !!pl[2] && typeof pl[3] === "string" && !!pl[3]);
  }
  // pattern like C:/...
  // split = ['C:', ...]
  // XXX: would be nice to handle patterns like `c:*` to test the cwd
  // in c: for *, but I don't know of a way to even figure out what that
  // cwd is without actually chdir'ing into it?
  /**
   * True if the pattern starts with a drive letter on Windows
   */
  isDrive() {
    const pl = __privateGet(this, _patternList);
    return __privateGet(this, _isDrive) !== void 0 ? __privateGet(this, _isDrive) : __privateSet(this, _isDrive, __privateGet(this, _platform) === "win32" && __privateGet(this, _index) === 0 && this.length > 1 && typeof pl[0] === "string" && /^[a-z]:$/i.test(pl[0]));
  }
  // pattern = '/' or '/...' or '/x/...'
  // split = ['', ''] or ['', ...] or ['', 'x', ...]
  // Drive and UNC both considered absolute on windows
  /**
   * True if the pattern is rooted on an absolute path
   */
  isAbsolute() {
    const pl = __privateGet(this, _patternList);
    return __privateGet(this, _isAbsolute) !== void 0 ? __privateGet(this, _isAbsolute) : __privateSet(this, _isAbsolute, pl[0] === "" && pl.length > 1 || this.isDrive() || this.isUNC());
  }
  /**
   * consume the root of the pattern, and return it
   */
  root() {
    const p = __privateGet(this, _patternList)[0];
    return typeof p === "string" && this.isAbsolute() && __privateGet(this, _index) === 0 ? p : "";
  }
  /**
   * Check to see if the current globstar pattern is allowed to follow
   * a symbolic link.
   */
  checkFollowGlobstar() {
    return !(__privateGet(this, _index) === 0 || !this.isGlobstar() || !__privateGet(this, _followGlobstar));
  }
  /**
   * Mark that the current globstar pattern is following a symbolic link
   */
  markFollowGlobstar() {
    if (__privateGet(this, _index) === 0 || !this.isGlobstar() || !__privateGet(this, _followGlobstar))
      return false;
    __privateSet(this, _followGlobstar, false);
    return true;
  }
};
_patternList = new WeakMap();
_globList = new WeakMap();
_index = new WeakMap();
_platform = new WeakMap();
_rest = new WeakMap();
_globString = new WeakMap();
_isDrive = new WeakMap();
_isUNC = new WeakMap();
_isAbsolute = new WeakMap();
_followGlobstar = new WeakMap();
let Pattern = _Pattern;
pattern.Pattern = Pattern;
var walker = {};
var commonjs = {};
(function(exports) {
  var _a2, _b2, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s;
  var __importDefault2 = commonjsGlobal && commonjsGlobal.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Minipass = exports.isWritable = exports.isReadable = exports.isStream = void 0;
  const proc = typeof process === "object" && process ? process : {
    stdout: null,
    stderr: null
  };
  const node_events_1 = require$$0;
  const node_stream_1 = __importDefault2(require$$1);
  const node_string_decoder_1 = require$$2;
  const isStream = (s) => !!s && typeof s === "object" && (s instanceof Minipass || s instanceof node_stream_1.default || (0, exports.isReadable)(s) || (0, exports.isWritable)(s));
  exports.isStream = isStream;
  const isReadable = (s) => !!s && typeof s === "object" && s instanceof node_events_1.EventEmitter && typeof s.pipe === "function" && // node core Writable streams have a pipe() method, but it throws
  s.pipe !== node_stream_1.default.Writable.prototype.pipe;
  exports.isReadable = isReadable;
  const isWritable = (s) => !!s && typeof s === "object" && s instanceof node_events_1.EventEmitter && typeof s.write === "function" && typeof s.end === "function";
  exports.isWritable = isWritable;
  const EOF = Symbol("EOF");
  const MAYBE_EMIT_END = Symbol("maybeEmitEnd");
  const EMITTED_END = Symbol("emittedEnd");
  const EMITTING_END = Symbol("emittingEnd");
  const EMITTED_ERROR = Symbol("emittedError");
  const CLOSED = Symbol("closed");
  const READ = Symbol("read");
  const FLUSH = Symbol("flush");
  const FLUSHCHUNK = Symbol("flushChunk");
  const ENCODING = Symbol("encoding");
  const DECODER = Symbol("decoder");
  const FLOWING = Symbol("flowing");
  const PAUSED = Symbol("paused");
  const RESUME = Symbol("resume");
  const BUFFER = Symbol("buffer");
  const PIPES = Symbol("pipes");
  const BUFFERLENGTH = Symbol("bufferLength");
  const BUFFERPUSH = Symbol("bufferPush");
  const BUFFERSHIFT = Symbol("bufferShift");
  const OBJECTMODE = Symbol("objectMode");
  const DESTROYED = Symbol("destroyed");
  const ERROR = Symbol("error");
  const EMITDATA = Symbol("emitData");
  const EMITEND = Symbol("emitEnd");
  const EMITEND2 = Symbol("emitEnd2");
  const ASYNC = Symbol("async");
  const ABORT = Symbol("abort");
  const ABORTED = Symbol("aborted");
  const SIGNAL = Symbol("signal");
  const DATALISTENERS = Symbol("dataListeners");
  const DISCARDED = Symbol("discarded");
  const defer = (fn) => Promise.resolve().then(fn);
  const nodefer = (fn) => fn();
  const isEndish = (ev) => ev === "end" || ev === "finish" || ev === "prefinish";
  const isArrayBufferLike = (b) => b instanceof ArrayBuffer || !!b && typeof b === "object" && b.constructor && b.constructor.name === "ArrayBuffer" && b.byteLength >= 0;
  const isArrayBufferView = (b) => !Buffer.isBuffer(b) && ArrayBuffer.isView(b);
  class Pipe {
    constructor(src, dest, opts) {
      __publicField(this, "src");
      __publicField(this, "dest");
      __publicField(this, "opts");
      __publicField(this, "ondrain");
      this.src = src;
      this.dest = dest;
      this.opts = opts;
      this.ondrain = () => src[RESUME]();
      this.dest.on("drain", this.ondrain);
    }
    unpipe() {
      this.dest.removeListener("drain", this.ondrain);
    }
    // only here for the prototype
    /* c8 ignore start */
    proxyErrors(_er) {
    }
    /* c8 ignore stop */
    end() {
      this.unpipe();
      if (this.opts.end)
        this.dest.end();
    }
  }
  class PipeProxyErrors extends Pipe {
    unpipe() {
      this.src.removeListener("error", this.proxyErrors);
      super.unpipe();
    }
    constructor(src, dest, opts) {
      super(src, dest, opts);
      this.proxyErrors = (er) => dest.emit("error", er);
      src.on("error", this.proxyErrors);
    }
  }
  const isObjectModeOptions = (o) => !!o.objectMode;
  const isEncodingOptions = (o) => !o.objectMode && !!o.encoding && o.encoding !== "buffer";
  class Minipass extends node_events_1.EventEmitter {
    /**
     * If `RType` is Buffer, then options do not need to be provided.
     * Otherwise, an options object must be provided to specify either
     * {@link Minipass.SharedOptions.objectMode} or
     * {@link Minipass.SharedOptions.encoding}, as appropriate.
     */
    constructor(...args) {
      const options = args[0] || {};
      super();
      __publicField(this, _a2, false);
      __publicField(this, _b2, false);
      __publicField(this, _c, []);
      __publicField(this, _d, []);
      __publicField(this, _e);
      __publicField(this, _f);
      __publicField(this, _g);
      __publicField(this, _h);
      __publicField(this, _i, false);
      __publicField(this, _j, false);
      __publicField(this, _k, false);
      __publicField(this, _l, false);
      __publicField(this, _m, null);
      __publicField(this, _n, 0);
      __publicField(this, _o, false);
      __publicField(this, _p);
      __publicField(this, _q, false);
      __publicField(this, _r, 0);
      __publicField(this, _s, false);
      /**
       * true if the stream can be written
       */
      __publicField(this, "writable", true);
      /**
       * true if the stream can be read
       */
      __publicField(this, "readable", true);
      if (options.objectMode && typeof options.encoding === "string") {
        throw new TypeError("Encoding and objectMode may not be used together");
      }
      if (isObjectModeOptions(options)) {
        this[OBJECTMODE] = true;
        this[ENCODING] = null;
      } else if (isEncodingOptions(options)) {
        this[ENCODING] = options.encoding;
        this[OBJECTMODE] = false;
      } else {
        this[OBJECTMODE] = false;
        this[ENCODING] = null;
      }
      this[ASYNC] = !!options.async;
      this[DECODER] = this[ENCODING] ? new node_string_decoder_1.StringDecoder(this[ENCODING]) : null;
      if (options && options.debugExposeBuffer === true) {
        Object.defineProperty(this, "buffer", { get: () => this[BUFFER] });
      }
      if (options && options.debugExposePipes === true) {
        Object.defineProperty(this, "pipes", { get: () => this[PIPES] });
      }
      const { signal } = options;
      if (signal) {
        this[SIGNAL] = signal;
        if (signal.aborted) {
          this[ABORT]();
        } else {
          signal.addEventListener("abort", () => this[ABORT]());
        }
      }
    }
    /**
     * The amount of data stored in the buffer waiting to be read.
     *
     * For Buffer strings, this will be the total byte length.
     * For string encoding streams, this will be the string character length,
     * according to JavaScript's `string.length` logic.
     * For objectMode streams, this is a count of the items waiting to be
     * emitted.
     */
    get bufferLength() {
      return this[BUFFERLENGTH];
    }
    /**
     * The `BufferEncoding` currently in use, or `null`
     */
    get encoding() {
      return this[ENCODING];
    }
    /**
     * @deprecated - This is a read only property
     */
    set encoding(_enc) {
      throw new Error("Encoding must be set at instantiation time");
    }
    /**
     * @deprecated - Encoding may only be set at instantiation time
     */
    setEncoding(_enc) {
      throw new Error("Encoding must be set at instantiation time");
    }
    /**
     * True if this is an objectMode stream
     */
    get objectMode() {
      return this[OBJECTMODE];
    }
    /**
     * @deprecated - This is a read-only property
     */
    set objectMode(_om) {
      throw new Error("objectMode must be set at instantiation time");
    }
    /**
     * true if this is an async stream
     */
    get ["async"]() {
      return this[ASYNC];
    }
    /**
     * Set to true to make this stream async.
     *
     * Once set, it cannot be unset, as this would potentially cause incorrect
     * behavior.  Ie, a sync stream can be made async, but an async stream
     * cannot be safely made sync.
     */
    set ["async"](a) {
      this[ASYNC] = this[ASYNC] || !!a;
    }
    // drop everything and get out of the flow completely
    [(_a2 = FLOWING, _b2 = PAUSED, _c = PIPES, _d = BUFFER, _e = OBJECTMODE, _f = ENCODING, _g = ASYNC, _h = DECODER, _i = EOF, _j = EMITTED_END, _k = EMITTING_END, _l = CLOSED, _m = EMITTED_ERROR, _n = BUFFERLENGTH, _o = DESTROYED, _p = SIGNAL, _q = ABORTED, _r = DATALISTENERS, _s = DISCARDED, ABORT)]() {
      var _a3, _b3;
      this[ABORTED] = true;
      this.emit("abort", (_a3 = this[SIGNAL]) == null ? void 0 : _a3.reason);
      this.destroy((_b3 = this[SIGNAL]) == null ? void 0 : _b3.reason);
    }
    /**
     * True if the stream has been aborted.
     */
    get aborted() {
      return this[ABORTED];
    }
    /**
     * No-op setter. Stream aborted status is set via the AbortSignal provided
     * in the constructor options.
     */
    set aborted(_) {
    }
    write(chunk, encoding, cb) {
      var _a3;
      if (this[ABORTED])
        return false;
      if (this[EOF])
        throw new Error("write after end");
      if (this[DESTROYED]) {
        this.emit("error", Object.assign(new Error("Cannot call write after a stream was destroyed"), { code: "ERR_STREAM_DESTROYED" }));
        return true;
      }
      if (typeof encoding === "function") {
        cb = encoding;
        encoding = "utf8";
      }
      if (!encoding)
        encoding = "utf8";
      const fn = this[ASYNC] ? defer : nodefer;
      if (!this[OBJECTMODE] && !Buffer.isBuffer(chunk)) {
        if (isArrayBufferView(chunk)) {
          chunk = Buffer.from(chunk.buffer, chunk.byteOffset, chunk.byteLength);
        } else if (isArrayBufferLike(chunk)) {
          chunk = Buffer.from(chunk);
        } else if (typeof chunk !== "string") {
          throw new Error("Non-contiguous data written to non-objectMode stream");
        }
      }
      if (this[OBJECTMODE]) {
        if (this[FLOWING] && this[BUFFERLENGTH] !== 0)
          this[FLUSH](true);
        if (this[FLOWING])
          this.emit("data", chunk);
        else
          this[BUFFERPUSH](chunk);
        if (this[BUFFERLENGTH] !== 0)
          this.emit("readable");
        if (cb)
          fn(cb);
        return this[FLOWING];
      }
      if (!chunk.length) {
        if (this[BUFFERLENGTH] !== 0)
          this.emit("readable");
        if (cb)
          fn(cb);
        return this[FLOWING];
      }
      if (typeof chunk === "string" && // unless it is a string already ready for us to use
      !(encoding === this[ENCODING] && !((_a3 = this[DECODER]) == null ? void 0 : _a3.lastNeed))) {
        chunk = Buffer.from(chunk, encoding);
      }
      if (Buffer.isBuffer(chunk) && this[ENCODING]) {
        chunk = this[DECODER].write(chunk);
      }
      if (this[FLOWING] && this[BUFFERLENGTH] !== 0)
        this[FLUSH](true);
      if (this[FLOWING])
        this.emit("data", chunk);
      else
        this[BUFFERPUSH](chunk);
      if (this[BUFFERLENGTH] !== 0)
        this.emit("readable");
      if (cb)
        fn(cb);
      return this[FLOWING];
    }
    /**
     * Low-level explicit read method.
     *
     * In objectMode, the argument is ignored, and one item is returned if
     * available.
     *
     * `n` is the number of bytes (or in the case of encoding streams,
     * characters) to consume. If `n` is not provided, then the entire buffer
     * is returned, or `null` is returned if no data is available.
     *
     * If `n` is greater that the amount of data in the internal buffer,
     * then `null` is returned.
     */
    read(n) {
      if (this[DESTROYED])
        return null;
      this[DISCARDED] = false;
      if (this[BUFFERLENGTH] === 0 || n === 0 || n && n > this[BUFFERLENGTH]) {
        this[MAYBE_EMIT_END]();
        return null;
      }
      if (this[OBJECTMODE])
        n = null;
      if (this[BUFFER].length > 1 && !this[OBJECTMODE]) {
        this[BUFFER] = [
          this[ENCODING] ? this[BUFFER].join("") : Buffer.concat(this[BUFFER], this[BUFFERLENGTH])
        ];
      }
      const ret = this[READ](n || null, this[BUFFER][0]);
      this[MAYBE_EMIT_END]();
      return ret;
    }
    [READ](n, chunk) {
      if (this[OBJECTMODE])
        this[BUFFERSHIFT]();
      else {
        const c2 = chunk;
        if (n === c2.length || n === null)
          this[BUFFERSHIFT]();
        else if (typeof c2 === "string") {
          this[BUFFER][0] = c2.slice(n);
          chunk = c2.slice(0, n);
          this[BUFFERLENGTH] -= n;
        } else {
          this[BUFFER][0] = c2.subarray(n);
          chunk = c2.subarray(0, n);
          this[BUFFERLENGTH] -= n;
        }
      }
      this.emit("data", chunk);
      if (!this[BUFFER].length && !this[EOF])
        this.emit("drain");
      return chunk;
    }
    end(chunk, encoding, cb) {
      if (typeof chunk === "function") {
        cb = chunk;
        chunk = void 0;
      }
      if (typeof encoding === "function") {
        cb = encoding;
        encoding = "utf8";
      }
      if (chunk !== void 0)
        this.write(chunk, encoding);
      if (cb)
        this.once("end", cb);
      this[EOF] = true;
      this.writable = false;
      if (this[FLOWING] || !this[PAUSED])
        this[MAYBE_EMIT_END]();
      return this;
    }
    // don't let the internal resume be overwritten
    [RESUME]() {
      if (this[DESTROYED])
        return;
      if (!this[DATALISTENERS] && !this[PIPES].length) {
        this[DISCARDED] = true;
      }
      this[PAUSED] = false;
      this[FLOWING] = true;
      this.emit("resume");
      if (this[BUFFER].length)
        this[FLUSH]();
      else if (this[EOF])
        this[MAYBE_EMIT_END]();
      else
        this.emit("drain");
    }
    /**
     * Resume the stream if it is currently in a paused state
     *
     * If called when there are no pipe destinations or `data` event listeners,
     * this will place the stream in a "discarded" state, where all data will
     * be thrown away. The discarded state is removed if a pipe destination or
     * data handler is added, if pause() is called, or if any synchronous or
     * asynchronous iteration is started.
     */
    resume() {
      return this[RESUME]();
    }
    /**
     * Pause the stream
     */
    pause() {
      this[FLOWING] = false;
      this[PAUSED] = true;
      this[DISCARDED] = false;
    }
    /**
     * true if the stream has been forcibly destroyed
     */
    get destroyed() {
      return this[DESTROYED];
    }
    /**
     * true if the stream is currently in a flowing state, meaning that
     * any writes will be immediately emitted.
     */
    get flowing() {
      return this[FLOWING];
    }
    /**
     * true if the stream is currently in a paused state
     */
    get paused() {
      return this[PAUSED];
    }
    [BUFFERPUSH](chunk) {
      if (this[OBJECTMODE])
        this[BUFFERLENGTH] += 1;
      else
        this[BUFFERLENGTH] += chunk.length;
      this[BUFFER].push(chunk);
    }
    [BUFFERSHIFT]() {
      if (this[OBJECTMODE])
        this[BUFFERLENGTH] -= 1;
      else
        this[BUFFERLENGTH] -= this[BUFFER][0].length;
      return this[BUFFER].shift();
    }
    [FLUSH](noDrain = false) {
      do {
      } while (this[FLUSHCHUNK](this[BUFFERSHIFT]()) && this[BUFFER].length);
      if (!noDrain && !this[BUFFER].length && !this[EOF])
        this.emit("drain");
    }
    [FLUSHCHUNK](chunk) {
      this.emit("data", chunk);
      return this[FLOWING];
    }
    /**
     * Pipe all data emitted by this stream into the destination provided.
     *
     * Triggers the flow of data.
     */
    pipe(dest, opts) {
      if (this[DESTROYED])
        return dest;
      this[DISCARDED] = false;
      const ended = this[EMITTED_END];
      opts = opts || {};
      if (dest === proc.stdout || dest === proc.stderr)
        opts.end = false;
      else
        opts.end = opts.end !== false;
      opts.proxyErrors = !!opts.proxyErrors;
      if (ended) {
        if (opts.end)
          dest.end();
      } else {
        this[PIPES].push(!opts.proxyErrors ? new Pipe(this, dest, opts) : new PipeProxyErrors(this, dest, opts));
        if (this[ASYNC])
          defer(() => this[RESUME]());
        else
          this[RESUME]();
      }
      return dest;
    }
    /**
     * Fully unhook a piped destination stream.
     *
     * If the destination stream was the only consumer of this stream (ie,
     * there are no other piped destinations or `'data'` event listeners)
     * then the flow of data will stop until there is another consumer or
     * {@link Minipass#resume} is explicitly called.
     */
    unpipe(dest) {
      const p = this[PIPES].find((p2) => p2.dest === dest);
      if (p) {
        if (this[PIPES].length === 1) {
          if (this[FLOWING] && this[DATALISTENERS] === 0) {
            this[FLOWING] = false;
          }
          this[PIPES] = [];
        } else
          this[PIPES].splice(this[PIPES].indexOf(p), 1);
        p.unpipe();
      }
    }
    /**
     * Alias for {@link Minipass#on}
     */
    addListener(ev, handler) {
      return this.on(ev, handler);
    }
    /**
     * Mostly identical to `EventEmitter.on`, with the following
     * behavior differences to prevent data loss and unnecessary hangs:
     *
     * - Adding a 'data' event handler will trigger the flow of data
     *
     * - Adding a 'readable' event handler when there is data waiting to be read
     *   will cause 'readable' to be emitted immediately.
     *
     * - Adding an 'endish' event handler ('end', 'finish', etc.) which has
     *   already passed will cause the event to be emitted immediately and all
     *   handlers removed.
     *
     * - Adding an 'error' event handler after an error has been emitted will
     *   cause the event to be re-emitted immediately with the error previously
     *   raised.
     */
    on(ev, handler) {
      const ret = super.on(ev, handler);
      if (ev === "data") {
        this[DISCARDED] = false;
        this[DATALISTENERS]++;
        if (!this[PIPES].length && !this[FLOWING]) {
          this[RESUME]();
        }
      } else if (ev === "readable" && this[BUFFERLENGTH] !== 0) {
        super.emit("readable");
      } else if (isEndish(ev) && this[EMITTED_END]) {
        super.emit(ev);
        this.removeAllListeners(ev);
      } else if (ev === "error" && this[EMITTED_ERROR]) {
        const h = handler;
        if (this[ASYNC])
          defer(() => h.call(this, this[EMITTED_ERROR]));
        else
          h.call(this, this[EMITTED_ERROR]);
      }
      return ret;
    }
    /**
     * Alias for {@link Minipass#off}
     */
    removeListener(ev, handler) {
      return this.off(ev, handler);
    }
    /**
     * Mostly identical to `EventEmitter.off`
     *
     * If a 'data' event handler is removed, and it was the last consumer
     * (ie, there are no pipe destinations or other 'data' event listeners),
     * then the flow of data will stop until there is another consumer or
     * {@link Minipass#resume} is explicitly called.
     */
    off(ev, handler) {
      const ret = super.off(ev, handler);
      if (ev === "data") {
        this[DATALISTENERS] = this.listeners("data").length;
        if (this[DATALISTENERS] === 0 && !this[DISCARDED] && !this[PIPES].length) {
          this[FLOWING] = false;
        }
      }
      return ret;
    }
    /**
     * Mostly identical to `EventEmitter.removeAllListeners`
     *
     * If all 'data' event handlers are removed, and they were the last consumer
     * (ie, there are no pipe destinations), then the flow of data will stop
     * until there is another consumer or {@link Minipass#resume} is explicitly
     * called.
     */
    removeAllListeners(ev) {
      const ret = super.removeAllListeners(ev);
      if (ev === "data" || ev === void 0) {
        this[DATALISTENERS] = 0;
        if (!this[DISCARDED] && !this[PIPES].length) {
          this[FLOWING] = false;
        }
      }
      return ret;
    }
    /**
     * true if the 'end' event has been emitted
     */
    get emittedEnd() {
      return this[EMITTED_END];
    }
    [MAYBE_EMIT_END]() {
      if (!this[EMITTING_END] && !this[EMITTED_END] && !this[DESTROYED] && this[BUFFER].length === 0 && this[EOF]) {
        this[EMITTING_END] = true;
        this.emit("end");
        this.emit("prefinish");
        this.emit("finish");
        if (this[CLOSED])
          this.emit("close");
        this[EMITTING_END] = false;
      }
    }
    /**
     * Mostly identical to `EventEmitter.emit`, with the following
     * behavior differences to prevent data loss and unnecessary hangs:
     *
     * If the stream has been destroyed, and the event is something other
     * than 'close' or 'error', then `false` is returned and no handlers
     * are called.
     *
     * If the event is 'end', and has already been emitted, then the event
     * is ignored. If the stream is in a paused or non-flowing state, then
     * the event will be deferred until data flow resumes. If the stream is
     * async, then handlers will be called on the next tick rather than
     * immediately.
     *
     * If the event is 'close', and 'end' has not yet been emitted, then
     * the event will be deferred until after 'end' is emitted.
     *
     * If the event is 'error', and an AbortSignal was provided for the stream,
     * and there are no listeners, then the event is ignored, matching the
     * behavior of node core streams in the presense of an AbortSignal.
     *
     * If the event is 'finish' or 'prefinish', then all listeners will be
     * removed after emitting the event, to prevent double-firing.
     */
    emit(ev, ...args) {
      const data = args[0];
      if (ev !== "error" && ev !== "close" && ev !== DESTROYED && this[DESTROYED]) {
        return false;
      } else if (ev === "data") {
        return !this[OBJECTMODE] && !data ? false : this[ASYNC] ? (defer(() => this[EMITDATA](data)), true) : this[EMITDATA](data);
      } else if (ev === "end") {
        return this[EMITEND]();
      } else if (ev === "close") {
        this[CLOSED] = true;
        if (!this[EMITTED_END] && !this[DESTROYED])
          return false;
        const ret2 = super.emit("close");
        this.removeAllListeners("close");
        return ret2;
      } else if (ev === "error") {
        this[EMITTED_ERROR] = data;
        super.emit(ERROR, data);
        const ret2 = !this[SIGNAL] || this.listeners("error").length ? super.emit("error", data) : false;
        this[MAYBE_EMIT_END]();
        return ret2;
      } else if (ev === "resume") {
        const ret2 = super.emit("resume");
        this[MAYBE_EMIT_END]();
        return ret2;
      } else if (ev === "finish" || ev === "prefinish") {
        const ret2 = super.emit(ev);
        this.removeAllListeners(ev);
        return ret2;
      }
      const ret = super.emit(ev, ...args);
      this[MAYBE_EMIT_END]();
      return ret;
    }
    [EMITDATA](data) {
      for (const p of this[PIPES]) {
        if (p.dest.write(data) === false)
          this.pause();
      }
      const ret = this[DISCARDED] ? false : super.emit("data", data);
      this[MAYBE_EMIT_END]();
      return ret;
    }
    [EMITEND]() {
      if (this[EMITTED_END])
        return false;
      this[EMITTED_END] = true;
      this.readable = false;
      return this[ASYNC] ? (defer(() => this[EMITEND2]()), true) : this[EMITEND2]();
    }
    [EMITEND2]() {
      if (this[DECODER]) {
        const data = this[DECODER].end();
        if (data) {
          for (const p of this[PIPES]) {
            p.dest.write(data);
          }
          if (!this[DISCARDED])
            super.emit("data", data);
        }
      }
      for (const p of this[PIPES]) {
        p.end();
      }
      const ret = super.emit("end");
      this.removeAllListeners("end");
      return ret;
    }
    /**
     * Return a Promise that resolves to an array of all emitted data once
     * the stream ends.
     */
    async collect() {
      const buf = Object.assign([], {
        dataLength: 0
      });
      if (!this[OBJECTMODE])
        buf.dataLength = 0;
      const p = this.promise();
      this.on("data", (c2) => {
        buf.push(c2);
        if (!this[OBJECTMODE])
          buf.dataLength += c2.length;
      });
      await p;
      return buf;
    }
    /**
     * Return a Promise that resolves to the concatenation of all emitted data
     * once the stream ends.
     *
     * Not allowed on objectMode streams.
     */
    async concat() {
      if (this[OBJECTMODE]) {
        throw new Error("cannot concat in objectMode");
      }
      const buf = await this.collect();
      return this[ENCODING] ? buf.join("") : Buffer.concat(buf, buf.dataLength);
    }
    /**
     * Return a void Promise that resolves once the stream ends.
     */
    async promise() {
      return new Promise((resolve, reject) => {
        this.on(DESTROYED, () => reject(new Error("stream destroyed")));
        this.on("error", (er) => reject(er));
        this.on("end", () => resolve());
      });
    }
    /**
     * Asynchronous `for await of` iteration.
     *
     * This will continue emitting all chunks until the stream terminates.
     */
    [Symbol.asyncIterator]() {
      this[DISCARDED] = false;
      let stopped = false;
      const stop = async () => {
        this.pause();
        stopped = true;
        return { value: void 0, done: true };
      };
      const next = () => {
        if (stopped)
          return stop();
        const res = this.read();
        if (res !== null)
          return Promise.resolve({ done: false, value: res });
        if (this[EOF])
          return stop();
        let resolve;
        let reject;
        const onerr = (er) => {
          this.off("data", ondata);
          this.off("end", onend);
          this.off(DESTROYED, ondestroy);
          stop();
          reject(er);
        };
        const ondata = (value) => {
          this.off("error", onerr);
          this.off("end", onend);
          this.off(DESTROYED, ondestroy);
          this.pause();
          resolve({ value, done: !!this[EOF] });
        };
        const onend = () => {
          this.off("error", onerr);
          this.off("data", ondata);
          this.off(DESTROYED, ondestroy);
          stop();
          resolve({ done: true, value: void 0 });
        };
        const ondestroy = () => onerr(new Error("stream destroyed"));
        return new Promise((res2, rej) => {
          reject = rej;
          resolve = res2;
          this.once(DESTROYED, ondestroy);
          this.once("error", onerr);
          this.once("end", onend);
          this.once("data", ondata);
        });
      };
      return {
        next,
        throw: stop,
        return: stop,
        [Symbol.asyncIterator]() {
          return this;
        }
      };
    }
    /**
     * Synchronous `for of` iteration.
     *
     * The iteration will terminate when the internal buffer runs out, even
     * if the stream has not yet terminated.
     */
    [Symbol.iterator]() {
      this[DISCARDED] = false;
      let stopped = false;
      const stop = () => {
        this.pause();
        this.off(ERROR, stop);
        this.off(DESTROYED, stop);
        this.off("end", stop);
        stopped = true;
        return { done: true, value: void 0 };
      };
      const next = () => {
        if (stopped)
          return stop();
        const value = this.read();
        return value === null ? stop() : { done: false, value };
      };
      this.once("end", stop);
      this.once(ERROR, stop);
      this.once(DESTROYED, stop);
      return {
        next,
        throw: stop,
        return: stop,
        [Symbol.iterator]() {
          return this;
        }
      };
    }
    /**
     * Destroy a stream, preventing it from being used for any further purpose.
     *
     * If the stream has a `close()` method, then it will be called on
     * destruction.
     *
     * After destruction, any attempt to write data, read data, or emit most
     * events will be ignored.
     *
     * If an error argument is provided, then it will be emitted in an
     * 'error' event.
     */
    destroy(er) {
      if (this[DESTROYED]) {
        if (er)
          this.emit("error", er);
        else
          this.emit(DESTROYED);
        return this;
      }
      this[DESTROYED] = true;
      this[DISCARDED] = true;
      this[BUFFER].length = 0;
      this[BUFFERLENGTH] = 0;
      const wc = this;
      if (typeof wc.close === "function" && !this[CLOSED])
        wc.close();
      if (er)
        this.emit("error", er);
      else
        this.emit(DESTROYED);
      return this;
    }
    /**
     * Alias for {@link isStream}
     *
     * Former export location, maintained for backwards compatibility.
     *
     * @deprecated
     */
    static get isStream() {
      return exports.isStream;
    }
  }
  exports.Minipass = Minipass;
})(commonjs);
var ignore = {};
Object.defineProperty(ignore, "__esModule", { value: true });
ignore.Ignore = void 0;
const minimatch_1$4 = commonjs$4;
const pattern_js_1$1 = pattern;
const defaultPlatform$1 = typeof process === "object" && process && typeof process.platform === "string" ? process.platform : "linux";
class Ignore {
  constructor(ignored, { nobrace, nocase, noext, noglobstar, platform: platform2 = defaultPlatform$1 }) {
    __publicField(this, "relative");
    __publicField(this, "relativeChildren");
    __publicField(this, "absolute");
    __publicField(this, "absoluteChildren");
    __publicField(this, "platform");
    __publicField(this, "mmopts");
    this.relative = [];
    this.absolute = [];
    this.relativeChildren = [];
    this.absoluteChildren = [];
    this.platform = platform2;
    this.mmopts = {
      dot: true,
      nobrace,
      nocase,
      noext,
      noglobstar,
      optimizationLevel: 2,
      platform: platform2,
      nocomment: true,
      nonegate: true
    };
    for (const ign of ignored)
      this.add(ign);
  }
  add(ign) {
    const mm = new minimatch_1$4.Minimatch(ign, this.mmopts);
    for (let i = 0; i < mm.set.length; i++) {
      const parsed = mm.set[i];
      const globParts = mm.globParts[i];
      if (!parsed || !globParts) {
        throw new Error("invalid pattern object");
      }
      while (parsed[0] === "." && globParts[0] === ".") {
        parsed.shift();
        globParts.shift();
      }
      const p = new pattern_js_1$1.Pattern(parsed, globParts, 0, this.platform);
      const m = new minimatch_1$4.Minimatch(p.globString(), this.mmopts);
      const children = globParts[globParts.length - 1] === "**";
      const absolute = p.isAbsolute();
      if (absolute)
        this.absolute.push(m);
      else
        this.relative.push(m);
      if (children) {
        if (absolute)
          this.absoluteChildren.push(m);
        else
          this.relativeChildren.push(m);
      }
    }
  }
  ignored(p) {
    const fullpath = p.fullpath();
    const fullpaths = `${fullpath}/`;
    const relative = p.relative() || ".";
    const relatives = `${relative}/`;
    for (const m of this.relative) {
      if (m.match(relative) || m.match(relatives))
        return true;
    }
    for (const m of this.absolute) {
      if (m.match(fullpath) || m.match(fullpaths))
        return true;
    }
    return false;
  }
  childrenIgnored(p) {
    const fullpath = p.fullpath() + "/";
    const relative = (p.relative() || ".") + "/";
    for (const m of this.relativeChildren) {
      if (m.match(relative))
        return true;
    }
    for (const m of this.absoluteChildren) {
      if (m.match(fullpath))
        return true;
    }
    return false;
  }
}
ignore.Ignore = Ignore;
var processor = {};
Object.defineProperty(processor, "__esModule", { value: true });
processor.Processor = processor.SubWalks = processor.MatchRecord = processor.HasWalkedCache = void 0;
const minimatch_1$3 = commonjs$4;
class HasWalkedCache {
  constructor(store = /* @__PURE__ */ new Map()) {
    __publicField(this, "store");
    this.store = store;
  }
  copy() {
    return new HasWalkedCache(new Map(this.store));
  }
  hasWalked(target, pattern2) {
    var _a2;
    return (_a2 = this.store.get(target.fullpath())) == null ? void 0 : _a2.has(pattern2.globString());
  }
  storeWalked(target, pattern2) {
    const fullpath = target.fullpath();
    const cached = this.store.get(fullpath);
    if (cached)
      cached.add(pattern2.globString());
    else
      this.store.set(fullpath, /* @__PURE__ */ new Set([pattern2.globString()]));
  }
}
processor.HasWalkedCache = HasWalkedCache;
class MatchRecord {
  constructor() {
    __publicField(this, "store", /* @__PURE__ */ new Map());
  }
  add(target, absolute, ifDir) {
    const n = (absolute ? 2 : 0) | (ifDir ? 1 : 0);
    const current = this.store.get(target);
    this.store.set(target, current === void 0 ? n : n & current);
  }
  // match, absolute, ifdir
  entries() {
    return [...this.store.entries()].map(([path2, n]) => [
      path2,
      !!(n & 2),
      !!(n & 1)
    ]);
  }
}
processor.MatchRecord = MatchRecord;
class SubWalks {
  constructor() {
    __publicField(this, "store", /* @__PURE__ */ new Map());
  }
  add(target, pattern2) {
    if (!target.canReaddir()) {
      return;
    }
    const subs = this.store.get(target);
    if (subs) {
      if (!subs.find((p) => p.globString() === pattern2.globString())) {
        subs.push(pattern2);
      }
    } else
      this.store.set(target, [pattern2]);
  }
  get(target) {
    const subs = this.store.get(target);
    if (!subs) {
      throw new Error("attempting to walk unknown path");
    }
    return subs;
  }
  entries() {
    return this.keys().map((k) => [k, this.store.get(k)]);
  }
  keys() {
    return [...this.store.keys()].filter((t) => t.canReaddir());
  }
}
processor.SubWalks = SubWalks;
class Processor {
  constructor(opts, hasWalkedCache) {
    __publicField(this, "hasWalkedCache");
    __publicField(this, "matches", new MatchRecord());
    __publicField(this, "subwalks", new SubWalks());
    __publicField(this, "patterns");
    __publicField(this, "follow");
    __publicField(this, "dot");
    __publicField(this, "opts");
    this.opts = opts;
    this.follow = !!opts.follow;
    this.dot = !!opts.dot;
    this.hasWalkedCache = hasWalkedCache ? hasWalkedCache.copy() : new HasWalkedCache();
  }
  processPatterns(target, patterns) {
    this.patterns = patterns;
    const processingSet = patterns.map((p) => [target, p]);
    for (let [t, pattern2] of processingSet) {
      this.hasWalkedCache.storeWalked(t, pattern2);
      const root = pattern2.root();
      const absolute = pattern2.isAbsolute() && this.opts.absolute !== false;
      if (root) {
        t = t.resolve(root === "/" && this.opts.root !== void 0 ? this.opts.root : root);
        const rest2 = pattern2.rest();
        if (!rest2) {
          this.matches.add(t, true, false);
          continue;
        } else {
          pattern2 = rest2;
        }
      }
      if (t.isENOENT())
        continue;
      let p;
      let rest;
      let changed = false;
      while (typeof (p = pattern2.pattern()) === "string" && (rest = pattern2.rest())) {
        const c2 = t.resolve(p);
        t = c2;
        pattern2 = rest;
        changed = true;
      }
      p = pattern2.pattern();
      rest = pattern2.rest();
      if (changed) {
        if (this.hasWalkedCache.hasWalked(t, pattern2))
          continue;
        this.hasWalkedCache.storeWalked(t, pattern2);
      }
      if (typeof p === "string") {
        const ifDir = p === ".." || p === "" || p === ".";
        this.matches.add(t.resolve(p), absolute, ifDir);
        continue;
      } else if (p === minimatch_1$3.GLOBSTAR) {
        if (!t.isSymbolicLink() || this.follow || pattern2.checkFollowGlobstar()) {
          this.subwalks.add(t, pattern2);
        }
        const rp = rest == null ? void 0 : rest.pattern();
        const rrest = rest == null ? void 0 : rest.rest();
        if (!rest || (rp === "" || rp === ".") && !rrest) {
          this.matches.add(t, absolute, rp === "" || rp === ".");
        } else {
          if (rp === "..") {
            const tp = t.parent || t;
            if (!rrest)
              this.matches.add(tp, absolute, true);
            else if (!this.hasWalkedCache.hasWalked(tp, rrest)) {
              this.subwalks.add(tp, rrest);
            }
          }
        }
      } else if (p instanceof RegExp) {
        this.subwalks.add(t, pattern2);
      }
    }
    return this;
  }
  subwalkTargets() {
    return this.subwalks.keys();
  }
  child() {
    return new Processor(this.opts, this.hasWalkedCache);
  }
  // return a new Processor containing the subwalks for each
  // child entry, and a set of matches, and
  // a hasWalkedCache that's a copy of this one
  // then we're going to call
  filterEntries(parent, entries) {
    const patterns = this.subwalks.get(parent);
    const results = this.child();
    for (const e of entries) {
      for (const pattern2 of patterns) {
        const absolute = pattern2.isAbsolute();
        const p = pattern2.pattern();
        const rest = pattern2.rest();
        if (p === minimatch_1$3.GLOBSTAR) {
          results.testGlobstar(e, pattern2, rest, absolute);
        } else if (p instanceof RegExp) {
          results.testRegExp(e, p, rest, absolute);
        } else {
          results.testString(e, p, rest, absolute);
        }
      }
    }
    return results;
  }
  testGlobstar(e, pattern2, rest, absolute) {
    if (this.dot || !e.name.startsWith(".")) {
      if (!pattern2.hasMore()) {
        this.matches.add(e, absolute, false);
      }
      if (e.canReaddir()) {
        if (this.follow || !e.isSymbolicLink()) {
          this.subwalks.add(e, pattern2);
        } else if (e.isSymbolicLink()) {
          if (rest && pattern2.checkFollowGlobstar()) {
            this.subwalks.add(e, rest);
          } else if (pattern2.markFollowGlobstar()) {
            this.subwalks.add(e, pattern2);
          }
        }
      }
    }
    if (rest) {
      const rp = rest.pattern();
      if (typeof rp === "string" && // dots and empty were handled already
      rp !== ".." && rp !== "" && rp !== ".") {
        this.testString(e, rp, rest.rest(), absolute);
      } else if (rp === "..") {
        const ep = e.parent || e;
        this.subwalks.add(ep, rest);
      } else if (rp instanceof RegExp) {
        this.testRegExp(e, rp, rest.rest(), absolute);
      }
    }
  }
  testRegExp(e, p, rest, absolute) {
    if (!p.test(e.name))
      return;
    if (!rest) {
      this.matches.add(e, absolute, false);
    } else {
      this.subwalks.add(e, rest);
    }
  }
  testString(e, p, rest, absolute) {
    if (!e.isNamed(p))
      return;
    if (!rest) {
      this.matches.add(e, absolute, false);
    } else {
      this.subwalks.add(e, rest);
    }
  }
}
processor.Processor = Processor;
Object.defineProperty(walker, "__esModule", { value: true });
walker.GlobStream = walker.GlobWalker = walker.GlobUtil = void 0;
const minipass_1 = commonjs;
const ignore_js_1 = ignore;
const processor_js_1 = processor;
const makeIgnore = (ignore2, opts) => typeof ignore2 === "string" ? new ignore_js_1.Ignore([ignore2], opts) : Array.isArray(ignore2) ? new ignore_js_1.Ignore(ignore2, opts) : ignore2;
class GlobUtil {
  constructor(patterns, path2, opts) {
    __privateAdd(this, _ignored);
    __privateAdd(this, _childrenIgnored);
    __publicField(this, "path");
    __publicField(this, "patterns");
    __publicField(this, "opts");
    __publicField(this, "seen", /* @__PURE__ */ new Set());
    __publicField(this, "paused", false);
    __publicField(this, "aborted", false);
    __privateAdd(this, _onResume, []);
    __privateAdd(this, _ignore, void 0);
    __privateAdd(this, _sep, void 0);
    __publicField(this, "signal");
    __publicField(this, "maxDepth");
    __publicField(this, "includeChildMatches");
    this.patterns = patterns;
    this.path = path2;
    this.opts = opts;
    __privateSet(this, _sep, !opts.posix && opts.platform === "win32" ? "\\" : "/");
    this.includeChildMatches = opts.includeChildMatches !== false;
    if (opts.ignore || !this.includeChildMatches) {
      __privateSet(this, _ignore, makeIgnore(opts.ignore ?? [], opts));
      if (!this.includeChildMatches && typeof __privateGet(this, _ignore).add !== "function") {
        const m = "cannot ignore child matches, ignore lacks add() method.";
        throw new Error(m);
      }
    }
    this.maxDepth = opts.maxDepth || Infinity;
    if (opts.signal) {
      this.signal = opts.signal;
      this.signal.addEventListener("abort", () => {
        __privateGet(this, _onResume).length = 0;
      });
    }
  }
  // backpressure mechanism
  pause() {
    this.paused = true;
  }
  resume() {
    var _a2;
    if ((_a2 = this.signal) == null ? void 0 : _a2.aborted)
      return;
    this.paused = false;
    let fn = void 0;
    while (!this.paused && (fn = __privateGet(this, _onResume).shift())) {
      fn();
    }
  }
  onResume(fn) {
    var _a2;
    if ((_a2 = this.signal) == null ? void 0 : _a2.aborted)
      return;
    if (!this.paused) {
      fn();
    } else {
      __privateGet(this, _onResume).push(fn);
    }
  }
  // do the requisite realpath/stat checking, and return the path
  // to add or undefined to filter it out.
  async matchCheck(e, ifDir) {
    if (ifDir && this.opts.nodir)
      return void 0;
    let rpc;
    if (this.opts.realpath) {
      rpc = e.realpathCached() || await e.realpath();
      if (!rpc)
        return void 0;
      e = rpc;
    }
    const needStat = e.isUnknown() || this.opts.stat;
    const s = needStat ? await e.lstat() : e;
    if (this.opts.follow && this.opts.nodir && (s == null ? void 0 : s.isSymbolicLink())) {
      const target = await s.realpath();
      if (target && (target.isUnknown() || this.opts.stat)) {
        await target.lstat();
      }
    }
    return this.matchCheckTest(s, ifDir);
  }
  matchCheckTest(e, ifDir) {
    var _a2;
    return e && (this.maxDepth === Infinity || e.depth() <= this.maxDepth) && (!ifDir || e.canReaddir()) && (!this.opts.nodir || !e.isDirectory()) && (!this.opts.nodir || !this.opts.follow || !e.isSymbolicLink() || !((_a2 = e.realpathCached()) == null ? void 0 : _a2.isDirectory())) && !__privateMethod(this, _ignored, ignored_fn).call(this, e) ? e : void 0;
  }
  matchCheckSync(e, ifDir) {
    if (ifDir && this.opts.nodir)
      return void 0;
    let rpc;
    if (this.opts.realpath) {
      rpc = e.realpathCached() || e.realpathSync();
      if (!rpc)
        return void 0;
      e = rpc;
    }
    const needStat = e.isUnknown() || this.opts.stat;
    const s = needStat ? e.lstatSync() : e;
    if (this.opts.follow && this.opts.nodir && (s == null ? void 0 : s.isSymbolicLink())) {
      const target = s.realpathSync();
      if (target && ((target == null ? void 0 : target.isUnknown()) || this.opts.stat)) {
        target.lstatSync();
      }
    }
    return this.matchCheckTest(s, ifDir);
  }
  matchFinish(e, absolute) {
    var _a2;
    if (__privateMethod(this, _ignored, ignored_fn).call(this, e))
      return;
    if (!this.includeChildMatches && ((_a2 = __privateGet(this, _ignore)) == null ? void 0 : _a2.add)) {
      const ign = `${e.relativePosix()}/**`;
      __privateGet(this, _ignore).add(ign);
    }
    const abs = this.opts.absolute === void 0 ? absolute : this.opts.absolute;
    this.seen.add(e);
    const mark = this.opts.mark && e.isDirectory() ? __privateGet(this, _sep) : "";
    if (this.opts.withFileTypes) {
      this.matchEmit(e);
    } else if (abs) {
      const abs2 = this.opts.posix ? e.fullpathPosix() : e.fullpath();
      this.matchEmit(abs2 + mark);
    } else {
      const rel = this.opts.posix ? e.relativePosix() : e.relative();
      const pre = this.opts.dotRelative && !rel.startsWith(".." + __privateGet(this, _sep)) ? "." + __privateGet(this, _sep) : "";
      this.matchEmit(!rel ? "." + mark : pre + rel + mark);
    }
  }
  async match(e, absolute, ifDir) {
    const p = await this.matchCheck(e, ifDir);
    if (p)
      this.matchFinish(p, absolute);
  }
  matchSync(e, absolute, ifDir) {
    const p = this.matchCheckSync(e, ifDir);
    if (p)
      this.matchFinish(p, absolute);
  }
  walkCB(target, patterns, cb) {
    var _a2;
    if ((_a2 = this.signal) == null ? void 0 : _a2.aborted)
      cb();
    this.walkCB2(target, patterns, new processor_js_1.Processor(this.opts), cb);
  }
  walkCB2(target, patterns, processor2, cb) {
    var _a2;
    if (__privateMethod(this, _childrenIgnored, childrenIgnored_fn).call(this, target))
      return cb();
    if ((_a2 = this.signal) == null ? void 0 : _a2.aborted)
      cb();
    if (this.paused) {
      this.onResume(() => this.walkCB2(target, patterns, processor2, cb));
      return;
    }
    processor2.processPatterns(target, patterns);
    let tasks = 1;
    const next = () => {
      if (--tasks === 0)
        cb();
    };
    for (const [m, absolute, ifDir] of processor2.matches.entries()) {
      if (__privateMethod(this, _ignored, ignored_fn).call(this, m))
        continue;
      tasks++;
      this.match(m, absolute, ifDir).then(() => next());
    }
    for (const t of processor2.subwalkTargets()) {
      if (this.maxDepth !== Infinity && t.depth() >= this.maxDepth) {
        continue;
      }
      tasks++;
      const childrenCached = t.readdirCached();
      if (t.calledReaddir())
        this.walkCB3(t, childrenCached, processor2, next);
      else {
        t.readdirCB((_, entries) => this.walkCB3(t, entries, processor2, next), true);
      }
    }
    next();
  }
  walkCB3(target, entries, processor2, cb) {
    processor2 = processor2.filterEntries(target, entries);
    let tasks = 1;
    const next = () => {
      if (--tasks === 0)
        cb();
    };
    for (const [m, absolute, ifDir] of processor2.matches.entries()) {
      if (__privateMethod(this, _ignored, ignored_fn).call(this, m))
        continue;
      tasks++;
      this.match(m, absolute, ifDir).then(() => next());
    }
    for (const [target2, patterns] of processor2.subwalks.entries()) {
      tasks++;
      this.walkCB2(target2, patterns, processor2.child(), next);
    }
    next();
  }
  walkCBSync(target, patterns, cb) {
    var _a2;
    if ((_a2 = this.signal) == null ? void 0 : _a2.aborted)
      cb();
    this.walkCB2Sync(target, patterns, new processor_js_1.Processor(this.opts), cb);
  }
  walkCB2Sync(target, patterns, processor2, cb) {
    var _a2;
    if (__privateMethod(this, _childrenIgnored, childrenIgnored_fn).call(this, target))
      return cb();
    if ((_a2 = this.signal) == null ? void 0 : _a2.aborted)
      cb();
    if (this.paused) {
      this.onResume(() => this.walkCB2Sync(target, patterns, processor2, cb));
      return;
    }
    processor2.processPatterns(target, patterns);
    let tasks = 1;
    const next = () => {
      if (--tasks === 0)
        cb();
    };
    for (const [m, absolute, ifDir] of processor2.matches.entries()) {
      if (__privateMethod(this, _ignored, ignored_fn).call(this, m))
        continue;
      this.matchSync(m, absolute, ifDir);
    }
    for (const t of processor2.subwalkTargets()) {
      if (this.maxDepth !== Infinity && t.depth() >= this.maxDepth) {
        continue;
      }
      tasks++;
      const children = t.readdirSync();
      this.walkCB3Sync(t, children, processor2, next);
    }
    next();
  }
  walkCB3Sync(target, entries, processor2, cb) {
    processor2 = processor2.filterEntries(target, entries);
    let tasks = 1;
    const next = () => {
      if (--tasks === 0)
        cb();
    };
    for (const [m, absolute, ifDir] of processor2.matches.entries()) {
      if (__privateMethod(this, _ignored, ignored_fn).call(this, m))
        continue;
      this.matchSync(m, absolute, ifDir);
    }
    for (const [target2, patterns] of processor2.subwalks.entries()) {
      tasks++;
      this.walkCB2Sync(target2, patterns, processor2.child(), next);
    }
    next();
  }
}
_onResume = new WeakMap();
_ignore = new WeakMap();
_sep = new WeakMap();
_ignored = new WeakSet();
ignored_fn = function(path2) {
  var _a2, _b2;
  return this.seen.has(path2) || !!((_b2 = (_a2 = __privateGet(this, _ignore)) == null ? void 0 : _a2.ignored) == null ? void 0 : _b2.call(_a2, path2));
};
_childrenIgnored = new WeakSet();
childrenIgnored_fn = function(path2) {
  var _a2, _b2;
  return !!((_b2 = (_a2 = __privateGet(this, _ignore)) == null ? void 0 : _a2.childrenIgnored) == null ? void 0 : _b2.call(_a2, path2));
};
walker.GlobUtil = GlobUtil;
class GlobWalker extends GlobUtil {
  constructor(patterns, path2, opts) {
    super(patterns, path2, opts);
    __publicField(this, "matches", /* @__PURE__ */ new Set());
  }
  matchEmit(e) {
    this.matches.add(e);
  }
  async walk() {
    var _a2;
    if ((_a2 = this.signal) == null ? void 0 : _a2.aborted)
      throw this.signal.reason;
    if (this.path.isUnknown()) {
      await this.path.lstat();
    }
    await new Promise((res, rej) => {
      this.walkCB(this.path, this.patterns, () => {
        var _a3;
        if ((_a3 = this.signal) == null ? void 0 : _a3.aborted) {
          rej(this.signal.reason);
        } else {
          res(this.matches);
        }
      });
    });
    return this.matches;
  }
  walkSync() {
    var _a2;
    if ((_a2 = this.signal) == null ? void 0 : _a2.aborted)
      throw this.signal.reason;
    if (this.path.isUnknown()) {
      this.path.lstatSync();
    }
    this.walkCBSync(this.path, this.patterns, () => {
      var _a3;
      if ((_a3 = this.signal) == null ? void 0 : _a3.aborted)
        throw this.signal.reason;
    });
    return this.matches;
  }
}
walker.GlobWalker = GlobWalker;
class GlobStream extends GlobUtil {
  constructor(patterns, path2, opts) {
    super(patterns, path2, opts);
    __publicField(this, "results");
    this.results = new minipass_1.Minipass({
      signal: this.signal,
      objectMode: true
    });
    this.results.on("drain", () => this.resume());
    this.results.on("resume", () => this.resume());
  }
  matchEmit(e) {
    this.results.write(e);
    if (!this.results.flowing)
      this.pause();
  }
  stream() {
    const target = this.path;
    if (target.isUnknown()) {
      target.lstat().then(() => {
        this.walkCB(target, this.patterns, () => this.results.end());
      });
    } else {
      this.walkCB(target, this.patterns, () => this.results.end());
    }
    return this.results;
  }
  streamSync() {
    if (this.path.isUnknown()) {
      this.path.lstatSync();
    }
    this.walkCBSync(this.path, this.patterns, () => this.results.end());
    return this.results;
  }
}
walker.GlobStream = GlobStream;
Object.defineProperty(glob, "__esModule", { value: true });
glob.Glob = void 0;
const minimatch_1$2 = commonjs$4;
const node_url_1 = require$$2$1;
const path_scurry_1 = commonjs$3;
const pattern_js_1 = pattern;
const walker_js_1 = walker;
const defaultPlatform = typeof process === "object" && process && typeof process.platform === "string" ? process.platform : "linux";
class Glob {
  /**
   * All options are stored as properties on the `Glob` object.
   *
   * See {@link GlobOptions} for full options descriptions.
   *
   * Note that a previous `Glob` object can be passed as the
   * `GlobOptions` to another `Glob` instantiation to re-use settings
   * and caches with a new pattern.
   *
   * Traversal functions can be called multiple times to run the walk
   * again.
   */
  constructor(pattern2, opts) {
    __publicField(this, "absolute");
    __publicField(this, "cwd");
    __publicField(this, "root");
    __publicField(this, "dot");
    __publicField(this, "dotRelative");
    __publicField(this, "follow");
    __publicField(this, "ignore");
    __publicField(this, "magicalBraces");
    __publicField(this, "mark");
    __publicField(this, "matchBase");
    __publicField(this, "maxDepth");
    __publicField(this, "nobrace");
    __publicField(this, "nocase");
    __publicField(this, "nodir");
    __publicField(this, "noext");
    __publicField(this, "noglobstar");
    __publicField(this, "pattern");
    __publicField(this, "platform");
    __publicField(this, "realpath");
    __publicField(this, "scurry");
    __publicField(this, "stat");
    __publicField(this, "signal");
    __publicField(this, "windowsPathsNoEscape");
    __publicField(this, "withFileTypes");
    __publicField(this, "includeChildMatches");
    /**
     * The options provided to the constructor.
     */
    __publicField(this, "opts");
    /**
     * An array of parsed immutable {@link Pattern} objects.
     */
    __publicField(this, "patterns");
    if (!opts)
      throw new TypeError("glob options required");
    this.withFileTypes = !!opts.withFileTypes;
    this.signal = opts.signal;
    this.follow = !!opts.follow;
    this.dot = !!opts.dot;
    this.dotRelative = !!opts.dotRelative;
    this.nodir = !!opts.nodir;
    this.mark = !!opts.mark;
    if (!opts.cwd) {
      this.cwd = "";
    } else if (opts.cwd instanceof URL || opts.cwd.startsWith("file://")) {
      opts.cwd = (0, node_url_1.fileURLToPath)(opts.cwd);
    }
    this.cwd = opts.cwd || "";
    this.root = opts.root;
    this.magicalBraces = !!opts.magicalBraces;
    this.nobrace = !!opts.nobrace;
    this.noext = !!opts.noext;
    this.realpath = !!opts.realpath;
    this.absolute = opts.absolute;
    this.includeChildMatches = opts.includeChildMatches !== false;
    this.noglobstar = !!opts.noglobstar;
    this.matchBase = !!opts.matchBase;
    this.maxDepth = typeof opts.maxDepth === "number" ? opts.maxDepth : Infinity;
    this.stat = !!opts.stat;
    this.ignore = opts.ignore;
    if (this.withFileTypes && this.absolute !== void 0) {
      throw new Error("cannot set absolute and withFileTypes:true");
    }
    if (typeof pattern2 === "string") {
      pattern2 = [pattern2];
    }
    this.windowsPathsNoEscape = !!opts.windowsPathsNoEscape || opts.allowWindowsEscape === false;
    if (this.windowsPathsNoEscape) {
      pattern2 = pattern2.map((p) => p.replace(/\\/g, "/"));
    }
    if (this.matchBase) {
      if (opts.noglobstar) {
        throw new TypeError("base matching requires globstar");
      }
      pattern2 = pattern2.map((p) => p.includes("/") ? p : `./**/${p}`);
    }
    this.pattern = pattern2;
    this.platform = opts.platform || defaultPlatform;
    this.opts = { ...opts, platform: this.platform };
    if (opts.scurry) {
      this.scurry = opts.scurry;
      if (opts.nocase !== void 0 && opts.nocase !== opts.scurry.nocase) {
        throw new Error("nocase option contradicts provided scurry option");
      }
    } else {
      const Scurry = opts.platform === "win32" ? path_scurry_1.PathScurryWin32 : opts.platform === "darwin" ? path_scurry_1.PathScurryDarwin : opts.platform ? path_scurry_1.PathScurryPosix : path_scurry_1.PathScurry;
      this.scurry = new Scurry(this.cwd, {
        nocase: opts.nocase,
        fs: opts.fs
      });
    }
    this.nocase = this.scurry.nocase;
    const nocaseMagicOnly = this.platform === "darwin" || this.platform === "win32";
    const mmo = {
      // default nocase based on platform
      ...opts,
      dot: this.dot,
      matchBase: this.matchBase,
      nobrace: this.nobrace,
      nocase: this.nocase,
      nocaseMagicOnly,
      nocomment: true,
      noext: this.noext,
      nonegate: true,
      optimizationLevel: 2,
      platform: this.platform,
      windowsPathsNoEscape: this.windowsPathsNoEscape,
      debug: !!this.opts.debug
    };
    const mms = this.pattern.map((p) => new minimatch_1$2.Minimatch(p, mmo));
    const [matchSet, globParts] = mms.reduce((set, m) => {
      set[0].push(...m.set);
      set[1].push(...m.globParts);
      return set;
    }, [[], []]);
    this.patterns = matchSet.map((set, i) => {
      const g = globParts[i];
      if (!g)
        throw new Error("invalid pattern object");
      return new pattern_js_1.Pattern(set, g, 0, this.platform);
    });
  }
  async walk() {
    return [
      ...await new walker_js_1.GlobWalker(this.patterns, this.scurry.cwd, {
        ...this.opts,
        maxDepth: this.maxDepth !== Infinity ? this.maxDepth + this.scurry.cwd.depth() : Infinity,
        platform: this.platform,
        nocase: this.nocase,
        includeChildMatches: this.includeChildMatches
      }).walk()
    ];
  }
  walkSync() {
    return [
      ...new walker_js_1.GlobWalker(this.patterns, this.scurry.cwd, {
        ...this.opts,
        maxDepth: this.maxDepth !== Infinity ? this.maxDepth + this.scurry.cwd.depth() : Infinity,
        platform: this.platform,
        nocase: this.nocase,
        includeChildMatches: this.includeChildMatches
      }).walkSync()
    ];
  }
  stream() {
    return new walker_js_1.GlobStream(this.patterns, this.scurry.cwd, {
      ...this.opts,
      maxDepth: this.maxDepth !== Infinity ? this.maxDepth + this.scurry.cwd.depth() : Infinity,
      platform: this.platform,
      nocase: this.nocase,
      includeChildMatches: this.includeChildMatches
    }).stream();
  }
  streamSync() {
    return new walker_js_1.GlobStream(this.patterns, this.scurry.cwd, {
      ...this.opts,
      maxDepth: this.maxDepth !== Infinity ? this.maxDepth + this.scurry.cwd.depth() : Infinity,
      platform: this.platform,
      nocase: this.nocase,
      includeChildMatches: this.includeChildMatches
    }).streamSync();
  }
  /**
   * Default sync iteration function. Returns a Generator that
   * iterates over the results.
   */
  iterateSync() {
    return this.streamSync()[Symbol.iterator]();
  }
  [Symbol.iterator]() {
    return this.iterateSync();
  }
  /**
   * Default async iteration function. Returns an AsyncGenerator that
   * iterates over the results.
   */
  iterate() {
    return this.stream()[Symbol.asyncIterator]();
  }
  [Symbol.asyncIterator]() {
    return this.iterate();
  }
}
glob.Glob = Glob;
var hasMagic$1 = {};
Object.defineProperty(hasMagic$1, "__esModule", { value: true });
hasMagic$1.hasMagic = void 0;
const minimatch_1$1 = commonjs$4;
const hasMagic = (pattern2, options = {}) => {
  if (!Array.isArray(pattern2)) {
    pattern2 = [pattern2];
  }
  for (const p of pattern2) {
    if (new minimatch_1$1.Minimatch(p, options).hasMagic())
      return true;
  }
  return false;
};
hasMagic$1.hasMagic = hasMagic;
(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.glob = exports.sync = exports.iterate = exports.iterateSync = exports.stream = exports.streamSync = exports.globIterate = exports.globIterateSync = exports.globSync = exports.globStream = exports.globStreamSync = exports.Ignore = exports.hasMagic = exports.Glob = exports.unescape = exports.escape = void 0;
  const minimatch_12 = commonjs$4;
  const glob_js_1 = glob;
  const has_magic_js_1 = hasMagic$1;
  var minimatch_2 = commonjs$4;
  Object.defineProperty(exports, "escape", { enumerable: true, get: function() {
    return minimatch_2.escape;
  } });
  Object.defineProperty(exports, "unescape", { enumerable: true, get: function() {
    return minimatch_2.unescape;
  } });
  var glob_js_2 = glob;
  Object.defineProperty(exports, "Glob", { enumerable: true, get: function() {
    return glob_js_2.Glob;
  } });
  var has_magic_js_2 = hasMagic$1;
  Object.defineProperty(exports, "hasMagic", { enumerable: true, get: function() {
    return has_magic_js_2.hasMagic;
  } });
  var ignore_js_12 = ignore;
  Object.defineProperty(exports, "Ignore", { enumerable: true, get: function() {
    return ignore_js_12.Ignore;
  } });
  function globStreamSync(pattern2, options = {}) {
    return new glob_js_1.Glob(pattern2, options).streamSync();
  }
  exports.globStreamSync = globStreamSync;
  function globStream(pattern2, options = {}) {
    return new glob_js_1.Glob(pattern2, options).stream();
  }
  exports.globStream = globStream;
  function globSync(pattern2, options = {}) {
    return new glob_js_1.Glob(pattern2, options).walkSync();
  }
  exports.globSync = globSync;
  async function glob_(pattern2, options = {}) {
    return new glob_js_1.Glob(pattern2, options).walk();
  }
  function globIterateSync(pattern2, options = {}) {
    return new glob_js_1.Glob(pattern2, options).iterateSync();
  }
  exports.globIterateSync = globIterateSync;
  function globIterate(pattern2, options = {}) {
    return new glob_js_1.Glob(pattern2, options).iterate();
  }
  exports.globIterate = globIterate;
  exports.streamSync = globStreamSync;
  exports.stream = Object.assign(globStream, { sync: globStreamSync });
  exports.iterateSync = globIterateSync;
  exports.iterate = Object.assign(globIterate, {
    sync: globIterateSync
  });
  exports.sync = Object.assign(globSync, {
    stream: globStreamSync,
    iterate: globIterateSync
  });
  exports.glob = Object.assign(glob_, {
    glob: glob_,
    globSync,
    sync: exports.sync,
    globStream,
    stream: exports.stream,
    globStreamSync,
    streamSync: exports.streamSync,
    globIterate,
    iterate: exports.iterate,
    globIterateSync,
    iterateSync: exports.iterateSync,
    Glob: glob_js_1.Glob,
    hasMagic: has_magic_js_1.hasMagic,
    escape: minimatch_12.escape,
    unescape: minimatch_12.unescape
  });
  exports.glob.glob = exports.glob;
})(commonjs$5);
var optArg = {};
(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.optArgSync = exports.optArg = exports.assertRimrafOptions = exports.isRimrafOptions = void 0;
  const typeOrUndef = (val, t) => typeof val === "undefined" || typeof val === t;
  const isRimrafOptions = (o) => !!o && typeof o === "object" && typeOrUndef(o.preserveRoot, "boolean") && typeOrUndef(o.tmp, "string") && typeOrUndef(o.maxRetries, "number") && typeOrUndef(o.retryDelay, "number") && typeOrUndef(o.backoff, "number") && typeOrUndef(o.maxBackoff, "number") && (typeOrUndef(o.glob, "boolean") || o.glob && typeof o.glob === "object") && typeOrUndef(o.filter, "function");
  exports.isRimrafOptions = isRimrafOptions;
  const assertRimrafOptions = (o) => {
    if (!(0, exports.isRimrafOptions)(o)) {
      throw new Error("invalid rimraf options");
    }
  };
  exports.assertRimrafOptions = assertRimrafOptions;
  const optArgT = (opt) => {
    (0, exports.assertRimrafOptions)(opt);
    const { glob: glob2, ...options } = opt;
    if (!glob2) {
      return options;
    }
    const globOpt = glob2 === true ? opt.signal ? { signal: opt.signal } : {} : opt.signal ? {
      signal: opt.signal,
      ...glob2
    } : glob2;
    return {
      ...options,
      glob: {
        ...globOpt,
        // always get absolute paths from glob, to ensure
        // that we are referencing the correct thing.
        absolute: true,
        withFileTypes: false
      }
    };
  };
  const optArg2 = (opt = {}) => optArgT(opt);
  exports.optArg = optArg2;
  const optArgSync = (opt = {}) => optArgT(opt);
  exports.optArgSync = optArgSync;
})(optArg);
var pathArg$1 = {};
var platform = {};
Object.defineProperty(platform, "__esModule", { value: true });
platform.default = process.env.__TESTING_RIMRAF_PLATFORM__ || process.platform;
var __importDefault$4 = commonjsGlobal && commonjsGlobal.__importDefault || function(mod) {
  return mod && mod.__esModule ? mod : { "default": mod };
};
Object.defineProperty(pathArg$1, "__esModule", { value: true });
const path_1$5 = require$$0$2;
const util_1 = require$$1$2;
const platform_js_1$3 = __importDefault$4(platform);
const pathArg = (path2, opt = {}) => {
  const type = typeof path2;
  if (type !== "string") {
    const ctor = path2 && type === "object" && path2.constructor;
    const received = ctor && ctor.name ? `an instance of ${ctor.name}` : type === "object" ? (0, util_1.inspect)(path2) : `type ${type} ${path2}`;
    const msg2 = `The "path" argument must be of type string. Received ${received}`;
    throw Object.assign(new TypeError(msg2), {
      path: path2,
      code: "ERR_INVALID_ARG_TYPE"
    });
  }
  if (/\0/.test(path2)) {
    const msg2 = "path must be a string without null bytes";
    throw Object.assign(new TypeError(msg2), {
      path: path2,
      code: "ERR_INVALID_ARG_VALUE"
    });
  }
  path2 = (0, path_1$5.resolve)(path2);
  const { root } = (0, path_1$5.parse)(path2);
  if (path2 === root && opt.preserveRoot !== false) {
    const msg2 = "refusing to remove root directory without preserveRoot:false";
    throw Object.assign(new Error(msg2), {
      path: path2,
      code: "ERR_PRESERVE_ROOT"
    });
  }
  if (platform_js_1$3.default === "win32") {
    const badWinChars = /[*|"<>?:]/;
    const { root: root2 } = (0, path_1$5.parse)(path2);
    if (badWinChars.test(path2.substring(root2.length))) {
      throw Object.assign(new Error("Illegal characters in path."), {
        path: path2,
        code: "EINVAL"
      });
    }
  }
  return path2;
};
pathArg$1.default = pathArg;
var rimrafManual = {};
var rimrafPosix$1 = {};
var fs$g = {};
(function(exports) {
  var __importDefault2 = commonjsGlobal && commonjsGlobal.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.promises = exports.readdirSync = exports.unlinkSync = exports.lstatSync = exports.statSync = exports.rmSync = exports.rmdirSync = exports.renameSync = exports.mkdirSync = exports.chmodSync = void 0;
  const fs_12 = __importDefault2(require$$0$1);
  var fs_2 = require$$0$1;
  Object.defineProperty(exports, "chmodSync", { enumerable: true, get: function() {
    return fs_2.chmodSync;
  } });
  Object.defineProperty(exports, "mkdirSync", { enumerable: true, get: function() {
    return fs_2.mkdirSync;
  } });
  Object.defineProperty(exports, "renameSync", { enumerable: true, get: function() {
    return fs_2.renameSync;
  } });
  Object.defineProperty(exports, "rmdirSync", { enumerable: true, get: function() {
    return fs_2.rmdirSync;
  } });
  Object.defineProperty(exports, "rmSync", { enumerable: true, get: function() {
    return fs_2.rmSync;
  } });
  Object.defineProperty(exports, "statSync", { enumerable: true, get: function() {
    return fs_2.statSync;
  } });
  Object.defineProperty(exports, "lstatSync", { enumerable: true, get: function() {
    return fs_2.lstatSync;
  } });
  Object.defineProperty(exports, "unlinkSync", { enumerable: true, get: function() {
    return fs_2.unlinkSync;
  } });
  const fs_3 = require$$0$1;
  const readdirSync = (path2) => (0, fs_3.readdirSync)(path2, { withFileTypes: true });
  exports.readdirSync = readdirSync;
  const chmod2 = (path2, mode2) => new Promise((res, rej) => fs_12.default.chmod(path2, mode2, (er, ...d) => er ? rej(er) : res(...d)));
  const mkdir = (path2, options) => new Promise((res, rej) => fs_12.default.mkdir(path2, options, (er, made) => er ? rej(er) : res(made)));
  const readdir2 = (path2) => new Promise((res, rej) => fs_12.default.readdir(path2, { withFileTypes: true }, (er, data) => er ? rej(er) : res(data)));
  const rename2 = (oldPath, newPath) => new Promise((res, rej) => fs_12.default.rename(oldPath, newPath, (er, ...d) => er ? rej(er) : res(...d)));
  const rm2 = (path2, options) => new Promise((res, rej) => fs_12.default.rm(path2, options, (er, ...d) => er ? rej(er) : res(...d)));
  const rmdir2 = (path2) => new Promise((res, rej) => fs_12.default.rmdir(path2, (er, ...d) => er ? rej(er) : res(...d)));
  const stat2 = (path2) => new Promise((res, rej) => fs_12.default.stat(path2, (er, data) => er ? rej(er) : res(data)));
  const lstat2 = (path2) => new Promise((res, rej) => fs_12.default.lstat(path2, (er, data) => er ? rej(er) : res(data)));
  const unlink2 = (path2) => new Promise((res, rej) => fs_12.default.unlink(path2, (er, ...d) => er ? rej(er) : res(...d)));
  exports.promises = {
    chmod: chmod2,
    mkdir,
    readdir: readdir2,
    rename: rename2,
    rm: rm2,
    rmdir: rmdir2,
    stat: stat2,
    lstat: lstat2,
    unlink: unlink2
  };
})(fs$g);
var readdirOrError$1 = {};
Object.defineProperty(readdirOrError$1, "__esModule", { value: true });
readdirOrError$1.readdirOrErrorSync = readdirOrError$1.readdirOrError = void 0;
const fs_js_1$6 = fs$g;
const { readdir } = fs_js_1$6.promises;
const readdirOrError = (path2) => readdir(path2).catch((er) => er);
readdirOrError$1.readdirOrError = readdirOrError;
const readdirOrErrorSync = (path2) => {
  try {
    return (0, fs_js_1$6.readdirSync)(path2);
  } catch (er) {
    return er;
  }
};
readdirOrError$1.readdirOrErrorSync = readdirOrErrorSync;
var ignoreEnoent = {};
Object.defineProperty(ignoreEnoent, "__esModule", { value: true });
ignoreEnoent.ignoreENOENTSync = ignoreEnoent.ignoreENOENT = void 0;
const ignoreENOENT = async (p) => p.catch((er) => {
  if (er.code !== "ENOENT") {
    throw er;
  }
});
ignoreEnoent.ignoreENOENT = ignoreENOENT;
const ignoreENOENTSync = (fn) => {
  try {
    return fn();
  } catch (er) {
    if ((er == null ? void 0 : er.code) !== "ENOENT") {
      throw er;
    }
  }
};
ignoreEnoent.ignoreENOENTSync = ignoreENOENTSync;
Object.defineProperty(rimrafPosix$1, "__esModule", { value: true });
rimrafPosix$1.rimrafPosixSync = rimrafPosix$1.rimrafPosix = void 0;
const fs_js_1$5 = fs$g;
const { lstat: lstat$2, rmdir: rmdir$2, unlink: unlink$2 } = fs_js_1$5.promises;
const path_1$4 = require$$0$2;
const readdir_or_error_js_1$2 = readdirOrError$1;
const ignore_enoent_js_1$2 = ignoreEnoent;
const rimrafPosix = async (path2, opt) => {
  var _a2;
  if ((_a2 = opt == null ? void 0 : opt.signal) == null ? void 0 : _a2.aborted) {
    throw opt.signal.reason;
  }
  try {
    return await rimrafPosixDir(path2, opt, await lstat$2(path2));
  } catch (er) {
    if ((er == null ? void 0 : er.code) === "ENOENT")
      return true;
    throw er;
  }
};
rimrafPosix$1.rimrafPosix = rimrafPosix;
const rimrafPosixSync = (path2, opt) => {
  var _a2;
  if ((_a2 = opt == null ? void 0 : opt.signal) == null ? void 0 : _a2.aborted) {
    throw opt.signal.reason;
  }
  try {
    return rimrafPosixDirSync(path2, opt, (0, fs_js_1$5.lstatSync)(path2));
  } catch (er) {
    if ((er == null ? void 0 : er.code) === "ENOENT")
      return true;
    throw er;
  }
};
rimrafPosix$1.rimrafPosixSync = rimrafPosixSync;
const rimrafPosixDir = async (path2, opt, ent) => {
  var _a2;
  if ((_a2 = opt == null ? void 0 : opt.signal) == null ? void 0 : _a2.aborted) {
    throw opt.signal.reason;
  }
  const entries = ent.isDirectory() ? await (0, readdir_or_error_js_1$2.readdirOrError)(path2) : null;
  if (!Array.isArray(entries)) {
    if (entries) {
      if (entries.code === "ENOENT") {
        return true;
      }
      if (entries.code !== "ENOTDIR") {
        throw entries;
      }
    }
    if (opt.filter && !await opt.filter(path2, ent)) {
      return false;
    }
    await (0, ignore_enoent_js_1$2.ignoreENOENT)(unlink$2(path2));
    return true;
  }
  const removedAll = (await Promise.all(entries.map((ent2) => rimrafPosixDir((0, path_1$4.resolve)(path2, ent2.name), opt, ent2)))).reduce((a, b) => a && b, true);
  if (!removedAll) {
    return false;
  }
  if (opt.preserveRoot === false && path2 === (0, path_1$4.parse)(path2).root) {
    return false;
  }
  if (opt.filter && !await opt.filter(path2, ent)) {
    return false;
  }
  await (0, ignore_enoent_js_1$2.ignoreENOENT)(rmdir$2(path2));
  return true;
};
const rimrafPosixDirSync = (path2, opt, ent) => {
  var _a2;
  if ((_a2 = opt == null ? void 0 : opt.signal) == null ? void 0 : _a2.aborted) {
    throw opt.signal.reason;
  }
  const entries = ent.isDirectory() ? (0, readdir_or_error_js_1$2.readdirOrErrorSync)(path2) : null;
  if (!Array.isArray(entries)) {
    if (entries) {
      if (entries.code === "ENOENT") {
        return true;
      }
      if (entries.code !== "ENOTDIR") {
        throw entries;
      }
    }
    if (opt.filter && !opt.filter(path2, ent)) {
      return false;
    }
    (0, ignore_enoent_js_1$2.ignoreENOENTSync)(() => (0, fs_js_1$5.unlinkSync)(path2));
    return true;
  }
  let removedAll = true;
  for (const ent2 of entries) {
    const p = (0, path_1$4.resolve)(path2, ent2.name);
    removedAll = rimrafPosixDirSync(p, opt, ent2) && removedAll;
  }
  if (opt.preserveRoot === false && path2 === (0, path_1$4.parse)(path2).root) {
    return false;
  }
  if (!removedAll) {
    return false;
  }
  if (opt.filter && !opt.filter(path2, ent)) {
    return false;
  }
  (0, ignore_enoent_js_1$2.ignoreENOENTSync)(() => (0, fs_js_1$5.rmdirSync)(path2));
  return true;
};
var rimrafWindows$1 = {};
var fixEperm = {};
Object.defineProperty(fixEperm, "__esModule", { value: true });
fixEperm.fixEPERMSync = fixEperm.fixEPERM = void 0;
const fs_js_1$4 = fs$g;
const { chmod: chmod$1 } = fs_js_1$4.promises;
const fixEPERM = (fn) => async (path2) => {
  try {
    return await fn(path2);
  } catch (er) {
    const fer = er;
    if ((fer == null ? void 0 : fer.code) === "ENOENT") {
      return;
    }
    if ((fer == null ? void 0 : fer.code) === "EPERM") {
      try {
        await chmod$1(path2, 438);
      } catch (er2) {
        const fer2 = er2;
        if ((fer2 == null ? void 0 : fer2.code) === "ENOENT") {
          return;
        }
        throw er;
      }
      return await fn(path2);
    }
    throw er;
  }
};
fixEperm.fixEPERM = fixEPERM;
const fixEPERMSync = (fn) => (path2) => {
  try {
    return fn(path2);
  } catch (er) {
    const fer = er;
    if ((fer == null ? void 0 : fer.code) === "ENOENT") {
      return;
    }
    if ((fer == null ? void 0 : fer.code) === "EPERM") {
      try {
        (0, fs_js_1$4.chmodSync)(path2, 438);
      } catch (er2) {
        const fer2 = er2;
        if ((fer2 == null ? void 0 : fer2.code) === "ENOENT") {
          return;
        }
        throw er;
      }
      return fn(path2);
    }
    throw er;
  }
};
fixEperm.fixEPERMSync = fixEPERMSync;
var retryBusy = {};
(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.retryBusySync = exports.retryBusy = exports.codes = exports.MAXRETRIES = exports.RATE = exports.MAXBACKOFF = void 0;
  exports.MAXBACKOFF = 200;
  exports.RATE = 1.2;
  exports.MAXRETRIES = 10;
  exports.codes = /* @__PURE__ */ new Set(["EMFILE", "ENFILE", "EBUSY"]);
  const retryBusy2 = (fn) => {
    const method = async (path2, opt, backoff = 1, total = 0) => {
      const mbo = opt.maxBackoff || exports.MAXBACKOFF;
      const rate = opt.backoff || exports.RATE;
      const max = opt.maxRetries || exports.MAXRETRIES;
      let retries = 0;
      while (true) {
        try {
          return await fn(path2);
        } catch (er) {
          const fer = er;
          if ((fer == null ? void 0 : fer.path) === path2 && (fer == null ? void 0 : fer.code) && exports.codes.has(fer.code)) {
            backoff = Math.ceil(backoff * rate);
            total = backoff + total;
            if (total < mbo) {
              return new Promise((res, rej) => {
                setTimeout(() => {
                  method(path2, opt, backoff, total).then(res, rej);
                }, backoff);
              });
            }
            if (retries < max) {
              retries++;
              continue;
            }
          }
          throw er;
        }
      }
    };
    return method;
  };
  exports.retryBusy = retryBusy2;
  const retryBusySync = (fn) => {
    const method = (path2, opt) => {
      const max = opt.maxRetries || exports.MAXRETRIES;
      let retries = 0;
      while (true) {
        try {
          return fn(path2);
        } catch (er) {
          const fer = er;
          if ((fer == null ? void 0 : fer.path) === path2 && (fer == null ? void 0 : fer.code) && exports.codes.has(fer.code) && retries < max) {
            retries++;
            continue;
          }
          throw er;
        }
      }
    };
    return method;
  };
  exports.retryBusySync = retryBusySync;
})(retryBusy);
var rimrafMoveRemove$1 = {};
var defaultTmp = {};
var __importDefault$3 = commonjsGlobal && commonjsGlobal.__importDefault || function(mod) {
  return mod && mod.__esModule ? mod : { "default": mod };
};
Object.defineProperty(defaultTmp, "__esModule", { value: true });
defaultTmp.defaultTmpSync = defaultTmp.defaultTmp = void 0;
const os_1 = require$$0$3;
const path_1$3 = require$$0$2;
const fs_js_1$3 = fs$g;
const platform_js_1$2 = __importDefault$3(platform);
const { stat } = fs_js_1$3.promises;
const isDirSync = (path2) => {
  try {
    return (0, fs_js_1$3.statSync)(path2).isDirectory();
  } catch (er) {
    return false;
  }
};
const isDir = (path2) => stat(path2).then((st) => st.isDirectory(), () => false);
const win32DefaultTmp = async (path2) => {
  const { root } = (0, path_1$3.parse)(path2);
  const tmp = (0, os_1.tmpdir)();
  const { root: tmpRoot } = (0, path_1$3.parse)(tmp);
  if (root.toLowerCase() === tmpRoot.toLowerCase()) {
    return tmp;
  }
  const driveTmp = (0, path_1$3.resolve)(root, "/temp");
  if (await isDir(driveTmp)) {
    return driveTmp;
  }
  return root;
};
const win32DefaultTmpSync = (path2) => {
  const { root } = (0, path_1$3.parse)(path2);
  const tmp = (0, os_1.tmpdir)();
  const { root: tmpRoot } = (0, path_1$3.parse)(tmp);
  if (root.toLowerCase() === tmpRoot.toLowerCase()) {
    return tmp;
  }
  const driveTmp = (0, path_1$3.resolve)(root, "/temp");
  if (isDirSync(driveTmp)) {
    return driveTmp;
  }
  return root;
};
const posixDefaultTmp = async () => (0, os_1.tmpdir)();
const posixDefaultTmpSync = () => (0, os_1.tmpdir)();
defaultTmp.defaultTmp = platform_js_1$2.default === "win32" ? win32DefaultTmp : posixDefaultTmp;
defaultTmp.defaultTmpSync = platform_js_1$2.default === "win32" ? win32DefaultTmpSync : posixDefaultTmpSync;
Object.defineProperty(rimrafMoveRemove$1, "__esModule", { value: true });
rimrafMoveRemove$1.rimrafMoveRemoveSync = rimrafMoveRemove$1.rimrafMoveRemove = void 0;
const path_1$2 = require$$0$2;
const default_tmp_js_1 = defaultTmp;
const ignore_enoent_js_1$1 = ignoreEnoent;
const fs_js_1$2 = fs$g;
const { lstat: lstat$1, rename: rename$2, unlink: unlink$1, rmdir: rmdir$1, chmod } = fs_js_1$2.promises;
const readdir_or_error_js_1$1 = readdirOrError$1;
const uniqueFilename = (path2) => `.${(0, path_1$2.basename)(path2)}.${Math.random()}`;
const unlinkFixEPERM = async (path2) => unlink$1(path2).catch((er) => {
  if (er.code === "EPERM") {
    return chmod(path2, 438).then(() => unlink$1(path2), (er2) => {
      if (er2.code === "ENOENT") {
        return;
      }
      throw er;
    });
  } else if (er.code === "ENOENT") {
    return;
  }
  throw er;
});
const unlinkFixEPERMSync = (path2) => {
  try {
    (0, fs_js_1$2.unlinkSync)(path2);
  } catch (er) {
    if ((er == null ? void 0 : er.code) === "EPERM") {
      try {
        return (0, fs_js_1$2.chmodSync)(path2, 438);
      } catch (er2) {
        if ((er2 == null ? void 0 : er2.code) === "ENOENT") {
          return;
        }
        throw er;
      }
    } else if ((er == null ? void 0 : er.code) === "ENOENT") {
      return;
    }
    throw er;
  }
};
const rimrafMoveRemove = async (path2, opt) => {
  var _a2;
  if ((_a2 = opt == null ? void 0 : opt.signal) == null ? void 0 : _a2.aborted) {
    throw opt.signal.reason;
  }
  try {
    return await rimrafMoveRemoveDir(path2, opt, await lstat$1(path2));
  } catch (er) {
    if ((er == null ? void 0 : er.code) === "ENOENT")
      return true;
    throw er;
  }
};
rimrafMoveRemove$1.rimrafMoveRemove = rimrafMoveRemove;
const rimrafMoveRemoveDir = async (path2, opt, ent) => {
  var _a2;
  if ((_a2 = opt == null ? void 0 : opt.signal) == null ? void 0 : _a2.aborted) {
    throw opt.signal.reason;
  }
  if (!opt.tmp) {
    return rimrafMoveRemoveDir(path2, { ...opt, tmp: await (0, default_tmp_js_1.defaultTmp)(path2) }, ent);
  }
  if (path2 === opt.tmp && (0, path_1$2.parse)(path2).root !== path2) {
    throw new Error("cannot delete temp directory used for deletion");
  }
  const entries = ent.isDirectory() ? await (0, readdir_or_error_js_1$1.readdirOrError)(path2) : null;
  if (!Array.isArray(entries)) {
    if (entries) {
      if (entries.code === "ENOENT") {
        return true;
      }
      if (entries.code !== "ENOTDIR") {
        throw entries;
      }
    }
    if (opt.filter && !await opt.filter(path2, ent)) {
      return false;
    }
    await (0, ignore_enoent_js_1$1.ignoreENOENT)(tmpUnlink(path2, opt.tmp, unlinkFixEPERM));
    return true;
  }
  const removedAll = (await Promise.all(entries.map((ent2) => rimrafMoveRemoveDir((0, path_1$2.resolve)(path2, ent2.name), opt, ent2)))).reduce((a, b) => a && b, true);
  if (!removedAll) {
    return false;
  }
  if (opt.preserveRoot === false && path2 === (0, path_1$2.parse)(path2).root) {
    return false;
  }
  if (opt.filter && !await opt.filter(path2, ent)) {
    return false;
  }
  await (0, ignore_enoent_js_1$1.ignoreENOENT)(tmpUnlink(path2, opt.tmp, rmdir$1));
  return true;
};
const tmpUnlink = async (path2, tmp, rm2) => {
  const tmpFile = (0, path_1$2.resolve)(tmp, uniqueFilename(path2));
  await rename$2(path2, tmpFile);
  return await rm2(tmpFile);
};
const rimrafMoveRemoveSync = (path2, opt) => {
  var _a2;
  if ((_a2 = opt == null ? void 0 : opt.signal) == null ? void 0 : _a2.aborted) {
    throw opt.signal.reason;
  }
  try {
    return rimrafMoveRemoveDirSync(path2, opt, (0, fs_js_1$2.lstatSync)(path2));
  } catch (er) {
    if ((er == null ? void 0 : er.code) === "ENOENT")
      return true;
    throw er;
  }
};
rimrafMoveRemove$1.rimrafMoveRemoveSync = rimrafMoveRemoveSync;
const rimrafMoveRemoveDirSync = (path2, opt, ent) => {
  var _a2;
  if ((_a2 = opt == null ? void 0 : opt.signal) == null ? void 0 : _a2.aborted) {
    throw opt.signal.reason;
  }
  if (!opt.tmp) {
    return rimrafMoveRemoveDirSync(path2, { ...opt, tmp: (0, default_tmp_js_1.defaultTmpSync)(path2) }, ent);
  }
  const tmp = opt.tmp;
  if (path2 === opt.tmp && (0, path_1$2.parse)(path2).root !== path2) {
    throw new Error("cannot delete temp directory used for deletion");
  }
  const entries = ent.isDirectory() ? (0, readdir_or_error_js_1$1.readdirOrErrorSync)(path2) : null;
  if (!Array.isArray(entries)) {
    if (entries) {
      if (entries.code === "ENOENT") {
        return true;
      }
      if (entries.code !== "ENOTDIR") {
        throw entries;
      }
    }
    if (opt.filter && !opt.filter(path2, ent)) {
      return false;
    }
    (0, ignore_enoent_js_1$1.ignoreENOENTSync)(() => tmpUnlinkSync(path2, tmp, unlinkFixEPERMSync));
    return true;
  }
  let removedAll = true;
  for (const ent2 of entries) {
    const p = (0, path_1$2.resolve)(path2, ent2.name);
    removedAll = rimrafMoveRemoveDirSync(p, opt, ent2) && removedAll;
  }
  if (!removedAll) {
    return false;
  }
  if (opt.preserveRoot === false && path2 === (0, path_1$2.parse)(path2).root) {
    return false;
  }
  if (opt.filter && !opt.filter(path2, ent)) {
    return false;
  }
  (0, ignore_enoent_js_1$1.ignoreENOENTSync)(() => tmpUnlinkSync(path2, tmp, fs_js_1$2.rmdirSync));
  return true;
};
const tmpUnlinkSync = (path2, tmp, rmSync) => {
  const tmpFile = (0, path_1$2.resolve)(tmp, uniqueFilename(path2));
  (0, fs_js_1$2.renameSync)(path2, tmpFile);
  return rmSync(tmpFile);
};
Object.defineProperty(rimrafWindows$1, "__esModule", { value: true });
rimrafWindows$1.rimrafWindowsSync = rimrafWindows$1.rimrafWindows = void 0;
const path_1$1 = require$$0$2;
const fix_eperm_js_1 = fixEperm;
const fs_js_1$1 = fs$g;
const ignore_enoent_js_1 = ignoreEnoent;
const readdir_or_error_js_1 = readdirOrError$1;
const retry_busy_js_1 = retryBusy;
const rimraf_move_remove_js_1 = rimrafMoveRemove$1;
const { unlink, rmdir, lstat } = fs_js_1$1.promises;
const rimrafWindowsFile = (0, retry_busy_js_1.retryBusy)((0, fix_eperm_js_1.fixEPERM)(unlink));
const rimrafWindowsFileSync = (0, retry_busy_js_1.retryBusySync)((0, fix_eperm_js_1.fixEPERMSync)(fs_js_1$1.unlinkSync));
const rimrafWindowsDirRetry = (0, retry_busy_js_1.retryBusy)((0, fix_eperm_js_1.fixEPERM)(rmdir));
const rimrafWindowsDirRetrySync = (0, retry_busy_js_1.retryBusySync)((0, fix_eperm_js_1.fixEPERMSync)(fs_js_1$1.rmdirSync));
const rimrafWindowsDirMoveRemoveFallback = async (path2, opt) => {
  var _a2;
  if ((_a2 = opt == null ? void 0 : opt.signal) == null ? void 0 : _a2.aborted) {
    throw opt.signal.reason;
  }
  const { filter, ...options } = opt;
  try {
    return await rimrafWindowsDirRetry(path2, options);
  } catch (er) {
    if ((er == null ? void 0 : er.code) === "ENOTEMPTY") {
      return await (0, rimraf_move_remove_js_1.rimrafMoveRemove)(path2, options);
    }
    throw er;
  }
};
const rimrafWindowsDirMoveRemoveFallbackSync = (path2, opt) => {
  var _a2;
  if ((_a2 = opt == null ? void 0 : opt.signal) == null ? void 0 : _a2.aborted) {
    throw opt.signal.reason;
  }
  const { filter, ...options } = opt;
  try {
    return rimrafWindowsDirRetrySync(path2, options);
  } catch (er) {
    const fer = er;
    if ((fer == null ? void 0 : fer.code) === "ENOTEMPTY") {
      return (0, rimraf_move_remove_js_1.rimrafMoveRemoveSync)(path2, options);
    }
    throw er;
  }
};
const START = Symbol("start");
const CHILD = Symbol("child");
const FINISH = Symbol("finish");
const rimrafWindows = async (path2, opt) => {
  var _a2;
  if ((_a2 = opt == null ? void 0 : opt.signal) == null ? void 0 : _a2.aborted) {
    throw opt.signal.reason;
  }
  try {
    return await rimrafWindowsDir(path2, opt, await lstat(path2), START);
  } catch (er) {
    if ((er == null ? void 0 : er.code) === "ENOENT")
      return true;
    throw er;
  }
};
rimrafWindows$1.rimrafWindows = rimrafWindows;
const rimrafWindowsSync = (path2, opt) => {
  var _a2;
  if ((_a2 = opt == null ? void 0 : opt.signal) == null ? void 0 : _a2.aborted) {
    throw opt.signal.reason;
  }
  try {
    return rimrafWindowsDirSync(path2, opt, (0, fs_js_1$1.lstatSync)(path2), START);
  } catch (er) {
    if ((er == null ? void 0 : er.code) === "ENOENT")
      return true;
    throw er;
  }
};
rimrafWindows$1.rimrafWindowsSync = rimrafWindowsSync;
const rimrafWindowsDir = async (path2, opt, ent, state = START) => {
  var _a2;
  if ((_a2 = opt == null ? void 0 : opt.signal) == null ? void 0 : _a2.aborted) {
    throw opt.signal.reason;
  }
  const entries = ent.isDirectory() ? await (0, readdir_or_error_js_1.readdirOrError)(path2) : null;
  if (!Array.isArray(entries)) {
    if (entries) {
      if (entries.code === "ENOENT") {
        return true;
      }
      if (entries.code !== "ENOTDIR") {
        throw entries;
      }
    }
    if (opt.filter && !await opt.filter(path2, ent)) {
      return false;
    }
    await (0, ignore_enoent_js_1.ignoreENOENT)(rimrafWindowsFile(path2, opt));
    return true;
  }
  const s = state === START ? CHILD : state;
  const removedAll = (await Promise.all(entries.map((ent2) => rimrafWindowsDir((0, path_1$1.resolve)(path2, ent2.name), opt, ent2, s)))).reduce((a, b) => a && b, true);
  if (state === START) {
    return rimrafWindowsDir(path2, opt, ent, FINISH);
  } else if (state === FINISH) {
    if (opt.preserveRoot === false && path2 === (0, path_1$1.parse)(path2).root) {
      return false;
    }
    if (!removedAll) {
      return false;
    }
    if (opt.filter && !await opt.filter(path2, ent)) {
      return false;
    }
    await (0, ignore_enoent_js_1.ignoreENOENT)(rimrafWindowsDirMoveRemoveFallback(path2, opt));
  }
  return true;
};
const rimrafWindowsDirSync = (path2, opt, ent, state = START) => {
  const entries = ent.isDirectory() ? (0, readdir_or_error_js_1.readdirOrErrorSync)(path2) : null;
  if (!Array.isArray(entries)) {
    if (entries) {
      if (entries.code === "ENOENT") {
        return true;
      }
      if (entries.code !== "ENOTDIR") {
        throw entries;
      }
    }
    if (opt.filter && !opt.filter(path2, ent)) {
      return false;
    }
    (0, ignore_enoent_js_1.ignoreENOENTSync)(() => rimrafWindowsFileSync(path2, opt));
    return true;
  }
  let removedAll = true;
  for (const ent2 of entries) {
    const s = state === START ? CHILD : state;
    const p = (0, path_1$1.resolve)(path2, ent2.name);
    removedAll = rimrafWindowsDirSync(p, opt, ent2, s) && removedAll;
  }
  if (state === START) {
    return rimrafWindowsDirSync(path2, opt, ent, FINISH);
  } else if (state === FINISH) {
    if (opt.preserveRoot === false && path2 === (0, path_1$1.parse)(path2).root) {
      return false;
    }
    if (!removedAll) {
      return false;
    }
    if (opt.filter && !opt.filter(path2, ent)) {
      return false;
    }
    (0, ignore_enoent_js_1.ignoreENOENTSync)(() => {
      rimrafWindowsDirMoveRemoveFallbackSync(path2, opt);
    });
  }
  return true;
};
var __importDefault$2 = commonjsGlobal && commonjsGlobal.__importDefault || function(mod) {
  return mod && mod.__esModule ? mod : { "default": mod };
};
Object.defineProperty(rimrafManual, "__esModule", { value: true });
rimrafManual.rimrafManualSync = rimrafManual.rimrafManual = void 0;
const platform_js_1$1 = __importDefault$2(platform);
const rimraf_posix_js_1 = rimrafPosix$1;
const rimraf_windows_js_1 = rimrafWindows$1;
rimrafManual.rimrafManual = platform_js_1$1.default === "win32" ? rimraf_windows_js_1.rimrafWindows : rimraf_posix_js_1.rimrafPosix;
rimrafManual.rimrafManualSync = platform_js_1$1.default === "win32" ? rimraf_windows_js_1.rimrafWindowsSync : rimraf_posix_js_1.rimrafPosixSync;
var rimrafNative$1 = {};
Object.defineProperty(rimrafNative$1, "__esModule", { value: true });
rimrafNative$1.rimrafNativeSync = rimrafNative$1.rimrafNative = void 0;
const fs_js_1 = fs$g;
const { rm } = fs_js_1.promises;
const rimrafNative = async (path2, opt) => {
  await rm(path2, {
    ...opt,
    force: true,
    recursive: true
  });
  return true;
};
rimrafNative$1.rimrafNative = rimrafNative;
const rimrafNativeSync = (path2, opt) => {
  (0, fs_js_1.rmSync)(path2, {
    ...opt,
    force: true,
    recursive: true
  });
  return true;
};
rimrafNative$1.rimrafNativeSync = rimrafNativeSync;
var useNative = {};
var __importDefault$1 = commonjsGlobal && commonjsGlobal.__importDefault || function(mod) {
  return mod && mod.__esModule ? mod : { "default": mod };
};
Object.defineProperty(useNative, "__esModule", { value: true });
useNative.useNativeSync = useNative.useNative = void 0;
const platform_js_1 = __importDefault$1(platform);
const version = process.env.__TESTING_RIMRAF_NODE_VERSION__ || process.version;
const versArr = version.replace(/^v/, "").split(".");
const [major = 0, minor = 0] = versArr.map((v) => parseInt(v, 10));
const hasNative = major > 14 || major === 14 && minor >= 14;
useNative.useNative = !hasNative || platform_js_1.default === "win32" ? () => false : (opt) => !(opt == null ? void 0 : opt.signal) && !(opt == null ? void 0 : opt.filter);
useNative.useNativeSync = !hasNative || platform_js_1.default === "win32" ? () => false : (opt) => !(opt == null ? void 0 : opt.signal) && !(opt == null ? void 0 : opt.filter);
(function(exports) {
  var __importDefault2 = commonjsGlobal && commonjsGlobal.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.rimraf = exports.sync = exports.rimrafSync = exports.moveRemove = exports.moveRemoveSync = exports.posix = exports.posixSync = exports.windows = exports.windowsSync = exports.manual = exports.manualSync = exports.native = exports.nativeSync = exports.isRimrafOptions = exports.assertRimrafOptions = void 0;
  const glob_1 = commonjs$5;
  const opt_arg_js_1 = optArg;
  const path_arg_js_1 = __importDefault2(pathArg$1);
  const rimraf_manual_js_1 = rimrafManual;
  const rimraf_move_remove_js_12 = rimrafMoveRemove$1;
  const rimraf_native_js_1 = rimrafNative$1;
  const rimraf_posix_js_12 = rimrafPosix$1;
  const rimraf_windows_js_12 = rimrafWindows$1;
  const use_native_js_1 = useNative;
  var opt_arg_js_2 = optArg;
  Object.defineProperty(exports, "assertRimrafOptions", { enumerable: true, get: function() {
    return opt_arg_js_2.assertRimrafOptions;
  } });
  Object.defineProperty(exports, "isRimrafOptions", { enumerable: true, get: function() {
    return opt_arg_js_2.isRimrafOptions;
  } });
  const wrap = (fn) => async (path2, opt) => {
    const options = (0, opt_arg_js_1.optArg)(opt);
    if (options.glob) {
      path2 = await (0, glob_1.glob)(path2, options.glob);
    }
    if (Array.isArray(path2)) {
      return !!(await Promise.all(path2.map((p) => fn((0, path_arg_js_1.default)(p, options), options)))).reduce((a, b) => a && b, true);
    } else {
      return !!await fn((0, path_arg_js_1.default)(path2, options), options);
    }
  };
  const wrapSync = (fn) => (path2, opt) => {
    const options = (0, opt_arg_js_1.optArgSync)(opt);
    if (options.glob) {
      path2 = (0, glob_1.globSync)(path2, options.glob);
    }
    if (Array.isArray(path2)) {
      return !!path2.map((p) => fn((0, path_arg_js_1.default)(p, options), options)).reduce((a, b) => a && b, true);
    } else {
      return !!fn((0, path_arg_js_1.default)(path2, options), options);
    }
  };
  exports.nativeSync = wrapSync(rimraf_native_js_1.rimrafNativeSync);
  exports.native = Object.assign(wrap(rimraf_native_js_1.rimrafNative), { sync: exports.nativeSync });
  exports.manualSync = wrapSync(rimraf_manual_js_1.rimrafManualSync);
  exports.manual = Object.assign(wrap(rimraf_manual_js_1.rimrafManual), { sync: exports.manualSync });
  exports.windowsSync = wrapSync(rimraf_windows_js_12.rimrafWindowsSync);
  exports.windows = Object.assign(wrap(rimraf_windows_js_12.rimrafWindows), { sync: exports.windowsSync });
  exports.posixSync = wrapSync(rimraf_posix_js_12.rimrafPosixSync);
  exports.posix = Object.assign(wrap(rimraf_posix_js_12.rimrafPosix), { sync: exports.posixSync });
  exports.moveRemoveSync = wrapSync(rimraf_move_remove_js_12.rimrafMoveRemoveSync);
  exports.moveRemove = Object.assign(wrap(rimraf_move_remove_js_12.rimrafMoveRemove), {
    sync: exports.moveRemoveSync
  });
  exports.rimrafSync = wrapSync((path2, opt) => (0, use_native_js_1.useNativeSync)(opt) ? (0, rimraf_native_js_1.rimrafNativeSync)(path2, opt) : (0, rimraf_manual_js_1.rimrafManualSync)(path2, opt));
  exports.sync = exports.rimrafSync;
  const rimraf_ = wrap((path2, opt) => (0, use_native_js_1.useNative)(opt) ? (0, rimraf_native_js_1.rimrafNative)(path2, opt) : (0, rimraf_manual_js_1.rimrafManual)(path2, opt));
  exports.rimraf = Object.assign(rimraf_, {
    rimraf: rimraf_,
    sync: exports.rimrafSync,
    rimrafSync: exports.rimrafSync,
    manual: exports.manual,
    manualSync: exports.manualSync,
    native: exports.native,
    nativeSync: exports.nativeSync,
    posix: exports.posix,
    posixSync: exports.posixSync,
    windows: exports.windows,
    windowsSync: exports.windowsSync,
    moveRemove: exports.moveRemove,
    moveRemoveSync: exports.moveRemoveSync
  });
  exports.rimraf.rimraf = exports.rimraf;
})(commonjs$6);
var unzip$1 = {};
var utf8$5 = {};
var utils$r = {};
var support$4 = {};
var readable = { exports: {} };
var processNextickArgs = { exports: {} };
var hasRequiredProcessNextickArgs;
function requireProcessNextickArgs() {
  if (hasRequiredProcessNextickArgs)
    return processNextickArgs.exports;
  hasRequiredProcessNextickArgs = 1;
  if (typeof process === "undefined" || !process.version || process.version.indexOf("v0.") === 0 || process.version.indexOf("v1.") === 0 && process.version.indexOf("v1.8.") !== 0) {
    processNextickArgs.exports = { nextTick };
  } else {
    processNextickArgs.exports = process;
  }
  function nextTick(fn, arg1, arg2, arg3) {
    if (typeof fn !== "function") {
      throw new TypeError('"callback" argument must be a function');
    }
    var len = arguments.length;
    var args, i;
    switch (len) {
      case 0:
      case 1:
        return process.nextTick(fn);
      case 2:
        return process.nextTick(function afterTickOne() {
          fn.call(null, arg1);
        });
      case 3:
        return process.nextTick(function afterTickTwo() {
          fn.call(null, arg1, arg2);
        });
      case 4:
        return process.nextTick(function afterTickThree() {
          fn.call(null, arg1, arg2, arg3);
        });
      default:
        args = new Array(len - 1);
        i = 0;
        while (i < args.length) {
          args[i++] = arguments[i];
        }
        return process.nextTick(function afterTick() {
          fn.apply(null, args);
        });
    }
  }
  return processNextickArgs.exports;
}
var isarray;
var hasRequiredIsarray;
function requireIsarray() {
  if (hasRequiredIsarray)
    return isarray;
  hasRequiredIsarray = 1;
  var toString2 = {}.toString;
  isarray = Array.isArray || function(arr) {
    return toString2.call(arr) == "[object Array]";
  };
  return isarray;
}
var stream;
var hasRequiredStream;
function requireStream() {
  if (hasRequiredStream)
    return stream;
  hasRequiredStream = 1;
  stream = require$$0$4;
  return stream;
}
var safeBuffer = { exports: {} };
var hasRequiredSafeBuffer;
function requireSafeBuffer() {
  if (hasRequiredSafeBuffer)
    return safeBuffer.exports;
  hasRequiredSafeBuffer = 1;
  (function(module2, exports) {
    var buffer = require$$0$5;
    var Buffer2 = buffer.Buffer;
    function copyProps(src, dst) {
      for (var key in src) {
        dst[key] = src[key];
      }
    }
    if (Buffer2.from && Buffer2.alloc && Buffer2.allocUnsafe && Buffer2.allocUnsafeSlow) {
      module2.exports = buffer;
    } else {
      copyProps(buffer, exports);
      exports.Buffer = SafeBuffer;
    }
    function SafeBuffer(arg, encodingOrOffset, length) {
      return Buffer2(arg, encodingOrOffset, length);
    }
    copyProps(Buffer2, SafeBuffer);
    SafeBuffer.from = function(arg, encodingOrOffset, length) {
      if (typeof arg === "number") {
        throw new TypeError("Argument must not be a number");
      }
      return Buffer2(arg, encodingOrOffset, length);
    };
    SafeBuffer.alloc = function(size, fill, encoding) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      var buf = Buffer2(size);
      if (fill !== void 0) {
        if (typeof encoding === "string") {
          buf.fill(fill, encoding);
        } else {
          buf.fill(fill);
        }
      } else {
        buf.fill(0);
      }
      return buf;
    };
    SafeBuffer.allocUnsafe = function(size) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      return Buffer2(size);
    };
    SafeBuffer.allocUnsafeSlow = function(size) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      return buffer.SlowBuffer(size);
    };
  })(safeBuffer, safeBuffer.exports);
  return safeBuffer.exports;
}
var util$1 = {};
var hasRequiredUtil;
function requireUtil() {
  if (hasRequiredUtil)
    return util$1;
  hasRequiredUtil = 1;
  function isArray(arg) {
    if (Array.isArray) {
      return Array.isArray(arg);
    }
    return objectToString(arg) === "[object Array]";
  }
  util$1.isArray = isArray;
  function isBoolean(arg) {
    return typeof arg === "boolean";
  }
  util$1.isBoolean = isBoolean;
  function isNull(arg) {
    return arg === null;
  }
  util$1.isNull = isNull;
  function isNullOrUndefined(arg) {
    return arg == null;
  }
  util$1.isNullOrUndefined = isNullOrUndefined;
  function isNumber(arg) {
    return typeof arg === "number";
  }
  util$1.isNumber = isNumber;
  function isString(arg) {
    return typeof arg === "string";
  }
  util$1.isString = isString;
  function isSymbol(arg) {
    return typeof arg === "symbol";
  }
  util$1.isSymbol = isSymbol;
  function isUndefined(arg) {
    return arg === void 0;
  }
  util$1.isUndefined = isUndefined;
  function isRegExp2(re) {
    return objectToString(re) === "[object RegExp]";
  }
  util$1.isRegExp = isRegExp2;
  function isObject(arg) {
    return typeof arg === "object" && arg !== null;
  }
  util$1.isObject = isObject;
  function isDate(d) {
    return objectToString(d) === "[object Date]";
  }
  util$1.isDate = isDate;
  function isError(e) {
    return objectToString(e) === "[object Error]" || e instanceof Error;
  }
  util$1.isError = isError;
  function isFunction(arg) {
    return typeof arg === "function";
  }
  util$1.isFunction = isFunction;
  function isPrimitive(arg) {
    return arg === null || typeof arg === "boolean" || typeof arg === "number" || typeof arg === "string" || typeof arg === "symbol" || // ES6 symbol
    typeof arg === "undefined";
  }
  util$1.isPrimitive = isPrimitive;
  util$1.isBuffer = require$$0$5.Buffer.isBuffer;
  function objectToString(o) {
    return Object.prototype.toString.call(o);
  }
  return util$1;
}
var inherits = { exports: {} };
var inherits_browser = { exports: {} };
var hasRequiredInherits_browser;
function requireInherits_browser() {
  if (hasRequiredInherits_browser)
    return inherits_browser.exports;
  hasRequiredInherits_browser = 1;
  if (typeof Object.create === "function") {
    inherits_browser.exports = function inherits2(ctor, superCtor) {
      if (superCtor) {
        ctor.super_ = superCtor;
        ctor.prototype = Object.create(superCtor.prototype, {
          constructor: {
            value: ctor,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
      }
    };
  } else {
    inherits_browser.exports = function inherits2(ctor, superCtor) {
      if (superCtor) {
        ctor.super_ = superCtor;
        var TempCtor = function() {
        };
        TempCtor.prototype = superCtor.prototype;
        ctor.prototype = new TempCtor();
        ctor.prototype.constructor = ctor;
      }
    };
  }
  return inherits_browser.exports;
}
var hasRequiredInherits;
function requireInherits() {
  if (hasRequiredInherits)
    return inherits.exports;
  hasRequiredInherits = 1;
  try {
    var util2 = require("util");
    if (typeof util2.inherits !== "function")
      throw "";
    inherits.exports = util2.inherits;
  } catch (e) {
    inherits.exports = requireInherits_browser();
  }
  return inherits.exports;
}
var BufferList = { exports: {} };
var hasRequiredBufferList;
function requireBufferList() {
  if (hasRequiredBufferList)
    return BufferList.exports;
  hasRequiredBufferList = 1;
  (function(module2) {
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    var Buffer2 = requireSafeBuffer().Buffer;
    var util2 = require$$1$2;
    function copyBuffer(src, target, offset) {
      src.copy(target, offset);
    }
    module2.exports = function() {
      function BufferList2() {
        _classCallCheck(this, BufferList2);
        this.head = null;
        this.tail = null;
        this.length = 0;
      }
      BufferList2.prototype.push = function push(v) {
        var entry = { data: v, next: null };
        if (this.length > 0)
          this.tail.next = entry;
        else
          this.head = entry;
        this.tail = entry;
        ++this.length;
      };
      BufferList2.prototype.unshift = function unshift(v) {
        var entry = { data: v, next: this.head };
        if (this.length === 0)
          this.tail = entry;
        this.head = entry;
        ++this.length;
      };
      BufferList2.prototype.shift = function shift() {
        if (this.length === 0)
          return;
        var ret = this.head.data;
        if (this.length === 1)
          this.head = this.tail = null;
        else
          this.head = this.head.next;
        --this.length;
        return ret;
      };
      BufferList2.prototype.clear = function clear() {
        this.head = this.tail = null;
        this.length = 0;
      };
      BufferList2.prototype.join = function join(s) {
        if (this.length === 0)
          return "";
        var p = this.head;
        var ret = "" + p.data;
        while (p = p.next) {
          ret += s + p.data;
        }
        return ret;
      };
      BufferList2.prototype.concat = function concat2(n) {
        if (this.length === 0)
          return Buffer2.alloc(0);
        var ret = Buffer2.allocUnsafe(n >>> 0);
        var p = this.head;
        var i = 0;
        while (p) {
          copyBuffer(p.data, ret, i);
          i += p.data.length;
          p = p.next;
        }
        return ret;
      };
      return BufferList2;
    }();
    if (util2 && util2.inspect && util2.inspect.custom) {
      module2.exports.prototype[util2.inspect.custom] = function() {
        var obj = util2.inspect({ length: this.length });
        return this.constructor.name + " " + obj;
      };
    }
  })(BufferList);
  return BufferList.exports;
}
var destroy_1;
var hasRequiredDestroy;
function requireDestroy() {
  if (hasRequiredDestroy)
    return destroy_1;
  hasRequiredDestroy = 1;
  var pna = requireProcessNextickArgs();
  function destroy(err2, cb) {
    var _this = this;
    var readableDestroyed = this._readableState && this._readableState.destroyed;
    var writableDestroyed = this._writableState && this._writableState.destroyed;
    if (readableDestroyed || writableDestroyed) {
      if (cb) {
        cb(err2);
      } else if (err2) {
        if (!this._writableState) {
          pna.nextTick(emitErrorNT, this, err2);
        } else if (!this._writableState.errorEmitted) {
          this._writableState.errorEmitted = true;
          pna.nextTick(emitErrorNT, this, err2);
        }
      }
      return this;
    }
    if (this._readableState) {
      this._readableState.destroyed = true;
    }
    if (this._writableState) {
      this._writableState.destroyed = true;
    }
    this._destroy(err2 || null, function(err3) {
      if (!cb && err3) {
        if (!_this._writableState) {
          pna.nextTick(emitErrorNT, _this, err3);
        } else if (!_this._writableState.errorEmitted) {
          _this._writableState.errorEmitted = true;
          pna.nextTick(emitErrorNT, _this, err3);
        }
      } else if (cb) {
        cb(err3);
      }
    });
    return this;
  }
  function undestroy() {
    if (this._readableState) {
      this._readableState.destroyed = false;
      this._readableState.reading = false;
      this._readableState.ended = false;
      this._readableState.endEmitted = false;
    }
    if (this._writableState) {
      this._writableState.destroyed = false;
      this._writableState.ended = false;
      this._writableState.ending = false;
      this._writableState.finalCalled = false;
      this._writableState.prefinished = false;
      this._writableState.finished = false;
      this._writableState.errorEmitted = false;
    }
  }
  function emitErrorNT(self2, err2) {
    self2.emit("error", err2);
  }
  destroy_1 = {
    destroy,
    undestroy
  };
  return destroy_1;
}
var node;
var hasRequiredNode;
function requireNode() {
  if (hasRequiredNode)
    return node;
  hasRequiredNode = 1;
  node = require$$1$2.deprecate;
  return node;
}
var _stream_writable;
var hasRequired_stream_writable;
function require_stream_writable() {
  if (hasRequired_stream_writable)
    return _stream_writable;
  hasRequired_stream_writable = 1;
  var pna = requireProcessNextickArgs();
  _stream_writable = Writable;
  function CorkedRequest(state) {
    var _this = this;
    this.next = null;
    this.entry = null;
    this.finish = function() {
      onCorkedFinish(_this, state);
    };
  }
  var asyncWrite = !process.browser && ["v0.10", "v0.9."].indexOf(process.version.slice(0, 5)) > -1 ? setImmediate : pna.nextTick;
  var Duplex;
  Writable.WritableState = WritableState;
  var util2 = Object.create(requireUtil());
  util2.inherits = requireInherits();
  var internalUtil = {
    deprecate: requireNode()
  };
  var Stream = requireStream();
  var Buffer2 = requireSafeBuffer().Buffer;
  var OurUint8Array = (typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : {}).Uint8Array || function() {
  };
  function _uint8ArrayToBuffer(chunk) {
    return Buffer2.from(chunk);
  }
  function _isUint8Array(obj) {
    return Buffer2.isBuffer(obj) || obj instanceof OurUint8Array;
  }
  var destroyImpl = requireDestroy();
  util2.inherits(Writable, Stream);
  function nop() {
  }
  function WritableState(options, stream2) {
    Duplex = Duplex || require_stream_duplex();
    options = options || {};
    var isDuplex = stream2 instanceof Duplex;
    this.objectMode = !!options.objectMode;
    if (isDuplex)
      this.objectMode = this.objectMode || !!options.writableObjectMode;
    var hwm = options.highWaterMark;
    var writableHwm = options.writableHighWaterMark;
    var defaultHwm = this.objectMode ? 16 : 16 * 1024;
    if (hwm || hwm === 0)
      this.highWaterMark = hwm;
    else if (isDuplex && (writableHwm || writableHwm === 0))
      this.highWaterMark = writableHwm;
    else
      this.highWaterMark = defaultHwm;
    this.highWaterMark = Math.floor(this.highWaterMark);
    this.finalCalled = false;
    this.needDrain = false;
    this.ending = false;
    this.ended = false;
    this.finished = false;
    this.destroyed = false;
    var noDecode = options.decodeStrings === false;
    this.decodeStrings = !noDecode;
    this.defaultEncoding = options.defaultEncoding || "utf8";
    this.length = 0;
    this.writing = false;
    this.corked = 0;
    this.sync = true;
    this.bufferProcessing = false;
    this.onwrite = function(er) {
      onwrite(stream2, er);
    };
    this.writecb = null;
    this.writelen = 0;
    this.bufferedRequest = null;
    this.lastBufferedRequest = null;
    this.pendingcb = 0;
    this.prefinished = false;
    this.errorEmitted = false;
    this.bufferedRequestCount = 0;
    this.corkedRequestsFree = new CorkedRequest(this);
  }
  WritableState.prototype.getBuffer = function getBuffer() {
    var current = this.bufferedRequest;
    var out2 = [];
    while (current) {
      out2.push(current);
      current = current.next;
    }
    return out2;
  };
  (function() {
    try {
      Object.defineProperty(WritableState.prototype, "buffer", {
        get: internalUtil.deprecate(function() {
          return this.getBuffer();
        }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003")
      });
    } catch (_) {
    }
  })();
  var realHasInstance;
  if (typeof Symbol === "function" && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === "function") {
    realHasInstance = Function.prototype[Symbol.hasInstance];
    Object.defineProperty(Writable, Symbol.hasInstance, {
      value: function(object2) {
        if (realHasInstance.call(this, object2))
          return true;
        if (this !== Writable)
          return false;
        return object2 && object2._writableState instanceof WritableState;
      }
    });
  } else {
    realHasInstance = function(object2) {
      return object2 instanceof this;
    };
  }
  function Writable(options) {
    Duplex = Duplex || require_stream_duplex();
    if (!realHasInstance.call(Writable, this) && !(this instanceof Duplex)) {
      return new Writable(options);
    }
    this._writableState = new WritableState(options, this);
    this.writable = true;
    if (options) {
      if (typeof options.write === "function")
        this._write = options.write;
      if (typeof options.writev === "function")
        this._writev = options.writev;
      if (typeof options.destroy === "function")
        this._destroy = options.destroy;
      if (typeof options.final === "function")
        this._final = options.final;
    }
    Stream.call(this);
  }
  Writable.prototype.pipe = function() {
    this.emit("error", new Error("Cannot pipe, not readable"));
  };
  function writeAfterEnd(stream2, cb) {
    var er = new Error("write after end");
    stream2.emit("error", er);
    pna.nextTick(cb, er);
  }
  function validChunk(stream2, state, chunk, cb) {
    var valid = true;
    var er = false;
    if (chunk === null) {
      er = new TypeError("May not write null values to stream");
    } else if (typeof chunk !== "string" && chunk !== void 0 && !state.objectMode) {
      er = new TypeError("Invalid non-string/buffer chunk");
    }
    if (er) {
      stream2.emit("error", er);
      pna.nextTick(cb, er);
      valid = false;
    }
    return valid;
  }
  Writable.prototype.write = function(chunk, encoding, cb) {
    var state = this._writableState;
    var ret = false;
    var isBuf = !state.objectMode && _isUint8Array(chunk);
    if (isBuf && !Buffer2.isBuffer(chunk)) {
      chunk = _uint8ArrayToBuffer(chunk);
    }
    if (typeof encoding === "function") {
      cb = encoding;
      encoding = null;
    }
    if (isBuf)
      encoding = "buffer";
    else if (!encoding)
      encoding = state.defaultEncoding;
    if (typeof cb !== "function")
      cb = nop;
    if (state.ended)
      writeAfterEnd(this, cb);
    else if (isBuf || validChunk(this, state, chunk, cb)) {
      state.pendingcb++;
      ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
    }
    return ret;
  };
  Writable.prototype.cork = function() {
    var state = this._writableState;
    state.corked++;
  };
  Writable.prototype.uncork = function() {
    var state = this._writableState;
    if (state.corked) {
      state.corked--;
      if (!state.writing && !state.corked && !state.bufferProcessing && state.bufferedRequest)
        clearBuffer(this, state);
    }
  };
  Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
    if (typeof encoding === "string")
      encoding = encoding.toLowerCase();
    if (!(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((encoding + "").toLowerCase()) > -1))
      throw new TypeError("Unknown encoding: " + encoding);
    this._writableState.defaultEncoding = encoding;
    return this;
  };
  function decodeChunk(state, chunk, encoding) {
    if (!state.objectMode && state.decodeStrings !== false && typeof chunk === "string") {
      chunk = Buffer2.from(chunk, encoding);
    }
    return chunk;
  }
  Object.defineProperty(Writable.prototype, "writableHighWaterMark", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function() {
      return this._writableState.highWaterMark;
    }
  });
  function writeOrBuffer(stream2, state, isBuf, chunk, encoding, cb) {
    if (!isBuf) {
      var newChunk = decodeChunk(state, chunk, encoding);
      if (chunk !== newChunk) {
        isBuf = true;
        encoding = "buffer";
        chunk = newChunk;
      }
    }
    var len = state.objectMode ? 1 : chunk.length;
    state.length += len;
    var ret = state.length < state.highWaterMark;
    if (!ret)
      state.needDrain = true;
    if (state.writing || state.corked) {
      var last = state.lastBufferedRequest;
      state.lastBufferedRequest = {
        chunk,
        encoding,
        isBuf,
        callback: cb,
        next: null
      };
      if (last) {
        last.next = state.lastBufferedRequest;
      } else {
        state.bufferedRequest = state.lastBufferedRequest;
      }
      state.bufferedRequestCount += 1;
    } else {
      doWrite(stream2, state, false, len, chunk, encoding, cb);
    }
    return ret;
  }
  function doWrite(stream2, state, writev, len, chunk, encoding, cb) {
    state.writelen = len;
    state.writecb = cb;
    state.writing = true;
    state.sync = true;
    if (writev)
      stream2._writev(chunk, state.onwrite);
    else
      stream2._write(chunk, encoding, state.onwrite);
    state.sync = false;
  }
  function onwriteError(stream2, state, sync, er, cb) {
    --state.pendingcb;
    if (sync) {
      pna.nextTick(cb, er);
      pna.nextTick(finishMaybe, stream2, state);
      stream2._writableState.errorEmitted = true;
      stream2.emit("error", er);
    } else {
      cb(er);
      stream2._writableState.errorEmitted = true;
      stream2.emit("error", er);
      finishMaybe(stream2, state);
    }
  }
  function onwriteStateUpdate(state) {
    state.writing = false;
    state.writecb = null;
    state.length -= state.writelen;
    state.writelen = 0;
  }
  function onwrite(stream2, er) {
    var state = stream2._writableState;
    var sync = state.sync;
    var cb = state.writecb;
    onwriteStateUpdate(state);
    if (er)
      onwriteError(stream2, state, sync, er, cb);
    else {
      var finished = needFinish(state);
      if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
        clearBuffer(stream2, state);
      }
      if (sync) {
        asyncWrite(afterWrite, stream2, state, finished, cb);
      } else {
        afterWrite(stream2, state, finished, cb);
      }
    }
  }
  function afterWrite(stream2, state, finished, cb) {
    if (!finished)
      onwriteDrain(stream2, state);
    state.pendingcb--;
    cb();
    finishMaybe(stream2, state);
  }
  function onwriteDrain(stream2, state) {
    if (state.length === 0 && state.needDrain) {
      state.needDrain = false;
      stream2.emit("drain");
    }
  }
  function clearBuffer(stream2, state) {
    state.bufferProcessing = true;
    var entry = state.bufferedRequest;
    if (stream2._writev && entry && entry.next) {
      var l = state.bufferedRequestCount;
      var buffer = new Array(l);
      var holder = state.corkedRequestsFree;
      holder.entry = entry;
      var count = 0;
      var allBuffers = true;
      while (entry) {
        buffer[count] = entry;
        if (!entry.isBuf)
          allBuffers = false;
        entry = entry.next;
        count += 1;
      }
      buffer.allBuffers = allBuffers;
      doWrite(stream2, state, true, state.length, buffer, "", holder.finish);
      state.pendingcb++;
      state.lastBufferedRequest = null;
      if (holder.next) {
        state.corkedRequestsFree = holder.next;
        holder.next = null;
      } else {
        state.corkedRequestsFree = new CorkedRequest(state);
      }
      state.bufferedRequestCount = 0;
    } else {
      while (entry) {
        var chunk = entry.chunk;
        var encoding = entry.encoding;
        var cb = entry.callback;
        var len = state.objectMode ? 1 : chunk.length;
        doWrite(stream2, state, false, len, chunk, encoding, cb);
        entry = entry.next;
        state.bufferedRequestCount--;
        if (state.writing) {
          break;
        }
      }
      if (entry === null)
        state.lastBufferedRequest = null;
    }
    state.bufferedRequest = entry;
    state.bufferProcessing = false;
  }
  Writable.prototype._write = function(chunk, encoding, cb) {
    cb(new Error("_write() is not implemented"));
  };
  Writable.prototype._writev = null;
  Writable.prototype.end = function(chunk, encoding, cb) {
    var state = this._writableState;
    if (typeof chunk === "function") {
      cb = chunk;
      chunk = null;
      encoding = null;
    } else if (typeof encoding === "function") {
      cb = encoding;
      encoding = null;
    }
    if (chunk !== null && chunk !== void 0)
      this.write(chunk, encoding);
    if (state.corked) {
      state.corked = 1;
      this.uncork();
    }
    if (!state.ending)
      endWritable(this, state, cb);
  };
  function needFinish(state) {
    return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
  }
  function callFinal(stream2, state) {
    stream2._final(function(err2) {
      state.pendingcb--;
      if (err2) {
        stream2.emit("error", err2);
      }
      state.prefinished = true;
      stream2.emit("prefinish");
      finishMaybe(stream2, state);
    });
  }
  function prefinish(stream2, state) {
    if (!state.prefinished && !state.finalCalled) {
      if (typeof stream2._final === "function") {
        state.pendingcb++;
        state.finalCalled = true;
        pna.nextTick(callFinal, stream2, state);
      } else {
        state.prefinished = true;
        stream2.emit("prefinish");
      }
    }
  }
  function finishMaybe(stream2, state) {
    var need = needFinish(state);
    if (need) {
      prefinish(stream2, state);
      if (state.pendingcb === 0) {
        state.finished = true;
        stream2.emit("finish");
      }
    }
    return need;
  }
  function endWritable(stream2, state, cb) {
    state.ending = true;
    finishMaybe(stream2, state);
    if (cb) {
      if (state.finished)
        pna.nextTick(cb);
      else
        stream2.once("finish", cb);
    }
    state.ended = true;
    stream2.writable = false;
  }
  function onCorkedFinish(corkReq, state, err2) {
    var entry = corkReq.entry;
    corkReq.entry = null;
    while (entry) {
      var cb = entry.callback;
      state.pendingcb--;
      cb(err2);
      entry = entry.next;
    }
    state.corkedRequestsFree.next = corkReq;
  }
  Object.defineProperty(Writable.prototype, "destroyed", {
    get: function() {
      if (this._writableState === void 0) {
        return false;
      }
      return this._writableState.destroyed;
    },
    set: function(value) {
      if (!this._writableState) {
        return;
      }
      this._writableState.destroyed = value;
    }
  });
  Writable.prototype.destroy = destroyImpl.destroy;
  Writable.prototype._undestroy = destroyImpl.undestroy;
  Writable.prototype._destroy = function(err2, cb) {
    this.end();
    cb(err2);
  };
  return _stream_writable;
}
var _stream_duplex;
var hasRequired_stream_duplex;
function require_stream_duplex() {
  if (hasRequired_stream_duplex)
    return _stream_duplex;
  hasRequired_stream_duplex = 1;
  var pna = requireProcessNextickArgs();
  var objectKeys = Object.keys || function(obj) {
    var keys2 = [];
    for (var key in obj) {
      keys2.push(key);
    }
    return keys2;
  };
  _stream_duplex = Duplex;
  var util2 = Object.create(requireUtil());
  util2.inherits = requireInherits();
  var Readable = require_stream_readable();
  var Writable = require_stream_writable();
  util2.inherits(Duplex, Readable);
  {
    var keys = objectKeys(Writable.prototype);
    for (var v = 0; v < keys.length; v++) {
      var method = keys[v];
      if (!Duplex.prototype[method])
        Duplex.prototype[method] = Writable.prototype[method];
    }
  }
  function Duplex(options) {
    if (!(this instanceof Duplex))
      return new Duplex(options);
    Readable.call(this, options);
    Writable.call(this, options);
    if (options && options.readable === false)
      this.readable = false;
    if (options && options.writable === false)
      this.writable = false;
    this.allowHalfOpen = true;
    if (options && options.allowHalfOpen === false)
      this.allowHalfOpen = false;
    this.once("end", onend);
  }
  Object.defineProperty(Duplex.prototype, "writableHighWaterMark", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function() {
      return this._writableState.highWaterMark;
    }
  });
  function onend() {
    if (this.allowHalfOpen || this._writableState.ended)
      return;
    pna.nextTick(onEndNT, this);
  }
  function onEndNT(self2) {
    self2.end();
  }
  Object.defineProperty(Duplex.prototype, "destroyed", {
    get: function() {
      if (this._readableState === void 0 || this._writableState === void 0) {
        return false;
      }
      return this._readableState.destroyed && this._writableState.destroyed;
    },
    set: function(value) {
      if (this._readableState === void 0 || this._writableState === void 0) {
        return;
      }
      this._readableState.destroyed = value;
      this._writableState.destroyed = value;
    }
  });
  Duplex.prototype._destroy = function(err2, cb) {
    this.push(null);
    this.end();
    pna.nextTick(cb, err2);
  };
  return _stream_duplex;
}
var string_decoder = {};
var hasRequiredString_decoder;
function requireString_decoder() {
  if (hasRequiredString_decoder)
    return string_decoder;
  hasRequiredString_decoder = 1;
  var Buffer2 = requireSafeBuffer().Buffer;
  var isEncoding = Buffer2.isEncoding || function(encoding) {
    encoding = "" + encoding;
    switch (encoding && encoding.toLowerCase()) {
      case "hex":
      case "utf8":
      case "utf-8":
      case "ascii":
      case "binary":
      case "base64":
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
      case "raw":
        return true;
      default:
        return false;
    }
  };
  function _normalizeEncoding(enc) {
    if (!enc)
      return "utf8";
    var retried;
    while (true) {
      switch (enc) {
        case "utf8":
        case "utf-8":
          return "utf8";
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return "utf16le";
        case "latin1":
        case "binary":
          return "latin1";
        case "base64":
        case "ascii":
        case "hex":
          return enc;
        default:
          if (retried)
            return;
          enc = ("" + enc).toLowerCase();
          retried = true;
      }
    }
  }
  function normalizeEncoding(enc) {
    var nenc = _normalizeEncoding(enc);
    if (typeof nenc !== "string" && (Buffer2.isEncoding === isEncoding || !isEncoding(enc)))
      throw new Error("Unknown encoding: " + enc);
    return nenc || enc;
  }
  string_decoder.StringDecoder = StringDecoder;
  function StringDecoder(encoding) {
    this.encoding = normalizeEncoding(encoding);
    var nb;
    switch (this.encoding) {
      case "utf16le":
        this.text = utf16Text;
        this.end = utf16End;
        nb = 4;
        break;
      case "utf8":
        this.fillLast = utf8FillLast;
        nb = 4;
        break;
      case "base64":
        this.text = base64Text;
        this.end = base64End;
        nb = 3;
        break;
      default:
        this.write = simpleWrite;
        this.end = simpleEnd;
        return;
    }
    this.lastNeed = 0;
    this.lastTotal = 0;
    this.lastChar = Buffer2.allocUnsafe(nb);
  }
  StringDecoder.prototype.write = function(buf) {
    if (buf.length === 0)
      return "";
    var r;
    var i;
    if (this.lastNeed) {
      r = this.fillLast(buf);
      if (r === void 0)
        return "";
      i = this.lastNeed;
      this.lastNeed = 0;
    } else {
      i = 0;
    }
    if (i < buf.length)
      return r ? r + this.text(buf, i) : this.text(buf, i);
    return r || "";
  };
  StringDecoder.prototype.end = utf8End;
  StringDecoder.prototype.text = utf8Text;
  StringDecoder.prototype.fillLast = function(buf) {
    if (this.lastNeed <= buf.length) {
      buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
      return this.lastChar.toString(this.encoding, 0, this.lastTotal);
    }
    buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
    this.lastNeed -= buf.length;
  };
  function utf8CheckByte(byte) {
    if (byte <= 127)
      return 0;
    else if (byte >> 5 === 6)
      return 2;
    else if (byte >> 4 === 14)
      return 3;
    else if (byte >> 3 === 30)
      return 4;
    return byte >> 6 === 2 ? -1 : -2;
  }
  function utf8CheckIncomplete(self2, buf, i) {
    var j = buf.length - 1;
    if (j < i)
      return 0;
    var nb = utf8CheckByte(buf[j]);
    if (nb >= 0) {
      if (nb > 0)
        self2.lastNeed = nb - 1;
      return nb;
    }
    if (--j < i || nb === -2)
      return 0;
    nb = utf8CheckByte(buf[j]);
    if (nb >= 0) {
      if (nb > 0)
        self2.lastNeed = nb - 2;
      return nb;
    }
    if (--j < i || nb === -2)
      return 0;
    nb = utf8CheckByte(buf[j]);
    if (nb >= 0) {
      if (nb > 0) {
        if (nb === 2)
          nb = 0;
        else
          self2.lastNeed = nb - 3;
      }
      return nb;
    }
    return 0;
  }
  function utf8CheckExtraBytes(self2, buf, p) {
    if ((buf[0] & 192) !== 128) {
      self2.lastNeed = 0;
      return "�";
    }
    if (self2.lastNeed > 1 && buf.length > 1) {
      if ((buf[1] & 192) !== 128) {
        self2.lastNeed = 1;
        return "�";
      }
      if (self2.lastNeed > 2 && buf.length > 2) {
        if ((buf[2] & 192) !== 128) {
          self2.lastNeed = 2;
          return "�";
        }
      }
    }
  }
  function utf8FillLast(buf) {
    var p = this.lastTotal - this.lastNeed;
    var r = utf8CheckExtraBytes(this, buf);
    if (r !== void 0)
      return r;
    if (this.lastNeed <= buf.length) {
      buf.copy(this.lastChar, p, 0, this.lastNeed);
      return this.lastChar.toString(this.encoding, 0, this.lastTotal);
    }
    buf.copy(this.lastChar, p, 0, buf.length);
    this.lastNeed -= buf.length;
  }
  function utf8Text(buf, i) {
    var total = utf8CheckIncomplete(this, buf, i);
    if (!this.lastNeed)
      return buf.toString("utf8", i);
    this.lastTotal = total;
    var end = buf.length - (total - this.lastNeed);
    buf.copy(this.lastChar, 0, end);
    return buf.toString("utf8", i, end);
  }
  function utf8End(buf) {
    var r = buf && buf.length ? this.write(buf) : "";
    if (this.lastNeed)
      return r + "�";
    return r;
  }
  function utf16Text(buf, i) {
    if ((buf.length - i) % 2 === 0) {
      var r = buf.toString("utf16le", i);
      if (r) {
        var c2 = r.charCodeAt(r.length - 1);
        if (c2 >= 55296 && c2 <= 56319) {
          this.lastNeed = 2;
          this.lastTotal = 4;
          this.lastChar[0] = buf[buf.length - 2];
          this.lastChar[1] = buf[buf.length - 1];
          return r.slice(0, -1);
        }
      }
      return r;
    }
    this.lastNeed = 1;
    this.lastTotal = 2;
    this.lastChar[0] = buf[buf.length - 1];
    return buf.toString("utf16le", i, buf.length - 1);
  }
  function utf16End(buf) {
    var r = buf && buf.length ? this.write(buf) : "";
    if (this.lastNeed) {
      var end = this.lastTotal - this.lastNeed;
      return r + this.lastChar.toString("utf16le", 0, end);
    }
    return r;
  }
  function base64Text(buf, i) {
    var n = (buf.length - i) % 3;
    if (n === 0)
      return buf.toString("base64", i);
    this.lastNeed = 3 - n;
    this.lastTotal = 3;
    if (n === 1) {
      this.lastChar[0] = buf[buf.length - 1];
    } else {
      this.lastChar[0] = buf[buf.length - 2];
      this.lastChar[1] = buf[buf.length - 1];
    }
    return buf.toString("base64", i, buf.length - n);
  }
  function base64End(buf) {
    var r = buf && buf.length ? this.write(buf) : "";
    if (this.lastNeed)
      return r + this.lastChar.toString("base64", 0, 3 - this.lastNeed);
    return r;
  }
  function simpleWrite(buf) {
    return buf.toString(this.encoding);
  }
  function simpleEnd(buf) {
    return buf && buf.length ? this.write(buf) : "";
  }
  return string_decoder;
}
var _stream_readable;
var hasRequired_stream_readable;
function require_stream_readable() {
  if (hasRequired_stream_readable)
    return _stream_readable;
  hasRequired_stream_readable = 1;
  var pna = requireProcessNextickArgs();
  _stream_readable = Readable;
  var isArray = requireIsarray();
  var Duplex;
  Readable.ReadableState = ReadableState;
  require$$2$2.EventEmitter;
  var EElistenerCount = function(emitter, type) {
    return emitter.listeners(type).length;
  };
  var Stream = requireStream();
  var Buffer2 = requireSafeBuffer().Buffer;
  var OurUint8Array = (typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : {}).Uint8Array || function() {
  };
  function _uint8ArrayToBuffer(chunk) {
    return Buffer2.from(chunk);
  }
  function _isUint8Array(obj) {
    return Buffer2.isBuffer(obj) || obj instanceof OurUint8Array;
  }
  var util2 = Object.create(requireUtil());
  util2.inherits = requireInherits();
  var debugUtil = require$$1$2;
  var debug = void 0;
  if (debugUtil && debugUtil.debuglog) {
    debug = debugUtil.debuglog("stream");
  } else {
    debug = function() {
    };
  }
  var BufferList2 = requireBufferList();
  var destroyImpl = requireDestroy();
  var StringDecoder;
  util2.inherits(Readable, Stream);
  var kProxyEvents = ["error", "close", "destroy", "pause", "resume"];
  function prependListener(emitter, event, fn) {
    if (typeof emitter.prependListener === "function")
      return emitter.prependListener(event, fn);
    if (!emitter._events || !emitter._events[event])
      emitter.on(event, fn);
    else if (isArray(emitter._events[event]))
      emitter._events[event].unshift(fn);
    else
      emitter._events[event] = [fn, emitter._events[event]];
  }
  function ReadableState(options, stream2) {
    Duplex = Duplex || require_stream_duplex();
    options = options || {};
    var isDuplex = stream2 instanceof Duplex;
    this.objectMode = !!options.objectMode;
    if (isDuplex)
      this.objectMode = this.objectMode || !!options.readableObjectMode;
    var hwm = options.highWaterMark;
    var readableHwm = options.readableHighWaterMark;
    var defaultHwm = this.objectMode ? 16 : 16 * 1024;
    if (hwm || hwm === 0)
      this.highWaterMark = hwm;
    else if (isDuplex && (readableHwm || readableHwm === 0))
      this.highWaterMark = readableHwm;
    else
      this.highWaterMark = defaultHwm;
    this.highWaterMark = Math.floor(this.highWaterMark);
    this.buffer = new BufferList2();
    this.length = 0;
    this.pipes = null;
    this.pipesCount = 0;
    this.flowing = null;
    this.ended = false;
    this.endEmitted = false;
    this.reading = false;
    this.sync = true;
    this.needReadable = false;
    this.emittedReadable = false;
    this.readableListening = false;
    this.resumeScheduled = false;
    this.destroyed = false;
    this.defaultEncoding = options.defaultEncoding || "utf8";
    this.awaitDrain = 0;
    this.readingMore = false;
    this.decoder = null;
    this.encoding = null;
    if (options.encoding) {
      if (!StringDecoder)
        StringDecoder = requireString_decoder().StringDecoder;
      this.decoder = new StringDecoder(options.encoding);
      this.encoding = options.encoding;
    }
  }
  function Readable(options) {
    Duplex = Duplex || require_stream_duplex();
    if (!(this instanceof Readable))
      return new Readable(options);
    this._readableState = new ReadableState(options, this);
    this.readable = true;
    if (options) {
      if (typeof options.read === "function")
        this._read = options.read;
      if (typeof options.destroy === "function")
        this._destroy = options.destroy;
    }
    Stream.call(this);
  }
  Object.defineProperty(Readable.prototype, "destroyed", {
    get: function() {
      if (this._readableState === void 0) {
        return false;
      }
      return this._readableState.destroyed;
    },
    set: function(value) {
      if (!this._readableState) {
        return;
      }
      this._readableState.destroyed = value;
    }
  });
  Readable.prototype.destroy = destroyImpl.destroy;
  Readable.prototype._undestroy = destroyImpl.undestroy;
  Readable.prototype._destroy = function(err2, cb) {
    this.push(null);
    cb(err2);
  };
  Readable.prototype.push = function(chunk, encoding) {
    var state = this._readableState;
    var skipChunkCheck;
    if (!state.objectMode) {
      if (typeof chunk === "string") {
        encoding = encoding || state.defaultEncoding;
        if (encoding !== state.encoding) {
          chunk = Buffer2.from(chunk, encoding);
          encoding = "";
        }
        skipChunkCheck = true;
      }
    } else {
      skipChunkCheck = true;
    }
    return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
  };
  Readable.prototype.unshift = function(chunk) {
    return readableAddChunk(this, chunk, null, true, false);
  };
  function readableAddChunk(stream2, chunk, encoding, addToFront, skipChunkCheck) {
    var state = stream2._readableState;
    if (chunk === null) {
      state.reading = false;
      onEofChunk(stream2, state);
    } else {
      var er;
      if (!skipChunkCheck)
        er = chunkInvalid(state, chunk);
      if (er) {
        stream2.emit("error", er);
      } else if (state.objectMode || chunk && chunk.length > 0) {
        if (typeof chunk !== "string" && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer2.prototype) {
          chunk = _uint8ArrayToBuffer(chunk);
        }
        if (addToFront) {
          if (state.endEmitted)
            stream2.emit("error", new Error("stream.unshift() after end event"));
          else
            addChunk(stream2, state, chunk, true);
        } else if (state.ended) {
          stream2.emit("error", new Error("stream.push() after EOF"));
        } else {
          state.reading = false;
          if (state.decoder && !encoding) {
            chunk = state.decoder.write(chunk);
            if (state.objectMode || chunk.length !== 0)
              addChunk(stream2, state, chunk, false);
            else
              maybeReadMore(stream2, state);
          } else {
            addChunk(stream2, state, chunk, false);
          }
        }
      } else if (!addToFront) {
        state.reading = false;
      }
    }
    return needMoreData(state);
  }
  function addChunk(stream2, state, chunk, addToFront) {
    if (state.flowing && state.length === 0 && !state.sync) {
      stream2.emit("data", chunk);
      stream2.read(0);
    } else {
      state.length += state.objectMode ? 1 : chunk.length;
      if (addToFront)
        state.buffer.unshift(chunk);
      else
        state.buffer.push(chunk);
      if (state.needReadable)
        emitReadable(stream2);
    }
    maybeReadMore(stream2, state);
  }
  function chunkInvalid(state, chunk) {
    var er;
    if (!_isUint8Array(chunk) && typeof chunk !== "string" && chunk !== void 0 && !state.objectMode) {
      er = new TypeError("Invalid non-string/buffer chunk");
    }
    return er;
  }
  function needMoreData(state) {
    return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
  }
  Readable.prototype.isPaused = function() {
    return this._readableState.flowing === false;
  };
  Readable.prototype.setEncoding = function(enc) {
    if (!StringDecoder)
      StringDecoder = requireString_decoder().StringDecoder;
    this._readableState.decoder = new StringDecoder(enc);
    this._readableState.encoding = enc;
    return this;
  };
  var MAX_HWM = 8388608;
  function computeNewHighWaterMark(n) {
    if (n >= MAX_HWM) {
      n = MAX_HWM;
    } else {
      n--;
      n |= n >>> 1;
      n |= n >>> 2;
      n |= n >>> 4;
      n |= n >>> 8;
      n |= n >>> 16;
      n++;
    }
    return n;
  }
  function howMuchToRead(n, state) {
    if (n <= 0 || state.length === 0 && state.ended)
      return 0;
    if (state.objectMode)
      return 1;
    if (n !== n) {
      if (state.flowing && state.length)
        return state.buffer.head.data.length;
      else
        return state.length;
    }
    if (n > state.highWaterMark)
      state.highWaterMark = computeNewHighWaterMark(n);
    if (n <= state.length)
      return n;
    if (!state.ended) {
      state.needReadable = true;
      return 0;
    }
    return state.length;
  }
  Readable.prototype.read = function(n) {
    debug("read", n);
    n = parseInt(n, 10);
    var state = this._readableState;
    var nOrig = n;
    if (n !== 0)
      state.emittedReadable = false;
    if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
      debug("read: emitReadable", state.length, state.ended);
      if (state.length === 0 && state.ended)
        endReadable(this);
      else
        emitReadable(this);
      return null;
    }
    n = howMuchToRead(n, state);
    if (n === 0 && state.ended) {
      if (state.length === 0)
        endReadable(this);
      return null;
    }
    var doRead = state.needReadable;
    debug("need readable", doRead);
    if (state.length === 0 || state.length - n < state.highWaterMark) {
      doRead = true;
      debug("length less than watermark", doRead);
    }
    if (state.ended || state.reading) {
      doRead = false;
      debug("reading or ended", doRead);
    } else if (doRead) {
      debug("do read");
      state.reading = true;
      state.sync = true;
      if (state.length === 0)
        state.needReadable = true;
      this._read(state.highWaterMark);
      state.sync = false;
      if (!state.reading)
        n = howMuchToRead(nOrig, state);
    }
    var ret;
    if (n > 0)
      ret = fromList(n, state);
    else
      ret = null;
    if (ret === null) {
      state.needReadable = true;
      n = 0;
    } else {
      state.length -= n;
    }
    if (state.length === 0) {
      if (!state.ended)
        state.needReadable = true;
      if (nOrig !== n && state.ended)
        endReadable(this);
    }
    if (ret !== null)
      this.emit("data", ret);
    return ret;
  };
  function onEofChunk(stream2, state) {
    if (state.ended)
      return;
    if (state.decoder) {
      var chunk = state.decoder.end();
      if (chunk && chunk.length) {
        state.buffer.push(chunk);
        state.length += state.objectMode ? 1 : chunk.length;
      }
    }
    state.ended = true;
    emitReadable(stream2);
  }
  function emitReadable(stream2) {
    var state = stream2._readableState;
    state.needReadable = false;
    if (!state.emittedReadable) {
      debug("emitReadable", state.flowing);
      state.emittedReadable = true;
      if (state.sync)
        pna.nextTick(emitReadable_, stream2);
      else
        emitReadable_(stream2);
    }
  }
  function emitReadable_(stream2) {
    debug("emit readable");
    stream2.emit("readable");
    flow(stream2);
  }
  function maybeReadMore(stream2, state) {
    if (!state.readingMore) {
      state.readingMore = true;
      pna.nextTick(maybeReadMore_, stream2, state);
    }
  }
  function maybeReadMore_(stream2, state) {
    var len = state.length;
    while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
      debug("maybeReadMore read 0");
      stream2.read(0);
      if (len === state.length)
        break;
      else
        len = state.length;
    }
    state.readingMore = false;
  }
  Readable.prototype._read = function(n) {
    this.emit("error", new Error("_read() is not implemented"));
  };
  Readable.prototype.pipe = function(dest, pipeOpts) {
    var src = this;
    var state = this._readableState;
    switch (state.pipesCount) {
      case 0:
        state.pipes = dest;
        break;
      case 1:
        state.pipes = [state.pipes, dest];
        break;
      default:
        state.pipes.push(dest);
        break;
    }
    state.pipesCount += 1;
    debug("pipe count=%d opts=%j", state.pipesCount, pipeOpts);
    var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;
    var endFn = doEnd ? onend : unpipe;
    if (state.endEmitted)
      pna.nextTick(endFn);
    else
      src.once("end", endFn);
    dest.on("unpipe", onunpipe);
    function onunpipe(readable2, unpipeInfo) {
      debug("onunpipe");
      if (readable2 === src) {
        if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
          unpipeInfo.hasUnpiped = true;
          cleanup();
        }
      }
    }
    function onend() {
      debug("onend");
      dest.end();
    }
    var ondrain = pipeOnDrain(src);
    dest.on("drain", ondrain);
    var cleanedUp = false;
    function cleanup() {
      debug("cleanup");
      dest.removeListener("close", onclose);
      dest.removeListener("finish", onfinish);
      dest.removeListener("drain", ondrain);
      dest.removeListener("error", onerror);
      dest.removeListener("unpipe", onunpipe);
      src.removeListener("end", onend);
      src.removeListener("end", unpipe);
      src.removeListener("data", ondata);
      cleanedUp = true;
      if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain))
        ondrain();
    }
    var increasedAwaitDrain = false;
    src.on("data", ondata);
    function ondata(chunk) {
      debug("ondata");
      increasedAwaitDrain = false;
      var ret = dest.write(chunk);
      if (false === ret && !increasedAwaitDrain) {
        if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
          debug("false write response, pause", state.awaitDrain);
          state.awaitDrain++;
          increasedAwaitDrain = true;
        }
        src.pause();
      }
    }
    function onerror(er) {
      debug("onerror", er);
      unpipe();
      dest.removeListener("error", onerror);
      if (EElistenerCount(dest, "error") === 0)
        dest.emit("error", er);
    }
    prependListener(dest, "error", onerror);
    function onclose() {
      dest.removeListener("finish", onfinish);
      unpipe();
    }
    dest.once("close", onclose);
    function onfinish() {
      debug("onfinish");
      dest.removeListener("close", onclose);
      unpipe();
    }
    dest.once("finish", onfinish);
    function unpipe() {
      debug("unpipe");
      src.unpipe(dest);
    }
    dest.emit("pipe", src);
    if (!state.flowing) {
      debug("pipe resume");
      src.resume();
    }
    return dest;
  };
  function pipeOnDrain(src) {
    return function() {
      var state = src._readableState;
      debug("pipeOnDrain", state.awaitDrain);
      if (state.awaitDrain)
        state.awaitDrain--;
      if (state.awaitDrain === 0 && EElistenerCount(src, "data")) {
        state.flowing = true;
        flow(src);
      }
    };
  }
  Readable.prototype.unpipe = function(dest) {
    var state = this._readableState;
    var unpipeInfo = { hasUnpiped: false };
    if (state.pipesCount === 0)
      return this;
    if (state.pipesCount === 1) {
      if (dest && dest !== state.pipes)
        return this;
      if (!dest)
        dest = state.pipes;
      state.pipes = null;
      state.pipesCount = 0;
      state.flowing = false;
      if (dest)
        dest.emit("unpipe", this, unpipeInfo);
      return this;
    }
    if (!dest) {
      var dests = state.pipes;
      var len = state.pipesCount;
      state.pipes = null;
      state.pipesCount = 0;
      state.flowing = false;
      for (var i = 0; i < len; i++) {
        dests[i].emit("unpipe", this, { hasUnpiped: false });
      }
      return this;
    }
    var index = indexOf(state.pipes, dest);
    if (index === -1)
      return this;
    state.pipes.splice(index, 1);
    state.pipesCount -= 1;
    if (state.pipesCount === 1)
      state.pipes = state.pipes[0];
    dest.emit("unpipe", this, unpipeInfo);
    return this;
  };
  Readable.prototype.on = function(ev, fn) {
    var res = Stream.prototype.on.call(this, ev, fn);
    if (ev === "data") {
      if (this._readableState.flowing !== false)
        this.resume();
    } else if (ev === "readable") {
      var state = this._readableState;
      if (!state.endEmitted && !state.readableListening) {
        state.readableListening = state.needReadable = true;
        state.emittedReadable = false;
        if (!state.reading) {
          pna.nextTick(nReadingNextTick, this);
        } else if (state.length) {
          emitReadable(this);
        }
      }
    }
    return res;
  };
  Readable.prototype.addListener = Readable.prototype.on;
  function nReadingNextTick(self2) {
    debug("readable nexttick read 0");
    self2.read(0);
  }
  Readable.prototype.resume = function() {
    var state = this._readableState;
    if (!state.flowing) {
      debug("resume");
      state.flowing = true;
      resume(this, state);
    }
    return this;
  };
  function resume(stream2, state) {
    if (!state.resumeScheduled) {
      state.resumeScheduled = true;
      pna.nextTick(resume_, stream2, state);
    }
  }
  function resume_(stream2, state) {
    if (!state.reading) {
      debug("resume read 0");
      stream2.read(0);
    }
    state.resumeScheduled = false;
    state.awaitDrain = 0;
    stream2.emit("resume");
    flow(stream2);
    if (state.flowing && !state.reading)
      stream2.read(0);
  }
  Readable.prototype.pause = function() {
    debug("call pause flowing=%j", this._readableState.flowing);
    if (false !== this._readableState.flowing) {
      debug("pause");
      this._readableState.flowing = false;
      this.emit("pause");
    }
    return this;
  };
  function flow(stream2) {
    var state = stream2._readableState;
    debug("flow", state.flowing);
    while (state.flowing && stream2.read() !== null) {
    }
  }
  Readable.prototype.wrap = function(stream2) {
    var _this = this;
    var state = this._readableState;
    var paused = false;
    stream2.on("end", function() {
      debug("wrapped end");
      if (state.decoder && !state.ended) {
        var chunk = state.decoder.end();
        if (chunk && chunk.length)
          _this.push(chunk);
      }
      _this.push(null);
    });
    stream2.on("data", function(chunk) {
      debug("wrapped data");
      if (state.decoder)
        chunk = state.decoder.write(chunk);
      if (state.objectMode && (chunk === null || chunk === void 0))
        return;
      else if (!state.objectMode && (!chunk || !chunk.length))
        return;
      var ret = _this.push(chunk);
      if (!ret) {
        paused = true;
        stream2.pause();
      }
    });
    for (var i in stream2) {
      if (this[i] === void 0 && typeof stream2[i] === "function") {
        this[i] = /* @__PURE__ */ function(method) {
          return function() {
            return stream2[method].apply(stream2, arguments);
          };
        }(i);
      }
    }
    for (var n = 0; n < kProxyEvents.length; n++) {
      stream2.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));
    }
    this._read = function(n2) {
      debug("wrapped _read", n2);
      if (paused) {
        paused = false;
        stream2.resume();
      }
    };
    return this;
  };
  Object.defineProperty(Readable.prototype, "readableHighWaterMark", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function() {
      return this._readableState.highWaterMark;
    }
  });
  Readable._fromList = fromList;
  function fromList(n, state) {
    if (state.length === 0)
      return null;
    var ret;
    if (state.objectMode)
      ret = state.buffer.shift();
    else if (!n || n >= state.length) {
      if (state.decoder)
        ret = state.buffer.join("");
      else if (state.buffer.length === 1)
        ret = state.buffer.head.data;
      else
        ret = state.buffer.concat(state.length);
      state.buffer.clear();
    } else {
      ret = fromListPartial(n, state.buffer, state.decoder);
    }
    return ret;
  }
  function fromListPartial(n, list2, hasStrings) {
    var ret;
    if (n < list2.head.data.length) {
      ret = list2.head.data.slice(0, n);
      list2.head.data = list2.head.data.slice(n);
    } else if (n === list2.head.data.length) {
      ret = list2.shift();
    } else {
      ret = hasStrings ? copyFromBufferString(n, list2) : copyFromBuffer(n, list2);
    }
    return ret;
  }
  function copyFromBufferString(n, list2) {
    var p = list2.head;
    var c2 = 1;
    var ret = p.data;
    n -= ret.length;
    while (p = p.next) {
      var str = p.data;
      var nb = n > str.length ? str.length : n;
      if (nb === str.length)
        ret += str;
      else
        ret += str.slice(0, n);
      n -= nb;
      if (n === 0) {
        if (nb === str.length) {
          ++c2;
          if (p.next)
            list2.head = p.next;
          else
            list2.head = list2.tail = null;
        } else {
          list2.head = p;
          p.data = str.slice(nb);
        }
        break;
      }
      ++c2;
    }
    list2.length -= c2;
    return ret;
  }
  function copyFromBuffer(n, list2) {
    var ret = Buffer2.allocUnsafe(n);
    var p = list2.head;
    var c2 = 1;
    p.data.copy(ret);
    n -= p.data.length;
    while (p = p.next) {
      var buf = p.data;
      var nb = n > buf.length ? buf.length : n;
      buf.copy(ret, ret.length - n, 0, nb);
      n -= nb;
      if (n === 0) {
        if (nb === buf.length) {
          ++c2;
          if (p.next)
            list2.head = p.next;
          else
            list2.head = list2.tail = null;
        } else {
          list2.head = p;
          p.data = buf.slice(nb);
        }
        break;
      }
      ++c2;
    }
    list2.length -= c2;
    return ret;
  }
  function endReadable(stream2) {
    var state = stream2._readableState;
    if (state.length > 0)
      throw new Error('"endReadable()" called on non-empty stream');
    if (!state.endEmitted) {
      state.ended = true;
      pna.nextTick(endReadableNT, state, stream2);
    }
  }
  function endReadableNT(state, stream2) {
    if (!state.endEmitted && state.length === 0) {
      state.endEmitted = true;
      stream2.readable = false;
      stream2.emit("end");
    }
  }
  function indexOf(xs, x) {
    for (var i = 0, l = xs.length; i < l; i++) {
      if (xs[i] === x)
        return i;
    }
    return -1;
  }
  return _stream_readable;
}
var _stream_transform;
var hasRequired_stream_transform;
function require_stream_transform() {
  if (hasRequired_stream_transform)
    return _stream_transform;
  hasRequired_stream_transform = 1;
  _stream_transform = Transform;
  var Duplex = require_stream_duplex();
  var util2 = Object.create(requireUtil());
  util2.inherits = requireInherits();
  util2.inherits(Transform, Duplex);
  function afterTransform(er, data) {
    var ts = this._transformState;
    ts.transforming = false;
    var cb = ts.writecb;
    if (!cb) {
      return this.emit("error", new Error("write callback called multiple times"));
    }
    ts.writechunk = null;
    ts.writecb = null;
    if (data != null)
      this.push(data);
    cb(er);
    var rs = this._readableState;
    rs.reading = false;
    if (rs.needReadable || rs.length < rs.highWaterMark) {
      this._read(rs.highWaterMark);
    }
  }
  function Transform(options) {
    if (!(this instanceof Transform))
      return new Transform(options);
    Duplex.call(this, options);
    this._transformState = {
      afterTransform: afterTransform.bind(this),
      needTransform: false,
      transforming: false,
      writecb: null,
      writechunk: null,
      writeencoding: null
    };
    this._readableState.needReadable = true;
    this._readableState.sync = false;
    if (options) {
      if (typeof options.transform === "function")
        this._transform = options.transform;
      if (typeof options.flush === "function")
        this._flush = options.flush;
    }
    this.on("prefinish", prefinish);
  }
  function prefinish() {
    var _this = this;
    if (typeof this._flush === "function") {
      this._flush(function(er, data) {
        done(_this, er, data);
      });
    } else {
      done(this, null, null);
    }
  }
  Transform.prototype.push = function(chunk, encoding) {
    this._transformState.needTransform = false;
    return Duplex.prototype.push.call(this, chunk, encoding);
  };
  Transform.prototype._transform = function(chunk, encoding, cb) {
    throw new Error("_transform() is not implemented");
  };
  Transform.prototype._write = function(chunk, encoding, cb) {
    var ts = this._transformState;
    ts.writecb = cb;
    ts.writechunk = chunk;
    ts.writeencoding = encoding;
    if (!ts.transforming) {
      var rs = this._readableState;
      if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark)
        this._read(rs.highWaterMark);
    }
  };
  Transform.prototype._read = function(n) {
    var ts = this._transformState;
    if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
      ts.transforming = true;
      this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
    } else {
      ts.needTransform = true;
    }
  };
  Transform.prototype._destroy = function(err2, cb) {
    var _this2 = this;
    Duplex.prototype._destroy.call(this, err2, function(err22) {
      cb(err22);
      _this2.emit("close");
    });
  };
  function done(stream2, er, data) {
    if (er)
      return stream2.emit("error", er);
    if (data != null)
      stream2.push(data);
    if (stream2._writableState.length)
      throw new Error("Calling transform done when ws.length != 0");
    if (stream2._transformState.transforming)
      throw new Error("Calling transform done when still transforming");
    return stream2.push(null);
  }
  return _stream_transform;
}
var _stream_passthrough;
var hasRequired_stream_passthrough;
function require_stream_passthrough() {
  if (hasRequired_stream_passthrough)
    return _stream_passthrough;
  hasRequired_stream_passthrough = 1;
  _stream_passthrough = PassThrough;
  var Transform = require_stream_transform();
  var util2 = Object.create(requireUtil());
  util2.inherits = requireInherits();
  util2.inherits(PassThrough, Transform);
  function PassThrough(options) {
    if (!(this instanceof PassThrough))
      return new PassThrough(options);
    Transform.call(this, options);
  }
  PassThrough.prototype._transform = function(chunk, encoding, cb) {
    cb(null, chunk);
  };
  return _stream_passthrough;
}
var hasRequiredReadable;
function requireReadable() {
  if (hasRequiredReadable)
    return readable.exports;
  hasRequiredReadable = 1;
  (function(module2, exports) {
    var Stream = require$$0$4;
    if (process.env.READABLE_STREAM === "disable" && Stream) {
      module2.exports = Stream;
      exports = module2.exports = Stream.Readable;
      exports.Readable = Stream.Readable;
      exports.Writable = Stream.Writable;
      exports.Duplex = Stream.Duplex;
      exports.Transform = Stream.Transform;
      exports.PassThrough = Stream.PassThrough;
      exports.Stream = Stream;
    } else {
      exports = module2.exports = require_stream_readable();
      exports.Stream = Stream || exports;
      exports.Readable = exports;
      exports.Writable = require_stream_writable();
      exports.Duplex = require_stream_duplex();
      exports.Transform = require_stream_transform();
      exports.PassThrough = require_stream_passthrough();
    }
  })(readable, readable.exports);
  return readable.exports;
}
var nodestream;
var blob;
support$4.base64 = true;
support$4.array = true;
support$4.string = true;
support$4.arraybuffer = typeof ArrayBuffer !== "undefined" && typeof Uint8Array !== "undefined";
support$4.nodebuffer = typeof Buffer !== "undefined";
support$4.uint8array = typeof Uint8Array !== "undefined";
if (typeof ArrayBuffer === "undefined") {
  blob = support$4.blob = false;
} else {
  var buffer = new ArrayBuffer(0);
  try {
    blob = support$4.blob = new Blob([buffer], {
      type: "application/zip"
    }).size === 0;
  } catch (e) {
    try {
      var Builder = self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder;
      var builder = new Builder();
      builder.append(buffer);
      blob = support$4.blob = builder.getBlob("application/zip").size === 0;
    } catch (e2) {
      blob = support$4.blob = false;
    }
  }
}
try {
  nodestream = support$4.nodestream = !!requireReadable().Readable;
} catch (e) {
  nodestream = support$4.nodestream = false;
}
var base64$1 = {};
var hasRequiredBase64;
function requireBase64() {
  if (hasRequiredBase64)
    return base64$1;
  hasRequiredBase64 = 1;
  var utils2 = requireUtils();
  var support2 = support$4;
  var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  base64$1.encode = function(input) {
    var output = [];
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0, len = input.length, remainingBytes = len;
    var isArray = utils2.getTypeOf(input) !== "string";
    while (i < input.length) {
      remainingBytes = len - i;
      if (!isArray) {
        chr1 = input.charCodeAt(i++);
        chr2 = i < len ? input.charCodeAt(i++) : 0;
        chr3 = i < len ? input.charCodeAt(i++) : 0;
      } else {
        chr1 = input[i++];
        chr2 = i < len ? input[i++] : 0;
        chr3 = i < len ? input[i++] : 0;
      }
      enc1 = chr1 >> 2;
      enc2 = (chr1 & 3) << 4 | chr2 >> 4;
      enc3 = remainingBytes > 1 ? (chr2 & 15) << 2 | chr3 >> 6 : 64;
      enc4 = remainingBytes > 2 ? chr3 & 63 : 64;
      output.push(_keyStr.charAt(enc1) + _keyStr.charAt(enc2) + _keyStr.charAt(enc3) + _keyStr.charAt(enc4));
    }
    return output.join("");
  };
  base64$1.decode = function(input) {
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0, resultIndex = 0;
    var dataUrlPrefix = "data:";
    if (input.substr(0, dataUrlPrefix.length) === dataUrlPrefix) {
      throw new Error("Invalid base64 input, it looks like a data url.");
    }
    input = input.replace(/[^A-Za-z0-9+/=]/g, "");
    var totalLength = input.length * 3 / 4;
    if (input.charAt(input.length - 1) === _keyStr.charAt(64)) {
      totalLength--;
    }
    if (input.charAt(input.length - 2) === _keyStr.charAt(64)) {
      totalLength--;
    }
    if (totalLength % 1 !== 0) {
      throw new Error("Invalid base64 input, bad content length.");
    }
    var output;
    if (support2.uint8array) {
      output = new Uint8Array(totalLength | 0);
    } else {
      output = new Array(totalLength | 0);
    }
    while (i < input.length) {
      enc1 = _keyStr.indexOf(input.charAt(i++));
      enc2 = _keyStr.indexOf(input.charAt(i++));
      enc3 = _keyStr.indexOf(input.charAt(i++));
      enc4 = _keyStr.indexOf(input.charAt(i++));
      chr1 = enc1 << 2 | enc2 >> 4;
      chr2 = (enc2 & 15) << 4 | enc3 >> 2;
      chr3 = (enc3 & 3) << 6 | enc4;
      output[resultIndex++] = chr1;
      if (enc3 !== 64) {
        output[resultIndex++] = chr2;
      }
      if (enc4 !== 64) {
        output[resultIndex++] = chr3;
      }
    }
    return output;
  };
  return base64$1;
}
var nodejsUtils$2 = {
  /**
   * True if this is running in Nodejs, will be undefined in a browser.
   * In a browser, browserify won't include this file and the whole module
   * will be resolved an empty object.
   */
  isNode: typeof Buffer !== "undefined",
  /**
   * Create a new nodejs Buffer from an existing content.
   * @param {Object} data the data to pass to the constructor.
   * @param {String} encoding the encoding to use.
   * @return {Buffer} a new Buffer.
   */
  newBufferFrom: function(data, encoding) {
    if (Buffer.from && Buffer.from !== Uint8Array.from) {
      return Buffer.from(data, encoding);
    } else {
      if (typeof data === "number") {
        throw new Error('The "data" argument must not be a number');
      }
      return new Buffer(data, encoding);
    }
  },
  /**
   * Create a new nodejs Buffer with the specified size.
   * @param {Integer} size the size of the buffer.
   * @return {Buffer} a new Buffer.
   */
  allocBuffer: function(size) {
    if (Buffer.alloc) {
      return Buffer.alloc(size);
    } else {
      var buf = new Buffer(size);
      buf.fill(0);
      return buf;
    }
  },
  /**
   * Find out if an object is a Buffer.
   * @param {Object} b the object to test.
   * @return {Boolean} true if the object is a Buffer, false otherwise.
   */
  isBuffer: function(b) {
    return Buffer.isBuffer(b);
  },
  isStream: function(obj) {
    return obj && typeof obj.on === "function" && typeof obj.pause === "function" && typeof obj.resume === "function";
  }
};
var lib$2;
var hasRequiredLib$1;
function requireLib$1() {
  if (hasRequiredLib$1)
    return lib$2;
  hasRequiredLib$1 = 1;
  var Mutation = commonjsGlobal.MutationObserver || commonjsGlobal.WebKitMutationObserver;
  var scheduleDrain;
  if (process.browser) {
    if (Mutation) {
      var called = 0;
      var observer = new Mutation(nextTick);
      var element = commonjsGlobal.document.createTextNode("");
      observer.observe(element, {
        characterData: true
      });
      scheduleDrain = function() {
        element.data = called = ++called % 2;
      };
    } else if (!commonjsGlobal.setImmediate && typeof commonjsGlobal.MessageChannel !== "undefined") {
      var channel = new commonjsGlobal.MessageChannel();
      channel.port1.onmessage = nextTick;
      scheduleDrain = function() {
        channel.port2.postMessage(0);
      };
    } else if ("document" in commonjsGlobal && "onreadystatechange" in commonjsGlobal.document.createElement("script")) {
      scheduleDrain = function() {
        var scriptEl = commonjsGlobal.document.createElement("script");
        scriptEl.onreadystatechange = function() {
          nextTick();
          scriptEl.onreadystatechange = null;
          scriptEl.parentNode.removeChild(scriptEl);
          scriptEl = null;
        };
        commonjsGlobal.document.documentElement.appendChild(scriptEl);
      };
    } else {
      scheduleDrain = function() {
        setTimeout(nextTick, 0);
      };
    }
  } else {
    scheduleDrain = function() {
      process.nextTick(nextTick);
    };
  }
  var draining;
  var queue = [];
  function nextTick() {
    draining = true;
    var i, oldQueue;
    var len = queue.length;
    while (len) {
      oldQueue = queue;
      queue = [];
      i = -1;
      while (++i < len) {
        oldQueue[i]();
      }
      len = queue.length;
    }
    draining = false;
  }
  lib$2 = immediate;
  function immediate(task) {
    if (queue.push(task) === 1 && !draining) {
      scheduleDrain();
    }
  }
  return lib$2;
}
var lib$1;
var hasRequiredLib;
function requireLib() {
  if (hasRequiredLib)
    return lib$1;
  hasRequiredLib = 1;
  var immediate = requireLib$1();
  function INTERNAL() {
  }
  var handlers = {};
  var REJECTED = ["REJECTED"];
  var FULFILLED = ["FULFILLED"];
  var PENDING = ["PENDING"];
  if (!process.browser) {
    var UNHANDLED = ["UNHANDLED"];
  }
  lib$1 = Promise2;
  function Promise2(resolver) {
    if (typeof resolver !== "function") {
      throw new TypeError("resolver must be a function");
    }
    this.state = PENDING;
    this.queue = [];
    this.outcome = void 0;
    if (!process.browser) {
      this.handled = UNHANDLED;
    }
    if (resolver !== INTERNAL) {
      safelyResolveThenable(this, resolver);
    }
  }
  Promise2.prototype.finally = function(callback) {
    if (typeof callback !== "function") {
      return this;
    }
    var p = this.constructor;
    return this.then(resolve2, reject2);
    function resolve2(value) {
      function yes() {
        return value;
      }
      return p.resolve(callback()).then(yes);
    }
    function reject2(reason) {
      function no() {
        throw reason;
      }
      return p.resolve(callback()).then(no);
    }
  };
  Promise2.prototype.catch = function(onRejected) {
    return this.then(null, onRejected);
  };
  Promise2.prototype.then = function(onFulfilled, onRejected) {
    if (typeof onFulfilled !== "function" && this.state === FULFILLED || typeof onRejected !== "function" && this.state === REJECTED) {
      return this;
    }
    var promise = new this.constructor(INTERNAL);
    if (!process.browser) {
      if (this.handled === UNHANDLED) {
        this.handled = null;
      }
    }
    if (this.state !== PENDING) {
      var resolver = this.state === FULFILLED ? onFulfilled : onRejected;
      unwrap(promise, resolver, this.outcome);
    } else {
      this.queue.push(new QueueItem(promise, onFulfilled, onRejected));
    }
    return promise;
  };
  function QueueItem(promise, onFulfilled, onRejected) {
    this.promise = promise;
    if (typeof onFulfilled === "function") {
      this.onFulfilled = onFulfilled;
      this.callFulfilled = this.otherCallFulfilled;
    }
    if (typeof onRejected === "function") {
      this.onRejected = onRejected;
      this.callRejected = this.otherCallRejected;
    }
  }
  QueueItem.prototype.callFulfilled = function(value) {
    handlers.resolve(this.promise, value);
  };
  QueueItem.prototype.otherCallFulfilled = function(value) {
    unwrap(this.promise, this.onFulfilled, value);
  };
  QueueItem.prototype.callRejected = function(value) {
    handlers.reject(this.promise, value);
  };
  QueueItem.prototype.otherCallRejected = function(value) {
    unwrap(this.promise, this.onRejected, value);
  };
  function unwrap(promise, func, value) {
    immediate(function() {
      var returnValue;
      try {
        returnValue = func(value);
      } catch (e) {
        return handlers.reject(promise, e);
      }
      if (returnValue === promise) {
        handlers.reject(promise, new TypeError("Cannot resolve promise with itself"));
      } else {
        handlers.resolve(promise, returnValue);
      }
    });
  }
  handlers.resolve = function(self2, value) {
    var result = tryCatch(getThen, value);
    if (result.status === "error") {
      return handlers.reject(self2, result.value);
    }
    var thenable = result.value;
    if (thenable) {
      safelyResolveThenable(self2, thenable);
    } else {
      self2.state = FULFILLED;
      self2.outcome = value;
      var i = -1;
      var len = self2.queue.length;
      while (++i < len) {
        self2.queue[i].callFulfilled(value);
      }
    }
    return self2;
  };
  handlers.reject = function(self2, error) {
    self2.state = REJECTED;
    self2.outcome = error;
    if (!process.browser) {
      if (self2.handled === UNHANDLED) {
        immediate(function() {
          if (self2.handled === UNHANDLED) {
            process.emit("unhandledRejection", error, self2);
          }
        });
      }
    }
    var i = -1;
    var len = self2.queue.length;
    while (++i < len) {
      self2.queue[i].callRejected(error);
    }
    return self2;
  };
  function getThen(obj) {
    var then = obj && obj.then;
    if (obj && (typeof obj === "object" || typeof obj === "function") && typeof then === "function") {
      return function appyThen() {
        then.apply(obj, arguments);
      };
    }
  }
  function safelyResolveThenable(self2, thenable) {
    var called = false;
    function onError(value) {
      if (called) {
        return;
      }
      called = true;
      handlers.reject(self2, value);
    }
    function onSuccess(value) {
      if (called) {
        return;
      }
      called = true;
      handlers.resolve(self2, value);
    }
    function tryToUnwrap() {
      thenable(onSuccess, onError);
    }
    var result = tryCatch(tryToUnwrap);
    if (result.status === "error") {
      onError(result.value);
    }
  }
  function tryCatch(func, value) {
    var out2 = {};
    try {
      out2.value = func(value);
      out2.status = "success";
    } catch (e) {
      out2.status = "error";
      out2.value = e;
    }
    return out2;
  }
  Promise2.resolve = resolve;
  function resolve(value) {
    if (value instanceof this) {
      return value;
    }
    return handlers.resolve(new this(INTERNAL), value);
  }
  Promise2.reject = reject;
  function reject(reason) {
    var promise = new this(INTERNAL);
    return handlers.reject(promise, reason);
  }
  Promise2.all = all;
  function all(iterable) {
    var self2 = this;
    if (Object.prototype.toString.call(iterable) !== "[object Array]") {
      return this.reject(new TypeError("must be an array"));
    }
    var len = iterable.length;
    var called = false;
    if (!len) {
      return this.resolve([]);
    }
    var values = new Array(len);
    var resolved = 0;
    var i = -1;
    var promise = new this(INTERNAL);
    while (++i < len) {
      allResolver(iterable[i], i);
    }
    return promise;
    function allResolver(value, i2) {
      self2.resolve(value).then(resolveFromAll, function(error) {
        if (!called) {
          called = true;
          handlers.reject(promise, error);
        }
      });
      function resolveFromAll(outValue) {
        values[i2] = outValue;
        if (++resolved === len && !called) {
          called = true;
          handlers.resolve(promise, values);
        }
      }
    }
  }
  Promise2.race = race;
  function race(iterable) {
    var self2 = this;
    if (Object.prototype.toString.call(iterable) !== "[object Array]") {
      return this.reject(new TypeError("must be an array"));
    }
    var len = iterable.length;
    var called = false;
    if (!len) {
      return this.resolve([]);
    }
    var i = -1;
    var promise = new this(INTERNAL);
    while (++i < len) {
      resolver(iterable[i]);
    }
    return promise;
    function resolver(value) {
      self2.resolve(value).then(function(response) {
        if (!called) {
          called = true;
          handlers.resolve(promise, response);
        }
      }, function(error) {
        if (!called) {
          called = true;
          handlers.reject(promise, error);
        }
      });
    }
  }
  return lib$1;
}
var ES6Promise = null;
if (typeof Promise !== "undefined") {
  ES6Promise = Promise;
} else {
  ES6Promise = requireLib();
}
var external$3 = {
  Promise: ES6Promise
};
(function(global2, undefined$1) {
  if (global2.setImmediate) {
    return;
  }
  var nextHandle = 1;
  var tasksByHandle = {};
  var currentlyRunningATask = false;
  var doc = global2.document;
  var registerImmediate;
  function setImmediate2(callback) {
    if (typeof callback !== "function") {
      callback = new Function("" + callback);
    }
    var args = new Array(arguments.length - 1);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i + 1];
    }
    var task = { callback, args };
    tasksByHandle[nextHandle] = task;
    registerImmediate(nextHandle);
    return nextHandle++;
  }
  function clearImmediate(handle) {
    delete tasksByHandle[handle];
  }
  function run(task) {
    var callback = task.callback;
    var args = task.args;
    switch (args.length) {
      case 0:
        callback();
        break;
      case 1:
        callback(args[0]);
        break;
      case 2:
        callback(args[0], args[1]);
        break;
      case 3:
        callback(args[0], args[1], args[2]);
        break;
      default:
        callback.apply(undefined$1, args);
        break;
    }
  }
  function runIfPresent(handle) {
    if (currentlyRunningATask) {
      setTimeout(runIfPresent, 0, handle);
    } else {
      var task = tasksByHandle[handle];
      if (task) {
        currentlyRunningATask = true;
        try {
          run(task);
        } finally {
          clearImmediate(handle);
          currentlyRunningATask = false;
        }
      }
    }
  }
  function installNextTickImplementation() {
    registerImmediate = function(handle) {
      process.nextTick(function() {
        runIfPresent(handle);
      });
    };
  }
  function canUsePostMessage() {
    if (global2.postMessage && !global2.importScripts) {
      var postMessageIsAsynchronous = true;
      var oldOnMessage = global2.onmessage;
      global2.onmessage = function() {
        postMessageIsAsynchronous = false;
      };
      global2.postMessage("", "*");
      global2.onmessage = oldOnMessage;
      return postMessageIsAsynchronous;
    }
  }
  function installPostMessageImplementation() {
    var messagePrefix = "setImmediate$" + Math.random() + "$";
    var onGlobalMessage = function(event) {
      if (event.source === global2 && typeof event.data === "string" && event.data.indexOf(messagePrefix) === 0) {
        runIfPresent(+event.data.slice(messagePrefix.length));
      }
    };
    if (global2.addEventListener) {
      global2.addEventListener("message", onGlobalMessage, false);
    } else {
      global2.attachEvent("onmessage", onGlobalMessage);
    }
    registerImmediate = function(handle) {
      global2.postMessage(messagePrefix + handle, "*");
    };
  }
  function installMessageChannelImplementation() {
    var channel = new MessageChannel();
    channel.port1.onmessage = function(event) {
      var handle = event.data;
      runIfPresent(handle);
    };
    registerImmediate = function(handle) {
      channel.port2.postMessage(handle);
    };
  }
  function installReadyStateChangeImplementation() {
    var html = doc.documentElement;
    registerImmediate = function(handle) {
      var script = doc.createElement("script");
      script.onreadystatechange = function() {
        runIfPresent(handle);
        script.onreadystatechange = null;
        html.removeChild(script);
        script = null;
      };
      html.appendChild(script);
    };
  }
  function installSetTimeoutImplementation() {
    registerImmediate = function(handle) {
      setTimeout(runIfPresent, 0, handle);
    };
  }
  var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global2);
  attachTo = attachTo && attachTo.setTimeout ? attachTo : global2;
  if ({}.toString.call(global2.process) === "[object process]") {
    installNextTickImplementation();
  } else if (canUsePostMessage()) {
    installPostMessageImplementation();
  } else if (global2.MessageChannel) {
    installMessageChannelImplementation();
  } else if (doc && "onreadystatechange" in doc.createElement("script")) {
    installReadyStateChangeImplementation();
  } else {
    installSetTimeoutImplementation();
  }
  attachTo.setImmediate = setImmediate2;
  attachTo.clearImmediate = clearImmediate;
})(typeof self === "undefined" ? typeof commonjsGlobal === "undefined" ? commonjsGlobal : commonjsGlobal : self);
var hasRequiredUtils;
function requireUtils() {
  if (hasRequiredUtils)
    return utils$r;
  hasRequiredUtils = 1;
  (function(exports) {
    var support2 = support$4;
    var base642 = requireBase64();
    var nodejsUtils2 = nodejsUtils$2;
    var external2 = external$3;
    function string2binary(str) {
      var result = null;
      if (support2.uint8array) {
        result = new Uint8Array(str.length);
      } else {
        result = new Array(str.length);
      }
      return stringToArrayLike(str, result);
    }
    exports.newBlob = function(part, type) {
      exports.checkSupport("blob");
      try {
        return new Blob([part], {
          type
        });
      } catch (e) {
        try {
          var Builder = self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder;
          var builder = new Builder();
          builder.append(part);
          return builder.getBlob(type);
        } catch (e2) {
          throw new Error("Bug : can't construct the Blob.");
        }
      }
    };
    function identity(input) {
      return input;
    }
    function stringToArrayLike(str, array) {
      for (var i = 0; i < str.length; ++i) {
        array[i] = str.charCodeAt(i) & 255;
      }
      return array;
    }
    var arrayToStringHelper = {
      /**
       * Transform an array of int into a string, chunk by chunk.
       * See the performances notes on arrayLikeToString.
       * @param {Array|ArrayBuffer|Uint8Array|Buffer} array the array to transform.
       * @param {String} type the type of the array.
       * @param {Integer} chunk the chunk size.
       * @return {String} the resulting string.
       * @throws Error if the chunk is too big for the stack.
       */
      stringifyByChunk: function(array, type, chunk) {
        var result = [], k = 0, len = array.length;
        if (len <= chunk) {
          return String.fromCharCode.apply(null, array);
        }
        while (k < len) {
          if (type === "array" || type === "nodebuffer") {
            result.push(String.fromCharCode.apply(null, array.slice(k, Math.min(k + chunk, len))));
          } else {
            result.push(String.fromCharCode.apply(null, array.subarray(k, Math.min(k + chunk, len))));
          }
          k += chunk;
        }
        return result.join("");
      },
      /**
       * Call String.fromCharCode on every item in the array.
       * This is the naive implementation, which generate A LOT of intermediate string.
       * This should be used when everything else fail.
       * @param {Array|ArrayBuffer|Uint8Array|Buffer} array the array to transform.
       * @return {String} the result.
       */
      stringifyByChar: function(array) {
        var resultStr = "";
        for (var i = 0; i < array.length; i++) {
          resultStr += String.fromCharCode(array[i]);
        }
        return resultStr;
      },
      applyCanBeUsed: {
        /**
         * true if the browser accepts to use String.fromCharCode on Uint8Array
         */
        uint8array: function() {
          try {
            return support2.uint8array && String.fromCharCode.apply(null, new Uint8Array(1)).length === 1;
          } catch (e) {
            return false;
          }
        }(),
        /**
         * true if the browser accepts to use String.fromCharCode on nodejs Buffer.
         */
        nodebuffer: function() {
          try {
            return support2.nodebuffer && String.fromCharCode.apply(null, nodejsUtils2.allocBuffer(1)).length === 1;
          } catch (e) {
            return false;
          }
        }()
      }
    };
    function arrayLikeToString(array) {
      var chunk = 65536, type = exports.getTypeOf(array), canUseApply = true;
      if (type === "uint8array") {
        canUseApply = arrayToStringHelper.applyCanBeUsed.uint8array;
      } else if (type === "nodebuffer") {
        canUseApply = arrayToStringHelper.applyCanBeUsed.nodebuffer;
      }
      if (canUseApply) {
        while (chunk > 1) {
          try {
            return arrayToStringHelper.stringifyByChunk(array, type, chunk);
          } catch (e) {
            chunk = Math.floor(chunk / 2);
          }
        }
      }
      return arrayToStringHelper.stringifyByChar(array);
    }
    exports.applyFromCharCode = arrayLikeToString;
    function arrayLikeToArrayLike(arrayFrom, arrayTo) {
      for (var i = 0; i < arrayFrom.length; i++) {
        arrayTo[i] = arrayFrom[i];
      }
      return arrayTo;
    }
    var transform = {};
    transform["string"] = {
      "string": identity,
      "array": function(input) {
        return stringToArrayLike(input, new Array(input.length));
      },
      "arraybuffer": function(input) {
        return transform["string"]["uint8array"](input).buffer;
      },
      "uint8array": function(input) {
        return stringToArrayLike(input, new Uint8Array(input.length));
      },
      "nodebuffer": function(input) {
        return stringToArrayLike(input, nodejsUtils2.allocBuffer(input.length));
      }
    };
    transform["array"] = {
      "string": arrayLikeToString,
      "array": identity,
      "arraybuffer": function(input) {
        return new Uint8Array(input).buffer;
      },
      "uint8array": function(input) {
        return new Uint8Array(input);
      },
      "nodebuffer": function(input) {
        return nodejsUtils2.newBufferFrom(input);
      }
    };
    transform["arraybuffer"] = {
      "string": function(input) {
        return arrayLikeToString(new Uint8Array(input));
      },
      "array": function(input) {
        return arrayLikeToArrayLike(new Uint8Array(input), new Array(input.byteLength));
      },
      "arraybuffer": identity,
      "uint8array": function(input) {
        return new Uint8Array(input);
      },
      "nodebuffer": function(input) {
        return nodejsUtils2.newBufferFrom(new Uint8Array(input));
      }
    };
    transform["uint8array"] = {
      "string": arrayLikeToString,
      "array": function(input) {
        return arrayLikeToArrayLike(input, new Array(input.length));
      },
      "arraybuffer": function(input) {
        return input.buffer;
      },
      "uint8array": identity,
      "nodebuffer": function(input) {
        return nodejsUtils2.newBufferFrom(input);
      }
    };
    transform["nodebuffer"] = {
      "string": arrayLikeToString,
      "array": function(input) {
        return arrayLikeToArrayLike(input, new Array(input.length));
      },
      "arraybuffer": function(input) {
        return transform["nodebuffer"]["uint8array"](input).buffer;
      },
      "uint8array": function(input) {
        return arrayLikeToArrayLike(input, new Uint8Array(input.length));
      },
      "nodebuffer": identity
    };
    exports.transformTo = function(outputType, input) {
      if (!input) {
        input = "";
      }
      if (!outputType) {
        return input;
      }
      exports.checkSupport(outputType);
      var inputType = exports.getTypeOf(input);
      var result = transform[inputType][outputType](input);
      return result;
    };
    exports.resolve = function(path2) {
      var parts = path2.split("/");
      var result = [];
      for (var index = 0; index < parts.length; index++) {
        var part = parts[index];
        if (part === "." || part === "" && index !== 0 && index !== parts.length - 1) {
          continue;
        } else if (part === "..") {
          result.pop();
        } else {
          result.push(part);
        }
      }
      return result.join("/");
    };
    exports.getTypeOf = function(input) {
      if (typeof input === "string") {
        return "string";
      }
      if (Object.prototype.toString.call(input) === "[object Array]") {
        return "array";
      }
      if (support2.nodebuffer && nodejsUtils2.isBuffer(input)) {
        return "nodebuffer";
      }
      if (support2.uint8array && input instanceof Uint8Array) {
        return "uint8array";
      }
      if (support2.arraybuffer && input instanceof ArrayBuffer) {
        return "arraybuffer";
      }
    };
    exports.checkSupport = function(type) {
      var supported = support2[type.toLowerCase()];
      if (!supported) {
        throw new Error(type + " is not supported by this platform");
      }
    };
    exports.MAX_VALUE_16BITS = 65535;
    exports.MAX_VALUE_32BITS = -1;
    exports.pretty = function(str) {
      var res = "", code, i;
      for (i = 0; i < (str || "").length; i++) {
        code = str.charCodeAt(i);
        res += "\\x" + (code < 16 ? "0" : "") + code.toString(16).toUpperCase();
      }
      return res;
    };
    exports.delay = function(callback, args, self2) {
      setImmediate(function() {
        callback.apply(self2 || null, args || []);
      });
    };
    exports.inherits = function(ctor, superCtor) {
      var Obj = function() {
      };
      Obj.prototype = superCtor.prototype;
      ctor.prototype = new Obj();
    };
    exports.extend = function() {
      var result = {}, i, attr;
      for (i = 0; i < arguments.length; i++) {
        for (attr in arguments[i]) {
          if (Object.prototype.hasOwnProperty.call(arguments[i], attr) && typeof result[attr] === "undefined") {
            result[attr] = arguments[i][attr];
          }
        }
      }
      return result;
    };
    exports.prepareContent = function(name, inputData, isBinary, isOptimizedBinaryString, isBase64) {
      var promise = external2.Promise.resolve(inputData).then(function(data) {
        var isBlob = support2.blob && (data instanceof Blob || ["[object File]", "[object Blob]"].indexOf(Object.prototype.toString.call(data)) !== -1);
        if (isBlob && typeof FileReader !== "undefined") {
          return new external2.Promise(function(resolve, reject) {
            var reader = new FileReader();
            reader.onload = function(e) {
              resolve(e.target.result);
            };
            reader.onerror = function(e) {
              reject(e.target.error);
            };
            reader.readAsArrayBuffer(data);
          });
        } else {
          return data;
        }
      });
      return promise.then(function(data) {
        var dataType = exports.getTypeOf(data);
        if (!dataType) {
          return external2.Promise.reject(
            new Error("Can't read the data of '" + name + "'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?")
          );
        }
        if (dataType === "arraybuffer") {
          data = exports.transformTo("uint8array", data);
        } else if (dataType === "string") {
          if (isBase64) {
            data = base642.decode(data);
          } else if (isBinary) {
            if (isOptimizedBinaryString !== true) {
              data = string2binary(data);
            }
          }
        }
        return data;
      });
    };
  })(utils$r);
  return utils$r;
}
function GenericWorker$b(name) {
  this.name = name || "default";
  this.streamInfo = {};
  this.generatedError = null;
  this.extraStreamInfo = {};
  this.isPaused = true;
  this.isFinished = false;
  this.isLocked = false;
  this._listeners = {
    "data": [],
    "end": [],
    "error": []
  };
  this.previous = null;
}
GenericWorker$b.prototype = {
  /**
   * Push a chunk to the next workers.
   * @param {Object} chunk the chunk to push
   */
  push: function(chunk) {
    this.emit("data", chunk);
  },
  /**
   * End the stream.
   * @return {Boolean} true if this call ended the worker, false otherwise.
   */
  end: function() {
    if (this.isFinished) {
      return false;
    }
    this.flush();
    try {
      this.emit("end");
      this.cleanUp();
      this.isFinished = true;
    } catch (e) {
      this.emit("error", e);
    }
    return true;
  },
  /**
   * End the stream with an error.
   * @param {Error} e the error which caused the premature end.
   * @return {Boolean} true if this call ended the worker with an error, false otherwise.
   */
  error: function(e) {
    if (this.isFinished) {
      return false;
    }
    if (this.isPaused) {
      this.generatedError = e;
    } else {
      this.isFinished = true;
      this.emit("error", e);
      if (this.previous) {
        this.previous.error(e);
      }
      this.cleanUp();
    }
    return true;
  },
  /**
   * Add a callback on an event.
   * @param {String} name the name of the event (data, end, error)
   * @param {Function} listener the function to call when the event is triggered
   * @return {GenericWorker} the current object for chainability
   */
  on: function(name, listener) {
    this._listeners[name].push(listener);
    return this;
  },
  /**
   * Clean any references when a worker is ending.
   */
  cleanUp: function() {
    this.streamInfo = this.generatedError = this.extraStreamInfo = null;
    this._listeners = [];
  },
  /**
   * Trigger an event. This will call registered callback with the provided arg.
   * @param {String} name the name of the event (data, end, error)
   * @param {Object} arg the argument to call the callback with.
   */
  emit: function(name, arg) {
    if (this._listeners[name]) {
      for (var i = 0; i < this._listeners[name].length; i++) {
        this._listeners[name][i].call(this, arg);
      }
    }
  },
  /**
   * Chain a worker with an other.
   * @param {Worker} next the worker receiving events from the current one.
   * @return {worker} the next worker for chainability
   */
  pipe: function(next) {
    return next.registerPrevious(this);
  },
  /**
   * Same as `pipe` in the other direction.
   * Using an API with `pipe(next)` is very easy.
   * Implementing the API with the point of view of the next one registering
   * a source is easier, see the ZipFileWorker.
   * @param {Worker} previous the previous worker, sending events to this one
   * @return {Worker} the current worker for chainability
   */
  registerPrevious: function(previous) {
    if (this.isLocked) {
      throw new Error("The stream '" + this + "' has already been used.");
    }
    this.streamInfo = previous.streamInfo;
    this.mergeStreamInfo();
    this.previous = previous;
    var self2 = this;
    previous.on("data", function(chunk) {
      self2.processChunk(chunk);
    });
    previous.on("end", function() {
      self2.end();
    });
    previous.on("error", function(e) {
      self2.error(e);
    });
    return this;
  },
  /**
   * Pause the stream so it doesn't send events anymore.
   * @return {Boolean} true if this call paused the worker, false otherwise.
   */
  pause: function() {
    if (this.isPaused || this.isFinished) {
      return false;
    }
    this.isPaused = true;
    if (this.previous) {
      this.previous.pause();
    }
    return true;
  },
  /**
   * Resume a paused stream.
   * @return {Boolean} true if this call resumed the worker, false otherwise.
   */
  resume: function() {
    if (!this.isPaused || this.isFinished) {
      return false;
    }
    this.isPaused = false;
    var withError = false;
    if (this.generatedError) {
      this.error(this.generatedError);
      withError = true;
    }
    if (this.previous) {
      this.previous.resume();
    }
    return !withError;
  },
  /**
   * Flush any remaining bytes as the stream is ending.
   */
  flush: function() {
  },
  /**
   * Process a chunk. This is usually the method overridden.
   * @param {Object} chunk the chunk to process.
   */
  processChunk: function(chunk) {
    this.push(chunk);
  },
  /**
   * Add a key/value to be added in the workers chain streamInfo once activated.
   * @param {String} key the key to use
   * @param {Object} value the associated value
   * @return {Worker} the current worker for chainability
   */
  withStreamInfo: function(key, value) {
    this.extraStreamInfo[key] = value;
    this.mergeStreamInfo();
    return this;
  },
  /**
   * Merge this worker's streamInfo into the chain's streamInfo.
   */
  mergeStreamInfo: function() {
    for (var key in this.extraStreamInfo) {
      if (!Object.prototype.hasOwnProperty.call(this.extraStreamInfo, key)) {
        continue;
      }
      this.streamInfo[key] = this.extraStreamInfo[key];
    }
  },
  /**
   * Lock the stream to prevent further updates on the workers chain.
   * After calling this method, all calls to pipe will fail.
   */
  lock: function() {
    if (this.isLocked) {
      throw new Error("The stream '" + this + "' has already been used.");
    }
    this.isLocked = true;
    if (this.previous) {
      this.previous.lock();
    }
  },
  /**
   *
   * Pretty print the workers chain.
   */
  toString: function() {
    var me = "Worker " + this.name;
    if (this.previous) {
      return this.previous + " -> " + me;
    } else {
      return me;
    }
  }
};
var GenericWorker_1 = GenericWorker$b;
(function(exports) {
  var utils2 = requireUtils();
  var support2 = support$4;
  var nodejsUtils2 = nodejsUtils$2;
  var GenericWorker2 = GenericWorker_1;
  var _utf8len2 = new Array(256);
  for (var i = 0; i < 256; i++) {
    _utf8len2[i] = i >= 252 ? 6 : i >= 248 ? 5 : i >= 240 ? 4 : i >= 224 ? 3 : i >= 192 ? 2 : 1;
  }
  _utf8len2[254] = _utf8len2[254] = 1;
  var string2buf = function(str) {
    var buf, c2, c22, m_pos, i2, str_len = str.length, buf_len = 0;
    for (m_pos = 0; m_pos < str_len; m_pos++) {
      c2 = str.charCodeAt(m_pos);
      if ((c2 & 64512) === 55296 && m_pos + 1 < str_len) {
        c22 = str.charCodeAt(m_pos + 1);
        if ((c22 & 64512) === 56320) {
          c2 = 65536 + (c2 - 55296 << 10) + (c22 - 56320);
          m_pos++;
        }
      }
      buf_len += c2 < 128 ? 1 : c2 < 2048 ? 2 : c2 < 65536 ? 3 : 4;
    }
    if (support2.uint8array) {
      buf = new Uint8Array(buf_len);
    } else {
      buf = new Array(buf_len);
    }
    for (i2 = 0, m_pos = 0; i2 < buf_len; m_pos++) {
      c2 = str.charCodeAt(m_pos);
      if ((c2 & 64512) === 55296 && m_pos + 1 < str_len) {
        c22 = str.charCodeAt(m_pos + 1);
        if ((c22 & 64512) === 56320) {
          c2 = 65536 + (c2 - 55296 << 10) + (c22 - 56320);
          m_pos++;
        }
      }
      if (c2 < 128) {
        buf[i2++] = c2;
      } else if (c2 < 2048) {
        buf[i2++] = 192 | c2 >>> 6;
        buf[i2++] = 128 | c2 & 63;
      } else if (c2 < 65536) {
        buf[i2++] = 224 | c2 >>> 12;
        buf[i2++] = 128 | c2 >>> 6 & 63;
        buf[i2++] = 128 | c2 & 63;
      } else {
        buf[i2++] = 240 | c2 >>> 18;
        buf[i2++] = 128 | c2 >>> 12 & 63;
        buf[i2++] = 128 | c2 >>> 6 & 63;
        buf[i2++] = 128 | c2 & 63;
      }
    }
    return buf;
  };
  var utf8border = function(buf, max) {
    var pos;
    max = max || buf.length;
    if (max > buf.length) {
      max = buf.length;
    }
    pos = max - 1;
    while (pos >= 0 && (buf[pos] & 192) === 128) {
      pos--;
    }
    if (pos < 0) {
      return max;
    }
    if (pos === 0) {
      return max;
    }
    return pos + _utf8len2[buf[pos]] > max ? pos : max;
  };
  var buf2string = function(buf) {
    var i2, out2, c2, c_len;
    var len = buf.length;
    var utf16buf = new Array(len * 2);
    for (out2 = 0, i2 = 0; i2 < len; ) {
      c2 = buf[i2++];
      if (c2 < 128) {
        utf16buf[out2++] = c2;
        continue;
      }
      c_len = _utf8len2[c2];
      if (c_len > 4) {
        utf16buf[out2++] = 65533;
        i2 += c_len - 1;
        continue;
      }
      c2 &= c_len === 2 ? 31 : c_len === 3 ? 15 : 7;
      while (c_len > 1 && i2 < len) {
        c2 = c2 << 6 | buf[i2++] & 63;
        c_len--;
      }
      if (c_len > 1) {
        utf16buf[out2++] = 65533;
        continue;
      }
      if (c2 < 65536) {
        utf16buf[out2++] = c2;
      } else {
        c2 -= 65536;
        utf16buf[out2++] = 55296 | c2 >> 10 & 1023;
        utf16buf[out2++] = 56320 | c2 & 1023;
      }
    }
    if (utf16buf.length !== out2) {
      if (utf16buf.subarray) {
        utf16buf = utf16buf.subarray(0, out2);
      } else {
        utf16buf.length = out2;
      }
    }
    return utils2.applyFromCharCode(utf16buf);
  };
  exports.utf8encode = function utf8encode(str) {
    if (support2.nodebuffer) {
      return nodejsUtils2.newBufferFrom(str, "utf-8");
    }
    return string2buf(str);
  };
  exports.utf8decode = function utf8decode(buf) {
    if (support2.nodebuffer) {
      return utils2.transformTo("nodebuffer", buf).toString("utf-8");
    }
    buf = utils2.transformTo(support2.uint8array ? "uint8array" : "array", buf);
    return buf2string(buf);
  };
  function Utf8DecodeWorker() {
    GenericWorker2.call(this, "utf-8 decode");
    this.leftOver = null;
  }
  utils2.inherits(Utf8DecodeWorker, GenericWorker2);
  Utf8DecodeWorker.prototype.processChunk = function(chunk) {
    var data = utils2.transformTo(support2.uint8array ? "uint8array" : "array", chunk.data);
    if (this.leftOver && this.leftOver.length) {
      if (support2.uint8array) {
        var previousData = data;
        data = new Uint8Array(previousData.length + this.leftOver.length);
        data.set(this.leftOver, 0);
        data.set(previousData, this.leftOver.length);
      } else {
        data = this.leftOver.concat(data);
      }
      this.leftOver = null;
    }
    var nextBoundary = utf8border(data);
    var usableData = data;
    if (nextBoundary !== data.length) {
      if (support2.uint8array) {
        usableData = data.subarray(0, nextBoundary);
        this.leftOver = data.subarray(nextBoundary, data.length);
      } else {
        usableData = data.slice(0, nextBoundary);
        this.leftOver = data.slice(nextBoundary, data.length);
      }
    }
    this.push({
      data: exports.utf8decode(usableData),
      meta: chunk.meta
    });
  };
  Utf8DecodeWorker.prototype.flush = function() {
    if (this.leftOver && this.leftOver.length) {
      this.push({
        data: exports.utf8decode(this.leftOver),
        meta: {}
      });
      this.leftOver = null;
    }
  };
  exports.Utf8DecodeWorker = Utf8DecodeWorker;
  function Utf8EncodeWorker() {
    GenericWorker2.call(this, "utf-8 encode");
  }
  utils2.inherits(Utf8EncodeWorker, GenericWorker2);
  Utf8EncodeWorker.prototype.processChunk = function(chunk) {
    this.push({
      data: exports.utf8encode(chunk.data),
      meta: chunk.meta
    });
  };
  exports.Utf8EncodeWorker = Utf8EncodeWorker;
})(utf8$5);
var GenericWorker$a = GenericWorker_1;
var utils$q = requireUtils();
function ConvertWorker$1(destType) {
  GenericWorker$a.call(this, "ConvertWorker to " + destType);
  this.destType = destType;
}
utils$q.inherits(ConvertWorker$1, GenericWorker$a);
ConvertWorker$1.prototype.processChunk = function(chunk) {
  this.push({
    data: utils$q.transformTo(this.destType, chunk.data),
    meta: chunk.meta
  });
};
var ConvertWorker_1 = ConvertWorker$1;
var NodejsStreamOutputAdapter_1;
var hasRequiredNodejsStreamOutputAdapter;
function requireNodejsStreamOutputAdapter() {
  if (hasRequiredNodejsStreamOutputAdapter)
    return NodejsStreamOutputAdapter_1;
  hasRequiredNodejsStreamOutputAdapter = 1;
  var Readable = requireReadable().Readable;
  var utils2 = requireUtils();
  utils2.inherits(NodejsStreamOutputAdapter2, Readable);
  function NodejsStreamOutputAdapter2(helper, options, updateCb) {
    Readable.call(this, options);
    this._helper = helper;
    var self2 = this;
    helper.on("data", function(data, meta) {
      if (!self2.push(data)) {
        self2._helper.pause();
      }
      if (updateCb) {
        updateCb(meta);
      }
    }).on("error", function(e) {
      self2.emit("error", e);
    }).on("end", function() {
      self2.push(null);
    });
  }
  NodejsStreamOutputAdapter2.prototype._read = function() {
    this._helper.resume();
  };
  NodejsStreamOutputAdapter_1 = NodejsStreamOutputAdapter2;
  return NodejsStreamOutputAdapter_1;
}
var utils$p = requireUtils();
var ConvertWorker = ConvertWorker_1;
var GenericWorker$9 = GenericWorker_1;
var base64 = requireBase64();
var support$3 = support$4;
var external$2 = external$3;
var NodejsStreamOutputAdapter = null;
if (support$3.nodestream) {
  try {
    NodejsStreamOutputAdapter = requireNodejsStreamOutputAdapter();
  } catch (e) {
  }
}
function transformZipOutput(type, content, mimeType) {
  switch (type) {
    case "blob":
      return utils$p.newBlob(utils$p.transformTo("arraybuffer", content), mimeType);
    case "base64":
      return base64.encode(content);
    default:
      return utils$p.transformTo(type, content);
  }
}
function concat(type, dataArray) {
  var i, index = 0, res = null, totalLength = 0;
  for (i = 0; i < dataArray.length; i++) {
    totalLength += dataArray[i].length;
  }
  switch (type) {
    case "string":
      return dataArray.join("");
    case "array":
      return Array.prototype.concat.apply([], dataArray);
    case "uint8array":
      res = new Uint8Array(totalLength);
      for (i = 0; i < dataArray.length; i++) {
        res.set(dataArray[i], index);
        index += dataArray[i].length;
      }
      return res;
    case "nodebuffer":
      return Buffer.concat(dataArray);
    default:
      throw new Error("concat : unsupported type '" + type + "'");
  }
}
function accumulate(helper, updateCallback) {
  return new external$2.Promise(function(resolve, reject) {
    var dataArray = [];
    var chunkType = helper._internalType, resultType = helper._outputType, mimeType = helper._mimeType;
    helper.on("data", function(data, meta) {
      dataArray.push(data);
      if (updateCallback) {
        updateCallback(meta);
      }
    }).on("error", function(err2) {
      dataArray = [];
      reject(err2);
    }).on("end", function() {
      try {
        var result = transformZipOutput(resultType, concat(chunkType, dataArray), mimeType);
        resolve(result);
      } catch (e) {
        reject(e);
      }
      dataArray = [];
    }).resume();
  });
}
function StreamHelper$2(worker, outputType, mimeType) {
  var internalType = outputType;
  switch (outputType) {
    case "blob":
    case "arraybuffer":
      internalType = "uint8array";
      break;
    case "base64":
      internalType = "string";
      break;
  }
  try {
    this._internalType = internalType;
    this._outputType = outputType;
    this._mimeType = mimeType;
    utils$p.checkSupport(internalType);
    this._worker = worker.pipe(new ConvertWorker(internalType));
    worker.lock();
  } catch (e) {
    this._worker = new GenericWorker$9("error");
    this._worker.error(e);
  }
}
StreamHelper$2.prototype = {
  /**
   * Listen a StreamHelper, accumulate its content and concatenate it into a
   * complete block.
   * @param {Function} updateCb the update callback.
   * @return Promise the promise for the accumulation.
   */
  accumulate: function(updateCb) {
    return accumulate(this, updateCb);
  },
  /**
   * Add a listener on an event triggered on a stream.
   * @param {String} evt the name of the event
   * @param {Function} fn the listener
   * @return {StreamHelper} the current helper.
   */
  on: function(evt, fn) {
    var self2 = this;
    if (evt === "data") {
      this._worker.on(evt, function(chunk) {
        fn.call(self2, chunk.data, chunk.meta);
      });
    } else {
      this._worker.on(evt, function() {
        utils$p.delay(fn, arguments, self2);
      });
    }
    return this;
  },
  /**
   * Resume the flow of chunks.
   * @return {StreamHelper} the current helper.
   */
  resume: function() {
    utils$p.delay(this._worker.resume, [], this._worker);
    return this;
  },
  /**
   * Pause the flow of chunks.
   * @return {StreamHelper} the current helper.
   */
  pause: function() {
    this._worker.pause();
    return this;
  },
  /**
   * Return a nodejs stream for this helper.
   * @param {Function} updateCb the update callback.
   * @return {NodejsStreamOutputAdapter} the nodejs stream.
   */
  toNodejsStream: function(updateCb) {
    utils$p.checkSupport("nodestream");
    if (this._outputType !== "nodebuffer") {
      throw new Error(this._outputType + " is not supported by this method");
    }
    return new NodejsStreamOutputAdapter(this, {
      objectMode: this._outputType !== "nodebuffer"
    }, updateCb);
  }
};
var StreamHelper_1 = StreamHelper$2;
var defaults$1 = {};
defaults$1.base64 = false;
defaults$1.binary = false;
defaults$1.dir = false;
defaults$1.createFolders = true;
defaults$1.date = null;
defaults$1.compression = null;
defaults$1.compressionOptions = null;
defaults$1.comment = null;
defaults$1.unixPermissions = null;
defaults$1.dosPermissions = null;
var utils$o = requireUtils();
var GenericWorker$8 = GenericWorker_1;
var DEFAULT_BLOCK_SIZE = 16 * 1024;
function DataWorker$2(dataP) {
  GenericWorker$8.call(this, "DataWorker");
  var self2 = this;
  this.dataIsReady = false;
  this.index = 0;
  this.max = 0;
  this.data = null;
  this.type = "";
  this._tickScheduled = false;
  dataP.then(function(data) {
    self2.dataIsReady = true;
    self2.data = data;
    self2.max = data && data.length || 0;
    self2.type = utils$o.getTypeOf(data);
    if (!self2.isPaused) {
      self2._tickAndRepeat();
    }
  }, function(e) {
    self2.error(e);
  });
}
utils$o.inherits(DataWorker$2, GenericWorker$8);
DataWorker$2.prototype.cleanUp = function() {
  GenericWorker$8.prototype.cleanUp.call(this);
  this.data = null;
};
DataWorker$2.prototype.resume = function() {
  if (!GenericWorker$8.prototype.resume.call(this)) {
    return false;
  }
  if (!this._tickScheduled && this.dataIsReady) {
    this._tickScheduled = true;
    utils$o.delay(this._tickAndRepeat, [], this);
  }
  return true;
};
DataWorker$2.prototype._tickAndRepeat = function() {
  this._tickScheduled = false;
  if (this.isPaused || this.isFinished) {
    return;
  }
  this._tick();
  if (!this.isFinished) {
    utils$o.delay(this._tickAndRepeat, [], this);
    this._tickScheduled = true;
  }
};
DataWorker$2.prototype._tick = function() {
  if (this.isPaused || this.isFinished) {
    return false;
  }
  var size = DEFAULT_BLOCK_SIZE;
  var data = null, nextIndex = Math.min(this.max, this.index + size);
  if (this.index >= this.max) {
    return this.end();
  } else {
    switch (this.type) {
      case "string":
        data = this.data.substring(this.index, nextIndex);
        break;
      case "uint8array":
        data = this.data.subarray(this.index, nextIndex);
        break;
      case "array":
      case "nodebuffer":
        data = this.data.slice(this.index, nextIndex);
        break;
    }
    this.index = nextIndex;
    return this.push({
      data,
      meta: {
        percent: this.max ? this.index / this.max * 100 : 0
      }
    });
  }
};
var DataWorker_1 = DataWorker$2;
var utils$n = requireUtils();
function makeTable$1() {
  var c2, table = [];
  for (var n = 0; n < 256; n++) {
    c2 = n;
    for (var k = 0; k < 8; k++) {
      c2 = c2 & 1 ? 3988292384 ^ c2 >>> 1 : c2 >>> 1;
    }
    table[n] = c2;
  }
  return table;
}
var crcTable$1 = makeTable$1();
function crc32$5(crc, buf, len, pos) {
  var t = crcTable$1, end = pos + len;
  crc = crc ^ -1;
  for (var i = pos; i < end; i++) {
    crc = crc >>> 8 ^ t[(crc ^ buf[i]) & 255];
  }
  return crc ^ -1;
}
function crc32str(crc, str, len, pos) {
  var t = crcTable$1, end = pos + len;
  crc = crc ^ -1;
  for (var i = pos; i < end; i++) {
    crc = crc >>> 8 ^ t[(crc ^ str.charCodeAt(i)) & 255];
  }
  return crc ^ -1;
}
var crc32_1$1 = function crc32wrapper(input, crc) {
  if (typeof input === "undefined" || !input.length) {
    return 0;
  }
  var isArray = utils$n.getTypeOf(input) !== "string";
  if (isArray) {
    return crc32$5(crc | 0, input, input.length, 0);
  } else {
    return crc32str(crc | 0, input, input.length, 0);
  }
};
var GenericWorker$7 = GenericWorker_1;
var crc32$4 = crc32_1$1;
var utils$m = requireUtils();
function Crc32Probe$2() {
  GenericWorker$7.call(this, "Crc32Probe");
  this.withStreamInfo("crc32", 0);
}
utils$m.inherits(Crc32Probe$2, GenericWorker$7);
Crc32Probe$2.prototype.processChunk = function(chunk) {
  this.streamInfo.crc32 = crc32$4(chunk.data, this.streamInfo.crc32 || 0);
  this.push(chunk);
};
var Crc32Probe_1 = Crc32Probe$2;
var utils$l = requireUtils();
var GenericWorker$6 = GenericWorker_1;
function DataLengthProbe$1(propName) {
  GenericWorker$6.call(this, "DataLengthProbe for " + propName);
  this.propName = propName;
  this.withStreamInfo(propName, 0);
}
utils$l.inherits(DataLengthProbe$1, GenericWorker$6);
DataLengthProbe$1.prototype.processChunk = function(chunk) {
  if (chunk) {
    var length = this.streamInfo[this.propName] || 0;
    this.streamInfo[this.propName] = length + chunk.data.length;
  }
  GenericWorker$6.prototype.processChunk.call(this, chunk);
};
var DataLengthProbe_1 = DataLengthProbe$1;
var external$1 = external$3;
var DataWorker$1 = DataWorker_1;
var Crc32Probe$1 = Crc32Probe_1;
var DataLengthProbe = DataLengthProbe_1;
function CompressedObject$3(compressedSize, uncompressedSize, crc322, compression, data) {
  this.compressedSize = compressedSize;
  this.uncompressedSize = uncompressedSize;
  this.crc32 = crc322;
  this.compression = compression;
  this.compressedContent = data;
}
CompressedObject$3.prototype = {
  /**
   * Create a worker to get the uncompressed content.
   * @return {GenericWorker} the worker.
   */
  getContentWorker: function() {
    var worker = new DataWorker$1(external$1.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new DataLengthProbe("data_length"));
    var that = this;
    worker.on("end", function() {
      if (this.streamInfo["data_length"] !== that.uncompressedSize) {
        throw new Error("Bug : uncompressed data size mismatch");
      }
    });
    return worker;
  },
  /**
   * Create a worker to get the compressed content.
   * @return {GenericWorker} the worker.
   */
  getCompressedWorker: function() {
    return new DataWorker$1(external$1.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize", this.compressedSize).withStreamInfo("uncompressedSize", this.uncompressedSize).withStreamInfo("crc32", this.crc32).withStreamInfo("compression", this.compression);
  }
};
CompressedObject$3.createWorkerFrom = function(uncompressedWorker, compression, compressionOptions) {
  return uncompressedWorker.pipe(new Crc32Probe$1()).pipe(new DataLengthProbe("uncompressedSize")).pipe(compression.compressWorker(compressionOptions)).pipe(new DataLengthProbe("compressedSize")).withStreamInfo("compression", compression);
};
var compressedObject = CompressedObject$3;
var StreamHelper$1 = StreamHelper_1;
var DataWorker = DataWorker_1;
var utf8$4 = utf8$5;
var CompressedObject$2 = compressedObject;
var GenericWorker$5 = GenericWorker_1;
var ZipObject$1 = function(name, data, options) {
  this.name = name;
  this.dir = options.dir;
  this.date = options.date;
  this.comment = options.comment;
  this.unixPermissions = options.unixPermissions;
  this.dosPermissions = options.dosPermissions;
  this._data = data;
  this._dataBinary = options.binary;
  this.options = {
    compression: options.compression,
    compressionOptions: options.compressionOptions
  };
};
ZipObject$1.prototype = {
  /**
   * Create an internal stream for the content of this object.
   * @param {String} type the type of each chunk.
   * @return StreamHelper the stream.
   */
  internalStream: function(type) {
    var result = null, outputType = "string";
    try {
      if (!type) {
        throw new Error("No output type specified.");
      }
      outputType = type.toLowerCase();
      var askUnicodeString = outputType === "string" || outputType === "text";
      if (outputType === "binarystring" || outputType === "text") {
        outputType = "string";
      }
      result = this._decompressWorker();
      var isUnicodeString = !this._dataBinary;
      if (isUnicodeString && !askUnicodeString) {
        result = result.pipe(new utf8$4.Utf8EncodeWorker());
      }
      if (!isUnicodeString && askUnicodeString) {
        result = result.pipe(new utf8$4.Utf8DecodeWorker());
      }
    } catch (e) {
      result = new GenericWorker$5("error");
      result.error(e);
    }
    return new StreamHelper$1(result, outputType, "");
  },
  /**
   * Prepare the content in the asked type.
   * @param {String} type the type of the result.
   * @param {Function} onUpdate a function to call on each internal update.
   * @return Promise the promise of the result.
   */
  async: function(type, onUpdate) {
    return this.internalStream(type).accumulate(onUpdate);
  },
  /**
   * Prepare the content as a nodejs stream.
   * @param {String} type the type of each chunk.
   * @param {Function} onUpdate a function to call on each internal update.
   * @return Stream the stream.
   */
  nodeStream: function(type, onUpdate) {
    return this.internalStream(type || "nodebuffer").toNodejsStream(onUpdate);
  },
  /**
   * Return a worker for the compressed content.
   * @private
   * @param {Object} compression the compression object to use.
   * @param {Object} compressionOptions the options to use when compressing.
   * @return Worker the worker.
   */
  _compressWorker: function(compression, compressionOptions) {
    if (this._data instanceof CompressedObject$2 && this._data.compression.magic === compression.magic) {
      return this._data.getCompressedWorker();
    } else {
      var result = this._decompressWorker();
      if (!this._dataBinary) {
        result = result.pipe(new utf8$4.Utf8EncodeWorker());
      }
      return CompressedObject$2.createWorkerFrom(result, compression, compressionOptions);
    }
  },
  /**
   * Return a worker for the decompressed content.
   * @private
   * @return Worker the worker.
   */
  _decompressWorker: function() {
    if (this._data instanceof CompressedObject$2) {
      return this._data.getContentWorker();
    } else if (this._data instanceof GenericWorker$5) {
      return this._data;
    } else {
      return new DataWorker(this._data);
    }
  }
};
var removedMethods = ["asText", "asBinary", "asNodeBuffer", "asUint8Array", "asArrayBuffer"];
var removedFn = function() {
  throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
};
for (var i = 0; i < removedMethods.length; i++) {
  ZipObject$1.prototype[removedMethods[i]] = removedFn;
}
var zipObject = ZipObject$1;
var generate$1 = {};
var compressions$2 = {};
var flate = {};
var common = {};
(function(exports) {
  var TYPED_OK = typeof Uint8Array !== "undefined" && typeof Uint16Array !== "undefined" && typeof Int32Array !== "undefined";
  function _has(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
  }
  exports.assign = function(obj) {
    var sources = Array.prototype.slice.call(arguments, 1);
    while (sources.length) {
      var source = sources.shift();
      if (!source) {
        continue;
      }
      if (typeof source !== "object") {
        throw new TypeError(source + "must be non-object");
      }
      for (var p in source) {
        if (_has(source, p)) {
          obj[p] = source[p];
        }
      }
    }
    return obj;
  };
  exports.shrinkBuf = function(buf, size) {
    if (buf.length === size) {
      return buf;
    }
    if (buf.subarray) {
      return buf.subarray(0, size);
    }
    buf.length = size;
    return buf;
  };
  var fnTyped = {
    arraySet: function(dest, src, src_offs, len, dest_offs) {
      if (src.subarray && dest.subarray) {
        dest.set(src.subarray(src_offs, src_offs + len), dest_offs);
        return;
      }
      for (var i = 0; i < len; i++) {
        dest[dest_offs + i] = src[src_offs + i];
      }
    },
    // Join array of chunks to single array.
    flattenChunks: function(chunks) {
      var i, l, len, pos, chunk, result;
      len = 0;
      for (i = 0, l = chunks.length; i < l; i++) {
        len += chunks[i].length;
      }
      result = new Uint8Array(len);
      pos = 0;
      for (i = 0, l = chunks.length; i < l; i++) {
        chunk = chunks[i];
        result.set(chunk, pos);
        pos += chunk.length;
      }
      return result;
    }
  };
  var fnUntyped = {
    arraySet: function(dest, src, src_offs, len, dest_offs) {
      for (var i = 0; i < len; i++) {
        dest[dest_offs + i] = src[src_offs + i];
      }
    },
    // Join array of chunks to single array.
    flattenChunks: function(chunks) {
      return [].concat.apply([], chunks);
    }
  };
  exports.setTyped = function(on) {
    if (on) {
      exports.Buf8 = Uint8Array;
      exports.Buf16 = Uint16Array;
      exports.Buf32 = Int32Array;
      exports.assign(exports, fnTyped);
    } else {
      exports.Buf8 = Array;
      exports.Buf16 = Array;
      exports.Buf32 = Array;
      exports.assign(exports, fnUntyped);
    }
  };
  exports.setTyped(TYPED_OK);
})(common);
var deflate$4 = {};
var deflate$3 = {};
var trees$1 = {};
var utils$k = common;
var Z_FIXED$1 = 4;
var Z_BINARY = 0;
var Z_TEXT = 1;
var Z_UNKNOWN$1 = 2;
function zero$1(buf) {
  var len = buf.length;
  while (--len >= 0) {
    buf[len] = 0;
  }
}
var STORED_BLOCK = 0;
var STATIC_TREES = 1;
var DYN_TREES = 2;
var MIN_MATCH$1 = 3;
var MAX_MATCH$1 = 258;
var LENGTH_CODES$1 = 29;
var LITERALS$1 = 256;
var L_CODES$1 = LITERALS$1 + 1 + LENGTH_CODES$1;
var D_CODES$1 = 30;
var BL_CODES$1 = 19;
var HEAP_SIZE$1 = 2 * L_CODES$1 + 1;
var MAX_BITS$1 = 15;
var Buf_size = 16;
var MAX_BL_BITS = 7;
var END_BLOCK = 256;
var REP_3_6 = 16;
var REPZ_3_10 = 17;
var REPZ_11_138 = 18;
var extra_lbits = (
  /* extra bits for each length code */
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0]
);
var extra_dbits = (
  /* extra bits for each distance code */
  [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13]
);
var extra_blbits = (
  /* extra bits for each bit length code */
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7]
);
var bl_order = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
var DIST_CODE_LEN = 512;
var static_ltree = new Array((L_CODES$1 + 2) * 2);
zero$1(static_ltree);
var static_dtree = new Array(D_CODES$1 * 2);
zero$1(static_dtree);
var _dist_code = new Array(DIST_CODE_LEN);
zero$1(_dist_code);
var _length_code = new Array(MAX_MATCH$1 - MIN_MATCH$1 + 1);
zero$1(_length_code);
var base_length = new Array(LENGTH_CODES$1);
zero$1(base_length);
var base_dist = new Array(D_CODES$1);
zero$1(base_dist);
function StaticTreeDesc(static_tree, extra_bits, extra_base, elems, max_length) {
  this.static_tree = static_tree;
  this.extra_bits = extra_bits;
  this.extra_base = extra_base;
  this.elems = elems;
  this.max_length = max_length;
  this.has_stree = static_tree && static_tree.length;
}
var static_l_desc;
var static_d_desc;
var static_bl_desc;
function TreeDesc(dyn_tree, stat_desc) {
  this.dyn_tree = dyn_tree;
  this.max_code = 0;
  this.stat_desc = stat_desc;
}
function d_code(dist2) {
  return dist2 < 256 ? _dist_code[dist2] : _dist_code[256 + (dist2 >>> 7)];
}
function put_short(s, w) {
  s.pending_buf[s.pending++] = w & 255;
  s.pending_buf[s.pending++] = w >>> 8 & 255;
}
function send_bits(s, value, length) {
  if (s.bi_valid > Buf_size - length) {
    s.bi_buf |= value << s.bi_valid & 65535;
    put_short(s, s.bi_buf);
    s.bi_buf = value >> Buf_size - s.bi_valid;
    s.bi_valid += length - Buf_size;
  } else {
    s.bi_buf |= value << s.bi_valid & 65535;
    s.bi_valid += length;
  }
}
function send_code(s, c2, tree) {
  send_bits(
    s,
    tree[c2 * 2],
    tree[c2 * 2 + 1]
    /*.Len*/
  );
}
function bi_reverse(code, len) {
  var res = 0;
  do {
    res |= code & 1;
    code >>>= 1;
    res <<= 1;
  } while (--len > 0);
  return res >>> 1;
}
function bi_flush(s) {
  if (s.bi_valid === 16) {
    put_short(s, s.bi_buf);
    s.bi_buf = 0;
    s.bi_valid = 0;
  } else if (s.bi_valid >= 8) {
    s.pending_buf[s.pending++] = s.bi_buf & 255;
    s.bi_buf >>= 8;
    s.bi_valid -= 8;
  }
}
function gen_bitlen(s, desc) {
  var tree = desc.dyn_tree;
  var max_code = desc.max_code;
  var stree = desc.stat_desc.static_tree;
  var has_stree = desc.stat_desc.has_stree;
  var extra = desc.stat_desc.extra_bits;
  var base = desc.stat_desc.extra_base;
  var max_length = desc.stat_desc.max_length;
  var h;
  var n, m;
  var bits;
  var xbits;
  var f;
  var overflow = 0;
  for (bits = 0; bits <= MAX_BITS$1; bits++) {
    s.bl_count[bits] = 0;
  }
  tree[s.heap[s.heap_max] * 2 + 1] = 0;
  for (h = s.heap_max + 1; h < HEAP_SIZE$1; h++) {
    n = s.heap[h];
    bits = tree[tree[n * 2 + 1] * 2 + 1] + 1;
    if (bits > max_length) {
      bits = max_length;
      overflow++;
    }
    tree[n * 2 + 1] = bits;
    if (n > max_code) {
      continue;
    }
    s.bl_count[bits]++;
    xbits = 0;
    if (n >= base) {
      xbits = extra[n - base];
    }
    f = tree[n * 2];
    s.opt_len += f * (bits + xbits);
    if (has_stree) {
      s.static_len += f * (stree[n * 2 + 1] + xbits);
    }
  }
  if (overflow === 0) {
    return;
  }
  do {
    bits = max_length - 1;
    while (s.bl_count[bits] === 0) {
      bits--;
    }
    s.bl_count[bits]--;
    s.bl_count[bits + 1] += 2;
    s.bl_count[max_length]--;
    overflow -= 2;
  } while (overflow > 0);
  for (bits = max_length; bits !== 0; bits--) {
    n = s.bl_count[bits];
    while (n !== 0) {
      m = s.heap[--h];
      if (m > max_code) {
        continue;
      }
      if (tree[m * 2 + 1] !== bits) {
        s.opt_len += (bits - tree[m * 2 + 1]) * tree[m * 2];
        tree[m * 2 + 1] = bits;
      }
      n--;
    }
  }
}
function gen_codes(tree, max_code, bl_count) {
  var next_code = new Array(MAX_BITS$1 + 1);
  var code = 0;
  var bits;
  var n;
  for (bits = 1; bits <= MAX_BITS$1; bits++) {
    next_code[bits] = code = code + bl_count[bits - 1] << 1;
  }
  for (n = 0; n <= max_code; n++) {
    var len = tree[n * 2 + 1];
    if (len === 0) {
      continue;
    }
    tree[n * 2] = bi_reverse(next_code[len]++, len);
  }
}
function tr_static_init() {
  var n;
  var bits;
  var length;
  var code;
  var dist2;
  var bl_count = new Array(MAX_BITS$1 + 1);
  length = 0;
  for (code = 0; code < LENGTH_CODES$1 - 1; code++) {
    base_length[code] = length;
    for (n = 0; n < 1 << extra_lbits[code]; n++) {
      _length_code[length++] = code;
    }
  }
  _length_code[length - 1] = code;
  dist2 = 0;
  for (code = 0; code < 16; code++) {
    base_dist[code] = dist2;
    for (n = 0; n < 1 << extra_dbits[code]; n++) {
      _dist_code[dist2++] = code;
    }
  }
  dist2 >>= 7;
  for (; code < D_CODES$1; code++) {
    base_dist[code] = dist2 << 7;
    for (n = 0; n < 1 << extra_dbits[code] - 7; n++) {
      _dist_code[256 + dist2++] = code;
    }
  }
  for (bits = 0; bits <= MAX_BITS$1; bits++) {
    bl_count[bits] = 0;
  }
  n = 0;
  while (n <= 143) {
    static_ltree[n * 2 + 1] = 8;
    n++;
    bl_count[8]++;
  }
  while (n <= 255) {
    static_ltree[n * 2 + 1] = 9;
    n++;
    bl_count[9]++;
  }
  while (n <= 279) {
    static_ltree[n * 2 + 1] = 7;
    n++;
    bl_count[7]++;
  }
  while (n <= 287) {
    static_ltree[n * 2 + 1] = 8;
    n++;
    bl_count[8]++;
  }
  gen_codes(static_ltree, L_CODES$1 + 1, bl_count);
  for (n = 0; n < D_CODES$1; n++) {
    static_dtree[n * 2 + 1] = 5;
    static_dtree[n * 2] = bi_reverse(n, 5);
  }
  static_l_desc = new StaticTreeDesc(static_ltree, extra_lbits, LITERALS$1 + 1, L_CODES$1, MAX_BITS$1);
  static_d_desc = new StaticTreeDesc(static_dtree, extra_dbits, 0, D_CODES$1, MAX_BITS$1);
  static_bl_desc = new StaticTreeDesc(new Array(0), extra_blbits, 0, BL_CODES$1, MAX_BL_BITS);
}
function init_block(s) {
  var n;
  for (n = 0; n < L_CODES$1; n++) {
    s.dyn_ltree[n * 2] = 0;
  }
  for (n = 0; n < D_CODES$1; n++) {
    s.dyn_dtree[n * 2] = 0;
  }
  for (n = 0; n < BL_CODES$1; n++) {
    s.bl_tree[n * 2] = 0;
  }
  s.dyn_ltree[END_BLOCK * 2] = 1;
  s.opt_len = s.static_len = 0;
  s.last_lit = s.matches = 0;
}
function bi_windup(s) {
  if (s.bi_valid > 8) {
    put_short(s, s.bi_buf);
  } else if (s.bi_valid > 0) {
    s.pending_buf[s.pending++] = s.bi_buf;
  }
  s.bi_buf = 0;
  s.bi_valid = 0;
}
function copy_block(s, buf, len, header) {
  bi_windup(s);
  {
    put_short(s, len);
    put_short(s, ~len);
  }
  utils$k.arraySet(s.pending_buf, s.window, buf, len, s.pending);
  s.pending += len;
}
function smaller(tree, n, m, depth) {
  var _n2 = n * 2;
  var _m2 = m * 2;
  return tree[_n2] < tree[_m2] || tree[_n2] === tree[_m2] && depth[n] <= depth[m];
}
function pqdownheap(s, tree, k) {
  var v = s.heap[k];
  var j = k << 1;
  while (j <= s.heap_len) {
    if (j < s.heap_len && smaller(tree, s.heap[j + 1], s.heap[j], s.depth)) {
      j++;
    }
    if (smaller(tree, v, s.heap[j], s.depth)) {
      break;
    }
    s.heap[k] = s.heap[j];
    k = j;
    j <<= 1;
  }
  s.heap[k] = v;
}
function compress_block(s, ltree, dtree) {
  var dist2;
  var lc;
  var lx = 0;
  var code;
  var extra;
  if (s.last_lit !== 0) {
    do {
      dist2 = s.pending_buf[s.d_buf + lx * 2] << 8 | s.pending_buf[s.d_buf + lx * 2 + 1];
      lc = s.pending_buf[s.l_buf + lx];
      lx++;
      if (dist2 === 0) {
        send_code(s, lc, ltree);
      } else {
        code = _length_code[lc];
        send_code(s, code + LITERALS$1 + 1, ltree);
        extra = extra_lbits[code];
        if (extra !== 0) {
          lc -= base_length[code];
          send_bits(s, lc, extra);
        }
        dist2--;
        code = d_code(dist2);
        send_code(s, code, dtree);
        extra = extra_dbits[code];
        if (extra !== 0) {
          dist2 -= base_dist[code];
          send_bits(s, dist2, extra);
        }
      }
    } while (lx < s.last_lit);
  }
  send_code(s, END_BLOCK, ltree);
}
function build_tree(s, desc) {
  var tree = desc.dyn_tree;
  var stree = desc.stat_desc.static_tree;
  var has_stree = desc.stat_desc.has_stree;
  var elems = desc.stat_desc.elems;
  var n, m;
  var max_code = -1;
  var node2;
  s.heap_len = 0;
  s.heap_max = HEAP_SIZE$1;
  for (n = 0; n < elems; n++) {
    if (tree[n * 2] !== 0) {
      s.heap[++s.heap_len] = max_code = n;
      s.depth[n] = 0;
    } else {
      tree[n * 2 + 1] = 0;
    }
  }
  while (s.heap_len < 2) {
    node2 = s.heap[++s.heap_len] = max_code < 2 ? ++max_code : 0;
    tree[node2 * 2] = 1;
    s.depth[node2] = 0;
    s.opt_len--;
    if (has_stree) {
      s.static_len -= stree[node2 * 2 + 1];
    }
  }
  desc.max_code = max_code;
  for (n = s.heap_len >> 1; n >= 1; n--) {
    pqdownheap(s, tree, n);
  }
  node2 = elems;
  do {
    n = s.heap[
      1
      /*SMALLEST*/
    ];
    s.heap[
      1
      /*SMALLEST*/
    ] = s.heap[s.heap_len--];
    pqdownheap(
      s,
      tree,
      1
      /*SMALLEST*/
    );
    m = s.heap[
      1
      /*SMALLEST*/
    ];
    s.heap[--s.heap_max] = n;
    s.heap[--s.heap_max] = m;
    tree[node2 * 2] = tree[n * 2] + tree[m * 2];
    s.depth[node2] = (s.depth[n] >= s.depth[m] ? s.depth[n] : s.depth[m]) + 1;
    tree[n * 2 + 1] = tree[m * 2 + 1] = node2;
    s.heap[
      1
      /*SMALLEST*/
    ] = node2++;
    pqdownheap(
      s,
      tree,
      1
      /*SMALLEST*/
    );
  } while (s.heap_len >= 2);
  s.heap[--s.heap_max] = s.heap[
    1
    /*SMALLEST*/
  ];
  gen_bitlen(s, desc);
  gen_codes(tree, max_code, s.bl_count);
}
function scan_tree(s, tree, max_code) {
  var n;
  var prevlen = -1;
  var curlen;
  var nextlen = tree[0 * 2 + 1];
  var count = 0;
  var max_count = 7;
  var min_count = 4;
  if (nextlen === 0) {
    max_count = 138;
    min_count = 3;
  }
  tree[(max_code + 1) * 2 + 1] = 65535;
  for (n = 0; n <= max_code; n++) {
    curlen = nextlen;
    nextlen = tree[(n + 1) * 2 + 1];
    if (++count < max_count && curlen === nextlen) {
      continue;
    } else if (count < min_count) {
      s.bl_tree[curlen * 2] += count;
    } else if (curlen !== 0) {
      if (curlen !== prevlen) {
        s.bl_tree[curlen * 2]++;
      }
      s.bl_tree[REP_3_6 * 2]++;
    } else if (count <= 10) {
      s.bl_tree[REPZ_3_10 * 2]++;
    } else {
      s.bl_tree[REPZ_11_138 * 2]++;
    }
    count = 0;
    prevlen = curlen;
    if (nextlen === 0) {
      max_count = 138;
      min_count = 3;
    } else if (curlen === nextlen) {
      max_count = 6;
      min_count = 3;
    } else {
      max_count = 7;
      min_count = 4;
    }
  }
}
function send_tree(s, tree, max_code) {
  var n;
  var prevlen = -1;
  var curlen;
  var nextlen = tree[0 * 2 + 1];
  var count = 0;
  var max_count = 7;
  var min_count = 4;
  if (nextlen === 0) {
    max_count = 138;
    min_count = 3;
  }
  for (n = 0; n <= max_code; n++) {
    curlen = nextlen;
    nextlen = tree[(n + 1) * 2 + 1];
    if (++count < max_count && curlen === nextlen) {
      continue;
    } else if (count < min_count) {
      do {
        send_code(s, curlen, s.bl_tree);
      } while (--count !== 0);
    } else if (curlen !== 0) {
      if (curlen !== prevlen) {
        send_code(s, curlen, s.bl_tree);
        count--;
      }
      send_code(s, REP_3_6, s.bl_tree);
      send_bits(s, count - 3, 2);
    } else if (count <= 10) {
      send_code(s, REPZ_3_10, s.bl_tree);
      send_bits(s, count - 3, 3);
    } else {
      send_code(s, REPZ_11_138, s.bl_tree);
      send_bits(s, count - 11, 7);
    }
    count = 0;
    prevlen = curlen;
    if (nextlen === 0) {
      max_count = 138;
      min_count = 3;
    } else if (curlen === nextlen) {
      max_count = 6;
      min_count = 3;
    } else {
      max_count = 7;
      min_count = 4;
    }
  }
}
function build_bl_tree(s) {
  var max_blindex;
  scan_tree(s, s.dyn_ltree, s.l_desc.max_code);
  scan_tree(s, s.dyn_dtree, s.d_desc.max_code);
  build_tree(s, s.bl_desc);
  for (max_blindex = BL_CODES$1 - 1; max_blindex >= 3; max_blindex--) {
    if (s.bl_tree[bl_order[max_blindex] * 2 + 1] !== 0) {
      break;
    }
  }
  s.opt_len += 3 * (max_blindex + 1) + 5 + 5 + 4;
  return max_blindex;
}
function send_all_trees(s, lcodes, dcodes, blcodes) {
  var rank2;
  send_bits(s, lcodes - 257, 5);
  send_bits(s, dcodes - 1, 5);
  send_bits(s, blcodes - 4, 4);
  for (rank2 = 0; rank2 < blcodes; rank2++) {
    send_bits(s, s.bl_tree[bl_order[rank2] * 2 + 1], 3);
  }
  send_tree(s, s.dyn_ltree, lcodes - 1);
  send_tree(s, s.dyn_dtree, dcodes - 1);
}
function detect_data_type(s) {
  var black_mask = 4093624447;
  var n;
  for (n = 0; n <= 31; n++, black_mask >>>= 1) {
    if (black_mask & 1 && s.dyn_ltree[n * 2] !== 0) {
      return Z_BINARY;
    }
  }
  if (s.dyn_ltree[9 * 2] !== 0 || s.dyn_ltree[10 * 2] !== 0 || s.dyn_ltree[13 * 2] !== 0) {
    return Z_TEXT;
  }
  for (n = 32; n < LITERALS$1; n++) {
    if (s.dyn_ltree[n * 2] !== 0) {
      return Z_TEXT;
    }
  }
  return Z_BINARY;
}
var static_init_done = false;
function _tr_init(s) {
  if (!static_init_done) {
    tr_static_init();
    static_init_done = true;
  }
  s.l_desc = new TreeDesc(s.dyn_ltree, static_l_desc);
  s.d_desc = new TreeDesc(s.dyn_dtree, static_d_desc);
  s.bl_desc = new TreeDesc(s.bl_tree, static_bl_desc);
  s.bi_buf = 0;
  s.bi_valid = 0;
  init_block(s);
}
function _tr_stored_block(s, buf, stored_len, last) {
  send_bits(s, (STORED_BLOCK << 1) + (last ? 1 : 0), 3);
  copy_block(s, buf, stored_len);
}
function _tr_align(s) {
  send_bits(s, STATIC_TREES << 1, 3);
  send_code(s, END_BLOCK, static_ltree);
  bi_flush(s);
}
function _tr_flush_block(s, buf, stored_len, last) {
  var opt_lenb, static_lenb;
  var max_blindex = 0;
  if (s.level > 0) {
    if (s.strm.data_type === Z_UNKNOWN$1) {
      s.strm.data_type = detect_data_type(s);
    }
    build_tree(s, s.l_desc);
    build_tree(s, s.d_desc);
    max_blindex = build_bl_tree(s);
    opt_lenb = s.opt_len + 3 + 7 >>> 3;
    static_lenb = s.static_len + 3 + 7 >>> 3;
    if (static_lenb <= opt_lenb) {
      opt_lenb = static_lenb;
    }
  } else {
    opt_lenb = static_lenb = stored_len + 5;
  }
  if (stored_len + 4 <= opt_lenb && buf !== -1) {
    _tr_stored_block(s, buf, stored_len, last);
  } else if (s.strategy === Z_FIXED$1 || static_lenb === opt_lenb) {
    send_bits(s, (STATIC_TREES << 1) + (last ? 1 : 0), 3);
    compress_block(s, static_ltree, static_dtree);
  } else {
    send_bits(s, (DYN_TREES << 1) + (last ? 1 : 0), 3);
    send_all_trees(s, s.l_desc.max_code + 1, s.d_desc.max_code + 1, max_blindex + 1);
    compress_block(s, s.dyn_ltree, s.dyn_dtree);
  }
  init_block(s);
  if (last) {
    bi_windup(s);
  }
}
function _tr_tally(s, dist2, lc) {
  s.pending_buf[s.d_buf + s.last_lit * 2] = dist2 >>> 8 & 255;
  s.pending_buf[s.d_buf + s.last_lit * 2 + 1] = dist2 & 255;
  s.pending_buf[s.l_buf + s.last_lit] = lc & 255;
  s.last_lit++;
  if (dist2 === 0) {
    s.dyn_ltree[lc * 2]++;
  } else {
    s.matches++;
    dist2--;
    s.dyn_ltree[(_length_code[lc] + LITERALS$1 + 1) * 2]++;
    s.dyn_dtree[d_code(dist2) * 2]++;
  }
  return s.last_lit === s.lit_bufsize - 1;
}
trees$1._tr_init = _tr_init;
trees$1._tr_stored_block = _tr_stored_block;
trees$1._tr_flush_block = _tr_flush_block;
trees$1._tr_tally = _tr_tally;
trees$1._tr_align = _tr_align;
function adler32$2(adler, buf, len, pos) {
  var s1 = adler & 65535 | 0, s2 = adler >>> 16 & 65535 | 0, n = 0;
  while (len !== 0) {
    n = len > 2e3 ? 2e3 : len;
    len -= n;
    do {
      s1 = s1 + buf[pos++] | 0;
      s2 = s2 + s1 | 0;
    } while (--n);
    s1 %= 65521;
    s2 %= 65521;
  }
  return s1 | s2 << 16 | 0;
}
var adler32_1 = adler32$2;
function makeTable() {
  var c2, table = [];
  for (var n = 0; n < 256; n++) {
    c2 = n;
    for (var k = 0; k < 8; k++) {
      c2 = c2 & 1 ? 3988292384 ^ c2 >>> 1 : c2 >>> 1;
    }
    table[n] = c2;
  }
  return table;
}
var crcTable = makeTable();
function crc32$3(crc, buf, len, pos) {
  var t = crcTable, end = pos + len;
  crc ^= -1;
  for (var i = pos; i < end; i++) {
    crc = crc >>> 8 ^ t[(crc ^ buf[i]) & 255];
  }
  return crc ^ -1;
}
var crc32_1 = crc32$3;
var messages = {
  2: "need dictionary",
  /* Z_NEED_DICT       2  */
  1: "stream end",
  /* Z_STREAM_END      1  */
  0: "",
  /* Z_OK              0  */
  "-1": "file error",
  /* Z_ERRNO         (-1) */
  "-2": "stream error",
  /* Z_STREAM_ERROR  (-2) */
  "-3": "data error",
  /* Z_DATA_ERROR    (-3) */
  "-4": "insufficient memory",
  /* Z_MEM_ERROR     (-4) */
  "-5": "buffer error",
  /* Z_BUF_ERROR     (-5) */
  "-6": "incompatible version"
  /* Z_VERSION_ERROR (-6) */
};
var utils$j = common;
var trees = trees$1;
var adler32$1 = adler32_1;
var crc32$2 = crc32_1;
var msg$2 = messages;
var Z_NO_FLUSH$1 = 0;
var Z_PARTIAL_FLUSH = 1;
var Z_FULL_FLUSH = 3;
var Z_FINISH$2 = 4;
var Z_BLOCK$1 = 5;
var Z_OK$2 = 0;
var Z_STREAM_END$2 = 1;
var Z_STREAM_ERROR$1 = -2;
var Z_DATA_ERROR$1 = -3;
var Z_BUF_ERROR$1 = -5;
var Z_DEFAULT_COMPRESSION$1 = -1;
var Z_FILTERED = 1;
var Z_HUFFMAN_ONLY = 2;
var Z_RLE = 3;
var Z_FIXED = 4;
var Z_DEFAULT_STRATEGY$1 = 0;
var Z_UNKNOWN = 2;
var Z_DEFLATED$2 = 8;
var MAX_MEM_LEVEL = 9;
var MAX_WBITS$1 = 15;
var DEF_MEM_LEVEL = 8;
var LENGTH_CODES = 29;
var LITERALS = 256;
var L_CODES = LITERALS + 1 + LENGTH_CODES;
var D_CODES = 30;
var BL_CODES = 19;
var HEAP_SIZE = 2 * L_CODES + 1;
var MAX_BITS = 15;
var MIN_MATCH = 3;
var MAX_MATCH = 258;
var MIN_LOOKAHEAD = MAX_MATCH + MIN_MATCH + 1;
var PRESET_DICT = 32;
var INIT_STATE = 42;
var EXTRA_STATE = 69;
var NAME_STATE = 73;
var COMMENT_STATE = 91;
var HCRC_STATE = 103;
var BUSY_STATE = 113;
var FINISH_STATE = 666;
var BS_NEED_MORE = 1;
var BS_BLOCK_DONE = 2;
var BS_FINISH_STARTED = 3;
var BS_FINISH_DONE = 4;
var OS_CODE = 3;
function err(strm, errorCode) {
  strm.msg = msg$2[errorCode];
  return errorCode;
}
function rank(f) {
  return (f << 1) - (f > 4 ? 9 : 0);
}
function zero(buf) {
  var len = buf.length;
  while (--len >= 0) {
    buf[len] = 0;
  }
}
function flush_pending(strm) {
  var s = strm.state;
  var len = s.pending;
  if (len > strm.avail_out) {
    len = strm.avail_out;
  }
  if (len === 0) {
    return;
  }
  utils$j.arraySet(strm.output, s.pending_buf, s.pending_out, len, strm.next_out);
  strm.next_out += len;
  s.pending_out += len;
  strm.total_out += len;
  strm.avail_out -= len;
  s.pending -= len;
  if (s.pending === 0) {
    s.pending_out = 0;
  }
}
function flush_block_only(s, last) {
  trees._tr_flush_block(s, s.block_start >= 0 ? s.block_start : -1, s.strstart - s.block_start, last);
  s.block_start = s.strstart;
  flush_pending(s.strm);
}
function put_byte(s, b) {
  s.pending_buf[s.pending++] = b;
}
function putShortMSB(s, b) {
  s.pending_buf[s.pending++] = b >>> 8 & 255;
  s.pending_buf[s.pending++] = b & 255;
}
function read_buf(strm, buf, start, size) {
  var len = strm.avail_in;
  if (len > size) {
    len = size;
  }
  if (len === 0) {
    return 0;
  }
  strm.avail_in -= len;
  utils$j.arraySet(buf, strm.input, strm.next_in, len, start);
  if (strm.state.wrap === 1) {
    strm.adler = adler32$1(strm.adler, buf, len, start);
  } else if (strm.state.wrap === 2) {
    strm.adler = crc32$2(strm.adler, buf, len, start);
  }
  strm.next_in += len;
  strm.total_in += len;
  return len;
}
function longest_match(s, cur_match) {
  var chain_length = s.max_chain_length;
  var scan = s.strstart;
  var match;
  var len;
  var best_len = s.prev_length;
  var nice_match = s.nice_match;
  var limit = s.strstart > s.w_size - MIN_LOOKAHEAD ? s.strstart - (s.w_size - MIN_LOOKAHEAD) : 0;
  var _win = s.window;
  var wmask = s.w_mask;
  var prev = s.prev;
  var strend = s.strstart + MAX_MATCH;
  var scan_end1 = _win[scan + best_len - 1];
  var scan_end = _win[scan + best_len];
  if (s.prev_length >= s.good_match) {
    chain_length >>= 2;
  }
  if (nice_match > s.lookahead) {
    nice_match = s.lookahead;
  }
  do {
    match = cur_match;
    if (_win[match + best_len] !== scan_end || _win[match + best_len - 1] !== scan_end1 || _win[match] !== _win[scan] || _win[++match] !== _win[scan + 1]) {
      continue;
    }
    scan += 2;
    match++;
    do {
    } while (_win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && scan < strend);
    len = MAX_MATCH - (strend - scan);
    scan = strend - MAX_MATCH;
    if (len > best_len) {
      s.match_start = cur_match;
      best_len = len;
      if (len >= nice_match) {
        break;
      }
      scan_end1 = _win[scan + best_len - 1];
      scan_end = _win[scan + best_len];
    }
  } while ((cur_match = prev[cur_match & wmask]) > limit && --chain_length !== 0);
  if (best_len <= s.lookahead) {
    return best_len;
  }
  return s.lookahead;
}
function fill_window(s) {
  var _w_size = s.w_size;
  var p, n, m, more, str;
  do {
    more = s.window_size - s.lookahead - s.strstart;
    if (s.strstart >= _w_size + (_w_size - MIN_LOOKAHEAD)) {
      utils$j.arraySet(s.window, s.window, _w_size, _w_size, 0);
      s.match_start -= _w_size;
      s.strstart -= _w_size;
      s.block_start -= _w_size;
      n = s.hash_size;
      p = n;
      do {
        m = s.head[--p];
        s.head[p] = m >= _w_size ? m - _w_size : 0;
      } while (--n);
      n = _w_size;
      p = n;
      do {
        m = s.prev[--p];
        s.prev[p] = m >= _w_size ? m - _w_size : 0;
      } while (--n);
      more += _w_size;
    }
    if (s.strm.avail_in === 0) {
      break;
    }
    n = read_buf(s.strm, s.window, s.strstart + s.lookahead, more);
    s.lookahead += n;
    if (s.lookahead + s.insert >= MIN_MATCH) {
      str = s.strstart - s.insert;
      s.ins_h = s.window[str];
      s.ins_h = (s.ins_h << s.hash_shift ^ s.window[str + 1]) & s.hash_mask;
      while (s.insert) {
        s.ins_h = (s.ins_h << s.hash_shift ^ s.window[str + MIN_MATCH - 1]) & s.hash_mask;
        s.prev[str & s.w_mask] = s.head[s.ins_h];
        s.head[s.ins_h] = str;
        str++;
        s.insert--;
        if (s.lookahead + s.insert < MIN_MATCH) {
          break;
        }
      }
    }
  } while (s.lookahead < MIN_LOOKAHEAD && s.strm.avail_in !== 0);
}
function deflate_stored(s, flush) {
  var max_block_size = 65535;
  if (max_block_size > s.pending_buf_size - 5) {
    max_block_size = s.pending_buf_size - 5;
  }
  for (; ; ) {
    if (s.lookahead <= 1) {
      fill_window(s);
      if (s.lookahead === 0 && flush === Z_NO_FLUSH$1) {
        return BS_NEED_MORE;
      }
      if (s.lookahead === 0) {
        break;
      }
    }
    s.strstart += s.lookahead;
    s.lookahead = 0;
    var max_start = s.block_start + max_block_size;
    if (s.strstart === 0 || s.strstart >= max_start) {
      s.lookahead = s.strstart - max_start;
      s.strstart = max_start;
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    }
    if (s.strstart - s.block_start >= s.w_size - MIN_LOOKAHEAD) {
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    }
  }
  s.insert = 0;
  if (flush === Z_FINISH$2) {
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    return BS_FINISH_DONE;
  }
  if (s.strstart > s.block_start) {
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
  }
  return BS_NEED_MORE;
}
function deflate_fast(s, flush) {
  var hash_head;
  var bflush;
  for (; ; ) {
    if (s.lookahead < MIN_LOOKAHEAD) {
      fill_window(s);
      if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH$1) {
        return BS_NEED_MORE;
      }
      if (s.lookahead === 0) {
        break;
      }
    }
    hash_head = 0;
    if (s.lookahead >= MIN_MATCH) {
      s.ins_h = (s.ins_h << s.hash_shift ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
      hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
      s.head[s.ins_h] = s.strstart;
    }
    if (hash_head !== 0 && s.strstart - hash_head <= s.w_size - MIN_LOOKAHEAD) {
      s.match_length = longest_match(s, hash_head);
    }
    if (s.match_length >= MIN_MATCH) {
      bflush = trees._tr_tally(s, s.strstart - s.match_start, s.match_length - MIN_MATCH);
      s.lookahead -= s.match_length;
      if (s.match_length <= s.max_lazy_match && s.lookahead >= MIN_MATCH) {
        s.match_length--;
        do {
          s.strstart++;
          s.ins_h = (s.ins_h << s.hash_shift ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
          hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
          s.head[s.ins_h] = s.strstart;
        } while (--s.match_length !== 0);
        s.strstart++;
      } else {
        s.strstart += s.match_length;
        s.match_length = 0;
        s.ins_h = s.window[s.strstart];
        s.ins_h = (s.ins_h << s.hash_shift ^ s.window[s.strstart + 1]) & s.hash_mask;
      }
    } else {
      bflush = trees._tr_tally(s, 0, s.window[s.strstart]);
      s.lookahead--;
      s.strstart++;
    }
    if (bflush) {
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    }
  }
  s.insert = s.strstart < MIN_MATCH - 1 ? s.strstart : MIN_MATCH - 1;
  if (flush === Z_FINISH$2) {
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    return BS_FINISH_DONE;
  }
  if (s.last_lit) {
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
  }
  return BS_BLOCK_DONE;
}
function deflate_slow(s, flush) {
  var hash_head;
  var bflush;
  var max_insert;
  for (; ; ) {
    if (s.lookahead < MIN_LOOKAHEAD) {
      fill_window(s);
      if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH$1) {
        return BS_NEED_MORE;
      }
      if (s.lookahead === 0) {
        break;
      }
    }
    hash_head = 0;
    if (s.lookahead >= MIN_MATCH) {
      s.ins_h = (s.ins_h << s.hash_shift ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
      hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
      s.head[s.ins_h] = s.strstart;
    }
    s.prev_length = s.match_length;
    s.prev_match = s.match_start;
    s.match_length = MIN_MATCH - 1;
    if (hash_head !== 0 && s.prev_length < s.max_lazy_match && s.strstart - hash_head <= s.w_size - MIN_LOOKAHEAD) {
      s.match_length = longest_match(s, hash_head);
      if (s.match_length <= 5 && (s.strategy === Z_FILTERED || s.match_length === MIN_MATCH && s.strstart - s.match_start > 4096)) {
        s.match_length = MIN_MATCH - 1;
      }
    }
    if (s.prev_length >= MIN_MATCH && s.match_length <= s.prev_length) {
      max_insert = s.strstart + s.lookahead - MIN_MATCH;
      bflush = trees._tr_tally(s, s.strstart - 1 - s.prev_match, s.prev_length - MIN_MATCH);
      s.lookahead -= s.prev_length - 1;
      s.prev_length -= 2;
      do {
        if (++s.strstart <= max_insert) {
          s.ins_h = (s.ins_h << s.hash_shift ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
          hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
          s.head[s.ins_h] = s.strstart;
        }
      } while (--s.prev_length !== 0);
      s.match_available = 0;
      s.match_length = MIN_MATCH - 1;
      s.strstart++;
      if (bflush) {
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
      }
    } else if (s.match_available) {
      bflush = trees._tr_tally(s, 0, s.window[s.strstart - 1]);
      if (bflush) {
        flush_block_only(s, false);
      }
      s.strstart++;
      s.lookahead--;
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    } else {
      s.match_available = 1;
      s.strstart++;
      s.lookahead--;
    }
  }
  if (s.match_available) {
    bflush = trees._tr_tally(s, 0, s.window[s.strstart - 1]);
    s.match_available = 0;
  }
  s.insert = s.strstart < MIN_MATCH - 1 ? s.strstart : MIN_MATCH - 1;
  if (flush === Z_FINISH$2) {
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    return BS_FINISH_DONE;
  }
  if (s.last_lit) {
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
  }
  return BS_BLOCK_DONE;
}
function deflate_rle(s, flush) {
  var bflush;
  var prev;
  var scan, strend;
  var _win = s.window;
  for (; ; ) {
    if (s.lookahead <= MAX_MATCH) {
      fill_window(s);
      if (s.lookahead <= MAX_MATCH && flush === Z_NO_FLUSH$1) {
        return BS_NEED_MORE;
      }
      if (s.lookahead === 0) {
        break;
      }
    }
    s.match_length = 0;
    if (s.lookahead >= MIN_MATCH && s.strstart > 0) {
      scan = s.strstart - 1;
      prev = _win[scan];
      if (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan]) {
        strend = s.strstart + MAX_MATCH;
        do {
        } while (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && scan < strend);
        s.match_length = MAX_MATCH - (strend - scan);
        if (s.match_length > s.lookahead) {
          s.match_length = s.lookahead;
        }
      }
    }
    if (s.match_length >= MIN_MATCH) {
      bflush = trees._tr_tally(s, 1, s.match_length - MIN_MATCH);
      s.lookahead -= s.match_length;
      s.strstart += s.match_length;
      s.match_length = 0;
    } else {
      bflush = trees._tr_tally(s, 0, s.window[s.strstart]);
      s.lookahead--;
      s.strstart++;
    }
    if (bflush) {
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    }
  }
  s.insert = 0;
  if (flush === Z_FINISH$2) {
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    return BS_FINISH_DONE;
  }
  if (s.last_lit) {
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
  }
  return BS_BLOCK_DONE;
}
function deflate_huff(s, flush) {
  var bflush;
  for (; ; ) {
    if (s.lookahead === 0) {
      fill_window(s);
      if (s.lookahead === 0) {
        if (flush === Z_NO_FLUSH$1) {
          return BS_NEED_MORE;
        }
        break;
      }
    }
    s.match_length = 0;
    bflush = trees._tr_tally(s, 0, s.window[s.strstart]);
    s.lookahead--;
    s.strstart++;
    if (bflush) {
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    }
  }
  s.insert = 0;
  if (flush === Z_FINISH$2) {
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    return BS_FINISH_DONE;
  }
  if (s.last_lit) {
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
  }
  return BS_BLOCK_DONE;
}
function Config(good_length, max_lazy, nice_length, max_chain, func) {
  this.good_length = good_length;
  this.max_lazy = max_lazy;
  this.nice_length = nice_length;
  this.max_chain = max_chain;
  this.func = func;
}
var configuration_table;
configuration_table = [
  /*      good lazy nice chain */
  new Config(0, 0, 0, 0, deflate_stored),
  /* 0 store only */
  new Config(4, 4, 8, 4, deflate_fast),
  /* 1 max speed, no lazy matches */
  new Config(4, 5, 16, 8, deflate_fast),
  /* 2 */
  new Config(4, 6, 32, 32, deflate_fast),
  /* 3 */
  new Config(4, 4, 16, 16, deflate_slow),
  /* 4 lazy matches */
  new Config(8, 16, 32, 32, deflate_slow),
  /* 5 */
  new Config(8, 16, 128, 128, deflate_slow),
  /* 6 */
  new Config(8, 32, 128, 256, deflate_slow),
  /* 7 */
  new Config(32, 128, 258, 1024, deflate_slow),
  /* 8 */
  new Config(32, 258, 258, 4096, deflate_slow)
  /* 9 max compression */
];
function lm_init(s) {
  s.window_size = 2 * s.w_size;
  zero(s.head);
  s.max_lazy_match = configuration_table[s.level].max_lazy;
  s.good_match = configuration_table[s.level].good_length;
  s.nice_match = configuration_table[s.level].nice_length;
  s.max_chain_length = configuration_table[s.level].max_chain;
  s.strstart = 0;
  s.block_start = 0;
  s.lookahead = 0;
  s.insert = 0;
  s.match_length = s.prev_length = MIN_MATCH - 1;
  s.match_available = 0;
  s.ins_h = 0;
}
function DeflateState() {
  this.strm = null;
  this.status = 0;
  this.pending_buf = null;
  this.pending_buf_size = 0;
  this.pending_out = 0;
  this.pending = 0;
  this.wrap = 0;
  this.gzhead = null;
  this.gzindex = 0;
  this.method = Z_DEFLATED$2;
  this.last_flush = -1;
  this.w_size = 0;
  this.w_bits = 0;
  this.w_mask = 0;
  this.window = null;
  this.window_size = 0;
  this.prev = null;
  this.head = null;
  this.ins_h = 0;
  this.hash_size = 0;
  this.hash_bits = 0;
  this.hash_mask = 0;
  this.hash_shift = 0;
  this.block_start = 0;
  this.match_length = 0;
  this.prev_match = 0;
  this.match_available = 0;
  this.strstart = 0;
  this.match_start = 0;
  this.lookahead = 0;
  this.prev_length = 0;
  this.max_chain_length = 0;
  this.max_lazy_match = 0;
  this.level = 0;
  this.strategy = 0;
  this.good_match = 0;
  this.nice_match = 0;
  this.dyn_ltree = new utils$j.Buf16(HEAP_SIZE * 2);
  this.dyn_dtree = new utils$j.Buf16((2 * D_CODES + 1) * 2);
  this.bl_tree = new utils$j.Buf16((2 * BL_CODES + 1) * 2);
  zero(this.dyn_ltree);
  zero(this.dyn_dtree);
  zero(this.bl_tree);
  this.l_desc = null;
  this.d_desc = null;
  this.bl_desc = null;
  this.bl_count = new utils$j.Buf16(MAX_BITS + 1);
  this.heap = new utils$j.Buf16(2 * L_CODES + 1);
  zero(this.heap);
  this.heap_len = 0;
  this.heap_max = 0;
  this.depth = new utils$j.Buf16(2 * L_CODES + 1);
  zero(this.depth);
  this.l_buf = 0;
  this.lit_bufsize = 0;
  this.last_lit = 0;
  this.d_buf = 0;
  this.opt_len = 0;
  this.static_len = 0;
  this.matches = 0;
  this.insert = 0;
  this.bi_buf = 0;
  this.bi_valid = 0;
}
function deflateResetKeep(strm) {
  var s;
  if (!strm || !strm.state) {
    return err(strm, Z_STREAM_ERROR$1);
  }
  strm.total_in = strm.total_out = 0;
  strm.data_type = Z_UNKNOWN;
  s = strm.state;
  s.pending = 0;
  s.pending_out = 0;
  if (s.wrap < 0) {
    s.wrap = -s.wrap;
  }
  s.status = s.wrap ? INIT_STATE : BUSY_STATE;
  strm.adler = s.wrap === 2 ? 0 : 1;
  s.last_flush = Z_NO_FLUSH$1;
  trees._tr_init(s);
  return Z_OK$2;
}
function deflateReset(strm) {
  var ret = deflateResetKeep(strm);
  if (ret === Z_OK$2) {
    lm_init(strm.state);
  }
  return ret;
}
function deflateSetHeader(strm, head) {
  if (!strm || !strm.state) {
    return Z_STREAM_ERROR$1;
  }
  if (strm.state.wrap !== 2) {
    return Z_STREAM_ERROR$1;
  }
  strm.state.gzhead = head;
  return Z_OK$2;
}
function deflateInit2(strm, level, method, windowBits, memLevel, strategy) {
  if (!strm) {
    return Z_STREAM_ERROR$1;
  }
  var wrap = 1;
  if (level === Z_DEFAULT_COMPRESSION$1) {
    level = 6;
  }
  if (windowBits < 0) {
    wrap = 0;
    windowBits = -windowBits;
  } else if (windowBits > 15) {
    wrap = 2;
    windowBits -= 16;
  }
  if (memLevel < 1 || memLevel > MAX_MEM_LEVEL || method !== Z_DEFLATED$2 || windowBits < 8 || windowBits > 15 || level < 0 || level > 9 || strategy < 0 || strategy > Z_FIXED) {
    return err(strm, Z_STREAM_ERROR$1);
  }
  if (windowBits === 8) {
    windowBits = 9;
  }
  var s = new DeflateState();
  strm.state = s;
  s.strm = strm;
  s.wrap = wrap;
  s.gzhead = null;
  s.w_bits = windowBits;
  s.w_size = 1 << s.w_bits;
  s.w_mask = s.w_size - 1;
  s.hash_bits = memLevel + 7;
  s.hash_size = 1 << s.hash_bits;
  s.hash_mask = s.hash_size - 1;
  s.hash_shift = ~~((s.hash_bits + MIN_MATCH - 1) / MIN_MATCH);
  s.window = new utils$j.Buf8(s.w_size * 2);
  s.head = new utils$j.Buf16(s.hash_size);
  s.prev = new utils$j.Buf16(s.w_size);
  s.lit_bufsize = 1 << memLevel + 6;
  s.pending_buf_size = s.lit_bufsize * 4;
  s.pending_buf = new utils$j.Buf8(s.pending_buf_size);
  s.d_buf = 1 * s.lit_bufsize;
  s.l_buf = (1 + 2) * s.lit_bufsize;
  s.level = level;
  s.strategy = strategy;
  s.method = method;
  return deflateReset(strm);
}
function deflateInit(strm, level) {
  return deflateInit2(strm, level, Z_DEFLATED$2, MAX_WBITS$1, DEF_MEM_LEVEL, Z_DEFAULT_STRATEGY$1);
}
function deflate$2(strm, flush) {
  var old_flush, s;
  var beg, val;
  if (!strm || !strm.state || flush > Z_BLOCK$1 || flush < 0) {
    return strm ? err(strm, Z_STREAM_ERROR$1) : Z_STREAM_ERROR$1;
  }
  s = strm.state;
  if (!strm.output || !strm.input && strm.avail_in !== 0 || s.status === FINISH_STATE && flush !== Z_FINISH$2) {
    return err(strm, strm.avail_out === 0 ? Z_BUF_ERROR$1 : Z_STREAM_ERROR$1);
  }
  s.strm = strm;
  old_flush = s.last_flush;
  s.last_flush = flush;
  if (s.status === INIT_STATE) {
    if (s.wrap === 2) {
      strm.adler = 0;
      put_byte(s, 31);
      put_byte(s, 139);
      put_byte(s, 8);
      if (!s.gzhead) {
        put_byte(s, 0);
        put_byte(s, 0);
        put_byte(s, 0);
        put_byte(s, 0);
        put_byte(s, 0);
        put_byte(s, s.level === 9 ? 2 : s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ? 4 : 0);
        put_byte(s, OS_CODE);
        s.status = BUSY_STATE;
      } else {
        put_byte(
          s,
          (s.gzhead.text ? 1 : 0) + (s.gzhead.hcrc ? 2 : 0) + (!s.gzhead.extra ? 0 : 4) + (!s.gzhead.name ? 0 : 8) + (!s.gzhead.comment ? 0 : 16)
        );
        put_byte(s, s.gzhead.time & 255);
        put_byte(s, s.gzhead.time >> 8 & 255);
        put_byte(s, s.gzhead.time >> 16 & 255);
        put_byte(s, s.gzhead.time >> 24 & 255);
        put_byte(s, s.level === 9 ? 2 : s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ? 4 : 0);
        put_byte(s, s.gzhead.os & 255);
        if (s.gzhead.extra && s.gzhead.extra.length) {
          put_byte(s, s.gzhead.extra.length & 255);
          put_byte(s, s.gzhead.extra.length >> 8 & 255);
        }
        if (s.gzhead.hcrc) {
          strm.adler = crc32$2(strm.adler, s.pending_buf, s.pending, 0);
        }
        s.gzindex = 0;
        s.status = EXTRA_STATE;
      }
    } else {
      var header = Z_DEFLATED$2 + (s.w_bits - 8 << 4) << 8;
      var level_flags = -1;
      if (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2) {
        level_flags = 0;
      } else if (s.level < 6) {
        level_flags = 1;
      } else if (s.level === 6) {
        level_flags = 2;
      } else {
        level_flags = 3;
      }
      header |= level_flags << 6;
      if (s.strstart !== 0) {
        header |= PRESET_DICT;
      }
      header += 31 - header % 31;
      s.status = BUSY_STATE;
      putShortMSB(s, header);
      if (s.strstart !== 0) {
        putShortMSB(s, strm.adler >>> 16);
        putShortMSB(s, strm.adler & 65535);
      }
      strm.adler = 1;
    }
  }
  if (s.status === EXTRA_STATE) {
    if (s.gzhead.extra) {
      beg = s.pending;
      while (s.gzindex < (s.gzhead.extra.length & 65535)) {
        if (s.pending === s.pending_buf_size) {
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc32$2(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          flush_pending(strm);
          beg = s.pending;
          if (s.pending === s.pending_buf_size) {
            break;
          }
        }
        put_byte(s, s.gzhead.extra[s.gzindex] & 255);
        s.gzindex++;
      }
      if (s.gzhead.hcrc && s.pending > beg) {
        strm.adler = crc32$2(strm.adler, s.pending_buf, s.pending - beg, beg);
      }
      if (s.gzindex === s.gzhead.extra.length) {
        s.gzindex = 0;
        s.status = NAME_STATE;
      }
    } else {
      s.status = NAME_STATE;
    }
  }
  if (s.status === NAME_STATE) {
    if (s.gzhead.name) {
      beg = s.pending;
      do {
        if (s.pending === s.pending_buf_size) {
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc32$2(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          flush_pending(strm);
          beg = s.pending;
          if (s.pending === s.pending_buf_size) {
            val = 1;
            break;
          }
        }
        if (s.gzindex < s.gzhead.name.length) {
          val = s.gzhead.name.charCodeAt(s.gzindex++) & 255;
        } else {
          val = 0;
        }
        put_byte(s, val);
      } while (val !== 0);
      if (s.gzhead.hcrc && s.pending > beg) {
        strm.adler = crc32$2(strm.adler, s.pending_buf, s.pending - beg, beg);
      }
      if (val === 0) {
        s.gzindex = 0;
        s.status = COMMENT_STATE;
      }
    } else {
      s.status = COMMENT_STATE;
    }
  }
  if (s.status === COMMENT_STATE) {
    if (s.gzhead.comment) {
      beg = s.pending;
      do {
        if (s.pending === s.pending_buf_size) {
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc32$2(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          flush_pending(strm);
          beg = s.pending;
          if (s.pending === s.pending_buf_size) {
            val = 1;
            break;
          }
        }
        if (s.gzindex < s.gzhead.comment.length) {
          val = s.gzhead.comment.charCodeAt(s.gzindex++) & 255;
        } else {
          val = 0;
        }
        put_byte(s, val);
      } while (val !== 0);
      if (s.gzhead.hcrc && s.pending > beg) {
        strm.adler = crc32$2(strm.adler, s.pending_buf, s.pending - beg, beg);
      }
      if (val === 0) {
        s.status = HCRC_STATE;
      }
    } else {
      s.status = HCRC_STATE;
    }
  }
  if (s.status === HCRC_STATE) {
    if (s.gzhead.hcrc) {
      if (s.pending + 2 > s.pending_buf_size) {
        flush_pending(strm);
      }
      if (s.pending + 2 <= s.pending_buf_size) {
        put_byte(s, strm.adler & 255);
        put_byte(s, strm.adler >> 8 & 255);
        strm.adler = 0;
        s.status = BUSY_STATE;
      }
    } else {
      s.status = BUSY_STATE;
    }
  }
  if (s.pending !== 0) {
    flush_pending(strm);
    if (strm.avail_out === 0) {
      s.last_flush = -1;
      return Z_OK$2;
    }
  } else if (strm.avail_in === 0 && rank(flush) <= rank(old_flush) && flush !== Z_FINISH$2) {
    return err(strm, Z_BUF_ERROR$1);
  }
  if (s.status === FINISH_STATE && strm.avail_in !== 0) {
    return err(strm, Z_BUF_ERROR$1);
  }
  if (strm.avail_in !== 0 || s.lookahead !== 0 || flush !== Z_NO_FLUSH$1 && s.status !== FINISH_STATE) {
    var bstate = s.strategy === Z_HUFFMAN_ONLY ? deflate_huff(s, flush) : s.strategy === Z_RLE ? deflate_rle(s, flush) : configuration_table[s.level].func(s, flush);
    if (bstate === BS_FINISH_STARTED || bstate === BS_FINISH_DONE) {
      s.status = FINISH_STATE;
    }
    if (bstate === BS_NEED_MORE || bstate === BS_FINISH_STARTED) {
      if (strm.avail_out === 0) {
        s.last_flush = -1;
      }
      return Z_OK$2;
    }
    if (bstate === BS_BLOCK_DONE) {
      if (flush === Z_PARTIAL_FLUSH) {
        trees._tr_align(s);
      } else if (flush !== Z_BLOCK$1) {
        trees._tr_stored_block(s, 0, 0, false);
        if (flush === Z_FULL_FLUSH) {
          zero(s.head);
          if (s.lookahead === 0) {
            s.strstart = 0;
            s.block_start = 0;
            s.insert = 0;
          }
        }
      }
      flush_pending(strm);
      if (strm.avail_out === 0) {
        s.last_flush = -1;
        return Z_OK$2;
      }
    }
  }
  if (flush !== Z_FINISH$2) {
    return Z_OK$2;
  }
  if (s.wrap <= 0) {
    return Z_STREAM_END$2;
  }
  if (s.wrap === 2) {
    put_byte(s, strm.adler & 255);
    put_byte(s, strm.adler >> 8 & 255);
    put_byte(s, strm.adler >> 16 & 255);
    put_byte(s, strm.adler >> 24 & 255);
    put_byte(s, strm.total_in & 255);
    put_byte(s, strm.total_in >> 8 & 255);
    put_byte(s, strm.total_in >> 16 & 255);
    put_byte(s, strm.total_in >> 24 & 255);
  } else {
    putShortMSB(s, strm.adler >>> 16);
    putShortMSB(s, strm.adler & 65535);
  }
  flush_pending(strm);
  if (s.wrap > 0) {
    s.wrap = -s.wrap;
  }
  return s.pending !== 0 ? Z_OK$2 : Z_STREAM_END$2;
}
function deflateEnd(strm) {
  var status;
  if (!strm || !strm.state) {
    return Z_STREAM_ERROR$1;
  }
  status = strm.state.status;
  if (status !== INIT_STATE && status !== EXTRA_STATE && status !== NAME_STATE && status !== COMMENT_STATE && status !== HCRC_STATE && status !== BUSY_STATE && status !== FINISH_STATE) {
    return err(strm, Z_STREAM_ERROR$1);
  }
  strm.state = null;
  return status === BUSY_STATE ? err(strm, Z_DATA_ERROR$1) : Z_OK$2;
}
function deflateSetDictionary(strm, dictionary) {
  var dictLength = dictionary.length;
  var s;
  var str, n;
  var wrap;
  var avail;
  var next;
  var input;
  var tmpDict;
  if (!strm || !strm.state) {
    return Z_STREAM_ERROR$1;
  }
  s = strm.state;
  wrap = s.wrap;
  if (wrap === 2 || wrap === 1 && s.status !== INIT_STATE || s.lookahead) {
    return Z_STREAM_ERROR$1;
  }
  if (wrap === 1) {
    strm.adler = adler32$1(strm.adler, dictionary, dictLength, 0);
  }
  s.wrap = 0;
  if (dictLength >= s.w_size) {
    if (wrap === 0) {
      zero(s.head);
      s.strstart = 0;
      s.block_start = 0;
      s.insert = 0;
    }
    tmpDict = new utils$j.Buf8(s.w_size);
    utils$j.arraySet(tmpDict, dictionary, dictLength - s.w_size, s.w_size, 0);
    dictionary = tmpDict;
    dictLength = s.w_size;
  }
  avail = strm.avail_in;
  next = strm.next_in;
  input = strm.input;
  strm.avail_in = dictLength;
  strm.next_in = 0;
  strm.input = dictionary;
  fill_window(s);
  while (s.lookahead >= MIN_MATCH) {
    str = s.strstart;
    n = s.lookahead - (MIN_MATCH - 1);
    do {
      s.ins_h = (s.ins_h << s.hash_shift ^ s.window[str + MIN_MATCH - 1]) & s.hash_mask;
      s.prev[str & s.w_mask] = s.head[s.ins_h];
      s.head[s.ins_h] = str;
      str++;
    } while (--n);
    s.strstart = str;
    s.lookahead = MIN_MATCH - 1;
    fill_window(s);
  }
  s.strstart += s.lookahead;
  s.block_start = s.strstart;
  s.insert = s.lookahead;
  s.lookahead = 0;
  s.match_length = s.prev_length = MIN_MATCH - 1;
  s.match_available = 0;
  strm.next_in = next;
  strm.input = input;
  strm.avail_in = avail;
  s.wrap = wrap;
  return Z_OK$2;
}
deflate$3.deflateInit = deflateInit;
deflate$3.deflateInit2 = deflateInit2;
deflate$3.deflateReset = deflateReset;
deflate$3.deflateResetKeep = deflateResetKeep;
deflate$3.deflateSetHeader = deflateSetHeader;
deflate$3.deflate = deflate$2;
deflate$3.deflateEnd = deflateEnd;
deflate$3.deflateSetDictionary = deflateSetDictionary;
deflate$3.deflateInfo = "pako deflate (from Nodeca project)";
var strings$2 = {};
var utils$i = common;
var STR_APPLY_OK = true;
var STR_APPLY_UIA_OK = true;
try {
  String.fromCharCode.apply(null, [0]);
} catch (__) {
  STR_APPLY_OK = false;
}
try {
  String.fromCharCode.apply(null, new Uint8Array(1));
} catch (__) {
  STR_APPLY_UIA_OK = false;
}
var _utf8len = new utils$i.Buf8(256);
for (var q = 0; q < 256; q++) {
  _utf8len[q] = q >= 252 ? 6 : q >= 248 ? 5 : q >= 240 ? 4 : q >= 224 ? 3 : q >= 192 ? 2 : 1;
}
_utf8len[254] = _utf8len[254] = 1;
strings$2.string2buf = function(str) {
  var buf, c2, c22, m_pos, i, str_len = str.length, buf_len = 0;
  for (m_pos = 0; m_pos < str_len; m_pos++) {
    c2 = str.charCodeAt(m_pos);
    if ((c2 & 64512) === 55296 && m_pos + 1 < str_len) {
      c22 = str.charCodeAt(m_pos + 1);
      if ((c22 & 64512) === 56320) {
        c2 = 65536 + (c2 - 55296 << 10) + (c22 - 56320);
        m_pos++;
      }
    }
    buf_len += c2 < 128 ? 1 : c2 < 2048 ? 2 : c2 < 65536 ? 3 : 4;
  }
  buf = new utils$i.Buf8(buf_len);
  for (i = 0, m_pos = 0; i < buf_len; m_pos++) {
    c2 = str.charCodeAt(m_pos);
    if ((c2 & 64512) === 55296 && m_pos + 1 < str_len) {
      c22 = str.charCodeAt(m_pos + 1);
      if ((c22 & 64512) === 56320) {
        c2 = 65536 + (c2 - 55296 << 10) + (c22 - 56320);
        m_pos++;
      }
    }
    if (c2 < 128) {
      buf[i++] = c2;
    } else if (c2 < 2048) {
      buf[i++] = 192 | c2 >>> 6;
      buf[i++] = 128 | c2 & 63;
    } else if (c2 < 65536) {
      buf[i++] = 224 | c2 >>> 12;
      buf[i++] = 128 | c2 >>> 6 & 63;
      buf[i++] = 128 | c2 & 63;
    } else {
      buf[i++] = 240 | c2 >>> 18;
      buf[i++] = 128 | c2 >>> 12 & 63;
      buf[i++] = 128 | c2 >>> 6 & 63;
      buf[i++] = 128 | c2 & 63;
    }
  }
  return buf;
};
function buf2binstring(buf, len) {
  if (len < 65534) {
    if (buf.subarray && STR_APPLY_UIA_OK || !buf.subarray && STR_APPLY_OK) {
      return String.fromCharCode.apply(null, utils$i.shrinkBuf(buf, len));
    }
  }
  var result = "";
  for (var i = 0; i < len; i++) {
    result += String.fromCharCode(buf[i]);
  }
  return result;
}
strings$2.buf2binstring = function(buf) {
  return buf2binstring(buf, buf.length);
};
strings$2.binstring2buf = function(str) {
  var buf = new utils$i.Buf8(str.length);
  for (var i = 0, len = buf.length; i < len; i++) {
    buf[i] = str.charCodeAt(i);
  }
  return buf;
};
strings$2.buf2string = function(buf, max) {
  var i, out2, c2, c_len;
  var len = max || buf.length;
  var utf16buf = new Array(len * 2);
  for (out2 = 0, i = 0; i < len; ) {
    c2 = buf[i++];
    if (c2 < 128) {
      utf16buf[out2++] = c2;
      continue;
    }
    c_len = _utf8len[c2];
    if (c_len > 4) {
      utf16buf[out2++] = 65533;
      i += c_len - 1;
      continue;
    }
    c2 &= c_len === 2 ? 31 : c_len === 3 ? 15 : 7;
    while (c_len > 1 && i < len) {
      c2 = c2 << 6 | buf[i++] & 63;
      c_len--;
    }
    if (c_len > 1) {
      utf16buf[out2++] = 65533;
      continue;
    }
    if (c2 < 65536) {
      utf16buf[out2++] = c2;
    } else {
      c2 -= 65536;
      utf16buf[out2++] = 55296 | c2 >> 10 & 1023;
      utf16buf[out2++] = 56320 | c2 & 1023;
    }
  }
  return buf2binstring(utf16buf, out2);
};
strings$2.utf8border = function(buf, max) {
  var pos;
  max = max || buf.length;
  if (max > buf.length) {
    max = buf.length;
  }
  pos = max - 1;
  while (pos >= 0 && (buf[pos] & 192) === 128) {
    pos--;
  }
  if (pos < 0) {
    return max;
  }
  if (pos === 0) {
    return max;
  }
  return pos + _utf8len[buf[pos]] > max ? pos : max;
};
function ZStream$2() {
  this.input = null;
  this.next_in = 0;
  this.avail_in = 0;
  this.total_in = 0;
  this.output = null;
  this.next_out = 0;
  this.avail_out = 0;
  this.total_out = 0;
  this.msg = "";
  this.state = null;
  this.data_type = 2;
  this.adler = 0;
}
var zstream = ZStream$2;
var zlib_deflate = deflate$3;
var utils$h = common;
var strings$1 = strings$2;
var msg$1 = messages;
var ZStream$1 = zstream;
var toString$1 = Object.prototype.toString;
var Z_NO_FLUSH = 0;
var Z_FINISH$1 = 4;
var Z_OK$1 = 0;
var Z_STREAM_END$1 = 1;
var Z_SYNC_FLUSH = 2;
var Z_DEFAULT_COMPRESSION = -1;
var Z_DEFAULT_STRATEGY = 0;
var Z_DEFLATED$1 = 8;
function Deflate(options) {
  if (!(this instanceof Deflate))
    return new Deflate(options);
  this.options = utils$h.assign({
    level: Z_DEFAULT_COMPRESSION,
    method: Z_DEFLATED$1,
    chunkSize: 16384,
    windowBits: 15,
    memLevel: 8,
    strategy: Z_DEFAULT_STRATEGY,
    to: ""
  }, options || {});
  var opt = this.options;
  if (opt.raw && opt.windowBits > 0) {
    opt.windowBits = -opt.windowBits;
  } else if (opt.gzip && opt.windowBits > 0 && opt.windowBits < 16) {
    opt.windowBits += 16;
  }
  this.err = 0;
  this.msg = "";
  this.ended = false;
  this.chunks = [];
  this.strm = new ZStream$1();
  this.strm.avail_out = 0;
  var status = zlib_deflate.deflateInit2(
    this.strm,
    opt.level,
    opt.method,
    opt.windowBits,
    opt.memLevel,
    opt.strategy
  );
  if (status !== Z_OK$1) {
    throw new Error(msg$1[status]);
  }
  if (opt.header) {
    zlib_deflate.deflateSetHeader(this.strm, opt.header);
  }
  if (opt.dictionary) {
    var dict;
    if (typeof opt.dictionary === "string") {
      dict = strings$1.string2buf(opt.dictionary);
    } else if (toString$1.call(opt.dictionary) === "[object ArrayBuffer]") {
      dict = new Uint8Array(opt.dictionary);
    } else {
      dict = opt.dictionary;
    }
    status = zlib_deflate.deflateSetDictionary(this.strm, dict);
    if (status !== Z_OK$1) {
      throw new Error(msg$1[status]);
    }
    this._dict_set = true;
  }
}
Deflate.prototype.push = function(data, mode2) {
  var strm = this.strm;
  var chunkSize = this.options.chunkSize;
  var status, _mode2;
  if (this.ended) {
    return false;
  }
  _mode2 = mode2 === ~~mode2 ? mode2 : mode2 === true ? Z_FINISH$1 : Z_NO_FLUSH;
  if (typeof data === "string") {
    strm.input = strings$1.string2buf(data);
  } else if (toString$1.call(data) === "[object ArrayBuffer]") {
    strm.input = new Uint8Array(data);
  } else {
    strm.input = data;
  }
  strm.next_in = 0;
  strm.avail_in = strm.input.length;
  do {
    if (strm.avail_out === 0) {
      strm.output = new utils$h.Buf8(chunkSize);
      strm.next_out = 0;
      strm.avail_out = chunkSize;
    }
    status = zlib_deflate.deflate(strm, _mode2);
    if (status !== Z_STREAM_END$1 && status !== Z_OK$1) {
      this.onEnd(status);
      this.ended = true;
      return false;
    }
    if (strm.avail_out === 0 || strm.avail_in === 0 && (_mode2 === Z_FINISH$1 || _mode2 === Z_SYNC_FLUSH)) {
      if (this.options.to === "string") {
        this.onData(strings$1.buf2binstring(utils$h.shrinkBuf(strm.output, strm.next_out)));
      } else {
        this.onData(utils$h.shrinkBuf(strm.output, strm.next_out));
      }
    }
  } while ((strm.avail_in > 0 || strm.avail_out === 0) && status !== Z_STREAM_END$1);
  if (_mode2 === Z_FINISH$1) {
    status = zlib_deflate.deflateEnd(this.strm);
    this.onEnd(status);
    this.ended = true;
    return status === Z_OK$1;
  }
  if (_mode2 === Z_SYNC_FLUSH) {
    this.onEnd(Z_OK$1);
    strm.avail_out = 0;
    return true;
  }
  return true;
};
Deflate.prototype.onData = function(chunk) {
  this.chunks.push(chunk);
};
Deflate.prototype.onEnd = function(status) {
  if (status === Z_OK$1) {
    if (this.options.to === "string") {
      this.result = this.chunks.join("");
    } else {
      this.result = utils$h.flattenChunks(this.chunks);
    }
  }
  this.chunks = [];
  this.err = status;
  this.msg = this.strm.msg;
};
function deflate$1(input, options) {
  var deflator = new Deflate(options);
  deflator.push(input, true);
  if (deflator.err) {
    throw deflator.msg || msg$1[deflator.err];
  }
  return deflator.result;
}
function deflateRaw(input, options) {
  options = options || {};
  options.raw = true;
  return deflate$1(input, options);
}
function gzip(input, options) {
  options = options || {};
  options.gzip = true;
  return deflate$1(input, options);
}
deflate$4.Deflate = Deflate;
deflate$4.deflate = deflate$1;
deflate$4.deflateRaw = deflateRaw;
deflate$4.gzip = gzip;
var inflate$4 = {};
var inflate$3 = {};
var BAD$1 = 30;
var TYPE$1 = 12;
var inffast = function inflate_fast(strm, start) {
  var state;
  var _in;
  var last;
  var _out;
  var beg;
  var end;
  var dmax;
  var wsize;
  var whave;
  var wnext;
  var s_window;
  var hold;
  var bits;
  var lcode;
  var dcode;
  var lmask;
  var dmask;
  var here;
  var op;
  var len;
  var dist2;
  var from;
  var from_source;
  var input, output;
  state = strm.state;
  _in = strm.next_in;
  input = strm.input;
  last = _in + (strm.avail_in - 5);
  _out = strm.next_out;
  output = strm.output;
  beg = _out - (start - strm.avail_out);
  end = _out + (strm.avail_out - 257);
  dmax = state.dmax;
  wsize = state.wsize;
  whave = state.whave;
  wnext = state.wnext;
  s_window = state.window;
  hold = state.hold;
  bits = state.bits;
  lcode = state.lencode;
  dcode = state.distcode;
  lmask = (1 << state.lenbits) - 1;
  dmask = (1 << state.distbits) - 1;
  top:
    do {
      if (bits < 15) {
        hold += input[_in++] << bits;
        bits += 8;
        hold += input[_in++] << bits;
        bits += 8;
      }
      here = lcode[hold & lmask];
      dolen:
        for (; ; ) {
          op = here >>> 24;
          hold >>>= op;
          bits -= op;
          op = here >>> 16 & 255;
          if (op === 0) {
            output[_out++] = here & 65535;
          } else if (op & 16) {
            len = here & 65535;
            op &= 15;
            if (op) {
              if (bits < op) {
                hold += input[_in++] << bits;
                bits += 8;
              }
              len += hold & (1 << op) - 1;
              hold >>>= op;
              bits -= op;
            }
            if (bits < 15) {
              hold += input[_in++] << bits;
              bits += 8;
              hold += input[_in++] << bits;
              bits += 8;
            }
            here = dcode[hold & dmask];
            dodist:
              for (; ; ) {
                op = here >>> 24;
                hold >>>= op;
                bits -= op;
                op = here >>> 16 & 255;
                if (op & 16) {
                  dist2 = here & 65535;
                  op &= 15;
                  if (bits < op) {
                    hold += input[_in++] << bits;
                    bits += 8;
                    if (bits < op) {
                      hold += input[_in++] << bits;
                      bits += 8;
                    }
                  }
                  dist2 += hold & (1 << op) - 1;
                  if (dist2 > dmax) {
                    strm.msg = "invalid distance too far back";
                    state.mode = BAD$1;
                    break top;
                  }
                  hold >>>= op;
                  bits -= op;
                  op = _out - beg;
                  if (dist2 > op) {
                    op = dist2 - op;
                    if (op > whave) {
                      if (state.sane) {
                        strm.msg = "invalid distance too far back";
                        state.mode = BAD$1;
                        break top;
                      }
                    }
                    from = 0;
                    from_source = s_window;
                    if (wnext === 0) {
                      from += wsize - op;
                      if (op < len) {
                        len -= op;
                        do {
                          output[_out++] = s_window[from++];
                        } while (--op);
                        from = _out - dist2;
                        from_source = output;
                      }
                    } else if (wnext < op) {
                      from += wsize + wnext - op;
                      op -= wnext;
                      if (op < len) {
                        len -= op;
                        do {
                          output[_out++] = s_window[from++];
                        } while (--op);
                        from = 0;
                        if (wnext < len) {
                          op = wnext;
                          len -= op;
                          do {
                            output[_out++] = s_window[from++];
                          } while (--op);
                          from = _out - dist2;
                          from_source = output;
                        }
                      }
                    } else {
                      from += wnext - op;
                      if (op < len) {
                        len -= op;
                        do {
                          output[_out++] = s_window[from++];
                        } while (--op);
                        from = _out - dist2;
                        from_source = output;
                      }
                    }
                    while (len > 2) {
                      output[_out++] = from_source[from++];
                      output[_out++] = from_source[from++];
                      output[_out++] = from_source[from++];
                      len -= 3;
                    }
                    if (len) {
                      output[_out++] = from_source[from++];
                      if (len > 1) {
                        output[_out++] = from_source[from++];
                      }
                    }
                  } else {
                    from = _out - dist2;
                    do {
                      output[_out++] = output[from++];
                      output[_out++] = output[from++];
                      output[_out++] = output[from++];
                      len -= 3;
                    } while (len > 2);
                    if (len) {
                      output[_out++] = output[from++];
                      if (len > 1) {
                        output[_out++] = output[from++];
                      }
                    }
                  }
                } else if ((op & 64) === 0) {
                  here = dcode[(here & 65535) + (hold & (1 << op) - 1)];
                  continue dodist;
                } else {
                  strm.msg = "invalid distance code";
                  state.mode = BAD$1;
                  break top;
                }
                break;
              }
          } else if ((op & 64) === 0) {
            here = lcode[(here & 65535) + (hold & (1 << op) - 1)];
            continue dolen;
          } else if (op & 32) {
            state.mode = TYPE$1;
            break top;
          } else {
            strm.msg = "invalid literal/length code";
            state.mode = BAD$1;
            break top;
          }
          break;
        }
    } while (_in < last && _out < end);
  len = bits >> 3;
  _in -= len;
  bits -= len << 3;
  hold &= (1 << bits) - 1;
  strm.next_in = _in;
  strm.next_out = _out;
  strm.avail_in = _in < last ? 5 + (last - _in) : 5 - (_in - last);
  strm.avail_out = _out < end ? 257 + (end - _out) : 257 - (_out - end);
  state.hold = hold;
  state.bits = bits;
  return;
};
var utils$g = common;
var MAXBITS = 15;
var ENOUGH_LENS$1 = 852;
var ENOUGH_DISTS$1 = 592;
var CODES$1 = 0;
var LENS$1 = 1;
var DISTS$1 = 2;
var lbase = [
  /* Length codes 257..285 base */
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  13,
  15,
  17,
  19,
  23,
  27,
  31,
  35,
  43,
  51,
  59,
  67,
  83,
  99,
  115,
  131,
  163,
  195,
  227,
  258,
  0,
  0
];
var lext = [
  /* Length codes 257..285 extra */
  16,
  16,
  16,
  16,
  16,
  16,
  16,
  16,
  17,
  17,
  17,
  17,
  18,
  18,
  18,
  18,
  19,
  19,
  19,
  19,
  20,
  20,
  20,
  20,
  21,
  21,
  21,
  21,
  16,
  72,
  78
];
var dbase = [
  /* Distance codes 0..29 base */
  1,
  2,
  3,
  4,
  5,
  7,
  9,
  13,
  17,
  25,
  33,
  49,
  65,
  97,
  129,
  193,
  257,
  385,
  513,
  769,
  1025,
  1537,
  2049,
  3073,
  4097,
  6145,
  8193,
  12289,
  16385,
  24577,
  0,
  0
];
var dext = [
  /* Distance codes 0..29 extra */
  16,
  16,
  16,
  16,
  17,
  17,
  18,
  18,
  19,
  19,
  20,
  20,
  21,
  21,
  22,
  22,
  23,
  23,
  24,
  24,
  25,
  25,
  26,
  26,
  27,
  27,
  28,
  28,
  29,
  29,
  64,
  64
];
var inftrees = function inflate_table(type, lens, lens_index, codes, table, table_index, work, opts) {
  var bits = opts.bits;
  var len = 0;
  var sym = 0;
  var min = 0, max = 0;
  var root = 0;
  var curr = 0;
  var drop = 0;
  var left = 0;
  var used = 0;
  var huff = 0;
  var incr;
  var fill;
  var low;
  var mask;
  var next;
  var base = null;
  var base_index = 0;
  var end;
  var count = new utils$g.Buf16(MAXBITS + 1);
  var offs = new utils$g.Buf16(MAXBITS + 1);
  var extra = null;
  var extra_index = 0;
  var here_bits, here_op, here_val;
  for (len = 0; len <= MAXBITS; len++) {
    count[len] = 0;
  }
  for (sym = 0; sym < codes; sym++) {
    count[lens[lens_index + sym]]++;
  }
  root = bits;
  for (max = MAXBITS; max >= 1; max--) {
    if (count[max] !== 0) {
      break;
    }
  }
  if (root > max) {
    root = max;
  }
  if (max === 0) {
    table[table_index++] = 1 << 24 | 64 << 16 | 0;
    table[table_index++] = 1 << 24 | 64 << 16 | 0;
    opts.bits = 1;
    return 0;
  }
  for (min = 1; min < max; min++) {
    if (count[min] !== 0) {
      break;
    }
  }
  if (root < min) {
    root = min;
  }
  left = 1;
  for (len = 1; len <= MAXBITS; len++) {
    left <<= 1;
    left -= count[len];
    if (left < 0) {
      return -1;
    }
  }
  if (left > 0 && (type === CODES$1 || max !== 1)) {
    return -1;
  }
  offs[1] = 0;
  for (len = 1; len < MAXBITS; len++) {
    offs[len + 1] = offs[len] + count[len];
  }
  for (sym = 0; sym < codes; sym++) {
    if (lens[lens_index + sym] !== 0) {
      work[offs[lens[lens_index + sym]]++] = sym;
    }
  }
  if (type === CODES$1) {
    base = extra = work;
    end = 19;
  } else if (type === LENS$1) {
    base = lbase;
    base_index -= 257;
    extra = lext;
    extra_index -= 257;
    end = 256;
  } else {
    base = dbase;
    extra = dext;
    end = -1;
  }
  huff = 0;
  sym = 0;
  len = min;
  next = table_index;
  curr = root;
  drop = 0;
  low = -1;
  used = 1 << root;
  mask = used - 1;
  if (type === LENS$1 && used > ENOUGH_LENS$1 || type === DISTS$1 && used > ENOUGH_DISTS$1) {
    return 1;
  }
  for (; ; ) {
    here_bits = len - drop;
    if (work[sym] < end) {
      here_op = 0;
      here_val = work[sym];
    } else if (work[sym] > end) {
      here_op = extra[extra_index + work[sym]];
      here_val = base[base_index + work[sym]];
    } else {
      here_op = 32 + 64;
      here_val = 0;
    }
    incr = 1 << len - drop;
    fill = 1 << curr;
    min = fill;
    do {
      fill -= incr;
      table[next + (huff >> drop) + fill] = here_bits << 24 | here_op << 16 | here_val | 0;
    } while (fill !== 0);
    incr = 1 << len - 1;
    while (huff & incr) {
      incr >>= 1;
    }
    if (incr !== 0) {
      huff &= incr - 1;
      huff += incr;
    } else {
      huff = 0;
    }
    sym++;
    if (--count[len] === 0) {
      if (len === max) {
        break;
      }
      len = lens[lens_index + work[sym]];
    }
    if (len > root && (huff & mask) !== low) {
      if (drop === 0) {
        drop = root;
      }
      next += min;
      curr = len - drop;
      left = 1 << curr;
      while (curr + drop < max) {
        left -= count[curr + drop];
        if (left <= 0) {
          break;
        }
        curr++;
        left <<= 1;
      }
      used += 1 << curr;
      if (type === LENS$1 && used > ENOUGH_LENS$1 || type === DISTS$1 && used > ENOUGH_DISTS$1) {
        return 1;
      }
      low = huff & mask;
      table[low] = root << 24 | curr << 16 | next - table_index | 0;
    }
  }
  if (huff !== 0) {
    table[next + huff] = len - drop << 24 | 64 << 16 | 0;
  }
  opts.bits = root;
  return 0;
};
var utils$f = common;
var adler32 = adler32_1;
var crc32$1 = crc32_1;
var inflate_fast2 = inffast;
var inflate_table2 = inftrees;
var CODES = 0;
var LENS = 1;
var DISTS = 2;
var Z_FINISH = 4;
var Z_BLOCK = 5;
var Z_TREES = 6;
var Z_OK = 0;
var Z_STREAM_END = 1;
var Z_NEED_DICT = 2;
var Z_STREAM_ERROR = -2;
var Z_DATA_ERROR = -3;
var Z_MEM_ERROR = -4;
var Z_BUF_ERROR = -5;
var Z_DEFLATED = 8;
var HEAD = 1;
var FLAGS = 2;
var TIME = 3;
var OS = 4;
var EXLEN = 5;
var EXTRA = 6;
var NAME = 7;
var COMMENT = 8;
var HCRC = 9;
var DICTID = 10;
var DICT = 11;
var TYPE = 12;
var TYPEDO = 13;
var STORED = 14;
var COPY_ = 15;
var COPY = 16;
var TABLE = 17;
var LENLENS = 18;
var CODELENS = 19;
var LEN_ = 20;
var LEN = 21;
var LENEXT = 22;
var DIST = 23;
var DISTEXT = 24;
var MATCH = 25;
var LIT = 26;
var CHECK = 27;
var LENGTH = 28;
var DONE = 29;
var BAD = 30;
var MEM = 31;
var SYNC = 32;
var ENOUGH_LENS = 852;
var ENOUGH_DISTS = 592;
var MAX_WBITS = 15;
var DEF_WBITS = MAX_WBITS;
function zswap32(q) {
  return (q >>> 24 & 255) + (q >>> 8 & 65280) + ((q & 65280) << 8) + ((q & 255) << 24);
}
function InflateState() {
  this.mode = 0;
  this.last = false;
  this.wrap = 0;
  this.havedict = false;
  this.flags = 0;
  this.dmax = 0;
  this.check = 0;
  this.total = 0;
  this.head = null;
  this.wbits = 0;
  this.wsize = 0;
  this.whave = 0;
  this.wnext = 0;
  this.window = null;
  this.hold = 0;
  this.bits = 0;
  this.length = 0;
  this.offset = 0;
  this.extra = 0;
  this.lencode = null;
  this.distcode = null;
  this.lenbits = 0;
  this.distbits = 0;
  this.ncode = 0;
  this.nlen = 0;
  this.ndist = 0;
  this.have = 0;
  this.next = null;
  this.lens = new utils$f.Buf16(320);
  this.work = new utils$f.Buf16(288);
  this.lendyn = null;
  this.distdyn = null;
  this.sane = 0;
  this.back = 0;
  this.was = 0;
}
function inflateResetKeep(strm) {
  var state;
  if (!strm || !strm.state) {
    return Z_STREAM_ERROR;
  }
  state = strm.state;
  strm.total_in = strm.total_out = state.total = 0;
  strm.msg = "";
  if (state.wrap) {
    strm.adler = state.wrap & 1;
  }
  state.mode = HEAD;
  state.last = 0;
  state.havedict = 0;
  state.dmax = 32768;
  state.head = null;
  state.hold = 0;
  state.bits = 0;
  state.lencode = state.lendyn = new utils$f.Buf32(ENOUGH_LENS);
  state.distcode = state.distdyn = new utils$f.Buf32(ENOUGH_DISTS);
  state.sane = 1;
  state.back = -1;
  return Z_OK;
}
function inflateReset(strm) {
  var state;
  if (!strm || !strm.state) {
    return Z_STREAM_ERROR;
  }
  state = strm.state;
  state.wsize = 0;
  state.whave = 0;
  state.wnext = 0;
  return inflateResetKeep(strm);
}
function inflateReset2(strm, windowBits) {
  var wrap;
  var state;
  if (!strm || !strm.state) {
    return Z_STREAM_ERROR;
  }
  state = strm.state;
  if (windowBits < 0) {
    wrap = 0;
    windowBits = -windowBits;
  } else {
    wrap = (windowBits >> 4) + 1;
    if (windowBits < 48) {
      windowBits &= 15;
    }
  }
  if (windowBits && (windowBits < 8 || windowBits > 15)) {
    return Z_STREAM_ERROR;
  }
  if (state.window !== null && state.wbits !== windowBits) {
    state.window = null;
  }
  state.wrap = wrap;
  state.wbits = windowBits;
  return inflateReset(strm);
}
function inflateInit2(strm, windowBits) {
  var ret;
  var state;
  if (!strm) {
    return Z_STREAM_ERROR;
  }
  state = new InflateState();
  strm.state = state;
  state.window = null;
  ret = inflateReset2(strm, windowBits);
  if (ret !== Z_OK) {
    strm.state = null;
  }
  return ret;
}
function inflateInit(strm) {
  return inflateInit2(strm, DEF_WBITS);
}
var virgin = true;
var lenfix, distfix;
function fixedtables(state) {
  if (virgin) {
    var sym;
    lenfix = new utils$f.Buf32(512);
    distfix = new utils$f.Buf32(32);
    sym = 0;
    while (sym < 144) {
      state.lens[sym++] = 8;
    }
    while (sym < 256) {
      state.lens[sym++] = 9;
    }
    while (sym < 280) {
      state.lens[sym++] = 7;
    }
    while (sym < 288) {
      state.lens[sym++] = 8;
    }
    inflate_table2(LENS, state.lens, 0, 288, lenfix, 0, state.work, { bits: 9 });
    sym = 0;
    while (sym < 32) {
      state.lens[sym++] = 5;
    }
    inflate_table2(DISTS, state.lens, 0, 32, distfix, 0, state.work, { bits: 5 });
    virgin = false;
  }
  state.lencode = lenfix;
  state.lenbits = 9;
  state.distcode = distfix;
  state.distbits = 5;
}
function updatewindow(strm, src, end, copy2) {
  var dist2;
  var state = strm.state;
  if (state.window === null) {
    state.wsize = 1 << state.wbits;
    state.wnext = 0;
    state.whave = 0;
    state.window = new utils$f.Buf8(state.wsize);
  }
  if (copy2 >= state.wsize) {
    utils$f.arraySet(state.window, src, end - state.wsize, state.wsize, 0);
    state.wnext = 0;
    state.whave = state.wsize;
  } else {
    dist2 = state.wsize - state.wnext;
    if (dist2 > copy2) {
      dist2 = copy2;
    }
    utils$f.arraySet(state.window, src, end - copy2, dist2, state.wnext);
    copy2 -= dist2;
    if (copy2) {
      utils$f.arraySet(state.window, src, end - copy2, copy2, 0);
      state.wnext = copy2;
      state.whave = state.wsize;
    } else {
      state.wnext += dist2;
      if (state.wnext === state.wsize) {
        state.wnext = 0;
      }
      if (state.whave < state.wsize) {
        state.whave += dist2;
      }
    }
  }
  return 0;
}
function inflate$2(strm, flush) {
  var state;
  var input, output;
  var next;
  var put;
  var have, left;
  var hold;
  var bits;
  var _in, _out;
  var copy2;
  var from;
  var from_source;
  var here = 0;
  var here_bits, here_op, here_val;
  var last_bits, last_op, last_val;
  var len;
  var ret;
  var hbuf = new utils$f.Buf8(4);
  var opts;
  var n;
  var order = (
    /* permutation of code lengths */
    [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]
  );
  if (!strm || !strm.state || !strm.output || !strm.input && strm.avail_in !== 0) {
    return Z_STREAM_ERROR;
  }
  state = strm.state;
  if (state.mode === TYPE) {
    state.mode = TYPEDO;
  }
  put = strm.next_out;
  output = strm.output;
  left = strm.avail_out;
  next = strm.next_in;
  input = strm.input;
  have = strm.avail_in;
  hold = state.hold;
  bits = state.bits;
  _in = have;
  _out = left;
  ret = Z_OK;
  inf_leave:
    for (; ; ) {
      switch (state.mode) {
        case HEAD:
          if (state.wrap === 0) {
            state.mode = TYPEDO;
            break;
          }
          while (bits < 16) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          if (state.wrap & 2 && hold === 35615) {
            state.check = 0;
            hbuf[0] = hold & 255;
            hbuf[1] = hold >>> 8 & 255;
            state.check = crc32$1(state.check, hbuf, 2, 0);
            hold = 0;
            bits = 0;
            state.mode = FLAGS;
            break;
          }
          state.flags = 0;
          if (state.head) {
            state.head.done = false;
          }
          if (!(state.wrap & 1) || /* check if zlib header allowed */
          (((hold & 255) << 8) + (hold >> 8)) % 31) {
            strm.msg = "incorrect header check";
            state.mode = BAD;
            break;
          }
          if ((hold & 15) !== Z_DEFLATED) {
            strm.msg = "unknown compression method";
            state.mode = BAD;
            break;
          }
          hold >>>= 4;
          bits -= 4;
          len = (hold & 15) + 8;
          if (state.wbits === 0) {
            state.wbits = len;
          } else if (len > state.wbits) {
            strm.msg = "invalid window size";
            state.mode = BAD;
            break;
          }
          state.dmax = 1 << len;
          strm.adler = state.check = 1;
          state.mode = hold & 512 ? DICTID : TYPE;
          hold = 0;
          bits = 0;
          break;
        case FLAGS:
          while (bits < 16) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          state.flags = hold;
          if ((state.flags & 255) !== Z_DEFLATED) {
            strm.msg = "unknown compression method";
            state.mode = BAD;
            break;
          }
          if (state.flags & 57344) {
            strm.msg = "unknown header flags set";
            state.mode = BAD;
            break;
          }
          if (state.head) {
            state.head.text = hold >> 8 & 1;
          }
          if (state.flags & 512) {
            hbuf[0] = hold & 255;
            hbuf[1] = hold >>> 8 & 255;
            state.check = crc32$1(state.check, hbuf, 2, 0);
          }
          hold = 0;
          bits = 0;
          state.mode = TIME;
        case TIME:
          while (bits < 32) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          if (state.head) {
            state.head.time = hold;
          }
          if (state.flags & 512) {
            hbuf[0] = hold & 255;
            hbuf[1] = hold >>> 8 & 255;
            hbuf[2] = hold >>> 16 & 255;
            hbuf[3] = hold >>> 24 & 255;
            state.check = crc32$1(state.check, hbuf, 4, 0);
          }
          hold = 0;
          bits = 0;
          state.mode = OS;
        case OS:
          while (bits < 16) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          if (state.head) {
            state.head.xflags = hold & 255;
            state.head.os = hold >> 8;
          }
          if (state.flags & 512) {
            hbuf[0] = hold & 255;
            hbuf[1] = hold >>> 8 & 255;
            state.check = crc32$1(state.check, hbuf, 2, 0);
          }
          hold = 0;
          bits = 0;
          state.mode = EXLEN;
        case EXLEN:
          if (state.flags & 1024) {
            while (bits < 16) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            state.length = hold;
            if (state.head) {
              state.head.extra_len = hold;
            }
            if (state.flags & 512) {
              hbuf[0] = hold & 255;
              hbuf[1] = hold >>> 8 & 255;
              state.check = crc32$1(state.check, hbuf, 2, 0);
            }
            hold = 0;
            bits = 0;
          } else if (state.head) {
            state.head.extra = null;
          }
          state.mode = EXTRA;
        case EXTRA:
          if (state.flags & 1024) {
            copy2 = state.length;
            if (copy2 > have) {
              copy2 = have;
            }
            if (copy2) {
              if (state.head) {
                len = state.head.extra_len - state.length;
                if (!state.head.extra) {
                  state.head.extra = new Array(state.head.extra_len);
                }
                utils$f.arraySet(
                  state.head.extra,
                  input,
                  next,
                  // extra field is limited to 65536 bytes
                  // - no need for additional size check
                  copy2,
                  /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
                  len
                );
              }
              if (state.flags & 512) {
                state.check = crc32$1(state.check, input, copy2, next);
              }
              have -= copy2;
              next += copy2;
              state.length -= copy2;
            }
            if (state.length) {
              break inf_leave;
            }
          }
          state.length = 0;
          state.mode = NAME;
        case NAME:
          if (state.flags & 2048) {
            if (have === 0) {
              break inf_leave;
            }
            copy2 = 0;
            do {
              len = input[next + copy2++];
              if (state.head && len && state.length < 65536) {
                state.head.name += String.fromCharCode(len);
              }
            } while (len && copy2 < have);
            if (state.flags & 512) {
              state.check = crc32$1(state.check, input, copy2, next);
            }
            have -= copy2;
            next += copy2;
            if (len) {
              break inf_leave;
            }
          } else if (state.head) {
            state.head.name = null;
          }
          state.length = 0;
          state.mode = COMMENT;
        case COMMENT:
          if (state.flags & 4096) {
            if (have === 0) {
              break inf_leave;
            }
            copy2 = 0;
            do {
              len = input[next + copy2++];
              if (state.head && len && state.length < 65536) {
                state.head.comment += String.fromCharCode(len);
              }
            } while (len && copy2 < have);
            if (state.flags & 512) {
              state.check = crc32$1(state.check, input, copy2, next);
            }
            have -= copy2;
            next += copy2;
            if (len) {
              break inf_leave;
            }
          } else if (state.head) {
            state.head.comment = null;
          }
          state.mode = HCRC;
        case HCRC:
          if (state.flags & 512) {
            while (bits < 16) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            if (hold !== (state.check & 65535)) {
              strm.msg = "header crc mismatch";
              state.mode = BAD;
              break;
            }
            hold = 0;
            bits = 0;
          }
          if (state.head) {
            state.head.hcrc = state.flags >> 9 & 1;
            state.head.done = true;
          }
          strm.adler = state.check = 0;
          state.mode = TYPE;
          break;
        case DICTID:
          while (bits < 32) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          strm.adler = state.check = zswap32(hold);
          hold = 0;
          bits = 0;
          state.mode = DICT;
        case DICT:
          if (state.havedict === 0) {
            strm.next_out = put;
            strm.avail_out = left;
            strm.next_in = next;
            strm.avail_in = have;
            state.hold = hold;
            state.bits = bits;
            return Z_NEED_DICT;
          }
          strm.adler = state.check = 1;
          state.mode = TYPE;
        case TYPE:
          if (flush === Z_BLOCK || flush === Z_TREES) {
            break inf_leave;
          }
        case TYPEDO:
          if (state.last) {
            hold >>>= bits & 7;
            bits -= bits & 7;
            state.mode = CHECK;
            break;
          }
          while (bits < 3) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          state.last = hold & 1;
          hold >>>= 1;
          bits -= 1;
          switch (hold & 3) {
            case 0:
              state.mode = STORED;
              break;
            case 1:
              fixedtables(state);
              state.mode = LEN_;
              if (flush === Z_TREES) {
                hold >>>= 2;
                bits -= 2;
                break inf_leave;
              }
              break;
            case 2:
              state.mode = TABLE;
              break;
            case 3:
              strm.msg = "invalid block type";
              state.mode = BAD;
          }
          hold >>>= 2;
          bits -= 2;
          break;
        case STORED:
          hold >>>= bits & 7;
          bits -= bits & 7;
          while (bits < 32) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          if ((hold & 65535) !== (hold >>> 16 ^ 65535)) {
            strm.msg = "invalid stored block lengths";
            state.mode = BAD;
            break;
          }
          state.length = hold & 65535;
          hold = 0;
          bits = 0;
          state.mode = COPY_;
          if (flush === Z_TREES) {
            break inf_leave;
          }
        case COPY_:
          state.mode = COPY;
        case COPY:
          copy2 = state.length;
          if (copy2) {
            if (copy2 > have) {
              copy2 = have;
            }
            if (copy2 > left) {
              copy2 = left;
            }
            if (copy2 === 0) {
              break inf_leave;
            }
            utils$f.arraySet(output, input, next, copy2, put);
            have -= copy2;
            next += copy2;
            left -= copy2;
            put += copy2;
            state.length -= copy2;
            break;
          }
          state.mode = TYPE;
          break;
        case TABLE:
          while (bits < 14) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          state.nlen = (hold & 31) + 257;
          hold >>>= 5;
          bits -= 5;
          state.ndist = (hold & 31) + 1;
          hold >>>= 5;
          bits -= 5;
          state.ncode = (hold & 15) + 4;
          hold >>>= 4;
          bits -= 4;
          if (state.nlen > 286 || state.ndist > 30) {
            strm.msg = "too many length or distance symbols";
            state.mode = BAD;
            break;
          }
          state.have = 0;
          state.mode = LENLENS;
        case LENLENS:
          while (state.have < state.ncode) {
            while (bits < 3) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            state.lens[order[state.have++]] = hold & 7;
            hold >>>= 3;
            bits -= 3;
          }
          while (state.have < 19) {
            state.lens[order[state.have++]] = 0;
          }
          state.lencode = state.lendyn;
          state.lenbits = 7;
          opts = { bits: state.lenbits };
          ret = inflate_table2(CODES, state.lens, 0, 19, state.lencode, 0, state.work, opts);
          state.lenbits = opts.bits;
          if (ret) {
            strm.msg = "invalid code lengths set";
            state.mode = BAD;
            break;
          }
          state.have = 0;
          state.mode = CODELENS;
        case CODELENS:
          while (state.have < state.nlen + state.ndist) {
            for (; ; ) {
              here = state.lencode[hold & (1 << state.lenbits) - 1];
              here_bits = here >>> 24;
              here_op = here >>> 16 & 255;
              here_val = here & 65535;
              if (here_bits <= bits) {
                break;
              }
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            if (here_val < 16) {
              hold >>>= here_bits;
              bits -= here_bits;
              state.lens[state.have++] = here_val;
            } else {
              if (here_val === 16) {
                n = here_bits + 2;
                while (bits < n) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                hold >>>= here_bits;
                bits -= here_bits;
                if (state.have === 0) {
                  strm.msg = "invalid bit length repeat";
                  state.mode = BAD;
                  break;
                }
                len = state.lens[state.have - 1];
                copy2 = 3 + (hold & 3);
                hold >>>= 2;
                bits -= 2;
              } else if (here_val === 17) {
                n = here_bits + 3;
                while (bits < n) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                hold >>>= here_bits;
                bits -= here_bits;
                len = 0;
                copy2 = 3 + (hold & 7);
                hold >>>= 3;
                bits -= 3;
              } else {
                n = here_bits + 7;
                while (bits < n) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                hold >>>= here_bits;
                bits -= here_bits;
                len = 0;
                copy2 = 11 + (hold & 127);
                hold >>>= 7;
                bits -= 7;
              }
              if (state.have + copy2 > state.nlen + state.ndist) {
                strm.msg = "invalid bit length repeat";
                state.mode = BAD;
                break;
              }
              while (copy2--) {
                state.lens[state.have++] = len;
              }
            }
          }
          if (state.mode === BAD) {
            break;
          }
          if (state.lens[256] === 0) {
            strm.msg = "invalid code -- missing end-of-block";
            state.mode = BAD;
            break;
          }
          state.lenbits = 9;
          opts = { bits: state.lenbits };
          ret = inflate_table2(LENS, state.lens, 0, state.nlen, state.lencode, 0, state.work, opts);
          state.lenbits = opts.bits;
          if (ret) {
            strm.msg = "invalid literal/lengths set";
            state.mode = BAD;
            break;
          }
          state.distbits = 6;
          state.distcode = state.distdyn;
          opts = { bits: state.distbits };
          ret = inflate_table2(DISTS, state.lens, state.nlen, state.ndist, state.distcode, 0, state.work, opts);
          state.distbits = opts.bits;
          if (ret) {
            strm.msg = "invalid distances set";
            state.mode = BAD;
            break;
          }
          state.mode = LEN_;
          if (flush === Z_TREES) {
            break inf_leave;
          }
        case LEN_:
          state.mode = LEN;
        case LEN:
          if (have >= 6 && left >= 258) {
            strm.next_out = put;
            strm.avail_out = left;
            strm.next_in = next;
            strm.avail_in = have;
            state.hold = hold;
            state.bits = bits;
            inflate_fast2(strm, _out);
            put = strm.next_out;
            output = strm.output;
            left = strm.avail_out;
            next = strm.next_in;
            input = strm.input;
            have = strm.avail_in;
            hold = state.hold;
            bits = state.bits;
            if (state.mode === TYPE) {
              state.back = -1;
            }
            break;
          }
          state.back = 0;
          for (; ; ) {
            here = state.lencode[hold & (1 << state.lenbits) - 1];
            here_bits = here >>> 24;
            here_op = here >>> 16 & 255;
            here_val = here & 65535;
            if (here_bits <= bits) {
              break;
            }
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          if (here_op && (here_op & 240) === 0) {
            last_bits = here_bits;
            last_op = here_op;
            last_val = here_val;
            for (; ; ) {
              here = state.lencode[last_val + ((hold & (1 << last_bits + last_op) - 1) >> last_bits)];
              here_bits = here >>> 24;
              here_op = here >>> 16 & 255;
              here_val = here & 65535;
              if (last_bits + here_bits <= bits) {
                break;
              }
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            hold >>>= last_bits;
            bits -= last_bits;
            state.back += last_bits;
          }
          hold >>>= here_bits;
          bits -= here_bits;
          state.back += here_bits;
          state.length = here_val;
          if (here_op === 0) {
            state.mode = LIT;
            break;
          }
          if (here_op & 32) {
            state.back = -1;
            state.mode = TYPE;
            break;
          }
          if (here_op & 64) {
            strm.msg = "invalid literal/length code";
            state.mode = BAD;
            break;
          }
          state.extra = here_op & 15;
          state.mode = LENEXT;
        case LENEXT:
          if (state.extra) {
            n = state.extra;
            while (bits < n) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            state.length += hold & (1 << state.extra) - 1;
            hold >>>= state.extra;
            bits -= state.extra;
            state.back += state.extra;
          }
          state.was = state.length;
          state.mode = DIST;
        case DIST:
          for (; ; ) {
            here = state.distcode[hold & (1 << state.distbits) - 1];
            here_bits = here >>> 24;
            here_op = here >>> 16 & 255;
            here_val = here & 65535;
            if (here_bits <= bits) {
              break;
            }
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          if ((here_op & 240) === 0) {
            last_bits = here_bits;
            last_op = here_op;
            last_val = here_val;
            for (; ; ) {
              here = state.distcode[last_val + ((hold & (1 << last_bits + last_op) - 1) >> last_bits)];
              here_bits = here >>> 24;
              here_op = here >>> 16 & 255;
              here_val = here & 65535;
              if (last_bits + here_bits <= bits) {
                break;
              }
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            hold >>>= last_bits;
            bits -= last_bits;
            state.back += last_bits;
          }
          hold >>>= here_bits;
          bits -= here_bits;
          state.back += here_bits;
          if (here_op & 64) {
            strm.msg = "invalid distance code";
            state.mode = BAD;
            break;
          }
          state.offset = here_val;
          state.extra = here_op & 15;
          state.mode = DISTEXT;
        case DISTEXT:
          if (state.extra) {
            n = state.extra;
            while (bits < n) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            state.offset += hold & (1 << state.extra) - 1;
            hold >>>= state.extra;
            bits -= state.extra;
            state.back += state.extra;
          }
          if (state.offset > state.dmax) {
            strm.msg = "invalid distance too far back";
            state.mode = BAD;
            break;
          }
          state.mode = MATCH;
        case MATCH:
          if (left === 0) {
            break inf_leave;
          }
          copy2 = _out - left;
          if (state.offset > copy2) {
            copy2 = state.offset - copy2;
            if (copy2 > state.whave) {
              if (state.sane) {
                strm.msg = "invalid distance too far back";
                state.mode = BAD;
                break;
              }
            }
            if (copy2 > state.wnext) {
              copy2 -= state.wnext;
              from = state.wsize - copy2;
            } else {
              from = state.wnext - copy2;
            }
            if (copy2 > state.length) {
              copy2 = state.length;
            }
            from_source = state.window;
          } else {
            from_source = output;
            from = put - state.offset;
            copy2 = state.length;
          }
          if (copy2 > left) {
            copy2 = left;
          }
          left -= copy2;
          state.length -= copy2;
          do {
            output[put++] = from_source[from++];
          } while (--copy2);
          if (state.length === 0) {
            state.mode = LEN;
          }
          break;
        case LIT:
          if (left === 0) {
            break inf_leave;
          }
          output[put++] = state.length;
          left--;
          state.mode = LEN;
          break;
        case CHECK:
          if (state.wrap) {
            while (bits < 32) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold |= input[next++] << bits;
              bits += 8;
            }
            _out -= left;
            strm.total_out += _out;
            state.total += _out;
            if (_out) {
              strm.adler = state.check = /*UPDATE(state.check, put - _out, _out);*/
              state.flags ? crc32$1(state.check, output, _out, put - _out) : adler32(state.check, output, _out, put - _out);
            }
            _out = left;
            if ((state.flags ? hold : zswap32(hold)) !== state.check) {
              strm.msg = "incorrect data check";
              state.mode = BAD;
              break;
            }
            hold = 0;
            bits = 0;
          }
          state.mode = LENGTH;
        case LENGTH:
          if (state.wrap && state.flags) {
            while (bits < 32) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            if (hold !== (state.total & 4294967295)) {
              strm.msg = "incorrect length check";
              state.mode = BAD;
              break;
            }
            hold = 0;
            bits = 0;
          }
          state.mode = DONE;
        case DONE:
          ret = Z_STREAM_END;
          break inf_leave;
        case BAD:
          ret = Z_DATA_ERROR;
          break inf_leave;
        case MEM:
          return Z_MEM_ERROR;
        case SYNC:
        default:
          return Z_STREAM_ERROR;
      }
    }
  strm.next_out = put;
  strm.avail_out = left;
  strm.next_in = next;
  strm.avail_in = have;
  state.hold = hold;
  state.bits = bits;
  if (state.wsize || _out !== strm.avail_out && state.mode < BAD && (state.mode < CHECK || flush !== Z_FINISH)) {
    if (updatewindow(strm, strm.output, strm.next_out, _out - strm.avail_out))
      ;
  }
  _in -= strm.avail_in;
  _out -= strm.avail_out;
  strm.total_in += _in;
  strm.total_out += _out;
  state.total += _out;
  if (state.wrap && _out) {
    strm.adler = state.check = /*UPDATE(state.check, strm.next_out - _out, _out);*/
    state.flags ? crc32$1(state.check, output, _out, strm.next_out - _out) : adler32(state.check, output, _out, strm.next_out - _out);
  }
  strm.data_type = state.bits + (state.last ? 64 : 0) + (state.mode === TYPE ? 128 : 0) + (state.mode === LEN_ || state.mode === COPY_ ? 256 : 0);
  if ((_in === 0 && _out === 0 || flush === Z_FINISH) && ret === Z_OK) {
    ret = Z_BUF_ERROR;
  }
  return ret;
}
function inflateEnd(strm) {
  if (!strm || !strm.state) {
    return Z_STREAM_ERROR;
  }
  var state = strm.state;
  if (state.window) {
    state.window = null;
  }
  strm.state = null;
  return Z_OK;
}
function inflateGetHeader(strm, head) {
  var state;
  if (!strm || !strm.state) {
    return Z_STREAM_ERROR;
  }
  state = strm.state;
  if ((state.wrap & 2) === 0) {
    return Z_STREAM_ERROR;
  }
  state.head = head;
  head.done = false;
  return Z_OK;
}
function inflateSetDictionary(strm, dictionary) {
  var dictLength = dictionary.length;
  var state;
  var dictid;
  var ret;
  if (!strm || !strm.state) {
    return Z_STREAM_ERROR;
  }
  state = strm.state;
  if (state.wrap !== 0 && state.mode !== DICT) {
    return Z_STREAM_ERROR;
  }
  if (state.mode === DICT) {
    dictid = 1;
    dictid = adler32(dictid, dictionary, dictLength, 0);
    if (dictid !== state.check) {
      return Z_DATA_ERROR;
    }
  }
  ret = updatewindow(strm, dictionary, dictLength, dictLength);
  if (ret) {
    state.mode = MEM;
    return Z_MEM_ERROR;
  }
  state.havedict = 1;
  return Z_OK;
}
inflate$3.inflateReset = inflateReset;
inflate$3.inflateReset2 = inflateReset2;
inflate$3.inflateResetKeep = inflateResetKeep;
inflate$3.inflateInit = inflateInit;
inflate$3.inflateInit2 = inflateInit2;
inflate$3.inflate = inflate$2;
inflate$3.inflateEnd = inflateEnd;
inflate$3.inflateGetHeader = inflateGetHeader;
inflate$3.inflateSetDictionary = inflateSetDictionary;
inflate$3.inflateInfo = "pako inflate (from Nodeca project)";
var constants$1 = {
  /* Allowed flush values; see deflate() and inflate() below for details */
  Z_NO_FLUSH: 0,
  Z_PARTIAL_FLUSH: 1,
  Z_SYNC_FLUSH: 2,
  Z_FULL_FLUSH: 3,
  Z_FINISH: 4,
  Z_BLOCK: 5,
  Z_TREES: 6,
  /* Return codes for the compression/decompression functions. Negative values
  * are errors, positive values are used for special but normal events.
  */
  Z_OK: 0,
  Z_STREAM_END: 1,
  Z_NEED_DICT: 2,
  Z_ERRNO: -1,
  Z_STREAM_ERROR: -2,
  Z_DATA_ERROR: -3,
  //Z_MEM_ERROR:     -4,
  Z_BUF_ERROR: -5,
  //Z_VERSION_ERROR: -6,
  /* compression levels */
  Z_NO_COMPRESSION: 0,
  Z_BEST_SPEED: 1,
  Z_BEST_COMPRESSION: 9,
  Z_DEFAULT_COMPRESSION: -1,
  Z_FILTERED: 1,
  Z_HUFFMAN_ONLY: 2,
  Z_RLE: 3,
  Z_FIXED: 4,
  Z_DEFAULT_STRATEGY: 0,
  /* Possible values of the data_type field (though see inflate()) */
  Z_BINARY: 0,
  Z_TEXT: 1,
  //Z_ASCII:                1, // = Z_TEXT (deprecated)
  Z_UNKNOWN: 2,
  /* The deflate compression method */
  Z_DEFLATED: 8
  //Z_NULL:                 null // Use -1 or null inline, depending on var type
};
function GZheader$1() {
  this.text = 0;
  this.time = 0;
  this.xflags = 0;
  this.os = 0;
  this.extra = null;
  this.extra_len = 0;
  this.name = "";
  this.comment = "";
  this.hcrc = 0;
  this.done = false;
}
var gzheader = GZheader$1;
var zlib_inflate = inflate$3;
var utils$e = common;
var strings = strings$2;
var c = constants$1;
var msg = messages;
var ZStream = zstream;
var GZheader = gzheader;
var toString = Object.prototype.toString;
function Inflate(options) {
  if (!(this instanceof Inflate))
    return new Inflate(options);
  this.options = utils$e.assign({
    chunkSize: 16384,
    windowBits: 0,
    to: ""
  }, options || {});
  var opt = this.options;
  if (opt.raw && opt.windowBits >= 0 && opt.windowBits < 16) {
    opt.windowBits = -opt.windowBits;
    if (opt.windowBits === 0) {
      opt.windowBits = -15;
    }
  }
  if (opt.windowBits >= 0 && opt.windowBits < 16 && !(options && options.windowBits)) {
    opt.windowBits += 32;
  }
  if (opt.windowBits > 15 && opt.windowBits < 48) {
    if ((opt.windowBits & 15) === 0) {
      opt.windowBits |= 15;
    }
  }
  this.err = 0;
  this.msg = "";
  this.ended = false;
  this.chunks = [];
  this.strm = new ZStream();
  this.strm.avail_out = 0;
  var status = zlib_inflate.inflateInit2(
    this.strm,
    opt.windowBits
  );
  if (status !== c.Z_OK) {
    throw new Error(msg[status]);
  }
  this.header = new GZheader();
  zlib_inflate.inflateGetHeader(this.strm, this.header);
  if (opt.dictionary) {
    if (typeof opt.dictionary === "string") {
      opt.dictionary = strings.string2buf(opt.dictionary);
    } else if (toString.call(opt.dictionary) === "[object ArrayBuffer]") {
      opt.dictionary = new Uint8Array(opt.dictionary);
    }
    if (opt.raw) {
      status = zlib_inflate.inflateSetDictionary(this.strm, opt.dictionary);
      if (status !== c.Z_OK) {
        throw new Error(msg[status]);
      }
    }
  }
}
Inflate.prototype.push = function(data, mode2) {
  var strm = this.strm;
  var chunkSize = this.options.chunkSize;
  var dictionary = this.options.dictionary;
  var status, _mode2;
  var next_out_utf8, tail, utf8str;
  var allowBufError = false;
  if (this.ended) {
    return false;
  }
  _mode2 = mode2 === ~~mode2 ? mode2 : mode2 === true ? c.Z_FINISH : c.Z_NO_FLUSH;
  if (typeof data === "string") {
    strm.input = strings.binstring2buf(data);
  } else if (toString.call(data) === "[object ArrayBuffer]") {
    strm.input = new Uint8Array(data);
  } else {
    strm.input = data;
  }
  strm.next_in = 0;
  strm.avail_in = strm.input.length;
  do {
    if (strm.avail_out === 0) {
      strm.output = new utils$e.Buf8(chunkSize);
      strm.next_out = 0;
      strm.avail_out = chunkSize;
    }
    status = zlib_inflate.inflate(strm, c.Z_NO_FLUSH);
    if (status === c.Z_NEED_DICT && dictionary) {
      status = zlib_inflate.inflateSetDictionary(this.strm, dictionary);
    }
    if (status === c.Z_BUF_ERROR && allowBufError === true) {
      status = c.Z_OK;
      allowBufError = false;
    }
    if (status !== c.Z_STREAM_END && status !== c.Z_OK) {
      this.onEnd(status);
      this.ended = true;
      return false;
    }
    if (strm.next_out) {
      if (strm.avail_out === 0 || status === c.Z_STREAM_END || strm.avail_in === 0 && (_mode2 === c.Z_FINISH || _mode2 === c.Z_SYNC_FLUSH)) {
        if (this.options.to === "string") {
          next_out_utf8 = strings.utf8border(strm.output, strm.next_out);
          tail = strm.next_out - next_out_utf8;
          utf8str = strings.buf2string(strm.output, next_out_utf8);
          strm.next_out = tail;
          strm.avail_out = chunkSize - tail;
          if (tail) {
            utils$e.arraySet(strm.output, strm.output, next_out_utf8, tail, 0);
          }
          this.onData(utf8str);
        } else {
          this.onData(utils$e.shrinkBuf(strm.output, strm.next_out));
        }
      }
    }
    if (strm.avail_in === 0 && strm.avail_out === 0) {
      allowBufError = true;
    }
  } while ((strm.avail_in > 0 || strm.avail_out === 0) && status !== c.Z_STREAM_END);
  if (status === c.Z_STREAM_END) {
    _mode2 = c.Z_FINISH;
  }
  if (_mode2 === c.Z_FINISH) {
    status = zlib_inflate.inflateEnd(this.strm);
    this.onEnd(status);
    this.ended = true;
    return status === c.Z_OK;
  }
  if (_mode2 === c.Z_SYNC_FLUSH) {
    this.onEnd(c.Z_OK);
    strm.avail_out = 0;
    return true;
  }
  return true;
};
Inflate.prototype.onData = function(chunk) {
  this.chunks.push(chunk);
};
Inflate.prototype.onEnd = function(status) {
  if (status === c.Z_OK) {
    if (this.options.to === "string") {
      this.result = this.chunks.join("");
    } else {
      this.result = utils$e.flattenChunks(this.chunks);
    }
  }
  this.chunks = [];
  this.err = status;
  this.msg = this.strm.msg;
};
function inflate$1(input, options) {
  var inflator = new Inflate(options);
  inflator.push(input, true);
  if (inflator.err) {
    throw inflator.msg || msg[inflator.err];
  }
  return inflator.result;
}
function inflateRaw(input, options) {
  options = options || {};
  options.raw = true;
  return inflate$1(input, options);
}
inflate$4.Inflate = Inflate;
inflate$4.inflate = inflate$1;
inflate$4.inflateRaw = inflateRaw;
inflate$4.ungzip = inflate$1;
var assign = common.assign;
var deflate = deflate$4;
var inflate = inflate$4;
var constants = constants$1;
var pako$1 = {};
assign(pako$1, deflate, inflate, constants);
var pako_1 = pako$1;
var USE_TYPEDARRAY = typeof Uint8Array !== "undefined" && typeof Uint16Array !== "undefined" && typeof Uint32Array !== "undefined";
var pako = pako_1;
var utils$d = requireUtils();
var GenericWorker$4 = GenericWorker_1;
var ARRAY_TYPE = USE_TYPEDARRAY ? "uint8array" : "array";
flate.magic = "\b\0";
function FlateWorker(action, options) {
  GenericWorker$4.call(this, "FlateWorker/" + action);
  this._pako = null;
  this._pakoAction = action;
  this._pakoOptions = options;
  this.meta = {};
}
utils$d.inherits(FlateWorker, GenericWorker$4);
FlateWorker.prototype.processChunk = function(chunk) {
  this.meta = chunk.meta;
  if (this._pako === null) {
    this._createPako();
  }
  this._pako.push(utils$d.transformTo(ARRAY_TYPE, chunk.data), false);
};
FlateWorker.prototype.flush = function() {
  GenericWorker$4.prototype.flush.call(this);
  if (this._pako === null) {
    this._createPako();
  }
  this._pako.push([], true);
};
FlateWorker.prototype.cleanUp = function() {
  GenericWorker$4.prototype.cleanUp.call(this);
  this._pako = null;
};
FlateWorker.prototype._createPako = function() {
  this._pako = new pako[this._pakoAction]({
    raw: true,
    level: this._pakoOptions.level || -1
    // default compression
  });
  var self2 = this;
  this._pako.onData = function(data) {
    self2.push({
      data,
      meta: self2.meta
    });
  };
};
flate.compressWorker = function(compressionOptions) {
  return new FlateWorker("Deflate", compressionOptions);
};
flate.uncompressWorker = function() {
  return new FlateWorker("Inflate", {});
};
var GenericWorker$3 = GenericWorker_1;
compressions$2.STORE = {
  magic: "\0\0",
  compressWorker: function() {
    return new GenericWorker$3("STORE compression");
  },
  uncompressWorker: function() {
    return new GenericWorker$3("STORE decompression");
  }
};
compressions$2.DEFLATE = flate;
var signature$1 = {};
signature$1.LOCAL_FILE_HEADER = "PK";
signature$1.CENTRAL_FILE_HEADER = "PK";
signature$1.CENTRAL_DIRECTORY_END = "PK";
signature$1.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK\x07";
signature$1.ZIP64_CENTRAL_DIRECTORY_END = "PK";
signature$1.DATA_DESCRIPTOR = "PK\x07\b";
var utils$c = requireUtils();
var GenericWorker$2 = GenericWorker_1;
var utf8$3 = utf8$5;
var crc32 = crc32_1$1;
var signature = signature$1;
var decToHex = function(dec, bytes) {
  var hex = "", i;
  for (i = 0; i < bytes; i++) {
    hex += String.fromCharCode(dec & 255);
    dec = dec >>> 8;
  }
  return hex;
};
var generateUnixExternalFileAttr = function(unixPermissions, isDir2) {
  var result = unixPermissions;
  if (!unixPermissions) {
    result = isDir2 ? 16893 : 33204;
  }
  return (result & 65535) << 16;
};
var generateDosExternalFileAttr = function(dosPermissions) {
  return (dosPermissions || 0) & 63;
};
var generateZipParts = function(streamInfo, streamedContent, streamingEnded, offset, platform2, encodeFileName) {
  var file2 = streamInfo["file"], compression = streamInfo["compression"], useCustomEncoding = encodeFileName !== utf8$3.utf8encode, encodedFileName = utils$c.transformTo("string", encodeFileName(file2.name)), utfEncodedFileName = utils$c.transformTo("string", utf8$3.utf8encode(file2.name)), comment = file2.comment, encodedComment = utils$c.transformTo("string", encodeFileName(comment)), utfEncodedComment = utils$c.transformTo("string", utf8$3.utf8encode(comment)), useUTF8ForFileName = utfEncodedFileName.length !== file2.name.length, useUTF8ForComment = utfEncodedComment.length !== comment.length, dosTime, dosDate, extraFields = "", unicodePathExtraField = "", unicodeCommentExtraField = "", dir2 = file2.dir, date = file2.date;
  var dataInfo = {
    crc32: 0,
    compressedSize: 0,
    uncompressedSize: 0
  };
  if (!streamedContent || streamingEnded) {
    dataInfo.crc32 = streamInfo["crc32"];
    dataInfo.compressedSize = streamInfo["compressedSize"];
    dataInfo.uncompressedSize = streamInfo["uncompressedSize"];
  }
  var bitflag = 0;
  if (streamedContent) {
    bitflag |= 8;
  }
  if (!useCustomEncoding && (useUTF8ForFileName || useUTF8ForComment)) {
    bitflag |= 2048;
  }
  var extFileAttr = 0;
  var versionMadeBy = 0;
  if (dir2) {
    extFileAttr |= 16;
  }
  if (platform2 === "UNIX") {
    versionMadeBy = 798;
    extFileAttr |= generateUnixExternalFileAttr(file2.unixPermissions, dir2);
  } else {
    versionMadeBy = 20;
    extFileAttr |= generateDosExternalFileAttr(file2.dosPermissions);
  }
  dosTime = date.getUTCHours();
  dosTime = dosTime << 6;
  dosTime = dosTime | date.getUTCMinutes();
  dosTime = dosTime << 5;
  dosTime = dosTime | date.getUTCSeconds() / 2;
  dosDate = date.getUTCFullYear() - 1980;
  dosDate = dosDate << 4;
  dosDate = dosDate | date.getUTCMonth() + 1;
  dosDate = dosDate << 5;
  dosDate = dosDate | date.getUTCDate();
  if (useUTF8ForFileName) {
    unicodePathExtraField = // Version
    decToHex(1, 1) + // NameCRC32
    decToHex(crc32(encodedFileName), 4) + // UnicodeName
    utfEncodedFileName;
    extraFields += // Info-ZIP Unicode Path Extra Field
    "up" + // size
    decToHex(unicodePathExtraField.length, 2) + // content
    unicodePathExtraField;
  }
  if (useUTF8ForComment) {
    unicodeCommentExtraField = // Version
    decToHex(1, 1) + // CommentCRC32
    decToHex(crc32(encodedComment), 4) + // UnicodeName
    utfEncodedComment;
    extraFields += // Info-ZIP Unicode Path Extra Field
    "uc" + // size
    decToHex(unicodeCommentExtraField.length, 2) + // content
    unicodeCommentExtraField;
  }
  var header = "";
  header += "\n\0";
  header += decToHex(bitflag, 2);
  header += compression.magic;
  header += decToHex(dosTime, 2);
  header += decToHex(dosDate, 2);
  header += decToHex(dataInfo.crc32, 4);
  header += decToHex(dataInfo.compressedSize, 4);
  header += decToHex(dataInfo.uncompressedSize, 4);
  header += decToHex(encodedFileName.length, 2);
  header += decToHex(extraFields.length, 2);
  var fileRecord = signature.LOCAL_FILE_HEADER + header + encodedFileName + extraFields;
  var dirRecord = signature.CENTRAL_FILE_HEADER + // version made by (00: DOS)
  decToHex(versionMadeBy, 2) + // file header (common to file and central directory)
  header + // file comment length
  decToHex(encodedComment.length, 2) + // disk number start
  "\0\0\0\0" + // external file attributes
  decToHex(extFileAttr, 4) + // relative offset of local header
  decToHex(offset, 4) + // file name
  encodedFileName + // extra field
  extraFields + // file comment
  encodedComment;
  return {
    fileRecord,
    dirRecord
  };
};
var generateCentralDirectoryEnd = function(entriesCount, centralDirLength, localDirLength, comment, encodeFileName) {
  var dirEnd = "";
  var encodedComment = utils$c.transformTo("string", encodeFileName(comment));
  dirEnd = signature.CENTRAL_DIRECTORY_END + // number of this disk
  "\0\0\0\0" + // total number of entries in the central directory on this disk
  decToHex(entriesCount, 2) + // total number of entries in the central directory
  decToHex(entriesCount, 2) + // size of the central directory   4 bytes
  decToHex(centralDirLength, 4) + // offset of start of central directory with respect to the starting disk number
  decToHex(localDirLength, 4) + // .ZIP file comment length
  decToHex(encodedComment.length, 2) + // .ZIP file comment
  encodedComment;
  return dirEnd;
};
var generateDataDescriptors = function(streamInfo) {
  var descriptor = "";
  descriptor = signature.DATA_DESCRIPTOR + // crc-32                          4 bytes
  decToHex(streamInfo["crc32"], 4) + // compressed size                 4 bytes
  decToHex(streamInfo["compressedSize"], 4) + // uncompressed size               4 bytes
  decToHex(streamInfo["uncompressedSize"], 4);
  return descriptor;
};
function ZipFileWorker$1(streamFiles, comment, platform2, encodeFileName) {
  GenericWorker$2.call(this, "ZipFileWorker");
  this.bytesWritten = 0;
  this.zipComment = comment;
  this.zipPlatform = platform2;
  this.encodeFileName = encodeFileName;
  this.streamFiles = streamFiles;
  this.accumulate = false;
  this.contentBuffer = [];
  this.dirRecords = [];
  this.currentSourceOffset = 0;
  this.entriesCount = 0;
  this.currentFile = null;
  this._sources = [];
}
utils$c.inherits(ZipFileWorker$1, GenericWorker$2);
ZipFileWorker$1.prototype.push = function(chunk) {
  var currentFilePercent = chunk.meta.percent || 0;
  var entriesCount = this.entriesCount;
  var remainingFiles = this._sources.length;
  if (this.accumulate) {
    this.contentBuffer.push(chunk);
  } else {
    this.bytesWritten += chunk.data.length;
    GenericWorker$2.prototype.push.call(this, {
      data: chunk.data,
      meta: {
        currentFile: this.currentFile,
        percent: entriesCount ? (currentFilePercent + 100 * (entriesCount - remainingFiles - 1)) / entriesCount : 100
      }
    });
  }
};
ZipFileWorker$1.prototype.openedSource = function(streamInfo) {
  this.currentSourceOffset = this.bytesWritten;
  this.currentFile = streamInfo["file"].name;
  var streamedContent = this.streamFiles && !streamInfo["file"].dir;
  if (streamedContent) {
    var record = generateZipParts(streamInfo, streamedContent, false, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
    this.push({
      data: record.fileRecord,
      meta: { percent: 0 }
    });
  } else {
    this.accumulate = true;
  }
};
ZipFileWorker$1.prototype.closedSource = function(streamInfo) {
  this.accumulate = false;
  var streamedContent = this.streamFiles && !streamInfo["file"].dir;
  var record = generateZipParts(streamInfo, streamedContent, true, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
  this.dirRecords.push(record.dirRecord);
  if (streamedContent) {
    this.push({
      data: generateDataDescriptors(streamInfo),
      meta: { percent: 100 }
    });
  } else {
    this.push({
      data: record.fileRecord,
      meta: { percent: 0 }
    });
    while (this.contentBuffer.length) {
      this.push(this.contentBuffer.shift());
    }
  }
  this.currentFile = null;
};
ZipFileWorker$1.prototype.flush = function() {
  var localDirLength = this.bytesWritten;
  for (var i = 0; i < this.dirRecords.length; i++) {
    this.push({
      data: this.dirRecords[i],
      meta: { percent: 100 }
    });
  }
  var centralDirLength = this.bytesWritten - localDirLength;
  var dirEnd = generateCentralDirectoryEnd(this.dirRecords.length, centralDirLength, localDirLength, this.zipComment, this.encodeFileName);
  this.push({
    data: dirEnd,
    meta: { percent: 100 }
  });
};
ZipFileWorker$1.prototype.prepareNextSource = function() {
  this.previous = this._sources.shift();
  this.openedSource(this.previous.streamInfo);
  if (this.isPaused) {
    this.previous.pause();
  } else {
    this.previous.resume();
  }
};
ZipFileWorker$1.prototype.registerPrevious = function(previous) {
  this._sources.push(previous);
  var self2 = this;
  previous.on("data", function(chunk) {
    self2.processChunk(chunk);
  });
  previous.on("end", function() {
    self2.closedSource(self2.previous.streamInfo);
    if (self2._sources.length) {
      self2.prepareNextSource();
    } else {
      self2.end();
    }
  });
  previous.on("error", function(e) {
    self2.error(e);
  });
  return this;
};
ZipFileWorker$1.prototype.resume = function() {
  if (!GenericWorker$2.prototype.resume.call(this)) {
    return false;
  }
  if (!this.previous && this._sources.length) {
    this.prepareNextSource();
    return true;
  }
  if (!this.previous && !this._sources.length && !this.generatedError) {
    this.end();
    return true;
  }
};
ZipFileWorker$1.prototype.error = function(e) {
  var sources = this._sources;
  if (!GenericWorker$2.prototype.error.call(this, e)) {
    return false;
  }
  for (var i = 0; i < sources.length; i++) {
    try {
      sources[i].error(e);
    } catch (e2) {
    }
  }
  return true;
};
ZipFileWorker$1.prototype.lock = function() {
  GenericWorker$2.prototype.lock.call(this);
  var sources = this._sources;
  for (var i = 0; i < sources.length; i++) {
    sources[i].lock();
  }
};
var ZipFileWorker_1 = ZipFileWorker$1;
var compressions$1 = compressions$2;
var ZipFileWorker = ZipFileWorker_1;
var getCompression = function(fileCompression, zipCompression) {
  var compressionName = fileCompression || zipCompression;
  var compression = compressions$1[compressionName];
  if (!compression) {
    throw new Error(compressionName + " is not a valid compression method !");
  }
  return compression;
};
generate$1.generateWorker = function(zip, options, comment) {
  var zipFileWorker = new ZipFileWorker(options.streamFiles, comment, options.platform, options.encodeFileName);
  var entriesCount = 0;
  try {
    zip.forEach(function(relativePath, file2) {
      entriesCount++;
      var compression = getCompression(file2.options.compression, options.compression);
      var compressionOptions = file2.options.compressionOptions || options.compressionOptions || {};
      var dir2 = file2.dir, date = file2.date;
      file2._compressWorker(compression, compressionOptions).withStreamInfo("file", {
        name: relativePath,
        dir: dir2,
        date,
        comment: file2.comment || "",
        unixPermissions: file2.unixPermissions,
        dosPermissions: file2.dosPermissions
      }).pipe(zipFileWorker);
    });
    zipFileWorker.entriesCount = entriesCount;
  } catch (e) {
    zipFileWorker.error(e);
  }
  return zipFileWorker;
};
var utils$b = requireUtils();
var GenericWorker$1 = GenericWorker_1;
function NodejsStreamInputAdapter$1(filename, stream2) {
  GenericWorker$1.call(this, "Nodejs stream input adapter for " + filename);
  this._upstreamEnded = false;
  this._bindStream(stream2);
}
utils$b.inherits(NodejsStreamInputAdapter$1, GenericWorker$1);
NodejsStreamInputAdapter$1.prototype._bindStream = function(stream2) {
  var self2 = this;
  this._stream = stream2;
  stream2.pause();
  stream2.on("data", function(chunk) {
    self2.push({
      data: chunk,
      meta: {
        percent: 0
      }
    });
  }).on("error", function(e) {
    if (self2.isPaused) {
      this.generatedError = e;
    } else {
      self2.error(e);
    }
  }).on("end", function() {
    if (self2.isPaused) {
      self2._upstreamEnded = true;
    } else {
      self2.end();
    }
  });
};
NodejsStreamInputAdapter$1.prototype.pause = function() {
  if (!GenericWorker$1.prototype.pause.call(this)) {
    return false;
  }
  this._stream.pause();
  return true;
};
NodejsStreamInputAdapter$1.prototype.resume = function() {
  if (!GenericWorker$1.prototype.resume.call(this)) {
    return false;
  }
  if (this._upstreamEnded) {
    this.end();
  } else {
    this._stream.resume();
  }
  return true;
};
var NodejsStreamInputAdapter_1 = NodejsStreamInputAdapter$1;
var utf8$2 = utf8$5;
var utils$a = requireUtils();
var GenericWorker = GenericWorker_1;
var StreamHelper = StreamHelper_1;
var defaults = defaults$1;
var CompressedObject$1 = compressedObject;
var ZipObject = zipObject;
var generate = generate$1;
var nodejsUtils$1 = nodejsUtils$2;
var NodejsStreamInputAdapter = NodejsStreamInputAdapter_1;
var fileAdd = function(name, data, originalOptions) {
  var dataType = utils$a.getTypeOf(data), parent;
  var o = utils$a.extend(originalOptions || {}, defaults);
  o.date = o.date || /* @__PURE__ */ new Date();
  if (o.compression !== null) {
    o.compression = o.compression.toUpperCase();
  }
  if (typeof o.unixPermissions === "string") {
    o.unixPermissions = parseInt(o.unixPermissions, 8);
  }
  if (o.unixPermissions && o.unixPermissions & 16384) {
    o.dir = true;
  }
  if (o.dosPermissions && o.dosPermissions & 16) {
    o.dir = true;
  }
  if (o.dir) {
    name = forceTrailingSlash(name);
  }
  if (o.createFolders && (parent = parentFolder(name))) {
    folderAdd.call(this, parent, true);
  }
  var isUnicodeString = dataType === "string" && o.binary === false && o.base64 === false;
  if (!originalOptions || typeof originalOptions.binary === "undefined") {
    o.binary = !isUnicodeString;
  }
  var isCompressedEmpty = data instanceof CompressedObject$1 && data.uncompressedSize === 0;
  if (isCompressedEmpty || o.dir || !data || data.length === 0) {
    o.base64 = false;
    o.binary = true;
    data = "";
    o.compression = "STORE";
    dataType = "string";
  }
  var zipObjectContent = null;
  if (data instanceof CompressedObject$1 || data instanceof GenericWorker) {
    zipObjectContent = data;
  } else if (nodejsUtils$1.isNode && nodejsUtils$1.isStream(data)) {
    zipObjectContent = new NodejsStreamInputAdapter(name, data);
  } else {
    zipObjectContent = utils$a.prepareContent(name, data, o.binary, o.optimizedBinaryString, o.base64);
  }
  var object2 = new ZipObject(name, zipObjectContent, o);
  this.files[name] = object2;
};
var parentFolder = function(path2) {
  if (path2.slice(-1) === "/") {
    path2 = path2.substring(0, path2.length - 1);
  }
  var lastSlash = path2.lastIndexOf("/");
  return lastSlash > 0 ? path2.substring(0, lastSlash) : "";
};
var forceTrailingSlash = function(path2) {
  if (path2.slice(-1) !== "/") {
    path2 += "/";
  }
  return path2;
};
var folderAdd = function(name, createFolders) {
  createFolders = typeof createFolders !== "undefined" ? createFolders : defaults.createFolders;
  name = forceTrailingSlash(name);
  if (!this.files[name]) {
    fileAdd.call(this, name, null, {
      dir: true,
      createFolders
    });
  }
  return this.files[name];
};
function isRegExp(object2) {
  return Object.prototype.toString.call(object2) === "[object RegExp]";
}
var out = {
  /**
   * @see loadAsync
   */
  load: function() {
    throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
  },
  /**
   * Call a callback function for each entry at this folder level.
   * @param {Function} cb the callback function:
   * function (relativePath, file) {...}
   * It takes 2 arguments : the relative path and the file.
   */
  forEach: function(cb) {
    var filename, relativePath, file2;
    for (filename in this.files) {
      file2 = this.files[filename];
      relativePath = filename.slice(this.root.length, filename.length);
      if (relativePath && filename.slice(0, this.root.length) === this.root) {
        cb(relativePath, file2);
      }
    }
  },
  /**
   * Filter nested files/folders with the specified function.
   * @param {Function} search the predicate to use :
   * function (relativePath, file) {...}
   * It takes 2 arguments : the relative path and the file.
   * @return {Array} An array of matching elements.
   */
  filter: function(search) {
    var result = [];
    this.forEach(function(relativePath, entry) {
      if (search(relativePath, entry)) {
        result.push(entry);
      }
    });
    return result;
  },
  /**
   * Add a file to the zip file, or search a file.
   * @param   {string|RegExp} name The name of the file to add (if data is defined),
   * the name of the file to find (if no data) or a regex to match files.
   * @param   {String|ArrayBuffer|Uint8Array|Buffer} data  The file data, either raw or base64 encoded
   * @param   {Object} o     File options
   * @return  {JSZip|Object|Array} this JSZip object (when adding a file),
   * a file (when searching by string) or an array of files (when searching by regex).
   */
  file: function(name, data, o) {
    if (arguments.length === 1) {
      if (isRegExp(name)) {
        var regexp = name;
        return this.filter(function(relativePath, file2) {
          return !file2.dir && regexp.test(relativePath);
        });
      } else {
        var obj = this.files[this.root + name];
        if (obj && !obj.dir) {
          return obj;
        } else {
          return null;
        }
      }
    } else {
      name = this.root + name;
      fileAdd.call(this, name, data, o);
    }
    return this;
  },
  /**
   * Add a directory to the zip file, or search.
   * @param   {String|RegExp} arg The name of the directory to add, or a regex to search folders.
   * @return  {JSZip} an object with the new directory as the root, or an array containing matching folders.
   */
  folder: function(arg) {
    if (!arg) {
      return this;
    }
    if (isRegExp(arg)) {
      return this.filter(function(relativePath, file2) {
        return file2.dir && arg.test(relativePath);
      });
    }
    var name = this.root + arg;
    var newFolder = folderAdd.call(this, name);
    var ret = this.clone();
    ret.root = newFolder.name;
    return ret;
  },
  /**
   * Delete a file, or a directory and all sub-files, from the zip
   * @param {string} name the name of the file to delete
   * @return {JSZip} this JSZip object
   */
  remove: function(name) {
    name = this.root + name;
    var file2 = this.files[name];
    if (!file2) {
      if (name.slice(-1) !== "/") {
        name += "/";
      }
      file2 = this.files[name];
    }
    if (file2 && !file2.dir) {
      delete this.files[name];
    } else {
      var kids = this.filter(function(relativePath, file3) {
        return file3.name.slice(0, name.length) === name;
      });
      for (var i = 0; i < kids.length; i++) {
        delete this.files[kids[i].name];
      }
    }
    return this;
  },
  /**
   * @deprecated This method has been removed in JSZip 3.0, please check the upgrade guide.
   */
  generate: function() {
    throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
  },
  /**
   * Generate the complete zip file as an internal stream.
   * @param {Object} options the options to generate the zip file :
   * - compression, "STORE" by default.
   * - type, "base64" by default. Values are : string, base64, uint8array, arraybuffer, blob.
   * @return {StreamHelper} the streamed zip file.
   */
  generateInternalStream: function(options) {
    var worker, opts = {};
    try {
      opts = utils$a.extend(options || {}, {
        streamFiles: false,
        compression: "STORE",
        compressionOptions: null,
        type: "",
        platform: "DOS",
        comment: null,
        mimeType: "application/zip",
        encodeFileName: utf8$2.utf8encode
      });
      opts.type = opts.type.toLowerCase();
      opts.compression = opts.compression.toUpperCase();
      if (opts.type === "binarystring") {
        opts.type = "string";
      }
      if (!opts.type) {
        throw new Error("No output type specified.");
      }
      utils$a.checkSupport(opts.type);
      if (opts.platform === "darwin" || opts.platform === "freebsd" || opts.platform === "linux" || opts.platform === "sunos") {
        opts.platform = "UNIX";
      }
      if (opts.platform === "win32") {
        opts.platform = "DOS";
      }
      var comment = opts.comment || this.comment || "";
      worker = generate.generateWorker(this, opts, comment);
    } catch (e) {
      worker = new GenericWorker("error");
      worker.error(e);
    }
    return new StreamHelper(worker, opts.type || "string", opts.mimeType);
  },
  /**
   * Generate the complete zip file asynchronously.
   * @see generateInternalStream
   */
  generateAsync: function(options, onUpdate) {
    return this.generateInternalStream(options).accumulate(onUpdate);
  },
  /**
   * Generate the complete zip file asynchronously.
   * @see generateInternalStream
   */
  generateNodeStream: function(options, onUpdate) {
    options = options || {};
    if (!options.type) {
      options.type = "nodebuffer";
    }
    return this.generateInternalStream(options).toNodejsStream(onUpdate);
  }
};
var object = out;
var utils$9 = requireUtils();
function DataReader$2(data) {
  this.data = data;
  this.length = data.length;
  this.index = 0;
  this.zero = 0;
}
DataReader$2.prototype = {
  /**
   * Check that the offset will not go too far.
   * @param {string} offset the additional offset to check.
   * @throws {Error} an Error if the offset is out of bounds.
   */
  checkOffset: function(offset) {
    this.checkIndex(this.index + offset);
  },
  /**
   * Check that the specified index will not be too far.
   * @param {string} newIndex the index to check.
   * @throws {Error} an Error if the index is out of bounds.
   */
  checkIndex: function(newIndex) {
    if (this.length < this.zero + newIndex || newIndex < 0) {
      throw new Error("End of data reached (data length = " + this.length + ", asked index = " + newIndex + "). Corrupted zip ?");
    }
  },
  /**
   * Change the index.
   * @param {number} newIndex The new index.
   * @throws {Error} if the new index is out of the data.
   */
  setIndex: function(newIndex) {
    this.checkIndex(newIndex);
    this.index = newIndex;
  },
  /**
   * Skip the next n bytes.
   * @param {number} n the number of bytes to skip.
   * @throws {Error} if the new index is out of the data.
   */
  skip: function(n) {
    this.setIndex(this.index + n);
  },
  /**
   * Get the byte at the specified index.
   * @param {number} i the index to use.
   * @return {number} a byte.
   */
  byteAt: function() {
  },
  /**
   * Get the next number with a given byte size.
   * @param {number} size the number of bytes to read.
   * @return {number} the corresponding number.
   */
  readInt: function(size) {
    var result = 0, i;
    this.checkOffset(size);
    for (i = this.index + size - 1; i >= this.index; i--) {
      result = (result << 8) + this.byteAt(i);
    }
    this.index += size;
    return result;
  },
  /**
   * Get the next string with a given byte size.
   * @param {number} size the number of bytes to read.
   * @return {string} the corresponding string.
   */
  readString: function(size) {
    return utils$9.transformTo("string", this.readData(size));
  },
  /**
   * Get raw data without conversion, <size> bytes.
   * @param {number} size the number of bytes to read.
   * @return {Object} the raw data, implementation specific.
   */
  readData: function() {
  },
  /**
   * Find the last occurrence of a zip signature (4 bytes).
   * @param {string} sig the signature to find.
   * @return {number} the index of the last occurrence, -1 if not found.
   */
  lastIndexOfSignature: function() {
  },
  /**
   * Read the signature (4 bytes) at the current position and compare it with sig.
   * @param {string} sig the expected signature
   * @return {boolean} true if the signature matches, false otherwise.
   */
  readAndCheckSignature: function() {
  },
  /**
   * Get the next date.
   * @return {Date} the date.
   */
  readDate: function() {
    var dostime = this.readInt(4);
    return new Date(Date.UTC(
      (dostime >> 25 & 127) + 1980,
      // year
      (dostime >> 21 & 15) - 1,
      // month
      dostime >> 16 & 31,
      // day
      dostime >> 11 & 31,
      // hour
      dostime >> 5 & 63,
      // minute
      (dostime & 31) << 1
    ));
  }
};
var DataReader_1 = DataReader$2;
var DataReader$1 = DataReader_1;
var utils$8 = requireUtils();
function ArrayReader$2(data) {
  DataReader$1.call(this, data);
  for (var i = 0; i < this.data.length; i++) {
    data[i] = data[i] & 255;
  }
}
utils$8.inherits(ArrayReader$2, DataReader$1);
ArrayReader$2.prototype.byteAt = function(i) {
  return this.data[this.zero + i];
};
ArrayReader$2.prototype.lastIndexOfSignature = function(sig2) {
  var sig0 = sig2.charCodeAt(0), sig1 = sig2.charCodeAt(1), sig22 = sig2.charCodeAt(2), sig3 = sig2.charCodeAt(3);
  for (var i = this.length - 4; i >= 0; --i) {
    if (this.data[i] === sig0 && this.data[i + 1] === sig1 && this.data[i + 2] === sig22 && this.data[i + 3] === sig3) {
      return i - this.zero;
    }
  }
  return -1;
};
ArrayReader$2.prototype.readAndCheckSignature = function(sig2) {
  var sig0 = sig2.charCodeAt(0), sig1 = sig2.charCodeAt(1), sig22 = sig2.charCodeAt(2), sig3 = sig2.charCodeAt(3), data = this.readData(4);
  return sig0 === data[0] && sig1 === data[1] && sig22 === data[2] && sig3 === data[3];
};
ArrayReader$2.prototype.readData = function(size) {
  this.checkOffset(size);
  if (size === 0) {
    return [];
  }
  var result = this.data.slice(this.zero + this.index, this.zero + this.index + size);
  this.index += size;
  return result;
};
var ArrayReader_1 = ArrayReader$2;
var DataReader = DataReader_1;
var utils$7 = requireUtils();
function StringReader$1(data) {
  DataReader.call(this, data);
}
utils$7.inherits(StringReader$1, DataReader);
StringReader$1.prototype.byteAt = function(i) {
  return this.data.charCodeAt(this.zero + i);
};
StringReader$1.prototype.lastIndexOfSignature = function(sig2) {
  return this.data.lastIndexOf(sig2) - this.zero;
};
StringReader$1.prototype.readAndCheckSignature = function(sig2) {
  var data = this.readData(4);
  return sig2 === data;
};
StringReader$1.prototype.readData = function(size) {
  this.checkOffset(size);
  var result = this.data.slice(this.zero + this.index, this.zero + this.index + size);
  this.index += size;
  return result;
};
var StringReader_1 = StringReader$1;
var ArrayReader$1 = ArrayReader_1;
var utils$6 = requireUtils();
function Uint8ArrayReader$2(data) {
  ArrayReader$1.call(this, data);
}
utils$6.inherits(Uint8ArrayReader$2, ArrayReader$1);
Uint8ArrayReader$2.prototype.readData = function(size) {
  this.checkOffset(size);
  if (size === 0) {
    return new Uint8Array(0);
  }
  var result = this.data.subarray(this.zero + this.index, this.zero + this.index + size);
  this.index += size;
  return result;
};
var Uint8ArrayReader_1 = Uint8ArrayReader$2;
var Uint8ArrayReader$1 = Uint8ArrayReader_1;
var utils$5 = requireUtils();
function NodeBufferReader$1(data) {
  Uint8ArrayReader$1.call(this, data);
}
utils$5.inherits(NodeBufferReader$1, Uint8ArrayReader$1);
NodeBufferReader$1.prototype.readData = function(size) {
  this.checkOffset(size);
  var result = this.data.slice(this.zero + this.index, this.zero + this.index + size);
  this.index += size;
  return result;
};
var NodeBufferReader_1 = NodeBufferReader$1;
var utils$4 = requireUtils();
var support$2 = support$4;
var ArrayReader = ArrayReader_1;
var StringReader = StringReader_1;
var NodeBufferReader = NodeBufferReader_1;
var Uint8ArrayReader = Uint8ArrayReader_1;
var readerFor$2 = function(data) {
  var type = utils$4.getTypeOf(data);
  utils$4.checkSupport(type);
  if (type === "string" && !support$2.uint8array) {
    return new StringReader(data);
  }
  if (type === "nodebuffer") {
    return new NodeBufferReader(data);
  }
  if (support$2.uint8array) {
    return new Uint8ArrayReader(utils$4.transformTo("uint8array", data));
  }
  return new ArrayReader(utils$4.transformTo("array", data));
};
var readerFor$1 = readerFor$2;
var utils$3 = requireUtils();
var CompressedObject = compressedObject;
var crc32fn = crc32_1$1;
var utf8$1 = utf8$5;
var compressions = compressions$2;
var support$1 = support$4;
var MADE_BY_DOS = 0;
var MADE_BY_UNIX = 3;
var findCompression = function(compressionMethod) {
  for (var method in compressions) {
    if (!Object.prototype.hasOwnProperty.call(compressions, method)) {
      continue;
    }
    if (compressions[method].magic === compressionMethod) {
      return compressions[method];
    }
  }
  return null;
};
function ZipEntry$1(options, loadOptions) {
  this.options = options;
  this.loadOptions = loadOptions;
}
ZipEntry$1.prototype = {
  /**
   * say if the file is encrypted.
   * @return {boolean} true if the file is encrypted, false otherwise.
   */
  isEncrypted: function() {
    return (this.bitFlag & 1) === 1;
  },
  /**
   * say if the file has utf-8 filename/comment.
   * @return {boolean} true if the filename/comment is in utf-8, false otherwise.
   */
  useUTF8: function() {
    return (this.bitFlag & 2048) === 2048;
  },
  /**
   * Read the local part of a zip file and add the info in this object.
   * @param {DataReader} reader the reader to use.
   */
  readLocalPart: function(reader) {
    var compression, localExtraFieldsLength;
    reader.skip(22);
    this.fileNameLength = reader.readInt(2);
    localExtraFieldsLength = reader.readInt(2);
    this.fileName = reader.readData(this.fileNameLength);
    reader.skip(localExtraFieldsLength);
    if (this.compressedSize === -1 || this.uncompressedSize === -1) {
      throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");
    }
    compression = findCompression(this.compressionMethod);
    if (compression === null) {
      throw new Error("Corrupted zip : compression " + utils$3.pretty(this.compressionMethod) + " unknown (inner file : " + utils$3.transformTo("string", this.fileName) + ")");
    }
    this.decompressed = new CompressedObject(this.compressedSize, this.uncompressedSize, this.crc32, compression, reader.readData(this.compressedSize));
  },
  /**
   * Read the central part of a zip file and add the info in this object.
   * @param {DataReader} reader the reader to use.
   */
  readCentralPart: function(reader) {
    this.versionMadeBy = reader.readInt(2);
    reader.skip(2);
    this.bitFlag = reader.readInt(2);
    this.compressionMethod = reader.readString(2);
    this.date = reader.readDate();
    this.crc32 = reader.readInt(4);
    this.compressedSize = reader.readInt(4);
    this.uncompressedSize = reader.readInt(4);
    var fileNameLength = reader.readInt(2);
    this.extraFieldsLength = reader.readInt(2);
    this.fileCommentLength = reader.readInt(2);
    this.diskNumberStart = reader.readInt(2);
    this.internalFileAttributes = reader.readInt(2);
    this.externalFileAttributes = reader.readInt(4);
    this.localHeaderOffset = reader.readInt(4);
    if (this.isEncrypted()) {
      throw new Error("Encrypted zip are not supported");
    }
    reader.skip(fileNameLength);
    this.readExtraFields(reader);
    this.parseZIP64ExtraField(reader);
    this.fileComment = reader.readData(this.fileCommentLength);
  },
  /**
   * Parse the external file attributes and get the unix/dos permissions.
   */
  processAttributes: function() {
    this.unixPermissions = null;
    this.dosPermissions = null;
    var madeBy = this.versionMadeBy >> 8;
    this.dir = this.externalFileAttributes & 16 ? true : false;
    if (madeBy === MADE_BY_DOS) {
      this.dosPermissions = this.externalFileAttributes & 63;
    }
    if (madeBy === MADE_BY_UNIX) {
      this.unixPermissions = this.externalFileAttributes >> 16 & 65535;
    }
    if (!this.dir && this.fileNameStr.slice(-1) === "/") {
      this.dir = true;
    }
  },
  /**
   * Parse the ZIP64 extra field and merge the info in the current ZipEntry.
   * @param {DataReader} reader the reader to use.
   */
  parseZIP64ExtraField: function() {
    if (!this.extraFields[1]) {
      return;
    }
    var extraReader = readerFor$1(this.extraFields[1].value);
    if (this.uncompressedSize === utils$3.MAX_VALUE_32BITS) {
      this.uncompressedSize = extraReader.readInt(8);
    }
    if (this.compressedSize === utils$3.MAX_VALUE_32BITS) {
      this.compressedSize = extraReader.readInt(8);
    }
    if (this.localHeaderOffset === utils$3.MAX_VALUE_32BITS) {
      this.localHeaderOffset = extraReader.readInt(8);
    }
    if (this.diskNumberStart === utils$3.MAX_VALUE_32BITS) {
      this.diskNumberStart = extraReader.readInt(4);
    }
  },
  /**
   * Read the central part of a zip file and add the info in this object.
   * @param {DataReader} reader the reader to use.
   */
  readExtraFields: function(reader) {
    var end = reader.index + this.extraFieldsLength, extraFieldId, extraFieldLength, extraFieldValue;
    if (!this.extraFields) {
      this.extraFields = {};
    }
    while (reader.index + 4 < end) {
      extraFieldId = reader.readInt(2);
      extraFieldLength = reader.readInt(2);
      extraFieldValue = reader.readData(extraFieldLength);
      this.extraFields[extraFieldId] = {
        id: extraFieldId,
        length: extraFieldLength,
        value: extraFieldValue
      };
    }
    reader.setIndex(end);
  },
  /**
   * Apply an UTF8 transformation if needed.
   */
  handleUTF8: function() {
    var decodeParamType = support$1.uint8array ? "uint8array" : "array";
    if (this.useUTF8()) {
      this.fileNameStr = utf8$1.utf8decode(this.fileName);
      this.fileCommentStr = utf8$1.utf8decode(this.fileComment);
    } else {
      var upath = this.findExtraFieldUnicodePath();
      if (upath !== null) {
        this.fileNameStr = upath;
      } else {
        var fileNameByteArray = utils$3.transformTo(decodeParamType, this.fileName);
        this.fileNameStr = this.loadOptions.decodeFileName(fileNameByteArray);
      }
      var ucomment = this.findExtraFieldUnicodeComment();
      if (ucomment !== null) {
        this.fileCommentStr = ucomment;
      } else {
        var commentByteArray = utils$3.transformTo(decodeParamType, this.fileComment);
        this.fileCommentStr = this.loadOptions.decodeFileName(commentByteArray);
      }
    }
  },
  /**
   * Find the unicode path declared in the extra field, if any.
   * @return {String} the unicode path, null otherwise.
   */
  findExtraFieldUnicodePath: function() {
    var upathField = this.extraFields[28789];
    if (upathField) {
      var extraReader = readerFor$1(upathField.value);
      if (extraReader.readInt(1) !== 1) {
        return null;
      }
      if (crc32fn(this.fileName) !== extraReader.readInt(4)) {
        return null;
      }
      return utf8$1.utf8decode(extraReader.readData(upathField.length - 5));
    }
    return null;
  },
  /**
   * Find the unicode comment declared in the extra field, if any.
   * @return {String} the unicode comment, null otherwise.
   */
  findExtraFieldUnicodeComment: function() {
    var ucommentField = this.extraFields[25461];
    if (ucommentField) {
      var extraReader = readerFor$1(ucommentField.value);
      if (extraReader.readInt(1) !== 1) {
        return null;
      }
      if (crc32fn(this.fileComment) !== extraReader.readInt(4)) {
        return null;
      }
      return utf8$1.utf8decode(extraReader.readData(ucommentField.length - 5));
    }
    return null;
  }
};
var zipEntry = ZipEntry$1;
var readerFor = readerFor$2;
var utils$2 = requireUtils();
var sig = signature$1;
var ZipEntry = zipEntry;
var support = support$4;
function ZipEntries$1(loadOptions) {
  this.files = [];
  this.loadOptions = loadOptions;
}
ZipEntries$1.prototype = {
  /**
   * Check that the reader is on the specified signature.
   * @param {string} expectedSignature the expected signature.
   * @throws {Error} if it is an other signature.
   */
  checkSignature: function(expectedSignature) {
    if (!this.reader.readAndCheckSignature(expectedSignature)) {
      this.reader.index -= 4;
      var signature2 = this.reader.readString(4);
      throw new Error("Corrupted zip or bug: unexpected signature (" + utils$2.pretty(signature2) + ", expected " + utils$2.pretty(expectedSignature) + ")");
    }
  },
  /**
   * Check if the given signature is at the given index.
   * @param {number} askedIndex the index to check.
   * @param {string} expectedSignature the signature to expect.
   * @return {boolean} true if the signature is here, false otherwise.
   */
  isSignature: function(askedIndex, expectedSignature) {
    var currentIndex = this.reader.index;
    this.reader.setIndex(askedIndex);
    var signature2 = this.reader.readString(4);
    var result = signature2 === expectedSignature;
    this.reader.setIndex(currentIndex);
    return result;
  },
  /**
   * Read the end of the central directory.
   */
  readBlockEndOfCentral: function() {
    this.diskNumber = this.reader.readInt(2);
    this.diskWithCentralDirStart = this.reader.readInt(2);
    this.centralDirRecordsOnThisDisk = this.reader.readInt(2);
    this.centralDirRecords = this.reader.readInt(2);
    this.centralDirSize = this.reader.readInt(4);
    this.centralDirOffset = this.reader.readInt(4);
    this.zipCommentLength = this.reader.readInt(2);
    var zipComment = this.reader.readData(this.zipCommentLength);
    var decodeParamType = support.uint8array ? "uint8array" : "array";
    var decodeContent = utils$2.transformTo(decodeParamType, zipComment);
    this.zipComment = this.loadOptions.decodeFileName(decodeContent);
  },
  /**
   * Read the end of the Zip 64 central directory.
   * Not merged with the method readEndOfCentral :
   * The end of central can coexist with its Zip64 brother,
   * I don't want to read the wrong number of bytes !
   */
  readBlockZip64EndOfCentral: function() {
    this.zip64EndOfCentralSize = this.reader.readInt(8);
    this.reader.skip(4);
    this.diskNumber = this.reader.readInt(4);
    this.diskWithCentralDirStart = this.reader.readInt(4);
    this.centralDirRecordsOnThisDisk = this.reader.readInt(8);
    this.centralDirRecords = this.reader.readInt(8);
    this.centralDirSize = this.reader.readInt(8);
    this.centralDirOffset = this.reader.readInt(8);
    this.zip64ExtensibleData = {};
    var extraDataSize = this.zip64EndOfCentralSize - 44, index = 0, extraFieldId, extraFieldLength, extraFieldValue;
    while (index < extraDataSize) {
      extraFieldId = this.reader.readInt(2);
      extraFieldLength = this.reader.readInt(4);
      extraFieldValue = this.reader.readData(extraFieldLength);
      this.zip64ExtensibleData[extraFieldId] = {
        id: extraFieldId,
        length: extraFieldLength,
        value: extraFieldValue
      };
    }
  },
  /**
   * Read the end of the Zip 64 central directory locator.
   */
  readBlockZip64EndOfCentralLocator: function() {
    this.diskWithZip64CentralDirStart = this.reader.readInt(4);
    this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8);
    this.disksCount = this.reader.readInt(4);
    if (this.disksCount > 1) {
      throw new Error("Multi-volumes zip are not supported");
    }
  },
  /**
   * Read the local files, based on the offset read in the central part.
   */
  readLocalFiles: function() {
    var i, file2;
    for (i = 0; i < this.files.length; i++) {
      file2 = this.files[i];
      this.reader.setIndex(file2.localHeaderOffset);
      this.checkSignature(sig.LOCAL_FILE_HEADER);
      file2.readLocalPart(this.reader);
      file2.handleUTF8();
      file2.processAttributes();
    }
  },
  /**
   * Read the central directory.
   */
  readCentralDir: function() {
    var file2;
    this.reader.setIndex(this.centralDirOffset);
    while (this.reader.readAndCheckSignature(sig.CENTRAL_FILE_HEADER)) {
      file2 = new ZipEntry({
        zip64: this.zip64
      }, this.loadOptions);
      file2.readCentralPart(this.reader);
      this.files.push(file2);
    }
    if (this.centralDirRecords !== this.files.length) {
      if (this.centralDirRecords !== 0 && this.files.length === 0) {
        throw new Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length);
      }
    }
  },
  /**
   * Read the end of central directory.
   */
  readEndOfCentral: function() {
    var offset = this.reader.lastIndexOfSignature(sig.CENTRAL_DIRECTORY_END);
    if (offset < 0) {
      var isGarbage = !this.isSignature(0, sig.LOCAL_FILE_HEADER);
      if (isGarbage) {
        throw new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");
      } else {
        throw new Error("Corrupted zip: can't find end of central directory");
      }
    }
    this.reader.setIndex(offset);
    var endOfCentralDirOffset = offset;
    this.checkSignature(sig.CENTRAL_DIRECTORY_END);
    this.readBlockEndOfCentral();
    if (this.diskNumber === utils$2.MAX_VALUE_16BITS || this.diskWithCentralDirStart === utils$2.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === utils$2.MAX_VALUE_16BITS || this.centralDirRecords === utils$2.MAX_VALUE_16BITS || this.centralDirSize === utils$2.MAX_VALUE_32BITS || this.centralDirOffset === utils$2.MAX_VALUE_32BITS) {
      this.zip64 = true;
      offset = this.reader.lastIndexOfSignature(sig.ZIP64_CENTRAL_DIRECTORY_LOCATOR);
      if (offset < 0) {
        throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");
      }
      this.reader.setIndex(offset);
      this.checkSignature(sig.ZIP64_CENTRAL_DIRECTORY_LOCATOR);
      this.readBlockZip64EndOfCentralLocator();
      if (!this.isSignature(this.relativeOffsetEndOfZip64CentralDir, sig.ZIP64_CENTRAL_DIRECTORY_END)) {
        this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(sig.ZIP64_CENTRAL_DIRECTORY_END);
        if (this.relativeOffsetEndOfZip64CentralDir < 0) {
          throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");
        }
      }
      this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir);
      this.checkSignature(sig.ZIP64_CENTRAL_DIRECTORY_END);
      this.readBlockZip64EndOfCentral();
    }
    var expectedEndOfCentralDirOffset = this.centralDirOffset + this.centralDirSize;
    if (this.zip64) {
      expectedEndOfCentralDirOffset += 20;
      expectedEndOfCentralDirOffset += 12 + this.zip64EndOfCentralSize;
    }
    var extraBytes = endOfCentralDirOffset - expectedEndOfCentralDirOffset;
    if (extraBytes > 0) {
      if (this.isSignature(endOfCentralDirOffset, sig.CENTRAL_FILE_HEADER))
        ;
      else {
        this.reader.zero = extraBytes;
      }
    } else if (extraBytes < 0) {
      throw new Error("Corrupted zip: missing " + Math.abs(extraBytes) + " bytes.");
    }
  },
  prepareReader: function(data) {
    this.reader = readerFor(data);
  },
  /**
   * Read a zip file and create ZipEntries.
   * @param {String|ArrayBuffer|Uint8Array|Buffer} data the binary string representing a zip file.
   */
  load: function(data) {
    this.prepareReader(data);
    this.readEndOfCentral();
    this.readCentralDir();
    this.readLocalFiles();
  }
};
var zipEntries = ZipEntries$1;
var utils$1 = requireUtils();
var external = external$3;
var utf8 = utf8$5;
var ZipEntries = zipEntries;
var Crc32Probe = Crc32Probe_1;
var nodejsUtils = nodejsUtils$2;
function checkEntryCRC32(zipEntry2) {
  return new external.Promise(function(resolve, reject) {
    var worker = zipEntry2.decompressed.getContentWorker().pipe(new Crc32Probe());
    worker.on("error", function(e) {
      reject(e);
    }).on("end", function() {
      if (worker.streamInfo.crc32 !== zipEntry2.decompressed.crc32) {
        reject(new Error("Corrupted zip : CRC32 mismatch"));
      } else {
        resolve();
      }
    }).resume();
  });
}
var load = function(data, options) {
  var zip = this;
  options = utils$1.extend(options || {}, {
    base64: false,
    checkCRC32: false,
    optimizedBinaryString: false,
    createFolders: false,
    decodeFileName: utf8.utf8decode
  });
  if (nodejsUtils.isNode && nodejsUtils.isStream(data)) {
    return external.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file."));
  }
  return utils$1.prepareContent("the loaded zip file", data, true, options.optimizedBinaryString, options.base64).then(function(data2) {
    var zipEntries2 = new ZipEntries(options);
    zipEntries2.load(data2);
    return zipEntries2;
  }).then(function checkCRC32(zipEntries2) {
    var promises = [external.Promise.resolve(zipEntries2)];
    var files = zipEntries2.files;
    if (options.checkCRC32) {
      for (var i = 0; i < files.length; i++) {
        promises.push(checkEntryCRC32(files[i]));
      }
    }
    return external.Promise.all(promises);
  }).then(function addFiles(results) {
    var zipEntries2 = results.shift();
    var files = zipEntries2.files;
    for (var i = 0; i < files.length; i++) {
      var input = files[i];
      var unsafeName = input.fileNameStr;
      var safeName = utils$1.resolve(input.fileNameStr);
      zip.file(safeName, input.decompressed, {
        binary: true,
        optimizedBinaryString: true,
        date: input.date,
        dir: input.dir,
        comment: input.fileCommentStr.length ? input.fileCommentStr : null,
        unixPermissions: input.unixPermissions,
        dosPermissions: input.dosPermissions,
        createFolders: options.createFolders
      });
      if (!input.dir) {
        zip.file(safeName).unsafeOriginalName = unsafeName;
      }
    }
    if (zipEntries2.zipComment.length) {
      zip.comment = zipEntries2.zipComment;
    }
    return zip;
  });
};
function JSZip() {
  if (!(this instanceof JSZip)) {
    return new JSZip();
  }
  if (arguments.length) {
    throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");
  }
  this.files = /* @__PURE__ */ Object.create(null);
  this.comment = null;
  this.root = "";
  this.clone = function() {
    var newObj = new JSZip();
    for (var i in this) {
      if (typeof this[i] !== "function") {
        newObj[i] = this[i];
      }
    }
    return newObj;
  };
}
JSZip.prototype = object;
JSZip.prototype.loadAsync = load;
JSZip.support = support$4;
JSZip.defaults = defaults$1;
JSZip.version = "3.10.1";
JSZip.loadAsync = function(content, options) {
  return new JSZip().loadAsync(content, options);
};
JSZip.external = external$3;
var lib = JSZip;
var append$1 = {};
var promisify$1 = (fn) => {
  return function() {
    const length = arguments.length;
    const args = new Array(length);
    for (let i = 0; i < length; i += 1) {
      args[i] = arguments[i];
    }
    return new Promise((resolve, reject) => {
      args.push((err2, data) => {
        if (err2) {
          reject(err2);
        } else {
          resolve(data);
        }
      });
      fn.apply(null, args);
    });
  };
};
const fs$f = require$$0$1;
const promisify = promisify$1;
const isCallbackMethod = (key) => {
  return [
    typeof fs$f[key] === "function",
    !key.match(/Sync$/),
    !key.match(/^[A-Z]/),
    !key.match(/^create/),
    !key.match(/^(un)?watch/)
  ].every(Boolean);
};
const adaptMethod = (name) => {
  const original = fs$f[name];
  return promisify(original);
};
const adaptAllMethods = () => {
  const adapted = {};
  Object.keys(fs$f).forEach((key) => {
    if (isCallbackMethod(key)) {
      if (key === "exists") {
        adapted.exists = () => {
          throw new Error("fs.exists() is deprecated");
        };
      } else {
        adapted[key] = adaptMethod(key);
      }
    } else {
      adapted[key] = fs$f[key];
    }
  });
  return adapted;
};
var fs_1 = adaptAllMethods();
var write$4 = {};
const prettyPrintTypes = (types2) => {
  const addArticle = (str) => {
    const vowels = ["a", "e", "i", "o", "u"];
    if (vowels.indexOf(str[0]) !== -1) {
      return `an ${str}`;
    }
    return `a ${str}`;
  };
  return types2.map(addArticle).join(" or ");
};
const isArrayOfNotation = (typeDefinition) => {
  return /array of /.test(typeDefinition);
};
const extractTypeFromArrayOfNotation = (typeDefinition) => {
  return typeDefinition.split(" of ")[1];
};
const isValidTypeDefinition = (typeStr) => {
  if (isArrayOfNotation(typeStr)) {
    return isValidTypeDefinition(extractTypeFromArrayOfNotation(typeStr));
  }
  return [
    "string",
    "number",
    "boolean",
    "array",
    "object",
    "buffer",
    "null",
    "undefined",
    "function"
  ].some((validType) => {
    return validType === typeStr;
  });
};
const detectType = (value) => {
  if (value === null) {
    return "null";
  }
  if (Array.isArray(value)) {
    return "array";
  }
  if (Buffer.isBuffer(value)) {
    return "buffer";
  }
  return typeof value;
};
const onlyUniqueValuesInArrayFilter = (value, index, self2) => {
  return self2.indexOf(value) === index;
};
const detectTypeDeep = (value) => {
  let type = detectType(value);
  let typesInArray;
  if (type === "array") {
    typesInArray = value.map((element) => {
      return detectType(element);
    }).filter(onlyUniqueValuesInArrayFilter);
    type += ` of ${typesInArray.join(", ")}`;
  }
  return type;
};
const validateArray = (argumentValue, typeToCheck) => {
  const allowedTypeInArray = extractTypeFromArrayOfNotation(typeToCheck);
  if (detectType(argumentValue) !== "array") {
    return false;
  }
  return argumentValue.every((element) => {
    return detectType(element) === allowedTypeInArray;
  });
};
const validateArgument = (methodName, argumentName, argumentValue, argumentMustBe) => {
  const isOneOfAllowedTypes = argumentMustBe.some((type) => {
    if (!isValidTypeDefinition(type)) {
      throw new Error(`Unknown type "${type}"`);
    }
    if (isArrayOfNotation(type)) {
      return validateArray(argumentValue, type);
    }
    return type === detectType(argumentValue);
  });
  if (!isOneOfAllowedTypes) {
    throw new Error(
      `Argument "${argumentName}" passed to ${methodName} must be ${prettyPrintTypes(
        argumentMustBe
      )}. Received ${detectTypeDeep(argumentValue)}`
    );
  }
};
const validateOptions = (methodName, optionsObjName, obj, allowedOptions) => {
  if (obj !== void 0) {
    validateArgument(methodName, optionsObjName, obj, ["object"]);
    Object.keys(obj).forEach((key) => {
      const argName = `${optionsObjName}.${key}`;
      if (allowedOptions[key] !== void 0) {
        validateArgument(methodName, argName, obj[key], allowedOptions[key]);
      } else {
        throw new Error(
          `Unknown argument "${argName}" passed to ${methodName}`
        );
      }
    });
  }
};
var validate$g = {
  argument: validateArgument,
  options: validateOptions
};
var dir$6 = {};
var mode = {};
mode.normalizeFileMode = (mode2) => {
  let modeAsString;
  if (typeof mode2 === "number") {
    modeAsString = mode2.toString(8);
  } else {
    modeAsString = mode2;
  }
  return modeAsString.substring(modeAsString.length - 3);
};
var remove$3 = {};
const fs$e = fs_1;
const validate$f = validate$g;
const validateInput$f = (methodName, path2) => {
  const methodSignature = `${methodName}([path])`;
  validate$f.argument(methodSignature, "path", path2, ["string", "undefined"]);
};
const removeSync = (path2) => {
  fs$e.rmSync(path2, {
    recursive: true,
    force: true,
    maxRetries: 3
  });
};
const removeAsync = (path2) => {
  return fs$e.rm(path2, {
    recursive: true,
    force: true,
    maxRetries: 3
  });
};
remove$3.validateInput = validateInput$f;
remove$3.sync = removeSync;
remove$3.async = removeAsync;
const pathUtil$b = require$$0$2;
const fs$d = fs_1;
const modeUtil$1 = mode;
const validate$e = validate$g;
const remove$2 = remove$3;
const validateInput$e = (methodName, path2, criteria) => {
  const methodSignature = `${methodName}(path, [criteria])`;
  validate$e.argument(methodSignature, "path", path2, ["string"]);
  validate$e.options(methodSignature, "criteria", criteria, {
    empty: ["boolean"],
    mode: ["string", "number"]
  });
};
const getCriteriaDefaults$1 = (passedCriteria) => {
  const criteria = passedCriteria || {};
  if (typeof criteria.empty !== "boolean") {
    criteria.empty = false;
  }
  if (criteria.mode !== void 0) {
    criteria.mode = modeUtil$1.normalizeFileMode(criteria.mode);
  }
  return criteria;
};
const generatePathOccupiedByNotDirectoryError = (path2) => {
  return new Error(
    `Path ${path2} exists but is not a directory. Halting jetpack.dir() call for safety reasons.`
  );
};
const checkWhatAlreadyOccupiesPathSync$1 = (path2) => {
  let stat2;
  try {
    stat2 = fs$d.statSync(path2);
  } catch (err2) {
    if (err2.code !== "ENOENT") {
      throw err2;
    }
  }
  if (stat2 && !stat2.isDirectory()) {
    throw generatePathOccupiedByNotDirectoryError(path2);
  }
  return stat2;
};
const createBrandNewDirectorySync = (path2, opts) => {
  const options = opts || {};
  try {
    fs$d.mkdirSync(path2, options.mode);
  } catch (err2) {
    if (err2.code === "ENOENT") {
      createBrandNewDirectorySync(pathUtil$b.dirname(path2), options);
      fs$d.mkdirSync(path2, options.mode);
    } else if (err2.code === "EEXIST")
      ;
    else {
      throw err2;
    }
  }
};
const checkExistingDirectoryFulfillsCriteriaSync = (path2, stat2, criteria) => {
  const checkMode = () => {
    const mode2 = modeUtil$1.normalizeFileMode(stat2.mode);
    if (criteria.mode !== void 0 && criteria.mode !== mode2) {
      fs$d.chmodSync(path2, criteria.mode);
    }
  };
  const checkEmptiness = () => {
    if (criteria.empty) {
      const list2 = fs$d.readdirSync(path2);
      list2.forEach((filename) => {
        remove$2.sync(pathUtil$b.resolve(path2, filename));
      });
    }
  };
  checkMode();
  checkEmptiness();
};
const dirSync = (path2, passedCriteria) => {
  const criteria = getCriteriaDefaults$1(passedCriteria);
  const stat2 = checkWhatAlreadyOccupiesPathSync$1(path2);
  if (stat2) {
    checkExistingDirectoryFulfillsCriteriaSync(path2, stat2, criteria);
  } else {
    createBrandNewDirectorySync(path2, criteria);
  }
};
const checkWhatAlreadyOccupiesPathAsync$1 = (path2) => {
  return new Promise((resolve, reject) => {
    fs$d.stat(path2).then((stat2) => {
      if (stat2.isDirectory()) {
        resolve(stat2);
      } else {
        reject(generatePathOccupiedByNotDirectoryError(path2));
      }
    }).catch((err2) => {
      if (err2.code === "ENOENT") {
        resolve(void 0);
      } else {
        reject(err2);
      }
    });
  });
};
const emptyAsync = (path2) => {
  return new Promise((resolve, reject) => {
    fs$d.readdir(path2).then((list2) => {
      const doOne = (index) => {
        if (index === list2.length) {
          resolve();
        } else {
          const subPath = pathUtil$b.resolve(path2, list2[index]);
          remove$2.async(subPath).then(() => {
            doOne(index + 1);
          });
        }
      };
      doOne(0);
    }).catch(reject);
  });
};
const checkExistingDirectoryFulfillsCriteriaAsync = (path2, stat2, criteria) => {
  return new Promise((resolve, reject) => {
    const checkMode = () => {
      const mode2 = modeUtil$1.normalizeFileMode(stat2.mode);
      if (criteria.mode !== void 0 && criteria.mode !== mode2) {
        return fs$d.chmod(path2, criteria.mode);
      }
      return Promise.resolve();
    };
    const checkEmptiness = () => {
      if (criteria.empty) {
        return emptyAsync(path2);
      }
      return Promise.resolve();
    };
    checkMode().then(checkEmptiness).then(resolve, reject);
  });
};
const createBrandNewDirectoryAsync = (path2, opts) => {
  const options = opts || {};
  return new Promise((resolve, reject) => {
    fs$d.mkdir(path2, options.mode).then(resolve).catch((err2) => {
      if (err2.code === "ENOENT") {
        createBrandNewDirectoryAsync(pathUtil$b.dirname(path2), options).then(() => {
          return fs$d.mkdir(path2, options.mode);
        }).then(resolve).catch((err22) => {
          if (err22.code === "EEXIST") {
            resolve();
          } else {
            reject(err22);
          }
        });
      } else if (err2.code === "EEXIST") {
        resolve();
      } else {
        reject(err2);
      }
    });
  });
};
const dirAsync = (path2, passedCriteria) => {
  return new Promise((resolve, reject) => {
    const criteria = getCriteriaDefaults$1(passedCriteria);
    checkWhatAlreadyOccupiesPathAsync$1(path2).then((stat2) => {
      if (stat2 !== void 0) {
        return checkExistingDirectoryFulfillsCriteriaAsync(
          path2,
          stat2,
          criteria
        );
      }
      return createBrandNewDirectoryAsync(path2, criteria);
    }).then(resolve, reject);
  });
};
dir$6.validateInput = validateInput$e;
dir$6.sync = dirSync;
dir$6.createSync = createBrandNewDirectorySync;
dir$6.async = dirAsync;
dir$6.createAsync = createBrandNewDirectoryAsync;
const pathUtil$a = require$$0$2;
const fs$c = fs_1;
const validate$d = validate$g;
const dir$5 = dir$6;
const validateInput$d = (methodName, path2, data, options) => {
  const methodSignature = `${methodName}(path, data, [options])`;
  validate$d.argument(methodSignature, "path", path2, ["string"]);
  validate$d.argument(methodSignature, "data", data, [
    "string",
    "buffer",
    "object",
    "array"
  ]);
  validate$d.options(methodSignature, "options", options, {
    mode: ["string", "number"],
    atomic: ["boolean"],
    jsonIndent: ["number"]
  });
};
const newExt = ".__new__";
const serializeToJsonMaybe = (data, jsonIndent) => {
  let indent = jsonIndent;
  if (typeof indent !== "number") {
    indent = 2;
  }
  if (typeof data === "object" && !Buffer.isBuffer(data) && data !== null) {
    return JSON.stringify(data, null, indent);
  }
  return data;
};
const writeFileSync = (path2, data, options) => {
  try {
    fs$c.writeFileSync(path2, data, options);
  } catch (err2) {
    if (err2.code === "ENOENT") {
      dir$5.createSync(pathUtil$a.dirname(path2));
      fs$c.writeFileSync(path2, data, options);
    } else {
      throw err2;
    }
  }
};
const writeAtomicSync = (path2, data, options) => {
  writeFileSync(path2 + newExt, data, options);
  fs$c.renameSync(path2 + newExt, path2);
};
const writeSync = (path2, data, options) => {
  const opts = options || {};
  const processedData = serializeToJsonMaybe(data, opts.jsonIndent);
  let writeStrategy = writeFileSync;
  if (opts.atomic) {
    writeStrategy = writeAtomicSync;
  }
  writeStrategy(path2, processedData, { mode: opts.mode });
};
const writeFileAsync = (path2, data, options) => {
  return new Promise((resolve, reject) => {
    fs$c.writeFile(path2, data, options).then(resolve).catch((err2) => {
      if (err2.code === "ENOENT") {
        dir$5.createAsync(pathUtil$a.dirname(path2)).then(() => {
          return fs$c.writeFile(path2, data, options);
        }).then(resolve, reject);
      } else {
        reject(err2);
      }
    });
  });
};
const writeAtomicAsync = (path2, data, options) => {
  return new Promise((resolve, reject) => {
    writeFileAsync(path2 + newExt, data, options).then(() => {
      return fs$c.rename(path2 + newExt, path2);
    }).then(resolve, reject);
  });
};
const writeAsync = (path2, data, options) => {
  const opts = options || {};
  const processedData = serializeToJsonMaybe(data, opts.jsonIndent);
  let writeStrategy = writeFileAsync;
  if (opts.atomic) {
    writeStrategy = writeAtomicAsync;
  }
  return writeStrategy(path2, processedData, { mode: opts.mode });
};
write$4.validateInput = validateInput$d;
write$4.sync = writeSync;
write$4.async = writeAsync;
const fs$b = fs_1;
const write$3 = write$4;
const validate$c = validate$g;
const validateInput$c = (methodName, path2, data, options) => {
  const methodSignature = `${methodName}(path, data, [options])`;
  validate$c.argument(methodSignature, "path", path2, ["string"]);
  validate$c.argument(methodSignature, "data", data, ["string", "buffer"]);
  validate$c.options(methodSignature, "options", options, {
    mode: ["string", "number"]
  });
};
const appendSync = (path2, data, options) => {
  try {
    fs$b.appendFileSync(path2, data, options);
  } catch (err2) {
    if (err2.code === "ENOENT") {
      write$3.sync(path2, data, options);
    } else {
      throw err2;
    }
  }
};
const appendAsync = (path2, data, options) => {
  return new Promise((resolve, reject) => {
    fs$b.appendFile(path2, data, options).then(resolve).catch((err2) => {
      if (err2.code === "ENOENT") {
        write$3.async(path2, data, options).then(resolve, reject);
      } else {
        reject(err2);
      }
    });
  });
};
append$1.validateInput = validateInput$c;
append$1.sync = appendSync;
append$1.async = appendAsync;
var file$1 = {};
const fs$a = fs_1;
const modeUtil = mode;
const validate$b = validate$g;
const write$2 = write$4;
const validateInput$b = (methodName, path2, criteria) => {
  const methodSignature = `${methodName}(path, [criteria])`;
  validate$b.argument(methodSignature, "path", path2, ["string"]);
  validate$b.options(methodSignature, "criteria", criteria, {
    content: ["string", "buffer", "object", "array"],
    jsonIndent: ["number"],
    mode: ["string", "number"]
  });
};
const getCriteriaDefaults = (passedCriteria) => {
  const criteria = passedCriteria || {};
  if (criteria.mode !== void 0) {
    criteria.mode = modeUtil.normalizeFileMode(criteria.mode);
  }
  return criteria;
};
const generatePathOccupiedByNotFileError = (path2) => {
  return new Error(
    `Path ${path2} exists but is not a file. Halting jetpack.file() call for safety reasons.`
  );
};
const checkWhatAlreadyOccupiesPathSync = (path2) => {
  let stat2;
  try {
    stat2 = fs$a.statSync(path2);
  } catch (err2) {
    if (err2.code !== "ENOENT") {
      throw err2;
    }
  }
  if (stat2 && !stat2.isFile()) {
    throw generatePathOccupiedByNotFileError(path2);
  }
  return stat2;
};
const checkExistingFileFulfillsCriteriaSync = (path2, stat2, criteria) => {
  const mode2 = modeUtil.normalizeFileMode(stat2.mode);
  const checkContent = () => {
    if (criteria.content !== void 0) {
      write$2.sync(path2, criteria.content, {
        mode: mode2,
        jsonIndent: criteria.jsonIndent
      });
      return true;
    }
    return false;
  };
  const checkMode = () => {
    if (criteria.mode !== void 0 && criteria.mode !== mode2) {
      fs$a.chmodSync(path2, criteria.mode);
    }
  };
  const contentReplaced = checkContent();
  if (!contentReplaced) {
    checkMode();
  }
};
const createBrandNewFileSync = (path2, criteria) => {
  let content = "";
  if (criteria.content !== void 0) {
    content = criteria.content;
  }
  write$2.sync(path2, content, {
    mode: criteria.mode,
    jsonIndent: criteria.jsonIndent
  });
};
const fileSync = (path2, passedCriteria) => {
  const criteria = getCriteriaDefaults(passedCriteria);
  const stat2 = checkWhatAlreadyOccupiesPathSync(path2);
  if (stat2 !== void 0) {
    checkExistingFileFulfillsCriteriaSync(path2, stat2, criteria);
  } else {
    createBrandNewFileSync(path2, criteria);
  }
};
const checkWhatAlreadyOccupiesPathAsync = (path2) => {
  return new Promise((resolve, reject) => {
    fs$a.stat(path2).then((stat2) => {
      if (stat2.isFile()) {
        resolve(stat2);
      } else {
        reject(generatePathOccupiedByNotFileError(path2));
      }
    }).catch((err2) => {
      if (err2.code === "ENOENT") {
        resolve(void 0);
      } else {
        reject(err2);
      }
    });
  });
};
const checkExistingFileFulfillsCriteriaAsync = (path2, stat2, criteria) => {
  const mode2 = modeUtil.normalizeFileMode(stat2.mode);
  const checkContent = () => {
    return new Promise((resolve, reject) => {
      if (criteria.content !== void 0) {
        write$2.async(path2, criteria.content, {
          mode: mode2,
          jsonIndent: criteria.jsonIndent
        }).then(() => {
          resolve(true);
        }).catch(reject);
      } else {
        resolve(false);
      }
    });
  };
  const checkMode = () => {
    if (criteria.mode !== void 0 && criteria.mode !== mode2) {
      return fs$a.chmod(path2, criteria.mode);
    }
    return void 0;
  };
  return checkContent().then((contentReplaced) => {
    if (!contentReplaced) {
      return checkMode();
    }
    return void 0;
  });
};
const createBrandNewFileAsync = (path2, criteria) => {
  let content = "";
  if (criteria.content !== void 0) {
    content = criteria.content;
  }
  return write$2.async(path2, content, {
    mode: criteria.mode,
    jsonIndent: criteria.jsonIndent
  });
};
const fileAsync = (path2, passedCriteria) => {
  return new Promise((resolve, reject) => {
    const criteria = getCriteriaDefaults(passedCriteria);
    checkWhatAlreadyOccupiesPathAsync(path2).then((stat2) => {
      if (stat2 !== void 0) {
        return checkExistingFileFulfillsCriteriaAsync(path2, stat2, criteria);
      }
      return createBrandNewFileAsync(path2, criteria);
    }).then(resolve, reject);
  });
};
file$1.validateInput = validateInput$b;
file$1.sync = fileSync;
file$1.async = fileAsync;
var find$1 = {};
var tree_walker = {};
var inspect$5 = {};
const crypto$2 = require$$0$6;
const pathUtil$9 = require$$0$2;
const fs$9 = fs_1;
const validate$a = validate$g;
const supportedChecksumAlgorithms = ["md5", "sha1", "sha256", "sha512"];
const symlinkOptions = ["report", "follow"];
const validateInput$a = (methodName, path2, options) => {
  const methodSignature = `${methodName}(path, [options])`;
  validate$a.argument(methodSignature, "path", path2, ["string"]);
  validate$a.options(methodSignature, "options", options, {
    checksum: ["string"],
    mode: ["boolean"],
    times: ["boolean"],
    absolutePath: ["boolean"],
    symlinks: ["string"]
  });
  if (options && options.checksum !== void 0 && supportedChecksumAlgorithms.indexOf(options.checksum) === -1) {
    throw new Error(
      `Argument "options.checksum" passed to ${methodSignature} must have one of values: ${supportedChecksumAlgorithms.join(
        ", "
      )}`
    );
  }
  if (options && options.symlinks !== void 0 && symlinkOptions.indexOf(options.symlinks) === -1) {
    throw new Error(
      `Argument "options.symlinks" passed to ${methodSignature} must have one of values: ${symlinkOptions.join(
        ", "
      )}`
    );
  }
};
const createInspectObj = (path2, options, stat2) => {
  const obj = {};
  obj.name = pathUtil$9.basename(path2);
  if (stat2.isFile()) {
    obj.type = "file";
    obj.size = stat2.size;
  } else if (stat2.isDirectory()) {
    obj.type = "dir";
  } else if (stat2.isSymbolicLink()) {
    obj.type = "symlink";
  } else {
    obj.type = "other";
  }
  if (options.mode) {
    obj.mode = stat2.mode;
  }
  if (options.times) {
    obj.accessTime = stat2.atime;
    obj.modifyTime = stat2.mtime;
    obj.changeTime = stat2.ctime;
    obj.birthTime = stat2.birthtime;
  }
  if (options.absolutePath) {
    obj.absolutePath = path2;
  }
  return obj;
};
const fileChecksum = (path2, algo) => {
  const hash = crypto$2.createHash(algo);
  const data = fs$9.readFileSync(path2);
  hash.update(data);
  return hash.digest("hex");
};
const addExtraFieldsSync = (path2, inspectObj, options) => {
  if (inspectObj.type === "file" && options.checksum) {
    inspectObj[options.checksum] = fileChecksum(path2, options.checksum);
  } else if (inspectObj.type === "symlink") {
    inspectObj.pointsAt = fs$9.readlinkSync(path2);
  }
};
const inspectSync = (path2, options) => {
  let statOperation = fs$9.lstatSync;
  let stat2;
  const opts = options || {};
  if (opts.symlinks === "follow") {
    statOperation = fs$9.statSync;
  }
  try {
    stat2 = statOperation(path2);
  } catch (err2) {
    if (err2.code === "ENOENT") {
      return void 0;
    }
    throw err2;
  }
  const inspectObj = createInspectObj(path2, opts, stat2);
  addExtraFieldsSync(path2, inspectObj, opts);
  return inspectObj;
};
const fileChecksumAsync = (path2, algo) => {
  return new Promise((resolve, reject) => {
    const hash = crypto$2.createHash(algo);
    const s = fs$9.createReadStream(path2);
    s.on("data", (data) => {
      hash.update(data);
    });
    s.on("end", () => {
      resolve(hash.digest("hex"));
    });
    s.on("error", reject);
  });
};
const addExtraFieldsAsync = (path2, inspectObj, options) => {
  if (inspectObj.type === "file" && options.checksum) {
    return fileChecksumAsync(path2, options.checksum).then((checksum) => {
      inspectObj[options.checksum] = checksum;
      return inspectObj;
    });
  } else if (inspectObj.type === "symlink") {
    return fs$9.readlink(path2).then((linkPath) => {
      inspectObj.pointsAt = linkPath;
      return inspectObj;
    });
  }
  return Promise.resolve(inspectObj);
};
const inspectAsync = (path2, options) => {
  return new Promise((resolve, reject) => {
    let statOperation = fs$9.lstat;
    const opts = options || {};
    if (opts.symlinks === "follow") {
      statOperation = fs$9.stat;
    }
    statOperation(path2).then((stat2) => {
      const inspectObj = createInspectObj(path2, opts, stat2);
      addExtraFieldsAsync(path2, inspectObj, opts).then(resolve, reject);
    }).catch((err2) => {
      if (err2.code === "ENOENT") {
        resolve(void 0);
      } else {
        reject(err2);
      }
    });
  });
};
inspect$5.supportedChecksumAlgorithms = supportedChecksumAlgorithms;
inspect$5.symlinkOptions = symlinkOptions;
inspect$5.validateInput = validateInput$a;
inspect$5.sync = inspectSync;
inspect$5.async = inspectAsync;
var list$1 = {};
const fs$8 = fs_1;
const validate$9 = validate$g;
const validateInput$9 = (methodName, path2) => {
  const methodSignature = `${methodName}(path)`;
  validate$9.argument(methodSignature, "path", path2, ["string", "undefined"]);
};
const listSync = (path2) => {
  try {
    return fs$8.readdirSync(path2);
  } catch (err2) {
    if (err2.code === "ENOENT") {
      return void 0;
    }
    throw err2;
  }
};
const listAsync = (path2) => {
  return new Promise((resolve, reject) => {
    fs$8.readdir(path2).then((list2) => {
      resolve(list2);
    }).catch((err2) => {
      if (err2.code === "ENOENT") {
        resolve(void 0);
      } else {
        reject(err2);
      }
    });
  });
};
list$1.validateInput = validateInput$9;
list$1.sync = listSync;
list$1.async = listAsync;
const fs$7 = require$$0$1;
const pathUtil$8 = require$$0$2;
const inspect$4 = inspect$5;
const fileType = (dirent) => {
  if (dirent.isDirectory()) {
    return "dir";
  }
  if (dirent.isFile()) {
    return "file";
  }
  if (dirent.isSymbolicLink()) {
    return "symlink";
  }
  return "other";
};
const initialWalkSync = (path2, options, callback) => {
  if (options.maxLevelsDeep === void 0) {
    options.maxLevelsDeep = Infinity;
  }
  const performInspectOnEachNode = options.inspectOptions !== void 0;
  if (options.symlinks) {
    if (options.inspectOptions === void 0) {
      options.inspectOptions = { symlinks: options.symlinks };
    } else {
      options.inspectOptions.symlinks = options.symlinks;
    }
  }
  const walkSync = (path3, currentLevel) => {
    fs$7.readdirSync(path3, { withFileTypes: true }).forEach((direntItem) => {
      const withFileTypesNotSupported = typeof direntItem === "string";
      let fileItemPath;
      if (withFileTypesNotSupported) {
        fileItemPath = pathUtil$8.join(path3, direntItem);
      } else {
        fileItemPath = pathUtil$8.join(path3, direntItem.name);
      }
      let fileItem;
      if (performInspectOnEachNode) {
        fileItem = inspect$4.sync(fileItemPath, options.inspectOptions);
      } else if (withFileTypesNotSupported) {
        const inspectObject = inspect$4.sync(
          fileItemPath,
          options.inspectOptions
        );
        fileItem = { name: inspectObject.name, type: inspectObject.type };
      } else {
        const type = fileType(direntItem);
        if (type === "symlink" && options.symlinks === "follow") {
          const symlinkPointsTo = fs$7.statSync(fileItemPath);
          fileItem = { name: direntItem.name, type: fileType(symlinkPointsTo) };
        } else {
          fileItem = { name: direntItem.name, type };
        }
      }
      if (fileItem !== void 0) {
        callback(fileItemPath, fileItem);
        if (fileItem.type === "dir" && currentLevel < options.maxLevelsDeep) {
          walkSync(fileItemPath, currentLevel + 1);
        }
      }
    });
  };
  const item = inspect$4.sync(path2, options.inspectOptions);
  if (item) {
    if (performInspectOnEachNode) {
      callback(path2, item);
    } else {
      callback(path2, { name: item.name, type: item.type });
    }
    if (item.type === "dir") {
      walkSync(path2, 1);
    }
  } else {
    callback(path2, void 0);
  }
};
const maxConcurrentOperations = 5;
const initialWalkAsync = (path2, options, callback, doneCallback) => {
  if (options.maxLevelsDeep === void 0) {
    options.maxLevelsDeep = Infinity;
  }
  const performInspectOnEachNode = options.inspectOptions !== void 0;
  if (options.symlinks) {
    if (options.inspectOptions === void 0) {
      options.inspectOptions = { symlinks: options.symlinks };
    } else {
      options.inspectOptions.symlinks = options.symlinks;
    }
  }
  const concurrentOperationsQueue = [];
  let nowDoingConcurrentOperations = 0;
  const checkConcurrentOperations = () => {
    if (concurrentOperationsQueue.length === 0 && nowDoingConcurrentOperations === 0) {
      doneCallback();
    } else if (concurrentOperationsQueue.length > 0 && nowDoingConcurrentOperations < maxConcurrentOperations) {
      const operation = concurrentOperationsQueue.pop();
      nowDoingConcurrentOperations += 1;
      operation();
    }
  };
  const whenConcurrencySlotAvailable = (operation) => {
    concurrentOperationsQueue.push(operation);
    checkConcurrentOperations();
  };
  const concurrentOperationDone = () => {
    nowDoingConcurrentOperations -= 1;
    checkConcurrentOperations();
  };
  const walkAsync = (path3, currentLevel) => {
    const goDeeperIfDir = (fileItemPath, fileItem) => {
      if (fileItem.type === "dir" && currentLevel < options.maxLevelsDeep) {
        walkAsync(fileItemPath, currentLevel + 1);
      }
    };
    whenConcurrencySlotAvailable(() => {
      fs$7.readdir(path3, { withFileTypes: true }, (err2, files) => {
        if (err2) {
          doneCallback(err2);
        } else {
          files.forEach((direntItem) => {
            const withFileTypesNotSupported = typeof direntItem === "string";
            let fileItemPath;
            if (withFileTypesNotSupported) {
              fileItemPath = pathUtil$8.join(path3, direntItem);
            } else {
              fileItemPath = pathUtil$8.join(path3, direntItem.name);
            }
            if (performInspectOnEachNode || withFileTypesNotSupported) {
              whenConcurrencySlotAvailable(() => {
                inspect$4.async(fileItemPath, options.inspectOptions).then((fileItem) => {
                  if (fileItem !== void 0) {
                    if (performInspectOnEachNode) {
                      callback(fileItemPath, fileItem);
                    } else {
                      callback(fileItemPath, {
                        name: fileItem.name,
                        type: fileItem.type
                      });
                    }
                    goDeeperIfDir(fileItemPath, fileItem);
                  }
                  concurrentOperationDone();
                }).catch((err3) => {
                  doneCallback(err3);
                });
              });
            } else {
              const type = fileType(direntItem);
              if (type === "symlink" && options.symlinks === "follow") {
                whenConcurrencySlotAvailable(() => {
                  fs$7.stat(fileItemPath, (err3, symlinkPointsTo) => {
                    if (err3) {
                      doneCallback(err3);
                    } else {
                      const fileItem = {
                        name: direntItem.name,
                        type: fileType(symlinkPointsTo)
                      };
                      callback(fileItemPath, fileItem);
                      goDeeperIfDir(fileItemPath, fileItem);
                      concurrentOperationDone();
                    }
                  });
                });
              } else {
                const fileItem = { name: direntItem.name, type };
                callback(fileItemPath, fileItem);
                goDeeperIfDir(fileItemPath, fileItem);
              }
            }
          });
          concurrentOperationDone();
        }
      });
    });
  };
  inspect$4.async(path2, options.inspectOptions).then((item) => {
    if (item) {
      if (performInspectOnEachNode) {
        callback(path2, item);
      } else {
        callback(path2, { name: item.name, type: item.type });
      }
      if (item.type === "dir") {
        walkAsync(path2, 1);
      } else {
        doneCallback();
      }
    } else {
      callback(path2, void 0);
      doneCallback();
    }
  }).catch((err2) => {
    doneCallback(err2);
  });
};
tree_walker.sync = initialWalkSync;
tree_walker.async = initialWalkAsync;
var matcher$2 = {};
const isWindows = typeof process === "object" && process && process.platform === "win32";
var path$1 = isWindows ? { sep: "\\" } : { sep: "/" };
const minimatch = minimatch_1 = (p, pattern2, options = {}) => {
  assertValidPattern(pattern2);
  if (!options.nocomment && pattern2.charAt(0) === "#") {
    return false;
  }
  return new Minimatch$1(pattern2, options).match(p);
};
var minimatch_1 = minimatch;
const path = path$1;
minimatch.sep = path.sep;
const GLOBSTAR = Symbol("globstar **");
minimatch.GLOBSTAR = GLOBSTAR;
const expand = braceExpansion;
const plTypes = {
  "!": { open: "(?:(?!(?:", close: "))[^/]*?)" },
  "?": { open: "(?:", close: ")?" },
  "+": { open: "(?:", close: ")+" },
  "*": { open: "(?:", close: ")*" },
  "@": { open: "(?:", close: ")" }
};
const qmark = "[^/]";
const star = qmark + "*?";
const twoStarDot = "(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?";
const twoStarNoDot = "(?:(?!(?:\\/|^)\\.).)*?";
const charSet = (s) => s.split("").reduce((set, c2) => {
  set[c2] = true;
  return set;
}, {});
const reSpecials = charSet("().*{}+?[]^$\\!");
const addPatternStartSet = charSet("[.(");
const slashSplit = /\/+/;
minimatch.filter = (pattern2, options = {}) => (p, i, list2) => minimatch(p, pattern2, options);
const ext = (a, b = {}) => {
  const t = {};
  Object.keys(a).forEach((k) => t[k] = a[k]);
  Object.keys(b).forEach((k) => t[k] = b[k]);
  return t;
};
minimatch.defaults = (def) => {
  if (!def || typeof def !== "object" || !Object.keys(def).length) {
    return minimatch;
  }
  const orig = minimatch;
  const m = (p, pattern2, options) => orig(p, pattern2, ext(def, options));
  m.Minimatch = class Minimatch extends orig.Minimatch {
    constructor(pattern2, options) {
      super(pattern2, ext(def, options));
    }
  };
  m.Minimatch.defaults = (options) => orig.defaults(ext(def, options)).Minimatch;
  m.filter = (pattern2, options) => orig.filter(pattern2, ext(def, options));
  m.defaults = (options) => orig.defaults(ext(def, options));
  m.makeRe = (pattern2, options) => orig.makeRe(pattern2, ext(def, options));
  m.braceExpand = (pattern2, options) => orig.braceExpand(pattern2, ext(def, options));
  m.match = (list2, pattern2, options) => orig.match(list2, pattern2, ext(def, options));
  return m;
};
minimatch.braceExpand = (pattern2, options) => braceExpand(pattern2, options);
const braceExpand = (pattern2, options = {}) => {
  assertValidPattern(pattern2);
  if (options.nobrace || !/\{(?:(?!\{).)*\}/.test(pattern2)) {
    return [pattern2];
  }
  return expand(pattern2);
};
const MAX_PATTERN_LENGTH = 1024 * 64;
const assertValidPattern = (pattern2) => {
  if (typeof pattern2 !== "string") {
    throw new TypeError("invalid pattern");
  }
  if (pattern2.length > MAX_PATTERN_LENGTH) {
    throw new TypeError("pattern is too long");
  }
};
const SUBPARSE = Symbol("subparse");
minimatch.makeRe = (pattern2, options) => new Minimatch$1(pattern2, options || {}).makeRe();
minimatch.match = (list2, pattern2, options = {}) => {
  const mm = new Minimatch$1(pattern2, options);
  list2 = list2.filter((f) => mm.match(f));
  if (mm.options.nonull && !list2.length) {
    list2.push(pattern2);
  }
  return list2;
};
const globUnescape = (s) => s.replace(/\\(.)/g, "$1");
const charUnescape = (s) => s.replace(/\\([^-\]])/g, "$1");
const regExpEscape = (s) => s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
const braExpEscape = (s) => s.replace(/[[\]\\]/g, "\\$&");
let Minimatch$1 = class Minimatch {
  constructor(pattern2, options) {
    assertValidPattern(pattern2);
    if (!options)
      options = {};
    this.options = options;
    this.set = [];
    this.pattern = pattern2;
    this.windowsPathsNoEscape = !!options.windowsPathsNoEscape || options.allowWindowsEscape === false;
    if (this.windowsPathsNoEscape) {
      this.pattern = this.pattern.replace(/\\/g, "/");
    }
    this.regexp = null;
    this.negate = false;
    this.comment = false;
    this.empty = false;
    this.partial = !!options.partial;
    this.make();
  }
  debug() {
  }
  make() {
    const pattern2 = this.pattern;
    const options = this.options;
    if (!options.nocomment && pattern2.charAt(0) === "#") {
      this.comment = true;
      return;
    }
    if (!pattern2) {
      this.empty = true;
      return;
    }
    this.parseNegate();
    let set = this.globSet = this.braceExpand();
    if (options.debug)
      this.debug = (...args) => console.error(...args);
    this.debug(this.pattern, set);
    set = this.globParts = set.map((s) => s.split(slashSplit));
    this.debug(this.pattern, set);
    set = set.map((s, si, set2) => s.map(this.parse, this));
    this.debug(this.pattern, set);
    set = set.filter((s) => s.indexOf(false) === -1);
    this.debug(this.pattern, set);
    this.set = set;
  }
  parseNegate() {
    if (this.options.nonegate)
      return;
    const pattern2 = this.pattern;
    let negate = false;
    let negateOffset = 0;
    for (let i = 0; i < pattern2.length && pattern2.charAt(i) === "!"; i++) {
      negate = !negate;
      negateOffset++;
    }
    if (negateOffset)
      this.pattern = pattern2.slice(negateOffset);
    this.negate = negate;
  }
  // set partial to true to test if, for example,
  // "/a/b" matches the start of "/*/b/*/d"
  // Partial means, if you run out of file before you run
  // out of pattern, then that's fine, as long as all
  // the parts match.
  matchOne(file2, pattern2, partial) {
    var options = this.options;
    this.debug(
      "matchOne",
      { "this": this, file: file2, pattern: pattern2 }
    );
    this.debug("matchOne", file2.length, pattern2.length);
    for (var fi = 0, pi = 0, fl = file2.length, pl = pattern2.length; fi < fl && pi < pl; fi++, pi++) {
      this.debug("matchOne loop");
      var p = pattern2[pi];
      var f = file2[fi];
      this.debug(pattern2, p, f);
      if (p === false)
        return false;
      if (p === GLOBSTAR) {
        this.debug("GLOBSTAR", [pattern2, p, f]);
        var fr = fi;
        var pr = pi + 1;
        if (pr === pl) {
          this.debug("** at the end");
          for (; fi < fl; fi++) {
            if (file2[fi] === "." || file2[fi] === ".." || !options.dot && file2[fi].charAt(0) === ".")
              return false;
          }
          return true;
        }
        while (fr < fl) {
          var swallowee = file2[fr];
          this.debug("\nglobstar while", file2, fr, pattern2, pr, swallowee);
          if (this.matchOne(file2.slice(fr), pattern2.slice(pr), partial)) {
            this.debug("globstar found match!", fr, fl, swallowee);
            return true;
          } else {
            if (swallowee === "." || swallowee === ".." || !options.dot && swallowee.charAt(0) === ".") {
              this.debug("dot detected!", file2, fr, pattern2, pr);
              break;
            }
            this.debug("globstar swallow a segment, and continue");
            fr++;
          }
        }
        if (partial) {
          this.debug("\n>>> no match, partial?", file2, fr, pattern2, pr);
          if (fr === fl)
            return true;
        }
        return false;
      }
      var hit;
      if (typeof p === "string") {
        hit = f === p;
        this.debug("string match", p, f, hit);
      } else {
        hit = f.match(p);
        this.debug("pattern match", p, f, hit);
      }
      if (!hit)
        return false;
    }
    if (fi === fl && pi === pl) {
      return true;
    } else if (fi === fl) {
      return partial;
    } else if (pi === pl) {
      return fi === fl - 1 && file2[fi] === "";
    }
    throw new Error("wtf?");
  }
  braceExpand() {
    return braceExpand(this.pattern, this.options);
  }
  parse(pattern2, isSub) {
    assertValidPattern(pattern2);
    const options = this.options;
    if (pattern2 === "**") {
      if (!options.noglobstar)
        return GLOBSTAR;
      else
        pattern2 = "*";
    }
    if (pattern2 === "")
      return "";
    let re = "";
    let hasMagic2 = false;
    let escaping = false;
    const patternListStack = [];
    const negativeLists = [];
    let stateChar;
    let inClass = false;
    let reClassStart = -1;
    let classStart = -1;
    let cs;
    let pl;
    let sp;
    let dotTravAllowed = pattern2.charAt(0) === ".";
    let dotFileAllowed = options.dot || dotTravAllowed;
    const patternStart = () => dotTravAllowed ? "" : dotFileAllowed ? "(?!(?:^|\\/)\\.{1,2}(?:$|\\/))" : "(?!\\.)";
    const subPatternStart = (p) => p.charAt(0) === "." ? "" : options.dot ? "(?!(?:^|\\/)\\.{1,2}(?:$|\\/))" : "(?!\\.)";
    const clearStateChar = () => {
      if (stateChar) {
        switch (stateChar) {
          case "*":
            re += star;
            hasMagic2 = true;
            break;
          case "?":
            re += qmark;
            hasMagic2 = true;
            break;
          default:
            re += "\\" + stateChar;
            break;
        }
        this.debug("clearStateChar %j %j", stateChar, re);
        stateChar = false;
      }
    };
    for (let i = 0, c2; i < pattern2.length && (c2 = pattern2.charAt(i)); i++) {
      this.debug("%s	%s %s %j", pattern2, i, re, c2);
      if (escaping) {
        if (c2 === "/") {
          return false;
        }
        if (reSpecials[c2]) {
          re += "\\";
        }
        re += c2;
        escaping = false;
        continue;
      }
      switch (c2) {
        case "/": {
          return false;
        }
        case "\\":
          if (inClass && pattern2.charAt(i + 1) === "-") {
            re += c2;
            continue;
          }
          clearStateChar();
          escaping = true;
          continue;
        case "?":
        case "*":
        case "+":
        case "@":
        case "!":
          this.debug("%s	%s %s %j <-- stateChar", pattern2, i, re, c2);
          if (inClass) {
            this.debug("  in class");
            if (c2 === "!" && i === classStart + 1)
              c2 = "^";
            re += c2;
            continue;
          }
          this.debug("call clearStateChar %j", stateChar);
          clearStateChar();
          stateChar = c2;
          if (options.noext)
            clearStateChar();
          continue;
        case "(": {
          if (inClass) {
            re += "(";
            continue;
          }
          if (!stateChar) {
            re += "\\(";
            continue;
          }
          const plEntry = {
            type: stateChar,
            start: i - 1,
            reStart: re.length,
            open: plTypes[stateChar].open,
            close: plTypes[stateChar].close
          };
          this.debug(this.pattern, "	", plEntry);
          patternListStack.push(plEntry);
          re += plEntry.open;
          if (plEntry.start === 0 && plEntry.type !== "!") {
            dotTravAllowed = true;
            re += subPatternStart(pattern2.slice(i + 1));
          }
          this.debug("plType %j %j", stateChar, re);
          stateChar = false;
          continue;
        }
        case ")": {
          const plEntry = patternListStack[patternListStack.length - 1];
          if (inClass || !plEntry) {
            re += "\\)";
            continue;
          }
          patternListStack.pop();
          clearStateChar();
          hasMagic2 = true;
          pl = plEntry;
          re += pl.close;
          if (pl.type === "!") {
            negativeLists.push(Object.assign(pl, { reEnd: re.length }));
          }
          continue;
        }
        case "|": {
          const plEntry = patternListStack[patternListStack.length - 1];
          if (inClass || !plEntry) {
            re += "\\|";
            continue;
          }
          clearStateChar();
          re += "|";
          if (plEntry.start === 0 && plEntry.type !== "!") {
            dotTravAllowed = true;
            re += subPatternStart(pattern2.slice(i + 1));
          }
          continue;
        }
        case "[":
          clearStateChar();
          if (inClass) {
            re += "\\" + c2;
            continue;
          }
          inClass = true;
          classStart = i;
          reClassStart = re.length;
          re += c2;
          continue;
        case "]":
          if (i === classStart + 1 || !inClass) {
            re += "\\" + c2;
            continue;
          }
          cs = pattern2.substring(classStart + 1, i);
          try {
            RegExp("[" + braExpEscape(charUnescape(cs)) + "]");
            re += c2;
          } catch (er) {
            re = re.substring(0, reClassStart) + "(?:$.)";
          }
          hasMagic2 = true;
          inClass = false;
          continue;
        default:
          clearStateChar();
          if (reSpecials[c2] && !(c2 === "^" && inClass)) {
            re += "\\";
          }
          re += c2;
          break;
      }
    }
    if (inClass) {
      cs = pattern2.slice(classStart + 1);
      sp = this.parse(cs, SUBPARSE);
      re = re.substring(0, reClassStart) + "\\[" + sp[0];
      hasMagic2 = hasMagic2 || sp[1];
    }
    for (pl = patternListStack.pop(); pl; pl = patternListStack.pop()) {
      let tail;
      tail = re.slice(pl.reStart + pl.open.length);
      this.debug("setting tail", re, pl);
      tail = tail.replace(/((?:\\{2}){0,64})(\\?)\|/g, (_, $1, $2) => {
        if (!$2) {
          $2 = "\\";
        }
        return $1 + $1 + $2 + "|";
      });
      this.debug("tail=%j\n   %s", tail, tail, pl, re);
      const t = pl.type === "*" ? star : pl.type === "?" ? qmark : "\\" + pl.type;
      hasMagic2 = true;
      re = re.slice(0, pl.reStart) + t + "\\(" + tail;
    }
    clearStateChar();
    if (escaping) {
      re += "\\\\";
    }
    const addPatternStart2 = addPatternStartSet[re.charAt(0)];
    for (let n = negativeLists.length - 1; n > -1; n--) {
      const nl = negativeLists[n];
      const nlBefore = re.slice(0, nl.reStart);
      const nlFirst = re.slice(nl.reStart, nl.reEnd - 8);
      let nlAfter = re.slice(nl.reEnd);
      const nlLast = re.slice(nl.reEnd - 8, nl.reEnd) + nlAfter;
      const closeParensBefore = nlBefore.split(")").length;
      const openParensBefore = nlBefore.split("(").length - closeParensBefore;
      let cleanAfter = nlAfter;
      for (let i = 0; i < openParensBefore; i++) {
        cleanAfter = cleanAfter.replace(/\)[+*?]?/, "");
      }
      nlAfter = cleanAfter;
      const dollar = nlAfter === "" && isSub !== SUBPARSE ? "(?:$|\\/)" : "";
      re = nlBefore + nlFirst + nlAfter + dollar + nlLast;
    }
    if (re !== "" && hasMagic2) {
      re = "(?=.)" + re;
    }
    if (addPatternStart2) {
      re = patternStart() + re;
    }
    if (isSub === SUBPARSE) {
      return [re, hasMagic2];
    }
    if (options.nocase && !hasMagic2) {
      hasMagic2 = pattern2.toUpperCase() !== pattern2.toLowerCase();
    }
    if (!hasMagic2) {
      return globUnescape(pattern2);
    }
    const flags = options.nocase ? "i" : "";
    try {
      return Object.assign(new RegExp("^" + re + "$", flags), {
        _glob: pattern2,
        _src: re
      });
    } catch (er) {
      return new RegExp("$.");
    }
  }
  makeRe() {
    if (this.regexp || this.regexp === false)
      return this.regexp;
    const set = this.set;
    if (!set.length) {
      this.regexp = false;
      return this.regexp;
    }
    const options = this.options;
    const twoStar = options.noglobstar ? star : options.dot ? twoStarDot : twoStarNoDot;
    const flags = options.nocase ? "i" : "";
    let re = set.map((pattern2) => {
      pattern2 = pattern2.map(
        (p) => typeof p === "string" ? regExpEscape(p) : p === GLOBSTAR ? GLOBSTAR : p._src
      ).reduce((set2, p) => {
        if (!(set2[set2.length - 1] === GLOBSTAR && p === GLOBSTAR)) {
          set2.push(p);
        }
        return set2;
      }, []);
      pattern2.forEach((p, i) => {
        if (p !== GLOBSTAR || pattern2[i - 1] === GLOBSTAR) {
          return;
        }
        if (i === 0) {
          if (pattern2.length > 1) {
            pattern2[i + 1] = "(?:\\/|" + twoStar + "\\/)?" + pattern2[i + 1];
          } else {
            pattern2[i] = twoStar;
          }
        } else if (i === pattern2.length - 1) {
          pattern2[i - 1] += "(?:\\/|" + twoStar + ")?";
        } else {
          pattern2[i - 1] += "(?:\\/|\\/" + twoStar + "\\/)" + pattern2[i + 1];
          pattern2[i + 1] = GLOBSTAR;
        }
      });
      return pattern2.filter((p) => p !== GLOBSTAR).join("/");
    }).join("|");
    re = "^(?:" + re + ")$";
    if (this.negate)
      re = "^(?!" + re + ").*$";
    try {
      this.regexp = new RegExp(re, flags);
    } catch (ex) {
      this.regexp = false;
    }
    return this.regexp;
  }
  match(f, partial = this.partial) {
    this.debug("match", f, this.pattern);
    if (this.comment)
      return false;
    if (this.empty)
      return f === "";
    if (f === "/" && partial)
      return true;
    const options = this.options;
    if (path.sep !== "/") {
      f = f.split(path.sep).join("/");
    }
    f = f.split(slashSplit);
    this.debug(this.pattern, "split", f);
    const set = this.set;
    this.debug(this.pattern, "set", set);
    let filename;
    for (let i = f.length - 1; i >= 0; i--) {
      filename = f[i];
      if (filename)
        break;
    }
    for (let i = 0; i < set.length; i++) {
      const pattern2 = set[i];
      let file2 = f;
      if (options.matchBase && pattern2.length === 1) {
        file2 = [filename];
      }
      const hit = this.matchOne(file2, pattern2, partial);
      if (hit) {
        if (options.flipNegate)
          return true;
        return !this.negate;
      }
    }
    if (options.flipNegate)
      return false;
    return this.negate;
  }
  static defaults(def) {
    return minimatch.defaults(def).Minimatch;
  }
};
minimatch.Minimatch = Minimatch$1;
const Minimatch2 = minimatch_1.Minimatch;
const convertPatternToAbsolutePath = (basePath, pattern2) => {
  const hasSlash = pattern2.indexOf("/") !== -1;
  const isAbsolute = /^!?\//.test(pattern2);
  const isNegated = /^!/.test(pattern2);
  let separator;
  if (!isAbsolute && hasSlash) {
    const patternWithoutFirstCharacters = pattern2.replace(/^!/, "").replace(/^\.\//, "");
    if (/\/$/.test(basePath)) {
      separator = "";
    } else {
      separator = "/";
    }
    if (isNegated) {
      return `!${basePath}${separator}${patternWithoutFirstCharacters}`;
    }
    return `${basePath}${separator}${patternWithoutFirstCharacters}`;
  }
  return pattern2;
};
matcher$2.create = (basePath, patterns, ignoreCase) => {
  let normalizedPatterns;
  if (typeof patterns === "string") {
    normalizedPatterns = [patterns];
  } else {
    normalizedPatterns = patterns;
  }
  const matchers = normalizedPatterns.map((pattern2) => {
    return convertPatternToAbsolutePath(basePath, pattern2);
  }).map((pattern2) => {
    return new Minimatch2(pattern2, {
      matchBase: true,
      nocomment: true,
      nocase: ignoreCase || false,
      dot: true,
      windowsPathsNoEscape: true
    });
  });
  const performMatch = (absolutePath) => {
    let mode2 = "matching";
    let weHaveMatch = false;
    let currentMatcher;
    let i;
    for (i = 0; i < matchers.length; i += 1) {
      currentMatcher = matchers[i];
      if (currentMatcher.negate) {
        mode2 = "negation";
        if (i === 0) {
          weHaveMatch = true;
        }
      }
      if (mode2 === "negation" && weHaveMatch && !currentMatcher.match(absolutePath)) {
        return false;
      }
      if (mode2 === "matching" && !weHaveMatch) {
        weHaveMatch = currentMatcher.match(absolutePath);
      }
    }
    return weHaveMatch;
  };
  return performMatch;
};
const pathUtil$7 = require$$0$2;
const treeWalker$2 = tree_walker;
const inspect$3 = inspect$5;
const matcher$1 = matcher$2;
const validate$8 = validate$g;
const validateInput$8 = (methodName, path2, options) => {
  const methodSignature = `${methodName}([path], options)`;
  validate$8.argument(methodSignature, "path", path2, ["string"]);
  validate$8.options(methodSignature, "options", options, {
    matching: ["string", "array of string"],
    filter: ["function"],
    files: ["boolean"],
    directories: ["boolean"],
    recursive: ["boolean"],
    ignoreCase: ["boolean"]
  });
};
const normalizeOptions = (options) => {
  const opts = options || {};
  if (opts.matching === void 0) {
    opts.matching = "*";
  }
  if (opts.files === void 0) {
    opts.files = true;
  }
  if (opts.ignoreCase === void 0) {
    opts.ignoreCase = false;
  }
  if (opts.directories === void 0) {
    opts.directories = false;
  }
  if (opts.recursive === void 0) {
    opts.recursive = true;
  }
  return opts;
};
const processFoundPaths = (foundPaths, cwd) => {
  return foundPaths.map((path2) => {
    return pathUtil$7.relative(cwd, path2);
  });
};
const generatePathDoesntExistError = (path2) => {
  const err2 = new Error(`Path you want to find stuff in doesn't exist ${path2}`);
  err2.code = "ENOENT";
  return err2;
};
const generatePathNotDirectoryError = (path2) => {
  const err2 = new Error(
    `Path you want to find stuff in must be a directory ${path2}`
  );
  err2.code = "ENOTDIR";
  return err2;
};
const findSync = (path2, options) => {
  const foundAbsolutePaths = [];
  const matchesAnyOfGlobs = matcher$1.create(
    path2,
    options.matching,
    options.ignoreCase
  );
  let maxLevelsDeep = Infinity;
  if (options.recursive === false) {
    maxLevelsDeep = 1;
  }
  treeWalker$2.sync(
    path2,
    {
      maxLevelsDeep,
      symlinks: "follow",
      inspectOptions: { times: true, absolutePath: true }
    },
    (itemPath, item) => {
      if (item && itemPath !== path2 && matchesAnyOfGlobs(itemPath)) {
        const weHaveMatch = item.type === "file" && options.files === true || item.type === "dir" && options.directories === true;
        if (weHaveMatch) {
          if (options.filter) {
            const passedThroughFilter = options.filter(item);
            if (passedThroughFilter) {
              foundAbsolutePaths.push(itemPath);
            }
          } else {
            foundAbsolutePaths.push(itemPath);
          }
        }
      }
    }
  );
  foundAbsolutePaths.sort();
  return processFoundPaths(foundAbsolutePaths, options.cwd);
};
const findSyncInit = (path2, options) => {
  const entryPointInspect = inspect$3.sync(path2, { symlinks: "follow" });
  if (entryPointInspect === void 0) {
    throw generatePathDoesntExistError(path2);
  } else if (entryPointInspect.type !== "dir") {
    throw generatePathNotDirectoryError(path2);
  }
  return findSync(path2, normalizeOptions(options));
};
const findAsync = (path2, options) => {
  return new Promise((resolve, reject) => {
    const foundAbsolutePaths = [];
    const matchesAnyOfGlobs = matcher$1.create(
      path2,
      options.matching,
      options.ignoreCase
    );
    let maxLevelsDeep = Infinity;
    if (options.recursive === false) {
      maxLevelsDeep = 1;
    }
    let waitingForFiltersToFinish = 0;
    let treeWalkerDone = false;
    const maybeDone = () => {
      if (treeWalkerDone && waitingForFiltersToFinish === 0) {
        foundAbsolutePaths.sort();
        resolve(processFoundPaths(foundAbsolutePaths, options.cwd));
      }
    };
    treeWalker$2.async(
      path2,
      {
        maxLevelsDeep,
        symlinks: "follow",
        inspectOptions: { times: true, absolutePath: true }
      },
      (itemPath, item) => {
        if (item && itemPath !== path2 && matchesAnyOfGlobs(itemPath)) {
          const weHaveMatch = item.type === "file" && options.files === true || item.type === "dir" && options.directories === true;
          if (weHaveMatch) {
            if (options.filter) {
              const passedThroughFilter = options.filter(item);
              const isPromise = typeof passedThroughFilter.then === "function";
              if (isPromise) {
                waitingForFiltersToFinish += 1;
                passedThroughFilter.then((passedThroughFilterResult) => {
                  if (passedThroughFilterResult) {
                    foundAbsolutePaths.push(itemPath);
                  }
                  waitingForFiltersToFinish -= 1;
                  maybeDone();
                }).catch((err2) => {
                  reject(err2);
                });
              } else if (passedThroughFilter) {
                foundAbsolutePaths.push(itemPath);
              }
            } else {
              foundAbsolutePaths.push(itemPath);
            }
          }
        }
      },
      (err2) => {
        if (err2) {
          reject(err2);
        } else {
          treeWalkerDone = true;
          maybeDone();
        }
      }
    );
  });
};
const findAsyncInit = (path2, options) => {
  return inspect$3.async(path2, { symlinks: "follow" }).then((entryPointInspect) => {
    if (entryPointInspect === void 0) {
      throw generatePathDoesntExistError(path2);
    } else if (entryPointInspect.type !== "dir") {
      throw generatePathNotDirectoryError(path2);
    }
    return findAsync(path2, normalizeOptions(options));
  });
};
find$1.validateInput = validateInput$8;
find$1.sync = findSyncInit;
find$1.async = findAsyncInit;
var inspect_tree = {};
const crypto$1 = require$$0$6;
const pathUtil$6 = require$$0$2;
const inspect$2 = inspect$5;
const validate$7 = validate$g;
const treeWalker$1 = tree_walker;
const validateInput$7 = (methodName, path2, options) => {
  const methodSignature = `${methodName}(path, [options])`;
  validate$7.argument(methodSignature, "path", path2, ["string"]);
  validate$7.options(methodSignature, "options", options, {
    checksum: ["string"],
    relativePath: ["boolean"],
    times: ["boolean"],
    symlinks: ["string"]
  });
  if (options && options.checksum !== void 0 && inspect$2.supportedChecksumAlgorithms.indexOf(options.checksum) === -1) {
    throw new Error(
      `Argument "options.checksum" passed to ${methodSignature} must have one of values: ${inspect$2.supportedChecksumAlgorithms.join(
        ", "
      )}`
    );
  }
  if (options && options.symlinks !== void 0 && inspect$2.symlinkOptions.indexOf(options.symlinks) === -1) {
    throw new Error(
      `Argument "options.symlinks" passed to ${methodSignature} must have one of values: ${inspect$2.symlinkOptions.join(
        ", "
      )}`
    );
  }
};
const relativePathInTree = (parentInspectObj, inspectObj) => {
  if (parentInspectObj === void 0) {
    return ".";
  }
  return parentInspectObj.relativePath + "/" + inspectObj.name;
};
const checksumOfDir = (inspectList, algo) => {
  const hash = crypto$1.createHash(algo);
  inspectList.forEach((inspectObj) => {
    hash.update(inspectObj.name + inspectObj[algo]);
  });
  return hash.digest("hex");
};
const calculateTreeDependentProperties = (parentInspectObj, inspectObj, options) => {
  if (options.relativePath) {
    inspectObj.relativePath = relativePathInTree(parentInspectObj, inspectObj);
  }
  if (inspectObj.type === "dir") {
    inspectObj.children.forEach((childInspectObj) => {
      calculateTreeDependentProperties(inspectObj, childInspectObj, options);
    });
    inspectObj.size = 0;
    inspectObj.children.sort((a, b) => {
      if (a.type === "dir" && b.type === "file") {
        return -1;
      }
      if (a.type === "file" && b.type === "dir") {
        return 1;
      }
      return a.name.localeCompare(b.name);
    });
    inspectObj.children.forEach((child) => {
      inspectObj.size += child.size || 0;
    });
    if (options.checksum) {
      inspectObj[options.checksum] = checksumOfDir(
        inspectObj.children,
        options.checksum
      );
    }
  }
};
const findParentInTree = (treeNode, pathChain, item) => {
  const name = pathChain[0];
  if (pathChain.length > 1) {
    const itemInTreeForPathChain = treeNode.children.find((child) => {
      return child.name === name;
    });
    return findParentInTree(itemInTreeForPathChain, pathChain.slice(1));
  }
  return treeNode;
};
const inspectTreeSync = (path2, opts) => {
  const options = opts || {};
  let tree;
  treeWalker$1.sync(path2, { inspectOptions: options }, (itemPath, item) => {
    if (item) {
      if (item.type === "dir") {
        item.children = [];
      }
      const relativePath = pathUtil$6.relative(path2, itemPath);
      if (relativePath === "") {
        tree = item;
      } else {
        const parentItem = findParentInTree(
          tree,
          relativePath.split(pathUtil$6.sep)
        );
        parentItem.children.push(item);
      }
    }
  });
  if (tree) {
    calculateTreeDependentProperties(void 0, tree, options);
  }
  return tree;
};
const inspectTreeAsync = (path2, opts) => {
  const options = opts || {};
  let tree;
  return new Promise((resolve, reject) => {
    treeWalker$1.async(
      path2,
      { inspectOptions: options },
      (itemPath, item) => {
        if (item) {
          if (item.type === "dir") {
            item.children = [];
          }
          const relativePath = pathUtil$6.relative(path2, itemPath);
          if (relativePath === "") {
            tree = item;
          } else {
            const parentItem = findParentInTree(
              tree,
              relativePath.split(pathUtil$6.sep)
            );
            parentItem.children.push(item);
          }
        }
      },
      (err2) => {
        if (err2) {
          reject(err2);
        } else {
          if (tree) {
            calculateTreeDependentProperties(void 0, tree, options);
          }
          resolve(tree);
        }
      }
    );
  });
};
inspect_tree.validateInput = validateInput$7;
inspect_tree.sync = inspectTreeSync;
inspect_tree.async = inspectTreeAsync;
var copy$2 = {};
var exists$3 = {};
const fs$6 = fs_1;
const validate$6 = validate$g;
const validateInput$6 = (methodName, path2) => {
  const methodSignature = `${methodName}(path)`;
  validate$6.argument(methodSignature, "path", path2, ["string"]);
};
const existsSync = (path2) => {
  try {
    const stat2 = fs$6.statSync(path2);
    if (stat2.isDirectory()) {
      return "dir";
    } else if (stat2.isFile()) {
      return "file";
    }
    return "other";
  } catch (err2) {
    if (err2.code !== "ENOENT") {
      throw err2;
    }
  }
  return false;
};
const existsAsync = (path2) => {
  return new Promise((resolve, reject) => {
    fs$6.stat(path2).then((stat2) => {
      if (stat2.isDirectory()) {
        resolve("dir");
      } else if (stat2.isFile()) {
        resolve("file");
      } else {
        resolve("other");
      }
    }).catch((err2) => {
      if (err2.code === "ENOENT") {
        resolve(false);
      } else {
        reject(err2);
      }
    });
  });
};
exists$3.validateInput = validateInput$6;
exists$3.sync = existsSync;
exists$3.async = existsAsync;
const pathUtil$5 = require$$0$2;
const fs$5 = fs_1;
const dir$4 = dir$6;
const exists$2 = exists$3;
const inspect$1 = inspect$5;
const write$1 = write$4;
const matcher = matcher$2;
const fileMode = mode;
const treeWalker = tree_walker;
const validate$5 = validate$g;
const validateInput$5 = (methodName, from, to, options) => {
  const methodSignature = `${methodName}(from, to, [options])`;
  validate$5.argument(methodSignature, "from", from, ["string"]);
  validate$5.argument(methodSignature, "to", to, ["string"]);
  validate$5.options(methodSignature, "options", options, {
    overwrite: ["boolean", "function"],
    matching: ["string", "array of string"],
    ignoreCase: ["boolean"]
  });
};
const parseOptions$1 = (options, from) => {
  const opts = options || {};
  const parsedOptions = {};
  if (opts.ignoreCase === void 0) {
    opts.ignoreCase = false;
  }
  parsedOptions.overwrite = opts.overwrite;
  if (opts.matching) {
    parsedOptions.allowedToCopy = matcher.create(
      from,
      opts.matching,
      opts.ignoreCase
    );
  } else {
    parsedOptions.allowedToCopy = () => {
      return true;
    };
  }
  return parsedOptions;
};
const generateNoSourceError = (path2) => {
  const err2 = new Error(`Path to copy doesn't exist ${path2}`);
  err2.code = "ENOENT";
  return err2;
};
const generateDestinationExistsError$1 = (path2) => {
  const err2 = new Error(`Destination path already exists ${path2}`);
  err2.code = "EEXIST";
  return err2;
};
const inspectOptions = {
  mode: true,
  symlinks: "report",
  times: true,
  absolutePath: true
};
const shouldThrowDestinationExistsError = (context) => {
  return typeof context.opts.overwrite !== "function" && context.opts.overwrite !== true;
};
const checksBeforeCopyingSync = (from, to, opts) => {
  if (!exists$2.sync(from)) {
    throw generateNoSourceError(from);
  }
  if (exists$2.sync(to) && !opts.overwrite) {
    throw generateDestinationExistsError$1(to);
  }
};
const canOverwriteItSync = (context) => {
  if (typeof context.opts.overwrite === "function") {
    const destInspectData = inspect$1.sync(context.destPath, inspectOptions);
    return context.opts.overwrite(context.srcInspectData, destInspectData);
  }
  return context.opts.overwrite === true;
};
const copyFileSync = (srcPath, destPath, mode2, context) => {
  const data = fs$5.readFileSync(srcPath);
  try {
    fs$5.writeFileSync(destPath, data, { mode: mode2, flag: "wx" });
  } catch (err2) {
    if (err2.code === "ENOENT") {
      write$1.sync(destPath, data, { mode: mode2 });
    } else if (err2.code === "EEXIST") {
      if (canOverwriteItSync(context)) {
        fs$5.writeFileSync(destPath, data, { mode: mode2 });
      } else if (shouldThrowDestinationExistsError(context)) {
        throw generateDestinationExistsError$1(context.destPath);
      }
    } else {
      throw err2;
    }
  }
};
const copySymlinkSync = (from, to) => {
  const symlinkPointsAt = fs$5.readlinkSync(from);
  try {
    fs$5.symlinkSync(symlinkPointsAt, to);
  } catch (err2) {
    if (err2.code === "EEXIST") {
      fs$5.unlinkSync(to);
      fs$5.symlinkSync(symlinkPointsAt, to);
    } else {
      throw err2;
    }
  }
};
const copyItemSync = (srcPath, srcInspectData, destPath, opts) => {
  const context = { srcPath, destPath, srcInspectData, opts };
  const mode2 = fileMode.normalizeFileMode(srcInspectData.mode);
  if (srcInspectData.type === "dir") {
    dir$4.createSync(destPath, { mode: mode2 });
  } else if (srcInspectData.type === "file") {
    copyFileSync(srcPath, destPath, mode2, context);
  } else if (srcInspectData.type === "symlink") {
    copySymlinkSync(srcPath, destPath);
  }
};
const copySync = (from, to, options) => {
  const opts = parseOptions$1(options, from);
  checksBeforeCopyingSync(from, to, opts);
  treeWalker.sync(from, { inspectOptions }, (srcPath, srcInspectData) => {
    const rel = pathUtil$5.relative(from, srcPath);
    const destPath = pathUtil$5.resolve(to, rel);
    if (opts.allowedToCopy(srcPath, destPath, srcInspectData)) {
      copyItemSync(srcPath, srcInspectData, destPath, opts);
    }
  });
};
const checksBeforeCopyingAsync = (from, to, opts) => {
  return exists$2.async(from).then((srcPathExists) => {
    if (!srcPathExists) {
      throw generateNoSourceError(from);
    } else {
      return exists$2.async(to);
    }
  }).then((destPathExists) => {
    if (destPathExists && !opts.overwrite) {
      throw generateDestinationExistsError$1(to);
    }
  });
};
const canOverwriteItAsync = (context) => {
  return new Promise((resolve, reject) => {
    if (typeof context.opts.overwrite === "function") {
      inspect$1.async(context.destPath, inspectOptions).then((destInspectData) => {
        resolve(
          context.opts.overwrite(context.srcInspectData, destInspectData)
        );
      }).catch(reject);
    } else {
      resolve(context.opts.overwrite === true);
    }
  });
};
const copyFileAsync = (srcPath, destPath, mode2, context, runOptions) => {
  return new Promise((resolve, reject) => {
    const runOpts = runOptions || {};
    let flags = "wx";
    if (runOpts.overwrite) {
      flags = "w";
    }
    const readStream = fs$5.createReadStream(srcPath);
    const writeStream = fs$5.createWriteStream(destPath, { mode: mode2, flags });
    readStream.on("error", reject);
    writeStream.on("error", (err2) => {
      readStream.resume();
      if (err2.code === "ENOENT") {
        dir$4.createAsync(pathUtil$5.dirname(destPath)).then(() => {
          copyFileAsync(srcPath, destPath, mode2, context).then(
            resolve,
            reject
          );
        }).catch(reject);
      } else if (err2.code === "EEXIST") {
        canOverwriteItAsync(context).then((canOverwite) => {
          if (canOverwite) {
            copyFileAsync(srcPath, destPath, mode2, context, {
              overwrite: true
            }).then(resolve, reject);
          } else if (shouldThrowDestinationExistsError(context)) {
            reject(generateDestinationExistsError$1(destPath));
          } else {
            resolve();
          }
        }).catch(reject);
      } else {
        reject(err2);
      }
    });
    writeStream.on("finish", resolve);
    readStream.pipe(writeStream);
  });
};
const copySymlinkAsync = (from, to) => {
  return fs$5.readlink(from).then((symlinkPointsAt) => {
    return new Promise((resolve, reject) => {
      fs$5.symlink(symlinkPointsAt, to).then(resolve).catch((err2) => {
        if (err2.code === "EEXIST") {
          fs$5.unlink(to).then(() => {
            return fs$5.symlink(symlinkPointsAt, to);
          }).then(resolve, reject);
        } else {
          reject(err2);
        }
      });
    });
  });
};
const copyItemAsync = (srcPath, srcInspectData, destPath, opts) => {
  const context = { srcPath, destPath, srcInspectData, opts };
  const mode2 = fileMode.normalizeFileMode(srcInspectData.mode);
  if (srcInspectData.type === "dir") {
    return dir$4.createAsync(destPath, { mode: mode2 });
  } else if (srcInspectData.type === "file") {
    return copyFileAsync(srcPath, destPath, mode2, context);
  } else if (srcInspectData.type === "symlink") {
    return copySymlinkAsync(srcPath, destPath);
  }
  return Promise.resolve();
};
const copyAsync = (from, to, options) => {
  return new Promise((resolve, reject) => {
    const opts = parseOptions$1(options, from);
    checksBeforeCopyingAsync(from, to, opts).then(() => {
      let allFilesDelivered = false;
      let filesInProgress = 0;
      treeWalker.async(
        from,
        { inspectOptions },
        (srcPath, item) => {
          if (item) {
            const rel = pathUtil$5.relative(from, srcPath);
            const destPath = pathUtil$5.resolve(to, rel);
            if (opts.allowedToCopy(srcPath, item, destPath)) {
              filesInProgress += 1;
              copyItemAsync(srcPath, item, destPath, opts).then(() => {
                filesInProgress -= 1;
                if (allFilesDelivered && filesInProgress === 0) {
                  resolve();
                }
              }).catch(reject);
            }
          }
        },
        (err2) => {
          if (err2) {
            reject(err2);
          } else {
            allFilesDelivered = true;
            if (allFilesDelivered && filesInProgress === 0) {
              resolve();
            }
          }
        }
      );
    }).catch(reject);
  });
};
copy$2.validateInput = validateInput$5;
copy$2.sync = copySync;
copy$2.async = copyAsync;
var move$2 = {};
const pathUtil$4 = require$$0$2;
const fs$4 = fs_1;
const validate$4 = validate$g;
const copy$1 = copy$2;
const dir$3 = dir$6;
const exists$1 = exists$3;
const remove$1 = remove$3;
const validateInput$4 = (methodName, from, to, options) => {
  const methodSignature = `${methodName}(from, to, [options])`;
  validate$4.argument(methodSignature, "from", from, ["string"]);
  validate$4.argument(methodSignature, "to", to, ["string"]);
  validate$4.options(methodSignature, "options", options, {
    overwrite: ["boolean"]
  });
};
const parseOptions = (options) => {
  const opts = options || {};
  return opts;
};
const generateDestinationExistsError = (path2) => {
  const err2 = new Error(`Destination path already exists ${path2}`);
  err2.code = "EEXIST";
  return err2;
};
const generateSourceDoesntExistError = (path2) => {
  const err2 = new Error(`Path to move doesn't exist ${path2}`);
  err2.code = "ENOENT";
  return err2;
};
const moveSync = (from, to, options) => {
  const opts = parseOptions(options);
  if (exists$1.sync(to) !== false && opts.overwrite !== true) {
    throw generateDestinationExistsError(to);
  }
  try {
    fs$4.renameSync(from, to);
  } catch (err2) {
    if (err2.code === "EISDIR" || err2.code === "EPERM") {
      remove$1.sync(to);
      fs$4.renameSync(from, to);
    } else if (err2.code === "EXDEV") {
      copy$1.sync(from, to, { overwrite: true });
      remove$1.sync(from);
    } else if (err2.code === "ENOENT") {
      if (!exists$1.sync(from)) {
        throw generateSourceDoesntExistError(from);
      }
      dir$3.createSync(pathUtil$4.dirname(to));
      fs$4.renameSync(from, to);
    } else {
      throw err2;
    }
  }
};
const ensureDestinationPathExistsAsync = (to) => {
  return new Promise((resolve, reject) => {
    const destDir = pathUtil$4.dirname(to);
    exists$1.async(destDir).then((dstExists) => {
      if (!dstExists) {
        dir$3.createAsync(destDir).then(resolve, reject);
      } else {
        reject();
      }
    }).catch(reject);
  });
};
const moveAsync = (from, to, options) => {
  const opts = parseOptions(options);
  return new Promise((resolve, reject) => {
    exists$1.async(to).then((destinationExists) => {
      if (destinationExists !== false && opts.overwrite !== true) {
        reject(generateDestinationExistsError(to));
      } else {
        fs$4.rename(from, to).then(resolve).catch((err2) => {
          if (err2.code === "EISDIR" || err2.code === "EPERM") {
            remove$1.async(to).then(() => fs$4.rename(from, to)).then(resolve, reject);
          } else if (err2.code === "EXDEV") {
            copy$1.async(from, to, { overwrite: true }).then(() => remove$1.async(from)).then(resolve, reject);
          } else if (err2.code === "ENOENT") {
            exists$1.async(from).then((srcExists) => {
              if (!srcExists) {
                reject(generateSourceDoesntExistError(from));
              } else {
                ensureDestinationPathExistsAsync(to).then(() => {
                  return fs$4.rename(from, to);
                }).then(resolve, reject);
              }
            }).catch(reject);
          } else {
            reject(err2);
          }
        });
      }
    });
  });
};
move$2.validateInput = validateInput$4;
move$2.sync = moveSync;
move$2.async = moveAsync;
var read$1 = {};
const fs$3 = fs_1;
const validate$3 = validate$g;
const supportedReturnAs = ["utf8", "buffer", "json", "jsonWithDates"];
const validateInput$3 = (methodName, path2, returnAs) => {
  const methodSignature = `${methodName}(path, returnAs)`;
  validate$3.argument(methodSignature, "path", path2, ["string"]);
  validate$3.argument(methodSignature, "returnAs", returnAs, [
    "string",
    "undefined"
  ]);
  if (returnAs && supportedReturnAs.indexOf(returnAs) === -1) {
    throw new Error(
      `Argument "returnAs" passed to ${methodSignature} must have one of values: ${supportedReturnAs.join(
        ", "
      )}`
    );
  }
};
const jsonDateParser = (key, value) => {
  const reISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;
  if (typeof value === "string") {
    if (reISO.exec(value)) {
      return new Date(value);
    }
  }
  return value;
};
const makeNicerJsonParsingError = (path2, err2) => {
  const nicerError = new Error(
    `JSON parsing failed while reading ${path2} [${err2}]`
  );
  nicerError.originalError = err2;
  return nicerError;
};
const readSync = (path2, returnAs) => {
  const retAs = returnAs || "utf8";
  let data;
  let encoding = "utf8";
  if (retAs === "buffer") {
    encoding = null;
  }
  try {
    data = fs$3.readFileSync(path2, { encoding });
  } catch (err2) {
    if (err2.code === "ENOENT") {
      return void 0;
    }
    throw err2;
  }
  try {
    if (retAs === "json") {
      data = JSON.parse(data);
    } else if (retAs === "jsonWithDates") {
      data = JSON.parse(data, jsonDateParser);
    }
  } catch (err2) {
    throw makeNicerJsonParsingError(path2, err2);
  }
  return data;
};
const readAsync = (path2, returnAs) => {
  return new Promise((resolve, reject) => {
    const retAs = returnAs || "utf8";
    let encoding = "utf8";
    if (retAs === "buffer") {
      encoding = null;
    }
    fs$3.readFile(path2, { encoding }).then((data) => {
      try {
        if (retAs === "json") {
          resolve(JSON.parse(data));
        } else if (retAs === "jsonWithDates") {
          resolve(JSON.parse(data, jsonDateParser));
        } else {
          resolve(data);
        }
      } catch (err2) {
        reject(makeNicerJsonParsingError(path2, err2));
      }
    }).catch((err2) => {
      if (err2.code === "ENOENT") {
        resolve(void 0);
      } else {
        reject(err2);
      }
    });
  });
};
read$1.validateInput = validateInput$3;
read$1.sync = readSync;
read$1.async = readAsync;
var rename$1 = {};
const pathUtil$3 = require$$0$2;
const move$1 = move$2;
const validate$2 = validate$g;
const validateInput$2 = (methodName, path2, newName, options) => {
  const methodSignature = `${methodName}(path, newName, [options])`;
  validate$2.argument(methodSignature, "path", path2, ["string"]);
  validate$2.argument(methodSignature, "newName", newName, ["string"]);
  validate$2.options(methodSignature, "options", options, {
    overwrite: ["boolean"]
  });
  if (pathUtil$3.basename(newName) !== newName) {
    throw new Error(
      `Argument "newName" passed to ${methodSignature} should be a filename, not a path. Received "${newName}"`
    );
  }
};
const renameSync = (path2, newName, options) => {
  const newPath = pathUtil$3.join(pathUtil$3.dirname(path2), newName);
  move$1.sync(path2, newPath, options);
};
const renameAsync = (path2, newName, options) => {
  const newPath = pathUtil$3.join(pathUtil$3.dirname(path2), newName);
  return move$1.async(path2, newPath, options);
};
rename$1.validateInput = validateInput$2;
rename$1.sync = renameSync;
rename$1.async = renameAsync;
var symlink$1 = {};
const pathUtil$2 = require$$0$2;
const fs$2 = fs_1;
const validate$1 = validate$g;
const dir$2 = dir$6;
const validateInput$1 = (methodName, symlinkValue, path2) => {
  const methodSignature = `${methodName}(symlinkValue, path)`;
  validate$1.argument(methodSignature, "symlinkValue", symlinkValue, ["string"]);
  validate$1.argument(methodSignature, "path", path2, ["string"]);
};
const symlinkSync = (symlinkValue, path2) => {
  try {
    fs$2.symlinkSync(symlinkValue, path2);
  } catch (err2) {
    if (err2.code === "ENOENT") {
      dir$2.createSync(pathUtil$2.dirname(path2));
      fs$2.symlinkSync(symlinkValue, path2);
    } else {
      throw err2;
    }
  }
};
const symlinkAsync = (symlinkValue, path2) => {
  return new Promise((resolve, reject) => {
    fs$2.symlink(symlinkValue, path2).then(resolve).catch((err2) => {
      if (err2.code === "ENOENT") {
        dir$2.createAsync(pathUtil$2.dirname(path2)).then(() => {
          return fs$2.symlink(symlinkValue, path2);
        }).then(resolve, reject);
      } else {
        reject(err2);
      }
    });
  });
};
symlink$1.validateInput = validateInput$1;
symlink$1.sync = symlinkSync;
symlink$1.async = symlinkAsync;
var streams$1 = {};
const fs$1 = require$$0$1;
streams$1.createWriteStream = fs$1.createWriteStream;
streams$1.createReadStream = fs$1.createReadStream;
var tmp_dir = {};
const pathUtil$1 = require$$0$2;
const os = require$$0$3;
const crypto = require$$0$6;
const dir$1 = dir$6;
const fs = fs_1;
const validate = validate$g;
const validateInput = (methodName, options) => {
  const methodSignature = `${methodName}([options])`;
  validate.options(methodSignature, "options", options, {
    prefix: ["string"],
    basePath: ["string"]
  });
};
const getOptionsDefaults = (passedOptions, cwdPath) => {
  passedOptions = passedOptions || {};
  const options = {};
  if (typeof passedOptions.prefix !== "string") {
    options.prefix = "";
  } else {
    options.prefix = passedOptions.prefix;
  }
  if (typeof passedOptions.basePath === "string") {
    options.basePath = pathUtil$1.resolve(cwdPath, passedOptions.basePath);
  } else {
    options.basePath = os.tmpdir();
  }
  return options;
};
const randomStringLength = 32;
const tmpDirSync = (cwdPath, passedOptions) => {
  const options = getOptionsDefaults(passedOptions, cwdPath);
  const randomString = crypto.randomBytes(randomStringLength / 2).toString("hex");
  const dirPath = pathUtil$1.join(
    options.basePath,
    options.prefix + randomString
  );
  try {
    fs.mkdirSync(dirPath);
  } catch (err2) {
    if (err2.code === "ENOENT") {
      dir$1.sync(dirPath);
    } else {
      throw err2;
    }
  }
  return dirPath;
};
const tmpDirAsync = (cwdPath, passedOptions) => {
  return new Promise((resolve, reject) => {
    const options = getOptionsDefaults(passedOptions, cwdPath);
    crypto.randomBytes(randomStringLength / 2, (err2, bytes) => {
      if (err2) {
        reject(err2);
      } else {
        const randomString = bytes.toString("hex");
        const dirPath = pathUtil$1.join(
          options.basePath,
          options.prefix + randomString
        );
        fs.mkdir(dirPath, (err3) => {
          if (err3) {
            if (err3.code === "ENOENT") {
              dir$1.async(dirPath).then(() => {
                resolve(dirPath);
              }, reject);
            } else {
              reject(err3);
            }
          } else {
            resolve(dirPath);
          }
        });
      }
    });
  });
};
tmp_dir.validateInput = validateInput;
tmp_dir.sync = tmpDirSync;
tmp_dir.async = tmpDirAsync;
const util = require$$1$2;
const pathUtil = require$$0$2;
const append = append$1;
const dir = dir$6;
const file = file$1;
const find = find$1;
const inspect = inspect$5;
const inspectTree = inspect_tree;
const copy = copy$2;
const exists = exists$3;
const list = list$1;
const move = move$2;
const read = read$1;
const remove = remove$3;
const rename = rename$1;
const symlink = symlink$1;
const streams = streams$1;
const tmpDir = tmp_dir;
const write = write$4;
const jetpackContext = (cwdPath) => {
  const getCwdPath = () => {
    return cwdPath || process.cwd();
  };
  const cwd = function() {
    if (arguments.length === 0) {
      return getCwdPath();
    }
    const args = Array.prototype.slice.call(arguments);
    const pathParts = [getCwdPath()].concat(args);
    return jetpackContext(pathUtil.resolve.apply(null, pathParts));
  };
  const resolvePath = (path2) => {
    return pathUtil.resolve(getCwdPath(), path2);
  };
  const getPath = function() {
    Array.prototype.unshift.call(arguments, getCwdPath());
    return pathUtil.resolve.apply(null, arguments);
  };
  const normalizeOptions2 = (options) => {
    const opts = options || {};
    opts.cwd = getCwdPath();
    return opts;
  };
  const api = {
    cwd,
    path: getPath,
    append: (path2, data, options) => {
      append.validateInput("append", path2, data, options);
      append.sync(resolvePath(path2), data, options);
    },
    appendAsync: (path2, data, options) => {
      append.validateInput("appendAsync", path2, data, options);
      return append.async(resolvePath(path2), data, options);
    },
    copy: (from, to, options) => {
      copy.validateInput("copy", from, to, options);
      copy.sync(resolvePath(from), resolvePath(to), options);
    },
    copyAsync: (from, to, options) => {
      copy.validateInput("copyAsync", from, to, options);
      return copy.async(resolvePath(from), resolvePath(to), options);
    },
    createWriteStream: (path2, options) => {
      return streams.createWriteStream(resolvePath(path2), options);
    },
    createReadStream: (path2, options) => {
      return streams.createReadStream(resolvePath(path2), options);
    },
    dir: (path2, criteria) => {
      dir.validateInput("dir", path2, criteria);
      const normalizedPath = resolvePath(path2);
      dir.sync(normalizedPath, criteria);
      return cwd(normalizedPath);
    },
    dirAsync: (path2, criteria) => {
      dir.validateInput("dirAsync", path2, criteria);
      return new Promise((resolve, reject) => {
        const normalizedPath = resolvePath(path2);
        dir.async(normalizedPath, criteria).then(() => {
          resolve(cwd(normalizedPath));
        }, reject);
      });
    },
    exists: (path2) => {
      exists.validateInput("exists", path2);
      return exists.sync(resolvePath(path2));
    },
    existsAsync: (path2) => {
      exists.validateInput("existsAsync", path2);
      return exists.async(resolvePath(path2));
    },
    file: (path2, criteria) => {
      file.validateInput("file", path2, criteria);
      file.sync(resolvePath(path2), criteria);
      return api;
    },
    fileAsync: (path2, criteria) => {
      file.validateInput("fileAsync", path2, criteria);
      return new Promise((resolve, reject) => {
        file.async(resolvePath(path2), criteria).then(() => {
          resolve(api);
        }, reject);
      });
    },
    find: (startPath, options) => {
      if (typeof options === "undefined" && typeof startPath === "object") {
        options = startPath;
        startPath = ".";
      }
      find.validateInput("find", startPath, options);
      return find.sync(resolvePath(startPath), normalizeOptions2(options));
    },
    findAsync: (startPath, options) => {
      if (typeof options === "undefined" && typeof startPath === "object") {
        options = startPath;
        startPath = ".";
      }
      find.validateInput("findAsync", startPath, options);
      return find.async(resolvePath(startPath), normalizeOptions2(options));
    },
    inspect: (path2, fieldsToInclude) => {
      inspect.validateInput("inspect", path2, fieldsToInclude);
      return inspect.sync(resolvePath(path2), fieldsToInclude);
    },
    inspectAsync: (path2, fieldsToInclude) => {
      inspect.validateInput("inspectAsync", path2, fieldsToInclude);
      return inspect.async(resolvePath(path2), fieldsToInclude);
    },
    inspectTree: (path2, options) => {
      inspectTree.validateInput("inspectTree", path2, options);
      return inspectTree.sync(resolvePath(path2), options);
    },
    inspectTreeAsync: (path2, options) => {
      inspectTree.validateInput("inspectTreeAsync", path2, options);
      return inspectTree.async(resolvePath(path2), options);
    },
    list: (path2) => {
      list.validateInput("list", path2);
      return list.sync(resolvePath(path2 || "."));
    },
    listAsync: (path2) => {
      list.validateInput("listAsync", path2);
      return list.async(resolvePath(path2 || "."));
    },
    move: (from, to, options) => {
      move.validateInput("move", from, to, options);
      move.sync(resolvePath(from), resolvePath(to), options);
    },
    moveAsync: (from, to, options) => {
      move.validateInput("moveAsync", from, to, options);
      return move.async(resolvePath(from), resolvePath(to), options);
    },
    read: (path2, returnAs) => {
      read.validateInput("read", path2, returnAs);
      return read.sync(resolvePath(path2), returnAs);
    },
    readAsync: (path2, returnAs) => {
      read.validateInput("readAsync", path2, returnAs);
      return read.async(resolvePath(path2), returnAs);
    },
    remove: (path2) => {
      remove.validateInput("remove", path2);
      remove.sync(resolvePath(path2 || "."));
    },
    removeAsync: (path2) => {
      remove.validateInput("removeAsync", path2);
      return remove.async(resolvePath(path2 || "."));
    },
    rename: (path2, newName, options) => {
      rename.validateInput("rename", path2, newName, options);
      rename.sync(resolvePath(path2), newName, options);
    },
    renameAsync: (path2, newName, options) => {
      rename.validateInput("renameAsync", path2, newName, options);
      return rename.async(resolvePath(path2), newName, options);
    },
    symlink: (symlinkValue, path2) => {
      symlink.validateInput("symlink", symlinkValue, path2);
      symlink.sync(symlinkValue, resolvePath(path2));
    },
    symlinkAsync: (symlinkValue, path2) => {
      symlink.validateInput("symlinkAsync", symlinkValue, path2);
      return symlink.async(symlinkValue, resolvePath(path2));
    },
    tmpDir: (options) => {
      tmpDir.validateInput("tmpDir", options);
      const pathOfCreatedDirectory = tmpDir.sync(getCwdPath(), options);
      return cwd(pathOfCreatedDirectory);
    },
    tmpDirAsync: (options) => {
      tmpDir.validateInput("tmpDirAsync", options);
      return new Promise((resolve, reject) => {
        tmpDir.async(getCwdPath(), options).then((pathOfCreatedDirectory) => {
          resolve(cwd(pathOfCreatedDirectory));
        }, reject);
      });
    },
    write: (path2, data, options) => {
      write.validateInput("write", path2, data, options);
      write.sync(resolvePath(path2), data, options);
    },
    writeAsync: (path2, data, options) => {
      write.validateInput("writeAsync", path2, data, options);
      return write.async(resolvePath(path2), data, options);
    }
  };
  if (util.inspect.custom !== void 0) {
    api[util.inspect.custom] = () => {
      return `[fs-jetpack CWD: ${getCwdPath()}]`;
    };
  }
  return api;
};
var jetpack$1 = jetpackContext;
const jetpack = jetpack$1;
var main = jetpack();
var __importDefault = commonjsGlobal && commonjsGlobal.__importDefault || function(mod) {
  return mod && mod.__esModule ? mod : { "default": mod };
};
Object.defineProperty(unzip$1, "__esModule", { value: true });
const promises_1 = __importDefault(require$$0$7);
const path_1 = __importDefault(require$$0$2);
const jszip_1 = __importDefault(lib);
const fs_jetpack_1 = __importDefault(main);
function calcLength(a, b, c2, d) {
  let length = 0;
  length += a << 0;
  length += b << 8;
  length += c2 << 16;
  length += d << 24 >>> 0;
  return length;
}
function crxToZip(buf) {
  if (buf[0] === 80 && buf[1] === 75 && buf[2] === 3 && buf[3] === 4) {
    return buf;
  }
  if (buf[0] !== 67 || buf[1] !== 114 || buf[2] !== 50 || buf[3] !== 52) {
    throw new Error("Invalid header: Does not start with Cr24");
  }
  const isV3 = buf[4] === 3;
  const isV2 = buf[4] === 2;
  if (!isV2 && !isV3 || buf[5] || buf[6] || buf[7]) {
    throw new Error("Unexpected crx format version number.");
  }
  if (isV2) {
    const publicKeyLength = calcLength(buf[8], buf[9], buf[10], buf[11]);
    const signatureLength = calcLength(buf[12], buf[13], buf[14], buf[15]);
    const zipStartOffset2 = 16 + publicKeyLength + signatureLength;
    return buf.subarray(zipStartOffset2, buf.length);
  }
  const headerSize = calcLength(buf[8], buf[9], buf[10], buf[11]);
  const zipStartOffset = 12 + headerSize;
  return buf.subarray(zipStartOffset, buf.length);
}
async function unzip(crxFilePath, destination) {
  const filePath = path_1.default.resolve(crxFilePath);
  const extname = path_1.default.extname(crxFilePath);
  const basename = path_1.default.basename(crxFilePath, extname);
  const dirname = path_1.default.dirname(crxFilePath);
  destination = destination || path_1.default.resolve(dirname, basename);
  const buf = await promises_1.default.readFile(filePath);
  const res = await jszip_1.default.loadAsync(crxToZip(buf));
  const { files } = res;
  const zipFileKeys = Object.keys(files);
  return Promise.all(zipFileKeys.map(async (filename) => {
    const isFile = !files[filename].dir;
    const fullPath = path_1.default.join(destination, filename);
    const directory = isFile && path_1.default.dirname(fullPath) || fullPath;
    const content = await files[filename].async("nodebuffer");
    await fs_jetpack_1.default.dirAsync(directory);
    if (isFile) {
      await fs_jetpack_1.default.writeAsync(fullPath, content);
    }
  }));
}
unzip$1.default = unzip;
var utils = {};
(function(exports) {
  var __importDefault2 = commonjsGlobal && commonjsGlobal.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.getIdMap = exports.changePermissions = exports.fetchCrxFile = exports.getExtensionPath = void 0;
  const fs_12 = __importDefault2(require$$0$1);
  const path_12 = __importDefault2(require$$0$2);
  const electron_1 = require$$2$3;
  const getExtensionPath = () => {
    const savePath = electron_1.app.getPath("userData");
    return path_12.default.resolve(`${savePath}/chrome-extensions`);
  };
  exports.getExtensionPath = getExtensionPath;
  const fetchCrxFile = async (from, to) => {
    return new Promise((resolve, reject) => {
      const request = electron_1.net.request(from);
      request.on("response", (response) => {
        if (response.statusCode !== 200) {
          reject(new Error(`Failed to download file. Status code: ${response.statusCode}`));
          return;
        }
        const fileStream = fs_12.default.createWriteStream(to);
        response.pipe(fileStream);
        fileStream.on("finish", () => {
          fileStream.close();
          resolve();
        });
        fileStream.on("error", (err2) => {
          fs_12.default.unlink(to, () => reject(err2));
        });
        response.on("error", (err2) => {
          fs_12.default.unlink(to, () => reject(err2));
        });
      });
      request.on("error", (err2) => {
        reject(err2);
      });
      request.end();
    });
  };
  exports.fetchCrxFile = fetchCrxFile;
  const changePermissions = (dir2, mode2) => {
    const files = fs_12.default.readdirSync(dir2);
    files.forEach((file2) => {
      const filePath = path_12.default.join(dir2, file2);
      fs_12.default.chmodSync(filePath, parseInt(`${mode2}`, 8));
      if (fs_12.default.statSync(filePath).isDirectory()) {
        (0, exports.changePermissions)(filePath, mode2);
      }
    });
  };
  exports.changePermissions = changePermissions;
  const getIDMapPath = () => path_12.default.resolve((0, exports.getExtensionPath)(), "IDMap.json");
  const getIdMap = () => {
    if (fs_12.default.existsSync(getIDMapPath())) {
      try {
        return JSON.parse(fs_12.default.readFileSync(getIDMapPath(), "utf8"));
      } catch (err2) {
        console.error("electron-devtools-assembler: Invalid JSON present in the IDMap file");
      }
    }
    return {};
  };
  exports.getIdMap = getIdMap;
})(utils);
var extensions = {};
var hasRequiredExtensions;
function requireExtensions() {
  if (hasRequiredExtensions)
    return extensions;
  hasRequiredExtensions = 1;
  Object.defineProperty(extensions, "__esModule", { value: true });
  extensions.MOBX_DEVTOOLS = extensions.APOLLO_DEVELOPER_TOOLS = extensions.REDUX_DEVTOOLS = extensions.VUEJS_DEVTOOLS = extensions.ANGULAR_DEVTOOLS = extensions.JQUERY_DEBUGGER = extensions.BACKBONE_DEBUGGER = extensions.REACT_DEVELOPER_TOOLS = extensions.EMBER_INSPECTOR = void 0;
  extensions.EMBER_INSPECTOR = {
    id: "bmdblncegkenkacieihfhpjfppoconhi",
    version: "4.9.1"
  };
  extensions.REACT_DEVELOPER_TOOLS = {
    id: "fmkadmapgofadopljbjfkapdkoienihi",
    version: "4.27.3"
  };
  extensions.BACKBONE_DEBUGGER = {
    id: "bhljhndlimiafopmmhjlgfpnnchjjbhd",
    version: "0.4.1"
  };
  extensions.JQUERY_DEBUGGER = {
    id: "dbhhnnnpaeobfddmlalhnehgclcmjimi",
    version: "0.1.3.2"
  };
  extensions.ANGULAR_DEVTOOLS = {
    id: "ienfalfjdbdpebioblfackkekamfmbnh",
    version: "1.0.7"
  };
  extensions.VUEJS_DEVTOOLS = {
    id: "nhdogjmejiglipccpnnnanhbledajbpd",
    version: "6.5.0"
  };
  extensions.REDUX_DEVTOOLS = {
    id: "lmhkpmbekcpmknklioeibfkpmmfibljd",
    version: "3.0.19"
  };
  extensions.APOLLO_DEVELOPER_TOOLS = {
    id: "jdkknkkbebbapilgoeccciglkfbmbnfm",
    version: "4.1.4"
  };
  extensions.MOBX_DEVTOOLS = {
    id: "pfgnfdagidkfgccljigdamigbcnndkod",
    version: "0.9.26"
  };
  return extensions;
}
(function(exports) {
  var __createBinding2 = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === void 0)
      k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() {
        return m[k];
      } };
    }
    Object.defineProperty(o, k2, desc);
  } : function(o, m, k, k2) {
    if (k2 === void 0)
      k2 = k;
    o[k2] = m[k];
  });
  var __setModuleDefault2 = commonjsGlobal && commonjsGlobal.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
  } : function(o, v) {
    o["default"] = v;
  });
  var __importStar2 = commonjsGlobal && commonjsGlobal.__importStar || function(mod) {
    if (mod && mod.__esModule)
      return mod;
    var result = {};
    if (mod != null) {
      for (var k in mod)
        if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding2(result, mod, k);
    }
    __setModuleDefault2(result, mod);
    return result;
  };
  var __exportStar = commonjsGlobal && commonjsGlobal.__exportStar || function(m, exports2) {
    for (var p in m)
      if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
        __createBinding2(exports2, m, p);
  };
  var __importDefault2 = commonjsGlobal && commonjsGlobal.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.installExtension = void 0;
  const electron_1 = require$$2$3;
  const path2 = __importStar2(require$$0$2);
  const rimraf = __importStar2(commonjs$6);
  const unzip_1 = __importDefault2(unzip$1);
  const utils_1 = utils;
  const fs_jetpack_12 = __importDefault2(main);
  const OVERRIDES = [
    "bhljhndlimiafopmmhjlgfpnnchjjbhd",
    "bmdblncegkenkacieihfhpjfppoconhi",
    "dbhhnnnpaeobfddmlalhnehgclcmjimi",
    "fmkadmapgofadopljbjfkapdkoienihi",
    "ienfalfjdbdpebioblfackkekamfmbnh",
    "jdkknkkbebbapilgoeccciglkfbmbnfm",
    "lmhkpmbekcpmknklioeibfkpmmfibljd",
    "nhdogjmejiglipccpnnnanhbledajbpd",
    "pfgnfdagidkfgccljigdamigbcnndkod"
  ];
  async function downloadChromeExtension(chromeStoreID, forceDownload, attempts = 5) {
    try {
      const extensionsStore = (0, utils_1.getExtensionPath)();
      await fs_jetpack_12.default.dirAsync(extensionsStore);
      const extensionFolder = path2.resolve(`${extensionsStore}/${chromeStoreID}`);
      const extensionDirExists = await fs_jetpack_12.default.existsAsync(extensionFolder);
      if (!extensionDirExists || forceDownload) {
        if (extensionDirExists) {
          rimraf.sync(extensionFolder);
        }
        const chromeVersion = process.versions.chrome || 32;
        let fileURL = `https://clients2.google.com/service/update2/crx?response=redirect&acceptformat=crx2,crx3&x=id%3D${chromeStoreID}%26uc&prodversion=${chromeVersion}`;
        if (OVERRIDES.includes(chromeStoreID)) {
          fileURL = `https://github.com/jonluca/electron-extension-installer/raw/main/overrides/${chromeStoreID}.crx`;
        }
        const filePath = path2.resolve(`${extensionFolder}.crx`);
        await (0, utils_1.fetchCrxFile)(fileURL, filePath);
        try {
          await (0, unzip_1.default)(filePath, extensionFolder);
          (0, utils_1.changePermissions)(extensionFolder, 755);
          return extensionFolder;
        } catch (err2) {
          if (!await fs_jetpack_12.default.existsAsync(path2.resolve(extensionFolder, "manifest.json"))) {
            throw err2;
          }
        }
      } else {
        return extensionFolder;
      }
    } catch (err2) {
      console.log(`Failed to fetch extension, trying ${attempts - 1} more times`);
      if (attempts <= 1) {
        throw err2;
      }
      await new Promise((resolve) => setTimeout(resolve, 200));
      return downloadChromeExtension(chromeStoreID, forceDownload, attempts - 1);
    }
    throw new Error("Failed to fetch extension");
  }
  const isManifestVersion3 = async (manifestDirectory) => {
    try {
      const file2 = await fs_jetpack_12.default.readAsync(path2.join(manifestDirectory, "manifest.json"), "json");
      return file2.manifest_version === 3;
    } catch (e) {
      return false;
    }
  };
  const installExtension = async (extensionReference, options = {}) => {
    const targetSession = typeof options.session === "string" ? electron_1.session.fromPartition(options.session) : options.session || electron_1.session.defaultSession;
    const { forceDownload, loadExtensionOptions } = options;
    if (process.type !== "browser") {
      throw new Error("electron-devtools-assembler can only be used from the main process");
    }
    if (Array.isArray(extensionReference)) {
      const installed = await Promise.all(extensionReference.map((extension) => (0, exports.installExtension)(extension, options)));
      return installed.flat();
    }
    let chromeStoreID;
    if (typeof extensionReference === "object" && extensionReference.id) {
      chromeStoreID = extensionReference.id;
    } else if (typeof extensionReference === "string") {
      chromeStoreID = extensionReference;
    } else {
      throw new Error(`Invalid extensionReference passed in: "${extensionReference}"`);
    }
    const IDMap = (0, utils_1.getIdMap)();
    const extensionName = IDMap[chromeStoreID];
    const installedExtension = targetSession.getAllExtensions().find((e) => e.name === extensionName);
    if (!forceDownload && installedExtension) {
      return IDMap[chromeStoreID];
    }
    const extensionFolder = await downloadChromeExtension(chromeStoreID, Boolean(forceDownload));
    if (installedExtension) {
      targetSession.removeExtension(installedExtension.id);
    }
    if (await isManifestVersion3(extensionFolder)) {
      throw new Error(`Manifest version 3 is not supported by electron. For more information, see:
    
    https://github.com/facebook/react/issues/25843
    https://github.com/electron/electron/issues/37876
    https://github.com/MarshallOfSound/electron-devtools-installer/issues/238
    https://github.com/electron/electron/blob/e3b7c3024f6f70155efb1022b691954280f983cb/docs/api/extensions.md#L1`);
    }
    const ext2 = await targetSession.loadExtension(extensionFolder, loadExtensionOptions);
    return ext2.name;
  };
  exports.installExtension = installExtension;
  exports.default = exports.installExtension;
  __exportStar(requireExtensions(), exports);
})(dist);
dist.installExtension(dist.VUEJS_DEVTOOLS, {
  loadExtensionOptions: {
    allowFileAccess: true
  }
});
