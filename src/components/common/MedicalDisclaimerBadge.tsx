import React from 'react';
import { AlertCircle } from 'lucide-react';

export const MedicalDisclaimerBadge: React.FC = () => {
  return (
    <div className="flex items-center gap-2 px-3 py-1 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 rounded-md text-xs text-amber-800 dark:text-amber-300 font-medium select-none">
      <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 text-amber-600 dark:text-amber-400" />
      <span>
        Educational & Career Platform. <span className="font-semibold">Not for clinical diagnosis, patient treatment, or prescription.</span>
      </span>
    </div>
  );
};
