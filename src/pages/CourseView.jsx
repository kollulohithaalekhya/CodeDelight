import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import CourseBlock from "../components/CourseBlock";
import Header from "../components/HeaderSection";
import { get, post } from "../api/client";
import { useAuth } from "../context/AuthContext";
import "../styles/CourseView.css";

// Lesson content is stored either as a JSON array of rich blocks (seeded courses)
// or as plain text/HTML (admin-authored). Normalise both to a block array.
function toBlocks(content) {
  if (!content) return [];
  try {
    const parsed = JSON.parse(content);
    if (Array.isArray(parsed)) return parsed;
  } catch {
    /* not JSON — treat as HTML */
  }
  return [{ type: "html", value: content }];
}

// Generic sub-headings that describe a part of a topic (not a topic of their
// own), so they should NOT start a new section.
const GENERIC_HEADING = /^(example|examples|syntax|output|code overview|conclusion|note|notes|explanation|try it|result|overview)s?\s*:?\s*$/i;

// If an HTML fragment leads with a top-level heading (h1/h2) that names a real
// topic, return that topic; otherwise null (generic/sub-heading or no heading).
function topicOf(html) {
  const m = html.trim().match(/^<h[12][^>]*>([\s\S]*?)<\/h[12]>/i);
  if (!m) return null;
  const text = m[1].replace(/<[^>]+>/g, "").trim();
  if (!text || GENERIC_HEADING.test(text)) return null;
  return text;
}

// Break one HTML string into fragments, each starting at an <h1>/<h2> so that
// multiple topics packed into a single block become separate pieces.
function splitHtmlByTopics(html) {
  return html.split(/(?=<h[12][\s>])/i).filter((p) => p.trim());
}

// Split a lesson's blocks into sections — one per TOPIC. A new section starts at
// each real topic heading; sub-headings (Example, Syntax…), code and prose flow
// into the current topic's section.
function splitIntoSections(blocks, lessonTitle) {
  // 1) Flatten into topic-level pieces (splitting multi-topic html blocks).
  const pieces = [];
  blocks.forEach((b) => {
    if (b.type === "html" && b.value) {
      splitHtmlByTopics(b.value).forEach((frag) => pieces.push({ type: "html", value: frag }));
    } else {
      pieces.push(b);
    }
  });

  // 2) Group pieces: a new section begins at each real topic heading.
  const sections = [];
  let current = null;
  pieces.forEach((p) => {
    const topic = p.type === "html" ? topicOf(p.value) : null;
    if (topic || !current) {
      current = { title: topic || lessonTitle, blocks: [] };
      sections.push(current);
      if (topic) {
        // The heading is shown as the section title — strip it from the body.
        const body = p.value.replace(/^\s*<h[12][^>]*>[\s\S]*?<\/h[12]>/i, "");
        if (body.trim()) current.blocks.push({ type: "html", value: body });
        return;
      }
    }
    current.blocks.push(p);
  });
  return sections.length ? sections : [{ title: lessonTitle, blocks }];
}

