

export async function apiGet(setLoading) {
  try {
    setLoading(true);
    const res = await fetch(`https://job-portal-my15.onrender.com`);
  } finally {
    setLoading(false);
  }
}
