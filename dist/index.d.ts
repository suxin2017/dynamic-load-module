export declare function loadModule(scope: string, module: string): () => Promise<any>;
export declare const initDynamicScript: (url: string) => Promise<() => void>;
export declare const importRemoteModule: ({ url, scope, module, }: {
    url: string;
    scope: string;
    module: string;
}) => Promise<{
    removeScript: () => void;
    loadModule: () => Promise<any>;
}>;
