function Button({ type, children, onClick }) {
  return (
    <button
      className='h-32 border-2 border-gray-500 rounded-md bg-blue-300 hover:bg-blue-500'
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
export default Button
