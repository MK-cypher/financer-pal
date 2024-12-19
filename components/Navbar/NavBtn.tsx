export default function NavBtn({navState}: {navState: any}) {
  return (
    <>
      <div
        className={`${
          navState ? "rotate-45 translate-y-[8px]" : ""
        } w-5 h-[1px] bg-foreground transition-all duration-300`}
      ></div>
      <div className={`${navState ? "hidden" : ""} w-5 h-[1px] bg-foreground transition-all duration-300`}></div>
      <div
        className={`${
          navState ? "-rotate-45 translate-y-[1.5px]" : ""
        } w-5 h-[1px] bg-foreground transition-all duration-300`}
      ></div>
    </>
  );
}
