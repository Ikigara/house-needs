import { useState } from "react";

// ── Types ────────────────────────────────────────────────────────────────────

interface Roommate {
  id: string;
  initials: string;
  name: string;
  color: string;
  textColor: string;
}

interface Task {
  id: string;
  title: string;
  assigneeId: string;
  done: boolean;
  urgent?: boolean;
}

interface GroceryItem {
  id: string;
  name: string;
  qty: number;
  addedById: string;
}

interface Bill {
  id: string;
  label: string;
  emoji: string;
  amount: number;
  dueDate: string;
  paid: boolean;
}

// ── Mock data ────────────────────────────────────────────────────────────────

const ROOMMATES: Roommate[] = [
  { id: "jo", initials: "JO", name: "Jamie", color: "#EEEDFE", textColor: "#3C3489" },
  { id: "js", initials: "JS", name: "Maya",  color: "#E1F5EE", textColor: "#085041" },
  { id: "ec", initials: "EC", name: "Tyler", color: "#FAEEDA", textColor: "#633806" },
  { id: "dr", initials: "DR", name: "Sam",   color: "#FAECE7", textColor: "#712B13" },
];

const INITIAL_TASKS: Task[] = [
  { id: "t1", title: "Take out trash",    assigneeId: "js", done: true  },
  { id: "t2", title: "Vacuum living room", assigneeId: "dr", done: false },
  { id: "t3", title: "Pay rent",           assigneeId: "ec", done: false, urgent: true },
  { id: "t4", title: "Clean bathroom",     assigneeId: "ds", done: false },
];

const GROCERY_ITEMS: GroceryItem[] = [
  { id: "g1", name: "Avocados",      qty: 2, addedById: "mr" },
  { id: "g2", name: "Whole milk",    qty: 1, addedById: "tk" },
  { id: "g3", name: "Greek yogurt",  qty: 2, addedById: "jl" },
  { id: "g4", name: "Canned tomatoes", qty: 3, addedById: "mr" },
  { id: "g5", name: "Olive oil",     qty: 1, addedById: "sk" },
];

const BILLS: Bill[] = [
  { id: "b1", label: "Rent",      emoji: "🏠", amount: 2400, dueDate: "Paid Apr 1",  paid: true  },
  { id: "b2", label: "Electric",  emoji: "💡", amount: 84,   dueDate: "Due Apr 25",  paid: false },
  { id: "b3", label: "Internet",  emoji: "📶", amount: 60,   dueDate: "Due Apr 28",  paid: false },
  { id: "b4", label: "Water",     emoji: "💧", amount: 38,   dueDate: "Paid Apr 3",  paid: true  },
];

// ── Helpers ──────────────────────────────────────────────────────────────────

function getRoommate(id: string): Roommate {
  return ROOMMATES.find((r) => r.id === id) ?? ROOMMATES[0];
}

// ── Sub-components ───────────────────────────────────────────────────────────

function Avatar({ roommate, size = 28 }: { roommate: Roommate; size?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: roommate.color,
        color: roommate.textColor,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size * 0.36,
        fontWeight: 600,
        flexShrink: 0,
        fontFamily: "'DM Mono', monospace",
        letterSpacing: "-0.02em",
      }}
    >
      {roommate.initials}
    </div>
  );
}

function StatusChip({
  label,
  variant,
}: {
  label: string;
  variant: "urgent" | "done" | "pending" | "paid";
}) {
  const styles: Record<string, { bg: string; color: string }> = {
    urgent:  { bg: "#FAECE7", color: "#712B13" },
    done:    { bg: "#E1F5EE", color: "#085041" },
    pending: { bg: "#FAEEDA", color: "#633806" },
    paid:    { bg: "#E1F5EE", color: "#085041" },
  };
  const s = styles[variant];
  return (
    <span
      style={{
        display: "inline-block",
        padding: "2px 8px",
        borderRadius: 20,
        fontSize: 10,
        fontWeight: 600,
        background: s.bg,
        color: s.color,
        letterSpacing: "0.03em",
        fontFamily: "'DM Mono', monospace",
      }}
    >
      {label}
    </span>
  );
}

function SectionHeader({ title, action, onAction }: { title: string; action?: string; onAction?: () => void }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
      <p style={{ margin: 0, fontSize: 11, fontWeight: 600, color: "#888", letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "'DM Mono', monospace" }}>
        {title}
      </p>
      {action && (
        <button
          onClick={onAction}
          style={{
            background: "none",
            border: "none",
            color: "#6C4FD4",
            fontSize: 12,
            cursor: "pointer",
            fontFamily: "'DM Mono', monospace",
            padding: 0,
          }}
        >
          {action}
        </button>
      )}
    </div>
  );
}

