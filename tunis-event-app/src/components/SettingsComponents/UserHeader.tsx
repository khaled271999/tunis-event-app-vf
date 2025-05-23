import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronRight } from "lucide-react";

export const UserHeader = ({ onClick }: { onClick: () => void }) => (
  <div
    className="flex items-center justify-between p-4 rounded-2xl bg-white/70 backdrop-blur-md shadow"
    onClick={onClick}
  >
    <div className="flex items-center space-x-4">
      <Avatar className="w-12 h-12">
        <AvatarImage src="https://i.pravatar.cc/300" alt="User" />
        <AvatarFallback>RA</AvatarFallback>
      </Avatar>
      <div>
        <div className="font-semibold text-black">Khaled khamassi</div>
        <div className="text-sm text-gray-500">khammassi59@gmail.com</div>
      </div>
    </div>
    <ChevronRight className="text-gray-500" size={20} />
  </div>
);
