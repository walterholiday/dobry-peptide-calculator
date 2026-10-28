# App Store publishing checklist

## Status as of 2026-10-28

App Store Connect record: **PepCalc Reconstitution**, Apple ID 6828017839,
bundle id com.pepcalc.reconstitution, team ANYZDAU69M.

Done: build 1.0 (1) uploaded and attached, listing text, screenshots,
category Utilities, subtitle, pricing Free in 175 countries, availability,
content rights, age rating (4+), privacy answer "Data Not Collected",
privacy policy URL and support URL (hosted on GitHub Pages from `docs/`):

- https://walterholiday.github.io/dobry-peptide-calculator/privacy.html
- https://walterholiday.github.io/dobry-peptide-calculator/support.html

Remaining, account holder only: press **Publish** on the App Privacy page
(and confirm), then **Add for Review** on the version 1.0 page (and confirm).
Status in the sidebar changes from "Prepare for Submission" to
"Waiting for Review" once that is done.


Everything in the "Done in the repo" section is already in place. The rest
has to be done by the account holder in Xcode and App Store Connect.

## Done in the repo

- Bundle ID `com.pepcalc.reconstitution`, display name "Peptide Calculator",
  team `ANYZDAU69M`, automatic signing.
- `ITSAppUsesNonExemptEncryption = NO` in Info.plist, so uploads skip the
  export-compliance prompt (the app only uses system HTTPS).
- `PrivacyInfo.xcprivacy` declaring no tracking and no collected data.
- `UIRequiredDeviceCapabilities` set to `arm64`.
- Fonts bundled in the app; the app makes no network requests at runtime.
- Viewport locked (no zoom on input focus), safe-area insets respected,
  decimal keypad on the numeric inputs.
- Original app icon (1024x1024, no alpha) and launch splash.
- Unused RevenueCat package reference removed from the Xcode project.
- Version 1.0, build 1.

## Before archiving

1. `npm run build && npx cap sync ios` so `ios/App/App/public` matches `src/`.
2. Open `ios/App/App.xcodeproj`, select the `PeptideCalculator` scheme and
   "Any iOS Device (arm64)".
3. Signing & Capabilities: confirm the team is selected and Xcode has created
   the App Store provisioning profile (requires being signed in to the Apple
   Developer account in Xcode > Settings > Accounts).
4. Product > Archive, then Distribute App > App Store Connect > Upload.

## In App Store Connect

1. Create the app record with bundle ID `com.pepcalc.reconstitution`
   (register the identifier in the Developer portal first if Xcode has not
   already done so).
2. Fill in name, subtitle, description, keywords, support URL, and a
   **privacy policy URL** (required even though the app collects nothing).
3. App Privacy questionnaire: answer "No, we do not collect data".
4. Age rating: answer the medical/treatment questions honestly; expect a
   17+ rating because the app concerns substance dosing.
5. Screenshots: App Store Connect's current primary iPhone slot is "iPhone with
   Dynamic Island (medium display)" at 1206x2622, and iPad 13" at 2064x2752.
   Ready-made files are in `store-assets/screenshots/` (`iphone-63-*.png` for
   the iPhone slot, `ipad-13-*.png` for iPad). The 1320x2868 `iphone-69-*.png`
   originals are kept for the 6.9" slot in Media Manager if wanted.
6. Select the uploaded build, add review notes, submit.

## Review risk to be aware of

The app calculates doses for "research peptides" while stating they are not
for human consumption and labelling results in insulin-syringe units.
Apple reviewers may raise Guideline 1.4.1 (physical harm / medical
information) or 5.1.1. Mitigations already in place: the mandatory disclaimer
gate, the persistent in-app disclaimer banner, and the absence of any
product sales or vendor branding. If the review raises it, a clear
"educational calculator, no products sold, consult a professional" reply in
Resolution Center is the usual path. Keep the description free of health
claims and do not mention specific peptides or outcomes.

## After approval

- Tag the release in git (`v1.0.0`).
- For the next release bump `MARKETING_VERSION` and `CURRENT_PROJECT_VERSION`
  in the Xcode target before archiving.
