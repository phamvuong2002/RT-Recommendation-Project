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





export const fetchDataGHN = async (url, requestData = '') => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Token': 'c3c28ea7-ea82-11ee-8bfa-8a2dda8ec551',
                'ShopId': '191502'
            },
            body: JSON.stringify(requestData) // Chuyển đổi dữ liệu request thành JSON
        });
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