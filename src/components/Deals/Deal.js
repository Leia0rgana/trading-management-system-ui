import styles from './Deal.module.css'

function Deal({ name, ticker, profit, profitInPercent }) {
  return (
    <div className={styles.row}>
      <div className={styles.cell}>
        <div className={styles.dealName}>{name}</div>
        <div className={styles.dealTicker}>{ticker}</div>
      </div>
      <div className={styles.cell}>
        <div
          className={`${styles.dealProfit} ${
            profit < 0 ? styles.negativeProfit : styles.positiveProfit
          }`}
        >
          {profit}
        </div>
        <div className={styles.dealProfitInPercent}>{profitInPercent}%</div>
      </div>
    </div>
  )
}

export default Deal
