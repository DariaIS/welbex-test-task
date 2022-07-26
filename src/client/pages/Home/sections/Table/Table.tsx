import React, { useState, useEffect } from 'react';

// import { Input } from 'Common/UI/Input';
import { Input } from '../../../../UIElements/Input';
import { IComp } from 'Common/Types/IComp';

import { useTable } from './hooks/useTable';

import s from './table.module.scss';

type ITable = {
    headers: {
        //название колонки таблицы
        columnName: string;
        //свойство, соответсвующее колонке
        columnKey: keyof IComp;
    }[];
    data: IComp[];
};

export const Table: React.FC<ITable> = ({ headers, data }) => {
    const [page, setPage] = useState(1);

    const {
        requestSort,
        sortConfig,
        slice,
        range,
        handleChange
    } = useTable({ data, page, rowsPerPage: 5 });

    //функция, которая возвращает имя класса, соотвествующее направлению сортировки
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
            <div className={s.left}>
                <label htmlFor="field" className={s.label}>Выберите поле:</label>
                <select name="field" className={s.select} onChange={(e) => handleChange(e)}>
                    {headers.map((elem, index) => <option key={index} className={s.option} value={elem.columnKey}>{elem.columnName}</option>)}
                </select>
                <label htmlFor="condition" className={s.label}>Выберите условие:</label>
                <select name="condition" className={s.select} onChange={(e) => handleChange(e)}>
                    <option className={s.option} value="equals">Равно</option>
                    <option className={s.option} value="includes">Содержит</option>
                    <option className={s.option} value="greater">Больше</option>
                    <option className={s.option} value="lesser">Меньше</option>
                </select>
                <Input type='text' placeholder='Значение' name="condValue" onChange={(e) => handleChange(e)} />
            </div>
            <div className={s.right}>
                <table className={s.table}>
                    <thead className={s.thead}>
                        <tr className={s.tr}>
                            {headers.map((elem, index) =>
                                <th key={index}
                                    onClick={() => { elem.columnKey != 'date' && requestSort(elem.columnKey) }}
                                    className={s.th + ' ' + s.thSortable + ' ' + getClassNamesFor(elem.columnKey)}>{elem.columnName}</th>
                            )}
                        </tr>
                    </thead>
                    <tbody className={s.tbody}>
                        {/* вывод записей таблицы с учетом пагинации */}
                        {slice.map((obj, index) => (
                            <tr key={index} className={s.tr}>
                                {/* вывод всех значений свойств объекта на основе имени свойства  */}
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
        </div>
    );
};