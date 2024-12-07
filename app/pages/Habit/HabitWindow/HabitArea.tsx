import MultiSelectChip from "./MultiSelectChip";

export default function HabitWindowArea({
  onChange,
}: {
  onChange: (selectedItem: any) => void;
}) {
  function getSelectedItem(selectedItem: any) {
    onChange(selectedItem);
  }

  return (
    <div className="flex flex-col gap-2 mt-10 px-3">
      <span className="font-semibold text-[17px]">Area</span>
      <MultiSelectChip onChange={getSelectedItem} />
    </div>
  );
}
