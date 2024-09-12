/* eslint-disable react/prop-types */

function Inputs({ type, placeholder, className, name, onChange }) {
  return (
    <div className="p-2 ">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        className={`registrationinput ${className} bg-white border outline-none focus:border-gray-400 input border-gray-400 w-full rounded-lg text-gray-900`}
        required
      />
    </div>
  );
}

export default Inputs;
