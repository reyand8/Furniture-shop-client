import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import {
    CircularProgress,
    InputAdornment,
    ListItem,
    Popper
} from '@mui/material';

import theme from '../../assets/theme';
import { AppDispatch, RootState } from '../../store/store';
import { clearSearchResults, searchRequest } from '../../store/slice/catalog/catalog.slice';
import {
    ListItemSearchText,
    SearchBox,
    SearchBtnBox,
    SearchResultList,
    SearchTextField
} from '../../styles/Search.styles';
import { IProduct } from '../../types/catalog.interface';


/**
 * Search component with autocomplete functionality.
 *
 * - Displays a search input field.
 * - Dispatches search requests with debounce.
 * - Shows search results in a dropdown.
 * - Navigates to the selected product page on item click.
 * - Clears results when clicking outside the component.
 */
const Search: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState('');
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const { searchResults, loading } = useSelector((state: RootState) => state.catalog);
    const containerRef = useRef<HTMLDivElement>(null);

    /**
     * Effect to debounce the search input.
     * Triggers a search request if input length > 1 after 500ms delay.
     * Clears search results if input is too short.
     */
    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (inputValue.trim().length > 1) {
                dispatch(searchRequest(inputValue));
            } else {
                dispatch(clearSearchResults());
            }
        }, 500);
        return (): void => clearTimeout(delayDebounce);
    }, [inputValue, dispatch]);

    /**
     * Effect to handle clicks outside the search component.
     * Closes the search results dropdown and clears results on outside click.
     */
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent): void => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                dispatch(clearSearchResults());
                setAnchorEl(null);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [dispatch]);

    /**
     * Handles input value changes.
     * Updates the input state and sets the anchor element for the Popper.
     * @param event - The change event from the input.
     */
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setInputValue(event.target.value);
        setAnchorEl(event.currentTarget);
    };

    /**
     * Handles click on a search result item.
     * Navigates to the product detail page, clears search results, and closes the dropdown.
     * @param item - The selected product item.
     */
    const handleItemClick = (item: IProduct): void => {
        navigate(`/single-product/${item.id}`);
        setInputValue(item.name);
        dispatch(clearSearchResults());
        setAnchorEl(null);
    };

    return  (
        <>
            <SearchBox ref={containerRef}>
                <SearchTextField
                    value={inputValue}
                    onChange={handleChange}
                    variant="outlined"
                    placeholder="Search..."
                    fullWidth
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="start">
                                <SearchBtnBox>
                                    <SearchIcon sx={{
                                        color: theme.palette.text.primary,
                                        fontSize: '26px'
                                    }} />
                                </SearchBtnBox>
                            </InputAdornment>
                        )
                    }}
                />
            </SearchBox>
            <Popper
                open={(!!searchResults.length || loading) && !!anchorEl}
                anchorEl={anchorEl}
                placement="bottom-start"
                sx={{maxWidth: '364px', width: '100%'}}
            >
                <SearchResultList>
                    {loading && (
                        <ListItem>
                            <CircularProgress size={20} />
                        </ListItem>
                    )}
                    {!loading && searchResults.map((item: IProduct) => (
                            <ListItem
                                key={item.id}
                                component="div"
                                onClick={() => handleItemClick(item)}
                            >
                                <ListItemSearchText primary={item.name} />
                            </ListItem>
                    ))}
                </SearchResultList>
            </Popper>
        </>
    )
}

export default Search;