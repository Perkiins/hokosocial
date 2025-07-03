// src/utils/api.js
import { getToken } from './auth';

const API_URL = 'https://hokosocial.onrender.com';

export const register = async (username, password) => {
  const res = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  });

  return res.json();
};

export const login = async (username, password) => {
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  });

  return res.json();
};

export const getProfile = async () => {
  const token = getToken();

  const res = await fetch(`${API_URL}/profile`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  return res.json();
};
