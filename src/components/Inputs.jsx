/* eslint-disable react/prop-types */

function Inputs({ type, placeholder, className, name, onChange, value, rows }) {
  const inputProps = {
    type,
    name,
    placeholder,
    onChange,
    className: `registrationinput ${className} bg-white border outline-none focus:border-gray-400 input border-gray-400 w-full rounded-lg text-gray-900`,
    required: true,
  };

  return (
    <div className="p-2">
      {type === "textarea" ? (
        <textarea
          {...inputProps}
          value={value}
          rows={rows}
          className={`registrationinput ${className} resize-none bg-white h-fit py-4 border outline-none focus:border-gray-400 input border-gray-400 w-full rounded-lg text-gray-900`}
        />
      ) : (
        <input {...inputProps} />
      )}
    </div>
  );
}

export default Inputs;
