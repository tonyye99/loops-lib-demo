var loops;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@stripe/stripe-js/dist/stripe.esm.js":
/*!***********************************************************!*\
  !*** ./node_modules/@stripe/stripe-js/dist/stripe.esm.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadStripe": () => (/* binding */ loadStripe)
/* harmony export */ });
var V3_URL = 'https://js.stripe.com/v3';
var V3_URL_REGEX = /^https:\/\/js\.stripe\.com\/v3\/?(\?.*)?$/;
var EXISTING_SCRIPT_MESSAGE = 'loadStripe.setLoadParameters was called but an existing Stripe.js script already exists in the document; existing script parameters will be used';
var findScript = function findScript() {
  var scripts = document.querySelectorAll("script[src^=\"".concat(V3_URL, "\"]"));

  for (var i = 0; i < scripts.length; i++) {
    var script = scripts[i];

    if (!V3_URL_REGEX.test(script.src)) {
      continue;
    }

    return script;
  }

  return null;
};

var injectScript = function injectScript(params) {
  var queryString = params && !params.advancedFraudSignals ? '?advancedFraudSignals=false' : '';
  var script = document.createElement('script');
  script.src = "".concat(V3_URL).concat(queryString);
  var headOrBody = document.head || document.body;

  if (!headOrBody) {
    throw new Error('Expected document.body not to be null. Stripe.js requires a <body> element.');
  }

  headOrBody.appendChild(script);
  return script;
};

var registerWrapper = function registerWrapper(stripe, startTime) {
  if (!stripe || !stripe._registerWrapper) {
    return;
  }

  stripe._registerWrapper({
    name: 'stripe-js',
    version: "1.46.0",
    startTime: startTime
  });
};

var stripePromise = null;
var loadScript = function loadScript(params) {
  // Ensure that we only attempt to load Stripe.js at most once
  if (stripePromise !== null) {
    return stripePromise;
  }

  stripePromise = new Promise(function (resolve, reject) {
    if (typeof window === 'undefined') {
      // Resolve to null when imported server side. This makes the module
      // safe to import in an isomorphic code base.
      resolve(null);
      return;
    }

    if (window.Stripe && params) {
      console.warn(EXISTING_SCRIPT_MESSAGE);
    }

    if (window.Stripe) {
      resolve(window.Stripe);
      return;
    }

    try {
      var script = findScript();

      if (script && params) {
        console.warn(EXISTING_SCRIPT_MESSAGE);
      } else if (!script) {
        script = injectScript(params);
      }

      script.addEventListener('load', function () {
        if (window.Stripe) {
          resolve(window.Stripe);
        } else {
          reject(new Error('Stripe.js not available'));
        }
      });
      script.addEventListener('error', function () {
        reject(new Error('Failed to load Stripe.js'));
      });
    } catch (error) {
      reject(error);
      return;
    }
  });
  return stripePromise;
};
var initStripe = function initStripe(maybeStripe, args, startTime) {
  if (maybeStripe === null) {
    return null;
  }

  var stripe = maybeStripe.apply(undefined, args);
  registerWrapper(stripe, startTime);
  return stripe;
}; // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types

// own script injection.

var stripePromise$1 = Promise.resolve().then(function () {
  return loadScript(null);
});
var loadCalled = false;
stripePromise$1["catch"](function (err) {
  if (!loadCalled) {
    console.warn(err);
  }
});
var loadStripe = function loadStripe() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  loadCalled = true;
  var startTime = Date.now();
  return stripePromise$1.then(function (maybeStripe) {
    return initStripe(maybeStripe, args, startTime);
  });
};




/***/ }),

/***/ "./src/elements/modal.ts":
/*!*******************************!*\
  !*** ./src/elements/modal.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createModal": () => (/* binding */ createModal),
/* harmony export */   "hideLoader": () => (/* binding */ hideLoader),
/* harmony export */   "hideModal": () => (/* binding */ hideModal),
/* harmony export */   "initStripe": () => (/* binding */ initStripe),
/* harmony export */   "showButtonLoader": () => (/* binding */ showButtonLoader),
/* harmony export */   "showLoader": () => (/* binding */ showLoader),
/* harmony export */   "showMessage": () => (/* binding */ showMessage),
/* harmony export */   "showModal": () => (/* binding */ showModal)
/* harmony export */ });
function createModal() {
    // style tag
    var css = "\n      .loops-purchase-modal {\n          position: fixed;\n          top: 50%;\n          left: 50%;\n          transform: translate(-50%, -50%);\n          width: 100%;\n          height: 100%;\n          display: flex;\n          align-items: center;\n          justify-content: center;\n          background-color: rgba(0, 0, 0, 0.4);\n      }\n\n      .loops-purchase-modal-content {\n        background-color: #fefefe;\n        width: 50%;\n        border-radius: 10px;\n        max-height: 90vh;\n        overflow-y: auto;\n      }\n\n      .title {\n        font-size: 20px;\n        font-weight: bold;\n        padding: 20px;\n      }\n\n      form {\n        min-width: 500px;\n        align-self: center;\n        box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),\n          0px 2px 5px 0px rgba(50, 50, 93, 0.1), 0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);\n        border-radius: 7px;\n        padding: 40px;\n      }\n\n      .hidden {\n        display: none!important;\n      }\n\n      #payment-message {\n        color: rgb(105, 115, 134);\n        font-size: 16px;\n        line-height: 20px;\n        padding-top: 12px;\n        text-align: center;\n      }\n\n      #link-authentication-element {\n        margin-bottom: 24px;\n      }\n\n      #payment-element {\n        margin-bottom: 24px;\n      }\n\n      #address-element {\n        margin-bottom: 24px;\n      }\n\n      /* Buttons and links */\n      #submit {\n        background: #5469d4;\n        font-family: Arial, sans-serif;\n        color: #ffffff;\n        border-radius: 4px;\n        border: 0;\n        padding: 12px 16px;\n        font-size: 16px;\n        font-weight: 600;\n        cursor: pointer;\n        display: block;\n        transition: all 0.2s ease;\n        box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);\n        width: 100%;\n      }\n      #submit:hover {\n        filter: contrast(115%);\n      }\n      #submit:disabled {\n        opacity: 0.5;\n        cursor: default;\n      }\n\n      #cancel {\n        background: white;\n        font-family: Arial, sans-serif;\n        border-radius: 4px;\n        border: 0;\n        padding: 12px 16px;\n        font-size: 16px;\n        font-weight: 600;\n        margin-top: 10px;\n        cursor: pointer;\n        display: block;\n        transition: all 0.2s ease;\n        box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);\n        width: 100%;\n      }\n      #cancel:hover {\n        filter: contrast(115%);\n      }\n      #cancel:disabled {\n        opacity: 0.5;\n        cursor: default;\n      }\n\n      /* spinner/processing state, errors */\n      .spinner,\n      .spinner:before,\n      .spinner:after {\n        border-radius: 50%;\n      }\n      .spinner {\n        color: #ffffff;\n        font-size: 22px;\n        text-indent: -99999px;\n        margin: 0px auto;\n        position: relative;\n        width: 20px;\n        height: 20px;\n        box-shadow: inset 0 0 0 2px;\n        -webkit-transform: translateZ(0);\n        -ms-transform: translateZ(0);\n        transform: translateZ(0);\n      }\n      .spinner:before,\n      .spinner:after {\n        position: absolute;\n        content: \"\";\n      }\n      .spinner:before {\n        width: 10.4px;\n        height: 20.4px;\n        background: #5469d4;\n        border-radius: 20.4px 0 0 20.4px;\n        top: -0.2px;\n        left: -0.2px;\n        -webkit-transform-origin: 10.4px 10.2px;\n        transform-origin: 10.4px 10.2px;\n        -webkit-animation: loading 2s infinite ease 1.5s;\n        animation: loading 2s infinite ease 1.5s;\n      }\n      .spinner:after {\n        width: 10.4px;\n        height: 10.2px;\n        background: #5469d4;\n        border-radius: 0 10.2px 10.2px 0;\n        top: -0.1px;\n        left: 10.2px;\n        -webkit-transform-origin: 0px 10.2px;\n        transform-origin: 0px 10.2px;\n        -webkit-animation: loading 2s infinite ease;\n        animation: loading 2s infinite ease;\n      }\n\n      @-webkit-keyframes loading {\n        0% {\n          -webkit-transform: rotate(0deg);\n          transform: rotate(0deg);\n        }\n        100% {\n          -webkit-transform: rotate(360deg);\n          transform: rotate(360deg);\n        }\n      }\n      @keyframes loading {\n        0% {\n          -webkit-transform: rotate(0deg);\n          transform: rotate(0deg);\n        }\n        100% {\n          -webkit-transform: rotate(360deg);\n          transform: rotate(360deg);\n        }\n      }\n\n      @media only screen and (max-width: 600px) {\n        form {\n          width: 80vw;\n          min-width: initial;\n        }\n      }\n\n      .lds-spinner {\n        color: official;\n        display: block;\n        position: relative;\n        width: 80px;\n        height: 80px;\n        margin: auto;\n      }\n      .lds-spinner div {\n        transform-origin: 40px 40px;\n        animation: lds-spinner 1.2s linear infinite;\n      }\n      .lds-spinner div:after {\n        content: \" \";\n        display: block;\n        position: absolute;\n        top: 3px;\n        left: 37px;\n        width: 6px;\n        height: 18px;\n        border-radius: 20%;\n        background: black;\n      }\n      .lds-spinner div:nth-child(1) {\n        transform: rotate(0deg);\n        animation-delay: -1.1s;\n      }\n      .lds-spinner div:nth-child(2) {\n        transform: rotate(30deg);\n        animation-delay: -1s;\n      }\n      .lds-spinner div:nth-child(3) {\n        transform: rotate(60deg);\n        animation-delay: -0.9s;\n      }\n      .lds-spinner div:nth-child(4) {\n        transform: rotate(90deg);\n        animation-delay: -0.8s;\n      }\n      .lds-spinner div:nth-child(5) {\n        transform: rotate(120deg);\n        animation-delay: -0.7s;\n      }\n      .lds-spinner div:nth-child(6) {\n        transform: rotate(150deg);\n        animation-delay: -0.6s;\n      }\n      .lds-spinner div:nth-child(7) {\n        transform: rotate(180deg);\n        animation-delay: -0.5s;\n      }\n      .lds-spinner div:nth-child(8) {\n        transform: rotate(210deg);\n        animation-delay: -0.4s;\n      }\n      .lds-spinner div:nth-child(9) {\n        transform: rotate(240deg);\n        animation-delay: -0.3s;\n      }\n      .lds-spinner div:nth-child(10) {\n        transform: rotate(270deg);\n        animation-delay: -0.2s;\n      }\n      .lds-spinner div:nth-child(11) {\n        transform: rotate(300deg);\n        animation-delay: -0.1s;\n      }\n      .lds-spinner div:nth-child(12) {\n        transform: rotate(330deg);\n        animation-delay: 0s;\n      }\n      @keyframes lds-spinner {\n        0% {\n          opacity: 1;\n        }\n        100% {\n          opacity: 0;\n        }\n      }\n\n\n    ";
    if (!document.querySelector("style[data-loops]")) {
        var style = document.createElement("style");
        style.setAttribute("data-loops", "");
        style.innerHTML = css;
        document.head.appendChild(style);
    }
    // modal
    var modal = "\n      <div class=\"loops-purchase-modal\">\n        <div class=\"loops-purchase-modal-content\">\n\n        <div class=\"lds-spinner hidden\"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>\n\n          <form id=\"payment-form\">\n\n            <div id=\"link-authentication-element\"></div>\n\n            <div id=\"payment-element\"></div>\n\n            <div id=\"address-element\"></div>\n\n            <div id=\"payment-message\" class=\"hidden\"></div>\n\n            <button id=\"submit\">\n              <div class=\"spinner hidden\" id=\"spinner\"></div>\n              <span id=\"button-text\">Pay now</span>\n            </button>\n\n            <button id=\"cancel\" type=\"button\">\n              <span id=\"button-text\">Cancel</span>\n            </button>\n\n          </form>\n        </div>\n      </div>\n    ";
    if (!document.querySelector(".loops-purchase-modal")) {
        var div = document.createElement("div");
        div.innerHTML = modal;
        document.body.appendChild(div);
    }
}
function hideModal() {
    document.querySelector(".loops-purchase-modal").classList.add("hidden");
}
function showModal() {
    document.querySelector(".loops-purchase-modal").classList.remove("hidden");
    document.body.style.overflow = "hidden";
}
function initStripe() {
    if (!document.querySelector('script[src="https://js.stripe.com/v3/"]')) {
        var script = document.createElement("script");
        script.setAttribute("src", "https://js.stripe.com/v3/");
        document.head.appendChild(script);
    }
}
function showButtonLoader(isLoading) {
    if (isLoading === true) {
        document.querySelector("button").disabled = true;
        document.querySelector("#spinner").classList.remove("hidden");
        document.querySelector("#button-text").classList.add("hidden");
    }
    else {
        document.querySelector("button").disabled = false;
        document.querySelector("#spinner").classList.add("hidden");
        document.querySelector("#button-text").classList.remove("hidden");
    }
}
function showLoader() {
    document.querySelector(".lds-spinner").classList.remove("hidden");
    document.querySelector("#payment-form").classList.add("hidden");
}
function hideLoader() {
    document.querySelector(".lds-spinner").classList.add("hidden");
    document.querySelector("#payment-form").classList.remove("hidden");
}
function showMessage(messageText) {
    var messageContainer = document.querySelector("#payment-message");
    messageContainer.classList.remove("hidden");
    messageContainer.textContent = messageText;
    setTimeout(function () {
        messageContainer.classList.add("hidden");
        messageContainer.textContent = "";
    }, 4000);
}


