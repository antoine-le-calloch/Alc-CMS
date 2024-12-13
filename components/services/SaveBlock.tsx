export async function saveBlock(page: Block, isEdit: boolean): Promise<void> {
    const response = await fetch(`/api/blocks/${isEdit ? page.id : ''}`, {
        method: isEdit ? 'PUT' : 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(page),
    });

    if (!response.ok) {
        const errorMessage = await response.text();
        console.error("API Error:", errorMessage);
        throw new Error(`Failed to save the block: ${response.status} ${response.statusText}`);
    }

    alert("Block saved successfully!");
}