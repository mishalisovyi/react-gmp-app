import React from 'react';
import styles from './ErrorBoundary.module.scss';

interface Props {
  children: any;
}

interface State {
  error: Error | null
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div className={styles['ErrorBoundary']}>
          <h1 className="typography-heading">Something went wrong...</h1>
          <p className="typography-body">{this.state.error?.stack}</p>
        </div>
      );
    }

    return this.props.children;
  }
}
