"use strict";

const languages = {
  id: "印尼文",
  en: "英文",
  vi: "越南文",
  th: "泰文",
  ja: "日文",
  ko: "韓文",
  uk: "烏克蘭文",
  ru: "俄文"
};

const state = {
  selectedLanguage: "id",
  selectedCategory: "全部",
  selectedConditionId: "",
  searchQuery: "",
  bilingualMode: false,
  showReadPrompt: true,
  oralFrequency: "",
  ointmentPlan: "",
  acneOintments: [],
  followUpDays: ""
};

const els = {};

const oralFrequencyOptions = [
  { id: "qd", label: "口服藥一天一次" },
  { id: "bid", label: "口服藥一天兩次" },
  { id: "tid", label: "口服藥一天三次" },
  { id: "qid", label: "口服藥一天四次" },
  { id: "hs", label: "口服藥睡前服用" }
];

const ointmentPlanOptions = [
  { id: "different", label: "早上一種藥膏，晚上另一種藥膏" },
  { id: "same", label: "同一種藥膏早晚擦" }
];

const acneOintmentOptions = [
  { id: "morning_acne", label: "早痘" },
  { id: "night_acne", label: "晚痘" },
  { id: "night_comedone", label: "晚粉刺" },
  { id: "night_mark", label: "晚痘疤" }
];

const followUpOptions = [
  { id: "3", label: "三天回診" },
  { id: "4", label: "四天回診" },
  { id: "5", label: "五天回診" },
  { id: "7", label: "七天回診" },
  { id: "after_meds", label: "用完藥膏再回診" },
  { id: "prn", label: "之後再觀察，不舒服再回診" }
];

