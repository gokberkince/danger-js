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
exports.githubJSONToGitHubDSL = exports.GitHub = void 0;
var GitHubUtils_1 = __importDefault(require("./github/GitHubUtils"));
var GitHubGit_1 = __importDefault(require("./github/GitHubGit"));
var issueCommenter_1 = require("./github/comms/issueCommenter");
var checksCommenter_1 = require("./github/comms/checksCommenter");
function GitHub(api) {
    var _this = this;
    /**
     * Converts the PR JSON into something easily used by the Github API client.
     */
    var APIMetadataForPR = function (pr) {
        return {
            number: pr.number,
            pull_number: pr.number,
            repo: pr.base.repo.name,
            owner: pr.base.repo.owner.login,
        };
    };
    /** A quick one off func to ensure there's always some labels */
    var getIssue = function () { return __awaiter(_this, void 0, void 0, function () {
        var issue;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, api.getIssue()];
                case 1:
                    issue = _a.sent();
                    return [2 /*return*/, issue || { labels: [] }];
            }
        });
    }); };
    return __assign(__assign(__assign({ name: "GitHub", api: api, getReviewInfo: api.getPullRequestInfo, getPlatformGitRepresentation: function () { return (0, GitHubGit_1.default)(api); }, getPlatformReviewDSLRepresentation: function () { return __awaiter(_this, void 0, void 0, function () {
            var pr, _a, issue, commits, reviews, requested_reviewers, thisPR;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, api.getPullRequestInfo()];
                    case 1:
                        pr = _b.sent();
                        pr.body = pr.body || "";
                        return [3 /*break*/, 3];
                    case 2:
                        _a = _b.sent();
                        process.exitCode = 1;
                        throw "\n          Could not find pull request information,\n          if you are using a private repo then perhaps\n          Danger does not have permission to access that repo.\n        ";
                    case 3: return [4 /*yield*/, getIssue()];
                    case 4:
                        issue = _b.sent();
                        return [4 /*yield*/, api.getPullRequestCommits()];
                    case 5:
                        commits = _b.sent();
                        return [4 /*yield*/, api.getReviews()];
                    case 6:
                        reviews = _b.sent();
                        return [4 /*yield*/, api.getReviewerRequests()];
                    case 7:
                        requested_reviewers = _b.sent();
                        thisPR = APIMetadataForPR(pr);
                        return [2 /*return*/, {
                                issue: issue,
                                pr: pr,
                                commits: commits,
                                reviews: reviews,
                                requested_reviewers: requested_reviewers,
                                thisPR: thisPR,
                            }];
                }
            });
        }); }, 
        // When there's an event we don't need any of ^
        getPlatformReviewSimpleRepresentation: function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, ({})];
        }); }); } }, (0, issueCommenter_1.GitHubIssueCommenter)(api)), ((0, checksCommenter_1.GitHubChecksCommenter)(api) || {})), { getFileContents: api.fileContents, executeRuntimeEnvironment: executeRuntimeEnvironment });
}
exports.GitHub = GitHub;
// This class should get un-classed, but for now we can expand by functions
var githubJSONToGitHubDSL = function (gh, api) {
    return __assign(__assign({}, gh), { api: api, utils: (0, GitHubUtils_1.default)(gh.pr, api), setSummaryMarkdown: function (markdown) {
            var filePath = process.env.GITHUB_STEP_SUMMARY;
            if (!filePath) {
                throw new Error("process.env.GITHUB_STEP_SUMMARY was not set, which is needed for setSummaryMarkdown");
            }
            (0, fs_1.writeFileSync)(filePath, markdown, "utf8");
        } });
};
exports.githubJSONToGitHubDSL = githubJSONToGitHubDSL;
var override_require_1 = __importDefault(require("override-require"));
var customGitHubRequire_1 = require("./github/customGitHubRequire");
var fs_1 = require("fs");
var cleanDangerfile_1 = __importDefault(require("../runner/runners/utils/cleanDangerfile"));
var transpiler_1 = __importDefault(require("../runner/runners/utils/transpiler"));
var executeRuntimeEnvironment = function (start, dangerfilePath, environment) { return __awaiter(void 0, void 0, void 0, function () {
    var token, restoreOriginalModuleLoader, path, content, remote, rep, msg, dangerfileContent, msg, newDangerfile, defaultExport;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                token = process.env["DANGER_GITHUB_API_TOKEN"] || process.env["GITHUB_TOKEN"];
                restoreOriginalModuleLoader = (0, override_require_1.default)(customGitHubRequire_1.shouldUseGitHubOverride, (0, customGitHubRequire_1.customGitHubResolveRequest)(token));
                remote = false;
                if (!(0, fs_1.existsSync)(dangerfilePath)) return [3 /*break*/, 1];
                path = dangerfilePath;
                content = (0, fs_1.readFileSync)(dangerfilePath, "utf8");
                return [3 /*break*/, 3];
            case 1:
                path = customGitHubRequire_1.dangerPrefix + dangerfilePath;
                rep = (0, customGitHubRequire_1.dangerRepresentationForPath)(dangerfilePath);
                if (!rep.repoSlug) {
                    msg = "if it is local, perhaps you have a typo? If it's using a remote file, it doesn't have a repo reference.";
                    throw new Error("Could not find the Dangerfile at ".concat(dangerfilePath, " - ").concat(msg));
                }
                return [4 /*yield*/, (0, customGitHubRequire_1.getGitHubFileContentsFromLocation)(token, rep, rep.repoSlug)];
            case 2:
                dangerfileContent = _a.sent();
                if (!dangerfileContent) {
                    msg = "does a file exist at ".concat(rep.dangerfilePath, " in ").concat(rep.repoSlug, "?.");
                    throw new Error("Could not find the Dangerfile at ".concat(dangerfilePath, " - ").concat(msg));
                }
                newDangerfile = (0, cleanDangerfile_1.default)(dangerfileContent);
                remote = true;
                // Cool, transpile it into something we can run
                content = (0, transpiler_1.default)(newDangerfile, dangerfilePath, remote);
                _a.label = 3;
            case 3:
                defaultExport = {};
                if ((0, fs_1.existsSync)("/github/workflow/event.json")) {
                    defaultExport = JSON.parse((0, fs_1.readFileSync)("/github/workflow/event.json", "utf8"));
                }
                // Actually start up[ the runtime evaluation
                return [4 /*yield*/, start([[path, remote]], [content], environment, defaultExport)
                    // Undo the runtime
                ];
            case 4:
                // Actually start up[ the runtime evaluation
                _a.sent();
                // Undo the runtime
                restoreOriginalModuleLoader();
                return [2 /*return*/];
        }
    });
}); };
//# sourceMappingURL=GitHub.js.map