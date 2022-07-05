import React from 'react';
import inputArrowIcon from 'Assets/icons/input-arrow-bottom.svg';

import s from './Input.module.scss';
interface InputProps {
    placeholder: string;
    icon?: string;
    width?: string;
    value?: string;
    onChange?: (value: string) => void;
}
// Dispatch<SetStateAction<string>>
const Input: React.FC<InputProps> = ({
    placeholder,
    icon = inputArrowIcon,
    width = '100%',
    value,
    onChange,
}) => {
    return (
        <div style={{width: width}} className={s.wrapper}>
            <input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                style={{width: width}}
                placeholder={placeholder}
                className={s.input}
            />
            <img src={icon} className={s.icon} />
        </div>
    );
};

export default Input;
