"use strict";

const sectionNames = {
  summary: "summary",
  explanation: "explanation",
  treatment: "treatment",
  homeCare: "homeCare",
  warning: "warning",
  followUp: "followUp"
};

const languageText = {
  id: {
    contagiousYes: "Penyakit ini dapat menular ke bagian tubuh lain atau ke orang lain.",
    contagiousNo: "Kondisi ini biasanya tidak menular.",
    chronic: "Perawatan sering membutuhkan waktu dan perlu disesuaikan secara bertahap.",
    follow: "Silakan kontrol kembali sesuai jadwal dokter agar pengobatan dapat disesuaikan.",
    urgent: "Datang lebih awal bila nyeri berat, bengkak makin luas, bernanah, demam, sesak napas, atau muncul tanda alergi obat.",
    template: (d) => ({
      summary: `Kondisi kulit Anda adalah ${d.names.id}.`,
      explanation: `${d.explain.id} ${d.contagious ? languageText.id.contagiousYes : languageText.id.contagiousNo} Tujuan pengobatan adalah mengurangi gejala, membantu kulit pulih, dan menurunkan risiko kambuh atau menyebar. Perubahan biasanya tidak langsung hilang dalam satu hari, jadi respons perlu diamati beberapa waktu.`,
      treatment: `${d.treat.id} Gunakan obat sesuai petunjuk dokter, jangan menambah atau menghentikan obat sendiri.`,
      homeCare: `${d.care.id} Hindari menggaruk atau menggosok terlalu keras.`,
      warning: `${d.warn.id} ${languageText.id.urgent}`,
      followUp: `${d.follow.id} ${languageText.id.follow}`
    })
  },
  en: {
    contagiousYes: "It may spread to other parts of your body or to other people.",
    contagiousNo: "This condition is usually not contagious.",
    chronic: "Treatment often takes time and may need gradual adjustment.",
    follow: "Please return as arranged so the treatment can be adjusted.",
    urgent: "Come back earlier if you have severe pain, spreading redness or swelling, pus, fever, breathing difficulty, or signs of drug allergy.",
    template: (d) => ({
      summary: `Your skin condition is ${d.names.en}.`,
      explanation: `${d.explain.en} ${d.contagious ? languageText.en.contagiousYes : languageText.en.contagiousNo} The goal of treatment is to reduce symptoms, help the skin recover, and lower the chance of recurrence or spread. Skin changes usually do not disappear in one day, so we need to watch the response over time.`,
      treatment: `${d.treat.en} Please use the medicine as directed and do not change it by yourself.`,
      homeCare: `${d.care.en} Avoid scratching, picking, or harsh rubbing.`,
      warning: `${d.warn.en} ${languageText.en.urgent}`,
      followUp: `${d.follow.en} ${languageText.en.follow}`
    })
  },
  vi: {
    contagiousYes: "Bệnh có thể lây sang vùng da khác của chính bạn hoặc lây cho người khác.",
    contagiousNo: "Tình trạng này thường không lây.",
    chronic: "Điều trị thường cần thời gian và có thể phải điều chỉnh dần.",
    follow: "Vui lòng tái khám theo lịch để bác sĩ điều chỉnh điều trị.",
    urgent: "Hãy tái khám sớm nếu đau nhiều, đỏ sưng lan rộng, có mủ, sốt, khó thở hoặc có dấu hiệu dị ứng thuốc.",
    template: (d) => ({
      summary: `Tình trạng da của bạn là ${d.names.vi}.`,
      explanation: `${d.explain.vi} ${d.contagious ? languageText.vi.contagiousYes : languageText.vi.contagiousNo} Mục tiêu điều trị là giảm triệu chứng, giúp da hồi phục và giảm nguy cơ tái phát hoặc lan rộng. Thay đổi trên da thường không biến mất trong một ngày, nên cần theo dõi đáp ứng theo thời gian.`,
      treatment: `${d.treat.vi} Hãy dùng thuốc đúng theo hướng dẫn của bác sĩ, không tự ý đổi thuốc.`,
      homeCare: `${d.care.vi} Tránh gãi, nặn hoặc chà xát mạnh.`,
      warning: `${d.warn.vi} ${languageText.vi.urgent}`,
      followUp: `${d.follow.vi} ${languageText.vi.follow}`
    })
  },
  th: {
    contagiousYes: "โรคนี้อาจแพร่ไปยังผิวหนังส่วนอื่นของตนเองหรือแพร่ให้ผู้อื่นได้",
    contagiousNo: "ภาวะนี้โดยทั่วไปไม่ติดต่อ",
    chronic: "การรักษามักต้องใช้เวลาและอาจต้องปรับยาตามอาการ",
    follow: "กรุณามาตรวจตามนัดเพื่อให้แพทย์ปรับการรักษาได้เหมาะสม",
    urgent: "ควรมาพบแพทย์ก่อนนัดถ้าปวดมาก แดงบวมลาม มีหนอง มีไข้ หายใจลำบาก หรือมีอาการแพ้ยา",
    template: (d) => ({
      summary: `ปัญหาผิวหนังของคุณคือ ${d.names.th}`,
      explanation: `${d.explain.th} ${d.contagious ? languageText.th.contagiousYes : languageText.th.contagiousNo} เป้าหมายของการรักษาคือ ลดอาการ ช่วยให้ผิวฟื้นตัว และลดโอกาสเป็นซ้ำหรือแพร่กระจาย การเปลี่ยนแปลงของผิวมักไม่หายในวันเดียว จึงต้องติดตามการตอบสนองสักระยะ`,
      treatment: `${d.treat.th} ใช้ยาตามคำแนะนำของแพทย์ และอย่าเปลี่ยนยาเอง`,
      homeCare: `${d.care.th} หลีกเลี่ยงการเกา แกะ หรือถูแรง ๆ`,
      warning: `${d.warn.th} ${languageText.th.urgent}`,
      followUp: `${d.follow.th} ${languageText.th.follow}`
    })
  },
  ja: {
    contagiousYes: "体のほかの部位や、ほかの人にうつることがあります。",
    contagiousNo: "通常、人にうつる病気ではありません。",
    chronic: "治療には時間がかかることがあり、少しずつ調整します。",
    follow: "治療を調整するため、医師の指示どおり再診してください。",
    urgent: "強い痛み、赤みや腫れの拡大、膿、発熱、息苦しさ、薬のアレルギー症状があれば早めに受診してください。",
    template: (d) => ({
      summary: `あなたの皮膚の状態は「${d.names.ja}」です。`,
      explanation: `${d.explain.ja} ${d.contagious ? languageText.ja.contagiousYes : languageText.ja.contagiousNo} 治療の目的は、症状を抑え、皮膚の回復を助け、再発や広がりを減らすことです。皮膚の変化は通常1日で消えるものではないため、しばらく経過を見ながら調整します。`,
      treatment: `${d.treat.ja} 薬は医師の指示どおり使い、自己判断で変更しないでください。`,
      homeCare: `${d.care.ja} かいたり、つぶしたり、強くこすったりしないでください。`,
      warning: `${d.warn.ja} ${languageText.ja.urgent}`,
      followUp: `${d.follow.ja} ${languageText.ja.follow}`
    })
  },
  ko: {
    contagiousYes: "몸의 다른 부위나 다른 사람에게 옮을 수 있습니다.",
    contagiousNo: "이 상태는 보통 전염되지 않습니다.",
    chronic: "치료에는 시간이 걸릴 수 있고 단계적으로 조절해야 합니다.",
    follow: "치료 조절을 위해 의사가 정한 일정에 맞춰 다시 내원해 주세요.",
    urgent: "통증이 심하거나 붉음과 부기가 퍼짐, 고름, 발열, 호흡곤란, 약물 알레르기 증상이 있으면 더 일찍 내원하세요.",
    template: (d) => ({
      summary: `당신의 피부 상태는 ${d.names.ko}입니다.`,
      explanation: `${d.explain.ko} ${d.contagious ? languageText.ko.contagiousYes : languageText.ko.contagiousNo} 치료의 목표는 증상을 줄이고 피부 회복을 돕고 재발이나 번짐을 낮추는 것입니다. 피부 변화는 보통 하루 만에 없어지지 않으므로 일정 기간 반응을 보며 조절해야 합니다.`,
      treatment: `${d.treat.ko} 약은 의사의 지시에 따라 사용하고 임의로 바꾸지 마세요.`,
      homeCare: `${d.care.ko} 긁거나 짜거나 세게 문지르지 마세요.`,
      warning: `${d.warn.ko} ${languageText.ko.urgent}`,
      followUp: `${d.follow.ko} ${languageText.ko.follow}`
    })
  }
};

