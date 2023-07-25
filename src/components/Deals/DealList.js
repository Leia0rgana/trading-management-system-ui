import { useState, useEffect } from 'react'
import Deal from './Deal'
import axios from 'axios'

function DealList() {
  const [deals, setDeals] = useState([])

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('http://localhost:8083/deals/closed')
      const deals = await response.data
      setDeals(deals)
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
          sum={deal.sum}
          price={deal.price}
          orderDirection={deal.orderDirection}
          dateTime={deal.dateTime}
          isOpen={deal.isOpen}
          quantity={deal.quantity}
          closedDeal={deal.closedDeal}
        />
      ))}
    </>
  )
}

export default DealList
