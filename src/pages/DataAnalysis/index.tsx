import {useAppDispatch} from '../../hooks/redux';
import React, {useEffect} from 'react';
import s from './DataAnalysis.module.scss';
import {fetchDataModelInfo} from '../../redux/dataModelInfoSlice';
import {SideFilter} from '../../containers';

import {ResultList} from '../../components';

const DataAnalysis = () => {
    const distapth = useAppDispatch();
    useEffect(() => {
        distapth(fetchDataModelInfo());
    }, [distapth]);

    return (
        <div className={s.data__analysis}>
            <p className={s['data__analysis-title']}>Анализ данных</p>
            <div className={s['data__analysis-content']}>
                <SideFilter />
                <ResultList />
            </div>
        </div>
    );
};

export default DataAnalysis;
