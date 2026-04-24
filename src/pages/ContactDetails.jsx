import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { db } from '../db'
import { doc, getDoc, deleteDoc } from 'firebase/firestore'

function ContactDetails() {
  const { id } = useParams()
  const [contact, setContact] = useState(null)

  useEffect(() => {
    async function getContact() {
      const docRef = doc(db, 'contacts', id)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        setContact({
          id: docSnap.id,
          ...docSnap.data()
        })
      }
    }

    getContact()
  }, [id])

  if (!contact) {
    return <p>Loading...</p>
  }
  async function handleDelete() {
  try {
    await deleteDoc(doc(db, 'contacts', id))
    alert('Contact deleted!')

    window.location.href = '/'
  } catch (error) {
    console.error(error)
  }
}
  return (
    <div>
      <h2>
        {contact.firstName} {contact.lastName}
      </h2>

      <p>Email: {contact.email}</p>
      <p>Phone: {contact.phone}</p>

      <Link to={`/edit/${contact.id}`}>Edit Contact</Link>

      <br />
      <br />

      <button onClick={handleDelete}>Delete Contact</button>

      <br />
      <br />

      <Link to="/">Back to Contacts</Link>
    </div>
  )
}

export default ContactDetails