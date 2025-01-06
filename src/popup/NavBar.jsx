function NavBar({ startBot, stopBot, loading }) {
  return (
    <nav style={{ display: "flex", gap: "10px" }}>
      <button
        onClick={startBot}
        disabled={loading}
        style={{ marginBottom: "10px", flexGrow: 1 }}
      >
        {loading ? "Processing..." : "Start bot"}
      </button>
      <button onClick={stopBot} style={{ marginBottom: "10px", flexGrow: 1 }}>
        Stop bot
      </button>
    </nav>
  );
}

export default NavBar;
