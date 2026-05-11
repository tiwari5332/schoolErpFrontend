import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { MONTHLY_PERFORMANCE, STUDENT_DISTRIBUTION } from '../../Constants';

export function TeacherPerformanceTab() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="border-0 shadow-xl hover-lift glass-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Monthly Performance Trend
          </CardTitle>
          <CardDescription>Class average performance over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={MONTHLY_PERFORMANCE}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                  border: '1px solid #e2e8f0', 
                  borderRadius: '12px',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                  backdropFilter: 'blur(10px)'
                }} 
              />
              <Line 
                type="monotone" 
                dataKey="classAverage" 
                stroke="#6366f1" 
                strokeWidth={4}
                dot={{ fill: '#6366f1', strokeWidth: 3, r: 6 }}
                name="Class Average"
              />
              <Line 
                type="monotone" 
                dataKey="attendance" 
                stroke="#10b981" 
                strokeWidth={4}
                dot={{ fill: '#10b981', strokeWidth: 3, r: 6 }}
                name="Attendance"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-xl hover-lift glass-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
            Student Grade Distribution
          </CardTitle>
          <CardDescription>Distribution of grades across all classes</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={STUDENT_DISTRIBUTION}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="count"
              >
                {STUDENT_DISTRIBUTION.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                  border: '1px solid #e2e8f0', 
                  borderRadius: '12px',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                  backdropFilter: 'blur(10px)'
                }} 
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-4">
            {STUDENT_DISTRIBUTION.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm text-slate-600">{item.grade}</span>
                </div>
                <span className="text-sm font-medium text-slate-900">{item.count} students</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
