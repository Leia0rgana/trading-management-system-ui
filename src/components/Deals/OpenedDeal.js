import { LuArrowUp, LuArrowDown } from 'react-icons/lu'
import styles from './OpenedDeal.module.css'

export default function OpenedDeal({
  name,
  ticker,
  sum,
  price,
  orderDirection,
  dateTime,
  quantity,
}) {
  return (
    <div className={styles.content}>
      <div className={styles.row}>
        <div className={styles.cell}>
          <div className={styles.dealName}>{name}</div>
          <div className={styles.dealTicker}>{ticker}</div>
        </div>
        <div className={styles.cell}>
          <div className={styles.orderDirection}>
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
        </div>
      </div>
      <div className={`${styles.row} ${styles.info}`}>
        <div className={styles.cell}>
          Кол-во: {quantity} шт.
          <br />
          Цена: {price} пт. <br />
          Сумма: {sum} {'\u20bd'}
          <br />
          Время: {dateTime.slice(dateTime.indexOf('T') + 1)}
        </div>
      </div>
    </div>
  )
}