/***/ }),

/***/ "./src/elements/stripe-elements.ts":
/*!*****************************************!*\
  !*** ./src/elements/stripe-elements.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createAddressElement": () => (/* binding */ createAddressElement),
/* harmony export */   "createLinkAuthenticationElement": () => (/* binding */ createLinkAuthenticationElement),
/* harmony export */   "createPaymentElement": () => (/* binding */ createPaymentElement),
/* harmony export */   "removeIframes": () => (/* binding */ removeIframes)
/* harmony export */ });
function createLinkAuthenticationElement(elements) {
    var linkAuthenticationElement = elements.create("linkAuthentication");
    linkAuthenticationElement.mount("#link-authentication-element");
    return linkAuthenticationElement;
}
function createPaymentElement(elements) {
    var paymentElement = elements.create("payment", {
        layout: "tabs",
    });
    paymentElement.mount("#payment-element");
    return paymentElement;
}
function createAddressElement(elements) {
    var addressElement = elements.create("address", {
        mode: "shipping",
        allowedCountries: ["JP"],
        fields: {
            phone: "always",
        },
    });
    addressElement.mount("#address-element");
    return addressElement;
}
function removeIframes() {
    var iframes = document.querySelectorAll('iframe[name^="__privateStripeController"]');
    iframes.forEach(function (iframe) {
        iframe.remove();
    });
}


/***/ }),

/***/ "./src/loops.ts":
/*!**********************!*\
  !*** ./src/loops.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ initialize)
/* harmony export */ });
/* harmony import */ var _service_loops_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./service/loops-api */ "./src/service/loops-api.ts");
/* harmony import */ var _elements_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./elements/modal */ "./src/elements/modal.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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


function initialize(clientId, clientSecret) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, token, storeId, stripeAccountId;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!clientId || !clientSecret) {
                        throw new Error("Client ID or Client Secret is not provided");
                    }
                    return [4 /*yield*/, (0,_service_loops_api__WEBPACK_IMPORTED_MODULE_0__.getCredentials)(clientId, clientSecret)];
                case 1:
                    _a = _b.sent(), token = _a.token, storeId = _a.storeId, stripeAccountId = _a.stripeAccountId;
                    localStorage.setItem("loops-token", token);
                    localStorage.setItem("loops-store-id", storeId);
                    localStorage.setItem("loops-stripe-account-id", stripeAccountId);
                    (0,_elements_modal__WEBPACK_IMPORTED_MODULE_1__.createModal)();
                    (0,_elements_modal__WEBPACK_IMPORTED_MODULE_1__.hideModal)();
                    return [2 /*return*/];
            }
        });
    });
}


/***/ }),

/***/ "./src/purchase/single.ts":
/*!********************************!*\
  !*** ./src/purchase/single.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "singlePurchase": () => (/* binding */ singlePurchase)
/* harmony export */ });
/* harmony import */ var _stripe_stripe_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @stripe/stripe-js */ "./node_modules/@stripe/stripe-js/dist/stripe.esm.js");
/* harmony import */ var _service_loops_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../service/loops-api */ "./src/service/loops-api.ts");
/* harmony import */ var _elements_stripe_elements__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../elements/stripe-elements */ "./src/elements/stripe-elements.ts");
/* harmony import */ var _elements_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../elements/modal */ "./src/elements/modal.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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




var singlePurchase = function (plan) { return __awaiter(void 0, void 0, void 0, function () {
    var clientSecret, secret, error_1, stripeAccountId, stripe, emailAddress, address, elements, linkAuthenticationEl, cancelButtonEl, form;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!plan.price) {
                    throw new Error("No price");
                }
                (0,_elements_modal__WEBPACK_IMPORTED_MODULE_3__.showModal)();
                (0,_elements_modal__WEBPACK_IMPORTED_MODULE_3__.showLoader)();
                clientSecret = "";
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0,_service_loops_api__WEBPACK_IMPORTED_MODULE_1__.createStripePaymentIntent)(plan.price)];
            case 2:
                secret = (_a.sent()).clientSecret;
                clientSecret = secret;
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                throw new Error(error_1);
            case 4:
                if (!clientSecret) {
                    throw new Error("No client secret");
                }
                stripeAccountId = localStorage.getItem("loops-stripe-account-id");
                return [4 /*yield*/, (0,_stripe_stripe_js__WEBPACK_IMPORTED_MODULE_0__.loadStripe)("pk_test_51IcNIEBin9HfPevgFeVBbBTZoGKs1nxLTXk8dwwbXAChVpM7fAj5iKnnCpi7WENU6CQf9L1wGNoIgToZxvwy62PI00agu56lbs", {
                        stripeAccount: stripeAccountId,
                    })];
            case 5:
                stripe = _a.sent();
                emailAddress = "";
                address = {};
                elements = stripe.elements({
                    appearance: {
                        theme: "stripe",
                    },
                    clientSecret: clientSecret,
                });
                linkAuthenticationEl = (0,_elements_stripe_elements__WEBPACK_IMPORTED_MODULE_2__.createLinkAuthenticationElement)(elements);
                linkAuthenticationEl.on("change", function (event) {
                    if (event.error) {
                        console.log(event.error);
                    }
                    else {
                        emailAddress = event.value.email;
                    }
                });
                (0,_elements_stripe_elements__WEBPACK_IMPORTED_MODULE_2__.createPaymentElement)(elements);
                (0,_elements_stripe_elements__WEBPACK_IMPORTED_MODULE_2__.createAddressElement)(elements);
                cancelButtonEl = document.querySelector("#cancel");
                cancelButtonEl === null || cancelButtonEl === void 0 ? void 0 : cancelButtonEl.addEventListener("click", function (e) {
                    e.preventDefault();
                    (0,_elements_stripe_elements__WEBPACK_IMPORTED_MODULE_2__.removeIframes)();
                    (0,_elements_modal__WEBPACK_IMPORTED_MODULE_3__.hideModal)();
                });
                (0,_elements_modal__WEBPACK_IMPORTED_MODULE_3__.hideLoader)();
                form = document.getElementById("payment-form");
                form.addEventListener("submit", function (event) { return __awaiter(void 0, void 0, void 0, function () {
                    var error, addressElement, _a, complete, value, status_1, error_2;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                event.preventDefault();
                                (0,_elements_modal__WEBPACK_IMPORTED_MODULE_3__.showButtonLoader)(true);
                                return [4 /*yield*/, stripe.confirmPayment({
                                        elements: elements,
                                        confirmParams: {
                                            return_url: "",
                                        },
                                        redirect: "if_required",
                                    })];
                            case 1:
                                error = (_b.sent()).error;
                                if (!error) return [3 /*break*/, 2];
                                if ((error === null || error === void 0 ? void 0 : error.type) === "card_error" || (error === null || error === void 0 ? void 0 : error.type) === "validation_error") {
                                    (0,_elements_modal__WEBPACK_IMPORTED_MODULE_3__.showMessage)(error.message);
                                }
                                else {
                                    (0,_elements_modal__WEBPACK_IMPORTED_MODULE_3__.showMessage)("An unexpected error occurred.");
                                }
                                return [3 /*break*/, 8];
                            case 2:
                                addressElement = elements.getElement("address");
                                return [4 /*yield*/, addressElement.getValue()];
                            case 3:
                                _a = _b.sent(), complete = _a.complete, value = _a.value;
                                if (complete) {
                                    address = value;
                                }
                                _b.label = 4;
                            case 4:
                                _b.trys.push([4, 6, 7, 8]);
                                return [4 /*yield*/, (0,_service_loops_api__WEBPACK_IMPORTED_MODULE_1__.createLoopsSubscription)(address, plan, emailAddress)];
                            case 5:
                                status_1 = (_b.sent()).status;
                                if (status_1 === "success") {
                                    (0,_elements_modal__WEBPACK_IMPORTED_MODULE_3__.showMessage)("Subscription created successfully");
                                }
                                return [3 /*break*/, 8];
                            case 6:
                                error_2 = _b.sent();
                                (0,_elements_modal__WEBPACK_IMPORTED_MODULE_3__.showMessage)("An unexpected error occurred.");
                                return [3 /*break*/, 8];
                            case 7:
                                (0,_elements_modal__WEBPACK_IMPORTED_MODULE_3__.showButtonLoader)(false);
                                (0,_elements_stripe_elements__WEBPACK_IMPORTED_MODULE_2__.removeIframes)();
                                (0,_elements_modal__WEBPACK_IMPORTED_MODULE_3__.hideModal)();
                                return [7 /*endfinally*/];
                            case 8: return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
        }
    });
}); };



