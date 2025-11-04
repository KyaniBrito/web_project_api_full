const BASE_URL = "http://localhost:3001";

const checkResponse = (res) => {
  return res.json().then((data) => {
    if (res.ok) {
      return data;
    }
    return Promise.reject(data);
  });
};

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then(checkResponse)
    .then((data) => {
      if (data.token) {
        localStorage.setItem("jwt", data.token);
      }
      return data;
    });
};

export const getUserData = () => {
  const token = localStorage.getItem("jwt");
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};
