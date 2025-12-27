import UserButton from "@/components/auth/UserButton";

export default function Navbar() {
  return (
    <header className="absolute top-0 w-screen flex justify-between items-center p-2  bg-indigo-400/40 rounded-b-sm shadow-md px-24">
      <h1 className="font-sans text-purple-800 font-medium tracking-widest text-2xl cursor-pointer">
        Zalora
      </h1>
      <nav className="w-[15%] ">
        <ul className="w-full h-full flex gap-8 text-white items-center ">
          <li>Home</li>
          <li>Account</li>
          <UserButton />
        </ul>
      </nav>
    </header>
  );
}
