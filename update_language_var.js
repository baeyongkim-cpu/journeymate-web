const fs = require('fs');
const files = [
  'src/app/destinations/page.tsx',
  'src/app/blog/[id]/BlogPostContent.tsx',
  'src/app/blog/page.tsx',
  'src/app/mypage/page.tsx',
  'src/app/builder/page.tsx'
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/const \{ t, language \} = useLanguage\(\);/g, 'const { t, lang } = useLanguage();');
    content = content.replace(/language === 'en'/g, "lang === 'en'");
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  }
});
