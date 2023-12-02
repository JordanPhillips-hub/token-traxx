"use client";
import NavInfoDisplay from "./NavInfoDisplay";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setActiveLink } from "../../store/features/pageLinkSlice/pageLinkSlice";
import CustomSelect from "../Form/CustomSelect";
import FormInput from "../Form/FormInput";
import PrimaryButton from "../Buttons/PrimaryButton";
import ThemeButton from "../Buttons/ThemeButton";
import Icon from "../Icon/Icon";
import PageLink from "../Links/PageLink/PageLink";
import Logo from "../Logo/Logo";

const pageLinks = [
  { id: "coinsLink", href: "/", text: "Home" },
  { id: "portfolioLink", href: "../pages/Portfolio", text: "Portfolio" },
];

export default function NavBar() {
  const activeLink = useAppSelector((state) => state.activeLink.value);
  const dispatch = useAppDispatch();

  function handleActiveLink(id: string) {
    dispatch(setActiveLink(id));
  }

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
      <nav className="font-medium container mb-4 mx-auto">
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-between mb-14">
            <Logo />
            <ul className="py-1 px-1 w-1/3 text-1xl flex rounded-md">
              {pageLinks.map((link) => (
                <li className="w-1/4" key={link.id}>
                  <PageLink
                    id={link.id}
                    href={link.href}
                    text={link.text}
                    onClick={() => handleActiveLink(link.id)}
                  >
                    <Icon iconVariant={getIconVariant(link.id)} />
                  </PageLink>
                </li>
              ))}
            </ul>
            <form className=" flex gap-4" action="">
              <div className="relative flex items-center">
                <Icon
                  className="text-xl absolute ml-2.5"
                  iconVariant="search"
                />
                <FormInput
                  label="Search"
                  id="search"
                  type="text"
                  name="search"
                  placeholder="Search..."
                />
              </div>
              <CustomSelect iconRight="chevDown" iconLeft="dollar" />
              <ThemeButton />
            </form>
          </div>

          <div>
            <div className="bg-primary800 text-1xl flex w-1/3 py-1 px-1 rounded-md">
              <PrimaryButton size="lrg" text="Coins" />
              <PrimaryButton size="lrg" text="Convertor" />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
