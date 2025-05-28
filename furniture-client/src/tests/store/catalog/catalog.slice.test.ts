import catalogReducer, {
    fetchAllProductsRequest,
    fetchAllProductsSuccess,
    fetchAllProductsFailure,
    createProductRequest,
    createProductSuccess,
    createProductFailure
} from '../../../store/slice/catalog/catalog.slice';
import { ICatalogState, IProduct } from '../../../types/catalog.interface';


const initialState: ICatalogState = {
    allProducts: [],
    productsByIds: [],
    bestSellers: [],
    searchResults: [],
    relative: [],
    categories: [],
    singleProduct: null,

    currentPage: 1,
    totalPages: 1,
    minPrice: 0,
    maxPrice: 2000,
    selectedCategory: null,

    loadingUpdateProduct: false,
    loadingCreateProduct: false,
    loadingCreateCategory: false,
    loadingUpdateCategory: false,
    loadingProductsByIds: false,
    loadingCategories: false,
    loadingSingle: false,
    loadingRelative: false,
    loading: false,

    errorUpdateProduct: null,
    errorCreateProduct: null,
    errorCreateCategory: null,
    errorUpdateCategory: null,
    errorProductsByIds: null,
    errorCategories: null,
    errorSingle: null,
    errorRelative: null,
    error: null,

    successUpdateProduct: false,
    successCreateProduct: false,
    successCreateCategory: false,
    successUpdateCategory: false,
};

describe('catalogSlice reducer', () => {
    it('should handle fetchAllProductsRequest', () => {
        const action = fetchAllProductsRequest({ page: 2 });
        const state = catalogReducer(initialState, action);
        expect(state.loading).toBe(true);
        expect(state.currentPage).toBe(2);
        expect(state.error).toBeNull();
    });

    it('should handle fetchAllProductsSuccess', () => {
        const mockProducts: IProduct[] = [{
            id: '1',
            createdAt: '2024-01-01',
            updatedAt: '2024-01-02',
            name: 'Chair',
            description: 'A comfy chair',
            price: 100,
            discountPrice: 80,
            currency: 'USD',
            images: [],
            type: 'FURNITURE',
            size: 'M',
            color: 'Red',
            isBestSeller: true,
            isAvailable: true,
            isActive: true,
            category: {
                id: 'cat1',
                createdAt: '2024-01-01',
                updatedAt: '2024-01-02',
                name: 'Chairs',
                isActive: true,
            }
        }];

        const action = fetchAllProductsSuccess({ products: mockProducts, totalPages: 3 });
        const state = catalogReducer(initialState, action);
        expect(state.loading).toBe(false);
        expect(state.allProducts).toEqual(mockProducts);
        expect(state.totalPages).toBe(3);
    });

    it('should handle fetchAllProductsFailure', () => {
        const errorMessage = 'Failed to fetch products';
        const action = fetchAllProductsFailure(errorMessage);
        const state = catalogReducer(initialState, action);
        expect(state.loading).toBe(false);
        expect(state.error).toBe(errorMessage);
    });

    it('should handle createProductRequest', () => {
        const action = createProductRequest({
            name: 'Table',
            description: 'Wooden table',
            price: 200,
            discountPrice: 150,
            currency: 'USD',
            type: 'FURNITURE',
            size: 'L',
            color: 'Brown',
            isBestSeller: false,
            isAvailable: true,
            isActive: true,
            category: {
                id: 'cat2',
                createdAt: '',
                updatedAt: '',
                name: 'Tables',
                isActive: true
            }
        });

        const state = catalogReducer(initialState, action);
        expect(state.loadingCreateProduct).toBe(true);
        expect(state.errorCreateProduct).toBeNull();
    });

    it('should handle createProductSuccess', () => {
        const mockProduct: IProduct = {
            id: '2',
            createdAt: '',
            updatedAt: '',
            name: 'Table',
            description: 'Wooden table',
            price: 200,
            discountPrice: 150,
            currency: 'USD',
            images: [],
            type: 'FURNITURE',
            size: 'L',
            color: 'Brown',
            isBestSeller: false,
            isAvailable: true,
            isActive: true,
            category: {
                id: 'cat2',
                createdAt: '',
                updatedAt: '',
                name: 'Tables',
                isActive: true
            }
        };

        const action = createProductSuccess(mockProduct);
        const state = catalogReducer(initialState, action);
        expect(state.loadingCreateProduct).toBe(false);
        expect(state.allProducts).toContainEqual(mockProduct);
        expect(state.successCreateProduct).toBe(true);
    });

    it('should handle createProductFailure', () => {
        const action = createProductFailure('Creation failed');
        const state = catalogReducer(initialState, action);
        expect(state.loadingCreateProduct).toBe(false);
        expect(state.errorCreateProduct).toBe('Creation failed');
    });
});
