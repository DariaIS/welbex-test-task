import { useState, useMemo, useEffect } from 'react';

import { IComp } from 'Common/Types/IComp';

type Props = {
    // headers: string[];
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
        key: null,
        direction: null
    });
    const [range, setRange] = useState([0]);
    const [slice, setSlice] = useState<IComp[]>([]);
    const [field, setField] = useState<keyof IComp>('date');
    const [condition, setCondition] = useState('equals');
    const [condValue, setCondValue] = useState();

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
            sortableItems.sort((a, b) => {
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
        console.log(filterItems);
        if (field && condition && condValue) {
            if (condition === 'equals') {
                filterItems = data.filter(element => element[field] == condValue);
                console.log(data);
                console.log(filterItems);
            }
        }
        console.log('dasds');
        return filterItems;
    }

    const items = useMemo(() => {
        console.log('sort!')
        return filter(sorting(props.data));
    }, [field, condition, condValue, sortConfig]);

    const requestSort = (key: keyof IComp) => {
        let direction = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    }

    const handleChange = (e: { target: any; }) => {
        switch (e.target.name) {
            case 'field':
                console.log(e.target.value.trim());
                setField(e.target.value.trim());
                break;
            case 'condition':
                console.log(e.target.value.trim());
                setCondition(e.target.value.trim());
                break;
            case 'condValue':
                console.log(e.target.value.trim());
                setCondValue(e.target.value.trim());
                break;
            default:
                break;
        };
    }

    useEffect(() => {
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