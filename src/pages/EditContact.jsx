import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { db } from '../db'
import { doc, getDoc, updateDoc } from 'firebase/firestore'

function EditContact() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  useEffect(() => {
    async function getContact() {
      const docRef = doc(db, 'contacts', id)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        const contact = docSnap.data()

        setFirstName(contact.firstName)
        setLastName(contact.lastName)
        setEmail(contact.email)
        setPhone(contact.phone)
      }
    }

    getContact()
  }, [id])

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      const docRef = doc(db, 'contacts', id)

      await updateDoc(docRef, {
        firstName,
        lastName,
        email,
        phone
      })

      navigate(`/contact/${id}`)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <h2>Edit Contact</h2>

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

        <button type="submit">Save Changes</button>
      </form>
    </div>
  )
}

export default EditContact