'use strict';


const postcss = require('postcss');


/**
 * update the selector with the matching .hf-* classes
 *
 * If extended == true, also add some polyfills. Please note, that the
 * polyfills _may_ be dangerous, because they might not have the scope
 * you thought. Example:
 *
 *     *:enabled {
 *       // match _input_ elements, that are not disabled
 *     }
 *
 *     *:not([disabled]) {
 *       // match _any_ element, also div and body and iframe, without
 *       // a `disabled` attribute
 *     }
 *
 * If you use these polyfills, please always make sure that you scope
 * your selectors appropriately yourself.
 */
function updateSelector(selector, extended) {
  if (extended) {
    selector = selector
      .replace(/:enabled\b/, ':not([disabled])')
      .replace(/:disabled\b/, '[disabled]')
      .replace(/:read-only\b/, '[readonly]')
      .replace(/:read-write\b/, ':not([readonly])')
      .replace(/:required\b/, '[required]')
      .replace(/:optional\b/, ':not([required])')
      ;
  }
  return (selector
    .replace(/:user-(invalid|error)\b/g, '.hf-user-invalid')
    .replace(/:user-valid\b/g, '.hf-user-valid')
    .replace(/:in-range\b/g, '.hf-in-range')
    .replace(/:out-of-range\b/g, '.hf-out-of-range')
    .replace(/:invalid\b/g, '.hf-invalid')
    .replace(/:valid\b/g, '.hf-valid')
  );
}


module.exports = postcss.plugin('postcss-hyperform', (options = {
  /* extended polyfill is disabled by default due to above scoping issue */
  extended: false,
}) => {
  return root => {
    root.walkRules(rule => {
      rule.walkDecls(decl => {
        var userErrorPseudos = [];
        rule.selectors.forEach(function (selector) {
          const new_selector = updateSelector(selector, !! options.extended);
          if (selector !== new_selector) {
            userErrorPseudos.push(new_selector);
          }
        });

        if (userErrorPseudos.length) {
          rule.selectors = rule.selectors.concat(userErrorPseudos);
        }
      });
    });
  };
});
