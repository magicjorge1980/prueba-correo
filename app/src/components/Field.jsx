function Field({ children, type, name, id, value, handleChange }) {
  return (
    <div className='flex flex-col'>
      <label htmlFor='mail'>{children}</label>
      <input
        onChange={(e) => handleChange(e.target.value)}
        value={value}
        className='border-2 border-gray-500 rounded-md p-1'
        type={type}
        name={name}
        id={id}
      />
    </div>
  )
}
export default Field
