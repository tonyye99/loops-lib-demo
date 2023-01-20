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
var apiUrl = "http://loops-server-alb-1090889888.ap-northeast-2.elb.amazonaws.com";
// const apiUrl = "http://localhost:8080";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9vcHMtbGliLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQSx3SUFBd0k7QUFDeEk7QUFDQTs7QUFFQSxrQkFBa0Isb0JBQW9CO0FBQ3RDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLE9BQU87QUFDUCxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBLHNFQUFzRSxhQUFhO0FBQ25GO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRXNCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaElmO0FBQ1A7QUFDQSw4Q0FBOEMsNEJBQTRCLHFCQUFxQixzQkFBc0IsNkNBQTZDLHdCQUF3Qix5QkFBeUIsMEJBQTBCLGdDQUFnQyxvQ0FBb0MsaURBQWlELFNBQVMseUNBQXlDLG9DQUFvQyxxQkFBcUIsOEJBQThCLDJCQUEyQiwyQkFBMkIsU0FBUyxrQkFBa0IsMEJBQTBCLDRCQUE0Qix3QkFBd0IsU0FBUyxnQkFBZ0IsMkJBQTJCLDZCQUE2Qix1SkFBdUosNkJBQTZCLHdCQUF3QixTQUFTLG1CQUFtQixrQ0FBa0MsU0FBUyw0QkFBNEIsb0NBQW9DLDBCQUEwQiw0QkFBNEIsNEJBQTRCLDZCQUE2QixTQUFTLHdDQUF3Qyw4QkFBOEIsU0FBUyw0QkFBNEIsOEJBQThCLFNBQVMsNEJBQTRCLDhCQUE4QixTQUFTLGtEQUFrRCw4QkFBOEIseUNBQXlDLHlCQUF5Qiw2QkFBNkIsb0JBQW9CLDZCQUE2QiwwQkFBMEIsMkJBQTJCLDBCQUEwQix5QkFBeUIsb0NBQW9DLDREQUE0RCxzQkFBc0IsU0FBUyx1QkFBdUIsaUNBQWlDLFNBQVMsMEJBQTBCLHVCQUF1QiwwQkFBMEIsU0FBUyxtQkFBbUIsNEJBQTRCLHlDQUF5Qyw2QkFBNkIsb0JBQW9CLDZCQUE2QiwwQkFBMEIsMkJBQTJCLDJCQUEyQiwwQkFBMEIseUJBQXlCLG9DQUFvQyw0REFBNEQsc0JBQXNCLFNBQVMsdUJBQXVCLGlDQUFpQyxTQUFTLDBCQUEwQix1QkFBdUIsMEJBQTBCLFNBQVMsaUhBQWlILDZCQUE2QixTQUFTLGtCQUFrQix5QkFBeUIsMEJBQTBCLGdDQUFnQywyQkFBMkIsNkJBQTZCLHNCQUFzQix1QkFBdUIsc0NBQXNDLDJDQUEyQyx1Q0FBdUMsbUNBQW1DLFNBQVMsZ0RBQWdELDZCQUE2Qix3QkFBd0IsU0FBUyx5QkFBeUIsd0JBQXdCLHlCQUF5Qiw4QkFBOEIsMkNBQTJDLHNCQUFzQix1QkFBdUIsa0RBQWtELDBDQUEwQywyREFBMkQsbURBQW1ELFNBQVMsd0JBQXdCLHdCQUF3Qix5QkFBeUIsOEJBQThCLDJDQUEyQyxzQkFBc0IsdUJBQXVCLCtDQUErQyx1Q0FBdUMsc0RBQXNELDhDQUE4QyxTQUFTLHNDQUFzQyxjQUFjLDRDQUE0QyxvQ0FBb0MsV0FBVyxnQkFBZ0IsOENBQThDLHNDQUFzQyxXQUFXLFNBQVMsNEJBQTRCLGNBQWMsNENBQTRDLG9DQUFvQyxXQUFXLGdCQUFnQiw4Q0FBOEMsc0NBQXNDLFdBQVcsU0FBUyxxREFBcUQsZ0JBQWdCLHdCQUF3QiwrQkFBK0IsV0FBVyxTQUFTLHdCQUF3QiwwQkFBMEIseUJBQXlCLDZCQUE2QixzQkFBc0IsdUJBQXVCLHVCQUF1QixTQUFTLDBCQUEwQixzQ0FBc0Msc0RBQXNELFNBQVMsZ0NBQWdDLHlCQUF5Qix5QkFBeUIsNkJBQTZCLG1CQUFtQixxQkFBcUIscUJBQXFCLHVCQUF1Qiw2QkFBNkIsNEJBQTRCLFNBQVMsdUNBQXVDLGtDQUFrQyxpQ0FBaUMsU0FBUyx1Q0FBdUMsbUNBQW1DLCtCQUErQixTQUFTLHVDQUF1QyxtQ0FBbUMsaUNBQWlDLFNBQVMsdUNBQXVDLG1DQUFtQyxpQ0FBaUMsU0FBUyx1Q0FBdUMsb0NBQW9DLGlDQUFpQyxTQUFTLHVDQUF1QyxvQ0FBb0MsaUNBQWlDLFNBQVMsdUNBQXVDLG9DQUFvQyxpQ0FBaUMsU0FBUyx1Q0FBdUMsb0NBQW9DLGlDQUFpQyxTQUFTLHVDQUF1QyxvQ0FBb0MsaUNBQWlDLFNBQVMsd0NBQXdDLG9DQUFvQyxpQ0FBaUMsU0FBUyx3Q0FBd0Msb0NBQW9DLGlDQUFpQyxTQUFTLHdDQUF3QyxvQ0FBb0MsOEJBQThCLFNBQVMsZ0NBQWdDLGNBQWMsdUJBQXVCLFdBQVcsZ0JBQWdCLHVCQUF1QixXQUFXLFNBQVM7QUFDem1OO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzRE87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOzs7Ozs7Ozs7Ozs7Ozs7OztBQzVCQSxpQkFBaUIsU0FBSSxJQUFJLFNBQUk7QUFDN0IsNEJBQTRCLCtEQUErRCxpQkFBaUI7QUFDNUc7QUFDQSxvQ0FBb0MsTUFBTSwrQkFBK0IsWUFBWTtBQUNyRixtQ0FBbUMsTUFBTSxtQ0FBbUMsWUFBWTtBQUN4RixnQ0FBZ0M7QUFDaEM7QUFDQSxLQUFLO0FBQ0w7QUFDQSxtQkFBbUIsU0FBSSxJQUFJLFNBQUk7QUFDL0IsY0FBYyw2QkFBNkIsMEJBQTBCLGNBQWMscUJBQXFCO0FBQ3hHLGlCQUFpQixvREFBb0QscUVBQXFFLGNBQWM7QUFDeEosdUJBQXVCLHNCQUFzQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0M7QUFDeEMsbUNBQW1DLFNBQVM7QUFDNUMsbUNBQW1DLFdBQVcsVUFBVTtBQUN4RCwwQ0FBMEMsY0FBYztBQUN4RDtBQUNBLDhHQUE4RyxPQUFPO0FBQ3JILGlGQUFpRixpQkFBaUI7QUFDbEcseURBQXlELGdCQUFnQixRQUFRO0FBQ2pGLCtDQUErQyxnQkFBZ0IsZ0JBQWdCO0FBQy9FO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQSxVQUFVLFlBQVksYUFBYSxTQUFTLFVBQVU7QUFDdEQsb0NBQW9DLFNBQVM7QUFDN0M7QUFDQTtBQUNxRDtBQUNLO0FBQzNDO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QyxrRUFBYztBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLDREQUFXO0FBQy9CLG9CQUFvQiwwREFBUztBQUM3QjtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzNEQSxpQkFBaUIsU0FBSSxJQUFJLFNBQUk7QUFDN0IsNEJBQTRCLCtEQUErRCxpQkFBaUI7QUFDNUc7QUFDQSxvQ0FBb0MsTUFBTSwrQkFBK0IsWUFBWTtBQUNyRixtQ0FBbUMsTUFBTSxtQ0FBbUMsWUFBWTtBQUN4RixnQ0FBZ0M7QUFDaEM7QUFDQSxLQUFLO0FBQ0w7QUFDQSxtQkFBbUIsU0FBSSxJQUFJLFNBQUk7QUFDL0IsY0FBYyw2QkFBNkIsMEJBQTBCLGNBQWMscUJBQXFCO0FBQ3hHLGlCQUFpQixvREFBb0QscUVBQXFFLGNBQWM7QUFDeEosdUJBQXVCLHNCQUFzQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0M7QUFDeEMsbUNBQW1DLFNBQVM7QUFDNUMsbUNBQW1DLFdBQVcsVUFBVTtBQUN4RCwwQ0FBMEMsY0FBYztBQUN4RDtBQUNBLDhHQUE4RyxPQUFPO0FBQ3JILGlGQUFpRixpQkFBaUI7QUFDbEcseURBQXlELGdCQUFnQixRQUFRO0FBQ2pGLCtDQUErQyxnQkFBZ0IsZ0JBQWdCO0FBQy9FO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQSxVQUFVLFlBQVksYUFBYSxTQUFTLFVBQVU7QUFDdEQsb0NBQW9DLFNBQVM7QUFDN0M7QUFDQTtBQUMrQztBQUM0QztBQUMrQztBQUN6QjtBQUNqSCx1Q0FBdUM7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsMERBQVM7QUFDekIsZ0JBQWdCLDJEQUFVO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLDZFQUF5QjtBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsNkRBQVU7QUFDL0M7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQSxpQkFBaUI7QUFDakIsdUNBQXVDLDBGQUErQjtBQUN0RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixnQkFBZ0IsK0VBQW9CO0FBQ3BDLGdCQUFnQiwrRUFBb0I7QUFDcEM7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLHdFQUFhO0FBQ2pDLG9CQUFvQiwwREFBUztBQUM3QixpQkFBaUI7QUFDakIsZ0JBQWdCLDJEQUFVO0FBQzFCO0FBQ0EsbUVBQW1FO0FBQ25FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsaUVBQWdCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDO0FBQ3pDO0FBQ0EscUNBQXFDO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLDREQUFXO0FBQy9DO0FBQ0E7QUFDQSxvQ0FBb0MsNERBQVc7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxREFBcUQsMkVBQXVCO0FBQzVFO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyw0REFBVztBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyw0REFBVztBQUMzQztBQUNBO0FBQ0EsZ0NBQWdDLGlFQUFnQjtBQUNoRCxnQ0FBZ0Msd0VBQWE7QUFDN0MsZ0NBQWdDLDBEQUFTO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQixpQkFBaUIsSUFBSTtBQUNyQjtBQUNBO0FBQ0EsS0FBSztBQUNMLENBQUM7QUFDeUI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDOUoxQixpQkFBaUIsU0FBSSxJQUFJLFNBQUk7QUFDN0IsNEJBQTRCLCtEQUErRCxpQkFBaUI7QUFDNUc7QUFDQSxvQ0FBb0MsTUFBTSwrQkFBK0IsWUFBWTtBQUNyRixtQ0FBbUMsTUFBTSxtQ0FBbUMsWUFBWTtBQUN4RixnQ0FBZ0M7QUFDaEM7QUFDQSxLQUFLO0FBQ0w7QUFDQSxtQkFBbUIsU0FBSSxJQUFJLFNBQUk7QUFDL0IsY0FBYyw2QkFBNkIsMEJBQTBCLGNBQWMscUJBQXFCO0FBQ3hHLGlCQUFpQixvREFBb0QscUVBQXFFLGNBQWM7QUFDeEosdUJBQXVCLHNCQUFzQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0M7QUFDeEMsbUNBQW1DLFNBQVM7QUFDNUMsbUNBQW1DLFdBQVcsVUFBVTtBQUN4RCwwQ0FBMEMsY0FBYztBQUN4RDtBQUNBLDhHQUE4RyxPQUFPO0FBQ3JILGlGQUFpRixpQkFBaUI7QUFDbEcseURBQXlELGdCQUFnQixRQUFRO0FBQ2pGLCtDQUErQyxnQkFBZ0IsZ0JBQWdCO0FBQy9FO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQSxVQUFVLFlBQVksYUFBYSxTQUFTLFVBQVU7QUFDdEQsb0NBQW9DLFNBQVM7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0IseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0IseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7Ozs7Ozs7VUMzTEE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTmlDO0FBQ2tCO0FBQzdCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbG9vcHMvLi9ub2RlX21vZHVsZXMvQHN0cmlwZS9zdHJpcGUtanMvZGlzdC9zdHJpcGUuZXNtLmpzIiwid2VicGFjazovL2xvb3BzLy4vc3JjL2VsZW1lbnRzL21vZGFsLnRzIiwid2VicGFjazovL2xvb3BzLy4vc3JjL2VsZW1lbnRzL3N0cmlwZS1lbGVtZW50cy50cyIsIndlYnBhY2s6Ly9sb29wcy8uL3NyYy9sb29wcy50cyIsIndlYnBhY2s6Ly9sb29wcy8uL3NyYy9wdXJjaGFzZS9zaW5nbGUudHMiLCJ3ZWJwYWNrOi8vbG9vcHMvLi9zcmMvc2VydmljZS9sb29wcy1hcGkudHMiLCJ3ZWJwYWNrOi8vbG9vcHMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbG9vcHMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2xvb3BzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbG9vcHMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9sb29wcy8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgVjNfVVJMID0gJ2h0dHBzOi8vanMuc3RyaXBlLmNvbS92Myc7XG52YXIgVjNfVVJMX1JFR0VYID0gL15odHRwczpcXC9cXC9qc1xcLnN0cmlwZVxcLmNvbVxcL3YzXFwvPyhcXD8uKik/JC87XG52YXIgRVhJU1RJTkdfU0NSSVBUX01FU1NBR0UgPSAnbG9hZFN0cmlwZS5zZXRMb2FkUGFyYW1ldGVycyB3YXMgY2FsbGVkIGJ1dCBhbiBleGlzdGluZyBTdHJpcGUuanMgc2NyaXB0IGFscmVhZHkgZXhpc3RzIGluIHRoZSBkb2N1bWVudDsgZXhpc3Rpbmcgc2NyaXB0IHBhcmFtZXRlcnMgd2lsbCBiZSB1c2VkJztcbnZhciBmaW5kU2NyaXB0ID0gZnVuY3Rpb24gZmluZFNjcmlwdCgpIHtcbiAgdmFyIHNjcmlwdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwic2NyaXB0W3NyY149XFxcIlwiLmNvbmNhdChWM19VUkwsIFwiXFxcIl1cIikpO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc2NyaXB0cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBzY3JpcHQgPSBzY3JpcHRzW2ldO1xuXG4gICAgaWYgKCFWM19VUkxfUkVHRVgudGVzdChzY3JpcHQuc3JjKSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNjcmlwdDtcbiAgfVxuXG4gIHJldHVybiBudWxsO1xufTtcblxudmFyIGluamVjdFNjcmlwdCA9IGZ1bmN0aW9uIGluamVjdFNjcmlwdChwYXJhbXMpIHtcbiAgdmFyIHF1ZXJ5U3RyaW5nID0gcGFyYW1zICYmICFwYXJhbXMuYWR2YW5jZWRGcmF1ZFNpZ25hbHMgPyAnP2FkdmFuY2VkRnJhdWRTaWduYWxzPWZhbHNlJyA6ICcnO1xuICB2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gIHNjcmlwdC5zcmMgPSBcIlwiLmNvbmNhdChWM19VUkwpLmNvbmNhdChxdWVyeVN0cmluZyk7XG4gIHZhciBoZWFkT3JCb2R5ID0gZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5ib2R5O1xuXG4gIGlmICghaGVhZE9yQm9keSkge1xuICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgZG9jdW1lbnQuYm9keSBub3QgdG8gYmUgbnVsbC4gU3RyaXBlLmpzIHJlcXVpcmVzIGEgPGJvZHk+IGVsZW1lbnQuJyk7XG4gIH1cblxuICBoZWFkT3JCb2R5LmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gIHJldHVybiBzY3JpcHQ7XG59O1xuXG52YXIgcmVnaXN0ZXJXcmFwcGVyID0gZnVuY3Rpb24gcmVnaXN0ZXJXcmFwcGVyKHN0cmlwZSwgc3RhcnRUaW1lKSB7XG4gIGlmICghc3RyaXBlIHx8ICFzdHJpcGUuX3JlZ2lzdGVyV3JhcHBlcikge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHN0cmlwZS5fcmVnaXN0ZXJXcmFwcGVyKHtcbiAgICBuYW1lOiAnc3RyaXBlLWpzJyxcbiAgICB2ZXJzaW9uOiBcIjEuNDYuMFwiLFxuICAgIHN0YXJ0VGltZTogc3RhcnRUaW1lXG4gIH0pO1xufTtcblxudmFyIHN0cmlwZVByb21pc2UgPSBudWxsO1xudmFyIGxvYWRTY3JpcHQgPSBmdW5jdGlvbiBsb2FkU2NyaXB0KHBhcmFtcykge1xuICAvLyBFbnN1cmUgdGhhdCB3ZSBvbmx5IGF0dGVtcHQgdG8gbG9hZCBTdHJpcGUuanMgYXQgbW9zdCBvbmNlXG4gIGlmIChzdHJpcGVQcm9taXNlICE9PSBudWxsKSB7XG4gICAgcmV0dXJuIHN0cmlwZVByb21pc2U7XG4gIH1cblxuICBzdHJpcGVQcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgLy8gUmVzb2x2ZSB0byBudWxsIHdoZW4gaW1wb3J0ZWQgc2VydmVyIHNpZGUuIFRoaXMgbWFrZXMgdGhlIG1vZHVsZVxuICAgICAgLy8gc2FmZSB0byBpbXBvcnQgaW4gYW4gaXNvbW9ycGhpYyBjb2RlIGJhc2UuXG4gICAgICByZXNvbHZlKG51bGwpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh3aW5kb3cuU3RyaXBlICYmIHBhcmFtcykge1xuICAgICAgY29uc29sZS53YXJuKEVYSVNUSU5HX1NDUklQVF9NRVNTQUdFKTtcbiAgICB9XG5cbiAgICBpZiAod2luZG93LlN0cmlwZSkge1xuICAgICAgcmVzb2x2ZSh3aW5kb3cuU3RyaXBlKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgdmFyIHNjcmlwdCA9IGZpbmRTY3JpcHQoKTtcblxuICAgICAgaWYgKHNjcmlwdCAmJiBwYXJhbXMpIHtcbiAgICAgICAgY29uc29sZS53YXJuKEVYSVNUSU5HX1NDUklQVF9NRVNTQUdFKTtcbiAgICAgIH0gZWxzZSBpZiAoIXNjcmlwdCkge1xuICAgICAgICBzY3JpcHQgPSBpbmplY3RTY3JpcHQocGFyYW1zKTtcbiAgICAgIH1cblxuICAgICAgc2NyaXB0LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh3aW5kb3cuU3RyaXBlKSB7XG4gICAgICAgICAgcmVzb2x2ZSh3aW5kb3cuU3RyaXBlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZWplY3QobmV3IEVycm9yKCdTdHJpcGUuanMgbm90IGF2YWlsYWJsZScpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBzY3JpcHQuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJlamVjdChuZXcgRXJyb3IoJ0ZhaWxlZCB0byBsb2FkIFN0cmlwZS5qcycpKTtcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBzdHJpcGVQcm9taXNlO1xufTtcbnZhciBpbml0U3RyaXBlID0gZnVuY3Rpb24gaW5pdFN0cmlwZShtYXliZVN0cmlwZSwgYXJncywgc3RhcnRUaW1lKSB7XG4gIGlmIChtYXliZVN0cmlwZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgdmFyIHN0cmlwZSA9IG1heWJlU3RyaXBlLmFwcGx5KHVuZGVmaW5lZCwgYXJncyk7XG4gIHJlZ2lzdGVyV3JhcHBlcihzdHJpcGUsIHN0YXJ0VGltZSk7XG4gIHJldHVybiBzdHJpcGU7XG59OyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2V4cGxpY2l0LW1vZHVsZS1ib3VuZGFyeS10eXBlc1xuXG4vLyBvd24gc2NyaXB0IGluamVjdGlvbi5cblxudmFyIHN0cmlwZVByb21pc2UkMSA9IFByb21pc2UucmVzb2x2ZSgpLnRoZW4oZnVuY3Rpb24gKCkge1xuICByZXR1cm4gbG9hZFNjcmlwdChudWxsKTtcbn0pO1xudmFyIGxvYWRDYWxsZWQgPSBmYWxzZTtcbnN0cmlwZVByb21pc2UkMVtcImNhdGNoXCJdKGZ1bmN0aW9uIChlcnIpIHtcbiAgaWYgKCFsb2FkQ2FsbGVkKSB7XG4gICAgY29uc29sZS53YXJuKGVycik7XG4gIH1cbn0pO1xudmFyIGxvYWRTdHJpcGUgPSBmdW5jdGlvbiBsb2FkU3RyaXBlKCkge1xuICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICBhcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICB9XG5cbiAgbG9hZENhbGxlZCA9IHRydWU7XG4gIHZhciBzdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICByZXR1cm4gc3RyaXBlUHJvbWlzZSQxLnRoZW4oZnVuY3Rpb24gKG1heWJlU3RyaXBlKSB7XG4gICAgcmV0dXJuIGluaXRTdHJpcGUobWF5YmVTdHJpcGUsIGFyZ3MsIHN0YXJ0VGltZSk7XG4gIH0pO1xufTtcblxuZXhwb3J0IHsgbG9hZFN0cmlwZSB9O1xuIiwiZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU1vZGFsKCkge1xuICAgIC8vIHN0eWxlIHRhZ1xuICAgIHZhciBjc3MgPSBcIlxcbiAgICAgIC5sb29wcy1wdXJjaGFzZS1tb2RhbCB7XFxuICAgICAgICAgIHBvc2l0aW9uOiBmaXhlZDtcXG4gICAgICAgICAgdG9wOiA1MCU7XFxuICAgICAgICAgIGxlZnQ6IDUwJTtcXG4gICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XFxuICAgICAgICAgIHdpZHRoOiAxMDAlO1xcbiAgICAgICAgICBoZWlnaHQ6IDEwMCU7XFxuICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNCk7XFxuICAgICAgfVxcblxcbiAgICAgIC5sb29wcy1wdXJjaGFzZS1tb2RhbC1jb250ZW50IHtcXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmZWZlZmU7XFxuICAgICAgICB3aWR0aDogNTAlO1xcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMTBweDtcXG4gICAgICAgIG1heC1oZWlnaHQ6IDkwdmg7XFxuICAgICAgICBvdmVyZmxvdy15OiBhdXRvO1xcbiAgICAgIH1cXG5cXG4gICAgICAudGl0bGUge1xcbiAgICAgICAgZm9udC1zaXplOiAyMHB4O1xcbiAgICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxuICAgICAgICBwYWRkaW5nOiAyMHB4O1xcbiAgICAgIH1cXG5cXG4gICAgICBmb3JtIHtcXG4gICAgICAgIG1pbi13aWR0aDogNTAwcHg7XFxuICAgICAgICBhbGlnbi1zZWxmOiBjZW50ZXI7XFxuICAgICAgICBib3gtc2hhZG93OiAwcHggMHB4IDBweCAwLjVweCByZ2JhKDUwLCA1MCwgOTMsIDAuMSksXFxuICAgICAgICAgIDBweCAycHggNXB4IDBweCByZ2JhKDUwLCA1MCwgOTMsIDAuMSksIDBweCAxcHggMS41cHggMHB4IHJnYmEoMCwgMCwgMCwgMC4wNyk7XFxuICAgICAgICBib3JkZXItcmFkaXVzOiA3cHg7XFxuICAgICAgICBwYWRkaW5nOiA0MHB4O1xcbiAgICAgIH1cXG5cXG4gICAgICAuaGlkZGVuIHtcXG4gICAgICAgIGRpc3BsYXk6IG5vbmUhaW1wb3J0YW50O1xcbiAgICAgIH1cXG5cXG4gICAgICAjcGF5bWVudC1tZXNzYWdlIHtcXG4gICAgICAgIGNvbG9yOiByZ2IoMTA1LCAxMTUsIDEzNCk7XFxuICAgICAgICBmb250LXNpemU6IDE2cHg7XFxuICAgICAgICBsaW5lLWhlaWdodDogMjBweDtcXG4gICAgICAgIHBhZGRpbmctdG9wOiAxMnB4O1xcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICAgIH1cXG5cXG4gICAgICAjbGluay1hdXRoZW50aWNhdGlvbi1lbGVtZW50IHtcXG4gICAgICAgIG1hcmdpbi1ib3R0b206IDI0cHg7XFxuICAgICAgfVxcblxcbiAgICAgICNwYXltZW50LWVsZW1lbnQge1xcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMjRweDtcXG4gICAgICB9XFxuXFxuICAgICAgI2FkZHJlc3MtZWxlbWVudCB7XFxuICAgICAgICBtYXJnaW4tYm90dG9tOiAyNHB4O1xcbiAgICAgIH1cXG5cXG4gICAgICAvKiBCdXR0b25zIGFuZCBsaW5rcyAqL1xcbiAgICAgICNzdWJtaXQge1xcbiAgICAgICAgYmFja2dyb3VuZDogIzU0NjlkNDtcXG4gICAgICAgIGZvbnQtZmFtaWx5OiBBcmlhbCwgc2Fucy1zZXJpZjtcXG4gICAgICAgIGNvbG9yOiAjZmZmZmZmO1xcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNHB4O1xcbiAgICAgICAgYm9yZGVyOiAwO1xcbiAgICAgICAgcGFkZGluZzogMTJweCAxNnB4O1xcbiAgICAgICAgZm9udC1zaXplOiAxNnB4O1xcbiAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcXG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICAgICAgdHJhbnNpdGlvbjogYWxsIDAuMnMgZWFzZTtcXG4gICAgICAgIGJveC1zaGFkb3c6IDBweCA0cHggNS41cHggMHB4IHJnYmEoMCwgMCwgMCwgMC4wNyk7XFxuICAgICAgICB3aWR0aDogMTAwJTtcXG4gICAgICB9XFxuICAgICAgI3N1Ym1pdDpob3ZlciB7XFxuICAgICAgICBmaWx0ZXI6IGNvbnRyYXN0KDExNSUpO1xcbiAgICAgIH1cXG4gICAgICAjc3VibWl0OmRpc2FibGVkIHtcXG4gICAgICAgIG9wYWNpdHk6IDAuNTtcXG4gICAgICAgIGN1cnNvcjogZGVmYXVsdDtcXG4gICAgICB9XFxuXFxuICAgICAgI2NhbmNlbCB7XFxuICAgICAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcXG4gICAgICAgIGZvbnQtZmFtaWx5OiBBcmlhbCwgc2Fucy1zZXJpZjtcXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDRweDtcXG4gICAgICAgIGJvcmRlcjogMDtcXG4gICAgICAgIHBhZGRpbmc6IDEycHggMTZweDtcXG4gICAgICAgIGZvbnQtc2l6ZTogMTZweDtcXG4gICAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XFxuICAgICAgICBtYXJnaW4tdG9wOiAxMHB4O1xcbiAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XFxuICAgICAgICB0cmFuc2l0aW9uOiBhbGwgMC4ycyBlYXNlO1xcbiAgICAgICAgYm94LXNoYWRvdzogMHB4IDRweCA1LjVweCAwcHggcmdiYSgwLCAwLCAwLCAwLjA3KTtcXG4gICAgICAgIHdpZHRoOiAxMDAlO1xcbiAgICAgIH1cXG4gICAgICAjY2FuY2VsOmhvdmVyIHtcXG4gICAgICAgIGZpbHRlcjogY29udHJhc3QoMTE1JSk7XFxuICAgICAgfVxcbiAgICAgICNjYW5jZWw6ZGlzYWJsZWQge1xcbiAgICAgICAgb3BhY2l0eTogMC41O1xcbiAgICAgICAgY3Vyc29yOiBkZWZhdWx0O1xcbiAgICAgIH1cXG5cXG4gICAgICAvKiBzcGlubmVyL3Byb2Nlc3Npbmcgc3RhdGUsIGVycm9ycyAqL1xcbiAgICAgIC5zcGlubmVyLFxcbiAgICAgIC5zcGlubmVyOmJlZm9yZSxcXG4gICAgICAuc3Bpbm5lcjphZnRlciB7XFxuICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICAgICAgfVxcbiAgICAgIC5zcGlubmVyIHtcXG4gICAgICAgIGNvbG9yOiAjZmZmZmZmO1xcbiAgICAgICAgZm9udC1zaXplOiAyMnB4O1xcbiAgICAgICAgdGV4dC1pbmRlbnQ6IC05OTk5OXB4O1xcbiAgICAgICAgbWFyZ2luOiAwcHggYXV0bztcXG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgICAgIHdpZHRoOiAyMHB4O1xcbiAgICAgICAgaGVpZ2h0OiAyMHB4O1xcbiAgICAgICAgYm94LXNoYWRvdzogaW5zZXQgMCAwIDAgMnB4O1xcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVooMCk7XFxuICAgICAgICAtbXMtdHJhbnNmb3JtOiB0cmFuc2xhdGVaKDApO1xcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVaKDApO1xcbiAgICAgIH1cXG4gICAgICAuc3Bpbm5lcjpiZWZvcmUsXFxuICAgICAgLnNwaW5uZXI6YWZ0ZXIge1xcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICAgICAgY29udGVudDogXFxcIlxcXCI7XFxuICAgICAgfVxcbiAgICAgIC5zcGlubmVyOmJlZm9yZSB7XFxuICAgICAgICB3aWR0aDogMTAuNHB4O1xcbiAgICAgICAgaGVpZ2h0OiAyMC40cHg7XFxuICAgICAgICBiYWNrZ3JvdW5kOiAjNTQ2OWQ0O1xcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMjAuNHB4IDAgMCAyMC40cHg7XFxuICAgICAgICB0b3A6IC0wLjJweDtcXG4gICAgICAgIGxlZnQ6IC0wLjJweDtcXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjogMTAuNHB4IDEwLjJweDtcXG4gICAgICAgIHRyYW5zZm9ybS1vcmlnaW46IDEwLjRweCAxMC4ycHg7XFxuICAgICAgICAtd2Via2l0LWFuaW1hdGlvbjogbG9hZGluZyAycyBpbmZpbml0ZSBlYXNlIDEuNXM7XFxuICAgICAgICBhbmltYXRpb246IGxvYWRpbmcgMnMgaW5maW5pdGUgZWFzZSAxLjVzO1xcbiAgICAgIH1cXG4gICAgICAuc3Bpbm5lcjphZnRlciB7XFxuICAgICAgICB3aWR0aDogMTAuNHB4O1xcbiAgICAgICAgaGVpZ2h0OiAxMC4ycHg7XFxuICAgICAgICBiYWNrZ3JvdW5kOiAjNTQ2OWQ0O1xcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMCAxMC4ycHggMTAuMnB4IDA7XFxuICAgICAgICB0b3A6IC0wLjFweDtcXG4gICAgICAgIGxlZnQ6IDEwLjJweDtcXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjogMHB4IDEwLjJweDtcXG4gICAgICAgIHRyYW5zZm9ybS1vcmlnaW46IDBweCAxMC4ycHg7XFxuICAgICAgICAtd2Via2l0LWFuaW1hdGlvbjogbG9hZGluZyAycyBpbmZpbml0ZSBlYXNlO1xcbiAgICAgICAgYW5pbWF0aW9uOiBsb2FkaW5nIDJzIGluZmluaXRlIGVhc2U7XFxuICAgICAgfVxcblxcbiAgICAgIEAtd2Via2l0LWtleWZyYW1lcyBsb2FkaW5nIHtcXG4gICAgICAgIDAlIHtcXG4gICAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTtcXG4gICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7XFxuICAgICAgICB9XFxuICAgICAgICAxMDAlIHtcXG4gICAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpO1xcbiAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpO1xcbiAgICAgICAgfVxcbiAgICAgIH1cXG4gICAgICBAa2V5ZnJhbWVzIGxvYWRpbmcge1xcbiAgICAgICAgMCUge1xcbiAgICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDBkZWcpO1xcbiAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTtcXG4gICAgICAgIH1cXG4gICAgICAgIDEwMCUge1xcbiAgICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7XFxuICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7XFxuICAgICAgICB9XFxuICAgICAgfVxcblxcbiAgICAgIEBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDogNjAwcHgpIHtcXG4gICAgICAgIGZvcm0ge1xcbiAgICAgICAgICB3aWR0aDogODB2dztcXG4gICAgICAgICAgbWluLXdpZHRoOiBpbml0aWFsO1xcbiAgICAgICAgfVxcbiAgICAgIH1cXG5cXG4gICAgICAubGRzLXNwaW5uZXIge1xcbiAgICAgICAgY29sb3I6IG9mZmljaWFsO1xcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XFxuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgICAgICB3aWR0aDogODBweDtcXG4gICAgICAgIGhlaWdodDogODBweDtcXG4gICAgICAgIG1hcmdpbjogYXV0bztcXG4gICAgICB9XFxuICAgICAgLmxkcy1zcGlubmVyIGRpdiB7XFxuICAgICAgICB0cmFuc2Zvcm0tb3JpZ2luOiA0MHB4IDQwcHg7XFxuICAgICAgICBhbmltYXRpb246IGxkcy1zcGlubmVyIDEuMnMgbGluZWFyIGluZmluaXRlO1xcbiAgICAgIH1cXG4gICAgICAubGRzLXNwaW5uZXIgZGl2OmFmdGVyIHtcXG4gICAgICAgIGNvbnRlbnQ6IFxcXCIgXFxcIjtcXG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICAgICAgdG9wOiAzcHg7XFxuICAgICAgICBsZWZ0OiAzN3B4O1xcbiAgICAgICAgd2lkdGg6IDZweDtcXG4gICAgICAgIGhlaWdodDogMThweDtcXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDIwJTtcXG4gICAgICAgIGJhY2tncm91bmQ6IGJsYWNrO1xcbiAgICAgIH1cXG4gICAgICAubGRzLXNwaW5uZXIgZGl2Om50aC1jaGlsZCgxKSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTtcXG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogLTEuMXM7XFxuICAgICAgfVxcbiAgICAgIC5sZHMtc3Bpbm5lciBkaXY6bnRoLWNoaWxkKDIpIHtcXG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDMwZGVnKTtcXG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogLTFzO1xcbiAgICAgIH1cXG4gICAgICAubGRzLXNwaW5uZXIgZGl2Om50aC1jaGlsZCgzKSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSg2MGRlZyk7XFxuICAgICAgICBhbmltYXRpb24tZGVsYXk6IC0wLjlzO1xcbiAgICAgIH1cXG4gICAgICAubGRzLXNwaW5uZXIgZGl2Om50aC1jaGlsZCg0KSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSg5MGRlZyk7XFxuICAgICAgICBhbmltYXRpb24tZGVsYXk6IC0wLjhzO1xcbiAgICAgIH1cXG4gICAgICAubGRzLXNwaW5uZXIgZGl2Om50aC1jaGlsZCg1KSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgxMjBkZWcpO1xcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiAtMC43cztcXG4gICAgICB9XFxuICAgICAgLmxkcy1zcGlubmVyIGRpdjpudGgtY2hpbGQoNikge1xcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMTUwZGVnKTtcXG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogLTAuNnM7XFxuICAgICAgfVxcbiAgICAgIC5sZHMtc3Bpbm5lciBkaXY6bnRoLWNoaWxkKDcpIHtcXG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDE4MGRlZyk7XFxuICAgICAgICBhbmltYXRpb24tZGVsYXk6IC0wLjVzO1xcbiAgICAgIH1cXG4gICAgICAubGRzLXNwaW5uZXIgZGl2Om50aC1jaGlsZCg4KSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgyMTBkZWcpO1xcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiAtMC40cztcXG4gICAgICB9XFxuICAgICAgLmxkcy1zcGlubmVyIGRpdjpudGgtY2hpbGQoOSkge1xcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMjQwZGVnKTtcXG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogLTAuM3M7XFxuICAgICAgfVxcbiAgICAgIC5sZHMtc3Bpbm5lciBkaXY6bnRoLWNoaWxkKDEwKSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgyNzBkZWcpO1xcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiAtMC4ycztcXG4gICAgICB9XFxuICAgICAgLmxkcy1zcGlubmVyIGRpdjpudGgtY2hpbGQoMTEpIHtcXG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDMwMGRlZyk7XFxuICAgICAgICBhbmltYXRpb24tZGVsYXk6IC0wLjFzO1xcbiAgICAgIH1cXG4gICAgICAubGRzLXNwaW5uZXIgZGl2Om50aC1jaGlsZCgxMikge1xcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMzMwZGVnKTtcXG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogMHM7XFxuICAgICAgfVxcbiAgICAgIEBrZXlmcmFtZXMgbGRzLXNwaW5uZXIge1xcbiAgICAgICAgMCUge1xcbiAgICAgICAgICBvcGFjaXR5OiAxO1xcbiAgICAgICAgfVxcbiAgICAgICAgMTAwJSB7XFxuICAgICAgICAgIG9wYWNpdHk6IDA7XFxuICAgICAgICB9XFxuICAgICAgfVxcblxcblxcbiAgICBcIjtcbiAgICBpZiAoIWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJzdHlsZVtkYXRhLWxvb3BzXVwiKSkge1xuICAgICAgICB2YXIgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gICAgICAgIHN0eWxlLnNldEF0dHJpYnV0ZShcImRhdGEtbG9vcHNcIiwgXCJcIik7XG4gICAgICAgIHN0eWxlLmlubmVySFRNTCA9IGNzcztcbiAgICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XG4gICAgfVxuICAgIC8vIG1vZGFsXG4gICAgdmFyIG1vZGFsID0gXCJcXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJsb29wcy1wdXJjaGFzZS1tb2RhbFxcXCI+XFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJsb29wcy1wdXJjaGFzZS1tb2RhbC1jb250ZW50XFxcIj5cXG5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcImxkcy1zcGlubmVyIGhpZGRlblxcXCI+PGRpdj48L2Rpdj48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PC9kaXY+XFxuXFxuICAgICAgICAgIDxmb3JtIGlkPVxcXCJwYXltZW50LWZvcm1cXFwiPlxcblxcbiAgICAgICAgICAgIDxkaXYgaWQ9XFxcImxpbmstYXV0aGVudGljYXRpb24tZWxlbWVudFxcXCI+PC9kaXY+XFxuXFxuICAgICAgICAgICAgPGRpdiBpZD1cXFwicGF5bWVudC1lbGVtZW50XFxcIj48L2Rpdj5cXG5cXG4gICAgICAgICAgICA8ZGl2IGlkPVxcXCJhZGRyZXNzLWVsZW1lbnRcXFwiPjwvZGl2PlxcblxcbiAgICAgICAgICAgIDxkaXYgaWQ9XFxcInBheW1lbnQtbWVzc2FnZVxcXCIgY2xhc3M9XFxcImhpZGRlblxcXCI+PC9kaXY+XFxuXFxuICAgICAgICAgICAgPGJ1dHRvbiBpZD1cXFwic3VibWl0XFxcIj5cXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInNwaW5uZXIgaGlkZGVuXFxcIiBpZD1cXFwic3Bpbm5lclxcXCI+PC9kaXY+XFxuICAgICAgICAgICAgICA8c3BhbiBpZD1cXFwiYnV0dG9uLXRleHRcXFwiPlBheSBub3c8L3NwYW4+XFxuICAgICAgICAgICAgPC9idXR0b24+XFxuXFxuICAgICAgICAgICAgPGJ1dHRvbiBpZD1cXFwiY2FuY2VsXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiPlxcbiAgICAgICAgICAgICAgPHNwYW4gaWQ9XFxcImJ1dHRvbi10ZXh0XFxcIj5DYW5jZWw8L3NwYW4+XFxuICAgICAgICAgICAgPC9idXR0b24+XFxuXFxuICAgICAgICAgIDwvZm9ybT5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgIDwvZGl2PlxcbiAgICBcIjtcbiAgICBpZiAoIWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubG9vcHMtcHVyY2hhc2UtbW9kYWxcIikpIHtcbiAgICAgICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGRpdi5pbm5lckhUTUwgPSBtb2RhbDtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkaXYpO1xuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBoaWRlTW9kYWwoKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5sb29wcy1wdXJjaGFzZS1tb2RhbFwiKS5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHNob3dNb2RhbCgpIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmxvb3BzLXB1cmNoYXNlLW1vZGFsXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9IFwiaGlkZGVuXCI7XG59XG5leHBvcnQgZnVuY3Rpb24gaW5pdFN0cmlwZSgpIHtcbiAgICBpZiAoIWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3NjcmlwdFtzcmM9XCJodHRwczovL2pzLnN0cmlwZS5jb20vdjMvXCJdJykpIHtcbiAgICAgICAgdmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XG4gICAgICAgIHNjcmlwdC5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgXCJodHRwczovL2pzLnN0cmlwZS5jb20vdjMvXCIpO1xuICAgICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIHNob3dCdXR0b25Mb2FkZXIoaXNMb2FkaW5nKSB7XG4gICAgaWYgKGlzTG9hZGluZyA9PT0gdHJ1ZSkge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYnV0dG9uXCIpLmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzcGlubmVyXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYnV0dG9uLXRleHRcIikuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJidXR0b25cIikuZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzcGlubmVyXCIpLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYnV0dG9uLXRleHRcIikuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gc2hvd0xvYWRlcigpIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmxkcy1zcGlubmVyXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwYXltZW50LWZvcm1cIikuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBoaWRlTG9hZGVyKCkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubGRzLXNwaW5uZXJcIikuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3BheW1lbnQtZm9ybVwiKS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHNob3dNZXNzYWdlKG1lc3NhZ2VUZXh0KSB7XG4gICAgdmFyIG1lc3NhZ2VDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3BheW1lbnQtbWVzc2FnZVwiKTtcbiAgICBtZXNzYWdlQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gICAgbWVzc2FnZUNvbnRhaW5lci50ZXh0Q29udGVudCA9IG1lc3NhZ2VUZXh0O1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBtZXNzYWdlQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICAgIG1lc3NhZ2VDb250YWluZXIudGV4dENvbnRlbnQgPSBcIlwiO1xuICAgIH0sIDQwMDApO1xufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUxpbmtBdXRoZW50aWNhdGlvbkVsZW1lbnQoZWxlbWVudHMpIHtcbiAgICB2YXIgbGlua0F1dGhlbnRpY2F0aW9uRWxlbWVudCA9IGVsZW1lbnRzLmNyZWF0ZShcImxpbmtBdXRoZW50aWNhdGlvblwiKTtcbiAgICBsaW5rQXV0aGVudGljYXRpb25FbGVtZW50Lm1vdW50KFwiI2xpbmstYXV0aGVudGljYXRpb24tZWxlbWVudFwiKTtcbiAgICByZXR1cm4gbGlua0F1dGhlbnRpY2F0aW9uRWxlbWVudDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQYXltZW50RWxlbWVudChlbGVtZW50cykge1xuICAgIHZhciBwYXltZW50RWxlbWVudCA9IGVsZW1lbnRzLmNyZWF0ZShcInBheW1lbnRcIiwge1xuICAgICAgICBsYXlvdXQ6IFwidGFic1wiLFxuICAgIH0pO1xuICAgIHBheW1lbnRFbGVtZW50Lm1vdW50KFwiI3BheW1lbnQtZWxlbWVudFwiKTtcbiAgICByZXR1cm4gcGF5bWVudEVsZW1lbnQ7XG59XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQWRkcmVzc0VsZW1lbnQoZWxlbWVudHMpIHtcbiAgICB2YXIgYWRkcmVzc0VsZW1lbnQgPSBlbGVtZW50cy5jcmVhdGUoXCJhZGRyZXNzXCIsIHtcbiAgICAgICAgbW9kZTogXCJzaGlwcGluZ1wiLFxuICAgICAgICBhbGxvd2VkQ291bnRyaWVzOiBbXCJKUFwiXSxcbiAgICAgICAgZmllbGRzOiB7XG4gICAgICAgICAgICBwaG9uZTogXCJhbHdheXNcIixcbiAgICAgICAgfSxcbiAgICB9KTtcbiAgICBhZGRyZXNzRWxlbWVudC5tb3VudChcIiNhZGRyZXNzLWVsZW1lbnRcIik7XG4gICAgcmV0dXJuIGFkZHJlc3NFbGVtZW50O1xufVxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUlmcmFtZXMoKSB7XG4gICAgdmFyIGlmcmFtZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpZnJhbWVbbmFtZV49XCJfX3ByaXZhdGVTdHJpcGVDb250cm9sbGVyXCJdJyk7XG4gICAgaWZyYW1lcy5mb3JFYWNoKGZ1bmN0aW9uIChpZnJhbWUpIHtcbiAgICAgICAgaWZyYW1lLnJlbW92ZSgpO1xuICAgIH0pO1xufVxuIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19nZW5lcmF0b3IgPSAodGhpcyAmJiB0aGlzLl9fZ2VuZXJhdG9yKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgYm9keSkge1xuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XG4gICAgICAgIHdoaWxlIChnICYmIChnID0gMCwgb3BbMF0gJiYgKF8gPSAwKSksIF8pIHRyeSB7XG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcbiAgICB9XG59O1xuaW1wb3J0IHsgZ2V0Q3JlZGVudGlhbHMgfSBmcm9tIFwiLi9zZXJ2aWNlL2xvb3BzLWFwaVwiO1xuaW1wb3J0IHsgY3JlYXRlTW9kYWwsIGhpZGVNb2RhbCB9IGZyb20gXCIuL2VsZW1lbnRzL21vZGFsXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpbml0aWFsaXplKGNsaWVudElkLCBjbGllbnRTZWNyZXQpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfYSwgdG9rZW4sIHN0b3JlSWQsIHN0cmlwZUFjY291bnRJZDtcbiAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYikge1xuICAgICAgICAgICAgc3dpdGNoIChfYi5sYWJlbCkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFjbGllbnRJZCB8fCAhY2xpZW50U2VjcmV0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDbGllbnQgSUQgb3IgQ2xpZW50IFNlY3JldCBpcyBub3QgcHJvdmlkZWRcIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgZ2V0Q3JlZGVudGlhbHMoY2xpZW50SWQsIGNsaWVudFNlY3JldCldO1xuICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgX2EgPSBfYi5zZW50KCksIHRva2VuID0gX2EudG9rZW4sIHN0b3JlSWQgPSBfYS5zdG9yZUlkLCBzdHJpcGVBY2NvdW50SWQgPSBfYS5zdHJpcGVBY2NvdW50SWQ7XG4gICAgICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwibG9vcHMtdG9rZW5cIiwgdG9rZW4pO1xuICAgICAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImxvb3BzLXN0b3JlLWlkXCIsIHN0b3JlSWQpO1xuICAgICAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImxvb3BzLXN0cmlwZS1hY2NvdW50LWlkXCIsIHN0cmlwZUFjY291bnRJZCk7XG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZU1vZGFsKCk7XG4gICAgICAgICAgICAgICAgICAgIGhpZGVNb2RhbCgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19nZW5lcmF0b3IgPSAodGhpcyAmJiB0aGlzLl9fZ2VuZXJhdG9yKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgYm9keSkge1xuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XG4gICAgICAgIHdoaWxlIChnICYmIChnID0gMCwgb3BbMF0gJiYgKF8gPSAwKSksIF8pIHRyeSB7XG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcbiAgICB9XG59O1xuaW1wb3J0IHsgbG9hZFN0cmlwZSB9IGZyb20gXCJAc3RyaXBlL3N0cmlwZS1qc1wiO1xuaW1wb3J0IHsgY3JlYXRlU3RyaXBlUGF5bWVudEludGVudCwgY3JlYXRlTG9vcHNTdWJzY3JpcHRpb24sIH0gZnJvbSBcIi4uL3NlcnZpY2UvbG9vcHMtYXBpXCI7XG5pbXBvcnQgeyBjcmVhdGVMaW5rQXV0aGVudGljYXRpb25FbGVtZW50LCBjcmVhdGVQYXltZW50RWxlbWVudCwgY3JlYXRlQWRkcmVzc0VsZW1lbnQsIHJlbW92ZUlmcmFtZXMsIH0gZnJvbSBcIi4uL2VsZW1lbnRzL3N0cmlwZS1lbGVtZW50c1wiO1xuaW1wb3J0IHsgc2hvd01vZGFsLCBoaWRlTW9kYWwsIHNob3dCdXR0b25Mb2FkZXIsIHNob3dMb2FkZXIsIGhpZGVMb2FkZXIsIHNob3dNZXNzYWdlLCB9IGZyb20gXCIuLi9lbGVtZW50cy9tb2RhbFwiO1xudmFyIHNpbmdsZVB1cmNoYXNlID0gZnVuY3Rpb24gKHBsYW4pIHsgcmV0dXJuIF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGNsaWVudFNlY3JldCwgc2VjcmV0LCBlcnJvcl8xLCBzdHJpcGVBY2NvdW50SWQsIHN0cmlwZSwgZW1haWxBZGRyZXNzLCBhZGRyZXNzLCBlbGVtZW50cywgbGlua0F1dGhlbnRpY2F0aW9uRWwsIGNhbmNlbEJ1dHRvbkVsLCBmb3JtO1xuICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIGlmICghcGxhbi5wcmljZSkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBwcmljZVwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2hvd01vZGFsKCk7XG4gICAgICAgICAgICAgICAgc2hvd0xvYWRlcigpO1xuICAgICAgICAgICAgICAgIGNsaWVudFNlY3JldCA9IFwiXCI7XG4gICAgICAgICAgICAgICAgX2EubGFiZWwgPSAxO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIF9hLnRyeXMucHVzaChbMSwgMywgLCA0XSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgY3JlYXRlU3RyaXBlUGF5bWVudEludGVudChwbGFuLnByaWNlKV07XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgc2VjcmV0ID0gKF9hLnNlbnQoKSkuY2xpZW50U2VjcmV0O1xuICAgICAgICAgICAgICAgIGNsaWVudFNlY3JldCA9IHNlY3JldDtcbiAgICAgICAgICAgICAgICByZXR1cm4gWzMgLypicmVhayovLCA0XTtcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICBlcnJvcl8xID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcl8xKTtcbiAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICBpZiAoIWNsaWVudFNlY3JldCkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBjbGllbnQgc2VjcmV0XCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzdHJpcGVBY2NvdW50SWQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImxvb3BzLXN0cmlwZS1hY2NvdW50LWlkXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIGxvYWRTdHJpcGUoXCJwa190ZXN0XzUxSWNOSUVCaW45SGZQZXZnRmVWQmJCVFpvR0tzMW54TFRYazhkd3diWEFDaFZwTTdmQWo1aUtubkNwaTdXRU5VNkNRZjlMMXdHTm9JZ1RvWnh2d3k2MlBJMDBhZ3U1Nmxic1wiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdHJpcGVBY2NvdW50OiBzdHJpcGVBY2NvdW50SWQsXG4gICAgICAgICAgICAgICAgICAgIH0pXTtcbiAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgICBzdHJpcGUgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgZW1haWxBZGRyZXNzID0gXCJcIjtcbiAgICAgICAgICAgICAgICBhZGRyZXNzID0ge307XG4gICAgICAgICAgICAgICAgZWxlbWVudHMgPSBzdHJpcGUuZWxlbWVudHMoe1xuICAgICAgICAgICAgICAgICAgICBhcHBlYXJhbmNlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGVtZTogXCJzdHJpcGVcIixcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgY2xpZW50U2VjcmV0OiBjbGllbnRTZWNyZXQsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgbGlua0F1dGhlbnRpY2F0aW9uRWwgPSBjcmVhdGVMaW5rQXV0aGVudGljYXRpb25FbGVtZW50KGVsZW1lbnRzKTtcbiAgICAgICAgICAgICAgICBsaW5rQXV0aGVudGljYXRpb25FbC5vbihcImNoYW5nZVwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50LmVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhldmVudC5lcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbWFpbEFkZHJlc3MgPSBldmVudC52YWx1ZS5lbWFpbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGNyZWF0ZVBheW1lbnRFbGVtZW50KGVsZW1lbnRzKTtcbiAgICAgICAgICAgICAgICBjcmVhdGVBZGRyZXNzRWxlbWVudChlbGVtZW50cyk7XG4gICAgICAgICAgICAgICAgY2FuY2VsQnV0dG9uRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NhbmNlbFwiKTtcbiAgICAgICAgICAgICAgICBjYW5jZWxCdXR0b25FbCA9PT0gbnVsbCB8fCBjYW5jZWxCdXR0b25FbCA9PT0gdm9pZCAwID8gdm9pZCAwIDogY2FuY2VsQnV0dG9uRWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlSWZyYW1lcygpO1xuICAgICAgICAgICAgICAgICAgICBoaWRlTW9kYWwoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBoaWRlTG9hZGVyKCk7XG4gICAgICAgICAgICAgICAgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGF5bWVudC1mb3JtXCIpO1xuICAgICAgICAgICAgICAgIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBmdW5jdGlvbiAoZXZlbnQpIHsgcmV0dXJuIF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBlcnJvciwgYWRkcmVzc0VsZW1lbnQsIF9hLCBjb21wbGV0ZSwgdmFsdWUsIHN0YXR1c18xLCBlcnJvcl8yO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9iKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKF9iLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93QnV0dG9uTG9hZGVyKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBzdHJpcGUuY29uZmlybVBheW1lbnQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRzOiBlbGVtZW50cyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25maXJtUGFyYW1zOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybl91cmw6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWRpcmVjdDogXCJpZl9yZXF1aXJlZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IgPSAoX2Iuc2VudCgpKS5lcnJvcjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFlcnJvcikgcmV0dXJuIFszIC8qYnJlYWsqLywgMl07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoZXJyb3IgPT09IG51bGwgfHwgZXJyb3IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGVycm9yLnR5cGUpID09PSBcImNhcmRfZXJyb3JcIiB8fCAoZXJyb3IgPT09IG51bGwgfHwgZXJyb3IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGVycm9yLnR5cGUpID09PSBcInZhbGlkYXRpb25fZXJyb3JcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvd01lc3NhZ2UoZXJyb3IubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93TWVzc2FnZShcIkFuIHVuZXhwZWN0ZWQgZXJyb3Igb2NjdXJyZWQuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDhdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRkcmVzc0VsZW1lbnQgPSBlbGVtZW50cy5nZXRFbGVtZW50KFwiYWRkcmVzc1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgYWRkcmVzc0VsZW1lbnQuZ2V0VmFsdWUoKV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYSA9IF9iLnNlbnQoKSwgY29tcGxldGUgPSBfYS5jb21wbGV0ZSwgdmFsdWUgPSBfYS52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbXBsZXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZGRyZXNzID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2IubGFiZWwgPSA0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2IudHJ5cy5wdXNoKFs0LCA2LCA3LCA4XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIGNyZWF0ZUxvb3BzU3Vic2NyaXB0aW9uKGFkZHJlc3MsIHBsYW4sIGVtYWlsQWRkcmVzcyldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzXzEgPSAoX2Iuc2VudCgpKS5zdGF0dXM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdGF0dXNfMSA9PT0gXCJzdWNjZXNzXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3dNZXNzYWdlKFwiU3Vic2NyaXB0aW9uIGNyZWF0ZWQgc3VjY2Vzc2Z1bGx5XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDhdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JfMiA9IF9iLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvd01lc3NhZ2UoXCJBbiB1bmV4cGVjdGVkIGVycm9yIG9jY3VycmVkLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgOF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA3OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93QnV0dG9uTG9hZGVyKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlSWZyYW1lcygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoaWRlTW9kYWwoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs3IC8qZW5kZmluYWxseSovXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDg6IHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7IH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgfVxuICAgIH0pO1xufSk7IH07XG5leHBvcnQgeyBzaW5nbGVQdXJjaGFzZSB9O1xuIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19nZW5lcmF0b3IgPSAodGhpcyAmJiB0aGlzLl9fZ2VuZXJhdG9yKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgYm9keSkge1xuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XG4gICAgICAgIHdoaWxlIChnICYmIChnID0gMCwgb3BbMF0gJiYgKF8gPSAwKSksIF8pIHRyeSB7XG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcbiAgICB9XG59O1xudmFyIGFwaVVybCA9IFwiaHR0cDovL2xvb3BzLXNlcnZlci1hbGItMTA5MDg4OTg4OC5hcC1ub3J0aGVhc3QtMi5lbGIuYW1hem9uYXdzLmNvbVwiO1xuLy8gY29uc3QgYXBpVXJsID0gXCJodHRwOi8vbG9jYWxob3N0OjgwODBcIjtcbmV4cG9ydCBmdW5jdGlvbiBnZXRDcmVkZW50aWFscyhjbGllbnRJZCwgY2xpZW50U2VjcmV0KSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcmVzcG9uc2UsIGRhdGEsIGVycm9yXzE7XG4gICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgIGlmICghY2xpZW50SWQgfHwgIWNsaWVudFNlY3JldCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2xpZW50IElEIG9yIENsaWVudCBTZWNyZXQgaXMgbm90IHByb3ZpZGVkXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF9hLmxhYmVsID0gMTtcbiAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgIF9hLnRyeXMucHVzaChbMSwgNCwgLCA1XSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIGZldGNoKFwiXCIuY29uY2F0KGFwaVVybCwgXCIvYXBpL3YxL2F1dGgvYmFzaWNcIiksIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWVudF9pZDogY2xpZW50SWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWVudF9zZWNyZXQ6IGNsaWVudFNlY3JldCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXTtcbiAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCByZXNwb25zZS5qc29uKCldO1xuICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIGRhdGFdO1xuICAgICAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICAgICAgZXJyb3JfMSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yXzEpO1xuICAgICAgICAgICAgICAgIGNhc2UgNTogcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTdHJpcGVQYXltZW50SW50ZW50KGFtb3VudCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHRva2VuLCByZXNwb25zZSwgZGF0YSwgZXJyb3JfMjtcbiAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImxvb3BzLXRva2VuXCIpO1xuICAgICAgICAgICAgICAgICAgICBfYS5sYWJlbCA9IDE7XG4gICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICBfYS50cnlzLnB1c2goWzEsIDQsICwgNV0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBmZXRjaChcIlwiLmNvbmNhdChhcGlVcmwsIFwiL2FwaS92MS9tZXJjaGFudC9jcmVhdGUtcGF5bWVudC1pbnRlbnRcIiksIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEF1dGhvcml6YXRpb246IFwiQmVhcmVyIFwiLmNvbmNhdCh0b2tlbiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFtb3VudDogYW1vdW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSldO1xuICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHJlc3BvbnNlLmpzb24oKV07XG4gICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICBkYXRhID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgZGF0YV07XG4gICAgICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgICAgICBlcnJvcl8yID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JfMik7XG4gICAgICAgICAgICAgICAgY2FzZSA1OiByZXR1cm4gWzIgLypyZXR1cm4qL107XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUxvb3BzU3Vic2NyaXB0aW9uKGFkZHJlc3MsIHBsYW4sIGVtYWlsKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgdG9rZW4sIG1lcmNoYW50X2lkLCBmaXJzdE5hbWUsIGxhc3ROYW1lLCBib2R5LCByZXNwb25zZSwgZGF0YSwgZXJyb3JfMztcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9iKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKF9iLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICB0b2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwibG9vcHMtdG9rZW5cIik7XG4gICAgICAgICAgICAgICAgICAgIG1lcmNoYW50X2lkID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJsb29wcy1zdG9yZS1pZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFkZHJlc3MubmFtZS5pbmRleE9mKFwiIFwiKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hID0gYWRkcmVzcy5uYW1lLnNwbGl0KFwiIFwiKSwgZmlyc3ROYW1lID0gX2FbMF0sIGxhc3ROYW1lID0gX2FbMV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmaXJzdE5hbWUgPSBhZGRyZXNzLm5hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0TmFtZSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYm9keSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcIjJjNmUyMzlhLWYwMmItZDE1OC0yODMzLWM3Zjg4M2JiNTUzMFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVyY2hhbnRfaWQ6IG1lcmNoYW50X2lkLnRvU3RyaW5nKCksXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9kdWN0c192YXJpYW50OiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9kdWN0X3R5cGU6IFwicGxhblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogcGxhbi5rZXkudG9TdHJpbmcoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVtOiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb246IFwi5ZWG5ZOB44GU44Go44Gu44Oh44Oi44KS566h55CGXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21lcl9pbmZvcm1hdGlvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkZHJlc3MyOiBhZGRyZXNzLmFkZHJlc3MubGluZTIgfHwgXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZGRyZXNzMTogYWRkcmVzcy5hZGRyZXNzLmxpbmUxIHx8IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2l0eTogYWRkcmVzcy5hZGRyZXNzLmNpdHksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJlZjogYWRkcmVzcy5hZGRyZXNzLnN0YXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHppcGNvZGU6IGFkZHJlc3MuYWRkcmVzcy5wb3N0YWxfY29kZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXJzdF9uYW1lOiBmaXJzdE5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdF9uYW1lOiBsYXN0TmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbWFpbDogZW1haWwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVsOiBhZGRyZXNzLnBob25lLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNoaXBwaW5nX2luZm9ybWF0aW9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRkcmVzczI6IGFkZHJlc3MuYWRkcmVzcy5saW5lMiB8fCBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkZHJlc3MxOiBhZGRyZXNzLmFkZHJlc3MubGluZTEgfHwgXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaXR5OiBhZGRyZXNzLmFkZHJlc3MuY2l0eSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmVmOiBhZGRyZXNzLmFkZHJlc3Muc3RhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgemlwY29kZTogYWRkcmVzcy5hZGRyZXNzLnBvc3RhbF9jb2RlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0X25hbWU6IGZpcnN0TmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0X25hbWU6IGxhc3ROYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbDogYWRkcmVzcy5waG9uZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hpcHBpbmc6IFwiMCjpgJrluLjphY3pgIEpIC8gMSjnhKHmlpnphY3pgIEpXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY291cG9uOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBheW1lbnQ6IFwic3RyaXBlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2tfdXJsOiBcImh0dHBzOi8vbG9jYWxob3N0OjQwMDBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIF9iLmxhYmVsID0gMTtcbiAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgIF9iLnRyeXMucHVzaChbMSwgNCwgLCA1XSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIGZldGNoKFwiXCIuY29uY2F0KGFwaVVybCwgXCIvYXBpL3YxL29yZGVycy9jcmVhdGVcIiksIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEF1dGhvcml6YXRpb246IFwiQmFzaWMgXCIuY29uY2F0KHRva2VuKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGJvZHkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSldO1xuICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBfYi5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHJlc3BvbnNlLmpzb24oKV07XG4gICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICBkYXRhID0gX2Iuc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgZGF0YV07XG4gICAgICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgICAgICBlcnJvcl8zID0gX2Iuc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JfMyk7XG4gICAgICAgICAgICAgICAgY2FzZSA1OiByZXR1cm4gWzIgLypyZXR1cm4qL107XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgaW5pdGlhbGl6ZSBmcm9tIFwiLi9sb29wc1wiO1xuZXhwb3J0IHsgc2luZ2xlUHVyY2hhc2UgfSBmcm9tIFwiLi9wdXJjaGFzZS9zaW5nbGVcIjtcbmV4cG9ydCB7IGluaXRpYWxpemUgfTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==