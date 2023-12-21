import GitLabAPI from "./gitlab/GitLabAPI";
import { Comment, Platform } from "./platform";
import { GitDSL, GitJSONDSL } from "../dsl/GitDSL";
import { GitLabDSL, GitLabJSONDSL } from "../dsl/GitLabDSL";
import { Types } from "@gitbeaker/node";
declare class GitLab implements Platform {
    readonly api: GitLabAPI;
    readonly name: string;
    constructor(api: GitLabAPI);
    getReviewInfo: () => Promise<any>;
    getPlatformReviewDSLRepresentation: () => Promise<GitLabJSONDSL>;
    getPlatformGitRepresentation: () => Promise<GitJSONDSL>;
    getInlineComments: (dangerID: string) => Promise<Comment[]>;
    supportsCommenting(): boolean;
    supportsInlineComments(): boolean;
    updateOrCreateComment: (dangerID: string, newComment: string) => Promise<string>;
    createComment: (_dangerID: string, comment: string) => Promise<Types.DiscussionNote | undefined>;
    createInlineComment: (git: GitDSL, comment: string, path: string, line: number) => Promise<Types.DiscussionSchema>;
    updateInlineComment: (comment: string, id: string) => Promise<Types.DiscussionNote>;
    deleteInlineComment: (id: string) => Promise<boolean>;
    /**
     * Attempts to delete the "main" Danger comment. If the "main" Danger
     * comment has any comments on it then that comment will not be deleted.
     */
    deleteMainComment: (dangerID: string) => Promise<boolean>;
    deleteNotes: (notes: Types.DiscussionNote[]) => Promise<boolean>;
    /**
     * Only fetches the discussions where danger owns the top note
     */
    getDangerDiscussions: (dangerID: string) => Promise<Types.DiscussionSchema[]>;
    reduceNotesFromDiscussions: (discussions: Types.DiscussionSchema[]) => Types.DiscussionNote[];
    /**
     * Attempts to find the "main" Danger note and should return at most
     * one item. If the "main" Danger note has any comments on it then that
     * note will not be returned.
     */
    getMainDangerNotes: (dangerID: string) => Promise<Types.MergeRequestNoteSchema[]>;
    /**
     * Filters a note to determine if it was created by Danger.
     */
    getDangerDiscussionNoteFilter: (dangerID: string) => Promise<(note: Types.DiscussionNote) => boolean>;
    /**
     * Filters a note to the "main" Danger note. If that note has any
     * comments on it then it will not be found.
     */
    getDangerMainNoteFilter: (dangerID: string) => Promise<(note: Types.MergeRequestNoteSchema) => boolean>;
    updateStatus: () => Promise<boolean>;
    getFileContents: (path: string, slug?: string | undefined, ref?: string | undefined) => Promise<string>;
}
export default GitLab;
export declare const gitlabJSONToGitLabDSL: (gl: GitLabDSL, api: GitLabAPI) => GitLabDSL;
