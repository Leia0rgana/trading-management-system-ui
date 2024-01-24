import styles from './Home.module.css'
import DealNamesList from '../Deals/DealNamesList'
import ClosedDealList from '../Deals/ClosedDealList'
import OpenedDealList from '../Deals/OpenedDealList'
import Button from 'react-bootstrap/Button'
import { useState, useEffect } from 'react'
import { MdClear } from 'react-icons/md'
import { IconContext } from 'react-icons'
import axios from 'axios'
import { BASE_URL } from '../Deals/ClosedDealList'
import {
  selectDealNamesFilter,
  resetFilter,
} from '../../redux/slices/filterSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const [openedDeals, setOpenedDeals] = useState([])
  const dealNamesFilter = useSelector(selectDealNamesFilter)
  const navigate = useNavigate()

  const dispatch = useDispatch()

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
      <div className={styles.filter}>
        {dealNamesFilter.length > 0 && (
          <div className={styles.icon}>
            <IconContext.Provider value={{ color: '#A8A8A8', size: '2rem' }}>
              <Button
                title="Сбросить фильтры"
                variant="light"
                className={styles.button}
                onClick={() => {
                  dispatch(resetFilter())
                  navigate('/')
                }}
              >
                <MdClear />
              </Button>
            </IconContext.Provider>
          </div>
        )}
        <div className={styles.dealNames}>
          <DealNamesList />
        </div>
      </div>
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
