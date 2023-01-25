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

/***/ "./node_modules/date-fns/esm/addMonths/index.js":
/*!******************************************************!*\
  !*** ./node_modules/date-fns/esm/addMonths/index.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ addMonths)
/* harmony export */ });
/* harmony import */ var _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_lib/toInteger/index.js */ "./node_modules/date-fns/esm/_lib/toInteger/index.js");
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");



/**
 * @name addMonths
 * @category Month Helpers
 * @summary Add the specified number of months to the given date.
 *
 * @description
 * Add the specified number of months to the given date.
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of months to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} the new date with the months added
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Add 5 months to 1 September 2014:
 * const result = addMonths(new Date(2014, 8, 1), 5)
 * //=> Sun Feb 01 2015 00:00:00
 */

function addMonths(dirtyDate, dirtyAmount) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(2, arguments);
  var date = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDate);
  var amount = (0,_lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(dirtyAmount);

  if (isNaN(amount)) {
    return new Date(NaN);
  }

  if (!amount) {
    // If 0 months, no-op to avoid changing times in the hour before end of DST
    return date;
  }

  var dayOfMonth = date.getDate(); // The JS Date object supports date math by accepting out-of-bounds values for
  // month, day, etc. For example, new Date(2020, 0, 0) returns 31 Dec 2019 and
  // new Date(2020, 13, 1) returns 1 Feb 2021.  This is *almost* the behavior we
  // want except that dates will wrap around the end of a month, meaning that
  // new Date(2020, 13, 31) will return 3 Mar 2021 not 28 Feb 2021 as desired. So
  // we'll default to the end of the desired month by adding 1 to the desired
  // month and using a date of 0 to back up one day to the end of the desired
  // month.

  var endOfDesiredMonth = new Date(date.getTime());
  endOfDesiredMonth.setMonth(date.getMonth() + amount + 1, 0);
  var daysInMonth = endOfDesiredMonth.getDate();

  if (dayOfMonth >= daysInMonth) {
    // If we're already at the end of the month, then this is the correct date
    // and we're done.
    return endOfDesiredMonth;
  } else {
    // Otherwise, we now know that setting the original day-of-month value won't
    // cause an overflow, so set the desired day-of-month. Note that we can't
    // just set the date of `endOfDesiredMonth` because that object may have had
    // its time changed in the unusual case where where a DST transition was on
    // the last day of the month and its local time was in the hour skipped or
    // repeated next to a DST transition.  So we use `date` instead which is
    // guaranteed to still have the original time.
    date.setFullYear(endOfDesiredMonth.getFullYear(), endOfDesiredMonth.getMonth(), dayOfMonth);
    return date;
  }
}

/***/ }),

/***/ "./node_modules/date-fns/esm/endOfMonth/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/date-fns/esm/endOfMonth/index.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ endOfMonth)
/* harmony export */ });
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");


/**
 * @name endOfMonth
 * @category Month Helpers
 * @summary Return the end of a month for the given date.
 *
 * @description
 * Return the end of a month for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the end of a month
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The end of a month for 2 September 2014 11:55:00:
 * const result = endOfMonth(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 30 2014 23:59:59.999
 */

function endOfMonth(dirtyDate) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(1, arguments);
  var date = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDate);
  var month = date.getMonth();
  date.setFullYear(date.getFullYear(), month + 1, 0);
  date.setHours(23, 59, 59, 999);
  return date;
}

/***/ }),

/***/ "./node_modules/date-fns/esm/setDate/index.js":
/*!****************************************************!*\
  !*** ./node_modules/date-fns/esm/setDate/index.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ setDate)
/* harmony export */ });
/* harmony import */ var _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_lib/toInteger/index.js */ "./node_modules/date-fns/esm/_lib/toInteger/index.js");
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");



/**
 * @name setDate
 * @category Day Helpers
 * @summary Set the day of the month to the given date.
 *
 * @description
 * Set the day of the month to the given date.
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} dayOfMonth - the day of the month of the new date
 * @returns {Date} the new date with the day of the month set
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Set the 30th day of the month to 1 September 2014:
 * const result = setDate(new Date(2014, 8, 1), 30)
 * //=> Tue Sep 30 2014 00:00:00
 */

