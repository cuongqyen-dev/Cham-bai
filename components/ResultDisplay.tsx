import React from 'react';
import { GradingResult } from '../types';
import { CheckCircle2, AlertCircle, TrendingUp, BookOpenCheck, RotateCcw } from 'lucide-react';

interface ResultDisplayProps {
  result: GradingResult;
  onReset: () => void;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, onReset }) => {
  const percentage = Math.round((result.score / result.maxScore) * 100);

  // Color logic based on score
  let scoreColor = "text-red-500";
  let borderColor = "border-red-500";
  if (percentage >= 80) {
    scoreColor = "text-green-600";
    borderColor = "border-green-500";
  } else if (percentage >= 60) {
    scoreColor = "text-yellow-600";
    borderColor = "border-yellow-500";
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden animate-fade-in">
      {/* Header / Score Section */}
      <div className="bg-slate-50 p-6 border-b border-slate-100">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Assessment Complete</h2>
            <p className="text-slate-600">{result.summary}</p>
          </div>
          
          <div className={`relative flex items-center justify-center w-32 h-32 rounded-full border-4 ${borderColor} bg-white shadow-sm`}>
            <div className="text-center">
              <span className={`block text-3xl font-bold ${scoreColor}`}>
                {result.score}
                <span className="text-sm text-slate-400 font-normal">/{result.maxScore}</span>
              </span>
              <span className="block text-xl font-semibold text-slate-700">{result.letterGrade}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Strengths */}
        <div>
          <h3 className="flex items-center gap-2 text-green-700 font-semibold mb-3">
            <CheckCircle2 className="w-5 h-5" /> Strengths
          </h3>
          <ul className="space-y-2">
            {result.strengths.map((item, idx) => (
              <li key={idx} className="flex gap-2 text-slate-700 text-sm bg-green-50 p-3 rounded-lg border border-green-100">
                <span>•</span> {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Weaknesses */}
        <div>
          <h3 className="flex items-center gap-2 text-amber-600 font-semibold mb-3">
            <AlertCircle className="w-5 h-5" /> Areas for Improvement
          </h3>
          <ul className="space-y-2">
            {result.weaknesses.map((item, idx) => (
              <li key={idx} className="flex gap-2 text-slate-700 text-sm bg-amber-50 p-3 rounded-lg border border-amber-100">
                <span>•</span> {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Detailed Feedback */}
      <div className="p-6 border-t border-slate-100">
        <h3 className="flex items-center gap-2 text-indigo-700 font-semibold mb-3">
          <TrendingUp className="w-5 h-5" /> Detailed Feedback
        </h3>
        <p className="text-slate-700 leading-relaxed whitespace-pre-wrap bg-slate-50 p-4 rounded-lg border border-slate-100">
          {result.detailedFeedback}
        </p>
      </div>

      {/* Corrected Version (Collapsible or just section) */}
      {result.correctedVersion && (
        <div className="p-6 border-t border-slate-100 bg-indigo-50/30">
          <h3 className="flex items-center gap-2 text-indigo-700 font-semibold mb-3">
            <BookOpenCheck className="w-5 h-5" /> Suggested Corrections
          </h3>
          <div className="text-slate-800 font-mono text-sm bg-white p-4 rounded-lg border border-slate-200 overflow-x-auto">
             {result.correctedVersion}
          </div>
        </div>
      )}

      <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end">
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-6 py-2 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-medium rounded-lg transition-colors"
        >
          <RotateCcw className="w-4 h-4" /> Grade Another
        </button>
      </div>
    </div>
  );
};