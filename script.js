let mainBal = 0.0000;
let fMine = 0.000000;
let stMine = 0.000000;
let slMine = 0.000000;

let isStActive = false;
let isSlActive = false;

function startApp() {
    setInterval(() => {
        // ফ্রি মাইনিং (অটোমেটিক)
        fMine += 0.000002;
        let fEl = document.getElementById('free-counter');
        if(fEl) fEl.innerText = fMine.toFixed(6);

        // স্ট্যান্ডার্ড
        let stEl = document.getElementById('standard-counter');
        if(isStActive) {
            stMine += 0.000008;
            if(stEl) stEl.innerText = stMine.toFixed(6);
        } else if(stEl) {
            stEl.innerText = "0.000000";
        }

        // সিলভার
        let slEl = document.getElementById('silver-counter');
        if(isSlActive) {
            slMine += 0.000015;
            if(slEl) slEl.innerText = slMine.toFixed(6);
        } else if(slEl) {
            slEl.innerText = "0.000000";
        }
    }, 1000);
}

function invest(p) {
    if(confirm("Do you want to invest and start mining?")) {
        if(p === 'standard') isStActive = true;
        if(p === 'silver') isSlActive = true;
        alert("Mining Started!");
    }
}

function claim(t) {
    if(t === 'free') { mainBal += fMine; fMine = 0; }
    else if(t === 'standard' && isStActive) { mainBal += stMine; stMine = 0; }
    else if(t === 'silver' && isSlActive) { mainBal += slMine; slMine = 0; }
    else { alert("Please invest first!"); return; }
    
    let bEl = document.getElementById('total-balance');
    if(bEl) bEl.innerText = mainBal.toFixed(4);
    alert("Claimed!");
}

window.onload = startApp;
