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

/***/ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/requiredArgs/index.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ requiredArgs)
/* harmony export */ });
function requiredArgs(required, args) {
  if (args.length < required) {
    throw new TypeError(required + ' argument' + (required > 1 ? 's' : '') + ' required, but only ' + args.length + ' present');
  }
}

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/toInteger/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/toInteger/index.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ toInteger)
/* harmony export */ });
function toInteger(dirtyNumber) {
  if (dirtyNumber === null || dirtyNumber === true || dirtyNumber === false) {
    return NaN;
  }

  var number = Number(dirtyNumber);

  if (isNaN(number)) {
    return number;
  }

  return number < 0 ? Math.ceil(number) : Math.floor(number);
}

/***/ }),

/***/ "./node_modules/date-fns/esm/addDays/index.js":
/*!****************************************************!*\
  !*** ./node_modules/date-fns/esm/addDays/index.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ addDays)
/* harmony export */ });
/* harmony import */ var _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_lib/toInteger/index.js */ "./node_modules/date-fns/esm/_lib/toInteger/index.js");
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");



/**
 * @name addDays
 * @category Day Helpers
 * @summary Add the specified number of days to the given date.
 *
 * @description
 * Add the specified number of days to the given date.
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of days to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} - the new date with the days added
 * @throws {TypeError} - 2 arguments required
 *
 * @example
 * // Add 10 days to 1 September 2014:
 * const result = addDays(new Date(2014, 8, 1), 10)
 * //=> Thu Sep 11 2014 00:00:00
 */

function addDays(dirtyDate, dirtyAmount) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(2, arguments);
  var date = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDate);
  var amount = (0,_lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(dirtyAmount);

  if (isNaN(amount)) {
    return new Date(NaN);
  }

  if (!amount) {
    // If 0 days, no-op to avoid changing times in the hour before end of DST
    return date;
  }

  date.setDate(date.getDate() + amount);
  return date;
}

/***/ }),

/***/ "./node_modules/date-fns/esm/toDate/index.js":
/*!***************************************************!*\
  !*** ./node_modules/date-fns/esm/toDate/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ toDate)
/* harmony export */ });
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }


/**
 * @name toDate
 * @category Common Helpers
 * @summary Convert the given argument to an instance of Date.
 *
 * @description
 * Convert the given argument to an instance of Date.
 *
 * If the argument is an instance of Date, the function returns its clone.
 *
 * If the argument is a number, it is treated as a timestamp.
 *
 * If the argument is none of the above, the function returns Invalid Date.
 *
 * **Note**: *all* Date arguments passed to any *date-fns* function is processed by `toDate`.
 *
 * @param {Date|Number} argument - the value to convert
 * @returns {Date} the parsed date in the local time zone
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Clone the date:
 * const result = toDate(new Date(2014, 1, 11, 11, 30, 30))
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Convert the timestamp to date:
 * const result = toDate(1392098430000)
 * //=> Tue Feb 11 2014 11:30:30
 */

