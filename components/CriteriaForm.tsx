import React from 'react';
import { GradingCriteria } from '../types';
import { Settings, BookOpen, GraduationCap, Target } from 'lucide-react';

interface CriteriaFormProps {
  criteria: GradingCriteria;
  setCriteria: React.Dispatch<React.SetStateAction<GradingCriteria>>;
  disabled: boolean;
}

export const CriteriaForm: React.FC<CriteriaFormProps> = ({ criteria, setCriteria, disabled }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCriteria((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <div className="flex items-center gap-2 mb-4 text-slate-800">
        <Settings className="w-5 h-5 text-indigo-600" />
        <h2 className="text-lg font-semibold">Grading Criteria</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {/* Grade Level */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1 flex items-center gap-1">
            <GraduationCap className="w-3 h-3" /> Grade Level
          </label>
          <select
            name="gradeLevel"
            value={criteria.gradeLevel}
            onChange={handleChange}
            disabled={disabled}
            className="w-full rounded-lg border-slate-300 border p-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
          >
            <option value="Elementary School">Elementary School</option>
            <option value="Middle School">Middle School</option>
            <option value="High School">High School</option>
            <option value="College/University">College/University</option>
            <option value="Professional">Professional</option>
            <option value="IELTS/TOEFL">IELTS/TOEFL Practice</option>
          </select>
        </div>

        {/* Subject */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1 flex items-center gap-1">
            <BookOpen className="w-3 h-3" /> Subject
          </label>
          <input
            type="text"
            name="subject"
            value={criteria.subject}
            onChange={handleChange}
            disabled={disabled}
            placeholder="e.g. English, History, Math"
            className="w-full rounded-lg border-slate-300 border p-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
          />
        </div>

        {/* Focus Area */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1 flex items-center gap-1">
            <Target className="w-3 h-3" /> Focus Area
          </label>
          <input
            type="text"
            name="focusArea"
            value={criteria.focusArea}
            onChange={handleChange}
            disabled={disabled}
            placeholder="e.g. Grammar, Creativity"
            className="w-full rounded-lg border-slate-300 border p-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
          />
        </div>
      </div>

      {/* Custom Rubric */}
      <div>
        <label className="block text-sm font-medium text-slate-600 mb-1">
          Custom Instructions / Rubric (Optional)
        </label>
        <textarea
          name="customRubric"
          value={criteria.customRubric}
          onChange={handleChange}
          disabled={disabled}
          placeholder="Paste specific rubric details here or special instructions for the AI grader..."
          rows={3}
          className="w-full rounded-lg border-slate-300 border p-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none"
        />
      </div>
    </div>
  );
};