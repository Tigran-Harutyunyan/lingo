export default defineNuxtPlugin(() => {
  !(function (t, e) {
    "object" == typeof exports && "object" == typeof module
      ? (module.exports = e())
      : "function" == typeof define && define.amd
      ? define([], e)
      : "object" == typeof exports
      ? (exports["vue-confetti"] = e())
      : (t["vue-confetti"] = e());
  })(self, function () {
    return (() => {
      "use strict";
      var t = {
          d: (e, n) => {
            for (var i in n)
              t.o(n, i) &&
                !t.o(e, i) &&
                Object.defineProperty(e, i, { enumerable: !0, get: n[i] });
          },
          o: (t, e) => Object.prototype.hasOwnProperty.call(t, e),
          r: (t) => {
            "undefined" != typeof Symbol &&
              Symbol.toStringTag &&
              Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
              Object.defineProperty(t, "__esModule", { value: !0 });
          },
        },
        e = {};
      t.r(e), t.d(e, { Confetti: () => $, default: () => U });
      const n = function () {
        var t =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1,
          e =
            arguments.length > 1 && void 0 !== arguments[1]
              ? arguments[1]
              : t + 1,
          n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
          i = parseFloat(t),
          r = parseFloat(e),
          o = Math.random() * (r - i) + i;
        return n ? Math.round(o) : o;
      };
      function i(t, e) {
        if (!(t instanceof e))
          throw new TypeError("Cannot call a class as a function");
      }
      function r(t, e) {
        for (var n = 0; n < e.length; n++) {
          var i = e[n];
          (i.enumerable = i.enumerable || !1),
            (i.configurable = !0),
            "value" in i && (i.writable = !0),
            Object.defineProperty(t, i.key, i);
        }
      }
      var o = (function () {
        function t() {
          var e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : {},
            n = e.color,
            r = void 0 === n ? "blue" : n,
            o = e.size,
            a = void 0 === o ? 10 : o,
            c = e.dropRate,
            s = void 0 === c ? 10 : c;
          i(this, t), (this.color = r), (this.size = a), (this.dropRate = s);
        }
        var e, o;
        return (
          (e = t),
          (o = [
            {
              key: "setup",
              value: function (t) {
                var e = t.canvas,
                  i = t.wind,
                  r = t.windPosCoef,
                  o = t.windSpeedMax,
                  a = t.count;
                return (
                  (this.canvas = e),
                  (this.wind = i),
                  (this.windPosCoef = r),
                  (this.windSpeedMax = o),
                  (this.x = n(-35, this.canvas.width + 35)),
                  (this.y = n(-30, -35)),
                  (this.d = n(150) + 10),
                  (this.particleSize = n(this.size, 2 * this.size)),
                  (this.tilt = n(10)),
                  (this.tiltAngleIncremental =
                    (n(0, 0.08) + 0.04) * (n() < 0.5 ? -1 : 1)),
                  (this.tiltAngle = 0),
                  (this.angle = n(2 * Math.PI)),
                  (this.count = a + 1),
                  (this.remove = !1),
                  this
                );
              },
            },
            {
              key: "update",
              value: function () {
                (this.tiltAngle +=
                  this.tiltAngleIncremental *
                  (0.2 *
                    Math.cos(
                      this.wind + (this.d + this.x + this.y) * this.windPosCoef
                    ) +
                    1)),
                  (this.y +=
                    (Math.cos(this.angle + this.d) +
                      parseInt(this.dropRate, 10)) /
                    2),
                  (this.x +=
                    (Math.sin(this.angle) +
                      Math.cos(
                        this.wind +
                          (this.d + this.x + this.y) * this.windPosCoef
                      )) *
                    this.windSpeedMax),
                  (this.y +=
                    Math.sin(
                      this.wind + (this.d + this.x + this.y) * this.windPosCoef
                    ) * this.windSpeedMax),
                  (this.tilt = 15 * Math.sin(this.tiltAngle - this.count / 3));
              },
            },
            {
              key: "pastBottom",
              value: function () {
                return this.y > this.canvas.height;
              },
            },
            {
              key: "draw",
              value: function () {
                (this.canvas.ctx.fillStyle = this.color),
                  this.canvas.ctx.beginPath(),
                  this.canvas.ctx.setTransform(
                    Math.cos(this.tiltAngle),
                    Math.sin(this.tiltAngle),
                    0,
                    1,
                    this.x,
                    this.y
                  );
              },
            },
            {
              key: "kill",
              value: function () {
                this.remove = !0;
              },
            },
          ]) && r(e.prototype, o),
          t
        );
      })();
      function a(t) {
        return (
          (a =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (t) {
                  return typeof t;
                }
              : function (t) {
                  return t &&
                    "function" == typeof Symbol &&
                    t.constructor === Symbol &&
                    t !== Symbol.prototype
                    ? "symbol"
                    : typeof t;
                }),
          a(t)
        );
      }
      function c(t, e) {
        if (!(t instanceof e))
          throw new TypeError("Cannot call a class as a function");
      }
      function s(t, e) {
        for (var n = 0; n < e.length; n++) {
          var i = e[n];
          (i.enumerable = i.enumerable || !1),
            (i.configurable = !0),
            "value" in i && (i.writable = !0),
            Object.defineProperty(t, i.key, i);
        }
      }
      function l(t, e, n) {
        return (
          (l =
            "undefined" != typeof Reflect && Reflect.get
              ? Reflect.get
              : function (t, e, n) {
                  var i = (function (t, e) {
                    for (
                      ;
                      !Object.prototype.hasOwnProperty.call(t, e) &&
                      null !== (t = h(t));

                    );
                    return t;
                  })(t, e);
                  if (i) {
                    var r = Object.getOwnPropertyDescriptor(i, e);
                    return r.get ? r.get.call(n) : r.value;
                  }
                }),
          l(t, e, n || t)
        );
      }
      function u(t, e) {
        return (
          (u =
            Object.setPrototypeOf ||
            function (t, e) {
              return (t.__proto__ = e), t;
            }),
          u(t, e)
        );
      }
      function f(t, e) {
        return !e || ("object" !== a(e) && "function" != typeof e)
          ? (function (t) {
              if (void 0 === t)
                throw new ReferenceError(
                  "this hasn't been initialised - super() hasn't been called"
                );
              return t;
            })(t)
          : e;
      }
      function h(t) {
        return (
          (h = Object.setPrototypeOf
            ? Object.getPrototypeOf
            : function (t) {
                return t.__proto__ || Object.getPrototypeOf(t);
              }),
          h(t)
        );
      }
      var p = (function (t) {
        !(function (t, e) {
          if ("function" != typeof e && null !== e)
            throw new TypeError(
              "Super expression must either be null or a function"
            );
          (t.prototype = Object.create(e && e.prototype, {
            constructor: { value: t, writable: !0, configurable: !0 },
          })),
            e && u(t, e);
        })(a, t);
        var e,
          n,
          i,
          r,
          o =
            ((i = a),
            (r = (function () {
              if ("undefined" == typeof Reflect || !Reflect.construct)
                return !1;
              if (Reflect.construct.sham) return !1;
              if ("function" == typeof Proxy) return !0;
              try {
                return (
                  Boolean.prototype.valueOf.call(
                    Reflect.construct(Boolean, [], function () {})
                  ),
                  !0
                );
              } catch (t) {
                return !1;
              }
            })()),
            function () {
              var t,
                e = h(i);
              if (r) {
                var n = h(this).constructor;
                t = Reflect.construct(e, arguments, n);
              } else t = e.apply(this, arguments);
              return f(this, t);
            });
        function a() {
          return c(this, a), o.apply(this, arguments);
        }
        return (
          (e = a),
          (n = [
            {
              key: "draw",
              value: function () {
                l(h(a.prototype), "draw", this).call(this),
                  this.canvas.ctx.arc(
                    0,
                    0,
                    this.particleSize / 2,
                    0,
                    2 * Math.PI,
                    !1
                  ),
                  this.canvas.ctx.fill();
              },
            },
          ]) && s(e.prototype, n),
          a
        );
      })(o);
      function y(t) {
        return (
          (y =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (t) {
                  return typeof t;
                }
              : function (t) {
                  return t &&
                    "function" == typeof Symbol &&
                    t.constructor === Symbol &&
                    t !== Symbol.prototype
                    ? "symbol"
                    : typeof t;
                }),
          y(t)
        );
      }
      function v(t, e) {
        if (!(t instanceof e))
          throw new TypeError("Cannot call a class as a function");
      }
      function d(t, e) {
        for (var n = 0; n < e.length; n++) {
          var i = e[n];
          (i.enumerable = i.enumerable || !1),
            (i.configurable = !0),
            "value" in i && (i.writable = !0),
            Object.defineProperty(t, i.key, i);
        }
      }
      function m(t, e, n) {
        return (
          (m =
            "undefined" != typeof Reflect && Reflect.get
              ? Reflect.get
              : function (t, e, n) {
                  var i = (function (t, e) {
                    for (
                      ;
                      !Object.prototype.hasOwnProperty.call(t, e) &&
                      null !== (t = g(t));

                    );
                    return t;
                  })(t, e);
                  if (i) {
                    var r = Object.getOwnPropertyDescriptor(i, e);
                    return r.get ? r.get.call(n) : r.value;
                  }
                }),
          m(t, e, n || t)
        );
      }
      function b(t, e) {
        return (
          (b =
            Object.setPrototypeOf ||
            function (t, e) {
              return (t.__proto__ = e), t;
            }),
          b(t, e)
        );
      }
      function w(t, e) {
        return !e || ("object" !== y(e) && "function" != typeof e)
          ? (function (t) {
              if (void 0 === t)
                throw new ReferenceError(
                  "this hasn't been initialised - super() hasn't been called"
                );
              return t;
            })(t)
          : e;
      }
      function g(t) {
        return (
          (g = Object.setPrototypeOf
            ? Object.getPrototypeOf
            : function (t) {
                return t.__proto__ || Object.getPrototypeOf(t);
              }),
          g(t)
        );
      }
      var O = (function (t) {
        !(function (t, e) {
          if ("function" != typeof e && null !== e)
            throw new TypeError(
              "Super expression must either be null or a function"
            );
          (t.prototype = Object.create(e && e.prototype, {
            constructor: { value: t, writable: !0, configurable: !0 },
          })),
            e && b(t, e);
        })(a, t);
        var e,
          n,
          i,
          r,
          o =
            ((i = a),
            (r = (function () {
              if ("undefined" == typeof Reflect || !Reflect.construct)
                return !1;
              if (Reflect.construct.sham) return !1;
              if ("function" == typeof Proxy) return !0;
              try {
                return (
                  Boolean.prototype.valueOf.call(
                    Reflect.construct(Boolean, [], function () {})
                  ),
                  !0
                );
              } catch (t) {
                return !1;
              }
            })()),
            function () {
              var t,
                e = g(i);
              if (r) {
                var n = g(this).constructor;
                t = Reflect.construct(e, arguments, n);
              } else t = e.apply(this, arguments);
              return w(this, t);
            });
        function a() {
          return v(this, a), o.apply(this, arguments);
        }
        return (
          (e = a),
          (n = [
            {
              key: "draw",
              value: function () {
                m(g(a.prototype), "draw", this).call(this),
                  this.canvas.ctx.fillRect(
                    0,
                    0,
                    this.particleSize,
                    this.particleSize / 2
                  );
              },
            },
          ]) && d(e.prototype, n),
          a
        );
      })(o);
      function P(t) {
        return (
          (P =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (t) {
                  return typeof t;
                }
              : function (t) {
                  return t &&
                    "function" == typeof Symbol &&
                    t.constructor === Symbol &&
                    t !== Symbol.prototype
                    ? "symbol"
                    : typeof t;
                }),
          P(t)
        );
      }
      function S(t, e) {
        if (!(t instanceof e))
          throw new TypeError("Cannot call a class as a function");
      }
      function E(t, e) {
        for (var n = 0; n < e.length; n++) {
          var i = e[n];
          (i.enumerable = i.enumerable || !1),
            (i.configurable = !0),
            "value" in i && (i.writable = !0),
            Object.defineProperty(t, i.key, i);
        }
      }
      function j(t, e, n) {
        return (
          (j =
            "undefined" != typeof Reflect && Reflect.get
              ? Reflect.get
              : function (t, e, n) {
                  var i = (function (t, e) {
                    for (
                      ;
                      !Object.prototype.hasOwnProperty.call(t, e) &&
                      null !== (t = x(t));

                    );
                    return t;
                  })(t, e);
                  if (i) {
                    var r = Object.getOwnPropertyDescriptor(i, e);
                    return r.get ? r.get.call(n) : r.value;
                  }
                }),
          j(t, e, n || t)
        );
      }
      function k(t, e) {
        return (
          (k =
            Object.setPrototypeOf ||
            function (t, e) {
              return (t.__proto__ = e), t;
            }),
          k(t, e)
        );
      }
      function R(t, e) {
        return !e || ("object" !== P(e) && "function" != typeof e)
          ? (function (t) {
              if (void 0 === t)
                throw new ReferenceError(
                  "this hasn't been initialised - super() hasn't been called"
                );
              return t;
            })(t)
          : e;
      }
      function x(t) {
        return (
          (x = Object.setPrototypeOf
            ? Object.getPrototypeOf
            : function (t) {
                return t.__proto__ || Object.getPrototypeOf(t);
              }),
          x(t)
        );
      }
      var M = (function (t) {
        !(function (t, e) {
          if ("function" != typeof e && null !== e)
            throw new TypeError(
              "Super expression must either be null or a function"
            );
          (t.prototype = Object.create(e && e.prototype, {
            constructor: { value: t, writable: !0, configurable: !0 },
          })),
            e && k(t, e);
        })(a, t);
        var e,
          n,
          i,
          r,
          o =
            ((i = a),
            (r = (function () {
              if ("undefined" == typeof Reflect || !Reflect.construct)
                return !1;
              if (Reflect.construct.sham) return !1;
              if ("function" == typeof Proxy) return !0;
              try {
                return (
                  Boolean.prototype.valueOf.call(
                    Reflect.construct(Boolean, [], function () {})
                  ),
                  !0
                );
              } catch (t) {
                return !1;
              }
            })()),
            function () {
              var t,
                e = x(i);
              if (r) {
                var n = x(this).constructor;
                t = Reflect.construct(e, arguments, n);
              } else t = e.apply(this, arguments);
              return R(this, t);
            });
        function a() {
          return S(this, a), o.apply(this, arguments);
        }
        return (
          (e = a),
          (n = [
            {
              key: "draw",
              value: function () {
                var t = this;
                j(x(a.prototype), "draw", this).call(this);
                var e = function (e, n, i, r, o, a) {
                  t.canvas.ctx.bezierCurveTo(
                    e * (t.particleSize / 200),
                    n * (t.particleSize / 200),
                    i * (t.particleSize / 200),
                    r * (t.particleSize / 200),
                    o * (t.particleSize / 200),
                    a * (t.particleSize / 200)
                  );
                };
                this.canvas.ctx.moveTo(
                  37.5 / this.particleSize,
                  20 / this.particleSize
                ),
                  e(75, 37, 70, 25, 50, 25),
                  e(20, 25, 20, 62.5, 20, 62.5),
                  e(20, 80, 40, 102, 75, 120),
                  e(110, 102, 130, 80, 130, 62.5),
                  e(130, 62.5, 130, 25, 100, 25),
                  e(85, 25, 75, 37, 75, 40),
                  this.canvas.ctx.fill();
              },
            },
          ]) && E(e.prototype, n),
          a
        );
      })(o);
      function C(t) {
        return (
          (C =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (t) {
                  return typeof t;
                }
              : function (t) {
                  return t &&
                    "function" == typeof Symbol &&
                    t.constructor === Symbol &&
                    t !== Symbol.prototype
                    ? "symbol"
                    : typeof t;
                }),
          C(t)
        );
      }
      function _(t, e) {
        for (var n = 0; n < e.length; n++) {
          var i = e[n];
          (i.enumerable = i.enumerable || !1),
            (i.configurable = !0),
            "value" in i && (i.writable = !0),
            Object.defineProperty(t, i.key, i);
        }
      }
      function I(t, e, n) {
        return (
          (I =
            "undefined" != typeof Reflect && Reflect.get
              ? Reflect.get
              : function (t, e, n) {
                  var i = (function (t, e) {
                    for (
                      ;
                      !Object.prototype.hasOwnProperty.call(t, e) &&
                      null !== (t = z(t));

                    );
                    return t;
                  })(t, e);
                  if (i) {
                    var r = Object.getOwnPropertyDescriptor(i, e);
                    return r.get ? r.get.call(n) : r.value;
                  }
                }),
          I(t, e, n || t)
        );
      }
      function T(t, e) {
        return (
          (T =
            Object.setPrototypeOf ||
            function (t, e) {
              return (t.__proto__ = e), t;
            }),
          T(t, e)
        );
      }
      function D(t, e) {
        return !e || ("object" !== C(e) && "function" != typeof e)
          ? (function (t) {
              if (void 0 === t)
                throw new ReferenceError(
                  "this hasn't been initialised - super() hasn't been called"
                );
              return t;
            })(t)
          : e;
      }
      function z(t) {
        return (
          (z = Object.setPrototypeOf
            ? Object.getPrototypeOf
            : function (t) {
                return t.__proto__ || Object.getPrototypeOf(t);
              }),
          z(t)
        );
      }
      var B = (function (t) {
        !(function (t, e) {
          if ("function" != typeof e && null !== e)
            throw new TypeError(
              "Super expression must either be null or a function"
            );
          (t.prototype = Object.create(e && e.prototype, {
            constructor: { value: t, writable: !0, configurable: !0 },
          })),
            e && T(t, e);
        })(a, t);
        var e,
          n,
          i,
          r,
          o =
            ((i = a),
            (r = (function () {
              if ("undefined" == typeof Reflect || !Reflect.construct)
                return !1;
              if (Reflect.construct.sham) return !1;
              if ("function" == typeof Proxy) return !0;
              try {
                return (
                  Boolean.prototype.valueOf.call(
                    Reflect.construct(Boolean, [], function () {})
                  ),
                  !0
                );
              } catch (t) {
                return !1;
              }
            })()),
            function () {
              var t,
                e = z(i);
              if (r) {
                var n = z(this).constructor;
                t = Reflect.construct(e, arguments, n);
              } else t = e.apply(this, arguments);
              return D(this, t);
            });
        function a(t, e) {
          var n;
          return (
            (function (t, e) {
              if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function");
            })(this, a),
            ((n = o.call(this, t)).imgEl = e),
            n
          );
        }
        return (
          (e = a),
          (n = [
            {
              key: "draw",
              value: function () {
                I(z(a.prototype), "draw", this).call(this),
                  this.canvas.ctx.drawImage(
                    this.imgEl,
                    0,
                    0,
                    this.particleSize,
                    this.particleSize
                  );
              },
            },
          ]) && _(e.prototype, n),
          a
        );
      })(o);
      function F(t, e) {
        for (var n = 0; n < e.length; n++) {
          var i = e[n];
          (i.enumerable = i.enumerable || !1),
            (i.configurable = !0),
            "value" in i && (i.writable = !0),
            Object.defineProperty(t, i.key, i);
        }
      }
      var A = (function () {
        function t() {
          !(function (t, e) {
            if (!(t instanceof e))
              throw new TypeError("Cannot call a class as a function");
          })(this, t),
            (this.cachedImages = {});
        }
        var e, i;
        return (
          (e = t),
          (i = [
            {
              key: "createImageElement",
              value: function (t) {
                var e = document.createElement("img");
                return e.setAttribute("src", t), e;
              },
            },
            {
              key: "getImageElement",
              value: function (t) {
                return (
                  this.cachedImages[t] ||
                    (this.cachedImages[t] = this.createImageElement(t)),
                  this.cachedImages[t]
                );
              },
            },
            {
              key: "getRandomParticle",
              value: function () {
                var t =
                    arguments.length > 0 && void 0 !== arguments[0]
                      ? arguments[0]
                      : {},
                  e = t.particles || [];
                return e.length < 1
                  ? {}
                  : e[Math.floor(Math.random() * e.length)];
              },
            },
            {
              key: "getDefaults",
              value: function () {
                var t =
                  arguments.length > 0 && void 0 !== arguments[0]
                    ? arguments[0]
                    : {};
                return {
                  type: t.defaultType || "circle",
                  size: t.defaultSize || 10,
                  dropRate: t.defaultDropRate || 10,
                  colors: t.defaultColors || [
                    "DodgerBlue",
                    "OliveDrab",
                    "Gold",
                    "pink",
                    "SlateBlue",
                    "lightblue",
                    "Violet",
                    "PaleGreen",
                    "SteelBlue",
                    "SandyBrown",
                    "Chocolate",
                    "Crimson",
                  ],
                  url: null,
                };
              },
            },
            {
              key: "create",
              value: function (t) {
                var e = this.getDefaults(t),
                  i = this.getRandomParticle(t),
                  r = Object.assign(e, i),
                  o = n(0, r.colors.length - 1, !0);
                if (((r.color = r.colors[o]), "circle" === r.type))
                  return new p(r);
                if ("rect" === r.type) return new O(r);
                if ("heart" === r.type) return new M(r);
                if ("image" === r.type)
                  return new B(r, this.getImageElement(r.url));
                throw Error('Unknown particle type: "'.concat(r.type, '"'));
              },
            },
          ]),
          i && F(e.prototype, i),
          t
        );
      })();
      function H(t, e) {
        for (var n = 0; n < e.length; n++) {
          var i = e[n];
          (i.enumerable = i.enumerable || !1),
            (i.configurable = !0),
            "value" in i && (i.writable = !0),
            Object.defineProperty(t, i.key, i);
        }
      }
      var L = (function () {
        function t(e) {
          !(function (t, e) {
            if (!(t instanceof e))
              throw new TypeError("Cannot call a class as a function");
          })(this, t),
            (this.items = []),
            (this.pool = []),
            (this.particleOptions = e),
            (this.particleFactory = new A());
        }
        var e, n;
        return (
          (e = t),
          (n = [
            {
              key: "update",
              value: function () {
                var t,
                  e = this,
                  n = [],
                  i = [];
                this.items.forEach(function (t) {
                  t.update(),
                    t.pastBottom()
                      ? t.remove || (t.setup(e.particleOptions), n.push(t))
                      : i.push(t);
                }),
                  (t = this.pool).push.apply(t, n),
                  (this.items = i);
              },
            },
            {
              key: "draw",
              value: function () {
                this.items.forEach(function (t) {
                  return t.draw();
                });
              },
            },
            {
              key: "add",
              value: function () {
                this.pool.length > 0
                  ? this.items.push(this.pool.pop().setup(this.particleOptions))
                  : this.items.push(
                      this.particleFactory
                        .create(this.particleOptions)
                        .setup(this.particleOptions)
                    );
              },
            },
            {
              key: "refresh",
              value: function () {
                this.items.forEach(function (t) {
                  t.kill();
                }),
                  (this.pool = []);
              },
            },
          ]) && H(e.prototype, n),
          t
        );
      })();
      function G(t, e) {
        for (var n = 0; n < e.length; n++) {
          var i = e[n];
          (i.enumerable = i.enumerable || !1),
            (i.configurable = !0),
            "value" in i && (i.writable = !0),
            Object.defineProperty(t, i.key, i);
        }
      }
      var W = (function () {
        function t(e) {
          !(function (t, e) {
            if (!(t instanceof e))
              throw new TypeError("Cannot call a class as a function");
          })(this, t);
          var n = "confetti-canvas";
          if (e && !(e instanceof HTMLCanvasElement))
            throw new Error("Element is not a valid HTMLCanvasElement");
          (this.isDefault = !e),
            (this.canvas =
              e || document.getElementById(n) || t.createDefaultCanvas(n)),
            (this.ctx = this.canvas.getContext("2d"));
        }
        var e, n, i;
        return (
          (e = t),
          (i = [
            {
              key: "createDefaultCanvas",
              value: function (t) {
                var e = document.createElement("canvas");
                return (
                  (e.style.display = "block"),
                  (e.style.position = "fixed"),
                  (e.style.pointerEvents = "none"),
                  (e.style.top = 0),
                  (e.style.width = "100vw"),
                  (e.style.height = "100vh"),
                  (e.id = t),
                  document.querySelector("body").appendChild(e),
                  e
                );
              },
            },
          ]),
          (n = [
            {
              key: "width",
              get: function () {
                return this.canvas.width;
              },
            },
            {
              key: "height",
              get: function () {
                return this.canvas.height;
              },
            },
            {
              key: "clear",
              value: function () {
                this.ctx.setTransform(1, 0, 0, 1, 0, 0),
                  this.ctx.clearRect(0, 0, this.width, this.height);
              },
            },
            {
              key: "updateDimensions",
              value: function () {
                this.isDefault &&
                  ((this.width === window.innerWidth &&
                    this.height === window.innerHeight) ||
                    ((this.canvas.width = window.innerWidth),
                    (this.canvas.height = window.innerHeight)));
              },
            },
          ]) && G(e.prototype, n),
          i && G(e, i),
          t
        );
      })();
      function q(t, e) {
        for (var n = 0; n < e.length; n++) {
          var i = e[n];
          (i.enumerable = i.enumerable || !1),
            (i.configurable = !0),
            "value" in i && (i.writable = !0),
            Object.defineProperty(t, i.key, i);
        }
      }
      var $ = (function () {
        function t() {
          !(function (t, e) {
            if (!(t instanceof e))
              throw new TypeError("Cannot call a class as a function");
          })(this, t),
            this.setDefaults();
        }
        var e, n;
        return (
          (e = t),
          (n = [
            {
              key: "setDefaults",
              value: function () {
                (this.killed = !1),
                  (this.framesSinceDrop = 0),
                  (this.canvas = null),
                  (this.canvasEl = null),
                  (this.W = 0),
                  (this.H = 0),
                  (this.particleManager = null),
                  (this.particlesPerFrame = 0),
                  (this.wind = 0),
                  (this.windSpeed = 1),
                  (this.windSpeedMax = 1),
                  (this.windChange = 0.01),
                  (this.windPosCoef = 0.002),
                  (this.animationId = null);
              },
            },
            {
              key: "getParticleOptions",
              value: function (t) {
                var e = {
                  canvas: this.canvas,
                  W: this.W,
                  H: this.H,
                  wind: this.wind,
                  windPosCoef: this.windPosCoef,
                  windSpeedMax: this.windSpeedMax,
                  count: 0,
                };
                return Object.assign(e, t), e;
              },
            },
            {
              key: "createParticles",
              value: function () {
                var t =
                    arguments.length > 0 && void 0 !== arguments[0]
                      ? arguments[0]
                      : {},
                  e = this.getParticleOptions(t);
                this.particleManager = new L(e);
              },
            },
            {
              key: "getCanvasElementFromOptions",
              value: function (t) {
                var e = t.canvasId,
                  n = t.canvasElement,
                  i = n;
                if (n && !(n instanceof HTMLCanvasElement))
                  throw new Error(
                    "Invalid options: canvasElement is not a valid HTMLCanvasElement"
                  );
                if (e && n)
                  throw new Error(
                    "Invalid options: canvasId and canvasElement are mutually exclusive"
                  );
                if (
                  (e && !i && (i = document.getElementById(e)),
                  e && !(i instanceof HTMLCanvasElement))
                )
                  throw new Error(
                    'Invalid options: element with id "'.concat(
                      e,
                      '" is not a valid HTMLCanvasElement'
                    )
                  );
                return i;
              },
            },
            {
              key: "start",
              value: function () {
                var t =
                  arguments.length > 0 && void 0 !== arguments[0]
                    ? arguments[0]
                    : {};
                this.remove();
                var e = this.getCanvasElementFromOptions(t);
                (this.canvas = new W(e)),
                  (this.canvasEl = e),
                  this.createParticles(t),
                  this.setGlobalOptions(t),
                  (this.animationId = requestAnimationFrame(
                    this.mainLoop.bind(this)
                  ));
              },
            },
            {
              key: "setGlobalOptions",
              value: function (t) {
                (this.particlesPerFrame = t.particlesPerFrame || 2),
                  (this.windSpeedMax = t.windSpeedMax || 1);
              },
            },
            {
              key: "stop",
              value: function () {
                (this.killed = !0), (this.particlesPerFrame = 0);
              },
            },
            {
              key: "update",
              value: function (t) {
                var e = this.getCanvasElementFromOptions(t);
                this.canvas && e !== this.canvasEl
                  ? this.start(t)
                  : (this.setGlobalOptions(t),
                    this.particleManager &&
                      ((this.particleManager.particleOptions =
                        this.getParticleOptions(t)),
                      this.particleManager.refresh()));
              },
            },
            {
              key: "remove",
              value: function () {
                this.stop(),
                  this.animationId && cancelAnimationFrame(this.animationId),
                  this.canvas && this.canvas.clear(),
                  this.setDefaults();
              },
            },
            {
              key: "mainLoop",
              value: function (t) {
                this.canvas.updateDimensions(),
                  this.canvas.clear(),
                  (this.windSpeed = Math.sin(t / 8e3) * this.windSpeedMax),
                  (this.wind = this.particleManager.particleOptions.wind +=
                    this.windChange);
                for (
                  var e = this.framesSinceDrop * this.particlesPerFrame;
                  e >= 1;

                )
                  this.particleManager.add(),
                    (e -= 1),
                    (this.framesSinceDrop = 0);
                this.particleManager.update(),
                  this.particleManager.draw(),
                  (this.killed && !this.particleManager.items.length) ||
                    (this.animationId = requestAnimationFrame(
                      this.mainLoop.bind(this)
                    )),
                  (this.framesSinceDrop += 1);
              },
            },
          ]),
          n && q(e.prototype, n),
          t
        );
      })();
      const U = {
        install: function (t, e) {
          if (!this.installed) {
            this.installed = !0;
            try {
              t.config.globalProperties.$confetti = new $(e);
            } catch (n) {
              t.prototype.$confetti = new $(e);
            }
          }
        },
      };
      return e;
    })();
  });
});
