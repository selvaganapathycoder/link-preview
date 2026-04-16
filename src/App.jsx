import { useState, useEffect, useRef } from "react";

const MAX_HISTORY = 10;
const CHAR_LIMITS = {
  twitter:  { title: 70,  description: 200 },
  facebook: { title: 100, description: 300 },
  linkedin: { title: 150, description: 300 },
  whatsapp: { title: 65,  description: 180 },
  slack:    { title: 100, description: 200 },
  discord:  { title: 100, description: 200 },
};

const PLATFORMS = [
  {
    id: "twitter", label: "X",
    icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
  },
  {
    id: "facebook", label: "Facebook",
    icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>,
  },
  {
    id: "linkedin", label: "LinkedIn",
    icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
  },
  {
    id: "whatsapp", label: "WhatsApp",
    icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>,
  },
  {
    id: "slack", label: "Slack",
    icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/></svg>,
  },
  {
    id: "discord", label: "Discord",
    icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.07.107 18.086.116 18.086a19.745 19.745 0 0 0 5.975 2.98.078.078 0 0 0 .084-.026c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 5.977-2.98.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>,
  },
];

function ImgPlaceholder() {
  return (
    <div className="imgPlaceholder">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
      </svg>
      <span>No image</span>
    </div>
  );
}

function PreviewCard({ data, imgError, setImgError, platform }) {
  if (!data) return null;
  const hasImg = data.image?.url && !imgError;
  const domain = (() => {
    try { return new URL(data.url || data.inputUrl || "").hostname.replace("www.", ""); } catch { return data.url || ""; }
  })();

  const img = hasImg
    ? <img src={data.image.url} alt="Preview" className="cardImgFull" onError={() => setImgError(true)} />
    : <ImgPlaceholder />;

  if (platform === "twitter") return (
    <div className="twitterCard">
      {img}
      <div className="cardBody">
        <span className="cardDomain">{domain}</span>
        <p className="cardTitle">{data.title || "No title found"}</p>
        {data.description && <p className="cardDesc">{data.description}</p>}
      </div>
    </div>
  );

  if (platform === "facebook") return (
    <div className="fbCard">
      {img}
      <div className="fbBody">
        <span className="fbDomain">{domain}</span>
        <p className="fbTitle">{data.title || "No title found"}</p>
        {data.description && <p className="fbDesc">{data.description}</p>}
      </div>
    </div>
  );

  if (platform === "linkedin") return (
    <div className="liCard">
      {img}
      <div className="liBody">
        <p className="liTitle">{data.title || "No title found"}</p>
        <span className="liDomain">{domain}</span>
      </div>
    </div>
  );

  if (platform === "whatsapp") return (
    <div className="waCard">
      <div className="waAccent" />
      <div className="waInner">
        {hasImg && <img src={data.image.url} alt="Preview" className="waImg" onError={() => setImgError(true)} />}
        <div className="waBody">
          <p className="waTitle">{data.title || "No title found"}</p>
          {data.description && <p className="waDesc">{data.description}</p>}
          <span className="waDomain">{domain}</span>
        </div>
      </div>
    </div>
  );

  if (platform === "slack") return (
    <div className="slackCard">
      <div className="slackAccent" />
      <div className="slackBody">
        <p className="slackSite">{data.publisher || domain}</p>
        <p className="slackTitle">{data.title || "No title found"}</p>
        {data.description && <p className="slackDesc">{data.description}</p>}
        {hasImg && <img src={data.image.url} alt="Preview" className="slackImg" onError={() => setImgError(true)} />}
      </div>
    </div>
  );

  if (platform === "discord") return (
    <div className="discordCard">
      <div className="discordAccent" />
      <div className="discordBody">
        <p className="discordSite">{data.publisher || domain}</p>
        <p className="discordTitle">{data.title || "No title found"}</p>
        {data.description && <p className="discordDesc">{data.description}</p>}
        {hasImg && <img src={data.image.url} alt="Preview" className="discordImg" onError={() => setImgError(true)} />}
      </div>
    </div>
  );

  return null;
}

