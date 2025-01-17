"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var usesProcessSeparationCommands = ["ci", "pr", "local"];
var dangerRunToRunnerCLI = function (argv) {
    var newCommand = [];
    newCommand.push(argv[0]);
    // e.g. node --inspect distribution/commands/danger-run-ci.js --dangerfile myDangerfile.ts
    // or node distribution/commands/danger-pr.js --dangerfile myDangerfile.ts
    if (argv.length === 1) {
        return ["danger", "runner"];
    }
    else if (argv[0].includes("node") || process.pkg != null) {
        // convert
        var newJSFile_1 = argv[1];
        usesProcessSeparationCommands.forEach(function (name) {
            var re = new RegExp("danger-".concat(name, "(.js)?$"));
            newJSFile_1 = newJSFile_1.replace(re, "danger-runner$1");
        });
        // Support re-routing internally in npx for danger-ts
        // If I recall, npm 7 is getting an npx re-write, so it might
        // be worth recommending yarn, but that requires folks using yarn 2
        // which I'm not sure will ever get the same level of a adoption of yarn v1
        //
        if (newJSFile_1.includes("npx") && newJSFile_1.endsWith("danger-ts")) {
            newJSFile_1 = (0, path_1.join)(newJSFile_1, "..", "..", "lib", "node_modules", "danger-ts", "node_modules", "danger", "distribution", "commands", "danger-runner.js");
        }
        newCommand.push(newJSFile_1);
        for (var index = 2; index < argv.length; index++) {
            newCommand.push(argv[index]);
        }
    }
    else {
        // e.g. danger ci --dangerfile
        // if you do `danger run` start looking at args later
        newCommand.push("runner");
        var index = usesProcessSeparationCommands.includes(argv[1]) ? 2 : 1;
        for (; index < argv.length; index++) {
            newCommand.push(argv[index]);
        }
    }
    return newCommand;
};
exports.default = dangerRunToRunnerCLI;
//# sourceMappingURL=dangerRunToRunnerCLI.js.map