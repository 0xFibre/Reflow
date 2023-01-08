const environment = import.meta.env;

interface Env {
  slidePackageId: string;
  streamRegistryId: string;
  suiRpcUrl: string;
}

export const env: Env = {
  slidePackageId: environment.SLIDE_PACKAGE_ID,
  streamRegistryId: environment.STREAM_REGISTRY_ID,
  suiRpcUrl: environment.SUI_RPC_URL,
};
