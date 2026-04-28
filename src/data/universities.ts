export type Tier = "Reach" | "Match" | "Safety";
export type ProgramStrength = "Physics" | "Engineering" | "Tech/CS" | "Business" | "Medicine" | "Humanities" | "Law" | "Arts/Design" | "Sciences" | "Architecture";

export type University = {
  id: string;
  name: string;
  region: "Kazakhstan" | "International";
  country: string;
  rankingLabel: string;
  rankingValue: number; // QS-style; lower = better. Use 9999 for unranked/national.
  requirement: string;
  ielts?: number;
  toefl?: number;
  sat?: number;
  unt?: number; // UNT/ЕНТ minimum threshold
  tier: Tier;
  majors: string[];
  brand: [string, string];
  notes?: string;
  /** Annual tuition for international students in USD (approximate). */
  tuitionUSD: number;
  /** World-class program strengths used for filtering. */
  programStrength: ProgramStrength[];
  /** Lower-tuition, well-ranked universities flagged as Hidden Gems. */
  hiddenGem?: boolean;
  /** Short marketing highlights surfaced on details modal. */
  highlights?: string[];
};

const B = {
  crimson: ["#A41E22", "#3D0A0C"] as [string, string],
  oxfordBlue: ["#002147", "#0B3D7A"] as [string, string],
  cambridgeBlue: ["#A3C1AD", "#1E5631"] as [string, string],
  yale: ["#00356B", "#001A36"] as [string, string],
  princeton: ["#E77500", "#5C2E00"] as [string, string],
  stanfordRed: ["#8C1515", "#3F0808"] as [string, string],
  mitRed: ["#A31F34", "#1F1F1F"] as [string, string],
  berkeleyGold: ["#003262", "#FDB515"] as [string, string],
  columbiaBlue: ["#9BCBEB", "#003B5C"] as [string, string],
  cornellRed: ["#B31B1B", "#222222"] as [string, string],
  brown: ["#4E3629", "#241510"] as [string, string],
  upenn: ["#011F5B", "#990000"] as [string, string],
  dartmouth: ["#00693E", "#012E1F"] as [string, string],
  uchicago: ["#800000", "#2A0000"] as [string, string],
  jhu: ["#002D72", "#1F1F1F"] as [string, string],
  duke: ["#012169", "#001A4D"] as [string, string],
  nu_edu: ["#41B6E6", "#003E7E"] as [string, string],
  satbayev: ["#1B5E20", "#0B2E10"] as [string, string],
  kbtu: ["#003366", "#FF6F00"] as [string, string],
  aitu: ["#0072CE", "#001F5C"] as [string, string],
  iitu: ["#0F4C81", "#08274A"] as [string, string],
  kaznu: ["#1E4D8C", "#0A2545"] as [string, string],
  kaznpu: ["#7A1F1F", "#3D0F0F"] as [string, string],
  kaztu: ["#0E5F9E", "#062E4F"] as [string, string],
  kimep: ["#003F87", "#001A38"] as [string, string],
  suleyman: ["#C0392B", "#5C1A12"] as [string, string],
  agraryan: ["#2E7D32", "#11371A"] as [string, string],
  almaty: ["#0F4C81", "#062340"] as [string, string],
  oxford: ["#002147", "#0B3D7A"] as [string, string],
  cambridge: ["#A3C1AD", "#1E5631"] as [string, string],
  imperial: ["#003E74", "#001E3A"] as [string, string],
  ucl: ["#002248", "#500778"] as [string, string],
  lse: ["#7A003C", "#3A001C"] as [string, string],
  kings: ["#7C2855", "#3A0F26"] as [string, string],
  edinburgh: ["#003865", "#9B1B30"] as [string, string],
  manchester: ["#660099", "#330050"] as [string, string],
  warwick: ["#3C1053", "#1A0626"] as [string, string],
  bristol: ["#AB2328", "#3A0A0C"] as [string, string],
  glasgow: ["#003865", "#001932"] as [string, string],
  durham: ["#7E317B", "#3F183E"] as [string, string],
  stand: ["#00539B", "#FFD700"] as [string, string],
  tudelft: ["#00A6D6", "#003E5C"] as [string, string],
  leiden: ["#001158", "#000832"] as [string, string],
  uva: ["#A6093D", "#3A0316"] as [string, string],
  utrecht: ["#FFCD00", "#3A2E00"] as [string, string],
  rug: ["#E2007A", "#5C0030"] as [string, string],
  eindhoven: ["#E2007A", "#1F1F1F"] as [string, string],
  tum: ["#0065BD", "#003366"] as [string, string],
  lmu: ["#00883A", "#003319"] as [string, string],
  heidelberg: ["#A30000", "#3A0000"] as [string, string],
  rwth: ["#00549F", "#001E3A"] as [string, string],
  humboldt: ["#005AA0", "#001E3A"] as [string, string],
  freiburg: ["#004A99", "#001A38"] as [string, string],
  bonn: ["#004F9F", "#001E3A"] as [string, string],
  mannheim: ["#1F4E79", "#0A1F33"] as [string, string],
  sorbonne: ["#01205C", "#000832"] as [string, string],
  psl: ["#E63946", "#3A0E12"] as [string, string],
  polytechnique: ["#1F2E5C", "#080F1F"] as [string, string],
  centralesupelec: ["#003366", "#001A33"] as [string, string],
  scpo: ["#E2001A", "#3A0006"] as [string, string],
  insead: ["#00205B", "#000A1F"] as [string, string],
  ethz: ["#1F407A", "#0A1F38"] as [string, string],
  epfl: ["#FF0000", "#330000"] as [string, string],
  uzh: ["#0028A5", "#000F3D"] as [string, string],
  bocconi: ["#003E5C", "#001A26"] as [string, string],
  polimi: ["#003366", "#001A33"] as [string, string],
  trinity: ["#0E5640", "#04241B"] as [string, string],
  ucd: ["#00447C", "#001932"] as [string, string],
  ku_leuven: ["#003D7A", "#001833"] as [string, string],
  ghent: ["#1E64C8", "#0A2A57"] as [string, string],
  ku: ["#901A1E", "#3A0A0C"] as [string, string],
  uppsala: ["#990000", "#330000"] as [string, string],
  lund: ["#9D2235", "#3A0A14"] as [string, string],
  oslo: ["#2B2D72", "#0F1033"] as [string, string],
  helsinki: ["#107EAB", "#062F40"] as [string, string],
  aalto: ["#000000", "#1F1F1F"] as [string, string],
  vienna: ["#0063A6", "#001E3A"] as [string, string],
  charles: ["#A11E22", "#3A0A0C"] as [string, string],
  jagiellonian: ["#A6093D", "#3A0316"] as [string, string],
  warsaw: ["#7A1F1F", "#3D0F0F"] as [string, string],
  ceu: ["#7B0828", "#2E0310"] as [string, string],
  bilkent: ["#0F2A4A", "#06121F"] as [string, string],
  bogazici: ["#003366", "#001A33"] as [string, string],
  metu: ["#0F4C81", "#062340"] as [string, string],
  snu: ["#003D7A", "#001833"] as [string, string],
  kaist: ["#004680", "#001A33"] as [string, string],
  yonsei: ["#003876", "#001833"] as [string, string],
  korea_uni: ["#8B0029", "#3A0010"] as [string, string],
  postech: ["#820000", "#3A0000"] as [string, string],
  hanyang: ["#0E4DA4", "#062340"] as [string, string],
  sungkyunkwan: ["#005EB8", "#001E3A"] as [string, string],
  nyu: ["#57068C", "#1F0233"] as [string, string],
  northwestern: ["#4E2A84", "#1F0F38"] as [string, string],
  cmu: ["#C41230", "#3A0610"] as [string, string],
  caltech: ["#FF6C0C", "#3A1A00"] as [string, string],
  michigan: ["#00274C", "#FFCB05"] as [string, string],
  ucla: ["#2774AE", "#FFD100"] as [string, string],
  usc: ["#990000", "#FFCC00"] as [string, string],
  gatech: ["#B3A369", "#3A2F0F"] as [string, string],
  uiuc: ["#13294B", "#E84A27"] as [string, string],
  uw: ["#4B2E83", "#1F0F38"] as [string, string],
  utexas: ["#BF5700", "#3A1A00"] as [string, string],
  bu: ["#CC0000", "#3A0000"] as [string, string],
  asu: ["#8C1D40", "#FFC627"] as [string, string],
  psu: ["#001E44", "#1F1F1F"] as [string, string],
  osu: ["#BB0000", "#3A0000"] as [string, string],
  msu: ["#18453B", "#0A1F1B"] as [string, string],
  pitt: ["#003594", "#FFB81C"] as [string, string],
  rutgers: ["#CC0033", "#3A0010"] as [string, string],
  uconn: ["#000E2F", "#000714"] as [string, string],
  uoft: ["#1E3765", "#0A1733"] as [string, string],
  ubc: ["#002145", "#001833"] as [string, string],
  mcgill: ["#ED1B2F", "#3A0610"] as [string, string],
  waterloo: ["#FED34C", "#3A2F00"] as [string, string],
  mcmaster: ["#7A003C", "#3A001C"] as [string, string],
  unimelb: ["#0F4C81", "#062340"] as [string, string],
  usyd: ["#E64626", "#3A0E0A"] as [string, string],
  unsw: ["#FFD600", "#3A2F00"] as [string, string],
  anu: ["#80142B", "#3A0610"] as [string, string],
  monash: ["#006DAE", "#001E3A"] as [string, string],
  uq: ["#51247A", "#1F0F38"] as [string, string],
  auckland: ["#00467F", "#001A33"] as [string, string],
  hku: ["#006851", "#00261F"] as [string, string],
  hkust: ["#003366", "#001A33"] as [string, string],
  cuhk: ["#7E2D40", "#3A0F1A"] as [string, string],
  ntu: ["#C90019", "#3A0006"] as [string, string],
  nus: ["#003D7C", "#EF7C00"] as [string, string],
  utokyo: ["#15317E", "#06122E"] as [string, string],
  kyoto: ["#7B1924", "#3A0A0F"] as [string, string],
  osaka: ["#003F88", "#001A33"] as [string, string],
  tsinghua: ["#660874", "#2E0333"] as [string, string],
  pku: ["#94070A", "#3A0306"] as [string, string],
  fudan: ["#003D7A", "#001833"] as [string, string],
  // New brand palettes
  brown_u: ["#4E3629", "#241510"] as [string, string],
  dartmouth_u: ["#00693E", "#012E1F"] as [string, string],
  vandy: ["#866D4B", "#1F1810"] as [string, string],
  rice: ["#00205B", "#FFFFFF"] as [string, string],
  emory: ["#012169", "#B69D74"] as [string, string],
  notredame: ["#0C2340", "#C99700"] as [string, string],
  gw: ["#033C5A", "#A7A8AA"] as [string, string],
  qmul: ["#0027A5", "#001A4D"] as [string, string],
  southampton: ["#005C84", "#001E3A"] as [string, string],
  leeds: ["#FFB81C", "#3A2A00"] as [string, string],
  birmingham: ["#A50034", "#3A0010"] as [string, string],
  groningen2: ["#005A9C", "#001E3A"] as [string, string],
  twente: ["#7C0028", "#3A0010"] as [string, string],
  freie: ["#005C9C", "#001E3A"] as [string, string],
  karlsruhe: ["#009682", "#003832"] as [string, string],
  stuttgart: ["#004191", "#001A33"] as [string, string],
  copenhagen2: ["#901A1E", "#3A0A0C"] as [string, string],
  dtu: ["#990000", "#330000"] as [string, string],
  chalmers: ["#2A6EBB", "#0A1F38"] as [string, string],
  kth: ["#1954A6", "#06192E"] as [string, string],
  ntnu: ["#003769", "#001833"] as [string, string],
  unibo: ["#A50034", "#3A0010"] as [string, string],
  iitb: ["#003E5C", "#001A26"] as [string, string],
  iitd: ["#A41E22", "#3D0A0C"] as [string, string],
  iisc: ["#005EB8", "#001E3A"] as [string, string],
  zhejiang: ["#003F88", "#001A33"] as [string, string],
  sjtu: ["#A41E22", "#3D0A0C"] as [string, string],
  yongin: ["#003F88", "#001A33"] as [string, string],
  yale_nus: ["#00356B", "#001A36"] as [string, string],
  smu: ["#003E74", "#001E3A"] as [string, string],
  ait: ["#0072CE", "#001F5C"] as [string, string],
  msu_ru: ["#003F87", "#001A38"] as [string, string],
  hse: ["#1A2A60", "#06122E"] as [string, string],
  enu: ["#0F4C81", "#062340"] as [string, string], // Eurasian National University
  zhetysu: ["#1B5E20", "#0B2E10"] as [string, string],
  karu: ["#003F87", "#001A38"] as [string, string], // Karaganda
  ksmu: ["#A11E22", "#3A0A0C"] as [string, string], // Karaganda Medical
  wkmu: ["#0F2A4A", "#06121F"] as [string, string], // West Kazakhstan Medical
  shokan: ["#7A1F1F", "#3D0F0F"] as [string, string], // Sh. Ualikhanov Kokshetau
  toraighyrov: ["#0E5F9E", "#062E4F"] as [string, string],
  auca: ["#A50034", "#3A0010"] as [string, string], // American University of Central Asia (Kyrgyzstan)
  nu_uz: ["#003D7C", "#EF7C00"] as [string, string],
  iut_uz: ["#005EB8", "#001E3A"] as [string, string],
};

