import { useEffect, useState } from "react";
import { getJobs, getCategories, getCVRequests } from "./api";

export function useJobs() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    getJobs()
      .then(setJobs)
      .catch(() => setError("Erreur lors du chargement des offres."))
      .finally(() => setLoading(false));
  }, []);
  return { jobs, loading, error };
}

export function useCategories() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(() => setError("Erreur lors du chargement des catégories."))
      .finally(() => setLoading(false));
  }, []);
  return { categories, loading, error };
}

export function useCVRequests() {
  const [cvRequests, setCVRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    getCVRequests()
      .then(setCVRequests)
      .catch(() => setError("Erreur lors du chargement des demandes de CV."))
      .finally(() => setLoading(false));
  }, []);
  return { cvRequests, loading, error };
}
