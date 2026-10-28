import { useState, useMemo } from "react";

const C = {
  bg: "#FFFFFF",
  surface: "#F6F9F8",
  card: "#FFFFFF",
  border: "#DDE8E4",
  borderLight: "#E8F0EC",
  green: "#1B6B4A",
  greenBright: "#22865D",
  greenLight: "#E6F3ED",
  greenGlow: "rgba(27,107,74,0.15)",
  teal: "#1A8A6E",
  blue: "#2B7CAD",
  blueLight: "#EAF3F9",
  gold: "#B8860B",
  goldLight: "#FDF6E3",
  purple: "#6B5BA7",
  purpleLight: "#F1EEF9",
  red: "#C0392B",
  amber: "#92680A",
  amberLight: "#FEF9EC",
  amberBorder: "#F0DDA0",
  text: "#1A2B24",
  soft: "#4A6358",
  muted: "#7A9489",
  dim: "#A8BFB5",
  white: "#FFFFFF",
};

const F = `'DM Sans Variable','DM Sans',-apple-system,BlinkMacSystemFont,sans-serif`;
const M = `'JetBrains Mono','SF Mono','Fira Code',monospace`;

/* ─────────── Syringe ─────────── */
function Syringe({ pct = 0, drawML = 0, totalML = 1, hasData = false }) {
  const f = Math.min(Math.max(pct, 0), 100);
  const T = 52, B = 268, H = B - T;
  const fH = (f / 100) * H, fY = B - fH;

  return (
    <svg viewBox="0 0 150 350" style={{ width: "100%", maxWidth: 155, height: "auto", display: "block", margin: "0 auto" }}>
      <defs>
        <linearGradient id="lqG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={C.greenBright} stopOpacity=".85" />
          <stop offset="100%" stopColor={C.green} stopOpacity=".45" />
        </linearGradient>
        <filter id="gl"><feGaussianBlur stdDeviation="2" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      </defs>
      <rect x="59" y="5" width="22" height="6" rx="2" fill={C.dim} />
      <rect x="68" y="11" width="4" height="41" rx="1.5" fill={C.dim} opacity=".6" />
      <rect x="48" y={T - 2} width="44" height={H + 4} rx="6" fill={C.surface} stroke={C.border} strokeWidth="1.2" />
      <rect x="53" y={T} width="34" height={H} rx="3.5" fill={C.white} stroke={C.borderLight} strokeWidth=".5" />
      {f > 0 && <rect x="53" y={fY} width="34" height={fH} rx={fY > B - 5 ? 3.5 : 0} fill="url(#lqG)" />}
      {Array.from({ length: 11 }, (_, i) => {
        const y = T + (i / 10) * H;
        const v = ((10 - i) / 10) * totalML;
        const maj = i % 5 === 0;
        return (
          <g key={i}>
            <line x1={maj ? 46 : 50} y1={y} x2={62} y2={y} stroke={C.dim} strokeWidth={maj ? .9 : .4} />
            {maj && <text x={40} y={y + 3} textAnchor="end" fill={C.muted} fontSize="7.5" fontFamily={M}>{v.toFixed(1)}</text>}
          </g>
        );
      })}
      {hasData && f > 0 && f < 100 && (
        <g filter="url(#gl)">
          <line x1="90" y1={fY} x2="118" y2={fY} stroke={C.green} strokeWidth=".9" strokeDasharray="3,2" opacity=".6" />
          <rect x="98" y={fY - 11} width="50" height="22" rx="5" fill={C.greenLight} stroke={C.green} strokeWidth=".6" strokeOpacity=".3" />
          <text x="123" y={fY + 4} textAnchor="middle" fill={C.green} fontSize="9.5" fontFamily={M} fontWeight="600">{drawML.toFixed(3)}</text>
        </g>
      )}
      <rect x="63" y={B + 2} width="14" height="14" rx="2.5" fill={C.dim} opacity=".5" />
      <line x1="70" y1={B + 16} x2="70" y2={B + 58} stroke={C.muted} strokeWidth="1.1" strokeLinecap="round" />
      <text x="70" y={B + 72} textAnchor="middle" fill={C.muted} fontSize="7.5" fontFamily={F}>mL</text>
    </svg>
  );
}

