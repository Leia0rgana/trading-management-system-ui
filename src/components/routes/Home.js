import styles from './Home.module.css'
import DealNamesList from '../Deals/DealNamesList'
import ClosedDealList from '../Deals/ClosedDealList'
import OpenedDealList from '../Deals/OpenedDealList'
import Button from 'react-bootstrap/Button'
import { MdClear } from 'react-icons/md'
import { IconContext } from 'react-icons'
import { useQuery } from '@tanstack/react-query'
import { fetchDeals } from '../../services/deals'
import {
  selectDealNamesFilter,
  resetFilter,
} from '../../redux/slices/filterSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const dealNamesFilter = useSelector(selectDealNamesFilter)
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ['openedDeals'],
    queryFn: () => fetchDeals('deals/open'),
  })

  if (isLoading) return <h3>loading...</h3>

  if (isSuccess)
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
        {data.length !== 0 ? (
          <div className={styles.deals}>
            <div className={styles.closedDeals}>
              <ClosedDealList isArchive={false} />
            </div>
            <div>
              <h3>Открытые сделки</h3>
              <OpenedDealList openedDeals={data} />
            </div>
          </div>
        ) : (
          <div className={styles.closedDeals}>
            <ClosedDealList isArchive={false} />
          </div>
        )}
      </div>
    )
}
