import { useState, useEffect } from 'react'
import Deal from './Deal'
import axios from 'axios'
import { baseURL } from './DealList'

export default function OpenedDealList() {
  const [openedDeals, setOpenedDeals] = useState([])

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`${baseURL}deals/open`)
      const deals = await response.data
      setOpenedDeals(deals)
    }
    fetchData()
  }, [])

  return (
    <>
      {openedDeals.map((deal) => (
        <Deal
          key={deal.id}
          name={deal.name}
          ticker={deal.ticker}
          sum={deal.sum}
          price={deal.price}
          orderDirection={deal.orderDirection}
          dateTime={deal.dateTime}
          quantity={deal.quantity}
        />
      ))}
    </>
  )
}
