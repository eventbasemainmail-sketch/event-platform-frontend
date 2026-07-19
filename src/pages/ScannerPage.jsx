import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import api from "../services/api";

function ScannerPage() {
  const [guest, setGuest] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isScanning, setIsScanning] = useState(true);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        fps: 10,
        qrbox: 250,
      },
      false
    );

    scanner.render(
      async (decodedText) => {
        if (!isScanning) return;

        setIsScanning(false);

        try {
          const response = await api.post(
            "/checkin",
            {
              ticket_code: decodedText,
            }
          );

          setGuest(response.data);
          setShowModal(true);

          await scanner.clear();
        } catch (error) {
          console.error(error);

          setIsScanning(true);
        }
      },
      () => {}
    );

    return () => {
      scanner.clear().catch(() => {});
    };
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        padding: "20px",
      }}
    >
      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "10px",
          }}
        >
          Event Check-In
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#666",
            marginBottom: "20px",
          }}
        >
          Scan attendee QR code
        </p>

        <div
          style={{
            background: "#fff",
            borderRadius: "16px",
            padding: "20px",
            boxShadow:
              "0 10px 30px rgba(0,0,0,0.08)",
          }}
        >
          <div id="reader"></div>
        </div>

        {showModal && guest && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.7)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 9999,
              padding: "20px",
            }}
          >
            <div
              style={{
                background: "#fff",
                padding: "24px",
                borderRadius: "20px",
                width: "100%",
                maxWidth: "420px",
                boxShadow:
                  "0 20px 50px rgba(0,0,0,0.25)",
              }}
            >
              <h2
                style={{
                  textAlign: "center",
                  marginBottom: "20px",
                  color: guest.alreadyCheckedIn
                    ? "#d97706"
                    : "#16a34a",
                }}
              >
                {guest.alreadyCheckedIn
                  ? "⚠ Already Checked In"
                  : "✅ Check-In Success"}
              </h2>

              <div
                style={{
                  display: "grid",
                  gap: "10px",
                  marginBottom: "20px",
                }}
              >
                <p>
                  <strong>Name:</strong>{" "}
                  {guest.fullname}
                </p>

                <p>
                  <strong>Email:</strong>{" "}
                  {guest.email}
                </p>

                <p>
                  <strong>Phone:</strong>{" "}
                  {guest.phone}
                </p>

                <p>
                  <strong>Ticket:</strong>{" "}
                  {guest.ticket_code}
                </p>

                <p>
                  <strong>Table:</strong>{" "}
                  {guest.table_number ||
                    "Not Assigned"}
                </p>

                <p>
                  <strong>Seat:</strong>{" "}
                  {guest.seat_number ||
                    "Not Assigned"}
                </p>
              </div>

              <button
                onClick={() => {
                  window.location.reload();
                }}
                style={{
                  width: "100%",
                  padding: "14px",
                  border: "none",
                  borderRadius: "10px",
                  background: "#111827",
                  color: "#fff",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                Scan Next Guest
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ScannerPage;