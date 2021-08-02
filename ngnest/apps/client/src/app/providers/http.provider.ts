export const BASE_PATH_PROVIDER_TOKEN = 'BASE_PATH_PROVIDER_TOKEN'
export const basePathProvider = (basePath: string) => ({
    provide: BASE_PATH_PROVIDER_TOKEN,
    useValue: basePath
})