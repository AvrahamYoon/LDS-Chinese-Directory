"use client";

import { useEffect, useMemo, useRef } from "react";
import L from "leaflet";
import type { Branch, Locale, Temple, TempleStatus } from "@/lib/types";
import { formatBranchType, formatLanguage, formatStatus } from "@/lib/format";

type BranchMapProps = {
  branches: Branch[];
  expandDenseAreas: boolean;
  locale: Locale;
  temples: Temple[];
};

type BranchLocationGroup = {
  kind: "location" | "area";
  lat: number;
  lng: number;
  branches: Branch[];
};

const UNITED_STATES_CENTER: L.LatLngExpression = [39.5, -98.35];
const SPARSE_GROUP_LIMIT = 16;
const DENSE_CLUSTER_REGIONS = new Set<Branch["region"]>([
  "taiwan",
  "hong-kong"
]);

const popupCopy = {
  en: {
    type: "Type",
    language: "Language",
    status: "Status",
    details: "View details",
    official: "Official church page"
  },
  zh: {
    type: "類型",
    language: "語言",
    status: "狀態",
    details: "查看詳情",
    official: "前往官方教會頁面"
  }
};

function markerColor(branch: Branch) {
  if (branch.status === "discontinued") {
    return "#8a8f98";
  }

  return branch.type === "ward" ? "#2563eb" : "#16a34a";
}

function markerGroupColor(branches: Branch[]) {
  const activeBranches = branches.filter(
    (branch) => branch.status !== "discontinued"
  );

  if (activeBranches.length === 0) {
    return "#8a8f98";
  }

  const hasWards = activeBranches.some((branch) => branch.type === "ward");
  const hasBranches = activeBranches.some((branch) => branch.type === "branch");

  if (hasWards && hasBranches) {
    return "#b8841f";
  }

  return markerColor(activeBranches[0]);
}

function createMarkerIcon(branches: Branch[]) {
  const color = markerGroupColor(branches);
  const count = branches.length;
  const countClass = count > 1 ? " is-grouped" : "";
  const largeCountClass = count > 99 ? " is-large-group" : "";
  const label = count > 1 ? count.toString() : "";
  const iconSize: L.PointTuple =
    count > 99 ? [36, 28] : count > 1 ? [28, 28] : [24, 24];

  return L.divIcon({
    className: `branch-marker${countClass}${largeCountClass}`,
    html: `<span style="background:${color}">${label}</span>`,
    iconSize,
    iconAnchor: [iconSize[0] / 2, iconSize[1] / 2],
    popupAnchor: [0, -12]
  });
}

function clusterDistanceForZoom(zoom: number) {
  if (zoom < 5) {
    return 92;
  }

  if (zoom < 8) {
    return 58;
  }

  if (zoom < 12) {
    return 34;
  }

  return 14;
}

function createTempleIcon(status: TempleStatus) {
  const statusClass = ` temple-${status}`;

  return L.divIcon({
    className: `temple-marker${statusClass}`,
    html: `
      <span aria-hidden="true">
        <i></i>
      </span>
    `,
    iconSize: [34, 38],
    iconAnchor: [17, 19],
    popupAnchor: [0, -18]
  });
}

function branchTitle(branch: Branch, locale: Locale) {
  return locale === "zh" ? branch.name.zhTw ?? branch.name.en : branch.name.en;
}

function templeTitle(temple: Temple, locale: Locale) {
  return locale === "zh" ? temple.name.zhTw : temple.name.en;
}

function templeStatusLabel(status: TempleStatus, locale: Locale) {
  const labels: Record<TempleStatus, Record<Locale, string>> = {
    announced: { en: "Announced", zh: "已宣布" },
    operating: { en: "Operating", zh: "營運中" },
    "under-construction": { en: "Under construction", zh: "興建中" }
  };

  return labels[status][locale];
}

function branchAddress(branch: Branch) {
  return [
    branch.location.address,
    branch.location.city,
    branch.location.state,
    branch.location.postalCode
  ]
    .filter(Boolean)
    .join(", ");
}

