import { useState } from "react";

import EventForm from "../components/EventForm";
import EventPreview from "../components/EventPreview";

function CreateEvent() {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    venue: "",
    capacity: "",
    start_date: "",
    end_date: "",
  });

  const [bannerPreview, setBannerPreview] =
    useState("");

  const [backgroundPreview, setBackgroundPreview] =
    useState("");

  const [logoPreview, setLogoPreview] =
    useState("");

  const [bannerFile, setBannerFile] =
    useState(null);

  const [backgroundFile, setBackgroundFile] =
    useState(null);

  const [logoFile, setLogoFile] =
    useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const data = new FormData();

      data.append("title", formData.title);
      data.append("slug", formData.slug);
      data.append(
        "description",
        formData.description
      );
      data.append("venue", formData.venue);
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

      if (bannerFile) {
        data.append("banner", bannerFile);
      }

      if (backgroundFile) {
        data.append(
          "background",
          backgroundFile
        );
      }

      if (logoFile) {
        data.append("logo", logoFile);
      }

      const response = await fetch(
        "http://localhost:5000/api/events",
        {
          method: "POST",
          body: data,
        }
      );

      const result = await response.json();

      console.log(result);

      if (!response.ok) {
        alert(
          result.error ||
            "Failed to create event"
        );
        return;
      }

      alert("✅ Event Created!");

      setFormData({
        title: "",
        slug: "",
        description: "",
        venue: "",
        capacity: "",
        start_date: "",
        end_date: "",
      });

      setBannerPreview("");
      setBackgroundPreview("");
      setLogoPreview("");

      setBannerFile(null);
      setBackgroundFile(null);
      setLogoFile(null);
    } catch (error) {
      console.error(error);

      alert("Server Error");
    }
  };

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
          maxWidth: "1400px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns:
            "1fr 1fr",
          gap: "30px",
        }}
      >
        <EventForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          bannerPreview={bannerPreview}
          setBannerPreview={
            setBannerPreview
          }
          setBannerFile={setBannerFile}
          backgroundPreview={
            backgroundPreview
          }
          setBackgroundPreview={
            setBackgroundPreview
          }
          setBackgroundFile={
            setBackgroundFile
          }
          logoPreview={logoPreview}
          setLogoPreview={setLogoPreview}
          setLogoFile={setLogoFile}
        />

        <EventPreview
          formData={formData}
          bannerPreview={bannerPreview}
          backgroundPreview={
            backgroundPreview
          }
          logoPreview={logoPreview}
        />
      </div>
    </div>
  );
}

export default CreateEvent;