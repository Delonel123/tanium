import {useAppSelector} from '../../hooks/redux';
import React from 'react';
import {dataModelTableObject} from '../../types/dataTableModel';
import Skeleton from 'react-loading-skeleton';
import s from './TableData.module.scss';

interface TableDataProps {
    dataTable: dataModelTableObject[];
}
const TableData: React.FC<TableDataProps> = ({dataTable}) => {
    const {isLoading} = useAppSelector((state) => state.dataTableModal);
    const headerTableData: string[] = dataTable[0] && Object.keys(dataTable[0]);
    return (
        <div className={s['data__wrapper']}>
            <div className={s['data__format']}>
                <img src="" className={s['data__format-view']} />
            </div>
            <div className={s.table}>
                {isLoading ? (
                    <>
                        <div className={s['table__header']}>
                            <Skeleton
                                baseColor="#0d2c42"
                                highlightColor="#040518"
                                containerClassName="table__header-text"
                            />
                            <Skeleton
                                baseColor="#0d2c42"
                                highlightColor="#040518"
                                containerClassName="table__header-text"
                            />
                            <Skeleton
                                baseColor="#0d2c42"
                                highlightColor="#040518"
                                containerClassName="table__header-text"
                            />
                        </div>
                        <div className={s['table__row']}>
                            <Skeleton
                                baseColor="#0d2c42"
                                highlightColor="#040518"
                                containerClassName="row__item"
                            />
                            <Skeleton
                                baseColor="#0d2c42"
                                highlightColor="#040518"
                                containerClassName="row__item"
                            />
                            <Skeleton
                                baseColor="#0d2c42"
                                highlightColor="#040518"
                                containerClassName="row__item"
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <div className={s['table__header']}>
                            {headerTableData &&
                                headerTableData.map((item, index) => {
                                    return (
                                        <p
                                            key={index}
                                            className={s['table__header-text']}>
                                            {item}
                                        </p>
                                    );
                                })}
                        </div>
                        {dataTable.map((rows, index) => {
                            return (
                                <div key={index} className={s['table__row']}>
                                    {Object.keys(rows).map((item, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className={s['row__item']}>
                                                {rows[item]}
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </>
                )}
            </div>
        </div>
    );
};

export default TableData;
