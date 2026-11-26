'use strict';
/* Hearthside Budget — all state lives here; every total on the page is
   computed from the transaction list below, never hardcoded. */

const OPENING_BALANCE = 12340.55;

const EXPENSE_CATEGORIES = [
  'Housing', 'Groceries', 'Utilities', 'Transport', 'Dining', 'Insurance',
  'Healthcare', 'Shopping', 'Entertainment', 'Home', 'Personal Care',
  'Pets', 'Subscriptions'
];

/* November 2026 seed data: 3 income deposits ($8,710.00) and 31 expenses
   ($3,851.14). Opening balance $12,340.55 -> balance $17,199.41. */
let transactions = [
  { id: 1,  date: '2026-11-01', desc: 'Rent — Maple Street apartment',        category: 'Housing',       type: 'expense', amount: 1850.00 },
  { id: 2,  date: '2026-11-02', desc: 'Market Basket — weekly shop',          category: 'Groceries',     type: 'expense', amount: 156.42 },
  { id: 3,  date: '2026-11-02', desc: 'Spotify Duo',                          category: 'Subscriptions', type: 'expense', amount: 16.99 },
  { id: 4,  date: '2026-11-03', desc: 'MBTA monthly pass',                    category: 'Transport',     type: 'expense', amount: 90.00 },
  { id: 5,  date: '2026-11-04', desc: 'Electric — National Grid',             category: 'Utilities',     type: 'expense', amount: 132.48 },
  { id: 6,  date: '2026-11-06', desc: 'Paycheck — Dana Alvarez (hospital)',   category: 'Income',        type: 'income',  amount: 4120.00 },
  { id: 7,  date: '2026-11-06', desc: 'Pet food — Chewy order',               category: 'Pets',          type: 'expense', amount: 48.00 },
  { id: 8,  date: '2026-11-07', desc: 'Dinner — Dumpling House',              category: 'Dining',        type: 'expense', amount: 58.90 },
  { id: 9,  date: '2026-11-08', desc: 'Auto insurance — GEICO',               category: 'Insurance',     type: 'expense', amount: 96.50 },
  { id: 10, date: '2026-11-08', desc: 'Renters insurance — Lemonade',         category: 'Insurance',     type: 'expense', amount: 32.50 },
  { id: 11, date: '2026-11-09', desc: 'Costco — bulk pantry run',             category: 'Groceries',     type: 'expense', amount: 187.65 },
  { id: 12, date: '2026-11-09', desc: 'Home Depot — bulbs & tools',           category: 'Home',          type: 'expense', amount: 58.00 },
  { id: 13, date: '2026-11-10', desc: 'Gas — Shell station',                  category: 'Transport',     type: 'expense', amount: 52.36 },
  { id: 14, date: '2026-11-11', desc: 'Internet — Xfinity',                   category: 'Utilities',     type: 'expense', amount: 79.99 },
  { id: 15, date: '2026-11-12', desc: 'Peacock streaming',                    category: 'Subscriptions', type: 'expense', amount: 7.99 },
  { id: 16, date: '2026-11-13', desc: "Trader Joe's — groceries",             category: 'Groceries',     type: 'expense', amount: 143.28 },
  { id: 17, date: '2026-11-13', desc: 'Target — household goods',             category: 'Shopping',      type: 'expense', amount: 41.36 },
  { id: 18, date: '2026-11-14', desc: 'Brunch — Flour Bakery',                category: 'Dining',        type: 'expense', amount: 41.60 },
  { id: 19, date: '2026-11-14', desc: 'Pharmacy — CVS',                       category: 'Healthcare',    type: 'expense', amount: 34.27 },
  { id: 20, date: '2026-11-15', desc: 'Side income — freelance design invoice', category: 'Income',      type: 'income',  amount: 810.00 },
  { id: 21, date: '2026-11-15', desc: 'Gas heat — Eversource',                category: 'Utilities',     type: 'expense', amount: 108.53 },
  { id: 22, date: '2026-11-15', desc: 'Movie night — AMC',                    category: 'Entertainment', type: 'expense', amount: 38.00 },
  { id: 23, date: '2026-11-16', desc: 'Haircut — neighborhood barber',        category: 'Personal Care', type: 'expense', amount: 38.00 },
  { id: 24, date: '2026-11-18', desc: 'Market Basket — weekly shop',          category: 'Groceries',     type: 'expense', amount: 164.90 },
  { id: 25, date: '2026-11-19', desc: 'Water & sewer — city bill',            category: 'Utilities',     type: 'expense', amount: 70.00 },
  { id: 26, date: '2026-11-19', desc: 'iCloud+ storage',                      category: 'Subscriptions', type: 'expense', amount: 2.99 },
  { id: 27, date: '2026-11-20', desc: 'Paycheck — Marco Alvarez (school district)', category: 'Income',  type: 'income',  amount: 3780.00 },
  { id: 28, date: '2026-11-20', desc: 'Toiletries — CVS',                     category: 'Personal Care', type: 'expense', amount: 14.00 },
  { id: 29, date: '2026-11-21', desc: 'Gas & car wash — Costco',              category: 'Transport',     type: 'expense', amount: 40.64 },
  { id: 30, date: '2026-11-21', desc: 'Dental copay — Bright Smiles',         category: 'Healthcare',    type: 'expense', amount: 45.73 },
  { id: 31, date: '2026-11-22', desc: 'Pizza night — Regina Pizzeria',        category: 'Dining',        type: 'expense', amount: 28.50 },
  { id: 32, date: '2026-11-22', desc: 'Porter Square Books',                  category: 'Shopping',      type: 'expense', amount: 23.64 },
  { id: 33, date: '2026-11-23', desc: "Trader Joe's — Thanksgiving extras",   category: 'Groceries',     type: 'expense', amount: 124.92 },
  { id: 34, date: '2026-11-24', desc: 'Museum of Science tickets',            category: 'Entertainment', type: 'expense', amount: 23.00 }
];
let nextTxnId = 35;

