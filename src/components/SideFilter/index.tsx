/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useRef, useState} from 'react';
import s from './SideFilter.module.scss';
import clsx from 'clsx';

import {
    dataModel,
    dataModelObject,
    dataModelObjectProperties,
} from '../../types/dataModelInfo';

import {Input, SearchList} from '../';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import {v4 as uuidv4} from 'uuid';
import 'core-js/actual/array/group-by';
//FIXME: Добавить алиас
import dataCubeIcon from '../../assets/icons/data-cube.svg';
import tooltipIcon from '../../assets/icons/tooltip.svg';
import closeSideFilterIcon from '../../assets/icons/arrow-left.svg';
import inputArrowIcon from '../../assets/icons/input-arrow-bottom.svg';
import arrowBottom from '../../assets/icons/open-drop-down-icon.svg';
import sortSelectecAccept from '../../assets/icons/groupActive.svg';
import sortSelectecUnAccept from '../../assets/icons/groupUnActive.svg';
import deleteSelectedIcon from '../../assets/icons/delete-selected.svg';
import searchIcon from '../../assets/icons/search.svg';
import addIcon from '../../assets/icons/add.svg';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {
    fetchDataTableModel,
    setDataModelTable,
} from '../../redux/dataTableModelSlice';

interface SideFilterProps {
    data: dataModel;
}
interface fetchBody {
    name: string;
    guid: string;
    dataModelPropertyGuid: string;
    dataModelObjectGuid: string;
}

