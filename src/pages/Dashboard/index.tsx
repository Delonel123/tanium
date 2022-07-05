import {DashboardCanvas} from '../../components';
import React from 'react';
import Dropdown from 'react-dropdown';
import s from './Dashboard.module.scss';

const options = ['Defoult', 'Defoult1', 'Defoult2', 'Defoult3', 'Defoult4'];

function Dashboard() {
    const defaultOption = options[0];
    return (
        <div className={s.dashboard__wrapper}>
            <div className={s.header}>
                <p className={s.header__title}> Edit Overview </p>
                <div className={s.header__buttons}>
                    <button className={s.button}> Cancel</button>
                    <button className={s.button}> Reorder Section</button>
                    <button className={s.button}> add</button>
                    <button className={s.button}> save</button>
                </div>
            </div>
            <div className={s.dashboard__options}>
                <div className={s.option__item}>
                    <p className={s.dropdown__title}>Computer Group:</p>
                    <Dropdown
                        options={options}
                        value={defaultOption}
                        placeholder="Select an option"
                    />
                </div>
                <div className={s.option__item}>
                    <p className={s.dropdown__title}>TimeFrame: </p>
                    <Dropdown
                        options={options}
                        value={defaultOption}
                        placeholder="Select an option"
                    />
                </div>
            </div>
            <div className={s.dashboard__inner}>
                <div className={s.dashboard__head}>
                    <p className={s.dashboard__heaed_title}>Overview</p>
                    <div className={s.dashboard__buttons}>
                        <button className={s.button}> Add</button>
                        <button className={s.button}> Delete</button>
                    </div>
                </div>
                <DashboardCanvas />
            </div>
        </div>
    );
}

export default Dashboard;
