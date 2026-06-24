/* ==========================================================================
   JavaScript Core Logic - 안먹어도 배달완료 (Fake Delivery App MVP)
   ========================================================================== */

// --- 1. Constants & Dummy Data ---
const STORAGE_KEY = "fakeDeliveryOrders";

const categories = ["전체", "치킨", "피자", "떡볶이", "햄버거", "중식", "야식", "디저트"];

const stores = [
  {
    id: 1,
    name: "바삭한 밤치킨",
    category: "치킨",
    rating: 4.8,
    deliveryTime: "32~45분",
    deliveryFee: 3500,
    description: "오늘 밤 가장 위험한 바삭함",
    emoji: "🍗"
  },
  {
    id: 2,
    name: "한조각 피자연구소",
    category: "피자",
    rating: 4.7,
    deliveryTime: "28~40분",
    deliveryFee: 3000,
    description: "치즈가 마음을 흔드는 곳",
    emoji: "🍕"
  },
  {
    id: 3,
    name: "매콤달콤 분식상회",
    category: "떡볶이",
    rating: 4.9,
    deliveryTime: "20~35분",
    deliveryFee: 2500,
    description: "떡볶이 충동 주의 구역",
    emoji: "🌶️"
  },
  {
    id: 4,
    name: "육즙팡팡 수제버거",
    category: "햄버거",
    rating: 4.6,
    deliveryTime: "25~35분",
    deliveryFee: 3000,
    description: "입 안 가득 퍼지는 소고기 육즙",
    emoji: "🍔"
  },
  {
    id: 5,
    name: "불맛작렬 웍나라",
    category: "중식",
    rating: 4.7,
    deliveryTime: "15~25분",
    deliveryFee: 2000,
    description: "웍질로 다져진 짜장과 짬뽕의 조화",
    emoji: "🥢"
  },
  {
    id: 6,
    name: "심야 포장마차 발걸음",
    category: "야식",
    rating: 4.8,
    deliveryTime: "30~45분",
    deliveryFee: 3500,
    description: "술 한 잔 생각나는 밤, 참아야 하느니라",
    emoji: "🍢"
  },
  {
    id: 7,
    name: "달콤충전 디저트 살롱",
    category: "디저트",
    rating: 4.9,
    deliveryTime: "20~30분",
    deliveryFee: 2000,
    description: "에스프레소 향기와 달콤한 마카롱",
    emoji: "🍰"
  }
];

const menus = [
  {
    storeId: 1,
    name: "레전드 바삭 치킨",
    price: 21000,
    calories: 1800,
    emoji: "🍗",
    description: "참기 어려운 극한의 바삭함"
  },
  {
    storeId: 1,
    name: "양념 폭탄 치킨",
    price: 23000,
    calories: 2100,
    emoji: "🔥",
    description: "달콤매콤한 위험한 선택"
  },
  {
    storeId: 1,
    name: "뿌링뿌링 치즈 치킨",
    price: 24000,
    calories: 2200,
    emoji: "🧀",
    description: "단짠단짠 마법의 치즈 가루"
  },
  {
    storeId: 2,
    name: "치즈 폭탄 더블 피자",
    price: 26000,
    calories: 2400,
    emoji: "🍕",
    description: "자연산 모짜렐라가 아낌없이 폭포처럼"
  },
  {
    storeId: 2,
    name: "페퍼로니 클래식 피자",
    price: 22000,
    calories: 2000,
    emoji: "🌶️",
    description: "짭조름한 페퍼로니의 오리지널 매력"
  },
  {
    storeId: 3,
    name: "눈물 쏙 가래떡 떡볶이",
    price: 14000,
    calories: 1200,
    emoji: "🌶️",
    description: "두툼한 가래떡에 매운 양념이 쏙쏙"
  },
  {
    storeId: 3,
    name: "바삭 모둠 튀김 세트",
    price: 8000,
    calories: 900,
    emoji: "🍤",
    description: "김말이, 오징어, 고구마 튀김의 환상 궁합"
  },
  {
    storeId: 4,
    name: "시그니처 비프 치즈버거",
    price: 9500,
    calories: 850,
    emoji: "🍔",
    description: "두툼한 소고기 패티와 녹아내리는 아메리칸 치즈"
  },
  {
    storeId: 4,
    name: "메가 바삭 감자튀김",
    price: 4500,
    calories: 450,
    emoji: "🍟",
    description: "겉바속촉 짭짤한 케이준 감자튀김"
  },
  {
    storeId: 5,
    name: "직화 삼선 불짜장",
    price: 8500,
    calories: 800,
    emoji: "🍜",
    description: "신선한 해물과 깊은 춘장의 불맛 조화"
  },
  {
    storeId: 5,
    name: "바삭 찹쌀 탕수육",
    price: 18000,
    calories: 1100,
    emoji: "🐖",
    description: "쫄깃하고 바삭하게 튀겨낸 국내산 등심 탕수육"
  },
  {
    storeId: 6,
    name: "매콤 불닭발 & 주먹밥",
    price: 19000,
    calories: 950,
    emoji: "🐓",
    description: "콜라겐 덩어리 뼈없는 닭발과 고소한 김가루 밥"
  },
  {
    storeId: 6,
    name: "얼큰 부산 어묵탕",
    price: 15000,
    calories: 500,
    emoji: "🍢",
    description: "뜨끈하고 깊은 우동 육수에 꼬치어묵 한가득"
  },
  {
    storeId: 7,
    name: "달콤 생딸기 생크림 케이크",
    price: 7500,
    calories: 480,
    emoji: "🍰",
    description: "부드러운 시트 사이에 가득한 신선한 생딸기"
  },
  {
    storeId: 7,
    name: "아이스 카라멜 마끼아또",
    price: 5500,
    calories: 280,
    emoji: "☕",
    description: "진한 에스프레소와 부드러운 우유, 달콤한 카라멜"
  }
];

