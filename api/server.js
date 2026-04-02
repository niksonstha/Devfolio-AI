import app from "../backend/src/app.js";
import connectDB from "../backend/src/config/db.js";

const buildQueryString = (query) => {
  const searchParams = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (key === "path" || typeof value === "undefined") {
      return;
    }

    if (Array.isArray(value)) {
      value.forEach((item) => searchParams.append(key, item));
      return;
    }

    searchParams.append(key, String(value));
  });

  const result = searchParams.toString();
  return result ? `?${result}` : "";
};

export default async function handler(req, res) {
  const pathSegments = Array.isArray(req.query.path)
    ? req.query.path.join("/")
    : req.query.path || "";
  const normalizedPath = pathSegments ? `/api/${pathSegments}` : "/api";
  req.url = `${normalizedPath}${buildQueryString(req.query)}`;
  await connectDB();
  return app(req, res);
}
