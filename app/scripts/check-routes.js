const fetch = globalThis.fetch || require('node-fetch');

const routes = ['/', '/cars', '/login', '/register', '/my-bookings'];

async function check() {
  for (const r of routes) {
    try {
      const res = await fetch(`http://localhost:3000${r}`);
      console.log(r, res.status);
    } catch (e) {
      console.log(r, 'error', e.message);
    }
  }
}

check();
