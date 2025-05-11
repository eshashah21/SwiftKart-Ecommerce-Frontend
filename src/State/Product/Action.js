import {
  CREATE_PRODUCT_FAILURE,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  FIND_PRODUCTS_FAILURE,
  FIND_PRODUCTS_REQUEST,
  FIND_PRODUCTS_SUCCESS,
  FIND_PRODUCT_BY_ID_FAILURE,
  FIND_PRODUCT_BY_ID_REQUEST,
  FIND_PRODUCT_BY_ID_SUCCESS,
} from "./ActionType";
import { api, API_BASE_URL } from "../../config/apiConfig";

export const findProducts = (reqData) => async (dispatch) => {
  dispatch({
    type: FIND_PRODUCTS_REQUEST,
  });

  const {
    colors,
    sizes,
    minPrice,
    maxPrice,
    minDiscount,
    category,
    stock,
    sort,
    pageNumber,
    pageSize,
  } = reqData;

  try {
    const {data} = await api.get(`/api/products?color=${colors}&size=${sizes}&minPrice=${minPrice}&maxPrice=${maxPrice}&minDiscount=${minDiscount}&category=${category}&stock=${stock}&sort=${sort}&pageNumber=${pageNumber}&pageSize=${pageSize}`);

    console.log("Fetched Products Data:", JSON.stringify(data, null, 2));

    dispatch({
      type: FIND_PRODUCTS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: FIND_PRODUCTS_FAILURE,
      payload: error.message
    });
  }
};

export const findProductsById = (reqData) => async (dispatch) => {
  dispatch({
    type: FIND_PRODUCT_BY_ID_REQUEST,
  });

  const { productId } = reqData;
  console.log("product id: ", productId)
  try {
    const { data } = await api.get(`/api/products/id/${productId}`);

    dispatch({
      type: FIND_PRODUCT_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FIND_PRODUCT_BY_ID_FAILURE,
      payload: error.message
    });
  }
};

export const createProduct = (product, reqData = {}) => async (dispatch) => {
  dispatch({
    type: CREATE_PRODUCT_REQUEST,
  });

  try {
    const { data } = await api.post(`/api/admin/products/`, product);
    console.log("Product Created:", data);

    dispatch({
      type: CREATE_PRODUCT_SUCCESS,
      payload: data,
    });

    await dispatch(findProducts(reqData));

    // setTimeout(() => {
    //   dispatch(findProducts(reqData)); 
    // }, 500); 

  } catch (error) {
    dispatch({
      type: CREATE_PRODUCT_FAILURE,
      payload: error.message,
    });
  }
};


export const deleteProduct = (productId) => async(dispatch) =>{
  dispatch({
    type: DELETE_PRODUCT_REQUEST,
  });
  try{
    const { data } = await api.delete(`${API_BASE_URL}/api/admin/products/${productId}`);
    console.log("delete product: ", data);
    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: productId,
    })
  }catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAILURE,
      payload: error.message
    });
  }
}

