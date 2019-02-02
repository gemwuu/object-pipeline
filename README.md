# lodash-plus
This is a lodash enhancement toolkit.

## Install

## Usage
### lodash.pipeline
const lodashPipeline = require('lodash-plus/pipeline');

```javascript
const nameObj = {
  tim: 'tim',
  jack: 'jack',
};

lodashPipeline(nameObj, [ 'foo', 'xxx' ], item => `hello, ${item}.`);

```
