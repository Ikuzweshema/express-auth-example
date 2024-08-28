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
import { useNavigate, redirect } from "react-router-dom";


export default function Nav() {
  const navigate = useNavigate();
  const { session, clearSession } = useSession();
  async function handleLogout() {
    const res = await axios.delete("https://express-auth-example.onrender.com/api/auth/logout", {
      withCredentials: true,
    });
    if (res.status === 200) {
      clearSession();
      return navigate("/");
    }
    return null;
  }
  return (
    <Navbar isBordered={true}>
      <NavbarBrand>
        <img src={"/logo.png"} width={50} height={60} />
      </NavbarBrand>
      <NavbarContent className={"flex gap-x-10"}>
        <NavbarItem></NavbarItem>
        <NavbarItem>Dashboard</NavbarItem>
        <NavbarItem>Products</NavbarItem>
        <NavbarItem>Chart</NavbarItem>
        <NavbarItem>Report</NavbarItem>
      </NavbarContent>
      <NavbarContent justify={"end"}>
        <Dropdown placement={"bottom"} className={"bg-inherit"}>
          <DropdownTrigger>
            <Avatar
              isBordered={true}
              as="button"
              className={"transition-transform"}
              color={"secondary"}
              name={"user"}
              size={"sm"}
              src={"https://i.pravatar.cc/"}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="menu">
            <DropdownItem className={"text-white"}>
              {session.user.username}
            </DropdownItem>
            <DropdownItem className={"text-white"}>Profile</DropdownItem>
            <DropdownItem className={"text-white"}>Settings</DropdownItem>
            <DropdownItem variant={"light"}>
              <Divider />
              <Button
                className={"w-full" + "" + ""}
                type={"button"}
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
