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
exports.getGitLabAPICredentialsFromEnv = void 0;
var node_1 = require("@gitbeaker/node");
var debug_1 = require("../../debug");
function getGitLabAPICredentialsFromEnv(env) {
    var host = "https://gitlab.com";
    var envHost = env["DANGER_GITLAB_HOST"];
    var envCIAPI = env["CI_API_V4_URL"];
    if (envHost) {
        // We used to support DANGER_GITLAB_HOST being just the host e.g. "gitlab.com"
        // however it is possible to have a custom host without SSL, ensure we only add the protocol if one is not provided
        var protocolRegex = /^https?:\/\//i;
        host = protocolRegex.test(envHost) ? envHost : "https://".concat(envHost);
    }
    else if (envCIAPI) {
        // GitLab >= v11.7 supplies the API Endpoint in an environment variable, and we can work out our host value from
        // that. See https://docs.gitlab.com/ce/ci/variables/predefined_variables.html
        var hostRegex = /^(https?):\/\/([^\/]+)\//i;
        if (hostRegex.test(envCIAPI)) {
            var matches = hostRegex.exec(envCIAPI);
            var matchProto = matches[1];
            var matchHost = matches[2];
            host = "".concat(matchProto, "://").concat(matchHost);
        }
    }
    return {
        host: host,
        token: env["DANGER_GITLAB_API_TOKEN"],
        oauthToken: env["DANGER_GITLAB_API_OAUTH_TOKEN"],
    };
}
exports.getGitLabAPICredentialsFromEnv = getGitLabAPICredentialsFromEnv;
var GitLabAPI = /** @class */ (function () {
    function GitLabAPI(repoMetadata, repoCredentials) {
        var _this = this;
        this.repoMetadata = repoMetadata;
        this.repoCredentials = repoCredentials;
        this.d = (0, debug_1.debug)("GitLabAPI");
        this.getUser = function () { return __awaiter(_this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.d("getUser");
                        return [4 /*yield*/, this.api.Users.current()];
                    case 1:
                        user = (_a.sent());
                        this.d("getUser", user);
                        return [2 /*return*/, user];
                }
            });
        }); };
        this.getMergeRequestInfo = function () { return __awaiter(_this, void 0, void 0, function () {
            var mr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.d("getMergeRequestInfo for repo: ".concat(this.repoSlug, " pr: ").concat(this.prId));
                        return [4 /*yield*/, this.api.MergeRequests.show(this.repoSlug, this.prId)];
                    case 1:
                        mr = _a.sent();
                        this.d("getMergeRequestInfo", mr);
                        return [2 /*return*/, mr];
                }
            });
        }); };
        this.updateMergeRequestInfo = function (changes) { return __awaiter(_this, void 0, void 0, function () {
            var mr;
            return __generator(this, function (_a) {
                mr = this.api.MergeRequests.edit(this.repoSlug, this.prId, changes);
                this.d("updateMergeRequestInfo", mr);
                return [2 /*return*/, mr];
            });
        }); };
        this.getMergeRequestApprovals = function () { return __awaiter(_this, void 0, void 0, function () {
            var approvals;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.d("getMergeRequestApprovals for repo: ".concat(this.repoSlug, " pr: ").concat(this.prId));
                        return [4 /*yield*/, this.api.MergeRequestApprovals.configuration(this.repoSlug, {
                                mergerequestIid: this.prId,
                            })];
                    case 1:
                        approvals = _a.sent();
                        this.d("getMergeRequestApprovals", approvals);
                        return [2 /*return*/, approvals];
                }
            });
        }); };
        this.getMergeRequestChanges = function () { return __awaiter(_this, void 0, void 0, function () {
            var mr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.d("getMergeRequestChanges for repo: ".concat(this.repoSlug, " pr: ").concat(this.prId));
                        return [4 /*yield*/, this.api.MergeRequests.changes(this.repoSlug, this.prId)];
                    case 1:
                        mr = _a.sent();
                        this.d("getMergeRequestChanges", mr.changes);
                        return [2 /*return*/, mr.changes];
                }
            });
        }); };
        this.getMergeRequestCommits = function () { return __awaiter(_this, void 0, void 0, function () {
            var commits;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.d("getMergeRequestCommits", this.repoSlug, this.prId);
                        return [4 /*yield*/, this.api.MergeRequests.commits(this.repoSlug, this.prId)];
                    case 1:
                        commits = _a.sent();
                        this.d("getMergeRequestCommits", commits);
                        return [2 /*return*/, commits];
                }
            });
        }); };
        this.getMergeRequestDiscussions = function () { return __awaiter(_this, void 0, void 0, function () {
            var api, discussions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.d("getMergeRequestDiscussions", this.repoSlug, this.prId);
                        api = this.api.MergeRequestDiscussions;
                        return [4 /*yield*/, api.all(this.repoSlug, this.prId, {})];
                    case 1:
                        discussions = _a.sent();
                        this.d("getMergeRequestDiscussions", discussions);
                        return [2 /*return*/, discussions];
                }
            });
        }); };
        this.getMergeRequestNotes = function () { return __awaiter(_this, void 0, void 0, function () {
            var api, notes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.d("getMergeRequestNotes", this.repoSlug, this.prId);
                        api = this.api.MergeRequestNotes;
                        return [4 /*yield*/, api.all(this.repoSlug, this.prId, {})];
                    case 1:
                        notes = _a.sent();
                        this.d("getMergeRequestNotes", notes);
                        return [2 /*return*/, notes];
                }
            });
        }); };
        this.getMergeRequestInlineNotes = function () { return __awaiter(_this, void 0, void 0, function () {
            var notes, inlineNotes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.d("getMergeRequestInlineNotes");
                        return [4 /*yield*/, this.getMergeRequestNotes()];
                    case 1:
                        notes = _a.sent();
                        inlineNotes = notes.filter(function (note) { return note.type == "DiffNote"; });
                        this.d("getMergeRequestInlineNotes", inlineNotes);
                        return [2 /*return*/, inlineNotes];
                }
            });
        }); };
        this.createMergeRequestDiscussion = function (content, options) { return __awaiter(_this, void 0, void 0, function () {
            var api, result, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.d("createMergeRequestDiscussion", this.repoSlug, this.prId, content, options);
                        api = this.api.MergeRequestDiscussions;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, api.create(this.repoSlug, this.prId, content, options)];
                    case 2:
                        result = _a.sent();
                        this.d("createMergeRequestDiscussion", result);
                        return [2 /*return*/, result];
                    case 3:
                        e_1 = _a.sent();
                        this.d("createMergeRequestDiscussion", e_1);
                        throw e_1;
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.createMergeRequestNote = function (body) { return __awaiter(_this, void 0, void 0, function () {
            var note, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.d("createMergeRequestNote", this.repoSlug, this.prId, body);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.d("createMergeRequestNote");
                        return [4 /*yield*/, this.api.MergeRequestNotes.create(this.repoSlug, this.prId, body)];
                    case 2:
                        note = _a.sent();
                        this.d("createMergeRequestNote", note);
                        return [2 /*return*/, note];
                    case 3:
                        e_2 = _a.sent();
                        this.d("createMergeRequestNote", e_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, Promise.reject()];
                }
            });
        }); };
        this.updateMergeRequestNote = function (id, body) { return __awaiter(_this, void 0, void 0, function () {
            var note, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.d("updateMergeRequestNote", this.repoSlug, this.prId, id, body);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.api.MergeRequestNotes.edit(this.repoSlug, this.prId, id, body)];
                    case 2:
                        note = _a.sent();
                        this.d("updateMergeRequestNote", note);
                        return [2 /*return*/, note];
                    case 3:
                        e_3 = _a.sent();
                        this.d("updateMergeRequestNote", e_3);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, Promise.reject()];
                }
            });
        }); };
        // note: deleting the _only_ note in a discussion also deletes the discussion \o/
        this.deleteMergeRequestNote = function (id) { return __awaiter(_this, void 0, void 0, function () {
            var e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.d("deleteMergeRequestNote", this.repoSlug, this.prId, id);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.api.MergeRequestNotes.remove(this.repoSlug, this.prId, id)];
                    case 2:
                        _a.sent();
                        this.d("deleteMergeRequestNote", true);
                        return [2 /*return*/, true];
                    case 3:
                        e_4 = _a.sent();
                        this.d("deleteMergeRequestNote", e_4);
                        return [2 /*return*/, false];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.getFileContents = function (path, slug, ref) { return __awaiter(_this, void 0, void 0, function () {
            var api, projectId, mr, response, result, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.d("getFileContents requested for path:".concat(path, ", slug:").concat(slug, ", ref:").concat(ref));
                        api = this.api.RepositoryFiles;
                        projectId = slug || this.repoSlug;
                        if (!!ref) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getMergeRequestInfo()];
                    case 1:
                        mr = _a.sent();
                        ref = mr.diff_refs.head_sha;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        this.d("getFileContents", projectId, path, ref);
                        return [4 /*yield*/, api.show(projectId, path, ref)];
                    case 3:
                        response = _a.sent();
                        result = Buffer.from(response.content, response.encoding).toString();
                        this.d("getFileContents", result);
                        return [2 /*return*/, result];
                    case 4:
                        e_5 = _a.sent();
                        this.d("getFileContents", e_5);
                        // GitHubAPI.fileContents returns "" when the file does not exist, keep it consistent across providers
                        if (e_5.response.statusCode === 404) {
                            return [2 /*return*/, ""];
                        }
                        throw e_5;
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.getCompareChanges = function (base, head) { return __awaiter(_this, void 0, void 0, function () {
            var api, projectId, compare;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!base || !head) {
                            return [2 /*return*/, this.getMergeRequestChanges()];
                        }
                        api = this.api.Repositories;
                        projectId = this.repoSlug;
                        return [4 /*yield*/, api.compare(projectId, base, head)];
                    case 1:
                        compare = _a.sent();
                        return [2 /*return*/, compare.diffs ? compare.diffs : []];
                }
            });
        }); };
        this.addLabels = function () {
            var labels = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                labels[_i] = arguments[_i];
            }
            return __awaiter(_this, void 0, void 0, function () {
                var mr, noDuplicates;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getMergeRequestInfo()];
                        case 1:
                            mr = _a.sent();
                            noDuplicates = new Set(__spreadArray(__spreadArray([], mr.labels, true), labels, true));
                            return [4 /*yield*/, this.updateMergeRequestInfo({ labels: Array.from(noDuplicates).join(",") })];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, true];
                    }
                });
            });
        };
        this.removeLabels = function () {
            var labels = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                labels[_i] = arguments[_i];
            }
            return __awaiter(_this, void 0, void 0, function () {
                var mr, _a, labels_1, label, index;
                var _b, _c, _d;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0: return [4 /*yield*/, this.getMergeRequestInfo()];
                        case 1:
                            mr = _e.sent();
                            for (_a = 0, labels_1 = labels; _a < labels_1.length; _a++) {
                                label = labels_1[_a];
                                index = (_b = mr.labels) === null || _b === void 0 ? void 0 : _b.indexOf(label);
                                if (index > -1) {
                                    (_c = mr.labels) === null || _c === void 0 ? void 0 : _c.splice(index, 1);
                                }
                            }
                            return [4 /*yield*/, this.updateMergeRequestInfo({ labels: (_d = mr.labels) === null || _d === void 0 ? void 0 : _d.join(",") })];
                        case 2:
                            _e.sent();
                            return [2 /*return*/, true];
                    }
                });
            });
        };
        this.api = new node_1.Gitlab(repoCredentials);
        this.hostURL = repoCredentials.host;
        this.repoSlug = repoMetadata.repoSlug;
        this.prId = Number(repoMetadata.pullRequestID);
    }
    Object.defineProperty(GitLabAPI.prototype, "projectURL", {
        get: function () {
            return "".concat(this.hostURL, "/").concat(this.repoSlug);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GitLabAPI.prototype, "mergeRequestURL", {
        get: function () {
            return "".concat(this.projectURL, "/merge_requests/").concat(this.prId);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GitLabAPI.prototype, "apiInstance", {
        get: function () {
            return this.api;
        },
        enumerable: false,
        configurable: true
    });
    return GitLabAPI;
}());
exports.default = GitLabAPI;
//# sourceMappingURL=GitLabAPI.js.map