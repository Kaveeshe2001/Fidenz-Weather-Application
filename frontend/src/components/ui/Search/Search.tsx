import { RiSearchLine } from "@remixicon/react"

const Search = () => {
  return (
    <form className="flex border border-[rgba(var(--primary-color2-opc),0.15)] p-[10px] rounded-md">
        <div className="flex relative leading-1">
            <input type="text" placeholder="Search city.." className="outline-none" />
            <button className="serach-btn">
                <RiSearchLine size={20} className="text-gray-500" />
            </button>
        </div>
    </form>
  );
};

export default Search;
