import styles from './Deal.module.css'

function Deal({ name, ticker, profit, profitInPercent }) {
  return (
    <div className={styles.deal}>
      <h5>{name}</h5>
      <small>{ticker}</small>
      <small>
        {profit} ({profitInPercent}%){' '}
      </small>
    </div>
  )
}

export default Deal
