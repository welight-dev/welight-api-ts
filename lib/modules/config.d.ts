export declare class Environment {
    static env: string;
    static plataform: string;
    static types: any;
    static google_api_key: any;
    static set(env: string, plataform?: string): void;
    static getDomainSite(name: string, uri?: string): string;
    static getAppName(app_token: string): string;
    static getGoogleApiKey(service: string): string;
}
