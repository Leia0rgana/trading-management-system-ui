import styles from './Deal.module.css'
import { Accordion } from 'react-bootstrap'
import { LuArrowUp, LuArrowDown } from 'react-icons/lu'
function Deal({
  name,
  ticker,
  profit,
  profitInPercent,
  sum,
  price,
  orderDirection,
  dateTime,
  quantity,
  closedDeal,
}) {
  const {
    dateTime: closedDateTime,
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
                {profit > 0 ? `+` : ``}
                {profit.replace('.', ',')} {'\u20bd'}
              </div>
              <div className={styles.dealProfitInPercent}>
                {profitInPercent.replace('.', ',')} %
              </div>
            </div>
          </div>
        </Accordion.Header>
        <Accordion.Body>
          <div className={styles.content}>
            <div>
              {orderDirection.includes('buy'.toUpperCase())
                ? 'Покупка'
                : 'Продажа'}{' '}
              {quantity.toString().endsWith('1') ? 'фьючерса' : 'фьючерсов'} по
              цене {price.replace('.', ',')} пт. на сумму{' '}
              {sum.replace('.', ',')} {'\u20bd'}{' '}
              <span className={styles.time}>
                {dateTime.slice(dateTime.indexOf('T') + 1)}
              </span>
            </div>
            <div className={styles.arrow}>
              {orderDirection.includes('buy'.toUpperCase()) ? (
                <>
                  <LuArrowUp /> long
                </>
              ) : (
                <>
                  <LuArrowDown /> short
                </>
              )}
            </div>
            <div>
              Сделка закрыта по цене {closedPrice.replace('.', ',')} пт. на
              сумму {closedSum.replace('.', ',')} {'\u20bd'}{' '}
              <span className={styles.time}>
                {closedDateTime.slice(closedDateTime.indexOf('T') + 1)}
              </span>
            </div>
          </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  )
}

export default Deal
