/* =========================================================
   QUU COFFEE — MENÜ VERİSİ (TR / EN / RU)
   p = fiyat [small, grande] veya [tek fiyat]
   k = ortalama kalori (kcal) [small, grande] veya [tek]
   a = alerjenler: gluten, milk, egg, nuts, soy
   Kalori değerleri tam yağlı süt ile hazırlanmış ortalama tahminlerdir.
   ========================================================= */

const t = (tr, en, ru) => ({ tr, en, ru });

/* ---- İŞLETME AYARLARI: kendi bilgilerinizle değiştirin ---- */
const CONFIG = {
  whatsapp: "905000000000",                       // Başında + olmadan, ülke koduyla
  instagram: "https://www.instagram.com/quucoffee/",
  googleReview: "https://www.google.com/maps/place//data=!4m2!3m1!1s0x14c363ef7474ea9d:0x45985c3bac597629",
  wifiName: "QUU_Coffee",
  wifiPass: "sifre1234",
  currency: "₺",
};

/* ---- Alerjen tanımları ---- */
const ALLERGENS = {
  gluten: { color: "#B7791F", n: t("Gluten", "Gluten", "Глютен") },
  milk:   { color: "#2B6CB0", n: t("Süt / Laktoz", "Milk / Lactose", "Молоко / лактоза") },
  egg:    { color: "#C98A12", n: t("Yumurta", "Egg", "Яйцо") },
  nuts:   { color: "#8B5A2B", n: t("Sert kabuklu yemiş", "Tree nuts", "Орехи") },
  soy:    { color: "#5F7F1F", n: t("Soya", "Soy", "Соя") },
};

/* ---- Açıklama yardımcıları ---- */
const latteD = (tr, en, ru) => t(`Espresso, süt ve ${tr}.`, `Espresso, milk and ${en}.`, `Эспрессо, молоко и ${ru}.`);
const matchaD = (tr, en, ru) => t(`Matcha, süt ve ${tr}.`, `Matcha, milk and ${en}.`, `Матча, молоко и ${ru}.`);
const iced = (d) => t(`${d.tr.replace(/\.$/, "")}, bol buz ile.`, `${d.en.replace(/\.$/, "")}, served over ice.`, `${d.ru.replace(/\.$/, "")}, со льдом.`);

const D = {
  espresso:  t("Yoğun ve aromatik İtalyan usulü espresso.", "Rich, aromatic Italian-style espresso.", "Насыщенный ароматный эспрессо по-итальянски."),
  americano: t("Espresso ve sıcak su.", "Espresso topped with hot water.", "Эспрессо с горячей водой."),
  cappuccino:t("Espresso, sıcak süt ve yoğun süt köpüğü.", "Espresso, steamed milk and thick foam.", "Эспрессо, горячее молоко и густая пенка."),
  latte:     t("Espresso ve bol kadifemsi süt.", "Espresso with plenty of silky milk.", "Эспрессо с большим количеством нежного молока."),
  flat:      t("Çift shot espresso ve ince mikro köpük.", "Double espresso with velvety microfoam.", "Двойной эспрессо с бархатной микропеной."),
  mocha:     t("Espresso, çikolata sos ve süt.", "Espresso, chocolate sauce and milk.", "Эспрессо, шоколадный соус и молоко."),
  wmocha:    t("Espresso, beyaz çikolata sos ve süt.", "Espresso, white chocolate sauce and milk.", "Эспрессо, соус из белого шоколада и молоко."),
  filter:    t("Günlük taze demlenen filtre kahve.", "Freshly brewed filter coffee.", "Свежесваренный фильтр-кофе."),
};

