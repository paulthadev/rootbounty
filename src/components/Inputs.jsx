/* eslint-disable react/prop-types */

function Inputs({
  type,
  placeholder,
  className,
  name,
  onChange,
  value,
  rows,
  label,
  step,
  min,
}) {
  const inputProps = {
    type,
    name,
    min,
    placeholder,
    step,
    onChange,
    className: `registrationinput ${className} bg-white border outline-none focus:border-gray-400 input border-gray-400 w-full rounded-lg text-gray-900`,
    required: true,
  };

  return (
    <div className="p-2">
      <label className="block font-medium  mb-1 text-sm md:text-lg lg:text-xl">
        {label}
      </label>
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
