import cn from '../utils/cn';

function TitleBar() {
  return (
    <div
      className={cn(
        'bg-base-100 relative flex h-12 w-full items-center justify-between px-4',
        'before:webkit-draggable before:absolute before:inset-0 before:size-full before:content-[""]'
      )}
    >
      <div />
      <nav className="z-10 flex items-center gap-2">
        <div className="flex">
          <button className="btn btn-xs">Ileri</button>
          <button className="btn btn-xs">Geri</button>
        </div>
        {/* <input className="input input-sm input-bordered min-w-sm w-full" /> */}
        <button className="btn btn-xs">Ara</button>
      </nav>
      <span>Avatar</span>
    </div>
  );
}

export default TitleBar;
