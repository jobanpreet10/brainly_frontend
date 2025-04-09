import { ShareIcon } from "./Icons/share";
import { RedirectIcon } from "./Icons/redirect";
interface CardProps {
    title : string,
    link : string,
    type : "YouTube" | "Twitter",
    description : string,
}
export function Card({title , link,type,description}:CardProps) {
  return (
    <div className="p-8 bg-white rounded-md border border-slate-200 max-w-72 min-h-48 min-w-72">
      {/* Header Section with Icons & Title */}
      <div className="flex justify-between items-center">
        {/* Left Side: Icon + Text */}
        <div className="flex items-center text-md">
          <div className="text-gray-500 pr-2">
            <ShareIcon size="md" />
          </div>
          <span>{title}</span>
        </div>

        {/* Right Side: Two Icons */}
        <div className="flex items-center">
          <div className="pr-2 text-gray-500">
            <a href={link} target="_blank" >
                {<RedirectIcon size="md" />}
                
            </a>
          </div>
          <div className="text-gray-500">
            <ShareIcon size="md" />
          </div>
        </div>
        
      </div>

      {/* Embedded YouTube Video */}
      <div className="pt-4">
        { type === "YouTube" && <iframe
          className="w-full rounded-lg"
          src={link.replace("watch?v=", "embed/")}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        > </iframe> }
        
        {type === "Twitter" && <blockquote className="twitter-tweet">
                <a href={link.replace("x.com","twitter.com")}></a> 
        </blockquote>}
        
      </div>
      <div className="pt-4 text-sm text-gray-700 flex justify-center">{description}</div>
    </div>
  );
}
