import type { defaultProp } from "./globals"

export interface InputProps {
    placeholder : string
}

export interface DataItemProps {
    dd : React.ReactNode
    ddClassName? : string
    dt : React.ReactNode
    dtClassName? : string
}

export interface TasksSelectorProps extends defaultProp {
    placeholder : string
    label : string
}