import styles from './styles.module.css'

import React, { useState } from 'react'
import { Box, makeStyles, TableSortLabel, Typography, useTheme } from '@material-ui/core'

// Libs
import { VariableSizeGrid as DGrid } from 'react-window'
import AutoSizer from "react-virtualized-auto-sizer";
import { Fragment } from 'react';

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
      backgroundColor: "#F5F5F5"
    },
    '&::-webkit-scrollbar-thumb': {
      width: scrollbarWidth,
      borderRadius: scrollbarWidth,
      backgroundColor: theme.palette.primary.main
    }
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
    <Box display="flex" alignItems="center" style={{ ...style, ...data.headerStyle, height: data.headerHeight }}>
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

  return (
    <Fragment>
      {rowIndex === 0 ?

        // Header
        <HeaderCellRenderer columnIndex={columnIndex} data={data} style={style} />
        :

        // Body rows
        <Box display="flex" alignItems="center" style={{ ...style, ...data.style, height: data.rowHeight - data.rowSpacing }}>
          <Box pl={2}>
            {data.data[rowIndex - 1][data.columns[columnIndex].id]}
          </Box>
          <Box height={data.rowSpacing} />
        </Box>
      }
    </Fragment>
  )

}


export default function DataGrid({ columns = [], rows = [],
  order, orderBy,
  headerHeight = 60, rowHeight = 100, rowSpacing = 20,
  gridStyle = null, headerCellStyle = null, cellStyle = null }) {

  const theme = useTheme()
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



  return (
    <AutoSizer>
      {({ height, width }) => (
        <DGrid
          // className="Grid"
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
            headerHeight: headerHeight,
            sort: sort, sortBy: sortBy, handleRequestSort: handleRequestSort,
            style: !cellStyle ? {
              backgroundColor: theme.palette.background.paper,
              borderBottom: `1px solid ${theme.palette.primary.main}66`
            } : cellStyle,
            headerStyle: !headerCellStyle ? {
              color: `${theme.palette.primary.dark}66`
            } : headerCellStyle
          }}
          itemKey={({ columnIndex, data, rowIndex }) => `${data.columns[columnIndex].id} | ${rowIndex === 0 ? '1' : (data.data[rowIndex - 1]._id)}`}
        >
          {CellRenderer}
        </DGrid>
      )
      }
    </AutoSizer >
  )
}
