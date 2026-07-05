export type ErrorCode =
  | "BAD_REQUEST"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "CONFLICT"
  | "RATE_LIMITED"
  | "INTERNAL_ERROR"
  | "SERVICE_UNAVAILABLE";

export class ApiError extends Error {
  constructor(
    public status: number,
    public code: ErrorCode,
    message: string,
    public details?: unknown,
  ) {
    super(message);
  }
}

export function badRequest(message: string, details?: unknown) {
  return new ApiError(400, "BAD_REQUEST", message, details);
}

export function unauthorized(message = "Authentication required") {
  return new ApiError(401, "UNAUTHORIZED", message);
}

export function forbidden(message = "Permission denied") {
  return new ApiError(403, "FORBIDDEN", message);
}

export function notFound(message = "Resource not found") {
  return new ApiError(404, "NOT_FOUND", message);
}

export function rateLimited(message = "Too many requests") {
  return new ApiError(429, "RATE_LIMITED", message);
}

export function serviceUnavailable(message: string, details?: unknown) {
  return new ApiError(503, "SERVICE_UNAVAILABLE", message, details);
}
