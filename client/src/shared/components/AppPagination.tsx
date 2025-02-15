import { Box, Pagination, Typography } from "@mui/material/";
import {Pagination as PaginationType} from "../../app/models/pagination"


type Props = 
{
    metadata: PaginationType,
    onPageChange: (page:number) => void
}

export default function AppPagination({metadata, onPageChange}: Props) {
    const {totalCount, totalPages, currentPage, pageSize} = metadata;

    const start = (currentPage - 1) * pageSize + 1;
    const end = Math.min(currentPage * pageSize, totalCount);

  return (
    <Box display="flex" justifyContent="space-evenly" alignItems="center" marginTop={3}>    
        <Typography>Viewing items {start}-{end} of {totalCount}.</Typography>
        <Pagination count={totalPages} page={currentPage} onChange={(_, page) => onPageChange(page)}/>
    </Box>

  )
}