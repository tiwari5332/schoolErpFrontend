import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../../components/ui/card";
import { Badge } from "../../../../components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TEST_RESULTS } from '../../constant';

export function StudentAcademicsTab() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="border-0 shadow-xl hover-lift glass-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Subject Performance
          </CardTitle>
          <CardDescription>Overall grades by subject</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={TEST_RESULTS}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="subject" stroke="#64748b" fontSize={12} angle={-45} textAnchor="end" height={80} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                  border: '1px solid #e2e8f0', 
                  borderRadius: '12px',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                  backdropFilter: 'blur(10px)'
                }} 
                formatter={(value) => [`${value}%`, 'Grade']}
              />
              <Bar dataKey="grade" fill="#6366f1" radius={6} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-xl hover-lift glass-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
            Recent Test Results
          </CardTitle>
          <CardDescription>Latest test scores and assessments</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {TEST_RESULTS.slice(0, 3).map((subject, index) => (
            <div key={index} className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-slate-900">{subject.subject}</h4>
                <Badge className="bg-indigo-100 text-indigo-800 border-indigo-200">
                  {subject.grade}%
                </Badge>
              </div>
              {subject.tests.slice(0, 2).map((test, testIndex) => (
                <div key={testIndex} className="flex items-center justify-between p-3 rounded-lg bg-slate-50/50 border border-slate-200">
                  <div>
                    <p className="font-medium text-sm text-slate-900">{test.name}</p>
                    <p className="text-xs text-slate-500">{new Date(test.date).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm">{test.score}/{test.maxScore}</p>
                    <p className="text-xs text-slate-500">{Math.round((test.score / test.maxScore) * 100)}%</p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
