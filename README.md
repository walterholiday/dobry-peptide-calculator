# Peptide Calculator (iOS)

A peptide reconstitution calculator packaged as a native iOS app with
[Capacitor](https://capacitorjs.com). The UI is a single React component
(`src/App.jsx`) built with Vite; the native shell lives in `ios/App`.

Given the peptide mass in a vial, the desired dose, and the volume of
bacteriostatic water, it reports concentration, draw volume, insulin-syringe
units, and doses per vial, with a syringe illustration. A disclaimer gate is
shown on every launch.

## Requirements

- Node 20+ and npm
- Xcode 16+ with the iOS platform installed

## Development

```bash
npm install
npm run dev          # web preview at http://localhost:5173
```

## Building the iOS app

```bash
npm run build        # web bundle -> dist/
npx cap sync ios     # copies dist/ into ios/App/App/public and updates native deps
npx cap open ios     # opens the Xcode project
```

In Xcode select the `PeptideCalculator` scheme and a device or simulator, then
Run. For App Store builds use Product > Archive. See [PUBLISHING.md](PUBLISHING.md)
for the release checklist.

## Project layout

| Path | What it is |
| --- | --- |
| `src/App.jsx` | The whole calculator UI and math |
| `src/main.jsx` | React entry point; imports the bundled fonts |
| `index.html` | Vite HTML shell (viewport and base styles) |
| `capacitor.config.ts` | App id, display name, web dir, iOS scheme |
| `ios/App/App/Info.plist` | iOS app metadata |
| `ios/App/App/PrivacyInfo.xcprivacy` | App privacy manifest (no tracking, no data collection) |
| `ios/App/App/Assets.xcassets` | App icon and launch splash |
| `server.js` | Optional Express static server for hosting the web build |

## Versioning

The App Store version and build number are `MARKETING_VERSION` and
`CURRENT_PROJECT_VERSION` in the Xcode target (General tab). Bump the build
number on every upload to App Store Connect.
