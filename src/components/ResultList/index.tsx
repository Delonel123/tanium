import {Input, ResultListFilter, TableData} from '../../components';
import React from 'react';

import inputIcon from '../../assets/icons/search.svg';
import s from './ResultList.module.scss';
import {useAppSelector} from '../../hooks/redux';
function ResultList() {
    const {data} = useAppSelector((state) => state.dataTableModal);
    return (
        <div className={s['result__list']}>
            <ResultListFilter />
            <div className={s['found__item']}>
                <p>Найдено {data.length}</p>
                <div style={{display: 'flex'}}>
                    <div className={s['options__butons']}>
                        <button className={s['options__buton']}>
                            Добавить визуализация
                        </button>
                        <button className={s['options__buton']}>Скачать</button>
                    </div>
                    <Input
                        width="200px"
                        placeholder="Фильтр данных"
                        icon={inputIcon}
                    />
                </div>
            </div>
            <TableData dataTable={data} />
        </div>
    );
}

export default ResultList;
