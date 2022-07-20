import { Request, Response } from 'express';

import db from './db';

type IComp = {
    date: Date;
    name: string;
    number: number;
    distance: string;
}

export const Controller = {
    GetComps: async (req: Request, res: Response) => {
        await db.query(
            'SELECT date, name, number, distance FROM comp',
            (error: Error, result: { rows: IComp[]; }) => {
                if (error) {
                    res.send({ error: error });
                    throw error;
                }
                else {
                    const comp: IComp[] = result.rows;
                    res.header("Access-Control-Allow-Origin", "*");
                    res.json(comp);
                }
            }
        );
    }
}