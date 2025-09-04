export function getAppVersion(): string {
  const envVersion = import.meta.env.VITE_APP_VERSION as string | undefined;
  if (envVersion && typeof envVersion === 'string') return envVersion;
  // Fallback static version. Increment when releasing a new app build.
  return '1.0.0';
}
