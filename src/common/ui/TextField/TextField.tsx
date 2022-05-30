import React from 'react';
import styles from './TextField.module.scss';

interface TextFieldProps {
  placeholder?: string,
}

export function TextField({ placeholder }: TextFieldProps) {
  return (
    <input type="text" placeholder={placeholder} className={styles['TextField']} />
  );
}

TextField.defaultProps = {
  placeholder: '',
};
