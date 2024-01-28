import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import styles from './DealNamesList.module.css'
import Button from 'react-bootstrap/Button'
import { BASE_URL } from './ClosedDealList'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectDealNamesFilter,
  chooseDealName,
  removeDealName,
} from '../../redux/slices/filterSlice'

function DealName({ name }) {
  return <>{name}</>
}

export default function DealNamesList() {
  const [names, setNames] = useState([])
  const [buttonStyle, setButtonStyle] = useState('light')
  const dealNamesFilter = useSelector(selectDealNamesFilter)
  const [searchParams, setSearchParams] = useSearchParams()
  const dispatch = useDispatch()

  let futureNamesFromURL = searchParams.getAll('futureNames') || []

  if (futureNamesFromURL.length > 0)
    futureNamesFromURL = futureNamesFromURL[0].split('_')

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`${BASE_URL}instruments`)
      const names = await response.data
      setNames(names)
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (futureNamesFromURL.length > 0) {
      futureNamesFromURL.forEach((name) => {
        dispatch(chooseDealName(name))
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleClick = (clickedDealName) => {
    let futureNamesString

    if (futureNamesFromURL.includes(clickedDealName)) {
      futureNamesFromURL = futureNamesFromURL.filter(
        (name) => name !== clickedDealName
      )
      dispatch(removeDealName(clickedDealName))
    } else {
      futureNamesFromURL.push(clickedDealName)
      dispatch(chooseDealName(clickedDealName))
    }

    setButtonStyle(buttonStyle === 'light' ? 'success' : 'light')

    if (futureNamesFromURL.length === 0) {
      setSearchParams()
    } else {
      futureNamesString = futureNamesFromURL.join('_')
      setSearchParams({ futureNames: futureNamesString })
    }
  }

  return (
    <div className={styles.namesList}>
      {names.map((name) => (
        <Button
          key={name.futureName}
          className={styles.button}
          variant={
            dealNamesFilter.includes(name.futureName) ? 'success' : 'light'
          }
          onClick={() => handleClick(name.futureName)}
        >
          <DealName key={name.futureName} name={name.futureName} />
        </Button>
      ))}
    </div>
  )
}
