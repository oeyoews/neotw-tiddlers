```javascript
// check tiddlywiki update

version = $tw.version;

fetch('https://registry.npmjs.org/tiddlywiki', {
  headers: { Accept: 'application/vnd.npm.install-v1+json' },
})
  .then(response => response.json())
  .then(data => {
    const latestVersion = data['dist-tags'].latest;
    if (version != latestVersion) {
      console.log(`A new version of TiddlyWiki is available: ${latestVersion}`);
    }
    console.log(`Your TiddlyWiki version is latest version: ${version}`);
  })
  .catch(error => console.error(error));
```