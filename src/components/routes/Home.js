import styles from './Home.module.css'
import DealNamesList from '../Deals/DealNamesList'
import ClosedDealList from '../Deals/ClosedDealList'
import OpenedDealList from '../Deals/OpenedDealList'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from '../Deals/ClosedDealList'

export default function Home() {
  const [openedDeals, setOpenedDeals] = useState([])

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`${BASE_URL}deals/open`)
      const deals = await response.data
      setOpenedDeals(deals)
    }
    fetchData()
  }, [])

  return (
    <div className="main-content">
      <h1>Фьючерсы</h1>
      <DealNamesList />
      {openedDeals.length !== 0 ? (
        <div className={styles.deals}>
          <div className={styles.closedDeals}>
            <ClosedDealList />
          </div>
          <div>
            <h3>Открытые сделки</h3>
            <OpenedDealList openedDeals={openedDeals} />
          </div>
        </div>
      ) : (
        <div className={styles.closedDeals}>
          <ClosedDealList />
        </div>
      )}
    </div>
  )
}
