import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import s from './Bredcrums.module.scss';

export interface IBreadcrumbsLocationState {
    id: string;
    path: string;
    title: string;
    url: string;
}

const Bredcrums: React.FC = () => {
    const {pathname} = useLocation();
    if (pathname) {
        return (
            <div className={s.bredcrums}>
                <Link className={s.bredcrums__link} to={'/explore-data'}>
                    Анализ данных
                </Link>
            </div>
        );
    }
    return null;
};
export default Bredcrums;
