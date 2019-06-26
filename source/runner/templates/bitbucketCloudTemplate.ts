import { DangerResults } from "../../dsl/DangerResults"
import { Violation } from "../../dsl/Violation"

// BitBucket Cloud supports these emojis 🎉
const noEntryEmoji = "❌"
const warningEmoji = "⚠️"
const messageEmoji = "✨"
const signatureEmoji = "🚫"

export const dangerSignature = (results: DangerResults) => {
  let meta = results.meta || { runtimeName: "dangerJS", runtimeHref: "https://danger.systems/js" }
  return `Generated by ${signatureEmoji} [${meta.runtimeName}](${meta.runtimeHref})`
}

export const messageForResultWithIssues = `${warningEmoji}  Danger found some issues. Don't worry, everything is fixable.`

export const dangerIDToString = (id: string) => `danger-id-${id};`
export const fileLineToString = (file: string, line: number) => `  File: ${file};Line: ${line};`
/**
 * Postfix signature to be attached comment generated / updated by danger.
 */
export const dangerSignaturePostfix = (results: DangerResults, commitID: string) => `

  ${dangerSignature(results)} against ${commitID}
  `

function buildMarkdownTable(header: string, emoji: string, violations: Violation[]): string {
  if (violations.length === 0 || violations.every(violation => !violation.message)) {
    return ""
  }
  return `

  |      ${violations.length} ${header} |
  | --- |
  ${violations.map(v => `| ${emoji} - ${v.message} |`)}

  `
}

/**
 * A template function for creating a GitHub issue comment from Danger Results
 * @param {string} dangerID A string that represents a unique build
 * @param {string} commitID The hash that represents the latest commit
 * @param {DangerResults} results Data to work with
 * @returns {string} HTML
 */
export function template(dangerID: string, commitID: string, results: DangerResults): string {
  return `
  ${messageForResultWithIssues}

  ${buildMarkdownTable("Fails", noEntryEmoji, results.fails)}
  ${buildMarkdownTable("Warnings", warningEmoji, results.warnings)}
  ${buildMarkdownTable("Messages", messageEmoji, results.messages)}
  
  ${results.markdowns.map(v => v.message).join("\n\n")}
  
  ${dangerSignaturePostfix(results, commitID)}
  
  [](http://${dangerIDToString(dangerID)})
  `
}

export function inlineTemplate(dangerID: string, results: DangerResults, file: string, line: number): string {
  const printViolation = (emoji: string) => (violation: Violation) => {
    return `- ${emoji} ${violation.message}`
  }

  return `
[//]: # (${dangerIDToString(dangerID)})
[//]: # (${fileLineToString(file, line)})
${results.fails.map(printViolation(noEntryEmoji)).join("\n")}
${results.warnings.map(printViolation(warningEmoji)).join("\n")}
${results.messages.map(printViolation(messageEmoji)).join("\n")}
${results.markdowns.map(v => v.message).join("\n\n")}
  `
}