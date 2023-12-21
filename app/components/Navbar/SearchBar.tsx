import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/app/store/hooks";
import { setCoinSummaryId } from "@/app/store/features/pageLinkSlice";
import FormInput from "@/app/components/Form/FormInput";
import Icon from "@/app/components/UI/Icon";
import PageLink from "@/app/components/UI/Links/PageLink";

export default function SearchBar() {
  const dispatch = useAppDispatch();
  const [searchInput, setSearchInput] = useState<string>("");
  const { coins, coinSummaryId } = useAppSelector((state) => ({
    coins: state.coinMarkets.coins,
    coinSummaryId: state.activeLink.coinSummaryId,
  }));

  useEffect(() => {
    setSearchInput("");
  }, [coinSummaryId]);

  function handleSearch({ target: { value } }: ChangeEvent<HTMLInputElement>) {
    setSearchInput(value.toLowerCase());
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <form className=" relative gap-4" onSubmit={handleSubmit} action="">
      <div className="relative flex items-center">
        <Icon className="text-xl absolute ml-2.5" iconVariant="search" />
        <FormInput
          label="Search"
          id="search"
          type="text"
          name="search"
          value={searchInput}
          onChange={handleSearch}
          placeholder="Search..."
        />
      </div>

      <ul className={searchInput !== "" ? "absolute bg-blue800 p-3 w-3/4" : ""}>
        {coins.map(({ id, name }) => (
          <li className="text-sm" key={name}>
            <PageLink
              href="./pages/CoinSummary"
              id={id}
              onClick={() => dispatch(setCoinSummaryId(id))}
            >
              {searchInput && name.toLowerCase().includes(searchInput)
                ? name
                : ""}
            </PageLink>
          </li>
        ))}
      </ul>
    </form>
  );
}
