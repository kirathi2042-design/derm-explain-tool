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
      explanation: `${d.explain.id} ${d.contagious ? languageText.id.contagiousYes : languageText.id.contagiousNo}`,
      treatment: d.treat.id,
      homeCare: d.care.id,
      warning: d.warn.id,
      followUp: d.follow.id
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
      explanation: `${d.explain.en} ${d.contagious ? languageText.en.contagiousYes : languageText.en.contagiousNo}`,
      treatment: d.treat.en,
      homeCare: d.care.en,
      warning: d.warn.en,
      followUp: d.follow.en
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
      explanation: `${d.explain.vi} ${d.contagious ? languageText.vi.contagiousYes : languageText.vi.contagiousNo}`,
      treatment: d.treat.vi,
      homeCare: d.care.vi,
      warning: d.warn.vi,
      followUp: d.follow.vi
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
      explanation: `${d.explain.th} ${d.contagious ? languageText.th.contagiousYes : languageText.th.contagiousNo}`,
      treatment: d.treat.th,
      homeCare: d.care.th,
      warning: d.warn.th,
      followUp: d.follow.th
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
      explanation: `${d.explain.ja} ${d.contagious ? languageText.ja.contagiousYes : languageText.ja.contagiousNo}`,
      treatment: d.treat.ja,
      homeCare: d.care.ja,
      warning: d.warn.ja,
      followUp: d.follow.ja
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
      explanation: `${d.explain.ko} ${d.contagious ? languageText.ko.contagiousYes : languageText.ko.contagiousNo}`,
      treatment: d.treat.ko,
      homeCare: d.care.ko,
      warning: d.warn.ko,
      followUp: d.follow.ko
    })
  },
  uk: {
    contagiousYes: "Це захворювання може поширюватися на інші ділянки вашого тіла або передаватися іншим людям.",
    contagiousNo: "Цей стан зазвичай не заразний.",
    chronic: "Лікування часто потребує часу і може коригуватися поступово.",
    follow: "Будь ласка, приходьте на повторний прийом за призначенням, щоб можна було скоригувати лікування.",
    urgent: "Зверніться раніше при сильному болю, поширенні почервоніння або набряку, гної, лихоманці, утрудненому диханні або ознаках алергії на ліки.",
    template: (d) => ({
      summary: `Ваш стан шкіри — ${d.names.uk}.`,
      explanation: `${d.explain.uk} ${d.contagious ? languageText.uk.contagiousYes : languageText.uk.contagiousNo}`,
      treatment: d.treat.uk,
      homeCare: d.care.uk,
      warning: d.warn.uk,
      followUp: d.follow.uk
    })
  },
  ru: {
    contagiousYes: "Это заболевание может распространяться на другие участки вашего тела или передаваться другим людям.",
    contagiousNo: "Это состояние обычно не заразно.",
    chronic: "Лечение часто требует времени и может корректироваться постепенно.",
    follow: "Пожалуйста, приходите на повторный приём по назначению, чтобы можно было скорректировать лечение.",
    urgent: "Обратитесь раньше при сильной боли, распространении покраснения или отёка, гное, лихорадке, затруднённом дыхании или признаках аллергии на лекарства.",
    template: (d) => ({
      summary: `Ваше состояние кожи — ${d.names.ru}.`,
      explanation: `${d.explain.ru} ${d.contagious ? languageText.ru.contagiousYes : languageText.ru.contagiousNo}`,
      treatment: d.treat.ru,
      homeCare: d.care.ru,
      warning: d.warn.ru,
      followUp: d.follow.ru
    })
  }
};

function makeZh(d) {
  return {
    summary: `你的皮膚狀況是${d.titleZh}。`,
    explanation: `${d.zhExplain}${d.contagious ? "這個狀況可能傳染給自己身體其他部位，也可能傳染給別人。" : "這個狀況通常不會傳染給別人。"}`,
    treatment: d.zhTreat,
    homeCare: d.zhCare,
    warning: d.zhWarn,
    followUp: d.zhFollow
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
    ko: `${names.ko}은 보통 ${cause.ko}와 관련이 있습니다.`,
    uk: `${names.uk} зазвичай пов'язана з ${cause.uk}.`,
    ru: `${names.ru} обычно связана с ${cause.ru}.`
  };
}

function commonTreat(kind) {
  return {
    id: `Pengobatan dapat berupa ${kind.id}.`,
    en: `Treatment may include ${kind.en}.`,
    vi: `Điều trị có thể gồm ${kind.vi}.`,
    th: `การรักษาอาจรวมถึง${kind.th}`,
    ja: `治療は${kind.ja}などです。`,
    ko: `치료는 ${kind.ko} 등이 포함될 수 있습니다.`,
    uk: `Лікування може включати ${kind.uk}.`,
    ru: `Лечение может включать ${kind.ru}.`
  };
}

// Pass-through helpers: spread so any language fields on the input
// (id, en, vi, th, ja, ko, uk, ru, future...) flow through automatically.
function commonCare(care) { return { ...care }; }
function commonWarn(warn) { return { ...warn }; }
function commonFollow(follow) { return { ...follow }; }

const causes = {
  pore: { id: "pori tersumbat, minyak kulit, bakteri, dan peradangan", en: "blocked pores, skin oil, bacteria, and inflammation", vi: "tắc lỗ chân lông, dầu da, vi khuẩn và viêm", th: "รูขุมขนอุดตัน ความมัน แบคทีเรีย และการอักเสบ", ja: "毛穴の詰まり、皮脂、細菌、炎症", ko: "모공 막힘, 피지, 세균, 염증", uk: "закупорка пор, шкірне сало, бактерії та запалення", ru: "закупорка пор, кожное сало, бактерии и воспаление" },
  bacteria: { id: "infeksi bakteri pada kulit atau folikel rambut", en: "bacterial infection of the skin or hair follicles", vi: "nhiễm khuẩn da hoặc nang lông", th: "การติดเชื้อแบคทีเรียที่ผิวหนังหรือรูขุมขน", ja: "皮膚や毛包の細菌感染", ko: "피부 또는 모낭의 세균 감염", uk: "бактеріальна інфекція шкіри або волосяних фолікулів", ru: "бактериальная инфекция кожи или волосяных фолликулов" },
  inflammation: { id: "peradangan kulit dan reaksi kulit yang terlalu sensitif", en: "skin inflammation and an overactive skin reaction", vi: "viêm da và phản ứng da quá nhạy", th: "การอักเสบของผิวและผิวไวเกิน", ja: "皮膚の炎症と過敏な反応", ko: "피부 염증과 과민한 피부 반응", uk: "запалення шкіри і надмірно чутлива реакція шкіри", ru: "воспаление кожи и чрезмерно чувствительная реакция кожи" },
  fungus: { id: "infeksi jamur pada kulit atau kuku", en: "fungal infection of the skin or nails", vi: "nhiễm nấm da hoặc móng", th: "การติดเชื้อราที่ผิวหนังหรือเล็บ", ja: "皮膚や爪の真菌感染", ko: "피부 또는 손발톱의 진균 감염", uk: "грибкова інфекція шкіри або нігтів", ru: "грибковая инфекция кожи или ногтей" },
  virus: { id: "infeksi virus pada kulit", en: "a viral infection of the skin", vi: "nhiễm vi-rút ở da", th: "การติดเชื้อไวรัสที่ผิวหนัง", ja: "皮膚のウイルス感染", ko: "피부 바이러스 감염", uk: "вірусна інфекція шкіри", ru: "вирусная инфекция кожи" },
  allergy: { id: "reaksi alergi atau pelepasan histamin", en: "allergy-like reactions or histamine release", vi: "phản ứng dị ứng hoặc phóng thích histamine", th: "ปฏิกิริยาคล้ายภูมิแพ้หรือการหลั่งฮิสตามีน", ja: "アレルギー反応やヒスタミンの放出", ko: "알레르기 반응 또는 히스타민 분비", uk: "алергічні реакції або вивільнення гістаміну", ru: "аллергические реакции или высвобождение гистамина" },
  pigment: { id: "perubahan pigmen kulit yang jinak", en: "benign changes in skin pigment", vi: "thay đổi sắc tố da lành tính", th: "การเปลี่ยนแปลงเม็ดสีผิวที่ไม่ร้ายแรง", ja: "良性の皮膚色素の変化", ko: "양성 피부 색소 변화", uk: "доброякісні зміни пігменту шкіри", ru: "доброкачественные изменения пигмента кожи" },
  hair: { id: "perubahan siklus rambut, hormon, atau peradangan", en: "hair-cycle changes, hormones, or inflammation", vi: "thay đổi chu kỳ tóc, nội tiết hoặc viêm", th: "วงจรเส้นผม ฮอร์โมน หรือการอักเสบ", ja: "毛周期、ホルモン、炎症", ko: "모발 주기, 호르몬 또는 염증 변화", uk: "зміни циклу волосся, гормони або запалення", ru: "изменения цикла волос, гормоны или воспаление" },
  procedure: { id: "perawatan kulit yang sedang Anda jalani", en: "the skin treatment you are receiving", vi: "điều trị da bạn đang được thực hiện", th: "การรักษาผิวหนังที่คุณได้รับ", ja: "現在受けている皮膚治療", ko: "현재 받고 있는 피부 치료", uk: "лікування шкіри, яке ви проходите", ru: "лечение кожи, которое вы получаете" }
};

const treatmentKinds = {
  acne: { id: "obat oles, pembersih yang sesuai, dan kadang obat minum", en: "topical medicine, suitable cleansing, and sometimes oral medicine", vi: "thuốc bôi, làm sạch phù hợp và đôi khi thuốc uống", th: "ยาทา การทำความสะอาดที่เหมาะสม และบางครั้งมียากิน", ja: "外用薬、適切な洗顔、必要に応じた内服薬", ko: "바르는 약, 적절한 세안, 필요 시 먹는 약", uk: "зовнішні засоби, відповідне очищення та іноді пероральні ліки", ru: "наружные средства, подходящее очищение и иногда пероральные лекарства" },
  antibiotic: { id: "antibiotik oles atau minum sesuai tingkat keparahan", en: "topical or oral antibiotics depending on severity", vi: "kháng sinh bôi hoặc uống tùy mức độ", th: "ยาปฏิชีวนะแบบทาหรือกินตามความรุนแรง", ja: "重症度に応じた外用または内服抗菌薬", ko: "중증도에 따른 바르는 또는 먹는 항생제", uk: "зовнішні або пероральні антибіотики залежно від тяжкості", ru: "наружные или пероральные антибиотики в зависимости от тяжести" },
  antiInflammatory: { id: "obat antiradang, pelembap, dan menghindari pencetus", en: "anti-inflammatory medicine, moisturizers, and avoiding triggers", vi: "thuốc giảm viêm, dưỡng ẩm và tránh yếu tố kích phát", th: "ยาลดการอักเสบ มอยส์เจอไรเซอร์ และหลีกเลี่ยงสิ่งกระตุ้น", ja: "炎症を抑える薬、保湿、誘因の回避", ko: "염증 완화 약, 보습제, 유발 요인 회피", uk: "протизапальні засоби, зволожувачі та уникання тригерів", ru: "противовоспалительные средства, увлажнители и избегание триггеров" },
  antiviral: { id: "obat antivirus dan obat nyeri bila diperlukan", en: "antiviral medicine and pain control if needed", vi: "thuốc kháng vi-rút và thuốc giảm đau nếu cần", th: "ยาต้านไวรัสและยาแก้ปวดเมื่อจำเป็น", ja: "抗ウイルス薬と必要に応じた鎮痛", ko: "항바이러스제와 필요 시 통증 조절", uk: "противірусні засоби та знеболення за потреби", ru: "противовирусные средства и обезболивание при необходимости" },
  antifungal: { id: "obat antijamur oles atau minum sesuai lokasi dan beratnya", en: "topical or oral antifungal medicine depending on site and severity", vi: "thuốc kháng nấm bôi hoặc uống tùy vị trí và mức độ", th: "ยาต้านเชื้อราแบบทาหรือกินตามตำแหน่งและความรุนแรง", ja: "部位と重症度に応じた外用または内服抗真菌薬", ko: "부위와 중증도에 따른 바르는 또는 먹는 항진균제", uk: "зовнішні або пероральні протигрибкові засоби залежно від ділянки і тяжкості", ru: "наружные или пероральные противогрибковые средства в зависимости от участка и тяжести" },
  antihistamine: { id: "antihistamin dan mencari kemungkinan pencetus", en: "antihistamines and checking possible triggers", vi: "thuốc kháng histamine và tìm yếu tố kích phát", th: "ยาแก้แพ้และการหาสิ่งกระตุ้นที่เป็นไปได้", ja: "抗ヒスタミン薬と誘因の確認", ko: "항히스타민제와 가능한 유발 요인 확인", uk: "антигістамінні препарати і пошук можливих тригерів", ru: "антигистаминные препараты и поиск возможных триггеров" },
  observe: { id: "pemantauan, perlindungan kulit, atau tindakan bila mengganggu", en: "observation, skin protection, or treatment if it bothers you", vi: "theo dõi, bảo vệ da hoặc xử trí nếu gây khó chịu", th: "การสังเกต ปกป้องผิว หรือรักษาหากรบกวน", ja: "経過観察、皮膚保護、気になる場合の処置", ko: "경과 관찰, 피부 보호, 불편할 경우 치료", uk: "спостереження, захист шкіри або лікування, якщо турбує", ru: "наблюдение, защита кожи или лечение, если беспокоит" },
  procedure: { id: "perawatan lokal dan perawatan luka setelah tindakan", en: "local treatment and wound care after the procedure", vi: "điều trị tại chỗ và chăm sóc vết thương sau thủ thuật", th: "การรักษาเฉพาะที่และการดูแลแผลหลังหัตถการ", ja: "局所治療と処置後の創傷ケア", ko: "국소 치료와 시술 후 상처 관리", uk: "місцеве лікування та догляд за раною після процедури", ru: "местное лечение и уход за раной после процедуры" }
};

const careBasic = commonCare({
  id: "Jaga kulit tetap bersih dan lembap dengan produk yang lembut.",
  en: "Keep the skin clean and moisturized with gentle products.",
  vi: "Giữ da sạch và đủ ẩm bằng sản phẩm dịu nhẹ.",
  th: "รักษาผิวให้สะอาดและชุ่มชื้นด้วยผลิตภัณฑ์อ่อนโยน",
  ja: "低刺激の製品で皮膚を清潔にし、保湿してください。",
  ko: "순한 제품으로 피부를 깨끗하고 촉촉하게 유지하세요.",
  uk: "Тримайте шкіру чистою і зволоженою за допомогою м'яких засобів.",
  ru: "Держите кожу чистой и увлажнённой с помощью мягких средств."
});

const careDry = commonCare({
  id: "Gunakan pelembap secara teratur dan hindari sabun yang keras, air panas, serta keringat berlebihan.",
  en: "Use moisturizer regularly and avoid harsh soap, hot water, and excessive sweating.",
  vi: "Dưỡng ẩm đều đặn, tránh xà phòng mạnh, nước nóng và đổ mồ hôi quá nhiều.",
  th: "ใช้มอยส์เจอไรเซอร์สม่ำเสมอ หลีกเลี่ยงสบู่แรง น้ำร้อน และเหงื่อมาก",
  ja: "保湿を続け、強い石けん、熱いお湯、過度の汗を避けてください。",
  ko: "보습제를 규칙적으로 바르고 강한 비누, 뜨거운 물, 과도한 땀을 피하세요.",
  uk: "Регулярно використовуйте зволожувач і уникайте жорсткого мила, гарячої води та надмірного потовиділення.",
  ru: "Регулярно используйте увлажнитель и избегайте жёсткого мыла, горячей воды и чрезмерного потоотделения."
});

const careInfection = commonCare({
  id: "Tutup area bila mudah bergesekan, jangan berbagi handuk, dan cuci tangan setelah menyentuh area tersebut.",
  en: "Cover areas that rub easily, do not share towels, and wash your hands after touching the area.",
  vi: "Che vùng dễ cọ xát, không dùng chung khăn và rửa tay sau khi chạm vào vùng bệnh.",
  th: "ปิดบริเวณที่เสียดสีง่าย ไม่ใช้ผ้าเช็ดตัวร่วมกัน และล้างมือหลังสัมผัส",
  ja: "こすれやすい部位は保護し、タオルを共有せず、触れた後は手を洗ってください。",
  ko: "마찰이 쉬운 부위는 덮고 수건을 함께 쓰지 말며 만진 뒤 손을 씻으세요.",
  uk: "Прикривайте ділянки, які легко труться, не діліться рушниками і мийте руки після контакту з ураженою ділянкою.",
  ru: "Прикрывайте участки, которые легко трутся, не делитесь полотенцами и мойте руки после прикосновения к поражённому участку."
});

const warnBasic = commonWarn({
  id: "Sebagian iritasi ringan dapat terjadi pada awal pengobatan.",
  en: "Mild irritation can happen at the beginning of treatment.",
  vi: "Kích ứng nhẹ có thể xảy ra lúc mới điều trị.",
  th: "อาจมีการระคายเคืองเล็กน้อยในช่วงเริ่มรักษา",
  ja: "治療開始時に軽い刺激感が出ることがあります。",
  ko: "치료 초기에 가벼운 자극이 생길 수 있습니다.",
  uk: "На початку лікування може виникнути легке подразнення.",
  ru: "В начале лечения может возникнуть лёгкое раздражение."
});

const followWeeks = commonFollow({
  id: "Biasanya kontrol dalam 2 sampai 4 minggu, tergantung kondisi.",
  en: "Follow-up is usually in 2 to 4 weeks, depending on the condition.",
  vi: "Thường tái khám sau 2 đến 4 tuần, tùy tình trạng.",
  th: "โดยทั่วไปนัดติดตามใน 2 ถึง 4 สัปดาห์ ตามอาการ",
  ja: "通常は状態により2から4週間で再診します。",
  ko: "보통 상태에 따라 2-4주 후 다시 진료합니다.",
  uk: "Зазвичай повторний прийом через 2-4 тижні, залежно від стану.",
  ru: "Обычно повторный приём через 2-4 недели, в зависимости от состояния."
});

const followLong = commonFollow({
  id: "Karena mudah kambuh atau berlangsung lama, kontrol teratur penting.",
  en: "Because it may recur or last a long time, regular follow-up is important.",
  vi: "Vì bệnh có thể tái phát hoặc kéo dài, tái khám đều rất quan trọng.",
  th: "เพราะอาจเป็นซ้ำหรือเรื้อรัง การติดตามสม่ำเสมอจึงสำคัญ",
  ja: "再発や長期化があるため、定期的な再診が大切です。",
  ko: "재발하거나 오래갈 수 있어 정기적인 추적 진료가 중요합니다.",
  uk: "Оскільки захворювання може рецидивувати або тривати довго, регулярні візити важливі.",
  ru: "Поскольку заболевание может рецидивировать или длиться долго, регулярные визиты важны."
});

