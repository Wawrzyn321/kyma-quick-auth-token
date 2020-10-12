const currentTabQuery = {
  currentWindow: true,
  active: true,
};

function getDomain(url) {
    const regex = /:\/\/(.[^/]+)/;
    if (url.match(regex) && url.match(regex)[1]) {
        url = url.match(regex)[1];
    }
    return url;
}

function popup() {
  chrome.tabs.query(currentTabQuery, (foundTabs) => {
    const domain = getDomain(foundTabs[0].url);

    chrome.storage.sync.get([domain], (v) => {
      if (!v[domain]) return;
      navigator.clipboard.writeText(v[domain]).then(
        () => window.close(),
        () => alert("smutek, nie udalo sie: " + v[domain])
      );
    });
  });
}

window.addEventListener("DOMContentLoaded", () =>
  document.getElementById("btn").addEventListener("click", popup)
);
