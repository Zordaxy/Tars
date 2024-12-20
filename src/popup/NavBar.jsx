function NavBar({ setStarted, setIsModalOpen, loading }) {
  return (
    <nav style={{ display: "flex", gap: "10px" }}>
      <button
        onClick={() => setStarted(true)}
        disabled={loading}
        style={{ marginBottom: "10px", flexGrow: 1 }}
      >
        {loading ? "Processing..." : "Start bot"}
      </button>
      <button
        onClick={() => setIsModalOpen(true)}
        style={{ marginBottom: "10px", flexGrow: 1 }}
      >
        Set profile
      </button>
      <button
        onClick={() => setStarted(false)}
        style={{ marginBottom: "10px", flexGrow: 1 }}
      >
        Stop bot
      </button>
    </nav>
  );
}

export default NavBar;
