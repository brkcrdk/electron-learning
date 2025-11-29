function TitleBar() {
  return (
    <div className="bg-base-100 webkit-draggable relative flex h-12 w-full items-center justify-between px-4">
      <div />
      <nav className="webkit-no-draggable flex items-center gap-2">
        <div className="flex">
          <button className="btn btn-xs">Ileri</button>
          <button className="btn btn-xs">Geri</button>
        </div>

        <button className="btn btn-xs">Ara</button>
      </nav>
      <div className="webkit-no-draggable">avatar area</div>
    </div>
  );
}

export default TitleBar;
