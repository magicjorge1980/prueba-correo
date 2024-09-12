import { useState } from 'react'
import Button from './Button'
import Field from './Field'
import sendEmail from '../logic/sendEmail'
import updateEmail from '../logic/updateEmail'
import PokerTable from './PokerTable'

function Form() {
  const [email, setEmail] = useState('')
  const [card, setCard] = useState('')
  const [showForm, setShowForm] = useState(true)
  const [showCards, setShowCards] = useState(false)

  const handleOnClickSend = (e) => {
    e.preventDefault()
    console.log(email)
    sendEmail(email)
    setShowForm(false)
    setShowCards(true)
  }

  const handleSendCard = (card) => {
    setCard(card)
    console.log(email, card)
    updateEmail(email, card)
    setShowForm(true)
  }

  return (
    <>
      {showForm && (
        <form className='flex flex-col m-6' action='submit'>
          <div className='flex flex-col gap-1'>
            <Field
              type='email'
              name='email'
              id='email'
              value={email}
              handleChange={setEmail}
            >
              E-mail
            </Field>

            <Button onClick={handleOnClickSend} type='button'>
              Enviar
            </Button>
          </div>
        </form>
      )}
      {showCards && <PokerTable handleButtonClick={handleSendCard} />}
    </>
  )
}
export default Form