const treatmentPhrase = {
  id: {
    oral: { qd: "Bila ada obat minum, minum 1 kali sehari.", bid: "Bila ada obat minum, minum 2 kali sehari.", tid: "Bila ada obat minum, minum 3 kali sehari.", qid: "Bila ada obat minum, minum 4 kali sehari.", hs: "Bila ada obat minum, minum sebelum tidur." },
    ointment: { different: "Untuk obat oles, gunakan satu jenis pada pagi hari dan jenis lain pada malam hari sesuai arahan dokter.", same: "Untuk obat oles, gunakan obat yang sama pada pagi dan malam hari sesuai arahan dokter." },
    acne: { morning_acne: "Pagi hari: gunakan obat jerawat pada area jerawat.", night_acne: "Malam hari: gunakan obat jerawat pada area jerawat.", night_comedone: "Malam hari: gunakan obat komedo pada area komedo atau pori tersumbat.", night_mark: "Malam hari: gunakan obat bekas jerawat pada area noda jerawat." },
    follow: { "3": "Silakan kontrol kembali dalam 3 hari.", "4": "Silakan kontrol kembali dalam 4 hari.", "5": "Silakan kontrol kembali dalam 5 hari.", "7": "Silakan kontrol kembali dalam 7 hari.", after_meds: "Silakan kontrol kembali setelah obat oles habis.", prn: "Setelah ini dapat diamati dahulu. Bila terasa tidak nyaman atau gejala memburuk, silakan kontrol kembali." }
  },
  en: {
    oral: { qd: "If oral medicine is prescribed, take it once a day.", bid: "If oral medicine is prescribed, take it twice a day.", tid: "If oral medicine is prescribed, take it three times a day.", qid: "If oral medicine is prescribed, take it four times a day.", hs: "If oral medicine is prescribed, take it at bedtime." },
    ointment: { different: "For topical medicine, use one ointment in the morning and a different ointment at night as directed.", same: "For topical medicine, use the same ointment in the morning and at night as directed." },
    acne: { morning_acne: "Morning: apply acne medicine to acne areas.", night_acne: "Night: apply acne medicine to acne areas.", night_comedone: "Night: apply comedone medicine to blackheads, whiteheads, or clogged-pore areas.", night_mark: "Night: apply acne-mark medicine to acne marks." },
    follow: { "3": "Please return for follow-up in 3 days.", "4": "Please return for follow-up in 4 days.", "5": "Please return for follow-up in 5 days.", "7": "Please return for follow-up in 7 days.", after_meds: "Please return for follow-up after you finish the ointment.", prn: "For now, you may observe the condition. If you feel uncomfortable or the symptoms get worse, please come back." }
  },
  vi: {
    oral: { qd: "Nếu có thuốc uống, uống mỗi ngày 1 lần.", bid: "Nếu có thuốc uống, uống mỗi ngày 2 lần.", tid: "Nếu có thuốc uống, uống mỗi ngày 3 lần.", qid: "Nếu có thuốc uống, uống mỗi ngày 4 lần.", hs: "Nếu có thuốc uống, uống trước khi đi ngủ." },
    ointment: { different: "Với thuốc bôi, dùng một loại vào buổi sáng và một loại khác vào buổi tối theo hướng dẫn.", same: "Với thuốc bôi, dùng cùng một loại thuốc vào buổi sáng và buổi tối theo hướng dẫn." },
    acne: { morning_acne: "Buổi sáng: bôi thuốc trị mụn lên vùng có mụn.", night_acne: "Buổi tối: bôi thuốc trị mụn lên vùng có mụn.", night_comedone: "Buổi tối: bôi thuốc trị nhân mụn lên vùng mụn đầu đen, đầu trắng hoặc lỗ chân lông tắc.", night_mark: "Buổi tối: bôi thuốc trị thâm mụn lên vùng vết thâm." },
    follow: { "3": "Vui lòng tái khám sau 3 ngày.", "4": "Vui lòng tái khám sau 4 ngày.", "5": "Vui lòng tái khám sau 5 ngày.", "7": "Vui lòng tái khám sau 7 ngày.", after_meds: "Vui lòng tái khám sau khi dùng hết thuốc bôi.", prn: "Sau đó có thể theo dõi thêm. Nếu khó chịu hoặc triệu chứng nặng hơn, vui lòng tái khám." }
  },
  th: {
    oral: { qd: "ถ้ามียากิน ให้กินวันละ 1 ครั้ง", bid: "ถ้ามียากิน ให้กินวันละ 2 ครั้ง", tid: "ถ้ามียากิน ให้กินวันละ 3 ครั้ง", qid: "ถ้ามียากิน ให้กินวันละ 4 ครั้ง", hs: "ถ้ามียากิน ให้กินก่อนนอน" },
    ointment: { different: "ยาทาให้ใช้ชนิดหนึ่งตอนเช้า และอีกชนิดตอนกลางคืนตามคำแนะนำ", same: "ยาทาให้ใช้ชนิดเดียวกันตอนเช้าและตอนกลางคืนตามคำแนะนำ" },
    acne: { morning_acne: "ตอนเช้า: ทายารักษาสิวบริเวณที่เป็นสิว", night_acne: "ตอนกลางคืน: ทายารักษาสิวบริเวณที่เป็นสิว", night_comedone: "ตอนกลางคืน: ทายารักษาสิวอุดตันบริเวณสิวหัวดำ หัวขาว หรือรูขุมขนอุดตัน", night_mark: "ตอนกลางคืน: ทายารอยสิวบริเวณรอยสิว" },
    follow: { "3": "กรุณากลับมาตรวจใน 3 วัน", "4": "กรุณากลับมาตรวจใน 4 วัน", "5": "กรุณากลับมาตรวจใน 5 วัน", "7": "กรุณากลับมาตรวจใน 7 วัน", after_meds: "กรุณากลับมาตรวจหลังใช้ยาทาหมด", prn: "หลังจากนี้ให้สังเกตอาการก่อนได้ หากไม่สบายหรืออาการแย่ลง กรุณากลับมาตรวจ" }
  },
  ja: {
    oral: { qd: "内服薬がある場合は、1日1回服用してください。", bid: "内服薬がある場合は、1日2回服用してください。", tid: "内服薬がある場合は、1日3回服用してください。", qid: "内服薬がある場合は、1日4回服用してください。", hs: "内服薬がある場合は、寝る前に服用してください。" },
    ointment: { different: "外用薬は、医師の指示どおり朝に1種類、夜に別の1種類を使ってください。", same: "外用薬は、医師の指示どおり同じ薬を朝と夜に使ってください。" },
    acne: { morning_acne: "朝：にきびの部分ににきび用の薬を塗ってください。", night_acne: "夜：にきびの部分ににきび用の薬を塗ってください。", night_comedone: "夜：黒にきび、白にきび、毛穴詰まりの部分に面皰用の薬を塗ってください。", night_mark: "夜：にきび跡の部分ににきび跡用の薬を塗ってください。" },
    follow: { "3": "3日後に再診してください。", "4": "4日後に再診してください。", "5": "5日後に再診してください。", "7": "7日後に再診してください。", after_meds: "塗り薬を使い終わったら再診してください。", prn: "しばらく様子を見てもかまいません。つらい症状や悪化があれば再診してください。" }
  },
  ko: {
    oral: { qd: "먹는 약이 있으면 하루 1번 복용하세요.", bid: "먹는 약이 있으면 하루 2번 복용하세요.", tid: "먹는 약이 있으면 하루 3번 복용하세요.", qid: "먹는 약이 있으면 하루 4번 복용하세요.", hs: "먹는 약이 있으면 자기 전에 복용하세요." },
    ointment: { different: "바르는 약은 의사의 지시에 따라 아침에는 한 종류, 밤에는 다른 종류를 사용하세요.", same: "바르는 약은 의사의 지시에 따라 같은 약을 아침과 밤에 사용하세요." },
    acne: { morning_acne: "아침: 여드름 부위에 여드름 약을 바르세요.", night_acne: "밤: 여드름 부위에 여드름 약을 바르세요.", night_comedone: "밤: 블랙헤드, 화이트헤드 또는 막힌 모공 부위에 면포 약을 바르세요.", night_mark: "밤: 여드름 자국 부위에 여드름 자국 약을 바르세요." },
    follow: { "3": "3일 후 다시 내원해 주세요.", "4": "4일 후 다시 내원해 주세요.", "5": "5일 후 다시 내원해 주세요.", "7": "7일 후 다시 내원해 주세요.", after_meds: "바르는 약을 다 사용한 뒤 다시 내원해 주세요.", prn: "이후에는 우선 경과를 관찰하셔도 됩니다. 불편하거나 증상이 악화되면 다시 내원해 주세요." }
  },
  zh: {
    oral: { qd: "如果有口服藥，請一天一次服用。", bid: "如果有口服藥，請一天兩次服用。", tid: "如果有口服藥，請一天三次服用。", qid: "如果有口服藥，請一天四次服用。", hs: "如果有口服藥，請睡前服用。" },
    ointment: { different: "外用藥請早上擦一種藥膏，晚上擦另一種藥膏，依醫師指示使用。", same: "外用藥請同一種藥膏早晚各擦一次，依醫師指示使用。" },
    acne: { morning_acne: "早上：青春痘部位擦痘痘藥。", night_acne: "晚上：青春痘部位擦痘痘藥。", night_comedone: "晚上：粉刺、黑頭、白頭或毛孔阻塞部位擦粉刺藥。", night_mark: "晚上：痘疤或痘印部位擦痘疤藥。" },
    follow: { "3": "請三天後回診。", "4": "請四天後回診。", "5": "請五天後回診。", "7": "請七天後回診。", after_meds: "請用完藥膏後再回診。", prn: "之後可以先觀察；如果不舒服或症狀變嚴重，請再回診。" }
  },
  uk: {
    oral: { qd: "Якщо призначено пероральні ліки, приймайте їх 1 раз на день.", bid: "Якщо призначено пероральні ліки, приймайте їх 2 рази на день.", tid: "Якщо призначено пероральні ліки, приймайте їх 3 рази на день.", qid: "Якщо призначено пероральні ліки, приймайте їх 4 рази на день.", hs: "Якщо призначено пероральні ліки, приймайте їх перед сном." },
    ointment: { different: "Для зовнішніх засобів використовуйте одну мазь вранці та іншу мазь ввечері за призначенням.", same: "Для зовнішніх засобів використовуйте ту саму мазь вранці та ввечері за призначенням." },
    acne: { morning_acne: "Вранці: наносьте засіб від акне на ділянки з акне.", night_acne: "Ввечері: наносьте засіб від акне на ділянки з акне.", night_comedone: "Ввечері: наносьте засіб від комедонів на чорні точки, білі точки або ділянки закупорених пор.", night_mark: "Ввечері: наносьте засіб від слідів акне на сліди акне." },
    follow: { "3": "Будь ласка, приходьте на повторний прийом через 3 дні.", "4": "Будь ласка, приходьте на повторний прийом через 4 дні.", "5": "Будь ласка, приходьте на повторний прийом через 5 днів.", "7": "Будь ласка, приходьте на повторний прийом через 7 днів.", after_meds: "Будь ласка, приходьте на повторний прийом, коли закінчите мазь.", prn: "Поки що ви можете спостерігати за станом. Якщо ви відчуваєте дискомфорт або симптоми погіршуються, будь ласка, поверніться." }
  },
  ru: {
    oral: { qd: "Если назначены пероральные лекарства, принимайте их 1 раз в день.", bid: "Если назначены пероральные лекарства, принимайте их 2 раза в день.", tid: "Если назначены пероральные лекарства, принимайте их 3 раза в день.", qid: "Если назначены пероральные лекарства, принимайте их 4 раза в день.", hs: "Если назначены пероральные лекарства, принимайте их перед сном." },
    ointment: { different: "Для наружных средств используйте одну мазь утром и другую мазь вечером по назначению.", same: "Для наружных средств используйте ту же мазь утром и вечером по назначению." },
    acne: { morning_acne: "Утром: наносите средство от акне на участки с акне.", night_acne: "Вечером: наносите средство от акне на участки с акне.", night_comedone: "Вечером: наносите средство от комедонов на чёрные точки, белые точки или участки закупоренных пор.", night_mark: "Вечером: наносите средство от следов акне на следы акне." },
    follow: { "3": "Пожалуйста, приходите на повторный приём через 3 дня.", "4": "Пожалуйста, приходите на повторный приём через 4 дня.", "5": "Пожалуйста, приходите на повторный приём через 5 дней.", "7": "Пожалуйста, приходите на повторный приём через 7 дней.", after_meds: "Пожалуйста, приходите на повторный приём, когда закончите мазь.", prn: "Пока что вы можете наблюдать за состоянием. Если вы чувствуете дискомфорт или симптомы ухудшаются, пожалуйста, вернитесь." }
  }
};

