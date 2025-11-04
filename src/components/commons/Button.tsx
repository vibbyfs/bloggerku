type ButtonProps = {
  label: string;
  onClick?: () => void;
  type?: "submit" | "button" | "reset";
  className?: string;
};

export default function Button({
  label,
  onClick,
  type,
  className,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-black text-white px-4 py-2 rounded-xl hover:bg-slate-950 transition cursor-pointer ${className}`}
    >
      {label}
    </button>
  );
}
