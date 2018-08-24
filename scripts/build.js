const path = require('path');
const fs = require('fs-extra');
const klawSync = require('klaw-sync');


const buildDir = path.resolve(__dirname, '..', 'build');
const installHtmlPath = path.resolve(__dirname, '..', 'build', 'install.html');

klawSync(buildDir, { nodir: true }).map(function (file) {
  if (file.path.match(/\/index\.html$/)) {
    file.destination = file.path.replace(/\/index\.html$/, "/install.html");
    return file;
  }


  if (file.path.match(/\/main\.[^/]+$/)) {
    file.destination = file.path.replace(/\/main\.([^/]+)$/, '/install.$1');
    return file;
  }

  return null;
})
  .filter(x => !!x)
  .forEach(function(file) {
    fs.copySync(file.path, file.destination);
  })
;

fs.readFile(installHtmlPath, 'utf8', function(err, data) {
  if (err) {
    console.log("failed to process install.html");
    console.log(err);
    process.exit(1);
  }
  const replaced = data.replace(/\/main\.([^/]+)"/g,'/install.$1"');
  fs.writeFile(installHtmlPath, replaced, 'utf8', function(err) {
    if (err) {
      console.log("failed to process install.html");
      console.log(err);
      process.exit(1);
    }
  });
});








