import { SettingsItem } from "./SettingsItem";

interface Props {
  items: {
    label: string;
    value?: string;
    onClick?: () => void;
    danger?: boolean;
  }[];
}

export const SettingsSection = ({ items }: Props) => (
  <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow divide-y divide-gray-200">
    {items.map((item, idx) => (
      <SettingsItem key={idx} {...item} />
    ))}
  </div>
);