// --- 2. State Variables ---
let currentView = "home";
let selectedCategory = "전체";
let selectedStore = null;
let cart = [];
let cartStore = null; // Store context of items in cart
let currentOrder = null;
let deliveryInterval = null; // Timer for tracking screen

// --- 3. DOM Elements ---
const contentContainer = document.getElementById("app-content");
const bottomNav = document.getElementById("app-nav");
const navCartBadge = document.getElementById("nav-cart-badge");

// Navigation buttons
const navBtnHome = document.getElementById("nav-btn-home");
const navBtnOrder = document.getElementById("nav-btn-order");
const navBtnCart = document.getElementById("nav-btn-cart");
const navBtnProfile = document.getElementById("nav-btn-profile");

// --- 4. Initialization ---
document.addEventListener("DOMContentLoaded", () => {
  setupNavigationListeners();
  updateCartBadge();
  navigate("home");
});

function setupNavigationListeners() {
  navBtnHome.addEventListener("click", () => navigate("home"));
  navBtnOrder.addEventListener("click", () => navigate("store-list"));
  navBtnCart.addEventListener("click", () => navigate("cart"));
  navBtnProfile.addEventListener("click", () => navigate("profile"));
}

// --- 5. Routing and State Navigation ---
function navigate(viewName, data = null) {
  // Clear any running interval when moving away from delivery tracking
  if (currentView === "delivery-tracking" && deliveryInterval) {
    clearInterval(deliveryInterval);
    deliveryInterval = null;
  }

  currentView = viewName;
  
  // Highlight correct bottom navigation item
  updateActiveNavItem(viewName);

  // Show/Hide bottom navigation bar based on active view
  const viewsWithoutNav = ["order-complete", "delivery-tracking", "review"];
  if (viewsWithoutNav.includes(viewName)) {
    bottomNav.classList.add("hidden");
  } else {
    bottomNav.classList.remove("hidden");
  }

  // Render correct view contents
  switch (viewName) {
    case "home":
      renderHome();
      break;
    case "store-list":
      if (data && typeof data === "string") {
        selectedCategory = data;
      }
      renderStoreList();
      break;
    case "store-detail":
      const storeId = data || (selectedStore ? selectedStore.id : 1);
      selectedStore = stores.find(s => s.id === Number(storeId));
      renderStoreDetail(storeId);
      break;
    case "cart":
      renderCart();
      break;
    case "order-complete":
      renderOrderComplete(data);
      break;
    case "delivery-tracking":
      renderDeliveryTracking(data);
      break;
    case "review":
      renderReview(data);
      break;
    case "history":
      renderHistory();
      break;
    case "profile":
      renderProfile();
      break;
    default:
      renderHome();
  }
}

function updateActiveNavItem(viewName) {
  // Reset active classes
  navBtnHome.classList.remove("active");
  navBtnOrder.classList.remove("active");
  navBtnCart.classList.remove("active");
  navBtnProfile.classList.remove("active");

  if (viewName === "home") {
    navBtnHome.classList.add("active");
  } else if (viewName === "store-list" || viewName === "store-detail") {
    navBtnOrder.classList.add("active");
  } else if (viewName === "cart") {
    navBtnCart.classList.add("active");
  } else if (viewName === "history" || viewName === "profile") {
    navBtnProfile.classList.add("active");
  }
}

// --- 6. Helper Utility Functions ---
function formatPrice(number) {
  return number.toLocaleString("ko-KR") + "원";
}

function formatCalories(number) {
  return number.toLocaleString("ko-KR") + " kcal";
}

function generateFakeOrderId() {
  const now = new Date();
  const dateStr = now.getFullYear() + 
                  String(now.getMonth() + 1).padStart(2, '0') + 
                  String(now.getDate()).padStart(2, '0');
  const randomStr = String(Math.floor(Math.random() * 9000) + 1000);
  return `FAKE-${dateStr}-${randomStr}`;
}

function formatDate(isoString) {
  const date = new Date(isoString);
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const hh = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');
  return `${yyyy}.${mm}.${dd} ${hh}:${min}`;
}

// --- 7. LocalStorage Operations ---
function loadOrders() {
  try {
    const rawData = localStorage.getItem(STORAGE_KEY);
    return rawData ? JSON.parse(rawData) : [];
  } catch (e) {
    console.error("Could not load from localStorage", e);
    return [];
  }
}

function saveOrder(order) {
  try {
    const orders = loadOrders();
    orders.unshift(order); // Store newest orders first
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  } catch (e) {
    console.error("Could not save to localStorage", e);
  }
}

