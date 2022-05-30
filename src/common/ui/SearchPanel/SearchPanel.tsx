import React from 'react';
import { ButtonPrimary, TextField } from 'common/ui';
import styles from './SearchPanel.module.scss';

interface SearchPanelProps {
  labelText?: string;
}

export function SearchPanel({ labelText }: SearchPanelProps) {
  const label = labelText ? <h1 className="typography-heading">{labelText}</h1> : null;

  return (
    <>
      {label}
      <div className={styles['SearchPanel__controls']}>
        <TextField placeholder="What do you want to watch?" />
        <ButtonPrimary text="Search" />
      </div>
    </>
  );
}

SearchPanel.defaultProps = {
  labelText: '',
};
