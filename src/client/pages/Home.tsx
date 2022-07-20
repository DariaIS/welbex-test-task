import React from 'react';
import { useEffect } from 'react';
import Axios from 'axios';

export const Home: React.FC = () => {
    useEffect(() => {
        Axios.get('http://localhost:8080/api/comps')
            .then((response) => {
                console.log(response.data);
            }).catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div>Hello World</div>
    );
};