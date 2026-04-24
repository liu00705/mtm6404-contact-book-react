import { useState } from 'react'
import { db } from '../db'
import { collection, addDoc } from 'firebase/firestore'

function NewContact() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      await addDoc(collection(db, 'contacts'), {
        firstName,
        lastName,
        email,
        phone
      })

      alert('Contact added!')

      setFirstName('')
      setLastName('')
      setEmail('')
      setPhone('')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <h2>Add New Contact</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name</label>
          <br />
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Last Name</label>
          <br />
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Email</label>
          <br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Phone</label>
          <br />
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <br />

        <button type="submit">Add Contact</button>
      </form>
    </div>
  )
}

export default NewContact