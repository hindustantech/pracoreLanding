// Enterprise-grade Fetch Client (like Axios abstraction)

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  headers?: Record<string, string>;
  body?: any;
  timeout?: number;
};

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1";

// 🔹 Timeout Controller (like Axios timeout)
const fetchWithTimeout = async (
  url: string,
  options: RequestInit,
  timeout = 10000
) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
};

// 🔹 Interceptor-like Request Handler
const request = async <T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> => {
  const token = localStorage.getItem("token");

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  // 🔹 Attach Auth Token
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const config: RequestInit = {
    method: options.method || "GET",
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  };

  try {
    const response = await fetchWithTimeout(
      `${BASE_URL}${endpoint}`,
      config,
      options.timeout
    );

    // 🔹 Handle Non-2xx Responses
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));

      throw {
        status: response.status,
        message: errorData?.message || "Something went wrong",
        error: errorData,
      };
    }

    // 🔹 Success Response
    const data = await response.json();
    return data;
  } catch (error: any) {
    // 🔹 Normalize Errors (like Axios)
    if (error.name === "AbortError") {
      throw {
        status: 408,
        message: "Request Timeout",
      };
    }

    throw {
      status: error.status || 500,
      message: error.message || "Network Error",
      error,
    };
  }
};

// 🔹 Export API Methods (scalable design)
export const apiClient = {
  get: <T>(url: string) => request<T>(url),

  post: <T>(url: string, body: any) =>
    request<T>(url, { method: "POST", body }),

  put: <T>(url: string, body: any) =>
    request<T>(url, { method: "PUT", body }),

  patch: <T>(url: string, body: any) =>
    request<T>(url, { method: "PATCH", body }),

  delete: <T>(url: string) =>
    request<T>(url, { method: "DELETE" }),
};