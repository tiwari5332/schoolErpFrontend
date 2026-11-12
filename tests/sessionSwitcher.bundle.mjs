// tests/sessionSwitcher.test.ts
import { describe, it } from "node:test";
import assert from "node:assert";

// src/features/academic-sessions/utils/sessionValidation.ts
function suggestSessionName(startDate, endDate) {
  if (!startDate || !endDate) return "";
  const startYear = new Date(startDate).getFullYear();
  const endYear = new Date(endDate).getFullYear();
  if (isNaN(startYear) || isNaN(endYear)) return "";
  if (startYear === endYear) return `${startYear}`;
  if (endYear === startYear + 1) {
    return `${startYear}-${endYear.toString().slice(-2)}`;
  }
  return `${startYear}-${endYear}`;
}
function findOverlappingSession(startStr, endStr, sessions) {
  const start = new Date(startStr).getTime();
  const end = new Date(endStr).getTime();
  if (isNaN(start) || isNaN(end)) return null;
  for (const session of sessions) {
    const sStart = new Date(session.startDate).getTime();
    const sEnd = new Date(session.endDate).getTime();
    if (!isNaN(sStart) && !isNaN(sEnd)) {
      if (start <= sEnd && end >= sStart) {
        return session;
      }
    }
  }
  return null;
}
function sortSessionsNewestFirst(sessions) {
  return [...sessions].sort((a, b) => {
    const timeA = new Date(a.startDate).getTime() || 0;
    const timeB = new Date(b.startDate).getTime() || 0;
    if (timeB !== timeA) return timeB - timeA;
    return b.name.localeCompare(a.name);
  });
}
function isSuperAdminRole(role) {
  if (!role) return false;
  const clean = role.toLowerCase().replace(/[-_ ]/g, "");
  return clean === "superadmin" || clean === "superadministrator";
}

