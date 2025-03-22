'use client';
import { title } from "@/components/primitives";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardBody, CardFooter ,Image, Avatar, Button,addToast } from "@heroui/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, cn } from "@heroui/react";
import { BiSolidHide } from "react-icons/bi";
import { BiLike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import { FaRegCommentDots } from "react-icons/fa";
import { IoIosShareAlt } from "react-icons/io";
import { SiPostmates } from "react-icons/si";
import { CiFlag1 } from "react-icons/ci"; 
import NextLink from "next/link";
import { useContent } from "../contexts/ContentContext";
import { useState, useRef, useEffect } from "react";
import {  LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";
import { render } from "react-dom"; 
import { FaRegBookmark } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa";

export default function BlogPage() {

  const environmentalists = [
    { name: "Greta Thunberg", username: "@gretathunberg", img: "https://th.bing.com/th/id/OIP.kS-qp-qlsShogyvb1JvnaAAAAA?w=474&h=474&rs=1&pid=ImgDetMain" },
    { name: "David Attenborough", username: "@sirattendb", img: "https://th.bing.com/th/id/OIP.kS-qp-qlsShogyvb1JvnaAAAAA?w=474&h=474&rs=1&pid=ImgDetMain" },
    { name: "Jane Goodall", username: "@janegoodall", img: "https://th.bing.com/th/id/OIP.kS-qp-qlsShogyvb1JvnaAAAAA?w=474&h=474&rs=1&pid=ImgDetMain" },
    { name: "Leonardo DiCaprio", username: "@leo_dicaprio", img: "https://th.bing.com/th/id/OIP.kS-qp-qlsShogyvb1JvnaAAAAA?w=474&h=474&rs=1&pid=ImgDetMain" }
  ];
  
  const [liked, setLiked] = useState(false);
  const router = useRouter();
  const { content , setBlogs, user, setSelected, results, loading, setLoading, searchTerm, setSearchTerm } = useContent();
  const [selectedContent, setSelectedContent] = useState({});
  const [selectedDesc, setSelectedDesc] = useState([]);
  const [blogLoading, setBlogLoading] = useState(false);
  const [expandedPosts, setExpandedPosts] = useState({}); // Renamed for clarity
  console.log("check results data:::", results);
  const [likedPosts, setLikedPosts] = useState({});
  const [savedPosts, setSavedPosts] = useState({});

const toggleLike = (postId) => {
  setLikedPosts((prev) => ({
    ...prev,
    [postId]: !prev[postId],
  }));
};

const toggleSave = (postId) => {
  setSavedPosts((prev) => ({
    ...prev,
    [postId]: !prev[postId],
  }));
};

  function timeAgo(timestamp) {
    const now = new Date();
    const past = new Date(timestamp);
    const seconds = Math.floor((now - past) / 1000);

    if (seconds < 60) return `${seconds} seconds ago`;
    
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minutes ago`;
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hours ago`;
    
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days} days ago`;
    
    const weeks = Math.floor(days / 7);
    if (weeks < 4) return `${weeks} weeks ago`;
    
    const months = Math.floor(days / 30);
    if (months < 12) return `${months} months ago`;
    
    const years = Math.floor(days / 365);
    return `${years} years ago`;
};

  useEffect(()=>{
    setSearchTerm("");
  },[])

  // Modified to use blogId as the key instead of index
  const toggleExpand = (blogId) => {
    setExpandedPosts((prev) => ({
      ...prev,
      [blogId]: !prev[blogId]
    }));
  };
  
  console.log("in blogs page:::", content.blogs);
  useEffect(() => {
    setSelected("blog")
    const fetchBlogs = async () => {
      try {
        setBlogLoading(true);
        const response = await fetch('/api/blogs');
        const result = await response.json();

        if (result.success) {
          setBlogs(result.data);
        } else {
          console.error('Failed to fetch blogs:', result.error);
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setBlogLoading(false);
      }
    };
    
    if(content.blogs.length === 0){
      fetchBlogs();
    }
  }, [setBlogs]);

  const renderDescription = (blocks, blogId) => {
    if (!blocks || !Array.isArray(blocks)) {
      return null; // Handle undefined or invalid input
    }
  
    let fullText = "";
    let elements = [];
  
    blocks.forEach((block, blockIndex) => {
      switch (block.type) {
        // case "header":
        //   elements.push(
        //     <h2 className="whitespace-normal break-words font-bold text-lg " key={blockIndex}>
        //       {block.data.text}
        //     </h2>
        //   );
        //   break;
  
        case "paragraph":
          fullText += block.data.text + " "; // Combine paragraph text
          break;
  
        case "list":
          elements.push(
            <ul className="whitespace-normal break-words list-disc ml-5" key={blockIndex}>
              {block.data.items.map((item, itemIndex) => (
                <li key={itemIndex}>{item}</li>
              ))}
            </ul>
          );
          break;
  
        case "image":
        case "urlImage":
          if (block.data.url) {
            elements.push(
              <div key={blockIndex} className="mt-2 flex justify-center ">
                <img
                  src={block.data.url}
                  alt={block.data.caption || "Image"}
                  className="w-1/2 h-auto rounded-md"
                />
                {block.data.caption && <p className="text-sm text-gray-500">{block.data.caption}</p>}
              </div>
            );
          }
          break;
  
        case "embed":
          elements.push(
            <div className="video-wrapper mt-2" key={blockIndex}>
              <iframe
                width="100%"
                height="250"
                src={`https://www.youtube.com/embed/${extractVideoId(block.data.url)}`}
                title={`YouTube video ${blockIndex}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          );
          break;
  
        default:
          break;
      }
    });
  


    const words = fullText.trim().split(" ");
    const wordLimit = 30;
    const isExpanded = expandedPosts[blogId]; // Use blogId here
    const displayedText = isExpanded ? fullText : words.slice(0, wordLimit).join(" ");
  
    if (fullText.length > 0) {
      elements.unshift(
        <p className="whitespace-normal break-words" key="paragraph">
          {displayedText}
          {words.length > wordLimit && (
            <button
              onClick={() => toggleExpand(blogId)} // Use blogId here
              className="text-blue-500 ml-2 cursor-pointer underline"
            >
              {isExpanded ? "See Less" : "See More"}
            </button>
          )}
        </p>
      );
    }
  
    return elements;
  };
    
  const renderHeader = (blocks, blogId) => {
    if (!blocks || !Array.isArray(blocks)) {
      return null; // Handle undefined or invalid input
    }
  
    let fullText = "";
    let elements = [];
  
    blocks.forEach((block, blockIndex) => {
      switch (block.type) {
        case "header":
          elements.push(
            <h2 className="whitespace-normal break-words font-bold text-lg " key={blockIndex}>
              {block.data.text}
            </h2>
          );
          break;
  
        default:
          break;
      }
    });
  
    const words = fullText.trim().split(" ");
    const wordLimit = 30;
    const isExpanded = expandedPosts[blogId]; // Use blogId here
    const displayedText = isExpanded ? fullText : words.slice(0, wordLimit).join(" ");
  
    if (fullText.length > 0) {
      elements.unshift(
        <p className="whitespace-normal break-words" key="paragraph">
          {displayedText}
          {words.length > wordLimit && (
            <button
              onClick={() => toggleExpand(blogId)} // Use blogId here
              className="text-blue-500 ml-2 cursor-pointer underline"
            >
              {isExpanded ? "See Less" : "See More"}
            </button>
          )}
        </p>
      );
    }
  
    return elements;
  };

  return (
    <div className="flex gap-56">
      <div className="absolute top-24 left-60">
      {(blogLoading || loading) ? <div>Loading</div> : <>
      
      {content.blogs.map((blog) => (
        <div key={blog.id}>
          <Card className="py-4 w-[610px] mt-1" fullWidth="true">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <div className="flex justify-between items-center w-full">
                <div className="flex gap-5">
                  <Avatar isBordered radius="full" size="md" src="https://th.bing.com/th/id/OIP.kS-qp-qlsShogyvb1JvnaAAAAA?w=474&h=474&rs=1&pid=ImgDetMain" />
                  <div className="flex flex-col gap-1 items-start justify-center">
                    <h4 className="text-small font-semibold leading-none text-default-600">
                      {blog.authorName}
                    </h4>
                  </div>
                  <div className="flex flex-col gap-1 items-start justify-center">
                    <h4 className="text-small font-semibold leading-none text-default-600">
                      <sup> . </sup>{timeAgo(blog.createdAt)}<sup> . </sup>
                    </h4>
                  </div>
                </div>
                <div>
                  <Dropdown>
                    <DropdownTrigger>
                      <Button isIconOnly className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2" radius="full" variant="light">
                        <b>...</b>
                      </Button>
                    </DropdownTrigger>
                    <div className="mr-28">
                      <DropdownMenu aria-label="Dropdown menu with icons" variant="faded">
                        {/* <DropdownItem key="new" startContent={<FaRegBookmark />}>
                          Save
                        </DropdownItem> */}
                        <DropdownItem key="copy" startContent={<BiSolidHide />}>
                          Hide
                        </DropdownItem>
                        <DropdownItem key="edit" startContent={<CiFlag1 />}>
                          Report
                        </DropdownItem>
                      </DropdownMenu>
                    </div>
                  </Dropdown>
                </div>
              </div>
              <h5 className="font-bold text-large text-justify w-full">{blog.title}</h5>
            </CardHeader>
            <CardBody className="overflow-visible py-2 flex items-center">
              <div>{renderDescription(blog.description, blog.id)}</div>
            </CardBody>
            <CardFooter className="text-small ">
              <div className="flex justify-between items-end w-full">
              <div className="flex gap-4 items-center pt-4">
                <Button
                  radius="full"
                  variant="faded"
                  onPress={() => toggleLike(blog.id)}
                >
                  {likedPosts[blog.id] ? <BiSolidLike size={20} /> : <BiLike size={20} />} 2.2K
                </Button>
                <Button radius="full" aria-label="Take a photo" variant="faded">
                  <FaRegCommentDots size={20}/>349
                </Button>
                <Button isIconOnly aria-label="Take a photo" variant="faded">
                  <IoIosShareAlt size={20} />
                </Button>
              </div>
              <div>
              <Button
                  radius="full"
                  variant="faded"
                  onPress={() => toggleSave(blog.id)}
                >
              {savedPosts[blog.id] ? <FaBookmark size={18} /> : <FaRegBookmark size={18} />}
              </Button>
              </div>
              </div>
            </CardFooter>
          </Card>
          <hr className="w-[610px] mt-2" />
        </div>
      ))}
      </>}
      </div>

      <div className="absolute right-9 top-24 right-16 z-50">
      <div className="w-full max-w-md p-4 rounded-lg shadow-md bg-white dark:bg-neutral-900">
      <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">Suggested</h2>
      {environmentalists.map((person, index) => (
        <div key={index} className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <img src={person.img} alt={person.name} className="w-10 h-10 rounded-full border dark:border-gray-700" />
            <div>
              <p className="font-medium text-gray-900 dark:text-gray-100">{person.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{person.username}</p>
            </div>
          </div>
          <button className="px-3 py-1 border rounded-full text-sm font-medium transition hover:scale-105 border-gray-400 dark:border-gray-600 dark:text-gray-300">
            Follow
          </button>
        </div>
      ))}
    </div>
      </div>
      
      <NextLink href="/explore/addPost">
        <Button
        className="fixed border bottom-8 right-8 z-50" variant="shadow" color="primary">
        <SiPostmates size={30}/>  Post
        </Button>
      </NextLink>
    </div>
  );
}