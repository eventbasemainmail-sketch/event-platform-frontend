function TicketModal({
  open,
  event,
  registration,
  onClose,
}) {
  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.75)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        padding: "20px",
      }}
    >
      <div
        id="ticket"
        style={{
          width: "420px",
          maxWidth: "100%",
          background: "#fff",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 25px 60px rgba(0,0,0,.35)",
        }}
      >
        {event?.banner_image && (
          <img
            src={event.banner_image}
            alt=""
            style={{
              width: "100%",
              height: "180px",
              objectFit: "cover",
            }}
          />
        )}

        <div
          style={{
            padding: "25px",
            textAlign: "center",
          }}
        >
          {event?.logo_image && (
            <img
              src={event.logo_image}
              alt=""
              style={{
                width: "90px",
                height: "90px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "4px solid white",
                marginTop: "-70px",
                background: "#fff",
                boxShadow:
                  "0 10px 25px rgba(0,0,0,.2)",
              }}
            />
          )}

          <h2
            style={{
              marginTop: "20px",
            }}
          >
            🎉 Registration Complete
          </h2>

          <h3>{event?.title}</h3>

          <hr />

          <p>
            <strong>Name</strong>
            <br />
            {registration?.fullname}
          </p>

          <p>
            <strong>Email</strong>
            <br />
            {registration?.email}
          </p>

          <p>
            <strong>Phone</strong>
            <br />
            {registration?.phone}
          </p>

          <hr />

          <p>
            📍 {event?.venue}
          </p>

          <p>
            📅{" "}
            {new Date(
              event?.start_date
            ).toLocaleString()}
          </p>

          <hr />

          <img
            src={registration?.qr_code}
            alt=""
            style={{
              width: "220px",
            }}
          />

          <h3
            style={{
              marginTop: "15px",
              color: "#2563eb",
            }}
          >
            {registration?.ticket_code}
          </h3>

          <button
            onClick={onClose}
            style={{
              marginTop: "25px",
              width: "100%",
              padding: "15px",
              border: "none",
              borderRadius: "12px",
              background: "#2563eb",
              color: "#fff",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

export default TicketModal;