### shared `workspace` settings.

this is intended to be minimum for code formatting with some performance helpers

personal preferences should created in `user` settings and not shared.

e.g. do not set code editor themes here

Formatting options closly follow recommended prettier, eslint, stylelint

Rationale is to format code for maximium readability

this does mean some automatic reformatting of shorthand notations,

all code gets minified in production release so this doesn't not effect final filesize

### notes:

telemetry:off vscode performance optimisation

files.exclude: vscode performance optimisation - dont show, watch, and keep re-caching large large file/folders unnesessarily

editor: minimum for shared code formatting purpose

disables vscode standard lint in favor of eslint, stylelint and prettier
lints on save
