'use strict';


import postcss from 'postcss';


function updateSelector(selector) {
  return (selector
    .replace(/:user-(invalid|error)\b/g, '.hf-validated.hf-invalid')
    .replace(/:invalid\b/g, '.hf-invalid')
    .replace(/:valid\b/g, '.hf-valid')
  );
}


export default postcss.plugin('postcss-hyperform', (options = {}) => {
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