function CourseView({ course: courseProp }) {
  const params = useParams();
  const slug = courseProp || params.slug || params.course;
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeId, setActiveId] = useState(null);
  const [sectionIndex, setSectionIndex] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const load = useCallback(async () => {
    try {
      const { course } = await get(`/api/courses/${slug}`);
      setCourse(course);
      return course;
    } catch (e) {
      setError(e.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    let alive = true;
    (async () => {
      const c = await load();
      if (!alive || !c) return;
      post(`/api/courses/${c.id}/enroll`, {}).catch(() => {});
      const flat = c.modules.flatMap((m) => m.lessons);
      const target = flat.find((l) => !l.locked && !l.completed) || flat[0];
      if (target) setActiveId(target.id);
    })();
    return () => { alive = false; };
  }, [load]);

  const flat = useMemo(
    () => (course ? course.modules.flatMap((m) => m.lessons) : []),
    [course]
  );
  const activeIndex = flat.findIndex((l) => l.id === activeId);
  const lesson = activeIndex >= 0 ? flat[activeIndex] : null;

  // Content sections + a dedicated final "Knowledge Check" section when the
  // lesson has a quiz, so the quiz is never mixed with reading content.
  const sections = useMemo(() => {
    if (!lesson) return [];
    const content = splitIntoSections(toBlocks(lesson.content), lesson.title);
    if (lesson.hasQuiz) {
      content.push({ title: "Knowledge Check", isQuiz: true, blocks: [] });
    }
    return content;
  }, [lesson]);

  // When the lesson changes, jump to the pending section (0 by default, or the
  // last section when the user pressed "Previous" from the start of a lesson).
  const pendingSectionRef = useRef(0);
  useEffect(() => {
    setSectionIndex(pendingSectionRef.current);
    pendingSectionRef.current = 0;
  }, [activeId]);

  const openLesson = (id) => {
    const l = flat.find((x) => x.id === id);
    if (!l || l.locked) return;
    setActiveId(id);
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  // For quiz-less lessons: mark read → refresh → advance immediately.
  const onCompleted = async () => {
    const c = await load();
    if (!c) return;
    const newFlat = c.modules.flatMap((m) => m.lessons);
    const idx = newFlat.findIndex((l) => l.id === activeId);
    const next = newFlat[idx + 1];
    if (next && !next.locked) { setActiveId(next.id); scrollTop(); }
  };

  // After passing a knowledge check: refresh progress but STAY on the page so the
  // learner can review the questions/answers. Advancing happens on their click.
  const onQuizPassed = async () => { await load(); };

  const goToNextLesson = () => {
    const idx = flat.findIndex((l) => l.id === activeId);
    const next = flat[idx + 1];
    if (next && !next.locked) { setActiveId(next.id); scrollTop(); }
    else navigate("/course");
  };

  const isLastSection = sectionIndex >= sections.length - 1;

  const prevSection = () => {
    if (sectionIndex > 0) { setSectionIndex((i) => i - 1); scrollTop(); }
    else if (activeIndex > 0) {
      // Jump to the previous lesson's last section.
      const prev = flat[activeIndex - 1];
      if (prev && !prev.locked) {
        const prevSections = splitIntoSections(toBlocks(prev.content), prev.title);
        pendingSectionRef.current = Math.max(0, prevSections.length - 1);
        setActiveId(prev.id);
        scrollTop();
      }
    }
  };

  const nextSection = () => { setSectionIndex((i) => i + 1); scrollTop(); };

  if (loading) return (<><Header /><div className="cv-state">Loading course…</div></>);
  if (error || !course) {
    return (
      <>
        <Header />
        <div className="cv-state">
          <h2>Course not found</h2>
          <button className="cv-btn" onClick={() => navigate("/course")}>Back to courses</button>
        </div>
      </>
    );
  }

  const completedCount = flat.filter((l) => l.completed).length;
  const percent = flat.length ? Math.round((completedCount / flat.length) * 100) : 0;
  const section = sections[sectionIndex];

  return (
    <>
      <Header />
      <div className="cv-wrap">
        {/* Sidebar */}
        <aside className={`cv-sidebar ${sidebarOpen ? "open" : ""}`}>
          <div className="cv-side-head">
            <h2>{course.title}</h2>
            <div className="cv-progress">
              <div className="cv-progress-bar"><span style={{ width: `${percent}%` }} /></div>
              <small>{completedCount}/{flat.length} lessons · {percent}%</small>
            </div>
          </div>

          {course.modules.map((m) => (
            <div className="cv-module" key={m.id}>
              <div className="cv-module-title">{m.title}</div>
              {m.lessons.map((l) => (
                <button
                  key={l.id}
                  className={`cv-lesson-link ${l.id === activeId ? "active" : ""} ${l.locked ? "locked" : ""}`}
                  onClick={() => openLesson(l.id)}
                  disabled={l.locked}
                >
                  <span className="cv-lesson-ico">
                    {l.completed ? <i className="fa-solid fa-circle-check done" />
                      : l.locked ? <i className="fa-solid fa-lock" />
                      : <i className="fa-regular fa-circle" />}
                  </span>
                  <span className="cv-lesson-name">{l.title}</span>
                  {l.hasQuiz && <i className="fa-solid fa-brain cv-quiz-badge" title="Has a knowledge check" />}
                </button>
              ))}
            </div>
          ))}
        </aside>

        {sidebarOpen && <div className="cv-backdrop" onClick={() => setSidebarOpen(false)} />}

        {/* Main */}
        <main className="cv-main">
          <button className="cv-menu-btn" onClick={() => setSidebarOpen(true)}><FaBars /> Lessons</button>

          {lesson && section && (
            <>
              <div className="cv-lesson-head">
                <div className="cv-eyebrow">
                  <i className="fa-solid fa-book-open" /> {lesson.title}
                </div>
                {lesson.completed && <span className="cv-badge-done"><i className="fa-solid fa-check" /> Completed</span>}
              </div>

              {/* Section stepper */}
              {sections.length > 1 && (
                <div className="cv-stepper">
                  <div className="cv-stepper-dots">
                    {sections.map((s, i) => (
                      <button
                        key={i}
                        className={`cv-dot ${i === sectionIndex ? "active" : ""} ${i < sectionIndex ? "past" : ""} ${s.isQuiz ? "quiz" : ""}`}
                        title={s.title}
                        onClick={() => { setSectionIndex(i); scrollTop(); }}
                      />
                    ))}
                  </div>
                  <span className="cv-stepper-label">
                    {section.isQuiz ? "Final: Knowledge Check" : `Section ${sectionIndex + 1} of ${sections.length}`}
                  </span>
                </div>
              )}

              {section.isQuiz ? (
                /* Dedicated quiz section — no reading content here */
                <div className="cv-content" key={`${lesson.id}-quiz`}>
                  <KnowledgeCheck
                    courseId={course.id}
                    lesson={lesson}
                    onPassed={onQuizPassed}
                    onContinue={goToNextLesson}
                    hasNext={!!flat[activeIndex + 1]}
                  />
                </div>
              ) : (
                <>
                  <h1 className="cv-section-title">{section.title}</h1>
                  <div className="cv-content" key={`${lesson.id}-${sectionIndex}`}>
                    {section.blocks.map((block, i) => <CourseBlock key={i} block={block} />)}
                    {isLastSection && lesson.videoUrl && (
                      <div className="cv-video"><iframe src={lesson.videoUrl} title="Lesson video" allowFullScreen /></div>
                    )}
                  </div>

                  {/* Quiz-less lessons complete by marking read on the last section */}
                  {isLastSection && !lesson.hasQuiz && (
                    <MarkRead courseId={course.id} lesson={lesson} onDone={onCompleted} />
                  )}
                </>
              )}

              {/* Section / lesson navigation */}
              <div className="cv-nav">
                <button className="cv-btn ghost"
                  disabled={sectionIndex === 0 && activeIndex === 0}
                  onClick={prevSection}>
                  <i className="fa-solid fa-arrow-left" /> Previous
                </button>

                {!isLastSection ? (
                  <button className="cv-btn" onClick={nextSection}>
                    {sections[sectionIndex + 1]?.isQuiz
                      ? <>Take Knowledge Check <i className="fa-solid fa-brain" /></>
                      : <>Next Section <i className="fa-solid fa-arrow-right" /></>}
                  </button>
                ) : (
                  flat[activeIndex + 1] && (
                    <button className="cv-btn"
                      disabled={flat[activeIndex + 1].locked}
                      onClick={() => openLesson(flat[activeIndex + 1].id)}>
                      {flat[activeIndex + 1].locked
                        ? <>Complete to unlock <i className="fa-solid fa-lock" /></>
                        : <>Next Lesson <i className="fa-solid fa-arrow-right" /></>}
                    </button>
                  )
                )}
              </div>
            </>
          )}
        </main>
      </div>
    </>
  );
}

// -------- Mark-as-read (lessons without a quiz) --------
function MarkRead({ courseId, lesson, onDone }) {
  const [busy, setBusy] = useState(false);
  if (lesson.completed) {
    return <div className="cv-complete-box done"><i className="fa-solid fa-circle-check" /> You've completed this lesson.</div>;
  }
  const mark = async () => {
    setBusy(true);
    try { await post(`/api/courses/${courseId}/lessons/${lesson.id}/complete`, {}); await onDone(); }
    catch (e) { alert(e.message); }
    finally { setBusy(false); }
  };
  return (
    <div className="cv-complete-box">
      <span>Finished this lesson? Mark it complete to continue.</span>
      <button className="cv-btn" onClick={mark} disabled={busy}>
        {busy ? "Saving…" : "Mark as Complete"}
      </button>
    </div>
  );
}

// -------- Knowledge check (lessons with a quiz) --------
function KnowledgeCheck({ courseId, lesson, onPassed, onContinue, hasNext }) {
  const { refresh } = useAuth();
  const questions = lesson.quiz?.questions || [];
  const rewardCoins = lesson.quiz?.rewardCoins ?? questions.length;
  // Eligible for the first-try coin reward until this check has been attempted.
  const rewardEligible = (lesson.quiz?.rewardEligible ?? true) && !lesson.completed;
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const submit = async () => {
    if (Object.keys(answers).length < questions.length) {
      setError("Please answer all questions.");
      return;
    }
    setError("");
    setBusy(true);
    try {
      const payload = questions.map((_, i) => answers[i]);
      const { result } = await post(`/api/courses/${courseId}/lessons/${lesson.id}/quiz`, { answers: payload });
      setResult(result);
      // Sync the coin balance in the header if a first-try reward was earned.
      if (result.kcReward) refresh();
      // Refresh progress (marks the lesson complete + unlocks the next) but do
      // NOT navigate — the learner reviews the answers, then clicks Continue.
      if (result.passed) onPassed();
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  };

  const retry = () => { setResult(null); setAnswers({}); };

  return (
    <div className="cv-kc">
      <div className="cv-kc-head">
        <i className="fa-solid fa-brain" />
        <div>
          <h3>Knowledge Check</h3>
          <p>Pass this to unlock the next lesson.</p>
        </div>
      </div>

      {rewardEligible && (
        <div className="cv-kc-note">
          <i className="fa-solid fa-coins" />
          <span>
            Answer all {questions.length} question{questions.length === 1 ? "" : "s"} correctly on your
            <b> first attempt</b> to earn <b>{rewardCoins} coin{rewardCoins === 1 ? "" : "s"}</b>. Get one wrong and the reward is gone for this check.
          </span>
        </div>
      )}

      {questions.map((q, i) => {
        const chosen = answers[i];
        const verdict = result?.review?.[i];
        return (
          <div className="cv-kc-q" key={i}>
            <div className="cv-kc-question">{i + 1}. {q.question}</div>
            {q.options.map((opt, oi) => {
              let cls = "cv-kc-opt";
              if (result) {
                if (oi === verdict.correctIndex) cls += " correct";
                else if (oi === chosen) cls += " wrong";
              } else if (chosen === oi) cls += " selected";
              return (
                <label className={cls} key={oi}>
                  <input type="radio" name={`q-${i}`} disabled={!!result}
                    checked={chosen === oi}
                    onChange={() => setAnswers((a) => ({ ...a, [i]: oi }))} />
                  {opt}
                </label>
              );
            })}
            {result && verdict.explanation && (
              <div className="cv-kc-explain"><i className="fa-solid fa-circle-info" /> {verdict.explanation}</div>
            )}
          </div>
        );
      })}

      {error && <div className="cv-kc-error">{error}</div>}

      {result ? (
        <div className={`cv-kc-result ${result.passed ? "pass" : "fail"}`}>
          <strong>
            {result.passed ? "🎉 Passed!" : "Not quite."} You scored {result.score}/{result.total} (need {result.passMark}).
          </strong>
          {result.kcReward ? (
            <span className="cv-kc-reward-won"><i className="fa-solid fa-coins" /> Perfect first try! +{result.kcReward.coinsAwarded} coins earned 🪙</span>
          ) : result.allCorrect && !result.firstAttempt ? (
            <span className="cv-kc-reward-miss">All correct — but the first-try coin reward was already used for this check.</span>
          ) : null}
          {result.passed ? (
            <>
              <span>Review the answers above, then continue when you're ready.</span>
              <button className="cv-btn cv-kc-continue" onClick={onContinue}>
                {hasNext ? <>Continue to Next Lesson <i className="fa-solid fa-arrow-right" /></>
                         : <>Finish Course <i className="fa-solid fa-flag-checkered" /></>}
              </button>
            </>
          ) : (
            <button className="cv-btn" onClick={retry}>Try Again</button>
          )}
        </div>
      ) : (
        <button className="cv-btn cv-kc-submit" onClick={submit} disabled={busy || lesson.completed}>
          {busy ? "Checking…" : "Submit Answers"}
        </button>
      )}

      {lesson.completed && !result && (
        <div className="cv-complete-box done" style={{ marginTop: 12 }}>
          <i className="fa-solid fa-circle-check" /> You've already passed this check.
        </div>
      )}
    </div>
  );
}

export default CourseView;
