import { useRef, useState } from "react";
import { Button } from "./button";
import { CrossIcon } from "./Icons/crossIcon";
import { Input } from "./input";
import { BACKEND_URL } from "../pages/config";
import axios from "axios";

export enum ContentType {
    Youtube = "youtube",
    Twitter = "twitter"
}

export function CreateComponentModal({ open, onClose }) {
    if (!open) return null; // Prevent rendering when modal is closed

    const titleRef = useRef<HTMLInputElement | null>(null);
    const linkRef = useRef<HTMLInputElement | null>(null);
    const descriptionRef = useRef<HTMLInputElement | null>(null);
    const [type, setType] = useState(ContentType.Youtube);

    // Function to reset input fields
    function resetForm() {
        if (titleRef.current) titleRef.current.value = "";
        if (linkRef.current) linkRef.current.value = "";
        setType(ContentType.Youtube); // Reset type to default
    }

    async function addContent() {
        try {
            const title = titleRef.current?.value;
            const link = linkRef.current?.value;
            const description = descriptionRef.current?.value;

            if (!title || !link) {
                alert("Title and Link are required!");
                return;
            }

            const response = await axios.post(`${BACKEND_URL}/api/v1/content`, {
                link,
                title,
                type,
                description,
            }, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });

            console.log("Content added successfully:", response.data);

            resetForm();  // ✅ Reset fields after successful submission
            onClose();    // ✅ Close modal after success
        } catch (error) {
            console.error("Error adding content:", error);
            alert("Failed to add content. Please try again.");
        }
    }

    return (
        <div className="fixed inset-0 bg-slate-500 bg-opacity-90 flex items-center justify-center z-50">
            <div className="flex justify-center">
                <span className="bg-white p-4 rounded-sm shadow-lg">
                    {/* Close Button */}
                    <div className="flex justify-end">
                        <div 
                            onClick={() => {
                                resetForm();  // ✅ Reset fields when closing modal
                                onClose();
                            }} 
                            className="cursor-pointer hover:bg-red-700 rounded"
                        >
                            <CrossIcon />
                        </div>
                    </div>

                    {/* Input Fields */}
                    <div>
                        <Input ref={titleRef} placeholder={"Title"} />
                        <Input ref={linkRef} placeholder={"Link"} />
                        <Input ref={descriptionRef} placeholder={"Description"}/>
                    </div>

                    {/* Type Selection */}
                    <div>
                        <h1>Type</h1>
                        <div className="flex gap-2 justify-center p-4">
                            <Button 
                                size="sm" 
                                text="Youtube" 
                                variant={type === ContentType.Youtube ? "primary" : "secondary"} 
                                onClick={() => setType(ContentType.Youtube)}
                            />
                            <Button 
                                size="sm" 
                                text="Twitter" 
                                variant={type === ContentType.Twitter ? "primary" : "secondary"} 
                                onClick={() => setType(ContentType.Twitter)}
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center">
                        <Button onClick={addContent} size="md" variant="primary" text="Submit" />
                    </div>
                </span>
            </div>
        </div>
    );
}