// ── Task card ────────────────────────────────────────────────────────────────

function TasksCard({ tasks, onToggle }: { tasks: Task[]; onToggle: (id: string) => void }) {
  const pending = tasks.filter((t) => !t.done).length;

  return (
    <div style={cardStyle}>
      <SectionHeader title={`Tasks · ${pending} left`} action="See all" />
      <div>
        {tasks.map((task) => {
          const assignee = getRoommate(task.assigneeId);
          return (
            <div
              key={task.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "9px 0",
                borderBottom: "0.5px solid rgba(0,0,0,0.06)",
              }}
            >
              {/* Checkbox */}
              <button
                onClick={() => onToggle(task.id)}
                aria-label={task.done ? "Mark incomplete" : "Mark complete"}
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  border: task.done ? "none" : "1.5px solid #ccc",
                  background: task.done ? "#6C4FD4" : "transparent",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  padding: 0,
                }}
              >
                {task.done && (
                  <svg width="10" height="10" viewBox="0 0 10 10">
                    <polyline points="2,5 4,7 8,3" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>

              {/* Title */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p
                  style={{
                    margin: 0,
                    fontSize: 13,
                    color: task.done ? "#aaa" : "#1a1a1a",
                    textDecoration: task.done ? "line-through" : "none",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {task.title}
                </p>
                {task.urgent && !task.done && (
                  <StatusChip label="Due today" variant="urgent" />
                )}
              </div>

              <Avatar roommate={assignee} size={22} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Grocery card ─────────────────────────────────────────────────────────────

function GroceryCard({ items }: { items: GroceryItem[] }) {
  return (
    <div style={cardStyle}>
      <SectionHeader title={`Grocery · ${items.length} items`} action="See all" />
      <div>
        {items.slice(0, 4).map((item) => {
          const who = getRoommate(item.addedById);
          return (
            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "8px 0",
                borderBottom: "0.5px solid rgba(0,0,0,0.06)",
              }}
            >
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 6,
                  background: "#f5f4f9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 11,
                  fontWeight: 600,
                  color: "#6C4FD4",
                  fontFamily: "'DM Mono', monospace",
                  flexShrink: 0,
                }}
              >
                {item.qty}
              </div>
              <p style={{ margin: 0, fontSize: 13, color: "#1a1a1a", flex: 1 }}>{item.name}</p>
              <Avatar roommate={who} size={22} />
            </div>
          );
        })}
        {items.length > 4 && (
          <p style={{ margin: "8px 0 0", fontSize: 12, color: "#aaa", textAlign: "center" }}>
            +{items.length - 4} more items
          </p>
        )}
      </div>
    </div>
  );
}

// ── Bills card ───────────────────────────────────────────────────────────────

function BillsCard({ bills }: { bills: Bill[] }) {
  const totalShared = bills.reduce((s, b) => s + b.amount, 0);
  const perPerson = Math.round(totalShared / ROOMMATES.length);

  return (
    <div style={cardStyle}>
      <SectionHeader title="Bills · April" action="See all" />

      {/* Summary pill */}
      <div
        style={{
          background: "#EEEDFE",
          borderRadius: 10,
          padding: "10px 14px",
          marginBottom: 12,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <p style={{ margin: 0, fontSize: 11, color: "#6C4FD4", fontFamily: "'DM Mono', monospace" }}>Total shared</p>
          <p style={{ margin: "2px 0 0", fontSize: 20, fontWeight: 600, color: "#3C3489" }}>
            ${totalShared.toLocaleString()}
          </p>
        </div>
        <div style={{ textAlign: "right" }}>
          <p style={{ margin: 0, fontSize: 11, color: "#6C4FD4", fontFamily: "'DM Mono', monospace" }}>Per person</p>
          <p style={{ margin: "2px 0 0", fontSize: 20, fontWeight: 600, color: "#3C3489" }}>${perPerson}</p>
        </div>
      </div>

      {bills.map((bill) => (
        <div
          key={bill.id}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "8px 0",
            borderBottom: "0.5px solid rgba(0,0,0,0.06)",
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: bill.paid ? "#E1F5EE" : "#f5f5f0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 15,
              flexShrink: 0,
            }}
          >
            {bill.emoji}
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ margin: 0, fontSize: 13, color: "#1a1a1a" }}>{bill.label}</p>
            <p style={{ margin: 0, fontSize: 10, color: "#aaa", fontFamily: "'DM Mono', monospace" }}>{bill.dueDate}</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "#1a1a1a" }}>${bill.amount}</p>
            <StatusChip label={bill.paid ? "Paid" : "Pending"} variant={bill.paid ? "paid" : "pending"} />
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Bottom nav ────────────────────────────────────────────────────────────────

type Tab = "home" | "tasks" | "grocery" | "bills" | "more";

const NAV_ITEMS: { id: Tab; label: string; icon: string }[] = [
  { id: "home",    label: "Home",    icon: "⌂"  },
  { id: "tasks",   label: "Tasks",   icon: "✓"  },
  { id: "grocery", label: "Grocery", icon: "🛒" },
  { id: "bills",   label: "Bills",   icon: "$"  },
  { id: "more",    label: "More",    icon: "⚙"  },
];

function BottomNav({ active, onChange }: { active: Tab; onChange: (t: Tab) => void }) {
  return (
    <nav
      style={{
        position: "sticky",
        bottom: 0,
        display: "flex",
        justifyContent: "space-around",
        padding: "10px 0 20px",
        borderTop: "0.5px solid rgba(0,0,0,0.08)",
        background: "#fff",
      }}
    >
      {NAV_ITEMS.map((item) => {
        const isActive = item.id === active;
        return (
          <button
            key={item.id}
            onClick={() => onChange(item.id)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "0 8px",
              color: isActive ? "#6C4FD4" : "#aaa",
              fontFamily: "'DM Mono', monospace",
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 10,
                background: isActive ? "#EEEDFE" : "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 15,
                transition: "background 0.15s",
              }}
            >
              {item.icon}
            </div>
            <span style={{ fontSize: 10, fontWeight: isActive ? 600 : 400 }}>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

// ── Shared card style ────────────────────────────────────────────────────────

const cardStyle: React.CSSProperties = {
  background: "#fff",
  border: "0.5px solid rgba(0,0,0,0.08)",
  borderRadius: 16,
  padding: "16px 16px 4px",
  marginBottom: 14,
};

// ── HomeScreen ────────────────────────────────────────────────────────────────

export default function HomeScreen() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [activeTab, setActiveTab] = useState<Tab>("home");

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const pendingCount = tasks.filter((t) => !t.done).length;

  return (
    <div
      style={{
        maxWidth: 420,
        margin: "0 auto",
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        background: "#f8f7fc",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; }
      `}</style>

      {/* ── Header ── */}
      <header
        style={{
          padding: "52px 20px 16px",
          background: "#fff",
          borderBottom: "0.5px solid rgba(0,0,0,0.06)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <p style={{ margin: 0, fontSize: 12, color: "#aaa", fontFamily: "'DM Mono', monospace" }}>
              Good morning,
            </p>
            <h1 style={{ margin: "2px 0 0", fontSize: 24, fontWeight: 600, color: "#1a1a1a", letterSpacing: "-0.03em" }}>
              Deontae
            </h1>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {ROOMMATES.map((r) => (
              <Avatar key={r.id} roommate={r} size={30} />
            ))}
          </div>
        </div>

        {/* Quick stat bar */}
        <div
          style={{
            marginTop: 14,
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 8,
          }}
        >
          {[
            { label: "Tasks left", value: pendingCount, accent: "#6C4FD4" },
            { label: "Grocery items", value: GROCERY_ITEMS.length, accent: "#0F6E56" },
            { label: "Bills pending", value: BILLS.filter((b) => !b.paid).length, accent: "#854F0B" },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                background: "#f8f7fc",
                borderRadius: 10,
                padding: "8px 10px",
              }}
            >
              <p style={{ margin: 0, fontSize: 10, color: "#aaa", fontFamily: "'DM Mono', monospace" }}>
                {stat.label}
              </p>
              <p style={{ margin: "2px 0 0", fontSize: 22, fontWeight: 600, color: stat.accent }}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </header>

      {/* ── Scrollable body ── */}
      <main style={{ flex: 1, overflowY: "auto", padding: "16px 16px 0" }}>
        <TasksCard tasks={tasks} onToggle={toggleTask} />
        <GroceryCard items={GROCERY_ITEMS} />
        <BillsCard bills={BILLS} />
      </main>

      {/* ── Bottom nav ── */}
      <BottomNav active={activeTab} onChange={setActiveTab} />
    </div>
  );
}