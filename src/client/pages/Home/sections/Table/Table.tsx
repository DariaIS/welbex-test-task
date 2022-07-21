import React, { useState, useEffect } from 'react';

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
    const [page, setPage] = useState(1);

    const {
        items,
        requestSort,
        sortConfig,
        slice,
        range
    } = useTable({ data, page, rowsPerPage: 5 });

    const getClassNamesFor = (name: string) => {
        if (!sortConfig) {
            return;
        }
        return sortConfig.key === name && sortConfig.direction;
    };

    useEffect(() => {
        if (slice.length < 1 && page !== 1) {
            setPage(page - 1);
        }
    }, [slice, page, setPage]);

    return (
        <div className={s.section}>
            <table className={s.table}>
                {/* {console.log(items)} */}
                <thead className={s.thead}>
                    <tr className={s.tr}>
                        {headers.map((elem, index) => (
                            // console.log(elem) 
                            <th key={index}
                                onClick={() => requestSort(elem.columnKey)}
                                className={s.th + ' ' + s.thSortable + ' ' + getClassNamesFor(elem.columnKey)}>{elem.columnName}</th>
                        ))}
                    </tr>
                </thead>
                <tbody className={s.tbody}>
                    {slice.map((obj, index) => (
                        <tr key={index} className={s.tr}>
                            {(Object.keys(slice[0]) as (keyof typeof obj)[]).map((elem, i) => (
                                elem in obj && <td key={i} className={s.td}>{obj[elem].toString()}</td>
                            ))}
                        </tr>
                    ))
                    }
                </tbody>
            </table>
            <div className={s.pagination}>
                {range.map((el, index) => (
                    <button
                        key={index}
                        className={`${s.paginationButton} ${page === el ? s.active : s.inactive}`}
                        onClick={() => setPage(el)}
                    >
                        {el}
                    </button>
                ))}
            </div>
        </div>
    );
};