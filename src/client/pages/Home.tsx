import React from 'react';
import { useEffect, useState } from 'react';
import Axios from 'axios';

import { Table } from '../components/Table';

export const Home: React.FC = () => {

    type IComp = {
        date: Date;
        name: string;
        number: number;
        distance: string;
    }

    const [data, setData] = useState<IComp[]>();

    useEffect(() => {
        Axios.get('http://localhost:8080/api/comps')
            .then((response) => {
                setData(response.data);
            }).catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <>
        fsdfsd
            {data &&
                <Table
                    headers={[
                        { columnName: 'Дата', columnKey: 'date' },
                        { columnName: 'Название', columnKey: 'date' },
                        { columnName: 'Количество', columnKey: 'date' },
                        { columnName: 'Расстояние', columnKey: 'date' },

                    ]}
                    data={data}
                />
            }
        </>
    );
};