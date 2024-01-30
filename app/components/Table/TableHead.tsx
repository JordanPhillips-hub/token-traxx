import { Heading } from "@/app/components/UI/Heading";

type TableHeadProps = {
  headers: string[];
};

export default function TableHead({ headers }: TableHeadProps) {
  return (
    <thead className="text-left text-sm text-gray100">
      <tr>
        {headers.map((header) => (
          <th className="pl-3" key={header}>
            <Heading size={4} text={header} />
          </th>
        ))}
      </tr>
    </thead>
  );
}
