import React from 'react';
import s from './SearchList.module.scss';
import tooltipIcon from '../../assets/icons/tooltip.svg';
import {
    dataModelObject,
    dataModelObjectProperties,
} from '../../types/dataModelInfo';

interface SearchListProps {
    searchData: () => dataModelObject[];
    isSearchObject: boolean;
    handleSelecter: (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        item: dataModelObject,
        itemProp?: dataModelObjectProperties,
    ) => void;
}
const SearchList: React.FC<SearchListProps> = ({
    searchData,
    handleSelecter,
    isSearchObject,
}) => {
    return (
        <div className={s.search__list}>
            {isSearchObject
                ? searchData().map((item) => {
                      return (
                          <button
                              onClick={(e) => handleSelecter(e, item)}
                              key={item.guid}
                              className={s.search__item}>
                              {item.description}
                              <img
                                  className={s.search__tooltip}
                                  src={tooltipIcon}
                              />
                          </button>
                      );
                  })
                : searchData().map((model) => {
                      return model.properties.map((prop) => {
                          return (
                              <button
                                  onClick={(e) =>
                                      handleSelecter(e, model, prop)
                                  }
                                  key={prop.guid}
                                  className={s.search__item}>
                                  {`${prop.description} > ${model.description}`}
                                  <img
                                      className={s.search__tooltip}
                                      src={tooltipIcon}
                                  />
                              </button>
                          );
                      });
                  })}
        </div>
    );
};

export default SearchList;
