"use client";
import NavInfoDisplay from "./NavInfoDisplay";
import { useAppSelector, useAppDispatch } from "@/app/store/hooks";
import { setActiveLink } from "@/app/store/features/pageLinkSlice";
import CustomSelect from "../Form/CustomSelect";
import FormInput from "../Form/FormInput";
import PrimaryButton from "../UI/Buttons/PrimaryButton";
import ThemeButton from "../UI/Buttons/ThemeButton";
import Icon from "../UI/Icon";
import PageLink from "../UI/Links/PageLink";
import Logo from "../UI/Logo";

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
      <nav className="font-medium container  mx-auto">
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-between mb-14">
            <Logo />
            <ul className="py-1 px-1 w-1/3 text-1xl flex rounded-md">
              <p>test push</p>
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
        </div>
      </nav>
    </>
  );
}
