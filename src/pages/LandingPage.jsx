import { useEffect, useState } from "react";
import {
  useParams,
  useNavigate,
} from "react-router-dom";

import api from "../services/api";
import "./LandingPage.css";

function LandingPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  // ALREADY REGISTERED POPUP

  const [
    retrieveOpen,
    setRetrieveOpen,
  ] = useState(false);

  const [
    retrieveEmail,
    setRetrieveEmail,
  ] = useState("");

  const [
    checkingEmail,
    setCheckingEmail,
  ] = useState(false);

  const [
    retrieveStatus,
    setRetrieveStatus,
  ] = useState("");

  const [
    retrieveMessage,
    setRetrieveMessage,
  ] = useState("");

  useEffect(() => {
    loadEvent();
  }, [slug]);

  const loadEvent = async () => {
    try {
      setLoading(true);

      const response =
        await api.get(
          `/events/${slug}`
        );

      console.log(
        "EVENT:",
        response.data
      );

      setEvent(
        response.data
      );

    } catch (error) {

      console.error(
        "Failed to load event:",
        error
      );

    } finally {

      setLoading(false);

    }
  };


  // OPEN RETRIEVE POPUP

  const openRetrievePopup = () => {

    setRetrieveEmail("");

    setRetrieveStatus("");

    setRetrieveMessage("");

    setRetrieveOpen(true);

  };


  // CLOSE RETRIEVE POPUP

  const closeRetrievePopup = () => {

    if (checkingEmail) return;

    setRetrieveOpen(false);

    setRetrieveEmail("");

    setRetrieveStatus("");

    setRetrieveMessage("");

  };


  // CHECK IF EMAIL IS REGISTERED

  const handleCheckRegistration =
    async (e) => {

      e.preventDefault();

      if (!retrieveEmail.trim()) {
        return;
      }

      try {

        setCheckingEmail(true);

        setRetrieveStatus("");

        setRetrieveMessage("");

        const response =
          await api.post(
            "/registrations/check",
            {
              event_id:
                event.id,

              email:
                retrieveEmail.trim(),
            }
          );

        if (
          response.data.registered
        ) {

          setRetrieveStatus(
            "found"
          );

          setRetrieveMessage(
            response.data.message ||
              "Registration found. You can send your ticket to your registered email address."
          );

        } else {

          setRetrieveStatus(
            "not-found"
          );

          setRetrieveMessage(
            "This email is not registered for this event."
          );

        }

      } catch (error) {

        console.error(
          "Failed to check registration:",
          error
        );

        if (
          error.response?.status ===
          404
        ) {

          setRetrieveStatus(
            "not-found"
          );

          setRetrieveMessage(
            "This email is not registered for this event."
          );

        } else {

          setRetrieveStatus(
            "error"
          );

          setRetrieveMessage(
            "Something went wrong. Please try again."
          );

        }

      } finally {

        setCheckingEmail(false);

      }

    };


  // SEND TICKET TO EMAIL
  // Backend email endpoint will be connected next.

  const handleSendTicket =
    async () => {

      try {

        setCheckingEmail(true);

        setRetrieveMessage(
          "Sending your ticket..."
        );

        const response =
          await api.post(
            "/registrations/send-ticket",
            {
              event_id:
                event.id,

              email:
                retrieveEmail.trim(),
            }
          );

        setRetrieveStatus(
          "sent"
        );

        setRetrieveMessage(
          response.data.message ||
            "Your ticket has been sent to your registered email address."
        );

      } catch (error) {

        console.error(
          "Failed to send ticket:",
          error
        );

        setRetrieveStatus(
          "error"
        );

        setRetrieveMessage(
          error.response?.data?.message ||
            "We could not send your ticket. Please try again."
        );

      } finally {

        setCheckingEmail(false);

      }

    };


  if (loading) {

    return (

      <div
        style={{
          minHeight:
            "100vh",

          display:
            "flex",

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
          Loading Event...
        </h2>

      </div>

    );

  }


  if (!event) {

    return (

      <div
        style={{
          minHeight:
            "100vh",

          display:
            "flex",

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
          }}
        >
          Event Not Found
        </h2>

      </div>

    );

  }


  return (

    <div
      className="landing-container"

      style={{

        minHeight:
          "100vh",

        width:
          "100%",

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


      {/* EVENT CARD */}

      <div
        className="landing-card"

        style={{

          width:
            "100%",

          maxWidth:
            "700px",

          background:
            "#ffffff",

          borderRadius:
            "22px",

          overflow:
            "hidden",

          boxShadow:
            "0 25px 70px rgba(15,23,42,0.25)",

        }}
      >


        {/* EVENT BANNER */}

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
                "280px",

              objectFit:
                "cover",

              display:
                "block",

            }}

          />

        )}


        {/* CONTENT */}

        <div
          className="content"

          style={{

            padding:
              "35px",

          }}
        >


          {/* EVENT LOGO */}

          {event.logo_image && (

            <div
              style={{

                display:
                  "flex",

                justifyContent:
                  "center",

                marginTop:
                  event.banner_image
                    ? "-95px"
                    : "0",

                marginBottom:
                  "22px",

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
                    "115px",

                  height:
                    "115px",

                  borderRadius:
                    "50%",

                  objectFit:
                    "cover",

                  border:
                    "6px solid #ffffff",

                  background:
                    "#ffffff",

                  boxShadow:
                    "0 8px 25px rgba(15,23,42,0.2)",

                }}

              />

            </div>

          )}


          {/* EVENT TITLE */}

          <h1
            style={{

              margin:
                "0 0 20px 0",

              padding:
                0,

              textAlign:
                "center",

              color:
                "#0f172a",

              fontSize:
                "32px",

              fontWeight:
                "700",

              lineHeight:
                "1.25",

              letterSpacing:
                "-0.6px",

              wordBreak:
                "break-word",

            }}
          >

            {event.title}

          </h1>


          {/* EVENT DETAILS */}

          <div
            style={{

              display:
                "flex",

              flexDirection:
                "column",

              gap:
                "8px",

              marginBottom:
                "25px",

            }}
          >

            <p
              style={{

                margin:
                  0,

                color:
                  "#475569",

                fontSize:
                  "15px",

                fontWeight:
                  "500",

                lineHeight:
                  "1.6",

              }}
            >

              📍 {event.venue}

            </p>


            <p
              style={{

                margin:
                  0,

                color:
                  "#475569",

                fontSize:
                  "15px",

                fontWeight:
                  "500",

                lineHeight:
                  "1.6",

              }}
            >

              📅{" "}

              {new Date(
                event.start_date
              ).toLocaleDateString(
                undefined,
                {
                  year:
                    "numeric",

                  month:
                    "long",

                  day:
                    "numeric",
                }
              )}

            </p>

          </div>


          {/* DESCRIPTION */}

          <p
            style={{

              margin:
                "0 0 28px 0",

              color:
                "#475569",

              fontSize:
                "15px",

              fontWeight:
                "400",

              lineHeight:
                "1.75",

              whiteSpace:
                "pre-wrap",

            }}
          >

            {event.description}

          </p>


          {/* PRIVACY */}

          <label
            style={{

              display:
                "flex",

              alignItems:
                "flex-start",

              gap:
                "10px",

              marginBottom:
                "20px",

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

              id="privacy"

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

            type="button"

            onClick={() =>
              navigate(
                `/register/${slug}`
              )
            }

            style={{

              width:
                "100%",

              padding:
                "14px 20px",

              border:
                "none",

              borderRadius:
                "11px",

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

              cursor:
                "pointer",

              boxShadow:
                "0 5px 15px rgba(37,99,235,0.25)",

            }}

          >

            Register Now

          </button>


          {/* ALREADY REGISTERED */}

          <div
            style={{

              textAlign:
                "center",

              marginTop:
                "20px",

            }}
          >

            <span
              style={{

                color:
                  "#64748b",

                fontSize:
                  "14px",

              }}
            >

              Already registered?{" "}

            </span>


            <button

              type="button"

              onClick={
                openRetrievePopup
              }

              style={{

                padding:
                  0,

                border:
                  "none",

                background:
                  "transparent",

                color:
                  "#2563eb",

                fontFamily:
                  "inherit",

                fontSize:
                  "14px",

                fontWeight:
                  "600",

                cursor:
                  "pointer",

              }}

            >

              Retrieve My Ticket

            </button>

          </div>

        </div>

      </div>


      {/* RETRIEVE TICKET POPUP */}

      {retrieveOpen && (

        <div
          style={{

            position:
              "fixed",

            inset:
              0,

            zIndex:
              9999,

            display:
              "flex",

            justifyContent:
              "center",

            alignItems:
              "center",

            padding:
              "20px",

            background:
              "rgba(15,23,42,0.70)",

            fontFamily:
              "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",

          }}
        >


          <div
            style={{

              width:
                "100%",

              maxWidth:
                "430px",

              background:
                "#ffffff",

              borderRadius:
                "20px",

              padding:
                "30px",

              boxShadow:
                "0 25px 70px rgba(0,0,0,0.3)",

              boxSizing:
                "border-box",

            }}
          >


            {/* POPUP HEADER */}

            <div
              style={{

                display:
                  "flex",

                justifyContent:
                  "space-between",

                alignItems:
                  "flex-start",

                gap:
                  "20px",

                marginBottom:
                  "8px",

              }}
            >

              <h2
                style={{

                  margin:
                    0,

                  color:
                    "#0f172a",

                  fontSize:
                    "22px",

                  fontWeight:
                    "700",

                  lineHeight:
                    "1.3",

                }}
              >

                Retrieve My Ticket

              </h2>


              <button

                type="button"

                onClick={
                  closeRetrievePopup
                }

                style={{

                  border:
                    "none",

                  background:
                    "transparent",

                  color:
                    "#64748b",

                  fontSize:
                    "24px",

                  lineHeight:
                    "24px",

                  cursor:
                    "pointer",

                  padding:
                    0,

                }}

              >

                ×

              </button>

            </div>


            <p
              style={{

                margin:
                  "0 0 24px 0",

                color:
                  "#64748b",

                fontSize:
                  "14px",

                lineHeight:
                  "1.6",

              }}
            >

              Enter the email address you used
              when registering for this event.

            </p>


            {/* EMAIL CHECK FORM */}

            {retrieveStatus !==
              "sent" && (

              <form
                onSubmit={
                  handleCheckRegistration
                }
              >

                <label
                  style={{

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

                  }}
                >

                  Email Address

                </label>


                <input

                  type="email"

                  value={
                    retrieveEmail
                  }

                  onChange={(e) => {

                    setRetrieveEmail(
                      e.target.value
                    );

                    setRetrieveStatus(
                      ""
                    );

                    setRetrieveMessage(
                      ""
                    );

                  }}

                  placeholder="Enter your registered email"

                  required

                  disabled={
                    checkingEmail
                  }

                  style={{

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

                    fontFamily:
                      "inherit",

                    fontSize:
                      "15px",

                    color:
                      "#0f172a",

                    outline:
                      "none",

                    marginBottom:
                      "15px",

                  }}

                />


                {/* RESULT MESSAGE */}

                {retrieveMessage && (

                  <div
                    style={{

                      padding:
                        "12px 14px",

                      borderRadius:
                        "10px",

                      marginBottom:
                        "15px",

                      fontSize:
                        "14px",

                      lineHeight:
                        "1.5",

                      background:
                        retrieveStatus ===
                        "found"
                          ? "#f0fdf4"
                          : retrieveStatus ===
                            "not-found"
                          ? "#fff7ed"
                          : "#fef2f2",

                      color:
                        retrieveStatus ===
                        "found"
                          ? "#166534"
                          : retrieveStatus ===
                            "not-found"
                          ? "#9a3412"
                          : "#991b1b",

                    }}
                  >

                    {retrieveMessage}

                  </div>

                )}


                {/* CHECK BUTTON */}

                {retrieveStatus !==
                  "found" && (

                  <button

                    type="submit"

                    disabled={
                      checkingEmail
                    }

                    style={{

                      width:
                        "100%",

                      padding:
                        "13px",

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
                        "14px",

                      fontWeight:
                        "600",

                      cursor:
                        checkingEmail
                          ? "not-allowed"
                          : "pointer",

                      opacity:
                        checkingEmail
                          ? 0.7
                          : 1,

                    }}

                  >

                    {checkingEmail
                      ? "Checking..."
                      : "Check Registration"}

                  </button>

                )}


                {/* SEND TICKET BUTTON */}

                {retrieveStatus ===
                  "found" && (

                  <button

                    type="button"

                    onClick={
                      handleSendTicket
                    }

                    disabled={
                      checkingEmail
                    }

                    style={{

                      width:
                        "100%",

                      padding:
                        "13px",

                      border:
                        "none",

                      borderRadius:
                        "10px",

                      background:
                        "#16a34a",

                      color:
                        "#ffffff",

                      fontFamily:
                        "inherit",

                      fontSize:
                        "14px",

                      fontWeight:
                        "600",

                      cursor:
                        checkingEmail
                          ? "not-allowed"
                          : "pointer",

                      opacity:
                        checkingEmail
                          ? 0.7
                          : 1,

                    }}

                  >

                    {checkingEmail
                      ? "Sending..."
                      : "Send My Ticket to Email"}

                  </button>

                )}

              </form>

            )}


            {/* EMAIL SENT */}

            {retrieveStatus ===
              "sent" && (

              <div
                style={{

                  textAlign:
                    "center",

                }}
              >

                <div
                  style={{

                    fontSize:
                      "50px",

                    marginBottom:
                      "15px",

                  }}
                >

                  ✉️

                </div>


                <h3
                  style={{

                    margin:
                      "0 0 8px 0",

                    color:
                      "#0f172a",

                    fontSize:
                      "20px",

                  }}
                >

                  Check Your Email

                </h3>


                <p
                  style={{

                    margin:
                      "0 0 20px 0",

                    color:
                      "#64748b",

                    fontSize:
                      "14px",

                    lineHeight:
                      "1.6",

                  }}
                >

                  {retrieveMessage}

                </p>


                <button

                  type="button"

                  onClick={
                    closeRetrievePopup
                  }

                  style={{

                    width:
                      "100%",

                    padding:
                      "13px",

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
                      "14px",

                    fontWeight:
                      "600",

                    cursor:
                      "pointer",

                  }}

                >

                  Done

                </button>

              </div>

            )}

          </div>

        </div>

      )}

    </div>

  );
}

export default LandingPage;