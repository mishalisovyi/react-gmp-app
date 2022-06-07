import React, { ChangeEvent } from 'react';
import { SelectListData, SelectListValue } from 'common/interfaces';
import styles from './FilterSelectList.module.scss';

interface FilterSelectListProps {
  label: string;
  data: SelectListData;
  defaultValue: SelectListValue
  onSelectionChanged: (item: string) => void;
}

export function FilterSelectList({
  label,
  data,
  defaultValue,
  onSelectionChanged,
}: FilterSelectListProps) {
  const onSelectValueChanged = ({ target: { value } }: ChangeEvent<HTMLSelectElement>) => {
    onSelectionChanged(value);
  };

  return (
    <div className={styles['FilterSelectList']}>
      <label className={styles['FilterSelectList__label']}>{label}</label>

      <select className={styles['FilterSelectList__control']} defaultValue={defaultValue} onChange={onSelectValueChanged}>
        {data.items.map((item) => {
          return <option className={styles['control__option']} key={item.value} value={item.value}>{item.title}</option>;
        })}
      </select>
    </div>
  );
}
