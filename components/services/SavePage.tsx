export async function savePage(page: Page, isEdit: boolean): Promise<void> {
    const response = await fetch(`/api/pages/${isEdit ? page.id : ''}`, {
        method: isEdit ? 'PUT' : 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(page),
    });

    if (!response.ok) {
        const errorMessage = await response.text();
        console.error("API Error:", errorMessage);
        throw new Error(`Failed to save the page: ${response.status} ${response.statusText}`);
    }
}