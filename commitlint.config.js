/** @type {import('@commitlint/types').UserConfig} */
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'build',
        'chore',
      ],
    ],
    'header-max-length': [2, 'always', 72],
    'subject-case': [2, 'always', 'sentence-case'],
  },
}
