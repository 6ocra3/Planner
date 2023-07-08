import './App.css'
import Tracker from './Components/Tracker/Tracker';
import List from './Components/List/List';
function App() {
  return (
    <div className="App">
      <Tracker />
      <List />
      <button onClick={() => fetch('http://127.0.0.1:5005/get_week/2022-07-03', {
      }).then(response => response.json()).then(data => console.log(data))
      }>Отправить запрос</button>
    </div>
  )
}

export default App
