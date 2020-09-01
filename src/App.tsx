import React from 'react'
import styles from './App.module.less'
import { Button } from 'antd'

function App() {
  return (
    <div className={styles.App}>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
      <Button type="primary">Button</Button>
    </div>
  )
}

export default App
