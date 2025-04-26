"use client";

import { MenuWrapper } from "@/app/components/menu/menu-wrapper/menu-wrapper";
import { MenuButton } from "@/app/components/menu/menu-button/menu-button";
import { FaAddressCard } from "react-icons/fa";
import { FaNewspaper } from "react-icons/fa";
import { useRouter } from "next/navigation";

export function Menu() {
  const router = useRouter();

  const handleFeedClick = () => {
    router.push("/feed");
  };

  const handleAboutClick = () => {
    router.push("/about");
  };

  return (
    <MenuWrapper>
      <MenuButton icon={<FaNewspaper />} onClick={handleFeedClick}>
        Feed
      </MenuButton>
      <MenuButton icon={<FaAddressCard />} onClick={handleAboutClick}>
        About Me
      </MenuButton>
    </MenuWrapper>
  );
}
