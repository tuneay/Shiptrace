const monthNames = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"] as const;

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "repository";
}

export function createTraceSlug(repoName: string, periodStart: string, periodEnd: string) {
  const start = new Date(periodStart);
  const end = new Date(periodEnd);
  const random = crypto.randomUUID().replace(/-/g, "").slice(0, 5);
  const suffix = `${monthNames[start.getUTCMonth()]}-${start.getUTCDate()}-${end.getUTCDate()}-${random}`;
  const maxRepoLength = Math.max(8, 80 - suffix.length - 1);
  const repo = slugify(repoName).slice(0, maxRepoLength).replace(/-$/, "");
  return `${repo}-${suffix}`;
}
