import { useState } from 'react'
import Button from './Button'
import Field from './Field'
import sendEmail from '../logic/sendEmail'
import RadioInput from './RadioInput'
import updateEmail from '../logic/updateEmail'

function Form() {
  const [email, setEmail] = useState('')
  const [numero, setNumero] = useState('as')
  const [palo, setPalo] = useState('picas')

  const handleOnClickSend = (e) => {
    e.preventDefault()
    console.log(email)
    sendEmail(email)
  }
  const handleClickUpdate = (e) => {
    e.preventDefault()
    const card = numero + '-' + palo
    console.log(email, card)
    updateEmail(email, card)
  }
  return (
    <>
      <form className='flex flex-col m-4 gap-20 w-1/2' action='submit'>
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

        <div className='flex flex-col gap-1'>
          <RadioInput
            handleChangeNumero={setNumero}
            handleChangePalo={setPalo}
          />

          <Button onClick={handleClickUpdate} type='button'>
            Actualizar
          </Button>
        </div>
      </form>
    </>
  )
}
export default Form
