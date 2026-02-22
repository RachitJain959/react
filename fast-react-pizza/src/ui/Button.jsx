function Button({ children, disabled }) {
  return (
    <button
      className="inline-block rounded-full bg-yellow-400 px-4 py-3 font-semibold uppercase tracking-wide transition-colors duration-200 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed"
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