/* ─────────── Metric ─────────── */
function Metric({ label, value, unit, color, bgColor, sub, empty }) {
  return (
    <div style={{ background: bgColor || C.white, border: `1px solid ${C.border}`, borderRadius: 10, padding: "13px 15px", flex: "1 1 130px", minWidth: 125, position: "relative", overflow: "hidden", opacity: empty ? .55 : 1, transition: "opacity .3s" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2.5, background: color, opacity: empty ? .25 : .6, transition: "opacity .3s" }} />
      <div style={{ fontSize: 9.5, color: C.muted, fontFamily: F, textTransform: "uppercase", letterSpacing: ".09em", fontWeight: 700, marginBottom: 7 }}>{label}</div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 3 }}>
        <span style={{ fontSize: 22, fontWeight: 700, color: empty ? C.dim : color, fontFamily: M, lineHeight: 1, transition: "color .3s" }}>{value}</span>
        {unit && <span style={{ fontSize: 11, color: C.muted, fontFamily: F }}>{unit}</span>}
      </div>
      {sub && <div style={{ fontSize: 9.5, color: C.dim, fontFamily: F, marginTop: 3 }}>{sub}</div>}
    </div>
  );
}

/* ─────────── Chip ─────────── */
function Chip({ label, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      padding: "4px 10px", fontSize: 11, fontFamily: M, fontWeight: 500,
      background: active ? C.greenLight : C.white,
      color: active ? C.green : C.muted,
      border: `1px solid ${active ? C.green + "55" : C.border}`,
      borderRadius: 5, cursor: "pointer", transition: "all .15s", outline: "none",
    }}>{label}</button>
  );
}

/* ─────────── Disclaimer Gate ─────────── */
function DisclaimerGate({ onAccept }) {
  const [checked, setChecked] = useState(false);

  return (
    <div style={{ maxWidth: 520, width: "100%", animation: "fadeIn .5s ease-out" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 10, background: C.greenLight, padding: "6px 16px", borderRadius: 100, border: `1px solid ${C.green}20` }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="2" strokeLinecap="round"><path d="M6 3v18M18 3v18M6 12h12M9 3h6M9 21h6" /></svg>
          <span style={{ fontSize: 10, fontWeight: 700, color: C.green, letterSpacing: ".15em", textTransform: "uppercase" }}>Peptide Calculator</span>
        </div>
        <h1 style={{ fontSize: 24, fontWeight: 700, margin: "0 0 4px", letterSpacing: "-.02em", color: C.text }}>Reconstitution Calculator</h1>
        <p style={{ fontSize: 13, color: C.muted, margin: 0 }}>Please review the disclaimer below before continuing</p>
      </div>

      {/* Disclaimer card */}
      <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 14, padding: "24px 22px", boxShadow: "0 1px 4px rgba(0,0,0,.05)" }}>

        {/* Warning icon */}
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 48, height: 48, borderRadius: 12, background: C.amberLight, border: `1px solid ${C.amberBorder}` }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={C.amber} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>
        </div>

        <h2 style={{ fontSize: 16, fontWeight: 700, textAlign: "center", margin: "0 0 14px", color: C.text }}>Disclaimer & Acknowledgment</h2>

        <div style={{ fontSize: 12.5, lineHeight: 1.8, color: C.soft, marginBottom: 20 }}>
          <p style={{ margin: "0 0 10px" }}>
            This calculator is provided <strong style={{ color: C.text }}>for entertainment and educational purposes only</strong> and should not be considered medical, veterinary, or professional advice of any kind. Consult a licensed healthcare professional before making any decisions related to health or research protocols.
          </p>
          <p style={{ margin: "0 0 10px" }}>
            Research peptides are intended <strong style={{ color: C.text }}>strictly for laboratory research and in-vitro use only</strong>. They are not approved for human or animal consumption by the FDA or any regulatory body.
          </p>
          <p style={{ margin: 0 }}>
            By using this calculator, you acknowledge that no responsibility or liability is assumed for how this information is used. Results are mathematical estimates and should be independently verified.
          </p>
        </div>

        {/* Checkbox */}
        <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer", padding: "12px 14px", background: checked ? C.greenLight : C.surface, border: `1px solid ${checked ? C.green + "40" : C.border}`, borderRadius: 8, transition: "all .2s", marginBottom: 16 }}>
          <input type="checkbox" checked={checked} onChange={e => setChecked(e.target.checked)}
            style={{ marginTop: 2, accentColor: C.green, width: 16, height: 16, cursor: "pointer" }} />
          <span style={{ fontSize: 12, lineHeight: 1.6, color: C.text }}>
            I understand this calculator is <strong>for entertainment purposes only</strong>, is not medical advice, and that all research peptides are for research use only and not for human consumption.
          </span>
        </label>

        {/* Button */}
        <button onClick={() => checked && onAccept()} disabled={!checked} style={{
          width: "100%", padding: "12px 0", fontSize: 13, fontWeight: 700, fontFamily: F,
          letterSpacing: ".06em", textTransform: "uppercase",
          background: checked ? C.green : C.dim,
          color: C.white, border: "none", borderRadius: 8,
          cursor: checked ? "pointer" : "not-allowed",
          transition: "background .2s, transform .1s",
          opacity: checked ? 1 : .5,
        }}>
          Continue to Calculator
        </button>
      </div>

      {/* Footer */}
      <div style={{ textAlign: "center", marginTop: 20, fontSize: 9.5, color: C.dim, lineHeight: 1.6 }}>
        <span style={{ color: C.green, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase" }}>Peptide Calculator</span>
      </div>
    </div>
  );
}

