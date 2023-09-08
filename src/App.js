import './App.css'
import DealNamesList from './components/Deals/DealNamesList'
import DealList from './components/Deals/DealList'
import { useState } from 'react'

function App() {
  const [clickedDealNames] = useState([])
  const [buttonStyle, setButtonStyle] = useState('light')

  const handleClick = (clickedDealName) => {
    if (clickedDealNames.includes(clickedDealName)) {
      const indexToDelete = clickedDealNames.indexOf(clickedDealName)
      indexToDelete > -1 && clickedDealNames.splice(indexToDelete, 1)
    } else {
      clickedDealNames.push(clickedDealName)
    }
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
    </div>
  )
}

export default App
