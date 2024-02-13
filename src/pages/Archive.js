import ClosedDealList from '../components/Deals/closed-deals/ClosedDealList'
import styles from './Home.module.css'

export default function Archive() {
  return (
    <div className="main-content">
      <h1>Архив сделок</h1>
      <div className={styles.closedDeals}>
        <ClosedDealList isArchive={true} />
      </div>
    </div>
  )
}
