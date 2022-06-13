import React, { memo, useMemo, useRef } from 'react';
import { ButtonType } from 'common/enums';
import { Button, TextField } from 'common/ui';
import styles from './SearchPanel.module.scss';

interface SearchPanelProps {
  labelText?: string;
  onSearch: (searchTerm: string) => void;
}

function SearchPanelComponent({ labelText, onSearch }: SearchPanelProps) {
  const textFieldRef = useRef<HTMLInputElement>(null);

  const handleSearchButtonClick = () => {
    const inputElement = textFieldRef.current as HTMLInputElement;

    onSearch(inputElement.value);
  };

  const label = useMemo(() => {
    return labelText ? <h1 className="typography-heading">{labelText}</h1> : null;
  }, [labelText]);

  return (
    <>
      {label}
      <div className={styles['SearchPanel__controls']}>
        <TextField ref={textFieldRef} placeholder="What do you want to watch?" />
        <Button type={ButtonType.Primary} text="Search" onClick={handleSearchButtonClick} />
      </div>
    </>
  );
}

SearchPanelComponent.defaultProps = {
  labelText: '',
};

export const SearchPanel = memo(SearchPanelComponent);