document.addEventListener("DOMContentLoaded", initApp);

function initApp() {
  cacheElements();
  renderLanguageSelector();
  renderCategoryFilter();
  renderTreatmentControls();
  bindEvents();
  renderConditionList();
  updateOutput();
  registerServiceWorker();
}

function cacheElements() {
  els.languageSelector = document.querySelector("#languageSelector");
  els.categoryFilter = document.querySelector("#categoryFilter");
  els.searchInput = document.querySelector("#searchInput");
  els.conditionList = document.querySelector("#conditionList");
  els.treatmentControls = document.querySelector("#treatmentControls");
  els.resultCount = document.querySelector("#resultCount");
  els.patientOutput = document.querySelector("#patientOutput");
  els.readPromptOutput = document.querySelector("#readPromptOutput");
  els.bilingualToggle = document.querySelector("#bilingualToggle");
  els.copyPatientButton = document.querySelector("#copyPatientButton");
  els.copyReadButton = document.querySelector("#copyReadButton");
  els.togglePromptButton = document.querySelector("#togglePromptButton");
  els.clearButton = document.querySelector("#clearButton");
  els.toast = document.querySelector("#toast");
  els.forceUpdateButton = document.querySelector("#forceUpdateButton");
}

function bindEvents() {
  els.searchInput.addEventListener("input", (event) => {
    state.searchQuery = event.target.value.trim();
    renderConditionList();
  });

  els.bilingualToggle.addEventListener("click", toggleBilingualMode);
  els.clearButton.addEventListener("click", clearOutput);
  els.copyPatientButton.addEventListener("click", () => copyText(getPatientOutputText(), "已複製病人說明"));
  els.copyReadButton.addEventListener("click", () => copyText(buildChatGPTReadAloudPrompt(), "已複製 ChatGPT 朗讀稿"));
  els.togglePromptButton.addEventListener("click", () => {
    state.showReadPrompt = !state.showReadPrompt;
    updateOutput();
  });
  if (els.forceUpdateButton) {
    els.forceUpdateButton.addEventListener("click", forceUpdate);
  }
}

