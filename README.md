# lodash-plus
This is a lodash enhancement toolkit.

## Install
TODO

## Usage
### lodash.pipeline
const lodashPipeline = require('lodash-plus/pipeline');

```javascript
const nameObj = {
  tim: 'tim',
  jack: 'jack',
};


lodashPipeline(nameObj, 'tim', item => `hello, ${item}.`);
// { tim: 'hello, tim', jack: 'jack' }

lodashPipeline(nameObj, [ 'tim', 'xxx' ], item => `hello, ${item}.`);
// { tim: 'hello, tim', jack: 'jack' }

lodashPipeline(nameObj, { tim: item => `no, ${item}` }, item => `hello, ${item}.`);
// { tim: 'no, tim', jack: 'jack' }

lodashPipeline(nameObj, [ { tim: item => `no, ${item}` }, 'jack' ], item => `hello, ${item}.`);
// { tim: 'no, tim', jack: 'hello, jack.' }
```

### Coverage
File         |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
-------------|----------|----------|----------|----------|-------------------|
All files    |      100 |    90.63 |      100 |      100 |                   |
 pipeline.js |      100 |    90.63 |      100 |      100 |          43,46,49 |

## License
[MIT](http://opensource.org/licenses/MIT)

