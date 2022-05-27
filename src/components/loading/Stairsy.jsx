import styles from './Stairsy.module.css'
export default function Stairs() {
    return (
        <div className={styles.loader}>

            <div className={styles.loader__bar}></div>
            <div className={styles.loader__bar}></div>
            <div className={styles.loader__bar}></div>
            <div className={styles.loader__bar}></div>
            <div className={styles.loader__bar}></div>
            <div className={styles.loader__ball}></div>
        </div>
    )
}