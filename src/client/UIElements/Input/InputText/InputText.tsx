import React, { InputHTMLAttributes } from 'react';
import s from './InputText.module.scss';

type Props = InputHTMLAttributes<HTMLInputElement> & {
    someProp?: any;
};

export const InputText: React.FC<Props> = ({ value, placeholder, ...rest }) => {
    return <input className={s.InputText} type="text" value={value} placeholder={placeholder} {...rest} />;
};