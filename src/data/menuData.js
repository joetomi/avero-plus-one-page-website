export const menuSections = [
  {
    id: "food",
    label: { en: "Food", ar: "الطعام" },
    pdf: "/assets/menu-pdfs/food-finel.pdf",
    categories: [
      { id: "starters", label: { en: "Starters", ar: "المقبلات" } },
      { id: "salads", label: { en: "Salads", ar: "السلطات" } },
      { id: "soups", label: { en: "Soups", ar: "الشوربات" } },
      { id: "burgers", label: { en: "Burgers", ar: "البرجر" } },
      { id: "pinsa-romana", label: { en: "Pinsa Romana", ar: "بينسا رومانا" } },
      { id: "risotto", label: { en: "Risotto", ar: "الريزوتو" } },
      { id: "pasta-classica", label: { en: "Pasta Classica", ar: "الباستا الكلاسيكية" } },
      { id: "pasta-speciale", label: { en: "Pasta Speciale", ar: "الباستا الخاصة" } },
      { id: "meat-seafood", label: { en: "Meat & Seafood", ar: "اللحوم والمأكولات البحرية" } },
    ],
  },
  {
    id: "breakfast",
    label: { en: "Breakfast", ar: "الفطور" },
    pdf: "/assets/menu-pdfs/breakfast-finel.pdf",
    categories: [
      { id: "avero-breakfast", label: { en: "Avero Breakfast", ar: "فطور آفيرو" } },
      { id: "omelette", label: { en: "Omelette", ar: "الأومليت" } },
      { id: "toast", label: { en: "Toast", ar: "التوست" } },
      { id: "sandwiches", label: { en: "Sandwiches", ar: "الساندوتشات" } },
    ],
  },
  {
    id: "coffee-drinks",
    label: { en: "Coffee & Drinks", ar: "القهوة والمشروبات" },
    pdf: "/assets/menu-pdfs/cafee-finel.pdf",
    categories: [
      { id: "hot-beverages", label: { en: "Hot Beverages", ar: "مشروبات ساخنة" } },
      { id: "cold-beverages", label: { en: "Cold Beverages", ar: "مشروبات باردة" } },
      { id: "fresh-juice", label: { en: "Fresh Juice", ar: "عصائر طازجة" } },
      { id: "froby", label: { en: "Froby", ar: "فروبي" } },
      { id: "mojito", label: { en: "Mojito", ar: "موهيتو" } },
      { id: "smoothie", label: { en: "Smoothie", ar: "سموذي" } },
      { id: "milkshake", label: { en: "Milkshake", ar: "ميلك شيك" } },
      { id: "pastries", label: { en: "Pastries", ar: "المخبوزات" } },
      { id: "pancake", label: { en: "Pancake", ar: "بان كيك" } },
      { id: "crepe", label: { en: "Crepe", ar: "كريب" } },
    ],
  },
  {
    id: "summer-drinks",
    label: { en: "Summer Drinks", ar: "مشروبات الصيف" },
    pdf: "/assets/menu-pdfs/summer_drinks-finel.pdf",
    categories: [
      { id: "summer-avero", label: { en: "Summer Avero", ar: "صيف آفيرو" } },
    ],
  },
];

// TODO: Add Food items manually from approved text only. Do not extract from PDFs.
const foodItems = [];

// TODO: Add Breakfast items manually from approved text only. Do not extract from PDFs.
const breakfastItems = [];

// TODO: Add Coffee & Drinks items manually from approved text only. Do not extract from PDFs.
const coffeeDrinkItems = [];

