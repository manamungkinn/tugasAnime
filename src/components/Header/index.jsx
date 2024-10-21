import Link from "next/link";
const Header = ({ title, linkHref, linkTitle }) => {
  return (
    <div className="p-4 flex justify-between text-center items-center mb-3 rounded-t-sm">
      <a href={linkHref} className="text-base md:text-lg  font-bold">{title}</a>
      {linkHref && linkTitle ? (
        <Link href={linkHref} className="underline hover:text-main-accent text-blue-600 text-sm visited:text-red-800">
          {linkTitle}
        </Link>
      ) : null}
    </div>
  );
};

export default Header;
