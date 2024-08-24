# testchamber
a set of utilities for testing

## getting started
- install, probably as a dev dependency: `npm install testchamber --save-dev`
- where needed, import as such
  - just data: `const { data } = require("testchamber")`
  - ui and data: `const {data, ui} = require("testchamber")`
  - as different names: `const {data: datatools, ui: uitools} = require("testchamber")`

## maintainence cheat cheet

### running tests
requires playwright
- link test code to the test project: `npm link testchamber`
- run the tests: `npm run test`

### npm publish
- version bump in package.json
- login: `npm login`
- publish: `npm publish` 
