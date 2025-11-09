import { ReactNode } from "react";

type ButtonProps = {
  label?: string; // tetap optional
  onClick?: () => void;
  type?: "submit" | "button" | "reset";
  className?: string;
  children?: ReactNode; // tambahan: bisa taruh icon / custom konten
};

export default function Button({
  label,
  onClick,
  type,
  className = "",
  children,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 bg-black text-white px-4 py-2 text-xs rounded-xl hover:bg-slate-800 transition cursor-pointer ${className}`}
    >
      {children}
      {label && <span>{label}</span>}
    </button>
  );
}
