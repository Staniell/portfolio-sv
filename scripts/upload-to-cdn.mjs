#!/usr/bin/env node

/**
 * upload-to-cdn.mjs
 *
 * Uploads an image file to the catgirlsare.sexy CDN.
 *
 * Usage:
 *   node scripts/upload-to-cdn.mjs <path-to-image>
 *
 * Requires:
 *   - API_KEY in .env (or CDN_UPLOAD_API_KEY)
 *   - Node.js >= 18 (for native fetch & FormData)
 *
 * Output (JSON):
 *   { "url": "...", "thumb_url": "...", "deletion_url": "..." }
 */

import { readFile } from 'node:fs/promises';
import { basename, resolve } from 'node:path';

// ── Load .env manually (no dotenv dependency needed) ──────────────────────────
async function loadEnv() {
	try {
		const envPath = resolve(import.meta.dirname || process.cwd(), '..', '.env');
		const envContent = await readFile(envPath, 'utf-8');
		for (const line of envContent.split('\n')) {
			const trimmed = line.trim();
			if (!trimmed || trimmed.startsWith('#')) continue;
			const eqIndex = trimmed.indexOf('=');
			if (eqIndex === -1) continue;
			const key = trimmed.slice(0, eqIndex).trim();
			const value = trimmed.slice(eqIndex + 1).trim();
			if (!process.env[key]) {
				process.env[key] = value;
			}
		}
	} catch {
		// .env not found — rely on existing env vars
	}
}

// ── Mime-type helper ──────────────────────────────────────────────────────────
function getMimeType(filename) {
	const ext = filename.split('.').pop()?.toLowerCase();
	const mimeTypes = {
		png: 'image/png',
		jpg: 'image/jpeg',
		jpeg: 'image/jpeg',
		gif: 'image/gif',
		webp: 'image/webp',
		svg: 'image/svg+xml',
		bmp: 'image/bmp',
		ico: 'image/x-icon',
		avif: 'image/avif'
	};
	return mimeTypes[ext] || 'application/octet-stream';
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
	await loadEnv();

	const filePath = process.argv[2];
	if (!filePath) {
		console.error('Usage: node scripts/upload-to-cdn.mjs <path-to-image>');
		process.exit(1);
	}

	const apiKey = process.env.CDN_UPLOAD_API_KEY || process.env.API_KEY || '';
	if (!apiKey) {
		console.error('Error: No API key found. Set API_KEY or CDN_UPLOAD_API_KEY in .env');
		process.exit(1);
	}

	const uploadUrl = process.env.CDN_UPLOAD_URL || 'https://catgirlsare.sexy/api/upload';

	// Read the file
	const absolutePath = resolve(filePath);
	let fileBuffer;
	try {
		fileBuffer = await readFile(absolutePath);
	} catch (err) {
		console.error(`Error: Could not read file "${absolutePath}"`);
		console.error(err.message);
		process.exit(1);
	}

	const fileName = basename(absolutePath);
	const mimeType = getMimeType(fileName);

	// Build form data
	const formData = new FormData();
	formData.append('key', apiKey);
	formData.append('file', new Blob([fileBuffer], { type: mimeType }), fileName);

	// Upload
	console.error(`Uploading "${fileName}" to CDN...`);

	const response = await fetch(uploadUrl, {
		method: 'POST',
		body: formData
	});

	if (!response.ok) {
		const errorText = await response.text();
		console.error(`CDN upload failed (${response.status}): ${errorText}`);
		process.exit(1);
	}

	const result = await response.json();

	// Output the result as JSON to stdout
	console.log(JSON.stringify(result, null, 2));

	// Also print a human-readable summary to stderr
	console.error('\n✅ Upload successful!');
	console.error(`   URL:          ${result.url}`);
	console.error(`   Thumb URL:    ${result.thumb_url}`);
	console.error(`   Deletion URL: ${result.deletion_url}`);
}

main().catch((err) => {
	console.error('Unexpected error:', err);
	process.exit(1);
});
