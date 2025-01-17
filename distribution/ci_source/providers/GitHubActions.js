"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GitHubActions = void 0;
var ci_source_helpers_1 = require("../ci_source_helpers");
var fs_1 = require("fs");
// https://developer.github.com/actions/
/**
 * ### CI Setup
 *
 *  * <!-- JS --!>
 * There are two ways to use Danger with GitHub Actions. If you include Danger as a dev-dependency, then
 * you can call danger directly as another build-step after your tests:
 *
 * ```ruby
 * name: Node CI
 * on: [pull_request]
 *
 * jobs:
 *   test:
 *     runs-on: ubuntu-latest
 *
 *     steps:
 *     - uses: actions/checkout@master
 *     - name: Use Node.js 10.x
 *       uses: actions/setup-node@v1
 *       with:
 *         node-version: 10.x
 *     - name: install yarn
 *       run: npm install -g yarn
 *     - name: yarn install, build, and test
 *       run: |
 *         yarn install  --frozen-lockfile
 *         yarn build
 *         yarn test
 *     - name: Danger
 *       run: yarn danger ci
 *       env: GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
 *  ```
 *
 * If you are not running in a JavaScript ecosystem, or don't want to include the dependency then
 * you can use Danger JS as an action.
 *
 * ```yml
 * name: "Danger JS"
 * on: [pull_request]
 *
 * jobs:
 *   build:
 *     name: Danger JS
 *     runs-on: ubuntu-latest
 *     steps:
 *     - uses: actions/checkout@v1
 *     - name: Danger
 *       uses: danger/danger-js@9.1.6
 *       env:
 *         GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
 * ```
 *
 * Note it's likely the version number should change, but you get the point. This will run Danger
 * self-encapsulated inside a GitHub action.
 *
 * If you are using DangerJS on GitHub Enteprise, you will need to set the Danger user ID to
 * the GitHub Actions bot. This will enable Danger to correctly comment and update on PRs.
 *
 * * ```yml
 * name: "Danger JS"
 * on: [pull_request]
 *
 * jobs:
 *   build:
 *     name: Danger JS
 *     runs-on: ubuntu-latest
 *     steps:
 *     - uses: actions/checkout@v1
 *     - name: Danger
 *       uses: danger/danger-js@9.1.6
 *       env:
 *         GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
 *         DANGER_GHE_ACTIONS_BOT_USER_ID: *user_id*
 * ```
 *
 * <!-- !JS --!>
 * <!-- Swift --!>
 *
 * There are two ways to use Danger with GitHub Actions. If you include Danger as a dependency, then
 * you can call danger directly as another build-step after your tests:
 *
 * ```ruby
 * name: CI
 * on: [pull_request]
 * jobs:
 *   build:
 *     runs-on: macos-latest
 *
 *     steps:
 *     - uses: actions/checkout@master
 *     - name: Build
 *       run: swift build
 *
 *     - name: Test
 *       run: swift test
 *
 *     - name: Danger
 *       run: danger-swift ci
 *       env: GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
 *  ```
 *
 * If don't want to include the dependency then you can use Danger Swift via an action.
 *
 * ```yml
 * name: "Danger Swift"
 * on: [pull_request]
 *
 * jobs:
 *   build:
 *     name: Danger JS
 *     runs-on: ubuntu-latest
 *     steps:
 *     - uses: actions/checkout@v1
 *     - name: Danger
 *       uses: danger/swift@2.0.1
 *       env:
 *         GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
 * ```
 *
 * Note it's likely the version number should change, but you get the point. This will run Danger
 * self-encapsulated inside a GitHub action.
 *
 * <!-- !Swift --!>
 *
 * You can pass additional CLI to Danger via an action via the args:
 *
 * ```
 *  - uses: danger/...
 *    with:
 *      args: "--dangerfile artsy/peril-settings/org/allPRs.ts"
 * ```
 *
 * This runs the file [`org/allPRs.ts`](https://github.com/artsy/peril-settings/blob/master/org/allPRs.ts)
 * from the repo [artsy/peril-settings](https://github.com/artsy/peril-settings). This gives you the ability
 * to have Danger acting on non-pull-requests via GitHub Actions.
 *
 * ### Token Setup
 *
 * You need to make sure that the secret `"GITHUB_TOKEN"` is
 * enabled in your workspace. This is so that Danger can connect
 * to GitHub.
 *
 * ```yml
 *   - name: Danger JS
 *     uses: danger/danger-js@9.1.6
 *     env: GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
 * ```
 *
 * [GitHub automatically creates a `GITHUB_TOKEN` secret to use in your workflow](https://help.github.com/en/actions/configuring-and-managing-workflows/authenticating-with-the-github_token).
 * You can use the `GITHUB_TOKEN` to authenticate in a workflow run.
 * Using this token will post the danger comment as the `github-actions` app user.
 *
 * Note: `secrets.GITHUB_TOKEN` will not be available for PRs from forks. This is a GitHub
 * security constraint, if you have an OSS app, we recommend using a personal token like below.
 *
 * #### Using Personal Tokens
 *
 * If you need to post the danger comment as some particular user or for some other reason
 * you need to use a personal token for danger then you can provide it in env as DANGER_GITHUB_API_TOKEN.
 *
 * ```yml
 *   - name: Danger JS
 *     uses: danger/danger-js@9.1.6
 *      env: DANGER_GITHUB_API_TOKEN: ${{ secrets.DANGER_GITHUB_API_TOKEN }}
 * ```
 * #### OSS Tokens
 *
 * The security models for GitHub actions means that you cannot use `secrets.GITHUB_TOKEN`
 * in PRs from forks. This can be tricky with OSS contributions. In these cases, create a
 * new GitHub account and set up your `.yml` like this:
 *
 * ```yml
 *   - name: Set danger env
 *      run: echo "DANGER_GITHUB_API_TOKEN=$(echo FIRST_HALF + SECOND_HALF)" >> $GITHUB_ENV
 *
 *   - name: Run Danger
 *      run: yarn danger ci
 *      env:
 *        DANGER_GITHUB_API_TOKEN: ${{ env.DANGER_GITHUB_API_TOKEN }}
 * ```
 *
 * #### Advanced
 *
 * If you understand the security ramifications, Danger JS can run on a `pull_request_target`
 * workflow, instead of a `pull_request`. You should thoroughly read [the docs first](https://docs.github.com/en/actions/reference/events-that-trigger-workflows#pull_request_target).
 *
 * ```yml
 *  on:
 *    pull_request_target:
 *      types: [assigned, opened, synchronize, reopened]
 *
 *  jobs:
 *    build:
 *      runs-on: ubuntu-latest
 *
 *      steps:
 *        - uses: actions/checkout@v1
 *        - uses: actions/setup-node@v1
 *        - run: yarn install
 *
 *        - run: yarn danger ci
 *          env:
 *            DANGER_GITHUB_API_TOKEN: ${{ secrets.GITHUB_TOKEN }}
 * ```
 *
 * Note that when using Danger in this way, you will not have the file-system set up for
 * the PR, so you cannot use `fs` to read a file (use `danger.github.utils.fileContents` instead)
 * but the usual PR metadata and DSL will act the same.
 */
