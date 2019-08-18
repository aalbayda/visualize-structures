// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"canvas.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setTitle = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Initialize canvas
var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth - 200;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d'); // Pointer class

var Pointer = function Pointer(x1, y1, x2, y2, direction) {
  var _this = this;

  _classCallCheck(this, Pointer);

  this.direction = direction;
  this.x1 = x1;
  this.y1 = y1;

  if (this.direction == "right" || this.direction == "left") {
    this.x2 = this.x1;
  } else {
    this.x2 = x2;
  }

  if (this.direction == "up" || this.direction == "down") {
    this.y2 = this.y1;
  } else {
    this.y2 = y2;
  }

  console.log("Initial y2 is " + this.y2);

  this.update = function () {
    if (_this.direction == "right") _this.x2 += 10;else if (_this.direction == "left") _this.x2 -= 10;else if (_this.direction == "up") _this.y2 -= 10;else if (_this.direction == "down") _this.y2 += 10;

    _this.draw();
  };

  this.draw = function () {
    console.log('drawing ' + _this);
    c.beginPath();
    c.moveTo(_this.x1, _this.y1);
    c.lineTo(_this.x2, _this.y2);
    c.stroke();
    c.closePath();
  };
}; // Node class


var Node = // circular head node
function Node(x, y) {
  var _this2 = this;

  _classCallCheck(this, Node);

  this.x = x;
  this.y = y;
  this.r = 0; // Radius

  this.update = function () {
    _this2.r += 1;

    _this2.draw();
  };

  this.moveUp = function () {
    _this2.y -= 1;
  };

  this.moveDown = function () {
    _this2.y += 1;
  };

  this.moveLeft = function () {
    _this2.x -= 1;
  };

  this.moveRight = function () {
    _this2.x += 1;
  };

  this.draw = function () {
    c.beginPath();
    c.arc(_this2.x, _this2.y, _this2.r, 0, Math.PI * 2, false);
    c.fillStyle = "#729454";
    c.shadowOffsetX = c.shadowOffsetY = 5;
    c.shadowBlur = 6;
    c.fill();
    c.stroke();
  };
};

var head = new Node(canvas.width / 2, 150); // Global head
// Head

var newHead = function newHead() {
  var animateHead = function animateHead() {
    var id = requestAnimationFrame(animateHead);

    if (head.r <= 20) {
      head.update();
    } else {
      c.beginPath();
      c.fillStyle = "#000000";
      c.arc(head.x, head.y, 5, 0, Math.PI * 2, false);
      c.fill();
      document.getElementById('btn-push').disabled = false;
      c.font = "16px Helvetica";
      c.fillText("Head (top)", head.x - 100, head.y - 20);
      cancelAnimationFrame(id);
    }
  };

  animateHead();
};

var setTitle = function setTitle(structType) {
  c.clearRect(0, 0, canvas.width, canvas.height);
  c.font = "30px Helvetica, Arial, sans-serif";
  c.fillText(structType, canvas.width / 2, 80);
}; // Stack class


exports.setTitle = setTitle;

var Stack = function Stack() {
  var _this3 = this;

  _classCallCheck(this, Stack);

  this.elements = [];

  this.push = function (e) {
    _this3.elements.push(e);
  };

  this.pop = function () {
    if (_this3.elements.length == 0) return "Underflow";
    return _this3.elements.pop();
  };

  this.peek = function () {
    return _this3.elements[_this3.elements.length - 1];
  };

  this.isEmpty = function () {
    return _this3.elements.length == 0;
  };
};

var stack;

var newStack = function newStack() {
  stack = new Stack();
  stack.push(head);
  c.clearRect(0, 0, canvas.width, canvas.height);
  setTitle("Stack");
  newHead();
  document.querySelector('textarea').innerHTML = "\ntypedef struct Node {\n    int data;\n    struct* next;\n} NODE;\n\nNODE* head = (NODE*)malloc(sizeof(NODE));\nhead = NULL;\n    ";
};

