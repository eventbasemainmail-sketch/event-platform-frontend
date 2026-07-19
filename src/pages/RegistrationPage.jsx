import {
  useState,
  useEffect,
} from "react";

import { useParams } from "react-router-dom";

import api from "../services/api";

import "./RegistrationPage.css";

import PopupModal from "../components/PopupModal";
import TicketModal from "../components/TicketModal";

function RegistrationPage() {
  const { slug } = useParams();

  const [event, setEvent] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [pageLoading, setPageLoading] =
    useState(true);

  const [popupOpen, setPopupOpen] =
    useState(false);

  const [popupTitle, setPopupTitle] =
    useState("");

  const [popupMessage, setPopupMessage] =
    useState("");

  const [popupType, setPopupType] =
    useState("success");

  const [ticketOpen, setTicketOpen] =
    useState(false);

  const [
    registrationData,
    setRegistrationData,
  ] = useState(null);

  const [
    eventData,
    setEventData,
  ] = useState(null);

  const [formData, setFormData] =
    useState({
      fullname: "",
      email: "",
      phone: "",
    });

  useEffect(() => {
    loadEvent();
  }, [slug]);

  const loadEvent = async () => {
    try {
      setPageLoading(true);

      const response = await api.get(
        `/events/${slug}`
      );

      console.log(
        "REGISTRATION EVENT:",
        response.data
      );

      setEvent(response.data);
    } catch (error) {
      console.error(
        "Failed to load event:",
        error
      );
    } finally {
      setPageLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    try {
      const response = await api.post(
        "/registrations",
        {
          event_id: event.id,
          ...formData,
        }
      );

      setRegistrationData(
        response.data.registration
      );

      setEventData(
        response.data.event || event
      );

      setTicketOpen(true);

      setFormData({
        fullname: "",
        email: "",
        phone: "",
      });
    } catch (error) {
      if (
        error.response?.status === 409
      ) {
        setPopupTitle(
          "Already Registered"
        );

        setPopupMessage(
          error.response.data.message
        );

        setPopupType("warning");

        setPopupOpen(true);
      } else {
        setPopupTitle(
          "Registration Failed"
        );

        setPopupMessage(
          "Something went wrong. Please try again."
        );

        setPopupType("error");

        setPopupOpen(true);
      }
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div
        style={{
          minHeight: "100vh",

          display: "flex",

          justifyContent:
            "center",

          alignItems:
            "center",

          background:
            "#f8fafc",

          fontFamily:
            "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        }}
      >
        <h2
          style={{
            margin: 0,

            color:
              "#0f172a",

            fontSize:
              "22px",

            fontWeight:
              "600",
          }}
        >
          Loading...
        </h2>
      </div>
    );
  }

  if (!event) {
    return (
      <div
        style={{
          minHeight: "100vh",

          display: "flex",

          justifyContent:
            "center",

          alignItems:
            "center",

          fontFamily:
            "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        }}
      >
        <h2>
          Event Not Found
        </h2>
      </div>
    );
  }

  return (
    <div
      className="registration-container"

      style={{
        minHeight: "100vh",

        width: "100%",

        boxSizing:
          "border-box",

        backgroundImage:
          event.background_image
            ? `linear-gradient(
                rgba(15,23,42,0.55),
                rgba(15,23,42,0.55)
              ),
              url("${event.background_image}")`
            : "none",

        backgroundColor:
          "#f1f5f9",

        backgroundSize:
          "cover",

        backgroundPosition:
          "center",

        backgroundAttachment:
          "fixed",

        padding:
          "40px 20px",

        display:
          "flex",

        justifyContent:
          "center",

        alignItems:
          "center",

        fontFamily:
          "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >

      {/* REGISTRATION CARD */}

      <div
        className="registration-card"

        style={{
          width:
            "100%",

          maxWidth:
            "520px",

          background:
            "#ffffff",

          borderRadius:
            "20px",

          overflow:
            "hidden",

          boxShadow:
            "0 20px 60px rgba(15,23,42,0.22)",
        }}
      >

        {/* BANNER */}

        {event.banner_image && (
          <img
            src={
              event.banner_image
            }

            alt={`${event.title} Banner`}

            style={{
              width:
                "100%",

              height:
                "190px",

              objectFit:
                "cover",

              display:
                "block",
            }}
          />
        )}


        {/* CONTENT */}

        <div
          style={{
            padding:
              "30px",
          }}
        >

          {/* LOGO */}

          {event.logo_image && (
            <div
              style={{
                display:
                  "flex",

                justifyContent:
                  "center",

                marginTop:
                  event.banner_image
                    ? "-85px"
                    : "0",

                marginBottom:
                  "20px",

                position:
                  "relative",
              }}
            >

              <img
                src={
                  event.logo_image
                }

                alt={`${event.title} Logo`}

                style={{
                  width:
                    "105px",

                  height:
                    "105px",

                  borderRadius:
                    "50%",

                  objectFit:
                    "cover",

                  border:
                    "5px solid #ffffff",

                  background:
                    "#ffffff",

                  boxShadow:
                    "0 8px 24px rgba(15,23,42,0.2)",
                }}
              />

            </div>
          )}


          {/* EVENT TITLE */}

          <div
            style={{
              textAlign:
                "center",

              marginBottom:
                "30px",
            }}
          >

            <h1
              style={{
                margin:
                  "0 0 8px 0",

                padding:
                  0,

                color:
                  "#0f172a",

                fontSize:
                  "28px",

                fontWeight:
                  "700",

                lineHeight:
                  "1.25",

                letterSpacing:
                  "-0.5px",

                wordBreak:
                  "break-word",
              }}
            >
              {event.title}
            </h1>

            <p
              style={{
                margin:
                  0,

                padding:
                  0,

                color:
                  "#64748b",

                fontSize:
                  "15px",

                fontWeight:
                  "400",

                lineHeight:
                  "1.6",
              }}
            >
              Complete your registration
            </p>

          </div>


          {/* FORM */}

          <form
            onSubmit={
              handleSubmit
            }
          >

            {/* FULL NAME */}

            <div
              style={
                formGroupStyle
              }
            >

              <label
                style={
                  labelStyle
                }
              >
                Full Name
              </label>

              <input
                type="text"

                name="fullname"

                placeholder="Enter your full name"

                value={
                  formData.fullname
                }

                onChange={
                  handleChange
                }

                required

                style={
                  inputStyle
                }
              />

            </div>


            {/* EMAIL */}

            <div
              style={
                formGroupStyle
              }
            >

              <label
                style={
                  labelStyle
                }
              >
                Email Address
              </label>

              <input
                type="email"

                name="email"

                placeholder="Enter your email address"

                value={
                  formData.email
                }

                onChange={
                  handleChange
                }

                required

                style={
                  inputStyle
                }
              />

            </div>


            {/* PHONE */}

            <div
              style={
                formGroupStyle
              }
            >

              <label
                style={
                  labelStyle
                }
              >
                Phone Number
              </label>

              <input
                type="tel"

                name="phone"

                placeholder="Enter your phone number"

                value={
                  formData.phone
                }

                onChange={
                  handleChange
                }

                required

                style={
                  inputStyle
                }
              />

            </div>


            {/* PRIVACY */}

            <label
              style={{
                display:
                  "flex",

                alignItems:
                  "flex-start",

                gap:
                  "10px",

                marginTop:
                  "5px",

                marginBottom:
                  "24px",

                color:
                  "#475569",

                fontSize:
                  "14px",

                lineHeight:
                  "1.5",

                cursor:
                  "pointer",
              }}
            >

              <input
                type="checkbox"

                required

                style={{
                  width:
                    "16px",

                  height:
                    "16px",

                  marginTop:
                    "2px",

                  flexShrink:
                    0,

                  cursor:
                    "pointer",
                }}
              />

              <span>
                I agree to the Privacy Policy
              </span>

            </label>


            {/* REGISTER BUTTON */}

            <button
              type="submit"

              disabled={
                loading
              }

              style={{
                width:
                  "100%",

                padding:
                  "14px 20px",

                border:
                  "none",

                borderRadius:
                  "10px",

                background:
                  "#2563eb",

                color:
                  "#ffffff",

                fontFamily:
                  "inherit",

                fontSize:
                  "15px",

                fontWeight:
                  "600",

                lineHeight:
                  "22px",

                cursor:
                  loading
                    ? "not-allowed"
                    : "pointer",

                opacity:
                  loading
                    ? 0.7
                    : 1,

                boxShadow:
                  "0 4px 12px rgba(37,99,235,0.25)",
              }}
            >
              {loading
                ? "Registering..."
                : "Register"}
            </button>

          </form>

        </div>

      </div>


      {/* ERROR / DUPLICATE POPUP */}

      <PopupModal
        open={
          popupOpen
        }

        title={
          popupTitle
        }

        message={
          popupMessage
        }

        type={
          popupType
        }

        onClose={() =>
          setPopupOpen(
            false
          )
        }
      />


      {/* SUCCESS TICKET */}

      <TicketModal
        open={
          ticketOpen
        }

        event={
          eventData
        }

        registration={
          registrationData
        }

        onClose={() =>
          setTicketOpen(
            false
          )
        }
      />

    </div>
  );
}


const formGroupStyle = {
  marginBottom:
    "20px",
};


const labelStyle = {
  display:
    "block",

  marginBottom:
    "7px",

  color:
    "#334155",

  fontSize:
    "14px",

  fontWeight:
    "600",

  lineHeight:
    "20px",
};


const inputStyle = {
  width:
    "100%",

  boxSizing:
    "border-box",

  padding:
    "12px 14px",

  border:
    "1px solid #cbd5e1",

  borderRadius:
    "10px",

  background:
    "#ffffff",

  color:
    "#0f172a",

  fontFamily:
    "inherit",

  fontSize:
    "15px",

  fontWeight:
    "400",

  lineHeight:
    "22px",

  outline:
    "none",
};


export default RegistrationPage;