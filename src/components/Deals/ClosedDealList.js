import { useState, useEffect } from 'react'
import ClosedDeal from './ClosedDeal'
import './ClosedDealList.css'
import { useSelector } from 'react-redux'
import { selectDealNamesFilter } from '../../redux/slices/filterSlice'
import axios from 'axios'
import { Accordion } from 'react-bootstrap'

class DealsByDate {
  constructor(date, deals) {
    this.date = date
    this.deals = deals
  }
}

const WEEK_IN_MILLISECONDS = 7 * 24 * 60 * 60 * 1000

export const BASE_URL = `http://localhost:8083/`

export default function ClosedDealList({ isArchive }) {
  const [deals, setDeals] = useState([])
  const dealNamesFilter = useSelector(selectDealNamesFilter)

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`${BASE_URL}deals/closed`)
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

  const filterClosedDeals = (dealList) => {
    let dealListCopy = dealList

    if (dealNamesFilter.length !== 0) {
      dealListCopy = dealList.filter((deal) => {
        return dealNamesFilter.includes(deal.name)
      })
    }
    return getClosedDeals(dealListCopy)
  }

  const getPastWeekDealsOrArchive = (date, deals, index) => {
    if (
      (new Date(date).getTime() >= Date.now() - WEEK_IN_MILLISECONDS &&
        !isArchive) ||
      (new Date(date).getTime() < Date.now() - WEEK_IN_MILLISECONDS &&
        isArchive)
    ) {
      return (
        <Accordion defaultActiveKey={index === 0 ? '0' : null}>
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <h3>{date}</h3>
            </Accordion.Header>
            <Accordion.Body>{filterClosedDeals(deals)}</Accordion.Body>
          </Accordion.Item>
        </Accordion>
      )
    }
  }

  let currentDate = null
  return (
    //todo message "no deals for the past week"
    <>
      {getDealsByDates(getUniqueDates(deals))
        .filter((item) => filterClosedDeals(item.deals).length !== 0) //todo после фильтра первый аккордеон должен быть открытым (сейчас необходимо перезагружать страницу)
        .map((item, index) => {
          if (item.date !== currentDate) {
            currentDate = item.date
            return (
              <div key={item.date}>
                {getPastWeekDealsOrArchive(item.date, item.deals, index)}
              </div>
            )
          } else {
            return <div key={item.date}>{filterClosedDeals(item.deals)}</div>
          }
        })}
    </>
  )
}