function branchPlace(branch: Branch) {
  return [
    branch.location.city,
    branch.location.state,
    branch.location.country
  ]
    .filter(Boolean)
    .join(", ");
}

function popupHtml(branch: Branch, locale: Locale) {
  const t = popupCopy[locale];
  const title = branchTitle(branch, locale);
  const officialLink = branch.officialUrl
    ? `<a class="popup-official-link" href="${branch.officialUrl}" target="_blank" rel="noreferrer">${t.official}</a>`
    : "";
  const address = branchAddress(branch);

  return `
    <div class="branch-popup">
      <strong>${title}</strong>
      <p>${address}</p>
      <dl>
        <div><dt>${t.type}</dt><dd>${formatBranchType(
          branch.type,
          locale
        )}</dd></div>
        <div><dt>${t.language}</dt><dd>${formatLanguage(
          branch.language,
          locale
        )}</dd></div>
        <div><dt>${t.status}</dt><dd>${formatStatus(
          branch.status,
          locale
        )}</dd></div>
      </dl>
      <div class="popup-actions">
        <a href="/branches/${branch.id}?lang=${locale}">${t.details}</a>
        ${officialLink}
      </div>
    </div>
  `;
}

function templePopupHtml(temple: Temple, locale: Locale) {
  const statusLabel = templeStatusLabel(temple.status, locale);
  const address = [
    temple.location.address,
    temple.location.city,
    temple.location.state
  ]
    .filter(Boolean)
    .join(", ");
  const milestones = [
    temple.announced
      ? `<div><dt>${locale === "zh" ? "宣布" : "Announced"}</dt><dd>${temple.announced}</dd></div>`
      : "",
    temple.groundbreaking
      ? `<div><dt>${locale === "zh" ? "動土" : "Groundbreaking"}</dt><dd>${temple.groundbreaking}</dd></div>`
      : "",
    temple.dedicated
      ? `<div><dt>${locale === "zh" ? "奉獻" : "Dedicated"}</dt><dd>${temple.dedicated}</dd></div>`
      : "",
    temple.rededicated
      ? `<div><dt>${locale === "zh" ? "重新奉獻" : "Rededicated"}</dt><dd>${temple.rededicated}</dd></div>`
      : ""
  ]
    .filter(Boolean)
    .join("");

  return `
    <div class="branch-popup temple-popup">
      <strong>${templeTitle(temple, locale)}</strong>
      <p>${address}</p>
      <dl>
        <div><dt>${locale === "zh" ? "狀態" : "Status"}</dt><dd>${statusLabel}</dd></div>
        ${milestones}
      </dl>
      ${temple.notes ? `<p>${temple.notes}</p>` : ""}
      <div class="popup-actions">
        <a class="popup-official-link" href="${temple.officialUrl}" target="_blank" rel="noreferrer">
          ${locale === "zh" ? "官方聖殿頁面" : "Official temple page"}
        </a>
      </div>
    </div>
  `;
}

function groupedPopupHtml(group: BranchLocationGroup, locale: Locale) {
  if (group.branches.length === 1) {
    return popupHtml(group.branches[0], locale);
  }

  const t = popupCopy[locale];
  const unitsLabel = locale === "zh" ? "個單位" : "units";
  const isAreaGroup = group.kind === "area";
  const heading =
    locale === "zh"
      ? `${isAreaGroup ? "此區域" : "此地點"}有 ${group.branches.length} ${unitsLabel}`
      : `${group.branches.length} ${unitsLabel} in this ${
          isAreaGroup ? "area" : "location"
        }`;
  const groupAddress = isAreaGroup
    ? ""
    : `<p>${branchAddress(group.branches[0])}</p>`;
  const branchItems = group.branches
    .map(
      (branch) => `
        <li>
          <strong>${branchTitle(branch, locale)}</strong>
          <p>${isAreaGroup ? branchPlace(branch) : branchAddress(branch)}</p>
          <dl>
            <div><dt>${t.type}</dt><dd>${formatBranchType(
              branch.type,
              locale
            )}</dd></div>
            <div><dt>${t.language}</dt><dd>${formatLanguage(
              branch.language,
              locale
            )}</dd></div>
            <div><dt>${t.status}</dt><dd>${formatStatus(
              branch.status,
              locale
            )}</dd></div>
          </dl>
          <a href="/branches/${branch.id}?lang=${locale}">${t.details}</a>
        </li>
      `
    )
    .join("");

  return `
    <div class="branch-popup branch-popup-group">
      <strong>${heading}</strong>
      ${groupAddress}
      <ul>
        ${branchItems}
      </ul>
    </div>
  `;
}

