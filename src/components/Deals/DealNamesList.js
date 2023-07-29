import { useState, useEffect } from 'react'
import DealName from './DealName'
import axios from 'axios'
import styles from './DealNamesList.module.css'

function DealNamesList() {
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
      {names.map((name, index) => (
        <DealName key={index} name={name.futureName} />
      ))}
    </div>
  )
}

export default DealNamesList
