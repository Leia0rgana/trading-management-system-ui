import styles from './Home.module.css'
import DealNamesList from '../Deals/DealNamesList'
import ClosedDealList from '../Deals/ClosedDealList'
import OpenedDealList from '../Deals/OpenedDealList'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from '../Deals/ClosedDealList'
import { useSearchParams } from 'react-router-dom'

export default function Home() {
  const [buttonStyle, setButtonStyle] = useState('light')
  const [openedDeals, setOpenedDeals] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()

  const futureNamesFromURL = searchParams.getAll('futureNames') || ''

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`${BASE_URL}deals/open`)
      const deals = await response.data
      setOpenedDeals(deals)
    }
    fetchData()
  }, [])

  const handleClick = (clickedDealName) => {
    if (futureNamesFromURL.includes(clickedDealName)) {
      const indexToDelete = futureNamesFromURL.indexOf(clickedDealName)
      indexToDelete > -1 && futureNamesFromURL.splice(indexToDelete, 1)
    } else {
      futureNamesFromURL.push(clickedDealName)
    }

    setButtonStyle(buttonStyle === 'light' ? 'success' : 'light')
    setSearchParams({ futureNames: futureNamesFromURL })
  }

  return (
    <div className="main-content">
      <h1>Фьючерсы</h1>
      <DealNamesList
        clickedDealNames={futureNamesFromURL}
        onNameClick={handleClick}
      />
      {openedDeals.length !== 0 ? (
        <div className={styles.deals}>
          <div className={styles.closedDeals}>
            <ClosedDealList clickedDealNames={futureNamesFromURL} />
          </div>
          <div>
            <h3>Открытые сделки</h3>
            <OpenedDealList openedDeals={openedDeals} />
          </div>
        </div>
      ) : (
        <div className={styles.closedDeals}>
          <ClosedDealList clickedDealNames={futureNamesFromURL} />
        </div>
      )}
    </div>
  )
}
