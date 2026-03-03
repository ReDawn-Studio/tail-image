"use client";

import * as React from "react";
import type { ToastVariant } from "./toast";

export interface ToastOptions {
  title?: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
}

export interface ToastState extends ToastOptions {
  id: string;
}

type Listener = (_toasts: ToastState[]) => void;

let toasts: ToastState[] = [];
let listeners: Listener[] = [];

const notify = () => {
  listeners.forEach((listener) => listener(toasts));
};

const dismiss = (id: string) => {
  toasts = toasts.filter((toast) => toast.id !== id);
  notify();
};

const toast = (options: ToastOptions) => {
  const id =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : String(Date.now() + Math.random());
  const duration = options.duration ?? 3000;
  const nextToast: ToastState = { id, ...options };

  toasts = [...toasts, nextToast];
  notify();

  if (duration !== Infinity) {
    setTimeout(() => dismiss(id), duration);
  }

  return { id, dismiss: () => dismiss(id) };
};

const useToast = () => {
  const [state, setState] = React.useState<ToastState[]>(toasts);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      listeners = listeners.filter((listener) => listener !== setState);
    };
  }, []);

  return { toast, toasts: state, dismiss };
};

export { toast, useToast };
