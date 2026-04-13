import { groq } from "next-sanity";

export const allPublishedJobsQuery = groq`
  *[_type == "job" && status == "published"] | order(_createdAt desc) {
    "id": _id,
    "slug": slug.current,
    title,
    location,
    employmentType,
    salary,
    description,
    status,
    region,
    "createdAt": _createdAt,
    "updatedAt": _updatedAt
  }
`;

export const jobBySlugQuery = groq`
  *[_type == "job" && slug.current == $slug][0] {
    "id": _id,
    "slug": slug.current,
    title,
    location,
    employmentType,
    salary,
    description,
    status,
    region,
    "createdAt": _createdAt,
    "updatedAt": _updatedAt
  }
`;