function renderLanguageSelector() {
  els.languageSelector.innerHTML = Object.entries(languages).map(([code, label]) => `
    <button type="button" data-language="${code}" aria-pressed="${state.selectedLanguage === code}">
      ${label}
    </button>
  `).join("");

  els.languageSelector.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedLanguage = button.dataset.language;
      renderLanguageSelector();
      updateOutput();
    });
  });
}

function renderCategoryFilter() {
  const categories = ["全部", ...new Set(conditionTemplates.map((item) => item.category))];
  els.categoryFilter.innerHTML = categories.map((category) => `
    <button type="button" data-category="${category}" aria-pressed="${state.selectedCategory === category}">
      ${category}
    </button>
  `).join("");

  els.categoryFilter.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedCategory = button.dataset.category;
      renderCategoryFilter();
      renderConditionList();
    });
  });
}

function renderConditionList() {
  const filtered = filterConditions();
  els.resultCount.textContent = `找到 ${filtered.length} 個模板`;

  if (!filtered.length) {
    els.conditionList.innerHTML = `<p class="muted">沒有符合的模板，請換一個關鍵字。</p>`;
    return;
  }

  els.conditionList.innerHTML = filtered.map((condition) => `
    <button type="button" class="condition-card ${state.selectedConditionId === condition.id ? "active" : ""}" data-condition-id="${condition.id}">
      <strong>${condition.titleZh}</strong>
      <span class="condition-meta">
        <span>${condition.category}</span>
        <span>${condition.contagious ? "可能傳染" : "通常不具傳染性"}</span>
        <span>${condition.severity}</span>
      </span>
    </button>
  `).join("");

  els.conditionList.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedConditionId = button.dataset.conditionId;
      if (state.selectedConditionId !== "acne_vulgaris") state.acneOintments = [];
      renderConditionList();
      renderTreatmentControls();
      updateOutput();
      document.querySelector("#treatment-title").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function renderTreatmentControls() {
  const selected = getSelectedCondition();
  const isAcne = selected?.id === "acne_vulgaris";

  els.treatmentControls.innerHTML = `
    <div class="control-group">
      <h3>口服藥頻次</h3>
      <div class="option-grid">
        ${oralFrequencyOptions.map((option) => treatmentButton("oral", option, state.oralFrequency === option.id)).join("")}
      </div>
    </div>
    <div class="control-group">
      <h3>外用藥膏</h3>
      <div class="option-grid two-col">
        ${ointmentPlanOptions.map((option) => treatmentButton("ointment", option, state.ointmentPlan === option.id)).join("")}
      </div>
    </div>
    <div class="control-group ${isAcne ? "" : "muted-control"}">
      <h3>青春痘藥膏</h3>
      <p class="muted">${isAcne ? "可單選，也可複選；會加入青春痘專用擦藥說明。" : "選擇青春痘／痤瘡模板後啟用。"}</p>
      <div class="option-grid">
        ${acneOintmentOptions.map((option) => treatmentButton("acne", option, state.acneOintments.includes(option.id), !isAcne)).join("")}
      </div>
    </div>
    <div class="control-group">
      <h3>回診時間</h3>
      <div class="option-grid">
        ${followUpOptions.map((option) => treatmentButton("follow", option, state.followUpDays === option.id)).join("")}
      </div>
    </div>
  `;

  els.treatmentControls.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => handleTreatmentOption(button.dataset.group, button.dataset.value));
  });
}