function makeZh(d) {
  return {
    summary: `你的皮膚狀況是${d.titleZh}。`,
    explanation: `${d.zhExplain}${d.contagious ? "這個狀況可能傳染給自己身體其他部位，也可能傳染給別人。" : "這個狀況通常不會傳染給別人。"}治療目標是減少症狀、讓皮膚穩定修復，並降低復發或擴散機會。皮膚變化通常不會一天就完全消失，需要觀察一段時間再依反應調整。`,
    treatment: `${d.zhTreat}請依照醫師指示使用藥物，不要自行加量、停藥或混用來路不明的藥。`,
    homeCare: `${d.zhCare}請避免搔抓、摳挖或過度清潔，以免刺激皮膚或造成感染。`,
    warning: `${d.zhWarn}如果疼痛明顯、紅腫擴大、化膿、發燒、呼吸不適或懷疑藥物過敏，請提早回診或就醫。`,
    followUp: `${d.zhFollow}請依醫師安排定期回診，讓治療可以依反應調整。`
  };
}

function makeCondition(d) {
  const translations = {};
  Object.keys(languageText).forEach((lang) => {
    translations[lang] = d.customTranslations?.[lang] || languageText[lang].template(d);
  });

  return {
    id: d.id,
    category: d.category,
    titleZh: d.titleZh,
    severity: d.severity,
    tags: d.tags,
    contagious: d.contagious,
    typicalFollowUp: d.typicalFollowUp,
    zh: d.customZh || makeZh(d),
    translations
  };
}

function commonExplain(names, cause) {
  return {
    id: `${names.id} biasanya berkaitan dengan ${cause.id}.`,
    en: `${names.en} is usually related to ${cause.en}.`,
    vi: `${names.vi} thường liên quan đến ${cause.vi}.`,
    th: `${names.th} มักเกี่ยวข้องกับ${cause.th}`,
    ja: `${names.ja}は、通常${cause.ja}と関係します。`,
    ko: `${names.ko}은 보통 ${cause.ko}와 관련이 있습니다.`
  };
}

function commonTreat(kind) {
  return {
    id: `Pengobatan dapat berupa ${kind.id}.`,
    en: `Treatment may include ${kind.en}.`,
    vi: `Điều trị có thể gồm ${kind.vi}.`,
    th: `การรักษาอาจรวมถึง${kind.th}`,
    ja: `治療は${kind.ja}などです。`,
    ko: `치료는 ${kind.ko} 등이 포함될 수 있습니다.`
  };
}

function commonCare(care) {
  return {
    id: care.id,
    en: care.en,
    vi: care.vi,
    th: care.th,
    ja: care.ja,
    ko: care.ko
  };
}

function commonWarn(warn) {
  return {
    id: warn.id,
    en: warn.en,
    vi: warn.vi,
    th: warn.th,
    ja: warn.ja,
    ko: warn.ko
  };
}

function commonFollow(follow) {
  return {
    id: follow.id,
    en: follow.en,
    vi: follow.vi,
    th: follow.th,
    ja: follow.ja,
    ko: follow.ko
  };
}

const causes = {
  pore: { id: "pori tersumbat, minyak kulit, bakteri, dan peradangan", en: "blocked pores, skin oil, bacteria, and inflammation", vi: "tắc lỗ chân lông, dầu da, vi khuẩn và viêm", th: "รูขุมขนอุดตัน ความมัน แบคทีเรีย และการอักเสบ", ja: "毛穴の詰まり、皮脂、細菌、炎症", ko: "모공 막힘, 피지, 세균, 염증" },
  bacteria: { id: "infeksi bakteri pada kulit atau folikel rambut", en: "bacterial infection of the skin or hair follicles", vi: "nhiễm khuẩn da hoặc nang lông", th: "การติดเชื้อแบคทีเรียที่ผิวหนังหรือรูขุมขน", ja: "皮膚や毛包の細菌感染", ko: "피부 또는 모낭의 세균 감염" },
  inflammation: { id: "peradangan kulit dan reaksi kulit yang terlalu sensitif", en: "skin inflammation and an overactive skin reaction", vi: "viêm da và phản ứng da quá nhạy", th: "การอักเสบของผิวและผิวไวเกิน", ja: "皮膚の炎症と過敏な反応", ko: "피부 염증과 과민한 피부 반응" },
  fungus: { id: "infeksi jamur pada kulit atau kuku", en: "fungal infection of the skin or nails", vi: "nhiễm nấm da hoặc móng", th: "การติดเชื้อราที่ผิวหนังหรือเล็บ", ja: "皮膚や爪の真菌感染", ko: "피부 또는 손발톱의 진균 감염" },
  virus: { id: "infeksi virus pada kulit", en: "a viral infection of the skin", vi: "nhiễm vi-rút ở da", th: "การติดเชื้อไวรัสที่ผิวหนัง", ja: "皮膚のウイルス感染", ko: "피부 바이러스 감염" },
  allergy: { id: "reaksi alergi atau pelepasan histamin", en: "allergy-like reactions or histamine release", vi: "phản ứng dị ứng hoặc phóng thích histamine", th: "ปฏิกิริยาคล้ายภูมิแพ้หรือการหลั่งฮิสตามีน", ja: "アレルギー反応やヒスタミンの放出", ko: "알레르기 반응 또는 히스타민 분비" },
  pigment: { id: "perubahan pigmen kulit yang jinak", en: "benign changes in skin pigment", vi: "thay đổi sắc tố da lành tính", th: "การเปลี่ยนแปลงเม็ดสีผิวที่ไม่ร้ายแรง", ja: "良性の皮膚色素の変化", ko: "양성 피부 색소 변화" },
  hair: { id: "perubahan siklus rambut, hormon, atau peradangan", en: "hair-cycle changes, hormones, or inflammation", vi: "thay đổi chu kỳ tóc, nội tiết hoặc viêm", th: "วงจรเส้นผม ฮอร์โมน หรือการอักเสบ", ja: "毛周期、ホルモン、炎症", ko: "모발 주기, 호르몬 또는 염증 변화" },
  procedure: { id: "perawatan kulit yang sedang Anda jalani", en: "the skin treatment you are receiving", vi: "điều trị da bạn đang được thực hiện", th: "การรักษาผิวหนังที่คุณได้รับ", ja: "現在受けている皮膚治療", ko: "현재 받고 있는 피부 치료" }
};

