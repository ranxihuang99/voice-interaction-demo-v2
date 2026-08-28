"use strict";

const http = require("http");
const fs = require("fs");
const path = require("path");
const { URL } = require("url");

const HOST = process.env.HOST || "0.0.0.0";
const PORT = Number(process.env.PORT || 10000);
const ROOT = path.resolve(__dirname);

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml"
};

function resolvePublicPath(pathname) {
  const decoded = decodeURIComponent(pathname);
  const requested = decoded === "/" ? "/index.html" : decoded;
  const absolute = path.resolve(ROOT, `.${requested}`);

  if (absolute !== ROOT && !absolute.startsWith(`${ROOT}${path.sep}`)) {
    return null;
  }

  return absolute;
}

function sendFile(req, res, filePath) {
  fs.stat(filePath, (statError, stats) => {
    if (statError) {
      res.writeHead(statError.code === "ENOENT" ? 404 : 500, {
        "Content-Type": "text/plain; charset=utf-8"
      });
      res.end(statError.code === "ENOENT" ? "Not Found" : "Internal Server Error");
      return;
    }

    const resolvedFile = stats.isDirectory() ? path.join(filePath, "index.html") : filePath;
    fs.readFile(resolvedFile, (readError, content) => {
      if (readError) {
        res.writeHead(readError.code === "ENOENT" ? 404 : 500, {
          "Content-Type": "text/plain; charset=utf-8"
        });
        res.end(readError.code === "ENOENT" ? "Not Found" : "Internal Server Error");
        return;
      }

      const extension = path.extname(resolvedFile).toLowerCase();
      res.writeHead(200, {
        "Content-Type": MIME_TYPES[extension] || "application/octet-stream",
        "Content-Length": content.length,
        "Cache-Control": "public, max-age=300",
        "X-Content-Type-Options": "nosniff"
      });

      if (req.method === "HEAD") {
        res.end();
        return;
      }

      res.end(content);
    });
  });
}

const server = http.createServer((req, res) => {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.writeHead(405, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Method Not Allowed");
    return;
  }

  let pathname;
  try {
    pathname = new URL(req.url, `http://${req.headers.host || "localhost"}`).pathname;
  } catch {
    res.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Bad Request");
    return;
  }

  if (pathname === "/favicon.ico") {
    res.writeHead(204, { "Cache-Control": "public, max-age=86400" });
    res.end();
    return;
  }

  let filePath;
  try {
    filePath = resolvePublicPath(pathname);
  } catch {
    filePath = null;
  }

  if (!filePath) {
    res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Forbidden");
    return;
  }

  sendFile(req, res, filePath);
});

server.listen(PORT, HOST, () => {
  console.log(`Voice interaction demo running on http://${HOST}:${PORT}`);
});
