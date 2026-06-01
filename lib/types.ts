export type BranchType = "ward" | "branch";

export type BranchLanguage =
  | "mandarin"
  | "cantonese"
  | "asian"
  | "mixed";

export type BranchStatus = "active" | "discontinued" | "unknown";

export type BranchRegion =
  | "utah"
  | "arizona"
  | "california"
  | "texas"
  | "new-york"
  | "massachusetts"
  | "mid-atlantic"
  | "southeast"
  | "pacific-northwest"
  | "nevada"
  | "united-kingdom"
  | "canada"
  | "australia"
  | "new-zealand"
  | "malaysia";

export type Branch = {
  id: string;
  name: {
    en: string;
    zhTw?: string;
    zhCn?: string;
  };
  type: BranchType;
  language: BranchLanguage;
  status: BranchStatus;
  location: {
    lat: number;
    lng: number;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  region: BranchRegion;
  founded?: string;
  discontinued?: string;
  notes?: string;
  officialUrl?: string;
  sources?: string[];
  lastVerified?: string;
};

export type BranchFilters = {
  search: string;
  status: "all" | BranchStatus;
  type: "all" | BranchType;
  language: "all" | BranchLanguage;
};

export type Locale = "en" | "zh";
