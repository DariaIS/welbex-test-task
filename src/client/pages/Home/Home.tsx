import React from 'react';
import { useEffect, useState } from 'react';
import Axios from 'axios';

import { IComp } from 'Common/Types/IComp';

import { Table } from './sections/Table';

export const Home: React.FC = () => {
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