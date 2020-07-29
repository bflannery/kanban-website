import React from 'react'
import KanbanBoard from './components/Kanban/KanbanBoard'
import AppToolbar from './components/Toolbar'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <AppToolbar />
        <KanbanBoard />
      </header>
    </div>
  )
}

export default App
