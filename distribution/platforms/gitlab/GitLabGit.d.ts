import { GitLabDSL } from "../../dsl/GitLabDSL";
import { GitDSL, GitJSONDSL } from "../../dsl/GitDSL";
import { Types } from "@gitbeaker/node";
import GitLabAPI from "./GitLabAPI";
export declare const gitLabGitDSL: (gitlab: GitLabDSL, json: GitJSONDSL, gitlabAPI: GitLabAPI) => GitDSL;
export declare const gitlabChangesToDiff: (changes: Types.CommitDiffSchema[]) => string;
