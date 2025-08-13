export type TaskStatus = "notStarted" | "ready" | "inProgress" | "done" | "cancelled" 


export interface defaultProp {
    children? : React.ReactNode
    className? : string
}

export interface stateProps<T> {
    stateValue : T
    stateSetter : (stateValue) => void
}

export interface TagProps {
    tagTitle : string
    color : string
}

export interface TaskProps {
    status? : TaskStatus
    tags : TagProps[]
    title : string
    username : string
    date : string
    taskId? : string
}