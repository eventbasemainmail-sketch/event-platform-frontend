import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import api from "../services/api";

function ManageEvent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] =
    useState(null);

  const [
    registrations,
    setRegistrations,
  ] = useState([]);

  useEffect(() => {
    loadEvent();
    loadRegistrations();
  }, [id]);

  const loadEvent = async () => {
    try {
      const response =
        await api.get(
          `/events/id/${id}`
        );

      setEvent(response.data);
    } catch (error) {
      console.error(
        "Failed to load event:",
        error
      );
    }
  };

  const loadRegistrations =
    async () => {
      try {
        const response =
          await api.get(
            `/registrations/event/${id}`
          );

        setRegistrations(
          response.data
        );
      } catch (error) {
        console.error(
          "Failed to load registrations:",
          error
        );
      }
    };

  if (!event) {
    return <h2>Loading...</h2>;
  }

  const checkedIn =
    registrations.filter(
      (r) => r.checked_in
    ).length;

  const notCheckedIn =
    registrations.length -
    checkedIn;

  return (
    <div
      style={{
        minHeight: "100vh",

        backgroundImage:
          event.background_image
            ? `linear-gradient(
                rgba(245,247,251,0.92),
                rgba(245,247,251,0.92)
              ),
              url("${event.background_image}")`
            : "none",

        backgroundColor: "#f5f7fb",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",

        padding: "30px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* TOP NAVIGATION */}

        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "15px",
            marginBottom: "20px",
          }}
        >
          <button
            onClick={() =>
              navigate("/admin")
            }
            style={{
              padding: "11px 18px",
              border:
                "1px solid #d1d5db",
              borderRadius: "10px",
              background: "white",
              color: "#374151",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            ← Back to Dashboard
          </button>

          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            {/* VIEW PUBLIC EVENT */}

            <button
              onClick={() =>
                navigate(
                  `/event/${event.slug}`
                )
              }
              style={{
                padding:
                  "11px 18px",
                border:
                  "1px solid #d1d5db",
                borderRadius:
                  "10px",
                background: "white",
                color: "#374151",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              View Event
            </button>

            {/* EDIT EVENT */}

            <button
              onClick={() =>
                navigate(
                  `/admin/events/${event.id}/edit`
                )
              }
              style={{
                padding:
                  "11px 20px",
                border: "none",
                borderRadius:
                  "10px",
                background:
                  "#2563eb",
                color: "white",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              ✏️ Edit Event
            </button>
          </div>
        </div>

        {/* EVENT HEADER */}

        <div
          style={{
            background: "white",
            borderRadius: "20px",
            overflow: "hidden",
            boxShadow:
              "0 10px 30px rgba(0,0,0,0.1)",
            marginBottom: "25px",
          }}
        >
          {/* BANNER */}

          {event.banner_image ? (
            <img
              src={
                event.banner_image
              }
              alt={event.title}
              style={{
                width: "100%",
                height: "300px",
                objectFit: "cover",
                display: "block",
              }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "220px",
                background:
                  "linear-gradient(135deg, #2563eb, #7c3aed)",
                display: "flex",
                justifyContent:
                  "center",
                alignItems: "center",
                color: "white",
                fontSize: "60px",
              }}
            >
              🎉
            </div>
          )}

          <div
            style={{
              padding: "30px",
            }}
          >
            {/* LOGO */}

            {event.logo_image && (
              <img
                src={
                  event.logo_image
                }
                alt={`${event.title} Logo`}
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border:
                    "5px solid white",
                  background: "white",
                  marginTop:
                    event.banner_image
                      ? "-80px"
                      : "-70px",
                  position: "relative",
                  boxShadow:
                    "0 8px 20px rgba(0,0,0,0.2)",
                }}
              />
            )}

            <h1
              style={{
                marginBottom: "10px",
              }}
            >
              {event.title}
            </h1>

            {event.description && (
              <p
                style={{
                  color: "#64748b",
                  lineHeight: "1.6",
                  maxWidth: "800px",
                }}
              >
                {event.description}
              </p>
            )}

            <div
              style={{
                display: "flex",
                gap: "25px",
                flexWrap: "wrap",
                marginTop: "20px",
              }}
            >
              <p>
                <strong>
                  📍 Venue:
                </strong>{" "}
                {event.venue}
              </p>

              <p>
                <strong>
                  👥 Capacity:
                </strong>{" "}
                {event.capacity}
              </p>

              <p>
                <strong>
                  Status:
                </strong>{" "}
                {event.status}
              </p>
            </div>

            {/* EVENT DATES */}

            <div
              style={{
                display: "flex",
                gap: "25px",
                flexWrap: "wrap",
              }}
            >
              <p>
                <strong>
                  📅 Starts:
                </strong>{" "}
                {event.start_date
                  ? new Date(
                      event.start_date
                    ).toLocaleString()
                  : "No start date"}
              </p>

              <p>
                <strong>
                  📅 Ends:
                </strong>{" "}
                {event.end_date
                  ? new Date(
                      event.end_date
                    ).toLocaleString()
                  : "No end date"}
              </p>
            </div>
          </div>
        </div>

        {/* STATISTICS */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
            marginBottom: "25px",
          }}
        >
          <StatCard
            title="Total Registrations"
            value={
              registrations.length
            }
          />

          <StatCard
            title="Checked In"
            value={checkedIn}
          />

          <StatCard
            title="Not Checked In"
            value={notCheckedIn}
          />

          <StatCard
            title="Capacity"
            value={event.capacity}
          />
        </div>

        {/* GUEST LIST */}

        <div
          style={{
            background: "white",
            borderRadius: "20px",
            padding: "25px",
            boxShadow:
              "0 10px 30px rgba(0,0,0,0.08)",
            overflowX: "auto",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent:
                "space-between",
              alignItems: "center",
              gap: "15px",
              marginBottom: "20px",
            }}
          >
            <div>
              <h2
                style={{
                  margin: 0,
                }}
              >
                Guest List
              </h2>

              <p
                style={{
                  color: "#64748b",
                  marginBottom: 0,
                }}
              >
                View registered guests
                and check-in status.
              </p>
            </div>
          </div>

          {registrations.length ===
          0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "40px",
                color: "#64748b",
              }}
            >
              <h3>
                No registrations yet
              </h3>

              <p>
                Registered guests will
                appear here.
              </p>
            </div>
          ) : (
            <table
              style={{
                width: "100%",
                borderCollapse:
                  "collapse",
              }}
            >
              <thead>
                <tr>
                  <th
                    style={
                      tableHeader
                    }
                  >
                    Name
                  </th>

                  <th
                    style={
                      tableHeader
                    }
                  >
                    Email
                  </th>

                  <th
                    style={
                      tableHeader
                    }
                  >
                    Phone
                  </th>

                  <th
                    style={
                      tableHeader
                    }
                  >
                    Checked In
                  </th>
                </tr>
              </thead>

              <tbody>
                {registrations.map(
                  (guest) => (
                    <tr
                      key={
                        guest.id
                      }
                    >
                      <td
                        style={
                          tableCell
                        }
                      >
                        {
                          guest.fullname
                        }
                      </td>

                      <td
                        style={
                          tableCell
                        }
                      >
                        {
                          guest.email
                        }
                      </td>

                      <td
                        style={
                          tableCell
                        }
                      >
                        {
                          guest.phone
                        }
                      </td>

                      <td
                        style={
                          tableCell
                        }
                      >
                        {guest.checked_in
                          ? "✅ Checked In"
                          : "⏳ Pending"}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
}) {
  return (
    <div
      style={{
        background: "white",
        padding: "25px",
        borderRadius: "16px",
        boxShadow:
          "0 8px 25px rgba(0,0,0,0.07)",
      }}
    >
      <p
        style={{
          color: "#64748b",
          margin: 0,
        }}
      >
        {title}
      </p>

      <h2
        style={{
          fontSize: "32px",
          marginBottom: 0,
        }}
      >
        {value}
      </h2>
    </div>
  );
}

const tableHeader = {
  textAlign: "left",
  padding: "15px",
  borderBottom:
    "2px solid #e2e8f0",
  color: "#475569",
};

const tableCell = {
  padding: "15px",
  borderBottom:
    "1px solid #e2e8f0",
};

export default ManageEvent;