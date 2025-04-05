"use client";

import React from "react";
import { motion } from "framer-motion";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const timeSlots = [
  "08:00 - 09:00",
  "09:00 - 10:00",
  "10:00 - 11:00",
  "11:00 - 12:00",
  "12:00 - 01:00",
  "01:00 - 02:00",
  "02:00 - 03:00",
];

const timetableData: { [day: string]: string[] } = {
  Monday: ["DSA", "OS", "CN", "DBMS", "Break", "Maths", "AI"],
  Tuesday: ["OS", "Maths", "CN", "DSA", "Break", "DBMS", "AI"],
  Wednesday: ["DBMS", "DSA", "OS", "Break", "Maths", "AI", "CN"],
  Thursday: ["CN", "AI", "Maths", "Break", "DSA", "OS", "DBMS"],
  Friday: ["AI", "CN", "DSA", "OS", "Break", "Maths", "DBMS"],
  Saturday: ["Maths", "DBMS", "CN", "Break", "DSA", "AI", "OS"],
};

const getColor = (subject: string) => {
  const colors: { [key: string]: string } = {
    DSA: "bg-blue-100 text-blue-800",
    OS: "bg-red-100 text-red-800",
    CN: "bg-purple-100 text-purple-800",
    DBMS: "bg-green-100 text-green-800",
    Maths: "bg-yellow-100 text-yellow-800",
    AI: "bg-pink-100 text-pink-800",
    Break: "bg-gray-200 text-gray-600",
  };
  return colors[subject] || "bg-gray-100 text-gray-800";
};

export default function TimetablePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-6">
      <div className="max-w-6xl mx-auto">
        <motion.h1
          className="text-4xl font-bold text-center text-gray-800 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Timetable
        </motion.h1>
        <div className="overflow-auto rounded-xl shadow-xl">
          <table className="min-w-full text-sm text-left border border-gray-200 bg-white rounded-lg overflow-hidden">
            <thead className="bg-slate-800 text-white">
              <tr>
                <th className="px-4 py-3 font-medium">Time</th>
                {days.map((day) => (
                  <th key={day} className="px-4 py-3 font-medium text-center">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map((slot, rowIdx) => (
                <tr
                  key={slot}
                  className="even:bg-slate-50 odd:bg-white transition hover:bg-slate-100"
                >
                  <td className="border px-4 py-3 font-medium">{slot}</td>
                  {days.map((day) => {
                    const subject = timetableData[day][rowIdx] || "-";
                    return (
                      <td
                        key={`${day}-${slot}`}
                        className={`border px-4 py-3 text-center rounded-lg font-semibold ${getColor(
                          subject
                        )}`}
                      >
                        {subject}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
