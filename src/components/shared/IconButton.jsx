export default function IconButton({ children, badge, label, to: LinkComponent, className = "", ...props }) {
  const content = (
    <div className={`relative flex flex-col items-center text-white/90 transition hover:text-white ${className}`}>
      <div className="relative">{children}
        {typeof badge === "number" && badge > 0 && (
          <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-white">
            {badge}
          </span>
        )}
      </div>
      {label && <span className="mt-1 hidden text-[11px] md:block">{label}</span>}
    </div>
  );

  if (LinkComponent) {
    return (
      <LinkComponent {...props}>
        {content}
      </LinkComponent>
    );
  }

  return (
    <button type="button" {...props}>
      {content}
    </button>
  );
}
