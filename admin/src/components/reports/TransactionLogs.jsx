import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import Header from '../common/Header';

const TransactionLogs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const transactions = [
    { user: "nara smile", trx: "7JFEJR4T3VF6", transacted: "2025-02-13 10:28 AM", amount: "- $10.00 USD", postBalance: "$0.00 USD", details: "Invest to Crazy Times" },
    { user: "Jonah Bermoy", trx: "XDN8MYC9FMKR", transacted: "2025-02-13 08:41 AM", amount: "- $1.00 USD", postBalance: "$9.00 USD", details: "Invest to Number Slot" },
    { user: "Jonah Bermoy", trx: "6X6UAFDAHJYY", transacted: "2025-02-13 08:38 AM", amount: "+ $10.00 USD", postBalance: "$10.00 USD", details: "You have got register bonus" },
    { user: "md sadik", trx: "I9Z12ZHZWGOG", transacted: "2025-02-13 08:11 AM", amount: "- $10.00 USD", postBalance: "$0.00 USD", details: "Invest to Color Prediction" },
  ];

  const filteredTransactions = transactions.filter(tx => 
    tx.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tx.trx.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className='className=" w-full font-bai"'>
      <Header/>
      <div className="w-full p-6 font-bai">

<h1 className="text-2xl font-semibold text-gray-800 mb-6">Transaction Logs</h1>
<div className="mb-4 flex justify-between">
  <input
    type="text"
    placeholder="Search by TRX/Username..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="w-[30%] pl-10 pr-4 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
  />
  <FiSearch className="absolute mt-3 ml-3 text-gray-400" />
</div>
<div className="overflow-x-auto">
  <table className="w-full border-collapse shadow-xl bg-white border-[1px] border-[#eee] rounded-md overflow-hidden">
    <thead>
      <tr className="bg-[#4634FF] text-white">
        <th className="py-3 px-4 text-left">User</th>
        <th className="py-3 px-4 text-left">TRX</th>
        <th className="py-3 px-4 text-left">Transacted</th>
        <th className="py-3 px-4 text-left">Amount</th>
        <th className="py-3 px-4 text-left">Post Balance</th>
        <th className="py-3 px-4 text-left">Details</th>
      </tr>
    </thead>
    <tbody>
      {filteredTransactions.map((tx, index) => (
        <tr key={index} className="border-b even:bg-gray-50">
          <td className="py-3 px-4 text-gray-800">{tx.user}</td>
          <td className="py-3 px-4 text-gray-800">{tx.trx}</td>
          <td className="py-3 px-4 text-gray-800">{tx.transacted}</td>
          <td className={`py-3 px-4 font-semibold ${tx.amount.includes('-') ? 'text-red-600' : 'text-green-600'}`}>{tx.amount}</td>
          <td className="py-3 px-4 text-gray-800">{tx.postBalance}</td>
          <td className="py-3 px-4 text-gray-800">{tx.details}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
</div>
    </section>
   
  );
};

export default TransactionLogs;
