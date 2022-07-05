import {DropDown, Navigation} from '../';
import React from 'react';

import logo from 'Assets/images/logo.svg';

import s from './Header.module.scss';
/*eslint-disable */
const options = ['Администратор','Пользователь','Гость',
];
const optionsPersone = [
 'Андрей','Антон','Иван',
];
/*eslint-enable */
function Header() {
    return (
        <div className={s.header}>
            <img src={logo} className={s.header__logo} />
            <Navigation />
            <div className={s.header__right}>
                <div className={s['header__dropdown-item']}>
                    <DropDown data={optionsPersone} width="90" />
                </div>
                <div className={s['header__dropdown-item']}>
                    <DropDown data={options} width="150" />
                </div>
            </div>
        </div>
    );
}
export default Header;
