import { useContext } from "react";
import { FeedDispatchContext } from "@/app/feed/contexts/feed-context";

export function useFeedDispatch() {
    const context = useContext(FeedDispatchContext)

    if (context === undefined) throw new Error("needs a provider")

    return context
}