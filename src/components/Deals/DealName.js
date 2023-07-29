import styles from './DealName.module.css'
function DealName({ name }) {
  return <span className={styles.span}>{name}</span>
}

export default DealName