var push = function push(e) {
  var data = Math.round(Math.random() * 100 + 1);
  console.log(stack.isEmpty());
  var node, p;

  if (stack.isEmpty()) {
    node = new Node(head.x, head.y + 100);
    document.getElementById('btn-push').disabled = false;
    document.querySelector('textarea').innerHTML = "\nvoid push(NODE* head, int data) {\n    NODE* newNode =  (NODE*)malloc(sizeof(NODE));\n    newNode->data = data;\n    newNode->next = head;\n    head = newNode;\n}\npush(head, ".concat(data, ");\n");
  } else {
    node = new Node(stack.peek().x, stack.peek().y + 100);
    document.querySelector('textarea').innerHTML = "\nvoid push(NODE* head, int data) {\n    NODE* newNode =  (NODE*)malloc(sizeof(NODE));\n    newNode->data = data;\n    newNode->next = head;\n    head = newNode;\n}\npush(head, ".concat(data, ");\n");
  }

  var animatePointer = function animatePointer() {
    var id = requestAnimationFrame(animatePointer);

    if (p.y2 <= node.y - 15) {
      console.log(p.y2);
      p.update();
    } else {
      c.beginPath();
      c.moveTo(p.x2, p.y2);
      c.lineTo(p.x2 + 5 * Math.cos(45), p.y2 - 5 * Math.sin(45)); // Right arrowhead

      c.stroke();
      c.closePath();
      c.beginPath();
      c.moveTo(p.x2, p.y2);
      c.lineTo(p.x2 - 5 * Math.cos(45), p.y2 - 5 * Math.sin(45)); // Left arrowhead

      c.stroke();
      c.closePath(); // Enable pop

      document.getElementById('btn-pop').disabled = false;
      cancelAnimationFrame(id);
    }
  };

  var animateNode = function animateNode() {
    var id = requestAnimationFrame(animateNode);

    if (node.r <= 20) {
      node.update();
      document.getElementById('btn-push').disabled = true;
    } else {
      c.beginPath();
      c.fillStyle = "#000000";
      c.arc(node.x, node.y, 5, 0, Math.PI * 2, false);
      c.fill(); // Pointer to NULL

      c.beginPath();
      c.fillStyle = "#000000";
      c.arc(node.x, node.y, 5, 0, Math.PI * 2, false);
      c.fill(); // Pointer to arrow

      p = new Pointer(stack.peek().x, stack.peek().y, node.x, node.y - 15, "down");
      animatePointer(); // Label

      c.font = "16px Helvetica";
      c.fillText("int data = ".concat(data, ";"), node.x - 130, node.y - 20);
      cancelAnimationFrame(id);
      stack.push(node);
      document.getElementById('btn-push').disabled = false;
      if (stack.elements.length == 8) document.getElementById('btn-push').disabled = true;
    }
  };

  c.clearRect(stack.peek().x, stack.peek().y + 50, canvas.width, canvas.height);
  c.clearRect(stack.peek().x, stack.peek().y + 50, -canvas.width, canvas.height);
  animateNode();
};

var deleteNode = function deleteNode() {
  var r = 1;

  var animate = function animate() {
    var id = requestAnimationFrame(animate);
    console.log(r);

    if (r <= 20) {
      document.getElementById('btn-pop').disabled = true;
      r += 0.5;
      c.beginPath();
      c.arc(stack.peek().x, stack.peek().y, r, 0, Math.PI * 2, false);
      c.fillStyle = "#FF0000";
      c.fill();
    } else {
      // Erase
      cancelAnimationFrame(id);
      c.clearRect(stack.peek().x, stack.peek().y, canvas.width, canvas.height);
      c.clearRect(stack.peek().x, stack.peek().y, -canvas.width, canvas.height);
      c.clearRect(stack.peek().x, stack.peek().y, -canvas.width, -45);
      c.clearRect(stack.peek().x, stack.peek().y, canvas.width, -45); // New arrowheads

      var fromX = stack.peek().x,
          fromY = stack.peek().y;
      c.beginPath();
      c.moveTo(fromX, fromY - 45);
      c.lineTo(fromX + 5 * Math.cos(45), fromY - 45 - 5 * Math.sin(45)); // Right arrowhead

      c.stroke();
      c.closePath();
      c.beginPath();
      c.moveTo(fromX, fromY - 45);
      c.lineTo(fromX - 5 * Math.cos(45), fromY - 45 - 5 * Math.sin(45)); // Left arrowhead

      c.stroke();
      c.closePath(); // "NULL"

      c.fillText("NULL", fromX - 10, fromY - 30);
      stack.pop();
      if (stack.elements.length > 1) document.getElementById('btn-pop').disabled = false;
      c.fillStyle = "#000";
    }
  };

  animate();
};

var pop = function pop() {
  deleteNode();
  document.querySelector('textarea').innerHTML = "\nint pop(NODE** head) {\n    STACK* temp = *head; \n    *head = (*head)->next; \n    int data = temp->data; \n    free(temp); \n    return data; \n} \npop(&head);\n";
  if (stack.elements.length < 8) document.getElementById('btn-push').disabled = false;
};
/* QUEUES */


