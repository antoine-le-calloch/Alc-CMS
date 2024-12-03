import { NextResponse } from "next/server";
import {doc, getDoc, setDoc} from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function GET({ params }: { params: { id: string } }) {
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

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const data = await request.json();
        const { id: dataId, ...rest } = data;
        await setDoc(doc(db, 'pages', id), rest, { merge: true });
        return NextResponse.json({}, { status: 200 });
    } catch (error) {
        let message = error instanceof Error ? error.message : String(error);
        return NextResponse.json({ error: message }, { status: 500 });
    }
}