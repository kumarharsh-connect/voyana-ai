'use client';

import { Check, Loader2 } from 'lucide-react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  currentStepName: string;
}

const STEPS = [
  { key: 'validating', name: 'Validating your input', icon: Check },
  { key: 'generating', name: 'Generating itinerary', icon: Loader2 },
  { key: 'locating', name: 'Adding locations', icon: Loader2 },
  { key: 'enriching', name: 'Enriching details', icon: Loader2 },
  { key: 'finalizing', name: 'Finalizing your trip', icon: Check },
];

export default function ProgressBar({
  currentStep,
  totalSteps,
  currentStepName,
}: ProgressBarProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm'>
      <div className='bg-white/95 dark:bg-gray-900/95 rounded-3xl p-8 shadow-2xl border border-white/20 max-w-md w-full mx-4'>
        <div className='w-full space-y-6'>
          {/* Progress Bar */}
          <div className='relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden'>
            <div
              className='h-full bg-linear-to-r from-primary to-primary/80 transition-all duration-500 ease-out'
              style={{ width: `${progress}%` }}
            />
            {/* Shine effect */}
            <div className='absolute inset-0 h-full bg-linear-to-r from-transparent via-white/20 to-transparent animate-shimmer' />
          </div>

          {/* Step Indicators */}
          <div className='flex justify-between mt-4'>
            {STEPS.map((step, index) => {
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;
              const StepIcon = step.icon;

              return (
                <div
                  key={step.key}
                  className={`flex flex-col items-center gap-2 transition-all duration-300 ${
                    isActive
                      ? 'scale-110'
                      : isCompleted
                        ? 'opacity-60'
                        : 'opacity-30'
                  }`}
                >
                  {/* Icon */}
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30'
                        : isCompleted
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                    }`}
                  >
                    <StepIcon
                      className={`h-5 w-5 ${isActive ? 'animate-pulse' : ''}`}
                    />
                  </div>

                  {/* Label */}
                  <div className='text-center'>
                    <p
                      className={`text-xs font-medium transition-all duration-300 ${
                        isActive
                          ? 'text-primary font-bold'
                          : isCompleted
                            ? 'text-foreground'
                            : 'text-muted-foreground'
                      }`}
                    >
                      {step.name}
                    </p>
                    {isActive && (
                      <div className='w-2 h-0.5 bg-primary rounded-full mx-auto mt-1 animate-pulse' />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Current Step Text */}
          <div className='text-center mt-6'>
            <p className='text-lg font-semibold text-foreground animate-fadeIn'>
              {currentStepName}
            </p>
            <p className='text-sm text-muted-foreground mt-2'>
              Step {currentStep} of {totalSteps}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
