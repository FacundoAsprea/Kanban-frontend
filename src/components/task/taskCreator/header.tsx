import { DrawerClose, DrawerTitle } from "@/components/ui/drawer";
import { RxCross2 } from "react-icons/rx";

export default function TaskCreatorHeader() {
  return (
    <DrawerTitle>
      <header className="w-full flex justify-start">
        <div className="flex gap-1 self-start">
          <DrawerClose asChild>
            <RxCross2
              size="20px"
              color="var(--muted-foreground)"
              cursor="pointer"
            />
          </DrawerClose>
        </div>
        <span className="text-muted-foreground w-full text-center">
          Add a new task
        </span>
      </header>
    </DrawerTitle>
  );
}
