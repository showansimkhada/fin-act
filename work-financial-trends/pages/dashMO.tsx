import { Nav } from "@/pages/components/Nav";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function HomeMO() {
    const {data: session} = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/')
        }
    })
    return (
        <>
            <Nav/>
        </>
    )
}