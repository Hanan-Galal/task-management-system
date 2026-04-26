"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleValidationErrors = exports.assignValidationInputs = void 0;
var assignValidationInputs = exports.assignValidationInputs = function assignValidationInputs(titleValue, descValue) {
  var titleInputRule = {
    type: 'title',
    required: true,
    minLength: 3,
    maxLength: 50,
    value: titleValue
  };
  var descInputRule = {
    type: 'desc',
    required: true,
    minLength: 10,
    maxLength: 200,
    value: descValue
  };
  return [titleInputRule, descInputRule];
};
var handleValidationErrors = exports.handleValidationErrors = function handleValidationErrors(InputRule) {
  var errorMessage = '';
  if (InputRule.required && InputRule.value.trim().length === 0) {
    errorMessage += "This field ".concat(InputRule.type, " is required.\n");
  }
  if (InputRule.minLength && InputRule.minLength > InputRule.value.trim().length) {
    errorMessage += "This field ".concat(InputRule.type, " must be at least ").concat(InputRule.minLength, " characters long.\n");
  }
  if (InputRule.maxLength && InputRule.maxLength < InputRule.value.trim().length) {
    errorMessage += "This field ".concat(InputRule.type, " must be at most ").concat(InputRule.maxLength, " characters long.\n");
  }
  return errorMessage;
};