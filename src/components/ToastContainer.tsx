'use client';

import { useEffect } from 'react';
import { useToast } from '@/contexts/ToastContext';

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  // Handle keyboard accessibility (Escape to dismiss)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && toasts.length > 0) {
        // Remove the most recent toast
        removeToast(toasts[toasts.length - 1].id);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [toasts, removeToast]);

  if (toasts.length === 0) return null;

  return (
    <>
      {/* Desktop toasts (top-right) */}
      <div className="fixed top-4 right-4 z-50 space-y-2 hidden md:block">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
        ))}
      </div>

      {/* Mobile toasts (bottom-center) */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 space-y-2 md:hidden">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
        ))}
      </div>
    </>
  );
}

interface ToastItemProps {
  toast: import('@/contexts/ToastContext').Toast;
  onRemove: (id: string) => void;
}

function ToastItem({ toast, onRemove }: ToastItemProps) {
  useEffect(() => {
    // Auto-remove after animation
    const timer = setTimeout(() => {
      onRemove(toast.id);
    }, toast.duration || 3000);

    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, onRemove]);

  const getToastStyles = () => {
    switch (toast.type) {
      case 'success':
        return 'bg-green-600 text-white border-green-500';
      case 'error':
        return 'bg-red-600 text-white border-red-500';
      case 'info':
        return 'bg-primary-brown text-white border-primary-gold';
      default:
        return 'bg-primary-brown text-white border-primary-gold';
    }
  };

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'info':
        return 'ℹ';
      default:
        return '✓';
    }
  };

  return (
    <div
      className={`
        flex items-center space-x-3 px-4 py-3 rounded-lg shadow-lg border-l-4
        transform transition-all duration-300 ease-in-out
        animate-toast-slide-in md:animate-toast-slide-in
        ${getToastStyles()}
        max-w-sm w-full
      `}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <span className="text-lg font-bold flex-shrink-0" aria-hidden="true">
        {getIcon()}
      </span>

      <p className="flex-1 text-sm font-medium leading-tight">
        {toast.message}
      </p>

      <button
        onClick={() => onRemove(toast.id)}
        className="flex-shrink-0 ml-2 p-1 rounded-full hover:bg-black/10 transition-colors"
        aria-label="Dismiss notification"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}