const treatmentKinds = {
  acne: { id: "obat oles, pembersih yang sesuai, dan kadang obat minum", en: "topical medicine, suitable cleansing, and sometimes oral medicine", vi: "thuốc bôi, làm sạch phù hợp và đôi khi thuốc uống", th: "ยาทา การทำความสะอาดที่เหมาะสม และบางครั้งมียากิน", ja: "外用薬、適切な洗顔、必要に応じた内服薬", ko: "바르는 약, 적절한 세안, 필요 시 먹는 약" },
  antibiotic: { id: "antibiotik oles atau minum sesuai tingkat keparahan", en: "topical or oral antibiotics depending on severity", vi: "kháng sinh bôi hoặc uống tùy mức độ", th: "ยาปฏิชีวนะแบบทาหรือกินตามความรุนแรง", ja: "重症度に応じた外用または内服抗菌薬", ko: "중증도에 따른 바르는 또는 먹는 항생제" },
  antiInflammatory: { id: "obat antiradang, pelembap, dan menghindari pencetus", en: "anti-inflammatory medicine, moisturizers, and avoiding triggers", vi: "thuốc giảm viêm, dưỡng ẩm và tránh yếu tố kích phát", th: "ยาลดการอักเสบ มอยส์เจอไรเซอร์ และหลีกเลี่ยงสิ่งกระตุ้น", ja: "炎症を抑える薬、保湿、誘因の回避", ko: "염증 완화 약, 보습제, 유발 요인 회피" },
  antiviral: { id: "obat antivirus dan obat nyeri bila diperlukan", en: "antiviral medicine and pain control if needed", vi: "thuốc kháng vi-rút và thuốc giảm đau nếu cần", th: "ยาต้านไวรัสและยาแก้ปวดเมื่อจำเป็น", ja: "抗ウイルス薬と必要に応じた鎮痛", ko: "항바이러스제와 필요 시 통증 조절" },
  antifungal: { id: "obat antijamur oles atau minum sesuai lokasi dan beratnya", en: "topical or oral antifungal medicine depending on site and severity", vi: "thuốc kháng nấm bôi hoặc uống tùy vị trí và mức độ", th: "ยาต้านเชื้อราแบบทาหรือกินตามตำแหน่งและความรุนแรง", ja: "部位と重症度に応じた外用または内服抗真菌薬", ko: "부위와 중증도에 따른 바르는 또는 먹는 항진균제" },
  antihistamine: { id: "antihistamin dan mencari kemungkinan pencetus", en: "antihistamines and checking possible triggers", vi: "thuốc kháng histamine và tìm yếu tố kích phát", th: "ยาแก้แพ้และการหาสิ่งกระตุ้นที่เป็นไปได้", ja: "抗ヒスタミン薬と誘因の確認", ko: "항히스타민제와 가능한 유발 요인 확인" },
  observe: { id: "pemantauan, perlindungan kulit, atau tindakan bila mengganggu", en: "observation, skin protection, or treatment if it bothers you", vi: "theo dõi, bảo vệ da hoặc xử trí nếu gây khó chịu", th: "การสังเกต ปกป้องผิว หรือรักษาหากรบกวน", ja: "経過観察、皮膚保護、気になる場合の処置", ko: "경과 관찰, 피부 보호, 불편할 경우 치료" },
  procedure: { id: "perawatan lokal dan perawatan luka setelah tindakan", en: "local treatment and wound care after the procedure", vi: "điều trị tại chỗ và chăm sóc vết thương sau thủ thuật", th: "การรักษาเฉพาะที่และการดูแลแผลหลังหัตถการ", ja: "局所治療と処置後の創傷ケア", ko: "국소 치료와 시술 후 상처 관리" }
};

const careBasic = commonCare({
  id: "Jaga kulit tetap bersih dan lembap dengan produk yang lembut.",
  en: "Keep the skin clean and moisturized with gentle products.",
  vi: "Giữ da sạch và đủ ẩm bằng sản phẩm dịu nhẹ.",
  th: "รักษาผิวให้สะอาดและชุ่มชื้นด้วยผลิตภัณฑ์อ่อนโยน",
  ja: "低刺激の製品で皮膚を清潔にし、保湿してください。",
  ko: "순한 제품으로 피부를 깨끗하고 촉촉하게 유지하세요."
});

const careDry = commonCare({
  id: "Gunakan pelembap secara teratur dan hindari sabun yang keras, air panas, serta keringat berlebihan.",
  en: "Use moisturizer regularly and avoid harsh soap, hot water, and excessive sweating.",
  vi: "Dưỡng ẩm đều đặn, tránh xà phòng mạnh, nước nóng và đổ mồ hôi quá nhiều.",
  th: "ใช้มอยส์เจอไรเซอร์สม่ำเสมอ หลีกเลี่ยงสบู่แรง น้ำร้อน และเหงื่อมาก",
  ja: "保湿を続け、強い石けん、熱いお湯、過度の汗を避けてください。",
  ko: "보습제를 규칙적으로 바르고 강한 비누, 뜨거운 물, 과도한 땀을 피하세요."
});

const careInfection = commonCare({
  id: "Tutup area bila mudah bergesekan, jangan berbagi handuk, dan cuci tangan setelah menyentuh area tersebut.",
  en: "Cover areas that rub easily, do not share towels, and wash your hands after touching the area.",
  vi: "Che vùng dễ cọ xát, không dùng chung khăn và rửa tay sau khi chạm vào vùng bệnh.",
  th: "ปิดบริเวณที่เสียดสีง่าย ไม่ใช้ผ้าเช็ดตัวร่วมกัน และล้างมือหลังสัมผัส",
  ja: "こすれやすい部位は保護し、タオルを共有せず、触れた後は手を洗ってください。",
  ko: "마찰이 쉬운 부위는 덮고 수건을 함께 쓰지 말며 만진 뒤 손을 씻으세요."
});

const warnBasic = commonWarn({
  id: "Sebagian iritasi ringan dapat terjadi pada awal pengobatan.",
  en: "Mild irritation can happen at the beginning of treatment.",
  vi: "Kích ứng nhẹ có thể xảy ra lúc mới điều trị.",
  th: "อาจมีการระคายเคืองเล็กน้อยในช่วงเริ่มรักษา",
  ja: "治療開始時に軽い刺激感が出ることがあります。",
  ko: "치료 초기에 가벼운 자극이 생길 수 있습니다."
});

const followWeeks = commonFollow({
  id: "Biasanya kontrol dalam 2 sampai 4 minggu, tergantung kondisi.",
  en: "Follow-up is usually in 2 to 4 weeks, depending on the condition.",
  vi: "Thường tái khám sau 2 đến 4 tuần, tùy tình trạng.",
  th: "โดยทั่วไปนัดติดตามใน 2 ถึง 4 สัปดาห์ ตามอาการ",
  ja: "通常は状態により2から4週間で再診します。",
  ko: "보통 상태에 따라 2-4주 후 다시 진료합니다."
});

const followLong = commonFollow({
  id: "Karena mudah kambuh atau berlangsung lama, kontrol teratur penting.",
  en: "Because it may recur or last a long time, regular follow-up is important.",
  vi: "Vì bệnh có thể tái phát hoặc kéo dài, tái khám đều rất quan trọng.",
  th: "เพราะอาจเป็นซ้ำหรือเรื้อรัง การติดตามสม่ำเสมอจึงสำคัญ",
  ja: "再発や長期化があるため、定期的な再診が大切です。",
  ko: "재발하거나 오래갈 수 있어 정기적인 추적 진료가 중요합니다."
});

function item(id, category, titleZh, names, cause, treat, options = {}) {
  return makeCondition({
    id,
    category,
    titleZh,
    severity: options.severity || "常見皮膚問題",
    tags: options.tags || [titleZh],
    contagious: Boolean(options.contagious),
    typicalFollowUp: options.typicalFollowUp || "通常 2 到 4 週回診一次，依嚴重度調整。",
    names,
    explain: options.explain || commonExplain(names, cause),
    treat: options.treat || commonTreat(treat),
    care: options.care || careBasic,
    warn: options.warn || warnBasic,
    follow: options.follow || followWeeks,
    zhExplain: options.zhExplain || `這通常和${options.zhCause || "皮膚發炎、感染或屏障受損"}有關。`,
    zhTreat: options.zhTreat || "治療可能包含外用藥、口服藥、局部處置或保養調整。",
    zhCare: options.zhCare || "請保持皮膚清潔，使用溫和產品與適當保濕。",
    zhWarn: options.zhWarn || "治療初期可能有輕微刺激或症狀起伏。",
    zhFollow: options.zhFollow || "通常需要數週觀察反應。",
    customZh: options.customZh,
    customTranslations: options.customTranslations
  });
}

