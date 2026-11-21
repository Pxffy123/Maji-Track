// Sample Nairobi data used by the dashboard until it is wired to the backend.
export const areas = [
  {
    id: "embakasi",
    name: "Embakasi",
    location: "Umoja 1, Pipeline, Donholm",
    status: "No Water",
    severity: "Critical",
    reports: 18,
    lastUpdated: "Today",
  },
  {
    id: "kibra",
    name: "Kibra",
    location: "Laini Saba, Makina",
    status: "No Water",
    severity: "Critical",
    reports: 15,
    lastUpdated: "Today",
  },
  {
    id: "westlands",
    name: "Westlands",
    location: "Kangemi, Mountain View",
    status: "Low Supply",
    severity: "High",
    reports: 12,
    lastUpdated: "Today",
  },
  {
    id: "makadara",
    name: "Makadara",
    location: "Buruburu, Maringo",
    status: "Low Supply",
    severity: "Moderate",
    reports: 9,
    lastUpdated: "Yesterday",
  },
  {
    id: "kasarani",
    name: "Kasarani",
    location: "Mwiki, Roysambu",
    status: "Available",
    severity: "Low",
    reports: 7,
    lastUpdated: "Yesterday",
  },
];

export const sampleReports = [
  {
    id: 1,
    title: "Critical Water Shortage",
    area: "Umoja 1, Embakasi",
    description:
      "Residents have reported being without water for approximately three weeks.",
    status: "No Water",
    date: "Today",
    verified: true,
    severity: "Critical",
  },
  {
    id: 2,
    title: "Prolonged Water Interruption",
    area: "Laini Saba, Kibra",
    description:
      "Several households have experienced an extended interruption in water supply.",
    status: "No Water",
    date: "Today",
    verified: true,
    severity: "Critical",
  },
  {
    id: 3,
    title: "Irregular Water Supply",
    area: "Kangemi, Westlands",
    description:
      "Residents report inconsistent water supply over the past five days.",
    status: "Low Supply",
    date: "Yesterday",
    verified: true,
    severity: "High",
  },
  {
    id: 4,
    title: "Water Supply Disruption",
    area: "Buruburu, Makadara",
    description:
      "Water supply has been inconsistent in several neighbourhoods.",
    status: "Low Supply",
    date: "Yesterday",
    verified: true,
    severity: "Moderate",
  },
];

export const severityPriority = {
  Critical: 4,
  High: 3,
  Moderate: 2,
  Low: 1,
};
