# import remote module

```javascript
const { loadModule, removeScript } = await importRemoteModule({
  url: remoteUrl,
  scope: scope,
  module: module,
});
const module = await loadModule();
```
