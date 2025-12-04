document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll("#main-nav a");
    const sections = document.querySelectorAll(".page-section");

    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = link.getAttribute("data-target");

            navLinks.forEach(l => l.classList.remove("active"));
            link.classList.add("active");

            sections.forEach(sec => {
                sec.classList.remove("visible");
            });
            document.getElementById(targetId).classList.add("visible");
        });
    });

    const assetForm = document.getElementById("asset-form");
    const resultCard = document.getElementById("register-result");

    let latestData = null;

    assetForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const owner = document.getElementById("ownerName").value;
        const type = document.getElementById("assetType").value;
        const desc = document.getElementById("assetDesc").value;

        const combined = `${owner}|${type}|${desc}|${Date.now()}`;
        const hashHex = await sha256(combined);
        const coinId = "EXP-" + hashHex.substring(0, 12).toUpperCase();

        document.getElementById("result-owner").textContent = owner;
        document.getElementById("result-type").textContent = type;
        document.getElementById("result-desc").textContent = desc;
        document.getElementById("result-hash").textContent = hashHex;
        document.getElementById("result-coin").textContent = coinId;

        resultCard.classList.remove("hidden");

        latestData = { owner, type, desc, hash: hashHex, coinId };
    });

    document.getElementById("bc-refresh").addEventListener("click", () => {
        if (!latestData) {
            alert("등록된 데이터가 없습니다.");
            return;
        }
        document.getElementById("bc-owner").textContent = latestData.owner;
        document.getElementById("bc-type").textContent = latestData.type;
        document.getElementById("bc-desc").textContent = latestData.desc;
        document.getElementById("bc-hash").textContent = latestData.hash;
        document.getElementById("bc-coin").textContent = latestData.coinId;
    });
});

async function sha256(message) {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hashBuffer))
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");
}
