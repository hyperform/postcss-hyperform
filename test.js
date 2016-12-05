'use strict';

import postcss from 'postcss';
import test    from 'ava';

import plugin from './';

function run(t, input, expected, opts = { }) {
  return postcss([ plugin(opts) ]).process(input)
           .then( result => {
             t.deepEqual(result.css, expected);
             t.deepEqual(result.warnings().length, 0);
           });
}



test('base', t => {
  return run(t,

`.input:valid {
  background: green;
}
.input:user-invalid {
  background: red;
}
:required {
  content: "No extended behavior";
}
.input:user-invalid:out-of-range {
  content: ":valid";
}`,

`.input:valid, .input.hf-valid {
  background: green;
}
.input:user-invalid, .input.hf-user-invalid {
  background: red;
}
:required {
  content: "No extended behavior";
}
.input:user-invalid:out-of-range, .input.hf-user-invalid.hf-out-of-range {
  content: ":valid";
}`

  );
});

test('extended', t => {
  return run(t,

`.input:valid {
  background: green;
}
div:disabled {
  opacity: 0;
}
:read-only, :optional :disabled {
  color: gray;
}
:in-range:required {
  content: ":required";
}
.input:user-invalid {
  background: red;
}`,

`.input:valid, .input.hf-valid {
  background: green;
}
div:disabled, div[disabled] {
  opacity: 0;
}
:read-only, :optional :disabled, [readonly], :not([required]) [disabled] {
  color: gray;
}
:in-range:required, .hf-in-range[required] {
  content: ":required";
}
.input:user-invalid, .input.hf-user-invalid {
  background: red;
}`,

{ extended: true });
});