const antibioticCourseTreat = commonTreat({
  id: "antibiotik oles atau minum. Bila dokter memberi antibiotik minum, minum tepat waktu dan habiskan sesuai resep meskipun sudah membaik",
  en: "topical or oral antibiotics. If oral antibiotics are prescribed, take them on time and finish the course even if the skin looks better",
  vi: "kháng sinh bôi hoặc uống. Nếu được kê kháng sinh uống, hãy uống đúng giờ và dùng hết liệu trình dù da đã khá hơn",
  th: "ยาปฏิชีวนะแบบทาหรือกิน หากแพทย์ให้ยากิน ให้กินตรงเวลาและกินให้ครบ แม้อาการจะดีขึ้นแล้ว",
  ja: "外用または内服抗菌薬です。内服抗菌薬が出た場合は、良くなっても指示どおり最後まで飲んでください",
  ko: "바르는 또는 먹는 항생제입니다. 먹는 항생제를 처방받았다면 좋아져도 정해진 기간 끝까지 복용하세요",
  uk: "зовнішні або пероральні антибіотики. Якщо призначено пероральний антибіотик, приймайте його вчасно і завершіть повний курс, навіть якщо шкіра вже виглядає краще",
  ru: "наружные или пероральные антибиотики. Если назначен пероральный антибиотик, принимайте его вовремя и завершите полный курс, даже если кожа уже выглядит лучше"
});

const antibioticCourseWarn = commonWarn({
  id: "Jangan menghentikan antibiotik sendiri dan jangan menyimpan sisa obat untuk dipakai lain kali.",
  en: "Do not stop antibiotics by yourself, and do not save leftover antibiotics for later use.",
  vi: "Không tự ý ngưng kháng sinh và không để thuốc còn lại dùng cho lần sau.",
  th: "อย่าหยุดยาปฏิชีวนะเอง และอย่าเก็บยาที่เหลือไว้ใช้ครั้งต่อไป",
  ja: "抗菌薬を自己判断で中止せず、残った薬を次回用に取っておかないでください。",
  ko: "항생제를 임의로 중단하지 말고 남은 약을 다음에 쓰려고 보관하지 마세요.",
  uk: "Не припиняйте прийом антибіотика самостійно і не зберігайте залишки ліків для наступного використання.",
  ru: "Не прекращайте приём антибиотика самостоятельно и не оставляйте остатки лекарства для следующего раза."
});

const returnIfWorseWarn = commonWarn({
  id: "Kontrol lebih awal bila ruam bertambah banyak, makin nyeri, bernanah, atau tidak membaik setelah memakai obat sesuai petunjuk.",
  en: "Come back earlier if the bumps increase, become more painful, form pus, or do not improve after using medicine as directed.",
  vi: "Tái khám sớm nếu nốt nổi nhiều hơn, đau hơn, có mủ hoặc không cải thiện sau khi dùng thuốc đúng hướng dẫn.",
  th: "ควรมาก่อนนัดถ้าผื่นเพิ่มขึ้น ปวดมากขึ้น มีหนอง หรือไม่ดีขึ้นหลังใช้ยาตามคำแนะนำ",
  ja: "発疹が増える、痛みが強くなる、膿が出る、または指示どおり薬を使っても改善しない場合は早めに受診してください。",
  ko: "병변이 늘거나 더 아프거나 고름이 생기거나 지시대로 약을 써도 좋아지지 않으면 더 일찍 내원하세요.",
  uk: "Зверніться раніше, якщо висипу стає більше, він болючіший, з гноєм, або не покращується після прийому ліків за призначенням.",
  ru: "Обратитесь раньше, если сыпи становится больше, она болезненнее, с гноем, или не улучшается после приёма лекарств по назначению."
});

const zosterTreat = commonTreat({
  id: "obat antivirus dan obat nyeri. Obat antivirus paling baik dimulai dalam 72 jam setelah ruam muncul",
  en: "antiviral medicine and pain control. Antiviral medicine works best when started within 72 hours after the rash appears",
  vi: "thuốc kháng vi-rút và giảm đau. Thuốc kháng vi-rút hiệu quả nhất khi bắt đầu trong vòng 72 giờ sau khi phát ban",
  th: "ยาต้านไวรัสและยาแก้ปวด ยาต้านไวรัสได้ผลดีที่สุดเมื่อเริ่มภายใน 72 ชั่วโมงหลังผื่นขึ้น",
  ja: "抗ウイルス薬と痛み止めです。発疹が出てから72時間以内に始めると効果が最も期待できます",
  ko: "항바이러스제와 통증 조절입니다. 발진이 생긴 뒤 72시간 안에 시작할수록 효과가 좋습니다",
  uk: "противірусні засоби і знеболення. Противірусні засоби найефективніші, якщо почати їх протягом 72 годин після появи висипу",
  ru: "противовирусные средства и обезболивание. Противовирусные средства наиболее эффективны, если начать их в течение 72 часов после появления сыпи"
});

const zosterWarn = commonWarn({
  id: "Bila ruam berada di sekitar mata, dahi, atau ujung hidung, segera kontrol karena dapat memengaruhi mata.",
  en: "If the rash is near the eye, forehead, or tip of the nose, seek care promptly because the eye can be affected.",
  vi: "Nếu phát ban ở quanh mắt, trán hoặc đầu mũi, hãy tái khám sớm vì có thể ảnh hưởng đến mắt.",
  th: "ถ้าผื่นอยู่รอบตา หน้าผาก หรือปลายจมูก ควรพบแพทย์เร็ว เพราะอาจกระทบตาได้",
  ja: "目の周り、額、鼻先に発疹がある場合は、目に影響することがあるため早めに受診してください。",
  ko: "눈 주위, 이마, 코끝에 발진이 있으면 눈에 영향을 줄 수 있으니 빨리 진료를 받으세요.",
  uk: "Якщо висип знаходиться навколо ока, на лобі або кінчику носа, негайно зверніться, оскільки це може вплинути на очі.",
  ru: "Если сыпь находится вокруг глаза, на лбу или кончике носа, немедленно обратитесь, так как это может повлиять на глаза."
});

const tineaTreat = commonTreat({
  id: "obat antijamur. Gunakan sampai selesai sesuai arahan, biasanya tetap dilanjutkan sebentar setelah gejala membaik",
  en: "antifungal medicine. Use it for the full period as directed, usually continuing for a short time after symptoms improve",
  vi: "thuốc kháng nấm. Dùng đủ thời gian theo hướng dẫn, thường tiếp tục thêm một thời gian sau khi triệu chứng cải thiện",
  th: "ยาต้านเชื้อรา ใช้ให้ครบตามคำแนะนำ โดยมักต้องใช้ต่ออีกระยะหลังอาการดีขึ้น",
  ja: "抗真菌薬です。症状が良くなっても、指示された期間は続けてください",
  ko: "항진균제입니다. 증상이 좋아져도 지시받은 기간 동안 계속 사용하세요",
  uk: "протигрибкові засоби. Використовуйте їх повний термін за призначенням, зазвичай продовжуйте ще деякий час після того, як симптоми покращаться",
  ru: "противогрибковые средства. Используйте их полный срок по назначению, обычно продолжайте ещё некоторое время после улучшения симптомов"
});

const tineaCare = commonCare({
  id: "Jaga area tetap kering, ganti pakaian yang basah oleh keringat, dan jangan memakai krim yang tidak jelas tanpa arahan dokter.",
  en: "Keep the area dry, change sweaty clothes, and do not use unknown creams without medical advice.",
  vi: "Giữ vùng da khô, thay quần áo ướt mồ hôi và không tự dùng kem không rõ loại.",
  th: "รักษาบริเวณนั้นให้แห้ง เปลี่ยนเสื้อผ้าที่เปียกเหงื่อ และอย่าใช้ครีมที่ไม่ทราบชนิดเอง",
  ja: "患部を乾燥させ、汗で濡れた衣類は替え、よく分からないクリームを自己判断で使わないでください。",
  ko: "부위를 건조하게 유지하고 땀에 젖은 옷은 갈아입으며, 알 수 없는 크림을 임의로 바르지 마세요.",
  uk: "Тримайте ділянку сухою, змінюйте мокрий від поту одяг і не використовуйте незрозумілі креми без поради лікаря.",
  ru: "Держите участок сухим, меняйте мокрую от пота одежду и не используйте непонятные кремы без совета врача."
});

const tineaWarn = commonWarn({
  id: "Kontrol kembali bila ruam makin luas, makin nyeri, bernanah, atau terus kambuh.",
  en: "Come back if the rash spreads, becomes more painful, forms pus, or keeps coming back.",
  vi: "Tái khám nếu vùng da lan rộng, đau hơn, có mủ hoặc cứ tái phát.",
  th: "กลับมาตรวจถ้าผื่นลาม ปวดมากขึ้น มีหนอง หรือเป็นซ้ำบ่อย",
  ja: "発疹が広がる、痛みが強くなる、膿が出る、または繰り返す場合は再診してください。",
  ko: "발진이 퍼지거나 더 아프거나 고름이 생기거나 계속 재발하면 다시 내원하세요.",
  uk: "Поверніться, якщо висип поширюється, стає болючішим, з гноєм або постійно повертається.",
  ru: "Вернитесь, если сыпь распространяется, становится болезненнее, с гноем или постоянно возвращается."
});

const scabiesTreat = commonTreat({
  id: "obat oles khusus. Oleskan sesuai arahan dokter ke seluruh area yang ditentukan, biarkan 8 sampai 12 jam, lalu bilas",
  en: "a specific topical medicine. Apply it to all instructed areas, leave it on for 8 to 12 hours, then wash it off",
  vi: "thuốc bôi đặc trị. Bôi lên toàn bộ vùng được hướng dẫn, để 8 đến 12 giờ rồi rửa sạch",
  th: "ยาทาเฉพาะสำหรับหิด ทาตามบริเวณที่แพทย์แนะนำ ทิ้งไว้ 8 ถึง 12 ชั่วโมงแล้วล้างออก",
  ja: "専用の外用薬です。指示された範囲に塗り、8から12時間置いてから洗い流してください",
  ko: "전용 바르는 약입니다. 지시받은 부위 전체에 바르고 8-12시간 둔 뒤 씻어내세요",
  uk: "спеціальний зовнішній засіб. Нанесіть на всі вказані ділянки за призначенням лікаря, залиште на 8-12 годин, потім змийте",
  ru: "специальное наружное средство. Нанесите на все указанные участки по назначению врача, оставьте на 8-12 часов, затем смойте"
});

const scabiesCare = commonCare({
  id: "Orang serumah atau kontak dekat mungkin perlu diobati bersamaan. Cuci pakaian, seprai, dan handuk dengan air panas, atau simpan tertutup rapat setidaknya 72 jam.",
  en: "Household members or close contacts may need treatment at the same time. Wash clothes, bedding, and towels in hot water, or seal items in a bag for at least 72 hours.",
  vi: "Người sống chung hoặc tiếp xúc gần có thể cần điều trị cùng lúc. Giặt quần áo, ga giường và khăn bằng nước nóng, hoặc đóng kín trong túi ít nhất 72 giờ.",
  th: "คนในบ้านหรือผู้สัมผัสใกล้ชิดอาจต้องรักษาพร้อมกัน ซักเสื้อผ้า ผ้าปู และผ้าเช็ดตัวด้วยน้ำร้อน หรือปิดถุงไว้อย่างน้อย 72 ชั่วโมง",
  ja: "同居者や濃厚接触者も同時に治療が必要なことがあります。衣類、寝具、タオルは熱いお湯で洗うか、袋に密閉して少なくとも72時間置いてください。",
  ko: "동거인이나 밀접 접촉자도 동시에 치료가 필요할 수 있습니다. 옷, 침구, 수건은 뜨거운 물로 세탁하거나 최소 72시간 밀봉하세요.",
  uk: "Членам домогосподарства або тісним контактам може знадобитися лікування одночасно. Пріть одяг, постільну білизну та рушники в гарячій воді або запечатуйте речі в пакеті щонайменше на 72 години.",
  ru: "Членам семьи или близким контактам может потребоваться лечение одновременно. Стирайте одежду, постельное бельё и полотенца в горячей воде или запечатывайте вещи в пакете минимум на 72 часа."
});

const scabiesWarn = commonWarn({
  id: "Gatal dapat tetap ada 2 sampai 4 minggu setelah terapi. Bila muncul banyak ruam baru atau ada nanah, kontrol kembali.",
  en: "Itching can continue for 2 to 4 weeks after treatment. Come back if many new bumps appear or pus develops.",
  vi: "Ngứa có thể còn kéo dài 2 đến 4 tuần sau điều trị. Tái khám nếu nổi nhiều nốt mới hoặc có mủ.",
  th: "อาการคันอาจอยู่ต่อได้ 2 ถึง 4 สัปดาห์หลังรักษา หากมีผื่นใหม่จำนวนมากหรือมีหนอง ให้กลับมาตรวจ",
  ja: "治療後も2から4週間かゆみが残ることがあります。新しい発疹が多数出る、膿が出る場合は再診してください。",
  ko: "치료 후에도 가려움은 2-4주 지속될 수 있습니다. 새 병변이 많이 생기거나 고름이 나면 다시 내원하세요.",
  uk: "Свербіж може зберігатися 2-4 тижні після лікування. Якщо з'являється багато нових висипань або гній, поверніться на прийом.",
  ru: "Зуд может сохраняться 2-4 недели после лечения. Если появляется много новых высыпаний или гной, вернитесь на приём."
});

const acneExplain = commonExplain({
  id: "jerawat",
  en: "acne",
  vi: "mụn trứng cá",
  th: "สิว",
  ja: "にきび",
  ko: "여드름",
  uk: "вугри",
  ru: "акне (угри)"
}, {
  id: "pori tersumbat, minyak kulit, bakteri kulit, dan peradangan; ini bukan karena wajah kotor",
  en: "blocked pores, skin oil, normal skin bacteria, and inflammation; it is not simply caused by a dirty face",
  vi: "tắc lỗ chân lông, dầu da, vi khuẩn thường trú trên da và viêm; không phải chỉ do mặt bẩn",
  th: "รูขุมขนอุดตัน ความมัน แบคทีเรียตามผิวหนัง และการอักเสบ ไม่ได้เกิดจากหน้าสกปรกอย่างเดียว",
  ja: "毛穴の詰まり、皮脂、皮膚にもともといる細菌、炎症で起こります。単に顔が汚いからではありません",
  ko: "모공 막힘, 피지, 정상 피부 세균, 염증과 관련됩니다. 단순히 얼굴이 더러워서 생기는 것은 아닙니다",
  uk: "закупорка пор, шкірне сало, звичайні бактерії шкіри та запалення; це не просто через брудне обличчя",
  ru: "закупорка пор, кожное сало, обычные бактерии кожи и воспаление; это не просто из-за грязного лица"
});

const acneTreat = commonTreat({
  id: "obat oles dan kadang obat minum. Perbaikan jelas biasanya perlu 6 sampai 12 minggu; pada awalnya kulit bisa kering atau sedikit perih",
  en: "topical medicine and sometimes oral medicine. Clear improvement usually takes 6 to 12 weeks; early dryness or mild stinging can happen",
  vi: "thuốc bôi và đôi khi thuốc uống. Cải thiện rõ thường cần 6 đến 12 tuần; ban đầu da có thể khô hoặc hơi châm chích",
  th: "ยาทาและบางครั้งมียากิน โดยทั่วไปต้องใช้เวลา 6 ถึง 12 สัปดาห์จึงเห็นผลชัด ช่วงแรกอาจแห้งหรือตึงแสบเล็กน้อย",
  ja: "外用薬、必要に応じて内服薬です。はっきりした改善には通常6から12週間かかり、初期に乾燥や軽い刺激感が出ることがあります",
  ko: "바르는 약과 필요 시 먹는 약입니다. 뚜렷한 호전은 보통 6-12주 걸리며 초기에 건조함이나 약한 따가움이 있을 수 있습니다",
  uk: "зовнішні засоби, а іноді пероральні ліки. Помітне покращення зазвичай потребує 6-12 тижнів; спочатку може бути сухість або легке печіння",
  ru: "наружные средства, а иногда пероральные лекарства. Заметное улучшение обычно требует 6-12 недель; сначала может быть сухость или лёгкое жжение"
});

const acneCare = commonCare({
  id: "Cuci wajah dengan lembut, gunakan pelembap dan tabir surya yang tidak mudah menyumbat pori, dan jangan memencet jerawat.",
  en: "Cleanse gently, use non-comedogenic moisturizer and sunscreen, and do not squeeze pimples.",
  vi: "Rửa mặt nhẹ nhàng, dùng dưỡng ẩm và chống nắng không gây bít tắc lỗ chân lông, không nặn mụn.",
  th: "ล้างหน้าอย่างอ่อนโยน ใช้มอยส์เจอไรเซอร์และกันแดดที่ไม่อุดตันรูขุมขน และอย่าบีบสิว",
  ja: "やさしく洗顔し、毛穴を詰まらせにくい保湿剤と日焼け止めを使い、にきびをつぶさないでください。",
  ko: "부드럽게 세안하고 모공을 막기 어려운 보습제와 자외선 차단제를 사용하며 여드름을 짜지 마세요.",
  uk: "Очищуйте шкіру м'яко, використовуйте зволожувач і сонцезахисний засіб, що не забивають пори, і не видавлюйте прищі.",
  ru: "Очищайте кожу мягко, используйте увлажнитель и солнцезащитное средство, которые не забивают поры, и не выдавливайте прыщи."
});

const acneWarn = commonWarn({
  id: "Kontrol lebih awal bila iritasi sangat berat, bengkak nyeri, bernanah banyak, atau muncul tanda alergi obat.",
  en: "Come back earlier if irritation is severe, swelling is painful, there is a lot of pus, or signs of drug allergy appear.",
  vi: "Tái khám sớm nếu kích ứng rất nặng, sưng đau, nhiều mủ hoặc có dấu hiệu dị ứng thuốc.",
  th: "กลับมาตรวจก่อนนัดถ้าระคายเคืองมาก บวมเจ็บ มีหนองมาก หรือมีอาการแพ้ยา",
  ja: "刺激が非常に強い、腫れて痛い、膿が多い、薬のアレルギー症状がある場合は早めに受診してください。",
  ko: "자극이 매우 심하거나 붓고 아프거나 고름이 많거나 약물 알레르기 증상이 있으면 더 일찍 내원하세요.",
  uk: "Зверніться раніше, якщо подразнення дуже сильне, набряк болючий, багато гною або з'явилися ознаки алергії на ліки.",
  ru: "Обратитесь раньше, если раздражение очень сильное, отёк болезненный, много гноя или появились признаки аллергии на лекарства."
});

const acneFollow = commonFollow({
  id: "Kontrol teratur agar obat dapat disesuaikan; jangan menilai hasil hanya dari beberapa hari pertama.",
  en: "Return regularly so the medicine can be adjusted; do not judge the result only from the first few days.",
  vi: "Tái khám đều để điều chỉnh thuốc; đừng đánh giá kết quả chỉ sau vài ngày đầu.",
  th: "มาตรวจตามนัดเพื่อปรับยา อย่าตัดสินผลจากไม่กี่วันแรก",
  ja: "薬を調整するため定期的に再診してください。最初の数日だけで効果を判断しないでください。",
  ko: "약 조절을 위해 정기적으로 내원하세요. 처음 며칠만 보고 효과를 판단하지 마세요.",
  uk: "Приходьте регулярно, щоб можна було коригувати ліки; не оцінюйте результат лише за першими кількома днями.",
  ru: "Приходите регулярно, чтобы можно было корректировать лекарства; не оценивайте результат только по первым нескольким дням."
});

