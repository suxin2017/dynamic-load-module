export function loadModule(scope: string, module: string) {
  return async () => {
    // Initializes the share scope. This fills it with known provided modules from this build and all remotes
    await __webpack_init_sharing__("default");
    const container = window[scope]; // or get the container somewhere else
    // Initialize the container, it may provide shared modules
    await container.init(__webpack_share_scopes__.default);
    const factory = await window[scope].get(module);
    const Module = factory();
    return Module;
  };
}

const urlCache = new Map<string, () => void>();
export const initDynamicScript = async (url: string) => {
  return new Promise<() => void>((resolve, reject) => {
    if (!url) return reject(new Error("No url provided"));
    if (urlCache.has(url)) {
      return resolve(urlCache.get(url));
    }
    const element = document.createElement("script");
    element.src = url;
    element.type = "text/javascript";
    element.async = true;

    element.onload = () => {
      const removeScript = () => {
        urlCache.delete(url);
        document.head.removeChild(element);
      };
      urlCache.set(url, removeScript);
      resolve(removeScript);
    };

    element.onerror = (e) => {
      reject(e);
    };

    document.head.appendChild(element);
  });
};

export const importRemoteModule = async ({
  url,
  scope,
  module,
}: {
  url: string;
  scope: string;
  module: string;
}) => {
  const removeScript = await initDynamicScript(url);
  return {
    removeScript,
    loadModule: loadModule(scope, module),
  };
};
