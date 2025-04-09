import { useEffect, useState } from 'react';

import { Button } from '../components/button';
import { Card } from '../components/card';
import { CreateComponentModal } from '../components/CreateComponentModal';
import { PlusIcon } from '../components/Icons/plus';
import { ShareIcon } from '../components/Icons/share';
import { Sidebar } from '../components/sidebar';
import { useContent } from '../hooks/useContent';
import axios from 'axios';
import { BACKEND_URL } from './config';

export function Dashboard() {
    const [modalOpen, setModalOpen] = useState(false);
    const { contents, error, loading ,fetchContent} = useContent();

    useEffect(()=>{
      fetchContent();
    },[modalOpen])
    if (loading) return <p>Loading content...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div>
            <Sidebar />
            <div className='p-4 ml-72 min-h-screen bg-gray-100 border-2'>
                {/* Create Content Modal */}
                <CreateComponentModal 
                    open={modalOpen} 
                    onClose={() => setModalOpen(false)} 
                />

                {/* Buttons Section */}
                <div className='flex justify-end gap-2'>
                    <Button 
                        onClick={() => setModalOpen(true)} 
                        startIcon={<PlusIcon size="md" />} 
                        size="md" 
                        variant="primary" 
                        text="Add Content"
                    />
                    <Button 
                        onClick={async()=>{
                          const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share` ,{
                            share : true
                          },{
                            headers : { Authorization: `Bearer ${localStorage.getItem("token")}` }
                          })
                          const shareUrl = `${BACKEND_URL}/share/${response.data.hash}`
                          alert(shareUrl)
                        }}
                        
                        startIcon={<ShareIcon size="md" />} 
                        size="md" 
                        variant="secondary" 
                        text="Share Brain" 
                    />
                </div>

                {/* Content Section */}
                <div className="flex gap-4 flex-wrap">
                    {contents.length > 0 ? (
                        contents.map(({ type, link, title ,description}, index) => {
                            console.log("Card Data:", { type, link, title ,description});

                            // Ensure all values are defined before rendering
                            if (!type || !link || !title) {
                                console.warn(`Skipping content at index ${index} due to missing fields.`);
                                return null;
                            }

                            return (
                                <Card 
                                    key={index}
                                    type={type.toLowerCase() === "youtube" ? "YouTube" : "Twitter"}
                                    link={link}
                                    title={title} 
                                    description={description}
                                />
                            );
                        })
                    ) : (
                        <p>No content available</p>
                    )}
                </div>
            </div>
        </div>
    );
}
