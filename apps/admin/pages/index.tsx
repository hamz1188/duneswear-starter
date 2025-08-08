import { useEffect } from 'react';

export default function AdminHome() {
  useEffect(() => {
    // App Bridge can be wired here for embedded context
  }, []);

  return (
    <main style={{ padding: 24 }}>
      <h1>Duneswear Admin</h1>
      <p>Embedded app shell. Add Drop Builder and Waitlists here.</p>
    </main>
  );
}
