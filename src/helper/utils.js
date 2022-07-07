export async function myFetch(url, method = 'GET', data = null) {
  try {
    const options = {
      headers: { 'Content-Type': 'application/json' },
    };
    options.method = method === 'POST' ? 'POST' : 'GET';
    options.body = data ? JSON.stringify(data) : null;
    const resp = await fetch(url, options);
    const dataInJs = await resp.json();
    return dataInJs;
  } catch (error) {}
}

export async function myFetchAuth(url, token) {
  try {
    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const resp = await fetch(url, options);
    const dataInJs = await resp.json();
    return dataInJs;
  } catch (error) {}
}

export const baseUrl = 'https://autumn-delicate-wilderness.glitch.me/v1/auth';
if (!baseUrl) throw new Error('baseUrl nerastas');

export const baseUrlSkills =
  'https://autumn-delicate-wilderness.glitch.me/v1/content/skills';
if (!baseUrl) throw new Error('baseUrl nerastas');
