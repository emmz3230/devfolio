import api from "@/api"

export async function getBlogs(page) {
  try {
    const response = await api.get(`blogs_list?page=${page}`);
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function getBlog(slug) {
  try {
    const response = await api.get(`blogs/${slug}`);
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
}
export async function registerUser(data) {
  try {
    const response = await api.post("register_user/", data)
    return response.data
  }

  catch (err) {
    console.log(err)
    if (err.status == 400) {
      throw new Error("Username already exists")
    }
    throw new Error(err)
  }
}

export async function signin(data) {


  try {
    const response = await api.post("token/", data)
    return response.data
  }

  catch (err) {

    if (err.status === 401) {
      throw new Error("Invalid Credentials")
    }

    throw new Error(err)

  }
}


export async function getUsername() {
  try {
    const response = await api.get("get_username");
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function sendPasswordResetRequest(email) {
  try {
    const response = await api.post("password_reset_request/", { email });
    return response.data;
  } catch (err) {
    const errorMessage = err.response?.data?.error || err.message || "Failed to send reset link.";
    throw new Error(errorMessage);
  }
}

export async function confirmPasswordReset({ uid, token, password }) {
  try {
    const response = await api.post("password_reset_confirm/", { uid, token, password });
    return response.data;
  } catch (err) {
    const errorMessage = err.response?.data?.error || err.message || "Failed to reset password.";
    throw new Error(errorMessage);
  }
}