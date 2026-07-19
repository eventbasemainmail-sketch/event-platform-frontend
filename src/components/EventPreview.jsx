function EventPreview({
  formData,
  bannerPreview,
  backgroundPreview,
  logoPreview,
}) {
  return (
    <div>
      <h2
        style={{
          marginBottom: "20px",
        }}
      >
        Live Preview
      </h2>

      <div
        style={{
          backgroundImage: backgroundPreview
            ? `url(${backgroundPreview})`
            : "linear-gradient(135deg,#2563EB,#1E3A8A)",

          backgroundSize: "cover",
          backgroundPosition: "center",

          borderRadius: "20px",

          overflow: "hidden",

          minHeight: "700px",

          boxShadow:
            "0 15px 35px rgba(0,0,0,.15)",
        }}
      >
        {bannerPreview && (
          <img
            src={bannerPreview}
            alt=""
            style={{
              width: "100%",
              height: "250px",
              objectFit: "cover",
            }}
          />
        )}

        <div
          style={{
            padding: "30px",
            background:
              "rgba(255,255,255,.88)",
            backdropFilter: "blur(10px)",
            minHeight: "450px",
          }}
        >
          {logoPreview && (
            <img
              src={logoPreview}
              alt=""
              style={{
                width: "90px",
                height: "90px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "4px solid white",
                boxShadow:
                  "0 5px 20px rgba(0,0,0,.2)",
                marginBottom: "20px",
              }}
            />
          )}

          <h1
            style={{
              marginBottom: "10px",
            }}
          >
            {formData.title || "Event Title"}
          </h1>

          <p>📍 {formData.venue || "Venue"}</p>

          <p>
            👥 Capacity:{" "}
            {formData.capacity || 0}
          </p>

          <p>
            📅{" "}
            {formData.start_date
              ? new Date(
                  formData.start_date
                ).toLocaleString()
              : "Event Date"}
          </p>

          <hr
            style={{
              margin: "25px 0",
            }}
          />

          <p
            style={{
              lineHeight: "28px",
              color: "#475569",
            }}
          >
            {formData.description ||
              "Your event description will appear here. Everything you type on the left automatically updates this preview."}
          </p>

          <button
            style={{
              marginTop: "30px",
              padding: "14px 24px",
              border: "none",
              borderRadius: "10px",
              background: "#2563EB",
              color: "white",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Register Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventPreview;