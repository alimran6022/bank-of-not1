// ব্যালেন্স সেটআপ
let mainBalance = 0.0000;
let freeMining = 0.000000;
let standardMining = 0.000000;
let silverMining = 0.000000;

// স্ট্যাটাস সেটআপ (প্ল্যান অনুযায়ী)
let isFreeActive = true; 
let isStandardActive = false;
let isSilverActive = false;

// মাইনিং ফাংশন
function runMining() {
    setInterval(() => {
        // ১. ফ্রি মাইনিং - ১০ দিন (অটোমেটিক চলবে)
        if (isFreeActive) {
            freeMining += 0.000002; // আপনার আগের রেট অনুযায়ী
            document.getElementById('free-counter').innerText = freeMining.toFixed(6);
        }

        // ২. স্ট্যান্ডার্ড প্ল্যান - ১০০ দিন (ইনভেস্ট করলে চলবে)
        if (isStandardActive) {
            standardMining += 0.000005; 
            document.getElementById('standard-counter').innerText = standardMining.toFixed(6);
        } else {
            document.getElementById('standard-counter').innerText = "0.000000";
        }

        // ৩. সিলভার প্ল্যান - ৬০ দিন (ইনভেস্ট করলে চলবে)
        if (isSilverActive) {
            silverMining += 0.000010;
            document.getElementById('silver-counter').innerText = silverMining.toFixed(6);
        } else {
            document.getElementById('silver-counter').innerText = "0.000000";
        }
    }, 1000);
}

// ইনভেস্ট বাটন ক্লিক করলে যা হবে
function invest(plan) {
    if (plan === 'standard') {
        let confirmStandard = confirm("Invest 100+ NOT in Standard Plan?");
        if (confirmStandard) {
            isStandardActive = true;
            alert("Standard Mining Started!");
        }
    } else if (plan === 'silver') {
        let confirmSilver = confirm("Invest 100+ NOT in Silver Plan?");
        if (confirmSilver) {
            isSilverActive = true;
            alert("Silver Mining Started!");
        }
    }
}

// ক্লেইম করার ফাংশন
function claim(type) {
    if (type === 'free') {
        mainBalance += freeMining;
        freeMining = 0;
    } else if (type === 'standard' && isStandardActive) {
        mainBalance += standardMining;
        standardMining = 0;
    }
    document.getElementById('total-balance').innerText = mainBalance.toFixed(4) + " NOT";
    alert("Claim Success!");
}

window.onload = runMining;
