import { AiOutlineClose } from "react-icons/ai";
import { useEffect } from "react";

export default function BanUserModal({ isOpen, onClose }) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-[90%] lg:w-[70%] xl:w-[30%]">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold text-red-600">Ban User</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <AiOutlineClose className="text-xl" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4">
          <p className="mb-4 text-[20px] text-gray-700">If you ban this user he/she won't able to access his/her dashboard.</p>

          {/* Reason for Ban */}
          <div className="mb-4">
            <label className="block text-[16px] mb-[4px] font-medium text-gray-700">Reason *</label>
            <textarea
              placeholder="Enter reason"
              className="w-full p-2 border rounded-md outline-none"
              rows="3"
            ></textarea>
          </div>

          {/* Confirm and Cancel Buttons */}
          <div className="flex justify-between w-full">

            <button className="bg-indigo-600 text-white w-full px-4 py-2 rounded-md hover:bg-indigo-700">
              Ban User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
