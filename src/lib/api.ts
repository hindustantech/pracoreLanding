export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

async function handleResponse(res: Response) {
  const result = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(result.message || "Something went wrong");
  return result;
}

export const api = {
  // ✅ Register (using phone)
  register: async (data: { name: string; phone: string; password: string; department: string }) => {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  // ✅ Login (using phone)
  login: async (data: { phone: string; password: string }) => {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

// ✅ NEW FUNCTION — Fetch logged-in employee’s attendance history (with full debugging)
getMyAttendance: async (token: string) => {
  console.group("📡 [getMyAttendance] Starting request...");

  // 🧩 1. Check token
  if (!token) {
    console.error("❌ No token provided to getMyAttendance!");
    throw new Error("Authorization token missing");
  }

  const endpoint = `${API_BASE_URL}/attendance/my`;
  console.log("🌍 API Base URL:", API_BASE_URL);
  console.log("🚀 Full Endpoint:", endpoint);
  console.log("🔐 Using token (first 15 chars):", token.slice(0, 15) + "...");

  try {
    // 🧩 2. Make API request
    const res = await fetch(endpoint, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // 🧩 3. Log raw response
    console.log("📩 Raw Response object:", res);

    // 🧩 4. Try parsing JSON safely
    let result;
    try {
      result = await res.json();
    } catch (jsonErr) {
      console.error("⚠️ Failed to parse JSON response:", jsonErr);
      result = {};
    }

    // 🧩 5. Log parsed result
    console.log("📬 Parsed JSON result:", result);

    // 🧩 6. Check HTTP status
    if (!res.ok) {
      console.error("❌ Attendance fetch failed with status:", res.status);
      console.error("🧾 Backend error details:", result);
      throw new Error(result.message || `Attendance fetch failed (${res.status})`);
    }

    // 🧩 7. Check response structure
    if (Array.isArray(result)) {
      console.log("✅ Backend returned array of attendance records.");
    } else if (result.attendance) {
      console.log("✅ Backend returned object with 'attendance' array.");
    } else if (result.data) {
      console.log("✅ Backend returned object with 'data' array.");
    } else {
      console.warn("⚠️ Unexpected backend format:", result);
    }

    console.groupEnd();
    return result;
  } catch (err: any) {
    console.error("🔥 [getMyAttendance] Error occurred:", err.message);
    console.groupEnd();
    throw err;
  }
},


  // 🕒 Mark Attendance
  markAttendance: async (data: {
    token: string;
    checkType: "Check-In" | "Check-Out";
    latitude: number;
    longitude: number;
    locationStatus: string;
    selfieFile: File;
    comment:string;
  }) => {
    console.log("🛰️ [markAttendance] Starting attendance request...");

    if (!data.token) console.error("❌ No token provided!");
    if (!data.selfieFile) console.error("❌ No selfie file provided!");

    console.log("📦 Input data:", {
      checkType: data.checkType,
      latitude: data.latitude,
      longitude: data.longitude,
      locationStatus: data.locationStatus,
      tokenPresent: !!data.token,
      selfieFileName: data.selfieFile?.name,
      comment: data.comment,
    });

    const formData = new FormData();
    formData.append("checkType", data.checkType);
    formData.append("latitude", String(data.latitude));
    formData.append("longitude", String(data.longitude));
    formData.append("locationStatus", data.locationStatus);
    formData.append("comment", data.comment);
    // backend expects upload.single("selfieUrl")
    if (!data.selfieFile) {
  console.error("❌ No selfieFile found before upload!");
} else {
  formData.append("selfieUrl", data.selfieFile, data.selfieFile.name);
  console.log("✅ Appended selfieUrl:", data.selfieFile.name);
}


    console.group("🧾 FormData contents");
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }
    console.groupEnd();

    console.log("🌐 POST ->", `${API_BASE_URL}/attendance/mark`);
    try {
      const res = await fetch(`${API_BASE_URL}/attendance/mark`, {
        method: "POST",
        headers: { Authorization: `Bearer ${data.token}` },
        body: formData,
      });

      const result = await res.json().catch(() => ({}));
      console.log("📬 Parsed response:", result);

      if (!res.ok) throw new Error(result.message || "Attendance failed");
      return result;
    } catch (err: any) {
      console.error("🔥 markAttendance error:", err);
      throw err;
    }
  },
  // 📅 Get Daily Report
getDailyReport: async (token: string) => {
  if (!token) throw new Error("Authorization token missing");

  const endpoint = `${API_BASE_URL}/attendance/daily-report`;
  console.log("🌍 Fetching Daily Report:", endpoint);

  const res = await fetch(endpoint, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(result.message || "Failed to fetch daily report");

  console.log("✅ Daily Report Data:", result);
  return result;
},

// 📆 Get Monthly Summary
// 📆 Get Monthly Summary (with query params)
getMonthlySummary: async (token: string, month?: number, year?: number) => {
  if (!token) throw new Error("Authorization token missing");

  const now = new Date();
  const queryMonth = month || now.getMonth() + 1;
  const queryYear = year || now.getFullYear();

  const endpoint = `${API_BASE_URL}/attendance/monthly-summary?month=${queryMonth}&year=${queryYear}`;
  console.log("🌍 Fetching Monthly Summary:", endpoint);

  const res = await fetch(endpoint, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(result.message || "Failed to fetch monthly summary");

  console.log("✅ Monthly Summary Data:", result);
  return result;
},


};


// Export everything
export const { 
  markAttendance, 
  getMyAttendance, 
  getDailyReport, 
  getMonthlySummary 
} = api;

