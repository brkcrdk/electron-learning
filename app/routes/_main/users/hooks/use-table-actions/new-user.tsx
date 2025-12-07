function NewUser() {
  return (
    <div className="drawer drawer-end">
      <input
        id="my-drawer-1"
        type="checkbox"
        className="drawer-toggle"
      />
      <div className="drawer-content">
        <label
          htmlFor="my-drawer-1"
          className="btn drawer-button btn-primary whitespace-nowrap"
        >
          Open drawer
        </label>
      </div>

      <div className="drawer-side">
        <label
          htmlFor="my-drawer-1"
          aria-label="close sidebar"
          className="drawer-overlay"
        />
        <ul className="menu bg-base-200 min-h-full w-80 p-4">
          {/* Sidebar content here */}
          <li>
            <a>Sidebar Item 1</a>
          </li>
          <li>
            <a>Sidebar Item 2</a>
          </li>
          <label
            htmlFor="my-drawer-1"
            className="btn btn-primary"
          >
            Close
          </label>
        </ul>
      </div>
    </div>
  );
}

export default NewUser;
