"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeResults = exports.resultsWithFailure = exports.markdownCode = void 0;
var markdownCode = function (string) { return "\n```\n".concat(string, "\n```\n"); };
exports.markdownCode = markdownCode;
var resultsWithFailure = function (failure, moreMarkdown) {
    var fail = { message: failure };
    return {
        warnings: [],
        messages: [],
        fails: [fail],
        markdowns: moreMarkdown ? [{ message: moreMarkdown }] : [],
    };
};
exports.resultsWithFailure = resultsWithFailure;
var mergeResults = function (left, right) {
    return {
        warnings: __spreadArray(__spreadArray([], left.warnings, true), right.warnings, true),
        messages: __spreadArray(__spreadArray([], left.messages, true), right.messages, true),
        fails: __spreadArray(__spreadArray([], left.fails, true), right.fails, true),
        markdowns: __spreadArray(__spreadArray([], left.markdowns, true), right.markdowns, true),
    };
};
exports.mergeResults = mergeResults;
//# sourceMappingURL=reporting.js.map