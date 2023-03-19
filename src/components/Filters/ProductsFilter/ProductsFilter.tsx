import React from 'react';
import classes from './ProductsFilter.module.scss';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectMode } from '@/features/user/userSlice';
type Props = {
  search: string;
  setSearch: (search: string) => void;
  selectedOption: string;
  setSelectedOption: (selectedOption: string) => void;
  options: { value: string; label: string }[];
};

const ProductsFilter: React.FC<Props> = ({ search, setSearch, selectedOption, setSelectedOption, options }) => {
  const { t } = useTranslation();
  const mode = useSelector(selectMode);
  return (
    <div
      className={`${classes.wrapper} 
    ${mode === 'dark' ? classes.dark : ''}
    `}
    >
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