function setDate(dirtyDate, dirtyDayOfMonth) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(2, arguments);
  var date = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDate);
  var dayOfMonth = (0,_lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(dirtyDayOfMonth);
  date.setDate(dayOfMonth);
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
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/addDays/index.js");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/addMonths/index.js");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/endOfMonth/index.js");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/setDate/index.js");
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
var apiUrl = 'http://localhost:8080';

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
function createLoopsSubscription(address, plan, email) {
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
                        products_variant: [
                            {
                                product_type: 'plan',
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
                            shipping: '0(通常配送) / 1(無料配送)',
                            schedule_delivery_date: (0,date_fns__WEBPACK_IMPORTED_MODULE_0__["default"])(new Date(), plan.shipping_preparation_term).toISOString(),
                            schedule_payment_date: calculateSchedulePaymentDate(plan),
                            complete_payment_date: new Date().toISOString(),
                            coupon: '',
                            payment: 'stripe',
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
    var firstPurchaseDate = new Date();
    var secondPurchaseDate = (0,date_fns__WEBPACK_IMPORTED_MODULE_1__["default"])(firstPurchaseDate, 1);
    if (plan.second_fixed_payment === 'last') {
        return (0,date_fns__WEBPACK_IMPORTED_MODULE_2__["default"])(secondPurchaseDate);
    }
    var secondFixPayment = Number(plan.second_fixed_payment);
    /**
     * Commented for phase one
     */
    // const interval = plan.interval
    // if (isAfter(setDate(secondPurchaseDate, secondFixPayment), addDays(firstPurchaseDate, interval))) {
    //   return setDate(secondPurchaseDate, secondFixPayment)
    // } else {
    //   return addMonths(setDate(secondPurchaseDate, secondFixPayment), 1)
    // }
    return (0,date_fns__WEBPACK_IMPORTED_MODULE_3__["default"])(secondPurchaseDate, secondFixPayment);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9vcHMtbGliLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQSx3SUFBd0k7QUFDeEk7QUFDQTs7QUFFQSxrQkFBa0Isb0JBQW9CO0FBQ3RDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLE9BQU87QUFDUCxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBLHNFQUFzRSxhQUFhO0FBQ25GO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRXNCOzs7Ozs7Ozs7Ozs7Ozs7QUNoSVA7QUFDZjtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUNKZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNabUQ7QUFDWDtBQUNpQjtBQUN6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxhQUFhO0FBQ3hCLFdBQVcsUUFBUTtBQUNuQixhQUFhLE1BQU07QUFDbkIsWUFBWSxXQUFXO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFZTtBQUNmLEVBQUUsc0VBQVk7QUFDZCxhQUFhLDREQUFNO0FBQ25CLGVBQWUsbUVBQVM7O0FBRXhCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdENtRDtBQUNYO0FBQ2lCO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLGFBQWE7QUFDeEIsV0FBVyxRQUFRO0FBQ25CLGFBQWEsTUFBTTtBQUNuQixZQUFZLFdBQVc7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVlO0FBQ2YsRUFBRSxzRUFBWTtBQUNkLGFBQWEsNERBQU07QUFDbkIsZUFBZSxtRUFBUzs7QUFFeEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG1DQUFtQztBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ2hFd0M7QUFDaUI7QUFDekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxhQUFhO0FBQ3hCLGFBQWEsTUFBTTtBQUNuQixZQUFZLFdBQVc7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVlO0FBQ2YsRUFBRSxzRUFBWTtBQUNkLGFBQWEsNERBQU07QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1Qm1EO0FBQ1g7QUFDaUI7QUFDekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsYUFBYTtBQUN4QixXQUFXLFFBQVE7QUFDbkIsYUFBYSxNQUFNO0FBQ25CLFlBQVksV0FBVztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWU7QUFDZixFQUFFLHNFQUFZO0FBQ2QsYUFBYSw0REFBTTtBQUNuQixtQkFBbUIsbUVBQVM7QUFDNUI7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUM1QkEsd0JBQXdCLDJCQUEyQiwyRUFBMkUsa0NBQWtDLHdCQUF3QixPQUFPLGtDQUFrQyxtSUFBbUk7O0FBRTNTO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxhQUFhO0FBQ3hCLGFBQWEsTUFBTTtBQUNuQixZQUFZLFdBQVc7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFZTtBQUNmLEVBQUUsc0VBQVk7QUFDZCx5REFBeUQ7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsME9BQTBPOztBQUUxTztBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDckRPO0FBQ1A7QUFDQSw4Q0FBOEMsNEJBQTRCLHFCQUFxQixzQkFBc0IsNkNBQTZDLHdCQUF3Qix5QkFBeUIsMEJBQTBCLGdDQUFnQyxvQ0FBb0MsaURBQWlELFNBQVMseUNBQXlDLG9DQUFvQyxxQkFBcUIsOEJBQThCLDJCQUEyQiwyQkFBMkIsU0FBUyxrQkFBa0IsMEJBQTBCLDRCQUE0Qix3QkFBd0IsU0FBUyxnQkFBZ0IsMkJBQTJCLDZCQUE2Qix1SkFBdUosNkJBQTZCLHdCQUF3QixTQUFTLG1CQUFtQixrQ0FBa0MsU0FBUyw0QkFBNEIsb0NBQW9DLDBCQUEwQiw0QkFBNEIsNEJBQTRCLDZCQUE2QixTQUFTLHdDQUF3Qyw4QkFBOEIsU0FBUyw0QkFBNEIsOEJBQThCLFNBQVMsNEJBQTRCLDhCQUE4QixTQUFTLGtEQUFrRCw4QkFBOEIseUNBQXlDLHlCQUF5Qiw2QkFBNkIsb0JBQW9CLDZCQUE2QiwwQkFBMEIsMkJBQTJCLDBCQUEwQix5QkFBeUIsb0NBQW9DLDREQUE0RCxzQkFBc0IsU0FBUyx1QkFBdUIsaUNBQWlDLFNBQVMsMEJBQTBCLHVCQUF1QiwwQkFBMEIsU0FBUyxtQkFBbUIsNEJBQTRCLHlDQUF5Qyw2QkFBNkIsb0JBQW9CLDZCQUE2QiwwQkFBMEIsMkJBQTJCLDJCQUEyQiwwQkFBMEIseUJBQXlCLG9DQUFvQyw0REFBNEQsc0JBQXNCLFNBQVMsdUJBQXVCLGlDQUFpQyxTQUFTLDBCQUEwQix1QkFBdUIsMEJBQTBCLFNBQVMsaUhBQWlILDZCQUE2QixTQUFTLGtCQUFrQix5QkFBeUIsMEJBQTBCLGdDQUFnQywyQkFBMkIsNkJBQTZCLHNCQUFzQix1QkFBdUIsc0NBQXNDLDJDQUEyQyx1Q0FBdUMsbUNBQW1DLFNBQVMsZ0RBQWdELDZCQUE2Qix3QkFBd0IsU0FBUyx5QkFBeUIsd0JBQXdCLHlCQUF5Qiw4QkFBOEIsMkNBQTJDLHNCQUFzQix1QkFBdUIsa0RBQWtELDBDQUEwQywyREFBMkQsbURBQW1ELFNBQVMsd0JBQXdCLHdCQUF3Qix5QkFBeUIsOEJBQThCLDJDQUEyQyxzQkFBc0IsdUJBQXVCLCtDQUErQyx1Q0FBdUMsc0RBQXNELDhDQUE4QyxTQUFTLHNDQUFzQyxjQUFjLDRDQUE0QyxvQ0FBb0MsV0FBVyxnQkFBZ0IsOENBQThDLHNDQUFzQyxXQUFXLFNBQVMsNEJBQTRCLGNBQWMsNENBQTRDLG9DQUFvQyxXQUFXLGdCQUFnQiw4Q0FBOEMsc0NBQXNDLFdBQVcsU0FBUyxxREFBcUQsZ0JBQWdCLHdCQUF3QiwrQkFBK0IsV0FBVyxTQUFTLHdCQUF3QiwwQkFBMEIseUJBQXlCLDZCQUE2QixzQkFBc0IsdUJBQXVCLHVCQUF1QixTQUFTLDBCQUEwQixzQ0FBc0Msc0RBQXNELFNBQVMsZ0NBQWdDLHlCQUF5Qix5QkFBeUIsNkJBQTZCLG1CQUFtQixxQkFBcUIscUJBQXFCLHVCQUF1Qiw2QkFBNkIsNEJBQTRCLFNBQVMsdUNBQXVDLGtDQUFrQyxpQ0FBaUMsU0FBUyx1Q0FBdUMsbUNBQW1DLCtCQUErQixTQUFTLHVDQUF1QyxtQ0FBbUMsaUNBQWlDLFNBQVMsdUNBQXVDLG1DQUFtQyxpQ0FBaUMsU0FBUyx1Q0FBdUMsb0NBQW9DLGlDQUFpQyxTQUFTLHVDQUF1QyxvQ0FBb0MsaUNBQWlDLFNBQVMsdUNBQXVDLG9DQUFvQyxpQ0FBaUMsU0FBUyx1Q0FBdUMsb0NBQW9DLGlDQUFpQyxTQUFTLHVDQUF1QyxvQ0FBb0MsaUNBQWlDLFNBQVMsd0NBQXdDLG9DQUFvQyxpQ0FBaUMsU0FBUyx3Q0FBd0Msb0NBQW9DLGlDQUFpQyxTQUFTLHdDQUF3QyxvQ0FBb0MsOEJBQThCLFNBQVMsZ0NBQWdDLGNBQWMsdUJBQXVCLFdBQVcsZ0JBQWdCLHVCQUF1QixXQUFXLFNBQVM7QUFDem1OO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzRE87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOzs7Ozs7Ozs7Ozs7Ozs7OztBQzVCQSxpQkFBaUIsU0FBSSxJQUFJLFNBQUk7QUFDN0IsNEJBQTRCLCtEQUErRCxpQkFBaUI7QUFDNUc7QUFDQSxvQ0FBb0MsTUFBTSwrQkFBK0IsWUFBWTtBQUNyRixtQ0FBbUMsTUFBTSxtQ0FBbUMsWUFBWTtBQUN4RixnQ0FBZ0M7QUFDaEM7QUFDQSxLQUFLO0FBQ0w7QUFDQSxtQkFBbUIsU0FBSSxJQUFJLFNBQUk7QUFDL0IsY0FBYyw2QkFBNkIsMEJBQTBCLGNBQWMscUJBQXFCO0FBQ3hHLGlCQUFpQixvREFBb0QscUVBQXFFLGNBQWM7QUFDeEosdUJBQXVCLHNCQUFzQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0M7QUFDeEMsbUNBQW1DLFNBQVM7QUFDNUMsbUNBQW1DLFdBQVcsVUFBVTtBQUN4RCwwQ0FBMEMsY0FBYztBQUN4RDtBQUNBLDhHQUE4RyxPQUFPO0FBQ3JILGlGQUFpRixpQkFBaUI7QUFDbEcseURBQXlELGdCQUFnQixRQUFRO0FBQ2pGLCtDQUErQyxnQkFBZ0IsZ0JBQWdCO0FBQy9FO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQSxVQUFVLFlBQVksYUFBYSxTQUFTLFVBQVU7QUFDdEQsb0NBQW9DLFNBQVM7QUFDN0M7QUFDQTtBQUNxRDtBQUNLO0FBQzNDO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QyxrRUFBYztBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLDREQUFXO0FBQy9CLG9CQUFvQiwwREFBUztBQUM3QjtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzNEQSxpQkFBaUIsU0FBSSxJQUFJLFNBQUk7QUFDN0IsNEJBQTRCLCtEQUErRCxpQkFBaUI7QUFDNUc7QUFDQSxvQ0FBb0MsTUFBTSwrQkFBK0IsWUFBWTtBQUNyRixtQ0FBbUMsTUFBTSxtQ0FBbUMsWUFBWTtBQUN4RixnQ0FBZ0M7QUFDaEM7QUFDQSxLQUFLO0FBQ0w7QUFDQSxtQkFBbUIsU0FBSSxJQUFJLFNBQUk7QUFDL0IsY0FBYyw2QkFBNkIsMEJBQTBCLGNBQWMscUJBQXFCO0FBQ3hHLGlCQUFpQixvREFBb0QscUVBQXFFLGNBQWM7QUFDeEosdUJBQXVCLHNCQUFzQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0M7QUFDeEMsbUNBQW1DLFNBQVM7QUFDNUMsbUNBQW1DLFdBQVcsVUFBVTtBQUN4RCwwQ0FBMEMsY0FBYztBQUN4RDtBQUNBLDhHQUE4RyxPQUFPO0FBQ3JILGlGQUFpRixpQkFBaUI7QUFDbEcseURBQXlELGdCQUFnQixRQUFRO0FBQ2pGLCtDQUErQyxnQkFBZ0IsZ0JBQWdCO0FBQy9FO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQSxVQUFVLFlBQVksYUFBYSxTQUFTLFVBQVU7QUFDdEQsb0NBQW9DLFNBQVM7QUFDN0M7QUFDQTtBQUMrQztBQUM0QztBQUMrQztBQUN6QjtBQUNqSCx1Q0FBdUM7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsMERBQVM7QUFDekIsZ0JBQWdCLDJEQUFVO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLDZFQUF5QjtBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsNkRBQVU7QUFDL0M7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQSxpQkFBaUI7QUFDakIsdUNBQXVDLDBGQUErQjtBQUN0RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixnQkFBZ0IsK0VBQW9CO0FBQ3BDLGdCQUFnQiwrRUFBb0I7QUFDcEM7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLHdFQUFhO0FBQ2pDLG9CQUFvQiwwREFBUztBQUM3QixpQkFBaUI7QUFDakIsZ0JBQWdCLDJEQUFVO0FBQzFCO0FBQ0EsbUVBQW1FO0FBQ25FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsaUVBQWdCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDO0FBQ3pDO0FBQ0EscUNBQXFDO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLDREQUFXO0FBQy9DO0FBQ0E7QUFDQSxvQ0FBb0MsNERBQVc7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxREFBcUQsMkVBQXVCO0FBQzVFO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyw0REFBVztBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyw0REFBVztBQUMzQztBQUNBO0FBQ0EsZ0NBQWdDLGlFQUFnQjtBQUNoRCxnQ0FBZ0Msd0VBQWE7QUFDN0MsZ0NBQWdDLDBEQUFTO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQixpQkFBaUIsSUFBSTtBQUNyQjtBQUNBO0FBQ0EsS0FBSztBQUNMLENBQUM7QUFDeUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzlKMUIsaUJBQWlCLFNBQUksSUFBSSxTQUFJO0FBQzdCLDRCQUE0QiwrREFBK0QsaUJBQWlCO0FBQzVHO0FBQ0Esb0NBQW9DLE1BQU0sK0JBQStCLFlBQVk7QUFDckYsbUNBQW1DLE1BQU0sbUNBQW1DLFlBQVk7QUFDeEYsZ0NBQWdDO0FBQ2hDO0FBQ0EsS0FBSztBQUNMO0FBQ0EsbUJBQW1CLFNBQUksSUFBSSxTQUFJO0FBQy9CLGNBQWMsNkJBQTZCLDBCQUEwQixjQUFjLHFCQUFxQjtBQUN4RyxpQkFBaUIsb0RBQW9ELHFFQUFxRSxjQUFjO0FBQ3hKLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDO0FBQ3hDLG1DQUFtQyxTQUFTO0FBQzVDLG1DQUFtQyxXQUFXLFVBQVU7QUFDeEQsMENBQTBDLGNBQWM7QUFDeEQ7QUFDQSw4R0FBOEcsT0FBTztBQUNySCxpRkFBaUYsaUJBQWlCO0FBQ2xHLHlEQUF5RCxnQkFBZ0IsUUFBUTtBQUNqRiwrQ0FBK0MsZ0JBQWdCLGdCQUFnQjtBQUMvRTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0EsVUFBVSxZQUFZLGFBQWEsU0FBUyxVQUFVO0FBQ3RELG9DQUFvQyxTQUFTO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDbUU7QUFDNUQ7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQSxvREFBb0Qsb0RBQU87QUFDM0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLG9EQUFTO0FBQ3RDO0FBQ0EsZUFBZSxvREFBVTtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxXQUFXLG9EQUFPO0FBQ2xCOzs7Ozs7O1VDbE5BO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7OztBQ05pQztBQUNrQjtBQUM3QiIsInNvdXJjZXMiOlsid2VicGFjazovL2xvb3BzLy4vbm9kZV9tb2R1bGVzL0BzdHJpcGUvc3RyaXBlLWpzL2Rpc3Qvc3RyaXBlLmVzbS5qcyIsIndlYnBhY2s6Ly9sb29wcy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vX2xpYi9yZXF1aXJlZEFyZ3MvaW5kZXguanMiLCJ3ZWJwYWNrOi8vbG9vcHMvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL19saWIvdG9JbnRlZ2VyL2luZGV4LmpzIiwid2VicGFjazovL2xvb3BzLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9hZGREYXlzL2luZGV4LmpzIiwid2VicGFjazovL2xvb3BzLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9hZGRNb250aHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vbG9vcHMvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL2VuZE9mTW9udGgvaW5kZXguanMiLCJ3ZWJwYWNrOi8vbG9vcHMvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL3NldERhdGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vbG9vcHMvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL3RvRGF0ZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9sb29wcy8uL3NyYy9lbGVtZW50cy9tb2RhbC50cyIsIndlYnBhY2s6Ly9sb29wcy8uL3NyYy9lbGVtZW50cy9zdHJpcGUtZWxlbWVudHMudHMiLCJ3ZWJwYWNrOi8vbG9vcHMvLi9zcmMvbG9vcHMudHMiLCJ3ZWJwYWNrOi8vbG9vcHMvLi9zcmMvcHVyY2hhc2Uvc2luZ2xlLnRzIiwid2VicGFjazovL2xvb3BzLy4vc3JjL3NlcnZpY2UvbG9vcHMtYXBpLnRzIiwid2VicGFjazovL2xvb3BzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2xvb3BzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9sb29wcy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2xvb3BzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbG9vcHMvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIFYzX1VSTCA9ICdodHRwczovL2pzLnN0cmlwZS5jb20vdjMnO1xudmFyIFYzX1VSTF9SRUdFWCA9IC9eaHR0cHM6XFwvXFwvanNcXC5zdHJpcGVcXC5jb21cXC92M1xcLz8oXFw/LiopPyQvO1xudmFyIEVYSVNUSU5HX1NDUklQVF9NRVNTQUdFID0gJ2xvYWRTdHJpcGUuc2V0TG9hZFBhcmFtZXRlcnMgd2FzIGNhbGxlZCBidXQgYW4gZXhpc3RpbmcgU3RyaXBlLmpzIHNjcmlwdCBhbHJlYWR5IGV4aXN0cyBpbiB0aGUgZG9jdW1lbnQ7IGV4aXN0aW5nIHNjcmlwdCBwYXJhbWV0ZXJzIHdpbGwgYmUgdXNlZCc7XG52YXIgZmluZFNjcmlwdCA9IGZ1bmN0aW9uIGZpbmRTY3JpcHQoKSB7XG4gIHZhciBzY3JpcHRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcInNjcmlwdFtzcmNePVxcXCJcIi5jb25jYXQoVjNfVVJMLCBcIlxcXCJdXCIpKTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHNjcmlwdHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgc2NyaXB0ID0gc2NyaXB0c1tpXTtcblxuICAgIGlmICghVjNfVVJMX1JFR0VYLnRlc3Qoc2NyaXB0LnNyYykpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIHJldHVybiBzY3JpcHQ7XG4gIH1cblxuICByZXR1cm4gbnVsbDtcbn07XG5cbnZhciBpbmplY3RTY3JpcHQgPSBmdW5jdGlvbiBpbmplY3RTY3JpcHQocGFyYW1zKSB7XG4gIHZhciBxdWVyeVN0cmluZyA9IHBhcmFtcyAmJiAhcGFyYW1zLmFkdmFuY2VkRnJhdWRTaWduYWxzID8gJz9hZHZhbmNlZEZyYXVkU2lnbmFscz1mYWxzZScgOiAnJztcbiAgdmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICBzY3JpcHQuc3JjID0gXCJcIi5jb25jYXQoVjNfVVJMKS5jb25jYXQocXVlcnlTdHJpbmcpO1xuICB2YXIgaGVhZE9yQm9keSA9IGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuYm9keTtcblxuICBpZiAoIWhlYWRPckJvZHkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIGRvY3VtZW50LmJvZHkgbm90IHRvIGJlIG51bGwuIFN0cmlwZS5qcyByZXF1aXJlcyBhIDxib2R5PiBlbGVtZW50LicpO1xuICB9XG5cbiAgaGVhZE9yQm9keS5hcHBlbmRDaGlsZChzY3JpcHQpO1xuICByZXR1cm4gc2NyaXB0O1xufTtcblxudmFyIHJlZ2lzdGVyV3JhcHBlciA9IGZ1bmN0aW9uIHJlZ2lzdGVyV3JhcHBlcihzdHJpcGUsIHN0YXJ0VGltZSkge1xuICBpZiAoIXN0cmlwZSB8fCAhc3RyaXBlLl9yZWdpc3RlcldyYXBwZXIpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBzdHJpcGUuX3JlZ2lzdGVyV3JhcHBlcih7XG4gICAgbmFtZTogJ3N0cmlwZS1qcycsXG4gICAgdmVyc2lvbjogXCIxLjQ2LjBcIixcbiAgICBzdGFydFRpbWU6IHN0YXJ0VGltZVxuICB9KTtcbn07XG5cbnZhciBzdHJpcGVQcm9taXNlID0gbnVsbDtcbnZhciBsb2FkU2NyaXB0ID0gZnVuY3Rpb24gbG9hZFNjcmlwdChwYXJhbXMpIHtcbiAgLy8gRW5zdXJlIHRoYXQgd2Ugb25seSBhdHRlbXB0IHRvIGxvYWQgU3RyaXBlLmpzIGF0IG1vc3Qgb25jZVxuICBpZiAoc3RyaXBlUHJvbWlzZSAhPT0gbnVsbCkge1xuICAgIHJldHVybiBzdHJpcGVQcm9taXNlO1xuICB9XG5cbiAgc3RyaXBlUHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIC8vIFJlc29sdmUgdG8gbnVsbCB3aGVuIGltcG9ydGVkIHNlcnZlciBzaWRlLiBUaGlzIG1ha2VzIHRoZSBtb2R1bGVcbiAgICAgIC8vIHNhZmUgdG8gaW1wb3J0IGluIGFuIGlzb21vcnBoaWMgY29kZSBiYXNlLlxuICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAod2luZG93LlN0cmlwZSAmJiBwYXJhbXMpIHtcbiAgICAgIGNvbnNvbGUud2FybihFWElTVElOR19TQ1JJUFRfTUVTU0FHRSk7XG4gICAgfVxuXG4gICAgaWYgKHdpbmRvdy5TdHJpcGUpIHtcbiAgICAgIHJlc29sdmUod2luZG93LlN0cmlwZSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIHZhciBzY3JpcHQgPSBmaW5kU2NyaXB0KCk7XG5cbiAgICAgIGlmIChzY3JpcHQgJiYgcGFyYW1zKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihFWElTVElOR19TQ1JJUFRfTUVTU0FHRSk7XG4gICAgICB9IGVsc2UgaWYgKCFzY3JpcHQpIHtcbiAgICAgICAgc2NyaXB0ID0gaW5qZWN0U2NyaXB0KHBhcmFtcyk7XG4gICAgICB9XG5cbiAgICAgIHNjcmlwdC5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAod2luZG93LlN0cmlwZSkge1xuICAgICAgICAgIHJlc29sdmUod2luZG93LlN0cmlwZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcignU3RyaXBlLmpzIG5vdCBhdmFpbGFibGUnKSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgc2NyaXB0LmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgZnVuY3Rpb24gKCkge1xuICAgICAgICByZWplY3QobmV3IEVycm9yKCdGYWlsZWQgdG8gbG9hZCBTdHJpcGUuanMnKSk7XG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gc3RyaXBlUHJvbWlzZTtcbn07XG52YXIgaW5pdFN0cmlwZSA9IGZ1bmN0aW9uIGluaXRTdHJpcGUobWF5YmVTdHJpcGUsIGFyZ3MsIHN0YXJ0VGltZSkge1xuICBpZiAobWF5YmVTdHJpcGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHZhciBzdHJpcGUgPSBtYXliZVN0cmlwZS5hcHBseSh1bmRlZmluZWQsIGFyZ3MpO1xuICByZWdpc3RlcldyYXBwZXIoc3RyaXBlLCBzdGFydFRpbWUpO1xuICByZXR1cm4gc3RyaXBlO1xufTsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9leHBsaWNpdC1tb2R1bGUtYm91bmRhcnktdHlwZXNcblxuLy8gb3duIHNjcmlwdCBpbmplY3Rpb24uXG5cbnZhciBzdHJpcGVQcm9taXNlJDEgPSBQcm9taXNlLnJlc29sdmUoKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIGxvYWRTY3JpcHQobnVsbCk7XG59KTtcbnZhciBsb2FkQ2FsbGVkID0gZmFsc2U7XG5zdHJpcGVQcm9taXNlJDFbXCJjYXRjaFwiXShmdW5jdGlvbiAoZXJyKSB7XG4gIGlmICghbG9hZENhbGxlZCkge1xuICAgIGNvbnNvbGUud2FybihlcnIpO1xuICB9XG59KTtcbnZhciBsb2FkU3RyaXBlID0gZnVuY3Rpb24gbG9hZFN0cmlwZSgpIHtcbiAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgYXJnc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgfVxuXG4gIGxvYWRDYWxsZWQgPSB0cnVlO1xuICB2YXIgc3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgcmV0dXJuIHN0cmlwZVByb21pc2UkMS50aGVuKGZ1bmN0aW9uIChtYXliZVN0cmlwZSkge1xuICAgIHJldHVybiBpbml0U3RyaXBlKG1heWJlU3RyaXBlLCBhcmdzLCBzdGFydFRpbWUpO1xuICB9KTtcbn07XG5cbmV4cG9ydCB7IGxvYWRTdHJpcGUgfTtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlcXVpcmVkQXJncyhyZXF1aXJlZCwgYXJncykge1xuICBpZiAoYXJncy5sZW5ndGggPCByZXF1aXJlZCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IocmVxdWlyZWQgKyAnIGFyZ3VtZW50JyArIChyZXF1aXJlZCA+IDEgPyAncycgOiAnJykgKyAnIHJlcXVpcmVkLCBidXQgb25seSAnICsgYXJncy5sZW5ndGggKyAnIHByZXNlbnQnKTtcbiAgfVxufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRvSW50ZWdlcihkaXJ0eU51bWJlcikge1xuICBpZiAoZGlydHlOdW1iZXIgPT09IG51bGwgfHwgZGlydHlOdW1iZXIgPT09IHRydWUgfHwgZGlydHlOdW1iZXIgPT09IGZhbHNlKSB7XG4gICAgcmV0dXJuIE5hTjtcbiAgfVxuXG4gIHZhciBudW1iZXIgPSBOdW1iZXIoZGlydHlOdW1iZXIpO1xuXG4gIGlmIChpc05hTihudW1iZXIpKSB7XG4gICAgcmV0dXJuIG51bWJlcjtcbiAgfVxuXG4gIHJldHVybiBudW1iZXIgPCAwID8gTWF0aC5jZWlsKG51bWJlcikgOiBNYXRoLmZsb29yKG51bWJlcik7XG59IiwiaW1wb3J0IHRvSW50ZWdlciBmcm9tIFwiLi4vX2xpYi90b0ludGVnZXIvaW5kZXguanNcIjtcbmltcG9ydCB0b0RhdGUgZnJvbSBcIi4uL3RvRGF0ZS9pbmRleC5qc1wiO1xuaW1wb3J0IHJlcXVpcmVkQXJncyBmcm9tIFwiLi4vX2xpYi9yZXF1aXJlZEFyZ3MvaW5kZXguanNcIjtcbi8qKlxuICogQG5hbWUgYWRkRGF5c1xuICogQGNhdGVnb3J5IERheSBIZWxwZXJzXG4gKiBAc3VtbWFyeSBBZGQgdGhlIHNwZWNpZmllZCBudW1iZXIgb2YgZGF5cyB0byB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEFkZCB0aGUgc3BlY2lmaWVkIG51bWJlciBvZiBkYXlzIHRvIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBwYXJhbSB7RGF0ZXxOdW1iZXJ9IGRhdGUgLSB0aGUgZGF0ZSB0byBiZSBjaGFuZ2VkXG4gKiBAcGFyYW0ge051bWJlcn0gYW1vdW50IC0gdGhlIGFtb3VudCBvZiBkYXlzIHRvIGJlIGFkZGVkLiBQb3NpdGl2ZSBkZWNpbWFscyB3aWxsIGJlIHJvdW5kZWQgdXNpbmcgYE1hdGguZmxvb3JgLCBkZWNpbWFscyBsZXNzIHRoYW4gemVybyB3aWxsIGJlIHJvdW5kZWQgdXNpbmcgYE1hdGguY2VpbGAuXG4gKiBAcmV0dXJucyB7RGF0ZX0gLSB0aGUgbmV3IGRhdGUgd2l0aCB0aGUgZGF5cyBhZGRlZFxuICogQHRocm93cyB7VHlwZUVycm9yfSAtIDIgYXJndW1lbnRzIHJlcXVpcmVkXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEFkZCAxMCBkYXlzIHRvIDEgU2VwdGVtYmVyIDIwMTQ6XG4gKiBjb25zdCByZXN1bHQgPSBhZGREYXlzKG5ldyBEYXRlKDIwMTQsIDgsIDEpLCAxMClcbiAqIC8vPT4gVGh1IFNlcCAxMSAyMDE0IDAwOjAwOjAwXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYWRkRGF5cyhkaXJ0eURhdGUsIGRpcnR5QW1vdW50KSB7XG4gIHJlcXVpcmVkQXJncygyLCBhcmd1bWVudHMpO1xuICB2YXIgZGF0ZSA9IHRvRGF0ZShkaXJ0eURhdGUpO1xuICB2YXIgYW1vdW50ID0gdG9JbnRlZ2VyKGRpcnR5QW1vdW50KTtcblxuICBpZiAoaXNOYU4oYW1vdW50KSkge1xuICAgIHJldHVybiBuZXcgRGF0ZShOYU4pO1xuICB9XG5cbiAgaWYgKCFhbW91bnQpIHtcbiAgICAvLyBJZiAwIGRheXMsIG5vLW9wIHRvIGF2b2lkIGNoYW5naW5nIHRpbWVzIGluIHRoZSBob3VyIGJlZm9yZSBlbmQgb2YgRFNUXG4gICAgcmV0dXJuIGRhdGU7XG4gIH1cblxuICBkYXRlLnNldERhdGUoZGF0ZS5nZXREYXRlKCkgKyBhbW91bnQpO1xuICByZXR1cm4gZGF0ZTtcbn0iLCJpbXBvcnQgdG9JbnRlZ2VyIGZyb20gXCIuLi9fbGliL3RvSW50ZWdlci9pbmRleC5qc1wiO1xuaW1wb3J0IHRvRGF0ZSBmcm9tIFwiLi4vdG9EYXRlL2luZGV4LmpzXCI7XG5pbXBvcnQgcmVxdWlyZWRBcmdzIGZyb20gXCIuLi9fbGliL3JlcXVpcmVkQXJncy9pbmRleC5qc1wiO1xuLyoqXG4gKiBAbmFtZSBhZGRNb250aHNcbiAqIEBjYXRlZ29yeSBNb250aCBIZWxwZXJzXG4gKiBAc3VtbWFyeSBBZGQgdGhlIHNwZWNpZmllZCBudW1iZXIgb2YgbW9udGhzIHRvIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogQWRkIHRoZSBzcGVjaWZpZWQgbnVtYmVyIG9mIG1vbnRocyB0byB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8TnVtYmVyfSBkYXRlIC0gdGhlIGRhdGUgdG8gYmUgY2hhbmdlZFxuICogQHBhcmFtIHtOdW1iZXJ9IGFtb3VudCAtIHRoZSBhbW91bnQgb2YgbW9udGhzIHRvIGJlIGFkZGVkLiBQb3NpdGl2ZSBkZWNpbWFscyB3aWxsIGJlIHJvdW5kZWQgdXNpbmcgYE1hdGguZmxvb3JgLCBkZWNpbWFscyBsZXNzIHRoYW4gemVybyB3aWxsIGJlIHJvdW5kZWQgdXNpbmcgYE1hdGguY2VpbGAuXG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIG5ldyBkYXRlIHdpdGggdGhlIG1vbnRocyBhZGRlZFxuICogQHRocm93cyB7VHlwZUVycm9yfSAyIGFyZ3VtZW50cyByZXF1aXJlZFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBBZGQgNSBtb250aHMgdG8gMSBTZXB0ZW1iZXIgMjAxNDpcbiAqIGNvbnN0IHJlc3VsdCA9IGFkZE1vbnRocyhuZXcgRGF0ZSgyMDE0LCA4LCAxKSwgNSlcbiAqIC8vPT4gU3VuIEZlYiAwMSAyMDE1IDAwOjAwOjAwXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYWRkTW9udGhzKGRpcnR5RGF0ZSwgZGlydHlBbW91bnQpIHtcbiAgcmVxdWlyZWRBcmdzKDIsIGFyZ3VtZW50cyk7XG4gIHZhciBkYXRlID0gdG9EYXRlKGRpcnR5RGF0ZSk7XG4gIHZhciBhbW91bnQgPSB0b0ludGVnZXIoZGlydHlBbW91bnQpO1xuXG4gIGlmIChpc05hTihhbW91bnQpKSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKE5hTik7XG4gIH1cblxuICBpZiAoIWFtb3VudCkge1xuICAgIC8vIElmIDAgbW9udGhzLCBuby1vcCB0byBhdm9pZCBjaGFuZ2luZyB0aW1lcyBpbiB0aGUgaG91ciBiZWZvcmUgZW5kIG9mIERTVFxuICAgIHJldHVybiBkYXRlO1xuICB9XG5cbiAgdmFyIGRheU9mTW9udGggPSBkYXRlLmdldERhdGUoKTsgLy8gVGhlIEpTIERhdGUgb2JqZWN0IHN1cHBvcnRzIGRhdGUgbWF0aCBieSBhY2NlcHRpbmcgb3V0LW9mLWJvdW5kcyB2YWx1ZXMgZm9yXG4gIC8vIG1vbnRoLCBkYXksIGV0Yy4gRm9yIGV4YW1wbGUsIG5ldyBEYXRlKDIwMjAsIDAsIDApIHJldHVybnMgMzEgRGVjIDIwMTkgYW5kXG4gIC8vIG5ldyBEYXRlKDIwMjAsIDEzLCAxKSByZXR1cm5zIDEgRmViIDIwMjEuICBUaGlzIGlzICphbG1vc3QqIHRoZSBiZWhhdmlvciB3ZVxuICAvLyB3YW50IGV4Y2VwdCB0aGF0IGRhdGVzIHdpbGwgd3JhcCBhcm91bmQgdGhlIGVuZCBvZiBhIG1vbnRoLCBtZWFuaW5nIHRoYXRcbiAgLy8gbmV3IERhdGUoMjAyMCwgMTMsIDMxKSB3aWxsIHJldHVybiAzIE1hciAyMDIxIG5vdCAyOCBGZWIgMjAyMSBhcyBkZXNpcmVkLiBTb1xuICAvLyB3ZSdsbCBkZWZhdWx0IHRvIHRoZSBlbmQgb2YgdGhlIGRlc2lyZWQgbW9udGggYnkgYWRkaW5nIDEgdG8gdGhlIGRlc2lyZWRcbiAgLy8gbW9udGggYW5kIHVzaW5nIGEgZGF0ZSBvZiAwIHRvIGJhY2sgdXAgb25lIGRheSB0byB0aGUgZW5kIG9mIHRoZSBkZXNpcmVkXG4gIC8vIG1vbnRoLlxuXG4gIHZhciBlbmRPZkRlc2lyZWRNb250aCA9IG5ldyBEYXRlKGRhdGUuZ2V0VGltZSgpKTtcbiAgZW5kT2ZEZXNpcmVkTW9udGguc2V0TW9udGgoZGF0ZS5nZXRNb250aCgpICsgYW1vdW50ICsgMSwgMCk7XG4gIHZhciBkYXlzSW5Nb250aCA9IGVuZE9mRGVzaXJlZE1vbnRoLmdldERhdGUoKTtcblxuICBpZiAoZGF5T2ZNb250aCA+PSBkYXlzSW5Nb250aCkge1xuICAgIC8vIElmIHdlJ3JlIGFscmVhZHkgYXQgdGhlIGVuZCBvZiB0aGUgbW9udGgsIHRoZW4gdGhpcyBpcyB0aGUgY29ycmVjdCBkYXRlXG4gICAgLy8gYW5kIHdlJ3JlIGRvbmUuXG4gICAgcmV0dXJuIGVuZE9mRGVzaXJlZE1vbnRoO1xuICB9IGVsc2Uge1xuICAgIC8vIE90aGVyd2lzZSwgd2Ugbm93IGtub3cgdGhhdCBzZXR0aW5nIHRoZSBvcmlnaW5hbCBkYXktb2YtbW9udGggdmFsdWUgd29uJ3RcbiAgICAvLyBjYXVzZSBhbiBvdmVyZmxvdywgc28gc2V0IHRoZSBkZXNpcmVkIGRheS1vZi1tb250aC4gTm90ZSB0aGF0IHdlIGNhbid0XG4gICAgLy8ganVzdCBzZXQgdGhlIGRhdGUgb2YgYGVuZE9mRGVzaXJlZE1vbnRoYCBiZWNhdXNlIHRoYXQgb2JqZWN0IG1heSBoYXZlIGhhZFxuICAgIC8vIGl0cyB0aW1lIGNoYW5nZWQgaW4gdGhlIHVudXN1YWwgY2FzZSB3aGVyZSB3aGVyZSBhIERTVCB0cmFuc2l0aW9uIHdhcyBvblxuICAgIC8vIHRoZSBsYXN0IGRheSBvZiB0aGUgbW9udGggYW5kIGl0cyBsb2NhbCB0aW1lIHdhcyBpbiB0aGUgaG91ciBza2lwcGVkIG9yXG4gICAgLy8gcmVwZWF0ZWQgbmV4dCB0byBhIERTVCB0cmFuc2l0aW9uLiAgU28gd2UgdXNlIGBkYXRlYCBpbnN0ZWFkIHdoaWNoIGlzXG4gICAgLy8gZ3VhcmFudGVlZCB0byBzdGlsbCBoYXZlIHRoZSBvcmlnaW5hbCB0aW1lLlxuICAgIGRhdGUuc2V0RnVsbFllYXIoZW5kT2ZEZXNpcmVkTW9udGguZ2V0RnVsbFllYXIoKSwgZW5kT2ZEZXNpcmVkTW9udGguZ2V0TW9udGgoKSwgZGF5T2ZNb250aCk7XG4gICAgcmV0dXJuIGRhdGU7XG4gIH1cbn0iLCJpbXBvcnQgdG9EYXRlIGZyb20gXCIuLi90b0RhdGUvaW5kZXguanNcIjtcbmltcG9ydCByZXF1aXJlZEFyZ3MgZnJvbSBcIi4uL19saWIvcmVxdWlyZWRBcmdzL2luZGV4LmpzXCI7XG4vKipcbiAqIEBuYW1lIGVuZE9mTW9udGhcbiAqIEBjYXRlZ29yeSBNb250aCBIZWxwZXJzXG4gKiBAc3VtbWFyeSBSZXR1cm4gdGhlIGVuZCBvZiBhIG1vbnRoIGZvciB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFJldHVybiB0aGUgZW5kIG9mIGEgbW9udGggZm9yIHRoZSBnaXZlbiBkYXRlLlxuICogVGhlIHJlc3VsdCB3aWxsIGJlIGluIHRoZSBsb2NhbCB0aW1lem9uZS5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8TnVtYmVyfSBkYXRlIC0gdGhlIG9yaWdpbmFsIGRhdGVcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgZW5kIG9mIGEgbW9udGhcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gMSBhcmd1bWVudCByZXF1aXJlZFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBUaGUgZW5kIG9mIGEgbW9udGggZm9yIDIgU2VwdGVtYmVyIDIwMTQgMTE6NTU6MDA6XG4gKiBjb25zdCByZXN1bHQgPSBlbmRPZk1vbnRoKG5ldyBEYXRlKDIwMTQsIDgsIDIsIDExLCA1NSwgMCkpXG4gKiAvLz0+IFR1ZSBTZXAgMzAgMjAxNCAyMzo1OTo1OS45OTlcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBlbmRPZk1vbnRoKGRpcnR5RGF0ZSkge1xuICByZXF1aXJlZEFyZ3MoMSwgYXJndW1lbnRzKTtcbiAgdmFyIGRhdGUgPSB0b0RhdGUoZGlydHlEYXRlKTtcbiAgdmFyIG1vbnRoID0gZGF0ZS5nZXRNb250aCgpO1xuICBkYXRlLnNldEZ1bGxZZWFyKGRhdGUuZ2V0RnVsbFllYXIoKSwgbW9udGggKyAxLCAwKTtcbiAgZGF0ZS5zZXRIb3VycygyMywgNTksIDU5LCA5OTkpO1xuICByZXR1cm4gZGF0ZTtcbn0iLCJpbXBvcnQgdG9JbnRlZ2VyIGZyb20gXCIuLi9fbGliL3RvSW50ZWdlci9pbmRleC5qc1wiO1xuaW1wb3J0IHRvRGF0ZSBmcm9tIFwiLi4vdG9EYXRlL2luZGV4LmpzXCI7XG5pbXBvcnQgcmVxdWlyZWRBcmdzIGZyb20gXCIuLi9fbGliL3JlcXVpcmVkQXJncy9pbmRleC5qc1wiO1xuLyoqXG4gKiBAbmFtZSBzZXREYXRlXG4gKiBAY2F0ZWdvcnkgRGF5IEhlbHBlcnNcbiAqIEBzdW1tYXJ5IFNldCB0aGUgZGF5IG9mIHRoZSBtb250aCB0byB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFNldCB0aGUgZGF5IG9mIHRoZSBtb250aCB0byB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8TnVtYmVyfSBkYXRlIC0gdGhlIGRhdGUgdG8gYmUgY2hhbmdlZFxuICogQHBhcmFtIHtOdW1iZXJ9IGRheU9mTW9udGggLSB0aGUgZGF5IG9mIHRoZSBtb250aCBvZiB0aGUgbmV3IGRhdGVcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgbmV3IGRhdGUgd2l0aCB0aGUgZGF5IG9mIHRoZSBtb250aCBzZXRcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gMiBhcmd1bWVudHMgcmVxdWlyZWRcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gU2V0IHRoZSAzMHRoIGRheSBvZiB0aGUgbW9udGggdG8gMSBTZXB0ZW1iZXIgMjAxNDpcbiAqIGNvbnN0IHJlc3VsdCA9IHNldERhdGUobmV3IERhdGUoMjAxNCwgOCwgMSksIDMwKVxuICogLy89PiBUdWUgU2VwIDMwIDIwMTQgMDA6MDA6MDBcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzZXREYXRlKGRpcnR5RGF0ZSwgZGlydHlEYXlPZk1vbnRoKSB7XG4gIHJlcXVpcmVkQXJncygyLCBhcmd1bWVudHMpO1xuICB2YXIgZGF0ZSA9IHRvRGF0ZShkaXJ0eURhdGUpO1xuICB2YXIgZGF5T2ZNb250aCA9IHRvSW50ZWdlcihkaXJ0eURheU9mTW9udGgpO1xuICBkYXRlLnNldERhdGUoZGF5T2ZNb250aCk7XG4gIHJldHVybiBkYXRlO1xufSIsImZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IFwiQGJhYmVsL2hlbHBlcnMgLSB0eXBlb2ZcIjsgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiKSB7IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfTsgfSBlbHNlIHsgX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9OyB9IHJldHVybiBfdHlwZW9mKG9iaik7IH1cblxuaW1wb3J0IHJlcXVpcmVkQXJncyBmcm9tIFwiLi4vX2xpYi9yZXF1aXJlZEFyZ3MvaW5kZXguanNcIjtcbi8qKlxuICogQG5hbWUgdG9EYXRlXG4gKiBAY2F0ZWdvcnkgQ29tbW9uIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IENvbnZlcnQgdGhlIGdpdmVuIGFyZ3VtZW50IHRvIGFuIGluc3RhbmNlIG9mIERhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBDb252ZXJ0IHRoZSBnaXZlbiBhcmd1bWVudCB0byBhbiBpbnN0YW5jZSBvZiBEYXRlLlxuICpcbiAqIElmIHRoZSBhcmd1bWVudCBpcyBhbiBpbnN0YW5jZSBvZiBEYXRlLCB0aGUgZnVuY3Rpb24gcmV0dXJucyBpdHMgY2xvbmUuXG4gKlxuICogSWYgdGhlIGFyZ3VtZW50IGlzIGEgbnVtYmVyLCBpdCBpcyB0cmVhdGVkIGFzIGEgdGltZXN0YW1wLlxuICpcbiAqIElmIHRoZSBhcmd1bWVudCBpcyBub25lIG9mIHRoZSBhYm92ZSwgdGhlIGZ1bmN0aW9uIHJldHVybnMgSW52YWxpZCBEYXRlLlxuICpcbiAqICoqTm90ZSoqOiAqYWxsKiBEYXRlIGFyZ3VtZW50cyBwYXNzZWQgdG8gYW55ICpkYXRlLWZucyogZnVuY3Rpb24gaXMgcHJvY2Vzc2VkIGJ5IGB0b0RhdGVgLlxuICpcbiAqIEBwYXJhbSB7RGF0ZXxOdW1iZXJ9IGFyZ3VtZW50IC0gdGhlIHZhbHVlIHRvIGNvbnZlcnRcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgcGFyc2VkIGRhdGUgaW4gdGhlIGxvY2FsIHRpbWUgem9uZVxuICogQHRocm93cyB7VHlwZUVycm9yfSAxIGFyZ3VtZW50IHJlcXVpcmVkXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIENsb25lIHRoZSBkYXRlOlxuICogY29uc3QgcmVzdWx0ID0gdG9EYXRlKG5ldyBEYXRlKDIwMTQsIDEsIDExLCAxMSwgMzAsIDMwKSlcbiAqIC8vPT4gVHVlIEZlYiAxMSAyMDE0IDExOjMwOjMwXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIENvbnZlcnQgdGhlIHRpbWVzdGFtcCB0byBkYXRlOlxuICogY29uc3QgcmVzdWx0ID0gdG9EYXRlKDEzOTIwOTg0MzAwMDApXG4gKiAvLz0+IFR1ZSBGZWIgMTEgMjAxNCAxMTozMDozMFxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRvRGF0ZShhcmd1bWVudCkge1xuICByZXF1aXJlZEFyZ3MoMSwgYXJndW1lbnRzKTtcbiAgdmFyIGFyZ1N0ciA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhcmd1bWVudCk7IC8vIENsb25lIHRoZSBkYXRlXG5cbiAgaWYgKGFyZ3VtZW50IGluc3RhbmNlb2YgRGF0ZSB8fCBfdHlwZW9mKGFyZ3VtZW50KSA9PT0gJ29iamVjdCcgJiYgYXJnU3RyID09PSAnW29iamVjdCBEYXRlXScpIHtcbiAgICAvLyBQcmV2ZW50IHRoZSBkYXRlIHRvIGxvc2UgdGhlIG1pbGxpc2Vjb25kcyB3aGVuIHBhc3NlZCB0byBuZXcgRGF0ZSgpIGluIElFMTBcbiAgICByZXR1cm4gbmV3IERhdGUoYXJndW1lbnQuZ2V0VGltZSgpKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgYXJndW1lbnQgPT09ICdudW1iZXInIHx8IGFyZ1N0ciA9PT0gJ1tvYmplY3QgTnVtYmVyXScpIHtcbiAgICByZXR1cm4gbmV3IERhdGUoYXJndW1lbnQpO1xuICB9IGVsc2Uge1xuICAgIGlmICgodHlwZW9mIGFyZ3VtZW50ID09PSAnc3RyaW5nJyB8fCBhcmdTdHIgPT09ICdbb2JqZWN0IFN0cmluZ10nKSAmJiB0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICBjb25zb2xlLndhcm4oXCJTdGFydGluZyB3aXRoIHYyLjAuMC1iZXRhLjEgZGF0ZS1mbnMgZG9lc24ndCBhY2NlcHQgc3RyaW5ncyBhcyBkYXRlIGFyZ3VtZW50cy4gUGxlYXNlIHVzZSBgcGFyc2VJU09gIHRvIHBhcnNlIHN0cmluZ3MuIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL2RhdGUtZm5zL2Jsb2IvbWFzdGVyL2RvY3MvdXBncmFkZUd1aWRlLm1kI3N0cmluZy1hcmd1bWVudHNcIik7IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG5cbiAgICAgIGNvbnNvbGUud2FybihuZXcgRXJyb3IoKS5zdGFjayk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBEYXRlKE5hTik7XG4gIH1cbn0iLCJleHBvcnQgZnVuY3Rpb24gY3JlYXRlTW9kYWwoKSB7XG4gICAgLy8gc3R5bGUgdGFnXG4gICAgdmFyIGNzcyA9IFwiXFxuICAgICAgLmxvb3BzLXB1cmNoYXNlLW1vZGFsIHtcXG4gICAgICAgICAgcG9zaXRpb246IGZpeGVkO1xcbiAgICAgICAgICB0b3A6IDUwJTtcXG4gICAgICAgICAgbGVmdDogNTAlO1xcbiAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcXG4gICAgICAgICAgd2lkdGg6IDEwMCU7XFxuICAgICAgICAgIGhlaWdodDogMTAwJTtcXG4gICAgICAgICAgZGlzcGxheTogZmxleDtcXG4gICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC40KTtcXG4gICAgICB9XFxuXFxuICAgICAgLmxvb3BzLXB1cmNoYXNlLW1vZGFsLWNvbnRlbnQge1xcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZlZmVmZTtcXG4gICAgICAgIHdpZHRoOiA1MCU7XFxuICAgICAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xcbiAgICAgICAgbWF4LWhlaWdodDogOTB2aDtcXG4gICAgICAgIG92ZXJmbG93LXk6IGF1dG87XFxuICAgICAgfVxcblxcbiAgICAgIC50aXRsZSB7XFxuICAgICAgICBmb250LXNpemU6IDIwcHg7XFxuICAgICAgICBmb250LXdlaWdodDogYm9sZDtcXG4gICAgICAgIHBhZGRpbmc6IDIwcHg7XFxuICAgICAgfVxcblxcbiAgICAgIGZvcm0ge1xcbiAgICAgICAgbWluLXdpZHRoOiA1MDBweDtcXG4gICAgICAgIGFsaWduLXNlbGY6IGNlbnRlcjtcXG4gICAgICAgIGJveC1zaGFkb3c6IDBweCAwcHggMHB4IDAuNXB4IHJnYmEoNTAsIDUwLCA5MywgMC4xKSxcXG4gICAgICAgICAgMHB4IDJweCA1cHggMHB4IHJnYmEoNTAsIDUwLCA5MywgMC4xKSwgMHB4IDFweCAxLjVweCAwcHggcmdiYSgwLCAwLCAwLCAwLjA3KTtcXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDdweDtcXG4gICAgICAgIHBhZGRpbmc6IDQwcHg7XFxuICAgICAgfVxcblxcbiAgICAgIC5oaWRkZW4ge1xcbiAgICAgICAgZGlzcGxheTogbm9uZSFpbXBvcnRhbnQ7XFxuICAgICAgfVxcblxcbiAgICAgICNwYXltZW50LW1lc3NhZ2Uge1xcbiAgICAgICAgY29sb3I6IHJnYigxMDUsIDExNSwgMTM0KTtcXG4gICAgICAgIGZvbnQtc2l6ZTogMTZweDtcXG4gICAgICAgIGxpbmUtaGVpZ2h0OiAyMHB4O1xcbiAgICAgICAgcGFkZGluZy10b3A6IDEycHg7XFxuICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgICAgfVxcblxcbiAgICAgICNsaW5rLWF1dGhlbnRpY2F0aW9uLWVsZW1lbnQge1xcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMjRweDtcXG4gICAgICB9XFxuXFxuICAgICAgI3BheW1lbnQtZWxlbWVudCB7XFxuICAgICAgICBtYXJnaW4tYm90dG9tOiAyNHB4O1xcbiAgICAgIH1cXG5cXG4gICAgICAjYWRkcmVzcy1lbGVtZW50IHtcXG4gICAgICAgIG1hcmdpbi1ib3R0b206IDI0cHg7XFxuICAgICAgfVxcblxcbiAgICAgIC8qIEJ1dHRvbnMgYW5kIGxpbmtzICovXFxuICAgICAgI3N1Ym1pdCB7XFxuICAgICAgICBiYWNrZ3JvdW5kOiAjNTQ2OWQ0O1xcbiAgICAgICAgZm9udC1mYW1pbHk6IEFyaWFsLCBzYW5zLXNlcmlmO1xcbiAgICAgICAgY29sb3I6ICNmZmZmZmY7XFxuICAgICAgICBib3JkZXItcmFkaXVzOiA0cHg7XFxuICAgICAgICBib3JkZXI6IDA7XFxuICAgICAgICBwYWRkaW5nOiAxMnB4IDE2cHg7XFxuICAgICAgICBmb250LXNpemU6IDE2cHg7XFxuICAgICAgICBmb250LXdlaWdodDogNjAwO1xcbiAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XFxuICAgICAgICB0cmFuc2l0aW9uOiBhbGwgMC4ycyBlYXNlO1xcbiAgICAgICAgYm94LXNoYWRvdzogMHB4IDRweCA1LjVweCAwcHggcmdiYSgwLCAwLCAwLCAwLjA3KTtcXG4gICAgICAgIHdpZHRoOiAxMDAlO1xcbiAgICAgIH1cXG4gICAgICAjc3VibWl0OmhvdmVyIHtcXG4gICAgICAgIGZpbHRlcjogY29udHJhc3QoMTE1JSk7XFxuICAgICAgfVxcbiAgICAgICNzdWJtaXQ6ZGlzYWJsZWQge1xcbiAgICAgICAgb3BhY2l0eTogMC41O1xcbiAgICAgICAgY3Vyc29yOiBkZWZhdWx0O1xcbiAgICAgIH1cXG5cXG4gICAgICAjY2FuY2VsIHtcXG4gICAgICAgIGJhY2tncm91bmQ6IHdoaXRlO1xcbiAgICAgICAgZm9udC1mYW1pbHk6IEFyaWFsLCBzYW5zLXNlcmlmO1xcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNHB4O1xcbiAgICAgICAgYm9yZGVyOiAwO1xcbiAgICAgICAgcGFkZGluZzogMTJweCAxNnB4O1xcbiAgICAgICAgZm9udC1zaXplOiAxNnB4O1xcbiAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcXG4gICAgICAgIG1hcmdpbi10b3A6IDEwcHg7XFxuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgICAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgICAgIHRyYW5zaXRpb246IGFsbCAwLjJzIGVhc2U7XFxuICAgICAgICBib3gtc2hhZG93OiAwcHggNHB4IDUuNXB4IDBweCByZ2JhKDAsIDAsIDAsIDAuMDcpO1xcbiAgICAgICAgd2lkdGg6IDEwMCU7XFxuICAgICAgfVxcbiAgICAgICNjYW5jZWw6aG92ZXIge1xcbiAgICAgICAgZmlsdGVyOiBjb250cmFzdCgxMTUlKTtcXG4gICAgICB9XFxuICAgICAgI2NhbmNlbDpkaXNhYmxlZCB7XFxuICAgICAgICBvcGFjaXR5OiAwLjU7XFxuICAgICAgICBjdXJzb3I6IGRlZmF1bHQ7XFxuICAgICAgfVxcblxcbiAgICAgIC8qIHNwaW5uZXIvcHJvY2Vzc2luZyBzdGF0ZSwgZXJyb3JzICovXFxuICAgICAgLnNwaW5uZXIsXFxuICAgICAgLnNwaW5uZXI6YmVmb3JlLFxcbiAgICAgIC5zcGlubmVyOmFmdGVyIHtcXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gICAgICB9XFxuICAgICAgLnNwaW5uZXIge1xcbiAgICAgICAgY29sb3I6ICNmZmZmZmY7XFxuICAgICAgICBmb250LXNpemU6IDIycHg7XFxuICAgICAgICB0ZXh0LWluZGVudDogLTk5OTk5cHg7XFxuICAgICAgICBtYXJnaW46IDBweCBhdXRvO1xcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICAgICAgd2lkdGg6IDIwcHg7XFxuICAgICAgICBoZWlnaHQ6IDIwcHg7XFxuICAgICAgICBib3gtc2hhZG93OiBpbnNldCAwIDAgMCAycHg7XFxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWigwKTtcXG4gICAgICAgIC1tcy10cmFuc2Zvcm06IHRyYW5zbGF0ZVooMCk7XFxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVooMCk7XFxuICAgICAgfVxcbiAgICAgIC5zcGlubmVyOmJlZm9yZSxcXG4gICAgICAuc3Bpbm5lcjphZnRlciB7XFxuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgICAgICBjb250ZW50OiBcXFwiXFxcIjtcXG4gICAgICB9XFxuICAgICAgLnNwaW5uZXI6YmVmb3JlIHtcXG4gICAgICAgIHdpZHRoOiAxMC40cHg7XFxuICAgICAgICBoZWlnaHQ6IDIwLjRweDtcXG4gICAgICAgIGJhY2tncm91bmQ6ICM1NDY5ZDQ7XFxuICAgICAgICBib3JkZXItcmFkaXVzOiAyMC40cHggMCAwIDIwLjRweDtcXG4gICAgICAgIHRvcDogLTAuMnB4O1xcbiAgICAgICAgbGVmdDogLTAuMnB4O1xcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOiAxMC40cHggMTAuMnB4O1xcbiAgICAgICAgdHJhbnNmb3JtLW9yaWdpbjogMTAuNHB4IDEwLjJweDtcXG4gICAgICAgIC13ZWJraXQtYW5pbWF0aW9uOiBsb2FkaW5nIDJzIGluZmluaXRlIGVhc2UgMS41cztcXG4gICAgICAgIGFuaW1hdGlvbjogbG9hZGluZyAycyBpbmZpbml0ZSBlYXNlIDEuNXM7XFxuICAgICAgfVxcbiAgICAgIC5zcGlubmVyOmFmdGVyIHtcXG4gICAgICAgIHdpZHRoOiAxMC40cHg7XFxuICAgICAgICBoZWlnaHQ6IDEwLjJweDtcXG4gICAgICAgIGJhY2tncm91bmQ6ICM1NDY5ZDQ7XFxuICAgICAgICBib3JkZXItcmFkaXVzOiAwIDEwLjJweCAxMC4ycHggMDtcXG4gICAgICAgIHRvcDogLTAuMXB4O1xcbiAgICAgICAgbGVmdDogMTAuMnB4O1xcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOiAwcHggMTAuMnB4O1xcbiAgICAgICAgdHJhbnNmb3JtLW9yaWdpbjogMHB4IDEwLjJweDtcXG4gICAgICAgIC13ZWJraXQtYW5pbWF0aW9uOiBsb2FkaW5nIDJzIGluZmluaXRlIGVhc2U7XFxuICAgICAgICBhbmltYXRpb246IGxvYWRpbmcgMnMgaW5maW5pdGUgZWFzZTtcXG4gICAgICB9XFxuXFxuICAgICAgQC13ZWJraXQta2V5ZnJhbWVzIGxvYWRpbmcge1xcbiAgICAgICAgMCUge1xcbiAgICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDBkZWcpO1xcbiAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTtcXG4gICAgICAgIH1cXG4gICAgICAgIDEwMCUge1xcbiAgICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7XFxuICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7XFxuICAgICAgICB9XFxuICAgICAgfVxcbiAgICAgIEBrZXlmcmFtZXMgbG9hZGluZyB7XFxuICAgICAgICAwJSB7XFxuICAgICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7XFxuICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDBkZWcpO1xcbiAgICAgICAgfVxcbiAgICAgICAgMTAwJSB7XFxuICAgICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTtcXG4gICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTtcXG4gICAgICAgIH1cXG4gICAgICB9XFxuXFxuICAgICAgQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA2MDBweCkge1xcbiAgICAgICAgZm9ybSB7XFxuICAgICAgICAgIHdpZHRoOiA4MHZ3O1xcbiAgICAgICAgICBtaW4td2lkdGg6IGluaXRpYWw7XFxuICAgICAgICB9XFxuICAgICAgfVxcblxcbiAgICAgIC5sZHMtc3Bpbm5lciB7XFxuICAgICAgICBjb2xvcjogb2ZmaWNpYWw7XFxuICAgICAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgICAgIHdpZHRoOiA4MHB4O1xcbiAgICAgICAgaGVpZ2h0OiA4MHB4O1xcbiAgICAgICAgbWFyZ2luOiBhdXRvO1xcbiAgICAgIH1cXG4gICAgICAubGRzLXNwaW5uZXIgZGl2IHtcXG4gICAgICAgIHRyYW5zZm9ybS1vcmlnaW46IDQwcHggNDBweDtcXG4gICAgICAgIGFuaW1hdGlvbjogbGRzLXNwaW5uZXIgMS4ycyBsaW5lYXIgaW5maW5pdGU7XFxuICAgICAgfVxcbiAgICAgIC5sZHMtc3Bpbm5lciBkaXY6YWZ0ZXIge1xcbiAgICAgICAgY29udGVudDogXFxcIiBcXFwiO1xcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XFxuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgICAgICB0b3A6IDNweDtcXG4gICAgICAgIGxlZnQ6IDM3cHg7XFxuICAgICAgICB3aWR0aDogNnB4O1xcbiAgICAgICAgaGVpZ2h0OiAxOHB4O1xcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMjAlO1xcbiAgICAgICAgYmFja2dyb3VuZDogYmxhY2s7XFxuICAgICAgfVxcbiAgICAgIC5sZHMtc3Bpbm5lciBkaXY6bnRoLWNoaWxkKDEpIHtcXG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDBkZWcpO1xcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiAtMS4xcztcXG4gICAgICB9XFxuICAgICAgLmxkcy1zcGlubmVyIGRpdjpudGgtY2hpbGQoMikge1xcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMzBkZWcpO1xcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiAtMXM7XFxuICAgICAgfVxcbiAgICAgIC5sZHMtc3Bpbm5lciBkaXY6bnRoLWNoaWxkKDMpIHtcXG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDYwZGVnKTtcXG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogLTAuOXM7XFxuICAgICAgfVxcbiAgICAgIC5sZHMtc3Bpbm5lciBkaXY6bnRoLWNoaWxkKDQpIHtcXG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDkwZGVnKTtcXG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogLTAuOHM7XFxuICAgICAgfVxcbiAgICAgIC5sZHMtc3Bpbm5lciBkaXY6bnRoLWNoaWxkKDUpIHtcXG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDEyMGRlZyk7XFxuICAgICAgICBhbmltYXRpb24tZGVsYXk6IC0wLjdzO1xcbiAgICAgIH1cXG4gICAgICAubGRzLXNwaW5uZXIgZGl2Om50aC1jaGlsZCg2KSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgxNTBkZWcpO1xcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiAtMC42cztcXG4gICAgICB9XFxuICAgICAgLmxkcy1zcGlubmVyIGRpdjpudGgtY2hpbGQoNykge1xcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMTgwZGVnKTtcXG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogLTAuNXM7XFxuICAgICAgfVxcbiAgICAgIC5sZHMtc3Bpbm5lciBkaXY6bnRoLWNoaWxkKDgpIHtcXG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDIxMGRlZyk7XFxuICAgICAgICBhbmltYXRpb24tZGVsYXk6IC0wLjRzO1xcbiAgICAgIH1cXG4gICAgICAubGRzLXNwaW5uZXIgZGl2Om50aC1jaGlsZCg5KSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgyNDBkZWcpO1xcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiAtMC4zcztcXG4gICAgICB9XFxuICAgICAgLmxkcy1zcGlubmVyIGRpdjpudGgtY2hpbGQoMTApIHtcXG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDI3MGRlZyk7XFxuICAgICAgICBhbmltYXRpb24tZGVsYXk6IC0wLjJzO1xcbiAgICAgIH1cXG4gICAgICAubGRzLXNwaW5uZXIgZGl2Om50aC1jaGlsZCgxMSkge1xcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMzAwZGVnKTtcXG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogLTAuMXM7XFxuICAgICAgfVxcbiAgICAgIC5sZHMtc3Bpbm5lciBkaXY6bnRoLWNoaWxkKDEyKSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgzMzBkZWcpO1xcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiAwcztcXG4gICAgICB9XFxuICAgICAgQGtleWZyYW1lcyBsZHMtc3Bpbm5lciB7XFxuICAgICAgICAwJSB7XFxuICAgICAgICAgIG9wYWNpdHk6IDE7XFxuICAgICAgICB9XFxuICAgICAgICAxMDAlIHtcXG4gICAgICAgICAgb3BhY2l0eTogMDtcXG4gICAgICAgIH1cXG4gICAgICB9XFxuXFxuXFxuICAgIFwiO1xuICAgIGlmICghZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcInN0eWxlW2RhdGEtbG9vcHNdXCIpKSB7XG4gICAgICAgIHZhciBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgICAgICAgc3R5bGUuc2V0QXR0cmlidXRlKFwiZGF0YS1sb29wc1wiLCBcIlwiKTtcbiAgICAgICAgc3R5bGUuaW5uZXJIVE1MID0gY3NzO1xuICAgICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHN0eWxlKTtcbiAgICB9XG4gICAgLy8gbW9kYWxcbiAgICB2YXIgbW9kYWwgPSBcIlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImxvb3BzLXB1cmNoYXNlLW1vZGFsXFxcIj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcImxvb3BzLXB1cmNoYXNlLW1vZGFsLWNvbnRlbnRcXFwiPlxcblxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwibGRzLXNwaW5uZXIgaGlkZGVuXFxcIj48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48L2Rpdj5cXG5cXG4gICAgICAgICAgPGZvcm0gaWQ9XFxcInBheW1lbnQtZm9ybVxcXCI+XFxuXFxuICAgICAgICAgICAgPGRpdiBpZD1cXFwibGluay1hdXRoZW50aWNhdGlvbi1lbGVtZW50XFxcIj48L2Rpdj5cXG5cXG4gICAgICAgICAgICA8ZGl2IGlkPVxcXCJwYXltZW50LWVsZW1lbnRcXFwiPjwvZGl2PlxcblxcbiAgICAgICAgICAgIDxkaXYgaWQ9XFxcImFkZHJlc3MtZWxlbWVudFxcXCI+PC9kaXY+XFxuXFxuICAgICAgICAgICAgPGRpdiBpZD1cXFwicGF5bWVudC1tZXNzYWdlXFxcIiBjbGFzcz1cXFwiaGlkZGVuXFxcIj48L2Rpdj5cXG5cXG4gICAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJzdWJtaXRcXFwiPlxcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwic3Bpbm5lciBoaWRkZW5cXFwiIGlkPVxcXCJzcGlubmVyXFxcIj48L2Rpdj5cXG4gICAgICAgICAgICAgIDxzcGFuIGlkPVxcXCJidXR0b24tdGV4dFxcXCI+UGF5IG5vdzwvc3Bhbj5cXG4gICAgICAgICAgICA8L2J1dHRvbj5cXG5cXG4gICAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJjYW5jZWxcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCI+XFxuICAgICAgICAgICAgICA8c3BhbiBpZD1cXFwiYnV0dG9uLXRleHRcXFwiPkNhbmNlbDwvc3Bhbj5cXG4gICAgICAgICAgICA8L2J1dHRvbj5cXG5cXG4gICAgICAgICAgPC9mb3JtPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgPC9kaXY+XFxuICAgIFwiO1xuICAgIGlmICghZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5sb29wcy1wdXJjaGFzZS1tb2RhbFwiKSkge1xuICAgICAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgZGl2LmlubmVySFRNTCA9IG1vZGFsO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRpdik7XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIGhpZGVNb2RhbCgpIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmxvb3BzLXB1cmNoYXNlLW1vZGFsXCIpLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG59XG5leHBvcnQgZnVuY3Rpb24gc2hvd01vZGFsKCkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubG9vcHMtcHVyY2hhc2UtbW9kYWxcIikuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gXCJoaWRkZW5cIjtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpbml0U3RyaXBlKCkge1xuICAgIGlmICghZG9jdW1lbnQucXVlcnlTZWxlY3Rvcignc2NyaXB0W3NyYz1cImh0dHBzOi8vanMuc3RyaXBlLmNvbS92My9cIl0nKSkge1xuICAgICAgICB2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiAgICAgICAgc2NyaXB0LnNldEF0dHJpYnV0ZShcInNyY1wiLCBcImh0dHBzOi8vanMuc3RyaXBlLmNvbS92My9cIik7XG4gICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gc2hvd0J1dHRvbkxvYWRlcihpc0xvYWRpbmcpIHtcbiAgICBpZiAoaXNMb2FkaW5nID09PSB0cnVlKSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJidXR0b25cIikuZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NwaW5uZXJcIikuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNidXR0b24tdGV4dFwiKS5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJ1dHRvblwiKS5kaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NwaW5uZXJcIikuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNidXR0b24tdGV4dFwiKS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBzaG93TG9hZGVyKCkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubGRzLXNwaW5uZXJcIikuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3BheW1lbnQtZm9ybVwiKS5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGhpZGVMb2FkZXIoKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5sZHMtc3Bpbm5lclwiKS5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcGF5bWVudC1mb3JtXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG59XG5leHBvcnQgZnVuY3Rpb24gc2hvd01lc3NhZ2UobWVzc2FnZVRleHQpIHtcbiAgICB2YXIgbWVzc2FnZUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcGF5bWVudC1tZXNzYWdlXCIpO1xuICAgIG1lc3NhZ2VDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgICBtZXNzYWdlQ29udGFpbmVyLnRleHRDb250ZW50ID0gbWVzc2FnZVRleHQ7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIG1lc3NhZ2VDb250YWluZXIuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgICAgbWVzc2FnZUNvbnRhaW5lci50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgfSwgNDAwMCk7XG59XG4iLCJleHBvcnQgZnVuY3Rpb24gY3JlYXRlTGlua0F1dGhlbnRpY2F0aW9uRWxlbWVudChlbGVtZW50cykge1xuICAgIHZhciBsaW5rQXV0aGVudGljYXRpb25FbGVtZW50ID0gZWxlbWVudHMuY3JlYXRlKFwibGlua0F1dGhlbnRpY2F0aW9uXCIpO1xuICAgIGxpbmtBdXRoZW50aWNhdGlvbkVsZW1lbnQubW91bnQoXCIjbGluay1hdXRoZW50aWNhdGlvbi1lbGVtZW50XCIpO1xuICAgIHJldHVybiBsaW5rQXV0aGVudGljYXRpb25FbGVtZW50O1xufVxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVBheW1lbnRFbGVtZW50KGVsZW1lbnRzKSB7XG4gICAgdmFyIHBheW1lbnRFbGVtZW50ID0gZWxlbWVudHMuY3JlYXRlKFwicGF5bWVudFwiLCB7XG4gICAgICAgIGxheW91dDogXCJ0YWJzXCIsXG4gICAgfSk7XG4gICAgcGF5bWVudEVsZW1lbnQubW91bnQoXCIjcGF5bWVudC1lbGVtZW50XCIpO1xuICAgIHJldHVybiBwYXltZW50RWxlbWVudDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVBZGRyZXNzRWxlbWVudChlbGVtZW50cykge1xuICAgIHZhciBhZGRyZXNzRWxlbWVudCA9IGVsZW1lbnRzLmNyZWF0ZShcImFkZHJlc3NcIiwge1xuICAgICAgICBtb2RlOiBcInNoaXBwaW5nXCIsXG4gICAgICAgIGFsbG93ZWRDb3VudHJpZXM6IFtcIkpQXCJdLFxuICAgICAgICBmaWVsZHM6IHtcbiAgICAgICAgICAgIHBob25lOiBcImFsd2F5c1wiLFxuICAgICAgICB9LFxuICAgIH0pO1xuICAgIGFkZHJlc3NFbGVtZW50Lm1vdW50KFwiI2FkZHJlc3MtZWxlbWVudFwiKTtcbiAgICByZXR1cm4gYWRkcmVzc0VsZW1lbnQ7XG59XG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlSWZyYW1lcygpIHtcbiAgICB2YXIgaWZyYW1lcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lmcmFtZVtuYW1lXj1cIl9fcHJpdmF0ZVN0cmlwZUNvbnRyb2xsZXJcIl0nKTtcbiAgICBpZnJhbWVzLmZvckVhY2goZnVuY3Rpb24gKGlmcmFtZSkge1xuICAgICAgICBpZnJhbWUucmVtb3ZlKCk7XG4gICAgfSk7XG59XG4iLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbnZhciBfX2dlbmVyYXRvciA9ICh0aGlzICYmIHRoaXMuX19nZW5lcmF0b3IpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBib2R5KSB7XG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcbiAgICAgICAgd2hpbGUgKGcgJiYgKGcgPSAwLCBvcFswXSAmJiAoXyA9IDApKSwgXykgdHJ5IHtcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xuICAgIH1cbn07XG5pbXBvcnQgeyBnZXRDcmVkZW50aWFscyB9IGZyb20gXCIuL3NlcnZpY2UvbG9vcHMtYXBpXCI7XG5pbXBvcnQgeyBjcmVhdGVNb2RhbCwgaGlkZU1vZGFsIH0gZnJvbSBcIi4vZWxlbWVudHMvbW9kYWxcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluaXRpYWxpemUoY2xpZW50SWQsIGNsaWVudFNlY3JldCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF9hLCB0b2tlbiwgc3RvcmVJZCwgc3RyaXBlQWNjb3VudElkO1xuICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9iKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKF9iLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICBpZiAoIWNsaWVudElkIHx8ICFjbGllbnRTZWNyZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNsaWVudCBJRCBvciBDbGllbnQgU2VjcmV0IGlzIG5vdCBwcm92aWRlZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBnZXRDcmVkZW50aWFscyhjbGllbnRJZCwgY2xpZW50U2VjcmV0KV07XG4gICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICBfYSA9IF9iLnNlbnQoKSwgdG9rZW4gPSBfYS50b2tlbiwgc3RvcmVJZCA9IF9hLnN0b3JlSWQsIHN0cmlwZUFjY291bnRJZCA9IF9hLnN0cmlwZUFjY291bnRJZDtcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJsb29wcy10b2tlblwiLCB0b2tlbik7XG4gICAgICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwibG9vcHMtc3RvcmUtaWRcIiwgc3RvcmVJZCk7XG4gICAgICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwibG9vcHMtc3RyaXBlLWFjY291bnQtaWRcIiwgc3RyaXBlQWNjb3VudElkKTtcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlTW9kYWwoKTtcbiAgICAgICAgICAgICAgICAgICAgaGlkZU1vZGFsKCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG4iLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbnZhciBfX2dlbmVyYXRvciA9ICh0aGlzICYmIHRoaXMuX19nZW5lcmF0b3IpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBib2R5KSB7XG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcbiAgICAgICAgd2hpbGUgKGcgJiYgKGcgPSAwLCBvcFswXSAmJiAoXyA9IDApKSwgXykgdHJ5IHtcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xuICAgIH1cbn07XG5pbXBvcnQgeyBsb2FkU3RyaXBlIH0gZnJvbSBcIkBzdHJpcGUvc3RyaXBlLWpzXCI7XG5pbXBvcnQgeyBjcmVhdGVTdHJpcGVQYXltZW50SW50ZW50LCBjcmVhdGVMb29wc1N1YnNjcmlwdGlvbiwgfSBmcm9tIFwiLi4vc2VydmljZS9sb29wcy1hcGlcIjtcbmltcG9ydCB7IGNyZWF0ZUxpbmtBdXRoZW50aWNhdGlvbkVsZW1lbnQsIGNyZWF0ZVBheW1lbnRFbGVtZW50LCBjcmVhdGVBZGRyZXNzRWxlbWVudCwgcmVtb3ZlSWZyYW1lcywgfSBmcm9tIFwiLi4vZWxlbWVudHMvc3RyaXBlLWVsZW1lbnRzXCI7XG5pbXBvcnQgeyBzaG93TW9kYWwsIGhpZGVNb2RhbCwgc2hvd0J1dHRvbkxvYWRlciwgc2hvd0xvYWRlciwgaGlkZUxvYWRlciwgc2hvd01lc3NhZ2UsIH0gZnJvbSBcIi4uL2VsZW1lbnRzL21vZGFsXCI7XG52YXIgc2luZ2xlUHVyY2hhc2UgPSBmdW5jdGlvbiAocGxhbikgeyByZXR1cm4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgY2xpZW50U2VjcmV0LCBzZWNyZXQsIGVycm9yXzEsIHN0cmlwZUFjY291bnRJZCwgc3RyaXBlLCBlbWFpbEFkZHJlc3MsIGFkZHJlc3MsIGVsZW1lbnRzLCBsaW5rQXV0aGVudGljYXRpb25FbCwgY2FuY2VsQnV0dG9uRWwsIGZvcm07XG4gICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgaWYgKCFwbGFuLnByaWNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vIHByaWNlXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzaG93TW9kYWwoKTtcbiAgICAgICAgICAgICAgICBzaG93TG9hZGVyKCk7XG4gICAgICAgICAgICAgICAgY2xpZW50U2VjcmV0ID0gXCJcIjtcbiAgICAgICAgICAgICAgICBfYS5sYWJlbCA9IDE7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgX2EudHJ5cy5wdXNoKFsxLCAzLCAsIDRdKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBjcmVhdGVTdHJpcGVQYXltZW50SW50ZW50KHBsYW4ucHJpY2UpXTtcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICBzZWNyZXQgPSAoX2Euc2VudCgpKS5jbGllbnRTZWNyZXQ7XG4gICAgICAgICAgICAgICAgY2xpZW50U2VjcmV0ID0gc2VjcmV0O1xuICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDRdO1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIGVycm9yXzEgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yXzEpO1xuICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgIGlmICghY2xpZW50U2VjcmV0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vIGNsaWVudCBzZWNyZXRcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHN0cmlwZUFjY291bnRJZCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwibG9vcHMtc3RyaXBlLWFjY291bnQtaWRcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgbG9hZFN0cmlwZShcInBrX3Rlc3RfNTFJY05JRUJpbjlIZlBldmdGZVZCYkJUWm9HS3MxbnhMVFhrOGR3d2JYQUNoVnBNN2ZBajVpS25uQ3BpN1dFTlU2Q1FmOUwxd0dOb0lnVG9aeHZ3eTYyUEkwMGFndTU2bGJzXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cmlwZUFjY291bnQ6IHN0cmlwZUFjY291bnRJZCxcbiAgICAgICAgICAgICAgICAgICAgfSldO1xuICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgIHN0cmlwZSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICBlbWFpbEFkZHJlc3MgPSBcIlwiO1xuICAgICAgICAgICAgICAgIGFkZHJlc3MgPSB7fTtcbiAgICAgICAgICAgICAgICBlbGVtZW50cyA9IHN0cmlwZS5lbGVtZW50cyh7XG4gICAgICAgICAgICAgICAgICAgIGFwcGVhcmFuY2U6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoZW1lOiBcInN0cmlwZVwiLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBjbGllbnRTZWNyZXQ6IGNsaWVudFNlY3JldCxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBsaW5rQXV0aGVudGljYXRpb25FbCA9IGNyZWF0ZUxpbmtBdXRoZW50aWNhdGlvbkVsZW1lbnQoZWxlbWVudHMpO1xuICAgICAgICAgICAgICAgIGxpbmtBdXRoZW50aWNhdGlvbkVsLm9uKFwiY2hhbmdlXCIsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnQuZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGV2ZW50LmVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVtYWlsQWRkcmVzcyA9IGV2ZW50LnZhbHVlLmVtYWlsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgY3JlYXRlUGF5bWVudEVsZW1lbnQoZWxlbWVudHMpO1xuICAgICAgICAgICAgICAgIGNyZWF0ZUFkZHJlc3NFbGVtZW50KGVsZW1lbnRzKTtcbiAgICAgICAgICAgICAgICBjYW5jZWxCdXR0b25FbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2FuY2VsXCIpO1xuICAgICAgICAgICAgICAgIGNhbmNlbEJ1dHRvbkVsID09PSBudWxsIHx8IGNhbmNlbEJ1dHRvbkVsID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjYW5jZWxCdXR0b25FbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVJZnJhbWVzKCk7XG4gICAgICAgICAgICAgICAgICAgIGhpZGVNb2RhbCgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGhpZGVMb2FkZXIoKTtcbiAgICAgICAgICAgICAgICBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwYXltZW50LWZvcm1cIik7XG4gICAgICAgICAgICAgICAgZm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIGZ1bmN0aW9uIChldmVudCkgeyByZXR1cm4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVycm9yLCBhZGRyZXNzRWxlbWVudCwgX2EsIGNvbXBsZXRlLCB2YWx1ZSwgc3RhdHVzXzEsIGVycm9yXzI7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoX2IubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3dCdXR0b25Mb2FkZXIodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHN0cmlwZS5jb25maXJtUGF5bWVudCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudHM6IGVsZW1lbnRzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpcm1QYXJhbXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuX3VybDogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZGlyZWN0OiBcImlmX3JlcXVpcmVkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvciA9IChfYi5zZW50KCkpLmVycm9yO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWVycm9yKSByZXR1cm4gWzMgLypicmVhayovLCAyXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChlcnJvciA9PT0gbnVsbCB8fCBlcnJvciA9PT0gdm9pZCAwID8gdm9pZCAwIDogZXJyb3IudHlwZSkgPT09IFwiY2FyZF9lcnJvclwiIHx8IChlcnJvciA9PT0gbnVsbCB8fCBlcnJvciA9PT0gdm9pZCAwID8gdm9pZCAwIDogZXJyb3IudHlwZSkgPT09IFwidmFsaWRhdGlvbl9lcnJvclwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93TWVzc2FnZShlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3dNZXNzYWdlKFwiQW4gdW5leHBlY3RlZCBlcnJvciBvY2N1cnJlZC5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgOF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZGRyZXNzRWxlbWVudCA9IGVsZW1lbnRzLmdldEVsZW1lbnQoXCJhZGRyZXNzXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBhZGRyZXNzRWxlbWVudC5nZXRWYWx1ZSgpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9hID0gX2Iuc2VudCgpLCBjb21wbGV0ZSA9IF9hLmNvbXBsZXRlLCB2YWx1ZSA9IF9hLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29tcGxldGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkZHJlc3MgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYi5sYWJlbCA9IDQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYi50cnlzLnB1c2goWzQsIDYsIDcsIDhdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgY3JlYXRlTG9vcHNTdWJzY3JpcHRpb24oYWRkcmVzcywgcGxhbiwgZW1haWxBZGRyZXNzKV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXNfMSA9IChfYi5zZW50KCkpLnN0YXR1cztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXR1c18xID09PSBcInN1Y2Nlc3NcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvd01lc3NhZ2UoXCJTdWJzY3JpcHRpb24gY3JlYXRlZCBzdWNjZXNzZnVsbHlcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgOF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA2OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcl8yID0gX2Iuc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93TWVzc2FnZShcIkFuIHVuZXhwZWN0ZWQgZXJyb3Igb2NjdXJyZWQuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMgLypicmVhayovLCA4XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3dCdXR0b25Mb2FkZXIoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVJZnJhbWVzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhpZGVNb2RhbCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzcgLyplbmRmaW5hbGx5Ki9dO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgODogcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTsgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgICAgICB9XG4gICAgfSk7XG59KTsgfTtcbmV4cG9ydCB7IHNpbmdsZVB1cmNoYXNlIH07XG4iLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbnZhciBfX2dlbmVyYXRvciA9ICh0aGlzICYmIHRoaXMuX19nZW5lcmF0b3IpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBib2R5KSB7XG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcbiAgICAgICAgd2hpbGUgKGcgJiYgKGcgPSAwLCBvcFswXSAmJiAoXyA9IDApKSwgXykgdHJ5IHtcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xuICAgIH1cbn07XG4vLyBjb25zdCBhcGlVcmwgPVxuLy8gICBcImh0dHA6Ly9sb29wcy1zZXJ2ZXItYWxiLTEwOTA4ODk4ODguYXAtbm9ydGhlYXN0LTIuZWxiLmFtYXpvbmF3cy5jb21cIjtcbnZhciBhcGlVcmwgPSAnaHR0cDovL2xvY2FsaG9zdDo4MDgwJztcbmltcG9ydCB7IGFkZERheXMsIGFkZE1vbnRocywgc2V0RGF0ZSwgZW5kT2ZNb250aCB9IGZyb20gJ2RhdGUtZm5zJztcbmV4cG9ydCBmdW5jdGlvbiBnZXRDcmVkZW50aWFscyhjbGllbnRJZCwgY2xpZW50U2VjcmV0KSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcmVzcG9uc2UsIGRhdGEsIGVycm9yXzE7XG4gICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgIGlmICghY2xpZW50SWQgfHwgIWNsaWVudFNlY3JldCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDbGllbnQgSUQgb3IgQ2xpZW50IFNlY3JldCBpcyBub3QgcHJvdmlkZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBfYS5sYWJlbCA9IDE7XG4gICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICBfYS50cnlzLnB1c2goWzEsIDQsICwgNV0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBmZXRjaChcIlwiLmNvbmNhdChhcGlVcmwsIFwiL2FwaS92MS9hdXRoL2Jhc2ljXCIpLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGllbnRfaWQ6IGNsaWVudElkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGllbnRfc2VjcmV0OiBjbGllbnRTZWNyZXQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICB9KV07XG4gICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgcmVzcG9uc2UuanNvbigpXTtcbiAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgIGRhdGEgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBkYXRhXTtcbiAgICAgICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgICAgIGVycm9yXzEgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcl8xKTtcbiAgICAgICAgICAgICAgICBjYXNlIDU6IHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU3RyaXBlUGF5bWVudEludGVudChhbW91bnQpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB0b2tlbiwgcmVzcG9uc2UsIGRhdGEsIGVycm9yXzI7XG4gICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgIHRva2VuID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2xvb3BzLXRva2VuJyk7XG4gICAgICAgICAgICAgICAgICAgIF9hLmxhYmVsID0gMTtcbiAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgIF9hLnRyeXMucHVzaChbMSwgNCwgLCA1XSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIGZldGNoKFwiXCIuY29uY2F0KGFwaVVybCwgXCIvYXBpL3YxL21lcmNoYW50L2NyZWF0ZS1wYXltZW50LWludGVudFwiKSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQXV0aG9yaXphdGlvbjogXCJCZWFyZXIgXCIuY29uY2F0KHRva2VuKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW1vdW50OiBhbW91bnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICB9KV07XG4gICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgcmVzcG9uc2UuanNvbigpXTtcbiAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgIGRhdGEgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBkYXRhXTtcbiAgICAgICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgICAgIGVycm9yXzIgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcl8yKTtcbiAgICAgICAgICAgICAgICBjYXNlIDU6IHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTG9vcHNTdWJzY3JpcHRpb24oYWRkcmVzcywgcGxhbiwgZW1haWwpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB0b2tlbiwgbWVyY2hhbnRfaWQsIGZpcnN0TmFtZSwgbGFzdE5hbWUsIGJvZHksIHJlc3BvbnNlLCBkYXRhLCBlcnJvcl8zO1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2IpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoX2IubGFiZWwpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgIHRva2VuID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2xvb3BzLXRva2VuJyk7XG4gICAgICAgICAgICAgICAgICAgIG1lcmNoYW50X2lkID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2xvb3BzLXN0b3JlLWlkJyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChhZGRyZXNzLm5hbWUuaW5kZXhPZignICcpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgX2EgPSBhZGRyZXNzLm5hbWUuc3BsaXQoJyAnKSwgZmlyc3ROYW1lID0gX2FbMF0sIGxhc3ROYW1lID0gX2FbMV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmaXJzdE5hbWUgPSBhZGRyZXNzLm5hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0TmFtZSA9ICcnO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJvZHkgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogJzJjNmUyMzlhLWYwMmItZDE1OC0yODMzLWM3Zjg4M2JiNTUzMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXJjaGFudF9pZDogbWVyY2hhbnRfaWQudG9TdHJpbmcoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2R1Y3RzX3ZhcmlhbnQ6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2R1Y3RfdHlwZTogJ3BsYW4nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogcGxhbi5rZXkudG9TdHJpbmcoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVtOiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb246ICfllYblk4HjgZTjgajjga7jg6Hjg6LjgpLnrqHnkIYnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tZXJfaW5mb3JtYXRpb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZGRyZXNzMjogYWRkcmVzcy5hZGRyZXNzLmxpbmUyIHx8ICcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkZHJlc3MxOiBhZGRyZXNzLmFkZHJlc3MubGluZTEgfHwgJycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2l0eTogYWRkcmVzcy5hZGRyZXNzLmNpdHksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJlZjogYWRkcmVzcy5hZGRyZXNzLnN0YXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHppcGNvZGU6IGFkZHJlc3MuYWRkcmVzcy5wb3N0YWxfY29kZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXJzdF9uYW1lOiBmaXJzdE5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdF9uYW1lOiBsYXN0TmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbWFpbDogZW1haWwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVsOiBhZGRyZXNzLnBob25lLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNoaXBwaW5nX2luZm9ybWF0aW9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRkcmVzczI6IGFkZHJlc3MuYWRkcmVzcy5saW5lMiB8fCAnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZGRyZXNzMTogYWRkcmVzcy5hZGRyZXNzLmxpbmUxIHx8ICcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNpdHk6IGFkZHJlc3MuYWRkcmVzcy5jaXR5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZWY6IGFkZHJlc3MuYWRkcmVzcy5zdGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB6aXBjb2RlOiBhZGRyZXNzLmFkZHJlc3MucG9zdGFsX2NvZGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3RfbmFtZTogZmlyc3ROYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RfbmFtZTogbGFzdE5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVsOiBhZGRyZXNzLnBob25lLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaGlwcGluZzogJzAo6YCa5bi46YWN6YCBKSAvIDEo54Sh5paZ6YWN6YCBKScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NoZWR1bGVfZGVsaXZlcnlfZGF0ZTogYWRkRGF5cyhuZXcgRGF0ZSgpLCBwbGFuLnNoaXBwaW5nX3ByZXBhcmF0aW9uX3Rlcm0pLnRvSVNPU3RyaW5nKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NoZWR1bGVfcGF5bWVudF9kYXRlOiBjYWxjdWxhdGVTY2hlZHVsZVBheW1lbnREYXRlKHBsYW4pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlX3BheW1lbnRfZGF0ZTogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvdXBvbjogJycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF5bWVudDogJ3N0cmlwZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2tfdXJsOiAnaHR0cHM6Ly9sb2NhbGhvc3Q6NDAwMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBfYi5sYWJlbCA9IDE7XG4gICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICBfYi50cnlzLnB1c2goWzEsIDQsICwgNV0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBmZXRjaChcIlwiLmNvbmNhdChhcGlVcmwsIFwiL2FwaS92MS9vcmRlcnMvY3JlYXRlXCIpLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBdXRob3JpemF0aW9uOiBcIkJhc2ljIFwiLmNvbmNhdCh0b2tlbiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShib2R5KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXTtcbiAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gX2Iuc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCByZXNwb25zZS5qc29uKCldO1xuICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9IF9iLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIGRhdGFdO1xuICAgICAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICAgICAgZXJyb3JfMyA9IF9iLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yXzMpO1xuICAgICAgICAgICAgICAgIGNhc2UgNTogcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGNhbGN1bGF0ZVNjaGVkdWxlUGF5bWVudERhdGUocGxhbikge1xuICAgIHZhciBmaXJzdFB1cmNoYXNlRGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgdmFyIHNlY29uZFB1cmNoYXNlRGF0ZSA9IGFkZE1vbnRocyhmaXJzdFB1cmNoYXNlRGF0ZSwgMSk7XG4gICAgaWYgKHBsYW4uc2Vjb25kX2ZpeGVkX3BheW1lbnQgPT09ICdsYXN0Jykge1xuICAgICAgICByZXR1cm4gZW5kT2ZNb250aChzZWNvbmRQdXJjaGFzZURhdGUpO1xuICAgIH1cbiAgICB2YXIgc2Vjb25kRml4UGF5bWVudCA9IE51bWJlcihwbGFuLnNlY29uZF9maXhlZF9wYXltZW50KTtcbiAgICAvKipcbiAgICAgKiBDb21tZW50ZWQgZm9yIHBoYXNlIG9uZVxuICAgICAqL1xuICAgIC8vIGNvbnN0IGludGVydmFsID0gcGxhbi5pbnRlcnZhbFxuICAgIC8vIGlmIChpc0FmdGVyKHNldERhdGUoc2Vjb25kUHVyY2hhc2VEYXRlLCBzZWNvbmRGaXhQYXltZW50KSwgYWRkRGF5cyhmaXJzdFB1cmNoYXNlRGF0ZSwgaW50ZXJ2YWwpKSkge1xuICAgIC8vICAgcmV0dXJuIHNldERhdGUoc2Vjb25kUHVyY2hhc2VEYXRlLCBzZWNvbmRGaXhQYXltZW50KVxuICAgIC8vIH0gZWxzZSB7XG4gICAgLy8gICByZXR1cm4gYWRkTW9udGhzKHNldERhdGUoc2Vjb25kUHVyY2hhc2VEYXRlLCBzZWNvbmRGaXhQYXltZW50KSwgMSlcbiAgICAvLyB9XG4gICAgcmV0dXJuIHNldERhdGUoc2Vjb25kUHVyY2hhc2VEYXRlLCBzZWNvbmRGaXhQYXltZW50KTtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IGluaXRpYWxpemUgZnJvbSBcIi4vbG9vcHNcIjtcbmV4cG9ydCB7IHNpbmdsZVB1cmNoYXNlIH0gZnJvbSBcIi4vcHVyY2hhc2Uvc2luZ2xlXCI7XG5leHBvcnQgeyBpbml0aWFsaXplIH07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=