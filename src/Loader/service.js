

export async function apiGet(setLoading) {
  try {
    setLoading(true);
    const res = await fetch(`https://job-portal-my15.onrender.com`);
    const data = await res.json();
    return data;
  } finally {
    setLoading(false);
  }
}
