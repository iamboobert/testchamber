# testchamber
a set of utilities for testing

## getting started
- install, probably as a dev dependency: `npm install testchamber --save-dev`
- where needed, import as such
  - just data: `const { data } = require("testchamber")`
  - ui and data: `const {data, ui} = require("testchamber")`
  - as different names: `const {data: datatools, ui: uitools} = require("testchamber")`
- update as needed: `npm update testchamber --save-dev`  

## maintainence cheat cheet

### running tests
requires playwright
- link local project to the node_modules: `npm link testchamber`
- run the tests: `npm run test`

### npm publish
- version bump in package.json
- login if needed: `npm login`
- publish: `npm publish` 
