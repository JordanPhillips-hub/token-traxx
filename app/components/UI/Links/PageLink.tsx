import { useRef, useEffect } from "react";
import Link from "next/link";

type PageLinkProps = {
  text?: string;
  href: string;
  id?: string;
  children?: React.ReactNode;
} & React.ComponentProps<"a">;

export default function PageLink({
  text,
  href,
  id,
  children,
  onClick,
}: PageLinkProps) {
  const linkRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const focusLinkId =
      window.location.pathname === "/" ? "coinsLink" : "portfolioLink";
    if (linkRef.current) {
      if (linkRef.current.id === id && linkRef.current.id === focusLinkId) {
        linkRef.current.focus();
      }
    }
  }, [id]);

  return (
    <Link
      id={id}
      ref={linkRef}
      className="text-neutral900 flex gap-2 items-center justify-center outline-none dark:text-whiteOpac900 dark:hover:text-white dark:focus:text-white"
      href={href}
      onClick={onClick}
    >
      {children}
      {text}
    </Link>
  );
}
