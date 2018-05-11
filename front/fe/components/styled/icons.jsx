import styled from 'styled-components';
import Add from '../../svg/add.svg';
import Remove from '../../svg/cross.svg';
import Dish from '../../svg/dish-fork-and-knife.svg';
import SearchFile from '../../svg/search-in-folder.svg';
import SortUp from '../../svg/sort-up.svg';
import SortDown from '../../svg/caret-down.svg';

const Icon = `
        width: 1.5rem;
        height: 1.5rem;
        fill: ${props => props.theme.iconColor};
        cursor: pointer;
        
        &:hover {
            fill: ${props => props.theme.iconHoverColor};
            
        }
`

export const AddIcon = styled(Add)`
    ${Icon}
    
    fill: ${props => props.theme.text};
    
    &:hover {
        fill: ${props => props.theme.button};
    }
`

export const RemoveIcon = styled(Remove)`
    width: 1rem;
    height: 1rem;
    cursor: pointer;
    
    margin-left: 10px;
    fill: ${props => props.theme.text}; 
    
    &:hover {
        fill: ${props => props.theme.button};
    }
`

export const SearchIcon = styled(SearchFile)`
    ${Icon}
    margin: 0 5px 0 0;
`

export const NoImgIcon = styled(Dish)`
    
    fill: ${props => props.theme.text};
    
    &:hover {
        fill: ${props => props.theme.button};
    }
`




export const ArrowUp = styled(SortUp)`
        width: 0.5rem;
        height: 0.5rem;
        fill: ${props => props.theme.iconHoverColor};
        cursor:pointer;
    
        &:hover {
            fill: ${props => props.theme.content};
        }
`

export const ArrowDown = styled(SortDown)`
        width: 0.5rem;
        height: 0.5rem;
        fill: ${props => props.theme.iconHoverColor};
        cursor:pointer;
    
        &:hover {
            fill: ${props => props.theme.content};
        }
`