"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { MessageCircle, X, Send, Bot, User, Sparkles, Clock, MapPin, Phone, Shield, Stethoscope, Baby, FlaskRound, Scissors, Scan, Radar, Brain, Heart } from "lucide-react";
import { useLocale } from "@/app/locale-provider";
import Link from "next/link";

type Message = {
  role: "user" | "bot";
  text: string;
  links?: { label: string; href: string }[];
};

const SERVICE_IDS = ["emergency", "delivery", "laboratory", "surgical", "xray", "ultrasound", "ct-scan", "ecg"] as const;

const serviceIconMap: Record<string, React.ReactNode> = {
  emergency: <Shield size={12} />,
  delivery: <Baby size={12} />,
  laboratory: <FlaskRound size={12} />,
  surgical: <Scissors size={12} />,
  xray: <Scan size={12} />,
  ultrasound: <Radar size={12} />,
  "ct-scan": <Brain size={12} />,
  ecg: <Heart size={12} />,
};

const quickActions = [
  { labelKey: "ai.qHours", intent: "hours", icon: <Clock size={12} /> },
  { labelKey: "ai.qEmergency", intent: "emergency", icon: <Shield size={12} /> },
  { labelKey: "ai.qAppointment", intent: "appointment", icon: <Phone size={12} /> },
  { labelKey: "ai.qLocation", intent: "location", icon: <MapPin size={12} /> },
];

const staticIntents: Record<string, { keys: string[]; tKey: string; links?: { labelKey: string; href: string }[] }> = {
  hours: {
    keys: ["hour", "open", "time", "close", "working", "day", "schedule", "24/7"],
    tKey: "ai.hours",
    links: [{ labelKey: "ai.lContact", href: "/contact" }],
  },
  emergency: {
    keys: ["emergency", "urgent", "accident", "critical", "immediate"],
    tKey: "ai.emergency",
    links: [{ labelKey: "ai.lContact", href: "/contact" }],
  },
  appointment: {
    keys: ["appointment", "book", "schedule", "visit", "reserve", "meet"],
    tKey: "ai.appointment",
    links: [{ labelKey: "ai.lBookNow", href: "/appointment" }],
  },
  insurance: {
    keys: ["insurance", "cover", "payment", "bill", "cost", "fee", "price", "charge"],
    tKey: "ai.insurance",
    links: [{ labelKey: "ai.lContact", href: "/contact" }],
  },
  location: {
    keys: ["location", "address", "find", "map", "where", "direction", "come"],
    tKey: "ai.location",
    links: [{ labelKey: "ai.lDirections", href: "https://www.google.com/maps/dir/?api=1&destination=11.8289,39.6015" }],
  },
  lab: {
    keys: ["lab", "test", "blood", "result", "laboratory", "sample", "diagnostic"],
    tKey: "ai.lab",
  },
  pharmacy: {
    keys: ["pharmacy", "medicine", "drug", "prescription", "medication", "pharm"],
    tKey: "ai.pharmacy",
  },
  services: {
    keys: ["service", "offer", "provide", "treatment", "specialist", "doctor", "physician", "department"],
    tKey: "ai.services",
    links: [
      { labelKey: "ai.lServices", href: "/services" },
      { labelKey: "ai.lDepartments", href: "/departments" },
    ],
  },
  pain: {
    keys: ["pain", "ache", "hurt", "sore", "injured", "injury"],
    tKey: "ai.pain",
    links: [
      { labelKey: "ai.lDoctors", href: "/about-us/physicians" },
      { labelKey: "ai.lBookNow", href: "/appointment" },
    ],
  },
  greeting: {
    keys: ["hello", "hi", "hey", "morning", "evening", "good"],
    tKey: "ai.greeting",
  },
  about: {
    keys: ["mama hospital", "dr kassaw", "medhin primary hospital", "hospital", "clinic", "about", "tell me", "who are you", "ማማ ሆስፒታል", "ዶር ካሳው", "ምድህን ፕራይማሪ ሆስፒታል", "ክሊኒክ", "ሆስፒታል", "ስለ", "ንገረኝ", "ስለምን ማወቅ ይፈልጋሉ"],
    tKey: "ai.about",
    links: [
      { labelKey: "ai.lServices", href: "/services" },
      { labelKey: "ai.lDepartments", href: "/departments" },
      { labelKey: "ai.lDoctors", href: "/about-us/physicians" },
      { labelKey: "ai.lBookNow", href: "/appointment" },
      { labelKey: "ai.lLocation", href: "/contact" },
      { labelKey: "ai.lVirtualTour", href: "/news/clinic-virtual-tour" },
    ],
  },
};

function buildServiceIntents(t: (key: string) => string) {
  const entries: Record<string, { keys: string[]; text: string; links: { label: string; href: string }[] }> = {};

  for (const id of SERVICE_IDS) {
    const title = t(`services.${id}.title`);
    const desc = t(`services.${id}.description`);
    const raw = t(`services.${id}.items`);
    const items = (Array.isArray(raw) ? raw : []) as string[];

    const titleLower = title.toLowerCase();
    const idLower = id.toLowerCase().replace("-", " ");

    const firstWord = titleLower.split(" ")[0];
    const keywords = [
      firstWord,
      titleLower,
      idLower === firstWord ? "" : idLower,
      id.replace("-", ""),
    ].filter(Boolean);

    const itemsText = items.length > 0 ? items.slice(0, 4).join(", ") + (items.length > 4 ? "..." : "") : "";

    entries[id] = {
      keys: [...new Set(keywords)],
      text: `${title} — ${desc}\n\nWe offer: ${itemsText}`,
      links: [{ label: `${t("ai.serviceInfoLink")} (${title})`, href: `/services/${id}` }],
    };
  }

  return entries;
}

