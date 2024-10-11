const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-t-4 border-transparent border-t-slate-700 animate-spin"></div>
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-b-4 border-slate-700"></div>
      </div>
    </div>
  );
};

export default Loader;