var Queue = function Queue() {
  var _this4 = this;

  _classCallCheck(this, Queue);

  this.elements = [];

  this.enqueue = function (e) {
    _this4.elements.unshift(e);
  };

  this.dequeue = function () {
    return _this4.elements.pop();
  };

  this.getFront = function () {
    return _this4.elements[0];
  };

  this.isEmpty = function () {
    return _this4.elements.length == 0;
  };
}; // const enqueue = (e) => {
//     let data = Math.round((Math.random()*100)+1);
//     console.log(queue.isEmpty())
//     let node, p;
//     if (queue.isEmpty()) {
//         node = new Node(head.x, head.y+100);
//         document.getElementById('btn-push').disabled = false;
//         document.querySelector('textarea').innerHTML = `
// void enqueue(NODE* tail, int data) {
//     NODE* newNode =  (NODE*)malloc(sizeof(NODE));
//     newNode->data = data;
//     tail->next = newNode;
//     tail = newNode;
// }
// enqueue(tail, ${data});
// `
//     }
//     else {
//         node = new Node(stack.peek().x, stack.peek().y+100);
//         document.querySelector('textarea').innerHTML = `
// void push(NODE* head, int data) {
//     NODE* newNode =  (NODE*)malloc(sizeof(NODE));
//     newNode->data = data;
//     newNode->next = head;
//     head = newNode;
// }
// push(head, ${data});
// `
//     }
//     const animatePointer = () => {
//         let id = requestAnimationFrame(animatePointer);
//         if (p.y2 <= node.y-15) {
//             console.log(p.y2)
//             p.update();
//         }
//         else {
//             c.beginPath();
//             c.moveTo(p.x2, p.y2);
//             c.lineTo(p.x2+5*Math.cos(45), p.y2-5*Math.sin(45)); // Right arrowhead
//             c.stroke();
//             c.closePath();
//             c.beginPath();
//             c.moveTo(p.x2, p.y2);
//             c.lineTo(p.x2-5*Math.cos(45), p.y2-5*Math.sin(45)); // Left arrowhead
//             c.stroke();
//             c.closePath();
//             // Enable pop
//             document.getElementById('btn-pop').disabled = false;
//             cancelAnimationFrame(id);
//         }
//     }
//     const animateNode = () => {
//         let id = requestAnimationFrame(animateNode);
//         if (node.r <= 20) {
//             node.update();
//             document.getElementById('btn-push').disabled = true;
//         }
//         else {
//             c.beginPath();
//             c.fillStyle = "#000000";
//             c.arc(node.x, node.y, 5, 0, Math.PI*2, false);
//             c.fill();
//             // Pointer to NULL
//             c.beginPath();
//             c.fillStyle = "#000000";
//             c.arc(node.x, node.y, 5, 0, Math.PI*2, false);
//             c.fill();
//             // Pointer to arrow
//             p = new Pointer(stack.peek().x, stack.peek().y, node.x, node.y-15, "down");
//             animatePointer();
//             // Label
//             c.font = "16px Helvetica";
//             c.fillText(`int data = ${data};`, node.x-130, node.y-20);
//             cancelAnimationFrame(id);
//             stack.push(node);
//             document.getElementById('btn-push').disabled = false;
//             if (stack.elements.length == 8)
//                 document.getElementById('btn-push').disabled = true;
//         }
//     }
//     c.clearRect(stack.peek().x, stack.peek().y+50, canvas.width, canvas.height);
//     c.clearRect(stack.peek().x, stack.peek().y+50, -canvas.width, canvas.height);
//     animateNode();
// }
// const deleteNode = () => {
//     let r = 1;
//     const animate = () => {
//         let id = requestAnimationFrame(animate);
//         console.log(r)
//         if (r <= 20) {
//             document.getElementById('btn-pop').disabled = true;
//             r += 0.5;
//             c.beginPath();
//             c.arc(stack.peek().x, stack.peek().y, r, 0, Math.PI*2, false);
//             c.fillStyle = "#FF0000";
//             c.fill();
//         }
//         else {
//             // Erase
//             cancelAnimationFrame(id);
//             c.clearRect(stack.peek().x, stack.peek().y, canvas.width, canvas.height);
//             c.clearRect(stack.peek().x, stack.peek().y, -canvas.width, canvas.height);
//             c.clearRect(stack.peek().x, stack.peek().y, -canvas.width, -45);
//             c.clearRect(stack.peek().x, stack.peek().y, canvas.width, -45);
//             // New arrowheads
//             let fromX = stack.peek().x, fromY = stack.peek().y;
//             c.beginPath();
//             c.moveTo(fromX, fromY-45);
//             c.lineTo(fromX+5*Math.cos(45), (fromY-45)-5*Math.sin(45)); // Right arrowhead
//             c.stroke();
//             c.closePath();
//             c.beginPath();
//             c.moveTo(fromX, fromY-45);
//             c.lineTo(fromX-5*Math.cos(45), (fromY-45)-5*Math.sin(45)); // Left arrowhead
//             c.stroke();
//             c.closePath();
//             // "NULL"
//             c.fillText("NULL", fromX-10, fromY-30);
//             stack.pop();
//             if (stack.elements.length > 1)
//                 document.getElementById('btn-pop').disabled = false;
//             c.fillStyle = "#000"
//         }
//     }
//     animate();
// }
},{}],"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51922" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","canvas.js"], null)
//# sourceMappingURL=/canvas.00467ef7.js.map