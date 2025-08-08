

interface TransitionModalProps {
  isVisible: boolean;
  themeName: string;
}

export function TransitionModal({ isVisible, themeName }: TransitionModalProps) {
  if (!isVisible) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label="Theme transition in progress"
    >
      {/* Semi-opaque backdrop */}
      <div className="absolute inset-0 bg-black/60" />
      
      {/* Modal content */}
      <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 max-w-sm mx-4 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-center space-x-4">
          {/* Loading spinner */}
          <div 
            className="animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent"
            role="status"
            aria-label="Loading"
          />
          
          {/* Text */}
          <div className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Transitioning to {themeName}
          </div>
        </div>
      </div>
    </div>
  );
} 