function treatmentButton(group, option, pressed, disabled = false) {
  return `
    <button type="button" class="treatment-button" data-group="${group}" data-value="${option.id}" aria-pressed="${pressed}" ${disabled ? "disabled" : ""}>
      ${option.label}
    </button>
  `;
}

function handleTreatmentOption(group, value) {
  if (group === "oral") state.oralFrequency = state.oralFrequency === value ? "" : value;
  if (group === "ointment") state.ointmentPlan = state.ointmentPlan === value ? "" : value;
  if (group === "follow") state.followUpDays = state.followUpDays === value ? "" : value;
  if (group === "acne") {
    state.acneOintments = state.acneOintments.includes(value)
      ? state.acneOintments.filter((item) => item !== value)
      : [...state.acneOintments, value];
  }
  renderTreatmentControls();
  updateOutput();
}

function filterConditions() {
  const query = state.searchQuery.toLowerCase();
  return conditionTemplates.filter((condition) => {
    const inCategory = state.selectedCategory === "全部" || condition.category === state.selectedCategory;
    if (!inCategory) return false;
    if (!query) return true;

    const searchable = [
      condition.titleZh,
      condition.category,
      condition.severity,
      condition.typicalFollowUp,
      ...condition.tags,
      condition.zh.summary,
      condition.zh.explanation,
      condition.zh.treatment,
      condition.zh.homeCare,
      condition.zh.warning,
      condition.zh.followUp
    ].join(" ").toLowerCase();

    return searchable.includes(query);
  });
}

function getSelectedCondition() {
  return conditionTemplates.find((condition) => condition.id === state.selectedConditionId) || null;
}

function buildPatientText() {
  const condition = getSelectedCondition();
  if (!condition) return "請先選擇病情模板。";

  const t = condition.translations[state.selectedLanguage];
  return [
    "【病情說明】",
    `${t.summary}\n${t.explanation}`,
    "",
    "【治療方式】",
    [t.treatment, buildTreatmentAddendum(state.selectedLanguage)].filter(Boolean).join("\n"),
    "",
    "【居家照護】",
    t.homeCare,
    "",
    "【注意事項與警訊】",
    t.warning,
    "",
    "【回診建議】",
    [t.followUp, buildFollowUpAddendum(state.selectedLanguage)].filter(Boolean).join("\n")
  ].join("\n");
}

