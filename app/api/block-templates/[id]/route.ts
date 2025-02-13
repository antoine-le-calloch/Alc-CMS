import { NextResponse } from "next/server";
import {deleteDoc, doc, getDoc, setDoc} from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;

        if (!id) {
            return NextResponse.json({ error: "ID is required" }, { status: 400 });
        }

        const blockTemplateRef = doc(db, 'blockTemplates', id);
        const blockTemplateSnap = await getDoc(blockTemplateRef);

        if (!blockTemplateSnap.exists()) {
            return NextResponse.json({ error: "Block not found" }, { status: 404 });
        }

        return NextResponse.json({ id: blockTemplateSnap.id, variables: blockTemplateSnap.data(), ...blockTemplateSnap.data() }, { status: 200 });
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
        await setDoc(doc(db, 'blockTemplates', id), rest, { merge: true });
        return NextResponse.json({}, { status: 200 });
    } catch (error) {
        let message = error instanceof Error ? error.message : String(error);
        return NextResponse.json({ error: message }, { status: 500 });
    }
}


export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        await deleteDoc(doc(db, 'blockTemplates', id));
        return NextResponse.json({}, { status: 200 });
    } catch (error) {
        let message = error instanceof Error ? error.message : String(error);
        return NextResponse.json({ error: message }, { status: 500 });
    }
}