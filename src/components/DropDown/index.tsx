import React, {useState} from 'react';
import s from './DropDown.module.scss';

import arrowIcon from 'Assets/icons/arrow.svg';
import clsx from 'clsx';

interface DropDownProps {
    data: string[];
    width: string;
}

const DropDown: React.FC<DropDownProps> = ({data, width}) => {
    const [showItems, setShowItems] = useState(false);
    const [selectedItem, setSelectedItem] = useState(data[0]);

    const handleOpenDropDown = () => {
        setShowItems(!showItems);
    };
    const handleSelectedItem = (item: string) => {
        setSelectedItem(item);
        setShowItems(false);
    };
    return (
        <div style={{width: width}} className={s.dropdown__wrapper}>
            <div className={s.dropdown__container}>
                <div
                    onClick={handleOpenDropDown}
                    className={s.dropdown__header}>
                    {selectedItem}
                </div>

                <div className={s.dropdown__arrow}>
                    <img
                        src={arrowIcon}
                        className={clsx({
                            [s['dropdown__arrow-up']]: showItems,
                            [s['dropdown__arrow-down']]: !showItems,
                        })}
                    />
                </div>
                <div
                    style={{display: showItems ? 'block' : 'none'}}
                    className={s['dropdown__items']}>
                    {data.map((item, index) => {
                        return (
                            <div
                                onClick={() => handleSelectedItem(item)}
                                key={index}>
                                {item}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
export default DropDown;
