import { useState, useMemo, useEffect } from 'react';

type IComp = {
    date: Date;
    name: string;
    number: number;
    distance: string;
}

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

    const items = useMemo(() => {
        console.log('sort!')
        let sortableItems = [...props.data];
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
    }, [props.data, sortConfig]);

    const requestSort = (key: keyof IComp) => {
        let direction = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    }

    useEffect(() => {
        const range = calculateRange(items, props.rowsPerPage);
        setRange([...range]);

        const slice = sliceData(items, props.page, props.rowsPerPage);
        setSlice([...slice]);
    }, [items, setRange, props.page, setSlice]);

    return {
        items,
        requestSort,
        sortConfig,
        slice, 
        range
    };
};