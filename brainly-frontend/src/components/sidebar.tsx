import { BrainIcon } from "./Icons/brainIcon";
import { TwitterIcon } from "./Icons/twitterIcon";
import { YouTubeIcon } from "./Icons/YouTubeIcon";
import { SidebarItem } from "./sidebarItem";


export function Sidebar (){
    return <div className="h-screen bg-white absolute border-r w-72 left-0 top-0 pl-6">
        <div className="flex text-2xl pt-8 items-center">
            <div className="pr-2 text-purple-600">
                <BrainIcon/>

            </div>
                Brainly
        </div>
        <div className="pt-8 pl-4">

            <SidebarItem text={"Twitter"} icons={<TwitterIcon/>}/>
            <SidebarItem text={"YouTube"} icons={<YouTubeIcon/>}/>

        </div>
    </div>
}