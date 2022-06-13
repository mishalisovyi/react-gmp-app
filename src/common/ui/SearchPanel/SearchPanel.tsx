import React, { memo, useMemo } from 'react';
import { ButtonType } from 'common/enums';
import { Button, TextField } from 'common/ui';
import styles from './SearchPanel.module.scss';

interface SearchPanelProps {
  labelText?: string;
}

function SearchPanelComponent({ labelText }: SearchPanelProps) {
  const label = useMemo(() => {
    return labelText ? <h1 className="typography-heading">{labelText}</h1> : null;
  }, [labelText]);

  return (
    <>
      {label}
      <div className={styles['SearchPanel__controls']}>
        <TextField placeholder="What do you want to watch?" />
        <Button type={ButtonType.Primary} text="Search" />
      </div>
    </>
  );
}

SearchPanelComponent.defaultProps = {
  labelText: '',
};

export const SearchPanel = memo(SearchPanelComponent);
