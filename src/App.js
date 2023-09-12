import './App.css'
import DealNamesList from './components/Deals/DealNamesList'
import DealList from './components/Deals/DealList'
import OpenedDealList from './components/Deals/OpenedDealList'
import { useState } from 'react'

export default function App() {
  const [clickedDealNames, setClickedDealNames] = useState([])
  const [buttonStyle, setButtonStyle] = useState('light')

  const handleClick = (clickedDealName) => {
    const newClickedDealNames = [...clickedDealNames]

    if (newClickedDealNames.includes(clickedDealName)) {
      const indexToDelete = newClickedDealNames.indexOf(clickedDealName)
      indexToDelete > -1 && newClickedDealNames.splice(indexToDelete, 1)
    } else {
      newClickedDealNames.push(clickedDealName)
    }
    setClickedDealNames(newClickedDealNames)
    setButtonStyle(buttonStyle === 'light' ? 'success' : 'light')
  }

  return (
    <div className="App">
      <h1>Фьючерсы</h1>
      <DealNamesList
        clickedDealNames={clickedDealNames}
        onNameClick={handleClick}
      />
      <DealList clickedDealNames={clickedDealNames} />
      <OpenedDealList />
    </div>
  )
}