const dataWithoutProperties = (data: dataModelObject[]) => {
    const dataWithoutProp: dataModelObject[] = JSON.parse(JSON.stringify(data));
    dataWithoutProp.map((item) => {
        item.properties = [];
    });
    return dataWithoutProp;
};
//FIXME: Использовать lodash.
const SideFilter: React.FC<SideFilterProps> = ({data}) => {
    const distapth = useAppDispatch();
    const [show, setShow] = useState(true);
    const [groupIdItem, setGroupIdItem] = useState(null);
    const [selectedItem, setSelectedItem] = useState<dataModelObject[]>([]);
    const [filterInputValue, setFilterInputValue] = useState<string>('');
    const [searchInputValue, setSearchInputValue] = useState<string>('');
    const [dateModelWithoutProp, setDateModelWithoutProp] = useState<
        dataModelObject[]
    >([]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const fetchBody = useRef<fetchBody[]>([]);
    const [isSearchObject, setIsSearchObject] = useState<boolean>();
    const dataTable = useAppSelector((state) => state.dataTableModal.data);
    const prevFilterDataTable = useRef([]);
    useEffect(() => {
        const date = dataWithoutProperties(data.objects);
        setDateModelWithoutProp(date);
    }, [data]);
    useEffect(() => {
        if (!prevFilterDataTable.current.length || !groupIdItem) {
            prevFilterDataTable.current = dataTable;
        }
    }, [dataTable]);

    const handleGroup = (
        item: dataModelObject,
        itemProp: dataModelObjectProperties,
    ) => {
        //FIXME: Если отправить запросс на другой объект, то prevFilterDataTable не изменится
        const newData = JSON.parse(JSON.stringify(prevFilterDataTable.current));
        if (itemProp.guid === groupIdItem) {
            setGroupIdItem(null);
            distapth(setDataModelTable(prevFilterDataTable.current));
        } else {
            setGroupIdItem(itemProp.guid);
            const strGroupBy = `${item.description} / ${itemProp.description}`;
            const groupArr = newData.groupBy((product) => {
                return product[strGroupBy];
            });
            const groupData = [].concat(...Object.values(groupArr));
            // eslint-disable-next-line react-hooks/rules-of-hooks
            distapth(setDataModelTable(groupData));
        }
    };
    //FIXME: убрать useCallback
    const handleSelected = useCallback(
        (
            e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
            item: dataModelObject,
            itemProp: dataModelObjectProperties = null,
        ) => {
            // FIXME: Исправить
            e.stopPropagation();
            if (itemProp) {
                if (
                    !fetchBody.current.find(
                        (item) => item.dataModelPropertyGuid === itemProp.guid,
                    )
                ) {
                    fetchBody.current.push({
                        guid: uuidv4(),
                        name: `${item.description} / ${
                            itemProp && itemProp.description
                        }`,
                        dataModelObjectGuid: item.guid,
                        dataModelPropertyGuid: itemProp.guid,
                    });
                    distapth(fetchDataTableModel(fetchBody.current));
                }
                const newSelectedItem = dateModelWithoutProp.find(
                    (i) => i.guid === item.guid,
                );
                //FIXME: Вынести услови в переменную
                if (
                    selectedItem.filter((i) => i.guid === item.guid).length >
                        0 &&
                    !selectedItem
                        .find((i) => i.guid === item.guid)
                        .properties.find((i) => i.guid === itemProp.guid)
                ) {
                    newSelectedItem.properties.push(itemProp);
                    const newStateSelectedItem = selectedItem.map((i) => {
                        if (i.guid === newSelectedItem.guid) {
                            i.properties = newSelectedItem.properties;
                        }
                        return i;
                    });
                    setSelectedItem(newStateSelectedItem);
                } else {
                    //FIXME: Вынести услови в переменную или вынести условие в отдельную функцию, т.к. используется много где,
                    // и заменить все условия на функцию
                    if (
                        !newSelectedItem.properties.find(
                            (i) => i.guid === itemProp.guid,
                        )
                    ) {
                        newSelectedItem.properties.push(itemProp);
                        setSelectedItem([...selectedItem, newSelectedItem]);
                    }
                }
            } else {
                if (!selectedItem.find((i) => i.guid === item.guid)) {
                    const newStateDateModelWithOutProp =
                        dateModelWithoutProp.map((i) => {
                            if (i.guid === item.guid) {
                                i.properties = item.properties;
                            }
                            return i;
                        });
                    setDateModelWithoutProp(newStateDateModelWithOutProp);
                    setSelectedItem([...selectedItem, item]);
                    item.properties.forEach((prop) => {
                        fetchBody.current.push({
                            guid: uuidv4(),
                            name: `${item.description} / ${
                                prop && prop.description
                            }`,
                            dataModelObjectGuid: item.guid,
                            dataModelPropertyGuid: prop.guid,
                        });
                    });
                    distapth(fetchDataTableModel(fetchBody.current));
                }
            }
            setGroupIdItem(null);
        },
        [fetchBody, dateModelWithoutProp, selectedItem],
    );
    const handleDeleteSelect = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        item: dataModelObject,
        itemProp = null,
    ) => {
        e.stopPropagation();
        if (itemProp) {
            const rowSelectItem = selectedItem.find(
                (i) => i.guid === item.guid,
            );
            if (rowSelectItem.properties.length === 1) {
                const newArr = selectedItem.filter((i) => i.guid !== item.guid);
                const newStateWitoutProp = dateModelWithoutProp.map((i) => {
                    if (i.guid === item.guid) {
                        i.properties = [];
                    }
                    return i;
                });
                setDateModelWithoutProp(newStateWitoutProp);
                setSelectedItem(newArr);
            } else {
                const newState = selectedItem.map((i) => ({
                    ...i,
                    properties: rowSelectItem.properties.filter(
                        (i) => i.guid !== itemProp.guid,
                    ),
                }));
                setSelectedItem(newState);
            }
            fetchBody.current = fetchBody.current.filter(
                (row) => row.dataModelPropertyGuid !== itemProp.guid,
            );
            distapth(fetchDataTableModel(fetchBody.current));
        } else {
            const newArr = selectedItem.filter((i) => i.guid !== item.guid);
            const newStateWitoutProp = dateModelWithoutProp.map((i) => {
                if (i.guid === item.guid) {
                    i.properties = [];
                }
                return i;
            });
            fetchBody.current = fetchBody.current.filter(
                (row) => row.dataModelObjectGuid !== item.guid,
            );
            distapth(fetchDataTableModel(fetchBody.current));
            setDateModelWithoutProp(newStateWitoutProp);
            setSelectedItem(newArr);
        }
    };
    //FIXME: написать кастомный хук
    const filterModel = () => {
        const newData: dataModelObject[] = JSON.parse(
            JSON.stringify(data.objects),
        );
        const FoundModels = newData.filter((model) => {
            return model.description
                .toLowerCase()
                .includes(filterInputValue.toLowerCase());
        });
        if (!FoundModels.length) {
            const row: dataModelObject[] = [];
            newData.filter((model) => {
                model.properties.map((item) => {
                    if (
                        item.description
                            .toLowerCase()
                            .includes(filterInputValue.toLowerCase())
                    ) {
                        if (!row.includes(model)) {
                            row.push(model);
                        }
                    }
                });
            });
            row.map((item) => {
                item.properties = item.properties.filter((prop) =>
                    prop.description
                        .toLowerCase()
                        .includes(filterInputValue.toLowerCase()),
                );
            });
            return row;
        }
        return FoundModels;
    };
    //FIXME: написать кастомный хук
    const searchData = () => {
        const newData: dataModelObject[] = JSON.parse(
            JSON.stringify(data.objects),
        );
        const searchData = newData.filter((model) => {
            return model.description
                .toLowerCase()
                .includes(searchInputValue.toLowerCase());
        });
        if (searchInputValue && searchData.length) {
            !isSearchObject && setIsSearchObject(true);
        }
        if (!searchData.length) {
            // Поиск по полям модели
            // searchData =
            const row: dataModelObject[] = [];
            newData.filter((model) => {
                model.properties.map((item) => {
                    if (
                        item.description
                            .toLowerCase()
                            .includes(searchInputValue.toLowerCase())
                    ) {
                        if (!row.includes(model)) {
                            isSearchObject && setIsSearchObject(false);
                            // setIsSearchObject(false);
                            row.push(model);
                        }
                    }
                });
            });
            row.map((item) => {
                item.properties = item.properties.filter((prop) =>
                    prop.description
                        .toLowerCase()
                        .includes(searchInputValue.toLowerCase()),
                );
            });
            return row;
        }
        return searchInputValue ? searchData : [];
    };
    return (
        <>
            {show ? (
                <div className={s.side__filter}>
                    <div className={s['side__filter-header']}>
                        <p className={s['filter__header-text']}>
                            <img
                                src={dataCubeIcon}
                                className={s['filter__header-icon']}
                            />
                            Source Data
                        </p>
                        <div className={s['filter-header-left']}>
                            <img
                                src={tooltipIcon}
                                className={s['filter__header-tooltip']}
                            />
                            <button
                                onClick={() => setShow(false)}
                                className={s['filter__header-close']}>
                                <img
                                    src={closeSideFilterIcon}
                                    className={s['filter__header-close-icon']}
                                />
                            </button>
                        </div>
                    </div>
                    <Input
                        value={searchInputValue}
                        onChange={setSearchInputValue}
                        placeholder="Добавить колонку"
                        icon={inputArrowIcon}
                    />
                    {searchData().length > 0 && (
                        <SearchList
                            handleSelecter={handleSelected}
                            searchData={searchData}
                            isSearchObject={isSearchObject}
                        />
                    )}
                    <div className={s.selected__columns}>
                        <div className={s['selected__columns-header']}>
                            <img
                                className={s['selected__columns-header-icon']}
                                src={arrowBottom}
                            />
                            <p className={s['selected__columns-title']}>
                                Выбрано колоннок {selectedItem.length}
                            </p>
                        </div>
                        {selectedItem.length > 0 && (
                            <div className={s['selected__content']}>
                                {selectedItem.map((item, index) => {
                                    return (
                                        <Accordion
                                            key={index}
                                            allowZeroExpanded={true}>
                                            <AccordionItem>
                                                <AccordionItemHeading
                                                    className={
                                                        s['selected__item']
                                                    }>
                                                    <AccordionItemButton
                                                        className={
                                                            s[
                                                                'selected__item-button'
                                                            ]
                                                        }>
                                                        {item.description}
                                                        <button
                                                            onClick={(e) =>
                                                                handleDeleteSelect(
                                                                    e,
                                                                    item,
                                                                )
                                                            }
                                                            className={
                                                                s[
                                                                    'selected__item-delete'
                                                                ]
                                                            }>
                                                            <img
                                                                src={
                                                                    deleteSelectedIcon
                                                                }
                                                                className={
                                                                    s[
                                                                        'selected__item-delete-icon'
                                                                    ]
                                                                }
                                                            />
                                                        </button>
                                                    </AccordionItemButton>
                                                </AccordionItemHeading>
                                                {item.properties.map(
                                                    (itemProp, index) => {
                                                        return (
                                                            <AccordionItemPanel
                                                                key={index}
                                                                className={
                                                                    s[
                                                                        'selected__item-content'
                                                                    ]
                                                                }>
                                                                <div
                                                                    className={
                                                                        s[
                                                                            'd-flex'
                                                                        ]
                                                                    }>
                                                                    <p>
                                                                        {
                                                                            itemProp.description
                                                                        }
                                                                    </p>
                                                                    <div
                                                                        className={
                                                                            s[
                                                                                'selected__item-rigth'
                                                                            ]
                                                                        }>
                                                                        <button
                                                                            onClick={() =>
                                                                                handleGroup(
                                                                                    item,
                                                                                    itemProp,
                                                                                )
                                                                            }
                                                                            className={
                                                                                s[
                                                                                    'selected__item-sort'
                                                                                ]
                                                                            }>
                                                                            <img
                                                                                src={
                                                                                    itemProp.guid ===
                                                                                    groupIdItem
                                                                                        ? sortSelectecAccept
                                                                                        : sortSelectecUnAccept
                                                                                }
                                                                                className={clsx(
                                                                                    s[
                                                                                        'selected__item-sort-icon'
                                                                                    ],
                                                                                    {
                                                                                        [s[
                                                                                            'selected__item-sort-icon-unActive'
                                                                                        ]]:
                                                                                            itemProp.guid ===
                                                                                            groupIdItem,
                                                                                    },
                                                                                )}
                                                                            />
                                                                        </button>
                                                                        <button
                                                                            className={
                                                                                s[
                                                                                    'selected__item-delete'
                                                                                ]
                                                                            }
                                                                            onClick={(
                                                                                e,
                                                                            ) =>
                                                                                handleDeleteSelect(
                                                                                    e,
                                                                                    item,
                                                                                    itemProp,
                                                                                )
                                                                            }>
                                                                            <img
                                                                                src={
                                                                                    deleteSelectedIcon
                                                                                }
                                                                                className={
                                                                                    s[
                                                                                        'selected__item-delete-icon'
                                                                                    ]
                                                                                }
                                                                            />
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </AccordionItemPanel>
                                                        );
                                                    },
                                                )}
                                            </AccordionItem>
                                        </Accordion>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                    <div className={s['aviable__columns-wrapper']}>
                        <div className={s['selected__columns-header']}>
                            <img
                                className={s['selected__columns-header-icon']}
                                src={arrowBottom}
                            />
                            <p className={s['selected__columns-title']}>
                                Доступные поля {data.objects.length}
                            </p>
                        </div>
                        <Input
                            value={filterInputValue}
                            onChange={setFilterInputValue}
                            placeholder="Доступные поля"
                            icon={searchIcon}
                        />
                        <div className={s['aviable__columns']}>
                            {filterModel().map((item) => {
                                return (
                                    <Accordion
                                        key={item.guid}
                                        allowZeroExpanded={true}>
                                        <AccordionItem>
                                            <AccordionItemHeading
                                                className={s['selected__item']}>
                                                <AccordionItemButton
                                                    className={
                                                        s[
                                                            'selected__item-button'
                                                        ]
                                                    }>
                                                    {item.description}
                                                    <button
                                                        onClick={(e) =>
                                                            handleSelected(
                                                                e,
                                                                item,
                                                            )
                                                        }
                                                        className={
                                                            s[
                                                                'selected__item-delete'
                                                            ]
                                                        }>
                                                        <img
                                                            src={addIcon}
                                                            className={
                                                                s[
                                                                    'selected__item-delete-icon'
                                                                ]
                                                            }
                                                        />
                                                    </button>
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            {item.properties.map((itemProp) => {
                                                return (
                                                    <AccordionItemPanel
                                                        key={itemProp.guid}
                                                        className={
                                                            s[
                                                                'selected__item-content'
                                                            ]
                                                        }>
                                                        <div
                                                            className={
                                                                s['d-flex']
                                                            }>
                                                            <p>
                                                                {
                                                                    itemProp.description
                                                                }
                                                            </p>
                                                            <div
                                                                className={
                                                                    s[
                                                                        'selected__item-rigth'
                                                                    ]
                                                                }>
                                                                <button
                                                                    onClick={(
                                                                        e,
                                                                    ) =>
                                                                        handleSelected(
                                                                            e,
                                                                            item,
                                                                            itemProp,
                                                                        )
                                                                    }
                                                                    className={
                                                                        s[
                                                                            'selected__item-delete'
                                                                        ]
                                                                    }>
                                                                    <img
                                                                        src={
                                                                            addIcon
                                                                        }
                                                                        className={
                                                                            s[
                                                                                'selected__item-delete-icon'
                                                                            ]
                                                                        }
                                                                    />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </AccordionItemPanel>
                                                );
                                            })}
                                        </AccordionItem>
                                    </Accordion>
                                );
                            })}
                        </div>
                    </div>
                </div>
            ) : (
                <div className={s['side__filter--closed']}>
                    <button
                        onClick={() => setShow(true)}
                        className={s['filter__header-close']}>
                        <img
                            src={closeSideFilterIcon}
                            className={s['filter__header-open-icon']}
                        />
                    </button>
                </div>
            )}
        </>
    );
};

export default SideFilter;
