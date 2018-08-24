# yarrrml2ld
Converts yarrrml to linked data using [yarrrml-parser](https://github.com/RMLio/yarrrml-parser) and [rmlmapper-java](https://github.com/RMLio/rmlmapper-java).

## Installing
```
npm install --save yarrrml2ld
```

When the package is installed, the rmlmapper-java jar is downloaded from the github [releases](https://github.com/RMLio/rmlmapper-java/releases) page.

## Example usage

```javascript
yarrrml2ld({
    yarrrml_file: file,
    functions: functions_ttl,
}).then((result) => {
    console.log(result)
})
```

- `yarrml_file`: path to the yarrrml mapping file
- `functions` (opt.): file used to include custom functions as described [here](https://github.com/RMLio/rmlmapper-java#including-functions).
