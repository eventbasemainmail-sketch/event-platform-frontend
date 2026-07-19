function ImageUploader({
  title,
  preview,
  setPreview,
  setFile,
}) {
  const handleUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setFile(file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <div style={{ marginBottom: "25px" }}>
      <label
        style={{
          display: "block",
          fontWeight: "600",
          marginBottom: "10px",
          color: "#334155",
          fontSize: "15px",
        }}
      >
        {title}
      </label>

      <label
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "180px",
          border: "2px dashed #CBD5E1",
          borderRadius: "18px",
          background: "#F8FAFC",
          cursor: "pointer",
          transition: ".25s",
          overflow: "hidden",
        }}
      >
        {preview ? (
          <>
            <img
              src={preview}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </>
        ) : (
          <>
            <div
              style={{
                fontSize: "55px",
              }}
            >
              📷
            </div>

            <h3
              style={{
                margin: "8px 0 3px",
                color: "#334155",
              }}
            >
              Upload Image
            </h3>

            <p
              style={{
                margin: 0,
                color: "#64748B",
                fontSize: "14px",
              }}
            >
              Click to browse
            </p>

            <small
              style={{
                marginTop: "10px",
                color: "#94A3B8",
              }}
            >
              PNG • JPG • JPEG • WEBP
            </small>
          </>
        )}

        <input
          hidden
          type="file"
          accept="image/*"
          onChange={handleUpload}
        />
      </label>
    </div>
  );
}

export default ImageUploader;