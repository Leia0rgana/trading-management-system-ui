import { useState, useEffect } from 'react'
import ClosedDeal from './ClosedDeal'
import axios from 'axios'

class DealsByDate {
  constructor(date, deals) {
    this.date = date
    this.deals = deals
  }
}

export const baseURL = `http://localhost:8083/`

export default function DealList({ clickedDealNames }) {
  const [deals, setDeals] = useState([])

  const query =
    clickedDealNames.length === 0
      ? `${baseURL}deals/closed`
      : `${baseURL}deals/closed?futureNames=${clickedDealNames.join(',')}`

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(query)
      const deals = await response.data
      setDeals(deals)
    }
    fetchData()
  }, [query])

  const getUniqueDates = (deals) => {
    const uniqueDates = []

    for (let i = 0; i < deals.length; i++) {
      const date = deals[i].dateTime.split('T')[0]

      !uniqueDates.includes(date) && uniqueDates.push(date)
    }

    return uniqueDates
  }

  const matchDealsWithDate = (deals, date) => {
    return deals.filter((deal) => {
      return deal.dateTime.split('T')[0] === date
    })
  }

  const getDealsByDates = (dates) => {
    const dealsByDates = []

    for (let i = 0; i < dates.length; i++) {
      dealsByDates.push(
        new DealsByDate(dates[i], matchDealsWithDate(deals, dates[i]))
      )
    }
    return dealsByDates
  }

  let currentDate = null

  return (
    <>
      {getDealsByDates(getUniqueDates(deals)).map((item) => {
        if (item.date !== currentDate) {
          currentDate = item.date
          return (
            <div key={item.date}>
              <h3>{item.date}</h3>
              {item.deals.map((deal) => (
                <ClosedDeal
                  key={deal.id}
                  name={deal.name}
                  ticker={deal.ticker}
                  profit={deal.profit}
                  profitInPercent={deal.profitInPercents}
                  sum={deal.sum}
                  price={deal.price}
                  orderDirection={deal.orderDirection}
                  dateTime={deal.dateTime}
                  quantity={deal.quantity}
                  closedDeal={deal.closedDeal}
                />
              ))}
            </div>
          )
        } else {
          return (
            <div key={item.date}>
              {item.deals.map((deal) => (
                <ClosedDeal
                  key={deal.id}
                  name={deal.name}
                  ticker={deal.ticker}
                  profit={deal.profit}
                  profitInPercent={deal.profitInPercents}
                  sum={deal.sum}
                  price={deal.price}
                  orderDirection={deal.orderDirection}
                  dateTime={deal.dateTime}
                  quantity={deal.quantity}
                  closedDeal={deal.closedDeal}
                />
              ))}
            </div>
          )
        }
      })}
    </>
  )
}