function groupBranchesByLocation(branches: Branch[]) {
  const groups = new Map<string, BranchLocationGroup>();

  branches.forEach((branch) => {
    const key = `${branch.location.lat},${branch.location.lng}`;
    const group = groups.get(key);

    if (group) {
      group.branches.push(branch);
      return;
    }

    groups.set(key, {
      kind: "location",
      lat: branch.location.lat,
      lng: branch.location.lng,
      branches: [branch]
    });
  });

  return Array.from(groups.values());
}

function clusterBranchGroups(
  map: L.Map,
  groups: BranchLocationGroup[],
  expandDenseAreas: boolean
): BranchLocationGroup[] {
  if (expandDenseAreas || groups.length <= SPARSE_GROUP_LIMIT) {
    return groups;
  }

  const regularGroups = groups.filter(
    (group) => !DENSE_CLUSTER_REGIONS.has(group.branches[0].region)
  );
  const denseGroupsByRegion = new Map<Branch["region"], BranchLocationGroup[]>();

  groups.forEach((group) => {
    const region = group.branches[0].region;

    if (!DENSE_CLUSTER_REGIONS.has(region)) {
      return;
    }

    const regionGroups = denseGroupsByRegion.get(region) ?? [];
    regionGroups.push(group);
    denseGroupsByRegion.set(region, regionGroups);
  });

  const zoom = map.getZoom();
  const maxDistance = clusterDistanceForZoom(zoom);
  const clusters: BranchLocationGroup[] = [...regularGroups];

  denseGroupsByRegion.forEach((regionGroups) => {
    const regionClusters: BranchLocationGroup[] = [];

    regionGroups.forEach((group) => {
      const point = map.latLngToLayerPoint([group.lat, group.lng]);
      const matchingCluster = regionClusters.find((cluster) => {
        const clusterPoint = map.latLngToLayerPoint([cluster.lat, cluster.lng]);
        return point.distanceTo(clusterPoint) <= maxDistance;
      });

      if (!matchingCluster) {
        regionClusters.push({
          kind: group.kind,
          lat: group.lat,
          lng: group.lng,
          branches: [...group.branches]
        });
        return;
      }

      const currentWeight = matchingCluster.branches.length;
      const nextWeight = group.branches.length;
      const totalWeight = currentWeight + nextWeight;

      matchingCluster.lat =
        (matchingCluster.lat * currentWeight + group.lat * nextWeight) /
        totalWeight;
      matchingCluster.lng =
        (matchingCluster.lng * currentWeight + group.lng * nextWeight) /
        totalWeight;
      matchingCluster.kind = "area";
      matchingCluster.branches.push(...group.branches);
    });

    clusters.push(...regionClusters);
  });

  return clusters;
}

