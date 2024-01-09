"use client";
import React from "react";
import { pageLinks } from "./data";
import NavInfoDisplay from "./NavInfoDisplay";
import SearchBar from "./SearchBar";
import CurrencyDropdown from "./CurrencyDropdown";
import Logo from "@/app/components/UI/Logo";
import { useAppSelector, useAppDispatch } from "@/app/store/hooks";
import { setActiveLink } from "@/app/store/features/pageLinkSlice";
import ThemeButton from "@/app/components/UI/Buttons/ThemeButton";
import Icon from "@/app/components/UI/Icon";
import PageLink from "@/app/components/UI/Links/PageLink";

export default function NavBar() {
  const dispatch = useAppDispatch();
  const activeLink = useAppSelector((state) => state.activeLink.value);

  function getIconVariant(linkId: string) {
    if (linkId === "coinsLink") {
      return activeLink === "coinsLink" ? "homeSolid" : "homeOutline";
    } else if (linkId === "portfolioLink") {
      return activeLink === "portfolioLink" ? "layerSolid" : "layerOutline";
    }
    return "";
  }

  return (
    <>
      <NavInfoDisplay />
      <nav className="container flex items-center justify-between font-medium mx-auto mb-16">
        <div className="flex gap-20">
          <Logo />

          <ul className="flex gap-6 py-1 px-1  rounded-md">
            {pageLinks.map(({ id, href, text }) => (
              <li key={id}>
                <PageLink
                  id={id}
                  href={href}
                  text={text}
                  onClick={() => dispatch(setActiveLink(id))}
                >
                  <Icon iconVariant={getIconVariant(id)} />
                </PageLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex gap-4">
          <SearchBar />
          <CurrencyDropdown />
          <ThemeButton />
        </div>
      </nav>
    </>
  );
}
