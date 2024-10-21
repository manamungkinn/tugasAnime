const HeaderMenu = ({ title, title2 }) => {
  return (
    <div className="w-full items-center flex justify-center">
      <h1 className="lg:text-xl font-semibold p-4 ">
        {title}
        {title2 ? (
          <>
            <span className="text-main-secondary"> Of </span>
            <span className="lg:text-xl font-semibold">{title2}</span>
          </>
        ) : null}
      </h1>
    </div>
  );
};

export default HeaderMenu;
