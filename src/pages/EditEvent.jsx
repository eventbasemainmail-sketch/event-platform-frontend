import { useEffect, useState } from "react";
import {
  useParams,
  useNavigate,
} from "react-router-dom";
import api from "../services/api";

function ImageUploader({
  title,
  preview,
  setPreview,
  setFile,
}) {
  const handleUpload = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setFile(file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <div
      style={{
        marginBottom: "25px",
      }}
    >
      <label
        style={{
          display: "block",
          fontWeight: "600",
          marginBottom: "10px",
          color: "#334155",
        }}
      >
        {title}
      </label>

      <label
        style={{
          height: "170px",
          border: "2px dashed #cbd5e1",
          borderRadius: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          cursor: "pointer",
          overflow: "hidden",
          background: "#f8fafc",
          position: "relative",
        }}
      >
        {preview ? (
          <>
            <img
              src={preview}
              alt={title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />

            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(0,0,0,0.35)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                fontWeight: "600",
                opacity: 0,
                transition: "opacity 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = 1;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = 0;
              }}
            >
              Click to replace image
            </div>
          </>
        ) : (
          <>
            <div
              style={{
                fontSize: "40px",
              }}
            >
              🖼️
            </div>

            <span
              style={{
                fontWeight: "600",
                color: "#475569",
              }}
            >
              Click to upload
            </span>

            <small
              style={{
                color: "#94a3b8",
                marginTop: "5px",
              }}
            >
              PNG, JPG or WEBP
            </small>
          </>
        )}

        <input
          type="file"
          accept="image/*"
          hidden
          onChange={handleUpload}
        />
      </label>
    </div>
  );
}

