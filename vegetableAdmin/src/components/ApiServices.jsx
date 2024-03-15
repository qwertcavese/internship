import axios from "axios"
import FormData from 'form-data';


const url = `http://192.168.29.183:8001`

export default async function adminLogin(props) {
    // console.log(props);
    try {

        const response = await axios.post(
            `${url}/admin/login`,
            '',
            {
                params: {
                    'email': props.email,
                    'password': props.pwd
                },
                headers: {
                    'accept': 'application/json',
                    'content-type': 'application/x-www-form-urlencoded'
                }
            }
        )
        sessionStorage.setItem("adminId", response.data.detail.admin_id)
        // console.log(response.data.detail.status);
        return response.data.detail.message;
        // return response
    }
    catch (error) {
        // console.log(error.response.status);
        return error.response.data.detail;
        // return error.response
    }

}

export async function getAllCategories() {
    try {
        const response = await axios.get(`${url}/categories`, {
            headers: {
                'accept': 'application/json'
            }
        })
        return response.data.categories
    } catch (error) {

    }
}

export async function CreateCategory(props) {
    // console.log(props);
    try {
        const response = await axios.post(
            `${url}/categories/`,
            '',
            {
                params: {
                    'name': props.category
                },
                headers: {
                    'accept': 'application/json',
                    'content-type': 'application/x-www-form-urlencoded'
                }
            }
        );
        //   console.log(response);
        return response.data.message;
    } catch (error) {

    }
}

export async function deleteCategory(props) {
    try {
        const response = await axios.delete(`${url}/categories/${props.categoryId}`, {
            headers: {
                'accept': 'application/json'
            }
        })
        return response.data.message
    } catch (error) {

    }
}

export async function updateCategory(props) {
    try {
        const response = await axios.put(
            `${url}/categories/${sessionStorage.getItem("updateCategoryId")}`,
            '',
            {
                params: {
                    'name': props.category
                },
                headers: {
                    'accept': 'application/json'
                }
            }
        )
        // console.log(response);
        return response.data.message
    } catch (error) {

    }
}


export async function getAllItems(props) {
    try {
        const response = await axios.get(`${url}/items/`, {
            headers: {
                'accept': 'application/json'
            }
        })
        // console.log(response);
        return response.data.items;
    } catch (error) {

    }
}

export async function deleteItems(props) {
    // console.log(props.itemId);
    try {
        const response = await axios.delete(`${url}/items/${props.itemId}`, {
            headers: {
                'accept': 'application/json'
            }
        })
        return response.data.message
        // console.log(response);
    } catch (error) {
        console.log(error);

    }
}

export async function getPackSize(props) {
    try {
        const response = await axios.get(`${url}/pack_sizes/${props.itemId}`, {
            headers: {
                'accept': 'application/json'
            }
        });
        return response.data
    } catch (error) {

    }
}

export async function getAllPackSize() {
    try {
        const response = await axios.get(`${url}/get_all_pack_sizes/`, {
            headers: {
                'accept': 'application/json'
            }
        })
        return response.data
    }
    catch (error) {

    }
}

export async function createPackSize(props) {
    try {

        const response = await axios.post(
            `${url}/pack_sizes/`,
            '',
            {
                params: {
                    'item_id': sessionStorage.getItem("itemId"),
                    'size': props.packSize,
                    'price': props.price
                },
                headers: {
                    'accept': 'application/json',
                    'content-type': 'application/x-www-form-urlencoded'
                }
            }
        )
        // console.log(response);
        return response.data.message
    } catch (error) {

    }
}

export async function deletePackSize(props) {
    try {
        const response = await axios.delete(`${url}/pack_sizes/${props.packSizeId}`, {
            headers: {
                'accept': 'application/json'
            }
        })
        // console.log(response);
        return response.data.message;
    } catch (error) {

    }
}

export async function updateItem(props) {

    const itemId = props.updtItemId; // Replace with the actual item ID

    const url2 = `${url}/items/${itemId}`;
    const queryParams = `?name=${props.updtItem}&description=${props.updtDesc}&quantity=${props.updtQuantity}&category_id=${props.updtCategory}&status=${props.updtMod}`;

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    };

    const form = new FormData();
    form.append('image_path', props.updtImg);

    try {
       const response= await axios.put(`${url2}${queryParams}`, form, config);
        // Handle success (you may want to redirect or show a success message)
        return response.data
    } catch (error) {
        // Handle error (you may want to show an error message)
        console.error('Error updating item', error);
    }
}

export async function createItem(props) {

    // console.log(props);
    try {

        const url2 = `${url}/items/?name=${props.updtItem}&description=${props.updtDesc}&quantity=${props.updtQuantity}&category_id=${props.updtCategory}`;

        const data = new FormData();
        data.append('image', props.updtImg);

        const response = await axios.post(url2, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json',
            },
        });

        return response.data
    } catch (error) {
        console.error(error);
    }
}

export async function getAllOrderDetails() {
    try {
        const response = await axios.get(`${url}/orders/`, {
            headers: {
                'accept': 'application/json'
            }
        })
        // console.log(response);
        return response.data
    } catch (error) {
        console.log(error);
    }
}

export async function updateOrderStatus(id) {
    try {
        const response = await axios.put(
            `${url}/orders/${id}/update_status`,
            '',
            {
                params: {
                    'status': '1'
                },
                headers: {
                    'accept': 'application/json'
                }
            }
        )
        // console.log(response);
        return response.data.message
    } catch (error) {
        console.log(error);
    }
}

export async function getAllReviews() {
    try {
        const response = await axios.get(`${url}/get_all_reviews/`, {
            headers: {
                'accept': 'application/json'
            }
        })
        return response.data
    } catch (error) {

    }
}