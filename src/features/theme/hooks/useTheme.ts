import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
    selectIsDark,
    toggleTheme as toggleThemeAction,
} from '../store/themeSlice';

export function useTheme() {
    const isDark = useAppSelector(selectIsDark);
    const dispatch = useAppDispatch();

    function toggleTheme() {
        dispatch(toggleThemeAction());
    }

    return { isDark, toggleTheme };
}