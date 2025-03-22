'use client';
import { Link } from "@heroui/link";
import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { button as buttonStyles } from "@heroui/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import { useEffect } from "react";
import { useContent } from "./contexts/ContentContext";
export default function Home() {

  const { content , setBlogs, user, setSelected, results, loading, setLoading, searchTerm, setSearchTerm } = useContent();
  // console.log("results:::::USER", user.userId);
  useEffect(() => {
    setSelected("blog")
    const fetchBlogs = async () => {
      try {
        // setBlogLoading(true);
        const response = await fetch('/api/blogs');
        const result = await response.json();
        console.log("result::::::::::", result);
        if (result.success) {
          setBlogs(result.data);
        } else {
          console.error('Failed to fetch blogs:', result.error);
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        // setBlogLoading(false);
      }
    };
if(content.blogs.length === 0){
  fetchBlogs();
}
  }, []);
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title()}>Environment&nbsp;</span>
       
        <span className={title()}>
         Is Protecting Sheet To Us From God!
        </span>

        <div className={subtitle({ class: "mt-4" })}>
         If We Destroy It, It Will Uncover Us.
        </div>

        <div className={subtitle({ class: "mt-4" })}>
        Don't Be So Mean, Just Be
        </div>

        <span className={title({ color: "green" })}>Green!&nbsp;</span>
        <br />
      </div>







      <div className="flex gap-3">
        <Link
          className={buttonStyles({
            color: "primary",
            radius: "full",
            variant: "shadow",
          })}
          href="/explore"
        >
          Explore
        </Link>

      </div>

      {/* <div className="mt-8">
        <Snippet hideCopyButton hideSymbol variant="bordered">
          <span>
            Get started by editing <Code color="primary">app/page.tsx</Code>
          </span>
        </Snippet>
      </div> */}
      
    </section>
  );
}
