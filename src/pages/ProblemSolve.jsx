import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Editor from "@monaco-editor/react";
import Header from "../components/HeaderSection";
import { get, post } from "../api/client";
import { useAuth } from "../context/AuthContext";
import "../styles/ProblemArena.css";

// Language options for the solver + starter templates that already read stdin.
const LANGS = {
  python: {
    label: "Python", monaco: "python",
    starter: `import sys\n\ndata = sys.stdin.read().split()\n# TODO: solve using the input\nprint()`,
  },
  javascript: {
    label: "JavaScript", monaco: "javascript",
    starter: `let input = "";\nprocess.stdin.on("data", d => input += d);\nprocess.stdin.on("end", () => {\n  const data = input.split(/\\s+/);\n  // TODO: solve using the input\n  console.log();\n});`,
  },
  c: {
    label: "C", monaco: "c",
    starter: `#include <stdio.h>\n\nint main() {\n    // TODO: read input with scanf and print the answer\n    return 0;\n}`,
  },
  cpp: {
    label: "C++", monaco: "cpp",
    starter: `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // TODO: read input with cin and print the answer\n    return 0;\n}`,
  },
  java: {
    label: "Java", monaco: "java",
    starter: `import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // TODO: read input and print the answer\n    }\n}`,
  },
};

