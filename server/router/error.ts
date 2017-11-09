import { Request, Response } from 'express';
import { GET, POST, DELETE } from '../controller';


@GET('/error/404')
export class Error404Route {
    execute (req: Request, res: Response) {
        res.send(JSON.stringify({'msg': '404 not found'}));
    }
}

@GET('/error/500')
export class Error500Route {
    execute (req: Request, res: Response) {
        res.send(JSON.stringify({'msg': '500 server error'}));
    }
}
