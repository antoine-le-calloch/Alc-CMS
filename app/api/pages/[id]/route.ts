import { NextResponse } from "next/server";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;

        if (!id) {
            return NextResponse.json({ error: "ID is required" }, { status: 400 });
        }

        const pageRef = doc(db, 'pages', id);
        const pageSnap = await getDoc(pageRef);

        if (!pageSnap.exists()) {
            return NextResponse.json({ error: "Page not found" }, { status: 404 });
        }

        return NextResponse.json({ id: pageSnap.id, ...pageSnap.data() }, { status: 200 });
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return NextResponse.json({ error: message }, { status: 500 });
    }
}