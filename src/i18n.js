export const LANGS = ["pt", "en", "es"];

export const translations = {
  pt: {
    title: "Calculadora de Fuso Horário",
    fromTz: "Meu fuso horário",
    toTz: "Fuso do trabalho",
    baseDay: "Dia base",
    workHours: "Horário de trabalho",
    calculate: "Calcular",
    resultTitle: "Resultado convertido",
    resultContext: "No seu horário local",
    dayChanged: "⚠️ O dia muda na conversão",
    language: "Idioma",
    localTime: "Seu horário local",
    companyTime: "Horário da empresa",
    companyAhead: "A empresa está em um fuso mais adiantado que o seu",
    companyBehind: "A empresa está em um fuso mais atrasado que o seu",
    sameDay: "O expediente acontece no mesmo dia em ambos os fusos",
    placeholders: {
      fromTz: "Selecione seu fuso horário",
      toTz: "Selecione o fuso do trabalho",
      day: "Selecione o dia da semana",
    },
    days: {
      Monday: "Segunda-feira",
      Tuesday: "Terça-feira",
      Wednesday: "Quarta-feira",
      Thursday: "Quinta-feira",
      Friday: "Sexta-feira",
      Saturday: "Sábado",
      Sunday: "Domingo",
    },
  },

  en: {
    title: "Timezone Calculator",
    fromTz: "My timezone",
    toTz: "Work timezone",
    baseDay: "Base day",
    workHours: "Work hours",
    calculate: "Calculate",
    resultTitle: "Converted result",
    resultContext: "In your local time",
    dayChanged: "⚠️ The day changes in the conversion",
    language: "Language",
    localTime: "Your local time",
    companyTime: "Company time",
    companyAhead: "The company is in a more advanced timezone than yours",
    companyBehind: "The company is in a more delayed timezone than yours",
    sameDay: "The work schedule happens on the same day in both timezones",

    placeholders: {
      fromTz: "Select your timezone",
      toTz: "Select work timezone",
      day: "Select weekday",
    },
    days: {
      Monday: "Monday",
      Tuesday: "Tuesday",
      Wednesday: "Wednesday",
      Thursday: "Thursday",
      Friday: "Friday",
      Saturday: "Saturday",
      Sunday: "Sunday",
    },
  },

  es: {
    title: "Calculadora de Zona Horaria",
    fromTz: "Mi zona horaria",
    toTz: "Zona horaria del trabajo",
    baseDay: "Día base",
    workHours: "Horario de trabajo",
    calculate: "Calcular",
    resultTitle: "Resultado convertido",
    resultContext: "En su horario local",
    dayChanged: "⚠️ El día cambia en la conversión",
    language: "Idioma",
    localTime: "Su horario local",
    companyTime: "Horario de la empresa",
    companyAhead: "La empresa está en una zona horaria más adelantada",
    companyBehind: "La empresa está en una zona horaria más atrasada",
    sameDay: "El horario ocurre el mismo día en ambas zonas horarias",

    placeholders: {
      fromTz: "Seleccione su zona horaria",
      toTz: "Seleccione la zona del trabajo",
      day: "Seleccione el día",
    },
    days: {
      Monday: "Lunes",
      Tuesday: "Martes",
      Wednesday: "Miércoles",
      Thursday: "Jueves",
      Friday: "Viernes",
      Saturday: "Sábado",
      Sunday: "Domingo",
    },
  },
};

export function detectLanguage() {
  const saved = localStorage.getItem("lang");
  if (saved) return saved;

  const browserLang = navigator.language.slice(0, 2);
  return LANGS.includes(browserLang) ? browserLang : "en";
}
