import './App.css'
import styles from './App.module.css'
import DealNamesList from './components/Deals/DealNamesList'
import ClosedDealList from './components/Deals/ClosedDealList'
import OpenedDealList from './components/Deals/OpenedDealList'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { baseURL } from './components/Deals/ClosedDealList'
import Sidebar from './components/UI/Sidebar'
import { AiOutlineMenu } from 'react-icons/ai'
import { IconContext } from 'react-icons'
import { Button } from 'react-bootstrap'

export default function App() {
  const [clickedDealNames, setClickedDealNames] = useState([])
  const [buttonStyle, setButtonStyle] = useState('light')
  const [openedDeals, setOpenedDeals] = useState([])
  const [sidebarExpanded, setSidebarExpanded] = useState(false)

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
      <div>
        {/* z-index*/}
        <IconContext.Provider value={{ color: '#212529', size: '1.5rem' }}>
          <Button
            variant="custom"
            onClick={() => setSidebarExpanded(!sidebarExpanded)}
          >
            <AiOutlineMenu />
          </Button>
        </IconContext.Provider>
        <Sidebar sidebarExpanded={sidebarExpanded} />
      </div>
      <div className={styles.mainContent}>
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
    </div>
  )
}
