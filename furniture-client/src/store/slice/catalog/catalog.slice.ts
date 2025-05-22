import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../store';
import { ICatalogState, IProduct } from '../../../types/catalog.interface';
import { SERVER_RESPONSE_ERROR_MESSAGES } from '../../../common/utils/messages/messages';


const { UNKNOWN_ERROR } = SERVER_RESPONSE_ERROR_MESSAGES;

const initialState: ICatalogState = {
    bestSellers: [],
    searchResults: [],
    allProducts: [],
    relative: [],
    singleProduct: null,

    loadingSingle: false,
    loadingRelative: false,
    loading: false,

    errorSingle: null,
    errorRelative: null,
    error: null,
};

const catalogSlice = createSlice({
    name: 'catalog',
    initialState,
    reducers: {
        fetchSingleProductRequest(state, _action: PayloadAction<string>) {
            state.loadingSingle = true;
            state.errorSingle = null;
        },
        fetchSingleProductSuccess(state, action: PayloadAction<IProduct>) {
            state.loadingSingle = false;
            state.singleProduct = action.payload;
        },
        fetchSingleProductFailure(state, action: PayloadAction<string>) {
            state.loadingSingle = false;
            state.errorSingle = action.payload || UNKNOWN_ERROR;
        },

        fetchBestSellersRequest(state) {
            state.loading = true;
            state.error = null;
        },
        fetchBestSellersSuccess(state, action: PayloadAction<IProduct[]>) {
            state.loading = false;
            state.bestSellers = action.payload;
        },
        fetchBestSellersFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload || UNKNOWN_ERROR;
        },

        fetchRelativeRequest(state,  _action: PayloadAction<{ type: string }>) {
            state.loadingRelative = true;
            state.errorRelative = null;
        },
        fetchRelativeSuccess(state, action: PayloadAction<IProduct[]>) {
            state.loadingRelative = false;
            state.relative = action.payload;
        },
        fetchRelativeFailure(state, action: PayloadAction<string>) {
            state.loadingRelative = false;
            state.errorRelative = action.payload || UNKNOWN_ERROR;
        },

        searchRequest(state, _action: PayloadAction<string>) {
            state.loading = true;
            state.error = null;
        },
        searchSuccess(state, action: PayloadAction<IProduct[]>) {
            state.searchResults = action.payload;
            state.loading = false;
        },
        searchFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        clearSearchResults(state) {
            state.searchResults = [];
        }
    },
});

export const {
    fetchSingleProductRequest, fetchSingleProductSuccess, fetchSingleProductFailure,
    fetchRelativeRequest, fetchRelativeSuccess, fetchRelativeFailure,
    fetchBestSellersRequest, fetchBestSellersSuccess, fetchBestSellersFailure,
    searchRequest, searchSuccess, searchFailure, clearSearchResults
} = catalogSlice.actions;


export const selectCatalog = (state: RootState): ICatalogState => state.catalog;

export default catalogSlice.reducer;