function getScore(d) {
  if (!d) return 0;
  let s = 0;
  if (d.title) s += 25;
  if (d.description) s += 25;
  if (d.image?.url) s += 30;
  if (d.url) s += 10;
  if (d.publisher) s += 10;
  return s;
}

function scoreColor(s) {
  return s >= 80 ? "var(--success)" : s >= 50 ? "#f59e0b" : "var(--error)";
}

async function fetchMicrolink(rawUrl) {
  let u = rawUrl.trim();
  if (!u.startsWith("http://") && !u.startsWith("https://")) u = "https://" + u;
  try { new URL(u); } catch { throw new Error("invalid"); }
  const res = await fetch(`https://api.microlink.io/?url=${encodeURIComponent(u)}`);
  const json = await res.json();
  if (json.status === "success" || json.status === "partial") return { ...json.data, inputUrl: u };
  throw new Error("failed");
}

export default function App() {
  const [mode, setMode] = useState("single");
  const [lightMode, setLightMode] = useState(false);

  // Single
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState("preview");
  const [activePlatform, setActivePlatform] = useState("twitter");
  const [copied, setCopied] = useState("");
  const [imgError, setImgError] = useState(false);
  const [editedData, setEditedData] = useState(null);

  // Compare
  const [urlB, setUrlB] = useState("");
  const [loadingB, setLoadingB] = useState(false);
  const [errorB, setErrorB] = useState("");
  const [dataB, setDataB] = useState(null);
  const [imgErrorB, setImgErrorB] = useState(false);
  const [comparePlatform, setComparePlatform] = useState("twitter");

  // Bulk
  const [bulkInput, setBulkInput] = useState("");
  const [bulkLoading, setBulkLoading] = useState(false);
  const [bulkResults, setBulkResults] = useState([]);

  // History
  const [history, setHistory] = useState(() => {
    try { return JSON.parse(localStorage.getItem("lp_history") || "[]"); } catch { return []; }
  });
  const [showHistory, setShowHistory] = useState(false);

  const inputRef = useRef(null);

  // Read ?url= on mount
  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get("url");
    if (p) setUrl(p);
  }, []);

  // Light mode
  useEffect(() => {
    document.body.classList.toggle("light", lightMode);
  }, [lightMode]);

  // Keyboard shortcuts
  useEffect(() => {
    function onKey(e) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.select();
      }
      if (e.key === "Escape") setShowHistory(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function addToHistory(entry) {
    setHistory(prev => {
      const next = [entry, ...prev.filter(h => h.url !== entry.url)].slice(0, MAX_HISTORY);
      localStorage.setItem("lp_history", JSON.stringify(next));
      return next;
    });
  }

  async function fetchSingle() {
    if (!url.trim()) { setError("Please enter a URL"); return; }
    setLoading(true);
    setError("");
    setData(null);
    setEditedData(null);
    setImgError(false);
    setActiveTab("preview");
    try {
      const result = await fetchMicrolink(url);
      setData(result);
      setEditedData({ title: result.title || "", description: result.description || "", image: result.image?.url || "" });
      addToHistory({ url: result.inputUrl, title: result.title });
      const params = new URLSearchParams();
      params.set("url", result.inputUrl);
      window.history.replaceState({}, "", "?" + params.toString());
    } catch (err) {
      setError(err.message === "invalid" ? "Please enter a valid URL" : "Could not fetch preview. The site may block scraping.");
    } finally {
      setLoading(false);
    }
  }

  async function fetchB() {
    if (!urlB.trim()) { setErrorB("Please enter a URL"); return; }
    setLoadingB(true);
    setErrorB("");
    setDataB(null);
    setImgErrorB(false);
    try {
      const result = await fetchMicrolink(urlB);
      setDataB(result);
    } catch (err) {
      setErrorB(err.message === "invalid" ? "Please enter a valid URL" : "Could not fetch preview.");
    } finally {
      setLoadingB(false);
    }
  }

  async function fetchBulk() {
    const lines = bulkInput.split("\n").map(l => l.trim()).filter(Boolean);
    if (!lines.length) return;
    setBulkLoading(true);
    setBulkResults([]);
    const acc = [];
    for (const line of lines) {
      try {
        const r = await fetchMicrolink(line);
        acc.push({ url: line, data: r, error: null });
      } catch {
        acc.push({ url: line, data: null, error: "Failed" });
      }
      setBulkResults([...acc]);
    }
    setBulkLoading(false);
  }

  function reset() {
    setUrl(""); setData(null); setEditedData(null); setError("");
    setCopied(""); setImgError(false); setActiveTab("preview");
    setActivePlatform("twitter");
    window.history.replaceState({}, "", window.location.pathname);
  }

  async function copy(value) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(value);
      setTimeout(() => setCopied(""), 2000);
    } catch {}
  }

  function getDomain(raw) {
    try { return new URL(raw).hostname.replace("www.", ""); } catch { return raw; }
  }

  const displayData = data && editedData ? {
    ...data,
    title: editedData.title,
    description: editedData.description,
    image: editedData.image ? { url: editedData.image } : data.image,
  } : data;

  const hasImage = displayData?.image?.url && !imgError;

  const tags = displayData ? [
    { name: "og:title",       value: displayData.title },
    { name: "og:description", value: displayData.description },
    { name: "og:image",       value: displayData.image?.url },
    { name: "og:url",         value: displayData.url },
    { name: "og:site_name",   value: displayData.publisher },
    { name: "twitter:card",   value: hasImage ? "summary_large_image" : "summary" },
    { name: "twitter:title",  value: displayData.title },
    { name: "twitter:description", value: displayData.description },
    { name: "twitter:image",  value: displayData.image?.url },
  ].filter(t => t.value) : [];

  function charWarn(field, platform) {
    const limit = CHAR_LIMITS[platform]?.[field];
    if (!limit || !editedData) return null;
    const len = (editedData[field] || "").length;
    if (len > limit) return { text: `${len}/${limit} — too long`, over: true };
    if (len > limit * 0.88) return { text: `${len}/${limit}`, over: false };
    return null;
  }

  const score = getScore(data);

  return (
    <div className="page">
      {/* Top bar */}
      <div className="topBar">
        <div className="modeSelector">
          {[["single","Single"],["compare","Compare"],["bulk","Bulk"]].map(([m, label]) => (
            <button key={m} className={`modeBtn ${mode === m ? "modeBtnActive" : ""}`} onClick={() => setMode(m)}>
              {label}
            </button>
          ))}
        </div>
        <div className="topActions">
          <button className="iconBtn" onClick={() => setShowHistory(s => !s)} aria-label="History">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
          </button>
          <button className="iconBtn" onClick={() => setLightMode(l => !l)} aria-label="Toggle theme">
            {lightMode ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* History panel */}
      {showHistory && (
        <div className="historyPanel">
          {history.length === 0 ? (
            <p className="historyEmpty">No history yet.</p>
          ) : (
            <>
              <div className="historyHeader">
                <span>Recent</span>
                <button className="clearHistoryBtn" onClick={() => { setHistory([]); localStorage.removeItem("lp_history"); }}>Clear all</button>
              </div>
              {history.map(h => (
                <button key={h.url} className="historyItem" onClick={() => { setUrl(h.url); setMode("single"); setShowHistory(false); }}>
                  <span className="historyUrl">{h.url}</span>
                  {h.title && <span className="historyTitle">{h.title}</span>}
                </button>
              ))}
            </>
          )}
        </div>
      )}

      <div className={`shell ${mode === "compare" ? "shellWide" : ""}`}>

        {/* ── SINGLE MODE ── */}
        {mode === "single" && (
          <main className="card">
            <header className="header">
              <div className="iconWrap">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                </svg>
              </div>
              <h1 className="title">Link Preview</h1>
              <p className="subtitle">See how your link looks before sharing it.</p>
            </header>

            <div className="inputGroup">
              <label className="label" htmlFor="url-input">
                URL <span className="shortcut">⌘K</span>
              </label>
              <div className="inputWrapper">
                <input
                  id="url-input"
                  ref={inputRef}
                  type="url"
                  className="input"
                  placeholder="https://example.com"
                  value={url}
                  onChange={e => { setUrl(e.target.value); setError(""); }}
                  onKeyDown={e => e.key === "Enter" && fetchSingle()}
                  aria-label="Enter URL to preview"
                />
                {url && (
                  <button className="clearBtn" onClick={() => { setUrl(""); setError(""); }} aria-label="Clear input">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </button>
                )}
              </div>
              {error && <p className="errorText">{error}</p>}
            </div>

            <button className="btnPrimary" onClick={fetchSingle} disabled={loading || !url.trim()} aria-label="Fetch preview">
              {loading ? <span className="loadingDots"><span/><span/><span/></span> : "Preview"}
            </button>

            {data && (
              <div className="results" key={data.inputUrl}>
                {/* Score row */}
                <div className="scoreRow">
                  <span className="scoreLabel">OG Score</span>
                  <div className="scoreBarWrap">
                    <div className="scoreBar" style={{ width: `${score}%`, background: scoreColor(score) }} />
                  </div>
                  <span className="scoreValue" style={{ color: scoreColor(score) }}>{score}<span className="scoreDenom">/100</span></span>
                  <button className="shareBtn" onClick={() => copy(window.location.href)} title="Copy shareable link" aria-label="Copy shareable link">
                    {copied === window.location.href ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    ) : (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
                        <polyline points="16 6 12 2 8 6"/>
                        <line x1="12" y1="2" x2="12" y2="15"/>
                      </svg>
                    )}
                  </button>
                </div>

                {/* Tabs */}
                <div className="tabsRow">
                  <div className="tabs">
                    {[["preview","Preview"],["tags","OG Tags"],["edit","Edit"]].map(([t, label]) => (
                      <button key={t} className={`tab ${activeTab === t ? "tabActive" : ""}`} onClick={() => setActiveTab(t)}>{label}</button>
                    ))}
                  </div>
                  <button className="newBtn" onClick={reset} aria-label="New preview">+ New</button>
                </div>

                {/* Preview tab */}
                {activeTab === "preview" && (
                  <div className="previewPane">
                    <div className="platformPills">
                      {PLATFORMS.map(p => (
                        <button key={p.id} className={`pill ${activePlatform === p.id ? "pillActive" : ""}`} onClick={() => setActivePlatform(p.id)}>
                          {p.icon} {p.label}
                        </button>
                      ))}
                    </div>

                    <PreviewCard data={displayData} imgError={imgError} setImgError={setImgError} platform={activePlatform} />

                    {/* Char warnings */}
                    {editedData && (() => {
                      const tw = charWarn("title", activePlatform);
                      const dw = charWarn("description", activePlatform);
                      return (tw || dw) ? (
                        <div className="charWarnings">
                          {tw && <span className={`charWarn ${tw.over ? "charOver" : "charNear"}`}>Title: {tw.text}</span>}
                          {dw && <span className={`charWarn ${dw.over ? "charOver" : "charNear"}`}>Desc: {dw.text}</span>}
                        </div>
                      ) : null;
                    })()}

                    {/* Badges */}
                    <div className="statusRow">
                      <span className={`badge ${displayData.title ? "badgeGood" : "badgeMiss"}`}>{displayData.title ? "✓ Title" : "✗ Title"}</span>
                      <span className={`badge ${displayData.description ? "badgeGood" : "badgeMiss"}`}>{displayData.description ? "✓ Description" : "✗ Description"}</span>
                      <span className={`badge ${hasImage ? "badgeGood" : "badgeMiss"}`}>{hasImage ? "✓ Image" : "✗ Image"}</span>
                    </div>
                  </div>
                )}

                {/* OG Tags tab */}
                {activeTab === "tags" && (
                  <div className="tagsList">
                    {tags.length === 0 && <p className="noTags">No OG tags detected.</p>}
                    {tags.map(tag => (
                      <div key={tag.name} className="tagRow">
                        <div className="tagInfo">
                          <span className="tagName">{tag.name}</span>
                          {tag.name.includes("image") ? (
                            <a href={tag.value} target="_blank" rel="noreferrer" className="tagValue tagLink" title={tag.value}>{tag.value}</a>
                          ) : (
                            <span className="tagValue" title={tag.value}>{tag.value}</span>
                          )}
                        </div>
                        <button className="tagCopyBtn" onClick={() => copy(tag.value)} aria-label={`Copy ${tag.name}`}>
                          {copied === tag.value ? (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                          ) : (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                            </svg>
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Edit tab */}
                {activeTab === "edit" && editedData && (
                  <div className="editPane">
                    <p className="editNote">Edit values and switch to Preview to see how they look.</p>
                    <div className="editField">
                      <label className="label">Title</label>
                      <input aria-label="Edit title" className="input" value={editedData.title} onChange={e => setEditedData(d => ({ ...d, title: e.target.value }))} placeholder="Page title" />
                    </div>
                    <div className="editField">
                      <label className="label">Description</label>
                      <textarea className="input editTextarea" value={editedData.description} onChange={e => setEditedData(d => ({ ...d, description: e.target.value }))} placeholder="Page description" rows={3} />
                    </div>
                    <div className="editField">
                      <label className="label">Image URL</label>
                      <input aria-label="Edit image URL" className="input" value={editedData.image} onChange={e => { setEditedData(d => ({ ...d, image: e.target.value })); setImgError(false); }} placeholder="https://..." />
                    </div>
                    <button className="btnSecondary" onClick={() => { setEditedData({ title: data.title || "", description: data.description || "", image: data.image?.url || "" }); setImgError(false); }}>
                      Reset to original
                    </button>
                  </div>
                )}
              </div>
            )}
          </main>
        )}

        {/* ── COMPARE MODE ── */}
        {mode === "compare" && (
          <div className="compareLayout">
            {[
              { label: "URL A", url, setUrl, loading, error, fetch: fetchSingle, data, imgError, setImgError },
              { label: "URL B", url: urlB, setUrl: setUrlB, loading: loadingB, error: errorB, fetch: fetchB, data: dataB, imgError: imgErrorB, setImgError: setImgErrorB },
            ].map((col, i) => (
              <div key={i} className="compareCol">
                <div className="card">
                  <p className="compareLabel">{col.label}</p>
                  <div className="inputGroup">
                    <div className="inputWrapper">
                      <input
                        type="url"
                        className="input"
                        placeholder="https://example.com"
                        value={col.url}
                        onChange={e => { col.setUrl(e.target.value); }}
                        onKeyDown={e => e.key === "Enter" && col.fetch()}
                        aria-label={`Enter ${col.label}`}
                      />
                    </div>
                    {col.error && <p className="errorText">{col.error}</p>}
                  </div>
                  <button className="btnPrimary" onClick={col.fetch} disabled={col.loading || !col.url.trim()}>
                    {col.loading ? <span className="loadingDots"><span/><span/><span/></span> : "Preview"}
                  </button>

                  {col.data && (
                    <div className="results" key={col.data.inputUrl}>
                      <div className="scoreRow">
                        <span className="scoreLabel">Score</span>
                        <div className="scoreBarWrap">
                          <div className="scoreBar" style={{ width: `${getScore(col.data)}%`, background: scoreColor(getScore(col.data)) }} />
                        </div>
                        <span className="scoreValue" style={{ color: scoreColor(getScore(col.data)) }}>{getScore(col.data)}<span className="scoreDenom">/100</span></span>
                      </div>
                      <div className="platformPills">
                        {PLATFORMS.slice(0, 3).map(p => (
                          <button key={p.id} className={`pill ${comparePlatform === p.id ? "pillActive" : ""}`} onClick={() => setComparePlatform(p.id)}>
                            {p.icon} {p.label}
                          </button>
                        ))}
                      </div>
                      <PreviewCard data={col.data} imgError={col.imgError} setImgError={col.setImgError} platform={comparePlatform} />
                      <div className="statusRow">
                        <span className={`badge ${col.data.title ? "badgeGood" : "badgeMiss"}`}>{col.data.title ? "✓ Title" : "✗ Title"}</span>
                        <span className={`badge ${col.data.description ? "badgeGood" : "badgeMiss"}`}>{col.data.description ? "✓ Desc" : "✗ Desc"}</span>
                        <span className={`badge ${col.data.image?.url ? "badgeGood" : "badgeMiss"}`}>{col.data.image?.url ? "✓ Image" : "✗ Image"}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── BULK MODE ── */}
        {mode === "bulk" && (
          <main className="card">
            <header className="header">
              <div className="iconWrap">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
                  <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
                </svg>
              </div>
              <h1 className="title">Bulk Check</h1>
              <p className="subtitle">One URL per line — check multiple links at once.</p>
            </header>

            <div className="inputGroup">
              <label className="label">URLs</label>
              <textarea
                className="input bulkTextarea"
                placeholder={"https://example.com\nhttps://google.com\nhttps://github.com"}
                value={bulkInput}
                onChange={e => setBulkInput(e.target.value)}
                rows={5}
              />
            </div>

            <button
              className="btnPrimary"
              onClick={fetchBulk}
              disabled={bulkLoading || !bulkInput.trim()}
            >
              {bulkLoading
                ? <span className="loadingDots"><span/><span/><span/></span>
                : `Check ${bulkInput.split("\n").filter(l => l.trim()).length} URL${bulkInput.split("\n").filter(l => l.trim()).length !== 1 ? "s" : ""}`
              }
            </button>

            {bulkResults.length > 0 && (
              <div className="bulkResults">
                {bulkResults.map((r, i) => {
                  const s = getScore(r.data);
                  return (
                    <div key={i} className={`bulkRow ${r.error ? "bulkRowError" : ""}`}>
                      <div className="bulkRowTop">
                        <span className="bulkDomain">{getDomain(r.url)}</span>
                        {r.data && (
                          <span className="scoreChip" style={{ color: scoreColor(s), borderColor: scoreColor(s) }}>{s}/100</span>
                        )}
                        {r.error && <span className="scoreChip" style={{ color: "var(--error)", borderColor: "var(--error)" }}>Failed</span>}
                      </div>
                      {r.data?.title && <p className="bulkTitle">{r.data.title}</p>}
                      {r.data && (
                        <div className="statusRow">
                          <span className={`badge ${r.data.title ? "badgeGood" : "badgeMiss"}`}>{r.data.title ? "✓ Title" : "✗ Title"}</span>
                          <span className={`badge ${r.data.description ? "badgeGood" : "badgeMiss"}`}>{r.data.description ? "✓ Desc" : "✗ Desc"}</span>
                          <span className={`badge ${r.data.image?.url ? "badgeGood" : "badgeMiss"}`}>{r.data.image?.url ? "✓ Image" : "✗ Image"}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </main>
        )}
      </div>

      <footer className="credit">
        <a className="creditLink" href="https://instagram.com/berkindev" target="_blank" rel="noreferrer">
          Coded by @berkindev
        </a>
      </footer>
    </div>
  );
}
