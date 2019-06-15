export declare class Environment {
    static env: string;
    static types: any;
    static set(env: string): void;
    static getDomainSite(name: string, uri?: string): string;
    static getAppName(app_token: string): string;
}
