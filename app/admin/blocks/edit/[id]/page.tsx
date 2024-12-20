import BlockForm from "@/components/form/BlockForm";

export default async function EditBlockPage({ params }: { params: { id: string } }) {
    let data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blocks/${params.id}`)
    let blockToEdit = await data.json()
    
    return (
        <div>
            <BlockForm blockToEdit={blockToEdit}/>
        </div>
    )
};