const folliculitisExplain = commonExplain({
  id: "folikulitis",
  en: "folliculitis",
  vi: "viêm nang lông",
  th: "รูขุมขนอักเสบ",
  ja: "毛嚢炎",
  ko: "모낭염",
  uk: "фолікуліт",
  ru: "фолликулит"
}, {
  id: "peradangan pada akar rambut, sering dipicu keringat, gesekan, mencukur, atau bakteri kulit",
  en: "inflammation around hair roots, often triggered by sweat, friction, shaving, or skin bacteria",
  vi: "viêm quanh chân lông, thường do mồ hôi, ma sát, cạo lông hoặc vi khuẩn trên da kích thích",
  th: "การอักเสบรอบรากขน มักถูกกระตุ้นจากเหงื่อ การเสียดสี การโกน หรือแบคทีเรียบนผิว",
  ja: "毛穴の周りの炎症で、汗、摩擦、剃毛、皮膚の細菌などがきっかけになることがあります",
  ko: "털 뿌리 주변의 염증으로 땀, 마찰, 면도, 피부 세균 등이 유발할 수 있습니다",
  uk: "запалення навколо коренів волосся, яке часто провокують піт, тертя, гоління або бактерії шкіри",
  ru: "воспаление вокруг корней волос, которое часто провоцируют пот, трение, бритьё или бактерии кожи"
});

const folliculitisTreat = commonTreat({
  id: "obat oles, pembersih antiseptik, atau antibiotik bila diperlukan sesuai tingkat keparahan",
  en: "topical medicine, antiseptic wash, or antibiotics if needed depending on severity",
  vi: "thuốc bôi, dung dịch rửa sát khuẩn hoặc kháng sinh khi cần tùy mức độ",
  th: "ยาทา น้ำยาทำความสะอาดฆ่าเชื้อ หรือยาปฏิชีวนะเมื่อจำเป็นตามความรุนแรง",
  ja: "重症度に応じて外用薬、抗菌洗浄剤、必要時に抗菌薬を使います",
  ko: "중증도에 따라 바르는 약, 항균 세정제, 필요 시 항생제를 사용합니다",
  uk: "зовнішні ліки, антисептичне очищення або антибіотики за потреби залежно від тяжкості",
  ru: "наружные лекарства, антисептическое очищение или антибиотики при необходимости в зависимости от тяжести"
});

const folliculitisCare = commonCare({
  id: "Jaga area tetap kering, kurangi gesekan, hindari mencukur sementara, dan jangan memencet bintil bernanah.",
  en: "Keep the area dry, reduce friction, avoid shaving for now, and do not squeeze pustules.",
  vi: "Giữ vùng da khô, giảm ma sát, tạm tránh cạo lông và không nặn mụn mủ.",
  th: "รักษาบริเวณนั้นให้แห้ง ลดการเสียดสี งดโกนชั่วคราว และอย่าบีบตุ่มหนอง",
  ja: "患部を乾かし、摩擦を減らし、しばらく剃毛を避け、膿疱をつぶさないでください。",
  ko: "부위를 건조하게 유지하고 마찰을 줄이며 당분간 면도를 피하고 고름 잡힌 병변을 짜지 마세요.",
  uk: "Тримайте ділянку сухою, зменшіть тертя, тимчасово уникайте гоління і не видавлюйте гнійнички.",
  ru: "Держите участок сухим, уменьшите трение, временно избегайте бритья и не выдавливайте гнойнички."
});

const pustuleExplain = commonExplain({
  id: "bintil bernanah karena bakteri",
  en: "bacterial pustules",
  vi: "mụn mủ do vi khuẩn",
  th: "ตุ่มหนองจากแบคทีเรีย",
  ja: "細菌性膿疱",
  ko: "세균성 농포",
  uk: "бактеріальні пустули",
  ru: "бактериальные пустулы"
}, {
  id: "infeksi bakteri dangkal pada kulit yang dapat menyebabkan merah, nyeri, dan nanah",
  en: "a shallow bacterial skin infection that can cause redness, pain, and pus",
  vi: "nhiễm khuẩn nông ở da, có thể gây đỏ, đau và mủ",
  th: "การติดเชื้อแบคทีเรียตื้น ๆ ที่ผิวหนัง ทำให้แดง เจ็บ และมีหนองได้",
  ja: "皮膚の浅い細菌感染で、赤み、痛み、膿が出ることがあります",
  ko: "피부 표면의 세균 감염으로 붉음, 통증, 고름이 생길 수 있습니다",
  uk: "поверхнева бактеріальна інфекція шкіри, що може спричиняти почервоніння, біль і гній",
  ru: "поверхностная бактериальная инфекция кожи, которая может вызывать покраснение, боль и гной"
});

const pustuleCare = commonCare({
  id: "Jangan memencet atau mengorek nanah. Cuci tangan setelah menyentuh area tersebut dan jangan berbagi handuk.",
  en: "Do not squeeze or pick at the pus. Wash your hands after touching the area and do not share towels.",
  vi: "Không nặn hoặc cạy mủ. Rửa tay sau khi chạm vào vùng da đó và không dùng chung khăn.",
  th: "อย่าบีบหรือแกะหนอง ล้างมือหลังสัมผัสบริเวณนั้น และอย่าใช้ผ้าเช็ดตัวร่วมกัน",
  ja: "膿を押し出したり掻いたりしないでください。患部を触った後は手を洗い、タオルを共有しないでください。",
  ko: "고름을 짜거나 뜯지 마세요. 그 부위를 만진 뒤에는 손을 씻고 수건을 함께 쓰지 마세요.",
  uk: "Не видавлюйте і не роздряпуйте гній. Мийте руки після дотику до ділянки і не діліться рушниками.",
  ru: "Не выдавливайте и не расцарапывайте гной. Мойте руки после прикосновения к участку и не делитесь полотенцами."
});

const pustuleWarn = commonWarn({
  id: "Kontrol lebih awal bila kemerahan cepat meluas, nyeri makin berat, demam, atau nanah bertambah banyak.",
  en: "Come back earlier if redness spreads quickly, pain worsens, fever occurs, or pus increases.",
  vi: "Tái khám sớm nếu đỏ lan nhanh, đau tăng, sốt hoặc mủ nhiều hơn.",
  th: "กลับมาตรวจก่อนนัดถ้าแดงลามเร็ว ปวดมากขึ้น มีไข้ หรือหนองมากขึ้น",
  ja: "赤みが急に広がる、痛みが強くなる、発熱する、膿が増える場合は早めに受診してください。",
  ko: "붉은 부위가 빠르게 퍼지거나 통증이 심해지거나 열이 나거나 고름이 늘면 더 일찍 내원하세요.",
  uk: "Зверніться раніше, якщо почервоніння швидко поширюється, біль посилюється, з'являється лихоманка або гною стає більше.",
  ru: "Обратитесь раньше, если покраснение быстро распространяется, боль усиливается, появляется температура или гноя становится больше."
});

const keratosisPilarisExplain = commonExplain({
  id: "keratosis pilaris",
  en: "keratosis pilaris",
  vi: "dày sừng nang lông",
  th: "ขนคุดผิวหนัง",
  ja: "毛孔性苔癬",
  ko: "모공각화증",
  uk: "волосяний кератоз",
  ru: "волосяной кератоз"
}, {
  id: "penumpukan keratin di sekitar pori rambut; ini jinak, umum, dan bukan infeksi",
  en: "keratin buildup around hair follicles; it is benign, common, and not an infection",
  vi: "keratin tích tụ quanh nang lông; đây là tình trạng lành tính, thường gặp và không phải nhiễm trùng",
  th: "เคราตินสะสมรอบรูขุมขน เป็นภาวะไม่ร้ายแรง พบบ่อย และไม่ใช่การติดเชื้อ",
  ja: "毛穴の周りに角質がたまる状態で、良性でよくあり、感染ではありません",
  ko: "모낭 주변에 각질이 쌓이는 상태로 양성이며 흔하고 감염이 아닙니다",
  uk: "накопичення кератину навколо волосяних фолікулів; це доброякісно, поширено і не є інфекцією",
  ru: "накопление кератина вокруг волосяных фолликулов; это доброкачественно, распространено и не является инфекцией"
});

const keratosisPilarisTreat = commonTreat({
  id: "pelembap dan obat oles penghalus kulit bila diperlukan; perbaikan biasanya perlahan dan tidak selalu hilang total",
  en: "moisturizer and smoothing topical medicine if needed; improvement is usually gradual and may not be complete",
  vi: "dưỡng ẩm và thuốc bôi làm mịn da khi cần; cải thiện thường chậm và có thể không hết hoàn toàn",
  th: "มอยส์เจอไรเซอร์และยาทาช่วยให้ผิวเรียบเมื่อจำเป็น อาการมักดีขึ้นช้าและอาจไม่หายหมด",
  ja: "保湿剤や必要に応じた角質を整える外用薬を使います。改善はゆっくりで、完全には消えないこともあります",
  ko: "보습제와 필요 시 피부를 매끄럽게 하는 바르는 약을 사용합니다. 호전은 보통 천천히 오며 완전히 없어지지 않을 수 있습니다",
  uk: "зволожувач і за потреби зовнішні засоби для вирівнювання шкіри; покращення зазвичай поступове і може бути неповним",
  ru: "увлажнитель и при необходимости наружные средства для выравнивания кожи; улучшение обычно постепенное и может быть неполным"
});

const keratosisPilarisCare = commonCare({
  id: "Oleskan pelembap secara rutin, terutama setelah mandi. Hindari menggosok keras atau memencet bintil.",
  en: "Apply moisturizer regularly, especially after bathing. Avoid hard scrubbing or squeezing the bumps.",
  vi: "Thoa dưỡng ẩm đều đặn, nhất là sau khi tắm. Tránh chà mạnh hoặc nặn các nốt sần.",
  th: "ทามอยส์เจอไรเซอร์สม่ำเสมอ โดยเฉพาะหลังอาบน้ำ หลีกเลี่ยงการขัดแรงหรือบีบตุ่ม",
  ja: "入浴後を中心に保湿を続けてください。強くこすったり、ぶつぶつを押し出したりしないでください。",
  ko: "특히 목욕 후 보습제를 규칙적으로 바르세요. 세게 문지르거나 오돌토돌한 병변을 짜지 마세요.",
  uk: "Регулярно наносіть зволожувач, особливо після купання. Уникайте сильного тертя або видавлювання горбиків.",
  ru: "Регулярно наносите увлажнитель, особенно после купания. Избегайте сильного трения или выдавливания бугорков."
});

const keratosisPilarisWarn = commonWarn({
  id: "Bila menjadi sangat merah, nyeri, atau tergores sampai infeksi, kontrol kembali.",
  en: "Come back if it becomes very red, painful, or scratched open with signs of infection.",
  vi: "Tái khám nếu vùng da rất đỏ, đau hoặc bị gãi trầy có dấu hiệu nhiễm trùng.",
  th: "กลับมาตรวจถ้าแดงมาก เจ็บ หรือเกาจนเป็นแผลและมีสัญญาณติดเชื้อ",
  ja: "強い赤み、痛み、掻き壊しによる感染のサインがあれば再診してください。",
  ko: "매우 붉어지거나 아프거나 긁혀서 감염 징후가 있으면 다시 내원하세요.",
  uk: "Поверніться, якщо ділянка стає дуже червоною, болючою або розчесана з ознаками інфекції.",
  ru: "Вернитесь, если участок становится очень красным, болезненным или расчёсан с признаками инфекции."
});

const cystExplain = commonExplain({
  id: "kista epidermal yang meradang",
  en: "inflamed epidermal cyst",
  vi: "nang biểu bì bị viêm",
  th: "ซีสต์ผิวหนังอักเสบ",
  ja: "炎症性表皮嚢腫",
  ko: "염증성 표피낭종",
  uk: "запалена епідермальна кіста",
  ru: "воспалённая эпидермальная киста"
}, {
  id: "kantong kecil di bawah kulit yang berisi keratin dan sedang meradang; ini bukan karena kulit kotor",
  en: "a small keratin-filled sac under the skin that has become inflamed; it is not caused by dirty skin",
  vi: "một túi nhỏ chứa keratin dưới da đang bị viêm; không phải do da bẩn",
  th: "ถุงเล็กใต้ผิวหนังที่มีเคราตินและกำลังอักเสบ ไม่ได้เกิดจากผิวสกปรก",
  ja: "皮膚の下にできた角質を含む小さな袋が炎症を起こした状態です。皮膚が汚いからではありません",
  ko: "피부 아래의 각질이 든 작은 주머니에 염증이 생긴 상태입니다. 피부가 더러워서 생기는 것은 아닙니다",
  uk: "невеликий мішечок під шкірою, заповнений кератином, який запалився; це не через брудну шкіру",
  ru: "небольшой мешочек под кожей, заполненный кератином, который воспалился; это не из-за грязной кожи"
});

const cystTreat = commonTreat({
  id: "obat untuk meredakan radang, antibiotik bila diperlukan, atau drainase bila bengkak bernanah; pengangkatan biasanya dinilai setelah radang tenang",
  en: "medicine to calm inflammation, antibiotics if needed, or drainage if swollen with pus; removal is usually considered after inflammation settles",
  vi: "thuốc giảm viêm, kháng sinh khi cần hoặc rạch dẫn lưu nếu sưng có mủ; thường đánh giá lấy trọn sau khi viêm lắng xuống",
  th: "ยาลดอักเสบ ยาปฏิชีวนะเมื่อจำเป็น หรือระบายหนองถ้าบวมมีหนอง โดยมักประเมินการเอาออกหลังอักเสบสงบ",
  ja: "炎症を抑える薬、必要時の抗菌薬、膿がある場合の排膿を行います。切除は炎症が落ち着いてから判断します",
  ko: "염증을 가라앉히는 약, 필요 시 항생제, 고름이 차면 배농을 합니다. 제거는 보통 염증이 가라앉은 뒤 평가합니다",
  uk: "ліки для зменшення запалення, антибіотики за потреби або дренування, якщо є набряк із гноєм; видалення зазвичай оцінюють після стихання запалення",
  ru: "лекарства для уменьшения воспаления, антибиотики при необходимости или дренирование, если есть отёк с гноем; удаление обычно оценивают после стихания воспаления"
});

const cystCare = commonCare({
  id: "Jangan memencet, menusuk, atau memijat kuat karena dapat memperluas radang dan membuat luka.",
  en: "Do not squeeze, puncture, or massage it hard because this can spread inflammation and create a wound.",
  vi: "Không nặn, chọc hoặc xoa bóp mạnh vì có thể làm viêm lan rộng và tạo vết thương.",
  th: "อย่าบีบ เจาะ หรือนวดแรง เพราะอาจทำให้อักเสบลามและเกิดแผล",
  ja: "押し出したり、刺したり、強く揉んだりしないでください。炎症が広がり、傷になることがあります。",
  ko: "짜거나 찌르거나 세게 문지르지 마세요. 염증이 퍼지고 상처가 생길 수 있습니다",
  uk: "Не видавлюйте, не проколюйте і не масажуйте сильно, бо це може поширити запалення і створити рану.",
  ru: "Не выдавливайте, не прокалывайте и не массируйте сильно, потому что это может распространить воспаление и создать рану."
});