function updateOrderReview(orderId, rating, reviewText) {
  try {
    const orders = loadOrders();
    const orderIndex = orders.findIndex(o => o.id === orderId);
    if (orderIndex !== -1) {
      orders[orderIndex].rating = rating;
      orders[orderIndex].review = reviewText;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
    }
  } catch (e) {
    console.error("Could not update review in localStorage", e);
  }
}

function clearAllHistory() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error("Could not clear localStorage", e);
  }
}

// --- 8. Cart Operations ---
function addToCart(menu) {
  // Prevent mixing items from different stores
  if (cart.length > 0 && cartStore && cartStore.id !== selectedStore.id) {
    const clearConfirm = confirm(
      `장바구니에는 한 번에 하나의 음식점 메뉴만 담을 수 있습니다.\n기존에 담긴 '${cartStore.name}'의 장바구니를 비우고 '${selectedStore.name}'의 메뉴를 새로 담으시겠습니까?`
    );
    if (clearConfirm) {
      cart = [];
      cartStore = selectedStore;
    } else {
      return;
    }
  }

  if (cart.length === 0) {
    cartStore = selectedStore;
  }

  const existingItem = cart.find(item => item.name === menu.name);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      name: menu.name,
      price: menu.price,
      calories: menu.calories,
      quantity: 1
    });
  }

  updateCartBadge();
  renderStoreDetail(selectedStore.id); // Re-render to update detail view cart panel
}

function removeFromCart(menuName) {
  cart = cart.filter(item => item.name !== menuName);
  if (cart.length === 0) {
    cartStore = null;
  }
  updateCartBadge();
  renderCart();
}

function increaseQuantity(menuName) {
  const item = cart.find(i => i.name === menuName);
  if (item) {
    item.quantity += 1;
  }
  updateCartBadge();
  renderCart();
}

function decreaseQuantity(menuName) {
  const item = cart.find(i => i.name === menuName);
  if (item) {
    item.quantity -= 1;
    if (item.quantity <= 0) {
      removeFromCart(menuName);
      return;
    }
  }
  updateCartBadge();
  renderCart();
}

function updateCartBadge() {
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (totalCount > 0) {
    navCartBadge.textContent = totalCount;
    navCartBadge.classList.remove("hidden");
  } else {
    navCartBadge.textContent = "0";
    navCartBadge.classList.add("hidden");
  }
}

function createFakeOrder() {
  if (cart.length === 0) return null;

  const totalFoodPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = cartStore ? cartStore.deliveryFee : 0;
  const totalPrice = totalFoodPrice + deliveryFee;
  const totalCalories = cart.reduce((sum, item) => sum + (item.calories * item.quantity), 0);

  const order = {
    id: generateFakeOrderId(),
    date: new Date().toISOString(),
    storeName: cartStore ? cartStore.name : "알 수 없는 음식점",
    items: [...cart],
    totalPrice: totalPrice,
    totalCalories: totalCalories,
    rating: null,
    review: ""
  };

  saveOrder(order);
  currentOrder = order;

  // Clear cart
  cart = [];
  cartStore = null;
  updateCartBadge();

  return order;
}

// --- 9. Screen Renderers ---

/* 9.1 Home View */
function renderHome() {
  const orders = loadOrders();
  const totalSavedMoney = orders.reduce((sum, o) => sum + o.totalPrice, 0);
  const totalAvoidedCalories = orders.reduce((sum, o) => sum + o.totalCalories, 0);

  contentContainer.innerHTML = `
    <div class="view-container">
      <div class="home-brand">
        <span class="home-logo">🍗</span>
        <h1 class="home-title">안먹어도 배달완료</h1>
        <p class="home-subtitle">오늘도 주문한 척, 지갑과 건강은 지켰다</p>
      </div>

      <div class="home-stats-grid">
        <div class="stat-card savings">
          <span class="stat-icon">💰</span>
          <span class="stat-label">누적 절약 금액</span>
          <span class="stat-value">${formatPrice(totalSavedMoney)}</span>
        </div>
        <div class="stat-card calories">
          <span class="stat-icon">🔥</span>
          <span class="stat-label">참은 칼로리</span>
          <span class="stat-value">${formatCalories(totalAvoidedCalories)}</span>
        </div>
      </div>

      <div class="card welcome-card">
        <div class="welcome-emoji">🧠✨</div>
        <h3>대리만족 시뮬레이터</h3>
        <p>실제 돈을 쓰거나 음식을 먹지 않아도 배달 주문하는 손맛과 배달 알림의 긴장감을 느껴보세요. 먹고 싶은 욕구가 쏙 들어갈 거예요!</p>
      </div>

      <div class="home-actions">
        <button id="btn-start-order" class="btn btn-primary">
          <span>가짜 배달 주문하기</span>
          <span>🚀</span>
        </button>
        <button id="btn-view-history" class="btn btn-secondary">
          <span>내가 참은 기록 보기</span>
          <span>📊</span>
        </button>
      </div>
    </div>
  `;

  // Attach handlers
  document.getElementById("btn-start-order").addEventListener("click", () => navigate("store-list"));
  document.getElementById("btn-view-history").addEventListener("click", () => navigate("history"));
}

