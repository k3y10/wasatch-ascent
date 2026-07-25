export type DemoUser = {
  username: string;
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

export const getDemoSession = async (signal?: AbortSignal): Promise<DemoUser | null> => {
  const response = await fetch(DEMO_AUTH_ENDPOINT, {
    method: "GET",
    credentials: "same-origin",
    headers: { Accept: "application/json" },
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

export const signInToDemos = async (username: string, password: string): Promise<DemoUser> => {
  const response = await fetch(DEMO_AUTH_ENDPOINT, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const payload = await readResponse(response);
  if (!response.ok || !payload.authenticated || !payload.user) {
    const message =
      response.status === 401
        ? "Access denied. Check your TerraSatch demo credentials."
        : payload.error || "Demo access is temporarily unavailable.";
    throw new DemoAuthError(message, response.status);
  }

  return payload.user;
};

export const signOutOfDemos = async (): Promise<void> => {
  const response = await fetch(DEMO_AUTH_ENDPOINT, {
    method: "DELETE",
    credentials: "same-origin",
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    const payload = await readResponse(response);
    throw new DemoAuthError(payload.error || "Unable to close the demo session.", response.status);
  }
};
