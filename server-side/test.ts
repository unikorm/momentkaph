// test.ts
import { createServer } from 'node:https';

// Simple assertion helper — like a lightweight expect()
function assert(condition: boolean, message: string) {
  if (!condition) throw new Error(`FAIL: ${message}`);
  console.log(`PASS: ${message}`);
}

// Test your business logic functions in isolation
function getStatusCode() { return 418; }

assert(getStatusCode() === 418, "should return teapot status");