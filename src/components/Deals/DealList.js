import { useState, useEffect } from 'react'
import Deal from './Deal'
import axios from 'axios'

function DealList() {
  const [deals, setDeals] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:8083/deals/closed')
        const deals = await response.data
        setDeals(deals)
      } catch (error) {
        setError(error.message)
      }
    }
    fetchData()
  }, [])

  return (
    <>
      {deals.map((deal) => (
        <Deal
          key={deal.id}
          name={deal.name}
          ticker={deal.ticker}
          profit={deal.profit}
          profitInPercent={deal.profitInPercents}
        />
      ))}
    </>
  )
}

export default DealList
