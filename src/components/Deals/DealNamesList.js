import { useState, useEffect } from 'react'
import DealName from './DealName'
import axios from 'axios'
import styles from './DealNamesList.module.css'
import Button from 'react-bootstrap/Button'

function DealNamesList({ clickedDealNames, onNameClick }) {
  const [names, setNames] = useState([])

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('http://localhost:8083/instruments')
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

export default DealNamesList
