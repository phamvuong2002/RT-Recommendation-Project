export const fetchData = async (url) => {
    try {
        const response = await fetch(url); // Đường dẫn đến file JSON chứa danh sách comments
        if (!response.ok) {
            throw new Error('Failed to fetch comments');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Error fetching comments:', error);
        throw error;
    }
};