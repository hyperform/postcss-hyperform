# ![Text “Hyperform - Insert Form” in 80s arcade game style](https://github.com/hyperform/hyperform/raw/master/stuff/header.png)

## Rewrite CSS pseudo-classes into Hyperform classes

This [PostCSS](https://github.com/postcss/postcss)-Plugin allows you to convert
advanced CSS pseudo-classes for form handling into their
[Hyperform](https://hyperform.js.org) counterparts.

Currently supported pseudo-classes and their transformation:

| CSS selector    | Class applied by Hyperform |
| --------------- | -------------------------- |
| `:user-error`   | `.hf-validated.hf-invalid` |
| `:user-invalid` | `.hf-validated.hf-invalid` |
| `:invalid`      | `.hf-invalid`              |
| `:valid`        | `.hf-valid`                |

## Installation and Usage

Install via `npm`:

    npm install postcss-hyperform

Then use it:

    postcss([ require('postcss-hyperform') ])

or on the command-line:

    $ postcss --use postcss-hyperform < input.css > output.css

This will transform this perfectly standards-conform code (that is,
unfortunately, not fully supported by any browser as of 2016)

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

*   The specificity of `:user-invalid` is lower than that of the two
    replacement classes
*   Missing support for `:in-range`, `:out-of-range`, `:required`, `:optional`.
    They will be added when [this accompanying
    issue](https://github.com/hyperform/hyperform/issues/23) is fixed.

## Authors

Written by Manuel Strehl, based on code by [Kevin
Suttle](https://github.com/kevinSuttle).

## License

This code is published under the terms of the MIT license.
