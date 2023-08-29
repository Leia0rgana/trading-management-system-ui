import { useState, useEffect } from 'react'
import DealName from './DealName'
import DealList from './DealList'
import axios from 'axios'
import styles from './DealNamesList.module.css'
import Button from 'react-bootstrap/Button'

function DealNamesList() {
  const [names, setNames] = useState([])
  // eslint-disable-next-line no-unused-vars
  const [selectedNames, setSelectedNames] = useState([])
  const [buttonStyle, setButtonStyle] = useState('light')

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('http://localhost:8083/instruments')
      const names = await response.data
      setNames(names)
    }
    fetchData()
  }, [])

  const selectedNamesHandler = (selectedName) => {
    if (selectedNames.includes(selectedName)) {
      const indexToDelete = selectedNames.indexOf(selectedName)
      indexToDelete > -1 && selectedNames.splice(indexToDelete, 1)
    } else {
      selectedNames.push(selectedName)
    }
  }

  return (
    <>
      <div className={styles.namesList}>
        {names.map((name) => (
          <Button
            key={name.futureName}
            className={styles.button}
            variant={
              selectedNames.includes(name.futureName) ? 'success' : 'light'
            }
            onClick={() => {
              setButtonStyle(buttonStyle === 'light' ? 'success' : 'light')
              selectedNamesHandler(name.futureName)
            }}
          >
            <DealName key={name.futureName} name={name.futureName} />
          </Button>
        ))}
      </div>
      <DealList selectedNames={selectedNames} />
    </>
  )
}

export default DealNamesList
