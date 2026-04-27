import ivy from "@/assets/uni-ivy.jpg";
import naz from "@/assets/uni-naz.jpg";
import oxford from "@/assets/uni-oxford.jpg";
import eu from "@/assets/uni-eu.jpg";
import satbayev from "@/assets/uni-satbayev.jpg";
import state from "@/assets/uni-state.jpg";

export type University = {
  id: string;
  name: string;
  region: "Kazakhstan" | "International";
  country: string;
  rankingLabel: string;
  rankingValue: number;
  requirement: string;
  ielts?: number;
  unt?: boolean;
  image: string;
  tier: "Reach" | "Match" | "Safety";
  majors: string[];
};

export const universities: University[] = [
  {
    id: "harvard",
    name: "Harvard University",
    region: "International",
    country: "USA",
    rankingLabel: "QS #4",
    rankingValue: 4,
    requirement: "SAT 1500+ • IELTS 7.5",
    ielts: 7.5,
    image: ivy,
    tier: "Reach",
    majors: ["Physics", "CS", "Economics"],
  },
  {
    id: "oxford",
    name: "University of Oxford",
    region: "International",
    country: "UK",
    rankingLabel: "QS #3",
    rankingValue: 3,
    requirement: "A*AA • IELTS 7.0 Required",
    ielts: 7.0,
    image: oxford,
    tier: "Reach",
    majors: ["Physics", "PPE", "Engineering"],
  },
  {
    id: "nu",
    name: "Nazarbayev University",
    region: "Kazakhstan",
    country: "Kazakhstan",
    rankingLabel: "QS #320",
    rankingValue: 320,
    requirement: "SAT 1300+ • UNT 130+ • IELTS 6.5",
    ielts: 6.5,
    unt: true,
    image: naz,
    tier: "Reach",
    majors: ["Physics", "Engineering", "CS"],
  },
  {
    id: "tudelft",
    name: "TU Delft",
    region: "International",
    country: "Netherlands",
    rankingLabel: "QS #47",
    rankingValue: 47,
    requirement: "IELTS 6.5 • Strong Math/Physics",
    ielts: 6.5,
    image: eu,
    tier: "Match",
    majors: ["Physics", "Aerospace", "Engineering"],
  },
  {
    id: "satbayev",
    name: "Satbayev University",
    region: "Kazakhstan",
    country: "Kazakhstan",
    rankingLabel: "National Top 5",
    rankingValue: 700,
    requirement: "UNT 100+ • IELTS 5.5 (optional)",
    unt: true,
    ielts: 5.5,
    image: satbayev,
    tier: "Match",
    majors: ["Physics", "Mining", "Engineering"],
  },
  {
    id: "munich",
    name: "TU Munich",
    region: "International",
    country: "Germany",
    rankingLabel: "QS #28",
    rankingValue: 28,
    requirement: "IELTS 6.5 • Math/Physics required",
    ielts: 6.5,
    image: eu,
    tier: "Match",
    majors: ["Physics", "Mechanical Eng", "CS"],
  },
  {
    id: "kaznu",
    name: "Al-Farabi KazNU",
    region: "Kazakhstan",
    country: "Kazakhstan",
    rankingLabel: "QS #160",
    rankingValue: 160,
    requirement: "UNT 90+ • Local docs",
    unt: true,
    image: satbayev,
    tier: "Safety",
    majors: ["Physics", "Mathematics", "Chemistry"],
  },
  {
    id: "asu",
    name: "Arizona State University",
    region: "International",
    country: "USA",
    rankingLabel: "QS #179",
    rankingValue: 179,
    requirement: "SAT 1100+ • IELTS 6.0",
    ielts: 6.0,
    image: state,
    tier: "Safety",
    majors: ["Physics", "Engineering", "Business"],
  },
];
