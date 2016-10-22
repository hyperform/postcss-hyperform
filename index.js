'use strict';


const postcss = require('postcss');


function updateSelector(selector) {
  return (selector
    .replace(/:user-(invalid|error)\b/g, '.hf-user-invalid')
    .replace(/:user-valid\b/g, '.hf-user-valid')
    .replace(/:in-range\b/g, '.hf-in-range')
    .replace(/:out-of-range\b/g, '.hf-out-of-range')
    .replace(/:invalid\b/g, '.hf-invalid')
    .replace(/:valid\b/g, '.hf-valid')
  );
}


module.exports = postcss.plugin('postcss-hyperform', (options = {}) => {
  return root => {
    root.walkRules(rule => {
      rule.walkDecls(decl => {
        var userErrorPseudos = [];
        rule.selectors.forEach(function (selector) {
          const new_selector = updateSelector(selector);
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
