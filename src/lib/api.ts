export function apiResponse(data: any, message: string = "Success", status: number = 200) {
  return new Response(
    JSON.stringify({
      status: status >= 400 ? "error" : "success",
      message,
      data,
    }),
    {
      status,
      headers: { "Content-Type": "application/json" },
    }
  );
}

export function apiError(message: string, status: number = 400) {
  return new Response(
    JSON.stringify({
      status: "error",
      message,
      data: null,
    }),
    {
      status,
      headers: { "Content-Type": "application/json" },
    }
  );
}
