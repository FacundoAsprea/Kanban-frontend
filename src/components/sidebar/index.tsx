import { FaGithub } from "react-icons/fa"
export default function Sidebar() {
    return (
        <nav className='flex-col items-center py-10 min-h-screen w-[50px] border-r-1 border-borderMain hidden md:flex'>
            <a href="https://github.com/FacundoAsprea" target="_blank"><FaGithub color="white" size="20px" className="hover:fill-blue-500"/></a>
        </nav>
    )
}