const fs = require('fs');
const base = require('./hrx.base.json');
const pkgJson = require('./package.json');

const langs = [
  {
    scope: 'source.tsx',
    extension: 'tsx',
    language: 'typescriptreact',
  },
  {
    scope: 'source.ts',
    extension: 'ts',
    language: 'typescript',
  },
  {
    scope: 'source.js',
    extension: 'm?jsx?',
    language: 'javascriptreact',
  },
  {
    scope: 'source.json',
    extension: 'json',
    language: 'json',
  },
  {
    scope: 'source.yaml',
    extension: 'ya?ml',
    language: 'yaml',
  },
  {
    scope: 'source.css',
    extension: 'css',
    language: 'css',
  },
  {
    scope: 'source.css.mcss',
    extension: 'mcss',
    language: 'mcss',
  },
  {
    scope: 'source.css.scss',
    extension: 's(a|c)ss',
    language: 'scss',
  },
  {
    scope: 'source.css.less',
    extension: 'less',
    language: 'less',
  },
  {
    scope: 'text.html.markdown',
    extension: 'md',
    language: 'markdown',
  },
  {
    scope: 'text.html.markdown',
    extension: 'md',
    language: 'markdown',
  },
  {
    scope: 'text.html.markdown,jsx',
    extension: 'mdx',
    language: 'markdownreact',
  },
  {
    scope: 'source.python',
    extension: 'py',
    language: 'python',
  },
  {
    scope: 'source.cs',
    extension: 'cs',
    language: 'csharp',
  },
  {
    scope: 'source.java',
    extension: 'java',
    language: 'java',
  },
  {
    scope: 'source.ruby',
    extension: 'rb',
    language: 'ruby',
  },
].reverse();

pkgJson.contributes.grammars[0].embeddedLanguages = {};

for (const { scope, extension, language } of langs) {
  base.patterns.unshift({ include: `#entry_${language}` });

  const parentScope = `meta.embedded.${language}`;

  base.repository[`entry_${language}`] = {
    contentName: parentScope,
    begin: `(\\<=+\\>)\\s*(.+\\.${extension})`,
    beginCaptures: {
      '1': {
        patterns: [{ include: '#boundary' }],
      },
      '2': {
        patterns: [{ include: '#file' }],
      },
    },
    patterns: [{ include: scope }],
    end: '^(?=\\1)',
  };

  pkgJson.contributes.grammars[0].embeddedLanguages[parentScope] = language;
}

fs.writeFileSync(
  `${__dirname}/syntaxes/hrx.tmLanguage.json`,
  JSON.stringify(base, null, 2),
);

fs.writeFileSync(
  `${__dirname}/package.json`,
  JSON.stringify(pkgJson, null, 2),
);
