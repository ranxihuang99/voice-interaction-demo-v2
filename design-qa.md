# Design QA — 场景切换标签

- Source visual truth: `/var/folders/w1/whdf8mtn7tv87wlqhrtjnpfnh7k1ns/T/codex-clipboard-a0a666ab-4d40-4aa6-abab-e7a0857b21c3.png`
- Source pixels: 1659 × 170 px
- Implementation: `index.html` and `excel-demo.html`
- Implementation screenshot: unavailable — the browser security policy blocks capture and inspection of local `file://` pages
- Viewport / CSS size / density normalization: unavailable for the same reason
- State: 场景 1 active on `index.html`; 场景 2 active on `excel-demo.html`

## Full-view comparison evidence

The source image was opened at original resolution. It shows a shared rounded segmented container, compact multi-level labels, subdued inactive states, and a pale-blue active segment with a blue status indicator. The implementation uses the same component structure and state treatment in both pages. A rendered implementation capture could not be obtained, so screenshot-level comparison is blocked.

## Focused region comparison evidence

The navigation region is the only requested scope. Source inspection covered its outer container, segment size hierarchy, typography levels, border radius, inactive/active contrast, shadow, and status indicator. Implementation evidence is limited to source code; no valid rendered crop is available.

## Required fidelity surfaces

- Fonts and typography: existing PingFang SC / Helvetica Neue stack preserved; label hierarchy implemented at 10 px and 12 px. Rendered weight and antialiasing are unverified.
- Spacing and layout rhythm: 5 px container padding, 2 px segment gap, 52 px segment height, 12 px segment radius, and 16 px container radius follow the reference proportions. Rendered alignment is unverified.
- Colors and visual tokens: inactive gray and reference-like pale-blue active state implemented. Final sampled appearance is unverified.
- Image quality and asset fidelity: no raster imagery or custom icon asset is required for this navigation component.
- Copy and content: existing “场景 1 / 课程心得写作” and “场景 2 / 表格语音处理” meaning and links are preserved.

## Findings

- No code-level P0/P1/P2 issue found. HTML nesting, JavaScript syntax, link targets, active state, and `aria-current` were validated on both pages.
- Visual fidelity remains unverified because the rendered local page could not be captured.

## Comparison history

- Pass 1: source image opened; implementation capture blocked by browser URL policy. No visual fixes could be judged from a same-state comparison.

## Implementation checklist

- [x] Apply one shared segmented-navigation style to both scene pages.
- [x] Preserve both links and give each page one active item.
- [x] Add keyboard focus treatment and `aria-current`.
- [ ] Capture both rendered states and compare them with the reference at the same viewport.

final result: blocked
