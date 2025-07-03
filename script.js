const SUPABASE_URL = "https://ghgnpbunnjzuopcxocqa.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdoZ25wYnVubmp6dW9wY3hvY3FhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0MzA2MjIsImV4cCI6MjA2NzAwNjYyMn0.dgaTQXunx3__argTQar8qMpX6dQlqC7LZGlcdloz8NY";
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

function logout() {
  localStorage.removeItem("wakakusa_logged_in");
  location.href = "login.html";
}

async function renderThreads() {
  const { data, error } = await supabase.from("threads").select("*").order("created_at", { ascending: false });
  const list = document.getElementById("threadList");
  if (error) {
    list.innerText = "スレッドの取得に失敗しました";
    console.error(error);
    return;
  }
  if (!data || data.length === 0) {
    list.innerText = "スレッドはまだありません。";
    return;
  }
  list.innerHTML = data.map((t, i) => \`
    <div><a href="thread.html?id=\${t.id}">\${i+1}: \${t.content?.slice(0, 30) || ""}...</a></div>
  \`).join("");
}

renderThreads();
