const variantStyles = {
  success: "bg-success-700 text-success-100",
  info: "bg-info-700 text-info-100",
  warning: "bg-warning-700 text-warning-100",
};

export default function StatusBadge({ variant = "success", text }) {
  const currentStyle = variantStyles[variant] || variantStyles.success;

  return (
    <p className={`inline-block py-1 px-3 rounded-full ${currentStyle}`}>
      <span className="text-body-s">{text}</span>
    </p>
  );
}
