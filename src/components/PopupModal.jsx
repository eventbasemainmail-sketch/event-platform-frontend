function PopupModal({
  open,
  title,
  message,
  type = "success",
  onClose,
  children,
}) {
  if (!open) return null;

  const colors = {
    success: "#22c55e",
    warning: "#f59e0b",
    error: "#ef4444",
    info: "#2563eb",
  };

  const icons = {
    success: "✅",
    warning: "⚠️",
    error: "❌",
    info: "ℹ️",
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.55)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          width: "92%",
          maxWidth: "430px",
          background: "#fff",
          borderRadius: "18px",
          padding: "30px",
          textAlign: "center",
          animation: "popup .25s ease",
          boxShadow: "0 20px 40px rgba(0,0,0,.25)",
        }}
      >
        <div
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            background: colors[type],
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "0 auto 20px",
            fontSize: "40px",
          }}
        >
          {icons[type]}
        </div>

        <h2
          style={{
            marginBottom: "10px",
          }}
        >
          {title}
        </h2>

        <p
          style={{
            color: "#64748b",
            lineHeight: "26px",
            marginBottom: "25px",
          }}
        >
          {message}
        </p>

        {children}

        <button
          onClick={onClose}
          style={{
            width: "100%",
            marginTop: "20px",
            padding: "14px",
            border: "none",
            borderRadius: "12px",
            background: colors[type],
            color: "#fff",
            fontWeight: "600",
            cursor: "pointer",
            fontSize: "15px",
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default PopupModal;