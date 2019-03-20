# object-pipeline
A JavaScript Object Processor, A Pipeline Function

## Install
```bash
npm i -S object-pipeline
```

## Usage
```javascript
const pipeline = require('object-pipeline');

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
## Build
```bash
tsc
```

## Roadmap
1. add pickout function to pick out useless attributes of an object
2. add optional-chaining to pipeline and pickout
3. add Array support

## Coverage
File         |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
-------------|----------|----------|----------|----------|-------------------|
All files    |      100 |      100 |      100 |      100 |                   |
 pipeline.js |      100 |      100 |      100 |      100 |                   |
 util.ts     |      100 |      100 |      100 |      100 |                   |

## License
[MIT](http://opensource.org/licenses/MIT)

