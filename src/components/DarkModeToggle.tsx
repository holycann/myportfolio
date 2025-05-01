export const DarkModeToggle = () => {
  return (
    <div className="relative inline-block w-16 h-9 text-[17px] rounded-full shadow-[0_0_10px_rgba(0,0,0,0.1)]">
      <label className="relative block w-full h-full">
        <input
          defaultChecked={true}
          id="checkbox"
          type="checkbox"
          className="peer hidden"
        />
        <span className="absolute inset-0 cursor-pointer rounded-full bg-[#2a2a2a] transition-all duration-400 overflow-hidden peer-checked:bg-[#00a6ff]">
          <div className="absolute w-[5px] h-[5px] bg-white rounded-full top-[0.5em] left-[2.5em] transition-all duration-400 peer-checked:opacity-0" />
          <div className="absolute w-[5px] h-[5px] bg-white rounded-full top-[1.2em] left-[2.2em] transition-all duration-400 peer-checked:opacity-0" />
          <div className="absolute w-[5px] h-[5px] bg-white rounded-full top-[0.9em] left-[3em] transition-all duration-400 peer-checked:opacity-0" />

          <svg
            viewBox="0 0 16 16"
            className="absolute bottom-[-1.4em] left-[-1.1em] w-[3.5em] opacity-0 transition-all duration-400 peer-checked:opacity-100"
          >
            <path
              transform="matrix(.77976 0 0 .78395-299.99-418.63)"
              fill="#fff"
              d="m391.84 540.91c-.421-.329-.949-.524-1.523-.524-1.351 0-2.451 1.084-2.485 2.435-1.395.526-2.388 1.88-2.388 3.466 0 1.874 1.385 3.423 3.182 3.667v.034h12.73v-.006c1.775-.104 3.182-1.584 3.182-3.395 0-1.747-1.309-3.186-2.994-3.379.007-.106.011-.214.011-.322 0-2.707-2.271-4.901-5.072-4.901-2.073 0-3.856 1.202-4.643 2.925"
            />
          </svg>
        </span>
        <span className="absolute bottom-[0.5em] left-[0.5em] h-[1.2em] w-[1.2em] rounded-[20px] transition-all duration-400 ease-[cubic-bezier(0.81,-0.04,0.38,1.5)] shadow-[inset_8px_-4px_0px_0px_#fff] peer-checked:translate-x-[1.8em] peer-checked:shadow-[inset_15px_-4px_0px_15px_#ffcf48]"></span>
      </label>
    </div>
  );
};
