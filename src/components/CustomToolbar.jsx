import { Box } from '@mui/system'
import { GridToolbarContainer, GridToolbarQuickFilter } from '@mui/x-data-grid'

const CustomToolbar = ({ showQuickFilter = true }) => {
  return (
    <GridToolbarContainer sx={{ mt: 2, ml: 2, mb: 5 }}>
      <Box sx={{ flexGrow: 1 }} />
      {showQuickFilter && <GridToolbarQuickFilter variant='outlined' size='small' />}
    </GridToolbarContainer>
  )
}

export default CustomToolbar
