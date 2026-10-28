import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.pepcalc.reconstitution',
  appName: 'Peptide Calculator',
  webDir: 'dist',
  ios: {
    scheme: 'PeptideCalculator'
  }
};

export default config;
