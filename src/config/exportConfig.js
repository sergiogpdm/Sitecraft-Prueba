export function toConfigFileString(configObj) {
  // Export “bonito” y fácil de pegar en site.config.js
  const json = JSON.stringify(configObj, null, 2);
  return `export const siteConfig = ${json};\n`;
}
