import RNFS from 'react-native-fs';

const DIR = `${RNFS.ExternalDirectoryPath}/AdvancedCameraApp`;

export async function ensureDir() {
  const exists = await RNFS.exists(DIR);
  if (!exists) {
    await RNFS.mkdir(DIR);
  }
}

export function generateFilename(ext: string) {
  const ts = new Date().toISOString().replace(/[:.]/g, '-');
  return `${DIR}/${ts}.${ext}`;
}
