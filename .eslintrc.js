module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "react-app",
        'plugin:prettier/recommended', // 用来做prettier的，配合rules下面的"prettier/prettier": "error"使用
        "prettier"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
        "prettier/prettier": "off", // error
        "@typescript-eslint/no-this-alias": ["off"],
        "react/prop-types": "off"
    }
};