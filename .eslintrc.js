module.exports = {
    extends: ['eslint:recommended', 'loris/es6'],
    root: true,
    env: {
        node: true,
        es6: true
    },
    rules: {
        'no-console': 'off',
        camelcase: ['error', {properties: 'never'}],
        indent: ['error', 4, {SwitchCase: 1, MemberExpression: 1}],
        'no-empty': ['error', {allowEmptyCatch: true}],
    }
};
