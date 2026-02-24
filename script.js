const bingoRanges = {
    B: [1, 15],
    I: [16, 30],
    N: [31, 45],
    G: [46, 60],
    O: [61, 75]
};

let calledHistory = [];
const bingoGrid = document.getElementById("bingoGrid");
const lastCalled = document.getElementById("lastCalled");
const historyList = document.getElementById("callHistory");

for (const letter in bingoRanges) {
    const col = document.createElement("div");
    col.className = "column";

    const header = document.createElement("div");
    header.className = "header";
    header.textContent = letter;
    col.appendChild(header);

    const [start, end] = bingoRanges[letter];
    for (let i = start; i <= end; i++) {
        const btn = document.createElement("button");
        btn.className = "num-btn";
        btn.textContent = i;

        btn.onclick = () => {
            btn.classList.toggle("active");
            const num = parseInt(btn.textContent);

            if (btn.classList.contains("active")) {
                lastCalled.textContent = i;
                calledHistory.unshift(num);
            } else {
                calledHistory = calledHistory.filter(n => n !== num);
                lastCalled.textContent = calledHistory.length > 0 ? calledHistory[0] : "---";
            }
            updateHistory();
        };
        col.appendChild(btn);
    }
    bingoGrid.appendChild(col);
}

const patternGrid = document.getElementById("patternGrid");
for (let i = 0; i < 25; i++) {
    const btn = document.createElement("button");
    btn.className = "pattern-btn";
    if (i === 12) {
        btn.textContent = "★";
        btn.classList.add("free");
        btn.disabled = true;
    } else {
        btn.onclick = () => btn.classList.toggle("active");
    }
    patternGrid.appendChild(btn);
}

function updateHistory() {
    if (calledHistory.length === 0) {
        historyList.textContent = "---";
    } else {
        const recent = calledHistory.slice(0, 8);
        let html = `<span class="newest-call">${recent[0]}</span>`;
        if (recent.length > 1) {
            html += ", " + recent.slice(1).join(", ");
        }
        historyList.innerHTML = html;
    }
}

function resetGame() {
    if (!confirm("Start a new game?")) return;
    document.querySelectorAll(".num-btn").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".pattern-btn").forEach(b => b.classList.remove("active"));
    lastCalled.textContent = "---";
    calledHistory = [];
    updateHistory();
}

function toggleSettings() {
    const panel = document.getElementById("settingsPanel");
    panel.style.display = (panel.style.display === "flex") ? "none" : "flex";
}

function applySettings() {
    const t = document.getElementById("padTop").value;
    const b = document.getElementById("padBottom").value;
    const l = document.getElementById("padLeft").value;
    const r = document.getElementById("padRight").value;
    const fontSize = document.getElementById("fontInput").value;

    const container = document.getElementById("mainContainer");
    container.style.padding = `${t}px ${r}px ${b}px ${l}px`;

    document.querySelectorAll(".num-btn").forEach(btn => {
        btn.style.fontSize = `${fontSize}px`;
    });
}

function resetDisplayDefaults() {
    document.getElementById("padTop").value = 10;
    document.getElementById("padBottom").value = 10;
    document.getElementById("padLeft").value = 10;
    document.getElementById("padRight").value = 10;
    document.getElementById("fontInput").value = 24;
    applySettings();
}