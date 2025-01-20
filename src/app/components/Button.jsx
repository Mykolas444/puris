const Button = ({ children }) => {
    return (
    <button className="bg-gradient-to-b from-white to-yellow-200 px-5 py-2 rounded-md m-5 shadow-[4px_4px_0_black] active:translate-x-1 active:translate-y-1 active:shadow-[0_0_0_black] transition-all duration-200 text-neutral-900">
        {children}
    </button>
    );
};

export default Button;