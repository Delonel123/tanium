import React from 'react';
import s from './FilterButton.module.scss';
interface FilterButtonProps {
    text?: string;
    icon?: string;
}

const FilterButton: React.FC<FilterButtonProps> = ({text, icon}) => {
    return (
        <button className={s['filter__button']}>
            {text && text}
            {icon && (
                <img src={icon} className={s['filter__button-image']}></img>
            )}
        </button>
    );
};

export default FilterButton;
