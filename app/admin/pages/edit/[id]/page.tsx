"use client";

import React, {useEffect, useState} from 'react';
import Button from "@/components/utils/button";
import PageForm from "@/components/form/pageForm";

export default function EditPage({ params }: { params: { id: string } }) {
    const [page, setPage] = useState<Page>({
        title: '',
        link: '',
        blocks: [],
    });
    
    useEffect(() => {
        async function fetchPage(id: string) {
            const response = await fetch(`/api/pages/${id}`);
            if (!response.ok) {throw new Error("An error occurred while fetching the data");}
            return response.json();
        }
        fetchPage(params.id)
            .then((data) => {
                setPage(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [params.id])

    const handleSubmit = async () => {
        const response = await fetch('/api/pages', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: params.id, title: page.title })
        });
        if (response.ok) {
            alert("Page successfully save !");
        }else{
            console.log(response)
        }
    }
    
    return (
        <div>
            <PageForm page={page} setPage={setPage} />
            <Button onClick={handleSubmit} type="submit">
                Save
            </Button>
        </div>
    )
};