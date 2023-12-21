import { RepoMetaData } from "../../dsl/RepoMetaData";
import { Gitlab, Types } from "@gitbeaker/node";
import { ExpandedMergeRequestSchema as ExpandedMergeRequestSchema } from "@gitbeaker/core/dist";
import { Env } from "../../ci_source/ci_source";
export declare type GitLabAPIToken = string;
export declare type GitLabOAuthToken = string;
export interface GitLabAPICredentials {
    host: string;
    token?: GitLabAPIToken;
    oauthToken?: GitLabOAuthToken;
}
export declare function getGitLabAPICredentialsFromEnv(env: Env): GitLabAPICredentials;
declare class GitLabAPI {
    readonly repoMetadata: RepoMetaData;
    readonly repoCredentials: GitLabAPICredentials;
    private readonly api;
    private readonly hostURL;
    private readonly d;
    private readonly repoSlug;
    private readonly prId;
    constructor(repoMetadata: RepoMetaData, repoCredentials: GitLabAPICredentials);
    get projectURL(): string;
    get mergeRequestURL(): string;
    get apiInstance(): InstanceType<typeof Gitlab>;
    getUser: () => Promise<Types.UserExtendedSchema>;
    getMergeRequestInfo: () => Promise<ExpandedMergeRequestSchema>;
    updateMergeRequestInfo: (changes: Types.UpdateMergeRequestOptions & Types.BaseRequestOptions) => Promise<Types.MergeRequestSchema>;
    getMergeRequestApprovals: () => Promise<Types.MergeRequestLevelMergeRequestApprovalSchema>;
    getMergeRequestChanges: () => Promise<Types.CommitDiffSchema[]>;
    getMergeRequestCommits: () => Promise<Types.CommitSchema[]>;
    getMergeRequestDiscussions: () => Promise<Types.DiscussionSchema[]>;
    getMergeRequestNotes: () => Promise<Types.MergeRequestNoteSchema[]>;
    getMergeRequestInlineNotes: () => Promise<Types.MergeRequestNoteSchema[]>;
    createMergeRequestDiscussion: (content: string, options?: ({
        position?: Partial<Types.DiscussionNotePosition> | undefined;
    } & Types.Sudo & Record<string, unknown>) | undefined) => Promise<Types.DiscussionSchema>;
    createMergeRequestNote: (body: string) => Promise<Types.DiscussionNote>;
    updateMergeRequestNote: (id: number, body: string) => Promise<Types.DiscussionNote>;
    deleteMergeRequestNote: (id: number) => Promise<boolean>;
    getFileContents: (path: string, slug?: string | undefined, ref?: string | undefined) => Promise<string>;
    getCompareChanges: (base?: string | undefined, head?: string | undefined) => Promise<Types.CommitDiffSchema[]>;
    addLabels: (...labels: string[]) => Promise<boolean>;
    removeLabels: (...labels: string[]) => Promise<boolean>;
}
export default GitLabAPI;
