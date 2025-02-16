import { FieldErrors } from "react-hook-form";
import { toast } from "react-toastify";

export function getObjectErrors(errors: FieldErrors) {
    for (const value of Object.values(errors)) {
        toast.error(`${value?.message}`)
    }
}