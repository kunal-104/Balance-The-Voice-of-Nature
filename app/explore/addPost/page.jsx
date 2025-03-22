"use client";
import React, { useState, useEffect, useRef } from "react";
import dynamic from 'next/dynamic';
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Chip,
  Input
} from "@heroui/react";

import NextLink from "next/link";
import { useContent } from "../../contexts/ContentContext";
import { checkToxicity } from '../../../components/toxicity';

const analyzeText = async (text) => {
  const result = await checkToxicity(text);
  console.log("Is Toxic:", result.isToxic);
  console.log("Details:", result.details);
  return result;
};

// Dynamic import of the Editor component with SSR disabled
const Editor = dynamic(() => import("../../comp/Editor/Editor"), { ssr: false });

const AddBlog = () => {

  const CombinedText = (blocks) => {
    if (!blocks || !Array.isArray(blocks)) {
      return ""; // Return empty string instead of null for consistency
    }
  
    let combinedText = "";
  
    blocks.forEach((block) => {
      switch (block.type) {
        case "header":
          combinedText += block.data.text + "\n\n"; // Add header text with spacing
          break;
        case "paragraph":
          combinedText += block.data.text + " "; // Append paragraph text
          break;
        default:
          break;
      }
    });
    console.log("combinedText:::", combinedText.trim());
    return combinedText.trim();
  };
  
  const { AddBlog, user } = useContent();
  const editorInstanceRef = useRef(null);

  const [categories, setCategories] = React.useState(new Set(["Education"]));
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState([]);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [User, setUser] = useState({});
  const [isToxic, setIsToxic] = useState(false);
  const router = useRouter();

  const selectedValue = React.useMemo(
    () => Array.from(categories).join(", ").replaceAll("_", " "),
    [categories]
  );

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSaveBlog = async () => {
    setError("");
    setTitleError("");
    
    if (!title.trim()) {
      setTitleError("Title is required");
      return;
    }
    
    if (editorInstanceRef.current) {
      try {
        const outputData = await editorInstanceRef.current.save();
        if (outputData.blocks.length === 0) {
          setError("Content cannot be empty");
          return;
        }
        
        let allText = CombinedText(outputData.blocks);
        
        // Properly await the toxicity check
        const toxicityResult = await analyzeText(allText);
        
        if (toxicityResult.isToxic) {
          setIsToxic(true);
          console.log("Content detected as toxic");
          alert("You cannot upload this post, as it contains toxic words. Please use different words and avoid abusive language.");
          return; // Stop the saving process if toxic
        } else {
          console.log("Content is not toxic");
          setIsToxic(false);
          setDescription(outputData.blocks);
          setIsSaving(true);
        }
      } catch (error) {
        console.error("Saving failed: ", error);
        setError("An error occurred while saving. Please try again.");
      }
    }
  };

  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user]);
  
  useEffect(() => {
    if (isSaving && description.length > 0 && User?.id && User?.given_name) {
      const newBlog = {
        id: Date.now().toString(),
        title,
        description,
        tags,
        categories: Array.from(categories),
        author: User.id,
        authorName: User.given_name,
      };
      
      // No need to check isToxic here since we've already checked before setting isSaving to true
      console.log("New blog:", newBlog);
      AddBlog(newBlog);
      router.push("/explore");
      
      setIsSaving(false); // Reset the saving state
    }
  }, [description, isSaving, User?.id, User?.given_name, AddBlog, categories, tags, title, router]);
  
  return (
    <div className="flex flex-col md:flex-row h-screen bg-bodybg">
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-8">
          <Card className="h-full w-full bg-sidebarbg">
            <CardHeader className="flex flex-col w-full items-start">
              <div className="w-full text-icon">
                <Input
                  key="default"
                  className="text-icon"
                  onChange={handleTitleChange}
                  label="Blog Title "
                />
              </div>
              {titleError && <div className="text-red-500">{titleError}</div>}
            </CardHeader>
            <CardBody>
              <div className="border p-2">
                <Editor editorInstanceRef={editorInstanceRef} />
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <div className="flex justify-between mt-4 flex-col md:flex-row">
                <div className="mr-2 md:w-[900px] mb-10 md:mb-4">
                  <h2 className="text-xl font-bold mb-2 text-icon">Create Tags</h2>
                  <div className="w-[270px]">
                    <Input
                      type="text"
                      className="p-2 mb-2"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      placeholder="Enter a tag and press enter"
                      onKeyDown={(e) => e.key === "Enter" && addTag()}
                    />
                  </div>
                  <div className="flex flex-wrap">
                    {tags.map((tag, index) => (
                      <Chip key={index} onClose={() => removeTag(tag)} variant="flat" className="bg-icon">
                        {tag}
                      </Chip>
                    ))}
                  </div>
                </div>
              </div>
            </CardBody>
            <CardFooter className="flex justify-end">
              <div className="flex justify-between mb-4">
                <NextLink href="/explore">
                  <Button
                    color="danger"
                    className="text-white mr-2 relative z-50"
                  >
                    Cancel
                  </Button>
                </NextLink>
                <Button
                  onPress={handleSaveBlog}
                  color="success"
                  className="text-white relative z-50"
                >
                  Post
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AddBlog;