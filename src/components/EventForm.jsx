import ImageUploader from "./ImageUploader";

function EventForm({
  formData,
  handleChange,
  handleSubmit,

  bannerPreview,
  setBannerPreview,
  setBannerFile,

  backgroundPreview,
  setBackgroundPreview,
  setBackgroundFile,

  logoPreview,
  setLogoPreview,
  setLogoFile,
}) {
  const inputStyle = {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    boxSizing: "border-box",
    fontSize: "15px",
  };

  return (
    <div
      style={{
        background: "#fff",
        padding: "25px",
        borderRadius: "20px",
        boxShadow: "0 10px 30px rgba(0,0,0,.08)",
      }}
    >
      <h1>Create Event</h1>

      <h3>Event Information</h3>

      <input
        name="title"
        placeholder="Event Title"
        value={formData.title}
        onChange={handleChange}
        style={inputStyle}
      />

      <input
        name="slug"
        placeholder="event-slug"
        value={formData.slug}
        onChange={handleChange}
        style={inputStyle}
      />

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        style={{
          ...inputStyle,
          minHeight: "120px",
        }}
      />

      <input
        name="venue"
        placeholder="Venue"
        value={formData.venue}
        onChange={handleChange}
        style={inputStyle}
      />

      <input
        type="number"
        name="capacity"
        placeholder="Capacity"
        value={formData.capacity}
        onChange={handleChange}
        style={inputStyle}
      />

      <h3>Schedule</h3>

      <input
        type="datetime-local"
        name="start_date"
        value={formData.start_date}
        onChange={handleChange}
        style={inputStyle}
      />

      <input
        type="datetime-local"
        name="end_date"
        value={formData.end_date}
        onChange={handleChange}
        style={inputStyle}
      />

      <h3>Branding</h3>

      <ImageUploader
        title="Banner Image"
        preview={bannerPreview}
        setPreview={setBannerPreview}
        setFile={setBannerFile}
      />

      <ImageUploader
        title="Background Image"
        preview={backgroundPreview}
        setPreview={setBackgroundPreview}
        setFile={setBackgroundFile}
      />

      <ImageUploader
        title="Event Logo"
        preview={logoPreview}
        setPreview={setLogoPreview}
        setFile={setLogoFile}
      />

      <button
        onClick={handleSubmit}
        style={{
          width: "100%",
          padding: "15px",
          border: "none",
          borderRadius: "12px",
          background: "#2563EB",
          color: "#fff",
          fontSize: "16px",
          fontWeight: "600",
          cursor: "pointer",
          marginTop: "10px",
        }}
      >
        Create Event
      </button>
    </div>
  );
}

export default EventForm;