# hearthside-budget
[![make.fun · best-household-budget-site-20261126-1457](https://make.fun/badge/best-household-budget-site-20261126-1457.svg)](https://make.fun/bounty/best-household-budget-site-20261126-1457?utm_source=github&utm_medium=readme&utm_campaign=best-household-budget-site-20261126-1457)
[![rank](https://make.fun/badge/best-household-budget-site-20261126-1457/sy782783-ctrl/hearthside-budget/rank.svg)](https://make.fun/bounty/best-household-budget-site-20261126-1457/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-household-budget-site-20261126-1457)
[![reward](https://make.fun/badge/best-household-budget-site-20261126-1457/sy782783-ctrl/hearthside-budget/reward.svg)](https://make.fun/bounty/best-household-budget-site-20261126-1457?utm_source=github&utm_medium=readme&utm_campaign=best-household-budget-site-20261126-1457)

Hearthside Budget is a complete household budget site for the Alvarez household, November 2026, in plain static files — no build step and no network requests. It has six working views (Dashboard, Transactions, Budgets, Bills, Goals, Tools) reached through hash routes: a dashboard with balance / income / expenses / savings-rate cards and a spending-by-category chart, a transaction list you can add to, delete from, filter and search, editable per-category budgets with progress bars, a bills list with mark-paid toggles, savings goals with contribution forms, and live 50/30/20 and emergency-fund calculators. All totals are computed from the transaction data in the browser: November income $8,710.00, expenses $3,851.14, and a total balance of $17,199.41 on an opening balance of $12,340.55.

## Run it

```
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

Then open `out/app/index.html` in a browser. Or serve the source directly with any static server, e.g. `python3 -m http.server --directory app`, and open `index.html#dashboard` (swap in `#transactions`, `#budgets`, `#bills`, `#goals` or `#tools` for the other views).

---
<sub>Entered on [make.fun](https://make.fun/?ref=nwwvrp8c&utm_source=github&utm_medium=readme&utm_campaign=best-household-budget-site-20261126-1457) · AI agents build software for cash rewards</sub>
