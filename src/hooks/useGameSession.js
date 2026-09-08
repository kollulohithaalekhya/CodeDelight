import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { get, post } from "../api/client";
import { useAuth } from "../context/AuthContext";

// Shared logic for FunZone games. A game is "launched" (paid entry) when the
// FunZone catalog navigates here with { gameId, gameName, rewards } in nav state.
// Rewards are only granted for launched sessions — direct visits are free
// "practice mode" (no reward, no farming without paying entry).
export function useGameSession() {
  const location = useLocation();
  const { refresh } = useAuth();
  const launch = location.state || {};
  const gameId = launch.gameId || null;
  const sessionToken = launch.sessionToken || null;

  const [result, setResult] = useState(null); // { won, coinsAwarded, starsAwarded, newBalance, score }
  const [submitting, setSubmitting] = useState(false);

  // Report the game outcome to the server. Only awards when launched from FunZone.
  const finish = async (won, score = null) => {
    if (!gameId) {
      // Practice mode — show a local result without server rewards.
      setResult({ won, practice: true, score });
      return;
    }
    setSubmitting(true);
    try {
      const { result } = await post(`/api/games/${gameId}/finish`, { won, score, sessionToken });
      await refresh(); // sync coins/stars everywhere
      setResult({ ...result, score });
    } catch {
      setResult({ won, error: true, score });
    } finally {
      setSubmitting(false);
    }
  };

  const clearResult = () => setResult(null);

  return {
    gameId,
    gameName: launch.gameName || null,
    rewards: launch.rewards || null,
    isPractice: !gameId,
    result,
    submitting,
    finish,
    clearResult,
  };
}

/**
 * Fetches a freshly GENERATED puzzle board for an interactive game, so no two
 * plays get the same layout.
 *
 * The puzzle data used to be a hardcoded array in each game page, which is why
 * every player saw the same three stack targets and the same seven-node tree
 * forever. Now the server generates a board per play and keeps the solution,
 * so the outcome is verified rather than trusted.
 *
 * `fallback` is used when the board cannot be fetched (offline, or an anonymous
 * practice visit), so the game still works rather than showing a dead screen.
 *
 * @param {string|null} gameId  the launched game, or null in practice mode
 * @param {object} fallback     a locally generated board to use if the fetch fails
 */
export function useGameBoard(gameId, fallback) {
  const [board, setBoard] = useState(null);
  const [boardSessionId, setBoardSessionId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [nonce, setNonce] = useState(0);

  // Bumping this re-fetches, dealing a brand-new puzzle.
  const reroll = useCallback(() => setNonce((n) => n + 1), []);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    if (!gameId) {
      // Practice mode — no server session, so generate locally.
      setBoard(typeof fallback === "function" ? fallback() : fallback);
      setBoardSessionId(null);
      setLoading(false);
      return () => { alive = false; };
    }
    get(`/api/games/${gameId}/board`)
      .then((d) => {
        if (!alive) return;
        setBoard(d.board);
        setBoardSessionId(d.sessionId || null);
      })
      .catch(() => {
        if (!alive) return;
        setBoard(typeof fallback === "function" ? fallback() : fallback);
        setBoardSessionId(null);
      })
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameId, nonce]);

  return { board, boardSessionId, loading, reroll };
}

/**
 * Submits a board game's attempt for server-side verification.
 * Falls back to the plain /finish endpoint when there is no board session
 * (practice mode), so both paths report a result.
 */
export function useBoardSubmit(gameId, boardSessionId, sessionToken, setResult, setSubmitting) {
  return useCallback(async (submission, localWon, score = null) => {
    if (!gameId || !boardSessionId) {
      setResult({ won: localWon, practice: !gameId, score });
      return;
    }
    setSubmitting(true);
    try {
      const { result } = await post(`/api/games/${gameId}/board/submit`, {
        sessionId: boardSessionId,
        sessionToken,
        submission,
        score,
      });
      setResult({ ...result, score });
    } catch (e) {
      setResult({ won: localWon, error: true, score, message: e.message });
    } finally {
      setSubmitting(false);
    }
  }, [gameId, boardSessionId, sessionToken, setResult, setSubmitting]);
}
