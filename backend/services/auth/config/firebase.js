import { cert, initializeApp } from "firebase-admin";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const serviceAccountPath = path.join(__dirname, "../serviceAccountKey.json");

let credential;

if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  try {
    const serviceAccount = typeof process.env.FIREBASE_SERVICE_ACCOUNT === "string"
      ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
      : process.env.FIREBASE_SERVICE_ACCOUNT;
    credential = cert(serviceAccount);
  } catch (err) {
    console.error("Failed to parse FIREBASE_SERVICE_ACCOUNT env var:", err);
  }
}

if (!credential && fs.existsSync(serviceAccountPath)) {
  try {
    const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));
    credential = cert(serviceAccount);
  } catch (err) {
    console.error("Failed to read serviceAccountKey.json:", err);
  }
}

if (!credential) {
  console.warn("Warning: Firebase service account key not provided. Set FIREBASE_SERVICE_ACCOUNT env var or place serviceAccountKey.json in backend/services/auth.");
}

export const app = initializeApp(credential ? { credential } : {});