var GitHubActions = /** @class */ (function () {
    function GitHubActions(env, event) {
        if (event === void 0) { event = undefined; }
        this.env = env;
        var GITHUB_EVENT_PATH = env.GITHUB_EVENT_PATH;
        var eventFilePath = GITHUB_EVENT_PATH || "/github/workflow/event.json";
        if (event !== undefined) {
            this.event = event;
        }
        else if ((0, fs_1.existsSync)(eventFilePath)) {
            var event_1 = (0, fs_1.readFileSync)(eventFilePath, "utf8");
            this.event = JSON.parse(event_1);
        }
    }
    Object.defineProperty(GitHubActions.prototype, "name", {
        get: function () {
            return "GitHub Actions";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GitHubActions.prototype, "isCI", {
        get: function () {
            return (0, ci_source_helpers_1.ensureEnvKeysExist)(this.env, ["GITHUB_WORKFLOW"]);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GitHubActions.prototype, "isPR", {
        get: function () {
            // This one is complicated, because it needs to not *just* support PRs
            return true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GitHubActions.prototype, "useEventDSL", {
        get: function () {
            return this.event.pull_request === undefined && this.event.issue === undefined;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GitHubActions.prototype, "pullRequestID", {
        get: function () {
            if (this.event.pull_request !== undefined) {
                return this.event.pull_request.number;
            }
            else if (this.event.issue !== undefined) {
                return this.event.issue.number;
            }
            throw new Error("pullRequestID was called on GitHubActions when it wasn't a PR");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GitHubActions.prototype, "repoSlug", {
        get: function () {
            if (this.event.pull_request !== undefined) {
                return this.event.pull_request.base.repo.full_name;
            }
            else if (this.event.repository !== undefined) {
                return this.event.repository.full_name;
            }
            throw new Error("repoSlug was called on GitHubActions when it wasn't a PR");
        },
        enumerable: false,
        configurable: true
    });
    return GitHubActions;
}());
exports.GitHubActions = GitHubActions;
//# sourceMappingURL=GitHubActions.js.map