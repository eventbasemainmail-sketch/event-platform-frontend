import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function AdminDashboard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/events");

      console.log("EVENT API RESPONSE:");
      console.log(response.data);

      if (Array.isArray(response.data)) {
        setEvents(response.data);
      } else if (Array.isArray(response.data.events)) {
        setEvents(response.data.events);
      } else {
        console.error(
          "Unexpected events response:",
          response.data
        );

        setEvents([]);
      }
    } catch (error) {
      console.error(
        "FAILED TO LOAD EVENTS:",
        error
      );

      setError(
        error.response?.data?.error ||
          error.message ||
          "Failed to load events."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        padding: "30px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* HEADER */}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "20px",
            flexWrap: "wrap",
            marginBottom: "30px",
          }}
        >
          <div>
            <h1
              style={{
                margin: 0,
                color: "#111827",
              }}
            >
              Event Dashboard
            </h1>

            <p
              style={{
                color: "#64748b",
                marginTop: "8px",
              }}
            >
              Manage and monitor your events.
            </p>
          </div>

          <button
            onClick={() =>
              navigate("/admin/create-event")
            }
            style={{
              padding: "13px 22px",
              border: "none",
              borderRadius: "10px",
              background: "#111827",
              color: "white",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            + Create Event
          </button>
        </div>

        {/* LOADING */}

        {loading && (
          <div
            style={{
              background: "white",
              padding: "40px",
              borderRadius: "16px",
              textAlign: "center",
            }}
          >
            Loading events...
          </div>
        )}

        {/* ERROR */}

        {!loading && error && (
          <div
            style={{
              background: "#fef2f2",
              color: "#991b1b",
              padding: "20px",
              borderRadius: "12px",
              marginBottom: "20px",
            }}
          >
            <strong>
              Failed to load events
            </strong>

            <p>{error}</p>

            <button
              onClick={loadEvents}
              style={{
                padding: "10px 18px",
                border: "none",
                borderRadius: "8px",
                background: "#dc2626",
                color: "white",
                cursor: "pointer",
              }}
            >
              Try Again
            </button>
          </div>
        )}

        {/* NO EVENTS */}

        {!loading &&
          !error &&
          events.length === 0 && (
            <div
              style={{
                background: "white",
                padding: "50px 20px",
                borderRadius: "16px",
                textAlign: "center",
                boxShadow:
                  "0 10px 25px rgba(0,0,0,0.05)",
              }}
            >
              <h2>No Events Yet</h2>

              <p
                style={{
                  color: "#64748b",
                }}
              >
                Create your first event to get
                started.
              </p>

              <button
                onClick={() =>
                  navigate(
                    "/admin/create-event"
                  )
                }
                style={{
                  marginTop: "15px",
                  padding: "12px 20px",
                  border: "none",
                  borderRadius: "10px",
                  background: "#2563eb",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Create Event
              </button>
            </div>
          )}

        {/* EVENT CARDS */}

        {!loading &&
          !error &&
          events.length > 0 && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "24px",
              }}
            >
              {events.map((event) => (
                <div
                  key={event.id}
                  style={{
                    background: "white",
                    borderRadius: "16px",
                    overflow: "hidden",
                    boxShadow:
                      "0 10px 25px rgba(0,0,0,0.08)",
                  }}
                >
                  {/* BANNER */}

                  {event.banner_image ? (
                    <img
                      src={event.banner_image}
                      alt={event.title}
                      style={{
                        width: "100%",
                        height: "180px",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        height: "180px",
                        background:
                          "linear-gradient(135deg, #2563eb, #7c3aed)",
                        display: "flex",
                        justifyContent:
                          "center",
                        alignItems: "center",
                        color: "white",
                        fontSize: "40px",
                      }}
                    >
                      🎉
                    </div>
                  )}

                  {/* EVENT INFO */}

                  <div
                    style={{
                      padding: "20px",
                    }}
                  >
                    <h2
                      style={{
                        marginTop: 0,
                        marginBottom: "15px",
                        color: "#111827",
                      }}
                    >
                      {event.title}
                    </h2>

                    <p>
                      📍{" "}
                      {event.venue ||
                        "No venue"}
                    </p>

                    <p>
                      👥 Capacity:{" "}
                      {event.capacity || 0}
                    </p>

                    <p>
                      📅{" "}
                      {event.start_date
                        ? new Date(
                            event.start_date
                          ).toLocaleString()
                        : "No date"}
                    </p>

                    {event.status && (
                      <p>
                        <strong>
                          Status:
                        </strong>{" "}
                        {event.status}
                      </p>
                    )}

                    {/* BUTTONS */}

                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        marginTop: "20px",
                        flexWrap: "wrap",
                      }}
                    >
                      <button
                        onClick={() =>
                          navigate(
                            `/admin/events/${event.id}`
                          )
                        }
                        style={{
                          flex: 1,
                          padding:
                            "11px 15px",
                          border: "none",
                          borderRadius:
                            "8px",
                          background:
                            "#2563eb",
                          color: "white",
                          cursor: "pointer",
                        }}
                      >
                        Manage
                      </button>

                      <button
                        onClick={() =>
                          navigate(
                            `/event/${event.slug}`
                          )
                        }
                        style={{
                          flex: 1,
                          padding:
                            "11px 15px",
                          border:
                            "1px solid #e2e8f0",
                          borderRadius:
                            "8px",
                          background:
                            "white",
                          color: "#334155",
                          cursor: "pointer",
                        }}
                      >
                        View Event
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
      </div>
    </div>
  );
}

export default AdminDashboard;