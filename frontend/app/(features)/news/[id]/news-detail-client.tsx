"use client";

import { useParams } from "next/navigation";
import { useState, useCallback, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/app/locale-provider";
import { useGetNewsQuery } from "@/app/store/api/newsApi";
import { Box, Container, Title, Text, Stack, Group, Divider, ActionIcon, Tooltip, Popover, Center, Loader } from "@mantine/core";
import { Calendar, User, ArrowLeft, ArrowRight, Share2, Clock, Check, Link2, Paperclip, ZoomIn } from "lucide-react";
import Lightbox from "@/app/components/ui/Lightbox";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3003";

function resolveAsset(path?: string) {
  if (!path) return "";
  if (path.startsWith("http") || path.startsWith("/images/")) return path;
  return `${API_URL}/${path}`;
}

function formatDate(dateStr: string, locale: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString(locale === "am" ? "am-ET" : "en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function ShareButton({ icon, label, href, onClick }: { icon: ReactNode; label: string; href?: string; onClick?: () => void }) {
  const [hover, setHover] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) { e.preventDefault(); onClick(); }
  };

  const content = (
    <Group
      gap={10}
      p="xs"
      style={{
        borderRadius: 6, cursor: "pointer", transition: "background 0.15s",
        textDecoration: "none", color: "#1f2937",
        background: hover ? "#f3f4f6" : "transparent",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Box style={{ width: 28, height: 28, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", background: "#1f2937" }}>
        {icon}
      </Box>
      <Text size="sm" fw={500}>{label}</Text>
    </Group>
  );

  if (href) {
    return (
      <Box component="a" href={href} target="_blank" rel="noopener noreferrer" onClick={handleClick} style={{ textDecoration: "none" }}>
        {content}
      </Box>
    );
  }
  return <Box component="button" onClick={handleClick} style={{ width: "100%", border: "none", background: "none", padding: 0, textAlign: "left" }}>{content}</Box>;
}

export default function NewsDetailClient() {
  const params = useParams();
  const id = Number(params.id);
  const { t, locale } = useLocale();
  const { data: articles, isLoading } = useGetNewsQuery();
  const [copied, setCopied] = useState(false);
  const [shareOpened, setShareOpened] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleShare = useCallback(async () => {
    const url = window.location.href;
    if (navigator.share) {
      try { await navigator.share({ title: document.title, url }); } catch { /* user cancelled */ }
    } else {
      setShareOpened(true);
    }
  }, []);

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setShareOpened(false);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* clipboard not available */ }
  }, []);

  if (isLoading) return <Center mih={400}><Loader size="lg" color="blue" /></Center>;

  const article = articles?.find((a) => a.id === id) ?? null;
  const visible = articles?.filter((a) => a.isActive) ?? [];
  const idx = article ? visible.indexOf(article) : -1;
  const prev = idx > 0 ? visible[idx - 1] : null;
  const next = idx >= 0 && idx < visible.length - 1 ? visible[idx + 1] : null;

  if (!article) {
    return (
      <Center mih={400}>
        <Text c="gray.5">Article not found.</Text>
      </Center>
    );
  }

  const readingTime = "3 min read";

  const isAm = locale === "am";
  const artTitle = isAm && article.titleAm ? article.titleAm : article.title;
  const artContent = isAm && article.contentAm ? article.contentAm : article.content;

  return (
    <Box bg="gray.0" mih="100vh">
      {/* Hero Banner */}
      <Box
        style={{ position: "relative", height: 280, overflow: "hidden", cursor: "zoom-in" }}
        onClick={() => setPreview(resolveAsset(article.image) || "/images/hospital-hero.jpg")}
      >
        <Image src={resolveAsset(article.image) || "/images/hospital-hero.jpg"} alt={article.title} fill style={{ objectFit: "cover" }} priority />
        <Box
          style={{
            position: "absolute", top: 12, right: 12, zIndex: 5,
            width: 40, height: 40, borderRadius: "50%",
            background: "rgba(4,14,11,0.65)", backdropFilter: "blur(4px)",
            color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
            transition: "background 0.2s ease",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "var(--primary)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(4,14,11,0.65)"; }}
        >
          <ZoomIn size={18} />
        </Box>
        <Box
          style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.1) 60%, rgba(0,0,0,0.3) 100%)",
          }}
        />
        <Container size={1300} style={{ position: "relative", height: "100%", display: "flex", alignItems: "flex-end", paddingBottom: 40 }}>
          <Stack gap={8}>
            <Group gap={8}>
              <Group gap={4}>
                <Clock size={11} color="rgba(255,255,255,0.6)" />
                <Text size="xs" c="white" opacity={0.7}>{readingTime}</Text>
              </Group>
            </Group>
            <Title order={1} c="white" fw={600} className="bykm-display" style={{ fontSize: "clamp(24px, 3.5vw, 36px)", maxWidth: 720, lineHeight: 1.3 }}>
              {artTitle}
            </Title>
          </Stack>
        </Container>
      </Box>

      <Container size={1300} py={32}>
        <Group justify="space-between" align="center" mb="xl">
          <Box component={Link} href="/news" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "#4b5563", textDecoration: "none", fontSize: 14, fontWeight: 500 }}>
            <ArrowLeft size={16} />
            {t("nav.news")}
          </Box>

          <Group gap={4}>
            <Text size="xs" c="gray.5">{t("newsPage.shareThis")}</Text>
            <Popover opened={shareOpened} onChange={setShareOpened} position="bottom-end" shadow="md" withArrow arrowSize={8}>
              <Popover.Target>
                <Tooltip label={copied ? "Copied!" : "Share"} position="bottom">
                  <ActionIcon variant="subtle" color={copied ? "green" : "gray"} size="sm" radius="xl" onClick={handleShare}>
                    {copied ? <Check size={14} /> : <Share2 size={14} />}
                  </ActionIcon>
                </Tooltip>
              </Popover.Target>
              <Popover.Dropdown p={4} style={{ minWidth: 180 }}>
                <Stack gap={2}>
                  <ShareButton
                    icon={
                      <svg viewBox="0 0 24 24" width={16} height={16} fill="#fff"><path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.127.037.5.037.5s.116 3.759.176 5.957c0 .054-.01.106-.03.154a.489.489 0 01-.256.28c-.16.066-.373.046-.373.046s-2.857-1.19-4.085-1.72c1.745 1.532 3.725 4.214 3.726 4.214.096.143.124.321.078.487a.482.482 0 01-.298.31c-.152.054-.315.028-.315.028s-5.314-1.764-6.802-2.29c-.612-.216-.673-.26-.747-.373a.44.44 0 01-.052-.211c.038-.183.3-.34.3-.34s.69-.322 1.836-.716c3.385-1.167 4.63-1.57 4.63-1.57.21-.072.456-.032.617.048.139.07.18.176.18.176s-2.18 1.483-3.455 2.358c-.203.14-.338.14-.514.012-.728-.53-2.534-1.746-2.723-1.865-.233-.076-.4-.238-.226-.515.069-.11.472-.346.472-.346s5.652-2.337 9.052-3.743z"/></svg>
                    }
                    label="Telegram"
                    href={`https://t.me/share/url?url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}&text=${encodeURIComponent(typeof window !== "undefined" ? document.title : "")}`}
                    onClick={() => setShareOpened(false)}
                  />
                  <ShareButton
                    icon={<svg viewBox="0 0 24 24" width={16} height={16} fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>}
                    label="WhatsApp"
                    href={`https://wa.me/?text=${encodeURIComponent(typeof window !== "undefined" ? document.title + " " + window.location.href : "")}`}
                    onClick={() => setShareOpened(false)}
                  />
                  <ShareButton
                    icon={<svg viewBox="0 0 24 24" width={16} height={16} fill="#fff"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>}
                    label="Facebook"
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`}
                    onClick={() => setShareOpened(false)}
                  />
                  <ShareButton
                    icon={<svg viewBox="0 0 24 24" width={16} height={16} fill="#fff"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>}
                    label="X (Twitter)"
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}&text=${encodeURIComponent(typeof window !== "undefined" ? document.title : "")}`}
                    onClick={() => setShareOpened(false)}
                  />
                  <ShareButton
                    icon={<Link2 size={14} />}
                    label={copied ? "Copied!" : "Copy link"}
                    onClick={handleCopyLink}
                  />
                </Stack>
              </Popover.Dropdown>
            </Popover>
          </Group>
        </Group>

        <Group justify="center">
          <Stack maw={680}>
            {/* Meta Info */}
            <Group gap="md" wrap="wrap">
              <Group gap={6}>
                <Calendar size={14} color="#6b7280" />
                <Text size="sm" c="gray.6">{formatDate(article.createdAt, locale)}</Text>
              </Group>
              <Group gap={6}>
                <User size={14} color="#6b7280" />
                <Text size="sm" c="gray.6">{t("newsPage.by")} {article.author}</Text>
              </Group>
            </Group>

            <Divider my="sm" />

            {/* Article Body */}
            <Text size="md" c="gray.8" lh={1.8} style={{ whiteSpace: "pre-line" }}>
              {artContent}
            </Text>

            {/* Attachment */}
            {article.attachment && (
              <>
                <Divider my="lg" />
                <Box
                  component="a"
                  href={resolveAsset(article.attachment)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 10,
                    padding: "14px 18px", borderRadius: 3,
                    background: "var(--bg-tint)", border: "1px solid var(--line)",
                    textDecoration: "none", color: "var(--ink)",
                    transition: "all 0.2s ease",
                  }}
                >
                  <Box style={{ width: 40, height: 40, borderRadius: 8, background: "var(--primary)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Paperclip size={18} />
                  </Box>
                  <Box>
                    <Text size="sm" fw={700} style={{ color: "var(--primary)" }}>{t("newsPage.downloadAttachment")}</Text>
                    <Text size="xs" c="gray.6">{article.attachment.split("/").pop()}</Text>
                  </Box>
                </Box>
              </>
            )}

            <Divider my="lg" />

            {/* Navigation */}
            <Group justify="space-between" wrap="wrap" gap="sm">
              {prev ? (
                <Box
                  component={Link}
                  href={`/news/${prev.id}`}
                  style={{
                    display: "flex", alignItems: "center", gap: 8,
                    color: "#4b5563", textDecoration: "none", fontSize: 14, fontWeight: 600,
                    transition: "color 0.2s",
                    maxWidth: "45%",
                  }}
                >
                  <ArrowLeft size={16} />
                  <Text size="sm" fw={500} truncate>{prev.title}</Text>
                </Box>
              ) : <Box />}
              {next && (
                <Box
                  component={Link}
                  href={`/news/${next.id}`}
                  style={{
                    display: "flex", alignItems: "center", gap: 8,
                    color: "#4b5563", textDecoration: "none", fontSize: 14, fontWeight: 600,
                    transition: "color 0.2s",
                    maxWidth: "45%",
                    textAlign: "right",
                  }}
                >
                  <Text size="sm" fw={500} truncate>{next.title}</Text>
                  <ArrowRight size={16} />
                </Box>
              )}
            </Group>
          </Stack>
        </Group>
      </Container>

      {/* Image Lightbox */}
      <Lightbox
        open={!!preview}
        src={preview || undefined}
        caption={artTitle}
        onClose={() => setPreview(null)}
      />
    </Box>
  );
}
