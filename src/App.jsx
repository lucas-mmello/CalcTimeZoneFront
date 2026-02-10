import React, { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FiGlobe,
  FiMapPin,
  FiBriefcase,
  FiCalendar,
  FiClock,
  FiArrowRight,
  FiAlertCircle,
  FiCheckCircle,
} from "react-icons/fi";
import { translations, detectLanguage } from "./i18n";
import "./styles.css";

export default function App() {
  const [timezones, setTimezones] = useState([]);
  const [fromTz, setFromTz] = useState(null);
  const [toTz, setToTz] = useState(null);
  const [start, setStart] = useState("09:00");
  const [end, setEnd] = useState("18:00");
  const [result, setResult] = useState(null);

  const [lang, setLang] = useState(detectLanguage());
  const t = translations[lang];

  const dayValues = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const days = dayValues.map((d) => ({
    value: d,
    label: t.days[d],
  }));

  const [day, setDay] = useState(days[0]);

  useEffect(() => {
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
    setDay((prev) =>
      prev ? { value: prev.value, label: t.days[prev.value] } : days[0],
    );
  }, [lang]);

  // 🔹 Carregar timezones da API (novo formato)
  useEffect(() => {
    axios
      .get("https://calc-time-zone-api.vercel.app/api/timezones")
      .then((res) => {
        const adapted = res.data.map((tz) => ({
          value: tz.id, // ID real do timezone
          label: tz.label, // Label pronta pra UI
          keywords: tz.keywords, // Para busca avançada
        }));

        setTimezones(adapted);
      })
      .catch(() => {
        toast.error(t.errors.apiError, {
          icon: <FiAlertCircle />,
        });
      });
  }, []);

  // 🔍 Busca inteligente usando keywords
  const filterOption = (option, inputValue) => {
    if (!inputValue) return true;
    const search = inputValue.toLowerCase();

    return option.data.keywords?.some((k) => k.includes(search));
  };

  const calculate = async () => {
    if (!fromTz || !toTz || !day || !start || !end) {
      toast.error(t.errors.fillAllFields, {
        icon: <FiAlertCircle />,
      });
      return;
    }

    if (fromTz.value === toTz.value) {
      toast.error(t.errors.sameTimezone, {
        icon: <FiAlertCircle />,
      });
      return;
    }

    try {
      const res = await axios.post(
        "https://calc-time-zone-api.vercel.app/api/convert",
        {
          start,
          end,
          day: day.value,
          from: fromTz.value, // ID do timezone
          to: toTz.value, // ID do timezone
        },
      );

      setResult(res.data);

      toast.success(t.success.calculated, {
        icon: <FiCheckCircle />,
      });
    } catch {
      toast.error(t.errors.apiError, {
        icon: <FiAlertCircle />,
      });
    }
  };

  const selectStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: "#020617",
      borderColor: "#1e293b",
      borderRadius: 8,
      padding: 2,
      boxShadow: "none",
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "#020617",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? "#1e293b" : "#020617",
      color: "#e5e7eb",
    }),
    singleValue: (base) => ({ ...base, color: "#e5e7eb" }),
    input: (base) => ({ ...base, color: "#e5e7eb" }),
    placeholder: (base) => ({ ...base, color: "#94a3b8" }),
  };

  return (
    <>
      <div className="container">
        <h2>
          <FiGlobe /> {t.title}
        </h2>

        <label>{t.language}</label>
        <select value={lang} onChange={(e) => setLang(e.target.value)}>
          <option value="pt">Português</option>
          <option value="en">English</option>
          <option value="es">Español</option>
        </select>

        <label>
          <FiMapPin /> {t.fromTz}
        </label>
        <Select
          styles={selectStyles}
          placeholder={t.placeholders.fromTz}
          options={timezones}
          onChange={setFromTz}
          filterOption={filterOption}
        />

        <label>
          <FiBriefcase /> {t.toTz}
        </label>
        <Select
          styles={selectStyles}
          placeholder={t.placeholders.toTz}
          options={timezones}
          onChange={setToTz}
          filterOption={filterOption}
        />

        <label>
          <FiCalendar /> {t.baseDay}
        </label>
        <Select
          styles={selectStyles}
          options={days}
          value={day}
          onChange={setDay}
        />

        <label>
          <FiClock /> {t.workHours}
        </label>
        <div className="time-row">
          <input
            type="time"
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />
          <span>→</span>
          <input
            type="time"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
          />
        </div>

        <button
          onClick={calculate}
          disabled={!fromTz || !toTz}
          style={{ opacity: !fromTz || !toTz ? 0.6 : 1 }}
        >
          {t.calculate}
        </button>

        {result && (
          <div className="result">
            <strong>{t.resultTitle}</strong>
            <p style={{ opacity: 0.75 }}>{t.resultContext}</p>

            <div className="result-block highlight">
              <h4>
                <FiMapPin /> {t.localTime}
              </h4>
              <p className="result-date">
                {t.days[result.local.day]} — {result.local.date}
              </p>
              <p className="result-time">
                {result.local.start} <FiArrowRight /> {result.local.end}
              </p>
            </div>

            <div className="result-block muted">
              <h4>
                <FiBriefcase /> {t.companyTime}
              </h4>
              <p className="result-date">
                {t.days[result.company.day]} — {result.company.date}
              </p>
              <p className="result-time">
                {result.company.start} → {result.company.end}
              </p>
            </div>

            {result.case === "company_ahead" && (
              <div className="badge warning">
                <FiAlertCircle /> {t.companyAhead}
              </div>
            )}

            {result.case === "company_behind" && (
              <div className="badge info">
                <FiAlertCircle /> {t.companyBehind}
              </div>
            )}

            {result.case === "same_day" && (
              <div className="badge success">
                <FiCheckCircle /> {t.sameDay}
              </div>
            )}
          </div>
        )}
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="dark"
      />
    </>
  );
}
