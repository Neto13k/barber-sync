import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/",
  headers: {
    "Content-Type": "application/json",
  },
});


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // 401 (Não autorizado) ou 403 (Proibido/Token expirado)
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      const currentPath = window.location.pathname;
      
      // Evita loop infinito se já estiver na tela de login
      if (currentPath !== "/login") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        
        // Redireciona para o login apenas se não for uma tentativa de login falha
        if (!error.config.url?.includes("/users/login")) {
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  }
);