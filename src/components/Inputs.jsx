/* eslint-disable react/prop-types */
function Inputs({ type, placeholder, className, name, onChange }) {
  return (
    <div className="py-2">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        className={`${className} bg-white border outline-none border-gray-400 w-full p-2 rounded-lg text-gray-900`}
        required
      />
    </div>
  );
}

export default Inputs;