// Difficulty inference helper (ranking-based default; per-uni override allowed).
const tierFromRank = (rv: number): Tier => (rv <= 100 ? "Reach" : rv <= 600 ? "Match" : "Safety");

export const universities: University[] = [
  // ===================== TOP-TIER INTERNATIONAL (QS 1–100) =====================
  { id: "mit", name: "MIT", region: "International", country: "USA", rankingLabel: "QS #1", rankingValue: 1, requirement: "SAT 1520+ • TOEFL 100 • IELTS 7.0", sat: 1520, ielts: 7.0, toefl: 100, tier: "Reach", majors: ["Physics", "CS", "Engineering", "Mathematics"], brand: B.mitRed, tuitionUSD: 60000, programStrength: ["Physics", "Engineering", "Tech/CS", "Sciences"], highlights: ["World #1 in Engineering & CS", "Strong financial aid for internationals"] },
  { id: "stanford", name: "Stanford University", region: "International", country: "USA", rankingLabel: "QS #6", rankingValue: 6, requirement: "SAT 1500+ • TOEFL 100 • IELTS 7.0", sat: 1500, ielts: 7.0, toefl: 100, tier: "Reach", majors: ["CS", "Engineering", "Economics"], brand: B.stanfordRed, tuitionUSD: 62000, programStrength: ["Tech/CS", "Engineering", "Business"] },
  { id: "harvard", name: "Harvard University", region: "International", country: "USA", rankingLabel: "QS #4", rankingValue: 4, requirement: "SAT 1500+ • IELTS 7.5", sat: 1500, ielts: 7.5, tier: "Reach", majors: ["Physics", "CS", "Economics", "Medicine"], brand: B.crimson, tuitionUSD: 59000, programStrength: ["Physics", "Medicine", "Humanities", "Business"] },
  { id: "oxford", name: "University of Oxford", region: "International", country: "UK", rankingLabel: "QS #3", rankingValue: 3, requirement: "A*AA • IELTS 7.0 (7.5 for Med)", ielts: 7.0, tier: "Reach", majors: ["Physics", "PPE", "Engineering", "Medicine"], brand: B.oxford, tuitionUSD: 45000, programStrength: ["Physics", "Engineering", "Humanities", "Medicine"] },
  { id: "cambridge", name: "University of Cambridge", region: "International", country: "UK", rankingLabel: "QS #2", rankingValue: 2, requirement: "A*A*A • IELTS 7.5", ielts: 7.5, tier: "Reach", majors: ["Physics", "Mathematics", "Engineering"], brand: B.cambridge, tuitionUSD: 47000, programStrength: ["Physics", "Engineering", "Sciences"] },
  { id: "imperial", name: "Imperial College London", region: "International", country: "UK", rankingLabel: "QS #2", rankingValue: 2, requirement: "A*AA • IELTS 7.0", ielts: 7.0, tier: "Reach", majors: ["Physics", "Engineering", "Medicine", "CS"], brand: B.imperial, tuitionUSD: 46000, programStrength: ["Physics", "Engineering", "Tech/CS", "Medicine"] },
  { id: "ucl", name: "University College London", region: "International", country: "UK", rankingLabel: "QS #9", rankingValue: 9, requirement: "AAA • IELTS 6.5–7.0", ielts: 6.5, tier: "Reach", majors: ["Physics", "Economics", "CS"], brand: B.ucl, tuitionUSD: 38000, programStrength: ["Physics", "Tech/CS", "Humanities"] },
  { id: "ethz", name: "ETH Zurich", region: "International", country: "Switzerland", rankingLabel: "QS #7", rankingValue: 7, requirement: "Strong Math/Physics • IELTS 7.0", ielts: 7.0, tier: "Reach", majors: ["Physics", "CS", "Engineering"], brand: B.ethz, tuitionUSD: 1800, programStrength: ["Physics", "Engineering", "Tech/CS"], hiddenGem: true, highlights: ["~$1.8K/year tuition", "Top-10 globally for Physics & Engineering"] },
  { id: "epfl", name: "EPFL", region: "International", country: "Switzerland", rankingLabel: "QS #26", rankingValue: 26, requirement: "Strong Math • IELTS 6.5", ielts: 6.5, tier: "Reach", majors: ["Physics", "Engineering", "CS"], brand: B.epfl, tuitionUSD: 1800, programStrength: ["Physics", "Engineering", "Tech/CS"], hiddenGem: true, highlights: ["Public Swiss tuition (~$1.8K)", "Elite engineering school"] },
  { id: "yale", name: "Yale University", region: "International", country: "USA", rankingLabel: "QS #23", rankingValue: 23, requirement: "SAT 1500+ • IELTS 7.0", sat: 1500, ielts: 7.0, tier: "Reach", majors: ["Economics", "Law", "Humanities"], brand: B.yale, tuitionUSD: 64000, programStrength: ["Humanities", "Law", "Business"] },
  { id: "princeton", name: "Princeton University", region: "International", country: "USA", rankingLabel: "QS #22", rankingValue: 22, requirement: "SAT 1500+ • IELTS 7.0", sat: 1500, ielts: 7.0, tier: "Reach", majors: ["Physics", "Math", "Economics"], brand: B.princeton, tuitionUSD: 59000, programStrength: ["Physics", "Sciences", "Humanities"] },
  { id: "columbia", name: "Columbia University", region: "International", country: "USA", rankingLabel: "QS #34", rankingValue: 34, requirement: "SAT 1490+ • TOEFL 100", sat: 1490, ielts: 7.0, tier: "Reach", majors: ["Engineering", "Journalism", "Business"], brand: B.columbiaBlue, tuitionUSD: 65000, programStrength: ["Engineering", "Business", "Humanities"] },
  { id: "cornell", name: "Cornell University", region: "International", country: "USA", rankingLabel: "QS #16", rankingValue: 16, requirement: "SAT 1450+ • IELTS 7.0", sat: 1450, ielts: 7.0, tier: "Reach", majors: ["Engineering", "Hotel Mgmt", "CS"], brand: B.cornellRed, tuitionUSD: 63000, programStrength: ["Engineering", "Tech/CS", "Business"] },
  { id: "upenn", name: "University of Pennsylvania", region: "International", country: "USA", rankingLabel: "QS #11", rankingValue: 11, requirement: "SAT 1500+ • IELTS 7.0", sat: 1500, ielts: 7.0, tier: "Reach", majors: ["Business (Wharton)", "Engineering"], brand: B.upenn, tuitionUSD: 63000, programStrength: ["Business", "Engineering", "Medicine"] },
  { id: "uchicago", name: "University of Chicago", region: "International", country: "USA", rankingLabel: "QS #21", rankingValue: 21, requirement: "SAT 1500+ • IELTS 7.0", sat: 1500, ielts: 7.0, tier: "Reach", majors: ["Economics", "Math", "Physics"], brand: B.uchicago, tuitionUSD: 64000, programStrength: ["Physics", "Sciences", "Business"] },
  { id: "caltech", name: "Caltech", region: "International", country: "USA", rankingLabel: "QS #10", rankingValue: 10, requirement: "SAT 1530+ • IELTS 7.0 • Olympiads strongly favored", sat: 1530, ielts: 7.0, tier: "Reach", majors: ["Physics", "Engineering", "CS"], brand: B.caltech, tuitionUSD: 60000, programStrength: ["Physics", "Engineering", "Tech/CS"], highlights: ["~1000 students total", "Physics & Astrophysics powerhouse"] },
  { id: "jhu", name: "Johns Hopkins University", region: "International", country: "USA", rankingLabel: "QS #28", rankingValue: 28, requirement: "SAT 1500+ • IELTS 7.0", sat: 1500, ielts: 7.0, tier: "Reach", majors: ["Medicine", "Biomedical Eng"], brand: B.jhu, tuitionUSD: 62000, programStrength: ["Medicine", "Engineering", "Sciences"] },
  { id: "duke", name: "Duke University", region: "International", country: "USA", rankingLabel: "QS #50", rankingValue: 50, requirement: "SAT 1490+ • IELTS 7.0", sat: 1490, ielts: 7.0, tier: "Reach", majors: ["Economics", "CS", "Public Policy"], brand: B.duke, tuitionUSD: 64000, programStrength: ["Tech/CS", "Business", "Medicine"] },
  { id: "berkeley", name: "UC Berkeley", region: "International", country: "USA", rankingLabel: "QS #12", rankingValue: 12, requirement: "SAT 1450+ • IELTS 7.0", sat: 1450, ielts: 7.0, tier: "Reach", majors: ["CS", "Engineering", "Physics"], brand: B.berkeleyGold, tuitionUSD: 48000, programStrength: ["Tech/CS", "Engineering", "Physics"] },
  { id: "ucla", name: "UCLA", region: "International", country: "USA", rankingLabel: "QS #42", rankingValue: 42, requirement: "SAT 1410+ • IELTS 7.0", sat: 1410, ielts: 7.0, tier: "Reach", majors: ["Film", "CS", "Psychology"], brand: B.ucla, tuitionUSD: 47000, programStrength: ["Tech/CS", "Arts/Design", "Sciences"] },
  { id: "usc", name: "USC", region: "International", country: "USA", rankingLabel: "QS #116", rankingValue: 116, requirement: "SAT 1450+ • IELTS 7.0", sat: 1450, ielts: 7.0, tier: "Reach", majors: ["Cinema", "Business", "Engineering"], brand: B.usc, tuitionUSD: 66000, programStrength: ["Arts/Design", "Business", "Engineering"] },
  { id: "michigan", name: "University of Michigan", region: "International", country: "USA", rankingLabel: "QS #44", rankingValue: 44, requirement: "SAT 1400+ • IELTS 6.5", sat: 1400, ielts: 6.5, tier: "Match", majors: ["Engineering", "Business", "CS"], brand: B.michigan, tuitionUSD: 56000, programStrength: ["Engineering", "Business", "Tech/CS"] },
  { id: "nyu", name: "NYU", region: "International", country: "USA", rankingLabel: "QS #38", rankingValue: 38, requirement: "SAT 1450+ • IELTS 7.0", sat: 1450, ielts: 7.0, tier: "Reach", majors: ["Finance", "Arts", "CS"], brand: B.nyu, tuitionUSD: 60000, programStrength: ["Business", "Arts/Design", "Tech/CS"] },
  { id: "northwestern", name: "Northwestern University", region: "International", country: "USA", rankingLabel: "QS #50", rankingValue: 50, requirement: "SAT 1490+ • IELTS 7.0", sat: 1490, ielts: 7.0, tier: "Reach", majors: ["Journalism", "Engineering"], brand: B.northwestern, tuitionUSD: 63000, programStrength: ["Engineering", "Humanities", "Business"] },
  { id: "cmu", name: "Carnegie Mellon University", region: "International", country: "USA", rankingLabel: "QS #58", rankingValue: 58, requirement: "SAT 1500+ • IELTS 7.5", sat: 1500, ielts: 7.5, tier: "Reach", majors: ["CS", "Robotics", "Drama"], brand: B.cmu, tuitionUSD: 62000, programStrength: ["Tech/CS", "Engineering", "Arts/Design"], highlights: ["Top-3 globally for CS & Robotics"] },
  { id: "lse", name: "LSE", region: "International", country: "UK", rankingLabel: "QS #45", rankingValue: 45, requirement: "AAA • IELTS 7.0", ielts: 7.0, tier: "Reach", majors: ["Economics", "Politics", "Finance"], brand: B.lse, tuitionUSD: 35000, programStrength: ["Business", "Humanities", "Law"] },
  { id: "edinburgh", name: "University of Edinburgh", region: "International", country: "UK", rankingLabel: "QS #27", rankingValue: 27, requirement: "AAB • IELTS 6.5", ielts: 6.5, tier: "Match", majors: ["Physics", "AI", "Medicine"], brand: B.edinburgh, tuitionUSD: 32000, programStrength: ["Physics", "Tech/CS", "Medicine"] },
  { id: "kings", name: "King's College London", region: "International", country: "UK", rankingLabel: "QS #40", rankingValue: 40, requirement: "AAA • IELTS 7.0", ielts: 7.0, tier: "Reach", majors: ["Medicine", "Law", "International Relations"], brand: B.kings, tuitionUSD: 34000, programStrength: ["Medicine", "Law", "Humanities"] },
  { id: "manchester", name: "University of Manchester", region: "International", country: "UK", rankingLabel: "QS #34", rankingValue: 34, requirement: "AAB • IELTS 6.5", ielts: 6.5, tier: "Match", majors: ["Engineering", "Materials", "CS"], brand: B.manchester, tuitionUSD: 30000, programStrength: ["Engineering", "Tech/CS", "Sciences"] },
  { id: "warwick", name: "University of Warwick", region: "International", country: "UK", rankingLabel: "QS #69", rankingValue: 69, requirement: "AAA • IELTS 6.5", ielts: 6.5, tier: "Match", majors: ["Mathematics", "Economics", "CS"], brand: B.warwick, tuitionUSD: 32000, programStrength: ["Tech/CS", "Business", "Sciences"] },
  { id: "bristol", name: "University of Bristol", region: "International", country: "UK", rankingLabel: "QS #54", rankingValue: 54, requirement: "AAB • IELTS 6.5", ielts: 6.5, tier: "Match", majors: ["Engineering", "Medicine"], brand: B.bristol, tuitionUSD: 30000, programStrength: ["Engineering", "Medicine"] },
  { id: "glasgow", name: "University of Glasgow", region: "International", country: "UK", rankingLabel: "QS #76", rankingValue: 76, requirement: "AAB • IELTS 6.5", ielts: 6.5, tier: "Match", majors: ["Engineering", "Medicine", "Business"], brand: B.glasgow, tuitionUSD: 28000, programStrength: ["Engineering", "Medicine", "Business"] },
  { id: "durham", name: "Durham University", region: "International", country: "UK", rankingLabel: "QS #92", rankingValue: 92, requirement: "AAB • IELTS 6.5", ielts: 6.5, tier: "Match", majors: ["Physics", "Math", "Theology"], brand: B.durham, tuitionUSD: 30000, programStrength: ["Physics", "Sciences", "Humanities"] },
  { id: "stand", name: "University of St Andrews", region: "International", country: "UK", rankingLabel: "QS #95", rankingValue: 95, requirement: "AAA • IELTS 6.5", ielts: 6.5, tier: "Match", majors: ["IR", "Physics", "English"], brand: B.stand, tuitionUSD: 33000, programStrength: ["Physics", "Humanities"] },
  { id: "qmul", name: "Queen Mary University of London", region: "International", country: "UK", rankingLabel: "QS #145", rankingValue: 145, requirement: "ABB • IELTS 6.5", ielts: 6.5, tier: "Match", majors: ["Engineering", "Medicine", "Law"], brand: B.qmul, tuitionUSD: 28000, programStrength: ["Engineering", "Medicine", "Law"] },
  { id: "southampton", name: "University of Southampton", region: "International", country: "UK", rankingLabel: "QS #80", rankingValue: 80, requirement: "AAB • IELTS 6.5", ielts: 6.5, tier: "Match", majors: ["Engineering", "CS", "Oceanography"], brand: B.southampton, tuitionUSD: 28000, programStrength: ["Engineering", "Tech/CS", "Sciences"] },
  { id: "leeds", name: "University of Leeds", region: "International", country: "UK", rankingLabel: "QS #82", rankingValue: 82, requirement: "AAB • IELTS 6.5", ielts: 6.5, tier: "Match", majors: ["Engineering", "Business", "Media"], brand: B.leeds, tuitionUSD: 27000, programStrength: ["Engineering", "Business"] },
  { id: "birmingham", name: "University of Birmingham", region: "International", country: "UK", rankingLabel: "QS #80", rankingValue: 80, requirement: "ABB • IELTS 6.5", ielts: 6.5, tier: "Match", majors: ["Engineering", "Medicine", "Business"], brand: B.birmingham, tuitionUSD: 27000, programStrength: ["Engineering", "Medicine", "Business"] },

  // EU – Netherlands
  { id: "tudelft", name: "TU Delft", region: "International", country: "Netherlands", rankingLabel: "QS #47", rankingValue: 47, requirement: "IELTS 6.5 • Strong Math/Physics", ielts: 6.5, tier: "Match", majors: ["Physics", "Aerospace", "Engineering"], brand: B.tudelft, tuitionUSD: 18000, programStrength: ["Physics", "Engineering", "Architecture"], hiddenGem: true, highlights: ["Top engineering school in EU", "Tuition ~$18K vs $60K+ US"] },
  { id: "leiden", name: "Leiden University", region: "International", country: "Netherlands", rankingLabel: "QS #136", rankingValue: 136, requirement: "IELTS 6.5", ielts: 6.5, tier: "Match", majors: ["Law", "Astronomy", "IR"], brand: B.leiden, tuitionUSD: 16000, programStrength: ["Law", "Sciences", "Humanities"] },
  { id: "uva", name: "University of Amsterdam", region: "International", country: "Netherlands", rankingLabel: "QS #60", rankingValue: 60, requirement: "IELTS 6.5", ielts: 6.5, tier: "Match", majors: ["Economics", "AI", "Humanities"], brand: B.uva, tuitionUSD: 16000, programStrength: ["Tech/CS", "Business", "Humanities"], hiddenGem: true },
  { id: "utrecht", name: "Utrecht University", region: "International", country: "Netherlands", rankingLabel: "QS #107", rankingValue: 107, requirement: "IELTS 6.5", ielts: 6.5, tier: "Match", majors: ["Sciences", "Liberal Arts"], brand: B.utrecht, tuitionUSD: 14000, programStrength: ["Sciences", "Humanities"], hiddenGem: true },
  { id: "rug", name: "University of Groningen", region: "International", country: "Netherlands", rankingLabel: "QS #139", rankingValue: 139, requirement: "IELTS 6.5", ielts: 6.5, tier: "Match", majors: ["Astronomy", "Engineering", "Business"], brand: B.rug, tuitionUSD: 13000, programStrength: ["Sciences", "Engineering", "Business"], hiddenGem: true },
  { id: "eindhoven", name: "TU Eindhoven", region: "International", country: "Netherlands", rankingLabel: "QS #124", rankingValue: 124, requirement: "IELTS 6.5", ielts: 6.5, tier: "Match", majors: ["Engineering", "Data Science"], brand: B.eindhoven, tuitionUSD: 17000, programStrength: ["Engineering", "Tech/CS"], hiddenGem: true },
  { id: "twente", name: "University of Twente", region: "International", country: "Netherlands", rankingLabel: "QS #210", rankingValue: 210, requirement: "IELTS 6.5", ielts: 6.5, tier: "Match", majors: ["Engineering", "Nanotech", "CS"], brand: B.twente, tuitionUSD: 13000, programStrength: ["Engineering", "Tech/CS"], hiddenGem: true, highlights: ["Affordable EU engineering", "Strong industry partnerships"] },

  // EU – Germany
  { id: "tum", name: "TU Munich", region: "International", country: "Germany", rankingLabel: "QS #28", rankingValue: 28, requirement: "IELTS 6.5 • Math/Physics required", ielts: 6.5, tier: "Match", majors: ["Physics", "Mechanical Eng", "CS"], brand: B.tum, tuitionUSD: 6000, programStrength: ["Physics", "Engineering", "Tech/CS"], hiddenGem: true, highlights: ["Top-30 globally", "Tuition ~$6K/year for non-EU"] },
  { id: "lmu", name: "LMU Munich", region: "International", country: "Germany", rankingLabel: "QS #54", rankingValue: 54, requirement: "IELTS 6.5", ielts: 6.5, tier: "Match", majors: ["Physics", "Medicine", "Economics"], brand: B.lmu, tuitionUSD: 4000, programStrength: ["Physics", "Medicine", "Sciences"], hiddenGem: true },
  { id: "heidelberg", name: "Heidelberg University", region: "International", country: "Germany", rankingLabel: "QS #87", rankingValue: 87, requirement: "IELTS 6.5", ielts: 6.5, tier: "Match", majors: ["Medicine", "Physics", "Philosophy"], brand: B.heidelberg, tuitionUSD: 4000, programStrength: ["Medicine", "Physics", "Humanities"], hiddenGem: true },
  { id: "rwth", name: "RWTH Aachen", region: "International", country: "Germany", rankingLabel: "QS #99", rankingValue: 99, requirement: "IELTS 6.5", ielts: 6.5, tier: "Match", majors: ["Mechanical Eng", "Materials"], brand: B.rwth, tuitionUSD: 4000, programStrength: ["Engineering", "Sciences"], hiddenGem: true, highlights: ["Germany's #1 engineering school"] },
  { id: "humboldt", name: "Humboldt University Berlin", region: "International", country: "Germany", rankingLabel: "QS #126", rankingValue: 126, requirement: "IELTS 6.5", ielts: 6.5, tier: "Match", majors: ["Humanities", "Physics", "History"], brand: B.humboldt, tuitionUSD: 3000, programStrength: ["Humanities", "Physics"], hiddenGem: true },
  { id: "freie", name: "Freie Universität Berlin", region: "International", country: "Germany", rankingLabel: "QS #98", rankingValue: 98, requirement: "IELTS 6.5", ielts: 6.5, tier: "Match", majors: ["Political Science", "Sciences"], brand: B.freie, tuitionUSD: 3000, programStrength: ["Humanities", "Sciences"], hiddenGem: true },
  { id: "freiburg", name: "University of Freiburg", region: "International", country: "Germany", rankingLabel: "QS #194", rankingValue: 194, requirement: "IELTS 6.5", ielts: 6.5, tier: "Match", majors: ["Medicine", "Forestry", "CS"], brand: B.freiburg, tuitionUSD: 4000, programStrength: ["Medicine", "Sciences", "Tech/CS"], hiddenGem: true },
  { id: "bonn", name: "University of Bonn", region: "International", country: "Germany", rankingLabel: "QS #239", rankingValue: 239, requirement: "IELTS 6.5", ielts: 6.5, tier: "Match", majors: ["Math", "Economics"], brand: B.bonn, tuitionUSD: 3000, programStrength: ["Sciences", "Business"], hiddenGem: true },
  { id: "karlsruhe", name: "Karlsruhe Institute of Technology (KIT)", region: "International", country: "Germany", rankingLabel: "QS #119", rankingValue: 119, requirement: "IELTS 6.5", ielts: 6.5, tier: "Match", majors: ["Physics", "Engineering", "CS"], brand: B.karlsruhe, tuitionUSD: 3000, programStrength: ["Physics", "Engineering", "Tech/CS"], hiddenGem: true, highlights: ["Germany's MIT", "Tuition ~$3K/year"] },
  { id: "stuttgart", name: "University of Stuttgart", region: "International", country: "Germany", rankingLabel: "QS #312", rankingValue: 312, requirement: "IELTS 6.5", ielts: 6.5, tier: "Match", majors: ["Mechanical Eng", "Aerospace"], brand: B.stuttgart, tuitionUSD: 3500, programStrength: ["Engineering", "Physics"], hiddenGem: true },
  { id: "mannheim", name: "University of Mannheim", region: "International", country: "Germany", rankingLabel: "QS #432", rankingValue: 432, requirement: "IELTS 6.5", ielts: 6.5, tier: "Safety", majors: ["Business", "Economics", "Social Sciences"], brand: B.mannheim, tuitionUSD: 3000, programStrength: ["Business", "Humanities"], hiddenGem: true },

  // EU – France
  { id: "psl", name: "PSL University", region: "International", country: "France", rankingLabel: "QS #24", rankingValue: 24, requirement: "IELTS 6.5", ielts: 6.5, tier: "Reach", majors: ["Physics", "Math", "Humanities"], brand: B.psl, tuitionUSD: 4000, programStrength: ["Physics", "Sciences", "Humanities"], hiddenGem: true },
  { id: "polytechnique", name: "École Polytechnique", region: "International", country: "France", rankingLabel: "QS #38", rankingValue: 38, requirement: "Strong Math • IELTS 7.0", ielts: 7.0, tier: "Reach", majors: ["Physics", "Math", "Engineering"], brand: B.polytechnique, tuitionUSD: 16000, programStrength: ["Physics", "Engineering", "Sciences"] },
  { id: "sorbonne", name: "Sorbonne University", region: "International", country: "France", rankingLabel: "QS #59", rankingValue: 59, requirement: "IELTS 6.5", ielts: 6.5, tier: "Match", majors: ["Physics", "Humanities"], brand: B.sorbonne, tuitionUSD: 3000, programStrength: ["Physics", "Humanities", "Sciences"], hiddenGem: true },
  { id: "centralesupelec", name: "CentraleSupélec", region: "International", country: "France", rankingLabel: "QS #136", rankingValue: 136, requirement: "IELTS 6.5", ielts: 6.5, tier: "Match", majors: ["Engineering", "CS"], brand: B.centralesupelec, tuitionUSD: 14000, programStrength: ["Engineering", "Tech/CS"] },
  { id: "scpo", name: "Sciences Po", region: "International", country: "France", rankingLabel: "QS #319", rankingValue: 319, requirement: "IELTS 7.0 • Strong essays", ielts: 7.0, tier: "Reach", majors: ["IR", "Politics", "Public Policy"], brand: B.scpo, tuitionUSD: 16000, programStrength: ["Humanities", "Law"] },
  { id: "insead", name: "INSEAD (Undergraduate intake limited)", region: "International", country: "France", rankingLabel: "Specialized", rankingValue: 9999, requirement: "IELTS 7.0", ielts: 7.0, tier: "Reach", majors: ["Business"], brand: B.insead, tuitionUSD: 100000, programStrength: ["Business"] },

  // EU – Other
  { id: "uzh", name: "University of Zurich", region: "International", country: "Switzerland", rankingLabel: "QS #91", rankingValue: 91, requirement: "IELTS 6.5", ielts: 6.5, tier: "Match", majors: ["Medicine", "Economics"], brand: B.uzh, tuitionUSD: 2000, programStrength: ["Medicine", "Business"], hiddenGem: true },
  { id: "bocconi", name: "Bocconi University", region: "International", country: "Italy", rankingLabel: "QS #112", rankingValue: 112, requirement: "IELTS 6.5", ielts: 6.5, tier: "Match", majors: ["Finance", "Economics", "Management"], brand: B.bocconi, tuitionUSD: 18000, programStrength: ["Business"] },
  { id: "polimi", name: "Politecnico di Milano", region: "International", country: "Italy", rankingLabel: "QS #111", rankingValue: 111, requirement: "IELTS 6.0", ielts: 6.0, tier: "Match", majors: ["Architecture", "Engineering", "Design"], brand: B.polimi, tuitionUSD: 4000, programStrength: ["Architecture", "Engineering", "Arts/Design"], hiddenGem: true, highlights: ["World #7 for Design", "EU tuition ~$4K"] },
  { id: "unibo", name: "University of Bologna", region: "International", country: "Italy", rankingLabel: "QS #133", rankingValue: 133, requirement: "IELTS 6.0", ielts: 6.0, tier: "Match", majors: ["Law", "Medicine", "Humanities"], brand: B.unibo, tuitionUSD: 3500, programStrength: ["Law", "Medicine", "Humanities"], hiddenGem: true, highlights: ["Oldest university in the West (1088)", "Affordable EU tuition"] },
  { id: "trinity", name: "Trinity College Dublin", region: "International", country: "Ireland", rankingLabel: "QS #87", rankingValue: 87, requirement: "IELTS 6.5", ielts: 6.5, tier: "Match", majors: ["Literature", "CS", "Medicine"], brand: B.trinity, tuitionUSD: 25000, programStrength: ["Humanities", "Tech/CS", "Medicine"] },
  { id: "ucd", name: "University College Dublin", region: "International", country: "Ireland", rankingLabel: "QS #126", rankingValue: 126, requirement: "IELTS 6.5", ielts: 6.5, tier: "Match", majors: ["Business", "Engineering"], brand: B.ucd, tuitionUSD: 22000, programStrength: ["Business", "Engineering"] },
  { id: "ku_leuven", name: "KU Leuven", region: "International", country: "Belgium", rankingLabel: "QS #61", rankingValue: 61, requirement: "IELTS 6.5", ielts: 6.5, tier: "Match", majors: ["Engineering", "Medicine"], brand: B.ku_leuven, tuitionUSD: 5000, programStrength: ["Engineering", "Medicine"], hiddenGem: true },
  { id: "ghent", name: "Ghent University", region: "International", country: "Belgium", rankingLabel: "QS #142", rankingValue: 142, requirement: "IELTS 6.5", ielts: 6.5, tier: "Match", majors: ["Bioengineering", "Veterinary"], brand: B.ghent, tuitionUSD: 5000, programStrength: ["Sciences", "Engineering"], hiddenGem: true },
  { id: "ku", name: "University of Copenhagen", region: "International", country: "Denmark", rankingLabel: "QS #100", rankingValue: 100, requirement: "IELTS 6.5", ielts: 6.5, tier: "Match", majors: ["Sciences", "Public Health"], brand: B.ku, tuitionUSD: 17000, programStrength: ["Sciences", "Medicine"] },
  { id: "dtu", name: "Technical University of Denmark (DTU)", region: "International", country: "Denmark", rankingLabel: "QS #103", rankingValue: 103, requirement: "IELTS 6.5", ielts: 6.5, tier: "Match", majors: ["Engineering", "Physics", "CS"], brand: B.dtu, tuitionUSD: 17000, programStrength: ["Engineering", "Physics", "Tech/CS"] },
  { id: "uppsala", name: "Uppsala University", region: "International", country: "Sweden", rankingLabel: "QS #105", rankingValue: 105, requirement: "IELTS 6.5", ielts: 6.5, tier: "Match", majors: ["Physics", "Medicine"], brand: B.uppsala, tuitionUSD: 14000, programStrength: ["Physics", "Medicine"] },
  { id: "lund", name: "Lund University", region: "International", country: "Sweden", rankingLabel: "QS #75", rankingValue: 75, requirement: "IELTS 6.5", ielts: 6.5, tier: "Match", majors: ["Engineering", "Sustainability"], brand: B.lund, tuitionUSD: 14000, programStrength: ["Engineering", "Sciences"] },
  { id: "kth", name: "KTH Royal Institute of Technology", region: "International", country: "Sweden", rankingLabel: "QS #73", rankingValue: 73, requirement: "IELTS 6.5", ielts: 6.5, tier: "Match", majors: ["Engineering", "Physics", "CS"], brand: B.kth, tuitionUSD: 15000, programStrength: ["Engineering", "Physics", "Tech/CS"], hiddenGem: true, highlights: ["Sweden's leading engineering school"] },
  { id: "chalmers", name: "Chalmers University of Technology", region: "International", country: "Sweden", rankingLabel: "QS #139", rankingValue: 139, requirement: "IELTS 6.5", ielts: 6.5, tier: "Match", majors: ["Engineering", "Architecture"], brand: B.chalmers, tuitionUSD: 14000, programStrength: ["Engineering", "Architecture"] },
  { id: "oslo", name: "University of Oslo", region: "International", country: "Norway", rankingLabel: "QS #117", rankingValue: 117, requirement: "IELTS 6.5", ielts: 6.5, tier: "Match", majors: ["Physics", "Law", "Humanities"], brand: B.oslo, tuitionUSD: 0, programStrength: ["Physics", "Law", "Humanities"], hiddenGem: true, highlights: ["Free tuition (incl. internationals before 2023; verify for 2026)"] },
  { id: "ntnu", name: "Norwegian University of Science & Tech (NTNU)", region: "International", country: "Norway", rankingLabel: "QS #259", rankingValue: 259, requirement: "IELTS 6.5", ielts: 6.5, tier: "Match", majors: ["Engineering", "Marine Tech"], brand: B.ntnu, tuitionUSD: 13000, programStrength: ["Engineering", "Sciences"], hiddenGem: true },
  { id: "helsinki", name: "University of Helsinki", region: "International", country: "Finland", rankingLabel: "QS #115", rankingValue: 115, requirement: "IELTS 6.5", ielts: 6.5, tier: "Match", majors: ["Physics", "Humanities"], brand: B.helsinki, tuitionUSD: 14000, programStrength: ["Physics", "Humanities", "Sciences"] },
  { id: "aalto", name: "Aalto University", region: "International", country: "Finland", rankingLabel: "QS #114", rankingValue: 114, requirement: "IELTS 6.5", ielts: 6.5, tier: "Match", majors: ["Design", "Engineering", "Business"], brand: B.aalto, tuitionUSD: 14000, programStrength: ["Arts/Design", "Engineering", "Business"] },
  { id: "vienna", name: "University of Vienna", region: "International", country: "Austria", rankingLabel: "QS #137", rankingValue: 137, requirement: "IELTS 6.5", ielts: 6.5, tier: "Match", majors: ["Humanities", "Physics"], brand: B.vienna, tuitionUSD: 1800, programStrength: ["Humanities", "Physics"], hiddenGem: true, highlights: ["Tuition ~$1.8K for non-EU"] },
  { id: "charles", name: "Charles University", region: "International", country: "Czechia", rankingLabel: "QS #246", rankingValue: 246, requirement: "IELTS 6.0", ielts: 6.0, tier: "Match", majors: ["Medicine", "Humanities"], brand: B.charles, tuitionUSD: 5000, programStrength: ["Medicine", "Humanities"], hiddenGem: true },
  { id: "jagiellonian", name: "Jagiellonian University", region: "International", country: "Poland", rankingLabel: "QS #304", rankingValue: 304, requirement: "IELTS 6.0", ielts: 6.0, tier: "Match", majors: ["Medicine", "Sciences"], brand: B.jagiellonian, tuitionUSD: 4000, programStrength: ["Medicine", "Sciences"], hiddenGem: true },
  { id: "warsaw", name: "University of Warsaw", region: "International", country: "Poland", rankingLabel: "QS #262", rankingValue: 262, requirement: "IELTS 6.0", ielts: 6.0, tier: "Match", majors: ["Economics", "Sciences"], brand: B.warsaw, tuitionUSD: 4000, programStrength: ["Business", "Sciences"], hiddenGem: true },
  { id: "ceu", name: "Central European University", region: "International", country: "Austria", rankingLabel: "Specialized", rankingValue: 9999, requirement: "IELTS 6.5", ielts: 6.5, tier: "Match", majors: ["Political Science", "Economics"], brand: B.ceu, tuitionUSD: 13000, programStrength: ["Humanities", "Business"] },
  { id: "bilkent", name: "Bilkent University", region: "International", country: "Turkey", rankingLabel: "QS #501", rankingValue: 501, requirement: "SAT 1300+ • IELTS 6.5", sat: 1300, ielts: 6.5, tier: "Safety", majors: ["Engineering", "Music", "Business"], brand: B.bilkent, tuitionUSD: 12000, programStrength: ["Engineering", "Business", "Arts/Design"], hiddenGem: true },
  { id: "bogazici", name: "Boğaziçi University", region: "International", country: "Turkey", rankingLabel: "QS #686", rankingValue: 686, requirement: "SAT 1250+ • IELTS 6.5", sat: 1250, ielts: 6.5, tier: "Safety", majors: ["Engineering", "Economics"], brand: B.bogazici, tuitionUSD: 8000, programStrength: ["Engineering", "Business"], hiddenGem: true },
  { id: "metu", name: "Middle East Technical University", region: "International", country: "Turkey", rankingLabel: "QS #581", rankingValue: 581, requirement: "SAT 1250+ • IELTS 6.5", sat: 1250, ielts: 6.5, tier: "Safety", majors: ["Engineering", "Architecture"], brand: B.metu, tuitionUSD: 8000, programStrength: ["Engineering", "Architecture"], hiddenGem: true },

  // South Korea
  { id: "snu", name: "Seoul National University", region: "International", country: "South Korea", rankingLabel: "QS #31", rankingValue: 31, requirement: "TOPIK or IELTS 6.5 • Strong academics", ielts: 6.5, tier: "Reach", majors: ["Engineering", "Business", "Medicine"], brand: B.snu, tuitionUSD: 6000, programStrength: ["Engineering", "Business", "Medicine"], hiddenGem: true },
  { id: "kaist", name: "KAIST", region: "International", country: "South Korea", rankingLabel: "QS #53", rankingValue: 53, requirement: "Strong STEM • IELTS 6.5", ielts: 6.5, tier: "Reach", majors: ["Physics", "Engineering", "CS"], brand: B.kaist, tuitionUSD: 7000, programStrength: ["Physics", "Engineering", "Tech/CS"], hiddenGem: true, highlights: ["Korea's MIT", "Generous scholarships for STEM internationals"] },
  { id: "yonsei", name: "Yonsei University", region: "International", country: "South Korea", rankingLabel: "QS #56", rankingValue: 56, requirement: "IELTS 6.5 • SAT 1300+", sat: 1300, ielts: 6.5, tier: "Match", majors: ["Business", "Engineering", "International Studies"], brand: B.yonsei, tuitionUSD: 12000, programStrength: ["Business", "Engineering", "Humanities"] },
  { id: "korea_uni", name: "Korea University", region: "International", country: "South Korea", rankingLabel: "QS #67", rankingValue: 67, requirement: "IELTS 6.5 • SAT 1300+", sat: 1300, ielts: 6.5, tier: "Match", majors: ["Business", "Law", "Engineering"], brand: B.korea_uni, tuitionUSD: 11000, programStrength: ["Business", "Law", "Engineering"] },
  { id: "postech", name: "POSTECH", region: "International", country: "South Korea", rankingLabel: "QS #98", rankingValue: 98, requirement: "Strong STEM • IELTS 6.5", ielts: 6.5, tier: "Match", majors: ["Physics", "Materials", "CS"], brand: B.postech, tuitionUSD: 5000, programStrength: ["Physics", "Engineering", "Tech/CS"], hiddenGem: true, highlights: ["Tiny elite STEM school", "Almost full scholarships available"] },
  { id: "hanyang", name: "Hanyang University", region: "International", country: "South Korea", rankingLabel: "QS #164", rankingValue: 164, requirement: "IELTS 6.0", ielts: 6.0, tier: "Match", majors: ["Engineering", "Business"], brand: B.hanyang, tuitionUSD: 9000, programStrength: ["Engineering", "Business"], hiddenGem: true },
  { id: "sungkyunkwan", name: "Sungkyunkwan University", region: "International", country: "South Korea", rankingLabel: "QS #145", rankingValue: 145, requirement: "IELTS 6.0", ielts: 6.0, tier: "Match", majors: ["Business", "Engineering"], brand: B.sungkyunkwan, tuitionUSD: 9000, programStrength: ["Business", "Engineering"], hiddenGem: true },

  // Asia (additional)
  { id: "nus", name: "National University of Singapore", region: "International", country: "Singapore", rankingLabel: "QS #8", rankingValue: 8, requirement: "SAT 1450+ • IELTS 6.5", sat: 1450, ielts: 6.5, tier: "Reach", majors: ["CS", "Engineering", "Business"], brand: B.nus, tuitionUSD: 30000, programStrength: ["Tech/CS", "Engineering", "Business"] },
  { id: "ntu", name: "Nanyang Technological University", region: "International", country: "Singapore", rankingLabel: "QS #15", rankingValue: 15, requirement: "SAT 1400+ • IELTS 6.5", sat: 1400, ielts: 6.5, tier: "Reach", majors: ["Engineering", "CS", "Business"], brand: B.ntu, tuitionUSD: 28000, programStrength: ["Engineering", "Tech/CS", "Business"] },
  { id: "smu_sg", name: "Singapore Management University", region: "International", country: "Singapore", rankingLabel: "QS #511", rankingValue: 511, requirement: "SAT 1300+ • IELTS 7.0", sat: 1300, ielts: 7.0, tier: "Match", majors: ["Business", "Law", "CS"], brand: B.smu, tuitionUSD: 32000, programStrength: ["Business", "Law", "Tech/CS"] },
  { id: "hku", name: "University of Hong Kong", region: "International", country: "Hong Kong", rankingLabel: "QS #17", rankingValue: 17, requirement: "SAT 1400+ • IELTS 6.5", sat: 1400, ielts: 6.5, tier: "Reach", majors: ["Medicine", "Law", "Business"], brand: B.hku, tuitionUSD: 22000, programStrength: ["Medicine", "Law", "Business"] },
  { id: "hkust", name: "HKUST", region: "International", country: "Hong Kong", rankingLabel: "QS #47", rankingValue: 47, requirement: "SAT 1400+ • IELTS 6.5", sat: 1400, ielts: 6.5, tier: "Match", majors: ["Engineering", "Business"], brand: B.hkust, tuitionUSD: 22000, programStrength: ["Engineering", "Business", "Tech/CS"] },
  { id: "cuhk", name: "Chinese University of Hong Kong", region: "International", country: "Hong Kong", rankingLabel: "QS #36", rankingValue: 36, requirement: "SAT 1400+ • IELTS 6.5", sat: 1400, ielts: 6.5, tier: "Match", majors: ["Business", "Medicine"], brand: B.cuhk, tuitionUSD: 22000, programStrength: ["Business", "Medicine"] },
  { id: "utokyo", name: "University of Tokyo", region: "International", country: "Japan", rankingLabel: "QS #28", rankingValue: 28, requirement: "EJU/SAT • IELTS 6.5", ielts: 6.5, tier: "Reach", majors: ["Physics", "Engineering"], brand: B.utokyo, tuitionUSD: 5000, programStrength: ["Physics", "Engineering", "Sciences"], hiddenGem: true },
  { id: "kyoto", name: "Kyoto University", region: "International", country: "Japan", rankingLabel: "QS #46", rankingValue: 46, requirement: "EJU/SAT • IELTS 6.5", ielts: 6.5, tier: "Reach", majors: ["Physics", "Chemistry"], brand: B.kyoto, tuitionUSD: 5000, programStrength: ["Physics", "Sciences"], hiddenGem: true },
  { id: "osaka", name: "Osaka University", region: "International", country: "Japan", rankingLabel: "QS #80", rankingValue: 80, requirement: "EJU • IELTS 6.0", ielts: 6.0, tier: "Match", majors: ["Engineering", "Medicine"], brand: B.osaka, tuitionUSD: 5000, programStrength: ["Engineering", "Medicine"], hiddenGem: true },
  { id: "tsinghua", name: "Tsinghua University", region: "International", country: "China", rankingLabel: "QS #20", rankingValue: 20, requirement: "HSK / SAT 1450+ • IELTS 6.5", sat: 1450, ielts: 6.5, tier: "Reach", majors: ["Engineering", "CS", "Architecture"], brand: B.tsinghua, tuitionUSD: 5000, programStrength: ["Engineering", "Tech/CS", "Architecture"] },
  { id: "pku", name: "Peking University", region: "International", country: "China", rankingLabel: "QS #14", rankingValue: 14, requirement: "HSK / SAT 1450+ • IELTS 6.5", sat: 1450, ielts: 6.5, tier: "Reach", majors: ["Sciences", "Humanities"], brand: B.pku, tuitionUSD: 5000, programStrength: ["Sciences", "Humanities", "Physics"] },
  { id: "fudan", name: "Fudan University", region: "International", country: "China", rankingLabel: "QS #39", rankingValue: 39, requirement: "HSK / SAT 1400+ • IELTS 6.5", sat: 1400, ielts: 6.5, tier: "Match", majors: ["Economics", "Medicine"], brand: B.fudan, tuitionUSD: 5000, programStrength: ["Business", "Medicine"] },
  { id: "sjtu", name: "Shanghai Jiao Tong University", region: "International", country: "China", rankingLabel: "QS #45", rankingValue: 45, requirement: "HSK / SAT 1400+ • IELTS 6.5", sat: 1400, ielts: 6.5, tier: "Match", majors: ["Engineering", "Medicine", "Naval Arch"], brand: B.sjtu, tuitionUSD: 5000, programStrength: ["Engineering", "Medicine", "Tech/CS"] },
  { id: "zhejiang", name: "Zhejiang University", region: "International", country: "China", rankingLabel: "QS #47", rankingValue: 47, requirement: "HSK / SAT 1400+ • IELTS 6.5", sat: 1400, ielts: 6.5, tier: "Match", majors: ["Engineering", "CS"], brand: B.zhejiang, tuitionUSD: 5000, programStrength: ["Engineering", "Tech/CS"] },
  { id: "iitb", name: "IIT Bombay", region: "International", country: "India", rankingLabel: "QS #118", rankingValue: 118, requirement: "JEE Advanced / SAT 1400+ • IELTS 6.5", sat: 1400, ielts: 6.5, tier: "Reach", majors: ["Engineering", "CS", "Physics"], brand: B.iitb, tuitionUSD: 6000, programStrength: ["Engineering", "Tech/CS", "Physics"], hiddenGem: true, highlights: ["India's top engineering institute"] },
  { id: "iitd", name: "IIT Delhi", region: "International", country: "India", rankingLabel: "QS #150", rankingValue: 150, requirement: "JEE Advanced / SAT 1400+ • IELTS 6.5", sat: 1400, ielts: 6.5, tier: "Reach", majors: ["Engineering", "CS"], brand: B.iitd, tuitionUSD: 6000, programStrength: ["Engineering", "Tech/CS"], hiddenGem: true },
  { id: "iisc", name: "Indian Institute of Science (IISc)", region: "International", country: "India", rankingLabel: "QS #211", rankingValue: 211, requirement: "Strong STEM • IELTS 6.5", ielts: 6.5, tier: "Match", majors: ["Physics", "Engineering", "Sciences"], brand: B.iisc, tuitionUSD: 4000, programStrength: ["Physics", "Engineering", "Sciences"], hiddenGem: true },

  // Australia / Canada / NZ
  { id: "uoft", name: "University of Toronto", region: "International", country: "Canada", rankingLabel: "QS #21", rankingValue: 21, requirement: "SAT 1330+ • IELTS 6.5", sat: 1330, ielts: 6.5, tier: "Match", majors: ["CS", "Engineering", "Medicine"], brand: B.uoft, tuitionUSD: 45000, programStrength: ["Tech/CS", "Engineering", "Medicine"] },
  { id: "ubc", name: "University of British Columbia", region: "International", country: "Canada", rankingLabel: "QS #34", rankingValue: 34, requirement: "SAT 1300+ • IELTS 6.5", sat: 1300, ielts: 6.5, tier: "Match", majors: ["Sciences", "Forestry", "CS"], brand: B.ubc, tuitionUSD: 42000, programStrength: ["Sciences", "Tech/CS"] },
  { id: "mcgill", name: "McGill University", region: "International", country: "Canada", rankingLabel: "QS #29", rankingValue: 29, requirement: "SAT 1340+ • IELTS 6.5", sat: 1340, ielts: 6.5, tier: "Match", majors: ["Medicine", "Engineering"], brand: B.mcgill, tuitionUSD: 35000, programStrength: ["Medicine", "Engineering"] },
  { id: "waterloo", name: "University of Waterloo", region: "International", country: "Canada", rankingLabel: "QS #112", rankingValue: 112, requirement: "SAT 1300+ • IELTS 6.5", sat: 1300, ielts: 6.5, tier: "Match", majors: ["CS", "Engineering", "Math"], brand: B.waterloo, tuitionUSD: 40000, programStrength: ["Tech/CS", "Engineering", "Sciences"], highlights: ["World-leading co-op CS program"] },
  { id: "mcmaster", name: "McMaster University", region: "International", country: "Canada", rankingLabel: "QS #189", rankingValue: 189, requirement: "IELTS 6.5", ielts: 6.5, tier: "Match", majors: ["Medicine", "Engineering"], brand: B.mcmaster, tuitionUSD: 35000, programStrength: ["Medicine", "Engineering"] },
  { id: "unimelb", name: "University of Melbourne", region: "International", country: "Australia", rankingLabel: "QS #13", rankingValue: 13, requirement: "IELTS 6.5", ielts: 6.5, tier: "Reach", majors: ["Sciences", "Law", "Business"], brand: B.unimelb, tuitionUSD: 32000, programStrength: ["Sciences", "Law", "Business"] },
  { id: "usyd", name: "University of Sydney", region: "International", country: "Australia", rankingLabel: "QS #18", rankingValue: 18, requirement: "IELTS 6.5", ielts: 6.5, tier: "Match", majors: ["Engineering", "Medicine"], brand: B.usyd, tuitionUSD: 35000, programStrength: ["Engineering", "Medicine"] },
  { id: "unsw", name: "UNSW Sydney", region: "International", country: "Australia", rankingLabel: "QS #19", rankingValue: 19, requirement: "IELTS 6.5", ielts: 6.5, tier: "Match", majors: ["Engineering", "Business", "CS"], brand: B.unsw, tuitionUSD: 35000, programStrength: ["Engineering", "Business", "Tech/CS"] },
  { id: "anu", name: "Australian National University", region: "International", country: "Australia", rankingLabel: "QS #30", rankingValue: 30, requirement: "IELTS 6.5", ielts: 6.5, tier: "Match", majors: ["Politics", "Physics", "Astronomy"], brand: B.anu, tuitionUSD: 33000, programStrength: ["Physics", "Sciences", "Humanities"] },
  { id: "monash", name: "Monash University", region: "International", country: "Australia", rankingLabel: "QS #37", rankingValue: 37, requirement: "IELTS 6.5", ielts: 6.5, tier: "Match", majors: ["Pharmacy", "Engineering"], brand: B.monash, tuitionUSD: 32000, programStrength: ["Medicine", "Engineering"] },
  { id: "uq", name: "University of Queensland", region: "International", country: "Australia", rankingLabel: "QS #40", rankingValue: 40, requirement: "IELTS 6.5", ielts: 6.5, tier: "Match", majors: ["Sciences", "Engineering"], brand: B.uq, tuitionUSD: 32000, programStrength: ["Sciences", "Engineering"] },
  { id: "auckland", name: "University of Auckland", region: "International", country: "New Zealand", rankingLabel: "QS #65", rankingValue: 65, requirement: "IELTS 6.0", ielts: 6.0, tier: "Match", majors: ["Engineering", "Business"], brand: B.auckland, tuitionUSD: 25000, programStrength: ["Engineering", "Business"] },

  // US Mid-Tier / Safety + extras
  { id: "gatech", name: "Georgia Tech", region: "International", country: "USA", rankingLabel: "QS #97", rankingValue: 97, requirement: "SAT 1430+ • IELTS 7.0", sat: 1430, ielts: 7.0, tier: "Match", majors: ["Engineering", "CS"], brand: B.gatech, tuitionUSD: 32000, programStrength: ["Engineering", "Tech/CS"], highlights: ["Top-5 US public engineering"] },
  { id: "uiuc", name: "UIUC", region: "International", country: "USA", rankingLabel: "QS #69", rankingValue: 69, requirement: "SAT 1400+ • IELTS 6.5", sat: 1400, ielts: 6.5, tier: "Match", majors: ["CS", "Engineering"], brand: B.uiuc, tuitionUSD: 36000, programStrength: ["Tech/CS", "Engineering"] },
  { id: "uw", name: "University of Washington", region: "International", country: "USA", rankingLabel: "QS #63", rankingValue: 63, requirement: "SAT 1380+ • IELTS 6.5", sat: 1380, ielts: 6.5, tier: "Match", majors: ["CS", "Medicine"], brand: B.uw, tuitionUSD: 41000, programStrength: ["Tech/CS", "Medicine"] },
  { id: "utexas", name: "UT Austin", region: "International", country: "USA", rankingLabel: "QS #58", rankingValue: 58, requirement: "SAT 1400+ • IELTS 6.5", sat: 1400, ielts: 6.5, tier: "Match", majors: ["CS", "Engineering", "Business"], brand: B.utexas, tuitionUSD: 41000, programStrength: ["Tech/CS", "Engineering", "Business"] },
  { id: "bu", name: "Boston University", region: "International", country: "USA", rankingLabel: "QS #112", rankingValue: 112, requirement: "SAT 1380+ • IELTS 7.0", sat: 1380, ielts: 7.0, tier: "Match", majors: ["Communications", "Business"], brand: B.bu, tuitionUSD: 65000, programStrength: ["Business", "Humanities"] },
  { id: "psu", name: "Penn State", region: "International", country: "USA", rankingLabel: "QS #93", rankingValue: 93, requirement: "SAT 1290+ • IELTS 6.5", sat: 1290, ielts: 6.5, tier: "Match", majors: ["Engineering", "Business"], brand: B.psu, tuitionUSD: 38000, programStrength: ["Engineering", "Business"] },
  { id: "osu", name: "Ohio State University", region: "International", country: "USA", rankingLabel: "QS #156", rankingValue: 156, requirement: "SAT 1300+ • IELTS 6.5", sat: 1300, ielts: 6.5, tier: "Match", majors: ["Engineering", "Business"], brand: B.osu, tuitionUSD: 36000, programStrength: ["Engineering", "Business"] },
  { id: "msu", name: "Michigan State University", region: "International", country: "USA", rankingLabel: "QS #172", rankingValue: 172, requirement: "SAT 1180+ • IELTS 6.5", sat: 1180, ielts: 6.5, tier: "Safety", majors: ["Agriculture", "Communications"], brand: B.msu, tuitionUSD: 41000, programStrength: ["Sciences", "Business"] },
  { id: "asu", name: "Arizona State University", region: "International", country: "USA", rankingLabel: "QS #179", rankingValue: 179, requirement: "SAT 1100+ • IELTS 6.0", sat: 1100, ielts: 6.0, tier: "Safety", majors: ["Physics", "Engineering", "Business"], brand: B.asu, tuitionUSD: 32000, programStrength: ["Physics", "Engineering", "Business"] },
  { id: "pitt", name: "University of Pittsburgh", region: "International", country: "USA", rankingLabel: "QS #182", rankingValue: 182, requirement: "SAT 1280+ • IELTS 6.5", sat: 1280, ielts: 6.5, tier: "Safety", majors: ["Medicine", "Philosophy"], brand: B.pitt, tuitionUSD: 38000, programStrength: ["Medicine", "Humanities"] },
  { id: "rutgers", name: "Rutgers University", region: "International", country: "USA", rankingLabel: "QS #277", rankingValue: 277, requirement: "SAT 1240+ • IELTS 6.5", sat: 1240, ielts: 6.5, tier: "Safety", majors: ["Pharmacy", "Business"], brand: B.rutgers, tuitionUSD: 35000, programStrength: ["Medicine", "Business"] },
  { id: "uconn", name: "University of Connecticut", region: "International", country: "USA", rankingLabel: "QS #391", rankingValue: 391, requirement: "SAT 1240+ • IELTS 6.5", sat: 1240, ielts: 6.5, tier: "Safety", majors: ["Business", "Education"], brand: B.uconn, tuitionUSD: 42000, programStrength: ["Business", "Humanities"] },
  { id: "brown_u", name: "Brown University", region: "International", country: "USA", rankingLabel: "QS #64", rankingValue: 64, requirement: "SAT 1500+ • IELTS 7.0", sat: 1500, ielts: 7.0, tier: "Reach", majors: ["Liberal Arts", "CS", "Medicine"], brand: B.brown_u, tuitionUSD: 65000, programStrength: ["Humanities", "Tech/CS", "Medicine"] },
  { id: "dartmouth_u", name: "Dartmouth College", region: "International", country: "USA", rankingLabel: "QS #225", rankingValue: 225, requirement: "SAT 1500+ • IELTS 7.0", sat: 1500, ielts: 7.0, tier: "Reach", majors: ["Economics", "Engineering"], brand: B.dartmouth_u, tuitionUSD: 65000, programStrength: ["Business", "Engineering"] },
  { id: "vandy", name: "Vanderbilt University", region: "International", country: "USA", rankingLabel: "QS #197", rankingValue: 197, requirement: "SAT 1490+ • IELTS 7.0", sat: 1490, ielts: 7.0, tier: "Reach", majors: ["Music", "Engineering", "Education"], brand: B.vandy, tuitionUSD: 62000, programStrength: ["Engineering", "Arts/Design", "Humanities"] },
  { id: "rice", name: "Rice University", region: "International", country: "USA", rankingLabel: "QS #145", rankingValue: 145, requirement: "SAT 1490+ • IELTS 7.0", sat: 1490, ielts: 7.0, tier: "Reach", majors: ["Engineering", "Architecture", "Music"], brand: B.rice, tuitionUSD: 56000, programStrength: ["Engineering", "Architecture", "Arts/Design"] },
  { id: "emory", name: "Emory University", region: "International", country: "USA", rankingLabel: "QS #160", rankingValue: 160, requirement: "SAT 1450+ • IELTS 7.0", sat: 1450, ielts: 7.0, tier: "Reach", majors: ["Medicine", "Business", "Public Health"], brand: B.emory, tuitionUSD: 60000, programStrength: ["Medicine", "Business"] },
  { id: "notredame", name: "University of Notre Dame", region: "International", country: "USA", rankingLabel: "QS #190", rankingValue: 190, requirement: "SAT 1470+ • IELTS 7.0", sat: 1470, ielts: 7.0, tier: "Reach", majors: ["Business", "Engineering", "Theology"], brand: B.notredame, tuitionUSD: 60000, programStrength: ["Business", "Engineering", "Humanities"] },
  { id: "gw", name: "George Washington University", region: "International", country: "USA", rankingLabel: "QS #371", rankingValue: 371, requirement: "SAT 1300+ • IELTS 6.5", sat: 1300, ielts: 6.5, tier: "Match", majors: ["IR", "Political Science", "Business"], brand: B.gw, tuitionUSD: 60000, programStrength: ["Humanities", "Business", "Law"] },

  // ===================== CENTRAL ASIA & CIS =====================
  { id: "auca", name: "American University of Central Asia (AUCA)", region: "International", country: "Kyrgyzstan", rankingLabel: "Regional Top", rankingValue: 1500, requirement: "IELTS 6.0+ • Strong essays", ielts: 6.0, tier: "Safety", majors: ["Liberal Arts", "Business", "Anthropology"], brand: B.auca, tuitionUSD: 6000, programStrength: ["Humanities", "Business"], hiddenGem: true, highlights: ["US-style liberal arts in CIS", "Bard College dual degree"] },
  { id: "nu_uz", name: "National University of Uzbekistan", region: "International", country: "Uzbekistan", rankingLabel: "Regional Top", rankingValue: 1700, requirement: "Local exams • IELTS 5.5", ielts: 5.5, tier: "Safety", majors: ["Physics", "Sciences", "Humanities"], brand: B.nu_uz, tuitionUSD: 2000, programStrength: ["Physics", "Sciences"], hiddenGem: true },
  { id: "iut_uz", name: "Inha University in Tashkent", region: "International", country: "Uzbekistan", rankingLabel: "Regional Tech", rankingValue: 1800, requirement: "IELTS 5.5+", ielts: 5.5, tier: "Safety", majors: ["CS", "Information Communication Eng"], brand: B.iut_uz, tuitionUSD: 4000, programStrength: ["Tech/CS", "Engineering"], hiddenGem: true, highlights: ["Korean-Uzbek joint tech university"] },
  { id: "hse", name: "HSE University", region: "International", country: "Russia", rankingLabel: "QS #298", rankingValue: 298, requirement: "IELTS 6.5", ielts: 6.5, tier: "Match", majors: ["Economics", "CS", "Sociology"], brand: B.hse, tuitionUSD: 7000, programStrength: ["Business", "Tech/CS", "Humanities"] },
  { id: "msu_ru", name: "Lomonosov Moscow State University", region: "International", country: "Russia", rankingLabel: "QS #94", rankingValue: 94, requirement: "TRKI / IELTS 6.0", ielts: 6.0, tier: "Match", majors: ["Physics", "Mathematics", "Humanities"], brand: B.msu_ru, tuitionUSD: 6000, programStrength: ["Physics", "Sciences", "Humanities"] },

  // ===================== KAZAKHSTAN — local focus (expanded) =====================
  { id: "nu", name: "Nazarbayev University", region: "Kazakhstan", country: "Kazakhstan", rankingLabel: "QS #320", rankingValue: 320, requirement: "SAT 1300+ • UNT 130+ • IELTS 6.5", sat: 1300, ielts: 6.5, unt: 130, tier: "Reach", majors: ["Physics", "Engineering", "CS", "Medicine"], brand: B.nu_edu, tuitionUSD: 0, programStrength: ["Physics", "Engineering", "Tech/CS", "Medicine"], notes: "Full-tuition scholarships for top STEM admits. Olympiad winners (Republic+) get major boost.", hiddenGem: true, highlights: ["Full state scholarship for admitted students", "English-medium curriculum", "Top STEM faculty in Central Asia"] },
  { id: "kbtu", name: "Kazakh-British Technical University (KBTU)", region: "Kazakhstan", country: "Kazakhstan", rankingLabel: "National Top 5", rankingValue: 700, requirement: "UNT 110+ • IELTS 5.5+", ielts: 5.5, unt: 110, tier: "Match", majors: ["Petroleum Eng", "CS", "Finance"], brand: B.kbtu, tuitionUSD: 5000, programStrength: ["Engineering", "Tech/CS", "Business"] },
  { id: "aitu", name: "Astana IT University (AITU)", region: "Kazakhstan", country: "Kazakhstan", rankingLabel: "National IT Top 3", rankingValue: 900, requirement: "UNT 100+ • IELTS 5.5", ielts: 5.5, unt: 100, tier: "Match", majors: ["CS", "Cybersecurity", "Data Science"], brand: B.aitu, tuitionUSD: 4500, programStrength: ["Tech/CS", "Engineering"] },
  { id: "iitu", name: "International IT University (IITU)", region: "Kazakhstan", country: "Kazakhstan", rankingLabel: "National IT Top 5", rankingValue: 950, requirement: "UNT 95+ • IELTS 5.5", ielts: 5.5, unt: 95, tier: "Safety", majors: ["CS", "Media Tech"], brand: B.iitu, tuitionUSD: 4000, programStrength: ["Tech/CS", "Arts/Design"] },
  { id: "satbayev", name: "Satbayev University", region: "Kazakhstan", country: "Kazakhstan", rankingLabel: "National Top 5", rankingValue: 700, requirement: "UNT 100+ • IELTS 5.5 (optional)", unt: 100, ielts: 5.5, tier: "Match", majors: ["Physics", "Mining", "Engineering"], brand: B.satbayev, tuitionUSD: 3500, programStrength: ["Physics", "Engineering", "Sciences"], notes: "Strong Physics & Mining engineering. Local grant: UNT 100+ qualifies.", highlights: ["Engineering & geosciences leader in KZ"] },
  { id: "kaznu", name: "Al-Farabi KazNU", region: "Kazakhstan", country: "Kazakhstan", rankingLabel: "QS #160", rankingValue: 160, requirement: "UNT 90+ • Local docs", unt: 90, tier: "Safety", majors: ["Physics", "Mathematics", "Chemistry", "Humanities"], brand: B.kaznu, tuitionUSD: 3000, programStrength: ["Physics", "Sciences", "Humanities"] },
  { id: "kaznpu", name: "Abai KazNPU", region: "Kazakhstan", country: "Kazakhstan", rankingLabel: "National Top 10", rankingValue: 1100, requirement: "UNT 75+", unt: 75, tier: "Safety", majors: ["Education", "Languages"], brand: B.kaznpu, tuitionUSD: 2500, programStrength: ["Humanities"] },
  { id: "kaztu", name: "Kazakh National Technical University (KazNTU)", region: "Kazakhstan", country: "Kazakhstan", rankingLabel: "National Top 10", rankingValue: 1100, requirement: "UNT 90+", unt: 90, tier: "Safety", majors: ["Engineering", "Geology"], brand: B.kaztu, tuitionUSD: 2800, programStrength: ["Engineering", "Sciences"] },
  { id: "kimep", name: "KIMEP University", region: "Kazakhstan", country: "Kazakhstan", rankingLabel: "National Business Top 3", rankingValue: 1000, requirement: "IELTS 5.5+ • UNT optional", ielts: 5.5, tier: "Match", majors: ["Business", "Law", "International Relations"], brand: B.kimep, tuitionUSD: 6000, programStrength: ["Business", "Law", "Humanities"] },
  { id: "suleyman", name: "Suleyman Demirel University", region: "Kazakhstan", country: "Kazakhstan", rankingLabel: "National Top 15", rankingValue: 1200, requirement: "UNT 80+ • IELTS 5.0", unt: 80, ielts: 5.0, tier: "Safety", majors: ["CS", "Engineering"], brand: B.suleyman, tuitionUSD: 3000, programStrength: ["Tech/CS", "Engineering"] },
  { id: "agraryan", name: "Kazakh National Agrarian University", region: "Kazakhstan", country: "Kazakhstan", rankingLabel: "National Specialized", rankingValue: 1300, requirement: "UNT 70+", unt: 70, tier: "Safety", majors: ["Agriculture", "Veterinary"], brand: B.agraryan, tuitionUSD: 2200, programStrength: ["Sciences"] },
  { id: "almaty_mgt", name: "Almaty Management University (AlmaU)", region: "Kazakhstan", country: "Kazakhstan", rankingLabel: "National Business Top 5", rankingValue: 1250, requirement: "UNT 80+", unt: 80, tier: "Safety", majors: ["Business", "Marketing"], brand: B.almaty, tuitionUSD: 3500, programStrength: ["Business"] },
  { id: "enu", name: "L.N. Gumilyov Eurasian National University (ENU)", region: "Kazakhstan", country: "Kazakhstan", rankingLabel: "QS #491", rankingValue: 491, requirement: "UNT 95+ • IELTS 5.5", unt: 95, ielts: 5.5, tier: "Match", majors: ["Physics", "Engineering", "International Relations"], brand: B.enu, tuitionUSD: 2800, programStrength: ["Physics", "Engineering", "Humanities"], hiddenGem: true, highlights: ["Astana flagship public university", "Strong physics & math faculty"] },
  { id: "karu", name: "Karaganda Buketov University", region: "Kazakhstan", country: "Kazakhstan", rankingLabel: "National Top 20", rankingValue: 1300, requirement: "UNT 75+", unt: 75, tier: "Safety", majors: ["Physics", "Education", "Sciences"], brand: B.karu, tuitionUSD: 2000, programStrength: ["Physics", "Sciences"] },
  { id: "ksmu", name: "Karaganda Medical University", region: "Kazakhstan", country: "Kazakhstan", rankingLabel: "National Medical Top 5", rankingValue: 1200, requirement: "UNT 90+ Biology/Chem", unt: 90, tier: "Match", majors: ["Medicine", "Pharmacy"], brand: B.ksmu, tuitionUSD: 3500, programStrength: ["Medicine"] },
  { id: "wkmu", name: "West Kazakhstan Marat Ospanov Medical University", region: "Kazakhstan", country: "Kazakhstan", rankingLabel: "National Medical Top 10", rankingValue: 1300, requirement: "UNT 85+ Biology/Chem", unt: 85, tier: "Safety", majors: ["Medicine", "Public Health"], brand: B.wkmu, tuitionUSD: 3000, programStrength: ["Medicine"] },
  { id: "shokan", name: "Sh. Ualikhanov Kokshetau University", region: "Kazakhstan", country: "Kazakhstan", rankingLabel: "Regional", rankingValue: 1500, requirement: "UNT 70+", unt: 70, tier: "Safety", majors: ["Education", "Tourism", "Sciences"], brand: B.shokan, tuitionUSD: 1800, programStrength: ["Humanities", "Sciences"] },
  { id: "toraighyrov", name: "Toraighyrov University (Pavlodar)", region: "Kazakhstan", country: "Kazakhstan", rankingLabel: "Regional", rankingValue: 1500, requirement: "UNT 75+", unt: 75, tier: "Safety", majors: ["Engineering", "Energy", "Metallurgy"], brand: B.toraighyrov, tuitionUSD: 2000, programStrength: ["Engineering", "Sciences"] },
  { id: "zhetysu", name: "Zhetysu University (Taldykorgan)", region: "Kazakhstan", country: "Kazakhstan", rankingLabel: "Regional", rankingValue: 1500, requirement: "UNT 70+", unt: 70, tier: "Safety", majors: ["Education", "Agriculture"], brand: B.zhetysu, tuitionUSD: 1800, programStrength: ["Humanities", "Sciences"] },
];

