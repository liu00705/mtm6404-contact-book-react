import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import ContactDetails from './pages/ContactDetails'
import NewContact from './pages/NewContact'
import EditContact from './pages/EditContact'

function App() {
  return (
    <div>
      <h1>Contact Book</h1>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact/:id" element={<ContactDetails />} />
        <Route path="/new" element={<NewContact />} />
        <Route path="/edit/:id" element={<EditContact />} />
      </Routes>
    </div>
  )
}

export default App