function toDate(argument) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(1, arguments);
  var argStr = Object.prototype.toString.call(argument); // Clone the date

  if (argument instanceof Date || _typeof(argument) === 'object' && argStr === '[object Date]') {
    // Prevent the date to lose the milliseconds when passed to new Date() in IE10
    return new Date(argument.getTime());
  } else if (typeof argument === 'number' || argStr === '[object Number]') {
    return new Date(argument);
  } else {
    if ((typeof argument === 'string' || argStr === '[object String]') && typeof console !== 'undefined') {
      // eslint-disable-next-line no-console
      console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments"); // eslint-disable-next-line no-console

      console.warn(new Error().stack);
    }

    return new Date(NaN);
  }
}

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
    if (!document.querySelector('style[data-loops]')) {
        var style = document.createElement('style');
        style.setAttribute('data-loops', '');
        style.innerHTML = css;
        document.head.appendChild(style);
    }
    // modal
    var modal = "\n      <div class=\"loops-purchase-modal\">\n        <div class=\"loops-purchase-modal-content\">\n\n        <div class=\"lds-spinner hidden\"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>\n\n          <form id=\"payment-form\">\n\n            <div id=\"link-authentication-element\"></div>\n\n            <div id=\"payment-element\"></div>\n\n            <div id=\"address-element\"></div>\n\n            <div id=\"payment-message\" class=\"hidden\"></div>\n\n            <button id=\"submit\">\n              <div class=\"spinner hidden\" id=\"spinner\"></div>\n              <span id=\"button-text\">Pay now</span>\n            </button>\n\n            <button id=\"cancel\" type=\"button\">\n              <span id=\"button-text\">Cancel</span>\n            </button>\n\n          </form>\n        </div>\n      </div>\n    ";
    if (!document.querySelector('.loops-purchase-modal')) {
        var div = document.createElement('div');
        div.innerHTML = modal;
        document.body.appendChild(div);
    }
}
function hideModal() {
    document.querySelector('.loops-purchase-modal').classList.add('hidden');
}
function showModal() {
    document.querySelector('.loops-purchase-modal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}
function initStripe() {
    if (!document.querySelector('script[src="https://js.stripe.com/v3/"]')) {
        var script = document.createElement('script');
        script.setAttribute('src', 'https://js.stripe.com/v3/');
        document.head.appendChild(script);
    }
}
function showButtonLoader(isLoading) {
    if (isLoading === true) {
        document.querySelector('button').disabled = true;
        document.querySelector('#spinner').classList.remove('hidden');
        document.querySelector('#button-text').classList.add('hidden');
    }
    else {
        document.querySelector('button').disabled = false;
        document.querySelector('#spinner').classList.add('hidden');
        document.querySelector('#button-text').classList.remove('hidden');
    }
}
function showLoader() {
    document.querySelector('.lds-spinner').classList.remove('hidden');
    document.querySelector('#payment-form').classList.add('hidden');
}
function hideLoader() {
    document.querySelector('.lds-spinner').classList.add('hidden');
    document.querySelector('#payment-form').classList.remove('hidden');
}
function showMessage(messageText) {
    var messageContainer = document.querySelector('#payment-message');
    messageContainer.classList.remove('hidden');
    messageContainer.textContent = messageText;
    setTimeout(function () {
        messageContainer.classList.add('hidden');
        messageContainer.textContent = '';
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
    var linkAuthenticationElement = elements.create('linkAuthentication');
    linkAuthenticationElement.mount('#link-authentication-element');
    return linkAuthenticationElement;
}
function createPaymentElement(elements) {
    var paymentElement = elements.create('payment', {
        layout: 'tabs',
    });
    paymentElement.mount('#payment-element');
    return paymentElement;
}
function createAddressElement(elements) {
    var addressElement = elements.create('address', {
        mode: 'shipping',
        allowedCountries: ['JP'],
        fields: {
            phone: 'always',
        },
    });
    addressElement.mount('#address-element');
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
    var clientSecret, stripePaymentId, _a, secret, paymentId, error_1, stripeAccountId, stripe, emailAddress, address, elements, linkAuthenticationEl, cancelButtonEl, form;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!plan.price) {
                    throw new Error('No price');
                }
                // if (!plan.return_url) {
                //   throw new Error('No return url')
                // }
                (0,_elements_modal__WEBPACK_IMPORTED_MODULE_3__.showModal)();
                (0,_elements_modal__WEBPACK_IMPORTED_MODULE_3__.showLoader)();
                clientSecret = '';
                stripePaymentId = '';
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0,_service_loops_api__WEBPACK_IMPORTED_MODULE_1__.createStripePaymentIntent)(plan.price)];
            case 2:
                _a = _b.sent(), secret = _a.clientSecret, paymentId = _a.paymentId;
                clientSecret = secret;
                stripePaymentId = paymentId;
                return [3 /*break*/, 4];
            case 3:
                error_1 = _b.sent();
                throw new Error(error_1);
            case 4:
                if (!clientSecret) {
                    throw new Error('No client secret');
                }
                stripeAccountId = localStorage.getItem('loops-stripe-account-id');
                return [4 /*yield*/, (0,_stripe_stripe_js__WEBPACK_IMPORTED_MODULE_0__.loadStripe)('pk_test_51IcNIEBin9HfPevgFeVBbBTZoGKs1nxLTXk8dwwbXAChVpM7fAj5iKnnCpi7WENU6CQf9L1wGNoIgToZxvwy62PI00agu56lbs', {
                        stripeAccount: stripeAccountId,
                    })];
            case 5:
                stripe = _b.sent();
                emailAddress = '';
                address = {};
                elements = stripe.elements({
                    appearance: {
                        theme: 'stripe',
                    },
                    clientSecret: clientSecret,
                });
                linkAuthenticationEl = (0,_elements_stripe_elements__WEBPACK_IMPORTED_MODULE_2__.createLinkAuthenticationElement)(elements);
                linkAuthenticationEl.on('change', function (event) {
                    if (event.error) {
                        console.log(event.error);
                    }
                    else {
                        emailAddress = event.value.email;
                    }
                });
                (0,_elements_stripe_elements__WEBPACK_IMPORTED_MODULE_2__.createPaymentElement)(elements);
                (0,_elements_stripe_elements__WEBPACK_IMPORTED_MODULE_2__.createAddressElement)(elements);
                cancelButtonEl = document.querySelector('#cancel');
                cancelButtonEl === null || cancelButtonEl === void 0 ? void 0 : cancelButtonEl.addEventListener('click', function (e) {
                    e.preventDefault();
                    (0,_elements_stripe_elements__WEBPACK_IMPORTED_MODULE_2__.removeIframes)();
                    (0,_elements_modal__WEBPACK_IMPORTED_MODULE_3__.hideModal)();
                });
                (0,_elements_modal__WEBPACK_IMPORTED_MODULE_3__.hideLoader)();
                form = document.getElementById('payment-form');
                form.addEventListener('submit', function (event) { return __awaiter(void 0, void 0, void 0, function () {
                    var addressElement, _a, complete, value, status_1, error, error_2;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                event.preventDefault();
                                (0,_elements_modal__WEBPACK_IMPORTED_MODULE_3__.showButtonLoader)(true);
                                addressElement = elements.getElement('address');
                                return [4 /*yield*/, addressElement.getValue()];
                            case 1:
                                _a = _b.sent(), complete = _a.complete, value = _a.value;
                                if (complete) {
                                    address = value;
                                }
                                _b.label = 2;
                            case 2:
                                _b.trys.push([2, 6, 7, 8]);
                                return [4 /*yield*/, (0,_service_loops_api__WEBPACK_IMPORTED_MODULE_1__.createLoopsSubscription)(address, plan, emailAddress, stripePaymentId)];
                            case 3:
                                status_1 = (_b.sent()).status;
                                if (!(status_1 === 'success')) return [3 /*break*/, 5];
                                return [4 /*yield*/, stripe.confirmPayment({
                                        elements: elements,
                                        confirmParams: {
                                            return_url: '',
                                        },
                                        redirect: 'if_required',
                                    })];
                            case 4:
                                error = (_b.sent()).error;
                                if (error) {
                                    if ((error === null || error === void 0 ? void 0 : error.type) === 'card_error' ||
                                        (error === null || error === void 0 ? void 0 : error.type) === 'validation_error') {
                                        (0,_elements_modal__WEBPACK_IMPORTED_MODULE_3__.showMessage)(error.message);
                                    }
                                    else {
                                        (0,_elements_modal__WEBPACK_IMPORTED_MODULE_3__.showMessage)('An unexpected error occurred.');
                                    }
                                }
                                (0,_elements_modal__WEBPACK_IMPORTED_MODULE_3__.showMessage)('Subscription created successfully');
                                _b.label = 5;
                            case 5: return [3 /*break*/, 8];
                            case 6:
                                error_2 = _b.sent();
                                (0,_elements_modal__WEBPACK_IMPORTED_MODULE_3__.showMessage)('An unexpected error occurred.');
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
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/addDays/index.js");
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
var apiUrl = 'http://loops-server-alb-1090889888.ap-northeast-2.elb.amazonaws.com';
// shipping: '0(通常配送) / 1(無料配送)',
// 0: plan
// 1: product
// 2: group
// const apiUrl = 'http://localhost:8080'

function getCredentials(clientId, clientSecret) {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!clientId || !clientSecret) {
                        throw new Error('Client ID or Client Secret is not provided');
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch("".concat(apiUrl, "/api/v1/auth/basic"), {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
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
                    token = localStorage.getItem('loops-token');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch("".concat(apiUrl, "/api/v1/merchant/create-payment-intent"), {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
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
function createLoopsSubscription(address, plan, email, stripePaymentId) {
    return __awaiter(this, void 0, void 0, function () {
        var token, merchant_id, firstName, lastName, body, response, data, error_3;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    token = localStorage.getItem('loops-token');
                    merchant_id = localStorage.getItem('loops-store-id');
                    if (address.name.indexOf(' ') !== -1) {
                        _a = address.name.split(' '), firstName = _a[0], lastName = _a[1];
                    }
                    else {
                        firstName = address.name;
                        lastName = '';
                    }
                    body = {
                        id: '2c6e239a-f02b-d158-2833-c7f883bb5530',
                        merchant_id: merchant_id.toString(),
                        payment_id: stripePaymentId,
                        products_variant: [
                            {
                                product_type: 0,
                                id: plan.key.toString(),
                                num: 1,
                                option: '商品ごとのメモを管理',
                            },
                        ],
                        customer_information: {
                            address2: address.address.line2 || '',
                            address1: address.address.line1 || '',
                            city: address.address.city,
                            pref: address.address.state,
                            zipcode: address.address.postal_code,
                            first_name: firstName,
                            last_name: lastName,
                            email: email,
                            tel: address.phone,
                        },
                        shipping_information: {
                            address2: address.address.line2 || '',
                            address1: address.address.line1 || '',
                            city: address.address.city,
                            pref: address.address.state,
                            zipcode: address.address.postal_code,
                            first_name: firstName,
                            last_name: lastName,
                            tel: address.phone,
                        },
                        options: {
                            shipping: 0,
                            schedule_delivery_date: (0,date_fns__WEBPACK_IMPORTED_MODULE_0__["default"])(new Date(), plan.shipping_preparation_term).toLocaleString('en-US', { timeZone: 'Asia/Tokyo' }),
                            schedule_payment_date: calculateSchedulePaymentDate(plan).toLocaleString('en-US', { timeZone: 'Asia/Tokyo' }),
                            complete_payment_date: new Date().toLocaleString('en-US', {
                                timeZone: 'Asia/Tokyo',
                            }),
                            coupon: '',
                            payment: 0,
                            callback_url: 'https://localhost:4000',
                        },
                    };
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch("".concat(apiUrl, "/api/v1/orders/create"), {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
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
function calculateSchedulePaymentDate(plan) {
    /**
     ** Production usage
     */
    // const firstPurchaseDate = new Date()
    // const secondPurchaseDate = addMonths(firstPurchaseDate, 1)
    // if (plan.second_fixed_payment === 'none') {
    //   return secondPurchaseDate
    // }
    // if (plan.second_fixed_payment === 'last') {
    //   return endOfMonth(secondPurchaseDate)
    // }
    // return setDate(secondPurchaseDate, Number(plan.second_fixed_payment))
    /**
     ** Testing usage
     */
    var firstPurchaseDate = new Date();
    if (plan.second_fixed_payment === 'none' ||
        plan.second_fixed_payment === 'last') {
        return (0,date_fns__WEBPACK_IMPORTED_MODULE_0__["default"])(firstPurchaseDate, 1);
    }
    return (0,date_fns__WEBPACK_IMPORTED_MODULE_0__["default"])(firstPurchaseDate, Number(plan.second_fixed_payment));
    /**
     ** Commented for phase one
     */
    // const interval = plan.interval
    // if (isAfter(setDate(secondPurchaseDate, secondFixPayment), addDays(firstPurchaseDate, interval))) {
    //   return setDate(secondPurchaseDate, secondFixPayment)
    // } else {
    //   return addMonths(setDate(secondPurchaseDate, secondFixPayment), 1)
    // }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBLG9EQUFvRCxvREFBTyx1RUFBdUUsd0JBQXdCO0FBQzFKLGdIQUFnSCx3QkFBd0I7QUFDeEk7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLG9EQUFPO0FBQ3RCO0FBQ0EsV0FBVyxvREFBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOzs7Ozs7O1VDdE9BO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7OztBQ05pQztBQUNrQjtBQUM3QiIsInNvdXJjZXMiOlsid2VicGFjazovL2xvb3BzLy4vbm9kZV9tb2R1bGVzL0BzdHJpcGUvc3RyaXBlLWpzL2Rpc3Qvc3RyaXBlLmVzbS5qcyIsIndlYnBhY2s6Ly9sb29wcy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vX2xpYi9yZXF1aXJlZEFyZ3MvaW5kZXguanMiLCJ3ZWJwYWNrOi8vbG9vcHMvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL19saWIvdG9JbnRlZ2VyL2luZGV4LmpzIiwid2VicGFjazovL2xvb3BzLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9hZGREYXlzL2luZGV4LmpzIiwid2VicGFjazovL2xvb3BzLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS90b0RhdGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vbG9vcHMvLi9zcmMvZWxlbWVudHMvbW9kYWwudHMiLCJ3ZWJwYWNrOi8vbG9vcHMvLi9zcmMvZWxlbWVudHMvc3RyaXBlLWVsZW1lbnRzLnRzIiwid2VicGFjazovL2xvb3BzLy4vc3JjL2xvb3BzLnRzIiwid2VicGFjazovL2xvb3BzLy4vc3JjL3B1cmNoYXNlL3NpbmdsZS50cyIsIndlYnBhY2s6Ly9sb29wcy8uL3NyYy9zZXJ2aWNlL2xvb3BzLWFwaS50cyIsIndlYnBhY2s6Ly9sb29wcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9sb29wcy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbG9vcHMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9sb29wcy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2xvb3BzLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBWM19VUkwgPSAnaHR0cHM6Ly9qcy5zdHJpcGUuY29tL3YzJztcbnZhciBWM19VUkxfUkVHRVggPSAvXmh0dHBzOlxcL1xcL2pzXFwuc3RyaXBlXFwuY29tXFwvdjNcXC8/KFxcPy4qKT8kLztcbnZhciBFWElTVElOR19TQ1JJUFRfTUVTU0FHRSA9ICdsb2FkU3RyaXBlLnNldExvYWRQYXJhbWV0ZXJzIHdhcyBjYWxsZWQgYnV0IGFuIGV4aXN0aW5nIFN0cmlwZS5qcyBzY3JpcHQgYWxyZWFkeSBleGlzdHMgaW4gdGhlIGRvY3VtZW50OyBleGlzdGluZyBzY3JpcHQgcGFyYW1ldGVycyB3aWxsIGJlIHVzZWQnO1xudmFyIGZpbmRTY3JpcHQgPSBmdW5jdGlvbiBmaW5kU2NyaXB0KCkge1xuICB2YXIgc2NyaXB0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJzY3JpcHRbc3JjXj1cXFwiXCIuY29uY2F0KFYzX1VSTCwgXCJcXFwiXVwiKSk7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzY3JpcHRzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHNjcmlwdCA9IHNjcmlwdHNbaV07XG5cbiAgICBpZiAoIVYzX1VSTF9SRUdFWC50ZXN0KHNjcmlwdC5zcmMpKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gc2NyaXB0O1xuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59O1xuXG52YXIgaW5qZWN0U2NyaXB0ID0gZnVuY3Rpb24gaW5qZWN0U2NyaXB0KHBhcmFtcykge1xuICB2YXIgcXVlcnlTdHJpbmcgPSBwYXJhbXMgJiYgIXBhcmFtcy5hZHZhbmNlZEZyYXVkU2lnbmFscyA/ICc/YWR2YW5jZWRGcmF1ZFNpZ25hbHM9ZmFsc2UnIDogJyc7XG4gIHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgc2NyaXB0LnNyYyA9IFwiXCIuY29uY2F0KFYzX1VSTCkuY29uY2F0KHF1ZXJ5U3RyaW5nKTtcbiAgdmFyIGhlYWRPckJvZHkgPSBkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmJvZHk7XG5cbiAgaWYgKCFoZWFkT3JCb2R5KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCBkb2N1bWVudC5ib2R5IG5vdCB0byBiZSBudWxsLiBTdHJpcGUuanMgcmVxdWlyZXMgYSA8Ym9keT4gZWxlbWVudC4nKTtcbiAgfVxuXG4gIGhlYWRPckJvZHkuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiAgcmV0dXJuIHNjcmlwdDtcbn07XG5cbnZhciByZWdpc3RlcldyYXBwZXIgPSBmdW5jdGlvbiByZWdpc3RlcldyYXBwZXIoc3RyaXBlLCBzdGFydFRpbWUpIHtcbiAgaWYgKCFzdHJpcGUgfHwgIXN0cmlwZS5fcmVnaXN0ZXJXcmFwcGVyKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgc3RyaXBlLl9yZWdpc3RlcldyYXBwZXIoe1xuICAgIG5hbWU6ICdzdHJpcGUtanMnLFxuICAgIHZlcnNpb246IFwiMS40Ni4wXCIsXG4gICAgc3RhcnRUaW1lOiBzdGFydFRpbWVcbiAgfSk7XG59O1xuXG52YXIgc3RyaXBlUHJvbWlzZSA9IG51bGw7XG52YXIgbG9hZFNjcmlwdCA9IGZ1bmN0aW9uIGxvYWRTY3JpcHQocGFyYW1zKSB7XG4gIC8vIEVuc3VyZSB0aGF0IHdlIG9ubHkgYXR0ZW1wdCB0byBsb2FkIFN0cmlwZS5qcyBhdCBtb3N0IG9uY2VcbiAgaWYgKHN0cmlwZVByb21pc2UgIT09IG51bGwpIHtcbiAgICByZXR1cm4gc3RyaXBlUHJvbWlzZTtcbiAgfVxuXG4gIHN0cmlwZVByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAvLyBSZXNvbHZlIHRvIG51bGwgd2hlbiBpbXBvcnRlZCBzZXJ2ZXIgc2lkZS4gVGhpcyBtYWtlcyB0aGUgbW9kdWxlXG4gICAgICAvLyBzYWZlIHRvIGltcG9ydCBpbiBhbiBpc29tb3JwaGljIGNvZGUgYmFzZS5cbiAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHdpbmRvdy5TdHJpcGUgJiYgcGFyYW1zKSB7XG4gICAgICBjb25zb2xlLndhcm4oRVhJU1RJTkdfU0NSSVBUX01FU1NBR0UpO1xuICAgIH1cblxuICAgIGlmICh3aW5kb3cuU3RyaXBlKSB7XG4gICAgICByZXNvbHZlKHdpbmRvdy5TdHJpcGUpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICB2YXIgc2NyaXB0ID0gZmluZFNjcmlwdCgpO1xuXG4gICAgICBpZiAoc2NyaXB0ICYmIHBhcmFtcykge1xuICAgICAgICBjb25zb2xlLndhcm4oRVhJU1RJTkdfU0NSSVBUX01FU1NBR0UpO1xuICAgICAgfSBlbHNlIGlmICghc2NyaXB0KSB7XG4gICAgICAgIHNjcmlwdCA9IGluamVjdFNjcmlwdChwYXJhbXMpO1xuICAgICAgfVxuXG4gICAgICBzY3JpcHQuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHdpbmRvdy5TdHJpcGUpIHtcbiAgICAgICAgICByZXNvbHZlKHdpbmRvdy5TdHJpcGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoJ1N0cmlwZS5qcyBub3QgYXZhaWxhYmxlJykpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHNjcmlwdC5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmVqZWN0KG5ldyBFcnJvcignRmFpbGVkIHRvIGxvYWQgU3RyaXBlLmpzJykpO1xuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIHN0cmlwZVByb21pc2U7XG59O1xudmFyIGluaXRTdHJpcGUgPSBmdW5jdGlvbiBpbml0U3RyaXBlKG1heWJlU3RyaXBlLCBhcmdzLCBzdGFydFRpbWUpIHtcbiAgaWYgKG1heWJlU3RyaXBlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICB2YXIgc3RyaXBlID0gbWF5YmVTdHJpcGUuYXBwbHkodW5kZWZpbmVkLCBhcmdzKTtcbiAgcmVnaXN0ZXJXcmFwcGVyKHN0cmlwZSwgc3RhcnRUaW1lKTtcbiAgcmV0dXJuIHN0cmlwZTtcbn07IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvZXhwbGljaXQtbW9kdWxlLWJvdW5kYXJ5LXR5cGVzXG5cbi8vIG93biBzY3JpcHQgaW5qZWN0aW9uLlxuXG52YXIgc3RyaXBlUHJvbWlzZSQxID0gUHJvbWlzZS5yZXNvbHZlKCkudGhlbihmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBsb2FkU2NyaXB0KG51bGwpO1xufSk7XG52YXIgbG9hZENhbGxlZCA9IGZhbHNlO1xuc3RyaXBlUHJvbWlzZSQxW1wiY2F0Y2hcIl0oZnVuY3Rpb24gKGVycikge1xuICBpZiAoIWxvYWRDYWxsZWQpIHtcbiAgICBjb25zb2xlLndhcm4oZXJyKTtcbiAgfVxufSk7XG52YXIgbG9hZFN0cmlwZSA9IGZ1bmN0aW9uIGxvYWRTdHJpcGUoKSB7XG4gIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgIGFyZ3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gIH1cblxuICBsb2FkQ2FsbGVkID0gdHJ1ZTtcbiAgdmFyIHN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gIHJldHVybiBzdHJpcGVQcm9taXNlJDEudGhlbihmdW5jdGlvbiAobWF5YmVTdHJpcGUpIHtcbiAgICByZXR1cm4gaW5pdFN0cmlwZShtYXliZVN0cmlwZSwgYXJncywgc3RhcnRUaW1lKTtcbiAgfSk7XG59O1xuXG5leHBvcnQgeyBsb2FkU3RyaXBlIH07XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZXF1aXJlZEFyZ3MocmVxdWlyZWQsIGFyZ3MpIHtcbiAgaWYgKGFyZ3MubGVuZ3RoIDwgcmVxdWlyZWQpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHJlcXVpcmVkICsgJyBhcmd1bWVudCcgKyAocmVxdWlyZWQgPiAxID8gJ3MnIDogJycpICsgJyByZXF1aXJlZCwgYnV0IG9ubHkgJyArIGFyZ3MubGVuZ3RoICsgJyBwcmVzZW50Jyk7XG4gIH1cbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0b0ludGVnZXIoZGlydHlOdW1iZXIpIHtcbiAgaWYgKGRpcnR5TnVtYmVyID09PSBudWxsIHx8IGRpcnR5TnVtYmVyID09PSB0cnVlIHx8IGRpcnR5TnVtYmVyID09PSBmYWxzZSkge1xuICAgIHJldHVybiBOYU47XG4gIH1cblxuICB2YXIgbnVtYmVyID0gTnVtYmVyKGRpcnR5TnVtYmVyKTtcblxuICBpZiAoaXNOYU4obnVtYmVyKSkge1xuICAgIHJldHVybiBudW1iZXI7XG4gIH1cblxuICByZXR1cm4gbnVtYmVyIDwgMCA/IE1hdGguY2VpbChudW1iZXIpIDogTWF0aC5mbG9vcihudW1iZXIpO1xufSIsImltcG9ydCB0b0ludGVnZXIgZnJvbSBcIi4uL19saWIvdG9JbnRlZ2VyL2luZGV4LmpzXCI7XG5pbXBvcnQgdG9EYXRlIGZyb20gXCIuLi90b0RhdGUvaW5kZXguanNcIjtcbmltcG9ydCByZXF1aXJlZEFyZ3MgZnJvbSBcIi4uL19saWIvcmVxdWlyZWRBcmdzL2luZGV4LmpzXCI7XG4vKipcbiAqIEBuYW1lIGFkZERheXNcbiAqIEBjYXRlZ29yeSBEYXkgSGVscGVyc1xuICogQHN1bW1hcnkgQWRkIHRoZSBzcGVjaWZpZWQgbnVtYmVyIG9mIGRheXMgdG8gdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBBZGQgdGhlIHNwZWNpZmllZCBudW1iZXIgb2YgZGF5cyB0byB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8TnVtYmVyfSBkYXRlIC0gdGhlIGRhdGUgdG8gYmUgY2hhbmdlZFxuICogQHBhcmFtIHtOdW1iZXJ9IGFtb3VudCAtIHRoZSBhbW91bnQgb2YgZGF5cyB0byBiZSBhZGRlZC4gUG9zaXRpdmUgZGVjaW1hbHMgd2lsbCBiZSByb3VuZGVkIHVzaW5nIGBNYXRoLmZsb29yYCwgZGVjaW1hbHMgbGVzcyB0aGFuIHplcm8gd2lsbCBiZSByb3VuZGVkIHVzaW5nIGBNYXRoLmNlaWxgLlxuICogQHJldHVybnMge0RhdGV9IC0gdGhlIG5ldyBkYXRlIHdpdGggdGhlIGRheXMgYWRkZWRcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gLSAyIGFyZ3VtZW50cyByZXF1aXJlZFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBBZGQgMTAgZGF5cyB0byAxIFNlcHRlbWJlciAyMDE0OlxuICogY29uc3QgcmVzdWx0ID0gYWRkRGF5cyhuZXcgRGF0ZSgyMDE0LCA4LCAxKSwgMTApXG4gKiAvLz0+IFRodSBTZXAgMTEgMjAxNCAwMDowMDowMFxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFkZERheXMoZGlydHlEYXRlLCBkaXJ0eUFtb3VudCkge1xuICByZXF1aXJlZEFyZ3MoMiwgYXJndW1lbnRzKTtcbiAgdmFyIGRhdGUgPSB0b0RhdGUoZGlydHlEYXRlKTtcbiAgdmFyIGFtb3VudCA9IHRvSW50ZWdlcihkaXJ0eUFtb3VudCk7XG5cbiAgaWYgKGlzTmFOKGFtb3VudCkpIHtcbiAgICByZXR1cm4gbmV3IERhdGUoTmFOKTtcbiAgfVxuXG4gIGlmICghYW1vdW50KSB7XG4gICAgLy8gSWYgMCBkYXlzLCBuby1vcCB0byBhdm9pZCBjaGFuZ2luZyB0aW1lcyBpbiB0aGUgaG91ciBiZWZvcmUgZW5kIG9mIERTVFxuICAgIHJldHVybiBkYXRlO1xuICB9XG5cbiAgZGF0ZS5zZXREYXRlKGRhdGUuZ2V0RGF0ZSgpICsgYW1vdW50KTtcbiAgcmV0dXJuIGRhdGU7XG59IiwiZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgXCJAYmFiZWwvaGVscGVycyAtIHR5cGVvZlwiOyBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIpIHsgX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9OyB9IGVsc2UgeyBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07IH0gcmV0dXJuIF90eXBlb2Yob2JqKTsgfVxuXG5pbXBvcnQgcmVxdWlyZWRBcmdzIGZyb20gXCIuLi9fbGliL3JlcXVpcmVkQXJncy9pbmRleC5qc1wiO1xuLyoqXG4gKiBAbmFtZSB0b0RhdGVcbiAqIEBjYXRlZ29yeSBDb21tb24gSGVscGVyc1xuICogQHN1bW1hcnkgQ29udmVydCB0aGUgZ2l2ZW4gYXJndW1lbnQgdG8gYW4gaW5zdGFuY2Ugb2YgRGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIENvbnZlcnQgdGhlIGdpdmVuIGFyZ3VtZW50IHRvIGFuIGluc3RhbmNlIG9mIERhdGUuXG4gKlxuICogSWYgdGhlIGFyZ3VtZW50IGlzIGFuIGluc3RhbmNlIG9mIERhdGUsIHRoZSBmdW5jdGlvbiByZXR1cm5zIGl0cyBjbG9uZS5cbiAqXG4gKiBJZiB0aGUgYXJndW1lbnQgaXMgYSBudW1iZXIsIGl0IGlzIHRyZWF0ZWQgYXMgYSB0aW1lc3RhbXAuXG4gKlxuICogSWYgdGhlIGFyZ3VtZW50IGlzIG5vbmUgb2YgdGhlIGFib3ZlLCB0aGUgZnVuY3Rpb24gcmV0dXJucyBJbnZhbGlkIERhdGUuXG4gKlxuICogKipOb3RlKio6ICphbGwqIERhdGUgYXJndW1lbnRzIHBhc3NlZCB0byBhbnkgKmRhdGUtZm5zKiBmdW5jdGlvbiBpcyBwcm9jZXNzZWQgYnkgYHRvRGF0ZWAuXG4gKlxuICogQHBhcmFtIHtEYXRlfE51bWJlcn0gYXJndW1lbnQgLSB0aGUgdmFsdWUgdG8gY29udmVydFxuICogQHJldHVybnMge0RhdGV9IHRoZSBwYXJzZWQgZGF0ZSBpbiB0aGUgbG9jYWwgdGltZSB6b25lXG4gKiBAdGhyb3dzIHtUeXBlRXJyb3J9IDEgYXJndW1lbnQgcmVxdWlyZWRcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gQ2xvbmUgdGhlIGRhdGU6XG4gKiBjb25zdCByZXN1bHQgPSB0b0RhdGUobmV3IERhdGUoMjAxNCwgMSwgMTEsIDExLCAzMCwgMzApKVxuICogLy89PiBUdWUgRmViIDExIDIwMTQgMTE6MzA6MzBcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gQ29udmVydCB0aGUgdGltZXN0YW1wIHRvIGRhdGU6XG4gKiBjb25zdCByZXN1bHQgPSB0b0RhdGUoMTM5MjA5ODQzMDAwMClcbiAqIC8vPT4gVHVlIEZlYiAxMSAyMDE0IDExOjMwOjMwXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdG9EYXRlKGFyZ3VtZW50KSB7XG4gIHJlcXVpcmVkQXJncygxLCBhcmd1bWVudHMpO1xuICB2YXIgYXJnU3RyID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGFyZ3VtZW50KTsgLy8gQ2xvbmUgdGhlIGRhdGVcblxuICBpZiAoYXJndW1lbnQgaW5zdGFuY2VvZiBEYXRlIHx8IF90eXBlb2YoYXJndW1lbnQpID09PSAnb2JqZWN0JyAmJiBhcmdTdHIgPT09ICdbb2JqZWN0IERhdGVdJykge1xuICAgIC8vIFByZXZlbnQgdGhlIGRhdGUgdG8gbG9zZSB0aGUgbWlsbGlzZWNvbmRzIHdoZW4gcGFzc2VkIHRvIG5ldyBEYXRlKCkgaW4gSUUxMFxuICAgIHJldHVybiBuZXcgRGF0ZShhcmd1bWVudC5nZXRUaW1lKCkpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBhcmd1bWVudCA9PT0gJ251bWJlcicgfHwgYXJnU3RyID09PSAnW29iamVjdCBOdW1iZXJdJykge1xuICAgIHJldHVybiBuZXcgRGF0ZShhcmd1bWVudCk7XG4gIH0gZWxzZSB7XG4gICAgaWYgKCh0eXBlb2YgYXJndW1lbnQgPT09ICdzdHJpbmcnIHx8IGFyZ1N0ciA9PT0gJ1tvYmplY3QgU3RyaW5nXScpICYmIHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgIGNvbnNvbGUud2FybihcIlN0YXJ0aW5nIHdpdGggdjIuMC4wLWJldGEuMSBkYXRlLWZucyBkb2Vzbid0IGFjY2VwdCBzdHJpbmdzIGFzIGRhdGUgYXJndW1lbnRzLiBQbGVhc2UgdXNlIGBwYXJzZUlTT2AgdG8gcGFyc2Ugc3RyaW5ncy4gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvZGF0ZS1mbnMvYmxvYi9tYXN0ZXIvZG9jcy91cGdyYWRlR3VpZGUubWQjc3RyaW5nLWFyZ3VtZW50c1wiKTsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcblxuICAgICAgY29uc29sZS53YXJuKG5ldyBFcnJvcigpLnN0YWNrKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IERhdGUoTmFOKTtcbiAgfVxufSIsImV4cG9ydCBmdW5jdGlvbiBjcmVhdGVNb2RhbCgpIHtcbiAgICAvLyBzdHlsZSB0YWdcbiAgICB2YXIgY3NzID0gXCJcXG4gICAgICAubG9vcHMtcHVyY2hhc2UtbW9kYWwge1xcbiAgICAgICAgICBwb3NpdGlvbjogZml4ZWQ7XFxuICAgICAgICAgIHRvcDogNTAlO1xcbiAgICAgICAgICBsZWZ0OiA1MCU7XFxuICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xcbiAgICAgICAgICB3aWR0aDogMTAwJTtcXG4gICAgICAgICAgaGVpZ2h0OiAxMDAlO1xcbiAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjQpO1xcbiAgICAgIH1cXG5cXG4gICAgICAubG9vcHMtcHVyY2hhc2UtbW9kYWwtY29udGVudCB7XFxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmVmZWZlO1xcbiAgICAgICAgd2lkdGg6IDUwJTtcXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XFxuICAgICAgICBtYXgtaGVpZ2h0OiA5MHZoO1xcbiAgICAgICAgb3ZlcmZsb3cteTogYXV0bztcXG4gICAgICB9XFxuXFxuICAgICAgLnRpdGxlIHtcXG4gICAgICAgIGZvbnQtc2l6ZTogMjBweDtcXG4gICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xcbiAgICAgICAgcGFkZGluZzogMjBweDtcXG4gICAgICB9XFxuXFxuICAgICAgZm9ybSB7XFxuICAgICAgICBtaW4td2lkdGg6IDUwMHB4O1xcbiAgICAgICAgYWxpZ24tc2VsZjogY2VudGVyO1xcbiAgICAgICAgYm94LXNoYWRvdzogMHB4IDBweCAwcHggMC41cHggcmdiYSg1MCwgNTAsIDkzLCAwLjEpLFxcbiAgICAgICAgICAwcHggMnB4IDVweCAwcHggcmdiYSg1MCwgNTAsIDkzLCAwLjEpLCAwcHggMXB4IDEuNXB4IDBweCByZ2JhKDAsIDAsIDAsIDAuMDcpO1xcbiAgICAgICAgYm9yZGVyLXJhZGl1czogN3B4O1xcbiAgICAgICAgcGFkZGluZzogNDBweDtcXG4gICAgICB9XFxuXFxuICAgICAgLmhpZGRlbiB7XFxuICAgICAgICBkaXNwbGF5OiBub25lIWltcG9ydGFudDtcXG4gICAgICB9XFxuXFxuICAgICAgI3BheW1lbnQtbWVzc2FnZSB7XFxuICAgICAgICBjb2xvcjogcmdiKDEwNSwgMTE1LCAxMzQpO1xcbiAgICAgICAgZm9udC1zaXplOiAxNnB4O1xcbiAgICAgICAgbGluZS1oZWlnaHQ6IDIwcHg7XFxuICAgICAgICBwYWRkaW5nLXRvcDogMTJweDtcXG4gICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgICB9XFxuXFxuICAgICAgI2xpbmstYXV0aGVudGljYXRpb24tZWxlbWVudCB7XFxuICAgICAgICBtYXJnaW4tYm90dG9tOiAyNHB4O1xcbiAgICAgIH1cXG5cXG4gICAgICAjcGF5bWVudC1lbGVtZW50IHtcXG4gICAgICAgIG1hcmdpbi1ib3R0b206IDI0cHg7XFxuICAgICAgfVxcblxcbiAgICAgICNhZGRyZXNzLWVsZW1lbnQge1xcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMjRweDtcXG4gICAgICB9XFxuXFxuICAgICAgLyogQnV0dG9ucyBhbmQgbGlua3MgKi9cXG4gICAgICAjc3VibWl0IHtcXG4gICAgICAgIGJhY2tncm91bmQ6ICM1NDY5ZDQ7XFxuICAgICAgICBmb250LWZhbWlseTogQXJpYWwsIHNhbnMtc2VyaWY7XFxuICAgICAgICBjb2xvcjogI2ZmZmZmZjtcXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDRweDtcXG4gICAgICAgIGJvcmRlcjogMDtcXG4gICAgICAgIHBhZGRpbmc6IDEycHggMTZweDtcXG4gICAgICAgIGZvbnQtc2l6ZTogMTZweDtcXG4gICAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XFxuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgICAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgICAgIHRyYW5zaXRpb246IGFsbCAwLjJzIGVhc2U7XFxuICAgICAgICBib3gtc2hhZG93OiAwcHggNHB4IDUuNXB4IDBweCByZ2JhKDAsIDAsIDAsIDAuMDcpO1xcbiAgICAgICAgd2lkdGg6IDEwMCU7XFxuICAgICAgfVxcbiAgICAgICNzdWJtaXQ6aG92ZXIge1xcbiAgICAgICAgZmlsdGVyOiBjb250cmFzdCgxMTUlKTtcXG4gICAgICB9XFxuICAgICAgI3N1Ym1pdDpkaXNhYmxlZCB7XFxuICAgICAgICBvcGFjaXR5OiAwLjU7XFxuICAgICAgICBjdXJzb3I6IGRlZmF1bHQ7XFxuICAgICAgfVxcblxcbiAgICAgICNjYW5jZWwge1xcbiAgICAgICAgYmFja2dyb3VuZDogd2hpdGU7XFxuICAgICAgICBmb250LWZhbWlseTogQXJpYWwsIHNhbnMtc2VyaWY7XFxuICAgICAgICBib3JkZXItcmFkaXVzOiA0cHg7XFxuICAgICAgICBib3JkZXI6IDA7XFxuICAgICAgICBwYWRkaW5nOiAxMnB4IDE2cHg7XFxuICAgICAgICBmb250LXNpemU6IDE2cHg7XFxuICAgICAgICBmb250LXdlaWdodDogNjAwO1xcbiAgICAgICAgbWFyZ2luLXRvcDogMTBweDtcXG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICAgICAgdHJhbnNpdGlvbjogYWxsIDAuMnMgZWFzZTtcXG4gICAgICAgIGJveC1zaGFkb3c6IDBweCA0cHggNS41cHggMHB4IHJnYmEoMCwgMCwgMCwgMC4wNyk7XFxuICAgICAgICB3aWR0aDogMTAwJTtcXG4gICAgICB9XFxuICAgICAgI2NhbmNlbDpob3ZlciB7XFxuICAgICAgICBmaWx0ZXI6IGNvbnRyYXN0KDExNSUpO1xcbiAgICAgIH1cXG4gICAgICAjY2FuY2VsOmRpc2FibGVkIHtcXG4gICAgICAgIG9wYWNpdHk6IDAuNTtcXG4gICAgICAgIGN1cnNvcjogZGVmYXVsdDtcXG4gICAgICB9XFxuXFxuICAgICAgLyogc3Bpbm5lci9wcm9jZXNzaW5nIHN0YXRlLCBlcnJvcnMgKi9cXG4gICAgICAuc3Bpbm5lcixcXG4gICAgICAuc3Bpbm5lcjpiZWZvcmUsXFxuICAgICAgLnNwaW5uZXI6YWZ0ZXIge1xcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgICAgIH1cXG4gICAgICAuc3Bpbm5lciB7XFxuICAgICAgICBjb2xvcjogI2ZmZmZmZjtcXG4gICAgICAgIGZvbnQtc2l6ZTogMjJweDtcXG4gICAgICAgIHRleHQtaW5kZW50OiAtOTk5OTlweDtcXG4gICAgICAgIG1hcmdpbjogMHB4IGF1dG87XFxuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgICAgICB3aWR0aDogMjBweDtcXG4gICAgICAgIGhlaWdodDogMjBweDtcXG4gICAgICAgIGJveC1zaGFkb3c6IGluc2V0IDAgMCAwIDJweDtcXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVaKDApO1xcbiAgICAgICAgLW1zLXRyYW5zZm9ybTogdHJhbnNsYXRlWigwKTtcXG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWigwKTtcXG4gICAgICB9XFxuICAgICAgLnNwaW5uZXI6YmVmb3JlLFxcbiAgICAgIC5zcGlubmVyOmFmdGVyIHtcXG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgICAgIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgICAgIH1cXG4gICAgICAuc3Bpbm5lcjpiZWZvcmUge1xcbiAgICAgICAgd2lkdGg6IDEwLjRweDtcXG4gICAgICAgIGhlaWdodDogMjAuNHB4O1xcbiAgICAgICAgYmFja2dyb3VuZDogIzU0NjlkNDtcXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDIwLjRweCAwIDAgMjAuNHB4O1xcbiAgICAgICAgdG9wOiAtMC4ycHg7XFxuICAgICAgICBsZWZ0OiAtMC4ycHg7XFxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46IDEwLjRweCAxMC4ycHg7XFxuICAgICAgICB0cmFuc2Zvcm0tb3JpZ2luOiAxMC40cHggMTAuMnB4O1xcbiAgICAgICAgLXdlYmtpdC1hbmltYXRpb246IGxvYWRpbmcgMnMgaW5maW5pdGUgZWFzZSAxLjVzO1xcbiAgICAgICAgYW5pbWF0aW9uOiBsb2FkaW5nIDJzIGluZmluaXRlIGVhc2UgMS41cztcXG4gICAgICB9XFxuICAgICAgLnNwaW5uZXI6YWZ0ZXIge1xcbiAgICAgICAgd2lkdGg6IDEwLjRweDtcXG4gICAgICAgIGhlaWdodDogMTAuMnB4O1xcbiAgICAgICAgYmFja2dyb3VuZDogIzU0NjlkNDtcXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDAgMTAuMnB4IDEwLjJweCAwO1xcbiAgICAgICAgdG9wOiAtMC4xcHg7XFxuICAgICAgICBsZWZ0OiAxMC4ycHg7XFxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46IDBweCAxMC4ycHg7XFxuICAgICAgICB0cmFuc2Zvcm0tb3JpZ2luOiAwcHggMTAuMnB4O1xcbiAgICAgICAgLXdlYmtpdC1hbmltYXRpb246IGxvYWRpbmcgMnMgaW5maW5pdGUgZWFzZTtcXG4gICAgICAgIGFuaW1hdGlvbjogbG9hZGluZyAycyBpbmZpbml0ZSBlYXNlO1xcbiAgICAgIH1cXG5cXG4gICAgICBALXdlYmtpdC1rZXlmcmFtZXMgbG9hZGluZyB7XFxuICAgICAgICAwJSB7XFxuICAgICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7XFxuICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDBkZWcpO1xcbiAgICAgICAgfVxcbiAgICAgICAgMTAwJSB7XFxuICAgICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTtcXG4gICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTtcXG4gICAgICAgIH1cXG4gICAgICB9XFxuICAgICAgQGtleWZyYW1lcyBsb2FkaW5nIHtcXG4gICAgICAgIDAlIHtcXG4gICAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTtcXG4gICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7XFxuICAgICAgICB9XFxuICAgICAgICAxMDAlIHtcXG4gICAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpO1xcbiAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpO1xcbiAgICAgICAgfVxcbiAgICAgIH1cXG5cXG4gICAgICBAbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDYwMHB4KSB7XFxuICAgICAgICBmb3JtIHtcXG4gICAgICAgICAgd2lkdGg6IDgwdnc7XFxuICAgICAgICAgIG1pbi13aWR0aDogaW5pdGlhbDtcXG4gICAgICAgIH1cXG4gICAgICB9XFxuXFxuICAgICAgLmxkcy1zcGlubmVyIHtcXG4gICAgICAgIGNvbG9yOiBvZmZpY2lhbDtcXG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICAgICAgd2lkdGg6IDgwcHg7XFxuICAgICAgICBoZWlnaHQ6IDgwcHg7XFxuICAgICAgICBtYXJnaW46IGF1dG87XFxuICAgICAgfVxcbiAgICAgIC5sZHMtc3Bpbm5lciBkaXYge1xcbiAgICAgICAgdHJhbnNmb3JtLW9yaWdpbjogNDBweCA0MHB4O1xcbiAgICAgICAgYW5pbWF0aW9uOiBsZHMtc3Bpbm5lciAxLjJzIGxpbmVhciBpbmZpbml0ZTtcXG4gICAgICB9XFxuICAgICAgLmxkcy1zcGlubmVyIGRpdjphZnRlciB7XFxuICAgICAgICBjb250ZW50OiBcXFwiIFxcXCI7XFxuICAgICAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgICAgIHRvcDogM3B4O1xcbiAgICAgICAgbGVmdDogMzdweDtcXG4gICAgICAgIHdpZHRoOiA2cHg7XFxuICAgICAgICBoZWlnaHQ6IDE4cHg7XFxuICAgICAgICBib3JkZXItcmFkaXVzOiAyMCU7XFxuICAgICAgICBiYWNrZ3JvdW5kOiBibGFjaztcXG4gICAgICB9XFxuICAgICAgLmxkcy1zcGlubmVyIGRpdjpudGgtY2hpbGQoMSkge1xcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7XFxuICAgICAgICBhbmltYXRpb24tZGVsYXk6IC0xLjFzO1xcbiAgICAgIH1cXG4gICAgICAubGRzLXNwaW5uZXIgZGl2Om50aC1jaGlsZCgyKSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgzMGRlZyk7XFxuICAgICAgICBhbmltYXRpb24tZGVsYXk6IC0xcztcXG4gICAgICB9XFxuICAgICAgLmxkcy1zcGlubmVyIGRpdjpudGgtY2hpbGQoMykge1xcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoNjBkZWcpO1xcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiAtMC45cztcXG4gICAgICB9XFxuICAgICAgLmxkcy1zcGlubmVyIGRpdjpudGgtY2hpbGQoNCkge1xcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoOTBkZWcpO1xcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiAtMC44cztcXG4gICAgICB9XFxuICAgICAgLmxkcy1zcGlubmVyIGRpdjpudGgtY2hpbGQoNSkge1xcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMTIwZGVnKTtcXG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogLTAuN3M7XFxuICAgICAgfVxcbiAgICAgIC5sZHMtc3Bpbm5lciBkaXY6bnRoLWNoaWxkKDYpIHtcXG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDE1MGRlZyk7XFxuICAgICAgICBhbmltYXRpb24tZGVsYXk6IC0wLjZzO1xcbiAgICAgIH1cXG4gICAgICAubGRzLXNwaW5uZXIgZGl2Om50aC1jaGlsZCg3KSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpO1xcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiAtMC41cztcXG4gICAgICB9XFxuICAgICAgLmxkcy1zcGlubmVyIGRpdjpudGgtY2hpbGQoOCkge1xcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMjEwZGVnKTtcXG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogLTAuNHM7XFxuICAgICAgfVxcbiAgICAgIC5sZHMtc3Bpbm5lciBkaXY6bnRoLWNoaWxkKDkpIHtcXG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDI0MGRlZyk7XFxuICAgICAgICBhbmltYXRpb24tZGVsYXk6IC0wLjNzO1xcbiAgICAgIH1cXG4gICAgICAubGRzLXNwaW5uZXIgZGl2Om50aC1jaGlsZCgxMCkge1xcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMjcwZGVnKTtcXG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogLTAuMnM7XFxuICAgICAgfVxcbiAgICAgIC5sZHMtc3Bpbm5lciBkaXY6bnRoLWNoaWxkKDExKSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgzMDBkZWcpO1xcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiAtMC4xcztcXG4gICAgICB9XFxuICAgICAgLmxkcy1zcGlubmVyIGRpdjpudGgtY2hpbGQoMTIpIHtcXG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDMzMGRlZyk7XFxuICAgICAgICBhbmltYXRpb24tZGVsYXk6IDBzO1xcbiAgICAgIH1cXG4gICAgICBAa2V5ZnJhbWVzIGxkcy1zcGlubmVyIHtcXG4gICAgICAgIDAlIHtcXG4gICAgICAgICAgb3BhY2l0eTogMTtcXG4gICAgICAgIH1cXG4gICAgICAgIDEwMCUge1xcbiAgICAgICAgICBvcGFjaXR5OiAwO1xcbiAgICAgICAgfVxcbiAgICAgIH1cXG5cXG5cXG4gICAgXCI7XG4gICAgaWYgKCFkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdzdHlsZVtkYXRhLWxvb3BzXScpKSB7XG4gICAgICAgIHZhciBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgICAgIHN0eWxlLnNldEF0dHJpYnV0ZSgnZGF0YS1sb29wcycsICcnKTtcbiAgICAgICAgc3R5bGUuaW5uZXJIVE1MID0gY3NzO1xuICAgICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHN0eWxlKTtcbiAgICB9XG4gICAgLy8gbW9kYWxcbiAgICB2YXIgbW9kYWwgPSBcIlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImxvb3BzLXB1cmNoYXNlLW1vZGFsXFxcIj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcImxvb3BzLXB1cmNoYXNlLW1vZGFsLWNvbnRlbnRcXFwiPlxcblxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwibGRzLXNwaW5uZXIgaGlkZGVuXFxcIj48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48L2Rpdj5cXG5cXG4gICAgICAgICAgPGZvcm0gaWQ9XFxcInBheW1lbnQtZm9ybVxcXCI+XFxuXFxuICAgICAgICAgICAgPGRpdiBpZD1cXFwibGluay1hdXRoZW50aWNhdGlvbi1lbGVtZW50XFxcIj48L2Rpdj5cXG5cXG4gICAgICAgICAgICA8ZGl2IGlkPVxcXCJwYXltZW50LWVsZW1lbnRcXFwiPjwvZGl2PlxcblxcbiAgICAgICAgICAgIDxkaXYgaWQ9XFxcImFkZHJlc3MtZWxlbWVudFxcXCI+PC9kaXY+XFxuXFxuICAgICAgICAgICAgPGRpdiBpZD1cXFwicGF5bWVudC1tZXNzYWdlXFxcIiBjbGFzcz1cXFwiaGlkZGVuXFxcIj48L2Rpdj5cXG5cXG4gICAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJzdWJtaXRcXFwiPlxcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwic3Bpbm5lciBoaWRkZW5cXFwiIGlkPVxcXCJzcGlubmVyXFxcIj48L2Rpdj5cXG4gICAgICAgICAgICAgIDxzcGFuIGlkPVxcXCJidXR0b24tdGV4dFxcXCI+UGF5IG5vdzwvc3Bhbj5cXG4gICAgICAgICAgICA8L2J1dHRvbj5cXG5cXG4gICAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJjYW5jZWxcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCI+XFxuICAgICAgICAgICAgICA8c3BhbiBpZD1cXFwiYnV0dG9uLXRleHRcXFwiPkNhbmNlbDwvc3Bhbj5cXG4gICAgICAgICAgICA8L2J1dHRvbj5cXG5cXG4gICAgICAgICAgPC9mb3JtPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgPC9kaXY+XFxuICAgIFwiO1xuICAgIGlmICghZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxvb3BzLXB1cmNoYXNlLW1vZGFsJykpIHtcbiAgICAgICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBkaXYuaW5uZXJIVE1MID0gbW9kYWw7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZGl2KTtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gaGlkZU1vZGFsKCkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sb29wcy1wdXJjaGFzZS1tb2RhbCcpLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHNob3dNb2RhbCgpIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubG9vcHMtcHVyY2hhc2UtbW9kYWwnKS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbiAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XG59XG5leHBvcnQgZnVuY3Rpb24gaW5pdFN0cmlwZSgpIHtcbiAgICBpZiAoIWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3NjcmlwdFtzcmM9XCJodHRwczovL2pzLnN0cmlwZS5jb20vdjMvXCJdJykpIHtcbiAgICAgICAgdmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgICAgICBzY3JpcHQuc2V0QXR0cmlidXRlKCdzcmMnLCAnaHR0cHM6Ly9qcy5zdHJpcGUuY29tL3YzLycpO1xuICAgICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIHNob3dCdXR0b25Mb2FkZXIoaXNMb2FkaW5nKSB7XG4gICAgaWYgKGlzTG9hZGluZyA9PT0gdHJ1ZSkge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b24nKS5kaXNhYmxlZCA9IHRydWU7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzcGlubmVyJykuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNidXR0b24tdGV4dCcpLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uJykuZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NwaW5uZXInKS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2J1dHRvbi10ZXh0JykuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIHNob3dMb2FkZXIoKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxkcy1zcGlubmVyJykuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BheW1lbnQtZm9ybScpLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGhpZGVMb2FkZXIoKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxkcy1zcGlubmVyJykuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BheW1lbnQtZm9ybScpLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHNob3dNZXNzYWdlKG1lc3NhZ2VUZXh0KSB7XG4gICAgdmFyIG1lc3NhZ2VDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGF5bWVudC1tZXNzYWdlJyk7XG4gICAgbWVzc2FnZUNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbiAgICBtZXNzYWdlQ29udGFpbmVyLnRleHRDb250ZW50ID0gbWVzc2FnZVRleHQ7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIG1lc3NhZ2VDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgICAgIG1lc3NhZ2VDb250YWluZXIudGV4dENvbnRlbnQgPSAnJztcbiAgICB9LCA0MDAwKTtcbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBjcmVhdGVMaW5rQXV0aGVudGljYXRpb25FbGVtZW50KGVsZW1lbnRzKSB7XG4gICAgdmFyIGxpbmtBdXRoZW50aWNhdGlvbkVsZW1lbnQgPSBlbGVtZW50cy5jcmVhdGUoJ2xpbmtBdXRoZW50aWNhdGlvbicpO1xuICAgIGxpbmtBdXRoZW50aWNhdGlvbkVsZW1lbnQubW91bnQoJyNsaW5rLWF1dGhlbnRpY2F0aW9uLWVsZW1lbnQnKTtcbiAgICByZXR1cm4gbGlua0F1dGhlbnRpY2F0aW9uRWxlbWVudDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQYXltZW50RWxlbWVudChlbGVtZW50cykge1xuICAgIHZhciBwYXltZW50RWxlbWVudCA9IGVsZW1lbnRzLmNyZWF0ZSgncGF5bWVudCcsIHtcbiAgICAgICAgbGF5b3V0OiAndGFicycsXG4gICAgfSk7XG4gICAgcGF5bWVudEVsZW1lbnQubW91bnQoJyNwYXltZW50LWVsZW1lbnQnKTtcbiAgICByZXR1cm4gcGF5bWVudEVsZW1lbnQ7XG59XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQWRkcmVzc0VsZW1lbnQoZWxlbWVudHMpIHtcbiAgICB2YXIgYWRkcmVzc0VsZW1lbnQgPSBlbGVtZW50cy5jcmVhdGUoJ2FkZHJlc3MnLCB7XG4gICAgICAgIG1vZGU6ICdzaGlwcGluZycsXG4gICAgICAgIGFsbG93ZWRDb3VudHJpZXM6IFsnSlAnXSxcbiAgICAgICAgZmllbGRzOiB7XG4gICAgICAgICAgICBwaG9uZTogJ2Fsd2F5cycsXG4gICAgICAgIH0sXG4gICAgfSk7XG4gICAgYWRkcmVzc0VsZW1lbnQubW91bnQoJyNhZGRyZXNzLWVsZW1lbnQnKTtcbiAgICByZXR1cm4gYWRkcmVzc0VsZW1lbnQ7XG59XG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlSWZyYW1lcygpIHtcbiAgICB2YXIgaWZyYW1lcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lmcmFtZVtuYW1lXj1cIl9fcHJpdmF0ZVN0cmlwZUNvbnRyb2xsZXJcIl0nKTtcbiAgICBpZnJhbWVzLmZvckVhY2goZnVuY3Rpb24gKGlmcmFtZSkge1xuICAgICAgICBpZnJhbWUucmVtb3ZlKCk7XG4gICAgfSk7XG59XG4iLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbnZhciBfX2dlbmVyYXRvciA9ICh0aGlzICYmIHRoaXMuX19nZW5lcmF0b3IpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBib2R5KSB7XG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcbiAgICAgICAgd2hpbGUgKGcgJiYgKGcgPSAwLCBvcFswXSAmJiAoXyA9IDApKSwgXykgdHJ5IHtcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xuICAgIH1cbn07XG5pbXBvcnQgeyBnZXRDcmVkZW50aWFscyB9IGZyb20gXCIuL3NlcnZpY2UvbG9vcHMtYXBpXCI7XG5pbXBvcnQgeyBjcmVhdGVNb2RhbCwgaGlkZU1vZGFsIH0gZnJvbSBcIi4vZWxlbWVudHMvbW9kYWxcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluaXRpYWxpemUoY2xpZW50SWQsIGNsaWVudFNlY3JldCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF9hLCB0b2tlbiwgc3RvcmVJZCwgc3RyaXBlQWNjb3VudElkO1xuICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9iKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKF9iLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICBpZiAoIWNsaWVudElkIHx8ICFjbGllbnRTZWNyZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNsaWVudCBJRCBvciBDbGllbnQgU2VjcmV0IGlzIG5vdCBwcm92aWRlZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBnZXRDcmVkZW50aWFscyhjbGllbnRJZCwgY2xpZW50U2VjcmV0KV07XG4gICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICBfYSA9IF9iLnNlbnQoKSwgdG9rZW4gPSBfYS50b2tlbiwgc3RvcmVJZCA9IF9hLnN0b3JlSWQsIHN0cmlwZUFjY291bnRJZCA9IF9hLnN0cmlwZUFjY291bnRJZDtcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJsb29wcy10b2tlblwiLCB0b2tlbik7XG4gICAgICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwibG9vcHMtc3RvcmUtaWRcIiwgc3RvcmVJZCk7XG4gICAgICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwibG9vcHMtc3RyaXBlLWFjY291bnQtaWRcIiwgc3RyaXBlQWNjb3VudElkKTtcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlTW9kYWwoKTtcbiAgICAgICAgICAgICAgICAgICAgaGlkZU1vZGFsKCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG4iLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbnZhciBfX2dlbmVyYXRvciA9ICh0aGlzICYmIHRoaXMuX19nZW5lcmF0b3IpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBib2R5KSB7XG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcbiAgICAgICAgd2hpbGUgKGcgJiYgKGcgPSAwLCBvcFswXSAmJiAoXyA9IDApKSwgXykgdHJ5IHtcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xuICAgIH1cbn07XG5pbXBvcnQgeyBsb2FkU3RyaXBlIH0gZnJvbSAnQHN0cmlwZS9zdHJpcGUtanMnO1xuaW1wb3J0IHsgY3JlYXRlU3RyaXBlUGF5bWVudEludGVudCwgY3JlYXRlTG9vcHNTdWJzY3JpcHRpb24sIH0gZnJvbSAnLi4vc2VydmljZS9sb29wcy1hcGknO1xuaW1wb3J0IHsgY3JlYXRlTGlua0F1dGhlbnRpY2F0aW9uRWxlbWVudCwgY3JlYXRlUGF5bWVudEVsZW1lbnQsIGNyZWF0ZUFkZHJlc3NFbGVtZW50LCByZW1vdmVJZnJhbWVzLCB9IGZyb20gJy4uL2VsZW1lbnRzL3N0cmlwZS1lbGVtZW50cyc7XG5pbXBvcnQgeyBzaG93TW9kYWwsIGhpZGVNb2RhbCwgc2hvd0J1dHRvbkxvYWRlciwgc2hvd0xvYWRlciwgaGlkZUxvYWRlciwgc2hvd01lc3NhZ2UsIH0gZnJvbSAnLi4vZWxlbWVudHMvbW9kYWwnO1xudmFyIHNpbmdsZVB1cmNoYXNlID0gZnVuY3Rpb24gKHBsYW4pIHsgcmV0dXJuIF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGNsaWVudFNlY3JldCwgc3RyaXBlUGF5bWVudElkLCBfYSwgc2VjcmV0LCBwYXltZW50SWQsIGVycm9yXzEsIHN0cmlwZUFjY291bnRJZCwgc3RyaXBlLCBlbWFpbEFkZHJlc3MsIGFkZHJlc3MsIGVsZW1lbnRzLCBsaW5rQXV0aGVudGljYXRpb25FbCwgY2FuY2VsQnV0dG9uRWwsIGZvcm07XG4gICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYikge1xuICAgICAgICBzd2l0Y2ggKF9iLmxhYmVsKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgaWYgKCFwbGFuLnByaWNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTm8gcHJpY2UnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gaWYgKCFwbGFuLnJldHVybl91cmwpIHtcbiAgICAgICAgICAgICAgICAvLyAgIHRocm93IG5ldyBFcnJvcignTm8gcmV0dXJuIHVybCcpXG4gICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgIHNob3dNb2RhbCgpO1xuICAgICAgICAgICAgICAgIHNob3dMb2FkZXIoKTtcbiAgICAgICAgICAgICAgICBjbGllbnRTZWNyZXQgPSAnJztcbiAgICAgICAgICAgICAgICBzdHJpcGVQYXltZW50SWQgPSAnJztcbiAgICAgICAgICAgICAgICBfYi5sYWJlbCA9IDE7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgX2IudHJ5cy5wdXNoKFsxLCAzLCAsIDRdKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBjcmVhdGVTdHJpcGVQYXltZW50SW50ZW50KHBsYW4ucHJpY2UpXTtcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICBfYSA9IF9iLnNlbnQoKSwgc2VjcmV0ID0gX2EuY2xpZW50U2VjcmV0LCBwYXltZW50SWQgPSBfYS5wYXltZW50SWQ7XG4gICAgICAgICAgICAgICAgY2xpZW50U2VjcmV0ID0gc2VjcmV0O1xuICAgICAgICAgICAgICAgIHN0cmlwZVBheW1lbnRJZCA9IHBheW1lbnRJZDtcbiAgICAgICAgICAgICAgICByZXR1cm4gWzMgLypicmVhayovLCA0XTtcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICBlcnJvcl8xID0gX2Iuc2VudCgpO1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcl8xKTtcbiAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICBpZiAoIWNsaWVudFNlY3JldCkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGNsaWVudCBzZWNyZXQnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc3RyaXBlQWNjb3VudElkID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2xvb3BzLXN0cmlwZS1hY2NvdW50LWlkJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgbG9hZFN0cmlwZSgncGtfdGVzdF81MUljTklFQmluOUhmUGV2Z0ZlVkJiQlRab0dLczFueExUWGs4ZHd3YlhBQ2hWcE03ZkFqNWlLbm5DcGk3V0VOVTZDUWY5TDF3R05vSWdUb1p4dnd5NjJQSTAwYWd1NTZsYnMnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdHJpcGVBY2NvdW50OiBzdHJpcGVBY2NvdW50SWQsXG4gICAgICAgICAgICAgICAgICAgIH0pXTtcbiAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgICBzdHJpcGUgPSBfYi5zZW50KCk7XG4gICAgICAgICAgICAgICAgZW1haWxBZGRyZXNzID0gJyc7XG4gICAgICAgICAgICAgICAgYWRkcmVzcyA9IHt9O1xuICAgICAgICAgICAgICAgIGVsZW1lbnRzID0gc3RyaXBlLmVsZW1lbnRzKHtcbiAgICAgICAgICAgICAgICAgICAgYXBwZWFyYW5jZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhlbWU6ICdzdHJpcGUnLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBjbGllbnRTZWNyZXQ6IGNsaWVudFNlY3JldCxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBsaW5rQXV0aGVudGljYXRpb25FbCA9IGNyZWF0ZUxpbmtBdXRoZW50aWNhdGlvbkVsZW1lbnQoZWxlbWVudHMpO1xuICAgICAgICAgICAgICAgIGxpbmtBdXRoZW50aWNhdGlvbkVsLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50LmVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhldmVudC5lcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbWFpbEFkZHJlc3MgPSBldmVudC52YWx1ZS5lbWFpbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGNyZWF0ZVBheW1lbnRFbGVtZW50KGVsZW1lbnRzKTtcbiAgICAgICAgICAgICAgICBjcmVhdGVBZGRyZXNzRWxlbWVudChlbGVtZW50cyk7XG4gICAgICAgICAgICAgICAgY2FuY2VsQnV0dG9uRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2FuY2VsJyk7XG4gICAgICAgICAgICAgICAgY2FuY2VsQnV0dG9uRWwgPT09IG51bGwgfHwgY2FuY2VsQnV0dG9uRWwgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGNhbmNlbEJ1dHRvbkVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVJZnJhbWVzKCk7XG4gICAgICAgICAgICAgICAgICAgIGhpZGVNb2RhbCgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGhpZGVMb2FkZXIoKTtcbiAgICAgICAgICAgICAgICBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BheW1lbnQtZm9ybScpO1xuICAgICAgICAgICAgICAgIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgZnVuY3Rpb24gKGV2ZW50KSB7IHJldHVybiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgYWRkcmVzc0VsZW1lbnQsIF9hLCBjb21wbGV0ZSwgdmFsdWUsIHN0YXR1c18xLCBlcnJvciwgZXJyb3JfMjtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYikge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChfYi5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvd0J1dHRvbkxvYWRlcih0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRkcmVzc0VsZW1lbnQgPSBlbGVtZW50cy5nZXRFbGVtZW50KCdhZGRyZXNzJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIGFkZHJlc3NFbGVtZW50LmdldFZhbHVlKCldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2EgPSBfYi5zZW50KCksIGNvbXBsZXRlID0gX2EuY29tcGxldGUsIHZhbHVlID0gX2EudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb21wbGV0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRkcmVzcyA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9iLmxhYmVsID0gMjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9iLnRyeXMucHVzaChbMiwgNiwgNywgOF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBjcmVhdGVMb29wc1N1YnNjcmlwdGlvbihhZGRyZXNzLCBwbGFuLCBlbWFpbEFkZHJlc3MsIHN0cmlwZVBheW1lbnRJZCldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzXzEgPSAoX2Iuc2VudCgpKS5zdGF0dXM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKHN0YXR1c18xID09PSAnc3VjY2VzcycpKSByZXR1cm4gWzMgLypicmVhayovLCA1XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgc3RyaXBlLmNvbmZpcm1QYXltZW50KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50czogZWxlbWVudHMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlybVBhcmFtczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5fdXJsOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZGlyZWN0OiAnaWZfcmVxdWlyZWQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IgPSAoX2Iuc2VudCgpKS5lcnJvcjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKGVycm9yID09PSBudWxsIHx8IGVycm9yID09PSB2b2lkIDAgPyB2b2lkIDAgOiBlcnJvci50eXBlKSA9PT0gJ2NhcmRfZXJyb3InIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGVycm9yID09PSBudWxsIHx8IGVycm9yID09PSB2b2lkIDAgPyB2b2lkIDAgOiBlcnJvci50eXBlKSA9PT0gJ3ZhbGlkYXRpb25fZXJyb3InKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvd01lc3NhZ2UoZXJyb3IubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93TWVzc2FnZSgnQW4gdW5leHBlY3RlZCBlcnJvciBvY2N1cnJlZC4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93TWVzc2FnZSgnU3Vic2NyaXB0aW9uIGNyZWF0ZWQgc3VjY2Vzc2Z1bGx5Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9iLmxhYmVsID0gNTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDU6IHJldHVybiBbMyAvKmJyZWFrKi8sIDhdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JfMiA9IF9iLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvd01lc3NhZ2UoJ0FuIHVuZXhwZWN0ZWQgZXJyb3Igb2NjdXJyZWQuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDhdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvd0J1dHRvbkxvYWRlcihmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZUlmcmFtZXMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGlkZU1vZGFsKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNyAvKmVuZGZpbmFsbHkqL107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA4OiByZXR1cm4gWzIgLypyZXR1cm4qL107XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pOyB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107XG4gICAgICAgIH1cbiAgICB9KTtcbn0pOyB9O1xuZXhwb3J0IHsgc2luZ2xlUHVyY2hhc2UgfTtcbiIsInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9fZ2VuZXJhdG9yID0gKHRoaXMgJiYgdGhpcy5fX2dlbmVyYXRvcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIGJvZHkpIHtcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xuICAgICAgICB3aGlsZSAoZyAmJiAoZyA9IDAsIG9wWzBdICYmIChfID0gMCkpLCBfKSB0cnkge1xuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XG4gICAgfVxufTtcbnZhciBhcGlVcmwgPSAnaHR0cDovL2xvb3BzLXNlcnZlci1hbGItMTA5MDg4OTg4OC5hcC1ub3J0aGVhc3QtMi5lbGIuYW1hem9uYXdzLmNvbSc7XG4vLyBzaGlwcGluZzogJzAo6YCa5bi46YWN6YCBKSAvIDEo54Sh5paZ6YWN6YCBKScsXG4vLyAwOiBwbGFuXG4vLyAxOiBwcm9kdWN0XG4vLyAyOiBncm91cFxuLy8gY29uc3QgYXBpVXJsID0gJ2h0dHA6Ly9sb2NhbGhvc3Q6ODA4MCdcbmltcG9ydCB7IGFkZERheXMsIH0gZnJvbSAnZGF0ZS1mbnMnO1xuZXhwb3J0IGZ1bmN0aW9uIGdldENyZWRlbnRpYWxzKGNsaWVudElkLCBjbGllbnRTZWNyZXQpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciByZXNwb25zZSwgZGF0YSwgZXJyb3JfMTtcbiAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFjbGllbnRJZCB8fCAhY2xpZW50U2VjcmV0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NsaWVudCBJRCBvciBDbGllbnQgU2VjcmV0IGlzIG5vdCBwcm92aWRlZCcpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF9hLmxhYmVsID0gMTtcbiAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgIF9hLnRyeXMucHVzaChbMSwgNCwgLCA1XSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIGZldGNoKFwiXCIuY29uY2F0KGFwaVVybCwgXCIvYXBpL3YxL2F1dGgvYmFzaWNcIiksIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWVudF9pZDogY2xpZW50SWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWVudF9zZWNyZXQ6IGNsaWVudFNlY3JldCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXTtcbiAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCByZXNwb25zZS5qc29uKCldO1xuICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIGRhdGFdO1xuICAgICAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICAgICAgZXJyb3JfMSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yXzEpO1xuICAgICAgICAgICAgICAgIGNhc2UgNTogcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTdHJpcGVQYXltZW50SW50ZW50KGFtb3VudCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHRva2VuLCByZXNwb25zZSwgZGF0YSwgZXJyb3JfMjtcbiAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbG9vcHMtdG9rZW4nKTtcbiAgICAgICAgICAgICAgICAgICAgX2EubGFiZWwgPSAxO1xuICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgX2EudHJ5cy5wdXNoKFsxLCA0LCAsIDVdKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgZmV0Y2goXCJcIi5jb25jYXQoYXBpVXJsLCBcIi9hcGkvdjEvbWVyY2hhbnQvY3JlYXRlLXBheW1lbnQtaW50ZW50XCIpLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBdXRob3JpemF0aW9uOiBcIkJlYXJlciBcIi5jb25jYXQodG9rZW4pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbW91bnQ6IGFtb3VudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXTtcbiAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCByZXNwb25zZS5qc29uKCldO1xuICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIGRhdGFdO1xuICAgICAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICAgICAgZXJyb3JfMiA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yXzIpO1xuICAgICAgICAgICAgICAgIGNhc2UgNTogcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVMb29wc1N1YnNjcmlwdGlvbihhZGRyZXNzLCBwbGFuLCBlbWFpbCwgc3RyaXBlUGF5bWVudElkKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgdG9rZW4sIG1lcmNoYW50X2lkLCBmaXJzdE5hbWUsIGxhc3ROYW1lLCBib2R5LCByZXNwb25zZSwgZGF0YSwgZXJyb3JfMztcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9iKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKF9iLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICB0b2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdsb29wcy10b2tlbicpO1xuICAgICAgICAgICAgICAgICAgICBtZXJjaGFudF9pZCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdsb29wcy1zdG9yZS1pZCcpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoYWRkcmVzcy5uYW1lLmluZGV4T2YoJyAnKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hID0gYWRkcmVzcy5uYW1lLnNwbGl0KCcgJyksIGZpcnN0TmFtZSA9IF9hWzBdLCBsYXN0TmFtZSA9IF9hWzFdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3ROYW1lID0gYWRkcmVzcy5uYW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGFzdE5hbWUgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBib2R5ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICcyYzZlMjM5YS1mMDJiLWQxNTgtMjgzMy1jN2Y4ODNiYjU1MzAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVyY2hhbnRfaWQ6IG1lcmNoYW50X2lkLnRvU3RyaW5nKCksXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXltZW50X2lkOiBzdHJpcGVQYXltZW50SWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9kdWN0c192YXJpYW50OiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9kdWN0X3R5cGU6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBwbGFuLmtleS50b1N0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudW06IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbjogJ+WVhuWTgeOBlOOBqOOBruODoeODouOCkueuoeeQhicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21lcl9pbmZvcm1hdGlvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkZHJlc3MyOiBhZGRyZXNzLmFkZHJlc3MubGluZTIgfHwgJycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRkcmVzczE6IGFkZHJlc3MuYWRkcmVzcy5saW5lMSB8fCAnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaXR5OiBhZGRyZXNzLmFkZHJlc3MuY2l0eSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmVmOiBhZGRyZXNzLmFkZHJlc3Muc3RhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgemlwY29kZTogYWRkcmVzcy5hZGRyZXNzLnBvc3RhbF9jb2RlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0X25hbWU6IGZpcnN0TmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0X25hbWU6IGxhc3ROYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVtYWlsOiBlbWFpbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZWw6IGFkZHJlc3MucGhvbmUsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgc2hpcHBpbmdfaW5mb3JtYXRpb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZGRyZXNzMjogYWRkcmVzcy5hZGRyZXNzLmxpbmUyIHx8ICcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkZHJlc3MxOiBhZGRyZXNzLmFkZHJlc3MubGluZTEgfHwgJycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2l0eTogYWRkcmVzcy5hZGRyZXNzLmNpdHksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJlZjogYWRkcmVzcy5hZGRyZXNzLnN0YXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHppcGNvZGU6IGFkZHJlc3MuYWRkcmVzcy5wb3N0YWxfY29kZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXJzdF9uYW1lOiBmaXJzdE5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdF9uYW1lOiBsYXN0TmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZWw6IGFkZHJlc3MucGhvbmUsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNoaXBwaW5nOiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjaGVkdWxlX2RlbGl2ZXJ5X2RhdGU6IGFkZERheXMobmV3IERhdGUoKSwgcGxhbi5zaGlwcGluZ19wcmVwYXJhdGlvbl90ZXJtKS50b0xvY2FsZVN0cmluZygnZW4tVVMnLCB7IHRpbWVab25lOiAnQXNpYS9Ub2t5bycgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NoZWR1bGVfcGF5bWVudF9kYXRlOiBjYWxjdWxhdGVTY2hlZHVsZVBheW1lbnREYXRlKHBsYW4pLnRvTG9jYWxlU3RyaW5nKCdlbi1VUycsIHsgdGltZVpvbmU6ICdBc2lhL1Rva3lvJyB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZV9wYXltZW50X2RhdGU6IG5ldyBEYXRlKCkudG9Mb2NhbGVTdHJpbmcoJ2VuLVVTJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lWm9uZTogJ0FzaWEvVG9reW8nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvdXBvbjogJycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF5bWVudDogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFja191cmw6ICdodHRwczovL2xvY2FsaG9zdDo0MDAwJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIF9iLmxhYmVsID0gMTtcbiAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgIF9iLnRyeXMucHVzaChbMSwgNCwgLCA1XSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIGZldGNoKFwiXCIuY29uY2F0KGFwaVVybCwgXCIvYXBpL3YxL29yZGVycy9jcmVhdGVcIiksIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEF1dGhvcml6YXRpb246IFwiQmFzaWMgXCIuY29uY2F0KHRva2VuKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGJvZHkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSldO1xuICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBfYi5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHJlc3BvbnNlLmpzb24oKV07XG4gICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICBkYXRhID0gX2Iuc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgZGF0YV07XG4gICAgICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgICAgICBlcnJvcl8zID0gX2Iuc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JfMyk7XG4gICAgICAgICAgICAgICAgY2FzZSA1OiByZXR1cm4gWzIgLypyZXR1cm4qL107XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gY2FsY3VsYXRlU2NoZWR1bGVQYXltZW50RGF0ZShwbGFuKSB7XG4gICAgLyoqXG4gICAgICoqIFByb2R1Y3Rpb24gdXNhZ2VcbiAgICAgKi9cbiAgICAvLyBjb25zdCBmaXJzdFB1cmNoYXNlRGF0ZSA9IG5ldyBEYXRlKClcbiAgICAvLyBjb25zdCBzZWNvbmRQdXJjaGFzZURhdGUgPSBhZGRNb250aHMoZmlyc3RQdXJjaGFzZURhdGUsIDEpXG4gICAgLy8gaWYgKHBsYW4uc2Vjb25kX2ZpeGVkX3BheW1lbnQgPT09ICdub25lJykge1xuICAgIC8vICAgcmV0dXJuIHNlY29uZFB1cmNoYXNlRGF0ZVxuICAgIC8vIH1cbiAgICAvLyBpZiAocGxhbi5zZWNvbmRfZml4ZWRfcGF5bWVudCA9PT0gJ2xhc3QnKSB7XG4gICAgLy8gICByZXR1cm4gZW5kT2ZNb250aChzZWNvbmRQdXJjaGFzZURhdGUpXG4gICAgLy8gfVxuICAgIC8vIHJldHVybiBzZXREYXRlKHNlY29uZFB1cmNoYXNlRGF0ZSwgTnVtYmVyKHBsYW4uc2Vjb25kX2ZpeGVkX3BheW1lbnQpKVxuICAgIC8qKlxuICAgICAqKiBUZXN0aW5nIHVzYWdlXG4gICAgICovXG4gICAgdmFyIGZpcnN0UHVyY2hhc2VEYXRlID0gbmV3IERhdGUoKTtcbiAgICBpZiAocGxhbi5zZWNvbmRfZml4ZWRfcGF5bWVudCA9PT0gJ25vbmUnIHx8XG4gICAgICAgIHBsYW4uc2Vjb25kX2ZpeGVkX3BheW1lbnQgPT09ICdsYXN0Jykge1xuICAgICAgICByZXR1cm4gYWRkRGF5cyhmaXJzdFB1cmNoYXNlRGF0ZSwgMSk7XG4gICAgfVxuICAgIHJldHVybiBhZGREYXlzKGZpcnN0UHVyY2hhc2VEYXRlLCBOdW1iZXIocGxhbi5zZWNvbmRfZml4ZWRfcGF5bWVudCkpO1xuICAgIC8qKlxuICAgICAqKiBDb21tZW50ZWQgZm9yIHBoYXNlIG9uZVxuICAgICAqL1xuICAgIC8vIGNvbnN0IGludGVydmFsID0gcGxhbi5pbnRlcnZhbFxuICAgIC8vIGlmIChpc0FmdGVyKHNldERhdGUoc2Vjb25kUHVyY2hhc2VEYXRlLCBzZWNvbmRGaXhQYXltZW50KSwgYWRkRGF5cyhmaXJzdFB1cmNoYXNlRGF0ZSwgaW50ZXJ2YWwpKSkge1xuICAgIC8vICAgcmV0dXJuIHNldERhdGUoc2Vjb25kUHVyY2hhc2VEYXRlLCBzZWNvbmRGaXhQYXltZW50KVxuICAgIC8vIH0gZWxzZSB7XG4gICAgLy8gICByZXR1cm4gYWRkTW9udGhzKHNldERhdGUoc2Vjb25kUHVyY2hhc2VEYXRlLCBzZWNvbmRGaXhQYXltZW50KSwgMSlcbiAgICAvLyB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBpbml0aWFsaXplIGZyb20gXCIuL2xvb3BzXCI7XG5leHBvcnQgeyBzaW5nbGVQdXJjaGFzZSB9IGZyb20gXCIuL3B1cmNoYXNlL3NpbmdsZVwiO1xuZXhwb3J0IHsgaW5pdGlhbGl6ZSB9O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9