const cystWarn = commonWarn({
  id: "Kontrol lebih awal bila nyeri cepat memburuk, kemerahan meluas, demam, atau keluar banyak nanah.",
  en: "Come back earlier if pain worsens quickly, redness spreads, fever occurs, or a lot of pus drains out.",
  vi: "Tái khám sớm nếu đau tăng nhanh, đỏ lan rộng, sốt hoặc chảy nhiều mủ.",
  th: "กลับมาตรวจก่อนนัดถ้าปวดมากขึ้นเร็ว แดงลาม มีไข้ หรือมีหนองออกมาก",
  ja: "痛みが急に悪化する、赤みが広がる、発熱する、膿が多く出る場合は早めに受診してください。",
  ko: "통증이 빠르게 심해지거나 붉은 부위가 퍼지거나 열이 나거나 고름이 많이 나오면 더 일찍 내원하세요.",
  uk: "Зверніться раніше, якщо біль швидко посилюється, почервоніння поширюється, є лихоманка або виходить багато гною.",
  ru: "Обратитесь раньше, если боль быстро усиливается, покраснение распространяется, есть температура или выходит много гноя."
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
  item("acne_vulgaris", "痤瘡與毛囊相關疾病", "青春痘／痤瘡", { id: "jerawat", en: "acne", vi: "mụn trứng cá", th: "สิว", ja: "にきび", ko: "여드름", uk: "вугри", ru: "акне (угри)" }, causes.pore, treatmentKinds.acne, { severity: "常見慢性皮膚病", tags: ["青春痘", "痤瘡", "粉刺", "毛囊", "發炎", "外用藥"], explain: acneExplain, treat: acneTreat, care: acneCare, warn: acneWarn, follow: acneFollow, zhExplain: "這通常和毛孔阻塞、皮脂分泌、皮膚細菌與發炎反應有關，不是單純因為臉沒有洗乾淨。", zhTreat: "治療可能包含外用藥，必要時加上口服藥。明顯改善通常需要 6 到 12 週，前期可能有乾燥、脫皮或輕微刺痛。", zhCare: "請溫和清潔，使用不易阻塞毛孔的保濕與防曬產品，不要擠痘痘。", zhWarn: "如果刺激很嚴重、腫痛明顯、化膿很多或出現藥物過敏，請提早回診。", zhFollow: "請規律回診調整藥物，不要只用前幾天的變化判斷有沒有效。" }),
  item("folliculitis", "痤瘡與毛囊相關疾病", "毛囊炎", { id: "folikulitis", en: "folliculitis", vi: "viêm nang lông", th: "รูขุมขนอักเสบ", ja: "毛嚢炎", ko: "모낭염", uk: "фолікуліт", ru: "фолликулит" }, causes.bacteria, treatmentKinds.antibiotic, { tags: ["毛囊炎", "毛囊", "膿皰", "抗生素"], contagious: true, explain: folliculitisExplain, treat: folliculitisTreat, care: folliculitisCare, warn: returnIfWorseWarn, zhExplain: "這是毛囊周圍發炎，常和汗水、摩擦、悶熱、刮毛或皮膚細菌刺激有關。", zhTreat: "治療可能包含外用藥、抗菌清潔產品，較嚴重時可能需要抗生素。", zhCare: "請保持局部乾爽，減少摩擦，暫時避免刮毛，不要擠膿皰。", zhWarn: "如果疹子變多、變痛、化膿，或照指示用藥後仍沒有改善，請提早回診。" }),
  item("bacterial_pustules", "痤瘡與毛囊相關疾病", "細菌感染的膿皰", { id: "bintil bernanah karena bakteri", en: "bacterial pustules", vi: "mụn mủ do vi khuẩn", th: "ตุ่มหนองจากแบคทีเรีย", ja: "細菌性膿疱", ko: "세균성 농포", uk: "бактеріальні пустули", ru: "бактериальные пустулы" }, causes.bacteria, treatmentKinds.antibiotic, { tags: ["細菌", "膿皰", "化膿", "抗生素"], contagious: true, explain: pustuleExplain, treat: antibioticCourseTreat, care: pustuleCare, warn: pustuleWarn, zhExplain: "這是皮膚表層的細菌感染，可能出現紅、腫、痛或膿皰。", zhTreat: "治療會依範圍與嚴重度使用外用或口服抗生素。若有口服抗生素，請按時、按劑量、把整個療程吃完；就算紅腫消退或膿排出，也不要自行提早停藥。", zhCare: "不要擠膿或摳破。碰到病灶後請洗手，也不要共用毛巾。", zhWarn: "如果紅腫快速擴大、疼痛加重、發燒或膿變多，請提早回診。" }),
  item("keratosis_pilaris", "痤瘡與毛囊相關疾病", "毛孔角化症", { id: "keratosis pilaris", en: "keratosis pilaris", vi: "dày sừng nang lông", th: "ขนคุดผิวหนัง", ja: "毛孔性苔癬", ko: "모공각화증", uk: "волосяний кератоз", ru: "волосяной кератоз" }, causes.inflammation, treatmentKinds.observe, { tags: ["毛孔角化", "雞皮", "保濕", "角質"], severity: "常見良性皮膚變化", explain: keratosisPilarisExplain, treat: keratosisPilarisTreat, care: keratosisPilarisCare, warn: keratosisPilarisWarn, zhExplain: "這是毛孔周圍角質堆積造成的小顆粒，常見、良性，不是感染，也不是清潔不夠。", zhTreat: "治療以規律保濕和必要時角質調理外用藥為主，改善通常比較慢，也不一定會完全消失。", zhCare: "請規律保濕，尤其洗澡後要擦。避免用力搓洗、刷洗或擠小顆粒。", zhWarn: "如果變得很紅、疼痛，或抓破後有感染跡象，請回診。" }),
  item("inflamed_epidermal_cyst", "痤瘡與毛囊相關疾病", "皮脂腺囊腫／表皮囊腫發炎", { id: "kista epidermal yang meradang", en: "inflamed epidermal cyst", vi: "nang biểu bì bị viêm", th: "ซีสต์ผิวหนังอักเสบ", ja: "炎症性表皮嚢腫", ko: "염증성 표피낭종", uk: "запалена епідермальна кіста", ru: "воспалённая эпидермальная киста" }, causes.inflammation, treatmentKinds.procedure, { tags: ["皮脂腺囊腫", "表皮囊腫", "發炎", "切開", "抗生素"], explain: cystExplain, treat: cystTreat, care: cystCare, warn: cystWarn, follow: commonFollow({ id: "Setelah peradangan mereda, dokter akan menilai apakah kista perlu diangkat.", en: "After the inflammation settles, the doctor will decide whether the cyst should be removed.", vi: "Sau khi viêm ổn định, bác sĩ sẽ đánh giá có cần lấy nang hay không.", th: "เมื่ออักเสบสงบแล้ว แพทย์จะประเมินว่าควรเอาซีสต์ออกหรือไม่", ja: "炎症が落ち着いてから、嚢腫を取る必要があるか判断します。", ko: "염증이 가라앉은 뒤 낭종 제거가 필요한지 평가합니다.", uk: "Після стихання запалення лікар оцінить, чи потрібно видаляти кісту.", ru: "После стихания воспаления врач оценит, нужно ли удалять кисту." }), zhExplain: "這是皮膚下方裝著角質的小囊袋發炎，不是因為皮膚髒造成。", zhTreat: "治療可能包含消炎藥、必要時抗生素，或在腫脹化膿時引流。是否完整切除通常等發炎消退後再評估。", zhCare: "請不要自己擠、刺破或用力按摩，否則可能讓發炎擴大或形成傷口。", zhWarn: "如果疼痛快速加重、紅腫擴大、發燒或流出很多膿，請提早回診。", zhFollow: "等發炎消退後，醫師會再評估囊腫是否需要處理。" }),

  item("rosacea", "慢性發炎性皮膚病", "酒糟／玫瑰斑", { id: "rosacea", en: "rosacea", vi: "trứng cá đỏ", th: "โรซาเซีย", ja: "酒さ", ko: "주사 피부염", uk: "розацеа", ru: "розацеа" }, causes.inflammation, treatmentKinds.antiInflammatory, { severity: "常見慢性發炎性皮膚病", tags: ["酒糟", "玫瑰斑", "臉紅", "丘疹", "敏感"], follow: followLong, care: commonCare({ id: "Gunakan tabir surya dan hindari pemicu seperti panas, alkohol, makanan pedas, sinar matahari, dan produk yang menyengat.", en: "Use sunscreen and avoid triggers such as heat, alcohol, spicy food, sunlight, and stinging products.", vi: "Dùng kem chống nắng và tránh nóng, rượu, đồ cay, nắng, sản phẩm gây châm chích.", th: "ใช้กันแดดและหลีกเลี่ยงความร้อน แอลกอฮอล์ อาหารเผ็ด แดด และผลิตภัณฑ์ที่แสบผิว", ja: "日焼け止めを使い、熱、アルコール、辛い食べ物、日光、しみる製品を避けてください。", ko: "자외선 차단제를 사용하고 열, 술, 매운 음식, 햇빛, 따가운 제품을 피하세요.", uk: "Користуйтеся сонцезахисним кремом і уникайте тригерів, таких як тепло, алкоголь, гостра їжа, сонячне світло і подразнюючі засоби.", ru: "Используйте солнцезащитный крем и избегайте триггеров, таких как тепло, алкоголь, острая пища, солнечный свет и раздражающие средства." }), warn: commonWarn({ id: "Bila mata merah, perih, kering, atau terasa mengganjal, beri tahu dokter.", en: "If your eyes become red, stinging, dry, or gritty, tell the doctor.", vi: "Nếu mắt đỏ, rát, khô hoặc cộm, hãy báo cho bác sĩ.", th: "ถ้าตาแดง แสบ แห้ง หรือเหมือนมีสิ่งแปลกปลอม ให้แจ้งแพทย์", ja: "目の赤み、しみる感じ、乾燥、異物感があれば医師に伝えてください。", ko: "눈이 붉거나 따갑거나 건조하거나 이물감이 있으면 의사에게 알려주세요.", uk: "Якщо очі почервоніли, відчуваєте печіння, сухість або сторонній предмет, повідомте лікаря.", ru: "Если глаза покраснели, чувствуете жжение, сухость или инородный предмет, сообщите врачу." }), zhCause: "臉部血管反應、皮膚敏感與發炎", zhTreat: "治療可能包含外用藥、口服藥與保養調整。酒糟容易反覆，重點是控制發炎與減少誘發。", zhCare: "防曬是治療的一部分。請避免酒精、辛辣、悶熱、三溫暖與刺激性保養品。臉上的藥膏請依醫師指示，不要自行長期擦不明藥膏。", zhWarn: "如果眼睛紅、刺、乾澀或有異物感，請回診告知醫師。" }),
  item("psoriasis", "慢性發炎性皮膚病", "乾癬", { id: "psoriasis", en: "psoriasis", vi: "vảy nến", th: "สะเก็ดเงิน", ja: "乾癬", ko: "건선", uk: "псоріаз", ru: "псориаз" }, causes.inflammation, treatmentKinds.antiInflammatory, { severity: "慢性免疫相關皮膚病", tags: ["乾癬", "脫屑", "免疫", "慢性", "類固醇"], follow: followLong, zhCause: "免疫反應造成皮膚更新過快與發炎", zhTreat: "治療可能包含外用藥、照光、口服或注射藥物，依嚴重度調整。", zhWarn: "若有關節疼痛、指甲變形或皮疹快速惡化，請告知醫師。" }),
  item("atopic_dermatitis", "慢性發炎性皮膚病", "異位性皮膚炎", { id: "dermatitis atopik", en: "atopic dermatitis", vi: "viêm da cơ địa", th: "ผื่นภูมิแพ้ผิวหนัง", ja: "アトピー性皮膚炎", ko: "아토피 피부염", uk: "атопічний дерматит", ru: "атопический дерматит" }, causes.inflammation, treatmentKinds.antiInflammatory, { severity: "慢性反覆皮膚炎", tags: ["異位性皮膚炎", "濕疹", "癢", "保濕", "類固醇"], follow: followLong, care: careDry, zhCause: "皮膚屏障較弱、過敏體質與發炎反應", zhCare: "請規律保濕，洗澡水不要太熱，避免香精、粗糙衣物與已知誘發因子。" }),
  item("eczema", "慢性發炎性皮膚病", "濕疹", { id: "eksim", en: "eczema", vi: "chàm", th: "ผื่นผิวหนังอักเสบ", ja: "湿疹", ko: "습진", uk: "екзема", ru: "экзема" }, causes.inflammation, treatmentKinds.antiInflammatory, { tags: ["濕疹", "皮膚炎", "癢", "外用藥", "保濕"], care: careDry, zhCause: "皮膚屏障受損、刺激物、過敏或乾燥", zhTreat: "治療通常包含外用消炎藥與保濕修復。" }),
  item("seborrheic_dermatitis", "慢性發炎性皮膚病", "脂漏性皮膚炎", { id: "dermatitis seboroik", en: "seborrheic dermatitis", vi: "viêm da tiết bã", th: "ผื่นผิวหนังอักเสบเซ็บเดิร์ม", ja: "脂漏性皮膚炎", ko: "지루성 피부염", uk: "себорейний дерматит", ru: "себорейный дерматит" }, causes.inflammation, treatmentKinds.antiInflammatory, { tags: ["脂漏", "頭皮屑", "臉部", "發炎", "黴菌"], follow: followLong, zhCause: "皮脂分泌、皮膚發炎與皮屑芽孢菌相關反應", zhTreat: "治療可能包含抗黴菌洗劑、外用消炎藥或頭皮藥水。", zhCare: "請規律使用醫師建議的洗劑，不要過度搔抓頭皮或臉部。" }),
  item("dyshidrotic_eczema", "慢性發炎性皮膚病", "汗皰疹", { id: "eksim dishidrotik", en: "dyshidrotic eczema", vi: "chàm tổ đỉa", th: "ผื่นตุ่มน้ำที่มือเท้า", ja: "汗疱", ko: "한포진", uk: "дисгідротична екзема", ru: "дисгидротическая экзема" }, causes.inflammation, treatmentKinds.antiInflammatory, { tags: ["汗皰疹", "手", "腳", "水泡", "癢"], care: careDry, zhCause: "手腳皮膚發炎、汗水悶熱、刺激物或壓力", zhWarn: "水泡破掉後要避免感染，若明顯疼痛、流膿或紅腫擴大請提早回診。" }),
  item("contact_dermatitis", "慢性發炎性皮膚病", "接觸性皮膚炎", { id: "dermatitis kontak", en: "contact dermatitis", vi: "viêm da tiếp xúc", th: "ผื่นแพ้สัมผัส", ja: "接触皮膚炎", ko: "접촉피부염", uk: "контактний дерматит", ru: "контактный дерматит" }, causes.allergy, treatmentKinds.antiInflammatory, { tags: ["接觸性皮膚炎", "過敏", "刺激", "類固醇"], care: commonCare({ id: "Coba hentikan benda yang dicurigai, seperti krim baru, plester, logam, pewarna rambut, atau sarung tangan.", en: "Try stopping suspected triggers such as new creams, tapes, metals, hair dye, or gloves.", vi: "Ngưng thử các yếu tố nghi ngờ như kem mới, băng keo, kim loại, thuốc nhuộm tóc hoặc găng tay.", th: "ลองหยุดสิ่งที่สงสัย เช่น ครีมใหม่ เทป โลหะ ยาย้อมผม หรือถุงมือ", ja: "新しいクリーム、テープ、金属、染毛剤、手袋など疑わしい物を避けてください。", ko: "새 크림, 테이프, 금속, 염색약, 장갑 등 의심되는 물질을 피하세요.", uk: "Спробуйте припинити підозрілі речі, такі як нові креми, пластирі, метали, фарбу для волосся або рукавички.", ru: "Попробуйте прекратить подозрительные вещи, такие как новые кремы, пластыри, металлы, краску для волос или перчатки." }), zhCause: "皮膚接觸刺激物或過敏原後產生發炎", zhCare: "請暫停可疑的新保養品、藥膏、貼布、金屬、染髮劑或手套。" }),
  item("pityriasis_rosea", "慢性發炎性皮膚病", "玫瑰糠疹", { id: "pitiriasis rosea", en: "pityriasis rosea", vi: "vảy phấn hồng", th: "ผื่นกุหลาบ", ja: "ジベルばら色粃糠疹", ko: "장미색 비강진", uk: "рожевий лишай (питиріаз рожевий)", ru: "розовый лишай (питириаз розовый)" }, causes.inflammation, treatmentKinds.antiInflammatory, { severity: "常見自限性皮疹", tags: ["玫瑰糠疹", "橢圓紅疹", "脫屑", "癢", "自限性"], typicalFollowUp: "多數 6 到 8 週會逐漸改善，若症狀明顯或超過預期請回診。", explain: commonExplain({ id: "pitiriasis rosea", en: "pityriasis rosea", vi: "vảy phấn hồng", th: "ผื่นกุหลาบ", ja: "ジベルばら色粃糠疹", ko: "장미색 비강진", uk: "рожевий лишай (питиріаз рожевий)", ru: "розовый лишай (питириаз розовый)" }, { id: "reaksi peradangan kulit yang biasanya membaik sendiri dalam beberapa minggu", en: "a skin inflammation that usually improves on its own over several weeks", vi: "phản ứng viêm da thường tự cải thiện trong vài tuần", th: "การอักเสบของผิวหนังที่มักค่อย ๆ ดีขึ้นเองในหลายสัปดาห์", ja: "数週間で自然に改善することが多い皮膚の炎症", ko: "대개 몇 주에 걸쳐 저절로 좋아지는 피부 염증", uk: "запалення шкіри, яке зазвичай минає самостійно за кілька тижнів", ru: "воспаление кожи, которое обычно проходит самостоятельно за несколько недель" }), treat: commonTreat({ id: "obat untuk mengurangi gatal bila perlu; sebagian besar kasus tidak perlu pengobatan kuat", en: "medicine to reduce itching if needed; most cases do not need strong treatment", vi: "thuốc giảm ngứa khi cần; đa số không cần điều trị mạnh", th: "ยาลดคันเมื่อจำเป็น ส่วนใหญ่ไม่ต้องใช้การรักษาแรง", ja: "必要に応じたかゆみ止めで、多くは強い治療を必要としません", ko: "필요 시 가려움 조절 약을 사용하며 대부분 강한 치료는 필요하지 않습니다", uk: "ліки для зменшення свербежу за потреби; більшість випадків не потребує сильного лікування", ru: "лекарства для уменьшения зуда при необходимости; большинство случаев не требует сильного лечения" }), care: commonCare({ id: "Hindari mandi air terlalu panas, gunakan sabun lembut, dan jangan menggaruk kuat.", en: "Avoid very hot showers, use gentle soap, and do not scratch hard.", vi: "Tránh tắm nước quá nóng, dùng xà phòng dịu nhẹ và không gãi mạnh.", th: "หลีกเลี่ยงการอาบน้ำร้อนจัด ใช้สบู่อ่อนโยน และอย่าเกาแรง", ja: "熱すぎる入浴を避け、低刺激の石けんを使い、強くかかないでください。", ko: "너무 뜨거운 샤워를 피하고 순한 비누를 사용하며 세게 긁지 마세요.", uk: "Уникайте дуже гарячого душу, користуйтеся м'яким милом і не подряпайте сильно.", ru: "Избегайте очень горячего душа, используйте мягкое мыло и не царапайте сильно." }), warn: commonWarn({ id: "Kontrol lebih awal bila ruam sangat nyeri, bernanah, cepat meluas, atau tidak membaik setelah sekitar 8 minggu.", en: "Come back earlier if the rash is very painful, has pus, spreads quickly, or does not improve after about 8 weeks.", vi: "Tái khám sớm nếu ban rất đau, có mủ, lan nhanh hoặc không cải thiện sau khoảng 8 tuần.", th: "กลับมาตรวจก่อนนัดถ้าผื่นปวดมาก มีหนอง ลามเร็ว หรือไม่ดีขึ้นหลังประมาณ 8 สัปดาห์", ja: "強い痛み、膿、急な広がり、または約8週間たっても改善しない場合は早めに受診してください。", ko: "발진이 매우 아프거나 고름이 나거나 빠르게 퍼지거나 약 8주 후에도 좋아지지 않으면 더 일찍 내원하세요.", uk: "Зверніться раніше, якщо висип дуже болючий, з гноєм, швидко поширюється або не покращується після приблизно 8 тижнів.", ru: "Обратитесь раньше, если сыпь очень болезненная, с гноем, быстро распространяется или не улучшается после примерно 8 недель." }), follow: commonFollow({ id: "Biasanya membaik bertahap dalam 6 sampai 8 minggu.", en: "It usually improves gradually within 6 to 8 weeks.", vi: "Thường cải thiện dần trong 6 đến 8 tuần.", th: "มักค่อย ๆ ดีขึ้นภายใน 6 ถึง 8 สัปดาห์", ja: "通常6から8週間で少しずつ改善します。", ko: "보통 6-8주 안에 서서히 좋아집니다.", uk: "Зазвичай поступово покращується протягом 6-8 тижнів.", ru: "Обычно постепенно улучшается в течение 6-8 недель." }), zhCause: "一種常見的發炎性皮疹，常先出現一塊較大的紅斑，之後身體出現多個橢圓、帶細屑的紅疹", zhTreat: "大多數玫瑰糠疹會自己慢慢好，治療以減少搔癢與不舒服為主，必要時使用止癢藥或外用藥。", zhCare: "請避免熱水燙洗、用力搓洗或抓破皮膚，洗澡和保濕請使用溫和產品。", zhWarn: "如果疹子很痛、化膿、快速擴大，或約 8 週後仍沒有改善，請提早回診。", zhFollow: "多數會在 6 到 8 週內逐漸改善，少數人可能拖得更久。" }),

  item("herpes_zoster", "病毒感染", "帶狀皰疹", { id: "herpes zoster", en: "shingles", vi: "zona thần kinh", th: "งูสวัด", ja: "帯状疱疹", ko: "대상포진", uk: "оперізувальний герпес", ru: "опоясывающий лишай" }, causes.virus, treatmentKinds.antiviral, { tags: ["帶狀皰疹", "水泡", "疼痛", "抗病毒"], contagious: true, treat: zosterTreat, warn: zosterWarn, zhCause: "水痘病毒再活化，常伴隨單側疼痛與水泡", zhTreat: "治療以抗病毒藥物與疼痛控制為主。抗病毒藥在出疹後 72 小時內開始效果最好，可以縮短病程並降低後續疼痛風險。", zhCare: "請保持水泡乾淨，避免接觸孕婦、嬰兒或免疫力低下者。", zhWarn: "如果疹子長在眼睛周圍、額頭或鼻尖，請儘快回診或看眼科，因為可能影響眼睛。" }),
  item("herpes_simplex", "病毒感染", "單純性皰疹", { id: "herpes simpleks", en: "herpes simplex", vi: "herpes simplex", th: "เริม", ja: "単純ヘルペス", ko: "단순포진", uk: "простий герпес", ru: "простой герпес" }, causes.virus, treatmentKinds.antiviral, { tags: ["單純皰疹", "唇皰疹", "水泡", "抗病毒"], contagious: true, follow: followLong, treat: commonTreat({ id: "obat antivirus. Bila Anda sering kambuh, mulai obat segera saat terasa kesemutan, panas, atau perih sebelum lepuh muncul", en: "antiviral medicine. If you have recurrences, start medicine as soon as you feel tingling, burning, or soreness before blisters appear", vi: "thuốc kháng vi-rút. Nếu hay tái phát, hãy bắt đầu thuốc ngay khi có cảm giác châm chích, nóng rát hoặc đau trước khi nổi bóng nước", th: "ยาต้านไวรัส หากเป็นซ้ำบ่อย ให้เริ่มยาทันทีเมื่อเริ่มรู้สึกยิบ ๆ แสบร้อน หรือเจ็บก่อนมีตุ่มน้ำ", ja: "抗ウイルス薬です。再発を繰り返す場合は、水ぶくれが出る前のピリピリ感、熱感、痛みを感じた時点で早めに薬を始めてください", ko: "항바이러스제입니다. 자주 재발한다면 물집이 생기기 전 따끔거림, 화끈거림, 통증이 느껴질 때 바로 약을 시작하세요", uk: "противірусні засоби. Якщо у вас часті рецидиви, починайте прийом ліків одразу, як тільки відчуєте поколювання, печіння або біль перед появою пухирів", ru: "противовирусные средства. Если у вас частые рецидивы, начинайте приём лекарств сразу, как только почувствуете покалывание, жжение или боль до появления пузырей" }), zhCause: "單純皰疹病毒感染，可能在疲累、壓力或免疫下降時復發", zhTreat: "治療以抗病毒藥為主。如果你已經有過皰疹經驗，下次在水泡出來前感覺刺癢、灼熱或刺痛時就立刻開始服藥，效果最好。", zhCare: "水泡或破皮時請避免親吻、共用餐具或接觸他人黏膜。" }),
  item("viral_warts", "病毒感染", "病毒疣", { id: "kutil karena virus", en: "viral warts", vi: "mụn cóc do vi-rút", th: "หูดจากไวรัส", ja: "ウイルス性いぼ", ko: "바이러스 사마귀", uk: "вірусні бородавки", ru: "вирусные бородавки" }, causes.virus, treatmentKinds.procedure, {
    tags: ["病毒疣", "疣", "冷凍", "傳染", "七天", "健保"], contagious: true, typicalFollowUp: "台灣健保下，冷凍治療通常每七天可以做一次，請依醫師安排回診。",
    customZh: {
      summary: "你的皮膚狀況是病毒疣，這是病毒感染造成的疣。",
      explanation: "它可能會傳染給自己身體其他部位，也可能傳染給別人。不要摳、剪、刮或自行挖除，這樣可能讓病毒擴散或造成傷口感染。",
      treatment: "你這次的病毒疣，我們會使用冷凍治療來處理。冷凍治療就是用很低溫的液態氮把疣冷凍破壞。醫師會用噴霧或棉棒把液態氮點在疣上，當下會刺痛或灼熱幾秒鐘。治療後可能會紅腫、疼痛、起水泡或結痂，這些通常是正常反應。因為病毒疣可能長得比較深，也可能有看不見的小病灶，所以通常要重複治療好幾次，不一定一次就會好。在台灣健保下，冷凍治療通常每七天可以做一次，請依醫師安排治療。",
      homeCare: "治療後請保持局部清潔乾燥，不要自行撕掉水泡皮或痂皮。若在手腳，請避免共用毛巾、指甲剪或直接接觸他人傷口。",
      warning: "治療後可能會紅腫、疼痛、起水泡或結痂。如果疼痛嚴重、感染、流膿或紅腫擴大，請提早回診。",
      followUp: "病毒疣常需要規律治療數週到數月，請依醫師安排定期回診。"
    },
    customTranslations: {
      id: { summary: "Kondisi kulit Anda adalah kutil karena virus.", explanation: "Ini adalah kutil yang disebabkan oleh infeksi virus. Kutil dapat menyebar ke bagian tubuh lain atau menular ke orang lain. Jangan dikorek, dipotong, dicukur, atau dicabut sendiri.", treatment: "Untuk kutil virus Anda kali ini, kami akan menggunakan terapi beku. Terapi beku menggunakan nitrogen cair bersuhu sangat rendah untuk membekukan dan merusak kutil. Dokter akan menyemprotkan atau menempelkan nitrogen cair dengan kapas pada kutil; biasanya terasa perih, panas, atau nyeri selama beberapa detik. Setelah terapi dapat muncul merah, bengkak, nyeri, lepuh, atau keropeng, dan ini biasanya reaksi normal. Karena kutil bisa lebih dalam atau ada bagian kecil yang belum terlihat, terapi biasanya perlu diulang beberapa kali dan belum tentu hilang dalam satu kali terapi. Di bawah sistem Asuransi Kesehatan Nasional Taiwan, terapi beku biasanya dapat dilakukan setiap 7 hari.", homeCare: "Setelah terapi, jaga area tetap bersih dan kering. Jangan mengelupas lepuh atau keropeng sendiri. Jangan berbagi handuk atau gunting kuku.", warning: "Setelah terapi dapat muncul merah, bengkak, nyeri, lepuh, atau keropeng. Jika nyeri berat, terinfeksi, bernanah, atau kemerahan makin luas, kontrol lebih awal.", followUp: "Silakan kontrol teratur sesuai jadwal dokter karena kutil sering membutuhkan beberapa kali terapi." },
      en: { summary: "Your skin condition is viral warts.", explanation: "These warts are caused by a viral infection. They can spread to other parts of your body and may spread to other people. Do not pick, cut, shave, or dig them out by yourself.", treatment: "For your viral wart this time, we will use cryotherapy. Cryotherapy uses very cold liquid nitrogen to freeze and destroy the wart. The doctor will spray liquid nitrogen onto the wart or apply it with a cotton swab; you may feel stinging, burning, or aching for a few seconds. After treatment, redness, swelling, pain, blisters, or scabs may occur, and these are usually normal reactions. Because viral warts may be deeper or may have small areas that are not easy to see, treatment usually needs to be repeated several times and may not clear with only one treatment. Under Taiwan's National Health Insurance, cryotherapy can usually be done once every 7 days.", homeCare: "After treatment, keep the area clean and dry. Do not peel off blisters or scabs by yourself. Avoid sharing towels or nail clippers.", warning: "After treatment, redness, swelling, pain, blisters, or scabs may occur. Come back earlier if pain is severe, infection develops, pus appears, or redness and swelling spread.", followUp: "Please return regularly as arranged, because viral warts often need several treatments over weeks to months." },
      vi: { summary: "Tình trạng da của bạn là mụn cóc do vi-rút.", explanation: "Đây là mụn cóc do nhiễm vi-rút. Nó có thể lan sang vùng da khác của bạn hoặc lây cho người khác. Không tự cạy, cắt, cạo hoặc đào bỏ.", treatment: "Lần này, chúng tôi sẽ dùng điều trị áp lạnh để xử lý mụn cóc do vi-rút của bạn. Điều trị áp lạnh dùng nitơ lỏng rất lạnh để làm đông và phá hủy mụn cóc. Bác sĩ sẽ xịt nitơ lỏng lên mụn cóc hoặc chấm bằng tăm bông; lúc đó có thể châm chích, nóng rát hoặc đau trong vài giây. Sau điều trị có thể đỏ, sưng, đau, nổi bóng nước hoặc đóng mài, thường là phản ứng bình thường. Vì mụn cóc có thể ăn sâu hơn hoặc có vùng nhỏ chưa nhìn thấy rõ, điều trị thường cần làm nhiều lần, không nhất thiết khỏi sau một lần. Theo Bảo hiểm Y tế Quốc gia tại Đài Loan, áp lạnh thường có thể làm mỗi 7 ngày một lần.", homeCare: "Sau điều trị, giữ vùng da sạch và khô. Không tự bóc bóng nước hoặc mài. Tránh dùng chung khăn hoặc kềm cắt móng.", warning: "Sau điều trị có thể đỏ, sưng, đau, nổi bóng nước hoặc đóng mài. Nếu đau nhiều, nhiễm trùng, chảy mủ hoặc đỏ sưng lan rộng, hãy tái khám sớm.", followUp: "Vui lòng tái khám đều theo lịch bác sĩ, vì mụn cóc thường cần nhiều lần điều trị trong vài tuần đến vài tháng." },
      th: { summary: "ปัญหาผิวหนังของคุณคือหูดจากไวรัส", explanation: "หูดนี้เกิดจากการติดเชื้อไวรัส อาจแพร่ไปยังผิวหนังส่วนอื่นของคุณหรือแพร่ให้ผู้อื่นได้ อย่าแกะ ตัด โกน หรือขุดออกเอง", treatment: "ครั้งนี้เราจะใช้การจี้เย็นเพื่อรักษาหูดจากไวรัสของคุณ การจี้เย็นคือการใช้ไนโตรเจนเหลวที่เย็นมากเพื่อแช่แข็งและทำลายหูด แพทย์จะพ่นไนโตรเจนเหลวลงบนหูด หรือแต้มด้วยก้านสำลี ระหว่างทำอาจแสบ ร้อน หรือปวดไม่กี่วินาที หลังรักษาอาจแดง บวม ปวด เป็นตุ่มน้ำ หรือเป็นสะเก็ด ซึ่งมักเป็นปฏิกิริยาปกติ เพราะหูดอาจอยู่ลึกหรือมีรอยโรคเล็ก ๆ ที่ยังมองไม่ชัด จึงมักต้องทำซ้ำหลายครั้ง และไม่จำเป็นต้องหายในครั้งเดียว ภายใต้ระบบประกันสุขภาพแห่งชาติไต้หวัน โดยทั่วไปสามารถจี้เย็นได้ทุก 7 วัน", homeCare: "หลังรักษาให้รักษาบริเวณนั้นให้สะอาดและแห้ง อย่าลอกตุ่มน้ำหรือสะเก็ดเอง หลีกเลี่ยงการใช้ผ้าเช็ดตัวหรือกรรไกรตัดเล็บร่วมกัน", warning: "หลังรักษาอาจแดง บวม ปวด เป็นตุ่มน้ำ หรือเป็นสะเก็ด หากปวดมาก ติดเชื้อ มีหนอง หรือแดงบวมลาม ควรมาพบแพทย์ก่อนนัด", followUp: "กรุณามาตรวจตามนัดสม่ำเสมอ เพราะหูดมักต้องรักษาหลายครั้งในช่วงหลายสัปดาห์ถึงหลายเดือน" },
      ja: { summary: "あなたの皮膚の状態はウイルス性いぼです。", explanation: "これはウイルス感染によってできるいぼです。自分の体のほかの部位や、ほかの人にうつることがあります。自分でむしる、切る、削る、掘り取ることはしないでください。", treatment: "今回のウイルス性いぼには、冷凍療法を行います。冷凍療法は、とても低温の液体窒素でいぼを凍らせて壊す治療です。医師がスプレーまたは綿棒で液体窒素をいぼに当てます。その時、数秒間しみる感じ、熱い感じ、痛みを感じることがあります。治療後に赤み、腫れ、痛み、水ぶくれ、かさぶたが出ることがあり、通常はよくある反応です。ウイルス性いぼは深いことや、まだ見えにくい小さな病変があることもあるため、何回も繰り返す必要があり、1回で治るとは限りません。台湾の国民健康保険では、通常7日に1回冷凍療法を受けられます。", homeCare: "治療後は清潔で乾いた状態を保ってください。水ぶくれやかさぶたを自分ではがさないでください。タオルや爪切りの共有は避けてください。", warning: "治療後に赤み、腫れ、痛み、水ぶくれ、かさぶたが出ることがあります。強い痛み、感染、膿、赤みや腫れの拡大があれば早めに受診してください。", followUp: "ウイルス性いぼは数週から数か月、複数回の治療が必要なことがあります。医師の指示どおり定期的に再診してください。" },
      ko: { summary: "당신의 피부 상태는 바이러스 사마귀입니다.", explanation: "이것은 바이러스 감염으로 생긴 사마귀입니다. 몸의 다른 부위나 다른 사람에게 옮을 수 있습니다. 직접 뜯거나 자르거나 밀거나 파내지 마세요.", treatment: "이번 바이러스 사마귀는 냉동치료로 치료하겠습니다. 냉동치료는 매우 차가운 액체질소로 사마귀를 얼려서 파괴하는 치료입니다. 의사가 스프레이나 면봉으로 액체질소를 사마귀에 대며, 그 순간 몇 초 동안 따갑거나 화끈거리거나 아플 수 있습니다. 치료 후 붉어짐, 부기, 통증, 물집, 딱지가 생길 수 있고 보통은 정상적인 반응입니다. 바이러스 사마귀는 깊게 자라거나 아직 잘 보이지 않는 작은 병변이 있을 수 있어 보통 여러 번 반복해야 하며 한 번에 없어지지 않을 수 있습니다. 대만 국민건강보험에서는 보통 7일마다 한 번 냉동치료를 받을 수 있습니다.", homeCare: "치료 후에는 부위를 깨끗하고 건조하게 유지하세요. 물집이나 딱지를 스스로 떼지 마세요. 수건이나 손톱깎이를 함께 쓰지 마세요.", warning: "치료 후 붉어짐, 부기, 통증, 물집, 딱지가 생길 수 있습니다. 통증이 심하거나 감염, 고름, 붉음과 부기가 퍼지면 더 일찍 내원하세요.", followUp: "바이러스 사마귀는 수주에서 수개월 동안 여러 번 치료가 필요할 수 있으니 정기적으로 내원해 주세요." },
      uk: { summary: "Ваш стан шкіри — вірусні бородавки.", explanation: "Ці бородавки спричинені вірусною інфекцією. Вони можуть поширюватися на інші ділянки вашого тіла і можуть передаватися іншим людям. Не колупайте, не зрізайте, не голіть і не виколупуйте їх самостійно.", treatment: "Цього разу для лікування вашої вірусної бородавки ми застосуємо кріотерапію. Кріотерапія використовує дуже холодний рідкий азот, щоб заморозити і зруйнувати бородавку. Лікар розпорошить рідкий азот на бородавку або нанесе його ватним тампоном; кілька секунд ви можете відчувати поколювання, печіння або біль. Після процедури можуть з'явитися почервоніння, набряк, біль, пухирі або кірочки — це зазвичай нормальна реакція. Оскільки вірусні бородавки можуть бути глибшими або мати маленькі ділянки, які важко побачити, лікування зазвичай потребує кількох повторень і не завжди минає за один сеанс. У межах Національного медичного страхування Тайваню кріотерапію зазвичай можна проводити раз на 7 днів.", homeCare: "Після процедури тримайте ділянку чистою і сухою. Не зривайте пухирі або кірочки самостійно. Не діліться рушниками чи кусачками для нігтів.", warning: "Після процедури можуть з'явитися почервоніння, набряк, біль, пухирі або кірочки. Зверніться раніше, якщо біль сильний, з'являється інфекція, гній або почервоніння і набряк поширюються.", followUp: "Будь ласка, приходьте регулярно за призначенням, оскільки вірусні бородавки часто потребують кількох процедур протягом тижнів або місяців." },
      ru: { summary: "Ваше состояние кожи — вирусные бородавки.", explanation: "Эти бородавки вызваны вирусной инфекцией. Они могут распространяться на другие участки вашего тела и могут передаваться другим людям. Не ковыряйте, не срезайте, не брейте и не выковыривайте их самостоятельно.", treatment: "В этот раз для лечения вашей вирусной бородавки мы применим криотерапию. Криотерапия использует очень холодный жидкий азот, чтобы заморозить и разрушить бородавку. Врач распылит жидкий азот на бородавку или нанесёт его ватной палочкой; в течение нескольких секунд вы можете чувствовать покалывание, жжение или боль. После процедуры могут появиться покраснение, отёк, боль, пузыри или корочки — это обычно нормальная реакция. Поскольку вирусные бородавки могут быть более глубокими или иметь небольшие участки, которые трудно увидеть, лечение обычно требует нескольких повторений и не всегда проходит за один сеанс. В рамках Национального медицинского страхования Тайваня криотерапию обычно можно проводить раз в 7 дней.", homeCare: "После процедуры держите участок чистым и сухим. Не отрывайте пузыри или корочки самостоятельно. Не делитесь полотенцами или кусачками для ногтей.", warning: "После процедуры могут появиться покраснение, отёк, боль, пузыри или корочки. Обратитесь раньше, если боль сильная, появляется инфекция, гной или покраснение и отёк распространяются.", followUp: "Пожалуйста, приходите регулярно по назначению, поскольку вирусные бородавки часто требуют нескольких процедур в течение недель или месяцев." }
    }
  }),
  item("molluscum_contagiosum", "病毒感染", "傳染性軟疣", { id: "molluscum contagiosum", en: "molluscum contagiosum", vi: "u mềm lây", th: "หูดข้าวสุก", ja: "伝染性軟属腫", ko: "전염성 연속종", uk: "контагіозний молюск", ru: "контагиозный моллюск" }, causes.virus, treatmentKinds.procedure, { tags: ["傳染性軟疣", "軟疣", "病毒", "傳染"], contagious: true, care: careInfection, zhCause: "病毒感染造成小顆、中央凹陷的丘疹", zhCare: "請避免搔抓與共用毛巾，兒童或免疫力低下者可能較容易擴散。" }),

  item("tinea_corporis_cruris", "黴菌與寄生蟲相關", "體癬／股癬", { id: "kurap badan atau selangkangan", en: "ringworm of the body or groin", vi: "hắc lào ở thân hoặc bẹn", th: "กลากที่ลำตัวหรือขาหนีบ", ja: "体部白癬／股部白癬", ko: "몸백선 또는 완선", uk: "стригучий лишай тіла або пахвинної ділянки", ru: "стригущий лишай туловища или паха" }, causes.fungus, treatmentKinds.antifungal, { tags: ["體癬", "股癬", "黴菌", "抗黴菌"], contagious: true, treat: tineaTreat, care: tineaCare, warn: tineaWarn, zhCause: "皮膚黴菌感染，常和潮濕、流汗或接觸感染源有關", zhTreat: "治療以抗黴菌藥為主。請依醫師指示完成療程，症狀好轉後通常仍需再擦一段時間，避免復發。", zhCare: "請保持乾爽，流汗後更換衣物與內褲，衣物毛巾分開清洗。不要自行混擦不明藥膏。", zhWarn: "如果範圍變大、疼痛、化膿或一直復發，請回診。" }),
  item("tinea_pedis", "黴菌與寄生蟲相關", "香港腳／足癬", { id: "kutu air", en: "athlete's foot", vi: "nấm bàn chân", th: "ฮ่องกงฟุตหรือน้ำกัดเท้า", ja: "足白癬", ko: "무좀", uk: "грибок стопи", ru: "грибок стопы" }, causes.fungus, treatmentKinds.antifungal, { tags: ["香港腳", "足癬", "黴菌", "腳癢"], contagious: true, treat: tineaTreat, care: commonCare({ id: "Jaga sela jari kaki tetap kering, ganti kaus kaki setiap hari, pilih kaus kaki yang menyerap keringat, dan ganti sepatu bergiliran.", en: "Keep the spaces between toes dry, change socks daily, choose moisture-wicking socks, and rotate shoes.", vi: "Giữ kẽ chân khô, thay vớ mỗi ngày, chọn vớ thấm hút mồ hôi và thay đổi giày luân phiên.", th: "รักษาซอกนิ้วเท้าให้แห้ง เปลี่ยนถุงเท้าทุกวัน เลือกถุงเท้าที่ระบายเหงื่อ และสลับรองเท้า", ja: "足指の間を乾かし、靴下は毎日替え、汗を吸いやすい靴下を選び、靴はローテーションしてください。", ko: "발가락 사이를 건조하게 유지하고 양말은 매일 갈아 신으며 땀을 잘 흡수하는 양말을 고르고 신발은 번갈아 신으세요.", uk: "Тримайте проміжки між пальцями ніг сухими, щодня міняйте шкарпетки, обирайте шкарпетки, які відводять вологу, і чергуйте взуття.", ru: "Держите промежутки между пальцами ног сухими, ежедневно меняйте носки, выбирайте носки, отводящие влагу, и чередуйте обувь." }), follow: commonFollow({ id: "Pengobatan sering perlu beberapa minggu sampai beberapa bulan; ikuti jadwal kontrol dokter.", en: "Treatment often takes several weeks to months; follow the doctor's follow-up plan.", vi: "Điều trị thường cần vài tuần đến vài tháng; hãy tái khám theo lịch bác sĩ.", th: "การรักษามักใช้เวลาหลายสัปดาห์ถึงหลายเดือน ให้มาตามนัดแพทย์", ja: "治療には数週間から数か月かかることがあります。医師の指示どおり再診してください。", ko: "치료는 수주에서 수개월 걸릴 수 있으니 의사의 추적 계획을 따르세요.", uk: "Лікування часто потребує кілька тижнів або місяців; дотримуйтесь розкладу повторних прийомів лікаря.", ru: "Лечение часто требует нескольких недель или месяцев; следуйте расписанию повторных приёмов врача." }), zhCause: "足部黴菌感染，常和鞋襪悶熱潮濕有關", zhCare: "請保持腳趾縫乾燥，襪子每天更換，可選吸濕排汗材質的襪子，鞋子輪替通風。", zhFollow: "香港腳治療常需要數週到數月，請依醫師安排追蹤。" }),
  item("onychomycosis", "黴菌與寄生蟲相關", "灰指甲／甲癬", { id: "jamur kuku", en: "fungal nail infection", vi: "nấm móng", th: "เชื้อราที่เล็บ", ja: "爪白癬", ko: "손발톱무좀", uk: "грибкова інфекція нігтів", ru: "грибковая инфекция ногтей" }, causes.fungus, treatmentKinds.antifungal, { tags: ["灰指甲", "甲癬", "黴菌", "指甲"], contagious: true, follow: commonFollow({ id: "Kuku tumbuh lambat. Walau obat minum sering sekitar 12 minggu, tampilan kuku pulih perlahan selama berbulan-bulan.", en: "Nails grow slowly. Even when oral treatment is about 12 weeks, the nail appearance improves gradually over months.", vi: "Móng mọc chậm. Dù thuốc uống thường khoảng 12 tuần, hình dạng móng cải thiện dần trong nhiều tháng.", th: "เล็บงอกช้า แม้ยากินมักใช้ประมาณ 12 สัปดาห์ แต่ลักษณะเล็บจะค่อย ๆ ดีขึ้นเป็นเดือน ๆ", ja: "爪は伸びるのが遅いです。内服治療は約12週間でも、見た目の改善には数か月かかります。", ko: "손발톱은 천천히 자랍니다. 먹는 약은 보통 약 12주라도 모양이 좋아지는 데는 여러 달이 걸립니다.", uk: "Нігті ростуть повільно. Навіть коли пероральне лікування триває близько 12 тижнів, зовнішній вигляд нігтя покращується поступово протягом місяців.", ru: "Ногти растут медленно. Даже когда пероральное лечение длится около 12 недель, внешний вид ногтя улучшается постепенно в течение месяцев." }), zhCause: "指甲黴菌感染，治療時間通常較長", zhTreat: "治療可能包含外用或口服抗黴菌藥。若使用口服藥，腳趾甲通常約 12 週，期間可能需要抽血追蹤肝功能；若不使用口服藥，外用藥常需要擦 6 個月以上。", zhFollow: "指甲長得慢，外觀完全長好常需 9 到 12 個月。若同時有香港腳，也需要一起治療，避免反覆感染。" }),
  item("scabies", "黴菌與寄生蟲相關", "疥瘡", { id: "kudis skabies", en: "scabies", vi: "ghẻ", th: "หิด", ja: "疥癬", ko: "옴", uk: "короста", ru: "чесотка" }, causes.inflammation, treatmentKinds.procedure, { tags: ["疥瘡", "寄生蟲", "癢", "傳染"], contagious: true, treat: scabiesTreat, care: scabiesCare, warn: scabiesWarn, follow: commonFollow({ id: "Sering perlu pengulangan pada hari ke-7 sesuai arahan dokter.", en: "A repeat treatment around day 7 is often needed as directed by the doctor.", vi: "Thường cần lặp lại điều trị vào khoảng ngày thứ 7 theo hướng dẫn bác sĩ.", th: "มักต้องรักษาซ้ำประมาณวันที่ 7 ตามคำแนะนำแพทย์", ja: "医師の指示により、7日目ごろに再治療が必要なことがあります。", ko: "의사의 지시에 따라 7일째쯤 반복 치료가 필요할 수 있습니다.", uk: "Часто потрібне повторне лікування приблизно на 7-й день за призначенням лікаря.", ru: "Часто требуется повторное лечение примерно на 7-й день по назначению врача." }), zhCause: "疥蟲寄生造成劇癢，常在夜間更癢", zhTreat: "治療需要正確塗抹藥物。藥膏通常要擦在醫師指定範圍，包含手指縫、腳趾縫、腋下、肚臍與生殖器周圍，停留 8 到 12 小時後再洗掉。", zhCare: "全家人或同住者可能需要同時治療。衣物、床單、毛巾請用熱水清洗並烘乾；無法清洗的物品可密封至少 72 小時。", zhWarn: "治療後搔癢可能還會持續 2 到 4 週。若又出現很多新疹子或化膿，請回診。", zhFollow: "通常需要在第 7 天依醫師指示再治療一次。" }),

  item("acute_urticaria", "過敏與蕁麻疹", "急性蕁麻疹", { id: "urtikaria akut", en: "acute urticaria", vi: "mề đay cấp", th: "ลมพิษเฉียบพลัน", ja: "急性じんましん", ko: "급성 두드러기", uk: "гостра кропив'янка", ru: "острая крапивница" }, causes.allergy, treatmentKinds.antihistamine, { tags: ["急性蕁麻疹", "過敏", "癢", "抗組織胺"], warn: commonWarn({ id: "Segera cari pertolongan bila bibir atau lidah bengkak, sesak napas, dada terasa berat, pusing, atau sangat lemas.", en: "Seek urgent care if the lips or tongue swell, breathing is difficult, the chest feels tight, you feel dizzy, or you feel very weak.", vi: "Đi cấp cứu nếu môi hoặc lưỡi sưng, khó thở, tức ngực, chóng mặt hoặc rất mệt.", th: "ให้รีบพบแพทย์ทันทีถ้าปากหรือลิ้นบวม หายใจลำบาก แน่นหน้าอก เวียนศีรษะ หรืออ่อนเพลียมาก", ja: "唇や舌の腫れ、息苦しさ、胸の圧迫感、めまい、強いだるさがあればすぐ受診してください。", ko: "입술이나 혀가 붓거나 숨쉬기 어렵거나 가슴이 답답하거나 어지럽거나 매우 힘이 없으면 즉시 진료를 받으세요.", uk: "Негайно зверніться по допомогу, якщо губи або язик набряк, важко дихати, відчуття стиснення в грудях, запаморочення або сильна слабкість.", ru: "Немедленно обратитесь за помощью, если губы или язык опухли, трудно дышать, чувство сдавления в груди, головокружение или сильная слабость." }), zhCause: "過敏、感染、食物、藥物或不明原因引起的皮膚反應", zhTreat: "治療通常以抗組織胺止癢、消腫為主。請依醫師指示服藥，不要自行混用多種過敏藥。", zhWarn: "若合併嘴唇或舌頭腫、呼吸困難、胸悶、頭暈或全身很不舒服，請立即就醫。" }),
  item("chronic_urticaria", "過敏與蕁麻疹", "慢性蕁麻疹", { id: "urtikaria kronis", en: "chronic urticaria", vi: "mề đay mạn tính", th: "ลมพิษเรื้อรัง", ja: "慢性じんましん", ko: "만성 두드러기", uk: "хронічна кропив'янка", ru: "хроническая крапивница" }, causes.allergy, treatmentKinds.antihistamine, { tags: ["慢性蕁麻疹", "過敏", "抗組織胺", "復發"], follow: followLong, zhCause: "皮膚肥大細胞容易被刺激而反覆起疹，很多時候找不到單一原因", zhTreat: "治療以規律使用抗組織胺與調整誘發因子為主。" }),
  item("drug_allergy_warning", "過敏與蕁麻疹", "藥物過敏警告", { id: "peringatan alergi obat", en: "drug allergy warning", vi: "cảnh báo dị ứng thuốc", th: "คำเตือนแพ้ยา", ja: "薬剤アレルギーの注意", ko: "약물 알레르기 주의", uk: "попередження про алергію на ліки", ru: "предупреждение об аллергии на лекарства" }, causes.allergy, treatmentKinds.antihistamine, { tags: ["藥物過敏", "過敏", "警訊", "立即就醫"], severity: "重要安全提醒", zhCause: "藥物可能引起皮膚疹或全身性過敏反應", zhTreat: "若懷疑藥物過敏，請停止可疑藥物並儘快聯絡醫師，嚴重症狀需立即就醫。", zhWarn: "若出現嘴唇舌頭腫、喘、發燒、眼口生殖器破皮、大片水泡或皮膚疼痛，請立即就醫。" }),
  item("insect_bite_reaction", "過敏與蕁麻疹", "昆蟲叮咬反應", { id: "reaksi gigitan serangga", en: "insect bite reaction", vi: "phản ứng do côn trùng cắn", th: "ปฏิกิริยาจากแมลงกัดต่อย", ja: "虫刺され反応", ko: "벌레 물림 반응", uk: "реакція на укус комахи", ru: "реакция на укус насекомого" }, causes.allergy, treatmentKinds.antiInflammatory, { tags: ["昆蟲叮咬", "紅腫", "癢", "過敏"], zhCause: "昆蟲叮咬後的局部發炎或過敏反應", zhCare: "請避免抓破，可冰敷，戶外活動時注意防蚊蟲。" }),

  item("melasma", "色素與良性皮膚變化", "肝斑", { id: "melasma", en: "melasma", vi: "nám da", th: "ฝ้า", ja: "肝斑", ko: "기미", uk: "мелазма", ru: "мелазма" }, causes.pigment, treatmentKinds.observe, { tags: ["肝斑", "色素", "防曬", "淡斑"], follow: followLong, zhCause: "日曬、荷爾蒙與皮膚色素反應", zhTreat: "治療以防曬、淡斑外用藥與穩定保養為主，需要時間。", zhCare: "請每天防曬，避免反覆刺激或自行使用不明美白產品。" }),
  item("post_inflammatory_hyperpigmentation", "色素與良性皮膚變化", "發炎後色素沉澱", { id: "hiperpigmentasi setelah peradangan", en: "post-inflammatory hyperpigmentation", vi: "tăng sắc tố sau viêm", th: "รอยดำหลังการอักเสบ", ja: "炎症後色素沈着", ko: "염증 후 색소침착", uk: "поcтзапальна гіперпігментація", ru: "поствоспалительная гиперпигментация" }, causes.pigment, treatmentKinds.observe, { tags: ["色素沉澱", "痘疤", "發炎後", "防曬"], zhCause: "皮膚發炎後留下的暫時性色素增加", zhTreat: "治療以防曬、避免再發炎與必要時淡斑藥物為主。", zhFollow: "顏色變淡通常需要數週到數月。" }),
  item("vitiligo", "色素與良性皮膚變化", "白斑／白癜風", { id: "vitiligo", en: "vitiligo", vi: "bạch biến", th: "ด่างขาว", ja: "白斑", ko: "백반증", uk: "вітиліго", ru: "витилиго" }, causes.pigment, treatmentKinds.antiInflammatory, { tags: ["白斑", "白癜風", "色素", "免疫"], follow: followLong, zhCause: "色素細胞功能下降，常和自體免疫反應有關", zhTreat: "治療可能包含外用藥、照光或觀察，依範圍與進展決定。" }),
  item("seborrheic_keratosis", "色素與良性皮膚變化", "脂漏性角化症", { id: "keratosis seboroik", en: "seborrheic keratosis", vi: "dày sừng tiết bã", th: "กระเนื้อ", ja: "脂漏性角化症", ko: "지루각화증", uk: "себорейний кератоз", ru: "себорейный кератоз" }, causes.pigment, treatmentKinds.observe, { tags: ["脂漏性角化", "老人斑", "良性", "冷凍"], severity: "常見良性皮膚腫瘤", zhCause: "常見的良性角化增生，和年齡與體質有關", zhTreat: "通常不需要治療，若摩擦、搔癢或外觀困擾，可討論冷凍、刮除或其他處置。" }),
  item("dermatofibroma", "色素與良性皮膚變化", "皮膚纖維瘤", { id: "dermatofibroma", en: "dermatofibroma", vi: "u xơ da", th: "ก้อนพังผืดผิวหนัง", ja: "皮膚線維腫", ko: "피부섬유종", uk: "дерматофіброма", ru: "дерматофиброма" }, causes.pigment, treatmentKinds.observe, { tags: ["皮膚纖維瘤", "良性", "硬塊"], severity: "常見良性皮膚結節", zhCause: "皮膚局部纖維化形成的良性小結節", zhTreat: "通常可觀察，若快速變大、疼痛、流血或診斷不確定，需再評估。" }),

  item("alopecia_areata", "頭皮與掉髮", "圓形禿", { id: "alopecia areata", en: "alopecia areata", vi: "rụng tóc từng mảng", th: "ผมร่วงเป็นหย่อม", ja: "円形脱毛症", ko: "원형탈모", uk: "вогнищева алопеція", ru: "очаговая алопеция" }, causes.hair, treatmentKinds.antiInflammatory, {
    tags: ["圓形禿", "掉髮", "免疫", "頭皮", "壓力", "類固醇", "Minoxidil"], follow: followLong,
    customZh: {
      summary: "你的皮膚狀況是圓形禿。",
      explanation: "圓形禿是免疫系統暫時把自己的毛囊當作外來物攻擊，造成局部頭髮脫落，常呈現一塊圓形或橢圓形的禿斑。身心壓力是常見的誘發或加重因子，包括睡眠不足、工作或情緒壓力、生活重大變化、最近生過病。圓形禿不會傳染，毛囊通常還在，所以頭髮有機會重新長回來。",
      treatment: "我們會給你兩種藥，請務必依時間使用：早上擦外用類固醇藥膏到禿髮處，晚上擦 Minoxidil 生髮水到禿髮處。早晚兩種藥功能不同、不能對調、不能合併擦，請尊重醫囑——早上類固醇、晚上生髮水。",
      homeCare: "請盡量改善睡眠、減少壓力來源。不要自行用偏方或刺激性產品搓揉頭皮，也不要去拔禿斑邊緣鬆動的毛髮。",
      warning: "若禿斑快速擴大、合併眉毛或睫毛脫落、指甲出現點狀凹陷，或全身性掉髮，請提早回診評估。",
      followUp: "圓形禿的治療通常需要數週到數個月才看得到新生細毛，請依醫師安排定期回診，讓醫師依新長出的毛髮情況調整治療。"
    },
    customTranslations: {
      id: { summary: "Kondisi kulit Anda adalah alopecia areata (kebotakan setempat).", explanation: "Alopecia areata terjadi karena sistem kekebalan tubuh sementara menyerang folikel rambut sendiri, sehingga rambut rontok membentuk bercak bulat atau lonjong. Stres fisik dan emosional sering menjadi pemicu atau memperberat, termasuk kurang tidur, tekanan kerja atau emosi, perubahan besar dalam hidup, atau baru saja sakit. Kondisi ini tidak menular, dan folikel rambut biasanya masih ada sehingga rambut dapat tumbuh kembali.", treatment: "Anda akan mendapat dua obat dengan jadwal pemakaian berbeda. Pagi: oleskan krim kortikosteroid pada area botak. Malam: oleskan larutan Minoxidil pada area botak. Kedua obat memiliki fungsi berbeda, tidak boleh ditukar waktunya dan tidak boleh dicampur. Mohon ikuti petunjuk dokter — pagi kortikosteroid, malam Minoxidil.", homeCare: "Usahakan tidur cukup dan kurangi sumber stres. Jangan menggosok kulit kepala dengan obat tradisional atau produk yang mengiritasi, dan jangan mencabut rambut yang longgar di tepi bercak.", warning: "Datang lebih awal jika bercak botak cepat meluas, alis atau bulu mata juga rontok, kuku berlubang kecil, atau terjadi kerontokan rambut yang lebih luas di seluruh tubuh.", followUp: "Pengobatan biasanya butuh beberapa minggu hingga bulan untuk melihat rambut halus baru tumbuh. Silakan kontrol sesuai jadwal agar dokter dapat menyesuaikan terapi berdasarkan rambut yang muncul kembali." },
      en: { summary: "Your skin condition is alopecia areata.", explanation: "Alopecia areata happens when your immune system temporarily attacks your own hair follicles, causing round or oval patches of hair loss. Physical and emotional stress is a common trigger or aggravating factor, including poor sleep, work or emotional pressure, major life changes, or a recent illness. The condition is not contagious, and the follicles are usually still there, so hair has a chance to grow back.", treatment: "We will give you two medicines on different schedules. Morning: apply topical corticosteroid cream to the bald patches. Evening: apply Minoxidil solution to the bald patches. The two medicines work differently — do not swap them, do not mix them. Please follow this schedule strictly: corticosteroid in the morning, Minoxidil at night.", homeCare: "Try to get enough sleep and reduce sources of stress. Do not rub the scalp with home remedies or irritating products, and do not pull out loose hairs at the edge of the patch.", warning: "Come back earlier if the patch spreads quickly, eyebrows or eyelashes also fall out, nails show small pits, or hair loss becomes widespread over the body.", followUp: "Treatment usually takes weeks to months before new fine hairs appear. Please return as scheduled so the treatment can be adjusted based on how the hair regrows." },
      vi: { summary: "Tình trạng da của bạn là rụng tóc từng mảng.", explanation: "Rụng tóc từng mảng xảy ra khi hệ miễn dịch tạm thời tấn công chính các nang tóc, gây ra các mảng rụng tóc hình tròn hoặc bầu dục. Căng thẳng thể chất và tinh thần là yếu tố kích phát hoặc làm nặng thường gặp, bao gồm thiếu ngủ, áp lực công việc hoặc cảm xúc, thay đổi lớn trong cuộc sống, hay vừa mới ốm. Bệnh không lây, nang tóc thường vẫn còn nên tóc có cơ hội mọc lại.", treatment: "Bạn sẽ được kê hai loại thuốc dùng vào thời điểm khác nhau. Buổi sáng: bôi kem corticosteroid lên vùng rụng tóc. Buổi tối: bôi dung dịch Minoxidil lên vùng rụng tóc. Hai thuốc có cơ chế khác nhau, không được đổi giờ và không được trộn lẫn. Vui lòng tuân thủ — sáng bôi corticosteroid, tối bôi Minoxidil.", homeCare: "Cố gắng ngủ đủ và giảm các nguồn căng thẳng. Không xoa các bài thuốc dân gian hay sản phẩm gây kích ứng lên da đầu, và không nhổ những sợi tóc lỏng ở mép mảng rụng.", warning: "Hãy tái khám sớm nếu mảng rụng lan nhanh, lông mày hoặc lông mi cũng rụng, móng có vết lõm nhỏ, hoặc rụng tóc lan rộng toàn thân.", followUp: "Điều trị thường cần vài tuần đến vài tháng mới thấy tóc tơ mới. Vui lòng tái khám đúng hẹn để bác sĩ điều chỉnh điều trị theo tình trạng mọc lại của tóc." },
      th: { summary: "ปัญหาผิวหนังของคุณคือผมร่วงเป็นหย่อม", explanation: "ผมร่วงเป็นหย่อมเกิดจากภูมิคุ้มกันโจมตีรากผมของตัวเองชั่วคราว ทำให้ผมร่วงเป็นวงกลมหรือวงรี ความเครียดทางกายและจิตใจเป็นปัจจัยกระตุ้นหรือทำให้แย่ลงที่พบบ่อย รวมถึงการนอนน้อย ความกดดันจากงานหรืออารมณ์ การเปลี่ยนแปลงครั้งใหญ่ในชีวิต หรือเพิ่งหายป่วย โรคนี้ไม่ติดต่อ รากผมมักยังอยู่ ผมจึงมีโอกาสกลับมางอกใหม่", treatment: "เราจะให้ยา 2 ชนิดใช้ในเวลาต่างกัน เช้า: ทาครีมสเตียรอยด์บริเวณที่ผมร่วง กลางคืน: ทาน้ำยา Minoxidil บริเวณที่ผมร่วง ยา 2 ชนิดทำงานต่างกัน ห้ามสลับเวลา ห้ามใช้ร่วมกัน กรุณาปฏิบัติตาม — เช้าทาสเตียรอยด์ กลางคืนทา Minoxidil", homeCare: "พยายามนอนให้พอและลดแหล่งความเครียด อย่าใช้สูตรพื้นบ้านหรือผลิตภัณฑ์ที่ระคายเคืองถูหนังศีรษะ และอย่าดึงผมที่หลวมบริเวณขอบ", warning: "ควรมาก่อนนัดถ้าผมร่วงลามเร็ว คิ้วหรือขนตาร่วงด้วย เล็บมีรอยบุ๋มเล็ก ๆ หรือผมร่วงทั่วทั้งร่างกาย", followUp: "การรักษามักใช้เวลาหลายสัปดาห์ถึงหลายเดือนกว่าจะเห็นผมเส้นเล็กใหม่ กรุณามาตามนัดเพื่อให้แพทย์ปรับการรักษาตามผมที่งอกใหม่" },
      ja: { summary: "あなたの皮膚の状態は円形脱毛症です。", explanation: "円形脱毛症は、免疫が一時的に自分の毛包を攻撃して、丸または楕円の脱毛斑ができる病気です。身体的・精神的なストレスはよくある誘因や悪化因子で、睡眠不足、仕事や感情の重圧、大きな生活の変化、最近の体調不良などが含まれます。人にうつる病気ではなく、毛包は通常残っているため、髪は再び生えてくる可能性があります。", treatment: "2種類の薬を時間を分けて使います。朝：脱毛部位にステロイド外用薬を塗ってください。夜：脱毛部位にミノキシジル外用液を塗ってください。2つの薬は働きが違うため、入れ替えたり混ぜたりしないでください。指示どおり、朝はステロイド、夜はミノキシジルを守ってください。", homeCare: "十分な睡眠を取り、ストレス源を減らしてください。民間療法や刺激の強い製品で頭皮をこすらないでください。脱毛斑の縁の浮いた毛を抜かないでください。", warning: "脱毛斑が急速に広がる、眉毛やまつ毛も抜ける、爪に小さな点状のへこみがある、または全身的に脱毛が広がる場合は、早めに受診してください。", followUp: "新しい産毛が見えるまで通常、数週間から数か月かかります。指示どおり受診し、生えてくる毛の状態に応じて治療を調整します。" },
      ko: { summary: "당신의 피부 상태는 원형탈모입니다.", explanation: "원형탈모는 면역 시스템이 일시적으로 자기 모낭을 공격하여 둥근 또는 타원형의 탈모반이 생기는 질환입니다. 신체적·정신적 스트레스는 흔한 유발 또는 악화 요인이며, 수면 부족, 업무·감정적 압박, 큰 생활 변화, 최근에 앓은 병 등이 포함됩니다. 이 질환은 전염되지 않으며, 모낭은 대개 남아 있어 모발이 다시 자랄 가능성이 있습니다.", treatment: "두 가지 약을 시간을 나누어 사용합니다. 아침: 탈모 부위에 스테로이드 연고를 바르세요. 저녁: 탈모 부위에 미녹시딜 용액을 바르세요. 두 약은 작용이 달라 시간을 바꾸거나 섞어 쓰면 안 됩니다. 처방대로 아침에는 스테로이드, 저녁에는 미녹시딜을 지켜 주세요.", homeCare: "충분히 자고 스트레스 원인을 줄이세요. 검증되지 않은 민간요법이나 자극적인 제품으로 두피를 문지르지 말고, 탈모반 가장자리의 헐거운 모발을 뽑지 마세요.", warning: "탈모반이 빠르게 커지거나, 눈썹·속눈썹이 함께 빠지거나, 손톱에 작은 점상 함몰이 생기거나, 전신으로 탈모가 퍼지면 더 일찍 내원하세요.", followUp: "새 솜털이 보이기까지 보통 수주에서 수개월이 걸립니다. 정해진 일정에 맞춰 내원하여 새로 자란 모발 상태에 따라 치료를 조정해 주세요." },
      uk: { summary: "Ваш стан шкіри — вогнищева алопеція.", explanation: "Вогнищева алопеція виникає, коли імунна система тимчасово атакує власні волосяні фолікули, спричиняючи круглі або овальні ділянки випадіння волосся. Фізичний і емоційний стрес — поширений тригер або обтяжуючий фактор, включаючи поганий сон, робочий чи емоційний тиск, серйозні життєві зміни або нещодавню хворобу. Стан не заразний, фолікули зазвичай ще на місці, тому волосся має шанс відрости знову.", treatment: "Ми випишемо вам два препарати з різним розкладом застосування. Вранці: наносьте крем з кортикостероїдом на ділянки облисіння. Ввечері: наносьте розчин Міноксидилу на ділянки облисіння. Два препарати працюють по-різному — не міняйте їх місцями, не змішуйте. Будь ласка, чітко дотримуйтесь розкладу: вранці кортикостероїд, ввечері Міноксидил.", homeCare: "Намагайтеся достатньо спати і зменшити джерела стресу. Не натирайте шкіру голови народними засобами чи подразнюючими продуктами і не висмикуйте розхитані волосини на краю плями.", warning: "Зверніться раніше, якщо пляма швидко поширюється, брови або вії також випадають, нігті мають маленькі точкові вдавлення, або випадіння волосся стає поширеним по всьому тілу.", followUp: "Зазвичай минають тижні або місяці, перш ніж з'являться нові тонкі волоски. Будь ласка, приходьте за призначенням, щоб лікування можна було коригувати відповідно до того, як росте волосся." },
      ru: { summary: "Ваше состояние кожи — очаговая алопеция.", explanation: "Очаговая алопеция возникает, когда иммунная система временно атакует собственные волосяные фолликулы, вызывая круглые или овальные участки выпадения волос. Физический и эмоциональный стресс — распространённый триггер или отягощающий фактор, включая плохой сон, рабочее или эмоциональное давление, серьёзные жизненные изменения или недавнюю болезнь. Состояние не заразно, фолликулы обычно остаются, поэтому у волос есть шанс отрасти снова.", treatment: "Мы выпишем вам два препарата с разным расписанием применения. Утром: наносите крем с кортикостероидом на участки облысения. Вечером: наносите раствор Миноксидила на участки облысения. Два препарата работают по-разному — не меняйте их местами, не смешивайте. Пожалуйста, чётко соблюдайте расписание: утром кортикостероид, вечером Миноксидил.", homeCare: "Старайтесь высыпаться и уменьшать источники стресса. Не натирайте кожу головы народными средствами или раздражающими продуктами и не выдёргивайте расшатанные волоски на краю пятна.", warning: "Обратитесь раньше, если пятно быстро распространяется, брови или ресницы также выпадают, ногти имеют маленькие точечные вдавления, или выпадение волос становится распространённым по всему телу.", followUp: "Обычно проходят недели или месяцы, прежде чем появятся новые тонкие волоски. Пожалуйста, приходите по назначению, чтобы лечение можно было корректировать в зависимости от того, как растут волосы." }
    }
  }),
  item("androgenetic_alopecia", "頭皮與掉髮", "雄性禿", { id: "androgenetic alopecia", en: "androgenetic hair loss", vi: "rụng tóc kiểu nội tiết", th: "ผมบางจากฮอร์โมน", ja: "男性型・女性型脱毛症", ko: "안드로겐성 탈모", uk: "андрогенетична алопеція", ru: "андрогенетическая алопеция" }, causes.hair, treatmentKinds.observe, {
    tags: ["雄性禿", "掉髮", "遺傳", "Dutasteride", "雞尾酒", "自費", "終身"], follow: followLong,
    customZh: {
      summary: "你的皮膚狀況是雄性禿。",
      explanation: "雄性禿是遺傳基因造成的——你的毛囊天生對男性荷爾蒙（DHT）比較敏感，會讓頭髮逐漸變細、變短、變稀疏。因為這是基因問題，目前的醫學沒有辦法從根本治癒，但可以透過長期用藥延緩落髮、維持現有頭髮。雄性禿不會傳染。",
      treatment: "治療的核心是每天口服 Dutasteride 0.5 毫克，這個藥可以抑制讓毛囊萎縮的荷爾蒙。台灣健保並不給付這個費用，因此我們將 Dutasteride 0.5 毫克搭配鋅和 Pentoxifylline 組合成雞尾酒療法，每天一包，自費價格為每個月台幣 1800 元。雄性禿的治療是終身性的，只要你不希望繼續落髮，就不建議停藥；一旦停藥，6 到 12 個月內頭髮會回到原本的掉落速度。",
      homeCare: "請每天固定時間服用一包，配開水吞服。不要自行加量、自行停藥或漏吃。",
      warning: "可能的副作用包括性慾降低、勃起功能變化、男性乳房脹痛或敏感，發生機率很低，多數人並沒有任何不適。若出現上述症狀或明顯情緒變化，請告訴醫師。你自己服用這個藥是安全的，但 Dutasteride 的成分可以從皮膚吸收，若家中有孕婦或可能懷孕的女性，請不要讓她們直接接觸藥丸內容物，特別是膠囊破裂或漏液時。",
      followUp: "雄性禿用藥通常需要連續使用 6 到 12 個月才看得到明顯效果，請依醫師安排定期回診，讓醫師依頭髮密度與是否有副作用調整治療。"
    },
    customTranslations: {
      id: { summary: "Kondisi kulit Anda adalah kebotakan pola genetik (androgenetic alopecia).", explanation: "Kebotakan pola genetik disebabkan oleh genetika — folikel rambut Anda secara alami sensitif terhadap hormon pria (DHT), sehingga rambut perlahan menjadi lebih tipis, lebih pendek, dan lebih jarang. Karena ini adalah masalah genetik, pengobatan saat ini tidak dapat menyembuhkan dari akarnya, tetapi obat jangka panjang dapat memperlambat kerontokan dan mempertahankan rambut yang ada. Kondisi ini tidak menular.", treatment: "Inti pengobatan adalah Dutasteride 0,5 mg oral setiap hari, yang menekan hormon yang membuat folikel mengecil. Sistem Asuransi Kesehatan Nasional Taiwan tidak menanggung biaya ini, sehingga kami menggabungkan Dutasteride 0,5 mg dengan zinc dan Pentoxifylline menjadi terapi koktail: satu sachet per hari, biaya mandiri NT$1.800 per bulan. Pengobatan ini bersifat seumur hidup — selama Anda tidak ingin rambut terus rontok, jangan hentikan obat. Setelah berhenti, kecepatan kerontokan akan kembali seperti semula dalam 6 sampai 12 bulan.", homeCare: "Minum satu sachet setiap hari pada waktu yang tetap dengan air putih. Jangan menambah dosis sendiri, menghentikan sendiri, atau melewatkan dosis.", warning: "Kemungkinan efek samping meliputi penurunan libido, perubahan fungsi ereksi, dan ketidaknyamanan atau sensitivitas pada payudara pria. Kejadian sangat rendah dan kebanyakan orang tidak merasakan apa-apa. Jika muncul gejala tersebut atau perubahan suasana hati yang jelas, beri tahu dokter. Aman bagi Anda sendiri untuk meminum obat ini, tetapi Dutasteride dapat diserap melalui kulit, jadi wanita yang sedang hamil atau mungkin hamil tidak boleh menyentuh isi kapsul secara langsung, terutama bila kapsul bocor atau pecah.", followUp: "Obat biasanya butuh 6 sampai 12 bulan penggunaan terus-menerus untuk terlihat efeknya. Silakan kontrol sesuai jadwal agar dokter dapat menilai kepadatan rambut dan menyesuaikan terapi." },
      en: { summary: "Your skin condition is androgenetic hair loss (male/female pattern hair loss).", explanation: "Androgenetic hair loss is caused by your genes — your hair follicles are naturally sensitive to male hormone (DHT), which makes hair gradually become thinner, shorter, and sparser. Because it is a genetic problem, current medicine cannot cure it at the root, but long-term medication can slow hair loss and maintain the hair you still have. This condition is not contagious.", treatment: "The core treatment is oral Dutasteride 0.5 mg once daily, which suppresses the hormone that shrinks hair follicles. Taiwan's National Health Insurance does not cover this cost, so we combine Dutasteride 0.5 mg with zinc and Pentoxifylline into a cocktail therapy: one sachet per day, self-pay NT$1,800 per month. This treatment is lifelong — as long as you do not want hair to keep falling out, do not stop the medication. After stopping, hair loss will return to its original rate within 6 to 12 months.", homeCare: "Take one sachet daily at a fixed time with water. Do not increase the dose on your own, stop on your own, or skip doses.", warning: "Possible side effects include decreased libido, changes in erectile function, and breast tenderness or sensitivity in men. The incidence is very low, and most people feel nothing. If these symptoms appear, or if you notice clear mood changes, please tell the doctor. It is safe for you to take this medicine. However, Dutasteride can be absorbed through the skin, so women who are pregnant or may become pregnant must not directly touch the contents of the capsule, especially if a capsule is leaking or broken.", followUp: "The medicine usually needs 6 to 12 months of continuous use before a clear effect can be seen. Please return as scheduled so the doctor can assess hair density and adjust treatment based on any side effects." },
      vi: { summary: "Tình trạng da của bạn là rụng tóc kiểu nội tiết (hói di truyền).", explanation: "Rụng tóc kiểu nội tiết do gen di truyền — nang tóc của bạn vốn nhạy cảm với hormone nam (DHT), khiến tóc dần mảnh hơn, ngắn hơn và thưa hơn. Vì là vấn đề gen, y học hiện nay không thể chữa khỏi tận gốc, nhưng dùng thuốc dài hạn có thể làm chậm rụng tóc và duy trì lượng tóc hiện có. Bệnh không lây.", treatment: "Cốt lõi điều trị là uống Dutasteride 0,5 mg mỗi ngày một lần, thuốc này ức chế hormone làm teo nang tóc. Bảo hiểm Y tế Quốc gia Đài Loan không chi trả khoản này, do đó chúng tôi phối hợp Dutasteride 0,5 mg với kẽm và Pentoxifylline thành liệu pháp kết hợp: mỗi ngày một gói, tự trả NT$1.800 mỗi tháng. Đây là điều trị suốt đời — chỉ cần bạn không muốn tóc tiếp tục rụng, đừng ngưng thuốc. Sau khi ngưng, tốc độ rụng tóc sẽ trở lại như trước trong 6 đến 12 tháng.", homeCare: "Uống mỗi ngày một gói vào giờ cố định với nước. Không tự tăng liều, tự ngưng thuốc hoặc bỏ liều.", warning: "Tác dụng phụ có thể có gồm giảm ham muốn, thay đổi chức năng cương, căng tức hoặc nhạy cảm ở vú nam. Tỷ lệ rất thấp, phần lớn không có cảm giác bất thường. Nếu xuất hiện các triệu chứng trên, hoặc thay đổi tâm trạng rõ rệt, hãy báo bác sĩ. Bạn tự uống thuốc là an toàn, nhưng Dutasteride có thể hấp thu qua da, nên phụ nữ đang mang thai hoặc có khả năng mang thai không được trực tiếp chạm vào phần thuốc bên trong viên nang, đặc biệt khi viên nang bị rò rỉ hoặc vỡ.", followUp: "Thuốc thường cần 6 đến 12 tháng dùng liên tục mới thấy hiệu quả rõ. Vui lòng tái khám đúng hẹn để bác sĩ đánh giá mật độ tóc và điều chỉnh điều trị." },
      th: { summary: "ปัญหาผิวหนังของคุณคือผมบางจากฮอร์โมน (กรรมพันธุ์)", explanation: "ผมบางจากฮอร์โมนเกิดจากกรรมพันธุ์ — รากผมของคุณไวต่อฮอร์โมนเพศชาย (DHT) โดยธรรมชาติ ทำให้ผมค่อย ๆ บางลง สั้นลง และห่างขึ้น เพราะเป็นปัญหาทางพันธุกรรม การแพทย์ปัจจุบันยังไม่สามารถรักษาให้หายขาดจากต้นเหตุ แต่ยาระยะยาวช่วยชะลอการร่วงและรักษาผมที่ยังมีอยู่ได้ โรคนี้ไม่ติดต่อ", treatment: "หัวใจของการรักษาคือยากิน Dutasteride 0.5 มก. วันละครั้ง ซึ่งกดฮอร์โมนที่ทำให้รากผมฝ่อ ระบบประกันสุขภาพแห่งชาติของไต้หวันไม่ครอบคลุมค่ายานี้ เราจึงผสม Dutasteride 0.5 มก. กับสังกะสีและ Pentoxifylline เป็นยาค็อกเทล วันละ 1 ซอง ค่าใช้จ่ายเอง 1,800 NT$ ต่อเดือน การรักษานี้ต้องทำตลอดชีวิต — ตราบใดที่คุณไม่ต้องการให้ผมร่วงต่อ ห้ามหยุดยา หลังหยุดยา การร่วงจะกลับไปเร็วเหมือนเดิมภายใน 6 ถึง 12 เดือน", homeCare: "กินวันละ 1 ซองในเวลาเดิมพร้อมน้ำเปล่า อย่าเพิ่มขนาดยาเอง หยุดยาเอง หรือลืมกิน", warning: "ผลข้างเคียงที่อาจเกิดได้แก่ ความต้องการทางเพศลดลง การแข็งตัวเปลี่ยนแปลง และตึงหรือไวที่เต้านมในผู้ชาย โอกาสเกิดต่ำมาก ส่วนใหญ่ไม่มีอาการใด ๆ ถ้ามีอาการดังกล่าวหรืออารมณ์เปลี่ยนชัดเจน กรุณาบอกแพทย์ การที่คุณกินยาเองนั้นปลอดภัย แต่ Dutasteride สามารถดูดซึมผ่านผิวหนังได้ ผู้หญิงที่กำลังตั้งครรภ์หรืออาจตั้งครรภ์จึงห้ามสัมผัสเนื้อยาในแคปซูลโดยตรง โดยเฉพาะเมื่อแคปซูลรั่วหรือแตก", followUp: "ยามักใช้เวลา 6 ถึง 12 เดือนใช้ต่อเนื่องกว่าจะเห็นผลชัด กรุณามาตามนัดเพื่อให้แพทย์ประเมินความหนาแน่นผมและปรับการรักษา" },
      ja: { summary: "あなたの皮膚の状態は男性型・女性型脱毛症（遺伝性の薄毛）です。", explanation: "男性型・女性型脱毛症は遺伝が原因です。毛包がもともと男性ホルモン（DHT）に敏感なため、髪が徐々に細く、短く、まばらになります。遺伝の問題なので、現在の医学では根本治療はできませんが、長期の薬物療法で進行を遅らせ、今ある髪を維持することができます。人にうつる病気ではありません。", treatment: "治療の中心は、デュタステリド0.5 mgを1日1回内服することです。この薬は毛包を縮ませるホルモンを抑えます。台湾の国民健康保険ではこの費用は給付されません。当院ではデュタステリド0.5 mgに亜鉛とペントキシフィリンを組み合わせたカクテル療法として、1日1包、自費で1か月1,800台湾ドルで処方しています。この治療は生涯続ける必要があります — 脱毛を止めたい間は薬を中止しないでください。中止すると、6から12か月で元の脱毛スピードに戻ります。", homeCare: "毎日決まった時間に1包、水と一緒に内服してください。自己判断で増量、中止、飲み忘れをしないでください。", warning: "起こりうる副作用には、性欲の低下、勃起機能の変化、男性の乳房の張りや過敏などがあります。発生頻度はとても低く、多くの方は何も感じません。これらの症状や明らかな気分の変化があれば医師にお伝えください。ご自身が服用することは安全ですが、デュタステリドは皮膚から吸収されることがあるため、妊娠中または妊娠の可能性がある女性は、カプセルの中身に直接触れないようにしてください。特にカプセルが漏れたり壊れたりしている場合は注意が必要です。", followUp: "効果がはっきり見えるまで通常6から12か月の継続内服が必要です。指示どおり受診し、髪の密度と副作用の有無に応じて治療を調整します。" },
      ko: { summary: "당신의 피부 상태는 안드로겐성 탈모(유전성 탈모)입니다.", explanation: "안드로겐성 탈모는 유전이 원인입니다. 모낭이 본래 남성호르몬(DHT)에 민감하여 모발이 점차 가늘고 짧으며 듬성해집니다. 유전적 문제이므로 현재 의학으로 근본 치료는 어렵지만, 장기 약물 치료로 탈모 진행을 늦추고 현재 모발을 유지할 수 있습니다. 이 질환은 전염되지 않습니다.", treatment: "치료의 핵심은 두타스테리드 0.5 mg을 매일 1회 복용하는 것입니다. 이 약은 모낭을 위축시키는 호르몬을 억제합니다. 대만 국민건강보험에서는 이 비용을 지원하지 않습니다. 본 의원에서는 두타스테리드 0.5 mg에 아연과 펜톡시필린을 조합한 칵테일 요법으로 하루 1포, 자비 부담 월 1,800 대만 달러로 처방합니다. 이 치료는 평생 지속해야 합니다 — 탈모가 계속되는 것을 원치 않는 한 약을 중단하지 마세요. 중단하면 6~12개월 안에 원래의 탈모 속도로 돌아옵니다.", homeCare: "매일 같은 시간에 1포를 물과 함께 복용하세요. 임의로 증량, 중단하거나 거르지 마세요.", warning: "가능한 부작용으로 성욕 감소, 발기 기능 변화, 남성 가슴의 압통이나 민감함이 있습니다. 발생률은 매우 낮으며 대부분은 아무 증상도 없습니다. 위 증상이 있거나 뚜렷한 기분 변화가 있으면 의사에게 알리세요. 본인이 복용하는 것은 안전하지만, 두타스테리드는 피부로 흡수될 수 있으므로 임신 중이거나 임신 가능성이 있는 여성은 캡슐 내용물에 직접 닿지 않도록 하세요. 특히 캡슐이 새거나 파손된 경우 주의가 필요합니다.", followUp: "약은 보통 6~12개월 꾸준히 복용해야 뚜렷한 효과가 보입니다. 정해진 일정에 맞춰 내원하여 모발 밀도와 부작용 여부에 따라 치료를 조정합니다." },
      uk: { summary: "Ваш стан шкіри — андрогенетична алопеція (генетичне облисіння).", explanation: "Андрогенетична алопеція спричинена генами — ваші волосяні фолікули за природою чутливі до чоловічого гормону (ДГТ), що поступово робить волосся тоншим, коротшим і рідшим. Оскільки це генетична проблема, сучасна медицина не може вилікувати її від кореня, але тривале медикаментозне лікування може уповільнити випадіння волосся і зберегти ті волосся, які у вас ще є. Стан не заразний.", treatment: "Основа лікування — пероральний прийом Дутастериду 0,5 мг раз на день, який пригнічує гормон, що зменшує волосяні фолікули. Національне медичне страхування Тайваню не покриває цю вартість, тому ми поєднуємо Дутастерид 0,5 мг з цинком і Пентоксифіліном у коктейльну терапію: один пакетик на день, самостійна оплата 1800 NT$ на місяць. Це лікування на все життя — поки ви не хочете, щоб волосся продовжувало випадати, не припиняйте прийом ліків. Після припинення випадіння волосся повернеться до початкової швидкості протягом 6-12 місяців.", homeCare: "Приймайте один пакетик щодня у фіксований час, запиваючи водою. Не збільшуйте дозу самостійно, не припиняйте прийом самостійно і не пропускайте дози.", warning: "Можливі побічні ефекти включають зниження лібідо, зміни ерекційної функції та чутливість або болючість грудей у чоловіків. Частота дуже низька, більшість людей нічого не відчувають. Якщо з'являються ці симптоми або ви помічаєте чіткі зміни настрою, повідомте лікаря. Прийом цих ліків вами особисто безпечний, але Дутастерид може всмоктуватися через шкіру, тому жінки, які вагітні або можуть завагітніти, не повинні безпосередньо торкатися вмісту капсули, особливо якщо капсула протікає або зламана.", followUp: "Ліки зазвичай потребують 6-12 місяців безперервного застосування, перш ніж буде видно явний ефект. Будь ласка, приходьте за призначенням, щоб лікар міг оцінити густоту волосся і скоригувати лікування на основі будь-яких побічних ефектів." },
      ru: { summary: "Ваше состояние кожи — андрогенетическая алопеция (генетическое облысение).", explanation: "Андрогенетическая алопеция вызвана генами — ваши волосяные фолликулы по природе чувствительны к мужскому гормону (ДГТ), что постепенно делает волосы тоньше, короче и реже. Поскольку это генетическая проблема, современная медицина не может вылечить её от корня, но длительное медикаментозное лечение может замедлить выпадение волос и сохранить те волосы, которые у вас ещё есть. Состояние не заразно.", treatment: "Основа лечения — пероральный приём Дутастерида 0,5 мг раз в день, который подавляет гормон, уменьшающий волосяные фолликулы. Национальное медицинское страхование Тайваня не покрывает эту стоимость, поэтому мы сочетаем Дутастерид 0,5 мг с цинком и Пентоксифиллином в коктейльную терапию: один пакетик в день, самостоятельная оплата 1800 NT$ в месяц. Это пожизненное лечение — пока вы не хотите, чтобы волосы продолжали выпадать, не прекращайте приём лекарств. После прекращения выпадение волос вернётся к исходной скорости в течение 6-12 месяцев.", homeCare: "Принимайте один пакетик ежедневно в фиксированное время, запивая водой. Не увеличивайте дозу самостоятельно, не прекращайте приём самостоятельно и не пропускайте дозы.", warning: "Возможные побочные эффекты включают снижение либидо, изменения эректильной функции и чувствительность или болезненность груди у мужчин. Частота очень низкая, большинство людей ничего не чувствуют. Если появляются эти симптомы или вы замечаете чёткие изменения настроения, сообщите врачу. Приём этих лекарств вами лично безопасен, но Дутастерид может всасываться через кожу, поэтому женщины, которые беременны или могут забеременеть, не должны напрямую касаться содержимого капсулы, особенно если капсула протекает или сломана.", followUp: "Лекарство обычно требует 6-12 месяцев непрерывного применения, прежде чем будет виден явный эффект. Пожалуйста, приходите по назначению, чтобы врач мог оценить плотность волос и скорректировать лечение на основе любых побочных эффектов." }
    }
  }),
  item("scalp_dandruff_sebderm", "頭皮與掉髮", "頭皮屑／頭皮脂漏性皮膚炎", { id: "ketombe atau dermatitis seboroik kulit kepala", en: "dandruff or scalp seborrheic dermatitis", vi: "gàu hoặc viêm da tiết bã da đầu", th: "รังแคหรือเซ็บเดิร์มที่หนังศีรษะ", ja: "ふけ／頭皮の脂漏性皮膚炎", ko: "비듬 또는 두피 지루피부염", uk: "лупа або себорейний дерматит шкіри голови", ru: "перхоть или себорейный дерматит кожи головы" }, causes.inflammation, treatmentKinds.antiInflammatory, { tags: ["頭皮屑", "脂漏", "頭皮", "洗髮精"], follow: followLong, zhCause: "頭皮皮脂、皮屑芽孢菌與發炎反應", zhTreat: "治療常使用抗屑或抗黴菌洗髮精，嚴重時加上頭皮外用藥。" }),

  item("topical_steroid_instruction", "一般治療說明", "外用類固醇使用說明", { id: "petunjuk penggunaan steroid oles", en: "topical steroid instructions", vi: "hướng dẫn dùng corticosteroid bôi", th: "คำแนะนำการใช้ยาสเตียรอยด์ทา", ja: "外用ステロイドの使い方", ko: "바르는 스테로이드 사용법", uk: "інструкція щодо застосування зовнішніх кортикостероїдів", ru: "инструкция по применению наружных кортикостероидов" }, causes.procedure, treatmentKinds.antiInflammatory, { tags: ["外用類固醇", "藥膏", "濕疹", "乾癬"], zhCause: "外用類固醇是用來降低皮膚發炎、紅腫與搔癢的藥物", zhTreat: "請薄薄擦在發炎部位，依醫師指示的次數與天數使用，不要自行長期擦臉、皺摺或私密處。", zhWarn: "若越擦越痛、化膿、黴菌惡化或皮膚變薄，請回診調整。" }),
  item("topical_antibiotic_instruction", "一般治療說明", "外用抗生素使用說明", { id: "petunjuk penggunaan antibiotik oles", en: "topical antibiotic instructions", vi: "hướng dẫn dùng kháng sinh bôi", th: "คำแนะนำการใช้ยาปฏิชีวนะทา", ja: "外用抗菌薬の使い方", ko: "바르는 항생제 사용법", uk: "інструкція щодо застосування зовнішніх антибіотиків", ru: "инструкция по применению наружных антибиотиков" }, causes.procedure, treatmentKinds.antibiotic, { tags: ["外用抗生素", "抗生素", "感染", "膿皰"], zhCause: "外用抗生素是用來處理局部細菌感染的藥物", zhTreat: "請薄薄擦在感染或醫師指定部位，不要拿來長期保養或擦不相關的皮疹。" }),
  item("topical_antifungal_instruction", "一般治療說明", "外用抗黴菌藥使用說明", { id: "petunjuk penggunaan antijamur oles", en: "topical antifungal instructions", vi: "hướng dẫn dùng thuốc kháng nấm bôi", th: "คำแนะนำการใช้ยาต้านเชื้อราทา", ja: "外用抗真菌薬の使い方", ko: "바르는 항진균제 사용법", uk: "інструкція щодо застосування зовнішніх протигрибкових засобів", ru: "инструкция по применению наружных противогрибковых средств" }, causes.procedure, treatmentKinds.antifungal, { tags: ["外用抗黴菌", "黴菌", "香港腳", "股癬"], treat: tineaTreat, zhCause: "外用抗黴菌藥是用來治療皮膚黴菌感染", zhTreat: "請依醫師指示規律擦藥，症狀改善後通常仍需再擦 1 到 2 週，降低復發。" }),
  item("oral_antibiotic_instruction", "一般治療說明", "口服抗生素使用說明", { id: "petunjuk antibiotik minum", en: "oral antibiotic instructions", vi: "hướng dẫn dùng kháng sinh uống", th: "คำแนะนำการกินยาปฏิชีวนะ", ja: "内服抗菌薬の使い方", ko: "먹는 항생제 복용법", uk: "інструкція щодо пероральних антибіотиків", ru: "инструкция по пероральным антибиотикам" }, causes.procedure, treatmentKinds.antibiotic, { tags: ["口服抗生素", "抗生素", "感染", "毛囊炎"], treat: antibioticCourseTreat, warn: antibioticCourseWarn, zhCause: "口服抗生素用來治療較明顯或範圍較大的細菌感染", zhTreat: "請依照處方時間服用，完整吃完整個療程；即使症狀改善，也不要自行停藥。", zhWarn: "提早停藥可能讓感染反覆或下次更難治。剩餘的藥不要留給下次用，也不要分給家人。" }),
  item("oral_antiviral_instruction", "一般治療說明", "口服抗病毒藥使用說明", { id: "petunjuk antivirus minum", en: "oral antiviral instructions", vi: "hướng dẫn dùng thuốc kháng vi-rút uống", th: "คำแนะนำการกินยาต้านไวรัส", ja: "内服抗ウイルス薬の使い方", ko: "먹는 항바이러스제 복용법", uk: "інструкція щодо пероральних противірусних засобів", ru: "инструкция по пероральным противовирусным средствам" }, causes.procedure, treatmentKinds.antiviral, { tags: ["口服抗病毒", "抗病毒", "皰疹", "帶狀皰疹"], zhCause: "口服抗病毒藥用於皰疹類病毒感染，越早規律服用效果越好", zhTreat: "請依照處方時間完整服用，若腎功能不好或正在使用其他藥物請告知醫師。" }),
  item("cryotherapy_aftercare", "一般治療說明", "冷凍治療後照護", { id: "perawatan setelah terapi beku", en: "cryotherapy aftercare", vi: "chăm sóc sau áp lạnh", th: "การดูแลหลังจี้เย็น", ja: "冷凍療法後のケア", ko: "냉동치료 후 관리", uk: "догляд після кріотерапії", ru: "уход после криотерапии" }, causes.procedure, treatmentKinds.procedure, { tags: ["冷凍", "水泡", "結痂", "疣"], zhCause: "冷凍治療會讓病灶局部結冰，之後可能發炎、起水泡或結痂", zhTreat: "治療後請保持清潔乾燥，不要自行撕皮。若水泡很大或疼痛明顯，可回診處理。", zhWarn: "若紅腫熱痛擴大、流膿或發燒，請提早就醫。" }),
  item("wound_care_dressing", "一般治療說明", "傷口照護與換藥說明", { id: "perawatan luka dan ganti balutan", en: "wound care and dressing instructions", vi: "chăm sóc vết thương và thay băng", th: "การดูแลแผลและเปลี่ยนผ้าปิดแผล", ja: "創傷ケアと包帯交換", ko: "상처 관리와 드레싱", uk: "догляд за раною та зміна пов'язок", ru: "уход за раной и смена повязок" }, causes.procedure, treatmentKinds.procedure, { tags: ["傷口", "換藥", "感染", "紗布"], zhCause: "傷口需要保持清潔並依照醫師指示換藥", zhTreat: "請用醫師指定方式清潔與換藥，保持敷料乾淨，避免泡水或自行塗不明藥膏。", zhWarn: "若紅腫熱痛加劇、流膿、惡臭、發燒或傷口裂開，請提早回診。" }),
  item("urgent_skin_warning", "一般治療說明", "需要立即就醫的皮膚警訊", { id: "tanda bahaya kulit yang perlu segera diperiksa", en: "skin warning signs that need urgent care", vi: "dấu hiệu da cần đi khám ngay", th: "สัญญาณผิวหนังที่ควรพบแพทย์ทันที", ja: "すぐ受診が必要な皮膚の警告症状", ko: "즉시 진료가 필요한 피부 경고 신호", uk: "шкірні попереджувальні ознаки, що потребують термінової допомоги", ru: "кожные предупреждающие признаки, требующие неотложной помощи" }, causes.procedure, treatmentKinds.observe, { tags: ["立即就醫", "警訊", "過敏", "感染", "水泡"], severity: "重要安全提醒", zhCause: "有些皮膚症狀可能代表嚴重感染、嚴重藥物過敏或全身性問題", zhTreat: "若出現警訊，不要只等門診追蹤，請盡快急診或立即就醫。", zhWarn: "出現以下任何一種狀況，請立刻就醫：嘴唇或舌頭腫、呼吸困難；高燒合併皮疹快速擴大；嘴巴、眼睛或生殖器破皮；大片水泡或皮膚像燙傷一樣脫皮；紅腫熱痛快速擴大；意識變差或全身狀況明顯惡化。", zhFollow: "急性危險狀況處理後，再依醫師建議安排皮膚科追蹤。" })
];
