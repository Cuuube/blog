import { Request, Response } from 'express';
import { GET, Route } from '../controller';


@GET('/')
export class HomeRoute extends Route {
    execute (req: Request, res: Response) {
        res.redirect(302,'/article');
    }
}