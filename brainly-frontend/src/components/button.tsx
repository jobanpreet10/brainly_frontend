

export interface ButtonProps{
    variant : "primary" | "secondary";
    size : "sm" | "md" | "lg";
    text : string
    startIcon ?: any;
    endIcon ?: any;
    onClick ?: () => void; 
    fullWidth?: boolean;
    loading ?: boolean;
}

// type variant = "primay" | "secondary"
const variantStyles: Record<ButtonProps["variant"], string> = {
    primary: " bg-purple-600 text-white hover:bg-blue-900 ",
    secondary: "bg-purple-300 text-purple-600 hover:bg-gray-400 ",
};

const sizeStyles: Record<ButtonProps["size"], string> = {
    sm: "py-1 px-2",
    md: "py-2 px-4",
    lg: "py-4 px-8",
};
const deafaultStyles  = "rounded-md p-4 flex "


export const Button = (props : ButtonProps) =>{

    return <button onClick={props.onClick} className={`${variantStyles[props.variant]} ${deafaultStyles} ${props.fullWidth ? " w-full flex justify-center items-center" : 
    ""} ${sizeStyles[props.size]} ${props.loading ? "opacity-45":""} `} disabled = {props.loading} >
        
    {props.startIcon ? <div className="flex items-center pr-2">{props.startIcon} </div> : null  } 
    {props.text}
    {props.endIcon }
    </button>
}