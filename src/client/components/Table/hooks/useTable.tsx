import { useState, useMemo } from 'react';

type IComp = {
    date: Date;
    name: string;
    number: number;
    distance: string;
}

type Props = {
    // headers: string[];
    data: IComp[]
};

type ISortConfig = {
    key: keyof IComp | null;
    direction: string | null;
};

export const useTable = (props: Props) => {
    console.log(props.data)
    const [sortConfig, setSortConfig] = useState<ISortConfig>({
        key: null,
        direction: null
    });

    const sortedItems = useMemo(() => {
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

    return {
        items: sortedItems,
        requestSort,
        sortConfig
    };
};