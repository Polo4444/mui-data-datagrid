import React, { useState } from 'react'
import { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Box, CircularProgress, makeStyles, TableSortLabel, Typography, useTheme } from '@material-ui/core'

// Libs
import { VariableSizeGrid as DGrid } from 'react-window'
import AutoSizer from "react-virtualized-auto-sizer"
import InfiniteLoader from "react-window-infinite-loader"

const scrollbarWidth = 10

const useStyles = makeStyles(theme => ({
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  DGridScrollbar: {
    '&::-webkit-scrollbar-track': {
      WebkitBoxShadow: 'inset 0 0 6px rgba(1,1,1,0.1)',
      borderRadius: scrollbarWidth,
      backgroundColor: "#F5F5F5"
    },
    '&::-webkit-scrollbar': {
      width: scrollbarWidth,
      height: scrollbarWidth,
      backgroundColor: "#F5F5F5"
    },
    '&::-webkit-scrollbar-thumb': {
      width: scrollbarWidth,
      height: scrollbarWidth,
      borderRadius: scrollbarWidth,
      backgroundColor: theme.palette.primary.main
    }
  },
  DGridHeaderCell: {
    color: `${theme.palette.primary.dark}66`
  },
  DGridCell: {
    backgroundColor: theme.palette.background.paper,
    borderBottom: `1px solid ${theme.palette.primary.main}66`
  }
}))

// function HTMLToString(htmlString) {
//     return htmlString.replace(/<[^>]+>/g, '')
// }


// Descending Comparator
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

// Get Comparator
function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

// Sort Columns
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}


