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
                            schedule_delivery_date: (0,date_fns__WEBPACK_IMPORTED_MODULE_0__["default"])(new Date(), plan.shipping_preparation_term).toISOString(),
                            schedule_payment_date: calculateSchedulePaymentDate(plan).toISOString(),
                            complete_payment_date: new Date().toISOString(),
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
    var firstPurchaseDate = new Date();
    if (plan.second_fixed_payment === 'today') {
        setTimeout(function () {
            fetch("".concat(apiUrl, "/api/v1/schedule/runJobs"), {
                method: 'POST',
            });
        }, 5 * 60 * 1000);
        return firstPurchaseDate;
    }
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
    // console.log('secondFixPayment',secondFixPayment)
    // console.log('firstPurchaseDate',firstPurchaseDate)
    // console.log('secondPurchaseDate',secondPurchaseDate)
    // console.log('setDate(secondPurchaseDate, secondFixPayment)',setDate(secondPurchaseDate, secondFixPayment))
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQSxvREFBb0Qsb0RBQU87QUFDM0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQSw2QkFBNkIsb0RBQVM7QUFDdEM7QUFDQSxlQUFlLG9EQUFVO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxvREFBTztBQUNsQjs7Ozs7OztVQ2xPQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOaUM7QUFDa0I7QUFDN0IiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9sb29wcy8uL25vZGVfbW9kdWxlcy9Ac3RyaXBlL3N0cmlwZS1qcy9kaXN0L3N0cmlwZS5lc20uanMiLCJ3ZWJwYWNrOi8vbG9vcHMvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL19saWIvcmVxdWlyZWRBcmdzL2luZGV4LmpzIiwid2VicGFjazovL2xvb3BzLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9fbGliL3RvSW50ZWdlci9pbmRleC5qcyIsIndlYnBhY2s6Ly9sb29wcy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vYWRkRGF5cy9pbmRleC5qcyIsIndlYnBhY2s6Ly9sb29wcy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vYWRkTW9udGhzL2luZGV4LmpzIiwid2VicGFjazovL2xvb3BzLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9lbmRPZk1vbnRoL2luZGV4LmpzIiwid2VicGFjazovL2xvb3BzLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9zZXREYXRlL2luZGV4LmpzIiwid2VicGFjazovL2xvb3BzLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS90b0RhdGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vbG9vcHMvLi9zcmMvZWxlbWVudHMvbW9kYWwudHMiLCJ3ZWJwYWNrOi8vbG9vcHMvLi9zcmMvZWxlbWVudHMvc3RyaXBlLWVsZW1lbnRzLnRzIiwid2VicGFjazovL2xvb3BzLy4vc3JjL2xvb3BzLnRzIiwid2VicGFjazovL2xvb3BzLy4vc3JjL3B1cmNoYXNlL3NpbmdsZS50cyIsIndlYnBhY2s6Ly9sb29wcy8uL3NyYy9zZXJ2aWNlL2xvb3BzLWFwaS50cyIsIndlYnBhY2s6Ly9sb29wcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9sb29wcy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbG9vcHMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9sb29wcy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2xvb3BzLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBWM19VUkwgPSAnaHR0cHM6Ly9qcy5zdHJpcGUuY29tL3YzJztcbnZhciBWM19VUkxfUkVHRVggPSAvXmh0dHBzOlxcL1xcL2pzXFwuc3RyaXBlXFwuY29tXFwvdjNcXC8/KFxcPy4qKT8kLztcbnZhciBFWElTVElOR19TQ1JJUFRfTUVTU0FHRSA9ICdsb2FkU3RyaXBlLnNldExvYWRQYXJhbWV0ZXJzIHdhcyBjYWxsZWQgYnV0IGFuIGV4aXN0aW5nIFN0cmlwZS5qcyBzY3JpcHQgYWxyZWFkeSBleGlzdHMgaW4gdGhlIGRvY3VtZW50OyBleGlzdGluZyBzY3JpcHQgcGFyYW1ldGVycyB3aWxsIGJlIHVzZWQnO1xudmFyIGZpbmRTY3JpcHQgPSBmdW5jdGlvbiBmaW5kU2NyaXB0KCkge1xuICB2YXIgc2NyaXB0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJzY3JpcHRbc3JjXj1cXFwiXCIuY29uY2F0KFYzX1VSTCwgXCJcXFwiXVwiKSk7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzY3JpcHRzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHNjcmlwdCA9IHNjcmlwdHNbaV07XG5cbiAgICBpZiAoIVYzX1VSTF9SRUdFWC50ZXN0KHNjcmlwdC5zcmMpKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gc2NyaXB0O1xuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59O1xuXG52YXIgaW5qZWN0U2NyaXB0ID0gZnVuY3Rpb24gaW5qZWN0U2NyaXB0KHBhcmFtcykge1xuICB2YXIgcXVlcnlTdHJpbmcgPSBwYXJhbXMgJiYgIXBhcmFtcy5hZHZhbmNlZEZyYXVkU2lnbmFscyA/ICc/YWR2YW5jZWRGcmF1ZFNpZ25hbHM9ZmFsc2UnIDogJyc7XG4gIHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgc2NyaXB0LnNyYyA9IFwiXCIuY29uY2F0KFYzX1VSTCkuY29uY2F0KHF1ZXJ5U3RyaW5nKTtcbiAgdmFyIGhlYWRPckJvZHkgPSBkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmJvZHk7XG5cbiAgaWYgKCFoZWFkT3JCb2R5KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCBkb2N1bWVudC5ib2R5IG5vdCB0byBiZSBudWxsLiBTdHJpcGUuanMgcmVxdWlyZXMgYSA8Ym9keT4gZWxlbWVudC4nKTtcbiAgfVxuXG4gIGhlYWRPckJvZHkuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiAgcmV0dXJuIHNjcmlwdDtcbn07XG5cbnZhciByZWdpc3RlcldyYXBwZXIgPSBmdW5jdGlvbiByZWdpc3RlcldyYXBwZXIoc3RyaXBlLCBzdGFydFRpbWUpIHtcbiAgaWYgKCFzdHJpcGUgfHwgIXN0cmlwZS5fcmVnaXN0ZXJXcmFwcGVyKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgc3RyaXBlLl9yZWdpc3RlcldyYXBwZXIoe1xuICAgIG5hbWU6ICdzdHJpcGUtanMnLFxuICAgIHZlcnNpb246IFwiMS40Ni4wXCIsXG4gICAgc3RhcnRUaW1lOiBzdGFydFRpbWVcbiAgfSk7XG59O1xuXG52YXIgc3RyaXBlUHJvbWlzZSA9IG51bGw7XG52YXIgbG9hZFNjcmlwdCA9IGZ1bmN0aW9uIGxvYWRTY3JpcHQocGFyYW1zKSB7XG4gIC8vIEVuc3VyZSB0aGF0IHdlIG9ubHkgYXR0ZW1wdCB0byBsb2FkIFN0cmlwZS5qcyBhdCBtb3N0IG9uY2VcbiAgaWYgKHN0cmlwZVByb21pc2UgIT09IG51bGwpIHtcbiAgICByZXR1cm4gc3RyaXBlUHJvbWlzZTtcbiAgfVxuXG4gIHN0cmlwZVByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAvLyBSZXNvbHZlIHRvIG51bGwgd2hlbiBpbXBvcnRlZCBzZXJ2ZXIgc2lkZS4gVGhpcyBtYWtlcyB0aGUgbW9kdWxlXG4gICAgICAvLyBzYWZlIHRvIGltcG9ydCBpbiBhbiBpc29tb3JwaGljIGNvZGUgYmFzZS5cbiAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHdpbmRvdy5TdHJpcGUgJiYgcGFyYW1zKSB7XG4gICAgICBjb25zb2xlLndhcm4oRVhJU1RJTkdfU0NSSVBUX01FU1NBR0UpO1xuICAgIH1cblxuICAgIGlmICh3aW5kb3cuU3RyaXBlKSB7XG4gICAgICByZXNvbHZlKHdpbmRvdy5TdHJpcGUpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICB2YXIgc2NyaXB0ID0gZmluZFNjcmlwdCgpO1xuXG4gICAgICBpZiAoc2NyaXB0ICYmIHBhcmFtcykge1xuICAgICAgICBjb25zb2xlLndhcm4oRVhJU1RJTkdfU0NSSVBUX01FU1NBR0UpO1xuICAgICAgfSBlbHNlIGlmICghc2NyaXB0KSB7XG4gICAgICAgIHNjcmlwdCA9IGluamVjdFNjcmlwdChwYXJhbXMpO1xuICAgICAgfVxuXG4gICAgICBzY3JpcHQuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHdpbmRvdy5TdHJpcGUpIHtcbiAgICAgICAgICByZXNvbHZlKHdpbmRvdy5TdHJpcGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoJ1N0cmlwZS5qcyBub3QgYXZhaWxhYmxlJykpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHNjcmlwdC5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmVqZWN0KG5ldyBFcnJvcignRmFpbGVkIHRvIGxvYWQgU3RyaXBlLmpzJykpO1xuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIHN0cmlwZVByb21pc2U7XG59O1xudmFyIGluaXRTdHJpcGUgPSBmdW5jdGlvbiBpbml0U3RyaXBlKG1heWJlU3RyaXBlLCBhcmdzLCBzdGFydFRpbWUpIHtcbiAgaWYgKG1heWJlU3RyaXBlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICB2YXIgc3RyaXBlID0gbWF5YmVTdHJpcGUuYXBwbHkodW5kZWZpbmVkLCBhcmdzKTtcbiAgcmVnaXN0ZXJXcmFwcGVyKHN0cmlwZSwgc3RhcnRUaW1lKTtcbiAgcmV0dXJuIHN0cmlwZTtcbn07IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvZXhwbGljaXQtbW9kdWxlLWJvdW5kYXJ5LXR5cGVzXG5cbi8vIG93biBzY3JpcHQgaW5qZWN0aW9uLlxuXG52YXIgc3RyaXBlUHJvbWlzZSQxID0gUHJvbWlzZS5yZXNvbHZlKCkudGhlbihmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBsb2FkU2NyaXB0KG51bGwpO1xufSk7XG52YXIgbG9hZENhbGxlZCA9IGZhbHNlO1xuc3RyaXBlUHJvbWlzZSQxW1wiY2F0Y2hcIl0oZnVuY3Rpb24gKGVycikge1xuICBpZiAoIWxvYWRDYWxsZWQpIHtcbiAgICBjb25zb2xlLndhcm4oZXJyKTtcbiAgfVxufSk7XG52YXIgbG9hZFN0cmlwZSA9IGZ1bmN0aW9uIGxvYWRTdHJpcGUoKSB7XG4gIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgIGFyZ3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gIH1cblxuICBsb2FkQ2FsbGVkID0gdHJ1ZTtcbiAgdmFyIHN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gIHJldHVybiBzdHJpcGVQcm9taXNlJDEudGhlbihmdW5jdGlvbiAobWF5YmVTdHJpcGUpIHtcbiAgICByZXR1cm4gaW5pdFN0cmlwZShtYXliZVN0cmlwZSwgYXJncywgc3RhcnRUaW1lKTtcbiAgfSk7XG59O1xuXG5leHBvcnQgeyBsb2FkU3RyaXBlIH07XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZXF1aXJlZEFyZ3MocmVxdWlyZWQsIGFyZ3MpIHtcbiAgaWYgKGFyZ3MubGVuZ3RoIDwgcmVxdWlyZWQpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHJlcXVpcmVkICsgJyBhcmd1bWVudCcgKyAocmVxdWlyZWQgPiAxID8gJ3MnIDogJycpICsgJyByZXF1aXJlZCwgYnV0IG9ubHkgJyArIGFyZ3MubGVuZ3RoICsgJyBwcmVzZW50Jyk7XG4gIH1cbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0b0ludGVnZXIoZGlydHlOdW1iZXIpIHtcbiAgaWYgKGRpcnR5TnVtYmVyID09PSBudWxsIHx8IGRpcnR5TnVtYmVyID09PSB0cnVlIHx8IGRpcnR5TnVtYmVyID09PSBmYWxzZSkge1xuICAgIHJldHVybiBOYU47XG4gIH1cblxuICB2YXIgbnVtYmVyID0gTnVtYmVyKGRpcnR5TnVtYmVyKTtcblxuICBpZiAoaXNOYU4obnVtYmVyKSkge1xuICAgIHJldHVybiBudW1iZXI7XG4gIH1cblxuICByZXR1cm4gbnVtYmVyIDwgMCA/IE1hdGguY2VpbChudW1iZXIpIDogTWF0aC5mbG9vcihudW1iZXIpO1xufSIsImltcG9ydCB0b0ludGVnZXIgZnJvbSBcIi4uL19saWIvdG9JbnRlZ2VyL2luZGV4LmpzXCI7XG5pbXBvcnQgdG9EYXRlIGZyb20gXCIuLi90b0RhdGUvaW5kZXguanNcIjtcbmltcG9ydCByZXF1aXJlZEFyZ3MgZnJvbSBcIi4uL19saWIvcmVxdWlyZWRBcmdzL2luZGV4LmpzXCI7XG4vKipcbiAqIEBuYW1lIGFkZERheXNcbiAqIEBjYXRlZ29yeSBEYXkgSGVscGVyc1xuICogQHN1bW1hcnkgQWRkIHRoZSBzcGVjaWZpZWQgbnVtYmVyIG9mIGRheXMgdG8gdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBBZGQgdGhlIHNwZWNpZmllZCBudW1iZXIgb2YgZGF5cyB0byB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8TnVtYmVyfSBkYXRlIC0gdGhlIGRhdGUgdG8gYmUgY2hhbmdlZFxuICogQHBhcmFtIHtOdW1iZXJ9IGFtb3VudCAtIHRoZSBhbW91bnQgb2YgZGF5cyB0byBiZSBhZGRlZC4gUG9zaXRpdmUgZGVjaW1hbHMgd2lsbCBiZSByb3VuZGVkIHVzaW5nIGBNYXRoLmZsb29yYCwgZGVjaW1hbHMgbGVzcyB0aGFuIHplcm8gd2lsbCBiZSByb3VuZGVkIHVzaW5nIGBNYXRoLmNlaWxgLlxuICogQHJldHVybnMge0RhdGV9IC0gdGhlIG5ldyBkYXRlIHdpdGggdGhlIGRheXMgYWRkZWRcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gLSAyIGFyZ3VtZW50cyByZXF1aXJlZFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBBZGQgMTAgZGF5cyB0byAxIFNlcHRlbWJlciAyMDE0OlxuICogY29uc3QgcmVzdWx0ID0gYWRkRGF5cyhuZXcgRGF0ZSgyMDE0LCA4LCAxKSwgMTApXG4gKiAvLz0+IFRodSBTZXAgMTEgMjAxNCAwMDowMDowMFxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFkZERheXMoZGlydHlEYXRlLCBkaXJ0eUFtb3VudCkge1xuICByZXF1aXJlZEFyZ3MoMiwgYXJndW1lbnRzKTtcbiAgdmFyIGRhdGUgPSB0b0RhdGUoZGlydHlEYXRlKTtcbiAgdmFyIGFtb3VudCA9IHRvSW50ZWdlcihkaXJ0eUFtb3VudCk7XG5cbiAgaWYgKGlzTmFOKGFtb3VudCkpIHtcbiAgICByZXR1cm4gbmV3IERhdGUoTmFOKTtcbiAgfVxuXG4gIGlmICghYW1vdW50KSB7XG4gICAgLy8gSWYgMCBkYXlzLCBuby1vcCB0byBhdm9pZCBjaGFuZ2luZyB0aW1lcyBpbiB0aGUgaG91ciBiZWZvcmUgZW5kIG9mIERTVFxuICAgIHJldHVybiBkYXRlO1xuICB9XG5cbiAgZGF0ZS5zZXREYXRlKGRhdGUuZ2V0RGF0ZSgpICsgYW1vdW50KTtcbiAgcmV0dXJuIGRhdGU7XG59IiwiaW1wb3J0IHRvSW50ZWdlciBmcm9tIFwiLi4vX2xpYi90b0ludGVnZXIvaW5kZXguanNcIjtcbmltcG9ydCB0b0RhdGUgZnJvbSBcIi4uL3RvRGF0ZS9pbmRleC5qc1wiO1xuaW1wb3J0IHJlcXVpcmVkQXJncyBmcm9tIFwiLi4vX2xpYi9yZXF1aXJlZEFyZ3MvaW5kZXguanNcIjtcbi8qKlxuICogQG5hbWUgYWRkTW9udGhzXG4gKiBAY2F0ZWdvcnkgTW9udGggSGVscGVyc1xuICogQHN1bW1hcnkgQWRkIHRoZSBzcGVjaWZpZWQgbnVtYmVyIG9mIG1vbnRocyB0byB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEFkZCB0aGUgc3BlY2lmaWVkIG51bWJlciBvZiBtb250aHMgdG8gdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQHBhcmFtIHtEYXRlfE51bWJlcn0gZGF0ZSAtIHRoZSBkYXRlIHRvIGJlIGNoYW5nZWRcbiAqIEBwYXJhbSB7TnVtYmVyfSBhbW91bnQgLSB0aGUgYW1vdW50IG9mIG1vbnRocyB0byBiZSBhZGRlZC4gUG9zaXRpdmUgZGVjaW1hbHMgd2lsbCBiZSByb3VuZGVkIHVzaW5nIGBNYXRoLmZsb29yYCwgZGVjaW1hbHMgbGVzcyB0aGFuIHplcm8gd2lsbCBiZSByb3VuZGVkIHVzaW5nIGBNYXRoLmNlaWxgLlxuICogQHJldHVybnMge0RhdGV9IHRoZSBuZXcgZGF0ZSB3aXRoIHRoZSBtb250aHMgYWRkZWRcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gMiBhcmd1bWVudHMgcmVxdWlyZWRcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gQWRkIDUgbW9udGhzIHRvIDEgU2VwdGVtYmVyIDIwMTQ6XG4gKiBjb25zdCByZXN1bHQgPSBhZGRNb250aHMobmV3IERhdGUoMjAxNCwgOCwgMSksIDUpXG4gKiAvLz0+IFN1biBGZWIgMDEgMjAxNSAwMDowMDowMFxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFkZE1vbnRocyhkaXJ0eURhdGUsIGRpcnR5QW1vdW50KSB7XG4gIHJlcXVpcmVkQXJncygyLCBhcmd1bWVudHMpO1xuICB2YXIgZGF0ZSA9IHRvRGF0ZShkaXJ0eURhdGUpO1xuICB2YXIgYW1vdW50ID0gdG9JbnRlZ2VyKGRpcnR5QW1vdW50KTtcblxuICBpZiAoaXNOYU4oYW1vdW50KSkge1xuICAgIHJldHVybiBuZXcgRGF0ZShOYU4pO1xuICB9XG5cbiAgaWYgKCFhbW91bnQpIHtcbiAgICAvLyBJZiAwIG1vbnRocywgbm8tb3AgdG8gYXZvaWQgY2hhbmdpbmcgdGltZXMgaW4gdGhlIGhvdXIgYmVmb3JlIGVuZCBvZiBEU1RcbiAgICByZXR1cm4gZGF0ZTtcbiAgfVxuXG4gIHZhciBkYXlPZk1vbnRoID0gZGF0ZS5nZXREYXRlKCk7IC8vIFRoZSBKUyBEYXRlIG9iamVjdCBzdXBwb3J0cyBkYXRlIG1hdGggYnkgYWNjZXB0aW5nIG91dC1vZi1ib3VuZHMgdmFsdWVzIGZvclxuICAvLyBtb250aCwgZGF5LCBldGMuIEZvciBleGFtcGxlLCBuZXcgRGF0ZSgyMDIwLCAwLCAwKSByZXR1cm5zIDMxIERlYyAyMDE5IGFuZFxuICAvLyBuZXcgRGF0ZSgyMDIwLCAxMywgMSkgcmV0dXJucyAxIEZlYiAyMDIxLiAgVGhpcyBpcyAqYWxtb3N0KiB0aGUgYmVoYXZpb3Igd2VcbiAgLy8gd2FudCBleGNlcHQgdGhhdCBkYXRlcyB3aWxsIHdyYXAgYXJvdW5kIHRoZSBlbmQgb2YgYSBtb250aCwgbWVhbmluZyB0aGF0XG4gIC8vIG5ldyBEYXRlKDIwMjAsIDEzLCAzMSkgd2lsbCByZXR1cm4gMyBNYXIgMjAyMSBub3QgMjggRmViIDIwMjEgYXMgZGVzaXJlZC4gU29cbiAgLy8gd2UnbGwgZGVmYXVsdCB0byB0aGUgZW5kIG9mIHRoZSBkZXNpcmVkIG1vbnRoIGJ5IGFkZGluZyAxIHRvIHRoZSBkZXNpcmVkXG4gIC8vIG1vbnRoIGFuZCB1c2luZyBhIGRhdGUgb2YgMCB0byBiYWNrIHVwIG9uZSBkYXkgdG8gdGhlIGVuZCBvZiB0aGUgZGVzaXJlZFxuICAvLyBtb250aC5cblxuICB2YXIgZW5kT2ZEZXNpcmVkTW9udGggPSBuZXcgRGF0ZShkYXRlLmdldFRpbWUoKSk7XG4gIGVuZE9mRGVzaXJlZE1vbnRoLnNldE1vbnRoKGRhdGUuZ2V0TW9udGgoKSArIGFtb3VudCArIDEsIDApO1xuICB2YXIgZGF5c0luTW9udGggPSBlbmRPZkRlc2lyZWRNb250aC5nZXREYXRlKCk7XG5cbiAgaWYgKGRheU9mTW9udGggPj0gZGF5c0luTW9udGgpIHtcbiAgICAvLyBJZiB3ZSdyZSBhbHJlYWR5IGF0IHRoZSBlbmQgb2YgdGhlIG1vbnRoLCB0aGVuIHRoaXMgaXMgdGhlIGNvcnJlY3QgZGF0ZVxuICAgIC8vIGFuZCB3ZSdyZSBkb25lLlxuICAgIHJldHVybiBlbmRPZkRlc2lyZWRNb250aDtcbiAgfSBlbHNlIHtcbiAgICAvLyBPdGhlcndpc2UsIHdlIG5vdyBrbm93IHRoYXQgc2V0dGluZyB0aGUgb3JpZ2luYWwgZGF5LW9mLW1vbnRoIHZhbHVlIHdvbid0XG4gICAgLy8gY2F1c2UgYW4gb3ZlcmZsb3csIHNvIHNldCB0aGUgZGVzaXJlZCBkYXktb2YtbW9udGguIE5vdGUgdGhhdCB3ZSBjYW4ndFxuICAgIC8vIGp1c3Qgc2V0IHRoZSBkYXRlIG9mIGBlbmRPZkRlc2lyZWRNb250aGAgYmVjYXVzZSB0aGF0IG9iamVjdCBtYXkgaGF2ZSBoYWRcbiAgICAvLyBpdHMgdGltZSBjaGFuZ2VkIGluIHRoZSB1bnVzdWFsIGNhc2Ugd2hlcmUgd2hlcmUgYSBEU1QgdHJhbnNpdGlvbiB3YXMgb25cbiAgICAvLyB0aGUgbGFzdCBkYXkgb2YgdGhlIG1vbnRoIGFuZCBpdHMgbG9jYWwgdGltZSB3YXMgaW4gdGhlIGhvdXIgc2tpcHBlZCBvclxuICAgIC8vIHJlcGVhdGVkIG5leHQgdG8gYSBEU1QgdHJhbnNpdGlvbi4gIFNvIHdlIHVzZSBgZGF0ZWAgaW5zdGVhZCB3aGljaCBpc1xuICAgIC8vIGd1YXJhbnRlZWQgdG8gc3RpbGwgaGF2ZSB0aGUgb3JpZ2luYWwgdGltZS5cbiAgICBkYXRlLnNldEZ1bGxZZWFyKGVuZE9mRGVzaXJlZE1vbnRoLmdldEZ1bGxZZWFyKCksIGVuZE9mRGVzaXJlZE1vbnRoLmdldE1vbnRoKCksIGRheU9mTW9udGgpO1xuICAgIHJldHVybiBkYXRlO1xuICB9XG59IiwiaW1wb3J0IHRvRGF0ZSBmcm9tIFwiLi4vdG9EYXRlL2luZGV4LmpzXCI7XG5pbXBvcnQgcmVxdWlyZWRBcmdzIGZyb20gXCIuLi9fbGliL3JlcXVpcmVkQXJncy9pbmRleC5qc1wiO1xuLyoqXG4gKiBAbmFtZSBlbmRPZk1vbnRoXG4gKiBAY2F0ZWdvcnkgTW9udGggSGVscGVyc1xuICogQHN1bW1hcnkgUmV0dXJuIHRoZSBlbmQgb2YgYSBtb250aCBmb3IgdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBSZXR1cm4gdGhlIGVuZCBvZiBhIG1vbnRoIGZvciB0aGUgZ2l2ZW4gZGF0ZS5cbiAqIFRoZSByZXN1bHQgd2lsbCBiZSBpbiB0aGUgbG9jYWwgdGltZXpvbmUuXG4gKlxuICogQHBhcmFtIHtEYXRlfE51bWJlcn0gZGF0ZSAtIHRoZSBvcmlnaW5hbCBkYXRlXG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIGVuZCBvZiBhIG1vbnRoXG4gKiBAdGhyb3dzIHtUeXBlRXJyb3J9IDEgYXJndW1lbnQgcmVxdWlyZWRcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gVGhlIGVuZCBvZiBhIG1vbnRoIGZvciAyIFNlcHRlbWJlciAyMDE0IDExOjU1OjAwOlxuICogY29uc3QgcmVzdWx0ID0gZW5kT2ZNb250aChuZXcgRGF0ZSgyMDE0LCA4LCAyLCAxMSwgNTUsIDApKVxuICogLy89PiBUdWUgU2VwIDMwIDIwMTQgMjM6NTk6NTkuOTk5XG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZW5kT2ZNb250aChkaXJ0eURhdGUpIHtcbiAgcmVxdWlyZWRBcmdzKDEsIGFyZ3VtZW50cyk7XG4gIHZhciBkYXRlID0gdG9EYXRlKGRpcnR5RGF0ZSk7XG4gIHZhciBtb250aCA9IGRhdGUuZ2V0TW9udGgoKTtcbiAgZGF0ZS5zZXRGdWxsWWVhcihkYXRlLmdldEZ1bGxZZWFyKCksIG1vbnRoICsgMSwgMCk7XG4gIGRhdGUuc2V0SG91cnMoMjMsIDU5LCA1OSwgOTk5KTtcbiAgcmV0dXJuIGRhdGU7XG59IiwiaW1wb3J0IHRvSW50ZWdlciBmcm9tIFwiLi4vX2xpYi90b0ludGVnZXIvaW5kZXguanNcIjtcbmltcG9ydCB0b0RhdGUgZnJvbSBcIi4uL3RvRGF0ZS9pbmRleC5qc1wiO1xuaW1wb3J0IHJlcXVpcmVkQXJncyBmcm9tIFwiLi4vX2xpYi9yZXF1aXJlZEFyZ3MvaW5kZXguanNcIjtcbi8qKlxuICogQG5hbWUgc2V0RGF0ZVxuICogQGNhdGVnb3J5IERheSBIZWxwZXJzXG4gKiBAc3VtbWFyeSBTZXQgdGhlIGRheSBvZiB0aGUgbW9udGggdG8gdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBTZXQgdGhlIGRheSBvZiB0aGUgbW9udGggdG8gdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQHBhcmFtIHtEYXRlfE51bWJlcn0gZGF0ZSAtIHRoZSBkYXRlIHRvIGJlIGNoYW5nZWRcbiAqIEBwYXJhbSB7TnVtYmVyfSBkYXlPZk1vbnRoIC0gdGhlIGRheSBvZiB0aGUgbW9udGggb2YgdGhlIG5ldyBkYXRlXG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIG5ldyBkYXRlIHdpdGggdGhlIGRheSBvZiB0aGUgbW9udGggc2V0XG4gKiBAdGhyb3dzIHtUeXBlRXJyb3J9IDIgYXJndW1lbnRzIHJlcXVpcmVkXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFNldCB0aGUgMzB0aCBkYXkgb2YgdGhlIG1vbnRoIHRvIDEgU2VwdGVtYmVyIDIwMTQ6XG4gKiBjb25zdCByZXN1bHQgPSBzZXREYXRlKG5ldyBEYXRlKDIwMTQsIDgsIDEpLCAzMClcbiAqIC8vPT4gVHVlIFNlcCAzMCAyMDE0IDAwOjAwOjAwXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2V0RGF0ZShkaXJ0eURhdGUsIGRpcnR5RGF5T2ZNb250aCkge1xuICByZXF1aXJlZEFyZ3MoMiwgYXJndW1lbnRzKTtcbiAgdmFyIGRhdGUgPSB0b0RhdGUoZGlydHlEYXRlKTtcbiAgdmFyIGRheU9mTW9udGggPSB0b0ludGVnZXIoZGlydHlEYXlPZk1vbnRoKTtcbiAgZGF0ZS5zZXREYXRlKGRheU9mTW9udGgpO1xuICByZXR1cm4gZGF0ZTtcbn0iLCJmdW5jdGlvbiBfdHlwZW9mKG9iaikgeyBcIkBiYWJlbC9oZWxwZXJzIC0gdHlwZW9mXCI7IGlmICh0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIikgeyBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH07IH0gZWxzZSB7IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTsgfSByZXR1cm4gX3R5cGVvZihvYmopOyB9XG5cbmltcG9ydCByZXF1aXJlZEFyZ3MgZnJvbSBcIi4uL19saWIvcmVxdWlyZWRBcmdzL2luZGV4LmpzXCI7XG4vKipcbiAqIEBuYW1lIHRvRGF0ZVxuICogQGNhdGVnb3J5IENvbW1vbiBIZWxwZXJzXG4gKiBAc3VtbWFyeSBDb252ZXJ0IHRoZSBnaXZlbiBhcmd1bWVudCB0byBhbiBpbnN0YW5jZSBvZiBEYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogQ29udmVydCB0aGUgZ2l2ZW4gYXJndW1lbnQgdG8gYW4gaW5zdGFuY2Ugb2YgRGF0ZS5cbiAqXG4gKiBJZiB0aGUgYXJndW1lbnQgaXMgYW4gaW5zdGFuY2Ugb2YgRGF0ZSwgdGhlIGZ1bmN0aW9uIHJldHVybnMgaXRzIGNsb25lLlxuICpcbiAqIElmIHRoZSBhcmd1bWVudCBpcyBhIG51bWJlciwgaXQgaXMgdHJlYXRlZCBhcyBhIHRpbWVzdGFtcC5cbiAqXG4gKiBJZiB0aGUgYXJndW1lbnQgaXMgbm9uZSBvZiB0aGUgYWJvdmUsIHRoZSBmdW5jdGlvbiByZXR1cm5zIEludmFsaWQgRGF0ZS5cbiAqXG4gKiAqKk5vdGUqKjogKmFsbCogRGF0ZSBhcmd1bWVudHMgcGFzc2VkIHRvIGFueSAqZGF0ZS1mbnMqIGZ1bmN0aW9uIGlzIHByb2Nlc3NlZCBieSBgdG9EYXRlYC5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8TnVtYmVyfSBhcmd1bWVudCAtIHRoZSB2YWx1ZSB0byBjb252ZXJ0XG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIHBhcnNlZCBkYXRlIGluIHRoZSBsb2NhbCB0aW1lIHpvbmVcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gMSBhcmd1bWVudCByZXF1aXJlZFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBDbG9uZSB0aGUgZGF0ZTpcbiAqIGNvbnN0IHJlc3VsdCA9IHRvRGF0ZShuZXcgRGF0ZSgyMDE0LCAxLCAxMSwgMTEsIDMwLCAzMCkpXG4gKiAvLz0+IFR1ZSBGZWIgMTEgMjAxNCAxMTozMDozMFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBDb252ZXJ0IHRoZSB0aW1lc3RhbXAgdG8gZGF0ZTpcbiAqIGNvbnN0IHJlc3VsdCA9IHRvRGF0ZSgxMzkyMDk4NDMwMDAwKVxuICogLy89PiBUdWUgRmViIDExIDIwMTQgMTE6MzA6MzBcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0b0RhdGUoYXJndW1lbnQpIHtcbiAgcmVxdWlyZWRBcmdzKDEsIGFyZ3VtZW50cyk7XG4gIHZhciBhcmdTdHIgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYXJndW1lbnQpOyAvLyBDbG9uZSB0aGUgZGF0ZVxuXG4gIGlmIChhcmd1bWVudCBpbnN0YW5jZW9mIERhdGUgfHwgX3R5cGVvZihhcmd1bWVudCkgPT09ICdvYmplY3QnICYmIGFyZ1N0ciA9PT0gJ1tvYmplY3QgRGF0ZV0nKSB7XG4gICAgLy8gUHJldmVudCB0aGUgZGF0ZSB0byBsb3NlIHRoZSBtaWxsaXNlY29uZHMgd2hlbiBwYXNzZWQgdG8gbmV3IERhdGUoKSBpbiBJRTEwXG4gICAgcmV0dXJuIG5ldyBEYXRlKGFyZ3VtZW50LmdldFRpbWUoKSk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGFyZ3VtZW50ID09PSAnbnVtYmVyJyB8fCBhcmdTdHIgPT09ICdbb2JqZWN0IE51bWJlcl0nKSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKGFyZ3VtZW50KTtcbiAgfSBlbHNlIHtcbiAgICBpZiAoKHR5cGVvZiBhcmd1bWVudCA9PT0gJ3N0cmluZycgfHwgYXJnU3RyID09PSAnW29iamVjdCBTdHJpbmddJykgJiYgdHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgY29uc29sZS53YXJuKFwiU3RhcnRpbmcgd2l0aCB2Mi4wLjAtYmV0YS4xIGRhdGUtZm5zIGRvZXNuJ3QgYWNjZXB0IHN0cmluZ3MgYXMgZGF0ZSBhcmd1bWVudHMuIFBsZWFzZSB1c2UgYHBhcnNlSVNPYCB0byBwYXJzZSBzdHJpbmdzLiBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy9kYXRlLWZucy9ibG9iL21hc3Rlci9kb2NzL3VwZ3JhZGVHdWlkZS5tZCNzdHJpbmctYXJndW1lbnRzXCIpOyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuXG4gICAgICBjb25zb2xlLndhcm4obmV3IEVycm9yKCkuc3RhY2spO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgRGF0ZShOYU4pO1xuICB9XG59IiwiZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU1vZGFsKCkge1xuICAgIC8vIHN0eWxlIHRhZ1xuICAgIHZhciBjc3MgPSBcIlxcbiAgICAgIC5sb29wcy1wdXJjaGFzZS1tb2RhbCB7XFxuICAgICAgICAgIHBvc2l0aW9uOiBmaXhlZDtcXG4gICAgICAgICAgdG9wOiA1MCU7XFxuICAgICAgICAgIGxlZnQ6IDUwJTtcXG4gICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XFxuICAgICAgICAgIHdpZHRoOiAxMDAlO1xcbiAgICAgICAgICBoZWlnaHQ6IDEwMCU7XFxuICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNCk7XFxuICAgICAgfVxcblxcbiAgICAgIC5sb29wcy1wdXJjaGFzZS1tb2RhbC1jb250ZW50IHtcXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmZWZlZmU7XFxuICAgICAgICB3aWR0aDogNTAlO1xcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMTBweDtcXG4gICAgICAgIG1heC1oZWlnaHQ6IDkwdmg7XFxuICAgICAgICBvdmVyZmxvdy15OiBhdXRvO1xcbiAgICAgIH1cXG5cXG4gICAgICAudGl0bGUge1xcbiAgICAgICAgZm9udC1zaXplOiAyMHB4O1xcbiAgICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxuICAgICAgICBwYWRkaW5nOiAyMHB4O1xcbiAgICAgIH1cXG5cXG4gICAgICBmb3JtIHtcXG4gICAgICAgIG1pbi13aWR0aDogNTAwcHg7XFxuICAgICAgICBhbGlnbi1zZWxmOiBjZW50ZXI7XFxuICAgICAgICBib3gtc2hhZG93OiAwcHggMHB4IDBweCAwLjVweCByZ2JhKDUwLCA1MCwgOTMsIDAuMSksXFxuICAgICAgICAgIDBweCAycHggNXB4IDBweCByZ2JhKDUwLCA1MCwgOTMsIDAuMSksIDBweCAxcHggMS41cHggMHB4IHJnYmEoMCwgMCwgMCwgMC4wNyk7XFxuICAgICAgICBib3JkZXItcmFkaXVzOiA3cHg7XFxuICAgICAgICBwYWRkaW5nOiA0MHB4O1xcbiAgICAgIH1cXG5cXG4gICAgICAuaGlkZGVuIHtcXG4gICAgICAgIGRpc3BsYXk6IG5vbmUhaW1wb3J0YW50O1xcbiAgICAgIH1cXG5cXG4gICAgICAjcGF5bWVudC1tZXNzYWdlIHtcXG4gICAgICAgIGNvbG9yOiByZ2IoMTA1LCAxMTUsIDEzNCk7XFxuICAgICAgICBmb250LXNpemU6IDE2cHg7XFxuICAgICAgICBsaW5lLWhlaWdodDogMjBweDtcXG4gICAgICAgIHBhZGRpbmctdG9wOiAxMnB4O1xcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICAgIH1cXG5cXG4gICAgICAjbGluay1hdXRoZW50aWNhdGlvbi1lbGVtZW50IHtcXG4gICAgICAgIG1hcmdpbi1ib3R0b206IDI0cHg7XFxuICAgICAgfVxcblxcbiAgICAgICNwYXltZW50LWVsZW1lbnQge1xcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMjRweDtcXG4gICAgICB9XFxuXFxuICAgICAgI2FkZHJlc3MtZWxlbWVudCB7XFxuICAgICAgICBtYXJnaW4tYm90dG9tOiAyNHB4O1xcbiAgICAgIH1cXG5cXG4gICAgICAvKiBCdXR0b25zIGFuZCBsaW5rcyAqL1xcbiAgICAgICNzdWJtaXQge1xcbiAgICAgICAgYmFja2dyb3VuZDogIzU0NjlkNDtcXG4gICAgICAgIGZvbnQtZmFtaWx5OiBBcmlhbCwgc2Fucy1zZXJpZjtcXG4gICAgICAgIGNvbG9yOiAjZmZmZmZmO1xcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNHB4O1xcbiAgICAgICAgYm9yZGVyOiAwO1xcbiAgICAgICAgcGFkZGluZzogMTJweCAxNnB4O1xcbiAgICAgICAgZm9udC1zaXplOiAxNnB4O1xcbiAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcXG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICAgICAgdHJhbnNpdGlvbjogYWxsIDAuMnMgZWFzZTtcXG4gICAgICAgIGJveC1zaGFkb3c6IDBweCA0cHggNS41cHggMHB4IHJnYmEoMCwgMCwgMCwgMC4wNyk7XFxuICAgICAgICB3aWR0aDogMTAwJTtcXG4gICAgICB9XFxuICAgICAgI3N1Ym1pdDpob3ZlciB7XFxuICAgICAgICBmaWx0ZXI6IGNvbnRyYXN0KDExNSUpO1xcbiAgICAgIH1cXG4gICAgICAjc3VibWl0OmRpc2FibGVkIHtcXG4gICAgICAgIG9wYWNpdHk6IDAuNTtcXG4gICAgICAgIGN1cnNvcjogZGVmYXVsdDtcXG4gICAgICB9XFxuXFxuICAgICAgI2NhbmNlbCB7XFxuICAgICAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcXG4gICAgICAgIGZvbnQtZmFtaWx5OiBBcmlhbCwgc2Fucy1zZXJpZjtcXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDRweDtcXG4gICAgICAgIGJvcmRlcjogMDtcXG4gICAgICAgIHBhZGRpbmc6IDEycHggMTZweDtcXG4gICAgICAgIGZvbnQtc2l6ZTogMTZweDtcXG4gICAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XFxuICAgICAgICBtYXJnaW4tdG9wOiAxMHB4O1xcbiAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XFxuICAgICAgICB0cmFuc2l0aW9uOiBhbGwgMC4ycyBlYXNlO1xcbiAgICAgICAgYm94LXNoYWRvdzogMHB4IDRweCA1LjVweCAwcHggcmdiYSgwLCAwLCAwLCAwLjA3KTtcXG4gICAgICAgIHdpZHRoOiAxMDAlO1xcbiAgICAgIH1cXG4gICAgICAjY2FuY2VsOmhvdmVyIHtcXG4gICAgICAgIGZpbHRlcjogY29udHJhc3QoMTE1JSk7XFxuICAgICAgfVxcbiAgICAgICNjYW5jZWw6ZGlzYWJsZWQge1xcbiAgICAgICAgb3BhY2l0eTogMC41O1xcbiAgICAgICAgY3Vyc29yOiBkZWZhdWx0O1xcbiAgICAgIH1cXG5cXG4gICAgICAvKiBzcGlubmVyL3Byb2Nlc3Npbmcgc3RhdGUsIGVycm9ycyAqL1xcbiAgICAgIC5zcGlubmVyLFxcbiAgICAgIC5zcGlubmVyOmJlZm9yZSxcXG4gICAgICAuc3Bpbm5lcjphZnRlciB7XFxuICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICAgICAgfVxcbiAgICAgIC5zcGlubmVyIHtcXG4gICAgICAgIGNvbG9yOiAjZmZmZmZmO1xcbiAgICAgICAgZm9udC1zaXplOiAyMnB4O1xcbiAgICAgICAgdGV4dC1pbmRlbnQ6IC05OTk5OXB4O1xcbiAgICAgICAgbWFyZ2luOiAwcHggYXV0bztcXG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgICAgIHdpZHRoOiAyMHB4O1xcbiAgICAgICAgaGVpZ2h0OiAyMHB4O1xcbiAgICAgICAgYm94LXNoYWRvdzogaW5zZXQgMCAwIDAgMnB4O1xcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVooMCk7XFxuICAgICAgICAtbXMtdHJhbnNmb3JtOiB0cmFuc2xhdGVaKDApO1xcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVaKDApO1xcbiAgICAgIH1cXG4gICAgICAuc3Bpbm5lcjpiZWZvcmUsXFxuICAgICAgLnNwaW5uZXI6YWZ0ZXIge1xcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICAgICAgY29udGVudDogXFxcIlxcXCI7XFxuICAgICAgfVxcbiAgICAgIC5zcGlubmVyOmJlZm9yZSB7XFxuICAgICAgICB3aWR0aDogMTAuNHB4O1xcbiAgICAgICAgaGVpZ2h0OiAyMC40cHg7XFxuICAgICAgICBiYWNrZ3JvdW5kOiAjNTQ2OWQ0O1xcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMjAuNHB4IDAgMCAyMC40cHg7XFxuICAgICAgICB0b3A6IC0wLjJweDtcXG4gICAgICAgIGxlZnQ6IC0wLjJweDtcXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjogMTAuNHB4IDEwLjJweDtcXG4gICAgICAgIHRyYW5zZm9ybS1vcmlnaW46IDEwLjRweCAxMC4ycHg7XFxuICAgICAgICAtd2Via2l0LWFuaW1hdGlvbjogbG9hZGluZyAycyBpbmZpbml0ZSBlYXNlIDEuNXM7XFxuICAgICAgICBhbmltYXRpb246IGxvYWRpbmcgMnMgaW5maW5pdGUgZWFzZSAxLjVzO1xcbiAgICAgIH1cXG4gICAgICAuc3Bpbm5lcjphZnRlciB7XFxuICAgICAgICB3aWR0aDogMTAuNHB4O1xcbiAgICAgICAgaGVpZ2h0OiAxMC4ycHg7XFxuICAgICAgICBiYWNrZ3JvdW5kOiAjNTQ2OWQ0O1xcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMCAxMC4ycHggMTAuMnB4IDA7XFxuICAgICAgICB0b3A6IC0wLjFweDtcXG4gICAgICAgIGxlZnQ6IDEwLjJweDtcXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjogMHB4IDEwLjJweDtcXG4gICAgICAgIHRyYW5zZm9ybS1vcmlnaW46IDBweCAxMC4ycHg7XFxuICAgICAgICAtd2Via2l0LWFuaW1hdGlvbjogbG9hZGluZyAycyBpbmZpbml0ZSBlYXNlO1xcbiAgICAgICAgYW5pbWF0aW9uOiBsb2FkaW5nIDJzIGluZmluaXRlIGVhc2U7XFxuICAgICAgfVxcblxcbiAgICAgIEAtd2Via2l0LWtleWZyYW1lcyBsb2FkaW5nIHtcXG4gICAgICAgIDAlIHtcXG4gICAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTtcXG4gICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7XFxuICAgICAgICB9XFxuICAgICAgICAxMDAlIHtcXG4gICAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpO1xcbiAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpO1xcbiAgICAgICAgfVxcbiAgICAgIH1cXG4gICAgICBAa2V5ZnJhbWVzIGxvYWRpbmcge1xcbiAgICAgICAgMCUge1xcbiAgICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDBkZWcpO1xcbiAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTtcXG4gICAgICAgIH1cXG4gICAgICAgIDEwMCUge1xcbiAgICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7XFxuICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7XFxuICAgICAgICB9XFxuICAgICAgfVxcblxcbiAgICAgIEBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDogNjAwcHgpIHtcXG4gICAgICAgIGZvcm0ge1xcbiAgICAgICAgICB3aWR0aDogODB2dztcXG4gICAgICAgICAgbWluLXdpZHRoOiBpbml0aWFsO1xcbiAgICAgICAgfVxcbiAgICAgIH1cXG5cXG4gICAgICAubGRzLXNwaW5uZXIge1xcbiAgICAgICAgY29sb3I6IG9mZmljaWFsO1xcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XFxuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgICAgICB3aWR0aDogODBweDtcXG4gICAgICAgIGhlaWdodDogODBweDtcXG4gICAgICAgIG1hcmdpbjogYXV0bztcXG4gICAgICB9XFxuICAgICAgLmxkcy1zcGlubmVyIGRpdiB7XFxuICAgICAgICB0cmFuc2Zvcm0tb3JpZ2luOiA0MHB4IDQwcHg7XFxuICAgICAgICBhbmltYXRpb246IGxkcy1zcGlubmVyIDEuMnMgbGluZWFyIGluZmluaXRlO1xcbiAgICAgIH1cXG4gICAgICAubGRzLXNwaW5uZXIgZGl2OmFmdGVyIHtcXG4gICAgICAgIGNvbnRlbnQ6IFxcXCIgXFxcIjtcXG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICAgICAgdG9wOiAzcHg7XFxuICAgICAgICBsZWZ0OiAzN3B4O1xcbiAgICAgICAgd2lkdGg6IDZweDtcXG4gICAgICAgIGhlaWdodDogMThweDtcXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDIwJTtcXG4gICAgICAgIGJhY2tncm91bmQ6IGJsYWNrO1xcbiAgICAgIH1cXG4gICAgICAubGRzLXNwaW5uZXIgZGl2Om50aC1jaGlsZCgxKSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTtcXG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogLTEuMXM7XFxuICAgICAgfVxcbiAgICAgIC5sZHMtc3Bpbm5lciBkaXY6bnRoLWNoaWxkKDIpIHtcXG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDMwZGVnKTtcXG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogLTFzO1xcbiAgICAgIH1cXG4gICAgICAubGRzLXNwaW5uZXIgZGl2Om50aC1jaGlsZCgzKSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSg2MGRlZyk7XFxuICAgICAgICBhbmltYXRpb24tZGVsYXk6IC0wLjlzO1xcbiAgICAgIH1cXG4gICAgICAubGRzLXNwaW5uZXIgZGl2Om50aC1jaGlsZCg0KSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSg5MGRlZyk7XFxuICAgICAgICBhbmltYXRpb24tZGVsYXk6IC0wLjhzO1xcbiAgICAgIH1cXG4gICAgICAubGRzLXNwaW5uZXIgZGl2Om50aC1jaGlsZCg1KSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgxMjBkZWcpO1xcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiAtMC43cztcXG4gICAgICB9XFxuICAgICAgLmxkcy1zcGlubmVyIGRpdjpudGgtY2hpbGQoNikge1xcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMTUwZGVnKTtcXG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogLTAuNnM7XFxuICAgICAgfVxcbiAgICAgIC5sZHMtc3Bpbm5lciBkaXY6bnRoLWNoaWxkKDcpIHtcXG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDE4MGRlZyk7XFxuICAgICAgICBhbmltYXRpb24tZGVsYXk6IC0wLjVzO1xcbiAgICAgIH1cXG4gICAgICAubGRzLXNwaW5uZXIgZGl2Om50aC1jaGlsZCg4KSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgyMTBkZWcpO1xcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiAtMC40cztcXG4gICAgICB9XFxuICAgICAgLmxkcy1zcGlubmVyIGRpdjpudGgtY2hpbGQoOSkge1xcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMjQwZGVnKTtcXG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogLTAuM3M7XFxuICAgICAgfVxcbiAgICAgIC5sZHMtc3Bpbm5lciBkaXY6bnRoLWNoaWxkKDEwKSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgyNzBkZWcpO1xcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiAtMC4ycztcXG4gICAgICB9XFxuICAgICAgLmxkcy1zcGlubmVyIGRpdjpudGgtY2hpbGQoMTEpIHtcXG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDMwMGRlZyk7XFxuICAgICAgICBhbmltYXRpb24tZGVsYXk6IC0wLjFzO1xcbiAgICAgIH1cXG4gICAgICAubGRzLXNwaW5uZXIgZGl2Om50aC1jaGlsZCgxMikge1xcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMzMwZGVnKTtcXG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogMHM7XFxuICAgICAgfVxcbiAgICAgIEBrZXlmcmFtZXMgbGRzLXNwaW5uZXIge1xcbiAgICAgICAgMCUge1xcbiAgICAgICAgICBvcGFjaXR5OiAxO1xcbiAgICAgICAgfVxcbiAgICAgICAgMTAwJSB7XFxuICAgICAgICAgIG9wYWNpdHk6IDA7XFxuICAgICAgICB9XFxuICAgICAgfVxcblxcblxcbiAgICBcIjtcbiAgICBpZiAoIWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3N0eWxlW2RhdGEtbG9vcHNdJykpIHtcbiAgICAgICAgdmFyIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICAgICAgc3R5bGUuc2V0QXR0cmlidXRlKCdkYXRhLWxvb3BzJywgJycpO1xuICAgICAgICBzdHlsZS5pbm5lckhUTUwgPSBjc3M7XG4gICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuICAgIH1cbiAgICAvLyBtb2RhbFxuICAgIHZhciBtb2RhbCA9IFwiXFxuICAgICAgPGRpdiBjbGFzcz1cXFwibG9vcHMtcHVyY2hhc2UtbW9kYWxcXFwiPlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwibG9vcHMtcHVyY2hhc2UtbW9kYWwtY29udGVudFxcXCI+XFxuXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJsZHMtc3Bpbm5lciBoaWRkZW5cXFwiPjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48ZGl2PjwvZGl2PjwvZGl2PlxcblxcbiAgICAgICAgICA8Zm9ybSBpZD1cXFwicGF5bWVudC1mb3JtXFxcIj5cXG5cXG4gICAgICAgICAgICA8ZGl2IGlkPVxcXCJsaW5rLWF1dGhlbnRpY2F0aW9uLWVsZW1lbnRcXFwiPjwvZGl2PlxcblxcbiAgICAgICAgICAgIDxkaXYgaWQ9XFxcInBheW1lbnQtZWxlbWVudFxcXCI+PC9kaXY+XFxuXFxuICAgICAgICAgICAgPGRpdiBpZD1cXFwiYWRkcmVzcy1lbGVtZW50XFxcIj48L2Rpdj5cXG5cXG4gICAgICAgICAgICA8ZGl2IGlkPVxcXCJwYXltZW50LW1lc3NhZ2VcXFwiIGNsYXNzPVxcXCJoaWRkZW5cXFwiPjwvZGl2PlxcblxcbiAgICAgICAgICAgIDxidXR0b24gaWQ9XFxcInN1Ym1pdFxcXCI+XFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJzcGlubmVyIGhpZGRlblxcXCIgaWQ9XFxcInNwaW5uZXJcXFwiPjwvZGl2PlxcbiAgICAgICAgICAgICAgPHNwYW4gaWQ9XFxcImJ1dHRvbi10ZXh0XFxcIj5QYXkgbm93PC9zcGFuPlxcbiAgICAgICAgICAgIDwvYnV0dG9uPlxcblxcbiAgICAgICAgICAgIDxidXR0b24gaWQ9XFxcImNhbmNlbFxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIj5cXG4gICAgICAgICAgICAgIDxzcGFuIGlkPVxcXCJidXR0b24tdGV4dFxcXCI+Q2FuY2VsPC9zcGFuPlxcbiAgICAgICAgICAgIDwvYnV0dG9uPlxcblxcbiAgICAgICAgICA8L2Zvcm0+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICA8L2Rpdj5cXG4gICAgXCI7XG4gICAgaWYgKCFkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubG9vcHMtcHVyY2hhc2UtbW9kYWwnKSkge1xuICAgICAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGRpdi5pbm5lckhUTUwgPSBtb2RhbDtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkaXYpO1xuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBoaWRlTW9kYWwoKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxvb3BzLXB1cmNoYXNlLW1vZGFsJykuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG59XG5leHBvcnQgZnVuY3Rpb24gc2hvd01vZGFsKCkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sb29wcy1wdXJjaGFzZS1tb2RhbCcpLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcbn1cbmV4cG9ydCBmdW5jdGlvbiBpbml0U3RyaXBlKCkge1xuICAgIGlmICghZG9jdW1lbnQucXVlcnlTZWxlY3Rvcignc2NyaXB0W3NyYz1cImh0dHBzOi8vanMuc3RyaXBlLmNvbS92My9cIl0nKSkge1xuICAgICAgICB2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgICAgIHNjcmlwdC5zZXRBdHRyaWJ1dGUoJ3NyYycsICdodHRwczovL2pzLnN0cmlwZS5jb20vdjMvJyk7XG4gICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gc2hvd0J1dHRvbkxvYWRlcihpc0xvYWRpbmcpIHtcbiAgICBpZiAoaXNMb2FkaW5nID09PSB0cnVlKSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbicpLmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NwaW5uZXInKS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2J1dHRvbi10ZXh0JykuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b24nKS5kaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3Bpbm5lcicpLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYnV0dG9uLXRleHQnKS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gc2hvd0xvYWRlcigpIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGRzLXNwaW5uZXInKS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGF5bWVudC1mb3JtJykuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG59XG5leHBvcnQgZnVuY3Rpb24gaGlkZUxvYWRlcigpIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGRzLXNwaW5uZXInKS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGF5bWVudC1mb3JtJykuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG59XG5leHBvcnQgZnVuY3Rpb24gc2hvd01lc3NhZ2UobWVzc2FnZVRleHQpIHtcbiAgICB2YXIgbWVzc2FnZUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwYXltZW50LW1lc3NhZ2UnKTtcbiAgICBtZXNzYWdlQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICAgIG1lc3NhZ2VDb250YWluZXIudGV4dENvbnRlbnQgPSBtZXNzYWdlVGV4dDtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbWVzc2FnZUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICAgICAgbWVzc2FnZUNvbnRhaW5lci50ZXh0Q29udGVudCA9ICcnO1xuICAgIH0sIDQwMDApO1xufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUxpbmtBdXRoZW50aWNhdGlvbkVsZW1lbnQoZWxlbWVudHMpIHtcbiAgICB2YXIgbGlua0F1dGhlbnRpY2F0aW9uRWxlbWVudCA9IGVsZW1lbnRzLmNyZWF0ZSgnbGlua0F1dGhlbnRpY2F0aW9uJyk7XG4gICAgbGlua0F1dGhlbnRpY2F0aW9uRWxlbWVudC5tb3VudCgnI2xpbmstYXV0aGVudGljYXRpb24tZWxlbWVudCcpO1xuICAgIHJldHVybiBsaW5rQXV0aGVudGljYXRpb25FbGVtZW50O1xufVxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVBheW1lbnRFbGVtZW50KGVsZW1lbnRzKSB7XG4gICAgdmFyIHBheW1lbnRFbGVtZW50ID0gZWxlbWVudHMuY3JlYXRlKCdwYXltZW50Jywge1xuICAgICAgICBsYXlvdXQ6ICd0YWJzJyxcbiAgICB9KTtcbiAgICBwYXltZW50RWxlbWVudC5tb3VudCgnI3BheW1lbnQtZWxlbWVudCcpO1xuICAgIHJldHVybiBwYXltZW50RWxlbWVudDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVBZGRyZXNzRWxlbWVudChlbGVtZW50cykge1xuICAgIHZhciBhZGRyZXNzRWxlbWVudCA9IGVsZW1lbnRzLmNyZWF0ZSgnYWRkcmVzcycsIHtcbiAgICAgICAgbW9kZTogJ3NoaXBwaW5nJyxcbiAgICAgICAgYWxsb3dlZENvdW50cmllczogWydKUCddLFxuICAgICAgICBmaWVsZHM6IHtcbiAgICAgICAgICAgIHBob25lOiAnYWx3YXlzJyxcbiAgICAgICAgfSxcbiAgICB9KTtcbiAgICBhZGRyZXNzRWxlbWVudC5tb3VudCgnI2FkZHJlc3MtZWxlbWVudCcpO1xuICAgIHJldHVybiBhZGRyZXNzRWxlbWVudDtcbn1cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVJZnJhbWVzKCkge1xuICAgIHZhciBpZnJhbWVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaWZyYW1lW25hbWVePVwiX19wcml2YXRlU3RyaXBlQ29udHJvbGxlclwiXScpO1xuICAgIGlmcmFtZXMuZm9yRWFjaChmdW5jdGlvbiAoaWZyYW1lKSB7XG4gICAgICAgIGlmcmFtZS5yZW1vdmUoKTtcbiAgICB9KTtcbn1cbiIsInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9fZ2VuZXJhdG9yID0gKHRoaXMgJiYgdGhpcy5fX2dlbmVyYXRvcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIGJvZHkpIHtcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xuICAgICAgICB3aGlsZSAoZyAmJiAoZyA9IDAsIG9wWzBdICYmIChfID0gMCkpLCBfKSB0cnkge1xuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XG4gICAgfVxufTtcbmltcG9ydCB7IGdldENyZWRlbnRpYWxzIH0gZnJvbSBcIi4vc2VydmljZS9sb29wcy1hcGlcIjtcbmltcG9ydCB7IGNyZWF0ZU1vZGFsLCBoaWRlTW9kYWwgfSBmcm9tIFwiLi9lbGVtZW50cy9tb2RhbFwiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW5pdGlhbGl6ZShjbGllbnRJZCwgY2xpZW50U2VjcmV0KSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX2EsIHRva2VuLCBzdG9yZUlkLCBzdHJpcGVBY2NvdW50SWQ7XG4gICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2IpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoX2IubGFiZWwpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgIGlmICghY2xpZW50SWQgfHwgIWNsaWVudFNlY3JldCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2xpZW50IElEIG9yIENsaWVudCBTZWNyZXQgaXMgbm90IHByb3ZpZGVkXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIGdldENyZWRlbnRpYWxzKGNsaWVudElkLCBjbGllbnRTZWNyZXQpXTtcbiAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgIF9hID0gX2Iuc2VudCgpLCB0b2tlbiA9IF9hLnRva2VuLCBzdG9yZUlkID0gX2Euc3RvcmVJZCwgc3RyaXBlQWNjb3VudElkID0gX2Euc3RyaXBlQWNjb3VudElkO1xuICAgICAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImxvb3BzLXRva2VuXCIsIHRva2VuKTtcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJsb29wcy1zdG9yZS1pZFwiLCBzdG9yZUlkKTtcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJsb29wcy1zdHJpcGUtYWNjb3VudC1pZFwiLCBzdHJpcGVBY2NvdW50SWQpO1xuICAgICAgICAgICAgICAgICAgICBjcmVhdGVNb2RhbCgpO1xuICAgICAgICAgICAgICAgICAgICBoaWRlTW9kYWwoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbn1cbiIsInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9fZ2VuZXJhdG9yID0gKHRoaXMgJiYgdGhpcy5fX2dlbmVyYXRvcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIGJvZHkpIHtcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xuICAgICAgICB3aGlsZSAoZyAmJiAoZyA9IDAsIG9wWzBdICYmIChfID0gMCkpLCBfKSB0cnkge1xuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XG4gICAgfVxufTtcbmltcG9ydCB7IGxvYWRTdHJpcGUgfSBmcm9tICdAc3RyaXBlL3N0cmlwZS1qcyc7XG5pbXBvcnQgeyBjcmVhdGVTdHJpcGVQYXltZW50SW50ZW50LCBjcmVhdGVMb29wc1N1YnNjcmlwdGlvbiwgfSBmcm9tICcuLi9zZXJ2aWNlL2xvb3BzLWFwaSc7XG5pbXBvcnQgeyBjcmVhdGVMaW5rQXV0aGVudGljYXRpb25FbGVtZW50LCBjcmVhdGVQYXltZW50RWxlbWVudCwgY3JlYXRlQWRkcmVzc0VsZW1lbnQsIHJlbW92ZUlmcmFtZXMsIH0gZnJvbSAnLi4vZWxlbWVudHMvc3RyaXBlLWVsZW1lbnRzJztcbmltcG9ydCB7IHNob3dNb2RhbCwgaGlkZU1vZGFsLCBzaG93QnV0dG9uTG9hZGVyLCBzaG93TG9hZGVyLCBoaWRlTG9hZGVyLCBzaG93TWVzc2FnZSwgfSBmcm9tICcuLi9lbGVtZW50cy9tb2RhbCc7XG52YXIgc2luZ2xlUHVyY2hhc2UgPSBmdW5jdGlvbiAocGxhbikgeyByZXR1cm4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgY2xpZW50U2VjcmV0LCBzdHJpcGVQYXltZW50SWQsIF9hLCBzZWNyZXQsIHBheW1lbnRJZCwgZXJyb3JfMSwgc3RyaXBlQWNjb3VudElkLCBzdHJpcGUsIGVtYWlsQWRkcmVzcywgYWRkcmVzcywgZWxlbWVudHMsIGxpbmtBdXRoZW50aWNhdGlvbkVsLCBjYW5jZWxCdXR0b25FbCwgZm9ybTtcbiAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9iKSB7XG4gICAgICAgIHN3aXRjaCAoX2IubGFiZWwpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICBpZiAoIXBsYW4ucHJpY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBwcmljZScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBpZiAoIXBsYW4ucmV0dXJuX3VybCkge1xuICAgICAgICAgICAgICAgIC8vICAgdGhyb3cgbmV3IEVycm9yKCdObyByZXR1cm4gdXJsJylcbiAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgc2hvd01vZGFsKCk7XG4gICAgICAgICAgICAgICAgc2hvd0xvYWRlcigpO1xuICAgICAgICAgICAgICAgIGNsaWVudFNlY3JldCA9ICcnO1xuICAgICAgICAgICAgICAgIHN0cmlwZVBheW1lbnRJZCA9ICcnO1xuICAgICAgICAgICAgICAgIF9iLmxhYmVsID0gMTtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICBfYi50cnlzLnB1c2goWzEsIDMsICwgNF0pO1xuICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIGNyZWF0ZVN0cmlwZVBheW1lbnRJbnRlbnQocGxhbi5wcmljZSldO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIF9hID0gX2Iuc2VudCgpLCBzZWNyZXQgPSBfYS5jbGllbnRTZWNyZXQsIHBheW1lbnRJZCA9IF9hLnBheW1lbnRJZDtcbiAgICAgICAgICAgICAgICBjbGllbnRTZWNyZXQgPSBzZWNyZXQ7XG4gICAgICAgICAgICAgICAgc3RyaXBlUGF5bWVudElkID0gcGF5bWVudElkO1xuICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDRdO1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIGVycm9yXzEgPSBfYi5zZW50KCk7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yXzEpO1xuICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgIGlmICghY2xpZW50U2VjcmV0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTm8gY2xpZW50IHNlY3JldCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzdHJpcGVBY2NvdW50SWQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbG9vcHMtc3RyaXBlLWFjY291bnQtaWQnKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBsb2FkU3RyaXBlKCdwa190ZXN0XzUxSWNOSUVCaW45SGZQZXZnRmVWQmJCVFpvR0tzMW54TFRYazhkd3diWEFDaFZwTTdmQWo1aUtubkNwaTdXRU5VNkNRZjlMMXdHTm9JZ1RvWnh2d3k2MlBJMDBhZ3U1NmxicycsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cmlwZUFjY291bnQ6IHN0cmlwZUFjY291bnRJZCxcbiAgICAgICAgICAgICAgICAgICAgfSldO1xuICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgIHN0cmlwZSA9IF9iLnNlbnQoKTtcbiAgICAgICAgICAgICAgICBlbWFpbEFkZHJlc3MgPSAnJztcbiAgICAgICAgICAgICAgICBhZGRyZXNzID0ge307XG4gICAgICAgICAgICAgICAgZWxlbWVudHMgPSBzdHJpcGUuZWxlbWVudHMoe1xuICAgICAgICAgICAgICAgICAgICBhcHBlYXJhbmNlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGVtZTogJ3N0cmlwZScsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGNsaWVudFNlY3JldDogY2xpZW50U2VjcmV0LFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGxpbmtBdXRoZW50aWNhdGlvbkVsID0gY3JlYXRlTGlua0F1dGhlbnRpY2F0aW9uRWxlbWVudChlbGVtZW50cyk7XG4gICAgICAgICAgICAgICAgbGlua0F1dGhlbnRpY2F0aW9uRWwub24oJ2NoYW5nZScsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnQuZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGV2ZW50LmVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVtYWlsQWRkcmVzcyA9IGV2ZW50LnZhbHVlLmVtYWlsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgY3JlYXRlUGF5bWVudEVsZW1lbnQoZWxlbWVudHMpO1xuICAgICAgICAgICAgICAgIGNyZWF0ZUFkZHJlc3NFbGVtZW50KGVsZW1lbnRzKTtcbiAgICAgICAgICAgICAgICBjYW5jZWxCdXR0b25FbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjYW5jZWwnKTtcbiAgICAgICAgICAgICAgICBjYW5jZWxCdXR0b25FbCA9PT0gbnVsbCB8fCBjYW5jZWxCdXR0b25FbCA9PT0gdm9pZCAwID8gdm9pZCAwIDogY2FuY2VsQnV0dG9uRWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZUlmcmFtZXMoKTtcbiAgICAgICAgICAgICAgICAgICAgaGlkZU1vZGFsKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaGlkZUxvYWRlcigpO1xuICAgICAgICAgICAgICAgIGZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGF5bWVudC1mb3JtJyk7XG4gICAgICAgICAgICAgICAgZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBmdW5jdGlvbiAoZXZlbnQpIHsgcmV0dXJuIF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBhZGRyZXNzRWxlbWVudCwgX2EsIGNvbXBsZXRlLCB2YWx1ZSwgc3RhdHVzXzEsIGVycm9yLCBlcnJvcl8yO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9iKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKF9iLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93QnV0dG9uTG9hZGVyKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZGRyZXNzRWxlbWVudCA9IGVsZW1lbnRzLmdldEVsZW1lbnQoJ2FkZHJlc3MnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgYWRkcmVzc0VsZW1lbnQuZ2V0VmFsdWUoKV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYSA9IF9iLnNlbnQoKSwgY29tcGxldGUgPSBfYS5jb21wbGV0ZSwgdmFsdWUgPSBfYS52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbXBsZXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZGRyZXNzID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2IubGFiZWwgPSAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2IudHJ5cy5wdXNoKFsyLCA2LCA3LCA4XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIGNyZWF0ZUxvb3BzU3Vic2NyaXB0aW9uKGFkZHJlc3MsIHBsYW4sIGVtYWlsQWRkcmVzcywgc3RyaXBlUGF5bWVudElkKV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXNfMSA9IChfYi5zZW50KCkpLnN0YXR1cztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEoc3RhdHVzXzEgPT09ICdzdWNjZXNzJykpIHJldHVybiBbMyAvKmJyZWFrKi8sIDVdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBzdHJpcGUuY29uZmlybVBheW1lbnQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRzOiBlbGVtZW50cyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25maXJtUGFyYW1zOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybl91cmw6ICcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVkaXJlY3Q6ICdpZl9yZXF1aXJlZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvciA9IChfYi5zZW50KCkpLmVycm9yO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoZXJyb3IgPT09IG51bGwgfHwgZXJyb3IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGVycm9yLnR5cGUpID09PSAnY2FyZF9lcnJvcicgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZXJyb3IgPT09IG51bGwgfHwgZXJyb3IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGVycm9yLnR5cGUpID09PSAndmFsaWRhdGlvbl9lcnJvcicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93TWVzc2FnZShlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3dNZXNzYWdlKCdBbiB1bmV4cGVjdGVkIGVycm9yIG9jY3VycmVkLicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3dNZXNzYWdlKCdTdWJzY3JpcHRpb24gY3JlYXRlZCBzdWNjZXNzZnVsbHknKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2IubGFiZWwgPSA1O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNTogcmV0dXJuIFszIC8qYnJlYWsqLywgOF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA2OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcl8yID0gX2Iuc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93TWVzc2FnZSgnQW4gdW5leHBlY3RlZCBlcnJvciBvY2N1cnJlZC4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgOF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA3OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93QnV0dG9uTG9hZGVyKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlSWZyYW1lcygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoaWRlTW9kYWwoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs3IC8qZW5kZmluYWxseSovXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDg6IHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7IH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgfVxuICAgIH0pO1xufSk7IH07XG5leHBvcnQgeyBzaW5nbGVQdXJjaGFzZSB9O1xuIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19nZW5lcmF0b3IgPSAodGhpcyAmJiB0aGlzLl9fZ2VuZXJhdG9yKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgYm9keSkge1xuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XG4gICAgICAgIHdoaWxlIChnICYmIChnID0gMCwgb3BbMF0gJiYgKF8gPSAwKSksIF8pIHRyeSB7XG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcbiAgICB9XG59O1xudmFyIGFwaVVybCA9ICdodHRwOi8vbG9vcHMtc2VydmVyLWFsYi0xMDkwODg5ODg4LmFwLW5vcnRoZWFzdC0yLmVsYi5hbWF6b25hd3MuY29tJztcbi8vIHNoaXBwaW5nOiAnMCjpgJrluLjphY3pgIEpIC8gMSjnhKHmlpnphY3pgIEpJyxcbi8vIDA6IHBsYW5cbi8vIDE6IHByb2R1Y3Rcbi8vIDI6IGdyb3VwXG4vLyBjb25zdCBhcGlVcmwgPSAnaHR0cDovL2xvY2FsaG9zdDo4MDgwJ1xuaW1wb3J0IHsgYWRkRGF5cywgYWRkTW9udGhzLCBzZXREYXRlLCBlbmRPZk1vbnRoIH0gZnJvbSAnZGF0ZS1mbnMnO1xuZXhwb3J0IGZ1bmN0aW9uIGdldENyZWRlbnRpYWxzKGNsaWVudElkLCBjbGllbnRTZWNyZXQpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciByZXNwb25zZSwgZGF0YSwgZXJyb3JfMTtcbiAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFjbGllbnRJZCB8fCAhY2xpZW50U2VjcmV0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NsaWVudCBJRCBvciBDbGllbnQgU2VjcmV0IGlzIG5vdCBwcm92aWRlZCcpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF9hLmxhYmVsID0gMTtcbiAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgIF9hLnRyeXMucHVzaChbMSwgNCwgLCA1XSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIGZldGNoKFwiXCIuY29uY2F0KGFwaVVybCwgXCIvYXBpL3YxL2F1dGgvYmFzaWNcIiksIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWVudF9pZDogY2xpZW50SWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWVudF9zZWNyZXQ6IGNsaWVudFNlY3JldCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXTtcbiAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCByZXNwb25zZS5qc29uKCldO1xuICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIGRhdGFdO1xuICAgICAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICAgICAgZXJyb3JfMSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yXzEpO1xuICAgICAgICAgICAgICAgIGNhc2UgNTogcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTdHJpcGVQYXltZW50SW50ZW50KGFtb3VudCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHRva2VuLCByZXNwb25zZSwgZGF0YSwgZXJyb3JfMjtcbiAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbG9vcHMtdG9rZW4nKTtcbiAgICAgICAgICAgICAgICAgICAgX2EubGFiZWwgPSAxO1xuICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgX2EudHJ5cy5wdXNoKFsxLCA0LCAsIDVdKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgZmV0Y2goXCJcIi5jb25jYXQoYXBpVXJsLCBcIi9hcGkvdjEvbWVyY2hhbnQvY3JlYXRlLXBheW1lbnQtaW50ZW50XCIpLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBdXRob3JpemF0aW9uOiBcIkJlYXJlciBcIi5jb25jYXQodG9rZW4pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbW91bnQ6IGFtb3VudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXTtcbiAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCByZXNwb25zZS5qc29uKCldO1xuICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIGRhdGFdO1xuICAgICAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICAgICAgZXJyb3JfMiA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yXzIpO1xuICAgICAgICAgICAgICAgIGNhc2UgNTogcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVMb29wc1N1YnNjcmlwdGlvbihhZGRyZXNzLCBwbGFuLCBlbWFpbCwgc3RyaXBlUGF5bWVudElkKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgdG9rZW4sIG1lcmNoYW50X2lkLCBmaXJzdE5hbWUsIGxhc3ROYW1lLCBib2R5LCByZXNwb25zZSwgZGF0YSwgZXJyb3JfMztcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9iKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKF9iLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICB0b2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdsb29wcy10b2tlbicpO1xuICAgICAgICAgICAgICAgICAgICBtZXJjaGFudF9pZCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdsb29wcy1zdG9yZS1pZCcpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoYWRkcmVzcy5uYW1lLmluZGV4T2YoJyAnKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hID0gYWRkcmVzcy5uYW1lLnNwbGl0KCcgJyksIGZpcnN0TmFtZSA9IF9hWzBdLCBsYXN0TmFtZSA9IF9hWzFdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3ROYW1lID0gYWRkcmVzcy5uYW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGFzdE5hbWUgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBib2R5ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICcyYzZlMjM5YS1mMDJiLWQxNTgtMjgzMy1jN2Y4ODNiYjU1MzAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVyY2hhbnRfaWQ6IG1lcmNoYW50X2lkLnRvU3RyaW5nKCksXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXltZW50X2lkOiBzdHJpcGVQYXltZW50SWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9kdWN0c192YXJpYW50OiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9kdWN0X3R5cGU6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBwbGFuLmtleS50b1N0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudW06IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbjogJ+WVhuWTgeOBlOOBqOOBruODoeODouOCkueuoeeQhicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21lcl9pbmZvcm1hdGlvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkZHJlc3MyOiBhZGRyZXNzLmFkZHJlc3MubGluZTIgfHwgJycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRkcmVzczE6IGFkZHJlc3MuYWRkcmVzcy5saW5lMSB8fCAnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaXR5OiBhZGRyZXNzLmFkZHJlc3MuY2l0eSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmVmOiBhZGRyZXNzLmFkZHJlc3Muc3RhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgemlwY29kZTogYWRkcmVzcy5hZGRyZXNzLnBvc3RhbF9jb2RlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0X25hbWU6IGZpcnN0TmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0X25hbWU6IGxhc3ROYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVtYWlsOiBlbWFpbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZWw6IGFkZHJlc3MucGhvbmUsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgc2hpcHBpbmdfaW5mb3JtYXRpb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZGRyZXNzMjogYWRkcmVzcy5hZGRyZXNzLmxpbmUyIHx8ICcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkZHJlc3MxOiBhZGRyZXNzLmFkZHJlc3MubGluZTEgfHwgJycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2l0eTogYWRkcmVzcy5hZGRyZXNzLmNpdHksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJlZjogYWRkcmVzcy5hZGRyZXNzLnN0YXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHppcGNvZGU6IGFkZHJlc3MuYWRkcmVzcy5wb3N0YWxfY29kZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXJzdF9uYW1lOiBmaXJzdE5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdF9uYW1lOiBsYXN0TmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZWw6IGFkZHJlc3MucGhvbmUsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNoaXBwaW5nOiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjaGVkdWxlX2RlbGl2ZXJ5X2RhdGU6IGFkZERheXMobmV3IERhdGUoKSwgcGxhbi5zaGlwcGluZ19wcmVwYXJhdGlvbl90ZXJtKS50b0lTT1N0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjaGVkdWxlX3BheW1lbnRfZGF0ZTogY2FsY3VsYXRlU2NoZWR1bGVQYXltZW50RGF0ZShwbGFuKS50b0lTT1N0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlX3BheW1lbnRfZGF0ZTogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvdXBvbjogJycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF5bWVudDogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFja191cmw6ICdodHRwczovL2xvY2FsaG9zdDo0MDAwJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIF9iLmxhYmVsID0gMTtcbiAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgIF9iLnRyeXMucHVzaChbMSwgNCwgLCA1XSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIGZldGNoKFwiXCIuY29uY2F0KGFwaVVybCwgXCIvYXBpL3YxL29yZGVycy9jcmVhdGVcIiksIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEF1dGhvcml6YXRpb246IFwiQmFzaWMgXCIuY29uY2F0KHRva2VuKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGJvZHkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSldO1xuICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBfYi5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHJlc3BvbnNlLmpzb24oKV07XG4gICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICBkYXRhID0gX2Iuc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgZGF0YV07XG4gICAgICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgICAgICBlcnJvcl8zID0gX2Iuc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JfMyk7XG4gICAgICAgICAgICAgICAgY2FzZSA1OiByZXR1cm4gWzIgLypyZXR1cm4qL107XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gY2FsY3VsYXRlU2NoZWR1bGVQYXltZW50RGF0ZShwbGFuKSB7XG4gICAgdmFyIGZpcnN0UHVyY2hhc2VEYXRlID0gbmV3IERhdGUoKTtcbiAgICBpZiAocGxhbi5zZWNvbmRfZml4ZWRfcGF5bWVudCA9PT0gJ3RvZGF5Jykge1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGZldGNoKFwiXCIuY29uY2F0KGFwaVVybCwgXCIvYXBpL3YxL3NjaGVkdWxlL3J1bkpvYnNcIiksIHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCA1ICogNjAgKiAxMDAwKTtcbiAgICAgICAgcmV0dXJuIGZpcnN0UHVyY2hhc2VEYXRlO1xuICAgIH1cbiAgICB2YXIgc2Vjb25kUHVyY2hhc2VEYXRlID0gYWRkTW9udGhzKGZpcnN0UHVyY2hhc2VEYXRlLCAxKTtcbiAgICBpZiAocGxhbi5zZWNvbmRfZml4ZWRfcGF5bWVudCA9PT0gJ2xhc3QnKSB7XG4gICAgICAgIHJldHVybiBlbmRPZk1vbnRoKHNlY29uZFB1cmNoYXNlRGF0ZSk7XG4gICAgfVxuICAgIHZhciBzZWNvbmRGaXhQYXltZW50ID0gTnVtYmVyKHBsYW4uc2Vjb25kX2ZpeGVkX3BheW1lbnQpO1xuICAgIC8qKlxuICAgICAqIENvbW1lbnRlZCBmb3IgcGhhc2Ugb25lXG4gICAgICovXG4gICAgLy8gY29uc3QgaW50ZXJ2YWwgPSBwbGFuLmludGVydmFsXG4gICAgLy8gaWYgKGlzQWZ0ZXIoc2V0RGF0ZShzZWNvbmRQdXJjaGFzZURhdGUsIHNlY29uZEZpeFBheW1lbnQpLCBhZGREYXlzKGZpcnN0UHVyY2hhc2VEYXRlLCBpbnRlcnZhbCkpKSB7XG4gICAgLy8gICByZXR1cm4gc2V0RGF0ZShzZWNvbmRQdXJjaGFzZURhdGUsIHNlY29uZEZpeFBheW1lbnQpXG4gICAgLy8gfSBlbHNlIHtcbiAgICAvLyAgIHJldHVybiBhZGRNb250aHMoc2V0RGF0ZShzZWNvbmRQdXJjaGFzZURhdGUsIHNlY29uZEZpeFBheW1lbnQpLCAxKVxuICAgIC8vIH1cbiAgICAvLyBjb25zb2xlLmxvZygnc2Vjb25kRml4UGF5bWVudCcsc2Vjb25kRml4UGF5bWVudClcbiAgICAvLyBjb25zb2xlLmxvZygnZmlyc3RQdXJjaGFzZURhdGUnLGZpcnN0UHVyY2hhc2VEYXRlKVxuICAgIC8vIGNvbnNvbGUubG9nKCdzZWNvbmRQdXJjaGFzZURhdGUnLHNlY29uZFB1cmNoYXNlRGF0ZSlcbiAgICAvLyBjb25zb2xlLmxvZygnc2V0RGF0ZShzZWNvbmRQdXJjaGFzZURhdGUsIHNlY29uZEZpeFBheW1lbnQpJyxzZXREYXRlKHNlY29uZFB1cmNoYXNlRGF0ZSwgc2Vjb25kRml4UGF5bWVudCkpXG4gICAgcmV0dXJuIHNldERhdGUoc2Vjb25kUHVyY2hhc2VEYXRlLCBzZWNvbmRGaXhQYXltZW50KTtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IGluaXRpYWxpemUgZnJvbSBcIi4vbG9vcHNcIjtcbmV4cG9ydCB7IHNpbmdsZVB1cmNoYXNlIH0gZnJvbSBcIi4vcHVyY2hhc2Uvc2luZ2xlXCI7XG5leHBvcnQgeyBpbml0aWFsaXplIH07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=