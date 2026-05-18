import api from "@/api"

export async function getBlogs() {
  try {
    const response = await api.get("blogs_list");
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
}