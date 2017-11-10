import { Router, Request, Response } from 'express';


export class Route {
    protected type: string;
    protected url: string;
    response (router: Router): void {
        switch (this.type) {
            case 'get':
                router.get(this.url, this.execute);
                break;
            case 'post': 
                router.post(this.url, this.execute);
                break;
            case 'delete':
                router.delete(this.url, this.execute);
                break;
            case 'patch':
                router.patch(this.url, this.execute);
                break;
            case 'put':
                router.put(this.url, this.execute);
                break
            default:
        }
    }
    execute (req: Request, res: Response): void {}
}

export const GET = (url: string) => {
    return (constructor: Function) => {
        Object.defineProperty(constructor.prototype, 'url', {
            value: url
        });
        Object.defineProperty(constructor.prototype, 'type', {
            value: 'get'
        });
    }
}

export const POST = (url: string) => {
    return (constructor: Function) => {
        Object.defineProperty(constructor.prototype, 'url', {
            value: url
        });
        Object.defineProperty(constructor.prototype, 'type', {
            value: 'post'
        });
    }
}

export const DELETE = (url: string) => {
    return (constructor: Function) => {
        Object.defineProperty(constructor.prototype, 'url', {
            value: url
        });
        Object.defineProperty(constructor.prototype, 'type', {
            value: 'delete'
        });
    }
}

export const PATCH = (url: string) => {
    return (constructor: Function) => {
        Object.defineProperty(constructor.prototype, 'url', {
            value: url
        });
        Object.defineProperty(constructor.prototype, 'type', {
            value: 'patch'
        });
    }
}

export const PUT = (url: string) => {
    return (constructor: Function) => {
        Object.defineProperty(constructor.prototype, 'url', {
            value: url
        });
        Object.defineProperty(constructor.prototype, 'type', {
            value: 'put'
        });
    }
}