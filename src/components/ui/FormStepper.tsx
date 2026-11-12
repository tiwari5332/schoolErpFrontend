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
 * Horizontal Stepper matching the reference "Add New Customer" design.
 * Each step = icon-circle (left) + label (right), connected by animated lines.
 * Active step: dark filled circle. Completed: filled with check. Pending: outline.
 */
export const FormStepper: React.FC<FormStepperProps> = ({
  steps,
  currentStep,
  onStepClick,
  className
}) => {
  return (
    <div
      className={cn(
        'w-full bg-white rounded-2xl border border-slate-200/90 shadow-sm px-4 sm:px-8 py-4',
        className
      )}
    >
      {/* Stepper row: flex, items centered, nodes separated by flex-1 connectors */}
      <div className="flex items-center w-full">
        {steps.map((step, idx) => {
          const isCompleted = idx < currentStep;
          const isCurrent   = idx === currentStep;
          const isLast      = idx === steps.length - 1;
          const StepIcon    = step.icon;

          return (
            <React.Fragment key={step.id}>
              {/* Step node: icon circle + label inline */}
              <button
                type="button"
                onClick={() => onStepClick?.(idx)}
                className="flex items-center gap-2 shrink-0 focus:outline-none group"
              >
                {/* Icon Circle */}
                <div
                  className={cn(
                    'h-9 w-9 rounded-full flex items-center justify-center transition-all duration-300 shrink-0',
                    isCurrent
                      ? 'bg-[#2D3A8C] text-white shadow-md'
                      : isCompleted
                      ? 'bg-[#2D3A8C] text-white'
                      : 'bg-white text-slate-400 border-2 border-slate-200'
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-4 w-4 stroke-[2.5]" />
                  ) : StepIcon ? (
                    <StepIcon className="h-4 w-4" />
                  ) : (
                    <span className="text-xs font-bold">{idx + 1}</span>
                  )}
                </div>

                {/* Label + subtitle */}
                <div className="text-left">
                  <p
                    className={cn(
                      'text-sm font-semibold leading-tight whitespace-nowrap transition-colors',
                      isCurrent
                        ? 'text-slate-900'
                        : isCompleted
                        ? 'text-slate-600'
                        : 'text-slate-400'
                    )}
                  >
                    {step.label}
                  </p>
                  {step.subtitle && (
                    <p className="text-[10px] text-slate-400 leading-tight whitespace-nowrap hidden sm:block">
                      {step.subtitle}
                    </p>
                  )}
                </div>
              </button>

              {/* Connector line between steps */}
              {!isLast && (
                <div className="flex-1 mx-3 h-[2px] rounded-full overflow-hidden bg-slate-200 min-w-[16px]">
                  <div
                    className="h-full bg-[#2D3A8C] transition-all duration-500 ease-out"
                    style={{ width: isCompleted ? '100%' : '0%' }}
                  />
                </div>
              )}
            </React.Fragment>
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
