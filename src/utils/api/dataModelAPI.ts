import {dataModel} from '../../types/dataModelInfo';
import $axios from './';

export const fetchDataModelAPI = async () => {
    const {data} = await $axios.get<dataModel>(
        '/Discovery/Server/DataModel/default',
    );
    return data;
};

export const fetchDataTableAPI = async (properties) => {
    const {data} = await $axios.post(
        '/Discovery/Server/ExploreData/ru-RU/data_by_report_model',
        {
            properties,
        },
    );
    return data;
};
