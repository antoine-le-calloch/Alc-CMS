import { NextResponse } from "next/server";
import {deleteDoc, doc, getDoc, setDoc} from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;

        if (!id) {
            return NextResponse.json({ error: "ID is required" }, { status: 400 });
        }

        const blockRef = doc(db, 'blocks', id);
        const blockSnap = await getDoc(blockRef);

        if (!blockSnap.exists()) {
            return NextResponse.json({ error: "Block not found" }, { status: 404 });
        }

        return NextResponse.json({ id: blockSnap.id, ...blockSnap.data() }, { status: 200 });
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
        await setDoc(doc(db, 'blocks', id), rest, { merge: true });
        return NextResponse.json({}, { status: 200 });
    } catch (error) {
        let message = error instanceof Error ? error.message : String(error);
        return NextResponse.json({ error: message }, { status: 500 });
    }
}


export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        await deleteDoc(doc(db, 'blocks', id));
        return NextResponse.json({}, { status: 200 });
    } catch (error) {
        let message = error instanceof Error ? error.message : String(error);
        return NextResponse.json({ error: message }, { status: 500 });
    }
}