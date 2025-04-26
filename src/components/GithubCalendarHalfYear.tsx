"use client";

interface Activity {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export const SelectLastHalfYear = (contributions: Activity[]): Activity[] => {
  const currentYear = new Date().getFullYear();
  
  // Buat Map untuk akses cepat
  const contributionMap = new Map<string, Activity>();
  contributions.forEach((activity) => {
    contributionMap.set(activity.date, activity);
  });

  const fullYearActivities: Activity[] = [];

  const startDate = new Date(currentYear, 0, 1); // 1 Januari
  const endDate = new Date(currentYear, 11, 31); // 31 Desember

  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().slice(0, 10); // format YYYY-MM-DD

    const activity = contributionMap.get(dateStr);
    if (activity) {
      fullYearActivities.push(activity);
    } else {
      fullYearActivities.push({
        date: dateStr,
        count: 0,
        level: 0,
      });
    }
  }

  return fullYearActivities;
};