const conditionTemplates = [
  item("acne_vulgaris", "痤瘡與毛囊相關疾病", "青春痘／痤瘡", { id: "jerawat", en: "acne", vi: "mụn trứng cá", th: "สิว", ja: "にきび", ko: "여드름" }, causes.pore, treatmentKinds.acne, { severity: "常見慢性皮膚病", tags: ["青春痘", "痤瘡", "粉刺", "毛囊", "發炎", "外用藥"], zhCause: "毛孔阻塞、皮脂分泌、細菌與發炎反應", zhTreat: "治療可能包含外用藥、口服藥與清潔保養調整。外用藥一開始可能乾燥、脫皮或刺刺的，通常會逐漸適應。", zhCare: "請避免擠痘痘，避免過度清潔，使用溫和洗面乳與不易阻塞毛孔的保濕產品。", zhFollow: "青春痘治療通常需要數週到數月。" }),
  item("folliculitis", "痤瘡與毛囊相關疾病", "毛囊炎", { id: "folikulitis", en: "folliculitis", vi: "viêm nang lông", th: "รูขุมขนอักเสบ", ja: "毛嚢炎", ko: "모낭염" }, causes.bacteria, treatmentKinds.antibiotic, { tags: ["毛囊炎", "毛囊", "膿皰", "抗生素"], contagious: true, care: careInfection, zhCause: "毛囊受到細菌、摩擦、悶熱或刮毛刺激", zhTreat: "治療可能包含外用抗生素、消炎藥，嚴重時可能需要口服抗生素。" }),
  item("bacterial_pustules", "痤瘡與毛囊相關疾病", "細菌感染的膿皰", { id: "bintil bernanah karena bakteri", en: "bacterial pustules", vi: "mụn mủ do vi khuẩn", th: "ตุ่มหนองจากแบคทีเรีย", ja: "細菌性膿疱", ko: "세균성 농포" }, causes.bacteria, treatmentKinds.antibiotic, { tags: ["細菌", "膿皰", "化膿", "抗生素"], contagious: true, care: careInfection, zhCause: "皮膚表層細菌感染與局部發炎", zhTreat: "治療會依範圍與嚴重度使用外用或口服抗生素。" }),
  item("keratosis_pilaris", "痤瘡與毛囊相關疾病", "毛孔角化症", { id: "keratosis pilaris", en: "keratosis pilaris", vi: "dày sừng nang lông", th: "ขนคุดผิวหนัง", ja: "毛孔性苔癬", ko: "모공각화증" }, causes.inflammation, treatmentKinds.observe, { tags: ["毛孔角化", "雞皮", "保濕", "角質"], severity: "常見良性皮膚變化", care: careDry, zhCause: "毛孔角質堆積與皮膚乾燥體質", zhTreat: "治療以保濕、溫和去角質或角質調理外用藥為主，不一定能完全根除。", zhWarn: "過度搓洗或用力去角質反而可能更紅、更粗糙。" }),
  item("inflamed_epidermal_cyst", "痤瘡與毛囊相關疾病", "皮脂腺囊腫／表皮囊腫發炎", { id: "kista epidermal yang meradang", en: "inflamed epidermal cyst", vi: "nang biểu bì bị viêm", th: "ซีสต์ผิวหนังอักเสบ", ja: "炎症性表皮嚢腫", ko: "염증성 표피낭종" }, causes.inflammation, treatmentKinds.procedure, { tags: ["皮脂腺囊腫", "表皮囊腫", "發炎", "切開", "抗生素"], zhCause: "囊腫內容物刺激或合併感染發炎", zhTreat: "治療可能包含消炎藥、抗生素、切開引流，穩定後才評估是否完整切除。" }),

  item("rosacea", "慢性發炎性皮膚病", "酒糟／玫瑰斑", { id: "rosacea", en: "rosacea", vi: "trứng cá đỏ", th: "โรซาเซีย", ja: "酒さ", ko: "주사 피부염" }, causes.inflammation, treatmentKinds.antiInflammatory, { severity: "常見慢性發炎性皮膚病", tags: ["酒糟", "玫瑰斑", "臉紅", "丘疹", "敏感"], follow: followLong, care: commonCare({ id: "Hindari pemicu seperti panas, alkohol, makanan pedas, sinar matahari, dan produk yang menyengat.", en: "Avoid triggers such as heat, alcohol, spicy food, sunlight, and stinging products.", vi: "Tránh nóng, rượu, đồ cay, nắng và sản phẩm gây châm chích.", th: "หลีกเลี่ยงความร้อน แอลกอฮอล์ อาหารเผ็ด แดด และผลิตภัณฑ์ที่แสบผิว", ja: "熱、アルコール、辛い食べ物、日光、しみる製品を避けてください。", ko: "열, 술, 매운 음식, 햇빛, 따가운 제품을 피하세요." }), zhCause: "臉部血管反應、皮膚敏感與發炎", zhCare: "請防曬，避免酒精、辛辣、悶熱、三溫暖與刺激性保養品。" }),
  item("psoriasis", "慢性發炎性皮膚病", "乾癬", { id: "psoriasis", en: "psoriasis", vi: "vảy nến", th: "สะเก็ดเงิน", ja: "乾癬", ko: "건선" }, causes.inflammation, treatmentKinds.antiInflammatory, { severity: "慢性免疫相關皮膚病", tags: ["乾癬", "脫屑", "免疫", "慢性", "類固醇"], follow: followLong, zhCause: "免疫反應造成皮膚更新過快與發炎", zhTreat: "治療可能包含外用藥、照光、口服或注射藥物，依嚴重度調整。", zhWarn: "若有關節疼痛、指甲變形或皮疹快速惡化，請告知醫師。" }),
  item("atopic_dermatitis", "慢性發炎性皮膚病", "異位性皮膚炎", { id: "dermatitis atopik", en: "atopic dermatitis", vi: "viêm da cơ địa", th: "ผื่นภูมิแพ้ผิวหนัง", ja: "アトピー性皮膚炎", ko: "아토피 피부염" }, causes.inflammation, treatmentKinds.antiInflammatory, { severity: "慢性反覆皮膚炎", tags: ["異位性皮膚炎", "濕疹", "癢", "保濕", "類固醇"], follow: followLong, care: careDry, zhCause: "皮膚屏障較弱、過敏體質與發炎反應", zhCare: "請規律保濕，洗澡水不要太熱，避免香精、粗糙衣物與已知誘發因子。" }),
  item("eczema", "慢性發炎性皮膚病", "濕疹", { id: "eksim", en: "eczema", vi: "chàm", th: "ผื่นผิวหนังอักเสบ", ja: "湿疹", ko: "습진" }, causes.inflammation, treatmentKinds.antiInflammatory, { tags: ["濕疹", "皮膚炎", "癢", "外用藥", "保濕"], care: careDry, zhCause: "皮膚屏障受損、刺激物、過敏或乾燥", zhTreat: "治療通常包含外用消炎藥與保濕修復。" }),
  item("seborrheic_dermatitis", "慢性發炎性皮膚病", "脂漏性皮膚炎", { id: "dermatitis seboroik", en: "seborrheic dermatitis", vi: "viêm da tiết bã", th: "ผื่นผิวหนังอักเสบเซ็บเดิร์ม", ja: "脂漏性皮膚炎", ko: "지루성 피부염" }, causes.inflammation, treatmentKinds.antiInflammatory, { tags: ["脂漏", "頭皮屑", "臉部", "發炎", "黴菌"], follow: followLong, zhCause: "皮脂分泌、皮膚發炎與皮屑芽孢菌相關反應", zhTreat: "治療可能包含抗黴菌洗劑、外用消炎藥或頭皮藥水。", zhCare: "請規律使用醫師建議的洗劑，不要過度搔抓頭皮或臉部。" }),
  item("dyshidrotic_eczema", "慢性發炎性皮膚病", "汗皰疹", { id: "eksim dishidrotik", en: "dyshidrotic eczema", vi: "chàm tổ đỉa", th: "ผื่นตุ่มน้ำที่มือเท้า", ja: "汗疱", ko: "한포진" }, causes.inflammation, treatmentKinds.antiInflammatory, { tags: ["汗皰疹", "手", "腳", "水泡", "癢"], care: careDry, zhCause: "手腳皮膚發炎、汗水悶熱、刺激物或壓力", zhWarn: "水泡破掉後要避免感染，若明顯疼痛、流膿或紅腫擴大請提早回診。" }),
  item("contact_dermatitis", "慢性發炎性皮膚病", "接觸性皮膚炎", { id: "dermatitis kontak", en: "contact dermatitis", vi: "viêm da tiếp xúc", th: "ผื่นแพ้สัมผัส", ja: "接触皮膚炎", ko: "접촉피부염" }, causes.allergy, treatmentKinds.antiInflammatory, { tags: ["接觸性皮膚炎", "過敏", "刺激", "類固醇"], care: commonCare({ id: "Coba hentikan benda yang dicurigai, seperti krim baru, plester, logam, pewarna rambut, atau sarung tangan.", en: "Try stopping suspected triggers such as new creams, tapes, metals, hair dye, or gloves.", vi: "Ngưng thử các yếu tố nghi ngờ như kem mới, băng keo, kim loại, thuốc nhuộm tóc hoặc găng tay.", th: "ลองหยุดสิ่งที่สงสัย เช่น ครีมใหม่ เทป โลหะ ยาย้อมผม หรือถุงมือ", ja: "新しいクリーム、テープ、金属、染毛剤、手袋など疑わしい物を避けてください。", ko: "새 크림, 테이프, 금속, 염색약, 장갑 등 의심되는 물질을 피하세요." }), zhCause: "皮膚接觸刺激物或過敏原後產生發炎", zhCare: "請暫停可疑的新保養品、藥膏、貼布、金屬、染髮劑或手套。" }),

  item("herpes_zoster", "病毒感染", "帶狀皰疹", { id: "herpes zoster", en: "shingles", vi: "zona thần kinh", th: "งูสวัด", ja: "帯状疱疹", ko: "대상포진" }, causes.virus, treatmentKinds.antiviral, { tags: ["帶狀皰疹", "水泡", "疼痛", "抗病毒"], contagious: true, zhCause: "水痘病毒再活化，常伴隨單側疼痛與水泡", zhTreat: "治療以抗病毒藥物與疼痛控制為主，越早治療越好。", zhCare: "請保持水泡乾淨，避免接觸孕婦、嬰兒或免疫力低下者。" }),
  item("herpes_simplex", "病毒感染", "單純性皰疹", { id: "herpes simpleks", en: "herpes simplex", vi: "herpes simplex", th: "เริม", ja: "単純ヘルペス", ko: "단순포진" }, causes.virus, treatmentKinds.antiviral, { tags: ["單純皰疹", "唇皰疹", "水泡", "抗病毒"], contagious: true, follow: followLong, zhCause: "單純皰疹病毒感染，可能在疲累、壓力或免疫下降時復發", zhCare: "水泡或破皮時請避免親吻、共用餐具或接觸他人黏膜。" }),
  item("viral_warts", "病毒感染", "病毒疣", { id: "kutil karena virus", en: "viral warts", vi: "mụn cóc do vi-rút", th: "หูดจากไวรัส", ja: "ウイルス性いぼ", ko: "바이러스 사마귀" }, causes.virus, treatmentKinds.procedure, {
    tags: ["病毒疣", "疣", "冷凍", "傳染", "七天", "健保"], contagious: true, typicalFollowUp: "台灣健保下，冷凍治療通常每七天可以做一次，請依醫師安排回診。",
    customZh: {
      summary: "你的皮膚狀況是病毒疣，這是病毒感染造成的疣。",
      explanation: "它可能會傳染給自己身體其他部位，也可能傳染給別人。不要摳、剪、刮或自行挖除，這樣可能讓病毒擴散或造成傷口感染。",
      treatment: "冷凍治療就是用很低溫的液態氮把疣冷凍破壞。醫師會用噴霧或棉棒把液態氮點在疣上，當下會刺痛或灼熱幾秒鐘。治療後可能會紅腫、疼痛、起水泡或結痂，這些通常是正常反應。因為病毒疣可能長得比較深，也可能有看不見的小病灶，所以通常要重複治療好幾次，不一定一次就會好。在台灣健保下，冷凍治療通常每七天可以做一次，請依醫師安排治療。",
      homeCare: "治療後請保持局部清潔乾燥，不要自行撕掉水泡皮或痂皮。若在手腳，請避免共用毛巾、指甲剪或直接接觸他人傷口。",
      warning: "治療後可能會紅腫、疼痛、起水泡或結痂。如果疼痛嚴重、感染、流膿或紅腫擴大，請提早回診。",
      followUp: "病毒疣常需要規律治療數週到數月，請依醫師安排定期回診。"
    },
    customTranslations: {
      id: { summary: "Kondisi kulit Anda adalah kutil karena virus.", explanation: "Ini adalah kutil yang disebabkan oleh infeksi virus. Kutil dapat menyebar ke bagian tubuh lain atau menular ke orang lain. Jangan dikorek, dipotong, dicukur, atau dicabut sendiri.", treatment: "Terapi beku menggunakan nitrogen cair bersuhu sangat rendah untuk membekukan dan merusak kutil. Dokter akan menyemprotkan atau menempelkan nitrogen cair dengan kapas pada kutil; biasanya terasa perih, panas, atau nyeri selama beberapa detik. Setelah terapi dapat muncul merah, bengkak, nyeri, lepuh, atau keropeng, dan ini biasanya reaksi normal. Karena kutil bisa lebih dalam atau ada bagian kecil yang belum terlihat, terapi biasanya perlu diulang beberapa kali dan belum tentu hilang dalam satu kali terapi. Di bawah sistem Asuransi Kesehatan Nasional Taiwan, terapi beku biasanya dapat dilakukan setiap 7 hari.", homeCare: "Setelah terapi, jaga area tetap bersih dan kering. Jangan mengelupas lepuh atau keropeng sendiri. Jangan berbagi handuk atau gunting kuku.", warning: "Setelah terapi dapat muncul merah, bengkak, nyeri, lepuh, atau keropeng. Jika nyeri berat, terinfeksi, bernanah, atau kemerahan makin luas, kontrol lebih awal.", followUp: "Silakan kontrol teratur sesuai jadwal dokter karena kutil sering membutuhkan beberapa kali terapi." },
      en: { summary: "Your skin condition is viral warts.", explanation: "These warts are caused by a viral infection. They can spread to other parts of your body and may spread to other people. Do not pick, cut, shave, or dig them out by yourself.", treatment: "Cryotherapy uses very cold liquid nitrogen to freeze and destroy the wart. The doctor will spray liquid nitrogen onto the wart or apply it with a cotton swab; you may feel stinging, burning, or aching for a few seconds. After treatment, redness, swelling, pain, blisters, or scabs may occur, and these are usually normal reactions. Because viral warts may be deeper or may have small areas that are not easy to see, treatment usually needs to be repeated several times and may not clear with only one treatment. Under Taiwan's National Health Insurance, cryotherapy can usually be done once every 7 days.", homeCare: "After treatment, keep the area clean and dry. Do not peel off blisters or scabs by yourself. Avoid sharing towels or nail clippers.", warning: "After treatment, redness, swelling, pain, blisters, or scabs may occur. Come back earlier if pain is severe, infection develops, pus appears, or redness and swelling spread.", followUp: "Please return regularly as arranged, because viral warts often need several treatments over weeks to months." },
      vi: { summary: "Tình trạng da của bạn là mụn cóc do vi-rút.", explanation: "Đây là mụn cóc do nhiễm vi-rút. Nó có thể lan sang vùng da khác của bạn hoặc lây cho người khác. Không tự cạy, cắt, cạo hoặc đào bỏ.", treatment: "Điều trị áp lạnh dùng nitơ lỏng rất lạnh để làm đông và phá hủy mụn cóc. Bác sĩ sẽ xịt nitơ lỏng lên mụn cóc hoặc chấm bằng tăm bông; lúc đó có thể châm chích, nóng rát hoặc đau trong vài giây. Sau điều trị có thể đỏ, sưng, đau, nổi bóng nước hoặc đóng mài, thường là phản ứng bình thường. Vì mụn cóc có thể ăn sâu hơn hoặc có vùng nhỏ chưa nhìn thấy rõ, điều trị thường cần làm nhiều lần, không nhất thiết khỏi sau một lần. Theo Bảo hiểm Y tế Quốc gia tại Đài Loan, áp lạnh thường có thể làm mỗi 7 ngày một lần.", homeCare: "Sau điều trị, giữ vùng da sạch và khô. Không tự bóc bóng nước hoặc mài. Tránh dùng chung khăn hoặc kềm cắt móng.", warning: "Sau điều trị có thể đỏ, sưng, đau, nổi bóng nước hoặc đóng mài. Nếu đau nhiều, nhiễm trùng, chảy mủ hoặc đỏ sưng lan rộng, hãy tái khám sớm.", followUp: "Vui lòng tái khám đều theo lịch bác sĩ, vì mụn cóc thường cần nhiều lần điều trị trong vài tuần đến vài tháng." },
      th: { summary: "ปัญหาผิวหนังของคุณคือหูดจากไวรัส", explanation: "หูดนี้เกิดจากการติดเชื้อไวรัส อาจแพร่ไปยังผิวหนังส่วนอื่นของคุณหรือแพร่ให้ผู้อื่นได้ อย่าแกะ ตัด โกน หรือขุดออกเอง", treatment: "การจี้เย็นคือการใช้ไนโตรเจนเหลวที่เย็นมากเพื่อแช่แข็งและทำลายหูด แพทย์จะพ่นไนโตรเจนเหลวลงบนหูด หรือแต้มด้วยก้านสำลี ระหว่างทำอาจแสบ ร้อน หรือปวดไม่กี่วินาที หลังรักษาอาจแดง บวม ปวด เป็นตุ่มน้ำ หรือเป็นสะเก็ด ซึ่งมักเป็นปฏิกิริยาปกติ เพราะหูดอาจอยู่ลึกหรือมีรอยโรคเล็ก ๆ ที่ยังมองไม่ชัด จึงมักต้องทำซ้ำหลายครั้ง และไม่จำเป็นต้องหายในครั้งเดียว ภายใต้ระบบประกันสุขภาพแห่งชาติไต้หวัน โดยทั่วไปสามารถจี้เย็นได้ทุก 7 วัน", homeCare: "หลังรักษาให้รักษาบริเวณนั้นให้สะอาดและแห้ง อย่าลอกตุ่มน้ำหรือสะเก็ดเอง หลีกเลี่ยงการใช้ผ้าเช็ดตัวหรือกรรไกรตัดเล็บร่วมกัน", warning: "หลังรักษาอาจแดง บวม ปวด เป็นตุ่มน้ำ หรือเป็นสะเก็ด หากปวดมาก ติดเชื้อ มีหนอง หรือแดงบวมลาม ควรมาพบแพทย์ก่อนนัด", followUp: "กรุณามาตรวจตามนัดสม่ำเสมอ เพราะหูดมักต้องรักษาหลายครั้งในช่วงหลายสัปดาห์ถึงหลายเดือน" },
      ja: { summary: "あなたの皮膚の状態はウイルス性いぼです。", explanation: "これはウイルス感染によってできるいぼです。自分の体のほかの部位や、ほかの人にうつることがあります。自分でむしる、切る、削る、掘り取ることはしないでください。", treatment: "冷凍療法は、とても低温の液体窒素でいぼを凍らせて壊す治療です。医師がスプレーまたは綿棒で液体窒素をいぼに当てます。その時、数秒間しみる感じ、熱い感じ、痛みを感じることがあります。治療後に赤み、腫れ、痛み、水ぶくれ、かさぶたが出ることがあり、通常はよくある反応です。ウイルス性いぼは深いことや、まだ見えにくい小さな病変があることもあるため、何回も繰り返す必要があり、1回で治るとは限りません。台湾の国民健康保険では、通常7日に1回冷凍療法を受けられます。", homeCare: "治療後は清潔で乾いた状態を保ってください。水ぶくれやかさぶたを自分ではがさないでください。タオルや爪切りの共有は避けてください。", warning: "治療後に赤み、腫れ、痛み、水ぶくれ、かさぶたが出ることがあります。強い痛み、感染、膿、赤みや腫れの拡大があれば早めに受診してください。", followUp: "ウイルス性いぼは数週から数か月、複数回の治療が必要なことがあります。医師の指示どおり定期的に再診してください。" },
      ko: { summary: "당신의 피부 상태는 바이러스 사마귀입니다.", explanation: "이것은 바이러스 감염으로 생긴 사마귀입니다. 몸의 다른 부위나 다른 사람에게 옮을 수 있습니다. 직접 뜯거나 자르거나 밀거나 파내지 마세요.", treatment: "냉동치료는 매우 차가운 액체질소로 사마귀를 얼려서 파괴하는 치료입니다. 의사가 스프레이나 면봉으로 액체질소를 사마귀에 대며, 그 순간 몇 초 동안 따갑거나 화끈거리거나 아플 수 있습니다. 치료 후 붉어짐, 부기, 통증, 물집, 딱지가 생길 수 있고 보통은 정상적인 반응입니다. 바이러스 사마귀는 깊게 자라거나 아직 잘 보이지 않는 작은 병변이 있을 수 있어 보통 여러 번 반복해야 하며 한 번에 없어지지 않을 수 있습니다. 대만 국민건강보험에서는 보통 7일마다 한 번 냉동치료를 받을 수 있습니다.", homeCare: "치료 후에는 부위를 깨끗하고 건조하게 유지하세요. 물집이나 딱지를 스스로 떼지 마세요. 수건이나 손톱깎이를 함께 쓰지 마세요.", warning: "치료 후 붉어짐, 부기, 통증, 물집, 딱지가 생길 수 있습니다. 통증이 심하거나 감염, 고름, 붉음과 부기가 퍼지면 더 일찍 내원하세요.", followUp: "바이러스 사마귀는 수주에서 수개월 동안 여러 번 치료가 필요할 수 있으니 정기적으로 내원해 주세요." }
    }
  }),
  item("molluscum_contagiosum", "病毒感染", "傳染性軟疣", { id: "molluscum contagiosum", en: "molluscum contagiosum", vi: "u mềm lây", th: "หูดข้าวสุก", ja: "伝染性軟属腫", ko: "전염성 연속종" }, causes.virus, treatmentKinds.procedure, { tags: ["傳染性軟疣", "軟疣", "病毒", "傳染"], contagious: true, care: careInfection, zhCause: "病毒感染造成小顆、中央凹陷的丘疹", zhCare: "請避免搔抓與共用毛巾，兒童或免疫力低下者可能較容易擴散。" }),

  item("tinea_corporis_cruris", "黴菌與寄生蟲相關", "體癬／股癬", { id: "kurap badan atau selangkangan", en: "ringworm of the body or groin", vi: "hắc lào ở thân hoặc bẹn", th: "กลากที่ลำตัวหรือขาหนีบ", ja: "体部白癬／股部白癬", ko: "몸백선 또는 완선" }, causes.fungus, treatmentKinds.antifungal, { tags: ["體癬", "股癬", "黴菌", "抗黴菌"], contagious: true, care: careInfection, zhCause: "皮膚黴菌感染，常和潮濕、流汗或接觸感染源有關", zhCare: "請保持乾爽，衣物毛巾分開清洗，避免自行長期擦類固醇以免惡化。" }),
  item("tinea_pedis", "黴菌與寄生蟲相關", "香港腳／足癬", { id: "kutu air", en: "athlete's foot", vi: "nấm bàn chân", th: "ฮ่องกงฟุตหรือน้ำกัดเท้า", ja: "足白癬", ko: "무좀" }, causes.fungus, treatmentKinds.antifungal, { tags: ["香港腳", "足癬", "黴菌", "腳癢"], contagious: true, care: careInfection, zhCause: "足部黴菌感染，常和鞋襪悶熱潮濕有關", zhCare: "請保持腳趾縫乾燥，襪子每天更換，鞋子輪替通風。" }),
  item("onychomycosis", "黴菌與寄生蟲相關", "灰指甲／甲癬", { id: "jamur kuku", en: "fungal nail infection", vi: "nấm móng", th: "เชื้อราที่เล็บ", ja: "爪白癬", ko: "손발톱무좀" }, causes.fungus, treatmentKinds.antifungal, { tags: ["灰指甲", "甲癬", "黴菌", "指甲"], contagious: true, follow: followLong, zhCause: "指甲黴菌感染，治療時間通常較長", zhTreat: "治療可能包含外用或口服抗黴菌藥，口服藥需評估肝功能與交互作用。", zhFollow: "指甲長得慢，常需要數月追蹤。" }),
  item("scabies", "黴菌與寄生蟲相關", "疥瘡", { id: "kudis skabies", en: "scabies", vi: "ghẻ", th: "หิด", ja: "疥癬", ko: "옴" }, causes.inflammation, treatmentKinds.procedure, { tags: ["疥瘡", "寄生蟲", "癢", "傳染"], contagious: true, care: commonCare({ id: "Obati kontak dekat sesuai petunjuk dokter dan cuci pakaian, seprai, serta handuk dengan benar.", en: "Close contacts may need treatment; wash clothes, bedding, and towels properly.", vi: "Người tiếp xúc gần có thể cần điều trị; giặt quần áo, ga giường và khăn đúng cách.", th: "ผู้สัมผัสใกล้ชิดอาจต้องรักษาด้วย ซักเสื้อผ้า ผ้าปู และผ้าเช็ดตัวให้เหมาะสม", ja: "濃厚接触者も治療が必要なことがあります。衣類、寝具、タオルを適切に洗ってください。", ko: "밀접 접촉자도 치료가 필요할 수 있으며 옷, 침구, 수건을 적절히 세탁하세요." }), zhCause: "疥蟲寄生造成劇癢，常在夜間更癢", zhTreat: "治療需要正確塗抹藥物，密切接觸者可能也要一起處理。" }),

  item("acute_urticaria", "過敏與蕁麻疹", "急性蕁麻疹", { id: "urtikaria akut", en: "acute urticaria", vi: "mề đay cấp", th: "ลมพิษเฉียบพลัน", ja: "急性じんましん", ko: "급성 두드러기" }, causes.allergy, treatmentKinds.antihistamine, { tags: ["急性蕁麻疹", "過敏", "癢", "抗組織胺"], zhCause: "過敏、感染、食物、藥物或不明原因引起的皮膚反應", zhWarn: "若合併嘴唇舌頭腫、喘、胸悶、頭暈或全身不適，請立即就醫。" }),
  item("chronic_urticaria", "過敏與蕁麻疹", "慢性蕁麻疹", { id: "urtikaria kronis", en: "chronic urticaria", vi: "mề đay mạn tính", th: "ลมพิษเรื้อรัง", ja: "慢性じんましん", ko: "만성 두드러기" }, causes.allergy, treatmentKinds.antihistamine, { tags: ["慢性蕁麻疹", "過敏", "抗組織胺", "復發"], follow: followLong, zhCause: "皮膚肥大細胞容易被刺激而反覆起疹，很多時候找不到單一原因", zhTreat: "治療以規律使用抗組織胺與調整誘發因子為主。" }),
  item("drug_allergy_warning", "過敏與蕁麻疹", "藥物過敏警告", { id: "peringatan alergi obat", en: "drug allergy warning", vi: "cảnh báo dị ứng thuốc", th: "คำเตือนแพ้ยา", ja: "薬剤アレルギーの注意", ko: "약물 알레르기 주의" }, causes.allergy, treatmentKinds.antihistamine, { tags: ["藥物過敏", "過敏", "警訊", "立即就醫"], severity: "重要安全提醒", zhCause: "藥物可能引起皮膚疹或全身性過敏反應", zhTreat: "若懷疑藥物過敏，請停止可疑藥物並儘快聯絡醫師，嚴重症狀需立即就醫。", zhWarn: "若出現嘴唇舌頭腫、喘、發燒、眼口生殖器破皮、大片水泡或皮膚疼痛，請立即就醫。" }),
  item("insect_bite_reaction", "過敏與蕁麻疹", "昆蟲叮咬反應", { id: "reaksi gigitan serangga", en: "insect bite reaction", vi: "phản ứng do côn trùng cắn", th: "ปฏิกิริยาจากแมลงกัดต่อย", ja: "虫刺され反応", ko: "벌레 물림 반응" }, causes.allergy, treatmentKinds.antiInflammatory, { tags: ["昆蟲叮咬", "紅腫", "癢", "過敏"], zhCause: "昆蟲叮咬後的局部發炎或過敏反應", zhCare: "請避免抓破，可冰敷，戶外活動時注意防蚊蟲。" }),

  item("melasma", "色素與良性皮膚變化", "肝斑", { id: "melasma", en: "melasma", vi: "nám da", th: "ฝ้า", ja: "肝斑", ko: "기미" }, causes.pigment, treatmentKinds.observe, { tags: ["肝斑", "色素", "防曬", "淡斑"], follow: followLong, zhCause: "日曬、荷爾蒙與皮膚色素反應", zhTreat: "治療以防曬、淡斑外用藥與穩定保養為主，需要時間。", zhCare: "請每天防曬，避免反覆刺激或自行使用不明美白產品。" }),
  item("post_inflammatory_hyperpigmentation", "色素與良性皮膚變化", "發炎後色素沉澱", { id: "hiperpigmentasi setelah peradangan", en: "post-inflammatory hyperpigmentation", vi: "tăng sắc tố sau viêm", th: "รอยดำหลังการอักเสบ", ja: "炎症後色素沈着", ko: "염증 후 색소침착" }, causes.pigment, treatmentKinds.observe, { tags: ["色素沉澱", "痘疤", "發炎後", "防曬"], zhCause: "皮膚發炎後留下的暫時性色素增加", zhTreat: "治療以防曬、避免再發炎與必要時淡斑藥物為主。", zhFollow: "顏色變淡通常需要數週到數月。" }),
  item("vitiligo", "色素與良性皮膚變化", "白斑／白癜風", { id: "vitiligo", en: "vitiligo", vi: "bạch biến", th: "ด่างขาว", ja: "白斑", ko: "백반증" }, causes.pigment, treatmentKinds.antiInflammatory, { tags: ["白斑", "白癜風", "色素", "免疫"], follow: followLong, zhCause: "色素細胞功能下降，常和自體免疫反應有關", zhTreat: "治療可能包含外用藥、照光或觀察，依範圍與進展決定。" }),
  item("seborrheic_keratosis", "色素與良性皮膚變化", "脂漏性角化症", { id: "keratosis seboroik", en: "seborrheic keratosis", vi: "dày sừng tiết bã", th: "กระเนื้อ", ja: "脂漏性角化症", ko: "지루각화증" }, causes.pigment, treatmentKinds.observe, { tags: ["脂漏性角化", "老人斑", "良性", "冷凍"], severity: "常見良性皮膚腫瘤", zhCause: "常見的良性角化增生，和年齡與體質有關", zhTreat: "通常不需要治療，若摩擦、搔癢或外觀困擾，可討論冷凍、刮除或其他處置。" }),
  item("dermatofibroma", "色素與良性皮膚變化", "皮膚纖維瘤", { id: "dermatofibroma", en: "dermatofibroma", vi: "u xơ da", th: "ก้อนพังผืดผิวหนัง", ja: "皮膚線維腫", ko: "피부섬유종" }, causes.pigment, treatmentKinds.observe, { tags: ["皮膚纖維瘤", "良性", "硬塊"], severity: "常見良性皮膚結節", zhCause: "皮膚局部纖維化形成的良性小結節", zhTreat: "通常可觀察，若快速變大、疼痛、流血或診斷不確定，需再評估。" }),

  item("alopecia_areata", "頭皮與掉髮", "圓形禿", { id: "alopecia areata", en: "alopecia areata", vi: "rụng tóc từng mảng", th: "ผมร่วงเป็นหย่อม", ja: "円形脱毛症", ko: "원형탈모" }, causes.hair, treatmentKinds.antiInflammatory, { tags: ["圓形禿", "掉髮", "免疫", "頭皮"], follow: followLong, zhCause: "免疫反應影響毛囊，造成局部掉髮", zhTreat: "治療可能包含外用藥、局部注射或觀察，依範圍與進展決定。" }),
  item("androgenetic_alopecia", "頭皮與掉髮", "雄性禿", { id: "androgenetic alopecia", en: "androgenetic hair loss", vi: "rụng tóc kiểu nội tiết", th: "ผมบางจากฮอร์โมน", ja: "男性型・女性型脱毛症", ko: "안드로겐성 탈모" }, causes.hair, treatmentKinds.observe, { tags: ["雄性禿", "掉髮", "生髮水", "頭髮"], follow: followLong, zhCause: "遺傳、荷爾蒙與毛囊逐漸變細", zhTreat: "治療可能包含外用生髮藥、口服藥或其他療程，需要長期規律使用才看得到效果。" }),
  item("scalp_dandruff_sebderm", "頭皮與掉髮", "頭皮屑／頭皮脂漏性皮膚炎", { id: "ketombe atau dermatitis seboroik kulit kepala", en: "dandruff or scalp seborrheic dermatitis", vi: "gàu hoặc viêm da tiết bã da đầu", th: "รังแคหรือเซ็บเดิร์มที่หนังศีรษะ", ja: "ふけ／頭皮の脂漏性皮膚炎", ko: "비듬 또는 두피 지루피부염" }, causes.inflammation, treatmentKinds.antiInflammatory, { tags: ["頭皮屑", "脂漏", "頭皮", "洗髮精"], follow: followLong, zhCause: "頭皮皮脂、皮屑芽孢菌與發炎反應", zhTreat: "治療常使用抗屑或抗黴菌洗髮精，嚴重時加上頭皮外用藥。" }),

  item("topical_steroid_instruction", "一般治療說明", "外用類固醇使用說明", { id: "petunjuk penggunaan steroid oles", en: "topical steroid instructions", vi: "hướng dẫn dùng corticosteroid bôi", th: "คำแนะนำการใช้ยาสเตียรอยด์ทา", ja: "外用ステロイドの使い方", ko: "바르는 스테로이드 사용법" }, causes.procedure, treatmentKinds.antiInflammatory, { tags: ["外用類固醇", "藥膏", "濕疹", "乾癬"], zhCause: "外用類固醇是用來降低皮膚發炎、紅腫與搔癢的藥物", zhTreat: "請薄薄擦在發炎部位，依醫師指示的次數與天數使用，不要自行長期擦臉、皺摺或私密處。", zhWarn: "若越擦越痛、化膿、黴菌惡化或皮膚變薄，請回診調整。" }),
  item("topical_antibiotic_instruction", "一般治療說明", "外用抗生素使用說明", { id: "petunjuk penggunaan antibiotik oles", en: "topical antibiotic instructions", vi: "hướng dẫn dùng kháng sinh bôi", th: "คำแนะนำการใช้ยาปฏิชีวนะทา", ja: "外用抗菌薬の使い方", ko: "바르는 항생제 사용법" }, causes.procedure, treatmentKinds.antibiotic, { tags: ["外用抗生素", "抗生素", "感染", "膿皰"], zhCause: "外用抗生素是用來處理局部細菌感染的藥物", zhTreat: "請薄薄擦在感染或醫師指定部位，不要拿來長期保養或擦不相關的皮疹。" }),
  item("topical_antifungal_instruction", "一般治療說明", "外用抗黴菌藥使用說明", { id: "petunjuk penggunaan antijamur oles", en: "topical antifungal instructions", vi: "hướng dẫn dùng thuốc kháng nấm bôi", th: "คำแนะนำการใช้ยาต้านเชื้อราทา", ja: "外用抗真菌薬の使い方", ko: "바르는 항진균제 사용법" }, causes.procedure, treatmentKinds.antifungal, { tags: ["外用抗黴菌", "黴菌", "香港腳", "股癬"], zhCause: "外用抗黴菌藥是用來治療皮膚黴菌感染", zhTreat: "請依醫師指示規律擦藥，症狀改善後通常仍需再擦一段時間，降低復發。" }),
  item("oral_antibiotic_instruction", "一般治療說明", "口服抗生素使用說明", { id: "petunjuk antibiotik minum", en: "oral antibiotic instructions", vi: "hướng dẫn dùng kháng sinh uống", th: "คำแนะนำการกินยาปฏิชีวนะ", ja: "内服抗菌薬の使い方", ko: "먹는 항생제 복용법" }, causes.procedure, treatmentKinds.antibiotic, { tags: ["口服抗生素", "抗生素", "感染", "毛囊炎"], zhCause: "口服抗生素用來治療較明顯或範圍較大的細菌感染", zhTreat: "請依照處方時間服用，不要自行停藥或把剩藥留給下次使用。", zhWarn: "若出現嚴重腹瀉、皮疹、呼吸不適或疑似過敏，請提早就醫。" }),
  item("oral_antiviral_instruction", "一般治療說明", "口服抗病毒藥使用說明", { id: "petunjuk antivirus minum", en: "oral antiviral instructions", vi: "hướng dẫn dùng thuốc kháng vi-rút uống", th: "คำแนะนำการกินยาต้านไวรัส", ja: "内服抗ウイルス薬の使い方", ko: "먹는 항바이러스제 복용법" }, causes.procedure, treatmentKinds.antiviral, { tags: ["口服抗病毒", "抗病毒", "皰疹", "帶狀皰疹"], zhCause: "口服抗病毒藥用於皰疹類病毒感染，越早規律服用效果越好", zhTreat: "請依照處方時間完整服用，若腎功能不好或正在使用其他藥物請告知醫師。" }),
  item("cryotherapy_aftercare", "一般治療說明", "冷凍治療後照護", { id: "perawatan setelah terapi beku", en: "cryotherapy aftercare", vi: "chăm sóc sau áp lạnh", th: "การดูแลหลังจี้เย็น", ja: "冷凍療法後のケア", ko: "냉동치료 후 관리" }, causes.procedure, treatmentKinds.procedure, { tags: ["冷凍", "水泡", "結痂", "疣"], zhCause: "冷凍治療會讓病灶局部結冰，之後可能發炎、起水泡或結痂", zhTreat: "治療後請保持清潔乾燥，不要自行撕皮。若水泡很大或疼痛明顯，可回診處理。", zhWarn: "若紅腫熱痛擴大、流膿或發燒，請提早就醫。" }),
  item("wound_care_dressing", "一般治療說明", "傷口照護與換藥說明", { id: "perawatan luka dan ganti balutan", en: "wound care and dressing instructions", vi: "chăm sóc vết thương và thay băng", th: "การดูแลแผลและเปลี่ยนผ้าปิดแผล", ja: "創傷ケアと包帯交換", ko: "상처 관리와 드레싱" }, causes.procedure, treatmentKinds.procedure, { tags: ["傷口", "換藥", "感染", "紗布"], zhCause: "傷口需要保持清潔並依照醫師指示換藥", zhTreat: "請用醫師指定方式清潔與換藥，保持敷料乾淨，避免泡水或自行塗不明藥膏。", zhWarn: "若紅腫熱痛加劇、流膿、惡臭、發燒或傷口裂開，請提早回診。" }),
  item("urgent_skin_warning", "一般治療說明", "需要立即就醫的皮膚警訊", { id: "tanda bahaya kulit yang perlu segera diperiksa", en: "skin warning signs that need urgent care", vi: "dấu hiệu da cần đi khám ngay", th: "สัญญาณผิวหนังที่ควรพบแพทย์ทันที", ja: "すぐ受診が必要な皮膚の警告症状", ko: "즉시 진료가 필요한 피부 경고 신호" }, causes.procedure, treatmentKinds.observe, { tags: ["立即就醫", "警訊", "過敏", "感染", "水泡"], severity: "重要安全提醒", zhCause: "有些皮膚症狀可能代表嚴重感染、嚴重藥物過敏或全身性問題", zhTreat: "若出現警訊，不要只等門診追蹤，請盡快急診或立即就醫。", zhWarn: "警訊包括高燒、快速擴大的紅腫熱痛、大片水泡或皮膚疼痛、眼口生殖器破皮、呼吸困難、嘴唇舌頭腫、意識不清或全身狀況變差。", zhFollow: "急性危險狀況處理後，再依醫師建議安排皮膚科追蹤。" })
];
