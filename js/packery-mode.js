/*!
 * Packery layout mode PACKAGED v2.0.1
 * sub-classes Packery
 */
!function(a, b) {
  "function" == typeof define && define.amd ? define("packery/js/rect", b) : "object" == typeof module && module.exports ? module.exports = b() : (a.Packery = a.Packery || {},
      a.Packery.Rect = b())
}(window, function() {
  function a(b) {
    for (var c in a.defaults)
      this[c] = a.defaults[c];
    for (c in b)
      this[c] = b[c]
  }
  a.defaults = {
    x: 0,
    y: 0,
    width: 0,
    height: 0
  };
  var b = a.prototype;
  return b.contains = function(a) {
    var b = a.width || 0
        , c = a.height || 0;
    return this.x <= a.x && this.y <= a.y && this.x + this.width >= a.x + b && this.y + this.height >= a.y + c
  }
      ,
      b.overlaps = function(a) {
        var b = this.x + this.width
            , c = this.y + this.height
            , d = a.x + a.width
            , e = a.y + a.height;
        return this.x < d && b > a.x && this.y < e && c > a.y
      }
      ,
      b.getMaximalFreeRects = function(b) {
        if (!this.overlaps(b))
          return !1;
        var c, d = [], e = this.x + this.width, f = this.y + this.height, g = b.x + b.width, h = b.y + b.height;
        return this.y < b.y && (c = new a({
          x: this.x,
          y: this.y,
          width: this.width,
          height: b.y - this.y
        }),
            d.push(c)),
        e > g && (c = new a({
          x: g,
          y: this.y,
          width: e - g,
          height: this.height
        }),
            d.push(c)),
        f > h && (c = new a({
          x: this.x,
          y: h,
          width: this.width,
          height: f - h
        }),
            d.push(c)),
        this.x < b.x && (c = new a({
          x: this.x,
          y: this.y,
          width: b.x - this.x,
          height: this.height
        }),
            d.push(c)),
            d
      }
      ,
      b.canFit = function(a) {
        return this.width >= a.width && this.height >= a.height
      }
      ,
      a
}),
    function(a, b) {
      if ("function" == typeof define && define.amd)
        define("packery/js/packer", ["./rect"], b);
      else if ("object" == typeof module && module.exports)
        module.exports = b(require("./rect"));
      else {
        var c = a.Packery = a.Packery || {};
        c.Packer = b(c.Rect)
      }
    }(window, function(a) {
      function b(a, b, c) {
        this.width = a || 0,
            this.height = b || 0,
            this.sortDirection = c || "downwardLeftToRight",
            this.reset()
      }
      var c = b.prototype;
      c.reset = function() {
        this.spaces = [];
        var b = new a({
          x: 0,
          y: 0,
          width: this.width,
          height: this.height
        });
        this.spaces.push(b),
            this.sorter = d[this.sortDirection] || d.downwardLeftToRight
      }
          ,
          c.pack = function(a) {
            for (var b = 0; b < this.spaces.length; b++) {
              var c = this.spaces[b];
              if (c.canFit(a)) {
                this.placeInSpace(a, c);
                break
              }
            }
          }
          ,
          c.columnPack = function(a) {
            for (var b = 0; b < this.spaces.length; b++) {
              var c = this.spaces[b]
                  , d = c.x <= a.x && c.x + c.width >= a.x + a.width && c.height >= a.height - .01;
              if (d) {
                a.y = c.y,
                    this.placed(a);
                break
              }
            }
          }
          ,
          c.rowPack = function(a) {
            for (var b = 0; b < this.spaces.length; b++) {
              var c = this.spaces[b]
                  , d = c.y <= a.y && c.y + c.height >= a.y + a.height && c.width >= a.width - .01;
              if (d) {
                a.x = c.x,
                    this.placed(a);
                break
              }
            }
          }
          ,
          c.placeInSpace = function(a, b) {
            a.x = b.x,
                a.y = b.y,
                this.placed(a)
          }
          ,
          c.placed = function(a) {
            for (var b = [], c = 0; c < this.spaces.length; c++) {
              var d = this.spaces[c]
                  , e = d.getMaximalFreeRects(a);
              e ? b.push.apply(b, e) : b.push(d)
            }
            this.spaces = b,
                this.mergeSortSpaces()
          }
          ,
          c.mergeSortSpaces = function() {
            b.mergeRects(this.spaces),
                this.spaces.sort(this.sorter)
          }
          ,
          c.addSpace = function(a) {
            this.spaces.push(a),
                this.mergeSortSpaces()
          }
          ,
          b.mergeRects = function(a) {
            var b = 0
                , c = a[b];
            a: for (; c; ) {
              for (var d = 0, e = a[b + d]; e; ) {
                if (e == c)
                  d++;
                else {
                  if (e.contains(c)) {
                    a.splice(b, 1),
                        c = a[b];
                    continue a
                  }
                  c.contains(e) ? a.splice(b + d, 1) : d++
                }
                e = a[b + d]
              }
              b++,
                  c = a[b]
            }
            return a
          }
      ;
      var d = {
        downwardLeftToRight: function(a, b) {
          return a.y - b.y || a.x - b.x
        },
        rightwardTopToBottom: function(a, b) {
          return a.x - b.x || a.y - b.y
        }
      };
      return b
    }),
    function(a, b) {
      "function" == typeof define && define.amd ? define("packery/js/item", ["outlayer/outlayer", "./rect"], b) : "object" == typeof module && module.exports ? module.exports = b(require("outlayer"), require("./rect")) : a.Packery.Item = b(a.Outlayer, a.Packery.Rect)
    }(window, function(a, b) {
      var c = document.documentElement.style
          , d = "string" == typeof c.transform ? "transform" : "WebkitTransform"
          , e = function() {
        a.Item.apply(this, arguments)
      }
          , f = e.prototype = Object.create(a.Item.prototype)
          , g = f._create;
      f._create = function() {
        g.call(this),
            this.rect = new b
      }
      ;
      var h = f.moveTo;
      return f.moveTo = function(a, b) {
        var c = Math.abs(this.position.x - a)
            , d = Math.abs(this.position.y - b)
            , e = this.layout.dragItemCount && !this.isPlacing && !this.isTransitioning && 1 > c && 1 > d;
        return e ? void this.goTo(a, b) : void h.apply(this, arguments)
      }
          ,
          f.enablePlacing = function() {
            this.removeTransitionStyles(),
            this.isTransitioning && d && (this.element.style[d] = "none"),
                this.isTransitioning = !1,
                this.getSize(),
                this.layout._setRectSize(this.element, this.rect),
                this.isPlacing = !0
          }
          ,
          f.disablePlacing = function() {
            this.isPlacing = !1
          }
          ,
          f.removeElem = function() {
            this.element.parentNode.removeChild(this.element),
                this.layout.packer.addSpace(this.rect),
                this.emitEvent("remove", [this])
          }
          ,
          f.showDropPlaceholder = function() {
            var a = this.dropPlaceholder;
            a || (a = this.dropPlaceholder = document.createElement("div"),
                a.className = "packery-drop-placeholder",
                a.style.position = "absolute"),
                a.style.width = this.size.width + "px",
                a.style.height = this.size.height + "px",
                this.positionDropPlaceholder(),
                this.layout.element.appendChild(a)
          }
          ,
          f.positionDropPlaceholder = function() {
            this.dropPlaceholder.style[d] = "translate(" + this.rect.x + "px, " + this.rect.y + "px)"
          }
          ,
          f.hideDropPlaceholder = function() {
            this.layout.element.removeChild(this.dropPlaceholder)
          }
          ,
          e
    }),
    function(a, b) {
      "function" == typeof define && define.amd ? define("packery/js/packery", ["get-size/get-size", "outlayer/outlayer", "./rect", "./packer", "./item"], b) : "object" == typeof module && module.exports ? module.exports = b(require("get-size"), require("outlayer"), require("./rect"), require("./packer"), require("./item")) : a.Packery = b(a.getSize, a.Outlayer, a.Packery.Rect, a.Packery.Packer, a.Packery.Item)
    }(window, function(a, b, c, d, e) {
      function f(a, b) {
        return a.position.y - b.position.y || a.position.x - b.position.x
      }
      function g(a, b) {
        return a.position.x - b.position.x || a.position.y - b.position.y
      }
      function h(a, b) {
        var c = b.x - a.x
            , d = b.y - a.y;
        return Math.sqrt(c * c + d * d)
      }
      c.prototype.canFit = function(a) {
        return this.width >= a.width - 1 && this.height >= a.height - 1
      }
      ;
      var i = b.create("packery");
      i.Item = e;
      var j = i.prototype;
      j._create = function() {
        b.prototype._create.call(this),
            this.packer = new d,
            this.shiftPacker = new d,
            this.isEnabled = !0,
            this.dragItemCount = 0;
        var a = this;
        this.handleDraggabilly = {
          dragStart: function() {
            a.itemDragStart(this.element)
          },
          dragMove: function() {
            a.itemDragMove(this.element, this.position.x, this.position.y)
          },
          dragEnd: function() {
            a.itemDragEnd(this.element)
          }
        },
            this.handleUIDraggable = {
              start: function(b, c) {
                c && a.itemDragStart(b.currentTarget)
              },
              drag: function(b, c) {
                c && a.itemDragMove(b.currentTarget, c.position.left, c.position.top)
              },
              stop: function(b, c) {
                c && a.itemDragEnd(b.currentTarget)
              }
            }
      }
          ,
          j._resetLayout = function() {
            this.getSize(),
                this._getMeasurements();
            var a, b, c;
            this._getOption("horizontal") ? (a = 1 / 0,
                b = this.size.innerHeight + this.gutter,
                c = "rightwardTopToBottom") : (a = this.size.innerWidth + this.gutter,
                b = 1 / 0,
                c = "downwardLeftToRight"),
                this.packer.width = this.shiftPacker.width = a,
                this.packer.height = this.shiftPacker.height = b,
                this.packer.sortDirection = this.shiftPacker.sortDirection = c,
                this.packer.reset(),
                this.maxY = 0,
                this.maxX = 0
          }
          ,
          j._getMeasurements = function() {
            this._getMeasurement("columnWidth", "width"),
                this._getMeasurement("rowHeight", "height"),
                this._getMeasurement("gutter", "width")
          }
          ,
          j._getItemLayoutPosition = function(a) {
            if (this._setRectSize(a.element, a.rect),
            this.isShifting || this.dragItemCount > 0) {
              var b = this._getPackMethod();
              this.packer[b](a.rect)
            } else
              this.packer.pack(a.rect);
            return this._setMaxXY(a.rect),
                a.rect
          }
          ,
          j.shiftLayout = function() {
            this.isShifting = !0,
                this.layout(),
                delete this.isShifting
          }
          ,
          j._getPackMethod = function() {
            return this._getOption("horizontal") ? "rowPack" : "columnPack"
          }
          ,
          j._setMaxXY = function(a) {
            this.maxX = Math.max(a.x + a.width, this.maxX),
                this.maxY = Math.max(a.y + a.height, this.maxY)
          }
          ,
          j._setRectSize = function(b, c) {
            var d = a(b)
                , e = d.outerWidth
                , f = d.outerHeight;
            (e || f) && (e = this._applyGridGutter(e, this.columnWidth),
                f = this._applyGridGutter(f, this.rowHeight)),
                c.width = Math.min(e, this.packer.width),
                c.height = Math.min(f, this.packer.height)
          }
          ,
          j._applyGridGutter = function(a, b) {
            if (!b)
              return a + this.gutter;
            b += this.gutter;
            var c = a % b
                , d = c && 1 > c ? "round" : "ceil";
            return a = Math[d](a / b) * b
          }
          ,
          j._getContainerSize = function() {
            return this._getOption("horizontal") ? {
              width: this.maxX - this.gutter
            } : {
              height: this.maxY - this.gutter
            }
          }
          ,
          j._manageStamp = function(a) {
            var b, d = this.getItem(a);
            if (d && d.isPlacing)
              b = d.rect;
            else {
              var e = this._getElementOffset(a);
              b = new c({
                x: this._getOption("originLeft") ? e.left : e.right,
                y: this._getOption("originTop") ? e.top : e.bottom
              })
            }
            this._setRectSize(a, b),
                this.packer.placed(b),
                this._setMaxXY(b)
          }
          ,
          j.sortItemsByPosition = function() {
            var a = this._getOption("horizontal") ? g : f;
            this.items.sort(a)
          }
          ,
          j.fit = function(a, b, c) {
            var d = this.getItem(a);
            d && (this.stamp(d.element),
                d.enablePlacing(),
                this.updateShiftTargets(d),
                b = void 0 === b ? d.rect.x : b,
                c = void 0 === c ? d.rect.y : c,
                this.shift(d, b, c),
                this._bindFitEvents(d),
                d.moveTo(d.rect.x, d.rect.y),
                this.shiftLayout(),
                this.unstamp(d.element),
                this.sortItemsByPosition(),
                d.disablePlacing())
          }
          ,
          j._bindFitEvents = function(a) {
            function b() {
              d++,
              2 == d && c.dispatchEvent("fitComplete", null, [a])
            }
            var c = this
                , d = 0;
            a.once("layout", b),
                this.once("layoutComplete", b)
          }
          ,
          j.resize = function() {
            this.isResizeBound && this.needsResizeLayout() && (this.options.shiftPercentResize ? this.resizeShiftPercentLayout() : this.layout())
          }
          ,
          j.needsResizeLayout = function() {
            var b = a(this.element)
                , c = this._getOption("horizontal") ? "innerHeight" : "innerWidth";
            return b[c] != this.size[c]
          }
          ,
          j.resizeShiftPercentLayout = function() {
            var b = this._getItemsForLayout(this.items)
                , c = this._getOption("horizontal")
                , d = c ? "y" : "x"
                , e = c ? "height" : "width"
                , f = c ? "rowHeight" : "columnWidth"
                , g = c ? "innerHeight" : "innerWidth"
                , h = this[f];
            if (h = h && h + this.gutter) {
              this._getMeasurements();
              var i = this[f] + this.gutter;
              b.forEach(function(a) {
                var b = Math.round(a.rect[d] / h);
                a.rect[d] = b * i
              })
            } else {
              var j = a(this.element)[g] + this.gutter
                  , k = this.packer[e];
              b.forEach(function(a) {
                a.rect[d] = a.rect[d] / k * j
              })
            }
            this.shiftLayout()
          }
          ,
          j.itemDragStart = function(a) {
            if (this.isEnabled) {
              this.stamp(a);
              var b = this.getItem(a);
              b && (b.enablePlacing(),
                  b.showDropPlaceholder(),
                  this.dragItemCount++,
                  this.updateShiftTargets(b))
            }
          }
          ,
          j.updateShiftTargets = function(a) {
            this.shiftPacker.reset(),
                this._getBoundingRect();
            var b = this._getOption("originLeft")
                , d = this._getOption("originTop");
            this.stamps.forEach(function(a) {
              var e = this.getItem(a);
              if (!e || !e.isPlacing) {
                var f = this._getElementOffset(a)
                    , g = new c({
                  x: b ? f.left : f.right,
                  y: d ? f.top : f.bottom
                });
                this._setRectSize(a, g),
                    this.shiftPacker.placed(g)
              }
            }, this);
            var e = this._getOption("horizontal")
                , f = e ? "rowHeight" : "columnWidth"
                , g = e ? "height" : "width";
            this.shiftTargetKeys = [],
                this.shiftTargets = [];
            var h, i = this[f];
            if (i = i && i + this.gutter) {
              var j = Math.ceil(a.rect[g] / i)
                  , k = Math.floor((this.shiftPacker[g] + this.gutter) / i);
              h = (k - j) * i;
              for (var l = 0; k > l; l++)
                this._addShiftTarget(l * i, 0, h)
            } else
              h = this.shiftPacker[g] + this.gutter - a.rect[g],
                  this._addShiftTarget(0, 0, h);
            var m = this._getItemsForLayout(this.items)
                , n = this._getPackMethod();
            m.forEach(function(a) {
              var b = a.rect;
              this._setRectSize(a.element, b),
                  this.shiftPacker[n](b),
                  this._addShiftTarget(b.x, b.y, h);
              var c = e ? b.x + b.width : b.x
                  , d = e ? b.y : b.y + b.height;
              if (this._addShiftTarget(c, d, h),
                  i)
                for (var f = Math.round(b[g] / i), j = 1; f > j; j++) {
                  var k = e ? c : b.x + i * j
                      , l = e ? b.y + i * j : d;
                  this._addShiftTarget(k, l, h)
                }
            }, this)
          }
          ,
          j._addShiftTarget = function(a, b, c) {
            var d = this._getOption("horizontal") ? b : a;
            if (!(0 !== d && d > c)) {
              var e = a + "," + b
                  , f = -1 != this.shiftTargetKeys.indexOf(e);
              f || (this.shiftTargetKeys.push(e),
                  this.shiftTargets.push({
                    x: a,
                    y: b
                  }))
            }
          }
          ,
          j.shift = function(a, b, c) {
            var d, e = 1 / 0, f = {
              x: b,
              y: c
            };
            this.shiftTargets.forEach(function(a) {
              var b = h(a, f);
              e > b && (d = a,
                  e = b)
            }),
                a.rect.x = d.x,
                a.rect.y = d.y
          }
      ;
      var k = 120;
      j.itemDragMove = function(a, b, c) {
        function d() {
          f.shift(e, b, c),
              e.positionDropPlaceholder(),
              f.layout()
        }
        var e = this.isEnabled && this.getItem(a);
        if (e) {
          b -= this.size.paddingLeft,
              c -= this.size.paddingTop;
          var f = this
              , g = new Date;
          this._itemDragTime && g - this._itemDragTime < k ? (clearTimeout(this.dragTimeout),
              this.dragTimeout = setTimeout(d, k)) : (d(),
              this._itemDragTime = g)
        }
      }
          ,
          j.itemDragEnd = function(a) {
            function b() {
              d++,
              2 == d && (c.element.classList.remove("is-positioning-post-drag"),
                  c.hideDropPlaceholder(),
                  e.dispatchEvent("dragItemPositioned", null, [c]))
            }
            var c = this.isEnabled && this.getItem(a);
            if (c) {
              clearTimeout(this.dragTimeout),
                  c.element.classList.add("is-positioning-post-drag");
              var d = 0
                  , e = this;
              c.once("layout", b),
                  this.once("layoutComplete", b),
                  c.moveTo(c.rect.x, c.rect.y),
                  this.layout(),
                  this.dragItemCount = Math.max(0, this.dragItemCount - 1),
                  this.sortItemsByPosition(),
                  c.disablePlacing(),
                  this.unstamp(c.element)
            }
          }
          ,
          j.bindDraggabillyEvents = function(a) {
            this._bindDraggabillyEvents(a, "on")
          }
          ,
          j.unbindDraggabillyEvents = function(a) {
            this._bindDraggabillyEvents(a, "off")
          }
          ,
          j._bindDraggabillyEvents = function(a, b) {
            var c = this.handleDraggabilly;
            a[b]("dragStart", c.dragStart),
                a[b]("dragMove", c.dragMove),
                a[b]("dragEnd", c.dragEnd)
          }
          ,
          j.bindUIDraggableEvents = function(a) {
            this._bindUIDraggableEvents(a, "on")
          }
          ,
          j.unbindUIDraggableEvents = function(a) {
            this._bindUIDraggableEvents(a, "off")
          }
          ,
          j._bindUIDraggableEvents = function(a, b) {
            var c = this.handleUIDraggable;
            a[b]("dragstart", c.start)[b]("drag", c.drag)[b]("dragstop", c.stop)
          }
      ;
      var l = j.destroy;
      return j.destroy = function() {
        l.apply(this, arguments),
            this.isEnabled = !1
      }
          ,
          i.Rect = c,
          i.Packer = d,
          i
    }),
    function(a, b) {
      "function" == typeof define && define.amd ? define(["isotope-layout/js/layout-mode", "packery/js/packery"], b) : "object" == typeof module && module.exports ? module.exports = b(require("isotope-layout/js/layout-mode"), require("packery")) : b(a.Isotope.LayoutMode, a.Packery)
    }(window, function(a, b) {
      var c = a.create("packery")
          , d = c.prototype
          , e = {
        _getElementOffset: !0,
        _getMeasurement: !0
      };
      for (var f in b.prototype)
        e[f] || (d[f] = b.prototype[f]);
      var g = d._resetLayout;
      d._resetLayout = function() {
        this.packer = this.packer || new b.Packer,
            this.shiftPacker = this.shiftPacker || new b.Packer,
            g.apply(this, arguments)
      }
      ;
      var h = d._getItemLayoutPosition;
      d._getItemLayoutPosition = function(a) {
        return a.rect = a.rect || new b.Rect,
            h.call(this, a)
      }
      ;
      var i = d.needsResizeLayout;
      d.needsResizeLayout = function() {
        return this._getOption("horizontal") ? this.needsVerticalResizeLayout() : i.call(this)
      }
      ;
      var j = d._getOption;
      return d._getOption = function(a) {
        return "horizontal" == a ? void 0 !== this.options.isHorizontal ? this.options.isHorizontal : this.options.horizontal : j.apply(this.isotope, arguments)
      }
          ,
          c
    });
