#!/usr/bin/env node
/**
 * Initialize Admin User
 *
 * This script creates an admin user in the database using credentials from .env
 * Usage: npx ts-node scripts/init-admin.ts
 *
 * Requirements:
 * - ADMIN_EMAIL in .env
 * - ADMIN_PIN in .env
 * - TURSO_DATABASE_URL in .env
 * - TURSO_AUTH_TOKEN in .env
 */

import { hashPin } from "../lib/auth";
import { readUsers, writeUsers, normalizeUserRecord } from "../lib/users";

async function initializeAdmin() {
  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const adminPin = process.env.ADMIN_PIN?.trim();
  const adminName = process.env.ADMIN_NAME?.trim() || "Admin";

  // Validate environment variables
  if (!adminEmail || !adminPin) {
    console.error("❌ Error: ADMIN_EMAIL and ADMIN_PIN must be set in .env");
    process.exit(1);
  }

  if (!/^\d{4,6}$/.test(adminPin)) {
    console.error("❌ Error: ADMIN_PIN must be 4-6 digits");
    process.exit(1);
  }

  try {
    console.log("📚 Reading users...");
    const users = await readUsers();

    // Check if admin already exists
    const existingAdmin = users.find((u) => u.email === adminEmail);
    if (existingAdmin) {
      console.log(`✅ Admin user already exists: ${adminEmail}`);
      process.exit(0);
    }

    // Hash the PIN
    console.log("🔐 Hashing PIN...");
    const { salt, hash } = await hashPin(adminPin);

    // Create admin user
    const adminUser = normalizeUserRecord({
      email: adminEmail,
      name: adminName,
      role: "admin",
      is_admin: true,
      pin_hash: hash,
      pin_salt: salt,
    });

    users.push(adminUser);

    // Save to database
    console.log("💾 Saving admin user to database...");
    await writeUsers(users);

    console.log("✅ Admin user created successfully!");
    console.log(`   Email: ${adminEmail}`);
    console.log(`   Name: ${adminName}`);
    console.log(`   PIN: ${adminPin}`);
    console.log("\n🔗 Sign in at: /signin");
  } catch (error) {
    console.error("❌ Error initializing admin:", error);
    process.exit(1);
  }
}

initializeAdmin();