/* 9.2 Store / Category List View */
function renderStoreList() {
  // Header HTML
  let headerHtml = `
    <div class="view-header">
      <button class="header-back-btn" id="list-back-btn">⬅️</button>
      <h2>오늘 뭐 안 먹지?</h2>
      <div class="header-placeholder"></div>
    </div>
  `;

  // Filter stores
  const filteredStores = selectedCategory === "전체" 
    ? stores 
    : stores.filter(s => s.category === selectedCategory);

  // Content HTML
  let contentHtml = `
    <div class="view-container">
      <!-- Search placeholder -->
      <div class="search-bar-placeholder">
        <span>🔍</span>
        <span>먹고 싶은 음식을 검색해 보세요... (대리만족용)</span>
      </div>

      <!-- Categories scroll -->
      <div class="category-scroll-container">
        <div class="category-scroll">
          ${categories.map(cat => `
            <button class="category-chip ${selectedCategory === cat ? 'active' : ''}" data-cat="${cat}">
              ${cat}
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Store Cards List -->
      <div class="store-list">
        ${filteredStores.length > 0 ? filteredStores.map(store => `
          <div class="store-card" data-store-id="${store.id}">
            <div class="store-avatar">
              ${store.emoji}
            </div>
            <div class="store-info">
              <div>
                <h3 class="store-name">${store.name}</h3>
                <p class="store-desc">${store.description}</p>
              </div>
              <div class="store-meta">
                <span class="store-rating">⭐ ${store.rating.toFixed(1)}</span>
                <span class="store-divider">|</span>
                <span>배달 ${store.deliveryTime}</span>
                <span class="store-divider">|</span>
                <span>팁 ${formatPrice(store.deliveryFee)}</span>
              </div>
            </div>
          </div>
        `).join('') : `
          <div class="empty-state">
            <div class="empty-emoji">🏜️</div>
            <h4 class="empty-title">음식점이 없습니다</h4>
            <p class="empty-desc">다른 카테고리를 선택해 보세요.</p>
          </div>
        `}
      </div>
    </div>
  `;

  contentContainer.innerHTML = headerHtml + contentHtml;

  // Header Back Button
  document.getElementById("list-back-btn").addEventListener("click", () => navigate("home"));

  // Category chip handlers
  document.querySelectorAll(".category-chip").forEach(chip => {
    chip.addEventListener("click", (e) => {
      const cat = e.target.getAttribute("data-cat");
      selectedCategory = cat;
      renderStoreList();
    });
  });

  // Store card click handlers
  document.querySelectorAll(".store-card").forEach(card => {
    card.addEventListener("click", (e) => {
      const storeId = card.getAttribute("data-store-id");
      navigate("store-detail", storeId);
    });
  });
}

/* 9.3 Store Detail / Menu View */
function renderStoreDetail(storeId) {
  if (!selectedStore) return;

  const storeMenus = menus.filter(m => m.storeId === Number(storeId));

  let headerHtml = `
    <div class="view-header">
      <button class="header-back-btn" id="detail-back-btn">⬅️</button>
      <h2>음식점 상세</h2>
      <div class="header-placeholder"></div>
    </div>
  `;

  let contentHtml = `
    <!-- Store Info Header Card -->
    <div class="store-detail-header">
      <div class="store-detail-emoji">${selectedStore.emoji}</div>
      <h2 class="store-detail-name">${selectedStore.name}</h2>
      <p class="store-detail-desc">${selectedStore.description}</p>
      
      <div class="store-detail-info-grid">
        <div class="info-item">
          <span class="info-label">평점</span>
          <span class="info-value">⭐ ${selectedStore.rating.toFixed(1)}</span>
        </div>
        <div class="info-item">
          <span class="info-label">예상시간</span>
          <span class="info-value">${selectedStore.deliveryTime}</span>
        </div>
        <div class="info-item">
          <span class="info-label">배달팁</span>
          <span class="info-value">${formatPrice(selectedStore.deliveryFee)}</span>
        </div>
      </div>
    </div>

    <div class="view-container" style="padding-top: 0;">
      <h3 class="menu-list-title">대표 메뉴</h3>
      
      <!-- Menus Grid -->
      <div class="menu-list">
        ${storeMenus.map(menu => `
          <div class="menu-card">
            <div class="menu-image-placeholder">${menu.emoji}</div>
            <div class="menu-info">
              <h4 class="menu-name">${menu.name}</h4>
              <p class="menu-desc">${menu.description}</p>
              <div class="menu-price-row">
                <div>
                  <span class="menu-price">${formatPrice(menu.price)}</span>
                  <span class="menu-calories">${formatCalories(menu.calories)}</span>
                </div>
                <button class="btn-add-cart" data-menu-name="${menu.name}">담는 척 하기</button>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  // Floating Cart Bar if cart is not empty and matches current store
  let floatingCartHtml = "";
  const cartQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (cartQuantity > 0 && cartStore && cartStore.id === selectedStore.id) {
    floatingCartHtml = `
      <div class="floating-cart-bar" id="floating-cart-btn">
        <div class="cart-bar-left">
          <span class="cart-bar-count">${cartQuantity}</span>
          <span class="cart-bar-label">장바구니 담는 척 완료</span>
        </div>
        <div class="cart-bar-right">
          <span>${formatPrice(cartTotalPrice)} 보기</span>
          <span>➡️</span>
        </div>
      </div>
    `;
  }

  contentContainer.innerHTML = headerHtml + contentHtml + floatingCartHtml;

  // Listeners
  document.getElementById("detail-back-btn").addEventListener("click", () => navigate("store-list"));

  // Add cart buttons
  document.querySelectorAll(".btn-add-cart").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const menuName = btn.getAttribute("data-menu-name");
      const menuObj = storeMenus.find(m => m.name === menuName);
      if (menuObj) addToCart(menuObj);
    });
  });

  // Floating Cart Click
  const floatCartBtn = document.getElementById("floating-cart-btn");
  if (floatCartBtn) {
    floatCartBtn.addEventListener("click", () => navigate("cart"));
  }
}

/* 9.4 Cart View */
function renderCart() {
  const headerHtml = `
    <div class="view-header">
      <button class="header-back-btn" id="cart-back-btn">⬅️</button>
      <h2>장바구니 (시뮬레이터)</h2>
      <div class="header-placeholder"></div>
    </div>
  `;

  if (cart.length === 0) {
    contentContainer.innerHTML = headerHtml + `
      <div class="view-container">
        <div class="empty-state" style="margin-top: 40px;">
          <div class="empty-emoji">🛒</div>
          <h4 class="empty-title">장바구니가 비어 있습니다</h4>
          <p class="empty-desc" style="margin-bottom: 24px;">돈과 칼로리를 절약할 메뉴를 담아 가짜 주문을 진행해보세요!</p>
          <button id="btn-cart-empty-go" class="btn btn-primary">음식점 둘러보기</button>
        </div>
      </div>
    `;
    document.getElementById("btn-cart-empty-go").addEventListener("click", () => navigate("store-list"));
    document.getElementById("cart-back-btn").addEventListener("click", () => {
      if (selectedStore) {
        navigate("store-detail", selectedStore.id);
      } else {
        navigate("store-list");
      }
    });
    return;
  }

  // Calculate prices
  const totalFoodPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = cartStore ? cartStore.deliveryFee : 0;
  const totalPrice = totalFoodPrice + deliveryFee;
  const totalCalories = cart.reduce((sum, item) => sum + (item.calories * item.quantity), 0);

  let contentHtml = `
    <div class="view-container">
      <div class="cart-store-header">
        <span>🏪</span>
        <span>${cartStore ? cartStore.name : "가짜 음식점"}</span>
      </div>

      <!-- Item Cards -->
      <div class="cart-items-list">
        ${cart.map(item => `
          <div class="cart-item-card">
            <div class="cart-item-details">
              <h4 class="cart-item-name">${item.name}</h4>
              <div class="cart-item-price-info">
                <span>${formatPrice(item.price)}</span>
                <span class="cart-item-cal">(${formatCalories(item.calories)})</span>
              </div>
            </div>
            <div class="cart-item-actions">
              <div class="qty-controls">
                <button class="qty-btn qty-minus" data-name="${item.name}">-</button>
                <span class="qty-num">${item.quantity}</span>
                <button class="qty-btn qty-plus" data-name="${item.name}">+</button>
              </div>
              <button class="btn-item-delete" data-name="${item.name}">🗑️</button>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Price Breakdown -->
      <div class="price-summary-card">
        <div class="price-row">
          <span>음식 주문 금액</span>
          <span>${formatPrice(totalFoodPrice)}</span>
        </div>
        <div class="price-row">
          <span>가짜 배달팁</span>
          <span>${formatPrice(deliveryFee)}</span>
        </div>
        <div class="price-row">
          <span>피할 예정인 총 칼로리</span>
          <span class="calories-highlight">-${formatCalories(totalCalories)}</span>
        </div>
        <div class="price-row total">
          <span>총 절약 예정 금액</span>
          <span class="savings-highlight">${formatPrice(totalPrice)}</span>
        </div>
      </div>

      <!-- Warning card -->
      <div class="warning-card">
        <span class="warning-icon">⚠️</span>
        <div class="warning-text">
          실제 결제 및 음식 배달은 진행되지 않습니다. 이 주문은 소비와 음식물 섭취 충동을 잠재우기 위한 대리만족용 시뮬레이션입니다.
        </div>
      </div>

      <button id="btn-submit-fake-order" class="btn btn-primary">
        <span>주문한 척 하기 (${formatPrice(totalPrice)} 절약)</span>
      </button>
    </div>
  `;

  contentContainer.innerHTML = headerHtml + contentHtml;

  // Listeners
  document.getElementById("cart-back-btn").addEventListener("click", () => {
    if (selectedStore) {
      navigate("store-detail", selectedStore.id);
    } else {
      navigate("store-list");
    }
  });

  // Quantity controllers
  document.querySelectorAll(".qty-minus").forEach(btn => {
    btn.addEventListener("click", () => {
      decreaseQuantity(btn.getAttribute("data-name"));
    });
  });

  document.querySelectorAll(".qty-plus").forEach(btn => {
    btn.addEventListener("click", () => {
      increaseQuantity(btn.getAttribute("data-name"));
    });
  });

  document.querySelectorAll(".btn-item-delete").forEach(btn => {
    btn.addEventListener("click", () => {
      removeFromCart(btn.getAttribute("data-name"));
    });
  });

  // Order submission
  document.getElementById("btn-submit-fake-order").addEventListener("click", () => {
    const order = createFakeOrder();
    if (order) {
      navigate("order-complete", order);
    }
  });
}

/* 9.5 Order Complete View */
function renderOrderComplete(order) {
  if (!order) return;

  contentContainer.innerHTML = `
    <div class="view-container">
      <div class="complete-content">
        <div class="complete-icon-wrapper">🎉</div>
        <h2 class="complete-title">주문한 척 완료!</h2>
        <p class="complete-subtitle">방금 당신은 가상 세계의 맛있는 음식을 구매하며, 지갑과 위장을 동시에 멋지게 지켜냈습니다!</p>
        
        <div class="order-badge-card">
          <div class="order-number-label">가짜 주문번호</div>
          <div class="order-number">${order.id}</div>
        </div>

        <div class="complete-stats-box">
          <div class="complete-stat-row">
            <span>방금 지켜낸 소중한 돈</span>
            <span class="savings-highlight">+ ${formatPrice(order.totalPrice)}</span>
          </div>
          <div class="complete-stat-row">
            <span>방금 참아낸 칼로리</span>
            <span class="calories-highlight">- ${formatCalories(order.totalCalories)}</span>
          </div>
        </div>

        <button id="btn-track-delivery" class="btn btn-primary">
          <span>가짜 배달 추적하기</span>
          <span>🛵</span>
        </button>
      </div>
    </div>
  `;

  document.getElementById("btn-track-delivery").addEventListener("click", () => {
    navigate("delivery-tracking", order);
  });
}

/* 9.6 Delivery Tracking View */
function renderDeliveryTracking(order) {
  if (!order) return;

  const trackingSteps = [
    { title: "주문 확인 중인 척...", desc: "가게에서 주문 확인 버튼을 누를까 말까 고민하는 중", emoji: "📝" },
    { title: "사장님이 조리하는 척...", desc: "냄비에서 맛있는 불맛 향기가 모락모락 피어나는 중", emoji: "🍳" },
    { title: "라이더가 픽업한 척...", desc: "라이더가 헬멧을 고쳐 쓰고 속도를 올리기 시작하는 중", emoji: "🛵" },
    { title: "집 앞에 도착한 척...", desc: "마음속 벨소리가 울리며 문 앞 복도에서 사뿐사뿐 걷는 중", emoji: "🚪" },
    { title: "배달 완료! 하지만 먹지는 않았습니다.", desc: "돈도 지키고 건강도 지킨 완벽한 해피엔딩!", emoji: "🎉" }
  ];

  const riderMessages = [
    "가게에서 주문 내역을 확인하고 있습니다. (두근두근)",
    "사장님이 주방에서 웍을 휘두르며 상상 속 불맛을 입히고 계십니다!",
    "라이더가 시뮬레이션 도로를 타고 가상 가속 중입니다. 거의 다 왔어요!",
    "고객님, 마음속 문 앞에 가상 배달이 도착했습니다. 노크 똑똑!",
    "배달이 안전하게 완료되었습니다! 아낀 칼로리와 지갑 잔고를 보며 칭찬해주세요."
  ];

  let stepIndex = 0;

  function updateTrackingUI() {
    const isCompleted = stepIndex >= trackingSteps.length - 1;
    
    // HTML Builder
    contentContainer.innerHTML = `
      <div class="view-container">
        <div class="tracking-header-info">
          <h2 class="tracking-store-name">${order.storeName}</h2>
          <span class="tracking-number-text">주문번호: ${order.id}</span>
        </div>

        <!-- Visual Simulator -->
        <div class="tracking-simulator">
          <div class="simulator-clouds">⛅ ☁️ ⛅</div>
          <div class="simulator-road"></div>
          <div class="simulator-home">🏠</div>
          <div class="simulator-rider" id="tracking-rider-icon">🛵</div>
        </div>

        <!-- Rider message bubble -->
        <div class="rider-bubble">
          <span class="rider-avatar">🧑‍✈️</span>
          <div class="rider-message-details">
            <div class="rider-name">상상속 라이더</div>
            <div class="rider-msg" id="tracking-rider-msg"></div>
          </div>
        </div>

        <!-- Vertical steps -->
        <div class="tracking-steps">
          ${trackingSteps.map((step, idx) => {
            let statusClass = "";
            if (idx < stepIndex) statusClass = "completed";
            else if (idx === stepIndex) statusClass = "active";

            return `
              <div class="tracking-step ${statusClass}">
                <div class="step-marker">${idx < stepIndex ? '✓' : idx + 1}</div>
                <div class="step-content">
                  <span class="step-title">${step.title}</span>
                  <span class="step-desc">${step.desc}</span>
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <!-- Bottom Action CTA -->
        <div id="tracking-cta-container">
          <div class="card" style="text-align:center; padding:12px; margin-bottom:12px; font-size:12px; color:var(--text-secondary);">
            배달 진행을 모니터링하며 대리만족을 채워보세요. (${stepIndex + 1}/${trackingSteps.length} 단계)
          </div>
        </div>
      </div>
    `;

    // Animate rider position
    const rider = document.getElementById("tracking-rider-icon");
    if (rider) {
      // Scale rider position linearly: index 0 (10%) to index 4 (78%)
      const leftPos = 10 + (stepIndex * 17);
      rider.style.left = `${leftPos}%`;
      // Set delivery completion emoji change
      if (isCompleted) {
        rider.textContent = "🎁";
      }
    }

    // Set message text
    const msgEl = document.getElementById("tracking-rider-msg");
    if (msgEl) {
      msgEl.textContent = riderMessages[stepIndex];
    }

    // Show button at final step
    if (isCompleted) {
      const ctaContainer = document.getElementById("tracking-cta-container");
      if (ctaContainer) {
        ctaContainer.innerHTML = `
          <button id="btn-go-to-review" class="btn btn-primary" style="margin-top:12px;">
            <span>성취감 후기 남기러 가기</span>
            <span>✍️</span>
          </button>
        `;
        document.getElementById("btn-go-to-review").addEventListener("click", () => {
          navigate("review", order);
        });
      }
    }
  }

  // Initial render
  updateTrackingUI();

  // Step ticking loop
  deliveryInterval = setInterval(() => {
    if (stepIndex < trackingSteps.length - 1) {
      stepIndex++;
      updateTrackingUI();
    } else {
      clearInterval(deliveryInterval);
      deliveryInterval = null;
    }
  }, 2500); // 2.5 seconds state interval
}

/* 9.7 Review Screen */
function renderReview(order) {
  if (!order) return;

  const reviewTemplates = [
    "생각보다 참을 만했어요. 😌",
    "주문한 기분은 났는데 돈은 안 썼어요. 💸",
    "내일의 나에게 칭찬받을 선택이었습니다. 👍"
  ];

  let selectedStars = 5;

  function updateStarsUI() {
    const starContainer = document.getElementById("star-selector-container");
    if (starContainer) {
      starContainer.innerHTML = Array.from({ length: 5 }, (_, idx) => {
        const starNum = idx + 1;
        const isSelected = starNum <= selectedStars;
        return `
          <button class="star-btn ${isSelected ? 'selected' : ''}" data-star="${starNum}">
            ${isSelected ? '★' : '☆'}
          </button>
        `;
      }).join('');

      // Add event listeners to newly built star buttons
      document.querySelectorAll(".star-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          selectedStars = Number(btn.getAttribute("data-star"));
          updateStarsUI();
        });
      });
    }
  }

  contentContainer.innerHTML = `
    <div class="view-container">
      <div class="review-intro">
        <div class="review-intro-emoji">🎯</div>
        <h3>대리만족은 어떠셨나요?</h3>
        <p>실제 주문하지 않고 꾹 참은 나에게 소중한 만족감 평가와 셀프 후기를 선물해주세요.</p>
      </div>

      <!-- Stars Widget -->
      <div class="star-rating-container" id="star-selector-container"></div>

      <!-- Quick Template buttons -->
      <div class="review-templates-title">추천 후기</div>
      <div class="review-templates">
        ${reviewTemplates.map(tmpl => `
          <button class="template-btn" data-text="${tmpl}">${tmpl}</button>
        `).join('')}
      </div>

      <!-- Custom comment textarea -->
      <div class="review-textarea-wrapper">
        <label for="review-custom-text">느낀 점 적어보기</label>
        <textarea id="review-custom-text" class="review-textarea" placeholder="돈을 아끼고 나니 뿌듯한 마음이 어떤지 적어보세요..."></textarea>
      </div>

      <button id="btn-save-review" class="btn btn-primary">
        <span>후기 저장하고 완료하기</span>
        <span>✔️</span>
      </button>
    </div>
  `;

  // Init stars
  updateStarsUI();

  // Template listeners
  const textInput = document.getElementById("review-custom-text");
  document.querySelectorAll(".template-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      textInput.value = btn.getAttribute("data-text");
    });
  });

  // Save reviewer
  document.getElementById("btn-save-review").addEventListener("click", () => {
    const rating = selectedStars;
    const comment = textInput.value.trim() || "오늘도 지혜로운 선택으로 머니 세이빙에 성공했습니다!";
    updateOrderReview(order.id, rating, comment);
    navigate("profile");
  });
}

/* 9.8 History View (Compatibility Redirect) */
function renderHistory() {
  renderProfile();
}

/* 9.9 Profile View */
function renderProfile() {
  const orders = loadOrders();

  const totalSavedMoney = orders.reduce((sum, o) => sum + o.totalPrice, 0);
  const totalAvoidedCalories = orders.reduce((sum, o) => sum + o.totalCalories, 0);
  const totalCount = orders.length;

  // Set avatar & tier badge dynamically
  let tier = "초보 참기러";
  let avatar = "🐣";
  if (totalCount >= 10) {
    tier = "참기 마스터 신";
    avatar = "👑";
  } else if (totalCount >= 5) {
    tier = "참기 고수";
    avatar = "🥋";
  } else if (totalCount >= 2) {
    tier = "참기 중급자";
    avatar = "🦊";
  }

  // Styled mock coupons
  const mockCoupons = [
    { name: "[상상쿠폰] 치킨 냄새 방어 할인권", val: "5,000원", badge: "보유중" },
    { name: "[다이어트] 야식 단식 격려 쿠폰", val: "3,000원", badge: "보유중" },
    { name: "[지갑수호] 무지성 참기 응원권", val: "10,000원", badge: "시뮬레이션 전용" }
  ];

  contentContainer.innerHTML = `
    <!-- Header -->
    <div class="view-header">
      <button class="header-back-btn" id="profile-back-btn">⬅️</button>
      <h2>내 정보</h2>
      <div class="header-placeholder"></div>
    </div>

    <div class="view-container">
      <!-- User profile header card -->
      <div class="profile-header-card">
        <div class="profile-avatar-large">${avatar}</div>
        <div class="profile-meta-info">
          <h3 class="profile-nickname">프로참러 다이어터</h3>
          <span class="profile-tier-badge">${tier} (성공 ${totalCount}회)</span>
        </div>
      </div>

      <!-- Virtual Card -->
      <h3 class="profile-section-title">💳 가짜 결제 수단</h3>
      <div class="virtual-card-wrapper">
        <div class="credit-card-container">
          <div class="credit-card-chip"></div>
          <div class="credit-card-type">AIR CARD</div>
          <div class="credit-card-number">**** **** **** 8282</div>
          <div class="credit-card-footer">
            <div class="credit-card-holder">
              <span class="credit-card-label">카드 홀더</span>
              <span class="credit-card-name">IMAGINATION USER</span>
            </div>
            <div class="credit-card-balance">
              <span class="credit-card-label">상상 잔액</span>
              <div class="credit-card-bal-val">무제한</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Coupons -->
      <h3 class="profile-section-title">🎟/보유 쿠폰함</h3>
      <div class="coupons-list">
        ${mockCoupons.map(coupon => `
          <div class="coupon-card">
            <div class="coupon-info">
              <span class="coupon-name">${coupon.name}</span>
              <span class="coupon-value">${coupon.val} 할인</span>
            </div>
            <span class="coupon-badge">${coupon.badge}</span>
          </div>
        `).join('')}
      </div>

      <!-- Cumulative Statistics -->
      <h3 class="profile-section-title">📈 나의 절약 통계</h3>
      <div class="history-summary-box">
        <div class="history-summary-title">누적 절약 현황</div>
        <div class="history-summary-grid">
          <div class="history-sum-item">
            <span class="history-sum-label">아낀 총 예산</span>
            <span class="history-sum-val savings">${formatPrice(totalSavedMoney)}</span>
          </div>
          <div class="history-sum-item">
            <span class="history-sum-label">피한 총 칼로리</span>
            <span class="history-sum-val calories">${formatCalories(totalAvoidedCalories)}</span>
          </div>
        </div>
        <div class="history-sum-bottom">
          <span>대리 주문 성공률</span>
          <span>100% (총 ${totalCount}회)</span>
        </div>
      </div>

      <!-- Order history list -->
      <h3 class="profile-section-title">🕒 주문 히스토리</h3>
      <div class="history-list">
        ${orders.length > 0 ? orders.map(order => `
          <div class="history-card">
            <div class="history-card-header">
              <div>
                <h4 class="history-card-store">${order.storeName}</h4>
                <div class="history-card-date">${formatDate(order.date)}</div>
              </div>
              <div style="font-size:10px; color:var(--text-muted); font-family:monospace;">${order.id}</div>
            </div>

            <div class="history-card-items">
              ${order.items.map(item => `${item.name} x${item.quantity}`).join(', ')}
            </div>

            <div class="history-card-metrics">
              <span class="history-card-metric savings">💰 ${formatPrice(order.totalPrice)} 절약</span>
              <span class="history-card-metric calories">🔥 ${formatCalories(order.totalCalories)} 방어</span>
            </div>

            <!-- Review text if present -->
            ${order.review ? `
              <div class="history-card-review">
                <div class="history-card-stars">
                  ${'★'.repeat(order.rating || 5)}${'☆'.repeat(5 - (order.rating || 5))}
                </div>
                <div class="history-card-review-text">"${order.review}"</div>
              </div>
            ` : `
              <div style="font-size:11px; color:var(--text-muted); font-style:italic;">등록된 성취 후기가 없습니다.</div>
            `}
          </div>
        `).join('') : `
          <div class="empty-state" style="margin-top: 10px; padding: 20px 0;">
            <div class="empty-emoji">📉</div>
            <h4 class="empty-title">주문 기록이 없습니다</h4>
            <p class="empty-desc">주문 욕구가 생길 때 가짜 주문을 진행해보세요!</p>
          </div>
        `}
      </div>

      <!-- Actions -->
      <div class="history-actions" style="margin-top: 24px;">
        <button id="btn-history-go-order" class="btn btn-primary" style="margin-bottom:12px;">
          <span>다시 주문한 척 하기</span>
          <span>🍕</span>
        </button>
        
        ${orders.length > 0 ? `
          <div class="history-reset-container">
            <button id="btn-reset-history" class="btn btn-danger-outline">
              <span>기록 초기화</span>
              <span>🗑️</span>
            </button>
          </div>
        ` : ''}
      </div>
    </div>
  `;

  // Listeners
  document.getElementById("profile-back-btn").addEventListener("click", () => navigate("home"));
  document.getElementById("btn-history-go-order").addEventListener("click", () => navigate("store-list"));

  const resetBtn = document.getElementById("btn-reset-history");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      const resetConfirm = confirm(
        "지금까지 참아온 자랑스러운 절약 통계와 히스토리가 모두 삭제됩니다.\n정말 초기화하시겠습니까?"
      );
      if (resetConfirm) {
        clearAllHistory();
        renderProfile();
      }
    });
  }
}
