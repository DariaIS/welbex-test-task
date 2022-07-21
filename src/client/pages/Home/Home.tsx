import React from 'react';
import { useEffect, useState } from 'react';
import Axios from 'axios';

import { Table } from './sections/Table';

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
        <div className='pageContainer'>
            {data &&
                <Table
                    headers={[
                        { columnName: 'Дата', columnKey: 'date' },
                        { columnName: 'Название', columnKey: 'name' },
                        { columnName: 'Количество', columnKey: 'number' },
                        { columnName: 'Расстояние', columnKey: 'distance' },

                    ]}
                    data={data}
                />
            }
        </div>
    );
};