import type { TagProps } from "@/types/globals"
import { capitalize } from "@/utils/functions"

export default function Tag({ tagTitle, color } : TagProps) {
    return (
        <span style={{ background: color}} className={`px-2 py-[2px] text-[8px] font-semibold text-white rounded-lg my-auto cursor-pointer`}>{capitalize(tagTitle)}</span>
    )
}

