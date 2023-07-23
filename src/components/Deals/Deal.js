import styles from './Deal.module.css'
import Stack from 'react-bootstrap/Stack'

function Deal({ name, ticker, profit, profitInPercent }) {
  return (
    // <div className={styles.deal}>
    //   <div className={styles.dealName}>{name}</div>
    //   <div className={styles.dealTicker}>{ticker} </div>
    //   <div className={styles.dealProfit}>{profit}</div>
    //   <div className={styles.dealProfit}>{profitInPercent}%</div>

    <div className={styles.table}>
      <div className={styles.row}>
        <div className={styles.cell}>
          <div className={styles.dealName}>{name}</div>
          <div className={styles.dealTicker}>{ticker}</div>
        </div>
        {
          <div className={styles.cell}>
            <div className={styles.dealProfit}>{profit}</div>
            <div className={styles.dealProfitInPercent}>{profitInPercent}%</div>
          </div>
        }
      </div>
    </div>
    //</div>
  )
}

export default Deal
