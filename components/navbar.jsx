'use client';
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { useContent } from "../app/contexts/ContentContext";
import { MdOutlineMessage } from "react-icons/md";  
import { Button } from "@heroui/button";
import { Kbd } from "@heroui/kbd";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { IoMdNotifications } from "react-icons/io";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  TwitterIcon,
  GithubIcon,
  DiscordIcon,
  HeartFilledIcon,
  SearchIcon,
  Logo,
} from "@/components/icons";
import { useState, useEffect } from "react";

export const Navbar = () => {

  const { content ,selected, setBlogs, user, setSelected, results,setResults, loading, setLoading, searchTerm, setSearchTerm, setContent } = useContent();
  // console.log("results:::::USER", user);
  const [saveContent, setSaveContent] = useState(content.blogs)
  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      // endContent={
      //   <Kbd className="hidden lg:inline-block" keys={["command"]}>
      //     K
      //   </Kbd>
      // }
      labelPlacement="outside"
      placeholder="Search..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );
  
  useEffect(()=>{
  if(!searchTerm){
    setLoading(false);
      setContent(prevContent => ({
      ...prevContent,
      blogs: saveContent
    }));
  }
  
  },[searchTerm]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        // console.log('searchTerm.length', searchTerm);
        // console.log('prevTerm.length', prevTerm);
        
        fetchSearchResults(searchTerm, selected);
        // setPrevTerm(searchTerm);
        // console.log('prevTerm.length after', prevTerm);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, selected]);

  const fetchSearchResults = async (term, type) => {
    try {
      setLoading(true);
      console.log("start searching result::for term and type,",term,",",type);
      const response = await fetch(`/api/search?type=${type}&query=${term}`);
      if (!response.ok) {
        throw new Error(`Error fetching search results: ${response.statusText}`);
      }
      const data = await response.json();
      setResults(data.data);

      setContent(prevContent => ({
        ...prevContent,
        blogs: data.data
      }));
      setLoading(false);
      console.log("for term and type",term,type," : ",results, data.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <div className="flex flex-col items-center space-y-1">
  <p className="font-bold text-xl leading-tight mt-3">Balance</p>
  <p className="text-sm text-gray-400 -mt-3">The Voice Of Nature</p>
</div>

          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium",
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          {/* <Link isExternal aria-label="Twitter" href={siteConfig.links.twitter}>
            <TwitterIcon className="text-default-500" />
          </Link>
          <Link isExternal aria-label="Discord" href={siteConfig.links.discord}>
            <DiscordIcon className="text-default-500" />
          </Link>
          <Link isExternal aria-label="Github" href={siteConfig.links.github}>
            <GithubIcon className="text-default-500" />
          </Link> */}
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
        {/* <NavbarItem className="hidden md:flex">
          <Button
            isExternal
            as={Link}
            className="text-sm font-normal text-default-600 bg-default-100"
            href={siteConfig.links.sponsor}
            startContent={<HeartFilledIcon className="text-danger" />}
            variant="flat"
          >
            Sponsor
          </Button>
          
        </NavbarItem> */}
      </NavbarContent>
      <NavbarContent justify="end">

          {
            user? <div className="flex items-center gap-4 ">


          <Button isIconOnly>  <MdOutlineMessage size={22}/> </Button>
          <Button isIconOnly>  <IoMdNotifications size={22}/> </Button>
              <div className="w-12 h-auto rounded-xl"><img className="rounded-xl" src={user.picture} alt="" /></div>
               {user.given_name}
               <LogoutLink>
               <Button color="primary" variant="ghost" href="#" >
            Logout
               </Button>

          </LogoutLink>
               
               </div>: 
          <>
        <NavbarItem className="hidden lg:flex">
        <LoginLink>
        <Button color="primary" variant="light" href="#" >
            Login
          </Button>
          </LoginLink>
        </NavbarItem>
        <NavbarItem>
        <RegisterLink>
          <Button color="primary" href="#" variant="flat">
            Sign Up
          </Button>
          </RegisterLink>
        </NavbarItem>
        </>
          }
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        {/* <Link isExternal aria-label="Github" href={siteConfig.links.github}>
          <GithubIcon className="text-default-500" />
        </Link> */}
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        {searchInput}
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                href="#"
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
