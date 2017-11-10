

export namespace mdl {

    export interface resData {
        code?: string;
        msg?: string;

    }

    export interface config {
        protocol: string;
        hostname: string;
        port: number;
        host: string;
        origin: string;
        dbPath: string;
        cookiesKeepTime: number;
        manageKey: string;
    }
    
}