let budgets = {
  'Housing': 1900, 'Groceries': 850, 'Utilities': 420, 'Transport': 220,
  'Dining': 200, 'Insurance': 140, 'Healthcare': 120, 'Shopping': 120,
  'Entertainment': 100, 'Home': 90, 'Personal Care': 75, 'Pets': 60,
  'Subscriptions': 35
};

let bills = [
  { id: 1,  name: 'Rent — Maple Street apartment', due: '2026-12-01', amount: 1850.00, paid: false },
  { id: 2,  name: 'Internet — Xfinity',            due: '2026-11-28', amount: 79.99,   paid: false },
  { id: 3,  name: 'Electric — National Grid',      due: '2026-11-29', amount: 118.40,  paid: false },
  { id: 4,  name: 'Spotify Duo',                   due: '2026-12-02', amount: 16.99,   paid: false },
  { id: 5,  name: 'Auto insurance — GEICO',        due: '2026-12-08', amount: 96.50,   paid: false },
  { id: 6,  name: 'Water & sewer — city',          due: '2026-12-12', amount: 70.00,   paid: false },
  { id: 7,  name: 'Gas heat — Eversource',         due: '2026-12-15', amount: 108.53,  paid: false },
  { id: 8,  name: 'Renters insurance — Lemonade',  due: '2026-11-08', amount: 32.50,   paid: true },
  { id: 9,  name: 'Gym — Rock Spot Climbing',      due: '2026-11-10', amount: 45.00,   paid: true },
  { id: 10, name: 'Credit card payment',           due: '2026-11-18', amount: 412.36,  paid: true }
];

let goals = [
  { id: 1, name: 'Emergency fund',  saved: 12400, target: 30840, note: 'Six months of essential expenses, at $5,140 a month.' },
  { id: 2, name: 'Coast trip',      saved: 2175,  target: 3600,  note: 'A week on the New England coast, summer 2027.' },
  { id: 3, name: 'Washer & dryer',  saved: 950,   target: 1800,  note: 'Replacing the aging laundry pair before it gives up.' }
];

/* ---------- helpers ---------- */
const $ = (id) => document.getElementById(id);
const money = (n) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
const cents = (n) => Math.round(n * 100);

function totals() {
  let income = 0, expenses = 0;
  for (const t of transactions) {
    if (t.type === 'income') income += cents(t.amount); else expenses += cents(t.amount);
  }
  income /= 100; expenses /= 100;
  return {
    income, expenses,
    balance: OPENING_BALANCE + income - expenses,
    rate: income > 0 ? ((income - expenses) / income) * 100 : 0
  };
}

function spentByCategory() {
  const map = {};
  for (const t of transactions) {
    if (t.type === 'expense') map[t.category] = (map[t.category] || 0) + t.amount;
  }
  return map;
}