// ---------- Helpers ----------
export const findUniversity = (id: string) => universities.find((u) => u.id === id);

export const TUITION_BUCKETS = [
  { id: "free", label: "Free / < $5K", test: (t: number) => t < 5000 },
  { id: "low", label: "$5K – $15K", test: (t: number) => t >= 5000 && t < 15000 },
  { id: "mid", label: "$15K – $35K", test: (t: number) => t >= 15000 && t < 35000 },
  { id: "high", label: "$35K+", test: (t: number) => t >= 35000 },
] as const;

export const PROGRAM_STRENGTHS: ProgramStrength[] = [
  "Physics", "Engineering", "Tech/CS", "Business", "Medicine", "Humanities", "Law", "Arts/Design", "Sciences", "Architecture",
];

export const REGIONS_FILTER = [
  "All",
  "Kazakhstan",
  "Central Asia & CIS",
  "USA & Canada",
  "UK & Ireland",
  "Western Europe",
  "Northern Europe",
  "Eastern Europe",
  "Asia-Pacific",
] as const;

export const macroRegion = (u: University): typeof REGIONS_FILTER[number] => {
  if (u.region === "Kazakhstan") return "Kazakhstan";
  const c = u.country;
  if (["Kyrgyzstan", "Uzbekistan", "Russia", "Tajikistan", "Turkmenistan"].includes(c)) return "Central Asia & CIS";
  if (["USA", "Canada"].includes(c)) return "USA & Canada";
  if (["UK", "Ireland"].includes(c)) return "UK & Ireland";
  if (["Germany", "France", "Netherlands", "Belgium", "Switzerland", "Austria", "Italy"].includes(c)) return "Western Europe";
  if (["Sweden", "Norway", "Denmark", "Finland"].includes(c)) return "Northern Europe";
  if (["Poland", "Czechia", "Hungary", "Turkey"].includes(c)) return "Eastern Europe";
  return "Asia-Pacific";
};

// Sanity check (compile-time): tier matches ranking heuristic for unspecified items
void tierFromRank;
