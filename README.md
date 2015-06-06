# js-object-parser
A library for parsing a string to a javascript object. 

Main difference between the JSON.parse function and this function is that js-object-parser will be able to parse 
```"{A:b, C:d, E:{any-object:{a:1, b:2}}"```, where JSON.parse fails as it requires every property to be wrapped in quotationmarks, i.e:
```"{"A":"b", "C":"d", "E":{"any-object":{"a":1, "b":2}}"} ```

### Example / Usage
Add it to your project by

```html
	npm install js-object-parser
```
In your program

```javascript
var ObjectParser = require('js-object-parser');

var objectParser = new ObjectParser(); 

console.log(objectParser.parse('{A:b, C:d}'));
//Outputs: {A: 'b', C: 'd'}
	
```

### TODO
Features I or contributers will hopefully soon implement.

- Add support for arrays.

### Known issues
- Will fail on arrays.

### Creator
[simonlovesyou](https://github.com/simonlovesyou)


## License (MIT)

Copyright (c) 2015 Simon Johansson 

JohanssonLSimon@gmail.com

[Twitter](https://twitter.com/simonjohansosn)