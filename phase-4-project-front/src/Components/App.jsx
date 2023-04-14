import { useState } from 'react'

import '../Styling/App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <div>
        <p>Hello!</p>
      </div>
      <div>
          <input></input>
          <button>username</button>
          <input></input>
          <button>email</button>
        </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </div>
  )
}

export default App