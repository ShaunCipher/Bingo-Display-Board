const bingoRanges = {
    B: [1, 15],
    I: [16, 30],
    N: [31, 45],
    G: [46, 60],
    O: [61, 75],
}

const bingoGrid = document.getElementById("bingoGrid")
const lastCalled = document.getElementById("lastCalled")

for (const letter in bingoRanges) {
    const col = document.createElement("div")
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
            lastCalled.textContent = btn.classList.contains("active") ? i : "---";
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
        btn.classList.add("free")
        btn.disabled = true;
    }

    else {
        btn.onclick = () => btn.classList.toggle("active");
    }

    patternGrid.appendChild(btn);

}

function resetGame() {
    if (!confirm("Start a new game?")) return;
    document.querySelectorAll(".num-btn").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".pattern-btn").forEach(b => b.classList.remove("active"));
    lastCalled.textContent ="---";
}