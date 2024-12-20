import PageForm from "@/components/form/PageForm";

export default async function EditPagePage({ params }: { params: { id: string } }) {
    let data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/pages/${params.id}`)
    let pageToEdit = await data.json()
    
    return (
        <div>
            <PageForm pageToEdit={pageToEdit}/>
        </div>
    )
};