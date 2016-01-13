# js-object-parser
A library for parsing a string to a javascript object. 

Main difference between the JSON.parse function and this function is that js-object-parser will be able to parse 
```"{A:b, C:d, E:{any-object:{a:1, b:2}}}"```, where JSON.parse fails as it requires every property to be wrapped in quotationmarks, i.e:
```"{"A":"b", "C":"d", "E":{"any-object":{"a":1, "b":2}}}" ```

### Example / Usage
Add it to your project by

```html
	npm install js-object-parser
```
In your program

```javascript
import objectParser from 'js-object-parser';

console.log(objectParser.parse('{A:"b", C:[1,2,"3"]}'));
//Outputs: {A: "b", C: [1,2,"3"]}
	
```
It can handle nested objects:

```javascript

console.log(objectParser.parse('{A:{BCDEF:{G:"h"}, I:"j"}}'));
//Outputs: { A: { BCDEF: { G: "h" }, I: "j" } }
	
```

### Test

For testing, run 
```
# Clone repository
git clone https://github.com/simonlovesyou/js-object-parser.git
# Navigate into project folder
cd js-object-parser
# Install dependencies
npm install 
# Run tests
npm test
```

### Creator
[simonlovesyou](https://github.com/simonlovesyou)


## License (MIT)

Copyright (c) 2015 Simon Johansson 

JohanssonLSimon@gmail.com

[Website](http://www.simonsager.se)
[Twitter](https://twitter.com/simonjohansosn)