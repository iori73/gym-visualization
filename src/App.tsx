import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import DataComponent from "./components/DataComponent";


function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <div className="App">
        <header className="App-header">
          <DataComponent />
        </header>
      </div>
    </>
  );
}

export default App
