import { cn } from "@/lib/utils";
import { useUser } from "@/provider/user-context-provider";
import {
  Archive,
  ArchiveX,
  File,
  Inbox,
  LucideIcon,
  Send,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { Button, buttonVariants } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface NavLinkItem {
  title: string;
  label?: string;
  icon: LucideIcon;
  variant: "default" | "ghost";
}

const links: NavLinkItem[] = [
  {
    title: "Inbox",
    label: "128",
    icon: Inbox,
    variant: "default",
  },
  {
    title: "Drafts",
    label: "9",
    icon: File,
    variant: "ghost",
  },
  {
    title: "Sent",
    label: "",
    icon: Send,
    variant: "ghost",
  },
  {
    title: "Junk",
    label: "23",
    icon: ArchiveX,
    variant: "ghost",
  },
  {
    title: "Trash",
    label: "",
    icon: Trash2,
    variant: "ghost",
  },
  {
    title: "Archive",
    label: "",
    icon: Archive,
    variant: "ghost",
  },
];

export function DashboardLayout() {
  const { user } = useUser();
  const [isCollapsed, setCollapse] = useState(true);

  if (!user) {
    return <Navigate to={"/"} />;
  }

  return (
    <TooltipProvider delayDuration={0}>
      <div className="flex flex-1 h-screen">
        <div
          data-collapsed={isCollapsed}
          className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2 bg-blue-300"
        >
          <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
            {links.map((link, index) =>
              isCollapsed ? (
                <Tooltip key={index} delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Link
                      to="#"
                      className={cn(
                        buttonVariants({ variant: link.variant, size: "icon" }),
                        "h-9 w-9",
                        link.variant === "default" &&
                          "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                      )}
                    >
                      <link.icon className="h-4 w-4" />
                      <span className="sr-only">{link.title}</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent
                    side="right"
                    className="flex items-center gap-4"
                  >
                    {link.title}
                    {link.label && (
                      <span className="ml-auto text-muted-foreground">
                        {link.label}
                      </span>
                    )}
                  </TooltipContent>
                </Tooltip>
              ) : (
                <Link
                  key={index}
                  to="#"
                  className={cn(
                    buttonVariants({ variant: link.variant, size: "sm" }),
                    link.variant === "default" &&
                      "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                    "justify-start"
                  )}
                >
                  <link.icon className="mr-2 h-4 w-4" />
                  {link.title}
                  {link.label && (
                    <span
                      className={cn(
                        "ml-auto",
                        link.variant === "default" &&
                          "text-background dark:text-white"
                      )}
                    >
                      {link.label}
                    </span>
                  )}
                </Link>
              )
            )}
          </nav>
        </div>
        <div className="flex-1">
          <nav className="bg-red-200 sticky top-0 h-16">
            <Button onClick={() => setCollapse((prev) => !prev)}>
              {isCollapsed ? "Close" : "Open"}
            </Button>
            qwer
          </nav>
          <main className="flex-1 bg-green-200 h-full">
            <Outlet />
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}
