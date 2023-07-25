import styles from './Deal.module.css'
import { Accordion } from 'react-bootstrap'

function Deal({
  name,
  ticker,
  profit,
  profitInPercent,
  sum,
  price,
  orderDirection,
  dateTime,
  isOpen,
  quantity,
  closedDeal,
}) {
  const {
    orderDirection: closedOrderDirection,
    ticker: closedTicker,
    dateTime: closedDateTime,
    quantity: closedQuantity,
    price: closedPrice,
    sum: closedSum,
  } = closedDeal
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
        <Accordion.Body>
          <div>
            <p>Sum: {sum}</p>
            <p>Price: {price}</p>
            <p>{orderDirection}</p>
            <p>{dateTime}</p>
            <p>Quantity: {quantity}</p>
            <p>
              Closed deal:
              {[
                closedOrderDirection,
                closedTicker,
                closedDateTime,
                closedQuantity,
                closedPrice,
                closedSum,
              ]}
            </p>
          </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  )
}

export default Deal