/***/ }),

/***/ "./src/service/loops-api.ts":
/*!**********************************!*\
  !*** ./src/service/loops-api.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createLoopsSubscription": () => (/* binding */ createLoopsSubscription),
/* harmony export */   "createStripePaymentIntent": () => (/* binding */ createStripePaymentIntent),
/* harmony export */   "getCredentials": () => (/* binding */ getCredentials)
/* harmony export */ });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
// const apiUrl =
//   "http://loops-server-alb-1090889888.ap-northeast-2.elb.amazonaws.com";
var apiUrl = "http://localhost:8080";
function getCredentials(clientId, clientSecret) {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!clientId || !clientSecret) {
                        throw new Error("Client ID or Client Secret is not provided");
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch("".concat(apiUrl, "/api/v1/auth/basic"), {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                client_id: clientId,
                                client_secret: clientSecret,
                            }),
                        })];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    return [2 /*return*/, data];
                case 4:
                    error_1 = _a.sent();
                    throw new Error(error_1);
                case 5: return [2 /*return*/];
            }
        });
    });
}
function createStripePaymentIntent(amount) {
    return __awaiter(this, void 0, void 0, function () {
        var token, response, data, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    token = localStorage.getItem("loops-token");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch("".concat(apiUrl, "/api/v1/merchant/create-payment-intent"), {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: "Bearer ".concat(token),
                            },
                            body: JSON.stringify({
                                amount: amount,
                            }),
                        })];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    return [2 /*return*/, data];
                case 4:
                    error_2 = _a.sent();
                    throw new Error(error_2);
                case 5: return [2 /*return*/];
            }
        });
    });
}
function createLoopsSubscription(address, plan, email) {
    return __awaiter(this, void 0, void 0, function () {
        var token, merchant_id, firstName, lastName, body, response, data, error_3;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    token = localStorage.getItem("loops-token");
                    merchant_id = localStorage.getItem("loops-store-id");
                    if (address.name.indexOf(" ") !== -1) {
                        _a = address.name.split(" "), firstName = _a[0], lastName = _a[1];
                    }
                    else {
                        firstName = address.name;
                        lastName = "";
                    }
                    body = {
                        id: "2c6e239a-f02b-d158-2833-c7f883bb5530",
                        merchant_id: merchant_id.toString(),
                        products_variant: [
                            {
                                product_type: "plan",
                                id: plan.key.toString(),
                                num: 1,
                                option: "商品ごとのメモを管理",
                            },
                        ],
                        customer_information: {
                            address2: address.address.line2 || "",
                            address1: address.address.line1 || "",
                            city: address.address.city,
                            pref: address.address.state,
                            zipcode: address.address.postal_code,
                            first_name: firstName,
                            last_name: lastName,
                            email: email,
                            tel: address.phone,
                        },
                        shipping_information: {
                            address2: address.address.line2 || "",
                            address1: address.address.line1 || "",
                            city: address.address.city,
                            pref: address.address.state,
                            zipcode: address.address.postal_code,
                            first_name: firstName,
                            last_name: lastName,
                            tel: address.phone,
                        },
                        options: {
                            shipping: "0(通常配送) / 1(無料配送)",
                            coupon: "",
                            payment: "stripe",
                            callback_url: "https://localhost:4000",
                        },
                    };
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch("".concat(apiUrl, "/api/v1/orders/create"), {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: "Basic ".concat(token),
                            },
                            body: JSON.stringify(body),
                        })];
                case 2:
                    response = _b.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _b.sent();
                    return [2 /*return*/, data];
                case 4:
                    error_3 = _b.sent();
                    throw new Error(error_3);
                case 5: return [2 /*return*/];
            }
        });
    });
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "initialize": () => (/* reexport safe */ _loops__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   "singlePurchase": () => (/* reexport safe */ _purchase_single__WEBPACK_IMPORTED_MODULE_1__.singlePurchase)
/* harmony export */ });
/* harmony import */ var _loops__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./loops */ "./src/loops.ts");
/* harmony import */ var _purchase_single__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./purchase/single */ "./src/purchase/single.ts");




})();

