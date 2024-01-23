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

  const futureNamesFromURL = searchParams.getAll('futureNames') || ''

  const dispatch = useDispatch()

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
  }, [])

  const handleClick = (clickedDealName) => {
    if (futureNamesFromURL.includes(clickedDealName)) {
      const indexToDelete = futureNamesFromURL.indexOf(clickedDealName)
      indexToDelete > -1 && futureNamesFromURL.splice(indexToDelete, 1)
      dispatch(removeDealName(clickedDealName))
    } else {
      futureNamesFromURL.push(clickedDealName)
      dispatch(chooseDealName(clickedDealName))
    }

    setButtonStyle(buttonStyle === 'light' ? 'success' : 'light')
    setSearchParams({ futureNames: futureNamesFromURL })
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
