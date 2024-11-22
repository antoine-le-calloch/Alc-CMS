import {NextResponse} from "next/server";
import {addDoc, collection, deleteDoc, doc, getDocs} from "firebase/firestore";
import {db} from "@/lib/firebase";

export async function GET() {
    try {
        const snapshot = await getDocs(collection(db, 'blocks'));
        const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return NextResponse.json(items, { status: 200 });
    } catch (error) {
        let message = error instanceof Error ? error.message : String(error);
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();
        await addDoc(collection(db, 'blocks'), data); 
        return NextResponse.json({}, { status: 201 });
    } catch (error) {
        let message = error instanceof Error ? error.message : String(error);
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const data = await request.json();
        const { id, ...rest } = data;
        await addDoc(collection(db, 'blocks'), { id, ...rest });
        return NextResponse.json({}, { status: 200 });
    } catch (error) {
        let message = error instanceof Error ? error.message : String(error);
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const data = await request.json();
        await deleteDoc(doc(db, 'blocks', data.id));
        return NextResponse.json({}, { status: 200 });
    } catch (error) {
        let message = error instanceof Error ? error.message : String(error);
        return NextResponse.json({ error: message }, { status: 500 });
    }
}