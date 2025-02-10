(() => {
  // output/Control.Semigroupoid/index.js
  var semigroupoidFn = {
    compose: function(f) {
      return function(g) {
        return function(x) {
          return f(g(x));
        };
      };
    }
  };
  var compose = function(dict) {
    return dict.compose;
  };
  var composeFlipped = function(dictSemigroupoid) {
    var compose1 = compose(dictSemigroupoid);
    return function(f) {
      return function(g) {
        return compose1(g)(f);
      };
    };
  };

  // output/Control.Category/index.js
  var identity = function(dict) {
    return dict.identity;
  };
  var categoryFn = {
    identity: function(x) {
      return x;
    },
    Semigroupoid0: function() {
      return semigroupoidFn;
    }
  };

  // output/Data.Boolean/index.js
  var otherwise = true;

  // output/Data.Function/index.js
  var flip = function(f) {
    return function(b) {
      return function(a) {
        return f(a)(b);
      };
    };
  };
  var $$const = function(a) {
    return function(v) {
      return a;
    };
  };
  var applyFlipped = function(x) {
    return function(f) {
      return f(x);
    };
  };
  var apply = function(f) {
    return function(x) {
      return f(x);
    };
  };

  // output/Data.Functor/foreign.js
  var arrayMap = function(f) {
    return function(arr) {
      var l = arr.length;
      var result = new Array(l);
      for (var i = 0; i < l; i++) {
        result[i] = f(arr[i]);
      }
      return result;
    };
  };

  // output/Data.Unit/foreign.js
  var unit = void 0;

  // output/Data.Functor/index.js
  var map = function(dict) {
    return dict.map;
  };
  var mapFlipped = function(dictFunctor) {
    var map13 = map(dictFunctor);
    return function(fa) {
      return function(f) {
        return map13(f)(fa);
      };
    };
  };
  var $$void = function(dictFunctor) {
    return map(dictFunctor)($$const(unit));
  };
  var functorArray = {
    map: arrayMap
  };

  // output/Control.Apply/index.js
  var identity2 = /* @__PURE__ */ identity(categoryFn);
  var apply2 = function(dict) {
    return dict.apply;
  };
  var applySecond = function(dictApply) {
    var apply12 = apply2(dictApply);
    var map11 = map(dictApply.Functor0());
    return function(a) {
      return function(b) {
        return apply12(map11($$const(identity2))(a))(b);
      };
    };
  };
  var lift2 = function(dictApply) {
    var apply12 = apply2(dictApply);
    var map11 = map(dictApply.Functor0());
    return function(f) {
      return function(a) {
        return function(b) {
          return apply12(map11(f)(a))(b);
        };
      };
    };
  };

  // output/Control.Applicative/index.js
  var pure = function(dict) {
    return dict.pure;
  };
  var liftA1 = function(dictApplicative) {
    var apply4 = apply2(dictApplicative.Apply0());
    var pure13 = pure(dictApplicative);
    return function(f) {
      return function(a) {
        return apply4(pure13(f))(a);
      };
    };
  };

  // output/Control.Bind/index.js
  var identity3 = /* @__PURE__ */ identity(categoryFn);
  var discard = function(dict) {
    return dict.discard;
  };
  var bind = function(dict) {
    return dict.bind;
  };
  var bindFlipped = function(dictBind) {
    return flip(bind(dictBind));
  };
  var discardUnit = {
    discard: function(dictBind) {
      return bind(dictBind);
    }
  };
  var join = function(dictBind) {
    var bind13 = bind(dictBind);
    return function(m) {
      return bind13(m)(identity3);
    };
  };

  // output/Data.Array/foreign.js
  var rangeImpl = function(start2, end2) {
    var step2 = start2 > end2 ? -1 : 1;
    var result = new Array(step2 * (end2 - start2) + 1);
    var i = start2, n = 0;
    while (i !== end2) {
      result[n++] = i;
      i += step2;
    }
    result[n] = i;
    return result;
  };
  var replicateFill = function(count, value12) {
    if (count < 1) {
      return [];
    }
    var result = new Array(count);
    return result.fill(value12);
  };
  var replicatePolyfill = function(count, value12) {
    var result = [];
    var n = 0;
    for (var i = 0; i < count; i++) {
      result[n++] = value12;
    }
    return result;
  };
  var replicateImpl = typeof Array.prototype.fill === "function" ? replicateFill : replicatePolyfill;
  var length = function(xs) {
    return xs.length;
  };
  var unconsImpl = function(empty6, next, xs) {
    return xs.length === 0 ? empty6({}) : next(xs[0])(xs.slice(1));
  };
  var indexImpl = function(just, nothing, xs, i) {
    return i < 0 || i >= xs.length ? nothing : just(xs[i]);
  };
  var findMapImpl = function(nothing, isJust2, f, xs) {
    for (var i = 0; i < xs.length; i++) {
      var result = f(xs[i]);
      if (isJust2(result)) return result;
    }
    return nothing;
  };
  var findIndexImpl = function(just, nothing, f, xs) {
    for (var i = 0, l = xs.length; i < l; i++) {
      if (f(xs[i])) return just(i);
    }
    return nothing;
  };
  var _insertAt = function(just, nothing, i, a, l) {
    if (i < 0 || i > l.length) return nothing;
    var l1 = l.slice();
    l1.splice(i, 0, a);
    return just(l1);
  };
  var _updateAt = function(just, nothing, i, a, l) {
    if (i < 0 || i >= l.length) return nothing;
    var l1 = l.slice();
    l1[i] = a;
    return just(l1);
  };
  var concat = function(xss) {
    if (xss.length <= 1e4) {
      return Array.prototype.concat.apply([], xss);
    }
    var result = [];
    for (var i = 0, l = xss.length; i < l; i++) {
      var xs = xss[i];
      for (var j = 0, m = xs.length; j < m; j++) {
        result.push(xs[j]);
      }
    }
    return result;
  };
  var filterImpl = function(f, xs) {
    return xs.filter(f);
  };
  var sliceImpl = function(s, e, l) {
    return l.slice(s, e);
  };
  var allImpl = function(p, xs) {
    var len = xs.length;
    for (var i = 0; i < len; i++) {
      if (!p(xs[i])) return false;
    }
    return true;
  };
  var unsafeIndexImpl = function(xs, n) {
    return xs[n];
  };

  // output/Data.Semigroup/foreign.js
  var concatString = function(s1) {
    return function(s2) {
      return s1 + s2;
    };
  };
  var concatArray = function(xs) {
    return function(ys) {
      if (xs.length === 0) return ys;
      if (ys.length === 0) return xs;
      return xs.concat(ys);
    };
  };

  // output/Data.Semigroup/index.js
  var semigroupUnit = {
    append: function(v) {
      return function(v1) {
        return unit;
      };
    }
  };
  var semigroupString = {
    append: concatString
  };
  var semigroupArray = {
    append: concatArray
  };
  var append = function(dict) {
    return dict.append;
  };

  // output/Control.Alt/index.js
  var alt = function(dict) {
    return dict.alt;
  };

  // output/Control.Monad/index.js
  var ap = function(dictMonad) {
    var bind5 = bind(dictMonad.Bind1());
    var pure7 = pure(dictMonad.Applicative0());
    return function(f) {
      return function(a) {
        return bind5(f)(function(f$prime) {
          return bind5(a)(function(a$prime) {
            return pure7(f$prime(a$prime));
          });
        });
      };
    };
  };

  // output/Data.Bounded/foreign.js
  var topChar = String.fromCharCode(65535);
  var bottomChar = String.fromCharCode(0);
  var topNumber = Number.POSITIVE_INFINITY;
  var bottomNumber = Number.NEGATIVE_INFINITY;

  // output/Data.Ord/foreign.js
  var unsafeCompareImpl = function(lt) {
    return function(eq6) {
      return function(gt) {
        return function(x) {
          return function(y) {
            return x < y ? lt : x === y ? eq6 : gt;
          };
        };
      };
    };
  };
  var ordIntImpl = unsafeCompareImpl;
  var ordNumberImpl = unsafeCompareImpl;
  var ordStringImpl = unsafeCompareImpl;

  // output/Data.Eq/foreign.js
  var refEq = function(r1) {
    return function(r2) {
      return r1 === r2;
    };
  };
  var eqBooleanImpl = refEq;
  var eqIntImpl = refEq;
  var eqNumberImpl = refEq;
  var eqStringImpl = refEq;
  var eqArrayImpl = function(f) {
    return function(xs) {
      return function(ys) {
        if (xs.length !== ys.length) return false;
        for (var i = 0; i < xs.length; i++) {
          if (!f(xs[i])(ys[i])) return false;
        }
        return true;
      };
    };
  };

  // output/Data.Eq/index.js
  var eqString = {
    eq: eqStringImpl
  };
  var eqNumber = {
    eq: eqNumberImpl
  };
  var eqInt = {
    eq: eqIntImpl
  };
  var eqBoolean = {
    eq: eqBooleanImpl
  };
  var eq = function(dict) {
    return dict.eq;
  };
  var eq2 = /* @__PURE__ */ eq(eqBoolean);
  var eqArray = function(dictEq) {
    return {
      eq: eqArrayImpl(eq(dictEq))
    };
  };
  var notEq = function(dictEq) {
    var eq32 = eq(dictEq);
    return function(x) {
      return function(y) {
        return eq2(eq32(x)(y))(false);
      };
    };
  };

  // output/Data.Ordering/index.js
  var LT = /* @__PURE__ */ function() {
    function LT2() {
    }
    ;
    LT2.value = new LT2();
    return LT2;
  }();
  var GT = /* @__PURE__ */ function() {
    function GT2() {
    }
    ;
    GT2.value = new GT2();
    return GT2;
  }();
  var EQ = /* @__PURE__ */ function() {
    function EQ2() {
    }
    ;
    EQ2.value = new EQ2();
    return EQ2;
  }();

  // output/Data.Semiring/foreign.js
  var intAdd = function(x) {
    return function(y) {
      return x + y | 0;
    };
  };
  var intMul = function(x) {
    return function(y) {
      return x * y | 0;
    };
  };

  // output/Data.Semiring/index.js
  var semiringInt = {
    add: intAdd,
    zero: 0,
    mul: intMul,
    one: 1
  };
  var add = function(dict) {
    return dict.add;
  };

  // output/Data.Ord/index.js
  var ordString = /* @__PURE__ */ function() {
    return {
      compare: ordStringImpl(LT.value)(EQ.value)(GT.value),
      Eq0: function() {
        return eqString;
      }
    };
  }();
  var ordNumber = /* @__PURE__ */ function() {
    return {
      compare: ordNumberImpl(LT.value)(EQ.value)(GT.value),
      Eq0: function() {
        return eqNumber;
      }
    };
  }();
  var ordInt = /* @__PURE__ */ function() {
    return {
      compare: ordIntImpl(LT.value)(EQ.value)(GT.value),
      Eq0: function() {
        return eqInt;
      }
    };
  }();
  var compare = function(dict) {
    return dict.compare;
  };
  var max = function(dictOrd) {
    var compare3 = compare(dictOrd);
    return function(x) {
      return function(y) {
        var v = compare3(x)(y);
        if (v instanceof LT) {
          return y;
        }
        ;
        if (v instanceof EQ) {
          return x;
        }
        ;
        if (v instanceof GT) {
          return x;
        }
        ;
        throw new Error("Failed pattern match at Data.Ord (line 181, column 3 - line 184, column 12): " + [v.constructor.name]);
      };
    };
  };
  var min = function(dictOrd) {
    var compare3 = compare(dictOrd);
    return function(x) {
      return function(y) {
        var v = compare3(x)(y);
        if (v instanceof LT) {
          return x;
        }
        ;
        if (v instanceof EQ) {
          return x;
        }
        ;
        if (v instanceof GT) {
          return y;
        }
        ;
        throw new Error("Failed pattern match at Data.Ord (line 172, column 3 - line 175, column 12): " + [v.constructor.name]);
      };
    };
  };

  // output/Data.Show/foreign.js
  var showIntImpl = function(n) {
    return n.toString();
  };
  var showNumberImpl = function(n) {
    var str = n.toString();
    return isNaN(str + ".0") ? str : str + ".0";
  };

  // output/Data.Show/index.js
  var showNumber = {
    show: showNumberImpl
  };
  var showInt = {
    show: showIntImpl
  };
  var show = function(dict) {
    return dict.show;
  };

  // output/Data.Maybe/index.js
  var identity4 = /* @__PURE__ */ identity(categoryFn);
  var Nothing = /* @__PURE__ */ function() {
    function Nothing2() {
    }
    ;
    Nothing2.value = new Nothing2();
    return Nothing2;
  }();
  var Just = /* @__PURE__ */ function() {
    function Just2(value0) {
      this.value0 = value0;
    }
    ;
    Just2.create = function(value0) {
      return new Just2(value0);
    };
    return Just2;
  }();
  var maybe = function(v) {
    return function(v1) {
      return function(v2) {
        if (v2 instanceof Nothing) {
          return v;
        }
        ;
        if (v2 instanceof Just) {
          return v1(v2.value0);
        }
        ;
        throw new Error("Failed pattern match at Data.Maybe (line 237, column 1 - line 237, column 51): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
      };
    };
  };
  var isNothing = /* @__PURE__ */ maybe(true)(/* @__PURE__ */ $$const(false));
  var isJust = /* @__PURE__ */ maybe(false)(/* @__PURE__ */ $$const(true));
  var functorMaybe = {
    map: function(v) {
      return function(v1) {
        if (v1 instanceof Just) {
          return new Just(v(v1.value0));
        }
        ;
        return Nothing.value;
      };
    }
  };
  var map2 = /* @__PURE__ */ map(functorMaybe);
  var fromMaybe = function(a) {
    return maybe(a)(identity4);
  };
  var fromJust = function() {
    return function(v) {
      if (v instanceof Just) {
        return v.value0;
      }
      ;
      throw new Error("Failed pattern match at Data.Maybe (line 288, column 1 - line 288, column 46): " + [v.constructor.name]);
    };
  };
  var eqMaybe = function(dictEq) {
    var eq6 = eq(dictEq);
    return {
      eq: function(x) {
        return function(y) {
          if (x instanceof Nothing && y instanceof Nothing) {
            return true;
          }
          ;
          if (x instanceof Just && y instanceof Just) {
            return eq6(x.value0)(y.value0);
          }
          ;
          return false;
        };
      }
    };
  };
  var applyMaybe = {
    apply: function(v) {
      return function(v1) {
        if (v instanceof Just) {
          return map2(v.value0)(v1);
        }
        ;
        if (v instanceof Nothing) {
          return Nothing.value;
        }
        ;
        throw new Error("Failed pattern match at Data.Maybe (line 67, column 1 - line 69, column 30): " + [v.constructor.name, v1.constructor.name]);
      };
    },
    Functor0: function() {
      return functorMaybe;
    }
  };
  var bindMaybe = {
    bind: function(v) {
      return function(v1) {
        if (v instanceof Just) {
          return v1(v.value0);
        }
        ;
        if (v instanceof Nothing) {
          return Nothing.value;
        }
        ;
        throw new Error("Failed pattern match at Data.Maybe (line 125, column 1 - line 127, column 28): " + [v.constructor.name, v1.constructor.name]);
      };
    },
    Apply0: function() {
      return applyMaybe;
    }
  };
  var applicativeMaybe = /* @__PURE__ */ function() {
    return {
      pure: Just.create,
      Apply0: function() {
        return applyMaybe;
      }
    };
  }();
  var altMaybe = {
    alt: function(v) {
      return function(v1) {
        if (v instanceof Nothing) {
          return v1;
        }
        ;
        return v;
      };
    },
    Functor0: function() {
      return functorMaybe;
    }
  };

  // output/Data.Either/index.js
  var Left = /* @__PURE__ */ function() {
    function Left2(value0) {
      this.value0 = value0;
    }
    ;
    Left2.create = function(value0) {
      return new Left2(value0);
    };
    return Left2;
  }();
  var Right = /* @__PURE__ */ function() {
    function Right2(value0) {
      this.value0 = value0;
    }
    ;
    Right2.create = function(value0) {
      return new Right2(value0);
    };
    return Right2;
  }();

  // output/Data.Identity/index.js
  var Identity = function(x) {
    return x;
  };
  var functorIdentity = {
    map: function(f) {
      return function(m) {
        return f(m);
      };
    }
  };
  var applyIdentity = {
    apply: function(v) {
      return function(v1) {
        return v(v1);
      };
    },
    Functor0: function() {
      return functorIdentity;
    }
  };
  var bindIdentity = {
    bind: function(v) {
      return function(f) {
        return f(v);
      };
    },
    Apply0: function() {
      return applyIdentity;
    }
  };
  var applicativeIdentity = {
    pure: Identity,
    Apply0: function() {
      return applyIdentity;
    }
  };
  var monadIdentity = {
    Applicative0: function() {
      return applicativeIdentity;
    },
    Bind1: function() {
      return bindIdentity;
    }
  };

  // output/Data.Monoid/index.js
  var monoidUnit = {
    mempty: unit,
    Semigroup0: function() {
      return semigroupUnit;
    }
  };
  var monoidString = {
    mempty: "",
    Semigroup0: function() {
      return semigroupString;
    }
  };
  var monoidArray = {
    mempty: [],
    Semigroup0: function() {
      return semigroupArray;
    }
  };
  var mempty = function(dict) {
    return dict.mempty;
  };

  // output/Effect/foreign.js
  var pureE = function(a) {
    return function() {
      return a;
    };
  };
  var bindE = function(a) {
    return function(f) {
      return function() {
        return f(a())();
      };
    };
  };
  var foreachE = function(as) {
    return function(f) {
      return function() {
        for (var i = 0, l = as.length; i < l; i++) {
          f(as[i])();
        }
      };
    };
  };

  // output/Effect/index.js
  var $runtime_lazy = function(name16, moduleName, init3) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2) return val;
      if (state3 === 1) throw new ReferenceError(name16 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init3();
      state3 = 2;
      return val;
    };
  };
  var monadEffect = {
    Applicative0: function() {
      return applicativeEffect;
    },
    Bind1: function() {
      return bindEffect;
    }
  };
  var bindEffect = {
    bind: bindE,
    Apply0: function() {
      return $lazy_applyEffect(0);
    }
  };
  var applicativeEffect = {
    pure: pureE,
    Apply0: function() {
      return $lazy_applyEffect(0);
    }
  };
  var $lazy_functorEffect = /* @__PURE__ */ $runtime_lazy("functorEffect", "Effect", function() {
    return {
      map: liftA1(applicativeEffect)
    };
  });
  var $lazy_applyEffect = /* @__PURE__ */ $runtime_lazy("applyEffect", "Effect", function() {
    return {
      apply: ap(monadEffect),
      Functor0: function() {
        return $lazy_functorEffect(0);
      }
    };
  });
  var functorEffect = /* @__PURE__ */ $lazy_functorEffect(20);
  var applyEffect = /* @__PURE__ */ $lazy_applyEffect(23);
  var lift22 = /* @__PURE__ */ lift2(applyEffect);
  var semigroupEffect = function(dictSemigroup) {
    return {
      append: lift22(append(dictSemigroup))
    };
  };
  var monoidEffect = function(dictMonoid) {
    var semigroupEffect1 = semigroupEffect(dictMonoid.Semigroup0());
    return {
      mempty: pureE(mempty(dictMonoid)),
      Semigroup0: function() {
        return semigroupEffect1;
      }
    };
  };

  // output/Effect.Ref/foreign.js
  var _new = function(val) {
    return function() {
      return { value: val };
    };
  };
  var read = function(ref) {
    return function() {
      return ref.value;
    };
  };
  var modifyImpl = function(f) {
    return function(ref) {
      return function() {
        var t = f(ref.value);
        ref.value = t.state;
        return t.value;
      };
    };
  };
  var write = function(val) {
    return function(ref) {
      return function() {
        ref.value = val;
      };
    };
  };

  // output/Effect.Ref/index.js
  var $$void2 = /* @__PURE__ */ $$void(functorEffect);
  var $$new = _new;
  var modify$prime = modifyImpl;
  var modify = function(f) {
    return modify$prime(function(s) {
      var s$prime = f(s);
      return {
        state: s$prime,
        value: s$prime
      };
    });
  };
  var modify_ = function(f) {
    return function(s) {
      return $$void2(modify(f)(s));
    };
  };

  // output/Control.Monad.ST.Internal/foreign.js
  var map_ = function(f) {
    return function(a) {
      return function() {
        return f(a());
      };
    };
  };
  var pure_ = function(a) {
    return function() {
      return a;
    };
  };
  var bind_ = function(a) {
    return function(f) {
      return function() {
        return f(a())();
      };
    };
  };
  function forST(lo) {
    return function(hi) {
      return function(f) {
        return function() {
          for (var i = lo; i < hi; i++) {
            f(i)();
          }
        };
      };
    };
  }

  // output/Control.Monad.ST.Internal/index.js
  var $runtime_lazy2 = function(name16, moduleName, init3) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2) return val;
      if (state3 === 1) throw new ReferenceError(name16 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init3();
      state3 = 2;
      return val;
    };
  };
  var functorST = {
    map: map_
  };
  var monadST = {
    Applicative0: function() {
      return applicativeST;
    },
    Bind1: function() {
      return bindST;
    }
  };
  var bindST = {
    bind: bind_,
    Apply0: function() {
      return $lazy_applyST(0);
    }
  };
  var applicativeST = {
    pure: pure_,
    Apply0: function() {
      return $lazy_applyST(0);
    }
  };
  var $lazy_applyST = /* @__PURE__ */ $runtime_lazy2("applyST", "Control.Monad.ST.Internal", function() {
    return {
      apply: ap(monadST),
      Functor0: function() {
        return functorST;
      }
    };
  });

  // output/Data.Array.ST/foreign.js
  function newSTArray() {
    return [];
  }
  var peekImpl = function(just, nothing, i, xs) {
    return i >= 0 && i < xs.length ? just(xs[i]) : nothing;
  };
  var pokeImpl = function(i, a, xs) {
    var ret = i >= 0 && i < xs.length;
    if (ret) xs[i] = a;
    return ret;
  };
  function unsafeFreezeThawImpl(xs) {
    return xs;
  }
  var unsafeFreezeImpl = unsafeFreezeThawImpl;
  function copyImpl(xs) {
    return xs.slice();
  }
  var thawImpl = copyImpl;
  var pushImpl = function(a, xs) {
    return xs.push(a);
  };

  // output/Control.Monad.ST.Uncurried/foreign.js
  var runSTFn1 = function runSTFn12(fn) {
    return function(a) {
      return function() {
        return fn(a);
      };
    };
  };
  var runSTFn2 = function runSTFn22(fn) {
    return function(a) {
      return function(b) {
        return function() {
          return fn(a, b);
        };
      };
    };
  };
  var runSTFn3 = function runSTFn32(fn) {
    return function(a) {
      return function(b) {
        return function(c) {
          return function() {
            return fn(a, b, c);
          };
        };
      };
    };
  };
  var runSTFn4 = function runSTFn42(fn) {
    return function(a) {
      return function(b) {
        return function(c) {
          return function(d) {
            return function() {
              return fn(a, b, c, d);
            };
          };
        };
      };
    };
  };

  // output/Data.Array.ST/index.js
  var bind2 = /* @__PURE__ */ bind(bindST);
  var unsafeFreeze = /* @__PURE__ */ runSTFn1(unsafeFreezeImpl);
  var thaw = /* @__PURE__ */ runSTFn1(thawImpl);
  var withArray = function(f) {
    return function(xs) {
      return function __do4() {
        var result = thaw(xs)();
        f(result)();
        return unsafeFreeze(result)();
      };
    };
  };
  var run2 = function(st) {
    return bind2(st)(unsafeFreeze)();
  };
  var push = /* @__PURE__ */ runSTFn2(pushImpl);
  var poke = /* @__PURE__ */ runSTFn3(pokeImpl);
  var peek = /* @__PURE__ */ function() {
    return runSTFn4(peekImpl)(Just.create)(Nothing.value);
  }();
  var modify2 = function(i) {
    return function(f) {
      return function(xs) {
        return function __do4() {
          var entry = peek(i)(xs)();
          if (entry instanceof Just) {
            return poke(i)(f(entry.value0))(xs)();
          }
          ;
          if (entry instanceof Nothing) {
            return false;
          }
          ;
          throw new Error("Failed pattern match at Data.Array.ST (line 234, column 3 - line 236, column 26): " + [entry.constructor.name]);
        };
      };
    };
  };

  // output/Data.Foldable/foreign.js
  var foldrArray = function(f) {
    return function(init3) {
      return function(xs) {
        var acc = init3;
        var len = xs.length;
        for (var i = len - 1; i >= 0; i--) {
          acc = f(xs[i])(acc);
        }
        return acc;
      };
    };
  };
  var foldlArray = function(f) {
    return function(init3) {
      return function(xs) {
        var acc = init3;
        var len = xs.length;
        for (var i = 0; i < len; i++) {
          acc = f(acc)(xs[i]);
        }
        return acc;
      };
    };
  };

  // output/Data.Tuple/index.js
  var Tuple = /* @__PURE__ */ function() {
    function Tuple2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Tuple2.create = function(value0) {
      return function(value1) {
        return new Tuple2(value0, value1);
      };
    };
    return Tuple2;
  }();
  var snd = function(v) {
    return v.value1;
  };
  var fst = function(v) {
    return v.value0;
  };

  // output/Unsafe.Coerce/foreign.js
  var unsafeCoerce2 = function(x) {
    return x;
  };

  // output/Safe.Coerce/index.js
  var coerce = function() {
    return unsafeCoerce2;
  };

  // output/Data.Newtype/index.js
  var coerce2 = /* @__PURE__ */ coerce();
  var wrap = function() {
    return coerce2;
  };
  var wrap1 = /* @__PURE__ */ wrap();
  var unwrap = function() {
    return coerce2;
  };
  var unwrap1 = /* @__PURE__ */ unwrap();
  var modify4 = function() {
    return function(fn) {
      return function(t) {
        return wrap1(fn(unwrap1(t)));
      };
    };
  };

  // output/Data.Foldable/index.js
  var identity5 = /* @__PURE__ */ identity(categoryFn);
  var foldr = function(dict) {
    return dict.foldr;
  };
  var traverse_ = function(dictApplicative) {
    var applySecond4 = applySecond(dictApplicative.Apply0());
    var pure7 = pure(dictApplicative);
    return function(dictFoldable) {
      var foldr2 = foldr(dictFoldable);
      return function(f) {
        return foldr2(function($454) {
          return applySecond4(f($454));
        })(pure7(unit));
      };
    };
  };
  var for_ = function(dictApplicative) {
    var traverse_1 = traverse_(dictApplicative);
    return function(dictFoldable) {
      return flip(traverse_1(dictFoldable));
    };
  };
  var foldl = function(dict) {
    return dict.foldl;
  };
  var foldMapDefaultR = function(dictFoldable) {
    var foldr2 = foldr(dictFoldable);
    return function(dictMonoid) {
      var append5 = append(dictMonoid.Semigroup0());
      var mempty6 = mempty(dictMonoid);
      return function(f) {
        return foldr2(function(x) {
          return function(acc) {
            return append5(f(x))(acc);
          };
        })(mempty6);
      };
    };
  };
  var foldableArray = {
    foldr: foldrArray,
    foldl: foldlArray,
    foldMap: function(dictMonoid) {
      return foldMapDefaultR(foldableArray)(dictMonoid);
    }
  };
  var foldMap = function(dict) {
    return dict.foldMap;
  };
  var fold = function(dictFoldable) {
    var foldMap22 = foldMap(dictFoldable);
    return function(dictMonoid) {
      return foldMap22(dictMonoid)(identity5);
    };
  };

  // output/Data.Function.Uncurried/foreign.js
  var mkFn2 = function(fn) {
    return function(a, b) {
      return fn(a)(b);
    };
  };
  var runFn2 = function(fn) {
    return function(a) {
      return function(b) {
        return fn(a, b);
      };
    };
  };
  var runFn3 = function(fn) {
    return function(a) {
      return function(b) {
        return function(c) {
          return fn(a, b, c);
        };
      };
    };
  };
  var runFn4 = function(fn) {
    return function(a) {
      return function(b) {
        return function(c) {
          return function(d) {
            return fn(a, b, c, d);
          };
        };
      };
    };
  };
  var runFn5 = function(fn) {
    return function(a) {
      return function(b) {
        return function(c) {
          return function(d) {
            return function(e) {
              return fn(a, b, c, d, e);
            };
          };
        };
      };
    };
  };

  // output/Data.FunctorWithIndex/foreign.js
  var mapWithIndexArray = function(f) {
    return function(xs) {
      var l = xs.length;
      var result = Array(l);
      for (var i = 0; i < l; i++) {
        result[i] = f(i)(xs[i]);
      }
      return result;
    };
  };

  // output/Data.FunctorWithIndex/index.js
  var mapWithIndex = function(dict) {
    return dict.mapWithIndex;
  };
  var functorWithIndexArray = {
    mapWithIndex: mapWithIndexArray,
    Functor0: function() {
      return functorArray;
    }
  };

  // output/Data.Traversable/foreign.js
  var traverseArrayImpl = /* @__PURE__ */ function() {
    function array1(a) {
      return [a];
    }
    function array2(a) {
      return function(b) {
        return [a, b];
      };
    }
    function array3(a) {
      return function(b) {
        return function(c) {
          return [a, b, c];
        };
      };
    }
    function concat2(xs) {
      return function(ys) {
        return xs.concat(ys);
      };
    }
    return function(apply4) {
      return function(map11) {
        return function(pure7) {
          return function(f) {
            return function(array) {
              function go2(bot, top2) {
                switch (top2 - bot) {
                  case 0:
                    return pure7([]);
                  case 1:
                    return map11(array1)(f(array[bot]));
                  case 2:
                    return apply4(map11(array2)(f(array[bot])))(f(array[bot + 1]));
                  case 3:
                    return apply4(apply4(map11(array3)(f(array[bot])))(f(array[bot + 1])))(f(array[bot + 2]));
                  default:
                    var pivot = bot + Math.floor((top2 - bot) / 4) * 2;
                    return apply4(map11(concat2)(go2(bot, pivot)))(go2(pivot, top2));
                }
              }
              return go2(0, array.length);
            };
          };
        };
      };
    };
  }();

  // output/Data.Traversable/index.js
  var identity6 = /* @__PURE__ */ identity(categoryFn);
  var traverse = function(dict) {
    return dict.traverse;
  };
  var sequenceDefault = function(dictTraversable) {
    var traverse22 = traverse(dictTraversable);
    return function(dictApplicative) {
      return traverse22(dictApplicative)(identity6);
    };
  };
  var traversableArray = {
    traverse: function(dictApplicative) {
      var Apply0 = dictApplicative.Apply0();
      return traverseArrayImpl(apply2(Apply0))(map(Apply0.Functor0()))(pure(dictApplicative));
    },
    sequence: function(dictApplicative) {
      return sequenceDefault(traversableArray)(dictApplicative);
    },
    Functor0: function() {
      return functorArray;
    },
    Foldable1: function() {
      return foldableArray;
    }
  };

  // output/Data.Unfoldable/foreign.js
  var unfoldrArrayImpl = function(isNothing2) {
    return function(fromJust6) {
      return function(fst2) {
        return function(snd2) {
          return function(f) {
            return function(b) {
              var result = [];
              var value12 = b;
              while (true) {
                var maybe2 = f(value12);
                if (isNothing2(maybe2)) return result;
                var tuple = fromJust6(maybe2);
                result.push(fst2(tuple));
                value12 = snd2(tuple);
              }
            };
          };
        };
      };
    };
  };

  // output/Data.Unfoldable1/foreign.js
  var unfoldr1ArrayImpl = function(isNothing2) {
    return function(fromJust6) {
      return function(fst2) {
        return function(snd2) {
          return function(f) {
            return function(b) {
              var result = [];
              var value12 = b;
              while (true) {
                var tuple = f(value12);
                result.push(fst2(tuple));
                var maybe2 = snd2(tuple);
                if (isNothing2(maybe2)) return result;
                value12 = fromJust6(maybe2);
              }
            };
          };
        };
      };
    };
  };

  // output/Data.Semigroup.Foldable/index.js
  var identity7 = /* @__PURE__ */ identity(categoryFn);
  var foldl1 = function(dict) {
    return dict.foldl1;
  };
  var foldMap1DefaultL = function(dictFoldable1) {
    var foldl11 = foldl1(dictFoldable1);
    return function(dictFunctor) {
      var map11 = map(dictFunctor);
      return function(dictSemigroup) {
        var append5 = append(dictSemigroup);
        return function(f) {
          var $162 = foldl11(append5);
          var $163 = map11(f);
          return function($164) {
            return $162($163($164));
          };
        };
      };
    };
  };
  var foldMap1 = function(dict) {
    return dict.foldMap1;
  };
  var fold1 = function(dictFoldable1) {
    var foldMap11 = foldMap1(dictFoldable1);
    return function(dictSemigroup) {
      return foldMap11(dictSemigroup)(identity7);
    };
  };

  // output/Data.Unfoldable1/index.js
  var fromJust2 = /* @__PURE__ */ fromJust();
  var unfoldable1Array = {
    unfoldr1: /* @__PURE__ */ unfoldr1ArrayImpl(isNothing)(fromJust2)(fst)(snd)
  };

  // output/Data.Unfoldable/index.js
  var fromJust3 = /* @__PURE__ */ fromJust();
  var unfoldr = function(dict) {
    return dict.unfoldr;
  };
  var unfoldableArray = {
    unfoldr: /* @__PURE__ */ unfoldrArrayImpl(isNothing)(fromJust3)(fst)(snd),
    Unfoldable10: function() {
      return unfoldable1Array;
    }
  };

  // output/Data.Array/index.js
  var traverse_2 = /* @__PURE__ */ traverse_(applicativeST);
  var $$void3 = /* @__PURE__ */ $$void(functorST);
  var foldMap12 = /* @__PURE__ */ foldMap(foldableArray);
  var fold12 = /* @__PURE__ */ fold(foldableArray);
  var append2 = /* @__PURE__ */ append(semigroupArray);
  var updateAt = /* @__PURE__ */ function() {
    return runFn5(_updateAt)(Just.create)(Nothing.value);
  }();
  var unsafeIndex = function() {
    return runFn2(unsafeIndexImpl);
  };
  var unsafeIndex1 = /* @__PURE__ */ unsafeIndex();
  var uncons = /* @__PURE__ */ function() {
    return runFn3(unconsImpl)($$const(Nothing.value))(function(x) {
      return function(xs) {
        return new Just({
          head: x,
          tail: xs
        });
      };
    });
  }();
  var toUnfoldable = function(dictUnfoldable) {
    var unfoldr2 = unfoldr(dictUnfoldable);
    return function(xs) {
      var len = length(xs);
      var f = function(i) {
        if (i < len) {
          return new Just(new Tuple(unsafeIndex1(xs)(i), i + 1 | 0));
        }
        ;
        if (otherwise) {
          return Nothing.value;
        }
        ;
        throw new Error("Failed pattern match at Data.Array (line 163, column 3 - line 165, column 26): " + [i.constructor.name]);
      };
      return unfoldr2(f)(0);
    };
  };
  var snoc = function(xs) {
    return function(x) {
      return withArray(push(x))(xs)();
    };
  };
  var slice = /* @__PURE__ */ runFn3(sliceImpl);
  var take = function(n) {
    return function(xs) {
      var $152 = n < 1;
      if ($152) {
        return [];
      }
      ;
      return slice(0)(n)(xs);
    };
  };
  var singleton2 = function(a) {
    return [a];
  };
  var range2 = /* @__PURE__ */ runFn2(rangeImpl);
  var $$null = function(xs) {
    return length(xs) === 0;
  };
  var modifyAtIndices = function(dictFoldable) {
    var traverse_1 = traverse_2(dictFoldable);
    return function(is) {
      return function(f) {
        return function(xs) {
          return withArray(function(res) {
            return traverse_1(function(i) {
              return modify2(i)(f)(res);
            })(is);
          })(xs)();
        };
      };
    };
  };
  var mapWithIndex2 = /* @__PURE__ */ mapWithIndex(functorWithIndexArray);
  var intersperse = function(a) {
    return function(arr) {
      var v = length(arr);
      if (v < 2) {
        return arr;
      }
      ;
      if (otherwise) {
        return run2(/* @__PURE__ */ function() {
          var unsafeGetElem = function(idx) {
            return unsafeIndex1(arr)(idx);
          };
          return function __do4() {
            var out = newSTArray();
            push(unsafeGetElem(0))(out)();
            forST(1)(v)(function(idx) {
              return function __do5() {
                push(a)(out)();
                return $$void3(push(unsafeGetElem(idx))(out))();
              };
            })();
            return out;
          };
        }());
      }
      ;
      throw new Error("Failed pattern match at Data.Array (line 623, column 21 - line 633, column 17): " + [v.constructor.name]);
    };
  };
  var insertAt = /* @__PURE__ */ function() {
    return runFn5(_insertAt)(Just.create)(Nothing.value);
  }();
  var init = function(xs) {
    if ($$null(xs)) {
      return Nothing.value;
    }
    ;
    if (otherwise) {
      return new Just(slice(0)(length(xs) - 1 | 0)(xs));
    }
    ;
    throw new Error("Failed pattern match at Data.Array (line 351, column 1 - line 351, column 45): " + [xs.constructor.name]);
  };
  var index = /* @__PURE__ */ function() {
    return runFn4(indexImpl)(Just.create)(Nothing.value);
  }();
  var modifyAt = function(i) {
    return function(f) {
      return function(xs) {
        var go2 = function(x) {
          return updateAt(i)(f(x))(xs);
        };
        return maybe(Nothing.value)(go2)(index(xs)(i));
      };
    };
  };
  var head = function(xs) {
    return index(xs)(0);
  };
  var foldl2 = /* @__PURE__ */ foldl(foldableArray);
  var foldMap2 = function(dictMonoid) {
    return foldMap12(dictMonoid);
  };
  var fold2 = function(dictMonoid) {
    return fold12(dictMonoid);
  };
  var findMap = /* @__PURE__ */ function() {
    return runFn4(findMapImpl)(Nothing.value)(isJust);
  }();
  var findIndex = /* @__PURE__ */ function() {
    return runFn4(findIndexImpl)(Just.create)(Nothing.value);
  }();
  var filter = /* @__PURE__ */ runFn2(filterImpl);
  var drop = function(n) {
    return function(xs) {
      var $173 = n < 1;
      if ($173) {
        return xs;
      }
      ;
      return slice(n)(length(xs))(xs);
    };
  };
  var cons = function(x) {
    return function(xs) {
      return append2([x])(xs);
    };
  };
  var all2 = /* @__PURE__ */ runFn2(allImpl);

  // output/Foreign.Object/foreign.js
  function _copyST(m) {
    return function() {
      var r = {};
      for (var k in m) {
        if (hasOwnProperty.call(m, k)) {
          r[k] = m[k];
        }
      }
      return r;
    };
  }
  var empty2 = {};
  function runST(f) {
    return f();
  }
  function _foldM(bind5) {
    return function(f) {
      return function(mz) {
        return function(m) {
          var acc = mz;
          function g(k2) {
            return function(z) {
              return f(z)(k2)(m[k2]);
            };
          }
          for (var k in m) {
            if (hasOwnProperty.call(m, k)) {
              acc = bind5(acc)(g(k));
            }
          }
          return acc;
        };
      };
    };
  }
  function _lookup(no, yes, k, m) {
    return k in m ? yes(m[k]) : no;
  }
  function toArrayWithKey(f) {
    return function(m) {
      var r = [];
      for (var k in m) {
        if (hasOwnProperty.call(m, k)) {
          r.push(f(k)(m[k]));
        }
      }
      return r;
    };
  }
  var keys = Object.keys || toArrayWithKey(function(k) {
    return function() {
      return k;
    };
  });

  // output/Data.FoldableWithIndex/index.js
  var foldrWithIndex = function(dict) {
    return dict.foldrWithIndex;
  };

  // output/Foreign.Object.ST/foreign.js
  var newImpl = function() {
    return {};
  };
  function poke2(k) {
    return function(v) {
      return function(m) {
        return function() {
          m[k] = v;
          return m;
        };
      };
    };
  }

  // output/Foreign.Object/index.js
  var bindFlipped2 = /* @__PURE__ */ bindFlipped(bindST);
  var pure2 = /* @__PURE__ */ pure(applicativeST);
  var toUnfoldable2 = function(dictUnfoldable) {
    var $89 = toUnfoldable(dictUnfoldable);
    var $90 = toArrayWithKey(Tuple.create);
    return function($91) {
      return $89($90($91));
    };
  };
  var thawST = _copyST;
  var singleton3 = function(k) {
    return function(v) {
      return runST(bindFlipped2(poke2(k)(v))(newImpl));
    };
  };
  var mutate = function(f) {
    return function(m) {
      return runST(function __do4() {
        var s = thawST(m)();
        f(s)();
        return s;
      });
    };
  };
  var member = /* @__PURE__ */ runFn4(_lookup)(false)(/* @__PURE__ */ $$const(true));
  var lookup = /* @__PURE__ */ function() {
    return runFn4(_lookup)(Nothing.value)(Just.create);
  }();
  var foldM = function(dictMonad) {
    var bind13 = bind(dictMonad.Bind1());
    var pure13 = pure(dictMonad.Applicative0());
    return function(f) {
      return function(z) {
        return _foldM(bind13)(f)(pure13(z));
      };
    };
  };
  var foldM1 = /* @__PURE__ */ foldM(monadST);
  var union = function(m) {
    return mutate(function(s) {
      return foldM1(function(s$prime) {
        return function(k) {
          return function(v) {
            return poke2(k)(v)(s$prime);
          };
        };
      })(s)(m);
    });
  };
  var unionWith = function(f) {
    return function(m1) {
      return function(m2) {
        return mutate(function(s1) {
          return foldM1(function(s2) {
            return function(k) {
              return function(v1) {
                return poke2(k)(_lookup(v1, function(v2) {
                  return f(v1)(v2);
                }, k, m2))(s2);
              };
            };
          })(s1)(m1);
        })(m2);
      };
    };
  };
  var semigroupObject = function(dictSemigroup) {
    return {
      append: unionWith(append(dictSemigroup))
    };
  };
  var monoidObject = function(dictSemigroup) {
    var semigroupObject1 = semigroupObject(dictSemigroup);
    return {
      mempty: empty2,
      Semigroup0: function() {
        return semigroupObject1;
      }
    };
  };
  var filterWithKey = function(predicate) {
    return function(m) {
      var go2 = /* @__PURE__ */ function() {
        var step2 = function(acc) {
          return function(k) {
            return function(v) {
              var $86 = predicate(k)(v);
              if ($86) {
                return poke2(k)(v)(acc);
              }
              ;
              return pure2(acc);
            };
          };
        };
        return function __do4() {
          var m$prime = newImpl();
          return foldM1(step2)(m$prime)(m)();
        };
      }();
      return runST(go2);
    };
  };

  // output/Control.Monad.State.Class/index.js
  var state = function(dict) {
    return dict.state;
  };
  var modify_2 = function(dictMonadState) {
    var state1 = state(dictMonadState);
    return function(f) {
      return state1(function(s) {
        return new Tuple(unit, f(s));
      });
    };
  };
  var get = function(dictMonadState) {
    return state(dictMonadState)(function(s) {
      return new Tuple(s, s);
    });
  };

  // output/Control.Monad.Reader.Class/index.js
  var ask = function(dict) {
    return dict.ask;
  };

  // output/Effect.Class/index.js
  var monadEffectEffect = {
    liftEffect: /* @__PURE__ */ identity(categoryFn),
    Monad0: function() {
      return monadEffect;
    }
  };
  var liftEffect = function(dict) {
    return dict.liftEffect;
  };

  // output/Control.Monad.State.Trans/index.js
  var functorStateT = function(dictFunctor) {
    var map11 = map(dictFunctor);
    return {
      map: function(f) {
        return function(v) {
          return function(s) {
            return map11(function(v1) {
              return new Tuple(f(v1.value0), v1.value1);
            })(v(s));
          };
        };
      }
    };
  };
  var monadStateT = function(dictMonad) {
    return {
      Applicative0: function() {
        return applicativeStateT(dictMonad);
      },
      Bind1: function() {
        return bindStateT(dictMonad);
      }
    };
  };
  var bindStateT = function(dictMonad) {
    var bind5 = bind(dictMonad.Bind1());
    return {
      bind: function(v) {
        return function(f) {
          return function(s) {
            return bind5(v(s))(function(v1) {
              var v3 = f(v1.value0);
              return v3(v1.value1);
            });
          };
        };
      },
      Apply0: function() {
        return applyStateT(dictMonad);
      }
    };
  };
  var applyStateT = function(dictMonad) {
    var functorStateT1 = functorStateT(dictMonad.Bind1().Apply0().Functor0());
    return {
      apply: ap(monadStateT(dictMonad)),
      Functor0: function() {
        return functorStateT1;
      }
    };
  };
  var applicativeStateT = function(dictMonad) {
    var pure7 = pure(dictMonad.Applicative0());
    return {
      pure: function(a) {
        return function(s) {
          return pure7(new Tuple(a, s));
        };
      },
      Apply0: function() {
        return applyStateT(dictMonad);
      }
    };
  };
  var monadStateStateT = function(dictMonad) {
    var pure7 = pure(dictMonad.Applicative0());
    var monadStateT1 = monadStateT(dictMonad);
    return {
      state: function(f) {
        return function($206) {
          return pure7(f($206));
        };
      },
      Monad0: function() {
        return monadStateT1;
      }
    };
  };

  // output/Control.Monad.State/index.js
  var unwrap2 = /* @__PURE__ */ unwrap();
  var runState = function(v) {
    return function($18) {
      return unwrap2(v($18));
    };
  };

  // output/Data.Array.NonEmpty.Internal/foreign.js
  var foldr1Impl = function(f, xs) {
    var acc = xs[xs.length - 1];
    for (var i = xs.length - 2; i >= 0; i--) {
      acc = f(xs[i])(acc);
    }
    return acc;
  };
  var foldl1Impl = function(f, xs) {
    var acc = xs[0];
    var len = xs.length;
    for (var i = 1; i < len; i++) {
      acc = f(acc)(xs[i]);
    }
    return acc;
  };

  // output/Data.Array.NonEmpty.Internal/index.js
  var NonEmptyArray = function(x) {
    return x;
  };
  var functorNonEmptyArray = functorArray;
  var foldableNonEmptyArray = foldableArray;
  var foldable1NonEmptyArray = {
    foldMap1: function(dictSemigroup) {
      return foldMap1DefaultL(foldable1NonEmptyArray)(functorNonEmptyArray)(dictSemigroup);
    },
    foldr1: /* @__PURE__ */ runFn2(foldr1Impl),
    foldl1: /* @__PURE__ */ runFn2(foldl1Impl),
    Foldable0: function() {
      return foldableNonEmptyArray;
    }
  };

  // output/Data.Array.NonEmpty/index.js
  var fold11 = /* @__PURE__ */ fold1(foldable1NonEmptyArray);
  var unsafeFromArray = NonEmptyArray;
  var toArray = function(v) {
    return v;
  };
  var singleton4 = function($110) {
    return unsafeFromArray(singleton2($110));
  };
  var fromArray = function(xs) {
    if (length(xs) > 0) {
      return new Just(unsafeFromArray(xs));
    }
    ;
    if (otherwise) {
      return Nothing.value;
    }
    ;
    throw new Error("Failed pattern match at Data.Array.NonEmpty (line 161, column 1 - line 161, column 58): " + [xs.constructor.name]);
  };
  var fold13 = function(dictSemigroup) {
    return fold11(dictSemigroup);
  };
  var adaptAny = function(f) {
    return function($128) {
      return f(toArray($128));
    };
  };
  var unsafeAdapt = function(f) {
    var $129 = adaptAny(f);
    return function($130) {
      return unsafeFromArray($129($130));
    };
  };
  var intersperse2 = function(x) {
    return unsafeAdapt(intersperse(x));
  };

  // output/Data.Int/foreign.js
  var toNumber = function(n) {
    return n;
  };
  var fromStringAsImpl = function(just) {
    return function(nothing) {
      return function(radix) {
        var digits;
        if (radix < 11) {
          digits = "[0-" + (radix - 1).toString() + "]";
        } else if (radix === 11) {
          digits = "[0-9a]";
        } else {
          digits = "[0-9a-" + String.fromCharCode(86 + radix) + "]";
        }
        var pattern2 = new RegExp("^[\\+\\-]?" + digits + "+$", "i");
        return function(s) {
          if (pattern2.test(s)) {
            var i = parseInt(s, radix);
            return (i | 0) === i ? just(i) : nothing;
          } else {
            return nothing;
          }
        };
      };
    };
  };

  // output/Data.Int/index.js
  var fromStringAs = /* @__PURE__ */ function() {
    return fromStringAsImpl(Just.create)(Nothing.value);
  }();
  var fromString = /* @__PURE__ */ fromStringAs(10);

  // output/Data.List.Types/index.js
  var Nil = /* @__PURE__ */ function() {
    function Nil2() {
    }
    ;
    Nil2.value = new Nil2();
    return Nil2;
  }();
  var Cons = /* @__PURE__ */ function() {
    function Cons2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Cons2.create = function(value0) {
      return function(value1) {
        return new Cons2(value0, value1);
      };
    };
    return Cons2;
  }();

  // output/Data.List/index.js
  var map3 = /* @__PURE__ */ map(functorMaybe);
  var uncons2 = function(v) {
    if (v instanceof Nil) {
      return Nothing.value;
    }
    ;
    if (v instanceof Cons) {
      return new Just({
        head: v.value0,
        tail: v.value1
      });
    }
    ;
    throw new Error("Failed pattern match at Data.List (line 259, column 1 - line 259, column 66): " + [v.constructor.name]);
  };
  var toUnfoldable3 = function(dictUnfoldable) {
    return unfoldr(dictUnfoldable)(function(xs) {
      return map3(function(rec) {
        return new Tuple(rec.head, rec.tail);
      })(uncons2(xs));
    });
  };

  // output/Data.Map.Internal/index.js
  var $runtime_lazy3 = function(name16, moduleName, init3) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2) return val;
      if (state3 === 1) throw new ReferenceError(name16 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init3();
      state3 = 2;
      return val;
    };
  };
  var Leaf = /* @__PURE__ */ function() {
    function Leaf2() {
    }
    ;
    Leaf2.value = new Leaf2();
    return Leaf2;
  }();
  var Node = /* @__PURE__ */ function() {
    function Node3(value0, value1, value22, value32, value42, value52) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
      this.value3 = value32;
      this.value4 = value42;
      this.value5 = value52;
    }
    ;
    Node3.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return function(value32) {
            return function(value42) {
              return function(value52) {
                return new Node3(value0, value1, value22, value32, value42, value52);
              };
            };
          };
        };
      };
    };
    return Node3;
  }();
  var Split = /* @__PURE__ */ function() {
    function Split2(value0, value1, value22) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
    }
    ;
    Split2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return new Split2(value0, value1, value22);
        };
      };
    };
    return Split2;
  }();
  var SplitLast = /* @__PURE__ */ function() {
    function SplitLast2(value0, value1, value22) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
    }
    ;
    SplitLast2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return new SplitLast2(value0, value1, value22);
        };
      };
    };
    return SplitLast2;
  }();
  var unsafeNode = function(k, v, l, r) {
    if (l instanceof Leaf) {
      if (r instanceof Leaf) {
        return new Node(1, 1, k, v, l, r);
      }
      ;
      if (r instanceof Node) {
        return new Node(1 + r.value0 | 0, 1 + r.value1 | 0, k, v, l, r);
      }
      ;
      throw new Error("Failed pattern match at Data.Map.Internal (line 702, column 5 - line 706, column 39): " + [r.constructor.name]);
    }
    ;
    if (l instanceof Node) {
      if (r instanceof Leaf) {
        return new Node(1 + l.value0 | 0, 1 + l.value1 | 0, k, v, l, r);
      }
      ;
      if (r instanceof Node) {
        return new Node(1 + function() {
          var $280 = l.value0 > r.value0;
          if ($280) {
            return l.value0;
          }
          ;
          return r.value0;
        }() | 0, (1 + l.value1 | 0) + r.value1 | 0, k, v, l, r);
      }
      ;
      throw new Error("Failed pattern match at Data.Map.Internal (line 708, column 5 - line 712, column 68): " + [r.constructor.name]);
    }
    ;
    throw new Error("Failed pattern match at Data.Map.Internal (line 700, column 32 - line 712, column 68): " + [l.constructor.name]);
  };
  var singleton6 = function(k) {
    return function(v) {
      return new Node(1, 1, k, v, Leaf.value, Leaf.value);
    };
  };
  var unsafeBalancedNode = /* @__PURE__ */ function() {
    var height8 = function(v) {
      if (v instanceof Leaf) {
        return 0;
      }
      ;
      if (v instanceof Node) {
        return v.value0;
      }
      ;
      throw new Error("Failed pattern match at Data.Map.Internal (line 757, column 12 - line 759, column 26): " + [v.constructor.name]);
    };
    var rotateLeft = function(k, v, l, rk, rv, rl, rr) {
      if (rl instanceof Node && rl.value0 > height8(rr)) {
        return unsafeNode(rl.value2, rl.value3, unsafeNode(k, v, l, rl.value4), unsafeNode(rk, rv, rl.value5, rr));
      }
      ;
      return unsafeNode(rk, rv, unsafeNode(k, v, l, rl), rr);
    };
    var rotateRight = function(k, v, lk, lv, ll, lr, r) {
      if (lr instanceof Node && height8(ll) <= lr.value0) {
        return unsafeNode(lr.value2, lr.value3, unsafeNode(lk, lv, ll, lr.value4), unsafeNode(k, v, lr.value5, r));
      }
      ;
      return unsafeNode(lk, lv, ll, unsafeNode(k, v, lr, r));
    };
    return function(k, v, l, r) {
      if (l instanceof Leaf) {
        if (r instanceof Leaf) {
          return singleton6(k)(v);
        }
        ;
        if (r instanceof Node && r.value0 > 1) {
          return rotateLeft(k, v, l, r.value2, r.value3, r.value4, r.value5);
        }
        ;
        return unsafeNode(k, v, l, r);
      }
      ;
      if (l instanceof Node) {
        if (r instanceof Node) {
          if (r.value0 > (l.value0 + 1 | 0)) {
            return rotateLeft(k, v, l, r.value2, r.value3, r.value4, r.value5);
          }
          ;
          if (l.value0 > (r.value0 + 1 | 0)) {
            return rotateRight(k, v, l.value2, l.value3, l.value4, l.value5, r);
          }
          ;
        }
        ;
        if (r instanceof Leaf && l.value0 > 1) {
          return rotateRight(k, v, l.value2, l.value3, l.value4, l.value5, r);
        }
        ;
        return unsafeNode(k, v, l, r);
      }
      ;
      throw new Error("Failed pattern match at Data.Map.Internal (line 717, column 40 - line 738, column 34): " + [l.constructor.name]);
    };
  }();
  var $lazy_unsafeSplit = /* @__PURE__ */ $runtime_lazy3("unsafeSplit", "Data.Map.Internal", function() {
    return function(comp, k, m) {
      if (m instanceof Leaf) {
        return new Split(Nothing.value, Leaf.value, Leaf.value);
      }
      ;
      if (m instanceof Node) {
        var v = comp(k)(m.value2);
        if (v instanceof LT) {
          var v1 = $lazy_unsafeSplit(793)(comp, k, m.value4);
          return new Split(v1.value0, v1.value1, unsafeBalancedNode(m.value2, m.value3, v1.value2, m.value5));
        }
        ;
        if (v instanceof GT) {
          var v1 = $lazy_unsafeSplit(796)(comp, k, m.value5);
          return new Split(v1.value0, unsafeBalancedNode(m.value2, m.value3, m.value4, v1.value1), v1.value2);
        }
        ;
        if (v instanceof EQ) {
          return new Split(new Just(m.value3), m.value4, m.value5);
        }
        ;
        throw new Error("Failed pattern match at Data.Map.Internal (line 791, column 5 - line 799, column 30): " + [v.constructor.name]);
      }
      ;
      throw new Error("Failed pattern match at Data.Map.Internal (line 787, column 34 - line 799, column 30): " + [m.constructor.name]);
    };
  });
  var unsafeSplit = /* @__PURE__ */ $lazy_unsafeSplit(786);
  var $lazy_unsafeSplitLast = /* @__PURE__ */ $runtime_lazy3("unsafeSplitLast", "Data.Map.Internal", function() {
    return function(k, v, l, r) {
      if (r instanceof Leaf) {
        return new SplitLast(k, v, l);
      }
      ;
      if (r instanceof Node) {
        var v1 = $lazy_unsafeSplitLast(779)(r.value2, r.value3, r.value4, r.value5);
        return new SplitLast(v1.value0, v1.value1, unsafeBalancedNode(k, v, l, v1.value2));
      }
      ;
      throw new Error("Failed pattern match at Data.Map.Internal (line 776, column 37 - line 780, column 57): " + [r.constructor.name]);
    };
  });
  var unsafeSplitLast = /* @__PURE__ */ $lazy_unsafeSplitLast(775);
  var unsafeJoinNodes = function(v, v1) {
    if (v instanceof Leaf) {
      return v1;
    }
    ;
    if (v instanceof Node) {
      var v2 = unsafeSplitLast(v.value2, v.value3, v.value4, v.value5);
      return unsafeBalancedNode(v2.value0, v2.value1, v2.value2, v1);
    }
    ;
    throw new Error("Failed pattern match at Data.Map.Internal (line 764, column 25 - line 768, column 38): " + [v.constructor.name, v1.constructor.name]);
  };
  var $lazy_unsafeDifference = /* @__PURE__ */ $runtime_lazy3("unsafeDifference", "Data.Map.Internal", function() {
    return function(comp, l, r) {
      if (l instanceof Leaf) {
        return Leaf.value;
      }
      ;
      if (r instanceof Leaf) {
        return l;
      }
      ;
      if (r instanceof Node) {
        var v = unsafeSplit(comp, r.value2, l);
        var l$prime = $lazy_unsafeDifference(841)(comp, v.value1, r.value4);
        var r$prime = $lazy_unsafeDifference(842)(comp, v.value2, r.value5);
        return unsafeJoinNodes(l$prime, r$prime);
      }
      ;
      throw new Error("Failed pattern match at Data.Map.Internal (line 836, column 39 - line 843, column 33): " + [l.constructor.name, r.constructor.name]);
    };
  });
  var unsafeDifference = /* @__PURE__ */ $lazy_unsafeDifference(835);
  var $lazy_unsafeUnionWith = /* @__PURE__ */ $runtime_lazy3("unsafeUnionWith", "Data.Map.Internal", function() {
    return function(comp, app, l, r) {
      if (l instanceof Leaf) {
        return r;
      }
      ;
      if (r instanceof Leaf) {
        return l;
      }
      ;
      if (r instanceof Node) {
        var v = unsafeSplit(comp, r.value2, l);
        var l$prime = $lazy_unsafeUnionWith(809)(comp, app, v.value1, r.value4);
        var r$prime = $lazy_unsafeUnionWith(810)(comp, app, v.value2, r.value5);
        if (v.value0 instanceof Just) {
          return unsafeBalancedNode(r.value2, app(v.value0.value0)(r.value3), l$prime, r$prime);
        }
        ;
        if (v.value0 instanceof Nothing) {
          return unsafeBalancedNode(r.value2, r.value3, l$prime, r$prime);
        }
        ;
        throw new Error("Failed pattern match at Data.Map.Internal (line 811, column 5 - line 815, column 46): " + [v.value0.constructor.name]);
      }
      ;
      throw new Error("Failed pattern match at Data.Map.Internal (line 804, column 42 - line 815, column 46): " + [l.constructor.name, r.constructor.name]);
    };
  });
  var unsafeUnionWith = /* @__PURE__ */ $lazy_unsafeUnionWith(803);
  var unionWith2 = function(dictOrd) {
    var compare2 = compare(dictOrd);
    return function(app) {
      return function(m1) {
        return function(m2) {
          return unsafeUnionWith(compare2, app, m1, m2);
        };
      };
    };
  };
  var union2 = function(dictOrd) {
    return unionWith2(dictOrd)($$const);
  };
  var insert2 = function(dictOrd) {
    var compare2 = compare(dictOrd);
    return function(k) {
      return function(v) {
        var go2 = function(v1) {
          if (v1 instanceof Leaf) {
            return singleton6(k)(v);
          }
          ;
          if (v1 instanceof Node) {
            var v2 = compare2(k)(v1.value2);
            if (v2 instanceof LT) {
              return unsafeBalancedNode(v1.value2, v1.value3, go2(v1.value4), v1.value5);
            }
            ;
            if (v2 instanceof GT) {
              return unsafeBalancedNode(v1.value2, v1.value3, v1.value4, go2(v1.value5));
            }
            ;
            if (v2 instanceof EQ) {
              return new Node(v1.value0, v1.value1, k, v, v1.value4, v1.value5);
            }
            ;
            throw new Error("Failed pattern match at Data.Map.Internal (line 471, column 7 - line 474, column 35): " + [v2.constructor.name]);
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 468, column 8 - line 474, column 35): " + [v1.constructor.name]);
        };
        return go2;
      };
    };
  };
  var foldableMap = {
    foldr: function(f) {
      return function(z) {
        var $lazy_go = $runtime_lazy3("go", "Data.Map.Internal", function() {
          return function(m$prime, z$prime) {
            if (m$prime instanceof Leaf) {
              return z$prime;
            }
            ;
            if (m$prime instanceof Node) {
              return $lazy_go(172)(m$prime.value4, f(m$prime.value3)($lazy_go(172)(m$prime.value5, z$prime)));
            }
            ;
            throw new Error("Failed pattern match at Data.Map.Internal (line 169, column 26 - line 172, column 43): " + [m$prime.constructor.name]);
          };
        });
        var go2 = $lazy_go(169);
        return function(m) {
          return go2(m, z);
        };
      };
    },
    foldl: function(f) {
      return function(z) {
        var $lazy_go = $runtime_lazy3("go", "Data.Map.Internal", function() {
          return function(z$prime, m$prime) {
            if (m$prime instanceof Leaf) {
              return z$prime;
            }
            ;
            if (m$prime instanceof Node) {
              return $lazy_go(178)(f($lazy_go(178)(z$prime, m$prime.value4))(m$prime.value3), m$prime.value5);
            }
            ;
            throw new Error("Failed pattern match at Data.Map.Internal (line 175, column 26 - line 178, column 43): " + [m$prime.constructor.name]);
          };
        });
        var go2 = $lazy_go(175);
        return function(m) {
          return go2(z, m);
        };
      };
    },
    foldMap: function(dictMonoid) {
      var mempty6 = mempty(dictMonoid);
      var append13 = append(dictMonoid.Semigroup0());
      return function(f) {
        var go2 = function(v) {
          if (v instanceof Leaf) {
            return mempty6;
          }
          ;
          if (v instanceof Node) {
            return append13(go2(v.value4))(append13(f(v.value3))(go2(v.value5)));
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 181, column 10 - line 184, column 28): " + [v.constructor.name]);
        };
        return go2;
      };
    }
  };
  var foldableWithIndexMap = {
    foldrWithIndex: function(f) {
      return function(z) {
        var $lazy_go = $runtime_lazy3("go", "Data.Map.Internal", function() {
          return function(m$prime, z$prime) {
            if (m$prime instanceof Leaf) {
              return z$prime;
            }
            ;
            if (m$prime instanceof Node) {
              return $lazy_go(192)(m$prime.value4, f(m$prime.value2)(m$prime.value3)($lazy_go(192)(m$prime.value5, z$prime)));
            }
            ;
            throw new Error("Failed pattern match at Data.Map.Internal (line 189, column 26 - line 192, column 45): " + [m$prime.constructor.name]);
          };
        });
        var go2 = $lazy_go(189);
        return function(m) {
          return go2(m, z);
        };
      };
    },
    foldlWithIndex: function(f) {
      return function(z) {
        var $lazy_go = $runtime_lazy3("go", "Data.Map.Internal", function() {
          return function(z$prime, m$prime) {
            if (m$prime instanceof Leaf) {
              return z$prime;
            }
            ;
            if (m$prime instanceof Node) {
              return $lazy_go(198)(f(m$prime.value2)($lazy_go(198)(z$prime, m$prime.value4))(m$prime.value3), m$prime.value5);
            }
            ;
            throw new Error("Failed pattern match at Data.Map.Internal (line 195, column 26 - line 198, column 45): " + [m$prime.constructor.name]);
          };
        });
        var go2 = $lazy_go(195);
        return function(m) {
          return go2(z, m);
        };
      };
    },
    foldMapWithIndex: function(dictMonoid) {
      var mempty6 = mempty(dictMonoid);
      var append13 = append(dictMonoid.Semigroup0());
      return function(f) {
        var go2 = function(v) {
          if (v instanceof Leaf) {
            return mempty6;
          }
          ;
          if (v instanceof Node) {
            return append13(go2(v.value4))(append13(f(v.value2)(v.value3))(go2(v.value5)));
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 201, column 10 - line 204, column 30): " + [v.constructor.name]);
        };
        return go2;
      };
    },
    Foldable0: function() {
      return foldableMap;
    }
  };
  var keys2 = /* @__PURE__ */ function() {
    return foldrWithIndex(foldableWithIndexMap)(function(k) {
      return function(v) {
        return function(acc) {
          return new Cons(k, acc);
        };
      };
    })(Nil.value);
  }();
  var empty3 = /* @__PURE__ */ function() {
    return Leaf.value;
  }();
  var difference2 = function(dictOrd) {
    var compare2 = compare(dictOrd);
    return function(m1) {
      return function(m2) {
        return unsafeDifference(compare2, m1, m2);
      };
    };
  };

  // output/Data.Set/index.js
  var coerce3 = /* @__PURE__ */ coerce();
  var union3 = function(dictOrd) {
    return coerce3(union2(dictOrd));
  };
  var toList = function(v) {
    return keys2(v);
  };
  var toUnfoldable4 = function(dictUnfoldable) {
    var $96 = toUnfoldable3(dictUnfoldable);
    return function($97) {
      return $96(toList($97));
    };
  };
  var semigroupSet = function(dictOrd) {
    return {
      append: union3(dictOrd)
    };
  };
  var insert3 = function(dictOrd) {
    var insert1 = insert2(dictOrd);
    return function(a) {
      return function(v) {
        return insert1(a)(unit)(v);
      };
    };
  };
  var empty4 = empty3;
  var fromFoldable2 = function(dictFoldable) {
    var foldl22 = foldl(dictFoldable);
    return function(dictOrd) {
      var insert1 = insert3(dictOrd);
      return foldl22(function(m) {
        return function(a) {
          return insert1(a)(m);
        };
      })(empty4);
    };
  };
  var monoidSet = function(dictOrd) {
    var semigroupSet1 = semigroupSet(dictOrd);
    return {
      mempty: empty4,
      Semigroup0: function() {
        return semigroupSet1;
      }
    };
  };
  var difference3 = function(dictOrd) {
    return coerce3(difference2(dictOrd));
  };

  // output/Data.String.Common/foreign.js
  var replaceAll = function(s1) {
    return function(s2) {
      return function(s3) {
        return s3.replace(new RegExp(s1.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"), "g"), s2);
      };
    };
  };
  var split = function(sep) {
    return function(s) {
      return s.split(sep);
    };
  };

  // output/Effect.Timer/foreign.js
  function setTimeoutImpl(ms) {
    return function(fn) {
      return function() {
        return setTimeout(fn, ms);
      };
    };
  }

  // output/Effect.Timer/index.js
  var setTimeout2 = setTimeoutImpl;

  // output/Foreign/foreign.js
  var isArray = Array.isArray || function(value12) {
    return Object.prototype.toString.call(value12) === "[object Array]";
  };

  // output/Partial.Unsafe/foreign.js
  var _unsafePartial = function(f) {
    return f();
  };

  // output/Partial/foreign.js
  var _crashWith = function(msg) {
    throw new Error(msg);
  };

  // output/Partial/index.js
  var crashWith = function() {
    return _crashWith;
  };

  // output/Partial.Unsafe/index.js
  var crashWith2 = /* @__PURE__ */ crashWith();
  var unsafePartial = _unsafePartial;
  var unsafeCrashWith = function(msg) {
    return unsafePartial(function() {
      return crashWith2(msg);
    });
  };

  // output/Foreign/index.js
  var unsafeToForeign = unsafeCoerce2;

  // output/Literals.Null/foreign.js
  var _null = null;

  // output/Literals.Null/index.js
  var $$null2 = _null;

  // output/Specular.Dom.Browser/foreign.js
  function createTextNodeImpl(text7) {
    return function() {
      return document.createTextNode(text7);
    };
  }
  function setTextImpl(node2) {
    return function(text7) {
      return function() {
        node2.textContent = text7;
      };
    };
  }
  function createDocumentFragmentImpl() {
    return document.createDocumentFragment();
  }
  function createElementImpl(tag) {
    return function() {
      return document.createElement(tag);
    };
  }
  function createElementNSImpl(namespace) {
    return function(tag) {
      return function() {
        return document.createElementNS(namespace, tag);
      };
    };
  }
  function _setAttributes(node2, attrs2) {
    for (var k in attrs2) {
      if (attrs2.hasOwnProperty(k)) {
        node2.setAttribute(k, attrs2[k]);
      }
    }
  }
  function removeAttributesImpl(node2) {
    return function(names) {
      return function() {
        names.forEach(function(name16) {
          node2.removeAttribute(name16);
        });
      };
    };
  }
  function parentNodeImpl(Just2) {
    return function(Nothing2) {
      return function(node2) {
        return function() {
          var parent2 = node2.parentNode;
          if (parent2 !== null) {
            return Just2(parent2);
          } else {
            return Nothing2;
          }
        };
      };
    };
  }
  function insertBeforeImpl(newNode) {
    return function(nodeAfter) {
      return function(parent2) {
        return function() {
          parent2.insertBefore(newNode, nodeAfter);
        };
      };
    };
  }
  function appendChildImpl(newNode) {
    return function(parent2) {
      return function() {
        parent2.appendChild(newNode);
      };
    };
  }
  function removeAllBetweenImpl(from3) {
    return function(to) {
      return function() {
        if (!from3.parentNode) {
          return;
        }
        var node2 = from3.nextSibling;
        while (node2 && node2 !== to) {
          var next = node2.nextSibling;
          node2.parentNode.removeChild(node2);
          node2 = next;
        }
      };
    };
  }
  function addEventListenerImpl(eventType) {
    return function(handler) {
      return function(node2) {
        return function() {
          var listener = function(event) {
            handler(event)();
          };
          node2.addEventListener(eventType, listener);
          return function() {
            node2.removeEventListener(eventType, listener);
          };
        };
      };
    };
  }
  function removeNode(node2) {
    return function() {
      if (node2.parentNode) {
        node2.parentNode.removeChild(node2);
      }
    };
  }
  function getTextInputValue(node2) {
    return function() {
      return node2.value;
    };
  }

  // output/Specular.Dom.Browser/index.js
  var setText = setTextImpl;
  var setAttributes = function(node2) {
    return function(attrs2) {
      return function() {
        return _setAttributes(node2, attrs2);
      };
    };
  };
  var removeAttributes = removeAttributesImpl;
  var removeAllBetween = removeAllBetweenImpl;
  var parentNode = /* @__PURE__ */ function() {
    return parentNodeImpl(Just.create)(Nothing.value);
  }();
  var insertBefore = insertBeforeImpl;
  var createTextNode = createTextNodeImpl;
  var createElementNS = function(v) {
    if (v instanceof Just) {
      return createElementNSImpl(v.value0);
    }
    ;
    if (v instanceof Nothing) {
      return createElementImpl;
    }
    ;
    throw new Error("Failed pattern match at Specular.Dom.Browser (line 44, column 1 - line 44, column 61): " + [v.constructor.name]);
  };
  var createElement = /* @__PURE__ */ function() {
    return createElementNS(Nothing.value);
  }();
  var createDocumentFragment = createDocumentFragmentImpl;
  var appendChild = appendChildImpl;
  var addEventListener = addEventListenerImpl;

  // output/Specular.Internal.Effect/foreign.js
  function emptyDelayed() {
    return [];
  }
  function pushDelayed(effs) {
    return function(eff) {
      return function() {
        effs.push(eff);
      };
    };
  }
  function unsafeFreezeDelayed(x) {
    return function() {
      return x;
    };
  }
  function sequenceEffects(effects) {
    return function sequenceEffects_eff() {
      for (var i = 0; i < effects.length; i++) {
        effects[i]();
      }
    };
  }

  // output/Control.Monad.Cleanup/index.js
  var onCleanup = function(dict) {
    return dict.onCleanup;
  };

  // output/Control.Monad.Replace/index.js
  var Slot = /* @__PURE__ */ function() {
    function Slot2(value0, value1, value22) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
    }
    ;
    Slot2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return new Slot2(value0, value1, value22);
        };
      };
    };
    return Slot2;
  }();
  var replaceSlot = function(v) {
    return v.value0;
  };
  var newSlot = function(dict) {
    return dict.newSlot;
  };
  var destroySlot = function(v) {
    return v.value1;
  };
  var appendSlot = function(v) {
    return v.value2;
  };

  // output/Specular.Internal.RIO/foreign.js
  function pureImpl(x) {
    return function RIO_pure_eff(_) {
      return x;
    };
  }
  function mapImpl(f) {
    return function(io_x) {
      return function RIO_map_eff(env) {
        return f(io_x(env));
      };
    };
  }
  function applyImpl(io_f) {
    return function(io_x) {
      return function RIO_apply_eff(env) {
        var f = io_f(env);
        return f(io_x(env));
      };
    };
  }
  function bindImpl(io_x) {
    return function(k) {
      return function RIO_bind_eff(env) {
        return k(io_x(env))(env);
      };
    };
  }
  function askImpl(env) {
    return env;
  }
  function runRIO(env) {
    return function(io) {
      return function runRIO_eff() {
        return io(env);
      };
    };
  }
  function rio(f) {
    return function RIO_rio_eff(env) {
      return f(env)();
    };
  }

  // output/Specular.Internal.RIO/index.js
  var RIO = function(x) {
    return x;
  };
  var functorRIO = {
    map: mapImpl
  };
  var applyRIO = {
    apply: applyImpl,
    Functor0: function() {
      return functorRIO;
    }
  };
  var bindRIO = {
    bind: bindImpl,
    Apply0: function() {
      return applyRIO;
    }
  };
  var applicativeRIO = {
    pure: pureImpl,
    Apply0: function() {
      return applyRIO;
    }
  };
  var monadRIO = {
    Applicative0: function() {
      return applicativeRIO;
    },
    Bind1: function() {
      return bindRIO;
    }
  };
  var monadAskRIO = {
    ask: askImpl,
    Monad0: function() {
      return monadRIO;
    }
  };
  var monadEffectRIO = {
    liftEffect: unsafeCoerce2,
    Monad0: function() {
      return monadRIO;
    }
  };

  // output/Effect.Uncurried/foreign.js
  var runEffectFn1 = function runEffectFn12(fn) {
    return function(a) {
      return function() {
        return fn(a);
      };
    };
  };

  // output/Specular.Internal.Profiling/foreign.js
  if (typeof global === "undefined") {
    global = window;
  }
  var enabled = !!global.SPECULAR_PROFILING_ENABLED;
  var frameNameToIndex = {};
  var frames = [];
  var events = [];
  global.SpecularProfiling = {
    open: (url) => {
      const w = window.open(url || "http://localhost:1234");
      window.addEventListener("message", (event) => {
        if (event.source === w && event.data.type === "getProfile") {
          console.log("received getProfile");
          w.postMessage(
            {
              type: "loadInitialProfile",
              profile: SpecularProfiling.getProfile()
            },
            "*"
          );
        }
      });
    },
    getProfile() {
      return {
        shared: {
          frames
        },
        profiles: [
          {
            type: "evented",
            name: "page",
            unit: "milliseconds",
            startValue: events.length !== 0 ? events[0].at : 0,
            endValue: events.length !== 0 ? events[events.length - 1].at : 0,
            events
          }
        ]
      };
    },
    clear: () => {
      events.length = 0;
    }
  };
  function begin_(name16) {
    let frameIndex = frameNameToIndex[name16];
    if (frameIndex === void 0) {
      frameIndex = frames.length;
      frameNameToIndex[name16] = frameIndex;
      frames.push({ name: name16 });
    }
    events.push({ type: "O", frame: frameIndex, at: performance.now() });
    return frameIndex;
  }
  function end_(frame) {
    events.push({ type: "C", frame, at: performance.now() });
  }
  var begin = enabled ? begin_ : () => {
  };
  var end = enabled ? end_ : () => {
  };

  // output/Specular.Profiling/index.js
  var discard2 = /* @__PURE__ */ discard(discardUnit);
  var measure = function(dictMonadEffect) {
    var Monad0 = dictMonadEffect.Monad0();
    var Bind1 = Monad0.Bind1();
    var bind5 = bind(Bind1);
    var liftEffect5 = liftEffect(dictMonadEffect);
    var discard12 = discard2(Bind1);
    var pure13 = pure(Monad0.Applicative0());
    if (enabled) {
      return function(name16) {
        return function(action2) {
          return bind5(liftEffect5(function() {
            return begin(name16);
          }))(function(mark) {
            return bind5(action2)(function(result) {
              return discard12(liftEffect5(function() {
                return end(mark);
              }))(function() {
                return pure13(result);
              });
            });
          });
        };
      };
    }
    ;
    return function(v) {
      return function(action2) {
        return action2;
      };
    };
  };

  // output/Specular.Dom.Builder/index.js
  var $runtime_lazy4 = function(name16, moduleName, init3) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2) return val;
      if (state3 === 1) throw new ReferenceError(name16 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init3();
      state3 = 2;
      return val;
    };
  };
  var discard3 = /* @__PURE__ */ discard(discardUnit);
  var mempty2 = /* @__PURE__ */ mempty(/* @__PURE__ */ monoidEffect(monoidUnit));
  var measure2 = /* @__PURE__ */ measure(monadEffectEffect);
  var join2 = /* @__PURE__ */ join(bindEffect);
  var applySecond2 = /* @__PURE__ */ applySecond(applyEffect);
  var Builder = function(x) {
    return x;
  };
  var runBuilderWithUserEnv = function(userEnv) {
    return function(parent2) {
      return function(v) {
        return function __do4() {
          var actionsMutable = emptyDelayed();
          var env = {
            parent: parent2,
            cleanup: actionsMutable,
            userEnv
          };
          var result = runRIO(env)(v)();
          var actions = unsafeFreezeDelayed(actionsMutable)();
          return new Tuple(result, sequenceEffects(actions));
        };
      };
    };
  };
  var runBuilder$prime = function(env, v) {
    return v(env);
  };
  var runBuilder = /* @__PURE__ */ runBuilderWithUserEnv(unit);
  var monadEffectBuilder = monadEffectRIO;
  var liftEffect2 = /* @__PURE__ */ liftEffect(monadEffectBuilder);
  var monadBuilder = monadRIO;
  var mkBuilder$prime = function($58) {
    return Builder(RIO($58));
  };
  var mkBuilder = function($59) {
    return Builder(rio($59));
  };
  var monadCleanupBuilder = {
    onCleanup: function(action2) {
      return mkBuilder(function(env) {
        return pushDelayed(env.cleanup)(action2);
      });
    },
    Monad0: function() {
      return monadBuilder;
    }
  };
  var onCleanup2 = /* @__PURE__ */ onCleanup(monadCleanupBuilder);
  var getEnv = /* @__PURE__ */ ask(monadAskRIO);
  var bindBuilder = bindRIO;
  var bind1 = /* @__PURE__ */ bind(bindBuilder);
  var discard22 = /* @__PURE__ */ discard3(bindBuilder);
  var applyBuilder = applyRIO;
  var lift23 = /* @__PURE__ */ lift2(applyBuilder);
  var semigroupBuilder = function(dictSemigroup) {
    return {
      append: lift23(append(dictSemigroup))
    };
  };
  var applicativeBuilder = applicativeRIO;
  var pure1 = /* @__PURE__ */ pure(applicativeBuilder);
  var $lazy_monadReplaceBuilder = /* @__PURE__ */ $runtime_lazy4("monadReplaceBuilder", "Specular.Dom.Builder", function() {
    return {
      newSlot: bind1(getEnv)(function(env) {
        return bind1(liftEffect2(createTextNode("")))(function(placeholderBefore) {
          return bind1(liftEffect2(createTextNode("")))(function(placeholderAfter) {
            return discard22(liftEffect2(appendChild(placeholderBefore)(env.parent)))(function() {
              return discard22(liftEffect2(appendChild(placeholderAfter)(env.parent)))(function() {
                return bind1(liftEffect2($$new(mempty2)))(function(cleanupRef) {
                  var replace3 = function(inner) {
                    return measure2("slot replace")(function __do4() {
                      measure2("slot remove DOM")(removeAllBetween(placeholderBefore)(placeholderAfter))();
                      var fragment = createDocumentFragment();
                      var v = measure2("slot init")(runBuilderWithUserEnv(env.userEnv)(fragment)(inner))();
                      join2(read(cleanupRef))();
                      var m_parent = parentNode(placeholderAfter)();
                      (function() {
                        if (m_parent instanceof Just) {
                          insertBefore(fragment)(placeholderAfter)(m_parent.value0)();
                          return write(measure2("slot cleanup")(function __do5() {
                            v.value1();
                            return write(mempty2)(cleanupRef)();
                          }))(cleanupRef)();
                        }
                        ;
                        if (m_parent instanceof Nothing) {
                          return write(v.value1)(cleanupRef)();
                        }
                        ;
                        throw new Error("Failed pattern match at Specular.Dom.Builder (line 113, column 9 - line 126, column 37): " + [m_parent.constructor.name]);
                      })();
                      return v.value0;
                    });
                  };
                  var destroy = function __do4() {
                    removeAllBetween(placeholderBefore)(placeholderAfter)();
                    removeNode(placeholderBefore)();
                    removeNode(placeholderAfter)();
                    return join2(read(cleanupRef))();
                  };
                  var append5 = function __do4() {
                    var fragment = createDocumentFragment();
                    var v = runBuilderWithUserEnv(env.userEnv)(fragment)(newSlot($lazy_monadReplaceBuilder(0)))();
                    modify_(function(v1) {
                      return applySecond2(v1)(v.value1);
                    })(cleanupRef)();
                    var m_parent = parentNode(placeholderAfter)();
                    (function() {
                      if (m_parent instanceof Just) {
                        return insertBefore(fragment)(placeholderAfter)(m_parent.value0)();
                      }
                      ;
                      if (m_parent instanceof Nothing) {
                        return unit;
                      }
                      ;
                      throw new Error("Failed pattern match at Specular.Dom.Builder (line 145, column 9 - line 149, column 22): " + [m_parent.constructor.name]);
                    })();
                    return v.value0;
                  };
                  return discard22(onCleanup2(join2(read(cleanupRef))))(function() {
                    return pure1(new Slot(replace3, destroy, append5));
                  });
                });
              });
            });
          });
        });
      }),
      Monad0: function() {
        return monadBuilder;
      },
      MonadCleanup1: function() {
        return monadCleanupBuilder;
      }
    };
  });
  var monadReplaceBuilder = /* @__PURE__ */ $lazy_monadReplaceBuilder(88);
  var monoidBuilder = function(dictMonoid) {
    var semigroupBuilder1 = semigroupBuilder(dictMonoid.Semigroup0());
    return {
      mempty: pure1(mempty(dictMonoid)),
      Semigroup0: function() {
        return semigroupBuilder1;
      }
    };
  };

  // output/Specular.Dom.Builder.Class/index.js
  var onDomEvent = function(dictMonadFRP) {
    var MonadCleanup1 = dictMonadFRP.MonadCleanup1();
    var bind5 = bind(MonadCleanup1.Monad0().Bind1());
    var liftEffect5 = liftEffect(dictMonadFRP.MonadEffect0());
    var onCleanup4 = onCleanup(MonadCleanup1);
    return function(eventType) {
      return function(node2) {
        return function(handler) {
          return bind5(liftEffect5(addEventListener(eventType)(handler)(node2)))(function(unsub) {
            return onCleanup4(unsub);
          });
        };
      };
    };
  };

  // output/Specular.Dom.Element/foreign.js
  function _stopPropagation(event) {
    event.stopPropagation();
  }
  var spacesRE = /\s+/;
  function splitClasses(classes2) {
    return classes2.split(spacesRE).filter((x) => x !== "");
  }
  function _addClass(node2, cls2) {
    node2.classList.add(...splitClasses(cls2));
  }
  function _initClasses(node2) {
    var currentClassSet = {};
    return function(classes2) {
      var newClassSet = {};
      for (var i = 0; i < classes2.length; i++) {
        for (const class_2 of splitClasses(classes2[i])) {
          newClassSet[class_2] = true;
          if (!currentClassSet[class_2]) {
            node2.classList.add(class_2);
          }
        }
      }
      var oldClasses = Object.keys(currentClassSet);
      for (var i = 0; i < oldClasses.length; i++) {
        var class_ = oldClasses[i];
        if (!newClassSet[class_]) {
          node2.classList.remove(class_);
        }
      }
      currentClassSet = newClassSet;
    };
  }
  function setProperty(node2, property, value12) {
    node2[property] = value12;
  }

  // output/Effect.Unsafe/foreign.js
  var unsafePerformEffect = function(f) {
    return f();
  };

  // output/Specular.Internal.Incremental.Array/foreign.js
  function iterate2(self, fn) {
    for (var i = 0; i < self.length; i++) {
      fn(self[i]);
    }
  }

  // output/Specular.Internal.Incremental.Effect/foreign.js
  function _foreachUntil(none3, array, fn) {
    for (var i = 0; i < array.length; i++) {
      var result = fn(array[i]);
      if (result !== none3) {
        return result;
      }
    }
    return none3;
  }

  // output/Specular.Internal.Incremental.Optional/foreign.js
  var none2 = {
    toString: function() {
      return "none";
    }
  };

  // output/Unsafe.Reference/foreign.js
  function reallyUnsafeRefEq(a) {
    return function(b) {
      return a === b;
    };
  }

  // output/Unsafe.Reference/index.js
  var unsafeRefEq = reallyUnsafeRefEq;

  // output/Specular.Internal.Incremental.Optional/index.js
  var Optional = function(x) {
    return x;
  };
  var some2 = Optional;
  var isSome = function(opt) {
    return !unsafeRefEq(opt)(none2);
  };
  var fromSome = function(v) {
    if (isSome(v)) {
      return v;
    }
    ;
    if (otherwise) {
      return unsafeCrashWith("Optional.fromSome: none");
    }
    ;
    throw new Error("Failed pattern match at Specular.Internal.Incremental.Optional (line 24, column 1 - line 24, column 38): " + [v.constructor.name]);
  };

  // output/Specular.Internal.Incremental.Effect/index.js
  var foreachUntil = function(array, fn) {
    return _foreachUntil(none2, array, fn);
  };

  // output/Specular.Internal.Incremental.Ref/foreign.js
  function new_(value12) {
    return { value: value12 };
  }
  function read3(ref) {
    return ref.value;
  }
  function write3(ref, value12) {
    ref.value = value12;
  }

  // output/Specular.Internal.Incremental.Global/index.js
  var stabilizationIsNotInProgress = /* @__PURE__ */ function() {
    return -1 | 0;
  }();
  var globalTotalRefcount = /* @__PURE__ */ unsafePerformEffect(function() {
    return new_(0);
  });
  var globalLastStabilizationNum = /* @__PURE__ */ unsafePerformEffect(function() {
    return new_(0);
  });
  var globalCurrentStabilizationNum = /* @__PURE__ */ unsafePerformEffect(function() {
    return new_(stabilizationIsNotInProgress);
  });

  // output/Specular.Internal.Incremental.MutableArray/foreign.js
  function empty5() {
    return { array: [], nullCnt: 0 };
  }
  function push2(self, x) {
    self.array.push(x);
  }
  function remove(self, x) {
    var index4 = self.array.indexOf(x);
    if (index4 !== -1) {
      self.array[index4] = null;
      self.nullCnt++;
    }
  }
  function length4(self) {
    return self.array.length - self.nullCnt;
  }
  function iterate3(self, fn) {
    let writeIndex = 0;
    for (let i = 0; i < self.array.length; i++) {
      const value12 = self.array[i];
      if (value12 !== null) {
        fn(value12);
        if (writeIndex !== i) {
          self.array[writeIndex] = value12;
        }
        writeIndex++;
      }
    }
    self.array.length = writeIndex;
    self.nullCnt = 0;
  }

  // output/Specular.Internal.Incremental.Node/foreign.js
  function _new2(none3, source, dependents, observers, value12, height8) {
    return {
      source,
      dependents,
      observers,
      value: value12,
      height: height8,
      adjustedHeight: height8,
      inRecomputeQueue: false,
      nextInRecomputeQueue: none3,
      name: "",
      // For initial `changedAt` we want a value lower than all possible stabilization numbers, but different than `stabilizationIsNotInProgress`.
      // Hence -2.
      changedAt: -2
    };
  }
  function get_dependents(node2) {
    return node2.dependents;
  }
  function get_observers(node2) {
    return node2.observers;
  }
  function get_source(node2) {
    return node2.source;
  }
  function get_adjustedHeight(node2) {
    return node2.adjustedHeight;
  }
  function set_adjustedHeight(node2, value12) {
    node2.adjustedHeight = value12;
  }
  function get_changedAt(node2) {
    return node2.changedAt;
  }
  function set_changedAt(node2, value12) {
    node2.changedAt = value12;
  }
  function get_height(node2) {
    return node2.height;
  }
  function set_height(node2, value12) {
    node2.height = value12;
  }
  function get_name(node2) {
    return node2.name;
  }
  function set_name(node2, value12) {
    node2.name = value12;
  }
  function get_value(node2) {
    return node2.value;
  }
  function set_value(node2, value12) {
    node2.value = value12;
  }

  // output/Specular.Internal.Incremental.Node/index.js
  var valueExc = function(node2) {
    var value_opt = get_value(node2);
    return fromSome(value_opt);
  };
  var toSomeNodeArray = unsafeCoerce2;
  var toSomeNode = unsafeCoerce2;
  var refcount = function(node2) {
    var observers = get_observers(node2);
    var numDependents = length4(observers);
    var dependents = get_dependents(node2);
    var numObservers = length4(dependents);
    return numDependents + numObservers | 0;
  };
  var name2 = function(node2) {
    return unsafePerformEffect(function() {
      return get_name(node2);
    });
  };
  var isChangingInCurrentStabilization = function(node2) {
    var currentStabilizationNum = read3(globalCurrentStabilizationNum);
    var changedAt = get_changedAt(node2);
    return changedAt === currentStabilizationNum;
  };
  var create = function(source) {
    var dependents = empty5();
    var observers = empty5();
    return _new2(none2, source, dependents, observers, none2, 0);
  };
  var annotate = /* @__PURE__ */ function() {
    if (enabled) {
      return set_name;
    }
    ;
    return function(v, v1) {
      return unit;
    };
  }();

  // output/Specular.Internal.Incremental.PriorityQueue/foreign.js
  function new_2(none3, priorityField, presentField, nextField) {
    return {
      none: none3,
      // Property names of various properties of queue elements.
      priorityField,
      presentField,
      nextField,
      // Array indexed by priority.
      // Elements within each priority are stored in an intrusive linked list:
      // - `this.none` is the end
      // - `element[this.nextField]` is the next element.
      // `priorityHeads[priority]` contains the head of this list (or `none` if empty).
      priorityHeads: [],
      // Total number of elements in the queue.
      count: 0
      // TODO: we should track minPriority
    };
  }
  var PRIORITY_WARNING_MARK = 250;
  function add2(pq, node2) {
    if (node2[pq.presentField]) {
      return false;
    }
    node2[pq.presentField] = true;
    pq.count++;
    var priority = node2[pq.priorityField];
    while (priority >= pq.priorityHeads.length) {
      pq.priorityHeads.push(pq.none);
      if (pq.priorityHeads.length === PRIORITY_WARNING_MARK) {
        console.warn("Specular: Node height reached " + PRIORITY_WARNING_MARK);
      }
    }
    node2[pq.nextField] = pq.priorityHeads[priority];
    pq.priorityHeads[priority] = node2;
    return true;
  }
  var removeMin = function(pq) {
    for (var priority = 0; priority < pq.priorityHeads.length; priority++) {
      var node2 = pq.priorityHeads[priority];
      if (node2 !== pq.none) {
        node2[pq.presentField] = false;
        pq.priorityHeads[priority] = node2[pq.nextField];
        node2[pq.nextField] = pq.none;
        pq.count--;
        return node2;
      }
    }
    return pq.none;
  };
  function drain(pq, fn) {
    while (pq.count > 0) {
      fn(removeMin(pq));
    }
  }

  // output/Specular.Internal.Incremental/index.js
  var $runtime_lazy5 = function(name16, moduleName, init3) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2) return val;
      if (state3 === 1) throw new ReferenceError(name16 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init3();
      state3 = 2;
      return val;
    };
  };
  var pure3 = /* @__PURE__ */ pure(applicativeEffect);
  var max3 = /* @__PURE__ */ max(ordInt);
  var uniqBy = function(fn, a) {
    var deps = [toSomeNode(a)];
    return create({
      compute: function(node2) {
        var old = get_value(node2);
        var $$new4 = get_value(a);
        var $25 = isSome($$new4) && (!isSome(old) || !fn(fromSome(old), fromSome($$new4)));
        if ($25) {
          return $$new4;
        }
        ;
        return none2;
      },
      dependencies: pure3(deps)
    });
  };
  var readVar = function(v) {
    return v;
  };
  var readEvent = function(v) {
    return v;
  };
  var newVar = function(val) {
    var node2 = create({
      compute: function(node3) {
        var value12 = valueExc(node3);
        return some2(value12);
      },
      dependencies: pure3([])
    });
    set_value(node2, some2(val));
    return node2;
  };
  var newEvent = function __do() {
    var node2 = create({
      compute: function(node3) {
        return get_value(node3);
      },
      dependencies: pure3([])
    });
    return node2;
  };
  var mapOptional = function(fn, a) {
    var deps = [toSomeNode(a)];
    return create({
      compute: function(v) {
        var value_a = get_value(a);
        var $30 = isSome(value_a);
        if ($30) {
          return fn(fromSome(value_a));
        }
        ;
        return none2;
      },
      dependencies: pure3(deps)
    });
  };
  var map22 = function(fn, a, b) {
    var deps = [toSomeNode(a), toSomeNode(b)];
    return create({
      compute: function(v) {
        var value_a = valueExc(a);
        var value_b = valueExc(b);
        return some2(fn(value_a, value_b));
      },
      dependencies: pure3(deps)
    });
  };
  var map4 = function(fn, a) {
    var deps = [toSomeNode(a)];
    return create({
      compute: function(v) {
        var value_a = valueExc(a);
        return some2(fn(value_a));
      },
      dependencies: pure3(deps)
    });
  };
  var leftmost = function(inputs) {
    return create({
      compute: function(_node) {
        return foreachUntil(inputs, function(input) {
          var isFiring = isChangingInCurrentStabilization(input);
          if (isFiring) {
            return get_value(input);
          }
          ;
          return none2;
        });
      },
      dependencies: pure3(toSomeNodeArray(inputs))
    });
  };
  var globalRecomputeQueue = /* @__PURE__ */ unsafePerformEffect(function() {
    return new_2(none2, "height", "inRecomputeQueue", "nextInRecomputeQueue");
  });
  var setVar = function(v, val) {
    set_value(v, some2(val));
    add2(globalRecomputeQueue, toSomeNode(v));
    return unit;
  };
  var triggerEvent = function(v, val) {
    set_value(v, some2(val));
    add2(globalRecomputeQueue, toSomeNode(v));
    return unit;
  };
  var fold3 = function(fn, initial, a) {
    var deps = [toSomeNode(a)];
    return create({
      compute: function(node2) {
        var state_opt = get_value(node2);
        var state3 = function() {
          var $35 = isSome(state_opt);
          if ($35) {
            return fromSome(state_opt);
          }
          ;
          return initial;
        }();
        var hasInput = isChangingInCurrentStabilization(a);
        var result = function() {
          if (hasInput) {
            var input = valueExc(a);
            return fn(input, state3);
          }
          ;
          return some2(state3);
        }();
        return result;
      },
      dependencies: pure3(deps)
    });
  };
  var ensureHeight = function(node2, newHeight) {
    var oldAdjustedHeight = get_adjustedHeight(node2);
    return set_adjustedHeight(node2, max3(oldAdjustedHeight)(newHeight));
  };
  var recomputeNode = function(node2) {
    var height8 = get_height(node2);
    var adjustedHeight = get_adjustedHeight(node2);
    var $37 = adjustedHeight > height8;
    if ($37) {
      var mark = begin("bump height " + name2(node2));
      var dependents = get_dependents(node2);
      iterate3(dependents, function(dependent) {
        return ensureHeight(dependent, adjustedHeight + 1 | 0);
      });
      set_height(node2, adjustedHeight);
      add2(globalRecomputeQueue, node2);
      return end(mark);
    }
    ;
    var mark = begin("compute " + name2(node2));
    var source = get_source(node2);
    var newValue_opt = source.compute(node2);
    (function() {
      var $38 = isSome(newValue_opt);
      if ($38) {
        var newValue = fromSome(newValue_opt);
        set_value(node2, some2(newValue));
        var currentStabilizationNum = read3(globalCurrentStabilizationNum);
        set_changedAt(node2, currentStabilizationNum);
        var dependents2 = get_dependents(node2);
        iterate3(dependents2, function(dependent) {
          var _added = add2(globalRecomputeQueue, dependent);
          return unit;
        });
        var observers = get_observers(node2);
        return iterate3(observers, function(observer) {
          return observer(newValue);
        });
      }
      ;
      return unit;
    })();
    return end(mark);
  };
  var stabilize = function __do2() {
    var mark = begin("stabilize");
    var oldStabilizationNum = read3(globalLastStabilizationNum);
    var currentStabilizationNum = oldStabilizationNum + 1 | 0;
    write3(globalLastStabilizationNum, currentStabilizationNum);
    write3(globalCurrentStabilizationNum, currentStabilizationNum);
    drain(globalRecomputeQueue, recomputeNode);
    write3(globalCurrentStabilizationNum, stabilizationIsNotInProgress);
    return end(mark);
  };
  var $lazy_addDependent = /* @__PURE__ */ $runtime_lazy5("addDependent", "Specular.Internal.Incremental", function() {
    return function(node2, dependent) {
      var oldRefcount = refcount(node2);
      var dependents = get_dependents(node2);
      push2(dependents, dependent);
      return $lazy_handleRefcountChange(103)(node2, oldRefcount);
    };
  });
  var $lazy_connect = /* @__PURE__ */ $runtime_lazy5("connect", "Specular.Internal.Incremental", function() {
    return function(node2) {
      var mark = begin("connect " + name2(node2));
      var source = get_source(node2);
      var dependencies = source.dependencies();
      iterate2(dependencies, function(dependency) {
        $lazy_addDependent(142)(dependency, toSomeNode(node2));
        var dependencyHeight = get_height(dependency);
        var adjustedHeight = get_adjustedHeight(node2);
        var ourHeight = get_height(node2);
        var desiredHeight = max3(dependencyHeight + 1 | 0)(adjustedHeight);
        var $39 = desiredHeight > ourHeight;
        if ($39) {
          set_height(node2, desiredHeight);
          return set_adjustedHeight(node2, desiredHeight);
        }
        ;
        return unit;
      });
      var value12 = source.compute(node2);
      (function() {
        var $40 = isSome(value12);
        if ($40) {
          return set_value(node2, value12);
        }
        ;
        return unit;
      })();
      return end(mark);
    };
  });
  var $lazy_disconnect = /* @__PURE__ */ $runtime_lazy5("disconnect", "Specular.Internal.Incremental", function() {
    return function(node2) {
      var mark = begin("disconnect " + name2(node2));
      var source = get_source(node2);
      var dependencies = source.dependencies();
      iterate2(dependencies, function(dependency) {
        return $lazy_removeDependent(174)(dependency, toSomeNode(node2));
      });
      return end(mark);
    };
  });
  var $lazy_handleRefcountChange = /* @__PURE__ */ $runtime_lazy5("handleRefcountChange", "Specular.Internal.Incremental", function() {
    return function(node2, oldRefcount) {
      var newcount = refcount(node2);
      (function() {
        var $41 = oldRefcount === 0 && newcount > 0;
        if ($41) {
          return $lazy_connect(116)(node2);
        }
        ;
        var $42 = oldRefcount > 0 && newcount === 0;
        if ($42) {
          return $lazy_disconnect(118)(node2);
        }
        ;
        return unit;
      })();
      var oldTotalRefcount = read3(globalTotalRefcount);
      return write3(globalTotalRefcount, (oldTotalRefcount - oldRefcount | 0) + newcount | 0);
    };
  });
  var $lazy_removeDependent = /* @__PURE__ */ $runtime_lazy5("removeDependent", "Specular.Internal.Incremental", function() {
    return function(node2, dependent) {
      var oldRefcount = refcount(node2);
      var dependents = get_dependents(node2);
      remove(dependents, dependent);
      return $lazy_handleRefcountChange(110)(node2, oldRefcount);
    };
  });
  var handleRefcountChange = /* @__PURE__ */ $lazy_handleRefcountChange(112);
  var addObserver = function(node2, observer) {
    var oldRefcount = refcount(node2);
    var observers = get_observers(node2);
    push2(observers, observer);
    return handleRefcountChange(node2, oldRefcount);
  };
  var removeObserver = function(node2, observer) {
    var oldRefcount = refcount(node2);
    var observers = get_observers(node2);
    remove(observers, observer);
    return handleRefcountChange(node2, oldRefcount);
  };

  // output/Specular.Internal.Queue/foreign.js
  function new_3() {
    return {
      elements: [],
      end: 0,
      first: 0
    };
  }
  function enqueue(q, elem3) {
    q.elements[q.end] = elem3;
    q.end++;
  }
  function drain2(q, fn) {
    while (q.first < q.end) {
      var elem3 = q.elements[q.first];
      q.elements[q.first] = void 0;
      q.first++;
      fn(elem3);
    }
    q.first = 0;
    q.end = 0;
  }

  // output/Specular.FRP.Base/index.js
  var discard4 = /* @__PURE__ */ discard(discardUnit);
  var pure4 = /* @__PURE__ */ pure(applicativeEffect);
  var map5 = /* @__PURE__ */ map(functorArray);
  var liftEffect3 = /* @__PURE__ */ liftEffect(monadEffectEffect);
  var uniqDynPureBy = function(eq6) {
    return function(v) {
      return unsafePerformEffect(function __do4() {
        var n = uniqBy(mkFn2(eq6), v);
        annotate(n, "uniqDyn");
        return n;
      });
    };
  };
  var uniqDynPure = function(dictEq) {
    return uniqDynPureBy(eq(dictEq));
  };
  var readNode = function(node2) {
    var handler = function(v) {
      return unit;
    };
    return function __do4() {
      addObserver(node2, handler);
      var value12 = get_value(node2);
      removeObserver(node2, handler);
      return fromSome(value12);
    };
  };
  var readDynamic = function(dictMonadEffect) {
    var liftEffect1 = liftEffect(dictMonadEffect);
    return function(v) {
      return liftEffect1(function __do4() {
        var mark = begin("readDynamic");
        var result = readNode(v)();
        end(mark);
        return result;
      });
    };
  };
  var readDynamic1 = /* @__PURE__ */ readDynamic(monadEffectEffect);
  var monadFRP = function(dictMonadEffect) {
    return function(dictMonadCleanup) {
      return {
        MonadEffect0: function() {
          return dictMonadEffect;
        },
        MonadCleanup1: function() {
          return dictMonadCleanup;
        }
      };
    };
  };
  var leftmost2 = function(events2) {
    return unsafePerformEffect(function __do4() {
      var n = leftmost(map5(function(v) {
        return v;
      })(events2));
      annotate(n, "leftmost");
      return n;
    });
  };
  var globalEffectQueue = /* @__PURE__ */ unsafePerformEffect(new_3);
  var functorEvent = {
    map: function(f) {
      return function(v) {
        return unsafePerformEffect(function __do4() {
          var n = mapOptional(function($223) {
            return some2(f($223));
          }, v);
          annotate(n, "mapEvent");
          return n;
        });
      };
    }
  };
  var functorDynamic = {
    map: function(f) {
      return function(v) {
        return unsafePerformEffect(function __do4() {
          var n = map4(f, v);
          annotate(n, "map " + name2(v));
          return n;
        });
      };
    }
  };
  var drainEffects = function() {
    return drain2(globalEffectQueue, function(handler) {
      return handler();
    });
  };
  var stabilize2 = function __do3() {
    var mark = begin("Specular.stabilize");
    stabilize();
    drainEffects();
    return end(mark);
  };
  var newDynamic = function(dictMonadEffect) {
    var liftEffect1 = liftEffect(dictMonadEffect);
    return function(initial) {
      return liftEffect1(function __do4() {
        var $$var = newVar(initial);
        annotate(readVar($$var), "root Dynamic");
        var dynamic = readVar($$var);
        return {
          dynamic,
          read: readDynamic1(dynamic),
          set: function(x) {
            return function __do5() {
              var name16 = get_name(readVar($$var));
              var mark = begin("set " + name16);
              setVar($$var, x);
              stabilize2();
              return end(mark);
            };
          },
          modify: function(f) {
            return function __do5() {
              var name16 = get_name(readVar($$var));
              var mark = begin("modify " + name16);
              var x = valueExc(readVar($$var));
              setVar($$var, f(x));
              stabilize2();
              return end(mark);
            };
          }
        };
      });
    };
  };
  var newEvent2 = function(dictMonadEffect) {
    return liftEffect(dictMonadEffect)(function __do4() {
      var evt = newEvent();
      annotate(readEvent(evt), "root Event");
      return {
        event: readEvent(evt),
        fire: function(x) {
          return function __do5() {
            var name16 = get_name(readEvent(evt));
            var mark = begin("fire " + name16);
            triggerEvent(evt, x);
            stabilize2();
            return end(mark);
          };
        }
      };
    });
  };
  var changed = function(v) {
    return v;
  };
  var applyDynamic = {
    apply: function(v) {
      return function(v1) {
        return unsafePerformEffect(function __do4() {
          var n = map22(mkFn2(apply), v, v1);
          annotate(n, "apply (" + (name2(v) + (") (" + (name2(v1) + ")"))));
          return n;
        });
      };
    },
    Functor0: function() {
      return functorDynamic;
    }
  };
  var _subscribeNode = function(handler, node2) {
    var h = function(value12) {
      return enqueue(globalEffectQueue, handler(value12));
    };
    addObserver(node2, h);
    return function() {
      return removeObserver(node2, h);
    };
  };
  var subscribeNode = function(dictMonadEffect) {
    var liftEffect1 = liftEffect(dictMonadEffect);
    return function(dictMonadCleanup) {
      var bind13 = bind(dictMonadCleanup.Monad0().Bind1());
      var onCleanup4 = onCleanup(dictMonadCleanup);
      return function(handler) {
        return function(event) {
          return bind13(liftEffect1(function() {
            return _subscribeNode(handler, event);
          }))(function(unsub) {
            return onCleanup4(unsub);
          });
        };
      };
    };
  };
  var foldDyn = function(dictMonadFRP) {
    var MonadCleanup1 = dictMonadFRP.MonadCleanup1();
    var Monad0 = MonadCleanup1.Monad0();
    var Bind1 = Monad0.Bind1();
    var bind13 = bind(Bind1);
    var MonadEffect0 = dictMonadFRP.MonadEffect0();
    var liftEffect1 = liftEffect(MonadEffect0);
    var discard24 = discard4(Bind1);
    var subscribeNode1 = subscribeNode(MonadEffect0)(MonadCleanup1);
    var pure23 = pure(Monad0.Applicative0());
    return function(f) {
      return function(initial) {
        return function(v) {
          return bind13(liftEffect1(function __do4() {
            var n = fold3(function(a, b) {
              return some2(f(a)(b));
            }, initial, v);
            annotate(n, "foldDyn");
            return n;
          }))(function(n) {
            return discard24(subscribeNode1(function(v1) {
              return pure4(unit);
            })(n))(function() {
              return pure23(n);
            });
          });
        };
      };
    };
  };
  var holdDyn = function(dictMonadFRP) {
    return foldDyn(dictMonadFRP)(function(x) {
      return function(v) {
        return x;
      };
    });
  };
  var foldDynMaybe = function(dictMonadFRP) {
    var MonadCleanup1 = dictMonadFRP.MonadCleanup1();
    var Monad0 = MonadCleanup1.Monad0();
    var Bind1 = Monad0.Bind1();
    var bind13 = bind(Bind1);
    var MonadEffect0 = dictMonadFRP.MonadEffect0();
    var liftEffect1 = liftEffect(MonadEffect0);
    var discard24 = discard4(Bind1);
    var subscribeNode1 = subscribeNode(MonadEffect0)(MonadCleanup1);
    var pure23 = pure(Monad0.Applicative0());
    return function(f) {
      return function(initial) {
        return function(v) {
          return bind13(liftEffect1(function __do4() {
            var n = fold3(function(a, b) {
              return maybe(none2)(some2)(f(a)(b));
            }, initial, v);
            annotate(n, "foldDynMaybe");
            return n;
          }))(function(n) {
            return discard24(subscribeNode1(function(v1) {
              return pure4(unit);
            })(n))(function() {
              return pure23(n);
            });
          });
        };
      };
    };
  };
  var holdUniqDynBy = function(dictMonadFRP) {
    var foldDynMaybe1 = foldDynMaybe(dictMonadFRP);
    return function(eq6) {
      return foldDynMaybe1(function($$new4) {
        return function(old) {
          var $213 = eq6($$new4)(old);
          if ($213) {
            return Nothing.value;
          }
          ;
          return new Just($$new4);
        };
      });
    };
  };
  var subscribeDyn_ = function(dictMonadFRP) {
    var MonadCleanup1 = dictMonadFRP.MonadCleanup1();
    var discard24 = discard4(MonadCleanup1.Monad0().Bind1());
    var MonadEffect0 = dictMonadFRP.MonadEffect0();
    var subscribeNode1 = subscribeNode(MonadEffect0)(MonadCleanup1);
    var liftEffect1 = liftEffect(MonadEffect0);
    return function(handler) {
      return function(v) {
        return discard24(subscribeNode1(handler)(v))(function() {
          return liftEffect1(function __do4() {
            var currentValue = valueExc(v);
            return liftEffect3(handler(currentValue))();
          });
        });
      };
    };
  };
  var subscribeEvent_ = function(dictMonadEffect) {
    var subscribeNode1 = subscribeNode(dictMonadEffect);
    return function(dictMonadCleanup) {
      var subscribeNode2 = subscribeNode1(dictMonadCleanup);
      return function(handler) {
        return function(v) {
          return subscribeNode2(handler)(v);
        };
      };
    };
  };
  var _subscribeEvent = function(handler, v) {
    return _subscribeNode(handler, v);
  };

  // output/Specular.Dom.Element/index.js
  var measure3 = /* @__PURE__ */ measure(monadEffectEffect);
  var bind12 = /* @__PURE__ */ bind(bindBuilder);
  var subscribeDyn_2 = /* @__PURE__ */ subscribeDyn_(/* @__PURE__ */ monadFRP(monadEffectBuilder)(monadCleanupBuilder));
  var readDynamic2 = /* @__PURE__ */ readDynamic(monadEffectEffect);
  var notEq2 = /* @__PURE__ */ notEq(/* @__PURE__ */ eqMaybe(eqString));
  var mapFlipped2 = /* @__PURE__ */ mapFlipped(functorDynamic);
  var unsafeEventTarget = function(e) {
    return e.target;
  };
  var withTargetValue = function(cb) {
    return function(event) {
      return function __do4() {
        var value12 = getTextInputValue(unsafeEventTarget(event))();
        return cb(value12)();
      };
    };
  };
  var text = function(str) {
    return mkBuilder$prime(function(env) {
      var node2 = createTextNode(str)();
      return appendChild(node2)(env.parent)();
    });
  };
  var stopPropagation = /* @__PURE__ */ runEffectFn1(_stopPropagation);
  var semigroupProp = {
    append: function(v) {
      return function(v1) {
        return function(node2, cleanups) {
          v(node2, cleanups);
          return v1(node2, cleanups);
        };
      };
    }
  };
  var append1 = /* @__PURE__ */ append(semigroupProp);
  var on = function(eventType) {
    return function(cb) {
      return function(node2, _cleanups) {
        addEventListener(eventType)(function(e) {
          return measure3("event: " + eventType)(cb(e));
        })(node2)();
        return unit;
      };
    };
  };
  var initElement = function(env, node2, props, body) {
    var mark = begin("el");
    var result = runBuilder$prime({
      cleanup: env.cleanup,
      userEnv: env.userEnv,
      parent: node2
    }, body);
    foreachE(props)(function(v) {
      return function() {
        return v(node2, env.cleanup);
      };
    })();
    appendChild(node2)(env.parent)();
    end(mark);
    return result;
  };
  var el$prime = function(tagName) {
    return function(props) {
      return function(body) {
        return mkBuilder$prime(function(env) {
          var node2 = createElement(tagName)();
          var result = initElement(env, node2, props, body);
          return new Tuple(node2, result);
        });
      };
    };
  };
  var el = function(tagName) {
    return function(props) {
      return function(body) {
        return mkBuilder$prime(function(env) {
          var node2 = createElement(tagName)();
          return initElement(env, node2, props, body);
        });
      };
    };
  };
  var dynText = function(strD) {
    return bind12(mkBuilder$prime(function(env) {
      var node2 = createTextNode("")();
      appendChild(node2)(env.parent)();
      return node2;
    }))(function(node2) {
      return subscribeDyn_2(setText(node2))(strD);
    });
  };
  var classes = function(clss) {
    return function(node2, v) {
      return foreachE(clss)(function(cls2) {
        return function() {
          return _addClass(node2, cls2);
        };
      })();
    };
  };
  var attrs = function(a) {
    return function(node2, v) {
      return setAttributes(node2)(a)();
    };
  };
  var attr = function(name16) {
    return function(value12) {
      return attrs(singleton3(name16)(value12));
    };
  };
  var _subscribeDyn = function(cleanups, dyn, handler) {
    var unsub = _subscribeEvent(runEffectFn1(handler), changed(dyn));
    pushDelayed(cleanups)(unsub)();
    var initialValue = readDynamic2(dyn)();
    return handler(initialValue);
  };
  var attrsD = function(dynAttrs) {
    return function(node2, cleanups) {
      var attrsRef = $$new(empty2)();
      var resetAttributes = function(newAttrs) {
        var oldAttrs = read(attrsRef)();
        write(newAttrs)(attrsRef)();
        var removed = filter(function(k) {
          return !member(k)(newAttrs);
        })(keys(oldAttrs));
        var changed2 = filterWithKey(function(k) {
          return function(v) {
            return notEq2(lookup(k)(oldAttrs))(new Just(v));
          };
        })(newAttrs);
        removeAttributes(node2)(removed)();
        return setAttributes(node2)(changed2)();
      };
      return _subscribeDyn(cleanups, dynAttrs, resetAttributes);
    };
  };
  var attrD = function(name16) {
    return function(valD) {
      return attrsD(mapFlipped2(valD)(function(v) {
        return singleton3(name16)(v);
      }));
    };
  };
  var classesD = function(clssD) {
    return function(node2, cleanups) {
      var updateClasses = _initClasses(node2);
      return _subscribeDyn(cleanups, clssD, updateClasses);
    };
  };
  var propertyD = function(property) {
    return function(dyn) {
      return function(node2, cleanups) {
        return _subscribeDyn(cleanups, dyn, function(v) {
          return setProperty(node2, property, v);
        });
      };
    };
  };
  var valueD = /* @__PURE__ */ propertyD("value");
  var bindValueOnInput = function(v) {
    return append1(valueD(v.value0))(on("input")(withTargetValue(function($81) {
      return v.value1($$const($81));
    })));
  };

  // output/Specular.Dom.Widget/foreign.js
  function documentBody() {
    return document.body;
  }

  // output/Specular.Dom.Widget/index.js
  var bind3 = /* @__PURE__ */ bind(bindBuilder);
  var newSlot2 = /* @__PURE__ */ newSlot(monadReplaceBuilder);
  var discard5 = /* @__PURE__ */ discard(discardUnit);
  var discard1 = /* @__PURE__ */ discard5(bindBuilder);
  var onCleanup3 = /* @__PURE__ */ onCleanup(monadCleanupBuilder);
  var liftEffect4 = /* @__PURE__ */ liftEffect(monadEffectBuilder);
  var map6 = /* @__PURE__ */ map(functorEffect);
  var runWidgetInNode = function(parent2) {
    return function(widget) {
      return runBuilder(parent2)(bind3(newSlot2)(function(slot) {
        return discard1(onCleanup3(destroySlot(slot)))(function() {
          return liftEffect4(replaceSlot(slot)(widget));
        });
      }));
    };
  };
  var runMainWidgetInNode = function(parent2) {
    return function(widget) {
      return map6(fst)(runWidgetInNode(parent2)(widget));
    };
  };
  var runMainWidgetInBody = function(widget) {
    return function __do4() {
      var body = documentBody();
      return runMainWidgetInNode(body)(widget)();
    };
  };

  // output/Specular.FRP.List/foreign.js
  function nextMicrotask(eff) {
    return function() {
      Promise.resolve().then(eff);
    };
  }

  // output/Specular.FRP.List/index.js
  var map7 = /* @__PURE__ */ map(functorEffect);
  var traverse2 = /* @__PURE__ */ traverse(traversableArray)(applicativeEffect);
  var max4 = /* @__PURE__ */ max(ordInt);
  var pure5 = /* @__PURE__ */ pure(applicativeEffect);
  var newEvent3 = /* @__PURE__ */ newEvent2(monadEffectEffect);
  var append3 = /* @__PURE__ */ append(semigroupArray);
  var map1 = /* @__PURE__ */ map(functorArray);
  var $$void4 = /* @__PURE__ */ $$void(functorEffect);
  var updateList = function(dictMonadFRP) {
    var bind13 = bind(dictMonadFRP.MonadCleanup1().Monad0().Bind1());
    var holdUniqDynBy2 = holdUniqDynBy(dictMonadFRP);
    return function(latestRef) {
      return function(mainSlot) {
        return function(handler) {
          return function(newArray) {
            return function __do4() {
              var latest = read(latestRef)();
              var newEntries = map7(concat)(flip(traverse2)(range2(0)(max4(length(newArray))(length(latest))))(function(i) {
                var v = index(newArray)(i);
                var v1 = index(latest)(i);
                if (v1 instanceof Just && v instanceof Just) {
                  return function __do5() {
                    nextMicrotask(v1.value0.fire(v.value0))();
                    return [];
                  };
                }
                ;
                if (v1 instanceof Just && v instanceof Nothing) {
                  return function __do5() {
                    destroySlot(v1.value0.slot)();
                    return [];
                  };
                }
                ;
                if (v1 instanceof Nothing && v instanceof Just) {
                  return function __do5() {
                    var slot = appendSlot(mainSlot)();
                    var v2 = newEvent3();
                    var result = replaceSlot(slot)(bind13(holdUniqDynBy2(unsafeRefEq)(v.value0)(v2.event))(function(dyn) {
                      return handler(i)(dyn);
                    }))();
                    return [{
                      slot,
                      fire: v2.fire,
                      result
                    }];
                  };
                }
                ;
                if (v1 instanceof Nothing && v instanceof Nothing) {
                  return pure5([]);
                }
                ;
                throw new Error("Failed pattern match at Specular.FRP.List (line 66, column 5 - line 81, column 16): " + [v1.constructor.name, v.constructor.name]);
              }))();
              var newLatest = take(length(newArray))(append3(latest)(newEntries));
              write(newLatest)(latestRef)();
              return map1(function(v) {
                return v.result;
              })(newLatest);
            };
          };
        };
      };
    };
  };
  var dynamicListWithIndex_ = function(dictMonadFRP) {
    var bind13 = bind(dictMonadFRP.MonadCleanup1().Monad0().Bind1());
    var liftEffect5 = liftEffect(dictMonadFRP.MonadEffect0());
    var subscribeDyn_4 = subscribeDyn_(dictMonadFRP);
    var updateList1 = updateList(dictMonadFRP);
    return function(dictMonadReplace) {
      var newSlot3 = newSlot(dictMonadReplace);
      return function(dynArray) {
        return function(handler) {
          return bind13(liftEffect5($$new([])))(function(v) {
            return bind13(newSlot3)(function(mainSlot) {
              return subscribeDyn_4(function() {
                var $74 = updateList1(v)(mainSlot)(handler);
                return function($75) {
                  return $$void4($74($75));
                };
              }())(dynArray);
            });
          });
        };
      };
    };
  };

  // output/Specular.FRP.Replaceable/index.js
  var withDynamic_ = function(dictMonadReplace) {
    var newSlot3 = newSlot(dictMonadReplace);
    return function(dictMonadFRP) {
      var bind5 = bind(dictMonadFRP.MonadCleanup1().Monad0().Bind1());
      var subscribeDyn_4 = subscribeDyn_(dictMonadFRP);
      return function(dyn) {
        return function(widget) {
          return bind5(newSlot3)(function(slot) {
            return subscribeDyn_4(function(x) {
              return replaceSlot(slot)(widget(x));
            })(dyn);
          });
        };
      };
    };
  };

  // output/Specular.Ref/index.js
  var Ref = /* @__PURE__ */ function() {
    function Ref2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Ref2.create = function(value0) {
      return function(value1) {
        return new Ref2(value0, value1);
      };
    };
    return Ref2;
  }();
  var read4 = function(dictMonadEffect) {
    var readDynamic12 = readDynamic(dictMonadEffect);
    return function(v) {
      return readDynamic12(v.value0);
    };
  };
  var $$new2 = function(dictMonadEffect) {
    var Monad0 = dictMonadEffect.Monad0();
    var bind13 = bind(Monad0.Bind1());
    var newDynamic2 = newDynamic(dictMonadEffect);
    var pure23 = pure(Monad0.Applicative0());
    return function(initial) {
      return bind13(newDynamic2(initial))(function(v) {
        return pure23(new Ref(v.dynamic, v.modify));
      });
    };
  };
  var modify6 = function(dictMonadEffect) {
    var liftEffect5 = liftEffect(dictMonadEffect);
    return function(v) {
      return function($96) {
        return liftEffect5(v.value1($96));
      };
    };
  };
  var write4 = function(dictMonadEffect) {
    var modify1 = modify6(dictMonadEffect);
    return function(r) {
      var $97 = modify1(r);
      return function($98) {
        return $97(/* @__PURE__ */ function(new_4) {
          return function(_old) {
            return new_4;
          };
        }($98));
      };
    };
  };

  // output/Web.HTML/foreign.js
  var windowImpl = function() {
    return window;
  };

  // output/Data.Nullable/foreign.js
  function nullable(a, r, f) {
    return a == null ? r : f(a);
  }

  // output/Data.Nullable/index.js
  var toMaybe = function(n) {
    return nullable(n, Nothing.value, Just.create);
  };

  // output/Web.HTML.HTMLElement/foreign.js
  function focus(elt) {
    return function() {
      return elt.focus();
    };
  }

  // output/Web.HTML.History/foreign.js
  function replaceState(a) {
    return function(docTitle) {
      return function(url) {
        return function(history2) {
          return function() {
            return history2.replaceState(a, docTitle, url);
          };
        };
      };
    };
  }

  // output/Web.HTML.Location/foreign.js
  function href3(location2) {
    return function() {
      return location2.href;
    };
  }

  // output/Web.HTML.Window/foreign.js
  function document2(window2) {
    return function() {
      return window2.document;
    };
  }
  function location(window2) {
    return function() {
      return window2.location;
    };
  }
  function history(window2) {
    return function() {
      return window2.history;
    };
  }
  function innerWidth(window2) {
    return function() {
      return window2.innerWidth;
    };
  }
  function innerHeight(window2) {
    return function() {
      return window2.innerHeight;
    };
  }
  function localStorage(window2) {
    return function() {
      return window2.localStorage;
    };
  }

  // output/Web.Storage.Storage/foreign.js
  function _getItem(key) {
    return function(storage) {
      return function() {
        return storage.getItem(key);
      };
    };
  }
  function setItem(key) {
    return function(value12) {
      return function(storage) {
        return function() {
          storage.setItem(key, value12);
        };
      };
    };
  }

  // output/Web.Storage.Storage/index.js
  var map8 = /* @__PURE__ */ map(functorEffect);
  var getItem = function(s) {
    var $5 = map8(toMaybe);
    var $6 = _getItem(s);
    return function($7) {
      return $5($6($7));
    };
  };

  // output/Web.URL/foreign.js
  function urlImpl(just) {
    return function(nothing) {
      return function(base) {
        try {
          return just(new URL(base));
        } catch (TypeError) {
          return nothing;
        }
      };
    };
  }
  function href4(url) {
    return url.href;
  }
  function searchParams(url) {
    return url.searchParams;
  }
  function setSearch2(v) {
    return function(url) {
      var u = new URL(url);
      u.search = v;
      return u;
    };
  }

  // output/Web.URL/index.js
  var fromJust4 = /* @__PURE__ */ fromJust();
  var fromAbsolute = function(base) {
    return urlImpl(Just.create)(Nothing.value)(base);
  };
  var unsafeFromAbsolute = function($5) {
    return fromJust4(fromAbsolute($5));
  };

  // output/Web.URL.URLSearchParams/foreign.js
  function getImpl(just) {
    return function(nothing) {
      return function(name16) {
        return function(p) {
          var v = p.get(name16);
          if (v === null) {
            return nothing;
          } else {
            return just(v);
          }
        };
      };
    };
  }
  function setImpl(name16) {
    return function(value12) {
      return function(p) {
        var n = new URLSearchParams(p);
        n.set(name16, value12);
        return n;
      };
    };
  }
  function toStringImpl(p) {
    return p.toString();
  }

  // output/Web.URL.URLSearchParams/index.js
  var toString2 = toStringImpl;
  var set = setImpl;
  var get2 = /* @__PURE__ */ function() {
    return getImpl(Just.create)(Nothing.value);
  }();

  // output/Slides/index.js
  var alt5 = /* @__PURE__ */ alt(altMaybe);
  var add3 = /* @__PURE__ */ add(semiringInt);
  var append4 = /* @__PURE__ */ append(semigroupArray);
  var composeFlipped2 = /* @__PURE__ */ composeFlipped(semigroupoidFn);
  var unwrap3 = /* @__PURE__ */ unwrap();
  var wrap3 = /* @__PURE__ */ wrap();
  var map9 = /* @__PURE__ */ map(functorArray);
  var bind4 = /* @__PURE__ */ bind(bindMaybe);
  var mapFlipped3 = /* @__PURE__ */ mapFlipped(functorMaybe);
  var modify7 = /* @__PURE__ */ modify4();
  var show2 = /* @__PURE__ */ show(showInt);
  var fromFoldable4 = /* @__PURE__ */ fromFoldable2(foldableArray);
  var show1 = /* @__PURE__ */ show(showNumber);
  var difference4 = /* @__PURE__ */ difference3(ordString);
  var fromJust5 = /* @__PURE__ */ fromJust();
  var map12 = /* @__PURE__ */ map(functorDynamic);
  var fold4 = /* @__PURE__ */ fold2(monoidString);
  var mapFlipped1 = /* @__PURE__ */ mapFlipped(functorArray);
  var identity8 = /* @__PURE__ */ identity(categoryFn);
  var map23 = /* @__PURE__ */ map(functorMaybe);
  var discard6 = /* @__PURE__ */ discard(discardUnit);
  var pure6 = /* @__PURE__ */ pure(applicativeEffect);
  var apply3 = /* @__PURE__ */ apply2(applyEffect);
  var map32 = /* @__PURE__ */ map(functorEffect);
  var pure12 = /* @__PURE__ */ pure(applicativeMaybe);
  var toUnfoldable5 = /* @__PURE__ */ toUnfoldable4(unfoldableArray);
  var traverse_3 = /* @__PURE__ */ traverse_(applicativeBuilder)(foldableArray);
  var uniqDynPure2 = /* @__PURE__ */ uniqDynPure(eqInt);
  var mapFlipped22 = /* @__PURE__ */ mapFlipped(functorDynamic);
  var apply1 = /* @__PURE__ */ apply2(applyDynamic);
  var mempty3 = /* @__PURE__ */ mempty(/* @__PURE__ */ monoidObject(semigroupString));
  var discard23 = /* @__PURE__ */ discard6(bindBuilder);
  var monadFRP2 = /* @__PURE__ */ monadFRP(monadEffectBuilder)(monadCleanupBuilder);
  var withDynamic_2 = /* @__PURE__ */ withDynamic_(monadReplaceBuilder)(monadFRP2);
  var for_2 = /* @__PURE__ */ for_(applicativeBuilder)(foldableArray);
  var append22 = /* @__PURE__ */ append(/* @__PURE__ */ semigroupObject(semigroupString));
  var mempty1 = /* @__PURE__ */ mempty(/* @__PURE__ */ monoidSet(ordString));
  var mempty22 = /* @__PURE__ */ mempty(monoidArray);
  var bindStateT2 = /* @__PURE__ */ bindStateT(monadIdentity);
  var bind22 = /* @__PURE__ */ bind(bindStateT2);
  var applicativeStateT2 = /* @__PURE__ */ applicativeStateT(monadIdentity);
  var traverse3 = /* @__PURE__ */ traverse(traversableArray)(applicativeStateT2);
  var pure22 = /* @__PURE__ */ pure(applicativeStateT2);
  var monadStateStateT2 = /* @__PURE__ */ monadStateStateT(monadIdentity);
  var get3 = /* @__PURE__ */ get(monadStateStateT2);
  var discard32 = /* @__PURE__ */ discard6(bindStateT2);
  var modify_3 = /* @__PURE__ */ modify_2(monadStateStateT2);
  var eq22 = /* @__PURE__ */ eq(/* @__PURE__ */ eqMaybe(eqString));
  var bindFlipped3 = /* @__PURE__ */ bindFlipped(bindEffect);
  var bind32 = /* @__PURE__ */ bind(bindBuilder);
  var holdDyn2 = /* @__PURE__ */ holdDyn(monadFRP2);
  var min5 = /* @__PURE__ */ min(ordNumber);
  var foldDynMaybe2 = /* @__PURE__ */ foldDynMaybe(monadFRP2);
  var newEvent4 = /* @__PURE__ */ newEvent2(monadEffectBuilder);
  var map42 = /* @__PURE__ */ map(functorEvent);
  var subscribeDyn_3 = /* @__PURE__ */ subscribeDyn_(monadFRP2);
  var foldDyn2 = /* @__PURE__ */ foldDyn(monadFRP2);
  var mapFlipped32 = /* @__PURE__ */ mapFlipped(functorEvent);
  var $$new3 = /* @__PURE__ */ $$new2(monadEffectBuilder);
  var mempty32 = /* @__PURE__ */ mempty(/* @__PURE__ */ monoidBuilder(monoidUnit));
  var modifyAtIndices2 = /* @__PURE__ */ modifyAtIndices(foldableArray);
  var dynamicListWithIndex_2 = /* @__PURE__ */ dynamicListWithIndex_(monadFRP2)(monadReplaceBuilder);
  var pure32 = /* @__PURE__ */ pure(applicativeBuilder);
  var $$void5 = /* @__PURE__ */ $$void(functorEffect);
  var subscribeEvent_2 = /* @__PURE__ */ subscribeEvent_(monadEffectBuilder)(monadCleanupBuilder);
  var write5 = /* @__PURE__ */ write4(monadEffectEffect);
  var mapFlipped4 = /* @__PURE__ */ mapFlipped(functorEffect);
  var read5 = /* @__PURE__ */ read4(monadEffectEffect);
  var union5 = /* @__PURE__ */ union3(ordString);
  var Sibling = /* @__PURE__ */ function() {
    function Sibling2(value0) {
      this.value0 = value0;
    }
    ;
    Sibling2.create = function(value0) {
      return new Sibling2(value0);
    };
    return Sibling2;
  }();
  var ParentNode = /* @__PURE__ */ function() {
    function ParentNode2() {
    }
    ;
    ParentNode2.value = new ParentNode2();
    return ParentNode2;
  }();
  var NthChild = /* @__PURE__ */ function() {
    function NthChild2(value0) {
      this.value0 = value0;
    }
    ;
    NthChild2.create = function(value0) {
      return new NthChild2(value0);
    };
    return NthChild2;
  }();
  var AutoId = /* @__PURE__ */ function() {
    function AutoId2() {
    }
    ;
    AutoId2.value = new AutoId2();
    return AutoId2;
  }();
  var NodeId = /* @__PURE__ */ function() {
    function NodeId2(value0) {
      this.value0 = value0;
    }
    ;
    NodeId2.create = function(value0) {
      return new NodeId2(value0);
    };
    return NodeId2;
  }();
  var BeforeChildren = /* @__PURE__ */ function() {
    function BeforeChildren2() {
    }
    ;
    BeforeChildren2.value = new BeforeChildren2();
    return BeforeChildren2;
  }();
  var AfterChildren = /* @__PURE__ */ function() {
    function AfterChildren2() {
    }
    ;
    AfterChildren2.value = new AfterChildren2();
    return AfterChildren2;
  }();
  var BeforeStep = /* @__PURE__ */ function() {
    function BeforeStep2(value0) {
      this.value0 = value0;
    }
    ;
    BeforeStep2.create = function(value0) {
      return new BeforeStep2(value0);
    };
    return BeforeStep2;
  }();
  var NoId = /* @__PURE__ */ function() {
    function NoId2() {
    }
    ;
    NoId2.value = new NoId2();
    return NoId2;
  }();
  var AutoAbsId = /* @__PURE__ */ function() {
    function AutoAbsId2() {
    }
    ;
    AutoAbsId2.value = new AutoAbsId2();
    return AutoAbsId2;
  }();
  var AutoRelId = /* @__PURE__ */ function() {
    function AutoRelId2(value0) {
      this.value0 = value0;
    }
    ;
    AutoRelId2.create = function(value0) {
      return new AutoRelId2(value0);
    };
    return AutoRelId2;
  }();
  var AbsId = /* @__PURE__ */ function() {
    function AbsId2(value0) {
      this.value0 = value0;
    }
    ;
    AbsId2.create = function(value0) {
      return new AbsId2(value0);
    };
    return AbsId2;
  }();
  var RelId = /* @__PURE__ */ function() {
    function RelId2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    RelId2.create = function(value0) {
      return function(value1) {
        return new RelId2(value0, value1);
      };
    };
    return RelId2;
  }();
  var Node2 = /* @__PURE__ */ function() {
    function Node3(value0) {
      this.value0 = value0;
    }
    ;
    Node3.create = function(value0) {
      return new Node3(value0);
    };
    return Node3;
  }();
  var Text = /* @__PURE__ */ function() {
    function Text2(value0) {
      this.value0 = value0;
    }
    ;
    Text2.create = function(value0) {
      return new Text2(value0);
    };
    return Text2;
  }();
  var Concat = /* @__PURE__ */ function() {
    function Concat2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Concat2.create = function(value0) {
      return function(value1) {
        return new Concat2(value0, value1);
      };
    };
    return Concat2;
  }();
  var Parent = /* @__PURE__ */ function() {
    function Parent2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Parent2.create = function(value0) {
      return function(value1) {
        return new Parent2(value0, value1);
      };
    };
    return Parent2;
  }();
  var Modify = /* @__PURE__ */ function() {
    function Modify2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Modify2.create = function(value0) {
      return function(value1) {
        return new Modify2(value0, value1);
      };
    };
    return Modify2;
  }();
  var Content = /* @__PURE__ */ function() {
    function Content2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Content2.create = function(value0) {
      return function(value1) {
        return new Content2(value0, value1);
      };
    };
    return Content2;
  }();
  var AddStep = /* @__PURE__ */ function() {
    function AddStep2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    AddStep2.create = function(value0) {
      return function(value1) {
        return new AddStep2(value0, value1);
      };
    };
    return AddStep2;
  }();
  var ModifyInnerStep = /* @__PURE__ */ function() {
    function ModifyInnerStep2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    ModifyInnerStep2.create = function(value0) {
      return function(value1) {
        return new ModifyInnerStep2(value0, value1);
      };
    };
    return ModifyInnerStep2;
  }();
  var ModifyOuterStep = /* @__PURE__ */ function() {
    function ModifyOuterStep2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    ModifyOuterStep2.create = function(value0) {
      return function(value1) {
        return new ModifyOuterStep2(value0, value1);
      };
    };
    return ModifyOuterStep2;
  }();
  var FirstNote = /* @__PURE__ */ function() {
    function FirstNote2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    FirstNote2.create = function(value0) {
      return function(value1) {
        return new FirstNote2(value0, value1);
      };
    };
    return FirstNote2;
  }();
  var PrintSteps = /* @__PURE__ */ function() {
    function PrintSteps2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    PrintSteps2.create = function(value0) {
      return function(value1) {
        return new PrintSteps2(value0, value1);
      };
    };
    return PrintSteps2;
  }();
  var Empty2 = /* @__PURE__ */ function() {
    function Empty3(value0) {
      this.value0 = value0;
    }
    ;
    Empty3.create = function(value0) {
      return new Empty3(value0);
    };
    return Empty3;
  }();
  var semigroupStepConfig = {
    append: function(v) {
      return function(v1) {
        return {
          id: alt5(v.id)(v1.id),
          location: v1.location,
          offset: v.offset + v1.offset | 0,
          changes: append4(v.changes)(v1.changes),
          note: {
            pre: v.note.pre + v1.note.pre,
            post: v.note.post + v1.note.post
          }
        };
      };
    }
  };
  var append32 = /* @__PURE__ */ append(semigroupStepConfig);
  var monoidStepConfig = /* @__PURE__ */ function() {
    return {
      mempty: {
        id: Nothing.value,
        location: BeforeChildren.value,
        offset: 0,
        changes: [],
        note: {
          pre: "",
          post: ""
        }
      },
      Semigroup0: function() {
        return semigroupStepConfig;
      }
    };
  }();
  var mempty4 = /* @__PURE__ */ mempty(monoidStepConfig);
  var functorBuilderM = {
    map: function(f) {
      return function(v) {
        if (v instanceof Concat) {
          return new Concat(v.value0, f(v.value1));
        }
        ;
        if (v instanceof Parent) {
          return new Parent(v.value0, map(functorBuilderM)(f)(v.value1));
        }
        ;
        if (v instanceof Modify) {
          return new Modify(v.value0, map(functorBuilderM)(f)(v.value1));
        }
        ;
        if (v instanceof Content) {
          return new Content(v.value0, f(v.value1));
        }
        ;
        if (v instanceof AddStep) {
          return new AddStep(v.value0, map(functorBuilderM)(f)(v.value1));
        }
        ;
        if (v instanceof ModifyInnerStep) {
          return new ModifyInnerStep(v.value0, map(functorBuilderM)(f)(v.value1));
        }
        ;
        if (v instanceof ModifyOuterStep) {
          return new ModifyOuterStep(v.value0, map(functorBuilderM)(f)(v.value1));
        }
        ;
        if (v instanceof FirstNote) {
          return new FirstNote(v.value0, f(v.value1));
        }
        ;
        if (v instanceof PrintSteps) {
          return new PrintSteps(v.value0, f(v.value1));
        }
        ;
        if (v instanceof Empty2) {
          return new Empty2(f(v.value0));
        }
        ;
        throw new Error("Failed pattern match at Slides (line 273, column 11 - line 283, column 27): " + [v.constructor.name]);
      };
    }
  };
  var map52 = /* @__PURE__ */ map(functorBuilderM);
  var eqRelLoc = {
    eq: function(x) {
      return function(y) {
        if (x instanceof Sibling && y instanceof Sibling) {
          return x.value0 === y.value0;
        }
        ;
        if (x instanceof ParentNode && y instanceof ParentNode) {
          return true;
        }
        ;
        if (x instanceof NthChild && y instanceof NthChild) {
          return x.value0 === y.value0;
        }
        ;
        return false;
      };
    }
  };
  var eq3 = /* @__PURE__ */ eq(/* @__PURE__ */ eqArray(eqRelLoc));
  var eqTargetId = {
    eq: function(x) {
      return function(y) {
        if (x instanceof NoId && y instanceof NoId) {
          return true;
        }
        ;
        if (x instanceof AutoAbsId && y instanceof AutoAbsId) {
          return true;
        }
        ;
        if (x instanceof AutoRelId && y instanceof AutoRelId) {
          return eq3(x.value0)(y.value0);
        }
        ;
        if (x instanceof AbsId && y instanceof AbsId) {
          return x.value0 === y.value0;
        }
        ;
        if (x instanceof RelId && y instanceof RelId) {
          return x.value0 === y.value0 && eq3(x.value1)(y.value1);
        }
        ;
        return false;
      };
    }
  };
  var eq4 = /* @__PURE__ */ eq(eqTargetId);
  var eqNodeId = {
    eq: function(x) {
      return function(y) {
        if (x instanceof AutoId && y instanceof AutoId) {
          return true;
        }
        ;
        if (x instanceof NodeId && y instanceof NodeId) {
          return x.value0 === y.value0;
        }
        ;
        return false;
      };
    }
  };
  var eq5 = /* @__PURE__ */ eq(eqNodeId);
  var bAttributableBuilderFunct = {
    bAttr: composeFlipped2
  };
  var bAttributableBuilder = {
    bAttr: applyFlipped
  };
  var updateTargetIds = function(es) {
    return function(s) {
      var s$prime = unwrap3(s);
      return wrap3(function() {
        var $699 = {};
        for (var $700 in s$prime) {
          if ({}.hasOwnProperty.call(s$prime, $700)) {
            $699[$700] = s$prime[$700];
          }
          ;
        }
        ;
        $699.changes = map9(function(c) {
          var nodeId = bind4(head(es))(function(e) {
            if (e instanceof Node2) {
              return new Just(e.value0.id);
            }
            ;
            return Nothing.value;
          });
          var $696 = {};
          for (var $697 in c) {
            if ({}.hasOwnProperty.call(c, $697)) {
              $696[$697] = c[$697];
            }
            ;
          }
          ;
          $696.target = function() {
            if (nodeId instanceof Just && nodeId.value0 instanceof NodeId) {
              if (c.target instanceof AutoAbsId) {
                return new AbsId(nodeId.value0.value0);
              }
              ;
              if (c.target instanceof AutoRelId) {
                return new RelId(nodeId.value0.value0, c.target.value0);
              }
              ;
              return c.target;
            }
            ;
            if (c.target instanceof AutoAbsId) {
              return NoId.value;
            }
            ;
            if (c.target instanceof AutoRelId) {
              return NoId.value;
            }
            ;
            return c.target;
          }();
          return $696;
        })(s$prime.changes);
        return $699;
      }());
    };
  };
  var traceId = function(i) {
    return function(es) {
      return findMap(function(v) {
        if (v.value1 instanceof Node2) {
          var $704 = eq5(v.value1.value0.id)(new NodeId(i));
          if ($704) {
            return new Just([v.value0]);
          }
          ;
          return mapFlipped3(traceId(i)(v.value1.value0.children))(cons(v.value0));
        }
        ;
        return Nothing.value;
      })(mapWithIndex2(Tuple.create)(es));
    };
  };
  var stl = function(s) {
    return Modify.create(wrap3(function(n) {
      var $708 = {};
      for (var $709 in n) {
        if ({}.hasOwnProperty.call(n, $709)) {
          $708[$709] = n[$709];
        }
        ;
      }
      ;
      $708.styles = union(s)(n.styles);
      return $708;
    }));
  };
  var stepOffset = function(i) {
    return ModifyInnerStep.create(wrap3(modify7(function(v) {
      var $711 = {};
      for (var $712 in v) {
        if ({}.hasOwnProperty.call(v, $712)) {
          $711[$712] = v[$712];
        }
        ;
      }
      ;
      $711.offset = i;
      return $711;
    })));
  };
  var slideWidth = 570;
  var slideMargin = 15;
  var slideHeight = 380;
  var showNotesFolder = function(key) {
    return function(s) {
      if (key === "n") {
        return new Just(!s);
      }
      ;
      return Nothing.value;
    };
  };
  var showAddNoteFolder = function(e) {
    return function(v) {
      if (e instanceof Left) {
        if (e.value0 === "a") {
          return new Just(true);
        }
        ;
        if (e.value0 === "Escape") {
          return new Just(false);
        }
        ;
        return Nothing.value;
      }
      ;
      if (e instanceof Right) {
        if (e.value0.key === "Enter") {
          return new Just(false);
        }
        ;
        return Nothing.value;
      }
      ;
      throw new Error("Failed pattern match at Slides (line 662, column 3 - line 669, column 19): " + [e.constructor.name]);
    };
  };
  var setURL = function(h) {
    return function(u) {
      return function(v) {
        var p = searchParams(u);
        var p$prime = set("shownotes")(function() {
          if (v.value1) {
            return "true";
          }
          ;
          return "false";
        }())(set("step")(show2(v.value0.step))(set("slide")(show2(v.value0.slide))(p)));
        var u$prime = setSearch2(toString2(p$prime))(u);
        return replaceState(unsafeToForeign($$null2))("")(href4(u$prime))(h);
      };
    };
  };
  var set2 = function(dictOrd) {
    return fromFoldable4(dictOrd);
  };
  var set1 = /* @__PURE__ */ set2(ordString);
  var scale = function(s) {
    return "scale(" + (show1(s) + ")");
  };
  var sNote = function(n) {
    return modify7(function(v) {
      var $726 = {};
      for (var $727 in v) {
        if ({}.hasOwnProperty.call(v, $727)) {
          $726[$727] = v[$727];
        }
        ;
      }
      ;
      $726.note = n;
      return $726;
    })(mempty4);
  };
  var sChanges = function(c) {
    return modify7(function(v) {
      var $732 = {};
      for (var $733 in v) {
        if ({}.hasOwnProperty.call(v, $733)) {
          $732[$733] = v[$733];
        }
        ;
      }
      ;
      $732.changes = c;
      return $732;
    })(mempty4);
  };
  var sChange = function(c) {
    return sChanges([c]);
  };
  var rmClasses = function(c) {
    return wrap3(function(n) {
      var $735 = {};
      for (var $736 in n) {
        if ({}.hasOwnProperty.call(n, $736)) {
          $735[$736] = n[$736];
        }
        ;
      }
      ;
      $735.classes = difference4(n.classes)(set1(c));
      return $735;
    });
  };
  var rmClassesS = function(c) {
    return rmClasses(split(" ")(c));
  };
  var rmcls = function(c) {
    return Modify.create(rmClassesS(c));
  };
  var resolveStepOrder = function(ss) {
    var go2 = function($copy_ss$prime) {
      var $tco_done = false;
      var $tco_result;
      function $tco_loop(ss$prime) {
        var v = findIndex(fst)(ss$prime);
        if (v instanceof Just) {
          var prev = slice(0)(v.value0)(ss$prime);
          var next = drop(v.value0 + 1 | 0)(ss$prime);
          var current = unwrap3(snd(fromJust5(index(ss$prime)(v.value0))));
          $copy_ss$prime = function() {
            var $739 = current.offset > 0;
            if ($739) {
              return append4(prev)(fromMaybe(cons(new Tuple(false, wrap3(current)))(next))(insertAt(current.offset)(new Tuple(false, wrap3(current)))(next)));
            }
            ;
            var $740 = current.offset < 0;
            if ($740) {
              return append4(fromMaybe(snoc(prev)(new Tuple(false, wrap3(current))))(insertAt(length(prev) + current.offset | 0)(new Tuple(false, wrap3(current)))(prev)))(next);
            }
            ;
            return append4(prev)(cons(new Tuple(false, wrap3(current)))(next));
          }();
          return;
        }
        ;
        if (v instanceof Nothing) {
          $tco_done = true;
          return ss$prime;
        }
        ;
        throw new Error("Failed pattern match at Slides (line 895, column 30 - line 913, column 21): " + [v.constructor.name]);
      }
      ;
      while (!$tco_done) {
        $tco_result = $tco_loop($copy_ss$prime);
      }
      ;
      return $tco_result;
    };
    return map9(snd)(go2(map9(Tuple.create(true))(ss)));
  };
  var px = function(n) {
    return show1(n) + "px";
  };
  var ostepOffset = function(i) {
    return ModifyOuterStep.create(wrap3(modify7(function(v) {
      var $742 = {};
      for (var $743 in v) {
        if ({}.hasOwnProperty.call(v, $743)) {
          $742[$743] = v[$743];
        }
        ;
      }
      ;
      $742.offset = i;
      return $742;
    })));
  };
  var onote = function(pre_) {
    return function(post) {
      return ModifyOuterStep.create(wrap3(function(v) {
        return append32(v)(sNote({
          pre: pre_,
          post
        }));
      }));
    };
  };
  var objToArray = /* @__PURE__ */ toUnfoldable2(unfoldableArray);
  var stylesD = /* @__PURE__ */ function() {
    var $1004 = attrD("style");
    var $1005 = map12(function() {
      var $1007 = map9(function(v) {
        return v.value0 + (":" + (v.value1 + ";"));
      });
      return function($1008) {
        return fold4($1007(objToArray($1008)));
      };
    }());
    return function($1006) {
      return $1004($1005($1006));
    };
  }();
  var normalize = function(v) {
    if (v instanceof Concat) {
      var ms$prime = map9(normalize)(v.value0);
      var ms$prime$prime = mapFlipped1(ms$prime)(function(v1) {
        if (v1 instanceof Concat) {
          return v1.value0;
        }
        ;
        return [v1];
      });
      return new Concat(concat(ms$prime$prime), v.value1);
    }
    ;
    if (v instanceof Parent) {
      return new Parent(v.value0, normalize(v.value1));
    }
    ;
    if (v instanceof Modify) {
      return function(v1) {
        if (v1 instanceof Concat) {
          return new Concat(map9(function() {
            var $1009 = Modify.create(v.value0);
            return function($1010) {
              return normalize($1009($1010));
            };
          }())(v1.value0), v1.value1);
        }
        ;
        if (v1 instanceof Parent) {
          return new Parent(unwrap3(v.value0)(v1.value0), v1.value1);
        }
        ;
        if (v1 instanceof AddStep) {
          return new AddStep(v1.value0, normalize(new Modify(v.value0, v1.value1)));
        }
        ;
        if (v1 instanceof ModifyOuterStep) {
          return new ModifyOuterStep(v1.value0, normalize(new Modify(v.value0, v1.value1)));
        }
        ;
        return v1;
      }(normalize(v.value1));
    }
    ;
    if (v instanceof AddStep) {
      return function(v1) {
        if (v1 instanceof Concat) {
          return new Concat(map9(function() {
            var $1011 = AddStep.create(v.value0);
            return function($1012) {
              return normalize($1011($1012));
            };
          }())(v1.value0), v1.value1);
        }
        ;
        if (v1 instanceof ModifyOuterStep) {
          return new AddStep(unwrap3(v1.value0)(v.value0), v1.value1);
        }
        ;
        return new AddStep(v.value0, v1);
      }(normalize(v.value1));
    }
    ;
    if (v instanceof ModifyInnerStep) {
      return function(v1) {
        if (v1 instanceof Concat) {
          return new Concat(map9(function() {
            var $1013 = ModifyInnerStep.create(v.value0);
            return function($1014) {
              return normalize($1013($1014));
            };
          }())(v1.value0), v1.value1);
        }
        ;
        if (v1 instanceof AddStep) {
          return new AddStep(unwrap3(v.value0)(v1.value0), v1.value1);
        }
        ;
        if (v1 instanceof ModifyOuterStep) {
          return new ModifyOuterStep(v1.value0, normalize(new ModifyInnerStep(v.value0, v1.value1)));
        }
        ;
        return v1;
      }(normalize(v.value1));
    }
    ;
    if (v instanceof ModifyOuterStep) {
      return function(v1) {
        if (v1 instanceof Concat) {
          return new Concat(map9(function() {
            var $1015 = ModifyOuterStep.create(v.value0);
            return function($1016) {
              return normalize($1015($1016));
            };
          }())(v1.value0), v1.value1);
        }
        ;
        if (v1 instanceof ModifyOuterStep) {
          return new ModifyOuterStep(wrap3(function() {
            var $1017 = unwrap3(v.value0);
            var $1018 = unwrap3(v1.value0);
            return function($1019) {
              return $1017($1018($1019));
            };
          }()), v1.value1);
        }
        ;
        return new ModifyOuterStep(v.value0, v1);
      }(normalize(v.value1));
    }
    ;
    return v;
  };
  var mkId = function(i) {
    return "_" + show2(i);
  };
  var mapNth = function(i) {
    return function(f) {
      return function(a) {
        var v = normalize(a);
        if (v instanceof Concat) {
          return new Concat(fromMaybe(v.value0)(modifyAt(i)(f)(v.value0)), unit);
        }
        ;
        if (v instanceof Parent && v.value1 instanceof Concat) {
          return new Parent(v.value0, new Concat(fromMaybe(v.value1.value0)(modifyAt(i)(f)(v.value1.value0)), unit));
        }
        ;
        return v;
      };
    };
  };
  var mapHeadTail = function(f) {
    return function(g) {
      return function(a) {
        var v = normalize(a);
        if (v instanceof Concat) {
          var v1 = uncons(v.value0);
          if (v1 instanceof Just) {
            return new Concat(cons(f(v1.value0.head))(map9(g)(v1.value0.tail)), v.value1);
          }
          ;
          if (v1 instanceof Nothing) {
            return new Concat(v.value0, v.value1);
          }
          ;
          throw new Error("Failed pattern match at Slides (line 1303, column 5 - line 1305, column 29): " + [v1.constructor.name]);
        }
        ;
        return v;
      };
    };
  };
  var mapTail = /* @__PURE__ */ mapHeadTail(identity8);
  var mapAll = function(f) {
    return function(a) {
      var v = normalize(a);
      if (v instanceof Concat) {
        return new Concat(map9(f)(v.value0), unit);
      }
      ;
      return v;
    };
  };
  var locationFolder = function(bs) {
    return function(key) {
      return function(loc) {
        var getMaxStep = function(sl) {
          return fromMaybe(0)(map23(function($1020) {
            return length(function(v) {
              return v.steps;
            }($1020));
          })(index(bs)(sl - 1 | 0)));
        };
        if (key === "ArrowUp") {
          if (loc.slide === 1 && loc.step === 0) {
            return Nothing.value;
          }
          ;
          if (loc.step === 0) {
            return new Just({
              slide: loc.slide - 1 | 0,
              step: getMaxStep(loc.slide - 1 | 0)
            });
          }
          ;
          return new Just({
            slide: loc.slide,
            step: loc.step - 1 | 0
          });
        }
        ;
        if (key === "ArrowDown") {
          if (loc.slide === length(bs) && loc.step >= getMaxStep(loc.slide)) {
            return Nothing.value;
          }
          ;
          if (loc.step >= getMaxStep(loc.slide)) {
            return new Just({
              slide: loc.slide + 1 | 0,
              step: 0
            });
          }
          ;
          return new Just({
            slide: loc.slide,
            step: loc.step + 1 | 0
          });
        }
        ;
        if (key === "ArrowLeft") {
          if (loc.slide === 1) {
            return Nothing.value;
          }
          ;
          return new Just({
            slide: loc.slide - 1 | 0,
            step: getMaxStep(loc.slide - 1 | 0)
          });
        }
        ;
        if (key === "ArrowRight") {
          if (loc.slide === length(bs) && loc.step >= getMaxStep(loc.slide)) {
            return Nothing.value;
          }
          ;
          if (loc.step >= getMaxStep(loc.slide)) {
            return new Just({
              slide: loc.slide + 1 | 0,
              step: getMaxStep(loc.slide + 1 | 0)
            });
          }
          ;
          return new Just({
            slide: loc.slide,
            step: getMaxStep(loc.slide)
          });
        }
        ;
        return Nothing.value;
      };
    };
  };
  var lines = function(t) {
    return fromMaybe(singleton4(""))(fromArray(split("\n")(t)));
  };
  var initElement2 = function(env, node_, props, body) {
    var result = runBuilder$prime({
      cleanup: env.cleanup,
      userEnv: env.userEnv,
      parent: node_
    }, body);
    foreachE(props)(function(v) {
      return function() {
        return v(node_, env.cleanup);
      };
    })();
    appendChild(node_)(env.parent)();
    return result;
  };
  var id = function(i) {
    return Modify.create(wrap3(function(v) {
      var $830 = {};
      for (var $831 in v) {
        if ({}.hasOwnProperty.call(v, $831)) {
          $830[$831] = v[$831];
        }
        ;
      }
      ;
      $830.id = new NodeId(i);
      return $830;
    }));
  };
  var getWindowSize = function(win) {
    return apply3(map32(function(w) {
      return function(h) {
        return {
          width: toNumber(w),
          height: toNumber(h)
        };
      };
    })(innerWidth(win)))(innerHeight(win));
  };
  var getNodeId = function(n) {
    if (n.id instanceof NodeId) {
      return new Just(n.id.value0);
    }
    ;
    return Nothing.value;
  };
  var getNodeConfig = function(v) {
    if (v instanceof Node2) {
      return new Just(v.value0);
    }
    ;
    return Nothing.value;
  };
  var getLoc = /* @__PURE__ */ foldl2(function(t) {
    return function(loc) {
      if (loc instanceof Sibling) {
        return fromMaybe([])(modifyAt(length(t) - 1 | 0)(add3(loc.value0))(t));
      }
      ;
      if (loc instanceof ParentNode) {
        return fromMaybe([])(init(t));
      }
      ;
      if (loc instanceof NthChild) {
        return snoc(t)(loc.value0);
      }
      ;
      throw new Error("Failed pattern match at Slides (line 868, column 26 - line 871, column 25): " + [loc.constructor.name]);
    };
  });
  var getId = function(es) {
    return function(v) {
      if (v.length === 0) {
        return Nothing.value;
      }
      ;
      if (v.length === 1) {
        return bind4(bind4(index(es)(v[0]))(getNodeConfig))(getNodeId);
      }
      ;
      return bind4(uncons(v))(function(ht) {
        return bind4(bind4(index(es)(ht.head))(getNodeConfig))(function(nc) {
          return getId(nc.children)(ht.tail);
        });
      });
    };
  };
  var resolveRelIds = function(es) {
    var fChange = function(c) {
      if (c.target instanceof RelId) {
        return fromMaybe(c)(bind4(traceId(c.target.value0)(es))(function(t) {
          return bind4(getId(es)(getLoc(t)(c.target.value1)))(function(i$prime) {
            return pure12(function() {
              var $843 = {};
              for (var $844 in c) {
                if ({}.hasOwnProperty.call(c, $844)) {
                  $843[$844] = c[$844];
                }
                ;
              }
              ;
              $843.target = new AbsId(i$prime);
              return $843;
            }());
          });
        }));
      }
      ;
      return c;
    };
    var fStep = modify7(function(s) {
      var $848 = {};
      for (var $849 in s) {
        if ({}.hasOwnProperty.call(s, $849)) {
          $848[$849] = s[$849];
        }
        ;
      }
      ;
      $848.changes = map9(fChange)(s.changes);
      return $848;
    });
    return map9(fStep);
  };
  var fullWidth = /* @__PURE__ */ function() {
    return slideWidth + slideMargin * 2;
  }();
  var fullHeight = /* @__PURE__ */ function() {
    return slideHeight + slideMargin * 2;
  }();
  var formatStyles = /* @__PURE__ */ function() {
    var $1021 = map9(function(v) {
      return v.value0 + (":" + (v.value1 + ";"));
    });
    return function($1022) {
      return fold4($1021(objToArray($1022)));
    };
  }();
  var foldSteps = function(n) {
    return function(steps) {
      return function(step2) {
        var steps$prime = slice(0)(step2)(steps);
        if (n.id instanceof NodeId) {
          return foldl2(function(n_) {
            return function(s) {
              return fromMaybe(n_)(findMap(function(c) {
                var $855 = eq4(c.target)(new AbsId(n.id.value0));
                if ($855) {
                  return new Just(unwrap3(c.change)(n_));
                }
                ;
                return Nothing.value;
              })(unwrap3(s).changes));
            };
          })(n)(steps$prime);
        }
        ;
        return n;
      };
    };
  };
  var emptyNote = {
    pre: "",
    post: ""
  };
  var emptySlide = /* @__PURE__ */ function() {
    return {
      elements: [],
      steps: [],
      firstNote: emptyNote,
      printSteps: Nothing.value
    };
  }();
  var elNS = function(ns) {
    return function(tagName) {
      return function(props) {
        return function(body) {
          return mkBuilder$prime(function(env) {
            var node_ = createElementNS(ns)(tagName)();
            return initElement2(env, node_, props, body);
          });
        };
      };
    };
  };
  var renderSlide = function(builtSlides) {
    return function(dScale) {
      return function(dPrint) {
        return function(dLocation) {
          return function(dShowNotes) {
            return function(sl_) {
              var sl = sl_ + 1 | 0;
              var slide = fromMaybe(emptySlide)(index(builtSlides)(sl - 1 | 0));
              var render = function(st) {
                return function(e) {
                  if (e instanceof Text) {
                    return text(e.value0);
                  }
                  ;
                  if (e instanceof Node2) {
                    var n$prime = foldSteps(e.value0)(slide.steps)(st);
                    return elNS(e.value0.namespace)(e.value0.tag)([classes(toUnfoldable5(n$prime.classes)), attrs(union(n$prime.attributes)(singleton3("style")(formatStyles(n$prime.styles))))])(traverse_3(render(st))(e.value0.children));
                  }
                  ;
                  throw new Error("Failed pattern match at Slides (line 498, column 7 - line 507, column 51): " + [e.constructor.name]);
                };
              };
              var printSteps_ = filter(function(v) {
                return v <= length(slide.steps);
              })(fromMaybe([length(slide.steps)])(slide.printSteps));
              var nextSlide = fromMaybe(emptySlide)(index(builtSlides)(sl));
              var rightNote = function(st) {
                var $860 = st === length(slide.steps);
                if ($860) {
                  return nextSlide.firstNote.pre;
                }
                ;
                return function(v) {
                  return v.note.pre;
                }(unwrap3(fromMaybe(mempty4)(index(slide.steps)(st))));
              };
              var leftNote = function(st) {
                var $861 = st === 0;
                if ($861) {
                  return slide.firstNote.post;
                }
                ;
                return function(v) {
                  return v.note.post;
                }(unwrap3(fromMaybe(mempty4)(index(slide.steps)(st - 1 | 0))));
              };
              var dStepNum = uniqDynPure2(mapFlipped22(dLocation)(function(l) {
                var $862 = l.slide === sl;
                if ($862) {
                  return l.step;
                }
                ;
                return 0;
              }));
              var renderD = function(e) {
                if (e instanceof Text) {
                  return text(e.value0);
                }
                ;
                if (e instanceof Node2) {
                  var dNodeConfig = map12(foldSteps(e.value0)(slide.steps))(dStepNum);
                  return elNS(e.value0.namespace)(e.value0.tag)([classesD(mapFlipped22(dNodeConfig)(function(n$prime) {
                    return toUnfoldable5(n$prime.classes);
                  })), attrsD(mapFlipped22(dNodeConfig)(function(n$prime) {
                    return union(n$prime.attributes)(singleton3("style")(formatStyles(n$prime.styles)));
                  }))])(traverse_3(renderD)(e.value0.children));
                }
                ;
                throw new Error("Failed pattern match at Slides (line 486, column 7 - line 496, column 47): " + [e.constructor.name]);
              };
              var dSlideNum = uniqDynPure2(map12(function(ss) {
                return ss.slide;
              })(dLocation));
              return el("div")([stylesD(mapFlipped22(apply1(map12(Tuple.create)(dScale))(dPrint))(function(v) {
                if (v.value1) {
                  return mempty3;
                }
                ;
                return singleton3("transform")(scale(v.value0));
              })), classesD(mapFlipped22(apply1(map12(Tuple.create)(dSlideNum))(dPrint))(function(v) {
                return append4(function() {
                  var $871 = v.value1 || v.value0 === sl;
                  if ($871) {
                    return [];
                  }
                  ;
                  return ["invisible"];
                }())(append4(function() {
                  if (v.value1) {
                    return ["relative"];
                  }
                  ;
                  return ["absolute"];
                }())(["origin-top-left", "break-after-page"]));
              }))])(discard23(withDynamic_2(dPrint)(function(p) {
                if (p) {
                  return for_2(printSteps_)(function(st) {
                    return el("div")([classes(["relative", "bg-white", "flex", "flex-col", "justify-center", "items-center"]), attr("style")(formatStyles(append22(singleton3("width")(px(slideWidth)))(singleton3("height")(px(slideHeight)))))])(traverse_3(render(st))(slide.elements));
                  });
                }
                ;
                return el("div")([classes(["absolute", "bg-white", "flex", "flex-col", "justify-center", "items-center"]), attr("style")(formatStyles(append22(singleton3("top")(px(slideMargin)))(append22(singleton3("left")(px(slideMargin)))(append22(singleton3("width")(px(slideWidth)))(singleton3("height")(px(slideHeight)))))))])(traverse_3(renderD)(slide.elements));
              }))(function() {
                return el("div")([classesD(mapFlipped22(apply1(map12(Tuple.create)(dPrint))(dShowNotes))(function(v) {
                  return append4(function() {
                    var $877 = v.value0 || !v.value1;
                    if ($877) {
                      return ["hidden"];
                    }
                    ;
                    return [];
                  }())(["absolute", "flex", "justify-between", "text-xs"]);
                })), attr("style")(formatStyles(append22(singleton3("top")(px(slideMargin + slideHeight - 1.5)))(append22(singleton3("left")(px(slideMargin)))(singleton3("width")(px(slideWidth))))))])(discard23(el("div")([])(dynText(map12(leftNote)(dStepNum))))(function() {
                  return el("div")([])(dynText(map12(rightNote)(dStepNum)));
                }));
              }));
            };
          };
        };
      };
    };
  };
  var domEventWithSample = function(dictMonadFRP) {
    var Monad0 = dictMonadFRP.MonadCleanup1().Monad0();
    var Bind1 = Monad0.Bind1();
    var bind42 = bind(Bind1);
    var newEvent1 = newEvent2(dictMonadFRP.MonadEffect0());
    var discard42 = discard6(Bind1);
    var onDomEvent2 = onDomEvent(dictMonadFRP);
    var pure42 = pure(Monad0.Applicative0());
    return function(f) {
      return function(t) {
        return function(n) {
          return bind42(newEvent1)(function(ef) {
            return discard42(onDomEvent2(t)(n)(function(e) {
              return function __do4() {
                var a = f(e)();
                return ef.fire(a)();
              };
            }))(function() {
              return pure42(ef.event);
            });
          });
        };
      };
    };
  };
  var sampleKeydown = function(dictMonadFRP) {
    return domEventWithSample(dictMonadFRP)(function(e) {
      return pure6(e.key);
    })("keydown");
  };
  var sampleKeydown1 = /* @__PURE__ */ sampleKeydown(monadFRP2);
  var sampleResize = function(dictMonadFRP) {
    var domEventWithSample1 = domEventWithSample(dictMonadFRP);
    return function(w) {
      return domEventWithSample1(function(v) {
        return getWindowSize(w);
      })("resize")(w);
    };
  };
  var sampleResize1 = /* @__PURE__ */ sampleResize(monadFRP2);
  var domEvent = function(dictMonadFRP) {
    var Monad0 = dictMonadFRP.MonadCleanup1().Monad0();
    var Bind1 = Monad0.Bind1();
    var bind42 = bind(Bind1);
    var newEvent1 = newEvent2(dictMonadFRP.MonadEffect0());
    var discard42 = discard6(Bind1);
    var onDomEvent2 = onDomEvent(dictMonadFRP);
    var pure42 = pure(Monad0.Applicative0());
    return function(t) {
      return function(n) {
        return bind42(newEvent1)(function(ef) {
          return discard42(onDomEvent2(t)(n)(function(v) {
            return ef.fire(unit);
          }))(function() {
            return pure42(ef.event);
          });
        });
      };
    };
  };
  var domEvent1 = /* @__PURE__ */ domEvent(monadFRP2);
  var defNode = function(t) {
    return {
      id: AutoId.value,
      tag: t,
      namespace: Nothing.value,
      classes: mempty1,
      styles: mempty3,
      attributes: mempty3,
      children: mempty22
    };
  };
  var mnode = function(t) {
    return Parent.create(function() {
      var v = defNode(t);
      return {
        id: v.id,
        tag: v.tag,
        classes: v.classes,
        styles: v.styles,
        attributes: v.attributes,
        children: v.children,
        namespace: new Just("http://www.w3.org/1998/Math/MathML")
      };
    }());
  };
  var math = /* @__PURE__ */ mnode("math");
  var node = function(t) {
    return Parent.create(defNode(t));
  };
  var div2 = /* @__PURE__ */ node("div");
  var span4 = /* @__PURE__ */ node("span");
  var table = /* @__PURE__ */ node("table");
  var tbody = /* @__PURE__ */ node("tbody");
  var td = /* @__PURE__ */ node("td");
  var tr = /* @__PURE__ */ node("tr");
  var cShow = /* @__PURE__ */ rmClasses(["invisible"]);
  var sShows = function(ids) {
    return sChanges(map9(function(i) {
      return {
        target: new AbsId(i),
        change: cShow
      };
    })(ids));
  };
  var builderValue = function($copy_v) {
    var $tco_done = false;
    var $tco_result;
    function $tco_loop(v) {
      if (v instanceof Concat) {
        $tco_done = true;
        return v.value1;
      }
      ;
      if (v instanceof Parent) {
        $copy_v = v.value1;
        return;
      }
      ;
      if (v instanceof Modify) {
        $copy_v = v.value1;
        return;
      }
      ;
      if (v instanceof Content) {
        $tco_done = true;
        return v.value1;
      }
      ;
      if (v instanceof AddStep) {
        $copy_v = v.value1;
        return;
      }
      ;
      if (v instanceof ModifyInnerStep) {
        $copy_v = v.value1;
        return;
      }
      ;
      if (v instanceof ModifyOuterStep) {
        $copy_v = v.value1;
        return;
      }
      ;
      if (v instanceof FirstNote) {
        $tco_done = true;
        return v.value1;
      }
      ;
      if (v instanceof PrintSteps) {
        $tco_done = true;
        return v.value1;
      }
      ;
      if (v instanceof Empty2) {
        $tco_done = true;
        return v.value0;
      }
      ;
      throw new Error("Failed pattern match at Slides (line 674, column 16 - line 685, column 15): " + [v.constructor.name]);
    }
    ;
    while (!$tco_done) {
      $tco_result = $tco_loop($copy_v);
    }
    ;
    return $tco_result;
  };
  var bindBuilderM = {
    bind: function(ma) {
      return function(f) {
        var mnb = map52(f)(ma);
        var nb = builderValue(mnb);
        var n0 = map52($$const(unit))(nb);
        var m0 = map52($$const(unit))(ma);
        var b = builderValue(nb);
        var v = new Tuple(m0, n0);
        if (v.value0 instanceof Empty2) {
          return nb;
        }
        ;
        if (v.value1 instanceof Empty2) {
          return map52($$const(b))(ma);
        }
        ;
        if (v.value0 instanceof Concat && v.value1 instanceof Concat) {
          return new Concat(append4(v.value0.value0)(v.value1.value0), b);
        }
        ;
        if (v.value0 instanceof Concat) {
          return new Concat(snoc(v.value0.value0)(n0), b);
        }
        ;
        if (v.value1 instanceof Concat) {
          return new Concat(cons(m0)(v.value1.value0), b);
        }
        ;
        return new Concat([m0, n0], b);
      };
    },
    Apply0: function() {
      return applyBuilderM;
    }
  };
  var applyBuilderM = {
    apply: function(f) {
      return function(a) {
        return bind(bindBuilderM)(f)(function(g) {
          return map52(g)(a);
        });
      };
    },
    Functor0: function() {
      return functorBuilderM;
    }
  };
  var applySecond3 = /* @__PURE__ */ applySecond(applyBuilderM);
  var semigroupBuilder2 = {
    append: function(a) {
      return function(b) {
        return applySecond3(a)(b);
      };
    }
  };
  var append42 = /* @__PURE__ */ append(semigroupBuilder2);
  var mover = function(a) {
    return function(b) {
      return mnode("mover")(append42(a)(b));
    };
  };
  var msub = function(a) {
    return function(b) {
      return mnode("msub")(append42(a)(b));
    };
  };
  var monoidBuilder2 = /* @__PURE__ */ function() {
    return {
      mempty: new Empty2(unit),
      Semigroup0: function() {
        return semigroupBuilder2;
      }
    };
  }();
  var mempty5 = /* @__PURE__ */ mempty(monoidBuilder2);
  var br = /* @__PURE__ */ function() {
    return node("br")(new Empty2(unit));
  }();
  var text6 = /* @__PURE__ */ function() {
    var $1023 = fold13(semigroupBuilder2);
    var $1024 = intersperse2(br);
    var $1025 = map(functorNonEmptyArray)(function(l) {
      return new Content(l, unit);
    });
    var $1026 = replaceAll("'")("\u2019");
    return function($1027) {
      return $1023($1024($1025(lines($1026($1027)))));
    };
  }();
  var divt = function($1029) {
    return div2(text6($1029));
  };
  var mi = /* @__PURE__ */ function() {
    var $1030 = mnode("mi");
    return function($1031) {
      return $1030(text6($1031));
    };
  }();
  var mn = /* @__PURE__ */ function() {
    var $1032 = mnode("mn");
    return function($1033) {
      return $1032(text6($1033));
    };
  }();
  var mo = /* @__PURE__ */ function() {
    var $1034 = mnode("mo");
    return function($1035) {
      return $1034(text6($1035));
    };
  }();
  var spant = function($1039) {
    return span4(text6($1039));
  };
  var tdt = function($1041) {
    return td(text6($1041));
  };
  var bAttr = function(dict) {
    return dict.bAttr;
  };
  var bAttr1 = /* @__PURE__ */ bAttr(bAttributableBuilderFunct);
  var bAttr2 = /* @__PURE__ */ bAttr(bAttributableBuilder);
  var attr2 = function(a) {
    return Modify.create(wrap3(function(n) {
      var $922 = {};
      for (var $923 in n) {
        if ({}.hasOwnProperty.call(n, $923)) {
          $922[$923] = n[$923];
        }
        ;
      }
      ;
      $922.attributes = union(a)(n.attributes);
      return $922;
    }));
  };
  var iframe = function(s) {
    return bAttr1(node("iframe"))(attr2(singleton3("src")(s)))(mempty5);
  };
  var img = function(s) {
    return bAttr1(node("img"))(attr2(singleton3("src")(s)))(mempty5);
  };
  var mr = function(t) {
    return bAttr1(mnode("mi"))(attr2(singleton3("mathvariant")("normal")))(text6(t));
  };
  var allNoId = function(s) {
    return all2(function(c) {
      return eq4(c.target)(NoId.value);
    })(unwrap3(s).changes);
  };
  var build = function(v) {
    if (v instanceof Concat) {
      return bind22(traverse3(build)(v.value0))(function(ess) {
        return pure22(concat(ess));
      });
    }
    ;
    if (v instanceof Parent) {
      return bind22(get3)(function(v1) {
        var v2 = function() {
          var $929 = eq5(v.value0.id)(AutoId.value);
          if ($929) {
            return new Tuple(new NodeId(mkId(v1.id)), v1.id + 1 | 0);
          }
          ;
          return new Tuple(v.value0.id, v1.id);
        }();
        return discard32(modify_3(function(v3) {
          var $931 = {};
          for (var $932 in v3) {
            if ({}.hasOwnProperty.call(v3, $932)) {
              $931[$932] = v3[$932];
            }
            ;
          }
          ;
          $931.id = v2.value1;
          return $931;
        }))(function() {
          return bind22(build(v.value1))(function(ec) {
            return pure22([new Node2({
              tag: v.value0.tag,
              namespace: v.value0.namespace,
              classes: v.value0.classes,
              styles: v.value0.styles,
              attributes: v.value0.attributes,
              id: v2.value0,
              children: ec
            })]);
          });
        });
      });
    }
    ;
    if (v instanceof Content) {
      return pure22([new Text(v.value0)]);
    }
    ;
    if (v instanceof AddStep) {
      if (v.value0.location instanceof BeforeChildren) {
        return bind22(get3)(function(v1) {
          return discard32(modify_3(function(v2) {
            var $943 = {};
            for (var $944 in v2) {
              if ({}.hasOwnProperty.call(v2, $944)) {
                $943[$944] = v2[$944];
              }
              ;
            }
            ;
            $943.steps = [];
            return $943;
          }))(function() {
            return bind22(build(v.value1))(function(ea) {
              var s$prime = updateTargetIds(ea)(wrap3(v.value0));
              return discard32(modify_3(function(st) {
                var ss$prime = append4(v1.steps)(st.steps);
                var $947 = {};
                for (var $948 in st) {
                  if ({}.hasOwnProperty.call(st, $948)) {
                    $947[$948] = st[$948];
                  }
                  ;
                }
                ;
                $947.steps = function() {
                  var $946 = allNoId(s$prime);
                  if ($946) {
                    return ss$prime;
                  }
                  ;
                  return fromMaybe(ss$prime)(insertAt(length(v1.steps))(s$prime)(ss$prime));
                }();
                return $947;
              }))(function() {
                return pure22(ea);
              });
            });
          });
        });
      }
      ;
      if (v.value0.location instanceof AfterChildren) {
        return bind22(build(v.value1))(function(ea) {
          var s$prime = updateTargetIds(ea)(wrap3(v.value0));
          return discard32(modify_3(function(st) {
            var $952 = {};
            for (var $953 in st) {
              if ({}.hasOwnProperty.call(st, $953)) {
                $952[$953] = st[$953];
              }
              ;
            }
            ;
            $952.steps = function() {
              var $951 = allNoId(s$prime);
              if ($951) {
                return st.steps;
              }
              ;
              return fromMaybe(st.steps)(insertAt(length(st.steps))(s$prime)(st.steps));
            }();
            return $952;
          }))(function() {
            return pure22(ea);
          });
        });
      }
      ;
      if (v.value0.location instanceof BeforeStep) {
        return bind22(get3)(function(v1) {
          return bind22(build(v.value1))(function(ea) {
            return bind22(get3)(function(v2) {
              var s$prime = updateTargetIds(ea)(wrap3(v.value0));
              var loc = fromMaybe(length(v1.steps))(findIndex(function(v3) {
                return eq22(v3.id)(new Just(v.value0.location.value0));
              })(v1.steps));
              var ss$prime$prime = fromMaybe(v2.steps)(insertAt(loc)(s$prime)(v2.steps));
              return discard32(modify_3(function(v3) {
                var $958 = {};
                for (var $959 in v3) {
                  if ({}.hasOwnProperty.call(v3, $959)) {
                    $958[$959] = v3[$959];
                  }
                  ;
                }
                ;
                $958.steps = ss$prime$prime;
                return $958;
              }))(function() {
                return pure22(ea);
              });
            });
          });
        });
      }
      ;
      throw new Error("Failed pattern match at Slides (line 717, column 31 - line 759, column 14): " + [v.value0.location.constructor.name]);
    }
    ;
    if (v instanceof ModifyOuterStep) {
      return build(v.value1);
    }
    ;
    if (v instanceof FirstNote) {
      return discard32(modify_3(function(v1) {
        var $968 = {};
        for (var $969 in v1) {
          if ({}.hasOwnProperty.call(v1, $969)) {
            $968[$969] = v1[$969];
          }
          ;
        }
        ;
        $968.firstNote = v.value0;
        return $968;
      }))(function() {
        return pure22([]);
      });
    }
    ;
    if (v instanceof PrintSteps) {
      return discard32(modify_3(function(v1) {
        var $973 = {};
        for (var $974 in v1) {
          if ({}.hasOwnProperty.call(v1, $974)) {
            $973[$974] = v1[$974];
          }
          ;
        }
        ;
        $973.printSteps = new Just(v.value0);
        return $973;
      }))(function() {
        return pure22([]);
      });
    }
    ;
    return pure22([]);
  };
  var renderSlides = function(slides2) {
    var builtSlides = map9(function(s) {
      var v = runState(build(normalize(s)))({
        id: 1,
        steps: [],
        firstNote: emptyNote,
        printSteps: Nothing.value
      });
      return {
        elements: v.value0,
        steps: resolveStepOrder(resolveRelIds(v.value0)(v.value1.steps)),
        firstNote: v.value1.firstNote,
        printSteps: v.value1.printSteps
      };
    })(slides2);
    return function __do4() {
      var window2 = windowImpl();
      var document3 = document2(window2)();
      var history2 = history(window2)();
      var initURL = map32(unsafeFromAbsolute)(bindFlipped3(href3)(location(window2)))();
      var stringToBool = function(s) {
        var $984 = s === "true";
        if ($984) {
          return true;
        }
        ;
        return false;
      };
      var initSP = searchParams(initURL);
      var initShowNotes = maybe(false)(stringToBool)(get2("shownotes")(initSP));
      var initLocation = {
        slide: fromMaybe(1)(bind4(get2("slide")(initSP))(fromString)),
        step: fromMaybe(0)(bind4(get2("step")(initSP))(fromString))
      };
      var initWindowSize = getWindowSize(window2)();
      return runMainWidgetInBody(bind32(sampleResize1(window2))(function(eResize) {
        return bind32(holdDyn2(initWindowSize)(eResize))(function(dWindowSize) {
          var dScale = map12(function(s) {
            return min5(s.width / fullWidth)(s.height / fullHeight);
          })(dWindowSize);
          return bind32(sampleKeydown1(document3))(function(eKeydown) {
            return bind32(foldDynMaybe2(locationFolder(builtSlides))(initLocation)(eKeydown))(function(dLocation) {
              return bind32(foldDynMaybe2(showNotesFolder)(initShowNotes)(eKeydown))(function(dShowNotes) {
                return bind32(newEvent4)(function(efAddNoteKeyDown) {
                  return bind32(foldDynMaybe2(showAddNoteFolder)(false)(leftmost2([map42(Left.create)(eKeydown), map42(Right.create)(efAddNoteKeyDown.event)])))(function(dShowAddNote) {
                    return discard23(subscribeDyn_3(setURL(history2)(initURL))(apply1(map12(Tuple.create)(dLocation))(dShowNotes)))(function() {
                      return bind32(domEvent1("beforeprint")(window2))(function(eBeforePrint) {
                        return bind32(domEvent1("afterprint")(window2))(function(eAfterPrint) {
                          return bind32(foldDyn2($$const)(false)(leftmost2([mapFlipped32(eBeforePrint)($$const(true)), mapFlipped32(eAfterPrint)($$const(false))])))(function(dPrint) {
                            return bind32($$new3(""))(function(rAddNote) {
                              var handler = function(sl) {
                                return function(dRender) {
                                  return withDynamic_2(dRender)(function(r) {
                                    if (r) {
                                      return renderSlide(builtSlides)(dScale)(dPrint)(dLocation)(dShowNotes)(sl);
                                    }
                                    ;
                                    return mempty32;
                                  });
                                };
                              };
                              var dSlideNum = uniqDynPure2(map12(function(ss) {
                                return ss.slide;
                              })(dLocation));
                              var dRenderSlides = mapFlipped22(apply1(map12(Tuple.create)(dSlideNum))(dPrint))(function(v) {
                                if (v.value1) {
                                  return map9($$const(true))(builtSlides);
                                }
                                ;
                                return modifyAtIndices2(range2(v.value0 - 2 | 0)(v.value0))($$const(true))(map9($$const(false))(builtSlides));
                              });
                              var renderedSlides = dynamicListWithIndex_2(dRenderSlides)(handler);
                              return bind32(el("div")([classes(["flex", "justify-center"])])(el("div")([stylesD(mapFlipped22(apply1(map12(Tuple.create)(dScale))(dPrint))(function(v) {
                                if (v.value1) {
                                  return mempty3;
                                }
                                ;
                                return append22(singleton3("width")(px(v.value0 * fullWidth)))(singleton3("height")(px(v.value0 * fullHeight)));
                              })), classesD(mapFlipped22(dPrint)(function(p) {
                                if (p) {
                                  return ["flex", "flex-col"];
                                }
                                ;
                                return ["relative"];
                              }))])(discard23(renderedSlides)(function() {
                                return el$prime("input")([classes(["absolute", "origin-top-left", "text-xs", "focus:outline-none", "border", "border-black"]), classesD(mapFlipped22(dShowAddNote)(function(s) {
                                  if (s) {
                                    return [];
                                  }
                                  ;
                                  return ["hidden"];
                                })), attr("type")("text"), stylesD(mapFlipped22(dScale)(function(s) {
                                  return append22(singleton3("transform")(scale(s)))(append22(singleton3("top")(px((slideHeight + slideMargin - 3.5) * s)))(append22(singleton3("left")(px(slideMargin * s)))(singleton3("width")(px(slideWidth)))));
                                })), bindValueOnInput(rAddNote), on("keydown")(efAddNoteKeyDown.fire)])(pure32(unit));
                              }))))(function(v) {
                                return discard23(subscribeDyn_3(function(s) {
                                  if (s) {
                                    return $$void5(setTimeout2(0)(focus(v.value0)));
                                  }
                                  ;
                                  return pure6(unit);
                                })(dShowAddNote))(function() {
                                  return subscribeEvent_2(function(e) {
                                    if (e.key === "Escape") {
                                      return write5(rAddNote)("");
                                    }
                                    ;
                                    if (e.key === "Enter") {
                                      return function __do5() {
                                        var storage = localStorage(window2)();
                                        var oldNotes = mapFlipped4(getItem("notes")(storage))(fromMaybe(""))();
                                        var newNotes = read5(rAddNote)();
                                        setItem("notes")(oldNotes + (newNotes + "\n"))(storage)();
                                        return write5(rAddNote)("")();
                                      };
                                    }
                                    ;
                                    return stopPropagation(e);
                                  })(efAddNoteKeyDown.event);
                                });
                              });
                            });
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      }))();
    };
  };
  var addToOuterStep = function(s) {
    return ModifyOuterStep.create(wrap3(function(v) {
      return append32(v)(s);
    }));
  };
  var oalsoShow = function(i) {
    return addToOuterStep(sChange({
      target: i,
      change: cShow
    }));
  };
  var addToInnerStep = function(s) {
    return ModifyInnerStep.create(wrap3(function(v) {
      return append32(v)(s);
    }));
  };
  var alsoShow = function(i) {
    return addToInnerStep(sChange({
      target: i,
      change: cShow
    }));
  };
  var addStep_ = function(s) {
    return new AddStep(s, mempty5);
  };
  var shows_ = function(i) {
    return addStep_(sShows(i));
  };
  var show_ = function(i) {
    return shows_([i]);
  };
  var addShow = /* @__PURE__ */ function() {
    return AddStep.create(sChange({
      target: AutoAbsId.value,
      change: cShow
    }));
  }();
  var addClasses = function(c) {
    return wrap3(function(n) {
      var $1001 = {};
      for (var $1002 in n) {
        if ({}.hasOwnProperty.call(n, $1002)) {
          $1001[$1002] = n[$1002];
        }
        ;
      }
      ;
      $1001.classes = union5(n.classes)(set1(c));
      return $1001;
    });
  };
  var addClassesS = function(c) {
    return addClasses(split(" ")(c));
  };
  var cls = function(c) {
    return Modify.create(addClassesS(c));
  };
  var li = /* @__PURE__ */ bAttr1(/* @__PURE__ */ node("li"))(/* @__PURE__ */ cls("my-1"));
  var lit = function($1043) {
    return li(text6($1043));
  };
  var ul = /* @__PURE__ */ bAttr1(/* @__PURE__ */ node("ul"))(/* @__PURE__ */ cls("list-disc ml-4 mr-4 my-2"));
  var ul2 = /* @__PURE__ */ bAttr1(/* @__PURE__ */ node("ul"))(/* @__PURE__ */ cls("list-[circle] mx-4"));
  var cHide = /* @__PURE__ */ addClasses(["invisible"]);
  var hide = /* @__PURE__ */ function() {
    return Modify.create(cHide);
  }();
  var hs = function($1044) {
    return addShow(hide($1044));
  };
  var hideLastAndShow = /* @__PURE__ */ function() {
    var $1045 = ModifyInnerStep.create(wrap3(function(v) {
      return append32(v)(sChange({
        target: new AutoRelId([new Sibling(-1 | 0)]),
        change: cHide
      }));
    }));
    return function($1046) {
      return $1045(hs($1046));
    };
  }();
  var overlap = function(a) {
    return bAttr2(mapTail(hideLastAndShow)(a))(cls("col-span-full row-span-full"));
  };
  var overlapDiv = function(a) {
    return bAttr1(div2)(cls("grid place-items-start"))(overlap(a));
  };
  var oalsoHide = function(i) {
    return addToOuterStep(sChange({
      target: i,
      change: cHide
    }));
  };

  // output/Main/index.js
  var bAttr3 = /* @__PURE__ */ bAttr(bAttributableBuilderFunct);
  var discard7 = /* @__PURE__ */ discard(discardUnit)(bindBuilderM);
  var bAttr12 = /* @__PURE__ */ bAttr(bAttributableBuilder);
  var composeFlipped3 = /* @__PURE__ */ composeFlipped(semigroupoidFn);
  var identity9 = /* @__PURE__ */ identity(categoryFn);
  var map10 = /* @__PURE__ */ map(functorArray);
  var foldMap3 = /* @__PURE__ */ foldMap2(monoidBuilder2);
  var show3 = /* @__PURE__ */ show(showInt);
  var show12 = /* @__PURE__ */ show(showNumber);
  var append12 = /* @__PURE__ */ append(semigroupBuilder2);
  var ShowByStep = /* @__PURE__ */ function() {
    function ShowByStep2() {
    }
    ;
    ShowByStep2.value = new ShowByStep2();
    return ShowByStep2;
  }();
  var ShowAll = /* @__PURE__ */ function() {
    function ShowAll2() {
    }
    ;
    ShowAll2.value = new ShowAll2();
    return ShowAll2;
  }();
  var Highlight = /* @__PURE__ */ function() {
    function Highlight2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Highlight2.create = function(value0) {
      return function(value1) {
        return new Highlight2(value0, value1);
      };
    };
    return Highlight2;
  }();
  var title2 = /* @__PURE__ */ bAttr3(div2)(/* @__PURE__ */ cls("font-semibold text-lg"));
  var titlet = function($23) {
    return title2(text6($23));
  };
  var outline = function(c) {
    var tdr = function(t1) {
      return function(t2) {
        return bAttr3(td)(cls("px-2 py-1 align-top"))(discard7(text6(t1))(function() {
          return bAttr12(divt(t2))(bAttr3(cls("text-xs w-96 mt-1"))(hide));
        }));
      };
    };
    var tdl = function(t) {
      return bAttr12(tdt(t))(cls("text-right px-2 py-1 font-medium align-top"));
    };
    var f = function() {
      if (c instanceof ShowByStep) {
        return hs;
      }
      ;
      if (c instanceof ShowAll) {
        return mapAll(mapNth(1)(mapNth(1)(Modify.create(cShow))));
      }
      ;
      if (c instanceof Highlight) {
        var prev = function() {
          var $19 = c.value0 > 0;
          if ($19) {
            return foldl2(composeFlipped3)(identity9)(map10(function(j) {
              return mapNth(j)(mapNth(1)(mapNth(1)(Modify.create(cShow))));
            })(range2(0)(c.value0 - 1 | 0)));
          }
          ;
          return identity9;
        }();
        var $24 = mapNth(c.value0)(function() {
          var $27 = function() {
            if (c.value1) {
              return AddStep.create(sChange({
                target: new AutoRelId([new NthChild(1), new NthChild(1)]),
                change: cShow
              }));
            }
            ;
            return identity9;
          }();
          var $28 = rmcls("opacity-30");
          return function($29) {
            return $27($28($29));
          };
        }());
        var $25 = cls("opacity-30");
        return function($26) {
          return $24(prev($25($26)));
        };
      }
      ;
      throw new Error("Failed pattern match at Main (line 436, column 9 - line 452, column 14): " + [c.constructor.name]);
    }();
    return discard7(bAttr12(divt("Understanding the representation and dynamics\nof welfare tradeoff ratios"))(cls("font-medium text-lg text-center")))(function() {
      return bAttr3(table)(cls("my-2"))(tbody(f(discard7(tr(discard7(tdl("Chapter 1"))(function() {
        return tdr("an accurate and efficient measure of WTRs")("Wenhao Qi, Ed Vul, Lindsey Powell (under review). An accurate and efficient measure of welfare tradeoff ratios. PLOS One.");
      })))(function() {
        return discard7(tr(discard7(tdl("Chapter 2"))(function() {
          return tdr("the evolution of WTR inference")("Wenhao Qi, Ed Vul (2022). The evolution of theory of mind on welfare tradeoff ratios. Evolution and Human Behavior.");
        })))(function() {
          return tr(discard7(tdl("Chapter 3"))(function() {
            return tdr("the joint evolution of WTR inference and reciprocity")("Wenhao Qi, Boyu Wang, Lindsey Powell (in preparation). The joint evolution of theory of mind and reciprocity in noisy games.");
          }));
        });
      }))));
    });
  };
  var lambda = /* @__PURE__ */ mi("\u03BB");
  var imgs = function(name16) {
    return function(suffix) {
      return function(n) {
        return foldMap3(function(i) {
          return img("fig/" + (name16 + ("/" + (show3(i) + ("." + suffix)))));
        })(range2(1)(n));
      };
    };
  };
  var slides = /* @__PURE__ */ function() {
    var wtrdef = math(discard7(mi("u"))(function() {
      return discard7(mo("="))(function() {
        return discard7(msub(mi("w"))(mr("s")))(function() {
          return discard7(mo("+"))(function() {
            return discard7(bAttr12(lambda)(cls("text-red-600")))(function() {
              return msub(mi("w"))(mr("t"));
            });
          });
        });
      });
    }));
    var lambdaSlider = bAttr3(div2)(bAttr3(cls("w-full"))(stl(singleton3("height")(show12(255 * 0.6) + "px"))))(bAttr12(iframe("https://experiments.evullab.org/lambda-slider/"))(bAttr3(cls("h-[255px] origin-top-left scale-[.6]"))(stl(singleton3("width")(show12(100 / 0.6) + "%")))));
    return [cls("my-1")(discard7(bAttr12(divt("Understanding the representation and dynamics\nof welfare tradeoff ratios"))(cls("font-medium text-xl text-center")))(function() {
      return discard7(divt("Wenhao (James) Qi"))(function() {
        return divt("2024-12-06");
      });
    })), discard7(titlet("overview"))(function() {
      return ul(hs(discard7(lit("human society is built on cooperative relationships"))(function() {
        return discard7(li(discard7(text6("maximize total welfare"))(function() {
          return bAttr3(math)(bAttr3(cls("ml-4"))(hs))(discard7(mi("u"))(function() {
            return discard7(mo("="))(function() {
              return discard7(msub(mi("w"))(mr("s")))(function() {
                return discard7(mo("+"))(function() {
                  return msub(mi("w"))(mr("t"));
                });
              });
            });
          }));
        })))(function() {
          return discard7(li(discard7(text6("defectors"))(function() {
            return bAttr3(math)(cls("ml-4"))(discard7(mi("u"))(function() {
              return discard7(mo("="))(function() {
                return msub(mi("w"))(mr("s"));
              });
            }));
          })))(function() {
            return discard7(li(discard7(text6("subtle defectors"))(function() {
              return bAttr3(span4)(hs)(discard7(bAttr12(wtrdef)(cls("mx-4")))(function() {
                return discard7(text6("e.g."))(function() {
                  return bAttr3(math)(cls("ml-2"))(discard7(bAttr12(lambda)(cls("text-red-600")))(function() {
                    return discard7(mo("="))(function() {
                      return mn("0.8");
                    });
                  }));
                });
              }));
            })))(function() {
              return discard7(li(bAttr12(spant("welfare tradeoff ratio (WTR)"))(cls("text-red-600"))))(function() {
                return discard7(lit("detect subtle defection \u2014 infer WTR"))(function() {
                  return discard7(lit("punish subtle defection \u2014 adjust WTR"))(function() {
                    return lit("people can use, infer, and adjust WTRs");
                  });
                });
              });
            });
          });
        });
      })));
    }), discard7(titlet("studying representation and dynamics of WTRs"))(function() {
      return ul(hs(discard7(lit("behavioral"))(function() {
        return discard7(ul2(mapTail(hs)(discard7(lit("how do people set, infer, and adjust WTRs?"))(function() {
          return li(discard7(text6("accurate and efficient measure of WTRs"))(function() {
            return bAttr12(spant(" \u2014 Chapter 1"))(hs);
          }));
        }))))(function() {
          return discard7(lit("evolutionary"))(function() {
            return ul2(mapTail(hs)(discard7(lit("what game environments allow WTR inference and\nadjustment to evolve?"))(function() {
              return discard7(li(discard7(text6("Chapter 2 \u2014 "))(function() {
                return bAttr3(span4)(cls("inline-block align-top"))(discard7(text6("inference alone "))(function() {
                  return bAttr12(spant("in games\nw/ strong interdependence"))(hs);
                }));
              })))(function() {
                return li(discard7(text6("Chapter 3 \u2014 "))(function() {
                  return bAttr12(spant("inference and reciprocity in games\nw/o strong interdependence"))(cls("inline-block align-top"));
                }));
              });
            })));
          });
        });
      })));
    }), outline(new Highlight(0, false)), discard7(title2(discard7(bAttr12(spant("from "))(bAttr3(hide)(id("f"))))(function() {
      return discard7(text6("binary allocation tasks"))(function() {
        return bAttr12(spant(" to Lambda Slider"))(bAttr3(hide)(id("t")));
      });
    })))(function() {
      return discard7(bAttr12(div2(wtrdef))(bAttr3(cls("my-1"))(hs)))(function() {
        return discard7(bAttr3(overlapDiv)(bAttr3(hs)(cls("w-3/4 mt-3 mr-10")))(bAttr12(imgs("binary")("svg")(8))(cls("w-full"))))(function() {
          return shows_(["f", "t"]);
        });
      });
    }), discard7(titlet("Lambda Slider"))(function() {
      return bAttr12(lambdaSlider)(cls("mt-3"));
    }), discard7(titlet("psychometric properties of the Lambda Slider"))(function() {
      return discard7(bAttr3(div2)(cls("flex justify-evenly items-start mt-2"))(hs(discard7(bAttr12(img("fig/list.png"))(bAttr3(cls("w-[50%]"))(onote("in-order-to-elicit")(""))))(function() {
        return bAttr12(img("fig/rank.png"))(cls("w-[40%]"));
      }))))(function() {
        return bAttr3(div2)(cls("flex justify-evenly items-center"))(hs(discard7(bAttr12(img("fig/slide.png"))(bAttr3(cls("w-[40%]"))(onote("")("expt-3-maui"))))(function() {
          return bAttr12(img("fig/donate.png"))(cls("w-[40%]"));
        })));
      });
    }), discard7(titlet("psychometric properties of the Lambda Slider"))(function() {
      return discard7(bAttr3(div2)(cls("flex justify-evenly w-full my-1"))(hs(discard7(bAttr3(div2)(cls("flex flex-col items-center gap-1"))(discard7(bAttr12(divt("test\u2014retest reliability"))(cls("text-sm")))(function() {
        return bAttr12(img("fig/tr.svg"))(cls("h-36"));
      })))(function() {
        return bAttr3(div2)(cls("flex flex-col items-center gap-1"))(discard7(bAttr12(divt("convergent validity w/ SVO Slider"))(cls("text-sm")))(function() {
          return bAttr12(img("fig/convergent.svg"))(cls("h-36"));
        }));
      }))))(function() {
        return bAttr3(div2)(cls("flex justify-evenly w-full"))(hs(discard7(bAttr3(div2)(cls("flex flex-col items-center gap-1"))(discard7(bAttr12(divt("convergent validity w/ social distance"))(cls("text-sm")))(function() {
          return bAttr12(img("fig/dist.svg"))(cls("h-36"));
        })))(function() {
          return bAttr3(div2)(cls("flex flex-col items-center gap-1"))(discard7(bAttr12(divt("external validity w/ donation"))(cls("text-sm")))(function() {
            return bAttr12(img("fig/donate.svg"))(cls("h-36"));
          }));
        })));
      });
    }), outline(new Highlight(0, true)), outline(new Highlight(1, false)), discard7(titlet("the evolution of WTR inference"))(function() {
      return bAttr3(div2)(cls("flex items-center"))(discard7(bAttr3(ul)(rmcls("mr-4"))(hs(discard7(lit("evolutionary game theory"))(function() {
        return discard7(bAttr12(lit("in what game environments is WTR inference useful?"))(onote("what-evolved")("on-wtr")))(function() {
          return discard7(li(discard7(text6("one-shot games"))(function() {
            return bAttr12(spant(" (e.g. Prisoner's Dilemma)"))(bAttr3(hs)(bAttr3(stepOffset(2))(alsoShow(new AbsId("fixed")))));
          })))(function() {
            return discard7(bAttr3(ul2)(ostepOffset(7))(li(discard7(bAttr12(spant("variable"))(cls("italic")))(function() {
              return discard7(text6(" opponent, "))(function() {
                return discard7(bAttr12(spant("fixed"))(cls("italic")))(function() {
                  return text6(" payoff structure");
                });
              });
            }))))(function() {
              return discard7(li(discard7(text6("repeated games"))(function() {
                return bAttr12(spant(" (e.g. iterated Prisoner's Dilemma)"))(hs);
              })))(function() {
                return discard7(bAttr3(ul2)(ostepOffset(4))(li(discard7(bAttr12(spant("stable"))(cls("italic")))(function() {
                  return discard7(text6(" opponent, "))(function() {
                    return discard7(bAttr12(spant("fixed"))(cls("italic")))(function() {
                      return text6(" payoff structure");
                    });
                  });
                }))))(function() {
                  return discard7(li(discard7(text6("action-level strategies suffice"))(function() {
                    return bAttr12(spant(" (e.g. defect; tit-for-tat)"))(hs);
                  })))(function() {
                    return discard7(bAttr3(li)(oalsoShow(new AbsId("var")))(discard7(bAttr12(spant("variable"))(cls("italic")))(function() {
                      return text6(" payoff structure?");
                    })))(function() {
                      return li(discard7(bAttr12(spant("fixed/stable/variable"))(cls("italic")))(function() {
                        return text6(" opponent/payoff structure");
                      }));
                    });
                  });
                });
              });
            });
          });
        });
      }))))(function() {
        return bAttr3(div2)(cls("flex flex-col items-center gap-2"))(discard7(bAttr12(img("fig/game-fixed.svg"))(bAttr3(cls("h-28"))(bAttr3(hide)(id("fixed")))))(function() {
          return bAttr12(img("fig/game-var.svg"))(bAttr3(cls("h-28"))(bAttr3(hide)(id("var"))));
        }));
      }));
    }), discard7(titlet("expanding the space of environments"))(function() {
      return bAttr3(overlapDiv)(bAttr3(hs)(cls("w-3/4 mt-2")))(bAttr12(imgs("tom-space")("svg")(3))(cls("w-full")));
    }), discard7(titlet("agents"))(function() {
      return ul(hs(discard7(lit("tit-for-tat (TfT)"))(function() {
        return discard7(ul2(mapTail(hs)(discard7(lit("first chooses A"))(function() {
          return li(discard7(text6("then copies opponent's previous "))(function() {
            return bAttr12(spant("action"))(cls("font-semibold"));
          }));
        }))))(function() {
          return discard7(lit("reinforcement-learning (RL)"))(function() {
            return discard7(ul2(li(discard7(text6("learns policy over "))(function() {
              return bAttr12(spant("actions"))(cls("font-semibold"));
            }))))(function() {
              return discard7(lit("theory-of-mind (ToM)"))(function() {
                return ul2(mapTail(hs)(discard7(lit("performs Bayesian inference on opponent's WTR"))(function() {
                  return discard7(lit("predicts opponent's actions"))(function() {
                    return lit("makes best response");
                  });
                })));
              });
            });
          });
        });
      })));
    }), discard7(titlet("pairwise mean payoff matrices"))(function() {
      return bAttr12(img("fig/tom-matrix.svg"))(cls("w-5/6 mt-3"));
    }), discard7(titlet("evolutionary dynamics"))(function() {
      return bAttr12(img("fig/tom-evo.svg"))(cls("w-3/5 mt-2"));
    }), discard7(titlet("Chapter 2 discussion"))(function() {
      return discard7(ul(hs(discard7(lit("people are sensitive to variable payoff structures\nand can infer opponent's WTR"))(function() {
        return discard7(lit("key environmental feature:\nsocial situations change faster than social partners"))(function() {
          return discard7(lit("ToM makes better predictions of the opponent's actions,\nallowing it to choose better options for itself"))(function() {
            return lit("this relies on games with strong interdependence");
          });
        });
      }))))(function() {
        return bAttr12(img("fig/game-nondecomp.svg"))(bAttr3(cls("h-28"))(hs));
      });
    }), outline(new Highlight(1, true)), outline(new Highlight(2, false)), discard7(titlet("games without strong interdependence"))(function() {
      return discard7(ul(hs(discard7(bAttr12(lit("in Chapter 2, ToM's advantage relies on games\nwith strong interdependence"))(oalsoShow(new AbsId("n"))))(function() {
        return discard7(lit("such games may be rare in the real world"))(function() {
          return discard7(lit("most social decisions are one-player games"))(function() {
            return discard7(show_("o"))(function() {
              return discard7(show_("w"))(function() {
                return discard7(lit("decision only depends on current WTR"))(function() {
                  return discard7(lit("what conditions allow WTR inference to evolve in these games?"))(function() {
                    return li(discard7(text6("WTR inference might be useful because it enables "))(function() {
                      return bAttr12(spant("reciprocity"))(cls("font-semibold"));
                    }));
                  });
                });
              });
            });
          });
        });
      }))))(function() {
        return bAttr3(div2)(cls("flex gap-12 items-center"))(discard7(bAttr12(img("fig/game-nondecomp.svg"))(bAttr3(cls("h-28"))(bAttr3(hide)(id("n")))))(function() {
          return discard7(bAttr12(img("fig/game-onehigh.svg"))(bAttr3(cls("h-28"))(bAttr3(hide)(id("o")))))(function() {
            return bAttr12(wtrdef)(bAttr3(hide)(id("w")));
          });
        }));
      });
    }), discard7(titlet("game environment"))(function() {
      return discard7(ul(hs(discard7(li(discard7(bAttr12(spant("stable"))(cls("italic")))(function() {
        return discard7(text6(" opponent, "))(function() {
          return discard7(bAttr12(spant("variable"))(cls("italic")))(function() {
            return text6(" payoff structure");
          });
        });
      })))(function() {
        return discard7(bAttr12(lit("variable alternating games"))(oalsoShow(new AbsId("o"))))(function() {
          return discard7(lit("Exp. 1: without noise"))(function() {
            return discard7(lit("Exp. 2: with noise in payoffs"))(function() {
              return ul2(mapTail(hs)(discard7(lit("actor perceives actual payoffs"))(function() {
                return lit("observer perceives payoffs plus random noise");
              })));
            });
          });
        });
      }))))(function() {
        return bAttr12(img("fig/game-one.svg"))(bAttr3(cls("h-28"))(bAttr3(hide)(id("o"))));
      });
    }), discard7(titlet("agents"))(function() {
      return discard7(bAttr3(div2)(cls("absolute top-[15%] left-[62%] text-xs"))(discard7(bAttr3(div2)(bAttr3(hide)(id("s")))(discard7(math(msub(lambda)(mr("self"))))(function() {
        return text6(" \u2014 agent's WTR toward opponent");
      })))(function() {
        return bAttr3(div2)(bAttr3(hide)(id("o")))(discard7(math(msub(lambda)(mr("opp"))))(function() {
          return text6(" \u2014 opponent's WTR toward agent");
        }));
      })))(function() {
        return ul(hs(discard7(bAttr3(li)(oalsoShow(new AbsId("s")))(discard7(text6("always defect (AllD)"))(function() {
          return bAttr3(math)(cls("ml-8"))(append12(msub(lambda)(mr("self")))(append12(mo("="))(mn("0"))));
        })))(function() {
          return discard7(li(discard7(text6("always cooperate (AllC)"))(function() {
            return bAttr3(math)(cls("ml-8"))(append12(msub(lambda)(mr("self")))(append12(mo("="))(mn("1"))));
          })))(function() {
            return discard7(li(discard7(text6("half cooperate (HalfC)"))(function() {
              return bAttr3(math)(cls("ml-8"))(append12(msub(lambda)(mr("self")))(append12(mo("="))(mn("0.5"))));
            })))(function() {
              return discard7(li(discard7(text6("tit-for-tat (TfT)"))(function() {
                return bAttr3(span4)(bAttr3(cls("ml-8"))(bAttr3(hs)(alsoShow(new AbsId("o")))))(discard7(text6("binary "))(function() {
                  return discard7(math(msub(lambda)(mr("opp"))))(function() {
                    return discard7(bAttr12(spant("binary "))(cls("ml-4")))(function() {
                      return math(msub(lambda)(mr("self")));
                    });
                  });
                }));
              })))(function() {
                return discard7(bAttr3(div2)(cls("grid grid-rows-[repeat(2,auto)] grid-cols-[repeat(2,max-content)] grid-flow-col items-baseline"))(mapTail(hs)(cls("mx-4 list-[circle]")(rmcls("my-1")(discard7(li(discard7(text6("assumes "))(function() {
                  return discard7(math(append12(msub(lambda)(mr("opp")))(append12(mo("="))(mn("0")))))(function() {
                    return discard7(text6(" or "))(function() {
                      return math(mn("1"));
                    });
                  });
                })))(function() {
                  return discard7(li(discard7(text6("starts with "))(function() {
                    return math(append12(msub(lambda)(mr("self")))(append12(mo("="))(mn("1"))));
                  })))(function() {
                    return discard7(li(discard7(text6("sets "))(function() {
                      return math(append12(msub(lambda)(mr("self")))(append12(mo(":="))(msub(mover(lambda)(mo("^")))(mr("opp")))));
                    })))(function() {
                      return lit("can be implemented as a heuristic");
                    });
                  });
                }))))))(function() {
                  return discard7(bAttr3(li)(bAttr3(rmcls("my-1"))(cls("mt-2")))(discard7(text6("Bayesian"))(function() {
                    return bAttr3(span4)(bAttr3(cls("ml-8"))(hs))(discard7(text6("graded "))(function() {
                      return discard7(math(msub(lambda)(mr("opp"))))(function() {
                        return discard7(bAttr12(spant("graded "))(cls("ml-4")))(function() {
                          return math(msub(lambda)(mr("self")));
                        });
                      });
                    }));
                  })))(function() {
                    return discard7(bAttr3(div2)(cls("grid grid-rows-[repeat(2,auto)] grid-cols-[repeat(2,max-content)] grid-flow-col items-baseline"))(mapTail(hs)(cls("mx-4 list-[circle]")(rmcls("my-1")(discard7(li(discard7(text6("performs Bayesian inference on "))(function() {
                      return math(msub(lambda)(mr("opp")));
                    })))(function() {
                      return discard7(li(discard7(text6("starts with "))(function() {
                        return math(append12(msub(lambda)(mr("self")))(append12(mo("="))(mn("1"))));
                      })))(function() {
                        return discard7(li(discard7(text6("sets "))(function() {
                          return math(append12(msub(lambda)(mr("self")))(append12(mo(":="))(msub(mover(lambda)(mo("^")))(mr("opp")))));
                        })))(function() {
                          return li(discard7(text6(" with bias toward "))(function() {
                            return math(mn("1"));
                          }));
                        });
                      });
                    }))))))(function() {
                      return discard7(bAttr3(li)(bAttr3(rmcls("my-1"))(cls("mt-2")))(discard7(text6("slow tit-for-tat (STfT)"))(function() {
                        return bAttr3(span4)(bAttr3(cls("ml-8"))(hs))(discard7(text6("binary "))(function() {
                          return discard7(math(msub(lambda)(mr("opp"))))(function() {
                            return discard7(bAttr12(spant("graded "))(cls("ml-4")))(function() {
                              return math(msub(lambda)(mr("self")));
                            });
                          });
                        }));
                      })))(function() {
                        return ul2(bAttr3(li)(rmcls("my-1"))(discard7(text6("under-adjusts "))(function() {
                          return math(msub(lambda)(mr("self")));
                        })));
                      });
                    });
                  });
                });
              });
            });
          });
        })));
      });
    }), discard7(titlet("no noise \u2014 pairwise mean payoff matrix"))(function() {
      return bAttr12(img("fig/matrix1.svg"))(cls("h-5/6 mt-1"));
    }), discard7(titlet("no noise \u2014 evolutionary distributions"))(function() {
      return discard7(bAttr3(overlapDiv)(bAttr3(mapTail(hs))(cls("h-5/6 mt-1")))(bAttr12(imgs("distr1")("svg")(4))(cls("h-full"))))(function() {
        return bAttr3(ul)(bAttr3(cls("absolute left-[55%] top-[50%]"))(bAttr3(hs)(stepOffset(-2 | 0))))(lit("graded WTR inference\nunlikely to evolve\ndue to TfT's simplicity"));
      });
    }), discard7(titlet("with noise \u2014 pairwise mean payoff matrix"))(function() {
      return bAttr12(img("fig/matrix2.svg"))(cls("h-5/6 mt-1"));
    }), discard7(titlet("with noise \u2014 evolutionary distributions"))(function() {
      return discard7(bAttr3(overlapDiv)(bAttr3(mapTail(hs))(cls("h-5/6 mt-1")))(bAttr12(imgs("distr2")("svg")(4))(cls("h-full"))))(function() {
        return bAttr3(ul)(cls("absolute left-[55%] top-[45%]"))(hs(discard7(bAttr12(lit("TfT suffers from misperception"))(ostepOffset(-2 | 0)))(function() {
          return discard7(bAttr3(li)(ostepOffset(-2 | 0))(discard7(text6("Slow TfT performs worse than Bayesian, esp. against HalfC, due to binary "))(function() {
            return math(msub(lambda)(mr("opp")));
          })))(function() {
            return bAttr12(lit("HalfC performs well, esp. under higher mutation rates"))(ostepOffset(-1 | 0));
          });
        })));
      });
    }), discard7(titlet("Chapter 3 discussion"))(function() {
      return ul(hs(discard7(lit("graded WTR inference and reciprocity performs well,\nbut has a decisive advantage only when there's noise"))(function() {
        return discard7(lit("key environmental feature:\nuncertainty about payoffs others perceive"))(function() {
          return discard7(lit("good performance of AllD and HalfC"))(function() {
            return lit("complexity and optimality of the Bayesian agent");
          });
        });
      })));
    }), outline(new Highlight(2, true)), outline(ShowAll.value), discard7(titlet("future directions"))(function() {
      return discard7(bAttr3(ul)(cls("pb-20"))(hs(discard7(lit("fine-grained patterns of people's reciprocity in WTRs"))(function() {
        return discard7(ul2(discard7(lit("manipulate partner's level of reciprocity"))(function() {
          return bAttr12(lit("2D presentation of the Lambda Slider"))(bAttr3(hs)(alsoShow(new AbsId("b"))));
        })))(function() {
          return discard7(bAttr12(lit("variability in parochialism"))(bAttr3(oalsoHide(new AbsId("b")))(oalsoShow(new AbsId("d")))))(function() {
            return discard7(li(discard7(text6("extreme WTRs ("))(function() {
              return discard7(math(append12(bAttr12(mo("<"))(attr2(singleton3("lspace")("0px"))))(mn("0"))))(function() {
                return discard7(text6(" or "))(function() {
                  return discard7(math(append12(bAttr12(mo(">"))(attr2(singleton3("lspace")("0px"))))(mn("1"))))(function() {
                    return text6(")");
                  });
                });
              });
            })))(function() {
              return discard7(bAttr12(lit("other social motivations (inequity aversion, social norms, etc.)"))(oalsoHide(new AbsId("d"))))(function() {
                return ul2(lit("measurement & evolution"));
              });
            });
          });
        });
      }))))(function() {
        return discard7(bAttr12(img("fig/binary/8.svg"))(bAttr3(cls("absolute h-[40%] top-[55%]"))(bAttr3(hide)(id("b")))))(function() {
          return bAttr12(img("fig/dist.svg"))(bAttr3(cls("absolute h-[40%] top-[55%]"))(bAttr3(hide)(id("d"))));
        });
      });
    }), mapTail(hs)(discard7(bAttr12(titlet("acknowledgements"))(cls("my-3")))(function() {
      return discard7(bAttr3(div2)(cls("flex gap-7 my-3"))(discard7(divt("Ed Vul"))(function() {
        return divt("Lindsey Powell");
      })))(function() {
        return discard7(bAttr3(div2)(cls("flex gap-7 my-3"))(discard7(divt("Mike McCullough"))(function() {
          return discard7(divt("Judy Fan"))(function() {
            return discard7(divt("Joel Sobel"))(function() {
              return divt("Chujun Lin");
            });
          });
        })))(function() {
          return discard7(bAttr12(divt("Boyu Wang"))(cls("my-3")))(function() {
            return discard7(bAttr3(div2)(cls("flex gap-7 my-3"))(discard7(divt("Erik"))(function() {
              return discard7(divt("Lauren O."))(function() {
                return discard7(divt("Isabella"))(function() {
                  return discard7(divt("Cameron"))(function() {
                    return discard7(divt("Alexis"))(function() {
                      return discard7(divt("Lauren S."))(function() {
                        return divt("Bill");
                      });
                    });
                  });
                });
              });
            })))(function() {
              return discard7(bAttr3(div2)(cls("flex gap-7 my-3"))(discard7(divt("Yang"))(function() {
                return discard7(divt("Haoliang"))(function() {
                  return divt("Yuyao");
                });
              })))(function() {
                return bAttr3(div2)(cls("flex gap-7 my-3"))(discard7(divt("mom"))(function() {
                  return discard7(divt("dad"))(function() {
                    return divt("Peipei");
                  });
                }));
              });
            });
          });
        });
      });
    })), bAttr12(img("fig/backup/1-binary.svg"))(cls("w-full")), bAttr12(img("fig/backup/1-slider.svg"))(cls("h-full")), bAttr12(img("fig/backup/1-svo.svg"))(cls("w-full")), bAttr12(img("fig/backup/1-tr.svg"))(cls("w-full")), bAttr12(img("fig/backup/1-dist.svg"))(cls("h-full")), bAttr12(img("fig/backup/1-expt2sliders.svg"))(cls("w-full")), bAttr12(img("fig/backup/1-chi.svg"))(cls("w-full")), bAttr12(img("fig/backup/1-expt3sliders.svg"))(cls("w-full")), bAttr12(img("fig/backup/1-ineq.svg"))(cls("h-full")), bAttr12(img("fig/backup/2-fig1.svg"))(cls("h-full")), bAttr12(img("fig/backup/2-fig2.svg"))(cls("h-full")), bAttr12(img("fig/backup/2-fig3.svg"))(cls("h-full")), bAttr12(img("fig/backup/2-fig4.svg"))(cls("w-full")), bAttr12(img("fig/backup/2-figa1.svg"))(cls("w-full")), bAttr12(img("fig/backup/3-decomp.svg"))(cls("w-full")), bAttr12(img("fig/backup/3-matrix1.svg"))(cls("w-full")), bAttr12(img("fig/backup/3-traces1.svg"))(cls("w-full")), bAttr12(img("fig/backup/3-matrix2.svg"))(cls("w-full")), bAttr12(img("fig/backup/3-traces2.svg"))(cls("w-full"))];
  }();
  var main = /* @__PURE__ */ renderSlides(slides);

  // entry.js
  main();
})();