loops = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDs7Ozs7OztVQzVMQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOaUM7QUFDa0I7QUFDN0IiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9sb29wcy8uL25vZGVfbW9kdWxlcy9Ac3RyaXBlL3N0cmlwZS1qcy9kaXN0L3N0cmlwZS5lc20uanMiLCJ3ZWJwYWNrOi8vbG9vcHMvLi9zcmMvZWxlbWVudHMvbW9kYWwudHMiLCJ3ZWJwYWNrOi8vbG9vcHMvLi9zcmMvZWxlbWVudHMvc3RyaXBlLWVsZW1lbnRzLnRzIiwid2VicGFjazovL2xvb3BzLy4vc3JjL2xvb3BzLnRzIiwid2VicGFjazovL2xvb3BzLy4vc3JjL3B1cmNoYXNlL3NpbmdsZS50cyIsIndlYnBhY2s6Ly9sb29wcy8uL3NyYy9zZXJ2aWNlL2xvb3BzLWFwaS50cyIsIndlYnBhY2s6Ly9sb29wcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9sb29wcy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbG9vcHMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9sb29wcy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2xvb3BzLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBWM19VUkwgPSAnaHR0cHM6Ly9qcy5zdHJpcGUuY29tL3YzJztcbnZhciBWM19VUkxfUkVHRVggPSAvXmh0dHBzOlxcL1xcL2pzXFwuc3RyaXBlXFwuY29tXFwvdjNcXC8/KFxcPy4qKT8kLztcbnZhciBFWElTVElOR19TQ1JJUFRfTUVTU0FHRSA9ICdsb2FkU3RyaXBlLnNldExvYWRQYXJhbWV0ZXJzIHdhcyBjYWxsZWQgYnV0IGFuIGV4aXN0aW5nIFN0cmlwZS5qcyBzY3JpcHQgYWxyZWFkeSBleGlzdHMgaW4gdGhlIGRvY3VtZW50OyBleGlzdGluZyBzY3JpcHQgcGFyYW1ldGVycyB3aWxsIGJlIHVzZWQnO1xudmFyIGZpbmRTY3JpcHQgPSBmdW5jdGlvbiBmaW5kU2NyaXB0KCkge1xuICB2YXIgc2NyaXB0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJzY3JpcHRbc3JjXj1cXFwiXCIuY29uY2F0KFYzX1VSTCwgXCJcXFwiXVwiKSk7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzY3JpcHRzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHNjcmlwdCA9IHNjcmlwdHNbaV07XG5cbiAgICBpZiAoIVYzX1VSTF9SRUdFWC50ZXN0KHNjcmlwdC5zcmMpKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gc2NyaXB0O1xuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59O1xuXG52YXIgaW5qZWN0U2NyaXB0ID0gZnVuY3Rpb24gaW5qZWN0U2NyaXB0KHBhcmFtcykge1xuICB2YXIgcXVlcnlTdHJpbmcgPSBwYXJhbXMgJiYgIXBhcmFtcy5hZHZhbmNlZEZyYXVkU2lnbmFscyA/ICc/YWR2YW5jZWRGcmF1ZFNpZ25hbHM9ZmFsc2UnIDogJyc7XG4gIHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgc2NyaXB0LnNyYyA9IFwiXCIuY29uY2F0KFYzX1VSTCkuY29uY2F0KHF1ZXJ5U3RyaW5nKTtcbiAgdmFyIGhlYWRPckJvZHkgPSBkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmJvZHk7XG5cbiAgaWYgKCFoZWFkT3JCb2R5KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCBkb2N1bWVudC5ib2R5IG5vdCB0byBiZSBudWxsLiBTdHJpcGUuanMgcmVxdWlyZXMgYSA8Ym9keT4gZWxlbWVudC4nKTtcbiAgfVxuXG4gIGhlYWRPckJvZHkuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiAgcmV0dXJuIHNjcmlwdDtcbn07XG5cbnZhciByZWdpc3RlcldyYXBwZXIgPSBmdW5jdGlvbiByZWdpc3RlcldyYXBwZXIoc3RyaXBlLCBzdGFydFRpbWUpIHtcbiAgaWYgKCFzdHJpcGUgfHwgIXN0cmlwZS5fcmVnaXN0ZXJXcmFwcGVyKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgc3RyaXBlLl9yZWdpc3RlcldyYXBwZXIoe1xuICAgIG5hbWU6ICdzdHJpcGUtanMnLFxuICAgIHZlcnNpb246IFwiMS40Ni4wXCIsXG4gICAgc3RhcnRUaW1lOiBzdGFydFRpbWVcbiAgfSk7XG59O1xuXG52YXIgc3RyaXBlUHJvbWlzZSA9IG51bGw7XG52YXIgbG9hZFNjcmlwdCA9IGZ1bmN0aW9uIGxvYWRTY3JpcHQocGFyYW1zKSB7XG4gIC8vIEVuc3VyZSB0aGF0IHdlIG9ubHkgYXR0ZW1wdCB0byBsb2FkIFN0cmlwZS5qcyBhdCBtb3N0IG9uY2VcbiAgaWYgKHN0cmlwZVByb21pc2UgIT09IG51bGwpIHtcbiAgICByZXR1cm4gc3RyaXBlUHJvbWlzZTtcbiAgfVxuXG4gIHN0cmlwZVByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAvLyBSZXNvbHZlIHRvIG51bGwgd2hlbiBpbXBvcnRlZCBzZXJ2ZXIgc2lkZS4gVGhpcyBtYWtlcyB0aGUgbW9kdWxlXG4gICAgICAvLyBzYWZlIHRvIGltcG9ydCBpbiBhbiBpc29tb3JwaGljIGNvZGUgYmFzZS5cbiAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHdpbmRvdy5TdHJpcGUgJiYgcGFyYW1zKSB7XG4gICAgICBjb25zb2xlLndhcm4oRVhJU1RJTkdfU0NSSVBUX01FU1NBR0UpO1xuICAgIH1cblxuICAgIGlmICh3aW5kb3cuU3RyaXBlKSB7XG4gICAgICByZXNvbHZlKHdpbmRvdy5TdHJpcGUpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICB2YXIgc2NyaXB0ID0gZmluZFNjcmlwdCgpO1xuXG4gICAgICBpZiAoc2NyaXB0ICYmIHBhcmFtcykge1xuICAgICAgICBjb25zb2xlLndhcm4oRVhJU1RJTkdfU0NSSVBUX01FU1NBR0UpO1xuICAgICAgfSBlbHNlIGlmICghc2NyaXB0KSB7XG4gICAgICAgIHNjcmlwdCA9IGluamVjdFNjcmlwdChwYXJhbXMpO1xuICAgICAgfVxuXG4gICAgICBzY3JpcHQuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHdpbmRvdy5TdHJpcGUpIHtcbiAgICAgICAgICByZXNvbHZlKHdpbmRvdy5TdHJpcGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoJ1N0cmlwZS5qcyBub3QgYXZhaWxhYmxlJykpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHNjcmlwdC5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmVqZWN0KG5ldyBFcnJvcignRmFpbGVkIHRvIGxvYWQgU3RyaXBlLmpzJykpO1xuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIHN0cmlwZVByb21pc2U7XG59O1xudmFyIGluaXRTdHJpcGUgPSBmdW5jdGlvbiBpbml0U3RyaXBlKG1heWJlU3RyaXBlLCBhcmdzLCBzdGFydFRpbWUpIHtcbiAgaWYgKG1heWJlU3RyaXBlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICB2YXIgc3RyaXBlID0gbWF5YmVTdHJpcGUuYXBwbHkodW5kZWZpbmVkLCBhcmdzKTtcbiAgcmVnaXN0ZXJXcmFwcGVyKHN0cmlwZSwgc3RhcnRUaW1lKTtcbiAgcmV0dXJuIHN0cmlwZTtcbn07IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvZXhwbGljaXQtbW9kdWxlLWJvdW5kYXJ5LXR5cGVzXG5cbi8vIG93biBzY3JpcHQgaW5qZWN0aW9uLlxuXG52YXIgc3RyaXBlUHJvbWlzZSQxID0gUHJvbWlzZS5yZXNvbHZlKCkudGhlbihmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBsb2FkU2NyaXB0KG51bGwpO1xufSk7XG52YXIgbG9hZENhbGxlZCA9IGZhbHNlO1xuc3RyaXBlUHJvbWlzZSQxW1wiY2F0Y2hcIl0oZnVuY3Rpb24gKGVycikge1xuICBpZiAoIWxvYWRDYWxsZWQpIHtcbiAgICBjb25zb2xlLndhcm4oZXJyKTtcbiAgfVxufSk7XG52YXIgbG9hZFN0cmlwZSA9IGZ1bmN0aW9uIGxvYWRTdHJpcGUoKSB7XG4gIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgIGFyZ3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gIH1cblxuICBsb2FkQ2FsbGVkID0gdHJ1ZTtcbiAgdmFyIHN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gIHJldHVybiBzdHJpcGVQcm9taXNlJDEudGhlbihmdW5jdGlvbiAobWF5YmVTdHJpcGUpIHtcbiAgICByZXR1cm4gaW5pdFN0cmlwZShtYXliZVN0cmlwZSwgYXJncywgc3RhcnRUaW1lKTtcbiAgfSk7XG59O1xuXG5leHBvcnQgeyBsb2FkU3RyaXBlIH07XG4iLCJleHBvcnQgZnVuY3Rpb24gY3JlYXRlTW9kYWwoKSB7XG4gICAgLy8gc3R5bGUgdGFnXG4gICAgdmFyIGNzcyA9IFwiXFxuICAgICAgLmxvb3BzLXB1cmNoYXNlLW1vZGFsIHtcXG4gICAgICAgICAgcG9zaXRpb246IGZpeGVkO1xcbiAgICAgICAgICB0b3A6IDUwJTtcXG4gICAgICAgICAgbGVmdDogNTAlO1xcbiAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcXG4gICAgICAgICAgd2lkdGg6IDEwMCU7XFxuICAgICAgICAgIGhlaWdodDogMTAwJTtcXG4gICAgICAgICAgZGlzcGxheTogZmxleDtcXG4gICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC40KTtcXG4gICAgICB9XFxuXFxuICAgICAgLmxvb3BzLXB1cmNoYXNlLW1vZGFsLWNvbnRlbnQge1xcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZlZmVmZTtcXG4gICAgICAgIHdpZHRoOiA1MCU7XFxuICAgICAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xcbiAgICAgICAgbWF4LWhlaWdodDogOTB2aDtcXG4gICAgICAgIG92ZXJmbG93LXk6IGF1dG87XFxuICAgICAgfVxcblxcbiAgICAgIC50aXRsZSB7XFxuICAgICAgICBmb250LXNpemU6IDIwcHg7XFxuICAgICAgICBmb250LXdlaWdodDogYm9sZDtcXG4gICAgICAgIHBhZGRpbmc6IDIwcHg7XFxuICAgICAgfVxcblxcbiAgICAgIGZvcm0ge1xcbiAgICAgICAgbWluLXdpZHRoOiA1MDBweDtcXG4gICAgICAgIGFsaWduLXNlbGY6IGNlbnRlcjtcXG4gICAgICAgIGJveC1zaGFkb3c6IDBweCAwcHggMHB4IDAuNXB4IHJnYmEoNTAsIDUwLCA5MywgMC4xKSxcXG4gICAgICAgICAgMHB4IDJweCA1cHggMHB4IHJnYmEoNTAsIDUwLCA5MywgMC4xKSwgMHB4IDFweCAxLjVweCAwcHggcmdiYSgwLCAwLCAwLCAwLjA3KTtcXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDdweDtcXG4gICAgICAgIHBhZGRpbmc6IDQwcHg7XFxuICAgICAgfVxcblxcbiAgICAgIC5oaWRkZW4ge1xcbiAgICAgICAgZGlzcGxheTogbm9uZSFpbXBvcnRhbnQ7XFxuICAgICAgfVxcblxcbiAgICAgICNwYXltZW50LW1lc3NhZ2Uge1xcbiAgICAgICAgY29sb3I6IHJnYigxMDUsIDExNSwgMTM0KTtcXG4gICAgICAgIGZvbnQtc2l6ZTogMTZweDtcXG4gICAgICAgIGxpbmUtaGVpZ2h0OiAyMHB4O1xcbiAgICAgICAgcGFkZGluZy10b3A6IDEycHg7XFxuICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgICAgfVxcblxcbiAgICAgICNsaW5rLWF1dGhlbnRpY2F0aW9uLWVsZW1lbnQge1xcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMjRweDtcXG4gICAgICB9XFxuXFxuICAgICAgI3BheW1lbnQtZWxlbWVudCB7XFxuICAgICAgICBtYXJnaW4tYm90dG9tOiAyNHB4O1xcbiAgICAgIH1cXG5cXG4gICAgICAjYWRkcmVzcy1lbGVtZW50IHtcXG4gICAgICAgIG1hcmdpbi1ib3R0b206IDI0cHg7XFxuICAgICAgfVxcblxcbiAgICAgIC8qIEJ1dHRvbnMgYW5kIGxpbmtzICovXFxuICAgICAgI3N1Ym1pdCB7XFxuICAgICAgICBiYWNrZ3JvdW5kOiAjNTQ2OWQ0O1xcbiAgICAgICAgZm9udC1mYW1pbHk6IEFyaWFsLCBzYW5zLXNlcmlmO1xcbiAgICAgICAgY29sb3I6ICNmZmZmZmY7XFxuICAgICAgICBib3JkZXItcmFkaXVzOiA0cHg7XFxuICAgICAgICBib3JkZXI6IDA7XFxuICAgICAgICBwYWRkaW5nOiAxMnB4IDE2cHg7XFxuICAgICAgICBmb250LXNpemU6IDE2cHg7XFxuICAgICAgICBmb250LXdlaWdodDogNjAwO1xcbiAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XFxuICAgICAgICB0cmFuc2l0aW9uOiBhbGwgMC4ycyBlYXNlO1xcbiAgICAgICAgYm94LXNoYWRvdzogMHB4IDRweCA1LjVweCAwcHggcmdiYSgwLCAwLCAwLCAwLjA3KTtcXG4gICAgICAgIHdpZHRoOiAxMDAlO1xcbiAgICAgIH1cXG4gICAgICAjc3VibWl0OmhvdmVyIHtcXG4gICAgICAgIGZpbHRlcjogY29udHJhc3QoMTE1JSk7XFxuICAgICAgfVxcbiAgICAgICNzdWJtaXQ6ZGlzYWJsZWQge1xcbiAgICAgICAgb3BhY2l0eTogMC41O1xcbiAgICAgICAgY3Vyc29yOiBkZWZhdWx0O1xcbiAgICAgIH1cXG5cXG4gICAgICAjY2FuY2VsIHtcXG4gICAgICAgIGJhY2tncm91bmQ6IHdoaXRlO1xcbiAgICAgICAgZm9udC1mYW1pbHk6IEFyaWFsLCBzYW5zLXNlcmlmO1xcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNHB4O1xcbiAgICAgICAgYm9yZGVyOiAwO1xcbiAgICAgICAgcGFkZGluZzogMTJweCAxNnB4O1xcbiAgICAgICAgZm9udC1zaXplOiAxNnB4O1xcbiAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcXG4gICAgICAgIG1hcmdpbi10b3A6IDEwcHg7XFxuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgICAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgICAgIHRyYW5zaXRpb246IGFsbCAwLjJzIGVhc2U7XFxuICAgICAgICBib3gtc2hhZG93OiAwcHggNHB4IDUuNXB4IDBweCByZ2JhKDAsIDAsIDAsIDAuMDcpO1xcbiAgICAgICAgd2lkdGg6IDEwMCU7XFxuICAgICAgfVxcbiAgICAgICNjYW5jZWw6aG92ZXIge1xcbiAgICAgICAgZmlsdGVyOiBjb250cmFzdCgxMTUlKTtcXG4gICAgICB9XFxuICAgICAgI2NhbmNlbDpkaXNhYmxlZCB7XFxuICAgICAgICBvcGFjaXR5OiAwLjU7XFxuICAgICAgICBjdXJzb3I6IGRlZmF1bHQ7XFxuICAgICAgfVxcblxcbiAgICAgIC8qIHNwaW5uZXIvcHJvY2Vzc2luZyBzdGF0ZSwgZXJyb3JzICovXFxuICAgICAgLnNwaW5uZXIsXFxuICAgICAgLnNwaW5uZXI6YmVmb3JlLFxcbiAgICAgIC5zcGlubmVyOmFmdGVyIHtcXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gICAgICB9XFxuICAgICAgLnNwaW5uZXIge1xcbiAgICAgICAgY29sb3I6ICNmZmZmZmY7XFxuICAgICAgICBmb250LXNpemU6IDIycHg7XFxuICAgICAgICB0ZXh0LWluZGVudDogLTk5OTk5cHg7XFxuICAgICAgICBtYXJnaW46IDBweCBhdXRvO1xcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICAgICAgd2lkdGg6IDIwcHg7XFxuICAgICAgICBoZWlnaHQ6IDIwcHg7XFxuICAgICAgICBib3gtc2hhZG93OiBpbnNldCAwIDAgMCAycHg7XFxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWigwKTtcXG4gICAgICAgIC1tcy10cmFuc2Zvcm06IHRyYW5zbGF0ZVooMCk7XFxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVooMCk7XFxuICAgICAgfVxcbiAgICAgIC5zcGlubmVyOmJlZm9yZSxcXG4gICAgICAuc3Bpbm5lcjphZnRlciB7XFxuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgICAgICBjb250ZW50OiBcXFwiXFxcIjtcXG4gICAgICB9XFxuICAgICAgLnNwaW5uZXI6YmVmb3JlIHtcXG4gICAgICAgIHdpZHRoOiAxMC40cHg7XFxuICAgICAgICBoZWlnaHQ6IDIwLjRweDtcXG4gICAgICAgIGJhY2tncm91bmQ6ICM1NDY5ZDQ7XFxuICAgICAgICBib3JkZXItcmFkaXVzOiAyMC40cHggMCAwIDIwLjRweDtcXG4gICAgICAgIHRvcDogLTAuMnB4O1xcbiAgICAgICAgbGVmdDogLTAuMnB4O1xcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOiAxMC40cHggMTAuMnB4O1xcbiAgICAgICAgdHJhbnNmb3JtLW9yaWdpbjogMTAuNHB4IDEwLjJweDtcXG4gICAgICAgIC13ZWJraXQtYW5pbWF0aW9uOiBsb2FkaW5nIDJzIGluZmluaXRlIGVhc2UgMS41cztcXG4gICAgICAgIGFuaW1hdGlvbjogbG9hZGluZyAycyBpbmZpbml0ZSBlYXNlIDEuNXM7XFxuICAgICAgfVxcbiAgICAgIC5zcGlubmVyOmFmdGVyIHtcXG4gICAgICAgIHdpZHRoOiAxMC40cHg7XFxuICAgICAgICBoZWlnaHQ6IDEwLjJweDtcXG4gICAgICAgIGJhY2tncm91bmQ6ICM1NDY5ZDQ7XFxuICAgICAgICBib3JkZXItcmFkaXVzOiAwIDEwLjJweCAxMC4ycHggMDtcXG4gICAgICAgIHRvcDogLTAuMXB4O1xcbiAgICAgICAgbGVmdDogMTAuMnB4O1xcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOiAwcHggMTAuMnB4O1xcbiAgICAgICAgdHJhbnNmb3JtLW9yaWdpbjogMHB4IDEwLjJweDtcXG4gICAgICAgIC13ZWJraXQtYW5pbWF0aW9uOiBsb2FkaW5nIDJzIGluZmluaXRlIGVhc2U7XFxuICAgICAgICBhbmltYXRpb246IGxvYWRpbmcgMnMgaW5maW5pdGUgZWFzZTtcXG4gICAgICB9XFxuXFxuICAgICAgQC13ZWJraXQta2V5ZnJhbWVzIGxvYWRpbmcge1xcbiAgICAgICAgMCUge1xcbiAgICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDBkZWcpO1xcbiAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTtcXG4gICAgICAgIH1cXG4gICAgICAgIDEwMCUge1xcbiAgICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7XFxuICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7XFxuICAgICAgICB9XFxuICAgICAgfVxcbiAgICAgIEBrZXlmcmFtZXMgbG9hZGluZyB7XFxuICAgICAgICAwJSB7XFxuICAgICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7XFxuICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDBkZWcpO1xcbiAgICAgICAgfVxcbiAgICAgICAgMTAwJSB7XFxuICAgICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTtcXG4gICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTtcXG4gICAgICAgIH1cXG4gICAgICB9XFxuXFxuICAgICAgQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA2MDBweCkge1xcbiAgICAgICAgZm9ybSB7XFxuICAgICAgICAgIHdpZHRoOiA4MHZ3O1xcbiAgICAgICAgICBtaW4td2lkdGg6IGluaXRpYWw7XFxuICAgICAgICB9XFxuICAgICAgfVxcblxcbiAgICAgIC5sZHMtc3Bpbm5lciB7XFxuICAgICAgICBjb2xvcjogb2ZmaWNpYWw7XFxuICAgICAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgICAgIHdpZHRoOiA4MHB4O1xcbiAgICAgICAgaGVpZ2h0OiA4MHB4O1xcbiAgICAgICAgbWFyZ2luOiBhdXRvO1xcbiAgICAgIH1cXG4gICAgICAubGRzLXNwaW5uZXIgZGl2IHtcXG4gICAgICAgIHRyYW5zZm9ybS1vcmlnaW46IDQwcHggNDBweDtcXG4gICAgICAgIGFuaW1hdGlvbjogbGRzLXNwaW5uZXIgMS4ycyBsaW5lYXIgaW5maW5pdGU7XFxuICAgICAgfVxcbiAgICAgIC5sZHMtc3Bpbm5lciBkaXY6YWZ0ZXIge1xcbiAgICAgICAgY29udGVudDogXFxcIiBcXFwiO1xcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XFxuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgICAgICB0b3A6IDNweDtcXG4gICAgICAgIGxlZnQ6IDM3cHg7XFxuICAgICAgICB3aWR0aDogNnB4O1xcbiAgICAgICAgaGVpZ2h0OiAxOHB4O1xcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMjAlO1xcbiAgICAgICAgYmFja2dyb3VuZDogYmxhY2s7XFxuICAgICAgfVxcbiAgICAgIC5sZHMtc3Bpbm5lciBkaXY6bnRoLWNoaWxkKDEpIHtcXG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDBkZWcpO1xcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiAtMS4xcztcXG4gICAgICB9XFxuICAgICAgLmxkcy1zcGlubmVyIGRpdjpudGgtY2hpbGQoMikge1xcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMzBkZWcpO1xcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiAtMXM7XFxuICAgICAgfVxcbiAgICAgIC5sZHMtc3Bpbm5lciBkaXY6bnRoLWNoaWxkKDMpIHtcXG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDYwZGVnKTtcXG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogLTAuOXM7XFxuICAgICAgfVxcbiAgICAgIC5sZHMtc3Bpbm5lciBkaXY6bnRoLWNoaWxkKDQpIHtcXG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDkwZGVnKTtcXG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogLTAuOHM7XFxuICAgICAgfVxcbiAgICAgIC5sZHMtc3Bpbm5lciBkaXY6bnRoLWNoaWxkKDUpIHtcXG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDEyMGRlZyk7XFxuICAgICAgICBhbmltYXRpb24tZGVsYXk6IC0wLjdzO1xcbiAgICAgIH1cXG4gICAgICAubGRzLXNwaW5uZXIgZGl2Om50aC1jaGlsZCg2KSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgxNTBkZWcpO1xcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiAtMC42cztcXG4gICAgICB9XFxuICAgICAgLmxkcy1zcGlubmVyIGRpdjpudGgtY2hpbGQoNykge1xcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMTgwZGVnKTtcXG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogLTAuNXM7XFxuICAgICAgfVxcbiAgICAgIC5sZHMtc3Bpbm5lciBkaXY6bnRoLWNoaWxkKDgpIHtcXG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDIxMGRlZyk7XFxuICAgICAgICBhbmltYXRpb24tZGVsYXk6IC0wLjRzO1xcbiAgICAgIH1cXG4gICAgICAubGRzLXNwaW5uZXIgZGl2Om50aC1jaGlsZCg5KSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgyNDBkZWcpO1xcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiAtMC4zcztcXG4gICAgICB9XFxuICAgICAgLmxkcy1zcGlubmVyIGRpdjpudGgtY2hpbGQoMTApIHtcXG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDI3MGRlZyk7XFxuICAgICAgICBhbmltYXRpb24tZGVsYXk6IC0wLjJzO1xcbiAgICAgIH1cXG4gICAgICAubGRzLXNwaW5uZXIgZGl2Om50aC1jaGlsZCgxMSkge1xcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMzAwZGVnKTtcXG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogLTAuMXM7XFxuICAgICAgfVxcbiAgICAgIC5sZHMtc3Bpbm5lciBkaXY6bnRoLWNoaWxkKDEyKSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgzMzBkZWcpO1xcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiAwcztcXG4gICAgICB9XFxuICAgICAgQGtleWZyYW1lcyBsZHMtc3Bpbm5lciB7XFxuICAgICAgICAwJSB7XFxuICAgICAgICAgIG9wYWNpdHk6IDE7XFxuICAgICAgICB9XFxuICAgICAgICAxMDAlIHtcXG4gICAgICAgICAgb3BhY2l0eTogMDtcXG4gICAgICAgIH1cXG4gICAgICB9XFxuXFxuXFxuICAgIFwiO1xuICAgIGlmICghZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcInN0eWxlW2RhdGEtbG9vcHNdXCIpKSB7XG4gICAgICAgIHZhciBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgICAgICAgc3R5bGUuc2V0QXR0cmlidXRlKFwiZGF0YS1sb29wc1wiLCBcIlwiKTtcbiAgICAgICAgc3R5bGUuaW5uZXJIVE1MID0gY3NzO1xuICAgICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHN0eWxlKTtcbiAgICB9XG4gICAgLy8gbW9kYWxcbiAgICB2YXIgbW9kYWwgPSBcIlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImxvb3BzLXB1cmNoYXNlLW1vZGFsXFxcIj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcImxvb3BzLXB1cmNoYXNlLW1vZGFsLWNvbnRlbnRcXFwiPlxcblxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwibGRzLXNwaW5uZXIgaGlkZGVuXFxcIj48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48L2Rpdj5cXG5cXG4gICAgICAgICAgPGZvcm0gaWQ9XFxcInBheW1lbnQtZm9ybVxcXCI+XFxuXFxuICAgICAgICAgICAgPGRpdiBpZD1cXFwibGluay1hdXRoZW50aWNhdGlvbi1lbGVtZW50XFxcIj48L2Rpdj5cXG5cXG4gICAgICAgICAgICA8ZGl2IGlkPVxcXCJwYXltZW50LWVsZW1lbnRcXFwiPjwvZGl2PlxcblxcbiAgICAgICAgICAgIDxkaXYgaWQ9XFxcImFkZHJlc3MtZWxlbWVudFxcXCI+PC9kaXY+XFxuXFxuICAgICAgICAgICAgPGRpdiBpZD1cXFwicGF5bWVudC1tZXNzYWdlXFxcIiBjbGFzcz1cXFwiaGlkZGVuXFxcIj48L2Rpdj5cXG5cXG4gICAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJzdWJtaXRcXFwiPlxcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwic3Bpbm5lciBoaWRkZW5cXFwiIGlkPVxcXCJzcGlubmVyXFxcIj48L2Rpdj5cXG4gICAgICAgICAgICAgIDxzcGFuIGlkPVxcXCJidXR0b24tdGV4dFxcXCI+UGF5IG5vdzwvc3Bhbj5cXG4gICAgICAgICAgICA8L2J1dHRvbj5cXG5cXG4gICAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJjYW5jZWxcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCI+XFxuICAgICAgICAgICAgICA8c3BhbiBpZD1cXFwiYnV0dG9uLXRleHRcXFwiPkNhbmNlbDwvc3Bhbj5cXG4gICAgICAgICAgICA8L2J1dHRvbj5cXG5cXG4gICAgICAgICAgPC9mb3JtPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgPC9kaXY+XFxuICAgIFwiO1xuICAgIGlmICghZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5sb29wcy1wdXJjaGFzZS1tb2RhbFwiKSkge1xuICAgICAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgZGl2LmlubmVySFRNTCA9IG1vZGFsO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRpdik7XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIGhpZGVNb2RhbCgpIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmxvb3BzLXB1cmNoYXNlLW1vZGFsXCIpLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG59XG5leHBvcnQgZnVuY3Rpb24gc2hvd01vZGFsKCkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubG9vcHMtcHVyY2hhc2UtbW9kYWxcIikuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gXCJoaWRkZW5cIjtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpbml0U3RyaXBlKCkge1xuICAgIGlmICghZG9jdW1lbnQucXVlcnlTZWxlY3Rvcignc2NyaXB0W3NyYz1cImh0dHBzOi8vanMuc3RyaXBlLmNvbS92My9cIl0nKSkge1xuICAgICAgICB2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiAgICAgICAgc2NyaXB0LnNldEF0dHJpYnV0ZShcInNyY1wiLCBcImh0dHBzOi8vanMuc3RyaXBlLmNvbS92My9cIik7XG4gICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gc2hvd0J1dHRvbkxvYWRlcihpc0xvYWRpbmcpIHtcbiAgICBpZiAoaXNMb2FkaW5nID09PSB0cnVlKSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJidXR0b25cIikuZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NwaW5uZXJcIikuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNidXR0b24tdGV4dFwiKS5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJ1dHRvblwiKS5kaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NwaW5uZXJcIikuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNidXR0b24tdGV4dFwiKS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBzaG93TG9hZGVyKCkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubGRzLXNwaW5uZXJcIikuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3BheW1lbnQtZm9ybVwiKS5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGhpZGVMb2FkZXIoKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5sZHMtc3Bpbm5lclwiKS5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcGF5bWVudC1mb3JtXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG59XG5leHBvcnQgZnVuY3Rpb24gc2hvd01lc3NhZ2UobWVzc2FnZVRleHQpIHtcbiAgICB2YXIgbWVzc2FnZUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcGF5bWVudC1tZXNzYWdlXCIpO1xuICAgIG1lc3NhZ2VDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgICBtZXNzYWdlQ29udGFpbmVyLnRleHRDb250ZW50ID0gbWVzc2FnZVRleHQ7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIG1lc3NhZ2VDb250YWluZXIuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgICAgbWVzc2FnZUNvbnRhaW5lci50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgfSwgNDAwMCk7XG59XG4iLCJleHBvcnQgZnVuY3Rpb24gY3JlYXRlTGlua0F1dGhlbnRpY2F0aW9uRWxlbWVudChlbGVtZW50cykge1xuICAgIHZhciBsaW5rQXV0aGVudGljYXRpb25FbGVtZW50ID0gZWxlbWVudHMuY3JlYXRlKFwibGlua0F1dGhlbnRpY2F0aW9uXCIpO1xuICAgIGxpbmtBdXRoZW50aWNhdGlvbkVsZW1lbnQubW91bnQoXCIjbGluay1hdXRoZW50aWNhdGlvbi1lbGVtZW50XCIpO1xuICAgIHJldHVybiBsaW5rQXV0aGVudGljYXRpb25FbGVtZW50O1xufVxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVBheW1lbnRFbGVtZW50KGVsZW1lbnRzKSB7XG4gICAgdmFyIHBheW1lbnRFbGVtZW50ID0gZWxlbWVudHMuY3JlYXRlKFwicGF5bWVudFwiLCB7XG4gICAgICAgIGxheW91dDogXCJ0YWJzXCIsXG4gICAgfSk7XG4gICAgcGF5bWVudEVsZW1lbnQubW91bnQoXCIjcGF5bWVudC1lbGVtZW50XCIpO1xuICAgIHJldHVybiBwYXltZW50RWxlbWVudDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVBZGRyZXNzRWxlbWVudChlbGVtZW50cykge1xuICAgIHZhciBhZGRyZXNzRWxlbWVudCA9IGVsZW1lbnRzLmNyZWF0ZShcImFkZHJlc3NcIiwge1xuICAgICAgICBtb2RlOiBcInNoaXBwaW5nXCIsXG4gICAgICAgIGFsbG93ZWRDb3VudHJpZXM6IFtcIkpQXCJdLFxuICAgICAgICBmaWVsZHM6IHtcbiAgICAgICAgICAgIHBob25lOiBcImFsd2F5c1wiLFxuICAgICAgICB9LFxuICAgIH0pO1xuICAgIGFkZHJlc3NFbGVtZW50Lm1vdW50KFwiI2FkZHJlc3MtZWxlbWVudFwiKTtcbiAgICByZXR1cm4gYWRkcmVzc0VsZW1lbnQ7XG59XG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlSWZyYW1lcygpIHtcbiAgICB2YXIgaWZyYW1lcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lmcmFtZVtuYW1lXj1cIl9fcHJpdmF0ZVN0cmlwZUNvbnRyb2xsZXJcIl0nKTtcbiAgICBpZnJhbWVzLmZvckVhY2goZnVuY3Rpb24gKGlmcmFtZSkge1xuICAgICAgICBpZnJhbWUucmVtb3ZlKCk7XG4gICAgfSk7XG59XG4iLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbnZhciBfX2dlbmVyYXRvciA9ICh0aGlzICYmIHRoaXMuX19nZW5lcmF0b3IpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBib2R5KSB7XG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcbiAgICAgICAgd2hpbGUgKGcgJiYgKGcgPSAwLCBvcFswXSAmJiAoXyA9IDApKSwgXykgdHJ5IHtcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xuICAgIH1cbn07XG5pbXBvcnQgeyBnZXRDcmVkZW50aWFscyB9IGZyb20gXCIuL3NlcnZpY2UvbG9vcHMtYXBpXCI7XG5pbXBvcnQgeyBjcmVhdGVNb2RhbCwgaGlkZU1vZGFsIH0gZnJvbSBcIi4vZWxlbWVudHMvbW9kYWxcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluaXRpYWxpemUoY2xpZW50SWQsIGNsaWVudFNlY3JldCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF9hLCB0b2tlbiwgc3RvcmVJZCwgc3RyaXBlQWNjb3VudElkO1xuICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9iKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKF9iLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICBpZiAoIWNsaWVudElkIHx8ICFjbGllbnRTZWNyZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNsaWVudCBJRCBvciBDbGllbnQgU2VjcmV0IGlzIG5vdCBwcm92aWRlZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBnZXRDcmVkZW50aWFscyhjbGllbnRJZCwgY2xpZW50U2VjcmV0KV07XG4gICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICBfYSA9IF9iLnNlbnQoKSwgdG9rZW4gPSBfYS50b2tlbiwgc3RvcmVJZCA9IF9hLnN0b3JlSWQsIHN0cmlwZUFjY291bnRJZCA9IF9hLnN0cmlwZUFjY291bnRJZDtcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJsb29wcy10b2tlblwiLCB0b2tlbik7XG4gICAgICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwibG9vcHMtc3RvcmUtaWRcIiwgc3RvcmVJZCk7XG4gICAgICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwibG9vcHMtc3RyaXBlLWFjY291bnQtaWRcIiwgc3RyaXBlQWNjb3VudElkKTtcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlTW9kYWwoKTtcbiAgICAgICAgICAgICAgICAgICAgaGlkZU1vZGFsKCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG4iLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbnZhciBfX2dlbmVyYXRvciA9ICh0aGlzICYmIHRoaXMuX19nZW5lcmF0b3IpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBib2R5KSB7XG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcbiAgICAgICAgd2hpbGUgKGcgJiYgKGcgPSAwLCBvcFswXSAmJiAoXyA9IDApKSwgXykgdHJ5IHtcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xuICAgIH1cbn07XG5pbXBvcnQgeyBsb2FkU3RyaXBlIH0gZnJvbSBcIkBzdHJpcGUvc3RyaXBlLWpzXCI7XG5pbXBvcnQgeyBjcmVhdGVTdHJpcGVQYXltZW50SW50ZW50LCBjcmVhdGVMb29wc1N1YnNjcmlwdGlvbiwgfSBmcm9tIFwiLi4vc2VydmljZS9sb29wcy1hcGlcIjtcbmltcG9ydCB7IGNyZWF0ZUxpbmtBdXRoZW50aWNhdGlvbkVsZW1lbnQsIGNyZWF0ZVBheW1lbnRFbGVtZW50LCBjcmVhdGVBZGRyZXNzRWxlbWVudCwgcmVtb3ZlSWZyYW1lcywgfSBmcm9tIFwiLi4vZWxlbWVudHMvc3RyaXBlLWVsZW1lbnRzXCI7XG5pbXBvcnQgeyBzaG93TW9kYWwsIGhpZGVNb2RhbCwgc2hvd0J1dHRvbkxvYWRlciwgc2hvd0xvYWRlciwgaGlkZUxvYWRlciwgc2hvd01lc3NhZ2UsIH0gZnJvbSBcIi4uL2VsZW1lbnRzL21vZGFsXCI7XG52YXIgc2luZ2xlUHVyY2hhc2UgPSBmdW5jdGlvbiAocGxhbikgeyByZXR1cm4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgY2xpZW50U2VjcmV0LCBzZWNyZXQsIGVycm9yXzEsIHN0cmlwZUFjY291bnRJZCwgc3RyaXBlLCBlbWFpbEFkZHJlc3MsIGFkZHJlc3MsIGVsZW1lbnRzLCBsaW5rQXV0aGVudGljYXRpb25FbCwgY2FuY2VsQnV0dG9uRWwsIGZvcm07XG4gICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgaWYgKCFwbGFuLnByaWNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vIHByaWNlXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzaG93TW9kYWwoKTtcbiAgICAgICAgICAgICAgICBzaG93TG9hZGVyKCk7XG4gICAgICAgICAgICAgICAgY2xpZW50U2VjcmV0ID0gXCJcIjtcbiAgICAgICAgICAgICAgICBfYS5sYWJlbCA9IDE7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgX2EudHJ5cy5wdXNoKFsxLCAzLCAsIDRdKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBjcmVhdGVTdHJpcGVQYXltZW50SW50ZW50KHBsYW4ucHJpY2UpXTtcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICBzZWNyZXQgPSAoX2Euc2VudCgpKS5jbGllbnRTZWNyZXQ7XG4gICAgICAgICAgICAgICAgY2xpZW50U2VjcmV0ID0gc2VjcmV0O1xuICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDRdO1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIGVycm9yXzEgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yXzEpO1xuICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgIGlmICghY2xpZW50U2VjcmV0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vIGNsaWVudCBzZWNyZXRcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHN0cmlwZUFjY291bnRJZCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwibG9vcHMtc3RyaXBlLWFjY291bnQtaWRcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgbG9hZFN0cmlwZShcInBrX3Rlc3RfNTFJY05JRUJpbjlIZlBldmdGZVZCYkJUWm9HS3MxbnhMVFhrOGR3d2JYQUNoVnBNN2ZBajVpS25uQ3BpN1dFTlU2Q1FmOUwxd0dOb0lnVG9aeHZ3eTYyUEkwMGFndTU2bGJzXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cmlwZUFjY291bnQ6IHN0cmlwZUFjY291bnRJZCxcbiAgICAgICAgICAgICAgICAgICAgfSldO1xuICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgIHN0cmlwZSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICBlbWFpbEFkZHJlc3MgPSBcIlwiO1xuICAgICAgICAgICAgICAgIGFkZHJlc3MgPSB7fTtcbiAgICAgICAgICAgICAgICBlbGVtZW50cyA9IHN0cmlwZS5lbGVtZW50cyh7XG4gICAgICAgICAgICAgICAgICAgIGFwcGVhcmFuY2U6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoZW1lOiBcInN0cmlwZVwiLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBjbGllbnRTZWNyZXQ6IGNsaWVudFNlY3JldCxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBsaW5rQXV0aGVudGljYXRpb25FbCA9IGNyZWF0ZUxpbmtBdXRoZW50aWNhdGlvbkVsZW1lbnQoZWxlbWVudHMpO1xuICAgICAgICAgICAgICAgIGxpbmtBdXRoZW50aWNhdGlvbkVsLm9uKFwiY2hhbmdlXCIsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnQuZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGV2ZW50LmVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVtYWlsQWRkcmVzcyA9IGV2ZW50LnZhbHVlLmVtYWlsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgY3JlYXRlUGF5bWVudEVsZW1lbnQoZWxlbWVudHMpO1xuICAgICAgICAgICAgICAgIGNyZWF0ZUFkZHJlc3NFbGVtZW50KGVsZW1lbnRzKTtcbiAgICAgICAgICAgICAgICBjYW5jZWxCdXR0b25FbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2FuY2VsXCIpO1xuICAgICAgICAgICAgICAgIGNhbmNlbEJ1dHRvbkVsID09PSBudWxsIHx8IGNhbmNlbEJ1dHRvbkVsID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjYW5jZWxCdXR0b25FbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVJZnJhbWVzKCk7XG4gICAgICAgICAgICAgICAgICAgIGhpZGVNb2RhbCgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGhpZGVMb2FkZXIoKTtcbiAgICAgICAgICAgICAgICBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwYXltZW50LWZvcm1cIik7XG4gICAgICAgICAgICAgICAgZm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIGZ1bmN0aW9uIChldmVudCkgeyByZXR1cm4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVycm9yLCBhZGRyZXNzRWxlbWVudCwgX2EsIGNvbXBsZXRlLCB2YWx1ZSwgc3RhdHVzXzEsIGVycm9yXzI7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoX2IubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3dCdXR0b25Mb2FkZXIodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHN0cmlwZS5jb25maXJtUGF5bWVudCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudHM6IGVsZW1lbnRzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpcm1QYXJhbXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuX3VybDogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZGlyZWN0OiBcImlmX3JlcXVpcmVkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvciA9IChfYi5zZW50KCkpLmVycm9yO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWVycm9yKSByZXR1cm4gWzMgLypicmVhayovLCAyXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChlcnJvciA9PT0gbnVsbCB8fCBlcnJvciA9PT0gdm9pZCAwID8gdm9pZCAwIDogZXJyb3IudHlwZSkgPT09IFwiY2FyZF9lcnJvclwiIHx8IChlcnJvciA9PT0gbnVsbCB8fCBlcnJvciA9PT0gdm9pZCAwID8gdm9pZCAwIDogZXJyb3IudHlwZSkgPT09IFwidmFsaWRhdGlvbl9lcnJvclwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93TWVzc2FnZShlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3dNZXNzYWdlKFwiQW4gdW5leHBlY3RlZCBlcnJvciBvY2N1cnJlZC5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgOF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZGRyZXNzRWxlbWVudCA9IGVsZW1lbnRzLmdldEVsZW1lbnQoXCJhZGRyZXNzXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBhZGRyZXNzRWxlbWVudC5nZXRWYWx1ZSgpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9hID0gX2Iuc2VudCgpLCBjb21wbGV0ZSA9IF9hLmNvbXBsZXRlLCB2YWx1ZSA9IF9hLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29tcGxldGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkZHJlc3MgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYi5sYWJlbCA9IDQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYi50cnlzLnB1c2goWzQsIDYsIDcsIDhdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgY3JlYXRlTG9vcHNTdWJzY3JpcHRpb24oYWRkcmVzcywgcGxhbiwgZW1haWxBZGRyZXNzKV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXNfMSA9IChfYi5zZW50KCkpLnN0YXR1cztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXR1c18xID09PSBcInN1Y2Nlc3NcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvd01lc3NhZ2UoXCJTdWJzY3JpcHRpb24gY3JlYXRlZCBzdWNjZXNzZnVsbHlcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgOF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA2OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcl8yID0gX2Iuc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93TWVzc2FnZShcIkFuIHVuZXhwZWN0ZWQgZXJyb3Igb2NjdXJyZWQuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMgLypicmVhayovLCA4XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3dCdXR0b25Mb2FkZXIoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVJZnJhbWVzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhpZGVNb2RhbCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzcgLyplbmRmaW5hbGx5Ki9dO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgODogcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTsgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgICAgICB9XG4gICAgfSk7XG59KTsgfTtcbmV4cG9ydCB7IHNpbmdsZVB1cmNoYXNlIH07XG4iLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbnZhciBfX2dlbmVyYXRvciA9ICh0aGlzICYmIHRoaXMuX19nZW5lcmF0b3IpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBib2R5KSB7XG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcbiAgICAgICAgd2hpbGUgKGcgJiYgKGcgPSAwLCBvcFswXSAmJiAoXyA9IDApKSwgXykgdHJ5IHtcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xuICAgIH1cbn07XG4vLyBjb25zdCBhcGlVcmwgPVxuLy8gICBcImh0dHA6Ly9sb29wcy1zZXJ2ZXItYWxiLTEwOTA4ODk4ODguYXAtbm9ydGhlYXN0LTIuZWxiLmFtYXpvbmF3cy5jb21cIjtcbnZhciBhcGlVcmwgPSBcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4MFwiO1xuZXhwb3J0IGZ1bmN0aW9uIGdldENyZWRlbnRpYWxzKGNsaWVudElkLCBjbGllbnRTZWNyZXQpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciByZXNwb25zZSwgZGF0YSwgZXJyb3JfMTtcbiAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFjbGllbnRJZCB8fCAhY2xpZW50U2VjcmV0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDbGllbnQgSUQgb3IgQ2xpZW50IFNlY3JldCBpcyBub3QgcHJvdmlkZWRcIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgX2EubGFiZWwgPSAxO1xuICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgX2EudHJ5cy5wdXNoKFsxLCA0LCAsIDVdKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgZmV0Y2goXCJcIi5jb25jYXQoYXBpVXJsLCBcIi9hcGkvdjEvYXV0aC9iYXNpY1wiKSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpZW50X2lkOiBjbGllbnRJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpZW50X3NlY3JldDogY2xpZW50U2VjcmV0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSldO1xuICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHJlc3BvbnNlLmpzb24oKV07XG4gICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICBkYXRhID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgZGF0YV07XG4gICAgICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgICAgICBlcnJvcl8xID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JfMSk7XG4gICAgICAgICAgICAgICAgY2FzZSA1OiByZXR1cm4gWzIgLypyZXR1cm4qL107XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVN0cmlwZVBheW1lbnRJbnRlbnQoYW1vdW50KSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgdG9rZW4sIHJlc3BvbnNlLCBkYXRhLCBlcnJvcl8yO1xuICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICB0b2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwibG9vcHMtdG9rZW5cIik7XG4gICAgICAgICAgICAgICAgICAgIF9hLmxhYmVsID0gMTtcbiAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgIF9hLnRyeXMucHVzaChbMSwgNCwgLCA1XSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIGZldGNoKFwiXCIuY29uY2F0KGFwaVVybCwgXCIvYXBpL3YxL21lcmNoYW50L2NyZWF0ZS1wYXltZW50LWludGVudFwiKSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQXV0aG9yaXphdGlvbjogXCJCZWFyZXIgXCIuY29uY2F0KHRva2VuKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW1vdW50OiBhbW91bnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICB9KV07XG4gICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgcmVzcG9uc2UuanNvbigpXTtcbiAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgIGRhdGEgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBkYXRhXTtcbiAgICAgICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgICAgIGVycm9yXzIgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcl8yKTtcbiAgICAgICAgICAgICAgICBjYXNlIDU6IHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTG9vcHNTdWJzY3JpcHRpb24oYWRkcmVzcywgcGxhbiwgZW1haWwpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB0b2tlbiwgbWVyY2hhbnRfaWQsIGZpcnN0TmFtZSwgbGFzdE5hbWUsIGJvZHksIHJlc3BvbnNlLCBkYXRhLCBlcnJvcl8zO1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2IpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoX2IubGFiZWwpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgIHRva2VuID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJsb29wcy10b2tlblwiKTtcbiAgICAgICAgICAgICAgICAgICAgbWVyY2hhbnRfaWQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImxvb3BzLXN0b3JlLWlkXCIpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoYWRkcmVzcy5uYW1lLmluZGV4T2YoXCIgXCIpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgX2EgPSBhZGRyZXNzLm5hbWUuc3BsaXQoXCIgXCIpLCBmaXJzdE5hbWUgPSBfYVswXSwgbGFzdE5hbWUgPSBfYVsxXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0TmFtZSA9IGFkZHJlc3MubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3ROYW1lID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBib2R5ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiMmM2ZTIzOWEtZjAyYi1kMTU4LTI4MzMtYzdmODgzYmI1NTMwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXJjaGFudF9pZDogbWVyY2hhbnRfaWQudG9TdHJpbmcoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2R1Y3RzX3ZhcmlhbnQ6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2R1Y3RfdHlwZTogXCJwbGFuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBwbGFuLmtleS50b1N0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudW06IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbjogXCLllYblk4HjgZTjgajjga7jg6Hjg6LjgpLnrqHnkIZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbWVyX2luZm9ybWF0aW9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRkcmVzczI6IGFkZHJlc3MuYWRkcmVzcy5saW5lMiB8fCBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkZHJlc3MxOiBhZGRyZXNzLmFkZHJlc3MubGluZTEgfHwgXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaXR5OiBhZGRyZXNzLmFkZHJlc3MuY2l0eSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmVmOiBhZGRyZXNzLmFkZHJlc3Muc3RhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgemlwY29kZTogYWRkcmVzcy5hZGRyZXNzLnBvc3RhbF9jb2RlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0X25hbWU6IGZpcnN0TmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0X25hbWU6IGxhc3ROYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVtYWlsOiBlbWFpbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZWw6IGFkZHJlc3MucGhvbmUsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgc2hpcHBpbmdfaW5mb3JtYXRpb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZGRyZXNzMjogYWRkcmVzcy5hZGRyZXNzLmxpbmUyIHx8IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRkcmVzczE6IGFkZHJlc3MuYWRkcmVzcy5saW5lMSB8fCBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNpdHk6IGFkZHJlc3MuYWRkcmVzcy5jaXR5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZWY6IGFkZHJlc3MuYWRkcmVzcy5zdGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB6aXBjb2RlOiBhZGRyZXNzLmFkZHJlc3MucG9zdGFsX2NvZGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3RfbmFtZTogZmlyc3ROYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RfbmFtZTogbGFzdE5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVsOiBhZGRyZXNzLnBob25lLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaGlwcGluZzogXCIwKOmAmuW4uOmFjemAgSkgLyAxKOeEoeaWmemFjemAgSlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb3Vwb246IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF5bWVudDogXCJzdHJpcGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFja191cmw6IFwiaHR0cHM6Ly9sb2NhbGhvc3Q6NDAwMFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgX2IubGFiZWwgPSAxO1xuICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgX2IudHJ5cy5wdXNoKFsxLCA0LCAsIDVdKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgZmV0Y2goXCJcIi5jb25jYXQoYXBpVXJsLCBcIi9hcGkvdjEvb3JkZXJzL2NyZWF0ZVwiKSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQXV0aG9yaXphdGlvbjogXCJCYXNpYyBcIi5jb25jYXQodG9rZW4pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoYm9keSksXG4gICAgICAgICAgICAgICAgICAgICAgICB9KV07XG4gICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IF9iLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgcmVzcG9uc2UuanNvbigpXTtcbiAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgIGRhdGEgPSBfYi5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBkYXRhXTtcbiAgICAgICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgICAgIGVycm9yXzMgPSBfYi5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcl8zKTtcbiAgICAgICAgICAgICAgICBjYXNlIDU6IHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBpbml0aWFsaXplIGZyb20gXCIuL2xvb3BzXCI7XG5leHBvcnQgeyBzaW5nbGVQdXJjaGFzZSB9IGZyb20gXCIuL3B1cmNoYXNlL3NpbmdsZVwiO1xuZXhwb3J0IHsgaW5pdGlhbGl6ZSB9O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9