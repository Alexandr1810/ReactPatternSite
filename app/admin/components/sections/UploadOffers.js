import { useState, useRef } from "react";
import { server_config } from '@/app/utils/server_config';

const API_URL =`${server_config.api_protocol}://${server_config.site_folder}/xlsx/upload-offers/${server_config.site_key}/`; // поменяй при необходимости

export default function UploadOffers({ setAllOffers_plans }) {
  const [file, setFile]       = useState(null);
  const [status, setStatus]   = useState("idle"); // idle | loading | success | error
  const [result, setResult]   = useState(null);
  const inputRef              = useRef(null);

  const handleFile = (e) => {
    const f = e.target.files?.[0];
    if (f) setFile(f);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    if (f) { setFile(f); setStatus("idle"); setResult(null); }
  };

  const handleSubmit = async () => {
    if (!file) return;
    setStatus("loading");
    setResult(null);

    const form = new FormData();
    form.append("file", file);

    try {
      const res  = await fetch(API_URL, { method: "POST", body: form });
      const data = await res.json();
      setResult(data);
      setStatus(res.ok ? "success" : "error");

      const newAllOffers_plans_res = await fetch(`${server_config.api_protocol}://${server_config.site_folder}/front/getOffers/${server_config.site_key}`, {
        ...(true
          ? { cache: 'no-store' }
          : { next: { revalidate: server_config.сaching_period } })
      });
      const newAllOffers_plans_data = await newAllOffers_plans_res.json();
      const newAllOffers_plans = newAllOffers_plans_data.data;
      setAllOffers_plans([...newAllOffers_plans.sort((a, b) => a.position - b.position)])
    } catch (err){
      console.error(err)
      setResult({ error: "Не удалось связаться с сервером" });
      setStatus("error");
    }
  };

  const reset = () => {
    setFile(null); setStatus("idle"); setResult(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Загрузка тарифов</h2>
        <p style={styles.sub}>Файл Excel (.xlsx) по шаблону — строки начиная с третьей</p>

        {/* Дроп-зона */}
        <div
          style={{ ...styles.drop, ...(file ? styles.dropActive : {}) }}
          onDragOver={e => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
        >
          <input
            ref={inputRef}
            type="file"
            accept=".xlsx,.xls"
            style={{ display: "none" }}
            onChange={handleFile}
          />
          {file ? (
            <span style={styles.fileName}>📄 {file.name}</span>
          ) : (
            <span style={styles.dropHint}>Перетащите файл сюда или нажмите для выбора</span>
          )}
        </div>

        {/* Кнопки */}
        <div style={styles.actions}>
          <button
            style={{ ...styles.btn, ...styles.btnPrimary, ...((!file || status === "loading") ? styles.btnDisabled : {}) }}
            onClick={handleSubmit}
            disabled={!file || status === "loading"}
          >
            {status === "loading" ? "Загружаем…" : "Загрузить"}
          </button>
          {(file || result) && (
            <button style={{ ...styles.btn, ...styles.btnSecondary }} onClick={reset}>
              Сбросить
            </button>
          )}
        </div>

        {/* Результат */}
        {result && (
          <div style={{ ...styles.result, ...(status === "success" ? styles.resultOk : styles.resultErr) }}>
            {status === "success" && (
              <>
                <p style={styles.resultTitle}>{result.message}</p>
                {result.skipped > 0 && (
                  <p style={styles.skipped}>Пропущено строк: {result.skipped}</p>
                )}
              </>
            )}
            {status === "error" && (
              <p style={styles.resultTitle}>{result.error || result.message}</p>
            )}

            {/* Список ошибок по строкам */}
            {result.errors?.length > 0 && (
              <div style={styles.errList}>
                <p style={styles.errListTitle}>Проблемные строки:</p>
                {result.errors.map((e, i) => (
                  <div key={i} style={styles.errItem}>
                    <strong>Строка {e.row}</strong> ({e.name}):{" "}
                    {e.issues.join("; ")}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Стили ────────────────────────────────────────────────────────────────────
const styles = {
  card: {
    background: "#f4f8fb",
    borderRadius: 12,
    padding: "20px",
    marginTop: "10px",
  },
  title: { margin: "0 0 6px", fontSize: 22, fontWeight: 700, color: "#1a1a2e" },
  sub:   { margin: "0 0 24px", fontSize: 13, color: "#888" },

  drop: {
    border: "2px dashed #c8cdd8",
    borderRadius: 8,
    padding: "32px 20px",
    textAlign: "center",
    cursor: "pointer",
    transition: "border-color .2s, background .2s",
    background: "#fafbfc",
  },
  dropActive: { background: "#eef1f8" },
  dropHint:   { color: "#aaa", fontSize: 14 },
  fileName:   { color: "#1F3864", fontWeight: 600, fontSize: 14 },

  actions: { display: "flex", gap: 10, marginTop: 20 },
  btn: {
    flex: 1,
    padding: "11px 0",
    borderRadius: 7,
    border: "none",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    transition: "opacity .15s",
  },
  btnPrimary:   { background: "#333", color: "#fff" },
  btnSecondary: { background: "#f0f2f5", color: "#444" },
  btnDisabled:  { opacity: 0.45, cursor: "not-allowed" },

  result:      { marginTop: 22, borderRadius: 8, padding: "14px 16px", fontSize: 13 },
  resultOk:    { background: "#edfaf1", border: "1px solid #b2dfcc" },
  resultErr:   { background: "#fff2f2", border: "1px solid #ffc5c5" },
  resultTitle: { margin: "0 0 4px", fontWeight: 600, fontSize: 14 },
  skipped:     { margin: "4px 0 0", color: "#b07d00" },

  errList:      { marginTop: 10 },
  errListTitle: { margin: "0 0 6px", fontWeight: 600, color: "#c00" },
  errItem: {
    padding: "5px 8px",
    marginBottom: 4,
    background: "#fff8f8",
    borderRadius: 5,
    borderLeft: "3px solid #f99",
    lineHeight: 1.5,
  },
};