function getBotResponse(
  input: string,
  t: (key: string) => string,
  serviceIntents: ReturnType<typeof buildServiceIntents>
): { text: string; links?: { label: string; href: string }[] } {
  const lower = input.toLowerCase();

  // Try service-specific intents first
  for (const [, intent] of Object.entries(serviceIntents)) {
    if (intent.keys.some((k: string) => lower.includes(k))) {
      const links = intent.links?.map((l) => ({
        label: l.label,
        href: l.href,
      }));
      return { text: intent.text, links };
    }
  }

  // Try static intents
  for (const [, intent] of Object.entries(staticIntents)) {
    if (intent.keys.some((k: string) => lower.includes(k))) {
      const text = t(intent.tKey);
      const links = intent.links?.map((l) => ({
        label: t(l.labelKey),
        href: l.href,
      }));
      return { text, links };
    }
  }

  return { text: t("ai.fallback") };
}

export default function AiAssistant() {
  const { t } = useLocale();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: t("ai.greeting") },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showQuick, setShowQuick] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const serviceIntents = useMemo(() => buildServiceIntents(t), [t]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 200);
  }, [open]);

  const addMessage = (role: "user" | "bot", text: string, links?: { label: string; href: string }[]) => {
    setMessages((prev) => [...prev, { role, text, links }]);
  };

  const handleSend = (text?: string) => {
    const userMsg = text || input.trim();
    if (!userMsg) return;

    addMessage("user", userMsg);
    setInput("");
    setLoading(true);
    setShowQuick(false);

    setTimeout(() => {
      const reply = getBotResponse(userMsg, t, serviceIntents);
      addMessage("bot", reply.text, reply.links);
      setLoading(false);
    }, 500 + Math.random() * 400);
  };

  const handleQuickAction = (intent: string) => {
    const intentCfg = staticIntents[intent];
    if (!intentCfg) return;
    const qKey = quickActions.find((q) => q.intent === intent)?.labelKey;
    if (qKey) handleSend(t(qKey));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {open && (
        <div className="ai-assistant">
          <div className="ai-header">
            <div className="ai-header-icon">
              <Sparkles size={16} />
            </div>
            <div>
              <div className="ai-header-title">{t("ai.assistant")}</div>
              <div className="ai-header-status">Online</div>
            </div>
            <button className="ai-close" onClick={() => setOpen(false)}>
              <X size={18} />
            </button>
          </div>

          <div className="ai-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`ai-message ${msg.role}`}>
                <div className="ai-avatar">
                  {msg.role === "bot" ? <Bot size={14} /> : <User size={14} />}
                </div>
                <div>
                  <div className="ai-bubble">{msg.text}</div>
                  {msg.links && msg.links.length > 0 && (
                    <div className="ai-links">
                      {msg.links.map((link, j) => {
                        const isExternal = link.href.startsWith("http");
                        const cls = "ai-link";
                        if (isExternal) {
                          return (
                            <a key={j} href={link.href} target="_blank" rel="noopener noreferrer" className={cls}>{link.label}</a>
                          );
                        }
                        return (
                          <Link key={j} href={link.href} className={cls} onClick={() => setOpen(false)}>
                            {link.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="ai-message bot">
                <div className="ai-avatar">
                  <Bot size={14} />
                </div>
                <div className="ai-bubble ai-typing">
                  <span className="ai-dot" />
                  <span className="ai-dot" style={{ animationDelay: "0.15s" }} />
                  <span className="ai-dot" style={{ animationDelay: "0.3s" }} />
                </div>
              </div>
            )}

            {showQuick && messages.length <= 2 && (
              <div className="ai-quick-actions">
                <div className="ai-quick-label">{t("ai.quickLabel")}</div>
                <div className="ai-quick-grid">
                  {quickActions.map((q) => (
                    <button
                      key={q.intent}
                      className="ai-quick-btn"
                      onClick={() => handleQuickAction(q.intent)}
                    >
                      {q.icon}
                      {t(q.labelKey)}
                    </button>
                  ))}
                </div>
                <div className="ai-quick-label" style={{ marginTop: 8 }}>{t("ai.serviceQuickLabel")}</div>
                <div className="ai-quick-grid">
                  {SERVICE_IDS.slice(0, 4).map((id) => (
                    <button
                      key={id}
                      className="ai-quick-btn"
                      onClick={() => handleSend(t(`services.${id}.title`))}
                    >
                      {serviceIconMap[id]}
                      {t(`services.${id}.title`)}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          <div className="ai-input-area">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t("ai.placeholder")}
              className="ai-input"
            />
            <button
              className="ai-send"
              onClick={() => handleSend()}
              disabled={!input.trim() || loading}
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}

      <button
        className="ai-fab"
        onClick={() => setOpen(!open)}
        aria-label={t("ai.assistant")}
      >
        {open ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </>
  );
}
