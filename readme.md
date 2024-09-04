<a href="https://github.com/iamboobert/testchamber/actions/workflows/node.js.yml"><img src="https://img.shields.io/nycrc/iamboobert/testchamber?label=coverage" /></a>
<a href="https://github.com/iamboobert/testchamber/actions/workflows/node.js.yml"><img src="https://img.shields.io/github/actions/workflow/status/iamboobert/testchamber/node.js.yml" /></a>
<a href="https://github.com/iamboobert/testchamber/actions/workflows/npm-publish.yml"><img src="https://img.shields.io/github/actions/workflow/status/iamboobert/testchamber/npm-publish.yml?label=publish" /></a>
<a href="https://www.npmjs.com/package/testchamber"><img src="https://img.shields.io/npm/v/testchamber?cacheSeconds=1" /></a>

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
  - `npm update testchamber`
  - `npm install testchamber --save-dev` 
  - ...and you may also need to blow away node_modules and `npm install` again 

## usage
best way to see actual usage is to checkout the test specs.
### ui
this class contains useful static methods to use for UI browser testing with playwright. it mostly offers helper methods that deal with Page and ElementHandles when using `page.$$()` and friends.

### data
this class contains useful static methods for dealing with data, such as random number and string generation.

## maintainence cheat sheet

### running tests (manual)
- run setup: `npm run setup`
- run the tests: `npm test`
- run the tests without coverage: `npm run test-nocoverage`

### new version in github
- ensure branch (master) has appropriate version in package.json
- click 'Releases' 
- click 'Draft new release'
- tag with the version number
- release
- verify npm publish action worked

### npm publish (manual)
- version bump in package.json
- commit bump to master
- login if needed: `npm login`
- publish: `npm publish`
