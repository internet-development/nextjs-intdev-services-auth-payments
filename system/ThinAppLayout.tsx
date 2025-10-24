import styles from '@system/ThinAppLayout.module.scss';

import * as React from 'react';

export default function ThinAppLayout(props) {
  return (
    <div className={styles.root} style={props.style}>
      {props.children}
    </div>
  );
}
