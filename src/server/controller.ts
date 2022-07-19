import { Request, Response } from 'express';

const db = require('./db');

class Controller {
    async GetComps(req: Request, res: Response) {
        const comp = await db.query('SELECT * FROM comp');
        res.header("Access-Control-Allow-Origin", "*");
        res.json(comp.rows);
    }
}

module.exports = new Controller();