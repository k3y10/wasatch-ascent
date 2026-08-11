export type DeploymentInputs = {
  radios: number;
  teams: number;
  channels: number;
  communications: number;
  documents: number;
  workflows: number;
  languages: number;
};

export const deploymentRates = {
  platform: 750,
  radio: 12,
  team: 45,
  channel: 65,
  communication: 0.025,
  document: 0.18,
  workflow: 35,
  additionalLanguage: 75,
} as const;

const amount = (value: number) => Math.max(0, Number.isFinite(value) ? value : 0);

export const calculateDeploymentEstimate = (inputs: DeploymentInputs) => {
  const lineItems = [
    { key: "platform", label: "Platform", amount: deploymentRates.platform },
    {
      key: "radios",
      label: `Connected radios (${inputs.radios})`,
      amount: amount(inputs.radios) * deploymentRates.radio,
    },
    {
      key: "teams",
      label: `Teams (${inputs.teams})`,
      amount: amount(inputs.teams) * deploymentRates.team,
    },
    {
      key: "channels",
      label: `Channels (${inputs.channels})`,
      amount: amount(inputs.channels) * deploymentRates.channel,
    },
    {
      key: "communications",
      label: `Communications (${Math.round(amount(inputs.communications)).toLocaleString()})`,
      amount: amount(inputs.communications) * deploymentRates.communication,
    },
    {
      key: "documents",
      label: `Documents (${Math.round(amount(inputs.documents)).toLocaleString()})`,
      amount: amount(inputs.documents) * deploymentRates.document,
    },
    {
      key: "workflows",
      label: `Workflows (${inputs.workflows})`,
      amount: amount(inputs.workflows) * deploymentRates.workflow,
    },
    {
      key: "languages",
      label: `Additional languages (${Math.max(0, Math.round(amount(inputs.languages)) - 1)})`,
      amount: Math.max(0, amount(inputs.languages) - 1) * deploymentRates.additionalLanguage,
    },
  ];

  return {
    lineItems: lineItems.map((item) => ({ ...item, amount: Math.round(item.amount) })),
    monthly: Math.round(lineItems.reduce((total, item) => total + item.amount, 0)),
  };
};

export const formatUsd = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
