import './App.css'
import styles from './components/Deals/App.module.css'
import DealNamesList from './components/Deals/DealNamesList'
import ClosedDealList from './components/Deals/ClosedDealList'
import OpenedDealList from './components/Deals/OpenedDealList'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { baseURL } from './components/Deals/ClosedDealList'

export default function App() {
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
    <div className="App">
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
          <div className={styles.openedDeals}>
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
