// প্রাথমিক ভ্যালু
let mainBalance = 0.0000;
let totalReinvest = 0.00;
let totalWithdraw = 0.00;

/**
 * নতুন মাইনিং রেট ক্যালকুলেশন (প্রতি সেকেন্ডে)
 * প্ল্যান ২: ৩০০% / ১০০ দিন -> ৩% ডেইলি
 * প্ল্যান ৩: ২৪০% / ৬০ দিন -> ৪% ডেইলি
 * প্ল্যান ৪: ২০০% / ৪০ দিন -> ৫% ডেইলি
 * প্ল্যান ৫: ১৭৪% / ২৯ দিন -> ৬% ডেইলি
 */
const rates = {
    free: 0.0001157, // ১০ নট প্রতিদিন (১০/৮৬৪০০)
    p2: 0.00003472,  // ৩% ডেইলি (৩/৮৬৪০০)
    p3: 0.00004629,  // ৪% ডেইলি (৪/৮৬৪০০)
    p4: 0.00005787,  // ৫% ডেইলি (৫/৮৬৪০০)
    p5: 0.00006944   // ৬% ডেইলি (৬/৮৬৪০০)
};

// বর্তমান মাইনিং সেশন ব্যালেন্স
let currentMining = { free: 0, p2: 0, p3: 0, p4: 0, p5: 0 };

// প্রতি ১ সেকেন্ড অন্তর আপডেট
setInterval(() => {
    // ফ্রি মাইনিং
    currentMining.free += rates.free;
    updateText('live-mining', currentMining.free.toFixed(6));

    // প্রিমিয়াম প্ল্যান মাইনিং
    currentMining.p2 += rates.p2; updateText('mining-p2', currentMining.p2.toFixed(6));
    currentMining.p3 += rates.p3; updateText('mining-p3', currentMining.p3.toFixed(6));
    currentMining.p4 += rates.p4; updateText('mining-p4', currentMining.p4.toFixed(6));
    currentMining.p5 += rates.p5; updateText('mining-p5', currentMining.p5.toFixed(6));

}, 1000);

// টেক্সট আপডেট ফাংশন (সেফটি চেক সহ)
function updateText(id, text) {
    let element = document.getElementById(id);
    if (element) {
        element.innerText = text;
    }
}

// ক্লেইম লজিক (সব প্ল্যানের জন্য)
function claim(plan) {
    let amount = 0;
    if (plan === 'free') {
        amount = currentMining.free;
        currentMining.free = 0;
    } else {
        amount = currentMining[plan];
        currentMining[plan] = 0;
    }

    if (amount > 0) {
        mainBalance += amount;
        updateUI();
        alert("Claim Successful!");
    } else {
        alert("Nothing to claim yet.");
    }
}

// UI আপডেট ফাংশন
function updateUI() {
    updateText('main-balance', mainBalance.toFixed(4));
    updateText('total-reinvest', totalReinvest.toFixed(2));
    updateText('total-withdraw', totalWithdraw.toFixed(2));
}

// ইনভেস্ট/রে-ইনভেস্ট বাটন লজিক (ডামি)
function invest(minAmount, percent) {
    alert("Minimum Investment: " + minAmount + " NOT. Please connect wallet.");
}

function handleWithdraw() { 
    if(mainBalance < 10) {
        alert("Minimum Withdraw 10 NOT");
    } else {
        alert("Connect TON Wallet to proceed."); 
    }
}

function copyRef() {
    alert("Referral Link Copied!");
}
