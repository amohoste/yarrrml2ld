# yarrrml2ld
Converts yarrrml to linked data using [yarrrml-parser](https://github.com/RMLio/yarrrml-parser) and [rmlmapper-java](https://github.com/RMLio/rmlmapper-java)

## Example usage

```javascript
yarrrml2ld({
    yarrrml_file: file,
    functions: functions_ttl,
    rmlmapper: rmlmapper
}).then((result) => {
	console.log(result)
})
```

- `functions` is optional and is a file used to include custom functions as described [here](https://github.com/RMLio/rmlmapper-java#including-functions).
- `rmlmapper` is the path to the location of the generated [rmlmapper-java](https://github.com/RMLio/rmlmapper-java) jar.