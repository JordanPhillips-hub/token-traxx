import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { PageLinkItem } from "./types";
import { useAppSelector, useAppDispatch } from "@/app/store/hooks";
import { setCoinSummaryId } from "@/app/store/features/pageLinkSlice";
import FormInput from "@/app/components/Form/FormInput";
import Icon from "@/app/components/UI/Icon";
import PageLink from "@/app/components/UI/Links/PageLink";
import Dropdown from "@/app/components/UI/Dropdown/Dropdown";

export default function SearchBar() {
  const dispatch = useAppDispatch();
  const [searchInput, setSearchInput] = useState<string>("");
  const { coins } = useAppSelector((state) => state.coinMarkets);
  const { coinSummaryId } = useAppSelector((state) => state.activeLink);

  function handleSearch({ target: { value } }: ChangeEvent<HTMLInputElement>) {
    setSearchInput(value.toLowerCase());
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  function renderPageLink(item: PageLinkItem) {
    return (
      <PageLink href="./pages/CoinSummary" id={item.id}>
        {searchInput && item.name.toLowerCase().includes(searchInput)
          ? item.name
          : ""}
      </PageLink>
    );
  }

  useEffect(() => {
    setSearchInput("");
  }, [coinSummaryId]);

  return (
    <form className=" relative gap-4" onSubmit={handleSubmit} action="">
      <div className="relative flex items-center">
        <Icon className="text-xl absolute ml-2.5" iconVariant="search" />
        <FormInput
          className="dark:bg-blue800 py-3 pl-10 pr-4"
          label="Search"
          id="search"
          type="text"
          name="search"
          value={searchInput}
          onChange={handleSearch}
          placeholder="Search..."
        />
      </div>

      <Dropdown
        itemClass="bg-transparent w-full justify-center hover:bg-transparent"
        isOpen={searchInput !== ""}
        items={coins}
        renderItem={(item) => renderPageLink(item)}
        onItemClick={(id) => dispatch(setCoinSummaryId(id))}
      />
    </form>
  );
}
