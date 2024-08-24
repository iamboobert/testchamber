<a href="https://www.npmjs.com/package/testchamber"><img src="https://img.shields.io/npm/v/testchamber" /></a>
<a href="https://github.com/iamboobert/testchamber/actions/workflows/node.js.yml"><img src="https://img.shields.io/github/actions/workflow/status/iamboobert/testchamber/node.js.yml" /></a>

# testchamber
a set of utilities for testing

## getting started
- install, probably as a dev dependency: `npm install testchamber --save-dev`
- where needed, import as such
  - just data: 
    - `const { data } = require("testchamber")` 
    - or 
    - `import { data } from "testchamber"`
  - ui and data
    - `const {data, ui} = require("testchamber")` 
    - or 
    - `import { data, ui } from "testchamber"`
  - as different names: 
    - `const {data: datatools, ui: uitools} = require("testchamber")` 
    - or 
    - `import { data as datatools, ui as uitools } from "testchamber"`
  - all as "testchamber":
    - `const testchamber = require("testchamber")` 
    - or 
    - `import * as testchamber from "testchamber"`
- update as needed:
  - `npm update testchamber --save-dev`
  - `npm install testchamber --save-dev`  

## usage
best way to see actual usage is to checkout the test specs.
### ui
this class contains useful static methods to use for UI browser testing with playwright. it mostly offers helper methods that deal with Page and ElementHandles when using `page.$$()` and friends.

### data
this class contains useful static methods for dealing with data, such as random number and string generation.

## maintainence cheat cheet

### running tests
requires playwright: `npx playwright install`
- run install: `npm install`
- link local project to node_modules: 
  - `npm link`
  - `npm link testchamber`
- run the tests: `npm test`

### npm publish
- version bump in package.json
- commit bump to master
- login if needed: `npm login`
- publish: `npm publish`
