import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "script",
      globals: globals.browser, 
    },
    rules: {
      "quotes": ["error", "single"],      
      "semi": ["error", "always"],        
      "no-unused-vars": ["warn"],       
      "indent": ["error", 2],             
      "comma-dangle": ["error", "never"],  
      "object-curly-newline": [        
        "error", {
          "ObjectExpression": { "minProperties": 1 },
          "ObjectPattern": { "minProperties": 3 }
        }
      ],
      "object-property-newline": [
        "error", {
          "allowAllPropertiesOnSameLine": false
        }
      ]
    },
  },
  pluginJs.configs.recommended, 
];
