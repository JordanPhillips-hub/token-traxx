type DropdownProps<T extends { id: string }> = {
  children?: React.ReactNode;
  isOpen: boolean;
  items: T[];
  onItemClick: (itemId: string) => void;
  renderItem: (item: T) => React.ReactNode;
};

export default function Dropdown<T extends { id: string }>({
  children,
  isOpen,
  renderItem,
  items,
  onItemClick,
}: DropdownProps<T>) {
  return (
    <div className="relative">
      {children}
      <ul
        className={
          isOpen ? "text-sm absolute bg-blue600 mt-3 px-4 rounded" : "hidden"
        }
      >
        {items.map((item) => (
          <li key={item.id}>
            <button onClick={() => onItemClick(item.id)}>
              {renderItem(item)}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
