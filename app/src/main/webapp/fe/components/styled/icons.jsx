import styled from 'styled-components';
import Add from '../../svg/add.svg';
import Remove from '../../svg/cross.svg';
import Dish from '../../svg/dish-fork-and-knife.svg';
import SearchFile from '../../svg/search-in-folder.svg';

const Icon = `
        width: 1.5rem;
        height: 1.5rem;
        display: inline-block;
        vertical-align: middle;
        fill: ${props => props.theme.text};
        
        &:hover {
            cursor: pointer;
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
    ${Icon}
    
    margin-left: 10px;
    fill: ${props => props.theme.button};
    
    &:hover {
        fill: ${props => props.theme.text};
    }
`

export const SearchIcon = styled(SearchFile)`
    ${Icon}
    
    margin: 0 5px 0 10px;
    fill: ${props => props.theme.text};
    
    &:hover {
        fill: ${props => props.theme.button};
    }
`

export const NoImgIcon = styled(Dish)`
    
    width: 600px;
    
    fill: ${props => props.theme.text};
    
    &:hover {
        fill: ${props => props.theme.button};
    }
`