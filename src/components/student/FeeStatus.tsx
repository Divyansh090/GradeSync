"use client";

import { useState } from "react";

interface FeeStatusProps {
  feeData: {
    totalFee: number;
    paidFee: number;
    pendingFee: number;
    paymentHistory: {
      date: string;
      amount: number;
      status: string;
    }[];
  };
}

export function FeeStatus({ feeData }: FeeStatusProps) {
  const [showHistory, setShowHistory] = useState(false);
  const percentPaid = Math.round((feeData.paidFee / feeData.totalFee) * 100);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
          <div className="text-gray-500 mb-1">Total Fee</div>
          <div className="text-2xl font-bold">${feeData.totalFee.toLocaleString()}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
          <div className="text-gray-500 mb-1">Paid Fee</div>
          <div className="text-2xl font-bold text-green-600">${feeData.paidFee.toLocaleString()}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
          <div className="text-gray-500 mb-1">Pending Fee</div>
          <div className="text-2xl font-bold text-amber-600">${feeData.pendingFee.toLocaleString()}</div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
        <div className="mb-2 flex justify-between items-center">
          <div className="font-medium">Fee Payment Progress</div>
          <div className="text-sm text-gray-500">{percentPaid}% Complete</div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-blue-600 h-2.5 rounded-full" 
            style={{ width: `${percentPaid}%` }}
          ></div>
        </div>
      </div>
      
      <div>
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="text-blue-600 font-medium flex items-center gap-1"
        >
          {showHistory ? 'Hide' : 'Show'} Payment History
          <svg 
            xmlns="http://www.w3.org/2000/svg"
            className={`h-4 w-4 transition-transform ${showHistory ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {showHistory && (
          <div className="mt-4 bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {feeData.paymentHistory.map((payment, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(payment.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      ${payment.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {payment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
