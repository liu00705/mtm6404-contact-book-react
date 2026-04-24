import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../db'
import { collection, getDocs } from 'firebase/firestore'

function Home() {
  const [contacts, setContacts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    async function getContacts() {
      const querySnapshot = await getDocs(collection(db, 'contacts'))

      const contactsArray = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data()
        }
      })

      setContacts(contactsArray)
    }

    getContacts()
  }, [])

  const sortedContacts = [...contacts].sort((a, b) =>
    a.lastName.localeCompare(b.lastName)
  )

  const filteredContacts = sortedContacts.filter((contact) => {
    const fullName = `${contact.firstName} ${contact.lastName}`.toLowerCase()
    return fullName.includes(searchTerm.toLowerCase())
  })

  return (
    <div>
      <h2>All Contacts</h2>

      <Link to="/new">Add New Contact</Link>

      <br />
      <br />

      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <ul>
        {filteredContacts.map((contact) => (
          <li key={contact.id}>
            <Link to={`/contact/${contact.id}`}>
              {contact.lastName}, {contact.firstName}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Home