"use client";

import { Toast } from "./toast";
import { useToast } from "./use-toast";

const Toaster = () => {
  const { toasts, dismiss } = useToast();

  return (
    <div className="fixed right-4 top-4 z-50 flex w-full max-w-sm flex-col gap-2">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          title={toast.title}
          description={toast.description}
          variant={toast.variant}
          onClose={() => dismiss(toast.id)}
        />
      ))}
    </div>
  );
};

export { Toaster };
