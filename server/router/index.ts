import { Request, Response } from 'express';
import { GET } from '../controller';


@GET('/')
export class HomeRoute{
    execute (req: Request, res: Response) {
        res.redirect(302,'/article');
    }
}