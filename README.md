# lodash-plus
This is a lodash enhancement toolkit, written in TypeScript.

## Install
TODO

## Usage
### lodash.pipeline
```javascript
const pipeline = require('lodash-plus/pipeline');

const nameObj = {
  tim: 'tim',
  jack: 'jack',
};

pipeline(nameObj, 'tim', item => `hello, ${item}.`);
// { tim: 'hello, tim', jack: 'jack' }

pipeline(nameObj, [ 'tim', 'xxx' ], item => `hello, ${item}.`);
// { tim: 'hello, tim', jack: 'jack' }

pipeline(nameObj, { tim: item => `no, ${item}` }, item => `hello, ${item}.`);
// { tim: 'no, tim', jack: 'jack' }

pipeline(nameObj, [ { tim: item => `no, ${item}` }, 'jack' ], item => `hello, ${item}.`);
// { tim: 'no, tim', jack: 'hello, jack.' }
```

### Roadmap
1. add pickout function to pick out useless attributes from an object
2. add optional-chaining to pipeline and pickout
3. add Array data support

### Coverage
File         |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
-------------|----------|----------|----------|----------|-------------------|
All files    |      100 |      100 |      100 |      100 |                   |
 pipeline.js |      100 |      100 |      100 |      100 |                   |

## License
[MIT](http://opensource.org/licenses/MIT)

