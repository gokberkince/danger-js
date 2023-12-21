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
        while (_) try {
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
exports.gitlabJSONToGitLabDSL = void 0;
var debug_1 = require("../debug");
var githubIssueTemplate_1 = require("../runner/templates/githubIssueTemplate");
var d = (0, debug_1.debug)("GitLab");
/**
 * Determines whether Danger should use threads for the "main" Danger comment.
 */
var useThreads = function () {
    return process.env.DANGER_GITLAB_USE_THREADS === "1" || process.env.DANGER_GITLAB_USE_THREADS === "true";
};
var GitLab = /** @class */ (function () {
    function GitLab(api) {
        var _this = this;
        this.api = api;
        this.getReviewInfo = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.api.getMergeRequestInfo()];
            });
        }); };
        // returns the `danger.gitlab` object
        this.getPlatformReviewDSLRepresentation = function () { return __awaiter(_this, void 0, void 0, function () {
            var mr, commits, approvals;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getReviewInfo()];
                    case 1:
                        mr = _a.sent();
                        return [4 /*yield*/, this.api.getMergeRequestCommits()];
                    case 2:
                        commits = _a.sent();
                        return [4 /*yield*/, this.api.getMergeRequestApprovals()];
                    case 3:
                        approvals = _a.sent();
                        return [2 /*return*/, {
                                metadata: this.api.repoMetadata,
                                mr: mr,
                                commits: commits,
                                approvals: approvals,
                            }];
                }
            });
        }); };
        // TODO: test
        this.getPlatformGitRepresentation = function () { return __awaiter(_this, void 0, void 0, function () {
            var changes, commits, mappedCommits, modified_files, created_files, deleted_files;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.api.getMergeRequestChanges()];
                    case 1:
                        changes = _a.sent();
                        return [4 /*yield*/, this.api.getMergeRequestCommits()];
                    case 2:
                        commits = _a.sent();
                        mappedCommits = commits.map(function (commit) {
                            return {
                                sha: commit.id,
                                author: {
                                    name: commit.author_name,
                                    email: commit.author_email,
                                    date: commit.authored_date.toString(),
                                },
                                committer: {
                                    name: commit.committer_name,
                                    email: commit.committer_email,
                                    date: commit.committed_date.toString(),
                                },
                                message: commit.message,
                                parents: commit.parent_ids,
                                url: "".concat(_this.api.projectURL, "/commit/").concat(commit.id),
                                tree: null,
                            };
                        });
                        modified_files = changes
                            .filter(function (change) { return !change.new_file && !change.deleted_file; })
                            .map(function (change) { return change.new_path; });
                        created_files = changes.filter(function (change) { return change.new_file; }).map(function (change) { return change.new_path; });
                        deleted_files = changes.filter(function (change) { return change.deleted_file; }).map(function (change) { return change.new_path; });
                        return [2 /*return*/, {
                                modified_files: modified_files,
                                created_files: created_files,
                                deleted_files: deleted_files,
                                commits: mappedCommits,
                            }];
                }
            });
        }); };
        this.getInlineComments = function (dangerID) { return __awaiter(_this, void 0, void 0, function () {
            var dangerUserID;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.api.getUser()];
                    case 1:
                        dangerUserID = (_a.sent()).id;
                        return [4 /*yield*/, this.api.getMergeRequestInlineNotes()];
                    case 2: return [2 /*return*/, (_a.sent()).map(function (note) {
                            return {
                                id: "".concat(note.id),
                                body: note.body,
                                ownedByDanger: note.author.id === dangerUserID && note.body.includes(dangerID),
                            };
                        })];
                }
            });
        }); };
        this.updateOrCreateComment = function (dangerID, newComment) { return __awaiter(_this, void 0, void 0, function () {
            var discussions, firstDiscussion, existingNote, newOrUpdatedNote, notes, note, _i, notes_1, deleteme;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        d("updateOrCreateComment", { dangerID: dangerID, newComment: newComment });
                        if (!useThreads()) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.getDangerDiscussions(dangerID)];
                    case 1:
                        discussions = _b.sent();
                        firstDiscussion = discussions.shift();
                        existingNote = (_a = firstDiscussion === null || firstDiscussion === void 0 ? void 0 : firstDiscussion.notes) === null || _a === void 0 ? void 0 : _a[0];
                        // Delete all notes from all other danger discussions (discussions cannot be deleted as a whole):
                        return [4 /*yield*/, this.deleteNotes(this.reduceNotesFromDiscussions(discussions))]; //delete the rest
                    case 2:
                        // Delete all notes from all other danger discussions (discussions cannot be deleted as a whole):
                        _b.sent(); //delete the rest
                        newOrUpdatedNote = void 0;
                        if (!existingNote) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.api.updateMergeRequestNote(existingNote.id, newComment)];
                    case 3:
                        // update the existing comment
                        newOrUpdatedNote = _b.sent();
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, this.createComment(dangerID, newComment)];
                    case 5:
                        // create a new comment
                        newOrUpdatedNote = _b.sent();
                        _b.label = 6;
                    case 6:
                        if (!newOrUpdatedNote) {
                            throw new Error("Could not update or create comment");
                        }
                        // create URL from note
                        // "https://gitlab.com/group/project/merge_requests/154#note_132143425"
                        return [2 /*return*/, "".concat(this.api.mergeRequestURL, "#note_").concat(newOrUpdatedNote.id)];
                    case 7: return [4 /*yield*/, this.getMainDangerNotes(dangerID)];
                    case 8:
                        notes = _b.sent();
                        note = void 0;
                        if (!notes.length) return [3 /*break*/, 14];
                        return [4 /*yield*/, this.api.updateMergeRequestNote(notes[0].id, newComment)
                            // delete the rest
                        ];
                    case 9:
                        // update the first
                        note = _b.sent();
                        _i = 0, notes_1 = notes;
                        _b.label = 10;
                    case 10:
                        if (!(_i < notes_1.length)) return [3 /*break*/, 13];
                        deleteme = notes_1[_i];
                        if (deleteme === notes[0]) {
                            return [3 /*break*/, 12];
                        }
                        return [4 /*yield*/, this.api.deleteMergeRequestNote(deleteme.id)];
                    case 11:
                        _b.sent();
                        _b.label = 12;
                    case 12:
                        _i++;
                        return [3 /*break*/, 10];
                    case 13: return [3 /*break*/, 16];
                    case 14: return [4 /*yield*/, this.api.createMergeRequestNote(newComment)];
                    case 15:
                        // create a new note
                        note = _b.sent();
                        _b.label = 16;
                    case 16: 
                    // create URL from note
                    // "https://gitlab.com/group/project/merge_requests/154#note_132143425"
                    return [2 /*return*/, "".concat(this.api.mergeRequestURL, "#note_").concat(note.id)];
                }
            });
        }); };
        this.createComment = function (_dangerID, comment) { return __awaiter(_this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        d("createComment", { comment: comment });
                        if (!useThreads()) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.api.createMergeRequestDiscussion(comment)];
                    case 1: return [2 /*return*/, (_b = (_a = (_c.sent())) === null || _a === void 0 ? void 0 : _a.notes) === null || _b === void 0 ? void 0 : _b[0]];
                    case 2: return [2 /*return*/, this.api.createMergeRequestNote(comment)];
                }
            });
        }); };
        this.createInlineComment = function (git, comment, path, line) { return __awaiter(_this, void 0, void 0, function () {
            var mr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        d("createInlineComment", { git: git, comment: comment, path: path, line: line });
                        return [4 /*yield*/, this.api.getMergeRequestInfo()];
                    case 1:
                        mr = _a.sent();
                        return [2 /*return*/, this.api.createMergeRequestDiscussion(comment, {
                                position: {
                                    position_type: "text",
                                    base_sha: mr.diff_refs.base_sha,
                                    start_sha: mr.diff_refs.start_sha,
                                    head_sha: mr.diff_refs.head_sha,
                                    old_path: path,
                                    old_line: undefined,
                                    new_path: path,
                                    new_line: line,
                                },
                            })];
                }
            });
        }); };
        this.updateInlineComment = function (comment, id) { return __awaiter(_this, void 0, void 0, function () {
            var nid;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        d("updateInlineComment", { comment: comment, id: id });
                        nid = parseInt(id) // fingers crossed
                        ;
                        return [4 /*yield*/, this.api.updateMergeRequestNote(nid, comment)];
                    case 1: // fingers crossed
                    return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.deleteInlineComment = function (id) { return __awaiter(_this, void 0, void 0, function () {
            var nid;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        d("deleteInlineComment", { id: id });
                        nid = parseInt(id) // fingers crossed
                        ;
                        return [4 /*yield*/, this.api.deleteMergeRequestNote(nid)];
                    case 1: // fingers crossed
                    return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        /**
         * Attempts to delete the "main" Danger comment. If the "main" Danger
         * comment has any comments on it then that comment will not be deleted.
         */
        this.deleteMainComment = function (dangerID) { return __awaiter(_this, void 0, void 0, function () {
            var discussions, notes, _i, notes_2, note;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!useThreads()) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.getDangerDiscussions(dangerID)];
                    case 1:
                        discussions = _a.sent();
                        return [4 /*yield*/, this.deleteNotes(this.reduceNotesFromDiscussions(discussions))];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3: return [4 /*yield*/, this.getMainDangerNotes(dangerID)];
                    case 4:
                        notes = _a.sent();
                        _i = 0, notes_2 = notes;
                        _a.label = 5;
                    case 5:
                        if (!(_i < notes_2.length)) return [3 /*break*/, 8];
                        note = notes_2[_i];
                        d("deleteMainComment", { id: note.id });
                        return [4 /*yield*/, this.api.deleteMergeRequestNote(note.id)];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7:
                        _i++;
                        return [3 /*break*/, 5];
                    case 8: return [2 /*return*/, notes.length > 0];
                }
            });
        }); };
        this.deleteNotes = function (notes) { return __awaiter(_this, void 0, void 0, function () {
            var _i, notes_3, note;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _i = 0, notes_3 = notes;
                        _a.label = 1;
                    case 1:
                        if (!(_i < notes_3.length)) return [3 /*break*/, 4];
                        note = notes_3[_i];
                        d("deleteNotes", { id: note.id });
                        return [4 /*yield*/, this.api.deleteMergeRequestNote(note.id)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, notes.length > 0];
                }
            });
        }); };
        /**
         * Only fetches the discussions where danger owns the top note
         */
        this.getDangerDiscussions = function (dangerID) { return __awaiter(_this, void 0, void 0, function () {
            var noteFilter, discussions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getDangerDiscussionNoteFilter(dangerID)];
                    case 1:
                        noteFilter = _a.sent();
                        return [4 /*yield*/, this.api.getMergeRequestDiscussions()];
                    case 2:
                        discussions = _a.sent();
                        return [2 /*return*/, discussions.filter(function (_a) {
                                var notes = _a.notes;
                                return notes && notes.length && noteFilter(notes[0]);
                            })];
                }
            });
        }); };
        this.reduceNotesFromDiscussions = function (discussions) {
            return discussions.reduce(function (acc, _a) {
                var notes = _a.notes;
                notes = notes || [];
                return __spreadArray(__spreadArray([], acc, true), notes, true);
            }, []);
        };
        /**
         * Attempts to find the "main" Danger note and should return at most
         * one item. If the "main" Danger note has any comments on it then that
         * note will not be returned.
         */
        this.getMainDangerNotes = function (dangerID) { return __awaiter(_this, void 0, void 0, function () {
            var noteFilter, notes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getDangerMainNoteFilter(dangerID)];
                    case 1:
                        noteFilter = _a.sent();
                        return [4 /*yield*/, this.api.getMergeRequestNotes()];
                    case 2:
                        notes = _a.sent();
                        return [2 /*return*/, notes.filter(noteFilter)];
                }
            });
        }); };
        /**
         * Filters a note to determine if it was created by Danger.
         */
        this.getDangerDiscussionNoteFilter = function (dangerID) { return __awaiter(_this, void 0, void 0, function () {
            var dangerUserId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.api.getUser()];
                    case 1:
                        dangerUserId = (_a.sent()).id;
                        return [2 /*return*/, function (_a) {
                                var id = _a.author.id, body = _a.body, system = _a.system;
                                return (!system && // system notes are generated when the user interacts with the UI e.g. changing a PR title
                                    id === dangerUserId &&
                                    body.includes((0, githubIssueTemplate_1.dangerIDToString)(dangerID)));
                            }];
                }
            });
        }); };
        /**
         * Filters a note to the "main" Danger note. If that note has any
         * comments on it then it will not be found.
         */
        this.getDangerMainNoteFilter = function (dangerID) { return __awaiter(_this, void 0, void 0, function () {
            var dangerUserId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.api.getUser()];
                    case 1:
                        dangerUserId = (_a.sent()).id;
                        return [2 /*return*/, function (_a) {
                                var id = _a.author.id, body = _a.body, system = _a.system, type = _a.type;
                                return (!system && // system notes are generated when the user interacts with the UI e.g. changing a PR title
                                    id === dangerUserId &&
                                    // This check for the type being `null` seems to be the best option
                                    // we have to determine whether this note is the "main" Danger note.
                                    // This assumption does not hold if there are any comments on the
                                    // "main" Danger note and in that case a new "main" Danger note will
                                    // be created instead of updating the existing note. This behavior is better
                                    // than the current alternative which is the bug described here:
                                    // https://github.com/danger/danger-js/issues/1351
                                    type == null &&
                                    body.includes((0, githubIssueTemplate_1.dangerIDToString)(dangerID)));
                            }];
                }
            });
        }); };
        this.updateStatus = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                d("updateStatus", {});
                return [2 /*return*/, true];
            });
        }); };
        this.getFileContents = this.api.getFileContents;
        this.name = "GitLab";
    }
    GitLab.prototype.supportsCommenting = function () {
        return true;
    };
    GitLab.prototype.supportsInlineComments = function () {
        return true;
    };
    return GitLab;
}());
exports.default = GitLab;
var gitlabJSONToGitLabDSL = function (gl, api) { return (__assign(__assign({}, gl), { utils: {
        fileContents: api.getFileContents,
        addLabels: api.addLabels,
        removeLabels: api.removeLabels,
    }, api: api.apiInstance })); };
exports.gitlabJSONToGitLabDSL = gitlabJSONToGitLabDSL;
//# sourceMappingURL=GitLab.js.map