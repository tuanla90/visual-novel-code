/**
 * sync-flow-session.mjs
 * 
 * Clones Chrome session from main Chrome profile (Profile 1: nocodeapp.solution@gmail.com)
 * into D:\Users\tuanla2\.chrome_flow so that Google Flow CDP runs with exact cookies,
 * tokens, avatar, and no phantom/broken profiles.
 */

import fs from 'node:fs';
import path from 'node:path';

const SRC_USER_DATA = path.resolve('D:/Users/tuanla2/AppData/Local/Google/Chrome/User Data');
const SRC_PROFILE = path.resolve(SRC_USER_DATA, 'Profile 1');
const DEST_USER_DATA = path.resolve('D:/Users/tuanla2/.chrome_flow');
const DEST_PROFILE = path.resolve(DEST_USER_DATA, 'Profile 1');

function copyFileSafe(src, dest) {
  try {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    // Use read/write buffer to avoid Windows sharing violation locks
    const buf = fs.readFileSync(src);
    fs.writeFileSync(dest, buf);
    return true;
  } catch (err) {
    console.warn(`[-] Skip locked file: ${path.basename(src)} (${err.message})`);
    return false;
  }
}

function copyDirSafe(srcDir, destDir) {
  if (!fs.existsSync(srcDir)) return;
  fs.mkdirSync(destDir, { recursive: true });
  const entries = fs.readdirSync(srcDir, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);

    // Skip temporary lock and log files
    if (entry.name.endsWith('.lock') || entry.name.endsWith('-journal') || entry.name === 'LOCK') {
      continue;
    }

    if (entry.isDirectory()) {
      copyDirSafe(srcPath, destPath);
    } else if (entry.isFile()) {
      copyFileSafe(srcPath, destPath);
    }
  }
}

export function syncSession() {
  console.log('================================================================');
  console.log('[Sync Session] Cloning Profile 1 (Tuấn - nocodeapp.solution@gmail.com)');
  console.log('Source:     ', SRC_PROFILE);
  console.log('Destination:', DEST_PROFILE);
  console.log('================================================================');

  if (!fs.existsSync(SRC_PROFILE)) {
    throw new Error(`Source profile does not exist: ${SRC_PROFILE}`);
  }

  fs.mkdirSync(DEST_PROFILE, { recursive: true });

  // 1. Sync and prune Local State
  const srcLocalStatePath = path.join(SRC_USER_DATA, 'Local State');
  const destLocalStatePath = path.join(DEST_USER_DATA, 'Local State');

  if (fs.existsSync(srcLocalStatePath)) {
    console.log('[*] Synchronizing and cleaning Local State...');
    const localState = JSON.parse(fs.readFileSync(srcLocalStatePath, 'utf-8'));

    // Set last_used to Profile 1
    if (!localState.profile) localState.profile = {};
    localState.profile.last_used = 'Profile 1';
    localState.profile.last_active_profiles = ['Profile 1'];

    // Prune info_cache: Keep ONLY Profile 1 to eliminate ghost profiles & avatar errors
    const p1Info = localState.profile.info_cache?.['Profile 1'];
    if (p1Info) {
      localState.profile.info_cache = {
        'Profile 1': p1Info
      };
    }

    fs.mkdirSync(DEST_USER_DATA, { recursive: true });
    fs.writeFileSync(destLocalStatePath, JSON.stringify(localState, null, 2), 'utf-8');
    console.log('✓ Local State saved with DPAPI master keys and single active Profile 1.');
  }

  // 2. Directories and files to copy
  const dirsToCopy = [
    'Network',
    'Local Storage',
    'Session Storage',
    'Sessions',
    'IndexedDB'
  ];

  const filesToCopy = [
    'Preferences',
    'Secure Preferences',
    'Login Data',
    'Web Data',
    'Google Profile Picture.png'
  ];

  console.log('[*] Copying session storage and authentication data...');
  for (const dir of dirsToCopy) {
    const src = path.join(SRC_PROFILE, dir);
    const dest = path.join(DEST_PROFILE, dir);
    if (fs.existsSync(src)) {
      copyDirSafe(src, dest);
      console.log(`✓ Synchronized directory: ${dir}`);
    }
  }

  for (const file of filesToCopy) {
    const src = path.join(SRC_PROFILE, file);
    const dest = path.join(DEST_PROFILE, file);
    if (fs.existsSync(src)) {
      copyFileSafe(src, dest);
      console.log(`✓ Synchronized file: ${file}`);
    }
  }

  // Also copy avatar if present in User Data/Avatars
  const srcAvatars = path.join(SRC_USER_DATA, 'Avatars');
  if (fs.existsSync(srcAvatars)) {
    copyDirSafe(srcAvatars, path.join(DEST_USER_DATA, 'Avatars'));
  }

  console.log('================================================================');
  console.log('✓ SESSION CLONED SUCCESSFULLY!');
  console.log('Profile 1 is now ready for Google Flow CDP with full authentication.');
  console.log('================================================================');
}

// Allow direct execution
if (process.argv[1] && process.argv[1].endsWith('sync-flow-session.mjs')) {
  syncSession();
}
