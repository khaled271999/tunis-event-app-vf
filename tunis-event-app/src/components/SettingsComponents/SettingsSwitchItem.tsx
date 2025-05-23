import { Switch } from "@/components/ui/switch";

export const SettingsSwitchItem = ({
  label,
  value,
  onChange,
  danger,
}: {
  label: string;
  value: boolean;
  onChange: (val: boolean) => void;
  danger?: boolean;
}) => (
  <div className="flex justify-between items-center p-4 rounded-xl hover:bg-gray-100 transition">
    <div className="flex flex-col">
      <span
        className={`font-medium ${
          !value && danger ? "text-red-500" : "text-gray-800"
        }`}
      >
        {label}
      </span>
      <span className="text-xs text-gray-500">
        {value ? "Activé" : "Désactivé"}
      </span>
    </div>
    <Switch checked={value} onCheckedChange={onChange} />
  </div>
);
