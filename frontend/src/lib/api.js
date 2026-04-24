const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function apiRequest(path, method = 'GET', token, body) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: body ? JSON.stringify(body) : undefined
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`API ${method} ${path} failed (${response.status}): ${details}`);
  }

  return response.json();
}

export const api = {
  getDashboard(token) {
    return apiRequest('/dashboard', 'GET', token);
  },
  getFarmData(token) {
    return apiRequest('/farm-data', 'GET', token);
  },
  getAgents(token) {
    return apiRequest('/agents', 'GET', token);
  },
  updateFarm(token, payload) {
    return apiRequest('/update-farm', 'POST', token, payload);
  }
};