const WAFFLE_BASE = t(
  "Taze waffle, 2 meyve seçimi (muz, çilek, kivi), sütlü çikolata, pirinç patlağı, badem veya fındık kırığı",
  "Fresh waffle, choice of 2 fruits (banana, strawberry, kiwi), milk chocolate, puffed rice, crushed almonds or hazelnuts",
  "Свежая вафля, 2 фрукта на выбор (банан, клубника, киви), молочный шоколад, воздушный рис, дроблёный миндаль или фундук"
);
const waffleD = (tr, en, ru) => tr
  ? t(`${tr} + ${WAFFLE_BASE.tr.charAt(0).toLocaleLowerCase("tr")}${WAFFLE_BASE.tr.slice(1)}.`, `${en} + ${WAFFLE_BASE.en.charAt(0).toLowerCase()}${WAFFLE_BASE.en.slice(1)}.`, `${ru} + ${WAFFLE_BASE.ru.charAt(0).toLowerCase()}${WAFFLE_BASE.ru.slice(1)}.`)
  : t(`${WAFFLE_BASE.tr}.`, `${WAFFLE_BASE.en}.`, `${WAFFLE_BASE.ru}.`);

const MENU = [
  {
    id: "coffees", icon: "coffee", tone: "navy",
    n: t("Kahveler", "Coffees", "Кофе"),
    items: [
      { n: t("Espresso", "Espresso", "Эспрессо"), d: D.espresso, p: [100, 120], k: [5, 10], a: [] },
      { n: t("Americano", "Americano", "Американо"), d: D.americano, p: [175, 185], k: [10, 15], a: [] },
      { n: t("Cappuccino", "Cappuccino", "Капучино"), d: D.cappuccino, p: [190, 200], k: [110, 150], a: ["milk"], pop: 1 },
      { n: t("Latte", "Latte", "Латте"), d: D.latte, p: [190, 200], k: [150, 200], a: ["milk"], pop: 1 },
      { n: t("Flat White", "Flat White", "Флэт уайт"), d: D.flat, p: [190, 200], k: [120, 160], a: ["milk"] },
      { n: t("Mocha", "Mocha", "Мокко"), d: D.mocha, p: [200, 210], k: [260, 330], a: ["milk", "soy"] },
      { n: t("White Mocha", "White Mocha", "Белый мокко"), d: D.wmocha, p: [200, 210], k: [300, 380], a: ["milk", "soy"] },
      { n: t("Filtre Kahve", "Filter Coffee", "Фильтр-кофе"), d: D.filter, p: [175, 185], k: [5, 10], a: [] },
    ],
  },
  {
    id: "ice", icon: "snow", tone: "sea",
    n: t("Soğuk Kahveler", "Iced Coffees", "Холодный кофе"),
    items: [
      { n: t("Ice Espresso", "Iced Espresso", "Айс эспрессо"), d: iced(D.espresso), p: [100, 120], k: [5, 10], a: [] },
      { n: t("Ice Americano", "Iced Americano", "Айс американо"), d: iced(D.americano), p: [175, 185], k: [10, 15], a: [], pop: 1 },
      { n: t("Ice Cappuccino", "Iced Cappuccino", "Айс капучино"), d: iced(D.cappuccino), p: [190, 200], k: [100, 140], a: ["milk"] },
      { n: t("Ice Latte", "Iced Latte", "Айс латте"), d: iced(D.latte), p: [190, 200], k: [130, 180], a: ["milk"], pop: 1 },
      { n: t("Ice Flat White", "Iced Flat White", "Айс флэт уайт"), d: iced(D.flat), p: [190, 200], k: [110, 150], a: ["milk"] },
      { n: t("Ice Mocha", "Iced Mocha", "Айс мокко"), d: iced(D.mocha), p: [200, 210], k: [240, 310], a: ["milk", "soy"] },
      { n: t("Ice White Mocha", "Iced White Mocha", "Айс белый мокко"), d: iced(D.wmocha), p: [200, 210], k: [280, 360], a: ["milk", "soy"] },
      { n: t("Ice Filtre Kahve", "Iced Filter Coffee", "Айс фильтр-кофе"), d: iced(D.filter), p: [175, 185], k: [5, 10], a: [] },
    ],
  },
  {
    id: "lattes", icon: "glass", tone: "sand",
    n: t("Aromalı Latteler", "Flavoured Lattes", "Ароматные латте"),
    items: [
      { n: t("Caramel Latte", "Caramel Latte", "Карамельный латте"), d: latteD("karamel şurubu", "caramel syrup", "карамельный сироп"), p: [190, 210], k: [240, 300], a: ["milk"], pop: 1 },
      { n: t("Vanilya Latte", "Vanilla Latte", "Ванильный латте"), d: latteD("vanilya şurubu", "vanilla syrup", "ванильный сироп"), p: [190, 210], k: [230, 290], a: ["milk"] },
      { n: t("Toffee Latte", "Toffee Latte", "Латте тоффи"), d: latteD("toffee şurubu", "toffee syrup", "сироп тоффи"), p: [200, 220], k: [250, 320], a: ["milk"] },
      { n: t("Nutella Latte", "Nutella Latte", "Латте с Nutella"), d: latteD("Nutella", "Nutella", "Nutella"), p: [200, 220], k: [320, 400], a: ["milk", "nuts", "soy"] },
      { n: t("Roseberry Latte", "Roseberry Latte", "Латте роузберри"), d: latteD("gül & orman meyvesi aroması", "rose & berry flavour", "аромат розы и ягод"), p: [190, 210], k: [220, 280], a: ["milk"] },
      { n: t("Salted Caramel Latte", "Salted Caramel Latte", "Латте солёная карамель"), d: latteD("tuzlu karamel sos", "salted caramel sauce", "соус солёная карамель"), p: [200, 220], k: [260, 330], a: ["milk"] },
      { n: t("Chai Tea Latte", "Chai Tea Latte", "Чай латте"), d: t("Baharatlı chai çayı ve köpüklü süt.", "Spiced chai tea with frothed milk.", "Пряный чай масала со вспененным молоком."), p: [200, 220], k: [220, 280], a: ["milk"] },
      { n: t("Strawberry Latte", "Strawberry Latte", "Клубничный латте"), d: latteD("çilek aroması", "strawberry flavour", "клубничный вкус"), p: [190, 210], k: [230, 290], a: ["milk"] },
      { n: t("Lotus Latte", "Lotus Latte", "Латте Lotus"), d: latteD("Lotus Biscoff kreması & kırıntısı", "Lotus Biscoff spread & crumbs", "паста и крошка Lotus Biscoff"), p: [200, 220], k: [310, 390], a: ["milk", "gluten", "soy"], pop: 1 },
      { n: t("Pumpkin Spice Latte", "Pumpkin Spice Latte", "Тыквенный пряный латте"), d: latteD("balkabağı baharatı", "pumpkin spice", "тыквенные специи"), p: [200, 220], k: [260, 330], a: ["milk"] },
    ],
  },
  {
    id: "matcha", icon: "leaf", tone: "olive",
    n: t("Matcha", "Matcha", "Матча"),
    items: [
      { n: t("Matcha Latte", "Matcha Latte", "Матча латте"), d: t("Japon matcha çayı ve kadifemsi süt.", "Japanese matcha tea with silky milk.", "Японский чай матча с нежным молоком."), p: [200, 220], k: [160, 210], a: ["milk"], pop: 1 },
      { n: t("Caramel Matcha", "Caramel Matcha", "Карамельная матча"), d: matchaD("karamel", "caramel", "карамель"), p: [200, 220], k: [230, 290], a: ["milk"] },
      { n: t("Strawberry Matcha", "Strawberry Matcha", "Клубничная матча"), d: matchaD("çilek püresi", "strawberry purée", "клубничное пюре"), p: [200, 220], k: [220, 280], a: ["milk"], pop: 1 },
      { n: t("Blueberry Matcha", "Blueberry Matcha", "Черничная матча"), d: matchaD("yaban mersini", "blueberry", "черника"), p: [200, 220], k: [220, 280], a: ["milk"] },
      { n: t("Mango Matcha", "Mango Matcha", "Манго матча"), d: matchaD("mango püresi", "mango purée", "пюре манго"), p: [200, 220], k: [220, 280], a: ["milk"] },
      { n: t("Nutella Matcha", "Nutella Matcha", "Матча с Nutella"), d: matchaD("Nutella", "Nutella", "Nutella"), p: [200, 220], k: [320, 400], a: ["milk", "nuts", "soy"] },
      { n: t("Honey Lime Matcha", "Honey Lime Matcha", "Матча мёд-лайм"), d: t("Matcha, bal ve taze lime.", "Matcha, honey and fresh lime.", "Матча, мёд и свежий лайм."), p: [200, 220], k: [120, 160], a: [] },
    ],
  },
  {
    id: "signatures", icon: "star", tone: "bougain",
    n: t("Coffee Signatures", "Coffee Signatures", "Фирменный кофе"),
    items: [
      { n: t("QUU Sunshine", "QUU Sunshine", "QUU Sunshine"), d: t("Portakal suyu üzerinde espresso, bol buz.", "Espresso over orange juice and ice.", "Эспрессо на апельсиновом соке со льдом."), p: [200, 220], k: [90, 120], a: [], pop: 1 },
      { n: t("QUU Sunset", "QUU Sunset", "QUU Sunset"), d: t("Meyve aromalı buzlu espresso, gün batımı renklerinde.", "Fruity iced espresso in sunset colours.", "Фруктовый айс-эспрессо цвета заката."), p: [200, 220], k: [110, 140], a: [] },
      { n: t("QUU Honey", "QUU Honey", "QUU Honey"), d: t("Espresso, bal ve süt ile yumuşak içim.", "Smooth espresso with honey and milk.", "Мягкий эспрессо с мёдом и молоком."), p: [200, 220], k: [150, 190], a: ["milk"] },
      { n: t("QUU Sparkling", "QUU Sparkling", "QUU Sparkling"), d: t("Espresso, soda ve limon — ferah ve köpüklü.", "Espresso, soda and lemon — bright and fizzy.", "Эспрессо, содовая и лимон — свежо и игристо."), p: [200, 220], k: [60, 80], a: [] },
    ],
  },
  {
    id: "fresh", icon: "citrus", tone: "bougain",
    n: t("Signature Fresh", "Signature Fresh", "Фирменные освежающие"),
    items: [
      { n: t("QUU Pink", "QUU Pink", "QUU Pink"), d: t("Çilek ve ahududu ile pembe ferahlık.", "Pink refresher with strawberry and raspberry.", "Розовый освежающий напиток с клубникой и малиной."), p: [190, 200], k: [140, 180], a: [], pop: 1 },
      { n: t("QUU Fresh", "QUU Fresh", "QUU Fresh"), d: t("Nane ve lime ile serinletici içecek.", "Cooling drink with mint and lime.", "Освежающий напиток с мятой и лаймом."), p: [200, 210], k: [120, 160], a: [] },
      { n: t("QUU Berry", "QUU Berry", "QUU Berry"), d: t("Orman meyveleriyle yoğun meyve lezzeti.", "Intense mixed-berry refresher.", "Насыщенный напиток с лесными ягодами."), p: [190, 200], k: [150, 190], a: [] },
      { n: t("QUU Green", "QUU Green", "QUU Green"), d: t("Yeşil elma ve kivi ile ferah içim.", "Fresh green apple and kiwi.", "Свежее зелёное яблоко и киви."), p: [200, 210], k: [130, 170], a: [] },
      { n: t("QUU Lime", "QUU Lime", "QUU Lime"), d: t("Lime ve soda ile ekşi-tatlı ferahlık.", "Tangy lime and soda refresher.", "Кисло-сладкий лайм с содовой."), p: [190, 200], k: [110, 140], a: [] },
    ],
  },
  {
    id: "hot", icon: "mug", tone: "terracotta",
    n: t("Sıcak İçecekler", "Hot Drinks", "Горячие напитки"),
    items: [
      { n: t("Sıcak Çikolata", "Hot Chocolate", "Горячий шоколад"), d: t("Kremamsı sütlü sıcak çikolata.", "Creamy hot chocolate made with milk.", "Сливочный горячий шоколад на молоке."), p: [185, 195], k: [330, 400], a: ["milk", "soy"], pop: 1 },
      { n: t("Beyaz Sıcak Çikolata", "White Hot Chocolate", "Белый горячий шоколад"), d: t("Beyaz çikolata ve sıcak süt.", "White chocolate with hot milk.", "Белый шоколад с горячим молоком."), p: [185, 195], k: [370, 450], a: ["milk", "soy"] },
      { n: t("Salep", "Salep", "Салеп"), d: t("Tarçınlı geleneksel sıcak salep.", "Traditional warm orchid-root milk drink with cinnamon.", "Традиционный горячий молочный напиток из корня орхидеи с корицей."), p: [185, 195], k: [260, 320], a: ["milk"] },
      { n: t("Türk Kahvesi", "Turkish Coffee", "Турецкий кофе"), d: t("Közde pişmiş gibi köpüklü, geleneksel Türk kahvesi.", "Traditional foamy Turkish coffee.", "Традиционный турецкий кофе с пенкой."), p: [110, 120], k: [10, 15], a: [], pop: 1 },
      { n: t("Deve Batmaz", "Deve Batmaz", "Деве Батмаз"), d: t("Sütle pişirilen, yoğun köpüklü Türk kahvesi.", "Extra-foamy Turkish coffee brewed with milk.", "Турецкий кофе на молоке с очень густой пенкой."), p: [140, 150], k: [90, 120], a: ["milk"] },
      { n: t("Mihrimah Sultan", "Mihrimah Sultan", "Михримах Султан"), d: t("Kakao ve baharatlarla zenginleştirilmiş sütlü Osmanlı kahvesi.", "Ottoman-style milk coffee enriched with cocoa and spices.", "Османский кофе на молоке с какао и пряностями."), p: [150, 160], k: [140, 180], a: ["milk"] },
    ],
  },
  {
    id: "tea", icon: "tea", tone: "terracotta",
    n: t("Çay & Bitki Çayları", "Tea & Herbal Teas", "Чай и травяные чаи"),
    items: [
      { n: t("Çay", "Turkish Tea", "Турецкий чай"), d: t("Taze demlenmiş Türk çayı.", "Freshly brewed Turkish black tea.", "Свежезаваренный турецкий чёрный чай."), p: [90, 100], k: [2, 3], a: [], pop: 1 },
      { n: t("Ihlamur", "Linden Tea", "Липовый чай"), d: t("Rahatlatıcı ıhlamur çiçeği.", "Soothing linden blossom infusion.", "Успокаивающий настой липового цвета."), p: [150, 160], k: [5, 8], a: [] },
      { n: t("Adaçayı", "Sage Tea", "Шалфейный чай"), d: t("Ege adaçayı demlemesi.", "Aegean sage infusion.", "Настой эгейского шалфея."), p: [150, 160], k: [5, 8], a: [] },
      { n: t("Papatya", "Chamomile Tea", "Ромашковый чай"), d: t("Sakinleştirici papatya çayı.", "Calming chamomile infusion.", "Успокаивающий ромашковый чай."), p: [150, 160], k: [5, 8], a: [] },
      { n: t("Kış Çayı", "Winter Tea", "Зимний чай"), d: t("Meyve ve baharatlarla ısıtan kış çayı.", "Warming winter blend with fruit and spices.", "Согревающий чай с фруктами и пряностями."), p: [150, 160], k: [40, 55], a: [] },
      { n: t("Nane Limon", "Mint & Lemon Tea", "Чай мята-лимон"), d: t("Taze nane ve limon.", "Fresh mint and lemon.", "Свежая мята и лимон."), p: [150, 160], k: [10, 15], a: [] },
      { n: t("Kuşburnu", "Rosehip Tea", "Чай из шиповника"), d: t("C vitamini deposu kuşburnu çayı.", "Vitamin C–rich rosehip tea.", "Чай из шиповника, богатый витамином C."), p: [150, 160], k: [10, 15], a: [] },
      { n: t("Yeşil Çay", "Green Tea", "Зелёный чай"), d: t("Hafif ve ferah yeşil çay.", "Light and refreshing green tea.", "Лёгкий освежающий зелёный чай."), p: [150, 160], k: [2, 3], a: [] },
      { n: t("Elma Tarçın", "Apple Cinnamon Tea", "Яблочно-коричный чай"), d: t("Elma ve tarçın ile sıcacık.", "Cosy apple and cinnamon blend.", "Уютный напиток из яблока и корицы."), p: [150, 160], k: [30, 40], a: [] },
    ],
  },
  {
    id: "lemonade", icon: "glass", tone: "sea",
    n: t("Limonata & Frozen", "Lemonade & Frozen", "Лимонад и фрозен"),
    items: [
      { n: t("Çilekli Limonata", "Strawberry Lemonade", "Клубничный лимонад"), d: t("Ev yapımı limonata ve çilek.", "Homemade lemonade with strawberry.", "Домашний лимонад с клубникой."), p: [180, 190], k: [150, 190], a: [], pop: 1 },
      { n: t("Naneli Limonata", "Mint Lemonade", "Мятный лимонад"), d: t("Ev yapımı limonata ve taze nane.", "Homemade lemonade with fresh mint.", "Домашний лимонад со свежей мятой."), p: [180, 190], k: [140, 180], a: [] },
      { n: t("Yeşil Elmalı Limonata", "Green Apple Lemonade", "Лимонад с зелёным яблоком"), d: t("Ev yapımı limonata ve yeşil elma.", "Homemade lemonade with green apple.", "Домашний лимонад с зелёным яблоком."), p: [180, 190], k: [150, 190], a: [] },
      { n: t("Karpuz Frozen", "Watermelon Frozen", "Арбузный фрозен"), d: t("Buzla çekilmiş karpuz.", "Watermelon blended with ice.", "Арбуз, взбитый со льдом."), p: [190, 210], k: [170, 220], a: [] },
      { n: t("Muz Frozen", "Banana Frozen", "Банановый фрозен"), d: t("Buzla çekilmiş muz.", "Banana blended with ice.", "Банан, взбитый со льдом."), p: [190, 210], k: [200, 250], a: [] },
      { n: t("Çilek Frozen", "Strawberry Frozen", "Клубничный фрозен"), d: t("Buzla çekilmiş çilek.", "Strawberry blended with ice.", "Клубника, взбитая со льдом."), p: [190, 210], k: [180, 230], a: [], pop: 1 },
      { n: t("Mango Frozen", "Mango Frozen", "Манго фрозен"), d: t("Buzla çekilmiş mango.", "Mango blended with ice.", "Манго, взбитое со льдом."), p: [190, 210], k: [190, 240], a: [] },
    ],
  },
  {
    id: "milkshake", icon: "shake", tone: "bougain",
    n: t("Milkshake", "Milkshakes", "Милкшейки"),
    items: [
      { n: t("Çilekli Milkshake", "Strawberry Milkshake", "Клубничный милкшейк"), d: t("Dondurma, süt ve çilek.", "Ice cream, milk and strawberry.", "Мороженое, молоко и клубника."), p: [200, 220], k: [380, 480], a: ["milk"], pop: 1 },
      { n: t("Vanilyalı Milkshake", "Vanilla Milkshake", "Ванильный милкшейк"), d: t("Dondurma, süt ve vanilya.", "Ice cream, milk and vanilla.", "Мороженое, молоко и ваниль."), p: [200, 220], k: [370, 470], a: ["milk"] },
      { n: t("Muzlu Milkshake", "Banana Milkshake", "Банановый милкшейк"), d: t("Dondurma, süt ve muz.", "Ice cream, milk and banana.", "Мороженое, молоко и банан."), p: [200, 220], k: [390, 490], a: ["milk"] },
      { n: t("Çikolatalı Milkshake", "Chocolate Milkshake", "Шоколадный милкшейк"), d: t("Dondurma, süt ve çikolata.", "Ice cream, milk and chocolate.", "Мороженое, молоко и шоколад."), p: [200, 220], k: [430, 540], a: ["milk", "soy"] },
      { n: t("Karamelli Milkshake", "Caramel Milkshake", "Карамельный милкшейк"), d: t("Dondurma, süt ve karamel.", "Ice cream, milk and caramel.", "Мороженое, молоко и карамель."), p: [200, 220], k: [420, 530], a: ["milk"] },
    ],
  },
  {
    id: "bubble", icon: "bubble", tone: "olive",
    n: t("Bubble Tea", "Bubble Tea", "Бабл-ти"),
    items: [
      { n: t("Çilekli Bubble Tea", "Strawberry Bubble Tea", "Клубничный бабл-ти"), d: t("Çilekli çay ve patlayan boba topları.", "Strawberry tea with popping boba pearls.", "Клубничный чай с лопающимися шариками бобы."), p: [220, 240], k: [280, 350], a: [], pop: 1 },
      { n: t("Karamelli Bubble Tea", "Caramel Bubble Tea", "Карамельный бабл-ти"), d: t("Karamelli sütlü çay ve boba topları.", "Caramel milk tea with boba pearls.", "Карамельный молочный чай с шариками бобы."), p: [220, 240], k: [330, 410], a: ["milk"] },
      { n: t("Yaban Mersinli Bubble Tea", "Blueberry Bubble Tea", "Черничный бабл-ти"), d: t("Yaban mersinli çay ve patlayan boba topları.", "Blueberry tea with popping boba pearls.", "Черничный чай с лопающимися шариками бобы."), p: [220, 240], k: [280, 350], a: [] },
    ],
  },
  {
    id: "waffle", icon: "waffle", tone: "sand",
    n: t("QUU Waffle", "QUU Waffle", "QUU Вафли"),
    sub: t("Her lokmada mutluluk!", "Happiness in every bite!", "Счастье в каждом кусочке!"),
    items: [
      { n: t("QUU Classic", "QUU Classic", "QUU Classic"), d: waffleD("", "", ""), p: [199], k: [650], a: ["gluten", "milk", "egg", "nuts", "soy"], pop: 1 },
      { n: t("QUU Caramel", "QUU Caramel", "QUU Caramel"), d: waffleD("Karamel sos & Lotus Biscoff", "Caramel sauce & Lotus Biscoff", "Карамельный соус и Lotus Biscoff"), p: [250], k: [780], a: ["gluten", "milk", "egg", "nuts", "soy"] },
      { n: t("QUU Black", "QUU Black", "QUU Black"), d: waffleD("Bitter çikolata, Oreo tozu & Oreo", "Dark chocolate, Oreo crumbs & Oreo", "Горький шоколад, крошка Oreo и Oreo"), p: [250], k: [800], a: ["gluten", "milk", "egg", "nuts", "soy"], pop: 1 },
      { n: t("QUU White", "QUU White", "QUU White"), d: waffleD("Beyaz çikolata & Antep fıstığı sos", "White chocolate & pistachio sauce", "Белый шоколад и фисташковый соус"), p: [250], k: [790], a: ["gluten", "milk", "egg", "nuts", "soy"] },
      { n: t("QUU Dream", "QUU Dream", "QUU Dream"), d: waffleD("Patlayan şeker & frambuaz sos", "Popping candy & raspberry sauce", "Взрывная карамель и малиновый соус"), p: [250], k: [760], a: ["gluten", "milk", "egg", "nuts", "soy"] },
    ],
  },
  {
    id: "extras", icon: "plus", tone: "navy",
    n: t("Ekstralar", "Extras", "Дополнительно"),
    items: [
      { n: t("Ekstra Espresso Shot", "Extra Espresso Shot", "Дополнительный шот эспрессо"), d: t("İçeceğinize bir shot daha.", "One more shot for your drink.", "Ещё один шот в ваш напиток."), p: [50], k: [5], a: [] },
      { n: t("Ekstra Şurup", "Extra Syrup", "Дополнительный сироп"), d: t("Karamel, vanilya, fındık ve daha fazlası.", "Caramel, vanilla, hazelnut and more.", "Карамель, ваниль, фундук и другие."), p: [50], k: [80], a: [] },
      { n: t("Ekstra Bitkisel Süt", "Extra Plant-based Milk", "Растительное молоко"), d: t("Laktozsuz alternatif: yulaf, badem veya soya sütü.", "Lactose-free option: oat, almond or soy milk.", "Без лактозы: овсяное, миндальное или соевое молоко."), p: [50], k: [60], a: ["nuts", "soy", "gluten"] },
    ],
  },
];
