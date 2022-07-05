import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import clsx from 'clsx';
import homeIcon from 'Assets/icons/home.svg';
import DataAnalysisIcon from 'Assets/icons/data-analisis.svg';

import s from './Navigation.module.scss';

const menuData = [
    {
        id: 0,
        path: '/dashboard',
        icon: homeIcon,
        text: 'Домой',
    },
    {
        id: 1,
        path: '/explore-data',
        icon: DataAnalysisIcon,
        text: 'Анализ',
    },
];

function Navigation() {
    const [activeTab, setActiveTab] = useState<number>(1);
    return (
        <div className={s.navigation}>
            {menuData.map((item, index) => {
                return (
                    <Link
                        onClick={() => setActiveTab(index)}
                        key={index}
                        to={item.path}
                        className={clsx(s.navigation__link, {
                            [s['navigation__link--active']]:
                                activeTab === index,
                        })}>
                        <img src={item.icon} className={s.navigation__icon} />
                        {item.text}
                    </Link>
                );
            })}
        </div>
    );
}

export default Navigation;
