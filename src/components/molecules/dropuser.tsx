import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
} from "@nextui-org/dropdown"
import { Button } from "@nextui-org/button"
import { User } from "@nextui-org/user"
import Link from "next/link"
import { signOut } from "next-auth/react"

const UserDrop = ({ ...props }) => {
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger className="cursorr-pointer">
        <User
          name=""
          description=""
          classNames={{
            name: "text-default-600",
            description: "text-default-500",
          }}
          avatarProps={{
            size: "sm",
            src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
          }}
        />
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Custom item styles"
        disabledKeys={["profile"]}
        className="p-3"
        itemClasses={{
          base: [
            "rounded-md",
            "text-default-500",
            "transition-opacity",
            "data-[hover=true]:text-foreground",
            "data-[hover=true]:bg-default-100",
            "dark:data-[hover=true]:bg-default-50",
            "data-[selectable=true]:focus:bg-default-50",
            "data-[pressed=true]:opacity-70",
            "data-[focus-visible=true]:ring-default-500",
          ],
        }}
      >
        <DropdownSection aria-label="Profile & Actions" showDivider>
          <DropdownItem
            isReadOnly
            key="profile"
            className="h-14 gap-2 opacity-100"
          >
            <User
              name="Junior Garcia"
              description="@jrgarciadev"
              classNames={{
                name: "text-default-600",
                description: "text-default-500",
              }}
              avatarProps={{
                size: "sm",
                src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
              }}
            />
          </DropdownItem>
          <DropdownItem key="dashboard">Dashboard</DropdownItem>
          <DropdownItem key="settings">Settings</DropdownItem>
          <DropdownItem key="new_project">New Project</DropdownItem>
        </DropdownSection>

        <DropdownSection aria-label="Preferences" showDivider>
          <DropdownItem key="quick_search" shortcut="⌘K">
            Quick search
          </DropdownItem>
          <DropdownItem
            isReadOnly
            key="theme"
            className="cursor-default"
            endContent={
              <select
                className="z-10 outline-none w-16 py-0.5 rounded-md text-tiny group-data-[hover=true]:border-default-500 border-small border-default-300 dark:border-default-200 bg-transparent text-default-500"
                id="theme"
                name="theme"
              >
                <option>System</option>
                <option>Dark</option>
                <option>Light</option>
              </select>
            }
          >
            Theme
          </DropdownItem>
        </DropdownSection>

        <DropdownSection aria-label="Help & Feedback">
          <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
          <DropdownItem key="logout">
            <Button
              color="danger"
              fullWidth
              href={"/auth/login"}
              onClick={async () => {
                await signOut({
                  redirect: false,
                })
              }}
            >
              LogOut
            </Button>
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  )
}

export default UserDrop