function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pageLoading, setPageLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState(false);

  const [formData, setFormData] =
    useState({
      title: "",
      slug: "",
      description: "",
      venue: "",
      capacity: "",
      start_date: "",
      end_date: "",
      status: "draft",
    });

  const [
    bannerPreview,
    setBannerPreview,
  ] = useState("");

  const [
    backgroundPreview,
    setBackgroundPreview,
  ] = useState("");

  const [
    logoPreview,
    setLogoPreview,
  ] = useState("");

  const [bannerFile, setBannerFile] =
    useState(null);

  const [
    backgroundFile,
    setBackgroundFile,
  ] = useState(null);

  const [logoFile, setLogoFile] =
    useState(null);

  useEffect(() => {
    loadEvent();
  }, [id]);

  const formatDateForInput = (date) => {
    if (!date) return "";

    const d = new Date(date);

    const offset =
      d.getTimezoneOffset();

    const localDate = new Date(
      d.getTime() -
        offset * 60 * 1000
    );

    return localDate
      .toISOString()
      .slice(0, 16);
  };

  const loadEvent = async () => {
    try {
      setPageLoading(true);
      setError("");

      const response =
        await api.get(
          `/events/id/${id}`
        );

      const event = response.data;

      setFormData({
        title: event.title || "",
        slug: event.slug || "",
        description:
          event.description || "",
        venue: event.venue || "",
        capacity:
          event.capacity || "",
        start_date:
          formatDateForInput(
            event.start_date
          ),
        end_date:
          formatDateForInput(
            event.end_date
          ),
        status:
          event.status || "draft",
      });

      setBannerPreview(
        event.banner_image || ""
      );

      setBackgroundPreview(
        event.background_image || ""
      );

      setLogoPreview(
        event.logo_image || ""
      );
    } catch (error) {
      console.error(
        "Failed to load event:",
        error
      );

      setError(
        error.response?.data?.error ||
          "Failed to load event."
      );
    } finally {
      setPageLoading(false);
    }
  };

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (saving) return;

    try {
      setSaving(true);
      setError("");

      const data =
        new FormData();

      data.append(
        "title",
        formData.title
      );

      data.append(
        "slug",
        formData.slug
      );

      data.append(
        "description",
        formData.description
      );

      data.append(
        "venue",
        formData.venue
      );

      data.append(
        "capacity",
        formData.capacity
      );

      data.append(
        "start_date",
        formData.start_date
      );

      data.append(
        "end_date",
        formData.end_date
      );

      data.append(
        "status",
        formData.status
      );

      if (bannerFile) {
        data.append(
          "banner",
          bannerFile
        );
      }

      if (backgroundFile) {
        data.append(
          "background",
          backgroundFile
        );
      }

      if (logoFile) {
        data.append(
          "logo",
          logoFile
        );
      }

      const response =
        await api.put(
          `/events/${id}`,
          data
        );

      console.log(
        "UPDATED EVENT:",
        response.data
      );

      setSuccess(true);
    } catch (error) {
      console.error(
        "Failed to update event:",
        error
      );

      setError(
        error.response?.data?.error ||
          "Failed to update event."
      );
    } finally {
      setSaving(false);
    }
  };

  if (pageLoading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#f5f7fb",
          fontFamily:
            "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        }}
      >
        <h2>Loading Event...</h2>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        padding: "30px 20px",
        fontFamily:
          "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        {/* HEADER */}

        <div
          style={{
            background: "#ffffff",
            borderRadius: "18px",
            padding: "24px 28px",
            marginBottom: "25px",
            boxShadow:
              "0 6px 20px rgba(15, 23, 42, 0.06)",
            border:
              "1px solid #e9eef5",
          }}
        >
          {/* BACK BUTTON */}

          <button
            type="button"
            onClick={() =>
              navigate(
                `/admin/events/${id}`
              )
            }
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              padding: "10px 16px",
              marginBottom: "22px",
              border:
                "1px solid #dbe3ed",
              borderRadius: "10px",
              background: "#f8fafc",
              color: "#334155",
              fontSize: "14px",
              fontWeight: "600",
              lineHeight: "20px",
              cursor: "pointer",
              boxShadow:
                "0 1px 2px rgba(15, 23, 42, 0.04)",
              transition:
                "background 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background =
                "#f1f5f9";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background =
                "#f8fafc";
            }}
          >
            <span
              style={{
                fontSize: "18px",
                lineHeight: "18px",
              }}
            >
              ←
            </span>

            Back to Manage Event
          </button>

          {/* TITLE */}

          <h1
            style={{
              margin: "0 0 8px 0",
              padding: 0,
              color: "#0f172a",
              fontSize: "30px",
              fontWeight: "700",
              lineHeight: "1.2",
              letterSpacing: "-0.5px",
            }}
          >
            Edit Event
          </h1>

          <p
            style={{
              margin: 0,
              padding: 0,
              color: "#64748b",
              fontSize: "15px",
              lineHeight: "1.6",
            }}
          >
            Update your event information,
            schedule, and branding.
          </p>
        </div>

        {/* ERROR */}

        {error && (
          <div
            style={{
              padding: "15px",
              borderRadius: "12px",
              background: "#fef2f2",
              color: "#991b1b",
              marginBottom: "20px",
            }}
          >
            {error}
          </div>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "minmax(0, 1fr) minmax(0, 1fr)",
            gap: "30px",
            alignItems: "start",
          }}
        >
          {/* LEFT - EDIT FORM */}

          <form
            onSubmit={handleSubmit}
            style={{
              background: "white",
              padding: "30px",
              borderRadius: "20px",
              boxShadow:
                "0 10px 30px rgba(0,0,0,0.08)",
            }}
          >
            <h2
              style={{
                marginTop: 0,
                marginBottom: "24px",
                color: "#0f172a",
                fontSize: "22px",
              }}
            >
              Event Information
            </h2>

            <label style={labelStyle}>
              Event Title
            </label>

            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Event Title"
              style={inputStyle}
              required
            />

            <label style={labelStyle}>
              Event URL / Slug
            </label>

            <input
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              placeholder="event-slug"
              style={inputStyle}
              required
            />

            <label style={labelStyle}>
              Description
            </label>

            <textarea
              name="description"
              value={
                formData.description
              }
              onChange={handleChange}
              placeholder="Event Description"
              style={{
                ...inputStyle,
                minHeight: "130px",
                resize: "vertical",
              }}
            />

            <label style={labelStyle}>
              Venue
            </label>

            <input
              name="venue"
              value={formData.venue}
              onChange={handleChange}
              placeholder="Venue"
              style={inputStyle}
            />

            <label style={labelStyle}>
              Capacity
            </label>

            <input
              type="number"
              name="capacity"
              value={
                formData.capacity
              }
              onChange={handleChange}
              placeholder="Capacity"
              style={inputStyle}
            />

            <h2
              style={{
                marginTop: "30px",
                marginBottom: "20px",
                color: "#0f172a",
                fontSize: "22px",
              }}
            >
              Schedule
            </h2>

            <label style={labelStyle}>
              Start Date
            </label>

            <input
              type="datetime-local"
              name="start_date"
              value={
                formData.start_date
              }
              onChange={handleChange}
              style={inputStyle}
            />

            <label style={labelStyle}>
              End Date
            </label>

            <input
              type="datetime-local"
              name="end_date"
              value={
                formData.end_date
              }
              onChange={handleChange}
              style={inputStyle}
            />

            <label style={labelStyle}>
              Status
            </label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="draft">
                Draft
              </option>

              <option value="published">
                Published
              </option>

              <option value="cancelled">
                Cancelled
              </option>
            </select>

            <h2
              style={{
                marginTop: "30px",
                marginBottom: "20px",
                color: "#0f172a",
                fontSize: "22px",
              }}
            >
              Event Branding
            </h2>

            <ImageUploader
              title="Banner Image"
              preview={
                bannerPreview
              }
              setPreview={
                setBannerPreview
              }
              setFile={
                setBannerFile
              }
            />

            <ImageUploader
              title="Background Image"
              preview={
                backgroundPreview
              }
              setPreview={
                setBackgroundPreview
              }
              setFile={
                setBackgroundFile
              }
            />

            <ImageUploader
              title="Event Logo"
              preview={
                logoPreview
              }
              setPreview={
                setLogoPreview
              }
              setFile={
                setLogoFile
              }
            />

            <button
              type="submit"
              disabled={saving}
              style={{
                width: "100%",
                padding: "15px",
                border: "none",
                borderRadius: "12px",
                background: "#2563eb",
                color: "white",
                fontSize: "16px",
                fontWeight: "600",
                cursor: saving
                  ? "not-allowed"
                  : "pointer",
                opacity: saving
                  ? 0.7
                  : 1,
              }}
            >
              {saving
                ? "Saving Changes..."
                : "Save Changes"}
            </button>
          </form>

          {/* RIGHT - LIVE PREVIEW */}

          <div
            style={{
              position: "sticky",
              top: "20px",
            }}
          >
            <h2
              style={{
                marginTop: 0,
                marginBottom: "15px",
                color: "#0f172a",
                fontSize: "22px",
              }}
            >
              Live Preview
            </h2>

            <div
              style={{
                minHeight: "700px",

                backgroundImage:
                  backgroundPreview
                    ? `linear-gradient(
                        rgba(0,0,0,0.25),
                        rgba(0,0,0,0.25)
                      ),
                      url("${backgroundPreview}")`
                    : "none",

                backgroundColor:
                  "#fff",

                backgroundSize:
                  "cover",

                backgroundPosition:
                  "center",

                borderRadius: "20px",

                overflow: "hidden",

                boxShadow:
                  "0 10px 30px rgba(0,0,0,0.1)",
              }}
            >
              {bannerPreview && (
                <img
                  src={
                    bannerPreview
                  }
                  alt="Banner Preview"
                  style={{
                    width: "100%",
                    height: "250px",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              )}

              <div
                style={{
                  margin: "25px",
                  padding: "25px",
                  borderRadius: "16px",
                  background:
                    "rgba(255,255,255,0.92)",
                  backdropFilter:
                    "blur(10px)",
                }}
              >
                {logoPreview && (
                  <img
                    src={
                      logoPreview
                    }
                    alt="Logo Preview"
                    style={{
                      width: "90px",
                      height: "90px",
                      borderRadius:
                        "50%",
                      objectFit:
                        "cover",
                      border:
                        "4px solid white",
                      boxShadow:
                        "0 5px 15px rgba(0,0,0,0.2)",
                    }}
                  />
                )}

                <h1>
                  {formData.title ||
                    "Event Title"}
                </h1>

                <p>
                  📍{" "}
                  {formData.venue ||
                    "Event Venue"}
                </p>

                <p>
                  📅{" "}
                  {formData.start_date
                    ? new Date(
                        formData.start_date
                      ).toLocaleString()
                    : "Event Date"}
                </p>

                <p>
                  👥 Capacity:{" "}
                  {formData.capacity ||
                    0}
                </p>

                <p
                  style={{
                    lineHeight: "1.6",
                  }}
                >
                  {formData.description ||
                    "Event description will appear here."}
                </p>

                <button
                  type="button"
                  style={{
                    padding:
                      "12px 20px",
                    border: "none",
                    borderRadius:
                      "10px",
                    background:
                      "#2563eb",
                    color: "white",
                    marginTop:
                      "20px",
                  }}
                >
                  Register Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SUCCESS MODAL */}

      {success && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background:
              "rgba(15,23,42,0.65)",
            display: "flex",
            justifyContent:
              "center",
            alignItems: "center",
            zIndex: 9999,
            padding: "20px",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "420px",
              background: "white",
              padding: "30px",
              borderRadius: "20px",
              textAlign: "center",
              boxShadow:
                "0 25px 60px rgba(0,0,0,0.25)",
            }}
          >
            <div
              style={{
                fontSize: "55px",
              }}
            >
              ✅
            </div>

            <h2>
              Event Updated
            </h2>

            <p
              style={{
                color: "#64748b",
                lineHeight: "1.6",
              }}
            >
              Your event changes have
              been saved successfully.
            </p>

            <button
              onClick={() =>
                navigate(
                  `/admin/events/${id}`
                )
              }
              style={{
                width: "100%",
                padding: "14px",
                border: "none",
                borderRadius: "10px",
                background:
                  "#2563eb",
                color: "white",
                fontWeight: "600",
                cursor: "pointer",
                marginTop: "15px",
              }}
            >
              Back to Event
            </button>

            <button
              onClick={() => {
                setSuccess(false);
                loadEvent();
              }}
              style={{
                width: "100%",
                padding: "14px",
                border:
                  "1px solid #e2e8f0",
                borderRadius: "10px",
                background: "white",
                color: "#334155",
                fontWeight: "600",
                cursor: "pointer",
                marginTop: "10px",
              }}
            >
              Continue Editing
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const labelStyle = {
  display: "block",
  fontWeight: "600",
  fontSize: "14px",
  color: "#334155",
  marginBottom: "7px",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "18px",
  borderRadius: "10px",
  border: "1px solid #dbe1ea",
  boxSizing: "border-box",
  fontSize: "14px",
  fontFamily: "inherit",
  outline: "none",
};

export default EditEvent;