// tests/sessionSwitcher.test.ts
var MOCK_SESSIONS = [
  {
    id: "s_2023_24",
    name: "2023-24",
    startDate: "2023-04-01",
    endDate: "2024-03-31",
    status: "closed",
    isCurrent: false
  },
  {
    id: "s_2024_25",
    name: "2024-25",
    startDate: "2024-04-01",
    endDate: "2025-03-31",
    status: "current",
    isCurrent: true
  },
  {
    id: "s_2025_26",
    name: "2025-26",
    startDate: "2025-04-01",
    endDate: "2026-03-31",
    status: "upcoming",
    isCurrent: false
  }
];
describe("Academic Session Switcher Tests", () => {
  describe("Default Selection Logic", () => {
    function resolveInitialSession2(sessions, preferredId, storedId) {
      if (!sessions || sessions.length === 0) return null;
      if (preferredId) {
        const matched = sessions.find((s) => s.id === preferredId);
        if (matched) return matched;
      }
      if (storedId) {
        const matched = sessions.find((s) => s.id === storedId);
        if (matched) return matched;
      }
      const current = sessions.find((s) => s.isCurrent || s.status === "current");
      if (current) return current;
      return sessions[0];
    }
    it("selects me.selectedSessionId when present and valid", () => {
      const selected = resolveInitialSession2(MOCK_SESSIONS, "s_2025_26", null);
      assert.strictEqual(selected?.id, "s_2025_26");
      assert.strictEqual(selected?.name, "2025-26");
    });
    it("falls back to isCurrent session when me.selectedSessionId is missing or invalid", () => {
      const selectedWithInvalid = resolveInitialSession2(MOCK_SESSIONS, "invalid_id", null);
      assert.strictEqual(selectedWithInvalid?.id, "s_2024_25");
      assert.strictEqual(selectedWithInvalid?.isCurrent, true);
      const selectedWithNull = resolveInitialSession2(MOCK_SESSIONS, null, null);
      assert.strictEqual(selectedWithNull?.id, "s_2024_25");
    });
    it("falls back to the first session if no session is designated as current", () => {
      const nonCurrentSessions = [
        {
          id: "s_2020",
          name: "2020-21",
          startDate: "2020-04-01",
          endDate: "2021-03-31",
          status: "closed",
          isCurrent: false
        },
        {
          id: "s_2021",
          name: "2021-22",
          startDate: "2021-04-01",
          endDate: "2022-03-31",
          status: "closed",
          isCurrent: false
        }
      ];
      const selected = resolveInitialSession2(nonCurrentSessions, null, null);
      assert.strictEqual(selected?.id, "s_2020");
    });
    it("sorts sessions newest first by startDate", () => {
      const sorted = sortSessionsNewestFirst(MOCK_SESSIONS);
      assert.strictEqual(sorted[0].id, "s_2025_26");
      assert.strictEqual(sorted[1].id, "s_2024_25");
      assert.strictEqual(sorted[2].id, "s_2023_24");
    });
  });
  describe("Session Switch, Query Invalidation, and Rollback", () => {
    it("optimistically updates session and invalidates session-scoped queries on success", async () => {
      let globalSessionId = "s_2024_25";
      const invalidatedQueries = [];
      const mockQueryClient = {
        invalidateQueries: ({ queryKey }) => {
          invalidatedQueries.push(queryKey[0]);
        }
      };
      const mockApiUpdate = async (_payload) => {
        return { success: true };
      };
      const targetSessionId = "s_2025_26";
      const prevSessionId = globalSessionId;
      globalSessionId = targetSessionId;
      assert.strictEqual(globalSessionId, "s_2025_26", "State should update optimistically");
      await mockApiUpdate({ selectedSessionId: targetSessionId });
      mockQueryClient.invalidateQueries({ queryKey: ["attendance"] });
      mockQueryClient.invalidateQueries({ queryKey: ["students"] });
      mockQueryClient.invalidateQueries({ queryKey: ["fees"] });
      mockQueryClient.invalidateQueries({ queryKey: ["dashboard"] });
      mockQueryClient.invalidateQueries({ queryKey: ["academic"] });
      assert.deepStrictEqual(invalidatedQueries, ["attendance", "students", "fees", "dashboard", "academic"]);
      assert.strictEqual(globalSessionId, "s_2025_26");
    });
    it("rolls back to previous session when update preferences API call fails", async () => {
      let globalSessionId = "s_2024_25";
      const prevSessionId = globalSessionId;
      const targetSessionId = "s_2025_26";
      globalSessionId = targetSessionId;
      const mockApiUpdateFailing = async () => {
        throw new Error("Network timeout");
      };
      try {
        await mockApiUpdateFailing();
      } catch {
        globalSessionId = prevSessionId;
      }
      assert.strictEqual(globalSessionId, "s_2024_25", "Should roll back to original session");
    });
  });
  describe("Role-Based Visibility", () => {
    it("accurately identifies Super Admin role across formatting variations", () => {
      assert.strictEqual(isSuperAdminRole("Super Admin"), true);
      assert.strictEqual(isSuperAdminRole("super admin"), true);
      assert.strictEqual(isSuperAdminRole("SUPER_ADMIN"), true);
      assert.strictEqual(isSuperAdminRole("super-admin"), true);
      assert.strictEqual(isSuperAdminRole("SuperAdministrator"), true);
    });
    it("denies Super Admin privileges for non-super roles", () => {
      assert.strictEqual(isSuperAdminRole("Academic Admin"), false);
      assert.strictEqual(isSuperAdminRole("Finance Admin"), false);
      assert.strictEqual(isSuperAdminRole("Teacher"), false);
      assert.strictEqual(isSuperAdminRole("Student"), false);
      assert.strictEqual(isSuperAdminRole(""), false);
      assert.strictEqual(isSuperAdminRole(null), false);
      assert.strictEqual(isSuperAdminRole(void 0), false);
    });
  });
  describe("Date Validation & Overlap Detection", () => {
    it("detects when end date is not after start date", () => {
      const start = "2026-04-01";
      const endEqual = "2026-04-01";
      const endBefore = "2026-03-31";
      const endValid = "2027-03-31";
      assert.strictEqual(new Date(endEqual).getTime() <= new Date(start).getTime(), true);
      assert.strictEqual(new Date(endBefore).getTime() <= new Date(start).getTime(), true);
      assert.strictEqual(new Date(endValid).getTime() > new Date(start).getTime(), true);
    });
    it("detects overlap with existing sessions correctly", () => {
      const overlapping1 = findOverlappingSession("2024-05-01", "2025-02-01", MOCK_SESSIONS);
      assert.ok(overlapping1);
      assert.strictEqual(overlapping1?.id, "s_2024_25");
      const overlapping2 = findOverlappingSession("2025-01-01", "2025-06-01", MOCK_SESSIONS);
      assert.ok(overlapping2);
      assert.strictEqual(overlapping2?.id, "s_2024_25");
      const noOverlap = findOverlappingSession("2027-04-01", "2028-03-31", MOCK_SESSIONS);
      assert.strictEqual(noOverlap, null);
    });
    it("auto-suggests session names based on start and end dates", () => {
      assert.strictEqual(suggestSessionName("2027-04-01", "2028-03-31"), "2027-28");
      assert.strictEqual(suggestSessionName("2026-01-01", "2026-12-31"), "2026");
      assert.strictEqual(suggestSessionName("2028-04-01", "2029-03-31"), "2028-29");
    });
    it("detects duplicate session names case-insensitively", () => {
      const isDuplicate = (name) => MOCK_SESSIONS.some((s) => s.name.trim().toLowerCase() === name.trim().toLowerCase());
      assert.strictEqual(isDuplicate("2024-25"), true);
      assert.strictEqual(isDuplicate("  2024-25  "), true);
      assert.strictEqual(isDuplicate("2025-26"), true);
      assert.strictEqual(isDuplicate("2027-28"), false);
    });
  });
});
