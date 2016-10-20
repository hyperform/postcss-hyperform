'use strict';

import postcss from 'postcss';
import test    from 'ava';

import plugin from './';

function run(t, input, output, opts = { }) {
  return postcss([ plugin(opts) ]).process(input)
           .then( result => {
             t.deepEqual(result.css, output);
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
}`,

`.input:valid, .input.hf-valid {
  background: green;
}
.input:user-invalid, .input.hf-validated.hf-invalid {
  background: red;
}`

  );
});
