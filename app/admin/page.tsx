"use client";

import { useState, useEffect } from "react";

export default function Admin() {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([
    { type: "mcq", question: "", options: ["", "", ""], answer: "" },
  ]);
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL + "/quizzes").then((r) => r.json()).then(setQuizzes);
  }, []);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { type: "mcq", question: "", options: ["", "", ""], answer: "" },
    ]);
  };

  const handleQuestionChange = (index, key, value) => {
    const qs = [...questions];
    qs[index][key] = value;
    setQuestions(qs);
  };

  const handleOptionChange = (qIdx, optIdx, value) => {
    const qs = [...questions];
    qs[qIdx].options[optIdx] = value;
    setQuestions(qs);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(process.env.NEXT_PUBLIC_API_URL + "/quizzes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, questions }),
    });
    setTitle("");
    setQuestions([{ type: "mcq", question: "", options: ["", "", ""], answer: "" }]);
    fetch(process.env.NEXT_PUBLIC_API_URL + "/quizzes").then((r) => r.json()).then(setQuizzes);
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-700">
        Admin Panel - Create Quiz
      </h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        <input
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-gray-400 text-black"
          placeholder="Quiz Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        {questions.map((q, i) => (
          <div key={i} className="border rounded p-4 space-y-4 bg-gray-50">
            <p className="text-gray-700">Question {i+1}</p>
            <div className="flex items-center space-x-4">
              <select
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
                value={q.type}
                onChange={(e) => handleQuestionChange(i, "type", e.target.value)}
              >
                <option value="mcq">MCQ</option>
                <option value="truefalse">True/False</option>
                <option value="text">Text</option>
              </select>

              <input
                className="grow border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-gray-400 text-black"
                placeholder="Question"
                value={q.question}
                onChange={(e) => handleQuestionChange(i, "question", e.target.value)}
                required
              />
            </div>

            {q.type === "mcq" &&
              q.options.map((opt, j) => (
                <input
                  key={j}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-gray-400 text-black"
                  placeholder={`Option ${j + 1}`}
                  value={opt}
                  onChange={(e) => handleOptionChange(i, j, e.target.value)}
                  required
                />
              ))}

            {q.type === "mcq" && (
              <input
                className="w-full border border-green-500 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 placeholder:text-gray-400 text-black"
                placeholder="Correct Answer"
                value={q.answer}
                onChange={(e) => handleQuestionChange(i, "answer", e.target.value)}
                required
              />
            )}

            {q.type === "truefalse" && (
              <select
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-400"
                value={q.answer}
                onChange={(e) => handleQuestionChange(i, "answer", e.target.value)}
                required
              >
                <option value="">Correct Answer?</option>
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            )}

            {q.type === "text" && (
              <input
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-gray-400 text-black"
                placeholder="Expected Answer (optional)"
                value={q.answer}
                onChange={(e) => handleQuestionChange(i, "answer", e.target.value)}
              />
            )}
          </div>
        ))}

        <div className="flex space-x-4 justify-between">
          <button
            type="button"
            onClick={addQuestion}
            className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded hover:bg-indigo-600 hover:text-white transition cursor-pointer"
          >
            Add Question
          </button>
          <button
            type="submit"
            className="px-8 py-2 bg-indigo-600 text-white font-semibold rounded hover:bg-indigo-700 transition cursor-pointer"
          >
            Create Quiz
          </button>
        </div>
      </form>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700">
          Existing Quizzes
        </h2>
        <ul className="space-y-2">
          {quizzes.map((qz) => (
            <li key={qz._id} className="border-b pb-2">
              <a
                href={`/quiz/${qz._id}`}
                className="text-indigo-600 hover:underline font-medium"
              >
                {qz.title}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
