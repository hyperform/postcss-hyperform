# ![Text “Hyperform - Insert Form” in 80s arcade game style](https://raw.githubusercontent.com/hyperform/hyperform.github.io/master/statics/header.png)

## Rewrite CSS pseudo-classes into Hyperform classes

This [PostCSS](https://github.com/postcss/postcss)-Plugin allows you to convert
advanced CSS pseudo-classes for form handling into their
[Hyperform](https://hyperform.js.org) counterparts.

Currently supported pseudo-classes and their transformation:

| CSS selector    | Class applied by Hyperform |
| --------------- | -------------------------- |
| `:user-error`   | `.hf-user-invalid`         |
| `:user-invalid` | `.hf-user-invalid`         |
| `:user-valid`   | `.hf-user-valid`           |
| `:invalid`      | `.hf-invalid`              |
| `:valid`        | `.hf-valid`                |
| `:in-range`     | `.hf-in-range`             |
| `:out-of-range` | `.hf-out-of-range`         |

## Installation and Usage

Install via `npm`:

    npm install postcss-hyperform

Then use it:

    postcss([ require('postcss-hyperform') ])

or on the command-line:

    $ postcss --use postcss-hyperform < input.css > output.css

This will transform this perfectly standards-conform code (that is,
unfortunately, not fully supported by any browser as of 2018)

```css
.input:valid {
  background: green;
}
.input:user-invalid {
  background: red;
}
```

into this stylesheet, that works like a charm, if you also happen to use
Hyperform:

```css
.input:valid, .input.hf-valid {
  background: green;
}
.input:user-invalid, .input.hf-validated.hf-invalid {
  background: red;
}
```

## Problems and Todos

*   Missing support for `:required` and `:optional`. They will be added when
    [this accompanying issue](https://github.com/hyperform/hyperform/issues/23) is fixed.
*   Note, that the specificity of some selectors will change. Where you had a blue colored field on focus with this CSS before,

        .input:user-invalid { color: red; }
        .input:focus { color: blue; }
        
    you now need to crank up the specificity of the `:focus` rule,
    
        .input:user-invalid { color: red; }
        /* :user-invalid will become two helper classes in postprocessing. Therefore
         * enlarge specificity: */
        .input:focus:focus { color: blue; }

## Authors

Written by Manuel Strehl, based on code by [Kevin
Suttle](https://github.com/kevinSuttle).

## License

This code is published under the terms of the MIT license.