export default function ProblemSolve() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { refresh } = useAuth();

  const [problem, setProblem] = useState(null);
  const [error, setError] = useState("");
  const [language, setLanguage] = useState("python");
  const [codeByLang, setCodeByLang] = useState({});
  const [running, setRunning] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [results, setResults] = useState(null); // { mode, results, allPassed, reward }
  const [tab, setTab] = useState("statement"); // mobile: statement | code
  const editorRef = useRef(null);

  useEffect(() => {
    get(`/api/problems/${id}`)
      .then((d) => setProblem(d.problem))
      .catch((e) => setError(e.message));
  }, [id]);

  const code = codeByLang[language] ?? LANGS[language].starter;
  const setCode = (v) => setCodeByLang((m) => ({ ...m, [language]: v ?? "" }));

  const doRun = async (mode) => {
    const busy = mode === "submit" ? setSubmitting : setRunning;
    busy(true);
    setResults(null);
    try {
      const d = await post(`/api/problems/${id}/${mode}`, { code, language });
      setResults(d);
      if (mode === "submit" && d.reward) {
        await refresh(); // sync coin balance
        setProblem((p) => (p ? { ...p, solved: true } : p));
      }
    } catch (e) {
      setResults({ error: e.message });
    } finally {
      busy(false);
    }
  };

  if (error) {
    return (
      <>
        <Header />
        <div className="pa"><div className="ps-state">
          <h2>Couldn't load this problem</h2>
          <p>{error}</p>
          <button className="ps-btn" onClick={() => navigate("/practice/problems")}>Back to Practice Arena</button>
        </div></div>
      </>
    );
  }
  if (!problem) return (<><Header /><div className="pa"><div className="ps-state">Loading problem…</div></div></>);

  if (!problem.unlocked) {
    return (
      <>
        <Header />
        <div className="pa"><div className="ps-state">
          <div className="ps-lock-emoji">🔒</div>
          <h2>This problem is locked</h2>
          <p>Solve more problems in the previous level to unlock <strong>{problem.level}</strong>.</p>
          <button className="ps-btn" onClick={() => navigate("/practice/problems")}>Back to Practice Arena</button>
        </div></div>
      </>
    );
  }

  const reward = results?.reward;

  return (
    <>
      <Header />
      <div className="ps">
        <div className="ps-mobiletabs">
          <button className={tab === "statement" ? "active" : ""} onClick={() => setTab("statement")}><i className="fa-solid fa-file-lines" /> Problem</button>
          <button className={tab === "code" ? "active" : ""} onClick={() => setTab("code")}><i className="fa-solid fa-code" /> Code</button>
        </div>

        <div className="ps-grid">
          {/* Statement */}
          <div className={`ps-left ${tab === "statement" ? "show" : ""}`}>
            <button className="ps-back" onClick={() => navigate("/practice/problems")}>← Practice Arena</button>
            <div className="ps-title-row">
              <h1>{problem.title}</h1>
              <span className={`pa-badge ${problem.level.toLowerCase()}`}>{problem.level}</span>
            </div>
            <div className="ps-reward-row">
              <span><i className="fa-solid fa-coins" /> +{problem.reward.coins} coins</span>
              {problem.reward.stars ? <span className="star"><i className="fa-solid fa-star" /> +{problem.reward.stars}</span> : null}
              {problem.solved && <span className="ps-solved"><i className="fa-solid fa-circle-check" /> Solved</span>}
            </div>

            <div className="ps-statement" dangerouslySetInnerHTML={{ __html: problem.statement }} />

            <h3 className="ps-sub">Sample Test Cases</h3>
            {problem.sampleInputs.map((s, i) => (
              <div className="ps-sample" key={i}>
                <div><span>Input</span><pre>{s.input}</pre></div>
                <div><span>Expected Output</span><pre>{s.output}</pre></div>
              </div>
            ))}
            <p className="ps-hidden-note"><i className="fa-solid fa-eye-slash" /> Plus {problem.hiddenCount} hidden test case{problem.hiddenCount === 1 ? "" : "s"} on submit.</p>
          </div>

          {/* Editor + results */}
          <div className={`ps-right ${tab === "code" ? "show" : ""}`}>
            <div className="ps-toolbar">
              <select value={language} onChange={(e) => setLanguage(e.target.value)} className="ps-lang">
                {problem.languages.filter((l) => LANGS[l]).map((l) => (
                  <option key={l} value={l}>{LANGS[l].label}</option>
                ))}
              </select>
              <div className="ps-actions">
                <button className="ps-btn ghost" onClick={() => doRun("run")} disabled={running || submitting}>
                  {running ? "Running…" : <>Run <i className="fa-solid fa-play" /></>}
                </button>
                <button className="ps-btn" onClick={() => doRun("submit")} disabled={running || submitting}>
                  {submitting ? "Submitting…" : <>Submit <i className="fa-solid fa-paper-plane" /></>}
                </button>
              </div>
            </div>

            <div className="ps-editor">
              <Editor
                height="100%"
                language={LANGS[language].monaco}
                theme="vs-dark"
                value={code}
                onChange={setCode}
                onMount={(ed) => (editorRef.current = ed)}
                options={{ fontSize: 14, minimap: { enabled: false }, scrollBeyondLastLine: false, automaticLayout: true }}
              />
            </div>

            {/* Results */}
            {results && (
              <div className="ps-results">
                {results.error ? (
                  <div className="ps-result-err">{results.error}</div>
                ) : (
                  <>
                    {reward && reward.alreadySolved && (
                      <div className="ps-banner info">✓ All tests passed — you'd already solved this one, so no extra coins.</div>
                    )}
                    {reward && !reward.alreadySolved && (
                      <div className="ps-banner win">🎉 Accepted! +{reward.coinsAwarded} coins{reward.starsAwarded ? ` · +${reward.starsAwarded} ⭐` : ""} · Balance {reward.newBalance} 🪙</div>
                    )}
                    {reward?.newBadges?.length > 0 && (
                      <div className="ps-badges">
                        {reward.newBadges.map((b) => (
                          <span className="ps-badge-won" key={b.code}><i className={b.icon || "fa-solid fa-medal"} /> Badge unlocked: <strong>{b.name}</strong></span>
                        ))}
                      </div>
                    )}
                    {!results.allPassed && (
                      <div className="ps-banner lose">
                        {results.mode === "submit"
                          ? `${results.passedCount}/${results.total} test cases passed — keep trying!`
                          : "Some sample cases failed — check your output."}
                      </div>
                    )}
                    <div className="ps-cases">
                      {results.results.map((r, i) => (
                        <div className={`ps-case ${r.passed ? "pass" : "fail"}`} key={i}>
                          <div className="ps-case-head">
                            <span>{r.hidden ? `Hidden #${r.index}` : `Sample #${r.index}`}</span>
                            <span className="ps-case-status">{r.passed ? "Passed" : (r.status === "compile" ? "Compile Error" : r.status === "timeout" ? "Timeout" : "Failed")}</span>
                          </div>
                          {!r.hidden && (
                            <div className="ps-case-body">
                              <div><small>Input</small><pre>{r.input}</pre></div>
                              <div><small>Expected</small><pre>{r.expectedOutput}</pre></div>
                              <div><small>Got</small><pre>{r.output || "(no output)"}</pre></div>
                            </div>
                          )}
                          {r.error && <pre className="ps-case-error">{r.error}</pre>}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
