import styles from './Deal.module.css'
import { Accordion } from 'react-bootstrap'

function Deal({ name, ticker, profit, profitInPercent }) {
  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>
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
              <div className={styles.dealProfitInPercent}>
                {profitInPercent}%
              </div>
            </div>
          </div>
        </Accordion.Header>
        <Accordion.Body></Accordion.Body>
      </Accordion.Item>
    </Accordion>
  )
}

export default Deal
