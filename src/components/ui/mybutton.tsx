export const MyButton = ({
  text,
  icon,
  onClick,
  className,
  type,
}: {
  text: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}) => {
  return (
    <button 
      type={type}
      onClick={onClick}
      className={`relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 transition-transform duration-300 hover:scale-105 ${className || ''}`}
    >
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-4 py-1 backdrop-blur-3xl space-x-2 transition-all duration-300 hover:bg-slate-900 group">
        <span className="text-xs sm:text-sm md:text-base lg:text-lg font-medium text-white transition-all duration-300 group-hover:translate-x-0.5">{text}</span>
        {icon && <span className="text-base sm:text-lg md:text-xl lg:text-2xl text-white transition-all duration-300 group-hover:translate-x-0.5 group-hover:scale-110">{icon}</span>}
      </span>
    </button>
  );
};
