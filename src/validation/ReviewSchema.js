import * as yup from "yup";

export const reviewSchema = yup.object({
    rating: yup
        .number()
        .required("Rating is required")
        .min(1, "Rating must be at least 1")
        .max(5, "Rating must be at most 5"),
    comment: yup
        .string()
        .required("Comment is required")
        .min(2, "Comment must be at least 2 characters"),
});
