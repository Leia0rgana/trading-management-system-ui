import styles from './Home.module.css'
import DealNamesList from './Deals/DealNamesList'
import ClosedDealList from './Deals/ClosedDealList'
import OpenedDealList from './Deals/OpenedDealList'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { baseURL } from './Deals/ClosedDealList'

export default function Home() {
  const [clickedDealNames, setClickedDealNames] = useState([])
  const [buttonStyle, setButtonStyle] = useState('light')
  const [openedDeals, setOpenedDeals] = useState([])

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`${baseURL}deals/open`)
      const deals = await response.data
      setOpenedDeals(deals)
    }
    fetchData()
  }, [])

  const handleClick = (clickedDealName) => {
    const newClickedDealNames = [...clickedDealNames]

    if (newClickedDealNames.includes(clickedDealName)) {
      const indexToDelete = newClickedDealNames.indexOf(clickedDealName)
      indexToDelete > -1 && newClickedDealNames.splice(indexToDelete, 1)
    } else {
      newClickedDealNames.push(clickedDealName)
    }
    setClickedDealNames(newClickedDealNames)
    setButtonStyle(buttonStyle === 'light' ? 'success' : 'light')
  }

  return (
    <div className="main-content">
      <h1>Фьючерсы</h1>
      <DealNamesList
        clickedDealNames={clickedDealNames}
        onNameClick={handleClick}
      />
      {openedDeals.length !== 0 ? (
        <div className={styles.deals}>
          <div className={styles.closedDeals}>
            <ClosedDealList clickedDealNames={clickedDealNames} />
          </div>
          <div>
            <h3>Открытые сделки</h3>
            <OpenedDealList openedDeals={openedDeals} />
          </div>
        </div>
      ) : (
        <div className={styles.closedDeals}>
          <ClosedDealList clickedDealNames={clickedDealNames} />
        </div>
      )}
    </div>
  )
}