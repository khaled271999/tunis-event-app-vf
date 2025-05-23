import { ChevronRight } from "lucide-react";

export const SettingsItem = ({
  label,
  value,
  onClick,
  danger = false,
}: {
  label: string;
  value?: string;
  onClick?: () => void;
  danger?: boolean;
}) => (
  <div
    className={`flex justify-between items-center p-4 ${
      danger ? "text-red-500" : "text-gray-800"
    } hover:bg-gray-100 rounded-xl cursor-pointer`}
    onClick={onClick}
  >
    <span className="font-medium">{label}</span>
    <div className="flex items-center space-x-2">
      {value && <span className="text-sm text-gray-500 truncate">{value}</span>}
      <ChevronRight size={18} />
    </div>
  </div>
);