function prettyDate(iso) {
  const d = new Date(iso + 'T12:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
function prettyDateFull(iso) {
  const d = new Date(iso + 'T12:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

/* ---------- dashboard ---------- */
function renderDashboard() {
  const t = totals();
  $('stat-balance').textContent = money(t.balance);
  $('stat-balance-sub').textContent = 'Opening balance Nov 1: ' + money(OPENING_BALANCE);
  $('stat-income').textContent = money(t.income);
  const incCount = transactions.filter((x) => x.type === 'income').length;
  $('stat-income-sub').textContent = incCount + ' deposits this month';
  $('stat-expenses').textContent = money(t.expenses);
  const expCount = transactions.filter((x) => x.type === 'expense').length;
  $('stat-expenses-sub').textContent = expCount + ' purchases this month';
  $('stat-rate').textContent = t.rate.toFixed(1) + '%';
  $('stat-rate-sub').textContent = money(t.income - t.expenses) + ' kept of ' + money(t.income);

  const spent = spentByCategory();
  const entries = Object.entries(spent).sort((a, b) => b[1] - a[1]);
  const max = entries.length ? entries[0][1] : 1;
  $('category-chart').innerHTML = entries.map(([cat, amt]) => `
    <div class="bar-row">
      <span class="bar-label">${esc(cat)}</span>
      <div class="bar-track"><div class="bar-fill cat" style="width:${Math.max(2, (amt / max) * 100).toFixed(1)}%"></div></div>
      <span class="bar-amt">${money(amt)}</span>
    </div>`).join('');

  const recent = [...transactions].sort((a, b) => b.date.localeCompare(a.date) || b.id - a.id).slice(0, 6);
  $('recent-list').innerHTML = recent.map((x) => `
    <li>
      <span class="mini-main"><strong>${esc(x.desc)}</strong><small>${prettyDate(x.date)} · ${esc(x.category)}</small></span>
      <span class="mini-amt ${x.type}">${x.type === 'income' ? '+' : '−'}${money(x.amount)}</span>
    </li>`).join('');

  const upcoming = bills.filter((b) => !b.paid).sort((a, b) => a.due.localeCompare(b.due)).slice(0, 4);
  $('upcoming-list').innerHTML = upcoming.length ? upcoming.map((b) => `
    <li>
      <span class="mini-main"><strong>${esc(b.name)}</strong><small>Due ${prettyDateFull(b.due)}</small></span>
      <span class="mini-amt expense">${money(b.amount)}</span>
    </li>`).join('') : '<li><span class="mini-main"><strong>All caught up</strong><small>No unpaid bills</small></span></li>';
}

/* ---------- transactions ---------- */
function renderTransactions() {
  const filterCat = $('txn-filter-category').value;
  const q = $('txn-search').value.trim().toLowerCase();
  const rows = [...transactions]
    .sort((a, b) => b.date.localeCompare(a.date) || b.id - a.id)
    .filter((t) => (filterCat === 'all' || t.category === filterCat) &&
                   (q === '' || t.desc.toLowerCase().includes(q) || t.category.toLowerCase().includes(q)));
  $('txn-body').innerHTML = rows.map((t) => `
    <tr>
      <td>${prettyDate(t.date)}</td>
      <td>${esc(t.desc)}</td>
      <td><span class="chip">${esc(t.category)}</span></td>
      <td class="num ${t.type}">${t.type === 'income' ? '+' : '−'}${money(t.amount)}</td>
      <td><button type="button" class="btn small danger" data-delete="${t.id}">Delete</button></td>
    </tr>`).join('');
  $('txn-empty').hidden = rows.length > 0;
  $('txn-count').textContent = 'Showing ' + rows.length + ' of ' + transactions.length + ' transactions';
  const t = totals();
  $('txn-summary').textContent = 'November: ' + money(t.income) + ' in · ' + money(t.expenses) + ' out · balance ' + money(t.balance) + '.';
}

/* ---------- budgets ---------- */
function renderBudgets() {
  const spent = spentByCategory();
  let totalBudget = 0, totalSpent = 0;
  $('budget-list').innerHTML = EXPENSE_CATEGORIES.map((cat) => {
    const budget = budgets[cat] || 0;
    const s = spent[cat] || 0;
    totalBudget += budget; totalSpent += s;
    const pct = budget > 0 ? (s / budget) * 100 : 0;
    const state = pct > 100 ? 'over' : pct >= 80 ? 'warn' : 'ok';
    const note = pct > 100 ? money(s - budget) + ' over budget'
      : pct >= 80 ? 'Heads up — ' + pct.toFixed(0) + '% used'
      : money(budget - s) + ' left';
    return `
    <article class="panel budget-card">
      <div class="budget-head">
        <h3>${esc(cat)}</h3>
        <label class="budget-edit">Budget $
          <input type="number" min="0" step="1" value="${budget}" data-budget="${esc(cat)}" aria-label="Budget for ${esc(cat)}">
        </label>
      </div>
      <div class="bar-track big"><div class="bar-fill ${state}" style="width:${Math.min(100, pct).toFixed(1)}%"></div></div>
      <p class="budget-nums"><strong>${money(s)}</strong> spent of ${money(budget)} · ${pct.toFixed(0)}% · <span class="state-${state}">${note}</span></p>
    </article>`;
  }).join('');
  $('budget-summary').textContent = money(totalSpent) + ' spent against ' + money(totalBudget) + ' budgeted across ' + EXPENSE_CATEGORIES.length + ' categories.';
  document.querySelectorAll('[data-budget]').forEach((input) => {
    input.addEventListener('change', () => {
      const v = parseFloat(input.value);
      budgets[input.dataset.budget] = isNaN(v) || v < 0 ? 0 : v;
      renderBudgets(); renderDashboard();
    });
  });
}

/* ---------- bills ---------- */
function renderBills() {
  const sorted = [...bills].sort((a, b) => a.due.localeCompare(b.due));
  $('bill-list').innerHTML = sorted.map((b) => `
    <article class="panel bill-card ${b.paid ? 'paid' : ''}">
      <div class="bill-main">
        <h3>${esc(b.name)}</h3>
        <p>Due ${prettyDateFull(b.due)} · ${money(b.amount)}</p>
      </div>
      <span class="bill-status ${b.paid ? 'is-paid' : 'is-due'}">${b.paid ? 'Paid' : 'Unpaid'}</span>
      <button type="button" class="btn ${b.paid ? '' : 'primary'}" data-bill="${b.id}">${b.paid ? 'Mark unpaid' : 'Mark paid'}</button>
    </article>`).join('');
  const paid = bills.filter((b) => b.paid);
  const due = bills.filter((b) => !b.paid);
  const paidSum = paid.reduce((s, b) => s + b.amount, 0);
  const dueSum = due.reduce((s, b) => s + b.amount, 0);
  $('bill-paid-total').textContent = money(paidSum);
  $('bill-paid-count').textContent = paid.length + ' of ' + bills.length + ' bills paid';
  $('bill-due-total').textContent = money(dueSum);
  $('bill-due-count').textContent = due.length + ' still to pay';
  $('bill-summary').textContent = money(dueSum) + ' still to pay across ' + due.length + ' bills · ' + money(paidSum) + ' already paid.';
  document.querySelectorAll('[data-bill]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const bill = bills.find((b) => b.id === Number(btn.dataset.bill));
      if (bill) bill.paid = !bill.paid;
      renderBills(); renderDashboard();
    });
  });
}

/* ---------- goals ---------- */
function renderGoals() {
  $('goal-list').innerHTML = goals.map((g) => {
    const pct = g.target > 0 ? (g.saved / g.target) * 100 : 0;
    return `
    <article class="panel goal-card">
      <h3>${esc(g.name)}</h3>
      <p class="goal-note">${esc(g.note)}</p>
      <div class="bar-track big"><div class="bar-fill save" style="width:${Math.min(100, pct).toFixed(1)}%"></div></div>
      <p class="goal-nums"><strong>${money(g.saved)}</strong> of ${money(g.target)} · ${pct.toFixed(1)}% · ${money(Math.max(0, g.target - g.saved))} to go</p>
      <form class="goal-form" data-goal="${g.id}">
        <label>Add contribution ($)
          <input type="number" min="0.01" step="0.01" placeholder="50.00" required>
        </label>
        <button type="submit" class="btn primary">Add</button>
      </form>
    </article>`;
  }).join('');
  const saved = goals.reduce((s, g) => s + g.saved, 0);
  const target = goals.reduce((s, g) => s + g.target, 0);
  $('goal-summary').textContent = money(saved) + ' saved toward ' + money(target) + ' across ' + goals.length + ' goals.';
  document.querySelectorAll('.goal-form').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input');
      const v = parseFloat(input.value);
      const goal = goals.find((g) => g.id === Number(form.dataset.goal));
      if (goal && !isNaN(v) && v > 0) goal.saved = Math.round((goal.saved + v) * 100) / 100;
      renderGoals();
    });
  });
}

