import { IoIosNotificationsOutline } from "react-icons/io"
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@nextui-org/dropdown"

const NotificationBell = ({ ...props }) => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <div className="w-10 h-10  relative flex items-center justify-center cursor-pointer">
          <IoIosNotificationsOutline
            style={{ color: "#ffffff", fontSize: "2rem" }}
          />

          <div
            style={{
              display: props.Counter && props.Counter > 0 ? "flex" : "none",
            }}
            className="absolute flex items-center justify-center bg-red-600 rounded-full text-white w-5 h-5 quick bottom-0 left-0 text-xs"
          >
            {props.Counter < 10 ? props.Counter : "+9"}
          </div>
        </div>
      </DropdownTrigger>
      <DropdownMenu variant="faded" aria-label="Dropdown menu with description">
        <DropdownSection title="Actions" showDivider>
          <DropdownItem key="new" shortcut="⌘N" description="Create a new file">
            New file
          </DropdownItem>
          <DropdownItem
            key="copy"
            shortcut="⌘C"
            description="Copy the file link"
          >
            Copy link
          </DropdownItem>
          <DropdownItem
            key="edit"
            shortcut="⌘⇧E"
            description="Allows you to edit the file"
          >
            Edit file
          </DropdownItem>
        </DropdownSection>
        <DropdownSection title="Danger zone">
          <DropdownItem
            key="delete"
            className="text-danger"
            color="danger"
            shortcut="⌘⇧D"
            description="Permanently delete the file"
          >
            Delete file
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  )
}

export default NotificationBell
