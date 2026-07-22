// Mobile nav toggle
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const isOpen = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
  }
});

// ---------- Loan payment calculator ----------
function formatUSD(n) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
}

function monthlyPayment(principal, annualRatePct, termMonths) {
  const r = (annualRatePct / 100) / 12;
  if (r === 0) return principal / termMonths;
  return principal * (r * Math.pow(1 + r, termMonths)) / (Math.pow(1 + r, termMonths) - 1);
}

function initLoanCalculator() {
  const priceEl = document.getElementById('lc-price');
  const downEl = document.getElementById('lc-down');
  const tradeEl = document.getElementById('lc-trade');
  const rateEl = document.getElementById('lc-rate');
  const termEl = document.getElementById('lc-term');

  if (!priceEl) return;

  const priceVal = document.getElementById('lc-price-val');
  const downVal = document.getElementById('lc-down-val');
  const tradeVal = document.getElementById('lc-trade-val');
  const rateVal = document.getElementById('lc-rate-val');
  const termVal = document.getElementById('lc-term-val');

  const outAmountFinanced = document.getElementById('lc-out-financed');
  const outMonthly = document.getElementById('lc-out-monthly');
  const outTotalInterest = document.getElementById('lc-out-interest');
  const outTotalPaid = document.getElementById('lc-out-total');

  function recalc() {
    const price = Number(priceEl.value);
    const down = Number(downEl.value);
    const trade = Number(tradeEl.value);
    const rate = Number(rateEl.value);
    const term = Number(termEl.value);

    priceVal.textContent = formatUSD(price);
    downVal.textContent = formatUSD(down);
    tradeVal.textContent = formatUSD(trade);
    rateVal.textContent = rate.toFixed(1) + '%';
    termVal.textContent = term + ' mo';

    const financed = Math.max(price - down - trade, 0);
    const payment = monthlyPayment(financed, rate, term);
    const totalPaid = payment * term;
    const totalInterest = totalPaid - financed;

    outAmountFinanced.textContent = formatUSD(financed);
    outMonthly.textContent = formatUSD(payment);
    outTotalInterest.textContent = formatUSD(Math.max(totalInterest, 0));
    outTotalPaid.textContent = formatUSD(totalPaid);
  }

  [priceEl, downEl, tradeEl, rateEl, termEl].forEach(el => el.addEventListener('input', recalc));
  recalc();
}

// ---------- Affordability calculator ----------
function initAffordabilityCalculator() {
  const incomeEl = document.getElementById('af-income');
  if (!incomeEl) return;

  const debtsEl = document.getElementById('af-debts');
  const downEl = document.getElementById('af-down');
  const rateEl = document.getElementById('af-rate');
  const termEl = document.getElementById('af-term');

  const incomeVal = document.getElementById('af-income-val');
  const debtsVal = document.getElementById('af-debts-val');
  const downVal = document.getElementById('af-down-val');
  const rateVal = document.getElementById('af-rate-val');
  const termVal = document.getElementById('af-term-val');

  const outBudget = document.getElementById('af-out-budget');
  const outPrice = document.getElementById('af-out-price');

  function recalc() {
    const income = Number(incomeEl.value);
    const debts = Number(debtsEl.value);
    const down = Number(downEl.value);
    const rate = Number(rateEl.value);
    const term = Number(termEl.value);

    incomeVal.textContent = formatUSD(income) + '/mo';
    debtsVal.textContent = formatUSD(debts) + '/mo';
    downVal.textContent = formatUSD(down);
    rateVal.textContent = rate.toFixed(1) + '%';
    termVal.textContent = term + ' mo';

    // Rule of thumb: keep total auto spend (incl. this payment) under 15% of gross
    // income, and total debt (incl. this payment) under 36% of gross income.
    const cap15 = income * 0.15;
    const cap36 = Math.max(income * 0.36 - debts, 0);
    const budget = Math.max(Math.min(cap15, cap36), 0);

    const r = (rate / 100) / 12;
    let maxLoan;
    if (r === 0) {
      maxLoan = budget * term;
    } else {
      maxLoan = budget * (Math.pow(1 + r, term) - 1) / (r * Math.pow(1 + r, term));
    }
    const maxPrice = maxLoan + down;

    outBudget.textContent = formatUSD(budget) + '/mo';
    outPrice.textContent = formatUSD(maxPrice);
  }

  [incomeEl, debtsEl, downEl, rateEl, termEl].forEach(el => el.addEventListener('input', recalc));
  recalc();
}

document.addEventListener('DOMContentLoaded', () => {
  initLoanCalculator();
  initAffordabilityCalculator();
});
