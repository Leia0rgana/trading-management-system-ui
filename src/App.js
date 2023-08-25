import './App.css'
import DealList from './components/Deals/DealList'
import DealNamesList from './components/Deals/DealNamesList'

function App() {
  return (
    <div className="App">
      <h1>Фьючерсы</h1>
      <DealNamesList />
      <DealList />
    </div>
  )
}

export default App
