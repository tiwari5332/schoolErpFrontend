import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../../components/ui/card";
import { Badge } from "../../../../components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ATTENDANCE_DATA } from '../../constant';

export function StudentAttendanceTab() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="border-0 shadow-xl hover-lift glass-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
            Monthly Attendance Trend
          </CardTitle>
          <CardDescription>Attendance percentage over the last 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={ATTENDANCE_DATA}>
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
                formatter={(value) => [`${value}%`, 'Attendance']}
              />
              <Line 
                type="monotone" 
                dataKey="percentage" 
                stroke="#10b981" 
                strokeWidth={4}
                dot={{ fill: '#10b981', strokeWidth: 3, r: 6 }}
                activeDot={{ r: 8, stroke: '#10b981', strokeWidth: 3, fill: '#ffffff' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-xl hover-lift glass-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Detailed Attendance Record
          </CardTitle>
          <CardDescription>Monthly breakdown of attendance</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {ATTENDANCE_DATA.map((month, index) => (
            <div key={index} className="p-4 rounded-xl border bg-gradient-to-r from-slate-50/50 to-slate-100/50 hover:shadow-lg transition-all duration-200">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-slate-900">{month.month} 2024</h4>
                <Badge className={`${month.percentage >= 95 ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 
                                    month.percentage >= 90 ? 'bg-amber-100 text-amber-800 border-amber-200' : 
                                    'bg-rose-100 text-rose-800 border-rose-200'}`}>
                  {month.percentage}%
                </Badge>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <p className="text-emerald-600 font-medium">{month.present}</p>
                  <p className="text-slate-500">Present</p>
                </div>
                <div className="text-center">
                  <p className="text-rose-600 font-medium">{month.absent}</p>
                  <p className="text-slate-500">Absent</p>
                </div>
                <div className="text-center">
                  <p className="text-slate-700 font-medium">{month.total}</p>
                  <p className="text-slate-500">Total Days</p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