const summerDrinkItems = [
  {
    id: "pink-soli",
    section: "summer-drinks",
    category: "summer-avero",
    name: { ar: "بنك سولي", en: "Pink Soli" },
    description: { ar: "أناناس، برتقال، ليمون", en: "" },
    price: "27 LYD",
    image: "/assets/menu/summer/pink-soli.png",
  },
  {
    id: "blue-carosa",
    section: "summer-drinks",
    category: "summer-avero",
    name: { ar: "بلو كاروسا", en: "Blue Carosa" },
    description: { ar: "بلو كاروسا، أناناس، برتقال، ليمون", en: "" },
    price: "27 LYD",
    image: "/assets/menu/summer/blue-carosa.png",
  },
  {
    id: "ginger-pineapple",
    section: "summer-drinks",
    category: "summer-avero",
    name: { ar: "جنجر باين أبل", en: "Ginger Pineapple" },
    description: { ar: "جنزبيل، ليمون", en: "" },
    price: "27 LYD",
    image: "/assets/menu/summer/ginger-pineapple.png",
  },
  {
    id: "maro-lemon",
    section: "summer-drinks",
    category: "summer-avero",
    name: { ar: "مارو ليمون", en: "Maro Lemon" },
    description: { ar: "كيوي، أناناس، برتقال، ليمون", en: "" },
    price: "27 LYD",
    image: "/assets/menu/summer/maro-lemon.png",
  },
  {
    id: "passion-sunrise",
    section: "summer-drinks",
    category: "summer-avero",
    name: { ar: "باش صن رايز", en: "Passion Sunrise" },
    description: { ar: "صوص باشن، مانجو، برتقال، فراولة", en: "" },
    price: "27 LYD",
    image: "/assets/menu/summer/passion-sunrise.png",
  },
  {
    id: "frost-lemon-mint",
    section: "summer-drinks",
    category: "summer-avero",
    name: { ar: "فروست ليمون منت", en: "Frost Lemon Mint" },
    description: { ar: "نعناع، ليمون", en: "" },
    price: "27 LYD",
    image: "/assets/menu/summer/frost-lemon-mint.png",
  },
  {
    id: "healthy-detox",
    section: "summer-drinks",
    category: "summer-avero",
    name: { ar: "هيلي ديتوكس", en: "Healthy Detox" },
    description: { ar: "بنجر، أفوكادو، بلح، تفاح", en: "" },
    price: "27 LYD",
    image: "/assets/menu/summer/healthy-detox.png",
  },
  {
    id: "passion-mango",
    section: "summer-drinks",
    category: "summer-avero",
    name: { ar: "باشن مانجو", en: "Passion Mango" },
    description: { ar: "نعناع، مانجو، باشن", en: "" },
    price: "27 LYD",
    image: "/assets/menu/summer/passion-mango.png",
  },
  {
    id: "blue-banana",
    section: "summer-drinks",
    category: "summer-avero",
    name: { ar: "بلو بنانا", en: "Blue Banana" },
    description: { ar: "موز، توت أزرق", en: "" },
    price: "27 LYD",
    image: "/assets/menu/summer/blue-banana.png",
  },
  {
    id: "hibiscus-berry",
    section: "summer-drinks",
    category: "summer-avero",
    name: { ar: "هيبسكس بيري", en: "Hibiscus Berry" },
    description: { ar: "ليمون، كركديه", en: "" },
    price: "27 LYD",
    image: "/assets/menu/summer/hibiscus-berry.png",
  },
];

export const menuItems = [
  ...foodItems,
  ...breakfastItems,
  ...coffeeDrinkItems,
  ...summerDrinkItems,
];

export const menuCopy = {
  en: {
    badge: "Italian Taste",
    title: "Avero Menu",
    subtitle: "Explore our Italian-inspired selection of food, coffee, breakfast, and seasonal drinks.",
    viewPdf: "View Original PDF",
    downloadPdf: "Download PDF",
    emptyTitle: "Interactive items will be added soon.",
    emptyText: "Use the original PDF buttons above while this section is being added manually.",
  },
  ar: {
    badge: "المذاق الإيطالي",
    title: "قائمة آفيرو",
    subtitle: "استكشف تشكيلتنا المستوحاة من المذاق الإيطالي من الأطباق والقهوة والفطور والمشروبات الموسمية.",
    viewPdf: "عرض القائمة الأصلية",
    downloadPdf: "تحميل PDF",
    emptyTitle: "سيتم إضافة العناصر التفاعلية قريبًا.",
    emptyText: "يمكنك استخدام أزرار القائمة الأصلية أعلاه إلى حين إضافة هذا القسم يدويًا.",
  },
};
