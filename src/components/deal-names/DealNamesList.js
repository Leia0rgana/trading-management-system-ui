import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import styles from './DealNamesList.module.css'
import Button from 'react-bootstrap/Button'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectDealNamesFilter,
  chooseDealName,
  removeDealName,
} from '../../redux/slices/filterSlice'
import useDealsQuery from '../../hooks/useDealsQuery'

function DealName({ name }) {
  return <>{name}</>
}

export default function DealNamesList() {
  const [buttonStyle, setButtonStyle] = useState('light')
  const dealNamesFilter = useSelector(selectDealNamesFilter)
  const [searchParams, setSearchParams] = useSearchParams()
  const dispatch = useDispatch()

  const { data, isSuccess, isLoading } = useDealsQuery(
    'futureNames',
    'instruments'
  )

  let futureNamesFromURL = searchParams.getAll('futureNames') || []

  if (futureNamesFromURL.length > 0) {
    futureNamesFromURL = futureNamesFromURL[0].split('_')
    if (dealNamesFilter.length === 0) {
      futureNamesFromURL.forEach((name) => {
        dispatch(chooseDealName(name))
      })
    }
  } else if (dealNamesFilter.length > 0) {
    futureNamesFromURL = dealNamesFilter
    setSearchParams({ futureNames: futureNamesFromURL.join('_') })
  }

  const handleClick = (clickedDealName) => {
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

    futureNamesFromURL.length === 0
      ? setSearchParams()
      : setSearchParams({ futureNames: futureNamesFromURL.join('_') })
  }

  if (isLoading) return <h3>loading...</h3>

  if (isSuccess)
    return (
      <div className={styles.namesList}>
        {data.map((name) => (
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
