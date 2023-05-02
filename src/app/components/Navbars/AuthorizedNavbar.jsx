"use client";
import Image from "next/image";
import Link from "next/link";

export default function AuthorizedNavbar() {
  return (
    <>
      <nav className="navBar">
        <div className="logoContainer">
          <Link href="/">
            <Image
              src="/images/niam_logo.svg"
              alt="Picture of the author"
              width={150}
              height={37.19}
            />
          </Link>
        </div>
        <div className="menuContainer">
          {loggedIn ? (
            <>
              <h3>{authState.userDetails?.firstName}</h3>
              <button className="navLink" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <Link href="/home" className="navLink">
              Login
            </Link>
          )}
        </div>
      </nav>
    </>
  );
}
