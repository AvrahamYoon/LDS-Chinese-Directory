import type { Branch, BranchFilters } from "./types";

export function filterBranches(branches: Branch[], filters: BranchFilters) {
  const search = filters.search.trim().toLowerCase();

  return branches.filter((branch) => {
    const searchableText = [
      branch.name.en,
      branch.name.zhTw,
      branch.location.address,
      branch.location.city,
      branch.location.state,
      branch.location.postalCode
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    const matchesSearch = search === "" || searchableText.includes(search);
    const matchesStatus =
      filters.status === "all" || branch.status === filters.status;
    const matchesType = filters.type === "all" || branch.type === filters.type;
    const matchesLanguage =
      filters.language === "all" || branch.language === filters.language;
    const matchesRegion =
      filters.region === "all" || branch.region === filters.region;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesType &&
      matchesLanguage &&
      matchesRegion
    );
  });
}