/* ═══════════════════ MAIN ═══════════════════ */
export default function PeptideCalc() {
  const [accepted, setAccepted] = useState(false);
  const [vialMg, setVialMg] = useState("");
  const [doseMg, setDoseMg] = useState("");
  const [waterMl, setWaterMl] = useState("");

  const r = useMemo(() => {
    const v = parseFloat(vialMg), d = parseFloat(doseMg), w = parseFloat(waterMl);
    if (!v || !d || !w || v <= 0 || d <= 0 || w <= 0) return null;
    if (d > v) return { err: "Dose exceeds total peptide in vial." };
    const conc = v / w, draw = d / conc, units = draw * 100, doses = Math.floor(v / d), pct = (draw / w) * 100;
    return { conc, draw, units, doses, pct };
  }, [vialMg, doseMg, waterMl]);

  const hasData = r && !r.err;

  const inp = {
    width: "100%", padding: "11px 44px 11px 14px", fontSize: 14,
    fontFamily: M, fontWeight: 500, background: C.white,
    border: `1.5px solid ${C.border}`, borderRadius: 8,
    color: C.text, outline: "none", transition: "border-color .2s, box-shadow .2s", boxSizing: "border-box",
  };
  const lbl = { fontSize: 10, color: C.muted, fontFamily: F, textTransform: "uppercase", letterSpacing: ".1em", fontWeight: 700, marginBottom: 5, display: "block" };
  const ub = { position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", fontSize: 10.5, color: C.muted, fontFamily: M, fontWeight: 600, background: C.surface, padding: "2px 6px", borderRadius: 4 };

  return (
    <div style={{ minHeight: "100vh", background: C.surface, fontFamily: F, color: C.text, padding: "calc(24px + env(safe-area-inset-top)) calc(12px + env(safe-area-inset-right)) calc(24px + env(safe-area-inset-bottom)) calc(12px + env(safe-area-inset-left))", display: "flex", justifyContent: "center" }}>
      <style>{`
        *,*::before,*::after{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
        button,label{-webkit-user-select:none;user-select:none}
        input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}
        input[type=number]{-moz-appearance:textfield}
        input::placeholder{color:${C.dim}}
        input:focus{border-color:${C.green}!important;box-shadow:0 0 0 3px ${C.greenGlow}!important}
        @keyframes fadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
      `}</style>

      {/* Opaque backdrop under the iOS status bar so scrolled content never collides with it */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: "env(safe-area-inset-top)", background: C.surface, zIndex: 10, pointerEvents: "none" }} />

      {/* ── DISCLAIMER GATE ── */}
      {!accepted && <DisclaimerGate onAccept={() => setAccepted(true)} />}

      {/* ── CALCULATOR ── */}
      {accepted && (
        <div style={{ maxWidth: 620, width: "100%", animation: "fadeIn .5s ease-out" }}>

          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 10, background: C.greenLight, padding: "6px 16px", borderRadius: 100, border: `1px solid ${C.green}20` }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="2" strokeLinecap="round"><path d="M6 3v18M18 3v18M6 12h12M9 3h6M9 21h6" /></svg>
              <span style={{ fontSize: 10, fontWeight: 700, color: C.green, letterSpacing: ".15em", textTransform: "uppercase" }}>Peptide Calculator</span>
            </div>
            <h1 style={{ fontSize: 26, fontWeight: 700, margin: "0 0 4px", letterSpacing: "-.02em", color: C.text }}>Reconstitution Calculator</h1>
            <p style={{ fontSize: 13, color: C.muted, margin: 0 }}>Calculate reconstitution volume, concentration & syringe units</p>
          </div>

          {/* Entertainment disclaimer banner */}
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            background: C.amberLight, border: `1px solid ${C.amberBorder}`, borderRadius: 8,
            padding: "10px 14px", marginBottom: 14, fontSize: 11, lineHeight: 1.5, color: C.amber,
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.amber} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>
              <strong>For entertainment & educational purposes only.</strong> Not medical advice. All products are for research use only. Please consult a doctor.
            </span>
          </div>

          {/* Inputs */}
          <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 14, padding: "22px 18px", marginBottom: 14, boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>

            <div style={{ marginBottom: 16 }}>
              <label style={lbl}>MG In Vial</label>
              <div style={{ position: "relative" }}>
                <input type="number" inputMode="decimal" value={vialMg} onChange={e => setVialMg(e.target.value)}
                  placeholder="10" min="0" step="any" style={inp} />
                <span style={ub}>mg</span>
              </div>
              <div style={{ display: "flex", gap: 5, marginTop: 7, flexWrap: "wrap" }}>
                {["5", "10", "15", "20", "50"].map(v => <Chip key={v} label={`${v}mg`} active={vialMg === v} onClick={() => setVialMg(v)} />)}
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={lbl}>Desired Research Dose</label>
              <div style={{ position: "relative" }}>
                <input type="number" inputMode="decimal" value={doseMg} onChange={e => setDoseMg(e.target.value)}
                  placeholder="0.25" min="0" step="any" style={inp} />
                <span style={ub}>mg</span>
              </div>
              <div style={{ display: "flex", gap: 5, marginTop: 7, flexWrap: "wrap" }}>
                {["0.1", "0.25", "0.5", "1", "2.5", "5"].map(v => <Chip key={v} label={`${v}mg`} active={doseMg === v} onClick={() => setDoseMg(v)} />)}
              </div>
            </div>

            <div>
              <label style={lbl}>Bacteriostatic Water</label>
              <div style={{ position: "relative" }}>
                <input type="number" inputMode="decimal" value={waterMl} onChange={e => setWaterMl(e.target.value)}
                  placeholder="2" min="0" step="any" style={inp} />
                <span style={ub}>mL</span>
              </div>
              <div style={{ display: "flex", gap: 5, marginTop: 7, flexWrap: "wrap" }}>
                {["0.5", "1", "1.5", "2", "2.5", "3"].map(v => <Chip key={v} label={`${v}mL`} active={waterMl === v} onClick={() => setWaterMl(v)} />)}
              </div>
            </div>
          </div>

          {/* Error */}
          {r?.err && (
            <div style={{ background: "#FDF2F2", border: "1px solid #F5C6C6", borderRadius: 10, padding: "13px 15px", fontSize: 12.5, color: C.red, textAlign: "center", marginBottom: 14, animation: "fadeIn .3s ease-out" }}>
              {r.err}
            </div>
          )}

          {/* Results (always visible) */}
          <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 14, padding: "22px 18px", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>

            <div style={{ display: "flex", gap: 20, flexWrap: "wrap", alignItems: "flex-start" }}>

              {/* Metrics */}
              <div style={{ flex: "1 1 280px", display: "flex", flexDirection: "column", gap: 8, minWidth: 240 }}>
                <Metric label="Concentration" value={hasData ? r.conc.toFixed(2) : "—"} unit="mg/mL" color={C.green} bgColor={C.greenLight} empty={!hasData} />
                <Metric label="Draw Volume" value={hasData ? r.draw.toFixed(3) : "—"} unit="mL" color={C.blue} bgColor={C.blueLight} sub="per research dose" empty={!hasData} />
                <Metric label="Syringe Units" value={hasData ? r.units.toFixed(1) : "—"} unit="IU" color={C.gold} bgColor={C.goldLight} sub="insulin syringe" empty={!hasData} />
                <Metric label="Total Doses" value={hasData ? r.doses : "—"} unit="per vial" color={C.purple} bgColor={C.purpleLight} empty={!hasData} />
              </div>

              {/* Syringe */}
              <div style={{ flex: "0 0 170px", textAlign: "center", alignSelf: "center" }}>
                <div style={{ fontSize: 9.5, color: C.muted, textTransform: "uppercase", letterSpacing: ".1em", fontWeight: 700, marginBottom: 10 }}>Syringe Draw</div>
                <Syringe
                  pct={hasData ? Math.min(r.pct * parseFloat(waterMl), 100) : 0}
                  drawML={hasData ? r.draw : 0}
                  totalML={hasData ? Math.max(parseFloat(waterMl), 1) : 1}
                  hasData={hasData}
                />
                <div style={{ fontSize: 12, color: hasData ? C.soft : C.dim, marginTop: 4, transition: "color .3s" }}>
                  Draw <span style={{ color: hasData ? C.green : C.dim, fontWeight: 700, fontFamily: M, transition: "color .3s" }}>{hasData ? r.draw.toFixed(3) + "mL" : "—"}</span>
                </div>
                <div style={{ fontSize: 10.5, color: C.dim }}>{hasData ? `(${r.units.toFixed(1)} units)` : ""}</div>
              </div>
            </div>

            {/* Summary */}
            {hasData && (
              <div style={{ marginTop: 18, background: C.greenLight, border: `1px solid ${C.green}18`, borderRadius: 8, padding: "13px 15px", fontSize: 12, lineHeight: 1.85, color: C.soft, animation: "fadeIn .35s ease-out" }}>
                Add{" "}
                <span style={{ color: C.teal, fontWeight: 600, fontFamily: M }}>{parseFloat(waterMl).toFixed(1)}mL</span>{" "}
                bacteriostatic water to a{" "}
                <span style={{ color: C.text, fontWeight: 600, fontFamily: M }}>{parseFloat(vialMg)}mg</span>{" "}
                vial. Each{" "}
                <span style={{ color: C.green, fontWeight: 600, fontFamily: M }}>{parseFloat(doseMg)}mg</span>{" "}
                research dose ={" "}
                <span style={{ color: C.green, fontWeight: 700, fontFamily: M }}>{r.draw.toFixed(3)}mL</span>{" "}
                ({r.units.toFixed(1)} units on an insulin syringe).{" "}
                Vial contains approximately{" "}
                <span style={{ color: C.purple, fontWeight: 600, fontFamily: M }}>{r.doses} doses</span>.
              </div>
            )}

            {!hasData && !r?.err && (
              <div style={{ marginTop: 16, textAlign: "center", fontSize: 11.5, color: C.dim, padding: "4px 0" }}>
                Enter your values above to see results
              </div>
            )}
          </div>

          {/* Footer disclaimer */}
          <div style={{ textAlign: "center", marginTop: 24, paddingTop: 14, borderTop: `1px solid ${C.border}`, fontSize: 9.5, color: C.muted, lineHeight: 1.8, letterSpacing: ".01em", maxWidth: 500, marginInline: "auto" }}>
            This calculator is for entertainment and educational purposes only and should not be considered medical advice. All products are intended strictly for laboratory research and in-vitro use. Not for human or animal consumption. Please consult a licensed healthcare professional.
          </div>
        </div>
      )}
    </div>
  );
}