/* ---------- tools ---------- */
function renderTools() {
  const income = parseFloat($('tool-503020-income').value) || 0;
  const needs = income * 0.5, wants = income * 0.3, save = income * 0.2;
  $('amt-needs').textContent = money(needs);
  $('amt-wants').textContent = money(wants);
  $('amt-save').textContent = money(save);
  $('bar-needs').style.width = income > 0 ? '50%' : '0%';
  $('bar-wants').style.width = income > 0 ? '30%' : '0%';
  $('bar-save').style.width = income > 0 ? '20%' : '0%';
  const t = totals();
  $('tool-503020-note').textContent = income > 0
    ? 'For reference, this household actually saved ' + t.rate.toFixed(1) + '% of November income (' + money(t.income - t.expenses) + ') — ahead of the 20% guideline.'
    : 'Enter an income to see the split.';

  const exp = parseFloat($('tool-ef-expenses').value) || 0;
  const months = parseFloat($('tool-ef-months').value) || 0;
  const saved = parseFloat($('tool-ef-saved').value) || 0;
  const monthly = parseFloat($('tool-ef-monthly').value) || 0;
  const target = exp * months;
  const remaining = Math.max(0, target - saved);
  const pct = target > 0 ? Math.min(100, (saved / target) * 100) : 0;
  $('bar-ef').style.width = pct.toFixed(1) + '%';
  let msg = 'Target fund: ' + money(target) + ' (' + months + ' months × ' + money(exp) + '). Saved so far: ' + money(saved) + ' (' + pct.toFixed(1) + '%). ';
  if (remaining <= 0) msg += 'Fully funded — nicely done.';
  else if (monthly > 0) msg += money(remaining) + ' to go — about ' + Math.ceil(remaining / monthly) + ' months at ' + money(monthly) + ' a month.';
  else msg += money(remaining) + ' to go. Add a monthly contribution to see a finish date.';
  $('tool-ef-result').textContent = msg;
}

