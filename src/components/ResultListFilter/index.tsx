import React from 'react';
import {Input, FilterButton} from '../';
import tooltipIcon from '../../assets/icons/tooltip.svg';
import windowIcon from '../../assets/icons/windowIcon.svg';
import appleIcon from '../../assets/icons/appleIcons.svg';
import linuxIcon from '../../assets/icons/linuxIcon.svg';

import s from './ResultListFilter.module.scss';
function ResultListFilter() {
    return (
        <div className={s['result__list-filter']}>
            <button className={s['more-filters']}>Filters</button>
            <p className={s['filter-text']}>Группа компьютеров</p>
            <div style={{display: 'flex'}}>
                <Input
                    width="250px"
                    placeholder={'Фильтр по группе компьютеров'}
                />
                <div>
                    <FilterButton text="or" />
                    <FilterButton text="and" />
                </div>
            </div>
            <img src={tooltipIcon} className={s['filter__header-tooltip']} />
            <p className={s['filter-text']}>Endpoint last seen</p>
            <Input width="250px" placeholder={'Фильтр по группе компьютеров'} />
            <div style={{display: 'flex', alignItems: 'center'}}>
                <p className={s['os']}>ОС</p>
                <div className={s['os__icons']}>
                    <FilterButton text="all" />
                    <FilterButton icon={windowIcon} />
                    <FilterButton icon={appleIcon} />
                    <FilterButton icon={linuxIcon} />
                </div>
            </div>
        </div>
    );
}

export default ResultListFilter;
