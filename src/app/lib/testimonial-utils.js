export const normalizeTestimonialRecord = (testimonial = {}) => {
  const personName = String(testimonial?.personName || testimonial?.name || "").trim();
  const city = String(testimonial?.city || "").trim();
  const content = String(testimonial?.content || testimonial?.quote || "").trim();

  return {
    _id: testimonial?._id ? String(testimonial._id) : "",
    personName,
    city,
    content,
    isPublished: Boolean(testimonial?.isPublished),
    createdAt: testimonial?.createdAt ? new Date(testimonial.createdAt).toISOString() : "",
    updatedAt: testimonial?.updatedAt ? new Date(testimonial.updatedAt).toISOString() : "",
  };
};

export const testimonialRecordToFormState = (testimonial = {}) => ({
  _id: testimonial._id || "",
  personName: testimonial.personName || "",
  city: testimonial.city || "",
  content: testimonial.content || "",
  isPublished: Boolean(testimonial.isPublished),
});

export const createEmptyTestimonialForm = () => ({
  _id: "",
  personName: "",
  city: "",
  content: "",
  isPublished: true,
});

