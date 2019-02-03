# lodash-plus
This is a lodash enhancement toolkit.

## Install
TODO

## Usage
### lodash.pipeline
const pipeline = require('lodash-plus/pipeline');

```javascript
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
1. rewrite using TypeScript
2. add pickout function to pick out useless attributes from an object

### Coverage
File         |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
-------------|----------|----------|----------|----------|-------------------|
All files    |      100 |      100 |      100 |      100 |                   |
 pipeline.js |      100 |      100 |      100 |      100 |                   |

## License
[MIT](http://opensource.org/licenses/MIT)

