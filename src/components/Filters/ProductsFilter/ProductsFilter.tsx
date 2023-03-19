import React from 'react';
import classes from './ProductsFilter.module.scss';
import { useTranslation } from 'react-i18next';
type Props = {
  search: string;
  setSearch: (search: string) => void;
  selectedOption: string;
  setSelectedOption: (selectedOption: string) => void;
  options: { value: string; label: string }[];
};

const ProductsFilter: React.FC<Props> = ({ search, setSearch, selectedOption, setSelectedOption, options }) => {
  const { t } = useTranslation();
  return (
    <div className={classes.wrapper}>
      <div className={classes.search}>
        <p>{t('products.search')}</p>
        <input
          type="text"
          placeholder={t('products.search') || 'Search'}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className={classes.sort}>
        <p>{t('products.filter')}</p>
        <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ProductsFilter;
