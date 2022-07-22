import { useState, useMemo, useEffect } from 'react';

import { IComp } from 'Common/Types/IComp';

type Props = {
    data: IComp[];
    page: number;
    rowsPerPage: number;
};

type ISortConfig = {
    key: keyof IComp | null;
    direction: string | null;
};

export const useTable = (props: Props) => {
    const [sortConfig, setSortConfig] = useState<ISortConfig>({
        key: null,  //поле по которому будет выполняться сортировка
        direction: null //направление сортировки
    });
    const [range, setRange] = useState([0]);
    const [slice, setSlice] = useState<IComp[]>([]);
    const [field, setField] = useState<keyof IComp>('date');
    const [condition, setCondition] = useState('equals');
    const [condValue, setCondValue] = useState('');

    const calculateRange = (data: IComp[], rowsPerPage: number) => {
        const range = [];
        const num = Math.ceil(data.length / rowsPerPage);
        for (let i = 1; i <= num; i++) {
            range.push(i);
        }
        return range;
    };

    const sliceData = (data: IComp[], page: number, rowsPerPage: number) => {
        return data.slice((page - 1) * rowsPerPage, page * rowsPerPage);
    };

    const sorting = (data: IComp[]) => {
        let sortableItems = [...data];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => { //взависимости от значения направления выполняется сортировка
                if (sortConfig.key) {
                    if (a[sortConfig.key] < b[sortConfig.key]) {
                        return sortConfig.direction === 'ascending' ? -1 : 1;
                    }
                    if (a[sortConfig.key] > b[sortConfig.key]) {
                        return sortConfig.direction === 'ascending' ? 1 : -1;
                    }
                }
                return 0;
            });
        }
        return sortableItems;
    }

    const filter = (data: IComp[]) => {
        let filterItems = [...data];
        if (field && condition && condValue) {
            switch (condition) {
                case 'equals':
                    return filterItems = data.filter(element => element[field] == condValue);
                case 'includes':
                    return filterItems = data.filter(element => {
                        return element[field].toString().includes(condValue)
                    });
                default:
                    //фильтрация по условиям больше и меньше
                    return filterItems = data.filter(element => {
                        if (field == 'date') {
                            //для того, чтобы фильтрация по дате работала корректно,
                            //необходимо преобразовать ее в формат Date,
                            //метод split не обходим для корректного преобразования в стандартную запись
                            let condTempValue = new Date((condValue.toString().split('.')[2]
                                + '-' + condValue.toString().split('.')[1]
                                + '-' + condValue.toString().split('.')[0]));
                            let elemTempValue = new Date((element[field].toString().split('.')[2]
                                + '-' + element[field].toString().split('.')[1]
                                + '-' + element[field].toString().split('.')[0]));
                            return condition == 'greater' ? elemTempValue > condTempValue : elemTempValue < condTempValue;
                        }
                        return condition == 'greater' ? element[field] > condValue : element[field] < condValue;
                    });
            }
        }
        return filterItems;
    }

    const items = useMemo(() => {   
        //данная переменная пересчитывается при изменении значения переменных, указанных в скобках
        //она возвращает функцию filter, аргументом которой является возвращаемое значение функции sorting, 
        //то есть отсортированная таблица 
        return filter(sorting(props.data));
    }, [field, condition, condValue, sortConfig]); //то есть при изменеии опций фильтрации и сортировки 

    //функция для определения направления сортировки
    const requestSort = (key: keyof IComp) => { 
        let direction = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    }

    const handleChange = (e: { target: any; }) => { //функция, подхватывающая изменения значений полей фильтрации
        switch (e.target.name) {
            case 'field':
                setField(e.target.value.trim());
                break;
            case 'condition':
                setCondition(e.target.value.trim());
                break;
            case 'condValue':
                setCondValue(e.target.value.trim());
                break;
            default:
                break;
        };
    }

    useEffect(() => {
        //при загрузке компонента, изменении записей таблицы и переходе на другую страницу вызывается функция 
        //подсчета количества страниц пагинации и
        //функция делящая все записи по их количеству на страницу 
        const range = calculateRange(items, props.rowsPerPage);
        setRange([...range]);

        const slice = sliceData(items, props.page, props.rowsPerPage);
        setSlice([...slice]);
    }, [items, setRange, props.page, setSlice]);

    return {
        requestSort,
        sortConfig,
        slice,
        range,
        handleChange
    };
};