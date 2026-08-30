export type DemoUser = {
  access: "public-demo";
};

export type DemoInterest =
  | "radio"
  | "avalanche"
  | "wildfire"
  | "mapping"
  | "edge"
  | "integration"
  | "pilot"
  | "strategic"
  | "other";

export type DemoAccessRequest = {
  name: string;
  email: string;
  organization: string;
  interest: DemoInterest;
  notes: string;
  acknowledged: boolean;
  website?: string;
};

type DemoAuthResponse = {
  authenticated: boolean;
  user?: DemoUser;
  error?: string;
};

const DEMO_AUTH_ENDPOINT = "/api/demo-auth";

export class DemoAuthError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "DemoAuthError";
    this.status = status;
  }
}

const readResponse = async (response: Response): Promise<DemoAuthResponse> => {
  try {
    return (await response.json()) as DemoAuthResponse;
  } catch {
    return { authenticated: false };
  }
};

const noCacheHeaders = {
  Accept: "application/json",
  "Cache-Control": "no-cache, no-store, max-age=0",
  Pragma: "no-cache",
};

export const getDemoSession = async (signal?: AbortSignal): Promise<DemoUser | null> => {
  const response = await fetch(DEMO_AUTH_ENDPOINT, {
    method: "GET",
    credentials: "same-origin",
    cache: "no-store",
    headers: noCacheHeaders,
    signal,
  });

  if (response.status === 401) {
    return null;
  }

  const payload = await readResponse(response);
  if (!response.ok) {
    throw new DemoAuthError(payload.error || "Demo access is temporarily unavailable.", response.status);
  }

  return payload.authenticated && payload.user ? payload.user : null;
};

export const requestDemoAccess = async (request: DemoAccessRequest): Promise<DemoUser> => {
  const response = await fetch(DEMO_AUTH_ENDPOINT, {
    method: "POST",
    credentials: "same-origin",
    cache: "no-store",
    headers: {
      ...noCacheHeaders,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  const payload = await readResponse(response);
  if (!response.ok || !payload.authenticated || !payload.user) {
    throw new DemoAuthError(
      payload.error || "Your demo access request could not be completed.",
      response.status,
    );
  }

  return payload.user;
};

export const signOutOfDemos = async (): Promise<void> => {
  const response = await fetch(DEMO_AUTH_ENDPOINT, {
    method: "DELETE",
    credentials: "same-origin",
    cache: "no-store",
    headers: noCacheHeaders,
  });

  if (!response.ok) {
    const payload = await readResponse(response);
    throw new DemoAuthError(payload.error || "Unable to close the demo session.", response.status);
  }

  const remainingSession = await getDemoSession();
  if (remainingSession) {
    throw new DemoAuthError("The demo session could not be cleared. Refresh the page and try again.", 409);
  }
};
