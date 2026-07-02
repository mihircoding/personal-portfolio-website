export const AnimatedBorderButton = ({ children, href, download, ...props }) => {
  const buttonClasses =
    "pixel-btn-outline font-pixel relative inline-flex items-center justify-center gap-2 px-7 py-4 text-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50 disabled:cursor-not-allowed";

  const content = (
    <span className="relative z-10 flex items-center justify-center gap-2">
      {children}
    </span>
  );

  if (href) {
    return (
      <a href={href} download={download} className={buttonClasses} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button className={buttonClasses} {...props}>
      {content}
    </button>
  );
};
