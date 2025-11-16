"use client";

import { use, useEffect, useState } from "react";

export default function TakeQuiz({params}) {
  const {quizId} = use(params)
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (quizId) {
      fetch(process.env.NEXT_PUBLIC_API_URL + `/quizzes/${quizId}`)
        .then((r) => r.json())
        .then((data) => {
          setQuiz(data);
          setAnswers([]);
          setResult(null);
        });
    }
  }, [quizId]);

  const handleChange = (ans, i) => {
    const arr = [...answers];
    arr[i] = ans;
    setAnswers(arr);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let score = 0,
      total = quiz.questions.length;
    quiz.questions.forEach((q, i) => {
      if (q.type === "mcq" && answers[i] === q.answer) score++;
      if (q.type === "truefalse" && answers[i] === q.answer) score++;
      if (
        q.type === "text" &&
        q.answer &&
        answers[i] &&
        answers[i].toLowerCase().trim() === q.answer.toLowerCase().trim()
      )
        score++;
    });
    setResult({ score, total });
  };

  if (!quiz)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-indigo-600 text-xl font-semibold">Loading...</p>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded shadow-md my-8">
      <h1 className="text-4xl font-bold text-indigo-700 mb-8 text-center">
        {quiz.title}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-10">
        {quiz.questions?.map((q, i) => (
          <div
            key={i}
            className="border border-indigo-200 rounded-lg p-6 bg-indigo-50"
          >
            <p className="font-semibold text-lg mb-4 text-black">{q.question}</p>

            {q.type === "mcq" &&
              q.options.map((opt, j) => (
                <label
                  key={j}
                  className="flex items-center space-x-3 mb-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name={`q${i}`}
                    value={opt}
                    checked={answers[i] === opt}
                    onChange={() => handleChange(opt, i)}
                    required
                    className="form-radio h-5 w-5 text-indigo-600"
                  />
                  <span className="text-indigo-800">{opt}</span>
                </label>
              ))}

            {q.type === "truefalse" && (
              <div className="space-x-8">
                <label className="inline-flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name={`q${i}`}
                    value="true"
                    checked={answers[i] === "true"}
                    onChange={() => handleChange("true", i)}
                    required
                    className="form-radio h-5 w-5 text-indigo-600"
                  />
                  <span className="text-indigo-800">True</span>
                </label>
                <label className="inline-flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name={`q${i}`}
                    value="false"
                    checked={answers[i] === "false"}
                    onChange={() => handleChange("false", i)}
                    required
                    className="form-radio h-5 w-5 text-indigo-600"
                  />
                  <span className="text-indigo-800">False</span>
                </label>
              </div>
            )}

            {q.type === "text" && (
              <input
                type="text"
                value={answers[i] || ""}
                onChange={(e) => handleChange(e.target.value, i)}
                placeholder="Type your answer"
                required
                className="w-full mt-2 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            )}
          </div>
        ))}

        <div className="text-center">
          <button
            type="submit"
            className="px-10 py-3 bg-indigo-600 rounded font-semibold text-white hover:bg-indigo-700 transition cursor-pointer"
          >
            Submit
          </button>
        </div>
      </form>

      {result && (
        <div className="mt-12 bg-indigo-100 border border-indigo-300 rounded p-6 text-center">
          <h2 className="text-3xl font-bold text-indigo-700 mb-4">
            Your Score: {result.score} / {result.total}
          </h2>
          <h3 className="text-xl font-semibold mb-3 text-indigo-800">
            Correct Answers:
          </h3>
          <ul className="text-indigo-900 space-y-1 max-w-xl mx-auto">
            {quiz.questions.map((q, i) => (
              <li key={i} className="border-b border-indigo-200 pb-2">
                <span className="font-medium">{q.question}</span>: {q.answer}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
