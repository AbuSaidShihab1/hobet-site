import { FaCheck, FaTimes } from "react-icons/fa";
import Header from "../../common/Header";

const DepositRequest = () => {
  return (
   <section className="w-full bg-gray-1 font-bai">
      <Header/>
      <div className="p-6 w-full flex flex-col ">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Abu Said Shihab ৳2000</h2>
      <div className="flex gap-6 w-full">
        {/* Left Panel */}
        <div className="bg-white shadow-md rounded-lg border-[1px] border-[#eee] p-6 flex-1">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Deposit Via Bank Transfer</h3>
          <table className="w-full text-sm">
            <tbody>
              {[
                { label: "Date", value: "2025-02-23 10:04 AM" },
                { label: "Transaction Number", value: "UOS4HVMF9NS1" },
                { label: "Username", value: "@akay99", highlight: true },
                { label: "Method", value: "Bank Transfer", bold: true },
                { label: "Amount", value: "$1,000.00 USD", bold: true },
                { label: "Charge", value: "$15.00 USD", bold: true },
                { label: "After Charge", value: "$1,015.00 USD", bold: true },
                { label: "Rate", value: "1 USD = 1.00 USD", bold: true },
                { label: "After Rate Conversion", value: "1,015.00 USD" },
              ].map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2 font-medium text-gray-700">{item.label}</td>
                  <td
                    className={`py-2 text-right ${
                      item.bold ? "font-bold" : ""
                    } ${item.highlight ? "text-blue-500" : "text-gray-900"}`}
                  >
                    {item.value}
                  </td>
                </tr>
              ))}
              <tr>
                <td className="py-2 font-medium text-gray-700">Status</td>
                <td className="py-2 text-right">
                  <span className="px-3 py-1 text-xs font-semibold text-orange-600 bg-orange-100 rounded-full">
                    Pending
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* Right Panel */}
        <div className="bg-white shadow-md rounded-lg p-6 border-[1px] border-[#eee] w-1/3">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">User Deposit Information</h3>
          <p className="text-sm font-medium text-gray-700">Transaction Number</p>
          <p className="text-gray-900 mb-3">245484465</p>
          <p className="text-sm font-medium text-gray-700">Screenshot</p>
          <a href="#" className="text-blue-500 text-sm mb-4 block">
            📎 Attachment
          </a>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-600">
              <FaCheck /> Approve
            </button>
            <button className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600">
              <FaTimes /> Reject
            </button>
          </div>
        </div>
      </div>
    </div>
   </section>
  );
};

export default DepositRequest;
