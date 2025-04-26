import { useContext } from "react";
import { FeedContext } from "@/app/feed/contexts/feed-context";

export function useFeedCtx() {
    const context = useContext(FeedContext)

    if (context === undefined) throw new Error("needs a provider")
    
    return context
}