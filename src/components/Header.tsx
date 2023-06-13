import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <div>
      <Link title="Home" href="/">
        Home
      </Link>
      <Link title="Settings" href="/settings">
        Settings
      </Link>
    </div>
  );
}
