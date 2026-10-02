import React from 'react';
import { Check } from 'lucide-react';
import { cn } from './utils';

export interface StepItem {
  id: string;
  label: string;
  subtitle?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface FormStepperProps {
  steps: StepItem[];
  currentStep: number; // 0-indexed
  onStepClick?: (stepIndex: number) => void;
  className?: string;
}

/**
 * Top Horizontal Stepper Header Bar matching reference layout.
 * Displays large numbers (01, 02, ...), title, completed checkmarks, and accent bottom line.
 */
export const FormStepper: React.FC<FormStepperProps> = ({
  steps,
  currentStep,
  onStepClick,
  className
}) => {
  const getGridColsClass = (count: number) => {
    switch (count) {
      case 1:
        return "grid-cols-1";
      case 2:
        return "grid-cols-1 sm:grid-cols-2";
      case 3:
        return "grid-cols-1 sm:grid-cols-3";
      case 4:
        return "grid-cols-2 sm:grid-cols-4";
      case 5:
        return "grid-cols-2 sm:grid-cols-5";
      case 6:
        return "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6";
      default:
        return "grid-cols-2 sm:grid-cols-4";
    }
  };

  return (
    <div className={cn("w-full bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden", className)}>
      <div
        className={cn(
          "grid divide-y sm:divide-y-0 sm:divide-x divide-slate-200/80",
          getGridColsClass(steps.length)
        )}
      >
        {steps.map((step, idx) => {
          const isCompleted = idx < currentStep;
          const isCurrent = idx === currentStep;
          const stepNumStr = String(idx + 1).padStart(2, '0');

          return (
            <button
              key={step.id}
              type="button"
              onClick={() => onStepClick?.(idx)}
              className={cn(
                "relative p-3.5 sm:p-4 text-left flex flex-col justify-between transition-all duration-200 group cursor-pointer focus:outline-none min-h-[72px]",
                isCurrent
                  ? "bg-indigo-50/40"
                  : isCompleted
                  ? "bg-white hover:bg-slate-50/60"
                  : "bg-white hover:bg-slate-50/40"
              )}
            >
              {/* Content Header: Number + Text */}
              <div className="flex items-start justify-between gap-2 w-full">
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <span
                    className={cn(
                      "text-xl sm:text-2xl font-extrabold tracking-tight transition-colors duration-200 shrink-0",
                      isCurrent
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
                        : isCompleted
                        ? "text-emerald-500"
                        : "text-slate-300 group-hover:text-slate-400"
                    )}
                  >
                    {stepNumStr}
                  </span>

                  <div className="min-w-0">
                    <h4
                      className={cn(
                        "text-xs sm:text-sm font-bold truncate transition-colors",
                        isCurrent
                          ? "text-indigo-950"
                          : isCompleted
                          ? "text-slate-900"
                          : "text-slate-400 group-hover:text-slate-600"
                      )}
                    >
                      {step.label}
                    </h4>
                    {step.subtitle && (
                      <p className="text-[11px] text-slate-400 truncate font-medium hidden sm:block">
                        {step.subtitle}
                      </p>
                    )}
                  </div>
                </div>

                {isCompleted && (
                  <div className="h-5 w-5 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
                    <Check className="h-3 w-3 text-emerald-600 stroke-[3]" />
                  </div>
                )}
              </div>

              {/* Bottom Accent Line Indicator */}
              <div
                className={cn(
                  "absolute bottom-0 left-0 right-0 h-1 transition-all duration-300",
                  isCurrent
                    ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"
                    : isCompleted
                    ? "bg-emerald-500"
                    : "bg-slate-100 group-hover:bg-slate-200"
                )}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};

/**
 * Vertical Left Timeline Stepper Navigation.
 * Displays numbered nodes (1, 2, 3...) connected by vertical line track.
 */
export const VerticalFormStepper: React.FC<FormStepperProps> = ({
  steps,
  currentStep,
  onStepClick,
  className
}) => {
  return (
    <div className={cn("w-full space-y-2 p-2", className)}>
      {steps.map((step, idx) => {
        const isCompleted = idx < currentStep;
        const isCurrent = idx === currentStep;
        const isLast = idx === steps.length - 1;

        return (
          <div key={step.id} className="relative flex items-start">
            {/* Connecting Vertical Line Track */}
            {!isLast && (
              <div
                className={cn(
                  "absolute left-4 top-8 bottom-0 w-0.5 transition-colors duration-200 z-0",
                  isCompleted ? "bg-indigo-300" : "bg-slate-200"
                )}
              />
            )}

            <button
              type="button"
              onClick={() => onStepClick?.(idx)}
              className={cn(
                "flex items-center gap-3 w-full p-2.5 rounded-xl transition-all text-left z-10 cursor-pointer focus:outline-none",
                isCurrent
                  ? "bg-indigo-50/80 text-indigo-950 font-bold shadow-sm border border-indigo-200/60"
                  : isCompleted
                  ? "text-slate-800 hover:bg-slate-50"
                  : "text-slate-400 hover:bg-slate-50/50"
              )}
            >
              {/* Step Circle Node */}
              <div
                className={cn(
                  "flex items-center justify-center h-8 w-8 rounded-full text-xs font-bold shrink-0 transition-all duration-200 border",
                  isCurrent
                    ? "bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-500/30 scale-105"
                    : isCompleted
                    ? "bg-indigo-50 border-indigo-200 text-indigo-600"
                    : "bg-white border-slate-200 text-slate-400"
                )}
              >
                {isCompleted ? <Check className="h-4 w-4 stroke-[2.5]" /> : idx + 1}
              </div>

              {/* Step Title & Subtitle */}
              <div className="min-w-0">
                <span
                  className={cn(
                    "text-xs sm:text-sm tracking-tight truncate block",
                    isCurrent
                      ? "font-bold text-indigo-900"
                      : isCompleted
                      ? "font-semibold text-slate-800"
                      : "font-medium text-slate-400"
                  )}
                >
                  {step.label}
                </span>
                {step.subtitle && (
                  <span className="text-[11px] text-slate-400 block truncate font-normal">
                    {step.subtitle}
                  </span>
                )}
              </div>
            </button>
          </div>
        );
      })}
    </div>
  );
};

/**
 * Clean Horizontal Line Stepper matching reference Add Student UI.
 * Displays step numbers in circles, checkmarks for completed, connected by horizontal lines.
 */
export const HorizontalLineStepper: React.FC<FormStepperProps> = ({
  steps,
  currentStep,
  onStepClick,
  className
}) => {
  return (
    <div className={cn("w-full flex items-center justify-between py-2 px-2 overflow-x-auto scrollbar-hide", className)}>
      {steps.map((step, idx) => {
        const isCompleted = idx < currentStep;
        const isCurrent = idx === currentStep;
        const isLast = idx === steps.length - 1;

        return (
          <React.Fragment key={step.id}>
            <button
              type="button"
              onClick={() => onStepClick?.(idx)}
              className="flex items-center gap-2 shrink-0 group cursor-pointer focus:outline-none"
            >
              {isCompleted ? (
                <div className="h-5 w-5 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center text-[10px] font-bold text-slate-600">
                  <Check className="h-3 w-3 text-slate-600 stroke-[3]" />
                </div>
              ) : isCurrent ? (
                <div className="h-6 w-6 rounded-full bg-[#2D3748] text-white flex items-center justify-center text-xs font-bold shadow-sm">
                  {idx + 1}
                </div>
              ) : (
                <div className="h-6 w-6 rounded-full bg-slate-100 border border-slate-300 text-slate-400 flex items-center justify-center text-xs font-semibold">
                  {idx + 1}
                </div>
              )}
              <span className={cn(
                "text-xs sm:text-sm font-medium whitespace-nowrap",
                isCurrent ? "text-slate-900 font-bold" : isCompleted ? "text-slate-600 font-medium" : "text-slate-400"
              )}>
                {step.label}
              </span>
            </button>

            {!isLast && (
              <div className={cn(
                "flex-1 h-0.5 mx-3 min-w-[20px] transition-colors",
                idx < currentStep ? "bg-slate-400" : "bg-slate-200"
              )} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
