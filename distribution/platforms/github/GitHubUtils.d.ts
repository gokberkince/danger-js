import { components as OctokitOpenApiTypes } from "@octokit/openapi-types";
import { GitHubPRDSL, GitHubUtilsDSL } from "./../../dsl/GitHubDSL";
export type GetContentResponseData = OctokitOpenApiTypes["schemas"]["content-file"] | OctokitOpenApiTypes["schemas"]["content-symlink"] | OctokitOpenApiTypes["schemas"]["content-submodule"];
export declare function isFileContents(response: GetContentResponseData): response is OctokitOpenApiTypes["schemas"]["content-file"];
import { Octokit as GitHub } from "@octokit/rest";
declare const utils: (pr: GitHubPRDSL | undefined, api: GitHub) => GitHubUtilsDSL;
/** Generates the fileContents function, needed so that Peril can re-create this func for an event */
export declare const fileContentsGenerator: (api: GitHub, defaultRepoSlug: string | undefined, defaultRef: string | undefined) => (path: string, repoSlug?: string, ref?: string) => Promise<string>;
/** Generates the createUpdatedIssueWithID function, needed so that Peril can re-create this func for an event */
export declare const createUpdatedIssueWithIDGenerator: (api: GitHub) => (id: string, content: string, settings: {
    title: string;
    open: boolean;
    owner: string;
    repo: string;
}) => Promise<string>;
interface PRCreationConfig {
    /** PR title */
    title: string;
    /** PR body */
    body: string;
    /** The danger in danger/danger-js - defaults to the PR base name if undefined */
    owner?: string;
    /** The danger-js in danger/danger-js - defaults to the PR base repo if undefined */
    repo?: string;
    /** A message for the commit */
    commitMessage: string;
    /** The name of the branch on the repo */
    newBranchName: string;
    /** Base branch for the new branch e.g. what should Danger create the new branch from */
    baseBranch: string;
}
export declare const createOrUpdatePR: (pr: GitHubPRDSL | undefined, api: GitHub) => (config: PRCreationConfig, fileMap: any) => Promise<import("@octokit/types").OctokitResponse<{
    url: string;
    id: number;
    node_id: string;
    html_url: string;
    diff_url: string;
    patch_url: string;
    issue_url: string;
    commits_url: string;
    review_comments_url: string;
    review_comment_url: string;
    comments_url: string;
    statuses_url: string;
    number: number;
    state: "closed" | "open";
    locked: boolean;
    title: string;
    user: {
        name?: string | null | undefined;
        email?: string | null | undefined;
        login: string;
        id: number;
        node_id: string;
        avatar_url: string;
        gravatar_id: string | null;
        url: string;
        html_url: string;
        followers_url: string;
        following_url: string;
        gists_url: string;
        starred_url: string;
        subscriptions_url: string;
        organizations_url: string;
        repos_url: string;
        events_url: string;
        received_events_url: string;
        type: string;
        site_admin: boolean;
        starred_at?: string | undefined;
    } | null;
    body: string | null;
    labels: {
        id: number;
        node_id: string;
        url: string;
        name: string;
        description: string | null;
        color: string;
        default: boolean;
    }[];
    milestone: {
        url: string;
        html_url: string;
        labels_url: string;
        id: number;
        node_id: string;
        number: number;
        state: "closed" | "open";
        title: string;
        description: string | null;
        creator: {
            name?: string | null | undefined;
            email?: string | null | undefined;
            login: string;
            id: number;
            node_id: string;
            avatar_url: string;
            gravatar_id: string | null;
            url: string;
            html_url: string;
            followers_url: string;
            following_url: string;
            gists_url: string;
            starred_url: string;
            subscriptions_url: string;
            organizations_url: string;
            repos_url: string;
            events_url: string;
            received_events_url: string;
            type: string;
            site_admin: boolean;
            starred_at?: string | undefined;
        } | null;
        open_issues: number;
        closed_issues: number;
        created_at: string;
        updated_at: string;
        closed_at: string | null;
        due_on: string | null;
    } | null;
    active_lock_reason?: string | null | undefined;
    created_at: string;
    updated_at: string;
    closed_at: string | null;
    merged_at: string | null;
    merge_commit_sha: string | null;
    assignee: {
        name?: string | null | undefined;
        email?: string | null | undefined;
        login: string;
        id: number;
        node_id: string;
        avatar_url: string;
        gravatar_id: string | null;
        url: string;
        html_url: string;
        followers_url: string;
        following_url: string;
        gists_url: string;
        starred_url: string;
        subscriptions_url: string;
        organizations_url: string;
        repos_url: string;
        events_url: string;
        received_events_url: string;
        type: string;
        site_admin: boolean;
        starred_at?: string | undefined;
    } | null;
    assignees?: {
        name?: string | null | undefined;
        email?: string | null | undefined;
        login: string;
        id: number;
        node_id: string;
        avatar_url: string;
        gravatar_id: string | null;
        url: string;
        html_url: string;
        followers_url: string;
        following_url: string;
        gists_url: string;
        starred_url: string;
        subscriptions_url: string;
        organizations_url: string;
        repos_url: string;
        events_url: string;
        received_events_url: string;
        type: string;
        site_admin: boolean;
        starred_at?: string | undefined;
    }[] | null | undefined;
    requested_reviewers?: {
        name?: string | null | undefined;
        email?: string | null | undefined;
        login: string;
        id: number;
        node_id: string;
        avatar_url: string;
        gravatar_id: string | null;
        url: string;
        html_url: string;
        followers_url: string;
        following_url: string;
        gists_url: string;
        starred_url: string;
        subscriptions_url: string;
        organizations_url: string;
        repos_url: string;
        events_url: string;
        received_events_url: string;
        type: string;
        site_admin: boolean;
        starred_at?: string | undefined;
    }[] | null | undefined;
    requested_teams?: {
        id: number;
        node_id: string;
        url: string;
        members_url: string;
        name: string;
        description: string | null;
        permission: string;
        privacy?: string | undefined;
        html_url: string;
        repositories_url: string;
        slug: string;
        ldap_dn?: string | undefined;
    }[] | null | undefined;
    head: {
        label: string;
        ref: string;
        repo: {
            archive_url: string;
            assignees_url: string;
            blobs_url: string;
            branches_url: string;
            collaborators_url: string;
            comments_url: string;
            commits_url: string;
            compare_url: string;
            contents_url: string;
            contributors_url: string;
            deployments_url: string;
            description: string | null;
            downloads_url: string;
            events_url: string;
            fork: boolean;
            forks_url: string;
            full_name: string;
            git_commits_url: string;
            git_refs_url: string;
            git_tags_url: string;
            hooks_url: string;
            html_url: string;
            id: number;
            node_id: string;
            issue_comment_url: string;
            issue_events_url: string;
            issues_url: string;
            keys_url: string;
            labels_url: string;
            languages_url: string;
            merges_url: string;
            milestones_url: string;
            name: string;
            notifications_url: string;
            owner: {
                avatar_url: string;
                events_url: string;
                followers_url: string;
                following_url: string;
                gists_url: string;
                gravatar_id: string | null;
                html_url: string;
                id: number;
                node_id: string;
                login: string;
                organizations_url: string;
                received_events_url: string;
                repos_url: string;
                site_admin: boolean;
                starred_url: string;
                subscriptions_url: string;
                type: string;
                url: string;
            };
            private: boolean;
            pulls_url: string;
            releases_url: string;
            stargazers_url: string;
            statuses_url: string;
            subscribers_url: string;
            subscription_url: string;
            tags_url: string;
            teams_url: string;
            trees_url: string;
            url: string;
            clone_url: string;
            default_branch: string;
            forks: number;
            forks_count: number;
            git_url: string;
            has_downloads: boolean;
            has_issues: boolean;
            has_projects: boolean;
            has_wiki: boolean;
            has_pages: boolean;
            homepage: string | null;
            language: string | null;
            master_branch?: string | undefined;
            archived: boolean;
            disabled: boolean;
            visibility?: string | undefined;
            mirror_url: string | null;
            open_issues: number;
            open_issues_count: number;
            permissions?: {
                admin: boolean;
                maintain?: boolean | undefined;
                push: boolean;
                triage?: boolean | undefined;
                pull: boolean;
            } | undefined;
            temp_clone_token?: string | undefined;
            allow_merge_commit?: boolean | undefined;
            allow_squash_merge?: boolean | undefined;
            allow_rebase_merge?: boolean | undefined;
            license: {
                key: string;
                name: string;
                url: string | null;
                spdx_id: string | null;
                node_id: string;
            } | null;
            pushed_at: string;
            size: number;
            ssh_url: string;
            stargazers_count: number;
            svn_url: string;
            topics?: string[] | undefined;
            watchers: number;
            watchers_count: number;
            created_at: string;
            updated_at: string;
            allow_forking?: boolean | undefined;
            is_template?: boolean | undefined;
        } | null;
        sha: string;
        user: {
            avatar_url: string;
            events_url: string;
            followers_url: string;
            following_url: string;
            gists_url: string;
            gravatar_id: string | null;
            html_url: string;
            id: number;
            node_id: string;
            login: string;
            organizations_url: string;
            received_events_url: string;
            repos_url: string;
            site_admin: boolean;
            starred_url: string;
            subscriptions_url: string;
            type: string;
            url: string;
        };
    };
    base: {
        label: string;
        ref: string;
        repo: {
            archive_url: string;
            assignees_url: string;
            blobs_url: string;
            branches_url: string;
            collaborators_url: string;
            comments_url: string;
            commits_url: string;
            compare_url: string;
            contents_url: string;
            contributors_url: string;
            deployments_url: string;
            description: string | null;
            downloads_url: string;
            events_url: string;
            fork: boolean;
            forks_url: string;
            full_name: string;
            git_commits_url: string;
            git_refs_url: string;
            git_tags_url: string;
            hooks_url: string;
            html_url: string;
            id: number;
            is_template?: boolean | undefined;
            node_id: string;
            issue_comment_url: string;
            issue_events_url: string;
            issues_url: string;
            keys_url: string;
            labels_url: string;
            languages_url: string;
            merges_url: string;
            milestones_url: string;
            name: string;
            notifications_url: string;
            owner: {
                avatar_url: string;
                events_url: string;
                followers_url: string;
                following_url: string;
                gists_url: string;
                gravatar_id: string | null;
                html_url: string;
                id: number;
                node_id: string;
                login: string;
                organizations_url: string;
                received_events_url: string;
                repos_url: string;
                site_admin: boolean;
                starred_url: string;
                subscriptions_url: string;
                type: string;
                url: string;
            };
            private: boolean;
            pulls_url: string;
            releases_url: string;
            stargazers_url: string;
            statuses_url: string;
            subscribers_url: string;
            subscription_url: string;
            tags_url: string;
            teams_url: string;
            trees_url: string;
            url: string;
            clone_url: string;
            default_branch: string;
            forks: number;
            forks_count: number;
            git_url: string;
            has_downloads: boolean;
            has_issues: boolean;
            has_projects: boolean;
            has_wiki: boolean;
            has_pages: boolean;
            homepage: string | null;
            language: string | null;
            master_branch?: string | undefined;
            archived: boolean;
            disabled: boolean;
            visibility?: string | undefined;
            mirror_url: string | null;
            open_issues: number;
            open_issues_count: number;
            permissions?: {
                admin: boolean;
                maintain?: boolean | undefined;
                push: boolean;
                triage?: boolean | undefined;
                pull: boolean;
            } | undefined;
            temp_clone_token?: string | undefined;
            allow_merge_commit?: boolean | undefined;
            allow_squash_merge?: boolean | undefined;
            allow_rebase_merge?: boolean | undefined;
            license: {
                key: string;
                name: string;
                url: string | null;
                spdx_id: string | null;
                node_id: string;
                html_url?: string | undefined;
            } | null;
            pushed_at: string;
            size: number;
            ssh_url: string;
            stargazers_count: number;
            svn_url: string;
            topics?: string[] | undefined;
            watchers: number;
            watchers_count: number;
            created_at: string;
            updated_at: string;
            allow_forking?: boolean | undefined;
        };
        sha: string;
        user: {
            avatar_url: string;
            events_url: string;
            followers_url: string;
            following_url: string;
            gists_url: string;
            gravatar_id: string | null;
            html_url: string;
            id: number;
            node_id: string;
            login: string;
            organizations_url: string;
            received_events_url: string;
            repos_url: string;
            site_admin: boolean;
            starred_url: string;
            subscriptions_url: string;
            type: string;
            url: string;
        };
    };
    _links: {
        comments: {
            href: string;
        };
        commits: {
            href: string;
        };
        statuses: {
            href: string;
        };
        html: {
            href: string;
        };
        issue: {
            href: string;
        };
        review_comments: {
            href: string;
        };
        review_comment: {
            href: string;
        };
        self: {
            href: string;
        };
    };
    author_association: "COLLABORATOR" | "CONTRIBUTOR" | "FIRST_TIMER" | "FIRST_TIME_CONTRIBUTOR" | "MEMBER" | "NONE" | "OWNER" | "MANNEQUIN";
    auto_merge: {
        enabled_by: {
            name?: string | null | undefined;
            email?: string | null | undefined;
            login: string;
            id: number;
            node_id: string;
            avatar_url: string;
            gravatar_id: string | null;
            url: string;
            html_url: string;
            followers_url: string;
            following_url: string;
            gists_url: string;
            starred_url: string;
            subscriptions_url: string;
            organizations_url: string;
            repos_url: string;
            events_url: string;
            received_events_url: string;
            type: string;
            site_admin: boolean;
            starred_at?: string | undefined;
        };
        merge_method: "merge" | "squash" | "rebase";
        commit_title: string;
        commit_message: string;
    } | null;
    draft?: boolean | undefined;
    merged: boolean;
    mergeable: boolean | null;
    rebaseable?: boolean | null | undefined;
    mergeable_state: string;
    merged_by: {
        name?: string | null | undefined;
        email?: string | null | undefined;
        login: string;
        id: number;
        node_id: string;
        avatar_url: string;
        gravatar_id: string | null;
        url: string;
        html_url: string;
        followers_url: string;
        following_url: string;
        gists_url: string;
        starred_url: string;
        subscriptions_url: string;
        organizations_url: string;
        repos_url: string;
        events_url: string;
        received_events_url: string;
        type: string;
        site_admin: boolean;
        starred_at?: string | undefined;
    } | null;
    comments: number;
    review_comments: number;
    maintainer_can_modify: boolean;
    commits: number;
    additions: number;
    deletions: number;
    changed_files: number;
}, 200> | import("@octokit/types").OctokitResponse<{
    url: string;
    id: number;
    node_id: string;
    html_url: string;
    diff_url: string;
    patch_url: string;
    issue_url: string;
    commits_url: string;
    review_comments_url: string;
    review_comment_url: string;
    comments_url: string;
    statuses_url: string;
    number: number;
    state: "closed" | "open";
    locked: boolean;
    title: string;
    user: {
        name?: string | null | undefined;
        email?: string | null | undefined;
        login: string;
        id: number;
        node_id: string;
        avatar_url: string;
        gravatar_id: string | null;
        url: string;
        html_url: string;
        followers_url: string;
        following_url: string;
        gists_url: string;
        starred_url: string;
        subscriptions_url: string;
        organizations_url: string;
        repos_url: string;
        events_url: string;
        received_events_url: string;
        type: string;
        site_admin: boolean;
        starred_at?: string | undefined;
    } | null;
    body: string | null;
    labels: {
        id: number;
        node_id: string;
        url: string;
        name: string;
        description: string | null;
        color: string;
        default: boolean;
    }[];
    milestone: {
        url: string;
        html_url: string;
        labels_url: string;
        id: number;
        node_id: string;
        number: number;
        state: "closed" | "open";
        title: string;
        description: string | null;
        creator: {
            name?: string | null | undefined;
            email?: string | null | undefined;
            login: string;
            id: number;
            node_id: string;
            avatar_url: string;
            gravatar_id: string | null;
            url: string;
            html_url: string;
            followers_url: string;
            following_url: string;
            gists_url: string;
            starred_url: string;
            subscriptions_url: string;
            organizations_url: string;
            repos_url: string;
            events_url: string;
            received_events_url: string;
            type: string;
            site_admin: boolean;
            starred_at?: string | undefined;
        } | null;
        open_issues: number;
        closed_issues: number;
        created_at: string;
        updated_at: string;
        closed_at: string | null;
        due_on: string | null;
    } | null;
    active_lock_reason?: string | null | undefined;
    created_at: string;
    updated_at: string;
    closed_at: string | null;
    merged_at: string | null;
    merge_commit_sha: string | null;
    assignee: {
        name?: string | null | undefined;
        email?: string | null | undefined;
        login: string;
        id: number;
        node_id: string;
        avatar_url: string;
        gravatar_id: string | null;
        url: string;
        html_url: string;
        followers_url: string;
        following_url: string;
        gists_url: string;
        starred_url: string;
        subscriptions_url: string;
        organizations_url: string;
        repos_url: string;
        events_url: string;
        received_events_url: string;
        type: string;
        site_admin: boolean;
        starred_at?: string | undefined;
    } | null;
    assignees?: {
        name?: string | null | undefined;
        email?: string | null | undefined;
        login: string;
        id: number;
        node_id: string;
        avatar_url: string;
        gravatar_id: string | null;
        url: string;
        html_url: string;
        followers_url: string;
        following_url: string;
        gists_url: string;
        starred_url: string;
        subscriptions_url: string;
        organizations_url: string;
        repos_url: string;
        events_url: string;
        received_events_url: string;
        type: string;
        site_admin: boolean;
        starred_at?: string | undefined;
    }[] | null | undefined;
    requested_reviewers?: {
        name?: string | null | undefined;
        email?: string | null | undefined;
        login: string;
        id: number;
        node_id: string;
        avatar_url: string;
        gravatar_id: string | null;
        url: string;
        html_url: string;
        followers_url: string;
        following_url: string;
        gists_url: string;
        starred_url: string;
        subscriptions_url: string;
        organizations_url: string;
        repos_url: string;
        events_url: string;
        received_events_url: string;
        type: string;
        site_admin: boolean;
        starred_at?: string | undefined;
    }[] | null | undefined;
    requested_teams?: {
        id: number;
        node_id: string;
        url: string;
        members_url: string;
        name: string;
        description: string | null;
        permission: string;
        privacy?: string | undefined;
        html_url: string;
        repositories_url: string;
        slug: string;
        ldap_dn?: string | undefined;
    }[] | null | undefined;
    head: {
        label: string;
        ref: string;
        repo: {
            archive_url: string;
            assignees_url: string;
            blobs_url: string;
            branches_url: string;
            collaborators_url: string;
            comments_url: string;
            commits_url: string;
            compare_url: string;
            contents_url: string;
            contributors_url: string;
            deployments_url: string;
            description: string | null;
            downloads_url: string;
            events_url: string;
            fork: boolean;
            forks_url: string;
            full_name: string;
            git_commits_url: string;
            git_refs_url: string;
            git_tags_url: string;
            hooks_url: string;
            html_url: string;
            id: number;
            node_id: string;
            issue_comment_url: string;
            issue_events_url: string;
            issues_url: string;
            keys_url: string;
            labels_url: string;
            languages_url: string;
            merges_url: string;
            milestones_url: string;
            name: string;
            notifications_url: string;
            owner: {
                avatar_url: string;
                events_url: string;
                followers_url: string;
                following_url: string;
                gists_url: string;
                gravatar_id: string | null;
                html_url: string;
                id: number;
                node_id: string;
                login: string;
                organizations_url: string;
                received_events_url: string;
                repos_url: string;
                site_admin: boolean;
                starred_url: string;
                subscriptions_url: string;
                type: string;
                url: string;
            };
            private: boolean;
            pulls_url: string;
            releases_url: string;
            stargazers_url: string;
            statuses_url: string;
            subscribers_url: string;
            subscription_url: string;
            tags_url: string;
            teams_url: string;
            trees_url: string;
            url: string;
            clone_url: string;
            default_branch: string;
            forks: number;
            forks_count: number;
            git_url: string;
            has_downloads: boolean;
            has_issues: boolean;
            has_projects: boolean;
            has_wiki: boolean;
            has_pages: boolean;
            homepage: string | null;
            language: string | null;
            master_branch?: string | undefined;
            archived: boolean;
            disabled: boolean;
            visibility?: string | undefined;
            mirror_url: string | null;
            open_issues: number;
            open_issues_count: number;
            permissions?: {
                admin: boolean;
                maintain?: boolean | undefined;
                push: boolean;
                triage?: boolean | undefined;
                pull: boolean;
            } | undefined;
            temp_clone_token?: string | undefined;
            allow_merge_commit?: boolean | undefined;
            allow_squash_merge?: boolean | undefined;
            allow_rebase_merge?: boolean | undefined;
            license: {
                key: string;
                name: string;
                url: string | null;
                spdx_id: string | null;
                node_id: string;
            } | null;
            pushed_at: string;
            size: number;
            ssh_url: string;
            stargazers_count: number;
            svn_url: string;
            topics?: string[] | undefined;
            watchers: number;
            watchers_count: number;
            created_at: string;
            updated_at: string;
            allow_forking?: boolean | undefined;
            is_template?: boolean | undefined;
        } | null;
        sha: string;
        user: {
            avatar_url: string;
            events_url: string;
            followers_url: string;
            following_url: string;
            gists_url: string;
            gravatar_id: string | null;
            html_url: string;
            id: number;
            node_id: string;
            login: string;
            organizations_url: string;
            received_events_url: string;
            repos_url: string;
            site_admin: boolean;
            starred_url: string;
            subscriptions_url: string;
            type: string;
            url: string;
        };
    };
    base: {
        label: string;
        ref: string;
        repo: {
            archive_url: string;
            assignees_url: string;
            blobs_url: string;
            branches_url: string;
            collaborators_url: string;
            comments_url: string;
            commits_url: string;
            compare_url: string;
            contents_url: string;
            contributors_url: string;
            deployments_url: string;
            description: string | null;
            downloads_url: string;
            events_url: string;
            fork: boolean;
            forks_url: string;
            full_name: string;
            git_commits_url: string;
            git_refs_url: string;
            git_tags_url: string;
            hooks_url: string;
            html_url: string;
            id: number;
            is_template?: boolean | undefined;
            node_id: string;
            issue_comment_url: string;
            issue_events_url: string;
            issues_url: string;
            keys_url: string;
            labels_url: string;
            languages_url: string;
            merges_url: string;
            milestones_url: string;
            name: string;
            notifications_url: string;
            owner: {
                avatar_url: string;
                events_url: string;
                followers_url: string;
                following_url: string;
                gists_url: string;
                gravatar_id: string | null;
                html_url: string;
                id: number;
                node_id: string;
                login: string;
                organizations_url: string;
                received_events_url: string;
                repos_url: string;
                site_admin: boolean;
                starred_url: string;
                subscriptions_url: string;
                type: string;
                url: string;
            };
            private: boolean;
            pulls_url: string;
            releases_url: string;
            stargazers_url: string;
            statuses_url: string;
            subscribers_url: string;
            subscription_url: string;
            tags_url: string;
            teams_url: string;
            trees_url: string;
            url: string;
            clone_url: string;
            default_branch: string;
            forks: number;
            forks_count: number;
            git_url: string;
            has_downloads: boolean;
            has_issues: boolean;
            has_projects: boolean;
            has_wiki: boolean;
            has_pages: boolean;
            homepage: string | null;
            language: string | null;
            master_branch?: string | undefined;
            archived: boolean;
            disabled: boolean;
            visibility?: string | undefined;
            mirror_url: string | null;
            open_issues: number;
            open_issues_count: number;
            permissions?: {
                admin: boolean;
                maintain?: boolean | undefined;
                push: boolean;
                triage?: boolean | undefined;
                pull: boolean;
            } | undefined;
            temp_clone_token?: string | undefined;
            allow_merge_commit?: boolean | undefined;
            allow_squash_merge?: boolean | undefined;
            allow_rebase_merge?: boolean | undefined;
            license: {
                key: string;
                name: string;
                url: string | null;
                spdx_id: string | null;
                node_id: string;
                html_url?: string | undefined;
            } | null;
            pushed_at: string;
            size: number;
            ssh_url: string;
            stargazers_count: number;
            svn_url: string;
            topics?: string[] | undefined;
            watchers: number;
            watchers_count: number;
            created_at: string;
            updated_at: string;
            allow_forking?: boolean | undefined;
        };
        sha: string;
        user: {
            avatar_url: string;
            events_url: string;
            followers_url: string;
            following_url: string;
            gists_url: string;
            gravatar_id: string | null;
            html_url: string;
            id: number;
            node_id: string;
            login: string;
            organizations_url: string;
            received_events_url: string;
            repos_url: string;
            site_admin: boolean;
            starred_url: string;
            subscriptions_url: string;
            type: string;
            url: string;
        };
    };
    _links: {
        comments: {
            href: string;
        };
        commits: {
            href: string;
        };
        statuses: {
            href: string;
        };
        html: {
            href: string;
        };
        issue: {
            href: string;
        };
        review_comments: {
            href: string;
        };
        review_comment: {
            href: string;
        };
        self: {
            href: string;
        };
    };
    author_association: "COLLABORATOR" | "CONTRIBUTOR" | "FIRST_TIMER" | "FIRST_TIME_CONTRIBUTOR" | "MEMBER" | "NONE" | "OWNER" | "MANNEQUIN";
    auto_merge: {
        enabled_by: {
            name?: string | null | undefined;
            email?: string | null | undefined;
            login: string;
            id: number;
            node_id: string;
            avatar_url: string;
            gravatar_id: string | null;
            url: string;
            html_url: string;
            followers_url: string;
            following_url: string;
            gists_url: string;
            starred_url: string;
            subscriptions_url: string;
            organizations_url: string;
            repos_url: string;
            events_url: string;
            received_events_url: string;
            type: string;
            site_admin: boolean;
            starred_at?: string | undefined;
        };
        merge_method: "merge" | "squash" | "rebase";
        commit_title: string;
        commit_message: string;
    } | null;
    draft?: boolean | undefined;
    merged: boolean;
    mergeable: boolean | null;
    rebaseable?: boolean | null | undefined;
    mergeable_state: string;
    merged_by: {
        name?: string | null | undefined;
        email?: string | null | undefined;
        login: string;
        id: number;
        node_id: string;
        avatar_url: string;
        gravatar_id: string | null;
        url: string;
        html_url: string;
        followers_url: string;
        following_url: string;
        gists_url: string;
        starred_url: string;
        subscriptions_url: string;
        organizations_url: string;
        repos_url: string;
        events_url: string;
        received_events_url: string;
        type: string;
        site_admin: boolean;
        starred_at?: string | undefined;
    } | null;
    comments: number;
    review_comments: number;
    maintainer_can_modify: boolean;
    commits: number;
    additions: number;
    deletions: number;
    changed_files: number;
}, 201>>;
export declare const createOrAddLabel: (pr: GitHubPRDSL | undefined, api: GitHub) => (labelConfig: {
    name: string;
    color: string;
    description: string;
}, repoConfig?: {
    owner: string;
    repo: string;
    id: number;
}) => Promise<void>;
export default utils;