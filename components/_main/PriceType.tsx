export default function PriceType({type, setType}: {type: any; setType: any}) {
  return (
    <div className="flex justify-center items-center">
      <div className="flex items-center py-2 px-4 border rounded-lg gap-1 relative">
        <div
          className={`absolute top-1/2 -translate-y-1/2 left-0 bg-secondary rounded-lg p-2 py-3 transition-all duration-300 
            ${type == "monthly" ? "translate-x-4" : "translate-x-[7.3rem]"} w-24 h-12`}
        ></div>
        <button
          className={` px-1.5 py-3 rounded-lg relative w-24`}
          onClick={() => {
            setType("monthly");
          }}
        >
          MONTHLY
        </button>
        <button
          className={`px-1.5 py-3 rounded-lg relative w-24`}
          onClick={() => {
            setType("annual");
          }}
        >
          ANNUAL
        </button>
      </div>
    </div>
  );
}
