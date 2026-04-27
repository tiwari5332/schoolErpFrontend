import { Card, CardContent } from "../components/ui/card";
import { CheckCircle, Shield } from "lucide-react";
import { features } from "../constants/index.ts";
import { EduTrioLogo } from "../components/EduTrioLogo.tsx";
import { Badge } from "../components/ui/badge.tsx";
import { Sparkles } from "lucide-react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="hidden lg:flex flex-col justify-center space-y-8">
          <div className="space-y-6">
            <div className="animate-float">
              <EduTrioLogo size="xl" className="drop-shadow-lg" />
            </div>
            <div>
              <h1 className="font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-3">
                Transform Education with Technology
              </h1>
              <p className="text-slate-600 leading-relaxed">
                Join thousands of schools using EduTrio to revolutionize education management with AI-powered insights, seamless communication, and comprehensive analytics.
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg glass-card hover-lift">
                <CardContent className="p-4">
                  <div className={`h-10 w-10 rounded-xl gradient-${feature.color} flex items-center justify-center shadow-colored-${feature.color} mb-3`}>
                    <feature.icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-medium text-slate-900 mb-1">{feature.title}</h3>
                  <p className="text-xs text-slate-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center gap-6 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-emerald-600" />
              <span>Secure & Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-600" />
              <span>Trusted by 1000+ Schools</span>
            </div>
          </div>
        </div>
      {children}
    </div>
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2">
        <Badge className="bg-white/80 backdrop-blur-sm border-slate-200 text-slate-700 px-4 py-2 shadow-lg">
          <Sparkles className="h-3 w-3 mr-1 text-indigo-600" />
          Transforming Education Through Technology
        </Badge>
      </div>
  </div>
}

export default AuthLayout;
