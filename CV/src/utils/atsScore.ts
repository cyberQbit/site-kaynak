import type { CVData } from '../types/cv';

export interface ATSScore {
  total: number;
  sections: {
    label: string;
    score: number;
    max: number;
    tip: string;
  }[];
}

export function calculateATSScore(data: CVData): ATSScore {
  const sections = [];

  // Personal Info (25 pts)
  let personalScore = 0;
  const pi = data.personalInfo;
  if (pi.fullName) personalScore += 5;
  if (pi.email) personalScore += 5;
  if (pi.phone) personalScore += 5;
  if (pi.location) personalScore += 3;
  if (pi.linkedin) personalScore += 4;
  if (pi.jobTitle) personalScore += 3;
  sections.push({
    label: 'Kişisel Bilgiler',
    score: personalScore,
    max: 25,
    tip: personalScore < 20 ? 'Ad, e-posta, telefon, konum ve LinkedIn ekleyin' : 'Mükemmel!',
  });

  // Summary (15 pts)
  let summaryScore = 0;
  const summary = pi.summary || '';
  if (summary.length > 50) summaryScore += 5;
  if (summary.length > 150) summaryScore += 5;
  if (summary.length > 300) summaryScore += 5;
  sections.push({
    label: 'Profesyonel Özet',
    score: summaryScore,
    max: 15,
    tip: summaryScore < 15 ? '150–400 karakter arası özet yazın' : 'Mükemmel!',
  });

  // Experience (25 pts)
  let expScore = 0;
  if (data.experience.length > 0) expScore += 10;
  if (data.experience.length >= 2) expScore += 5;
  const hasDescriptions = data.experience.some(e => e.description && e.description.length > 30);
  if (hasDescriptions) expScore += 10;
  sections.push({
    label: 'İş Deneyimi',
    score: expScore,
    max: 25,
    tip: expScore < 20 ? 'Her deneyim için detaylı açıklama ekleyin' : 'İyi görünüyor!',
  });

  // Skills (20 pts)
  let skillScore = 0;
  if (data.skills.length >= 3) skillScore += 5;
  if (data.skills.length >= 6) skillScore += 10;
  if (data.skills.length >= 10) skillScore += 5;
  sections.push({
    label: 'Yetenekler',
    score: skillScore,
    max: 20,
    tip: skillScore < 15 ? 'En az 6–10 yetenek ekleyin' : 'İyi görünüyor!',
  });

  // Education (15 pts)
  let eduScore = 0;
  if (data.education.length > 0) eduScore += 10;
  const hasField = data.education.some(e => e.field);
  if (hasField) eduScore += 5;
  sections.push({
    label: 'Eğitim',
    score: eduScore,
    max: 15,
    tip: eduScore < 10 ? 'Eğitim bilgisi ekleyin' : 'İyi görünüyor!',
  });

  const total = sections.reduce((acc, s) => acc + s.score, 0);

  return { total, sections };
}
