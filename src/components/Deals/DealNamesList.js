import { useState, useEffect } from 'react'
import axios from 'axios'
import styles from './DealNamesList.module.css'
import Button from 'react-bootstrap/Button'
import { baseURL } from './ClosedDealList'

function DealName({ name }) {
  return <>{name}</>
}

export default function DealNamesList({ clickedDealNames, onNameClick }) {
  const [names, setNames] = useState([])

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`${baseURL}instruments`)
      const names = await response.data
      setNames(names)
    }
    fetchData()
  }, [])

  return (
    <div className={styles.namesList}>
      {names.map((name) => (
        <Button
          key={name.futureName}
          className={styles.button}
          variant={
            clickedDealNames.includes(name.futureName) ? 'success' : 'light'
          }
          onClick={() => onNameClick(name.futureName)}
        >
          <DealName key={name.futureName} name={name.futureName} />
        </Button>
      ))}
    </div>
  )
}
