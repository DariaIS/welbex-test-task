import React from 'react';

import { useTable } from './hooks/useTable';

import s from './table.module.scss';

type IComp = {
    date: Date;
    name: string;
    number: number;
    distance: string;
}

type ITable = {
    headers: {
        columnName: string;
        columnKey: keyof IComp;
    }[];
    data: IComp[];
};

export const Table: React.FC<ITable> = ({ headers, data }) => {
    const {
        items,
        requestSort,
        sortConfig,
    } = useTable({ data });

    const getClassNamesFor = (name: string) => {
        if (!sortConfig) {
            return;
        }
        return sortConfig.key === name && sortConfig.direction;
    };

    return (
        <table className={s.table}>
            {/* {console.log(items)} */}
            <thead className={s.thead}>
                <tr>
                    {headers.map((elem, index) => (
                        // console.log(elem) 
                        <th key={index}
                            onClick={() => requestSort(elem.columnKey)}
                            className={s.th + ' ' + s.thSortable + ' ' + getClassNamesFor(elem.columnKey)}>{elem.columnName}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {items.map((obj, index) => (
                    <tr key={index}>
                        {(Object.keys(items[0]) as (keyof typeof obj)[]).map((elem, i) => (
                            elem in obj && <td key={i} className={s.td}>{obj[elem].toString()}</td>
                        ))}
                    </tr>
                ))
                }
            </tbody>
        </table>
    );
};