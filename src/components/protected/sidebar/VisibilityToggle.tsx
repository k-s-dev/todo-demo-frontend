import { useSidebarContext } from "@/lib/store/sidebarContext";
import { Switch } from "@/components/ui/switch";

export default function VisibilityToggle() {
  const sidebarContext = useSidebarContext();

  return (
    <div className="inline-flex gap-2 justify-around">
      <span>Show hidden items</span>
      <Switch
        checked={sidebarContext.state.showHidden}
        onClick={() => {
          sidebarContext.dispatch({ type: "toggleVisibility" });
        }}
      />
    </div>
  );
}