function buildBilingualText() {
  const condition = getSelectedCondition();
  if (!condition) return "請先選擇病情模板。";

  const t = condition.translations[state.selectedLanguage];
  const zh = condition.zh;
  return [
    "【病情說明】",
    `${t.summary}\n${t.explanation}`,
    `中文對照：${zh.summary} ${zh.explanation}`,
    "",
    "【治療方式】",
    [t.treatment, buildTreatmentAddendum(state.selectedLanguage)].filter(Boolean).join("\n"),
    `中文對照：${[zh.treatment, buildTreatmentAddendum("zh")].filter(Boolean).join(" ")}`,
    "",
    "【居家照護】",
    t.homeCare,
    `中文對照：${zh.homeCare}`,
    "",
    "【注意事項與警訊】",
    t.warning,
    `中文對照：${zh.warning}`,
    "",
    "【回診建議】",
    [t.followUp, buildFollowUpAddendum(state.selectedLanguage)].filter(Boolean).join("\n"),
    `中文對照：${[zh.followUp, buildFollowUpAddendum("zh")].filter(Boolean).join(" ")}`
  ].join("\n");
}

function buildTreatmentAddendum(languageCode) {
  const phrase = treatmentPhrase[languageCode];
  const lines = [];
  if (state.oralFrequency) lines.push(phrase.oral[state.oralFrequency]);
  if (state.ointmentPlan) lines.push(phrase.ointment[state.ointmentPlan]);
  state.acneOintments.forEach((id) => lines.push(phrase.acne[id]));
  return lines.join("\n");
}

function buildFollowUpAddendum(languageCode) {
  if (!state.followUpDays) return "";
  return treatmentPhrase[languageCode].follow[state.followUpDays];
}

function buildChatGPTReadAloudPrompt() {
  const patientText = buildPatientText();
  return `請用自然、清楚、溫和、適合醫療溝通的語氣，用${languages[state.selectedLanguage]}朗讀以下內容給病人聽。請速度稍慢，讓病人容易理解（產生之文字稿請勿包含中文內容，以方便後續直接朗讀）：\n\n${patientText}`;
}

function updateOutput() {
  const patientText = getPatientOutputText();
  els.patientOutput.textContent = patientText;
  els.bilingualToggle.textContent = `中文對照：${state.bilingualMode ? "開" : "關"}`;
  els.bilingualToggle.setAttribute("aria-pressed", String(state.bilingualMode));
  els.readPromptOutput.textContent = state.showReadPrompt ? buildChatGPTReadAloudPrompt() : "朗讀提示已隱藏。";
}

function getPatientOutputText() {
  return state.bilingualMode ? buildBilingualText() : buildPatientText();
}

async function copyText(text, successMessage) {
  if (!getSelectedCondition()) {
    showToast("請先選擇病情模板");
    return;
  }

  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
    }
    showToast(successMessage);
  } catch (error) {
    showToast("複製失敗，請手動選取文字");
  }
}

function toggleBilingualMode() {
  state.bilingualMode = !state.bilingualMode;
  updateOutput();
}

function clearOutput() {
  state.selectedConditionId = "";
  state.searchQuery = "";
  state.oralFrequency = "";
  state.ointmentPlan = "";
  state.acneOintments = [];
  state.followUpDays = "";
  els.searchInput.value = "";
  renderConditionList();
  renderTreatmentControls();
  updateOutput();
  showToast("已清空選擇");
}

function showToast(message) {
  els.toast.textContent = message;
  els.toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => els.toast.classList.remove("show"), 1800);
}

function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./service-worker.js").catch(() => {
        console.info("Service worker registration failed.");
      });
    });
  }
}

async function forceUpdate() {
  if (!window.confirm("確定要清除快取並重新載入最新版本嗎？")) return;

  if (els.forceUpdateButton) {
    els.forceUpdateButton.classList.add("is-loading");
    els.forceUpdateButton.disabled = true;
  }
  showToast("清除快取中…");

  try {
    if ("serviceWorker" in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      await Promise.all(registrations.map((reg) => reg.unregister()));
    }
    if ("caches" in window) {
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));
    }
  } catch (error) {
    console.warn("Force update cleanup failed:", error);
  }

  const url = new URL(window.location.href);
  url.searchParams.set("_t", Date.now().toString());
  window.location.replace(url.toString());
}
