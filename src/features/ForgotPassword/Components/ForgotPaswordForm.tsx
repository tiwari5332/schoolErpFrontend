
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Mail } from "lucide-react";
import { Eye } from "lucide-react";
import { Checkbox } from "../../../components/ui/checkbox";
import { Button } from "../../../components/ui/button";
import { ArrowRight } from "lucide-react";
import { Lock } from "lucide-react";
import { EyeOff } from "lucide-react";
import { Send } from "lucide-react";
import { ArrowLeft } from "lucide-react";
import { AlertCircle } from "lucide-react";
import { useForgotPassword } from "../Hooks/useForgotPassword";
import { FORGOT_PWD_TEXT } from "../Constants";

const ForgotPasswordForm = () => {
  const {
    formData,
    setFormData,
    errors,
    resetEmailSent,
    isLoading,
    handleSubmit
  } = useForgotPassword();

  if (resetEmailSent) {
    return (
      <div className="text-center space-y-4">
        <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center mx-auto">
          <Send className="h-6 w-6 text-emerald-600" />
        </div>
        <h3 className="text-lg font-medium text-slate-900">{FORGOT_PWD_TEXT.EMAIL_SENT_HEADING}</h3>
        <p className="text-sm text-slate-600">
          {FORGOT_PWD_TEXT.EMAIL_SENT_MSG}
        </p>
      </div>
    );
  }

  return <form onSubmit={handleSubmit} className="space-y-4">
    <div className="text-center mb-6">
      <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-3">
        <Lock className="h-6 w-6 text-indigo-600" />
      </div>
      <p className="text-sm text-slate-600 leading-relaxed">
        {FORGOT_PWD_TEXT.INFO_TEXT}
      </p>
    </div>

    <div className="space-y-2">
      <Label htmlFor="forgot-email">{FORGOT_PWD_TEXT.EMAIL_LABEL}</Label>
      <div className="relative">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input
          id="forgot-email"
          type="email"
          placeholder={FORGOT_PWD_TEXT.EMAIL_PLACEHOLDER}
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className={`pl-10 ${errors.email ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500' : ''}`}
        />
      </div>
      {errors.email && (
        <div className="flex items-center gap-1 text-xs text-rose-600">
          <AlertCircle className="h-3 w-3" />
          <span>{errors.email}</span>
        </div>
      )}
    </div>

    <Button
      type="submit"
      disabled={isLoading}
      className="w-full gradient-indigo text-white shadow-colored-indigo hover:scale-[1.02] transition-all duration-200"
      size="lg"
    >
      {isLoading ? (
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
      ) : (
        <Send className="h-4 w-4 mr-2" />
      )}
      {FORGOT_PWD_TEXT.SEND_BTN}
    </Button>

    <Button
      type="button"
      onClick={() => {
        window.location.href = '/login';
      }}
      variant="outline"
      className="w-full"
    >
      <ArrowLeft className="h-4 w-4 mr-2" />
      {FORGOT_PWD_TEXT.BACK_BTN}
    </Button>
  </form>
}

export default ForgotPasswordForm;