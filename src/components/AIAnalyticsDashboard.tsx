import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { 
  Brain,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  Users,
  BookOpen,
  Target,
  Lightbulb,
  Zap,
  BarChart3,
  PieChart,
  LineChart,
  Star,
  Award,
  Clock,
  Calendar,
  ArrowUp,
  ArrowDown,
  Eye,
  Download,
  Sparkles
} from "lucide-react";

export function AIAnalyticsDashboard() {
  const [selectedMetric, setSelectedMetric] = useState('performance');

  const predictiveInsights = [
    {
      id: '1',
      type: 'risk',
      title: 'Student Performance Risk Alert',
      description: '12 students are predicted to underperform in upcoming Math assessments',
      probability: 85,
      impact: 'high',
      action: 'Schedule intervention sessions',
      icon: AlertTriangle,
      color: 'gradient-rose'
    },
    {
      id: '2',
      type: 'opportunity',
      title: 'Excellence Opportunity',
      description: '8 students show potential for advanced placement in Science',
      probability: 92,
      impact: 'medium',
      action: 'Recommend advanced courses',
      icon: Star,
      color: 'gradient-amber'
    },
    {
      id: '3',
      type: 'trend',
      title: 'Attendance Pattern Optimization',
      description: 'Monday morning classes show 15% lower attendance',
      probability: 78,
      impact: 'medium',
      action: 'Reschedule important sessions',
      icon: TrendingUp,
      color: 'gradient-indigo'
    },
    {
      id: '4',
      type: 'achievement',
      title: 'Class Performance Surge',
      description: 'Class 10-A shows exceptional improvement in Physics',
      probability: 96,
      impact: 'high',
      action: 'Document teaching methods',
      icon: Trophy,
      color: 'gradient-emerald'
    }
  ];

  const performanceMetrics = [
    {
      title: 'Academic Performance Index',
      value: 87.5,
      trend: 5.2,
      color: 'gradient-emerald',
      icon: TrendingUp,
      description: 'Overall academic performance across all subjects'
    },
    {
      title: 'Engagement Score',
      value: 78.3,
      trend: -2.1,
      color: 'gradient-amber',
      icon: Users,
      description: 'Student participation and engagement levels'
    },
    {
      title: 'Retention Probability',
      value: 94.7,
      trend: 1.8,
      color: 'gradient-indigo',
      icon: Target,
      description: 'Likelihood of students continuing education'
    },
    {
      title: 'Teacher Effectiveness',
      value: 91.2,
      trend: 3.4,
      color: 'gradient-purple',
      icon: Award,
      description: 'Teaching quality and student outcome correlation'
    }
  ];

  const studentSegments = [
    { name: 'High Performers', count: 156, percentage: 32, color: 'bg-emerald-500' },
    { name: 'Above Average', count: 189, percentage: 39, color: 'bg-indigo-500' },
    { name: 'Average', count: 98, percentage: 20, color: 'bg-amber-500' },
    { name: 'At Risk', count: 34, percentage: 7, color: 'bg-rose-500' },
    { name: 'Critical', count: 8, percentage: 2, color: 'bg-red-600' },
  ];

  const learningPatterns = [
    {
      pattern: 'Visual Learners',
      percentage: 45,
      description: 'Prefer visual aids and diagrams',
      recommendation: 'Increase multimedia content',
      color: 'gradient-purple'
    },
    {
      pattern: 'Kinesthetic Learners',
      percentage: 30,
      description: 'Learn through hands-on activities',
      recommendation: 'Add more practical sessions',
      color: 'gradient-emerald'
    },
    {
      pattern: 'Auditory Learners',
      percentage: 25,
      description: 'Learn best through listening',
      recommendation: 'Include more discussions',
      color: 'gradient-indigo'
    }
  ];

  const aiRecommendations = [
    {
      id: '1',
      title: 'Personalized Learning Paths',
      description: 'AI suggests creating 3 different learning paths for Mathematics based on student performance clusters',
      impact: 'High',
      effort: 'Medium',
      timeline: '2 weeks',
      category: 'Curriculum'
    },
    {
      id: '2',
      title: 'Optimal Class Scheduling',
      description: 'Reschedule Physics labs to afternoon slots for 23% better engagement',
      impact: 'Medium',
      effort: 'Low',
      timeline: '1 week',
      category: 'Operations'
    },
    {
      id: '3',
      title: 'Early Intervention Program',
      description: 'Implement targeted support for 12 students showing early warning signs',
      impact: 'High',
      effort: 'High',
      timeline: '4 weeks',
      category: 'Student Support'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 bg-clip-text text-transparent">
            AI Analytics Dashboard 🧠
          </h1>
          <p className="text-slate-600 mt-2">
            Powered by advanced machine learning algorithms for predictive educational insights.
          </p>
        </div>
        <div className="flex gap-3">
          <Button className="gradient-purple text-white shadow-colored-purple">
            <Brain className="h-4 w-4 mr-2" />
            AI Insights
          </Button>
          <Button variant="outline" className="hover:bg-purple-50">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {performanceMetrics.map((metric, index) => (
          <Card key={index} className="glass-card border-0 shadow-xl hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`h-12 w-12 rounded-2xl ${metric.color} flex items-center justify-center shadow-lg`}>
                  <metric.icon className="h-6 w-6 text-white" />
                </div>
                <div className={`flex items-center gap-1 text-sm ${
                  metric.trend > 0 ? 'text-emerald-600' : 'text-red-600'
                }`}>
                  {metric.trend > 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                  {Math.abs(metric.trend)}%
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-slate-900">{metric.title}</h3>
                <div className="text-3xl font-bold text-slate-900">{metric.value}%</div>
                <p className="text-sm text-slate-600">{metric.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Predictive Insights */}
        <Card className="glass-card border-0 shadow-xl">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-purple-900">
              <Sparkles className="h-5 w-5" />
              AI Predictive Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {predictiveInsights.map((insight) => (
              <div key={insight.id} className="p-4 rounded-xl bg-white/50 hover:bg-white/70 transition-colors">
                <div className="flex items-start gap-3">
                  <div className={`h-10 w-10 rounded-xl ${insight.color} flex items-center justify-center shadow-lg`}>
                    <insight.icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-slate-900">{insight.title}</h4>
                      <Badge className={`${
                        insight.impact === 'high' ? 'bg-red-100 text-red-800 border-red-200' :
                        insight.impact === 'medium' ? 'bg-amber-100 text-amber-800 border-amber-200' :
                        'bg-blue-100 text-blue-800 border-blue-200'
                      }`}>
                        {insight.probability}% confidence
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-600 mb-3">{insight.description}</p>
                    <div className="flex items-center justify-between">
                      <Button size="sm" className="gradient-purple text-white">
                        {insight.action}
                      </Button>
                      <span className="text-xs text-slate-500">Impact: {insight.impact}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Student Segmentation */}
        <Card className="glass-card border-0 shadow-xl">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-indigo-900">
              <PieChart className="h-5 w-5" />
              Student Performance Segmentation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {studentSegments.map((segment, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full ${segment.color}`}></div>
                    <span className="font-medium text-slate-700">{segment.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-600">{segment.count}</span>
                    <span className="text-xs text-slate-500">({segment.percentage}%)</span>
                  </div>
                </div>
                <Progress value={segment.percentage} className="h-2" />
              </div>
            ))}
            <div className="pt-2 text-center">
              <Button variant="outline" className="hover:bg-indigo-50 w-full">
                <Eye className="h-4 w-4 mr-2" />
                View Detailed Analysis
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Learning Patterns & AI Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Learning Patterns */}
        <Card className="glass-card border-0 shadow-xl">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-emerald-900">
              <Brain className="h-5 w-5" />
              Learning Pattern Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {learningPatterns.map((pattern, index) => (
              <div key={index} className="p-4 rounded-xl bg-white/50">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-slate-900">{pattern.pattern}</h4>
                  <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">
                    {pattern.percentage}%
                  </Badge>
                </div>
                <p className="text-sm text-slate-600 mb-3">{pattern.description}</p>
                <div className="flex items-center justify-between">
                  <Progress value={pattern.percentage} className="h-2 flex-1 mr-4" />
                  <Button size="sm" className={`${pattern.color} text-white`}>
                    <Lightbulb className="h-3 w-3 mr-1" />
                    Apply
                  </Button>
                </div>
                <p className="text-xs text-emerald-600 mt-2">💡 {pattern.recommendation}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* AI Recommendations */}
        <Card className="glass-card border-0 shadow-xl">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-amber-900">
              <Zap className="h-5 w-5" />
              AI Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {aiRecommendations.map((rec) => (
              <div key={rec.id} className="p-4 rounded-xl bg-white/50 hover:bg-white/70 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-semibold text-slate-900 flex-1">{rec.title}</h4>
                  <Badge className="bg-amber-100 text-amber-800 border-amber-200">
                    {rec.category}
                  </Badge>
                </div>
                <p className="text-sm text-slate-600 mb-3">{rec.description}</p>
                <div className="grid grid-cols-3 gap-2 text-xs mb-3">
                  <div>
                    <span className="text-slate-500">Impact:</span>
                    <div className={`font-medium ${
                      rec.impact === 'High' ? 'text-emerald-600' :
                      rec.impact === 'Medium' ? 'text-amber-600' : 'text-blue-600'
                    }`}>
                      {rec.impact}
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-500">Effort:</span>
                    <div className="font-medium text-slate-700">{rec.effort}</div>
                  </div>
                  <div>
                    <span className="text-slate-500">Timeline:</span>
                    <div className="font-medium text-slate-700">{rec.timeline}</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="gradient-amber text-white flex-1">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Implement
                  </Button>
                  <Button size="sm" variant="outline" className="hover:bg-amber-50">
                    <Clock className="h-3 w-3 mr-1" />
                    Schedule
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Real-time Monitoring */}
      <Card className="glass-card border-0 shadow-xl">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-cyan-900">
            <BarChart3 className="h-5 w-5" />
            Real-time System Monitoring
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4 rounded-xl bg-cyan-50">
              <div className="text-2xl font-bold text-cyan-900 mb-1">847</div>
              <div className="text-sm text-cyan-700">Active Students</div>
              <div className="text-xs text-emerald-600 mt-1">↑ 12 from yesterday</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-indigo-50">
              <div className="text-2xl font-bold text-indigo-900 mb-1">23</div>
              <div className="text-sm text-indigo-700">Live Classes</div>
              <div className="text-xs text-indigo-600 mt-1">Running now</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-emerald-50">
              <div className="text-2xl font-bold text-emerald-900 mb-1">156</div>
              <div className="text-sm text-emerald-700">Assignments Due</div>
              <div className="text-xs text-amber-600 mt-1">This week</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-purple-50">
              <div className="text-2xl font-bold text-purple-900 mb-1">94.7%</div>
              <div className="text-sm text-purple-700">System Uptime</div>
              <div className="text-xs text-emerald-600 mt-1">Excellent</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}