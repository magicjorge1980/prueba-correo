function RadioInput({ handleChangeNumero, handleChangePalo }) {
  return (
    <div className='flex gap-40'>
      <div className='flex flex-col'>
        <label htmlFor='numero'>Número</label>
        <select
          onChange={(e) => handleChangeNumero(e.target.value)}
          className='border-2 border-gray-400 size-10'
          name='numero'
          id='numero'
          required
        >
          <option value='as'>1</option>
          <option value='dos'>2</option>
          <option value='tres'>3</option>
          <option value='cuatro'>4</option>
          <option value='cinco'>5</option>
          <option value='seis'>6</option>
          <option value='siete'>7</option>
          <option value='ocho'>8</option>
          <option value='nueve'>9</option>
          <option value='diez'>10</option>
          <option value='J'>J</option>
          <option value='Q'>Q</option>
          <option value='K'>K</option>
        </select>
      </div>

      <div className='flex flex-col'>
        <label htmlFor='palo'>Palo</label>
        <select
          onChange={(e) => handleChangePalo(e.target.value)}
          className='border-2 border-gray-400'
          name='palo'
          id='palo'
          required
        >
          <option value='picas'>Picas</option>
          <option value='corazones'>Corazones</option>
          <option value='trebol'>Tréboles</option>
          <option value='rombos'>Rombos</option>
        </select>
      </div>
    </div>
  )
}
export default RadioInput
