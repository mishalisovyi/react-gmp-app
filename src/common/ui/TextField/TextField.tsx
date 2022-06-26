import React, { forwardRef } from 'react';
import { ComponentWithRefProps } from 'common/interfaces';
import styles from './TextField.module.scss';

interface TextFieldProps extends ComponentWithRefProps {
  placeholder?: string,
}

const TextField = forwardRef(
  ({ placeholder }: TextFieldProps, ref: React.ForwardedRef<HTMLInputElement>) => {
    return (
      <input type="text" ref={ref} placeholder={placeholder} className={styles['TextField']} />
    );
  },
);

TextField.defaultProps = {
  placeholder: '',
};

export { TextField };
