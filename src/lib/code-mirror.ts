import { jsonParseLinter } from '@codemirror/lang-json';
import { type LintSource } from '@codemirror/lint';

/**
 * A CodeMirror LintSource that wraps the default JSON parser linter
 * but ignores errors when the editor content is empty.
 *
 * @returns {LintSource} A linter function for use with the `linter` extension.
 */
export const emptyOrJsonLinter: LintSource = (view) => {
  // If the document is empty, return no diagnostics (no errors)
  if (view.state.doc.length === 0) {
    return [];
  }
  // Otherwise, delegate to the default JSON linter to find syntax errors
  return jsonParseLinter()(view);
};
