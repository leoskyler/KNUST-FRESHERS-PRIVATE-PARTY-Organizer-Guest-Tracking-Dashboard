// State Variables initialized to your requested exact numbers
let singleTickets = 43;
let doubleTickets = 21;
let groupTickets = 17;

const maxCapacity = 180;

// Update UI and Statistics
function updateDashboard() {
  // Headcounts per tier: Single = 1, Double = 2, Group = 4
  const singleHeadcount = singleTickets * 1;
  const doubleHeadcount = doubleTickets * 2;
  const groupHeadcount = groupTickets * 4;

  const totalGuests = singleHeadcount + doubleHeadcount + groupHeadcount;
  const totalPurchases = singleTickets + doubleTickets + groupTickets;

  // Prices: Single = GHS 120, Double = GHS 210, Group = GHS 320
  const totalRevenue = (singleTickets * 120) + (doubleTickets * 210) + (groupTickets * 320);

  // Update DOM Elements
  document.getElementById('total-guests').textContent = totalGuests;
  document.getElementById('total-revenue').textContent = totalRevenue.toLocaleString();
  document.getElementById('total-purchases').textContent = totalPurchases;

  document.getElementById('single-count').textContent = singleTickets;
  document.getElementById('double-count').textContent = doubleTickets;
  document.getElementById('group-count').textContent = groupTickets;

  // Update Capacity Bar
  document.getElementById('cap-current').textContent = totalGuests;
  document.getElementById('cap-max').textContent = maxCapacity;

  let percent = Math.min(Math.round((totalGuests / maxCapacity) * 100), 100);
  document.getElementById('capacity-fill').style.width = `${percent}%`;
}

// Adjust Ticket Quantities
function adjustTier(tier, amount) {
  if (tier === 'single') singleTickets = Math.max(0, singleTickets + amount);
  if (tier === 'double') doubleTickets = Math.max(0, doubleTickets + amount);
  if (tier === 'group') groupTickets = Math.max(0, groupTickets + amount);

  updateDashboard();
}

// Reset Stats to Zero
function resetStats() {
  if (confirm("Are you sure you want to reset all tracking counts?")) {
    singleTickets = 0;
    doubleTickets = 0;
    groupTickets = 0;
    updateDashboard();
  }
}

// Export Summary as CSV File
function exportData() {
  const totalGuests = (singleTickets * 1) + (doubleTickets * 2) + (groupTickets * 4);
  const totalRevenue = (singleTickets * 120) + (doubleTickets * 210) + (groupTickets * 320);

  const csvContent = "data:text/csv;charset=utf-8," 
    + "KNUST FRESHERS PRIVATE PARTY - EVENT REPORT\n"
    + `Total Guests At Venue,${totalGuests}\n`
    + `Total Revenue (GHS),${totalRevenue}\n\n`
    + "Ticket Tier,Tickets Sold,Headcount Contribution\n"
    + `Single Pass (GHS 120),${singleTickets},${singleTickets * 1}\n`
    + `Double Pass (GHS 210),${doubleTickets},${doubleTickets * 2}\n`
    + `Squad Pack (GHS 320),${groupTickets},${groupTickets * 4}\n`;

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "knust_freshers_party_report.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Particle Background Animation
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = Math.random() * 2 + 0.5;
    this.color = Math.random() > 0.5 ? '#ffd700' : '#8a2be2';
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = (Math.random() - 0.5) * 0.4;
    this.alpha = Math.random() * 0.4 + 0.1;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
      this.reset();
    }
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  }
}

for (let i = 0; i < 50; i++) {
  particles.push(new Particle());
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateParticles);
}

animateParticles();

// Initial calculation call
updateDashboard();
