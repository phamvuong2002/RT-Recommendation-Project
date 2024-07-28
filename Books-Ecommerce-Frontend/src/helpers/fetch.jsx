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

export const fetchAPI = async (
  url,
  method,
  requestData = {},
  authorization,
) => {
  if (!url) {
    return;
  }

  try {
    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'x-client-id': `${authorization?.userId}`,
        authorization: `${authorization?.token}`,
      },
      credentials: 'include',
      body: JSON.stringify(requestData),
    });
    if (!res.ok) {
      console.log('Error to fetch');
      const errorResponse = await res.json();
      return { error: true, message: errorResponse.message };
    }

    const data = await res.json();
    return data;
  } catch (error) {
    // console.log('There was an error fetch', error);
    return;
  }
};

export const fetchDataGHN = async (url, requestData = '') => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Token: import.meta.env.VITE_GHN_TOKEN_PRO,
        ShopId: import.meta.env.VITE_GHN_SHOPID_PRO,
      },
      body: JSON.stringify(requestData), // Chuyển đổi dữ liệu request thành JSON
    });
    if (!response.ok) {
      // throw new Error('Failed to fetch GHN');
      return;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    // console.log('Error fetching GHN:', error);
    // throw error;
    return;
  }
};

// export const fetchDataGHN = async (url, requestData = '') => {
//     try {
//         const response = await fetch(url, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Token': 'c3c28ea7-ea82-11ee-8bfa-8a2dda8ec551',
//                 'ShopId': '191502'
//             },
//             body: JSON.stringify(requestData) // Chuyển đổi dữ liệu request thành JSON
//         });
//         if (!response.ok) {
//             throw new Error('Failed to fetch comments');
//         }
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.log('Error fetching comments:', error);
//         throw error;
//     }
// };
