"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.importRemoteModule = exports.initDynamicScript = exports.loadModule = void 0;
function loadModule(scope, module) {
    var _this = this;
    return function () { return __awaiter(_this, void 0, void 0, function () {
        var container, factory, Module;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                // Initializes the share scope. This fills it with known provided modules from this build and all remotes
                return [4 /*yield*/, __webpack_init_sharing__("default")];
                case 1:
                    // Initializes the share scope. This fills it with known provided modules from this build and all remotes
                    _a.sent();
                    container = window[scope];
                    // Initialize the container, it may provide shared modules
                    return [4 /*yield*/, container.init(__webpack_share_scopes__.default)];
                case 2:
                    // Initialize the container, it may provide shared modules
                    _a.sent();
                    return [4 /*yield*/, window[scope].get(module)];
                case 3:
                    factory = _a.sent();
                    Module = factory();
                    return [2 /*return*/, Module];
            }
        });
    }); };
}
exports.loadModule = loadModule;
var urlCache = new Map();
var initDynamicScript = function (url) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve, reject) {
                if (!url)
                    return reject(new Error("No url provided"));
                if (urlCache.has(url)) {
                    return resolve(urlCache.get(url));
                }
                var element = document.createElement("script");
                element.src = url;
                element.type = "text/javascript";
                element.async = true;
                element.onload = function () {
                    var removeScript = function () {
                        urlCache.delete(url);
                        document.head.removeChild(element);
                    };
                    urlCache.set(url, removeScript);
                    resolve(removeScript);
                };
                element.onerror = function (e) {
                    reject(e);
                };
                document.head.appendChild(element);
            })];
    });
}); };
exports.initDynamicScript = initDynamicScript;
var importRemoteModule = function (_a) {
    var url = _a.url, scope = _a.scope, module = _a.module;
    return __awaiter(void 0, void 0, void 0, function () {
        var removeScript;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, (0, exports.initDynamicScript)(url)];
                case 1:
                    removeScript = _b.sent();
                    return [2 /*return*/, {
                            removeScript: removeScript,
                            loadModule: loadModule(scope, module),
                        }];
            }
        });
    });
};
exports.importRemoteModule = importRemoteModule;
