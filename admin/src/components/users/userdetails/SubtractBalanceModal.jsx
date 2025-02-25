import { AiOutlineClose } from "react-icons/ai";
import { useEffect } from "react";

export default function SubtractBalanceModal({ isOpen, onClose }) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center font-bai bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-[90%] lg:w-[70%] xl:w-[30%]">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Subtract Balance</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <AiOutlineClose className="text-xl" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4">
          {/* Amount Field */}
          <div className="mb-4">
            <label className="block text-[16px] mb-[4px] font-medium text-gray-700">Amount *</label>
            <div className="flex border rounded-md overflow-hidden">
              <input
                type="number"
                placeholder="Please provide positive amount"
                className="w-full p-2 outline-none text-gray-700"
              />
              <span className="bg-gray-200 px-3 py-2 text-gray-700">BDT</span>
            </div>
          </div>

          {/* Remark Field */}
          <div className="mb-4">
            <label className="block text-[16px] mb-[4px] font-medium text-gray-700">Remark *</label>
            <textarea
              placeholder="Remark"
              className="w-full p-2 border h-[200px] rounded-md outline-none text-gray-700"
              rows="3"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
