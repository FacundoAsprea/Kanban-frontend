import { FaRegUser } from "react-icons/fa"

export default function Username({ username } : { username : string}) {
    return (
      <div>
        <span className="text-[12px] gap-1 bg-transparent border-1 border-borderMain text-muted-foreground flex w-min items-center rounded-xl px-3 py-1">
          <div className="rounded-xl border-1 border-borderMain p-1">
            <FaRegUser
              size="16px"
              color="var(--muted-foreground)"
            />
          </div>
          {username}
        </span>
      </div>
    )
}
