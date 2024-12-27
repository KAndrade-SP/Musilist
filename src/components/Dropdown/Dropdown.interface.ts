export interface DropdownProps {
  options: string[]
  defaultLabel: string
  selected: string | null
  onSelect: (option: string) => void
  onClear: () => void
}
