import { getToken } from './auth';

const API = 'https://hokosocial.onrender.com/api';

export const loginUser = async (username, password) => {
  const res = await fetch(`${API}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  return res.json();
};

export const registerUser = async (username, password) => {
  const res = await fetch(`${API}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  return res.json();
};

export const getUserData = async () => {
  const res = await fetch(`${API}/user-data`, {
    headers: {
      'Authorization': `Bearer ${getToken()}`
    }
  });
  return res.json();
};

export const runBot = async () => {
  const res = await fetch(`${API}/run-bot`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${getToken()}`
    }
  });
  return res.json();
};

export const getLog = async () => {
  const res = await fetch(`${API}/log`, {
    headers: {
      'Authorization': `Bearer ${getToken()}`
    }
  });
  return res.json();
};
