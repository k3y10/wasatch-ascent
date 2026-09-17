import type { BillingPlan } from "./billing";

export const FALLBACK_PLANS: BillingPlan[] = [
  {
    code: "field",
    name: "Individual",
    description: "Personal TerraSatch access for one field user.",
    monthly_amount_cents: 4_900,
    annual_amount_cents: null,
    trial_days: 30,
    self_service: true,
    recommended: false,
    entitlements: {
      max_sites: 1,
      max_members: 1,
      max_edge_devices: 1,
      max_channels: 1,
      included_processing_hours: 15,
      retention_days: 14,
      api_access: false,
      priority_support: false,
    },
  },
  {
    code: "team",
    name: "Team",
    description: "Shared TerraSatch access for one working crew.",
    monthly_amount_cents: 50_000,
    annual_amount_cents: null,
    trial_days: 30,
    self_service: true,
    recommended: true,
    entitlements: {
      max_sites: 1,
      max_members: 10,
      max_edge_devices: 6,
      max_channels: 12,
      included_processing_hours: 75,
      retention_days: 90,
      api_access: true,
      priority_support: false,
    },
  },
  {
    code: "operations",
    name: "Annual Site",
    description: "Recurring TerraSatch deployment for one operating site or department.",
    monthly_amount_cents: null,
    annual_amount_cents: 5_000_000,
    trial_days: 0,
    self_service: false,
    recommended: false,
    entitlements: {
      max_sites: 1,
      max_members: 30,
      max_edge_devices: 20,
      max_channels: 40,
      included_processing_hours: 250,
      retention_days: 365,
      api_access: true,
      priority_support: true,
    },
  },
  {
    code: "enterprise",
    name: "Enterprise",
    description: "Multi-site or higher-assurance TerraSatch deployment.",
    monthly_amount_cents: null,
    annual_amount_cents: 12_500_000,
    trial_days: 0,
    self_service: false,
    recommended: false,
    entitlements: {
      max_sites: null,
      max_members: null,
      max_edge_devices: null,
      max_channels: null,
      included_processing_hours: null,
      retention_days: null,
      api_access: true,
      priority_support: true,
    },
  },
];


export function catalogMatchesPitchModel(catalog: unknown): catalog is BillingPlan[] {
  if (!Array.isArray(catalog) || catalog.length !== FALLBACK_PLANS.length) return false;
  return FALLBACK_PLANS.every(expected => {
    const matches = catalog.filter(plan => plan?.code === expected.code);
    if (matches.length !== 1) return false;
    const plan = matches[0];
    return plan.monthly_amount_cents === expected.monthly_amount_cents
      && plan.annual_amount_cents === expected.annual_amount_cents
      && plan.trial_days === expected.trial_days
      && plan.self_service === expected.self_service;
  });
}
