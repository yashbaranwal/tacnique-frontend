"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    fetch("/api/quizzes").then((r) => r.json()).then(setQuizzes);
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded shadow-md mt-8">
      <h1 className="text-4xl font-extrabold text-indigo-700 mb-8 text-center">
        Available Quizzes
      </h1>

      <ul className="space-y-4">
        {quizzes.length === 0 && (
          <li className="text-gray-500 text-center">No quizzes available.</li>
        )}
        {quizzes.map((qz) => (
          <li key={qz.id}>
            <a
              href={`/quiz/${qz.id}`}
              className="block px-6 py-4 bg-indigo-50 rounded-lg border border-indigo-200 text-indigo-700 font-semibold hover:bg-indigo-100 transition"
            >
              {qz.title}
            </a>
          </li>
        ))}
      </ul>

      <div className="mt-10 text-center">
        <a
          href="/admin"
          className="inline-block px-6 py-3 rounded bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
        >
          Admin Panel (Create Quiz)
        </a>
      </div>
    </div>
  );
}
