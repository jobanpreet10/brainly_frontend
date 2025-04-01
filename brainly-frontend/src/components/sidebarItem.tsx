import { ReactElement } from "react"


export function SidebarItem ({icons, text} :{
    text : String
    icons : ReactElement
}){
    return<div className="flex p-2 py-2 cursor-pointer hover:bg-purple-200 rounded max-w-48 pl-3 transition-all duration-500">
        <div className="pr-2">
            {icons}
        </div>
        <div >
            {text} 
        </div>
    </div>
}