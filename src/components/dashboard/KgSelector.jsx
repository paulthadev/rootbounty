/* eslint-disable react/prop-types */
const KgSelector = ({ selectedKg }) => {
  return (
    <div className="flex items-center mt-4">
      <div className="px-4 py-2 border rounded-full text-lg font-semibold bg-green-500 text-white">
        {selectedKg} kg
      </div>
    </div>
  );
};

export default KgSelector;
