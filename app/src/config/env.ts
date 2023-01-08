const environment = import.meta.env;

interface Env {
  slidePackageId: string;
  streamRegistryId: string;
  suiRpcUrl: string;
}

export const env: Env = {
  slidePackageId: environment.VITE_SLIDE_PACKAGE_ID,
  streamRegistryId: environment.VITE_STREAM_REGISTRY_ID,
  suiRpcUrl: environment.VITE_SUI_RPC_URL,
};
