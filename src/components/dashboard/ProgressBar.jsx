/* eslint-disable react/prop-types */
const ProgressBar = ({ name, percentage }) => {
  return (
    <div className="flex flex-col justify-between gap-2">
      <p className="font-semibold">{name}</p>

      <div className="flex items-center gap-8">
        {/* Container for the progress bar */}
        <div className="flex-grow bg-gray-200 h-2 rounded-full relative overflow-hidden">
          {/* Filled section */}
          <div
            className="bg-green-400 h-2 absolute top-0 left-0"
            style={{ width: `${percentage}%` }}
          ></div>
          {/* Unfilled section is implicitly the background */}
        </div>
        {/* Percentage display */}
        <span className="ml-4 font-bold">{percentage.toFixed(2)}%</span>
      </div>
    </div>
  );
};

export default ProgressBar;