/* ---------- render all ---------- */
function renderAll() {
  renderDashboard(); renderTransactions(); renderBudgets(); renderBills(); renderGoals(); renderTools();
}

/* ---------- routing ---------- */
const VIEWS = ['dashboard', 'transactions', 'budgets', 'bills', 'goals', 'tools'];
function currentView() {
  const h = location.hash.replace('#', '').toLowerCase();
  return VIEWS.includes(h) ? h : 'dashboard';
}
function showView() {
  const v = currentView();
  for (const name of VIEWS) $('view-' + name).hidden = name !== v;
  document.querySelectorAll('[data-nav]').forEach((a) => {
    a.classList.toggle('active', a.dataset.nav === v);
  });
  window.scrollTo(0, 0);
}
window.addEventListener('hashchange', showView);

/* ---------- wiring ---------- */
function init() {
  const catSelect = $('txn-category');
  const allCats = [...EXPENSE_CATEGORIES, 'Income'];
  catSelect.innerHTML = allCats.map((c) => `<option value="${esc(c)}">${esc(c)}</option>`).join('');
  const filterSelect = $('txn-filter-category');
  filterSelect.innerHTML = '<option value="all">All categories</option>' +
    allCats.map((c) => `<option value="${esc(c)}">${esc(c)}</option>`).join('');

  $('txn-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const amount = parseFloat($('txn-amount').value);
    const desc = $('txn-desc').value.trim();
    const date = $('txn-date').value;
    if (!desc || !date || isNaN(amount) || amount <= 0) return;
    transactions.push({
      id: nextTxnId++,
      date,
      desc,
      category: $('txn-category').value,
      type: $('txn-type').value,
      amount: Math.round(amount * 100) / 100
    });
    $('txn-desc').value = '';
    $('txn-amount').value = '';
    renderDashboard(); renderTransactions(); renderBudgets();
  });

  $('txn-body').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-delete]');
    if (!btn) return;
    transactions = transactions.filter((t) => t.id !== Number(btn.dataset.delete));
    renderDashboard(); renderTransactions(); renderBudgets();
  });

  filterSelect.addEventListener('change', renderTransactions);
  $('txn-search').addEventListener('input', renderTransactions);

  ['tool-503020-income', 'tool-ef-expenses', 'tool-ef-months', 'tool-ef-saved', 'tool-ef-monthly']
    .forEach((id) => $(id).addEventListener('input', renderTools));

  renderAll();
  showView();
}

document.addEventListener('DOMContentLoaded', init);
