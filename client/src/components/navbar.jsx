"use client";
import {
  Navbar,
  NavbarItem,
  NavbarBrand,
  NavbarContent,
} from "@nextui-org/navbar";
import {
  Avatar,
  Button,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import axios from "axios";
import { useSession } from "../hooks/use-session";
import { useNavigate } from "react-router-dom";

export default function Nav() {
  const navigate = useNavigate();
  const { session, clearSession } = useSession();
  async function handleLogout() {
    const res = await axios.delete(`${import.meta.env.VITE_SEVER_URL}/api/auth/logout`, {
      withCredentials: true,
    });
    if (res.status === 200) {
      clearSession();
      return navigate("/");
    }
    return null;
  }
  return (
    <Navbar className="w-full h-20" isBordered={true}>
      <NavbarBrand>
        <img src={"/logo.png"} width={80} height={80} />
      </NavbarBrand>
      <NavbarContent className={"flex gap-x-10"}>
        <NavbarItem className="font-semibold text-lg">
          Express Auth Example
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify={"end"}>
        <Dropdown placement={"bottom"} className={"bg-inherit"}>
          <DropdownTrigger>
            <Avatar
              isBordered={true}
              as="button"
              className={"transition-transform"}
              color={"primary"}
              name={"user"}
              size={"md"}
              src={session.user.image || "https://i.pravatar.cc/"}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="menu">
            <DropdownItem className={"text-white"}>{session?.user?.name}</DropdownItem>
            <DropdownItem className={"text-white"}>Profile</DropdownItem>
            <DropdownItem className={"text-white"}>Settings</DropdownItem>
            <DropdownItem variant={"light"}>
              <Divider />
              <Button
                className={"w-full" + "" + ""}
                type={"button"}
                size="sm"
                color={"danger"}
                onClick={handleLogout}
              >
                Sign Out
              </Button>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
