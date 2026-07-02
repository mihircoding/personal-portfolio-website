export const Button = ({
  className = "",
  size = "default",
  children,
  ...props
}) => {
  const baseClasses =
    "pixel-btn font-pixel relative bg-primary text-primary-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-highlight";

  const sizeClasses = {
    sm: "px-4 py-3 text-[10px]",
    default: "px-6 py-4 text-xs",
    lg: "px-7 py-4 text-sm",
  };
  const classes = `${baseClasses} ${sizeClasses[size]} ${className}`;
  return (
    <button className={classes} {...props}>
      <span className="relative flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
};
