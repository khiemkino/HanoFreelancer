module.exports = {
  root: true,
  parser: "babel-eslint",
  extends: "@react-native-community",
  "parser": "babel-eslint",
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "standard",
    "standard-react"
  ],
  "env": {
    "es6": true
  },
  "plugins": [
    "react",
    "react-native"
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "rules": {
    "no-undef": "error",
    "react-native/no-unused-styles": 2,
    "no-unused-vars": "error",
    "react/prop-types": 0,
    "no-console": 0,
    "react/sort-comp": 2,
    "react/no-string-refs": 0,
    "indent": [
      2,
      2
    ]
  },
  "globals": {
    "fetch": true,
    "enquire": true,
    "FontFaceObserver": true,
    "imagesloaded": true,
    "Modernizr": true
  }
};
