import globals from 'globals'
import pluginJs from '@eslint/js'
import tsEslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import stylistic from '@stylistic/eslint-plugin'
// vue文件解析器
import vueParser from 'vue-eslint-parser'
// import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

export default [
    {
        ignores: ['**/node_modules', '**/dist', '**/output'],
    },
    {
        files: ['**/*.{vue,js,jsx,cjs,mjs,ts,tsx,cts,mts}'],
        rules: {
            // 缩进4个空格
            indent: [0, 4],
            semi: [2, 'never'],
            camelcase: 0,
        },
        languageOptions: {
            parser: vueParser, // 使用vue解析器，这个可以识别vue文件
            parserOptions: {
                parser: tsEslint.parser, // 在vue文件上使用ts解析器
                sourceType: 'module',
            },
        },
    },
    { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    ...tsEslint.configs.recommended,
    ...pluginVue.configs['flat/essential'],
    // ...stylistic.configs['recommended-flat'],
    stylistic.configs.customize({
        'indent': 4,
        'quotes': 'single',
        'semi': false,
        'jsx': true,
        'braceStyle': '1tbs',
        'arrowParens': 'always',
        'declaration-block-trailing-semicolon': null,
    }),
    // {
    //     files: ['**/*.vue'],
    //     languageOptions: {
    //         parserOptions: {
    //             parser: tsEslint.parser,
    //             ecmaVersion: 'latest',
    //             /** 允许在.vue 文件中使用 JSX */
    //             ecmaFeatures: {
    //                 jsx: true,
    //             },
    //         },
    //     },
    // },
    // eslintConfigPrettier,
    eslintPluginPrettierRecommended,
    {
        rules: {
            'prettier/prettier': [
                'error',
                {
                    // endOfLine: "auto"
                    semi: false,
                },
            ],
            'no-console': 0, // 关闭console提示
            'vue/valid-template-root': 0,
            '@typescript-eslint/no-unused-vars': 'error', // 变量未使用
            '@typescript-eslint/no-explicit-any': 'off', // ts any声明禁止
        },
    },
]
