import {useAppSelector} from '../hooks/redux';
import React from 'react';
import {SideFilter} from '../components';
const SideFilterContainer = () => {
    const {data} = useAppSelector((state) => state).dataModelInfo;
    return <SideFilter data={data} />;
};

export default SideFilterContainer;
