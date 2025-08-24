import React from 'react'

import styles from './Actions.module.css'

export function Actions(props) {
    return <div className={styles.Actions}>{props.children}</div>
}
