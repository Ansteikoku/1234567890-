const SUPABASE_URL = 'https://ghgnpbunnjzuopcxocqa.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function logout() {
  localStorage.removeItem("wakakusa_logged_in");
  location.href = "login.html";
}

async function loadBoards() {
  const { data, error } = await supabase.from("boards").select("*").order("created_at", { ascending: true });
  const container = document.getElementById("boardTabs");
  if (error || !data) {
    container.textContent = "板の読み込み失敗";
    return;
  }
  container.innerHTML = data.map(b => `<div onclick="location.href='index.html?board=${b.id}'">${b.name}</div>`).join("");
}

async function loadThreads(boardId) {
  const { data, error } = await supabase.from("threads").select("*").eq("board_id", boardId).order("created_at", { ascending: false });
  const list = document.getElementById("threadList");
  if (error || !data) {
    list.textContent = "スレッドの読み込みに失敗";
    return;
  }
  list.innerHTML = data.map((t, i) => \`<div><a href="thread.html?id=\${t.id}">\${i+1}: \${t.content.slice(0, 30)}...</a></div>\`).join("") || "スレッドはまだありません。";
}

const urlParams = new URLSearchParams(location.search);
const boardId = urlParams.get("board");
if (boardId) {
  loadThreads(boardId);
}
loadBoards();
