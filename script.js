// بيانات الأسئلة
const questions = [
    { question: "من هو مخترع المصباح الكهربائي؟", answer: "توماس إديسون" },
    { question: "من أول من مشى على سطح القمر؟", answer: "نيل آرمسترونغ" },
    { question: "ما الدولة التي تُسمى بلاد الرافدين؟", answer: "العراق" },
    { question: "ما وحدة قياس شدة الصوت؟", answer: "الديسيبل" },
    { question: "أي جزء من العين مسؤول عن الرؤية؟", answer: "الشبكية" },
    { question: "ما هو العضو المسؤول عن تنقية الدم في جسم الإنسان؟", answer: "الكلى" },
    { question: "ما هي أكبر غدة في جسم الإنسان؟", answer: "الكبد" },
    { question: "ما هو الحيوان الأكثر ذكاءً؟", answer: "الدولفين" },
    { question: "ما هي أسرع حشرة في العالم؟", answer: "اليعسوب" },
    { question: "أي حيوان يُعتبر أطول حيوان بري؟", answer: "الزرافة" },
    { question: "أي دولة عربية تُلقب بأرض الكنانة؟", answer: "مصر" },
    { question: "ما الدولة التي تُعتبر الأكبر مساحةً في العالم؟", answer: "روسيا" },
    { question: "ما البحر الذي يفصل بين قارة آسيا وأفريقيا؟", answer: "البحر الأحمر" },
    { question: "ما هو العنصر الأساسي في صناعة الزجاج؟", answer: "الرمل" },
    { question: "ما الرياضة التي تُلقب بـ\"الرياضة الملكية\"؟", answer: "السباحة" },
    { question: "ما هو الحيوان الذي ينام وإحدى عينيه مفتوحة؟", answer: "الدلفين" },
    { question: "ما أكبر دولة في أفريقيا من حيث المساحة؟", answer: "الجزائر" },
    { question: "أية قارة تقع بالكامل في نصف الكرة الجنوبي؟", answer: "أستراليا" },
    { question: "ما الشيء الذي كلما زاد نقص؟", answer: "العمر" },
    { question: "ما الدولة التي تُسمى أرض الشمس المشرقة؟", answer: "اليابان" },
    { question: "ما اسم الجهاز الذي يقيس ضغط الدم؟", answer: "الباروميتر" },
    { question: "ما اللغة الرسمية في البرازيل؟", answer: "البرتغالية" },
    { question: "ما هو الحيوان الذي ليس لديه حبال صوتية؟", answer: "الزرافة" },
    { question: "ما هو أكبر عضو داخلي في جسم الإنسان؟", answer: "الكبد" },
    { question: "أين وُلد الإمام الشافعي؟", answer: "فلسطين (غزة)" },
    { question: "كم سنة استمرت الخلافة العثمانية؟", answer: "حوالي 600 سنة" },
    { question: "ما عاصمة كندا؟", answer: "أوتاوا" },
    { question: "أين يقع جبل فوجي؟", answer: "اليابان" },
    { question: "أكبر دولة عربية من حيث عدد السكان؟", answer: "مصر" },
    { question: "ما هي أصغر دولة في العالم؟", answer: "الفاتيكان" }
];

let currentQuestionIndex = 0;
let ropePosition = 0; 
const pullAmount = 75; 
const winThreshold = 375; 

// العناصر الأساسية في DOM
const gameImage = document.getElementById('gameImage');
const questionDisplay = document.getElementById('questionDisplay');
const answerDisplay = document.getElementById('answerDisplay');
const team1PullBtn = document.getElementById('team1PullBtn');
const team2PullBtn = document.getElementById('team2PullBtn');
const nextQuestionBtn = document.getElementById('nextQuestionBtn');
const showAnswerBtn = document.getElementById('showAnswerBtn');

// 1. تحديث عرض الصورة (الحبل والفريقين)
function updateRopePosition() {
    gameImage.style.transform = `translateX(calc(-50% + ${ropePosition}px))`;
}

// 2. معالجة سحب الحبل
function handlePull(team) {
    if (checkWinCondition()) {
        return; 
    }
    
    if (team === 1) {
        ropePosition += pullAmount;
    } else if (team === 2) {
        ropePosition -= pullAmount;
    }
    
    updateRopePosition();
    checkWinCondition();
}

// 3. التحقق من حالة الفوز
function checkWinCondition() {
    let winner = null;
    if (ropePosition >= winThreshold) {
        winner = "الفريق 1";
    } else if (ropePosition <= -winThreshold) {
        winner = "الفريق 2";
    }

    if (winner) {
        displayWinner(winner);
        team1PullBtn.disabled = true;
        team2PullBtn.disabled = true;
        return true;
    }
    return false;
}

// 4. عرض شاشة الفوز (رسالة مبسطة)
function displayWinner(winner) {
    const existingOverlay = document.querySelector('.winner-overlay');
    if (existingOverlay) existingOverlay.remove();
    
    const overlay = document.createElement('div');
    overlay.className = 'winner-overlay';
    overlay.style.display = 'flex';
    // **رسالة مبسطة:** "فاز الفريق 1/2" فقط
    overlay.innerHTML = `
        <h2>فاز ${winner}</h2>
    `;
    document.body.appendChild(overlay);
}

// 5. تحميل السؤال التالي (الحبل لا يعود للمنتصف)
function loadNextQuestion() {
    const existingOverlay = document.querySelector('.winner-overlay');
    if (existingOverlay) {
        existingOverlay.remove();
    }
    
    // ropePosition يبقى كما هو
    
    updateRopePosition(); 
    team1PullBtn.disabled = false;
    team2PullBtn.disabled = false;
    showAnswerBtn.textContent = 'إظهار الإجابة'; 
    answerDisplay.textContent = ''; 
    
    if (questions.length === 0) {
        questionDisplay.textContent = "لا توجد أسئلة متبقية!";
        return;
    }

    const currentQuestion = questions[currentQuestionIndex];
    questionDisplay.textContent = currentQuestion.question;
    
    currentQuestionIndex = (currentQuestionIndex + 1) % questions.length;
}

// 6. عرض الإجابة
function showAnswer() {
    const question = questions[(currentQuestionIndex - 1 + questions.length) % questions.length];
    
    if (showAnswerBtn.textContent.includes('إظهار الإجابة')) {
        answerDisplay.textContent = `الإجابة هي: ${question.answer}`;
        showAnswerBtn.textContent = 'إخفاء الإجابة'; 
    } else {
        answerDisplay.textContent = '';
        showAnswerBtn.textContent = 'إظهار الإجابة'; 
    }
}

// 7. ربط الأحداث بالأزرار
team1PullBtn.addEventListener('click', () => handlePull(1));
team2PullBtn.addEventListener('click', () => handlePull(2));
nextQuestionBtn.addEventListener('click', loadNextQuestion);
showAnswerBtn.addEventListener('click', showAnswer);

// 8. تحميل السؤال الأول عند بدء الصفحة
loadNextQuestion();