function HeaderCellRenderer({ columnIndex, data, style }) {

  const classes = useStyles()

  const sortHandler = (property) => (event) => {
    data.handleRequestSort(event, property)
  }


  return (
    <Box display="flex" alignItems="center" className={data.headerCellClass} style={{ ...style, height: data.headerHeight }}>
      <Box pl={2}>
        <Typography variant="body2" >
          <TableSortLabel
            active={data.sortBy === data.columns[columnIndex].id}
            direction={data.sortBy === data.columns[columnIndex].id ? data.sort : 'asc'}
            onClick={(sortHandler(data.columns[columnIndex].id))}
          >
            {data.columns[columnIndex].label}
            {data.orderBy === data.columns[columnIndex].id ? (
              <span className={classes.visuallyHidden}>
                {data.sort === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </span>)
              : null
            }
          </TableSortLabel>
        </Typography>
      </Box>
    </Box>
  )
}

// CellRenderer renders a cell
function CellRenderer({ columnIndex, data, rowIndex, style }) {

  const handleColumnID = (row, columnID) => {
    return columnID.split('|').reduce((total, current) => total === '' ? row[current] : total[current], '')
  }


  return (
    <Fragment>
      {rowIndex === 0 ?

        // Header
        <HeaderCellRenderer columnIndex={columnIndex} data={data} style={style} />
        :

        // Body rows
        <Box display="flex" alignItems="center" className={data.className} style={{ ...style, height: data.rowHeight - data.rowSpacing }}>
          <Box pl={2}>
            {data.columns[columnIndex].id === 'actions' && data.actions(data.data[rowIndex - 1])}
            
            {data.columns[columnIndex].id !== 'actions' &&
              data.isItemLoaded(rowIndex) ?
              handleColumnID(data.data[rowIndex - 1], data.columns[columnIndex].id)
              :
              columnIndex === 0 && <CircularProgress size={20} />
            }
          </Box>
          <Box height={data.rowSpacing} />
        </Box>
      }
    </Fragment>
  )

}

function InfiniteScroller({ loadMoreFunc, hasMore, loadingMore, rowsCount, children }) {

  const theme = useTheme()

  // If there are more items to be loaded then add an extra row to hold a loading indicator.
  const itemCount = hasMore ? rowsCount + 1 : rowsCount;

  // Only load 1 page of items at a time.
  // Pass an empty callback to InfiniteLoader in case it asks us to load more than once.
  const loadMoreItems = loadingMore ? () => { } : loadMoreFunc;

  // Every row is loaded except for our loading indicator row.
  const isItemLoaded = index => !hasMore || index < rowsCount;

  return (
    <>
      {loadMoreFunc ?
        <InfiniteLoader
          isItemLoaded={isItemLoaded}
          itemCount={itemCount}
          loadMoreItems={loadMoreItems}
        >
          {({ onItemsRendered, ref }) => (
            children
          )}
        </InfiniteLoader>
        :
        children
      }
    </>
  )
}

export default function DataGrid({

  // Data props
  columns = [], rows = [], actions=null,

  // Sort props
  order, orderBy,

  // Size props
  headerHeight = 60, rowHeight = 100, rowSpacing = 20,

  // Styling props
  gridStyle = null, headerCellClass = null, cellClass = null,

  // Infinite scroll props
  loadMoreFunc = null, hasMore = false, loadingMore = false
}) {

  // const theme = useTheme()
  const classes = useStyles()

  const [sort, setSort] = useState(order)
  const [sortBy, setSortBy] = useState(orderBy)

  const handleRequestSort = (_, property) => {
    const isAsc = sortBy === property && sort === 'asc'
    setSort(isAsc ? 'desc' : 'asc')
    setSortBy(property)
  }

  const getColumnsWidth = () => {

    let strLen = 0
    let colWidths = columns.map(aColumn => {
      return {
        id: aColumn.id,
        width: rows.reduce((prev, current) => {

          if (aColumn.width && aColumn.width !== 0) {
            return aColumn.width
          }

          strLen = current[aColumn.id] ? 10 * current[aColumn.id].toString().length : 50
          return strLen > prev ? strLen : prev
        }, 0)
      }
    })

    return colWidths = { data: colWidths, total: colWidths.reduce((prev, current) => prev + current.width, 0) }
  }

  const columnsWidth = getColumnsWidth()


  // Infinite scroll manager

  const rowsCount = rows.length
  // If there are more items to be loaded then add an extra row to hold a loading indicator.
  const itemCount = hasMore ? rowsCount + 1 : rowsCount;

  // Only load 1 page of items at a time.
  // Pass an empty callback to InfiniteLoader in case it asks us to load more than once.
  const loadMoreItems = loadingMore ? () => { } : loadMoreFunc;

  // Every row is loaded except for our loading indicator row.
  const isItemLoaded = index => !hasMore || index < rowsCount;


  return (

    <AutoSizer>
      {/* <InfiniteScroller loadMoreFunc={loadMoreFunc} hasMore={hasMore}> */}
      {({ height, width }) => (
        <InfiniteLoader isItemLoaded={isItemLoaded} itemCount={itemCount} loadMoreItems={loadMoreItems}>
          {({ onItemsRendered, ref }) => {

            const newItemsRendered = ({
              visibleRowStartIndex,
              visibleRowStopIndex,
              visibleColumnStopIndex,
              overscanRowStartIndex,
              overscanRowStopIndex,
              overscanColumnStopIndex
            }) => {
              const useOverscanForLoading = true

              const endCol =
                (useOverscanForLoading || true
                  ? overscanColumnStopIndex
                  : visibleColumnStopIndex) + 1;

              const startRow =
                useOverscanForLoading || true
                  ? overscanRowStartIndex
                  : visibleRowStartIndex;
              const endRow =
                useOverscanForLoading || true
                  ? overscanRowStopIndex
                  : visibleRowStopIndex;

              const visibleStartIndex = startRow;
              const visibleStopIndex = endRow;

              onItemsRendered({
                //call onItemsRendered from InfiniteLoader so it can load more if needed
                visibleStartIndex,
                visibleStopIndex
              })
            }

            return (
              <DGrid
                onItemsRendered={newItemsRendered}
                ref={ref}

                columnCount={columns.length}
                columnWidth={index => {

                  return (columnsWidth.total < width) ?
                    columnsWidth.data[index].width + ((width - columnsWidth.total) / columns.length) - (scrollbarWidth / columns.length)
                    : columnsWidth.data[index].width
                }}
                height={height}
                rowCount={rows.length + 1}
                rowHeight={index => (index === 0 ? headerHeight : rowHeight)}
                width={width}
                style={!gridStyle ? {

                } : gridStyle}
                // className="d-grid"
                className={classes.DGridScrollbar}

                itemData={{
                  data: stableSort(rows, getComparator(sort, sortBy)), columns: columns, rowHeight: rowHeight, rowSpacing: rowSpacing,
                  actions: actions,
                  headerHeight: headerHeight,
                  sort: sort, sortBy: sortBy, handleRequestSort: handleRequestSort,
                  className: !cellClass ? classes.DGridCell : cellClass,
                  headerCellClass: !headerCellClass ? classes.DGridHeaderCell : headerCellClass,

                  isItemLoaded: isItemLoaded
                }}
                itemKey={({ columnIndex, data, rowIndex }) => `${data.columns[columnIndex].id} | ${rowIndex === 0 ? '1' : (data.data[rowIndex - 1]._id)}`}
              >
                {CellRenderer}
              </DGrid>
            )
          }}

        </InfiniteLoader>
      )
      }
    </AutoSizer >
  )
}

DataGrid.propTypes = {
  headerHeight: PropTypes.number,
  rowHeight: PropTypes.number,
  rowSpacing: PropTypes.number,
}