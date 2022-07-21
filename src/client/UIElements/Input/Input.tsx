import React, { HTMLInputTypeAttribute, InputHTMLAttributes } from 'react';
import { InputText } from './InputText';

type Props = {
    type: HTMLInputTypeAttribute;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input: React.FC<Props> = ({ type, ...rest }) => {
    switch (type) {
        case 'text':
            return <InputText {...rest} />;
        case 'number':
            return null;
        default:
            return null;
    }
};