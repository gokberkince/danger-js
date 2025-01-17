"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BitBucketCloudAPI = exports.bitbucketCloudCredentialsFromEnv = void 0;
var debug_1 = require("../../debug");
var https_proxy_agent_1 = __importDefault(require("https-proxy-agent"));
var url_1 = require("url");
var bitbucketCloudTemplate_1 = require("../../runner/templates/bitbucketCloudTemplate");
var fetch_1 = require("../../api/fetch");
function bitbucketCloudCredentialsFromEnv(env) {
    var uuid = env["DANGER_BITBUCKETCLOUD_UUID"];
    if (uuid != null && uuid.length > 0) {
        if (!uuid.startsWith("{") || !uuid.endsWith("}")) {
            throw new Error("DANGER_BITBUCKETCLOUD_UUID must be wraped with brackets");
        }
    }
    if (env["DANGER_BITBUCKETCLOUD_OAUTH_KEY"]) {
        if (!env["DANGER_BITBUCKETCLOUD_OAUTH_SECRET"]) {
            throw new Error("DANGER_BITBUCKETCLOUD_OAUTH_SECRET is not set");
        }
        return {
            type: "OAUTH",
            uuid: uuid,
            oauthKey: env["DANGER_BITBUCKETCLOUD_OAUTH_KEY"],
            oauthSecret: env["DANGER_BITBUCKETCLOUD_OAUTH_SECRET"],
        };
    }
    else if (env["DANGER_BITBUCKETCLOUD_USERNAME"]) {
        if (!env["DANGER_BITBUCKETCLOUD_PASSWORD"]) {
            throw new Error("DANGER_BITBUCKETCLOUD_PASSWORD is not set");
        }
        return {
            type: "PASSWORD",
            username: env["DANGER_BITBUCKETCLOUD_USERNAME"],
            password: env["DANGER_BITBUCKETCLOUD_PASSWORD"],
            uuid: uuid,
        };
    }
    if (env["DANGER_BITBUCKETCLOUD_REPO_ACCESSTOKEN"]) {
        return {
            type: "REPO_ACCESS_TOKEN",
            accessToken: env["DANGER_BITBUCKETCLOUD_REPO_ACCESSTOKEN"],
            uuid: uuid,
        };
    }
    throw new Error("Either DANGER_BITBUCKETCLOUD_OAUTH_KEY, DANGER_BITBUCKETCLOUD_USERNAME or DANGER_BITBUCKETCLOUD_REPO_ACCESSTOKEN is not set");
}
exports.bitbucketCloudCredentialsFromEnv = bitbucketCloudCredentialsFromEnv;
var BitBucketCloudAPI = /** @class */ (function () {
    function BitBucketCloudAPI(repoMetadata, credentials) {
        var _this = this;
        this.repoMetadata = repoMetadata;
        this.credentials = credentials;
        this.d = (0, debug_1.debug)("BitBucketCloudAPI");
        this.baseURL = "https://api.bitbucket.org/2.0";
        this.oauthURL = "https://bitbucket.org/site/oauth2/access_token";
        this.getPullRequestsFromBranch = function (branch) { return __awaiter(_this, void 0, void 0, function () {
            var nextPageURL, values, res, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nextPageURL = encodeURI("".concat(this.getBaseRepoURL(), "/pullrequests?q=source.branch.name = \"").concat(branch, "\""));
                        values = [];
                        _a.label = 1;
                    case 1: return [4 /*yield*/, this.get(nextPageURL)];
                    case 2:
                        res = _a.sent();
                        throwIfNotOk(res);
                        return [4 /*yield*/, res.json()];
                    case 3:
                        data = (_a.sent());
                        values = values.concat(data.values);
                        nextPageURL = data.next;
                        _a.label = 4;
                    case 4:
                        if (nextPageURL != null) return [3 /*break*/, 1];
                        _a.label = 5;
                    case 5: return [2 /*return*/, values];
                }
            });
        }); };
        this.getPullRequestInfo = function () { return __awaiter(_this, void 0, void 0, function () {
            var res, prDSL;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.pr) {
                            return [2 /*return*/, this.pr];
                        }
                        return [4 /*yield*/, this.get(this.getPRURL())];
                    case 1:
                        res = _a.sent();
                        throwIfNotOk(res);
                        return [4 /*yield*/, res.json()];
                    case 2:
                        prDSL = (_a.sent());
                        this.pr = prDSL;
                        return [2 /*return*/, prDSL];
                }
            });
        }); };
        this.getPullRequestCommits = function () { return __awaiter(_this, void 0, void 0, function () {
            var values, nextPageURL, res, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.commits) {
                            return [2 /*return*/, this.commits];
                        }
                        values = [];
                        nextPageURL = "".concat(this.getPRURL(), "/commits");
                        _a.label = 1;
                    case 1: return [4 /*yield*/, this.get(nextPageURL)];
                    case 2:
                        res = _a.sent();
                        throwIfNotOk(res);
                        return [4 /*yield*/, res.json()];
                    case 3:
                        data = (_a.sent());
                        values = values.concat(data.values);
                        nextPageURL = data.next;
                        _a.label = 4;
                    case 4:
                        if (nextPageURL != null) return [3 /*break*/, 1];
                        _a.label = 5;
                    case 5:
                        this.commits = values;
                        return [2 /*return*/, values];
                }
            });
        }); };
        this.getPullRequestDiff = function () { return __awaiter(_this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get("".concat(this.getPRURL(), "/diff"))];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.ok ? res.text() : ""];
                }
            });
        }); };
        this.getPullRequestComments = function () { return __awaiter(_this, void 0, void 0, function () {
            var values, nextPageURL, res, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        values = [];
                        nextPageURL = "".concat(this.getPRURL(), "/comments?q=deleted=false");
                        _a.label = 1;
                    case 1: return [4 /*yield*/, this.get(nextPageURL)];
                    case 2:
                        res = _a.sent();
                        throwIfNotOk(res);
                        return [4 /*yield*/, res.json()];
                    case 3:
                        data = (_a.sent());
                        values = values.concat(data.values);
                        nextPageURL = data.next;
                        _a.label = 4;
                    case 4:
                        if (nextPageURL != null) return [3 /*break*/, 1];
                        _a.label = 5;
                    case 5: return [2 /*return*/, values];
                }
            });
        }); };
        this.getPullRequestActivities = function () { return __awaiter(_this, void 0, void 0, function () {
            var values, nextPageURL, res, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        values = [];
                        nextPageURL = "".concat(this.getPRURL(), "/activity");
                        _a.label = 1;
                    case 1: return [4 /*yield*/, this.get(nextPageURL)];
                    case 2:
                        res = _a.sent();
                        throwIfNotOk(res);
                        return [4 /*yield*/, res.json()];
                    case 3:
                        data = (_a.sent());
                        values = values.concat(data.values);
                        nextPageURL = data.next;
                        _a.label = 4;
                    case 4:
                        if (nextPageURL != null) return [3 /*break*/, 1];
                        _a.label = 5;
                    case 5: return [2 /*return*/, values];
                }
            });
        }); };
        this.getFileContents = function (filePath, repoSlug, ref) { return __awaiter(_this, void 0, void 0, function () {
            var prJSON, url, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(!repoSlug || !ref)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getPullRequestInfo()];
                    case 1:
                        prJSON = _a.sent();
                        repoSlug = prJSON.source.repository.full_name;
                        ref = prJSON.source.commit.hash;
                        _a.label = 2;
                    case 2:
                        url = "".concat(this.baseURL, "/repositories/").concat(repoSlug, "/src/").concat(ref, "/").concat(filePath);
                        return [4 /*yield*/, this.get(url, undefined, true)];
                    case 3:
                        res = _a.sent();
                        if (res.status === 404) {
                            return [2 /*return*/, ""];
                        }
                        throwIfNotOk(res);
                        return [4 /*yield*/, res.text()];
                    case 4: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.getDangerMainComments = function (dangerID) { return __awaiter(_this, void 0, void 0, function () {
            var comments, dangerIDMessage;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getPullRequestComments()];
                    case 1:
                        comments = _a.sent();
                        dangerIDMessage = (0, bitbucketCloudTemplate_1.dangerIDToString)(dangerID);
                        return [2 /*return*/, comments
                                .filter(function (comment) { return comment.inline == null; })
                                .filter(function (comment) { return comment.content.raw.includes(dangerIDMessage); })
                                .filter(function (comment) { return comment.user.uuid === _this.uuid; })];
                }
            });
        }); };
        this.getDangerInlineComments = function (dangerID) { return __awaiter(_this, void 0, void 0, function () {
            var comments, dangerIDMessage;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getPullRequestComments()];
                    case 1:
                        comments = _a.sent();
                        dangerIDMessage = (0, bitbucketCloudTemplate_1.dangerIDToString)(dangerID);
                        return [2 /*return*/, comments
                                .filter(function (comment) { return comment.inline; })
                                .map(function (comment) { return ({
                                id: comment.id.toString(),
                                ownedByDanger: comment.content.raw.includes(dangerIDMessage) && comment.user.uuid === _this.uuid,
                                body: comment.content.raw,
                            }); })];
                }
            });
        }); };
        this.postBuildStatus = function (commitId, payload) { return __awaiter(_this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.post("".concat(this.getBaseRepoURL(), "/commit/").concat(commitId, "/statuses/build"), {}, payload)];
                    case 1:
                        res = _a.sent();
                        throwIfNotOk(res);
                        return [4 /*yield*/, res.json()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.postPRComment = function (comment) { return __awaiter(_this, void 0, void 0, function () {
            var url, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "".concat(this.getPRURL(), "/comments");
                        return [4 /*yield*/, this.post(url, {}, { content: { raw: comment } })];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.postInlinePRComment = function (comment, line, filePath) { return __awaiter(_this, void 0, void 0, function () {
            var url, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "".concat(this.getPRURL(), "/comments");
                        return [4 /*yield*/, this.post(url, {}, {
                                content: {
                                    raw: comment,
                                },
                                inline: {
                                    to: line,
                                    path: filePath,
                                },
                            })];
                    case 1:
                        res = _a.sent();
                        if (!res.ok) return [3 /*break*/, 2];
                        return [2 /*return*/, res.json()];
                    case 2: return [4 /*yield*/, res.json()];
                    case 3: throw _a.sent();
                }
            });
        }); };
        this.deleteComment = function (id) { return __awaiter(_this, void 0, void 0, function () {
            var path, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        path = "".concat(this.getPRURL(), "/comments/").concat(id);
                        return [4 /*yield*/, this.delete(path)];
                    case 1:
                        res = _a.sent();
                        if (!res.ok) {
                            throw new Error("Failed to delete comment \"".concat(id));
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        this.updateComment = function (id, comment) { return __awaiter(_this, void 0, void 0, function () {
            var path, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        path = "".concat(this.getPRURL(), "/comments/").concat(id);
                        return [4 /*yield*/, this.put(path, {}, {
                                content: {
                                    raw: comment,
                                },
                            })];
                    case 1:
                        res = _a.sent();
                        if (!res.ok) return [3 /*break*/, 2];
                        return [2 /*return*/, res.json()];
                    case 2: return [4 /*yield*/, res.json()];
                    case 3: throw _a.sent();
                }
            });
        }); };
        // API implementation
        this.api = function (url, headers, body, method, suppressErrors) {
            if (headers === void 0) { headers = {}; }
            if (body === void 0) { body = {}; }
            return __awaiter(_this, void 0, void 0, function () {
                var params, authResponse, jsonResp, profileResponse, jsonResp, message;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(this.credentials.type === "PASSWORD")) return [3 /*break*/, 1];
                            headers["Authorization"] = "Basic ".concat(Buffer.from(this.credentials.username + ":" + this.credentials.password).toString("base64"));
                            return [3 /*break*/, 7];
                        case 1:
                            if (!(this.credentials.type === "REPO_ACCESS_TOKEN")) return [3 /*break*/, 2];
                            headers["Authorization"] = "Bearer ".concat(this.credentials.accessToken);
                            return [3 /*break*/, 7];
                        case 2:
                            if (!(this.accessToken == null)) return [3 /*break*/, 6];
                            this.d("accessToken not found, trying to get from ".concat(this.oauthURL, "."));
                            params = new url_1.URLSearchParams();
                            params.append("grant_type", "client_credentials");
                            return [4 /*yield*/, this.performAPI(this.oauthURL, __assign(__assign({}, headers), { Authorization: "Basic ".concat(Buffer.from(this.credentials.oauthKey + ":" + this.credentials.oauthSecret).toString("base64")), "Content-Type": "application/x-www-form-urlencoded" }), params, "POST", suppressErrors)];
                        case 3:
                            authResponse = _a.sent();
                            if (!authResponse.ok) return [3 /*break*/, 5];
                            return [4 /*yield*/, authResponse.json()];
                        case 4:
                            jsonResp = _a.sent();
                            this.accessToken = jsonResp["access_token"];
                            return [3 /*break*/, 6];
                        case 5:
                            throwIfNotOk(authResponse);
                            _a.label = 6;
                        case 6:
                            headers["Authorization"] = "Bearer ".concat(this.accessToken);
                            _a.label = 7;
                        case 7:
                            if (!(this.uuid == null)) return [3 /*break*/, 11];
                            this.d("UUID not found, trying to get from ".concat(this.baseURL, "/user"));
                            return [4 /*yield*/, this.performAPI("".concat(this.baseURL, "/user"), headers, null, "GET", suppressErrors)];
                        case 8:
                            profileResponse = _a.sent();
                            if (!profileResponse.ok) return [3 /*break*/, 10];
                            return [4 /*yield*/, profileResponse.json()];
                        case 9:
                            jsonResp = _a.sent();
                            this.uuid = jsonResp["uuid"];
                            return [3 /*break*/, 11];
                        case 10:
                            message = "".concat(profileResponse.status, " - ").concat(profileResponse.statusText);
                            if (profileResponse.status >= 400 && profileResponse.status < 500) {
                                message += " (Have you allowed permission 'account' for this credential?)";
                            }
                            throw new Error(message);
                        case 11: return [2 /*return*/, this.performAPI(url, headers, body, method, suppressErrors)];
                    }
                });
            });
        };
        this.performAPI = function (url, headers, body, method, suppressErrors) {
            if (headers === void 0) { headers = {}; }
            if (body === void 0) { body = {}; }
            _this.d("".concat(method, " ").concat(url));
            // Allow using a proxy configured through environmental variables
            // Remember that to avoid the error "Error: self signed certificate in certificate chain"
            // you should also do: "export NODE_TLS_REJECT_UNAUTHORIZED=0". See: https://github.com/request/request/issues/2061
            var agent = undefined;
            var proxy = process.env.http_proxy || process.env.https_proxy;
            if (proxy) {
                agent = (0, https_proxy_agent_1.default)(proxy);
            }
            return _this.fetch(url, {
                method: method,
                body: body,
                headers: __assign({ "Content-Type": "application/json" }, headers),
                agent: agent,
            }, suppressErrors);
        };
        this.get = function (url, headers, suppressErrors) {
            if (headers === void 0) { headers = {}; }
            return _this.api(url, headers, null, "GET", suppressErrors);
        };
        this.post = function (url, headers, body, suppressErrors) {
            if (headers === void 0) { headers = {}; }
            if (body === void 0) { body = {}; }
            return _this.api(url, headers, JSON.stringify(body), "POST", suppressErrors);
        };
        this.put = function (url, headers, body) {
            if (headers === void 0) { headers = {}; }
            if (body === void 0) { body = {}; }
            return _this.api(url, headers, JSON.stringify(body), "PUT");
        };
        this.delete = function (url, headers, body) {
            if (headers === void 0) { headers = {}; }
            if (body === void 0) { body = {}; }
            return _this.api(url, headers, JSON.stringify(body), "DELETE");
        };
        // This allows Peril to DI in a new Fetch function
        // which can handle unique API edge-cases around integrations
        this.fetch = fetch_1.api;
        // Backward compatible,
        this.uuid = credentials.uuid;
    }
    BitBucketCloudAPI.prototype.getBaseRepoURL = function () {
        var repoSlug = this.repoMetadata.repoSlug;
        return "".concat(this.baseURL, "/repositories/").concat(repoSlug);
    };
    BitBucketCloudAPI.prototype.getPRURL = function () {
        var pullRequestID = this.repoMetadata.pullRequestID;
        return "".concat(this.getBaseRepoURL(), "/pullrequests/").concat(pullRequestID);
    };
    return BitBucketCloudAPI;
}());
exports.BitBucketCloudAPI = BitBucketCloudAPI;
function throwIfNotOk(res) {
    if (!res.ok) {
        var message = "".concat(res.status, " - ").concat(res.statusText);
        if (res.status >= 400 && res.status < 500) {
            message += " (Have you set DANGER_BITBUCKETCLOUD_USERNAME or DANGER_BITBUCKETCLOUD_OAUTH_KEY?)";
        }
        throw new Error(message);
    }
}
//# sourceMappingURL=BitBucketCloudAPI.js.map