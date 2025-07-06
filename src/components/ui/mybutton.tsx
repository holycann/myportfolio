export const MyButton = ({
  text,
  icon,
  onClick,
  className,
  type,
  color = 'default',
  textClassName,
  iconClassName,
  buttonClassName,
  gradientClassName,
  backgroundClassName
}: {
  text: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  textClassName?: string;
  iconClassName?: string;
  buttonClassName?: string;
  gradientClassName?: string;
  backgroundClassName?: string;
}) => {
  // Definisi warna gradient
  const colorGradients = {
    default: 'bg-[conic-gradient(from_90deg_at_50%_50%,#A0F0ED_0%,#0092B8_50%,#A0F0ED_100%)]',
    primary: 'bg-[conic-gradient(from_90deg_at_50%_50%,#3B82F6_0%,#2563EB_50%,#3B82F6_100%)]',
    secondary: 'bg-[conic-gradient(from_90deg_at_50%_50%,#6366F1_0%,#4F46E5_50%,#6366F1_100%)]',
    success: 'bg-[conic-gradient(from_90deg_at_50%_50%,#10B981_0%,#059669_50%,#10B981_100%)]',
    warning: 'bg-[conic-gradient(from_90deg_at_50%_50%,#F59E0B_0%,#D97706_50%,#F59E0B_100%)]',
    danger: 'bg-[conic-gradient(from_90deg_at_50%_50%,#EF4444_0%,#DC2626_50%,#EF4444_100%)]'
  };

  // Definisi warna background
  const backgroundColors = {
    default: 'bg-slate-950',
    primary: 'bg-blue-950',
    secondary: 'bg-indigo-950',
    success: 'bg-green-950',
    warning: 'bg-amber-950',
    danger: 'bg-red-950'
  };

  return (
    <button 
      type={type}
      onClick={onClick}
      className={`relative inline-flex overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 transition-transform duration-300 hover:scale-105 ${className || ''} ${buttonClassName || ''}`}
    >
      <span className={`absolute inset-[-1000%] animate-[spin_2s_linear_infinite] ${colorGradients[color]} ${gradientClassName || ''}`} />
      <span className={`inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full ${backgroundColors[color]} px-3 py-1 sm:px-4 sm:py-1.5 backdrop-blur-3xl space-x-2 transition-all duration-300 hover:bg-opacity-90 group ${backgroundClassName || ''}`}>
        <span className={`text-[10px] sm:text-xs font-medium text-white transition-all duration-300 group-hover:translate-x-0.5 ${textClassName || ''}`}>{text}</span>
        {icon && <span className={`text-base sm:text-lg md:text-xl text-white transition-all duration-300 group-hover:translate-x-0.5 group-hover:scale-110 ${iconClassName || ''}`}>{icon}</span>}
      </span>
    </button>
  );
};