export function BranchMap({
  branches,
  expandDenseAreas,
  locale,
  temples
}: BranchMapProps) {
  const mapElementRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const branchLayerRef = useRef<L.LayerGroup | null>(null);
  const templeLayerRef = useRef<L.LayerGroup | null>(null);
  const branchGroupsRef = useRef<BranchLocationGroup[]>([]);
  const expandDenseAreasRef = useRef(expandDenseAreas);
  const localeRef = useRef<Locale>(locale);
  const renderSignatureRef = useRef("");

  const renderSignature = useMemo(
    () =>
      `${branches.length}:${expandDenseAreas}:${temples.length}:${temples.map((temple) => temple.id).join(",")}`,
    [branches, expandDenseAreas, temples]
  );

  useEffect(() => {
    if (!mapElementRef.current || mapRef.current) {
      return;
    }

    const map = L.map(mapElementRef.current, {
      center: UNITED_STATES_CENTER,
      zoom: 4,
      scrollWheelZoom: true
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    map.createPane("templePane");
    const templePane = map.getPane("templePane");

    if (templePane) {
      templePane.style.zIndex = "650";
    }

    const branchLayer = L.layerGroup().addTo(map);
    const templeLayer = L.layerGroup().addTo(map);
    mapRef.current = map;
    branchLayerRef.current = branchLayer;
    templeLayerRef.current = templeLayer;

    const renderBranchLayer = () => {
      branchLayer.clearLayers();

      const clusteredGroups = clusterBranchGroups(
        map,
        branchGroupsRef.current,
        expandDenseAreasRef.current
      );

      clusteredGroups.forEach((group) => {
        L.marker([group.lat, group.lng], {
          icon: createMarkerIcon(group.branches),
          keyboard: true,
          riseOnHover: true,
          title: group.branches.map((branch) => branch.name.en).join(", ")
        })
          .bindPopup(groupedPopupHtml(group, localeRef.current), {
            closeButton: true,
            maxWidth: 340
          })
          .addTo(branchLayer);
      });
    };

    map.on("zoomend", renderBranchLayer);

    return () => {
      map.off("zoomend", renderBranchLayer);
      map.remove();
      mapRef.current = null;
      branchLayerRef.current = null;
      templeLayerRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    const branchLayer = branchLayerRef.current;
    const templeLayer = templeLayerRef.current;

    if (!map || !branchLayer || !templeLayer) {
      return;
    }

    localeRef.current = locale;
    expandDenseAreasRef.current = expandDenseAreas;
    branchGroupsRef.current = groupBranchesByLocation(branches);

    branchLayer.clearLayers();
    templeLayer.clearLayers();

    const clusteredGroups = clusterBranchGroups(
      map,
      branchGroupsRef.current,
      expandDenseAreas
    );

    clusteredGroups.forEach((group) => {
      L.marker([group.lat, group.lng], {
        icon: createMarkerIcon(group.branches),
        keyboard: true,
        riseOnHover: true,
        title: group.branches.map((branch) => branch.name.en).join(", ")
      })
        .bindPopup(groupedPopupHtml(group, locale), {
          closeButton: true,
          maxWidth: 340
        })
        .addTo(branchLayer);
    });

    temples.forEach((temple) => {
      L.marker([temple.location.lat, temple.location.lng], {
        icon: createTempleIcon(temple.status),
        keyboard: true,
        pane: "templePane",
        riseOnHover: true,
        zIndexOffset: 1000,
        title: temple.name.en
      })
        .bindPopup(templePopupHtml(temple, locale), {
          closeButton: true,
          maxWidth: 360
        })
        .addTo(templeLayer);
    });

    const dataChanged = renderSignatureRef.current !== renderSignature;
    renderSignatureRef.current = renderSignature;

    if (!dataChanged) {
      return;
    }

    const boundsPoints = [
      ...branches.map((branch) => [branch.location.lat, branch.location.lng]),
      ...temples.map((temple) => [temple.location.lat, temple.location.lng])
    ] as L.LatLngExpression[];

    if (boundsPoints.length > 0) {
      const bounds = L.latLngBounds(boundsPoints);
      map.fitBounds(bounds, {
        padding: [42, 42],
        maxZoom: expandDenseAreas ? 14 : 11
      });
    }
  }, [branches, expandDenseAreas, locale, renderSignature, temples]);

  return <div ref={mapElementRef} className="leaflet-map" />;
}
