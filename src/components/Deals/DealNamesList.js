import { useState, useEffect } from 'react'
import DealName from './DealName'
import axios from 'axios'
import styles from './DealNamesList.module.css'
import Button from 'react-bootstrap/Button'

function DealNamesList() {
  const [names, setNames] = useState([])
  const [selectedNames, setSelectedNames] = useState([])
  const [selectedButtons, setSelectedButtons] = useState([])

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
      const updatedSelectedNames = selectedNames.filter(
        (newItem) => newItem !== selectedName
      )
      setSelectedNames(updatedSelectedNames)
    } else {
      setSelectedNames([...selectedNames, selectedName])
    }
  }

  const getSelectedButtonsIndexes = (index) => {
    selectedButtons.includes(index)
      ? setSelectedButtons(
          selectedButtons.filter((btnIndex) => btnIndex !== index)
        )
      : setSelectedButtons([...selectedButtons, index])
  }

  return (
    <div className={styles.namesList}>
      {names.map((name, index) => (
        <Button
          key={index}
          className={styles.button}
          variant={selectedButtons.includes(index) ? 'success' : 'light'}
          onClick={() => {
            getSelectedButtonsIndexes(index)
            selectedNamesHandler(name.futureName)
          }}
        >
          <DealName key={index} name={name.futureName} />
        </Button>
      ))}
    </div>
  )
}

export default DealNamesList
