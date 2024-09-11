function TextArea({ children, value, handleChange }) {
  return (
    <div className='flex flex-col'>
      <label htmlFor='body'>{children}</label>
      <textarea
        onChange={(e) => handleChange(e.target.value)}
        className='border-2 border-gray-500 rounded-md resize-none w-96 h-32 p-2'
        name='body'
        id='body'
        value={value}
      ></textarea>
    </div>
  )
}
export default TextArea
