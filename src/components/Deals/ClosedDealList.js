import { useState, useEffect } from 'react'
import ClosedDeal from './ClosedDeal'
import './ClosedDealList.css'
import axios from 'axios'
import { Accordion } from 'react-bootstrap'

class DealsByDate {
  constructor(date, deals) {
    this.date = date
    this.deals = deals
  }
}

export const baseURL = `http://localhost:8083/`

export default function ClosedDealList({ clickedDealNames }) {
  const [deals, setDeals] = useState([])

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`${baseURL}deals/closed`)
      const deals = await response.data
      setDeals(deals)
    }
    fetchData()
  }, [])

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

  const filterClosedDeals = (dealList) => {
    let dealListCopy = dealList

    if (clickedDealNames.length !== 0) {
      dealListCopy = dealList.filter((deal) => {
        return clickedDealNames.includes(deal.name)
      })
    }
    return getClosedDeals(dealListCopy)
  }

  const getClosedDeals = (dealList) => {
    return dealList.map((deal) => (
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
    ))
  }

  let currentDate = null
  return (
    <>
      {getDealsByDates(getUniqueDates(deals)).map((item, index) => {
        if (item.date !== currentDate) {
          currentDate = item.date
          return (
            <div key={item.date}>
              {filterClosedDeals(item.deals).length === 0 ? (
                ''
              ) : (
                <Accordion defaultActiveKey={index === 0 ? '0' : null}>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>
                      <h3>{item.date}</h3>
                    </Accordion.Header>
                    <Accordion.Body>
                      {filterClosedDeals(item.deals)}
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              )}
            </div>
          )
        } else {
          return <div key={item.date}>{filterClosedDeals(item.deals)}</div>
        }
      })}
    </>
  )
}
