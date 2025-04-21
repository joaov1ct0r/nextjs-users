import { MenuWrapper } from "@/app/components/menu/menu-wrapper/menu-wrapper";
import { MenuButton } from "@/app/components/menu/menu-button/menu-button";
import { FaAddressCard } from "react-icons/fa";
import { FaNewspaper } from "react-icons/fa";

export function Menu() {
  return (
    <MenuWrapper>
      <MenuButton icon={<FaNewspaper />}>Feed</MenuButton>
      <MenuButton icon={<FaAddressCard />}>About Me </MenuButton>
    </MenuWrapper>
  );
}
