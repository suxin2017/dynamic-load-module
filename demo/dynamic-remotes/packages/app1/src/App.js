import React from 'react';
import { importRemoteModule } from 'dynamic-load-module'

const componentCache = new Map();
export const useFederatedComponent = (remoteUrl, scope, module) => {
  const key = `${remoteUrl}-${scope}-${module}`;
  const [Component, setComponent] = React.useState(null);
  const componentScriptRemove = React.useRef();

  React.useEffect(() => {
    if (Component) setComponent(null);
    // Only recalculate when key changes
  }, [key]);

  React.useEffect(() => {

    (async () => {
      if (!Component && remoteUrl) {
        componentScriptRemove.current?.()
        console.log('Loading module', remoteUrl);
        const { loadModule, removeScript } = await importRemoteModule({ url: remoteUrl, scope: scope, module: module });
        const mo = await loadModule();
        console.log('Loaded module', mo);
        const Comp = React.lazy(loadModule);
        componentCache.set(key, Comp);
        setComponent(Comp);
        componentScriptRemove.current = removeScript;
      }

    })()
  
    // key includes all dependencies (scope/module)
  }, [Component, key]);

  return { Component };
};

function App() {
  const [{ module, scope, url }, setSystem] = React.useState({});

  function setApp2() {
    setSystem({
      url: 'http://localhost:3002/remoteEntry.js',
      scope: 'app2',
      module: './Widget',
    });
  }

  function setApp3() {
    setSystem({
      url: 'http://localhost:3003/remoteEntry.js',
      scope: 'app3',
      module: './Widget',
    });
  }

  const { Component: FederatedComponent } = useFederatedComponent(url, scope, module);

  return (
    <div
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
      }}
    >
      <h1>Dynamic System Host</h1>
      <h2>App 1</h2>
      <p>
        The Dynamic System will take advantage Module Federation <strong>remotes</strong> and{' '}
        <strong>exposes</strong>. It will no load components that have been loaded already.
      </p>
      <button onClick={setApp2}>Load App 2 Widget</button>
      <button onClick={setApp3}>Load App 3 Widget</button>
      <div style={{ marginTop: '2em' }}>
        <React.Suspense fallback="Loading System">
          {FederatedComponent && <FederatedComponent />}
        </React.Suspense>
      </div>
    </div>
  );
}

export default App;
