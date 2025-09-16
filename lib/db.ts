import type { Contact } from "./types";

// Simple deterministic-ish data to avoid external dependencies.
const FIRST_NAMES = [
  "Alex","Jordan","Taylor","Casey","Riley","Jamie","Morgan","Avery","Cameron","Drew",
  "Sam","Charlie","Reese","Parker","Quinn","Rowan","Skyler","Emerson","Hayden","Jules"
];
const LAST_NAMES = [
  "Johnson","Smith","Williams","Brown","Jones","Garcia","Miller","Davis","Rodriguez","Martinez",
  "Hernandez","Lopez","Gonzalez","Wilson","Anderson","Thomas","Taylor","Moore","Jackson","Martin"
];
const COMPANIES = [
  "Acme Corp","Globex","Initech","Umbrella","Stark Industries","Wayne Enterprises","Hooli",
  "Pied Piper","Wonka Co","Soylent","Massive Dynamic","Cyberdyne","Gringotts","Nuka-Cola","Aperture Labs"
];
const DOMAINS = ["example.com", "corp.io", "business.org", "mail.net"];

function pad(n: number, size = 3) {
  let s = String(n);
  while (s.length < size) s = "0" + s;
  return s;
}

function randomPick<T>(arr: T[], i: number): T {
  // deterministic-ish pick based on index
  return arr[i % arr.length];
}

const CONTACTS: Contact[] = Array.from({ length: 300 }, (_, i) => {
  const first = randomPick(FIRST_NAMES, i + 7);
  const last = randomPick(LAST_NAMES, i * 3 + 11);
  const company = randomPick(COMPANIES, i * 5 + 13);
  const domain = randomPick(DOMAINS, i * 7 + 17);
  const name = `${first} ${last}`;
  const email = `${first.toLowerCase()}.${last.toLowerCase()}${pad(i % 100, 2)}@${domain}`;
  const phone = `+1-555-${pad((i * 13) % 1000, 3)}-${pad((i * 17) % 1000, 4)}`;
  const daysAgo = (i % 365);
  const lastModified = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000).toISOString();

  return {
    id: `c_${i + 1}`,
    name,
    email,
    company,
    phone,
    lastModified
  };
});

export function getAllContacts(): Contact[] {
  return CONTACTS;
}