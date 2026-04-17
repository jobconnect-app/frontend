import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Fonction utilitaire pour injecter le token dynamiquement dans les headers
export function authHeaders(token?: string | null) {
  return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
}

// Intercepteur pour gérer le refresh automatique du token d'accès
interface FailedQueueItem {
  resolve: (token: string | null) => void;
  reject: (error: unknown) => void;
}
let isRefreshing = false;
let failedQueue: FailedQueueItem[] = [];

function processQueue(error: unknown, token: string | null = null) {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise<string | null>(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }
      originalRequest._retry = true;
      isRefreshing = true;
      const refreshToken = localStorage.getItem("refresh_token");
      if (!refreshToken) {
        window.dispatchEvent(new Event("logout"));
        return Promise.reject(error);
      }
      try {
        const res = await api.post("/auth/refresh", {
          refresh_token: refreshToken,
        });
        const newToken = res.data.access_token;
        if (newToken) {
          localStorage.setItem("access_token", newToken);
          // Notifier le contexte Auth de mettre à jour le token
          window.dispatchEvent(
            new CustomEvent("tokenRefreshed", {
              detail: { access_token: newToken },
            }),
          );
          originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
          processQueue(null, newToken);
          return api(originalRequest);
        } else {
          processQueue(new Error("No new token"), null);
          window.dispatchEvent(new Event("logout"));
          return Promise.reject(error);
        }
      } catch (err) {
        processQueue(err, null);
        window.dispatchEvent(new Event("logout"));
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  },
);

// Supprimer l'intercepteur qui lit dans localStorage
// Les appels doivent maintenant explicitement passer le token via authHeaders(token)

// src/lib/api.ts

// Fonctions mock pour simuler les appels API
export async function getJobs() {
  return [
    { id: 1, title: "Développeur Fullstack JS", company: "TechCorp" },
    { id: 2, title: "Chef de projet Marketing", company: "MarketPlus" },
  ];
}

export async function getCategories() {
  return [
    { id: 1, name: "Tech" },
    { id: 2, name: "Marketing" },
    { id: 3, name: "Santé" },
  ];
}

export async function getCVRequests() {
  return [
    {
      id: 1,
      name: "Alice Dupont",
      email: "alice@email.com",
      status: "En attente",
    },
    { id: 2, name: "Bob Martin", email: "bob@email.com", status: "Traité" },
  ];
}
