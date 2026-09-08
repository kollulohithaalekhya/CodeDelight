import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Editor from "@monaco-editor/react";
import Header from "../components/HeaderSection";
import { get, post, API_BASE } from "../api/client";
import { useAuth } from "../context/AuthContext";
import "../styles/ProblemArena.css";

const TABS = [
  { key: "html", label: "HTML", icon: "fa-brands fa-html5", color: "#e34f26", monaco: "html" },
  { key: "css", label: "CSS", icon: "fa-brands fa-css3-alt", color: "#2965f1", monaco: "css" },
  { key: "js", label: "JS", icon: "fa-brands fa-js", color: "#e0c810", monaco: "javascript" },
];

const EDITOR_OPTIONS = {
  minimap: { enabled: false },
  automaticLayout: true,
  scrollBeyondLastLine: false,
  wordWrap: "on",
  padding: { top: 12 },
  fontSize: 14,
};

export default function BuildTaskSolve() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { refresh } = useAuth();

  const [task, setTask] = useState(null);
  const [error, setError] = useState("");
  const [code, setCode] = useState({ html: "", css: "", js: "" });
  const [activeTab, setActiveTab] = useState("html");
  const [view, setView] = useState("split"); // split | editor | preview (mobile)
  const [showRef, setShowRef] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null); // { results, allRequiredPassed, reward, ... }
  const outputRef = useRef(null);

  useEffect(() => {
    get(`/api/build-tasks/${id}`)
      .then((d) => {
        setTask(d.task);
        const s = d.task.starter || {};
        setCode({ html: s.html || "", css: s.css || "", js: s.js || "" });
      })
      .catch((e) => setError(e.message));
  }, [id]);

  const render = () => {
    if (!outputRef.current) return;
    const doc = outputRef.current.contentDocument;
    const full = `<!DOCTYPE html><html><head><style>html,body{height:100%;margin:0;padding:0;overflow:auto;}${code.css}</style></head><body>${code.html}<script>${code.js}<\/script></body></html>`;
    doc.open();
    doc.write(full);
    doc.close();
  };

  // Live preview (debounced).
  useEffect(() => {
    const t = setTimeout(render, 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  const update = (key, val) => setCode((c) => ({ ...c, [key]: val ?? "" }));

  const doSubmit = async () => {
    setSubmitting(true);
    setResult(null);
    try {
      const d = await post(`/api/build-tasks/${id}/submit`, code);
      setResult(d);
      if (d.reward) {
        await refresh();
        setTask((t) => (t ? { ...t, solved: true } : t));
      }
    } catch (e) {
      setResult({ error: e.message });
    } finally {
      setSubmitting(false);
    }
  };

  if (error) {
    return (
      <>
        <Header />
        <div className="pa"><div className="ps-state">
          <h2>Couldn't load this task</h2>
          <p>{error}</p>
          <button className="ps-btn" onClick={() => navigate("/practice/build")}>Back to Build Tasks</button>
        </div></div>
      </>
    );
  }
  if (!task) return (<><Header /><div className="pa"><div className="ps-state">Loading task…</div></div></>);

  if (!task.unlocked) {
    return (
      <>
        <Header />
        <div className="pa"><div className="ps-state">
          <div className="ps-lock-emoji">🔒</div>
          <h2>This task is locked</h2>
          <p>Build more tasks in the previous level to unlock <strong>{task.level}</strong>.</p>
          <button className="ps-btn" onClick={() => navigate("/practice/build")}>Back to Build Tasks</button>
        </div></div>
      </>
    );
  }

  const active = TABS.find((t) => t.key === activeTab);
  const reward = result?.reward;
  const pdfUrl = task.referencePdf ? `${API_BASE}${task.referencePdf}` : null;

  return (
    <>
      <Header />
      <div className="bt">
        <div className="bt-topbar">
          <div className="bt-topbar-left">
            <button className="ps-back" onClick={() => navigate("/practice/build")}>← Build Tasks</button>
            <div className="bt-title-row">
              <h1>{task.title}</h1>
              <span className={`pa-badge ${task.level.toLowerCase()}`}>{task.level}</span>
              {task.solved && <span className="ps-solved"><i className="fa-solid fa-circle-check" /> Built</span>}
            </div>
          </div>
          <div className="bt-topbar-right">
            {pdfUrl && (
              <button className="bt-ref-btn" onClick={() => setShowRef(true)}>
                <i className="fa-solid fa-file-pdf" /> View Reference
              </button>
            )}
            <button className="ps-btn" onClick={doSubmit} disabled={submitting}>
              {submitting ? "Checking…" : <>Submit <i className="fa-solid fa-paper-plane" /></>}
            </button>
          </div>
        </div>

        {task.brief && <p className="bt-brief">{task.brief}</p>}

        {/* Checklist preview (labels only) */}
        {!result && task.checklist?.length > 0 && (
          <div className="bt-checklist">
            <h3><i className="fa-solid fa-list-check" /> Requirements</h3>
            <ul>
              {task.checklist.map((c, i) => (
                <li key={i} className={c.required ? "" : "optional"}>
                  <i className="fa-regular fa-circle" /> {c.label}
                  {!c.required && <span className="bt-opt-tag">optional</span>}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="bt-mobiletabs">
          <button className={view === "editor" ? "active" : ""} onClick={() => setView("editor")}><i className="fa-solid fa-code" /> Editor</button>
          <button className={view === "preview" ? "active" : ""} onClick={() => setView("preview")}><i className="fa-solid fa-eye" /> Preview</button>
        </div>

        <div className="bt-workspace">
          <section className={`bt-editors ${view === "preview" ? "hide-mobile" : ""}`}>
            <div className="bt-tabs">
              {TABS.map((t) => (
                <button
                  key={t.key}
                  className={`bt-tab ${activeTab === t.key ? "active" : ""}`}
                  onClick={() => setActiveTab(t.key)}
                  style={activeTab === t.key ? { "--tab": t.color } : undefined}
                >
                  <i className={t.icon} style={{ color: t.color }} /> {t.label}
                </button>
              ))}
            </div>
            <div className="bt-editor-body">
              <Editor
                height="100%"
                width="100%"
                language={active.monaco}
                path={active.key}
                theme="vs-dark"
                value={code[active.key]}
                onChange={(v) => update(active.key, v)}
                options={EDITOR_OPTIONS}
              />
            </div>
          </section>

          <section className={`bt-preview ${view === "editor" ? "hide-mobile" : ""}`}>
            <div className="bt-preview-head"><i className="fa-solid fa-eye" /> Live Preview</div>
            <div className="bt-preview-frame">
              <iframe title="output" ref={outputRef} />
            </div>
          </section>
        </div>

        {/* Submission results */}
        {result && (
          <div className="bt-results">
            {result.error ? (
              <div className="ps-result-err">{result.error}</div>
            ) : (
              <>
                {reward && reward.alreadySolved && (
                  <div className="ps-banner info">✓ All requirements met — you'd already built this one, so no extra coins.</div>
                )}
                {reward && !reward.alreadySolved && (
                  <div className="ps-banner win">🎉 Passed! +{reward.coinsAwarded} coins{reward.starsAwarded ? ` · +${reward.starsAwarded} ⭐` : ""} · Balance {reward.newBalance} 🪙</div>
                )}
                {reward?.newBadges?.length > 0 && (
                  <div className="ps-badges">
                    {reward.newBadges.map((b) => (
                      <span className="ps-badge-won" key={b.code}><i className={b.icon || "fa-solid fa-medal"} /> Badge unlocked: <strong>{b.name}</strong></span>
                    ))}
                  </div>
                )}
                {!result.allRequiredPassed && (
                  <div className="ps-banner lose">
                    {result.requiredPassed}/{result.requiredTotal} required checks passed — keep refining your build!
                  </div>
                )}
                <div className="bt-check-results">
                  {result.results.map((r, i) => (
                    <div className={`bt-check ${r.passed ? "pass" : "fail"} ${r.required ? "" : "optional"}`} key={i}>
                      <i className={r.passed ? "fa-solid fa-circle-check" : "fa-solid fa-circle-xmark"} />
                      <span>{r.label}</span>
                      {!r.required && <span className="bt-opt-tag">optional</span>}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Reference PDF modal */}
      {showRef && pdfUrl && (
        <div className="bt-modal" onClick={() => setShowRef(false)}>
          <div className="bt-modal-body" onClick={(e) => e.stopPropagation()}>
            <div className="bt-modal-head">
              <span><i className="fa-solid fa-file-pdf" /> Reference — {task.title}</span>
              <div className="bt-modal-actions">
                <a href={pdfUrl} target="_blank" rel="noreferrer" className="bt-modal-open"><i className="fa-solid fa-up-right-from-square" /> Open in tab</a>
                <button onClick={() => setShowRef(false)} className="bt-modal-close"><i className="fa-solid fa-xmark" /></button>
              </div>
            </div>
            <iframe title="reference" src={pdfUrl} className="bt-modal-pdf" />
          </div>
        </div>
      )}
    </>
  );
}
