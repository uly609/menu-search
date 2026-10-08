const dishes = [
  { name: "番茄鸡蛋面", category: "主食", price: 26, emoji: "🍜", bg: "#f8dfc9", description: "酸甜番茄配嫩滑鸡蛋，暖胃又满足。", tags: ["家常", "酸甜"], keywords: "番茄 西红柿 鸡蛋 面条 面 清淡" },
  { name: "香煎鸡腿饭", category: "主食", price: 38, emoji: "🍗", bg: "#f6dfbf", description: "外皮焦香，鸡肉多汁，搭配时蔬。", tags: ["鸡肉", "人气"], keywords: "鸡腿 鸡肉 米饭 香煎 荤菜" },
  { name: "牛肉炒河粉", category: "主食", price: 35, emoji: "🍝", bg: "#f1e1c8", description: "大火快炒，牛肉鲜嫩，锅气十足。", tags: ["牛肉", "微辣"], keywords: "牛肉 河粉 炒粉 辣 荤菜" },
  { name: "宫保鸡丁", category: "热菜", price: 32, emoji: "🥘", bg: "#f5d6c4", description: "鸡丁、花生和爽脆蔬菜的经典搭配。", tags: ["鸡肉", "微辣"], keywords: "宫保 鸡丁 鸡肉 花生 辣菜" },
  { name: "鱼香茄子", category: "热菜", price: 28, emoji: "🍆", bg: "#e8ddf0", description: "茄子软糯入味，酸甜鲜香很下饭。", tags: ["素食", "下饭"], keywords: "茄子 鱼香 素菜 清淡" },
  { name: "青椒土豆丝", category: "热菜", price: 22, emoji: "🥔", bg: "#e7efcf", description: "脆嫩爽口，家常清炒不油腻。", tags: ["素食", "清淡"], keywords: "土豆 青椒 素菜 清淡 蔬菜" },
  { name: "玉米排骨汤", category: "汤品", price: 24, emoji: "🍲", bg: "#f4e6c7", description: "玉米清甜，排骨软嫩，慢火炖煮。", tags: ["暖胃", "家常"], keywords: "玉米 排骨 汤 清淡 营养" },
  { name: "菌菇豆腐汤", category: "汤品", price: 20, emoji: "🥣", bg: "#e6ebd9", description: "多种菌菇与嫩豆腐，鲜美清爽。", tags: ["素食", "清淡"], keywords: "菌菇 蘑菇 豆腐 汤 素食 清淡" },
  { name: "南瓜小米粥", category: "轻食", price: 16, emoji: "🥣", bg: "#f8e2bd", description: "软糯细腻，给肠胃一份温柔。", tags: ["清淡", "暖胃"], keywords: "南瓜 小米 粥 清淡 轻食 早餐" },
  { name: "鲜虾牛油果沙拉", category: "轻食", price: 36, emoji: "🥗", bg: "#dcead4", description: "鲜虾、牛油果和脆嫩蔬菜。", tags: ["低脂", "鲜虾"], keywords: "虾 牛油果 沙拉 蔬菜 低脂 健康" },
  { name: "照烧三文鱼", category: "热菜", price: 46, emoji: "🍣", bg: "#f4d6c7", description: "甜咸照烧汁包裹鲜嫩三文鱼。", tags: ["鱼类", "高蛋白"], keywords: "三文鱼 鱼 照烧 高蛋白 海鲜" },
  { name: "香菇青菜饭", category: "主食", price: 25, emoji: "🍚", bg: "#e7ebd3", description: "香菇鲜香，青菜脆嫩，简单一餐。", tags: ["素食", "清淡"], keywords: "香菇 青菜 米饭 素食 蔬菜 清淡" },
];

const grid = document.querySelector("#menuGrid");
const searchInput = document.querySelector("#searchInput");
const countLabel = document.querySelector("#resultCount");
const clearButton = document.querySelector("#clearSearch");
const emptyState = document.querySelector("#emptyState");
let selectedCategory = "全部";

function createCard(dish) {
  const card = document.createElement("article");
  card.className = "menu-card";
  card.innerHTML = `<div class="dish-art" style="--dish-bg:${dish.bg}"><span aria-hidden="true">${dish.emoji}</span><span class="dish-category">${dish.category}</span></div><div class="dish-info"><div class="dish-title"><h3></h3><span class="dish-price"></span></div><p class="dish-desc"></p><div class="dish-tags"></div></div>`;
  card.querySelector("h3").textContent = dish.name;
  card.querySelector(".dish-price").textContent = `¥${dish.price}`;
  card.querySelector(".dish-desc").textContent = dish.description;
  card.querySelector(".dish-tags").replaceChildren(...dish.tags.map((tag) => {
    const chip = document.createElement("span");
    chip.textContent = tag;
    return chip;
  }));
  return card;
}

function renderMenu() {
  const term = searchInput.value.trim().toLocaleLowerCase();
  const filtered = dishes.filter((dish) => {
    const matchesCategory = selectedCategory === "全部" || dish.category === selectedCategory;
    const text = `${dish.name} ${dish.category} ${dish.description} ${dish.tags.join(" ")} ${dish.keywords}`.toLocaleLowerCase();
    return matchesCategory && (!term || text.includes(term));
  });
  grid.replaceChildren(...filtered.map(createCard));
  countLabel.textContent = `找到 ${filtered.length} 道菜`;
  emptyState.hidden = filtered.length !== 0;
  grid.hidden = filtered.length === 0;
  clearButton.hidden = !term;
  document.querySelectorAll(".filter-chip").forEach((button) => {
    const active = button.dataset.category === selectedCategory;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

searchInput.addEventListener("input", renderMenu);
document.querySelector("#filters").addEventListener("click", (event) => {
  const button = event.target.closest(".filter-chip");
  if (!button) return;
  selectedCategory = button.dataset.category;
  renderMenu();
});
clearButton.addEventListener("click", () => { searchInput.value = ""; searchInput.focus(); renderMenu(); });
document.querySelector("#resetSearch").addEventListener("click", () => {
  searchInput.value = "";
  selectedCategory = "全部";
  renderMenu();
  searchInput.focus();
});
document.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    searchInput.focus();
  }
  if (event.key === "Escape" && document.activeElement === searchInput) {
    searchInput.value = "";
    renderMenu();
  }
});

renderMenu();
