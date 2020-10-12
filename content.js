const auth = sessionStorage.getItem("luigi.auth") || {};
const token = JSON.parse(auth).accessToken;

if (token) {
  const header = `Bearer ${token}`;
  chrome.storage.sync.set({ [getDomain()]: header }, () => {});
}

function getDomain() {
  const regex = /:\/\/(.[^/]+)/;
  const url = location.href;
  return url.match(regex) && url.match(regex)[1] || url;
}

