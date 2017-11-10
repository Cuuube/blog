import { Request, Response } from 'express';
import { GET, Route } from '../controller';


@GET('/error/404')
export class Error404Route extends Route {
    execute (req: Request, res: Response) {
        res.send(JSON.stringify({'msg': '404 not found'}));
    }
}

@GET('/error/500')
export class Error500Route extends Route {
    execute (req: Request, res: Response) {
        res.send(JSON.stringify({'msg': '500 server error'}));
    }
}
