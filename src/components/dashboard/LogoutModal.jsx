/* eslint-disable react/prop-types */
const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h2 className="text-xl font-bold">Confirm Logout</h2>
        <p className="mt-2">Are you sure you want to logout?</p>
        <div className="modal-action">
          <button className="btn btn-error text-white" onClick={onConfirm}>
            Yes, Logout
          </button>
          <button className="btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
